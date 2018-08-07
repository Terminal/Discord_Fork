const { showModal, closeModal } = require('./../helpers/modals');

import * as monaco from 'monaco-editor';

module.exports = (github, localStorage) => {
  if (!github) {
    localStorage.setItem('return', '/edit');
    window.location.pathname = '/oauth/login'
  }

  const applicationIdBefore = document.getElementById('application-id-before');
  const applicationIdDisplay = document.getElementById('application-id-display');
  const applicationIdBox = document.getElementById('application-id-box');
  const applicationIdInfo = document.getElementById('application-id-info');
  const monacoEditor = document.getElementById('monaco-editor');

  applicationIdDisplay.addEventListener('click', () => {
    applicationIdBefore.classList.add('hidden');
    applicationIdBox.classList.remove('hidden');
  });

  applicationIdInfo.addEventListener('click', () => {
    showModal('whatis-application-id');
  });

  monaco.editor.create(monacoEditor, {
    value: `# Title

This is a cool bot that you should accept.
Reasons include:

- Being awesome
- Not being un-awesome
- The prefix can be changed to !
`,
    language: 'markdown',
    automaticLayout: true
  });
}
