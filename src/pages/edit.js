import React from 'react';
import { graphql, navigate } from 'gatsby';
import PropTypes from 'prop-types';
import GitHub from 'github-api';

import DocsLayout from './../components/DocsLayout';
import EditorInput from './../components/EditorInput';
import Global from './../components/Global';
import MonacoEditor from 'react-monaco-editor';
import { dump } from 'js-yaml';
import { FormattedMessage } from 'react-intl';

import locales from './../locales';

import './edit.scss';

const localeOptions = {};
Object.keys(locales).forEach(locale => localeOptions[locale] = locales[locale].native);

class EditPage extends React.Component {
  constructor() {
    super();

    this.state = {
      monaco: null,
      editor_type: null,
      editor_lang: null,
      filename: null,
      pagename: null,
      description: null,
      prefix: null,
      avatar: null,
      cover: null,
      link: null,
      support: null,
      nsfw: null,
      github: null,
      token: null,
      logs: [],
    };
  
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onLongDescriptionChange = this.onLongDescriptionChange.bind(this);
    this.pullLog = this.pullLog.bind(this);
  }

  editorDidMount(editor) {
    editor.addAction({
      id: 'stanLoona',
      label: 'Secret',
      run: () => {
        window.open('https://www.youtube.com/watch?v=846cjX0ZTrk', '_blank', 'noopener,noreferrer,nofollow');
      }
    });
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.setState({
        monaco: (
          <FormattedMessage id="pages.edit.default">
            {(def) => (
              <div className="ls-text-editor">
                <div className="ls-monaco">
                  <FormattedMessage id="pages.edit.page.title" />
                  <MonacoEditor
                    language="markdown"
                    theme="vs-dark"
                    height="400"
                    options={{
                      automaticLayout: true
                    }}
                    onChange={this.onLongDescriptionChange}
                    defaultValue={def}
                    editorDidMount={this.editorDidMount} />
                </div>
                <div className="ls-not-monaco row">
                  <EditorInput id="page" name="html" onChange={this.handleChange} className="full-width" type="field">
                    {def}
                  </EditorInput>
                </div>
              </div>
            )}
          </FormattedMessage>
        )
      });
    }

    const code = /(?:[?&]code=)(.*)&??/.exec(this.props.location.search);

    // If there's a code in the URL...
    if (typeof localStorage !== 'undefined' && code && code[1]) {
      // Fetch the token for the code
      fetch(`${this.props.data.site.siteMetadata.gatekeeper}/${code[1]}`)
        .then(data => data.json())
        .then((data) => {
          // If a token is returned, save it and set the state
          if (data.token) {
            localStorage.setItem('token', data.token);
            this.setState({
              token: data.token,
            });
          }
          
          // Remove the `?code=` afterwards. Makes it naisu in case someone refreshes
          navigate(this.props.location.pathname);
        })
        .catch((error) => {
          throw error;
        });
    } else if (typeof localStorage !== 'undefined' && localStorage.getItem('token')) {
      // If there's already a token in localStorage, set it in the state
      this.setState({
        token: localStorage.getItem('token'),
      });
    }
  }

  pullLog(text) {
    if (typeof text === 'string') {
      this.setState((previousState) => ({
        logs: previousState.logs.concat([text])
      }));
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const data = {
      pagename: this.state.pagename,
      description: this.state.description,
      prefix: this.state.prefix,
      avatar: this.state.avatar,
      cover: this.state.cover,
      link: this.state.link,
      support: this.state.support,
      nsfw: this.state.nsfw === 'true' ? true : false,
    };

    if (this.state['github.owner']) {
      data.github = {};
      data.github.owner = this.state['github.owner'];
      if (this.state['github.repo']) {
        data.github.repo = this.state['github.repo'];
      }
    } else {
      data.github = null;
    }

    const filedata = `---\n${dump(data, {
      styles: {
        '!!null': 'lowercase'
      },
      sortKeys: true
    })}---\n${this.state.html || ''}`;

    const github = new GitHub({
      token: this.state.token
    });

    const terminalRepo = github.getRepo('terminal', 'discord_fork');

    terminalRepo.fork((error1, forkData) => {
      if (error1) {
        this.pullLog(error1);
      } else {
        const userOwner = forkData.owner.login;
        const userRepoName = forkData.name;
        const userRepo = github.getRepo(userOwner, userRepoName);

        const writeToFork = () => {
          this.pullLog('Writing file to GitHub');
          userRepo.writeFile(forkData.default_branch, `data/${this.state.editor_lang}/${this.state.editor_type}/${this.state.filename}.md`, filedata, `Adding ${data.pagename} via Gatsby Branch Editor`, {}, (error2) => {
            if (error2) {
              this.pullLog(error2);
            } else {
              this.pullLog('Creating pull request');
              terminalRepo.createPullRequest({
                title: `Adding ${data.pagename}`,
                head: `${userOwner}:v2`,
                base: 'v2',
                body: 'This pull request was made by the Gatsby Branch Editor.',
                maintainer_can_modify: true,
              }, (error3, pullRequestData) => {
                if (error3) {
                  this.pullLog(error3);
                } else {
                  this.pullLog('Successfully created pull request!');
                  window.location.href = pullRequestData.html_url;
                }
              });
            }
          });
        };

        terminalRepo.listCommits({
          sha: 'v2'
        }, (error2, terminalCommits) => {
          if (error2) {
            this.pullLog(error2);
          } else {
            userRepo.listCommits({
              sha: 'v2'
            }, (error3, userCommits) => {
              if (error3) {
                this.pullLog(error3);
              } else if (terminalCommits[0].sha !== userCommits[0].sha) {
                this.pullLog(`Latest Terminal commit ${terminalCommits[0].sha} differs from fork commit ${userCommits[0].sha} - Updating head.`);
                userRepo.updateHead('heads/v2', terminalCommits[0].sha, true, (error4) => {
                  if (error4) {
                    this.pullLog(error4);
                  } else {
                    writeToFork();
                  }
                });
              } else {
                writeToFork();
              }
            });
          }
        });
      }
    });
  }

  onLongDescriptionChange(newValue) {
    this.setState({
      html: newValue
    });
  }

  handleChange(e) {
    const target = e.target;
    let value = null;

    if (target.type === 'checkbox') {
      value = target.checked;
    } else {
      value = target.value;
    }

    if (typeof value === 'string' && value.length === 0) {
      value = null;
    }
    
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    if (typeof localStorage === 'undefined') {
      return (
        <DocsLayout locale={this.props.pageContext.locale}>
          <Global />
          <h1>What did you do?!?</h1>
          <p><code>localStorage</code> was not found</p>
        </DocsLayout>
      );
    }

    if (!this.state.token) {
      // window.location.href = this.props.data.site.siteMetadata.authenticate;
      return (
        <DocsLayout locale={this.props.pageContext.locale}>
          <Global />
          <h1>Login to GitHub</h1>
          <p>To use this online editor, please connect your GitHub account with Discord_Fork.</p>
          <a className="btn emerald" href={this.props.data.site.siteMetadata.authenticate}>Login</a>
          <noscript>
            <h2><i>...unless you disabled JavaScript.</i></h2>
            <p>The edit page requires JavaScript to function. Please re-enable JavaScript, or manually create a pull request on GitHub.</p>
          </noscript>
        </DocsLayout>
      );
    }

    if (this.state.logs.length > 0) {
      return (
        <DocsLayout locale={this.props.pageContext.locale}>
          <Global />
          <h1><FormattedMessage id="pages.edit.create_pr.modal.wait" /></h1>
          <pre>
            <code>
              {this.state.logs.map((line, number) => {
                return (
                  <span key={number}>{line}<br /></span>
                );
              })}
            </code>
          </pre>
        </DocsLayout>
      );
    }


    let fields = (
      <p>Please select a type of service</p>
    );
    if (this.state.editor_type === 'bots') {
      fields = (
        <div>
          <h3><FormattedMessage id="pages.edit.steps.2bots" /></h3>
          <div className="row">
            <EditorInput id="client_id" name="filename" onChange={this.handleChange}></EditorInput>
            <EditorInput id="application_id" name="application_id" onChange={this.handleChange}></EditorInput>
          </div>
          <div className="row">
            <EditorInput id="bot_name" name="pagename" onChange={this.handleChange}></EditorInput>
            <EditorInput id="bot_prefix" name="prefix" onChange={this.handleChange}></EditorInput>
          </div>
          <div className="row">
            <EditorInput id="bot_invite" name="link" onChange={this.handleChange}></EditorInput>
            <EditorInput id="bot_avatar" name="avatar" onChange={this.handleChange}></EditorInput>
          </div>
          <div className="row">
            <EditorInput id="bot_cover" name="cover" onChange={this.handleChange}></EditorInput>
          </div>
          <div className="row">
            <EditorInput id="bot_support" name="support" onChange={this.handleChange}></EditorInput>
            <EditorInput id="bot_nsfw" name="nsfw" onChange={this.handleChange} choices={['true', 'false']}></EditorInput>
          </div>
          <div className="row">
            <EditorInput id="bot_description" name="description" onChange={this.handleChange} className="full-width"></EditorInput>
          </div>
          <div className="row">
            <EditorInput id="github_owner" name="github.owner" onChange={this.handleChange}></EditorInput>
            <EditorInput id="github_repo" name="github.repo" onChange={this.handleChange}></EditorInput>
          </div>
        </div>
      );
    } else if (this.state.editor_type === 'servers') {
      fields = (
        <div>
          <h3><FormattedMessage id="pages.edit.steps.2servers" /></h3>
          <div className="row">
            <EditorInput id="server_id" name="filename" onChange={this.handleChange}></EditorInput>
            <EditorInput id="server_name" name="pagename" onChange={this.handleChange}></EditorInput>
          </div>
          <div className="row">
            <EditorInput id="server_invite" name="link" onChange={this.handleChange}></EditorInput>
            <EditorInput id="server_avatar" name="avatar" onChange={this.handleChange}></EditorInput>
          </div>
          <div className="row">
            <EditorInput id="server_description" name="description" onChange={this.handleChange} className="full-width"></EditorInput>
          </div>
          <div className="row">
            <EditorInput id="github_owner" name="github.owner" onChange={this.handleChange}></EditorInput>
            <EditorInput id="github_repo" name="github.repo" onChange={this.handleChange}></EditorInput>
          </div>
          <div className="row">
            <EditorInput id="server_nsfw" name="nsfw" onChange={this.handleChange} choices={['true', 'false']}></EditorInput>
          </div>
        </div>
      );
    }

    let editor = null;
    if (this.state.editor_type) {
      editor = (
        <div>
          <h3><FormattedMessage id="pages.edit.steps.3" /></h3>
          <div className="row">
            { this.state.monaco }
            <small><FormattedMessage id="pages.edit.page.note" /></small>
          </div>
          <p><small><FormattedMessage id="pages.edit.notice" /></small></p>
          <button type="submit" className="btn white black-text">
            <FormattedMessage id="pages.edit.create_pr.button" />
          </button>
        </div>
      );
    }

    return (
      <DocsLayout locale={this.props.pageContext.locale}>
        <Global />
        <h2>
          <FormattedMessage id="pages.edit.title" />
        </h2>
        <p><FormattedMessage id="pages.edit.info" /></p>
        <form onSubmit={this.handleSubmit}>
          <h3><FormattedMessage id="pages.edit.steps.1" /></h3>
          <div className="row">
            <EditorInput id="editor_type" name="editor_type" onChange={this.handleChange} choices={{bots:'Bots', servers:'Servers'}}></EditorInput>
            <EditorInput id="editor_lang" name="editor_lang" onChange={this.handleChange} choices={localeOptions}></EditorInput>
          </div>
          { fields }
          { editor }
        </form>
      </DocsLayout>
    );
  }
}

EditPage.propTypes = {
  pageContext: PropTypes.shape({
    locale: PropTypes.string
  }),
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        gatekeeper: PropTypes.string,
        authenticate: PropTypes.string
      })
    })
  }),
  location: PropTypes.shape({
    search: PropTypes.string,
    pathname: PropTypes.string
  })
};

export const pageQuery = graphql`
  query EditPage {
    site {
      siteMetadata {
        gatekeeper
        authenticate
      }
    }
  }
`;

export default EditPage;
