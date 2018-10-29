import React from 'react';
import PropTypes from 'prop-types';
import MonacoEditor from 'react-monaco-editor';
import { FormattedMessage } from 'react-intl';

import Navigation from './../Navigation';
import GlobalLayout from '../GlobalLayout';

import './index.scss';

class TutorialsLayout extends React.Component {
  constructor() {
    super(...arguments);
    this.keyDown = this.keyDown.bind(this);
    this.save = this.save.bind(this);
    this.monaco = React.createRef();
    this.state = {
      monaco: null
    };
  }

  keyDown(event) {
    if (event.ctrlKey || event.metaKey) {
      switch (String.fromCharCode(event.which).toLowerCase()) {
      case 's':
        event.preventDefault();
        this.save();
        break;
      }
    }
  }

  save() {
    if (this.monaco) {
      const model = this.monaco.current.editor.getModel();
      const value = model.getValue();
      const file = new Blob([value], {
        type: 'application/javascript'
      });
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, 'project.js');
      } else {
        const a = document.createElement('a');
        const url = URL.createObjectURL(file);
        a.href = url;
        a.download = 'project.js';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        });
      }
    }
  }

  componentDidMount() {
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'hidden';
    document.addEventListener('keydown', this.keyDown);
    this.setState({
      monaco: (
        <MonacoEditor
          ref={this.monaco}
          language="javascript"
          theme="vs-dark"
          defaultValue={this.props.default}
          options={{
            automaticLayout: true
          }} />
      )
    });
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDown);
  }

  render() {
    return (
      <GlobalLayout locale={this.props.locale}>
        <FormattedMessage id="pages.tutorials.pagename">
          {(title) => (
            <Navigation title={title} />
          )}
        </FormattedMessage>
        <div className="container-container">
          <div className="main-content-container container left-container">
            {this.props.children}
          </div>
          <div className="main-content-container container right-container">
            {this.state.monaco}
          </div>
        </div>
      </GlobalLayout>
    );
  }
}

TutorialsLayout.propTypes = {
  children: PropTypes.any,
  locale: PropTypes.string,
  default: PropTypes.string,
};

export default TutorialsLayout;
