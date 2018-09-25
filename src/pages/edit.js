import React from 'react'
import DocsLayout from './../components/DocsLayout'
import EditorInput from './../components/EditorInput'
import MonacoEditor from 'react-monaco-editor'
import { FormattedMessage } from 'react-intl'

export default class EditPage extends React.Component {
  constructor() {
    super()

    this.state = {
      monaco: null
    }
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
      })
    }
  }
  editorDidMount(editor, monaco) {
    console.log('haha');
    // editor.focus();
  }
  render() {
    return (
      <DocsLayout locale={this.props.pageContext.locale}>
        <h2>
          <FormattedMessage id="pages.edit.info" />
        </h2>
        <div>
          <div className="form-container">
            <EditorInput id="client_id" ref="client-id"></EditorInput>
            <EditorInput id="application_id" ref="application-id"></EditorInput>
          </div>
          <div className="row">
            <EditorInput id="bot_name" ref="bot-name"></EditorInput>
            <EditorInput id="bot_prefix" ref="bot-prefix"></EditorInput>
          </div>
          <div className="row">
            <EditorInput id="bot_invite" ref="bot-invite"></EditorInput>
            <EditorInput id="bot_avatar" ref="bot-avatar"></EditorInput>
          </div>
          <div className="row">
            <EditorInput id="bot_support" ref="bot-support"></EditorInput>
            <EditorInput id="bot_nsfw" ref="bot-nsfw" label="NSFW" choices={{true:'This bot is NSFW', false:'This bot is not NSFW'}}></EditorInput>
          </div>
          <div className="row">
            <EditorInput id="bot_description" ref="bot-description" className="full-width"></EditorInput>
          </div>
          <div className="row">
            <EditorInput id="bot_github_owner" ref="bot-github-owner"></EditorInput>
            <EditorInput id="bot_github_repo" ref="bot-github-repo"></EditorInput>
          </div>
          <div className="row">
            <label><FormattedMessage id="pages.edit.page.title" /></label>
            { this.state.monaco }
            <small><FormattedMessage id="pages.edit.page.note" /></small>
          </div>
        </div>
      </DocsLayout>
    )
  }
}
