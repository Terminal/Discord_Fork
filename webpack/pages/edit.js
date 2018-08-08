const { showModal, closeModal } = require('./../helpers/modals');

import * as monaco from 'monaco-editor';

const defaultText = `
# Title

This is a cool bot that you should accept.
Reasons include:

- Being awesome
- Not being un-awesome
- The prefix can be changed to !

<!-- Stan LOONA -->
`;

module.exports = (github, localStorage) => {
  if (!github) {
    localStorage.setItem('return', '/edit');
    window.location.pathname = '/oauth/login'
  }

  const clientId = document.getElementById('client-id');

  const applicationIdBefore = document.getElementById('application-id-before');
  const applicationIdDisplay = document.getElementById('application-id-display');
  const applicationIdBox = document.getElementById('application-id-box');
  const applicationIdInfo = document.getElementById('application-id-info');

  const githubBefore = document.getElementById('github-before');
  const githubDisplay = document.getElementById('github-display');
  const githubRepoBox = document.getElementById('github-repo-box');
  const githubOwnerBox = document.getElementById('github-owner-box');
  const githubInfo = document.getElementById('github-info');

  const contents = document.getElementById('contents');

  applicationIdDisplay.addEventListener('click', () => {
    applicationIdBefore.classList.add('hidden');
    applicationIdBox.classList.remove('hidden');
  });

  githubDisplay.addEventListener('click', () => {
    // Hidden isn't good enough for ModestaCSS - Needs to be destroyed
    // githubBefore.classList.add('hidden');
    githubBefore.parentElement.removeChild(githubBefore);

    githubRepoBox.classList.remove('hidden');
    githubOwnerBox.classList.remove('hidden');
  });

  applicationIdInfo.addEventListener('click', () => {
    showModal('whatis-application-id');
  });

  githubInfo.addEventListener('click', () => {
    showModal('whatis-github');
  });

  const editor = monaco.editor.create(contents, {
    value: defaultText,
    language: 'markdown',
    automaticLayout: true
  });

  editor.addAction({
    id: 'previewMarkdown',
    label: 'Preview Bot Page',
    run: () => {
      alert('Hello!');
    }
  });
}
