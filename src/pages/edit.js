import React from 'react';
import PropTypes from 'prop-types';
import DocsLayout from './../components/DocsLayout';
import EditorInput from './../components/EditorInput';
import MonacoEditor from 'react-monaco-editor';
import { dump } from 'js-yaml';
import { FormattedMessage } from 'react-intl';

class EditPage extends React.Component {
  constructor() {
    super();

    this.state = {
      monaco: null,
      pagename: null,
      description: null,
      prefix: null,
      avatar: null,
      link: null,
      support: null,
      nsfw: null,
      github: null
    };
  
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.setState({
        monaco: (<MonacoEditor
          language="markdown"
          theme="vs-dark"
          height="400"
          options={{
            automaticLayout: true
          }}
          editorDidMount={this.editorDidMount} />)
      });
    }
  }
  // editorDidMount(editor, monaco) {
  //   console.log('haha');
  //   editor.focus();
  // }

  handleSubmit(e) {
    e.preventDefault();
    const data = {
      pagename: this.state.pagename,
      description: this.state.description,
      prefix: this.state.prefix,
      avatar: this.state.avatar,
      link: this.state.link,
      support: this.state.support,
      nsfw: this.state.nsfw === 'true' ? true : false
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

    console.log(data);
    console.log(dump(data, {
      styles: {
        '!!null': 'lowercase'
      },
      sortKeys: true
    }));
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
    return (
      <DocsLayout locale={this.props.pageContext.locale}>
        <h2>
          <FormattedMessage id="pages.edit.info" />
        </h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-container">
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
            <EditorInput id="bot_support" name="support" onChange={this.handleChange}></EditorInput>
            <EditorInput id="bot_nsfw" name="nsfw" onChange={this.handleChange} label="NSFW" choices={{true:'This bot is NSFW', false:'This bot is not NSFW'}}></EditorInput>
          </div>
          <div className="row">
            <EditorInput id="bot_description" name="description" onChange={this.handleChange} className="full-width"></EditorInput>
          </div>
          <div className="row">
            <EditorInput id="bot_github_owner" name="github.owner" onChange={this.handleChange}></EditorInput>
            <EditorInput id="bot_github_repo" name="github.repo" onChange={this.handleChange}></EditorInput>
          </div>
          <div className="row">
            <label><FormattedMessage id="pages.edit.page.title" /></label>
            { this.state.monaco }
            <small><FormattedMessage id="pages.edit.page.note" /></small>
          </div>
          <button type="submit">
            Submissive button
          </button>
        </form>
      </DocsLayout>
    );
  }
}

EditPage.propTypes = {
  pageContext: PropTypes.shape({
    locale: PropTypes.string
  })
};

export default EditPage;
