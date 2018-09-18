import React from 'react'
import DocsLayout from './../components/DocsLayout'
import EditorInput from './../components/EditorInput'
import MonacoEditor from 'react-monaco-editor'

export default class Homepage extends React.Component {
  constructor() {
    super()

    this.state = {
      monaco: null
    }
  }
  componentDidMount() {
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
  editorDidMount(editor, monaco) {
    console.log('haha');
    // editor.focus();
  }
  render() {
    return (
      <DocsLayout title="Add or Edit Bot">
        <h2>This editor is in Beta.</h2>
        <div className="form-container">
          <div className="row">
            <EditorInput id="client-id" ref="client-id" label="Client ID" placeholder="Insert the Client ID of the bot here"></EditorInput>
            <EditorInput id="application-id" ref="application-id" label="Application ID" placeholder="Insert the Application ID of the bot here"></EditorInput>
          </div>
          <div className="row">
            <EditorInput id="bot-name" ref="bot-name" label="Discord Bot Name" placeholder="The visible name of your bot"></EditorInput>
            <EditorInput id="bot-prefix" ref="bot-prefix" label="Prefix" placeholder="The prefix which triggers your bot"></EditorInput>
          </div>
          <div className="row">
            <EditorInput id="bot-invite" ref="bot-invite" label="Invite URL" placeholder="The link to your application"></EditorInput>
            <EditorInput id="bot-avatar" ref="bot-avatar" label="Avatar URL" placeholder="The link to your application's avatar"></EditorInput>
          </div>
          <div className="row">
            <EditorInput id="bot-support" ref="bot-support" label="Support URL" placeholder="The link to your support server"></EditorInput>
            <EditorInput id="bot-nsfw" ref="bot-nsfw" label="NSFW" choices={{true:'This bot is NSFW', false:'This bot is not NSFW'}}></EditorInput>
          </div>
          <div className="row">
            <EditorInput className="full-width column" id="bot-github-owner" ref="bot-github-owner" label="GitHub Owner" placeholder="The name of the GitHub user or an organisation"></EditorInput>
          </div>
          <div className="row">
            <EditorInput id="bot-github-owner" ref="bot-github-owner" label="GitHub Owner" placeholder="The name of the GitHub user or an organisation"></EditorInput>
            <EditorInput id="bot-github-repo" ref="bot-github-repo" label="GitHub Repo" placeholder="The name of the GitHub repository"></EditorInput>
          </div>
          <div className="row">
            <label>Bot Page</label>
            { this.state.monaco }
            <small>Markdown and some HTML allowed</small>
          </div>
        </div>
      </DocsLayout>
    )
  }
}
