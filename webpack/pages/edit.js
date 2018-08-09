const { showModal, closeModal } = require('./../helpers/modals');

import * as monaco from 'monaco-editor';

const defaultText = `# Title

This is a cool bot that you should accept.
Reasons include:

- Being awesome
- Not being un-awesome
- The prefix can be changed to !

<!--
  Stan LOONA
  Stan Talent
-->
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
  const applicationId = document.getElementById('application-id');

  const name = document.getElementById('name');
  const prefix = document.getElementById('prefix');
  const invite = document.getElementById('invite');
  const avatar = document.getElementById('avatar');
  const shortDescription = document.getElementById('short-description');
  const support = document.getElementById('support');
  const nsfw = document.getElementById('nsfw');

  const githubBefore = document.getElementById('github-before');
  const githubDisplay = document.getElementById('github-display');
  const githubRepoBox = document.getElementById('github-repo-box');
  const githubOwnerBox = document.getElementById('github-owner-box');
  const githubInfo = document.getElementById('github-info');
  const githubOwner = document.getElementById('github-owner');
  const githubRepo = document.getElementById('github-repo');

  const contents = document.getElementById('contents');
  const exportBox = document.getElementById('export-editor');

  const exportButton = document.getElementById('export-button');

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

  const exportEditor = monaco.editor.create(exportBox, {
    value: defaultText,
    language: 'markdown',
    automaticLayout: true,
    readOnly: true
  });

  const exportPage = () => {
    showModal('export-modal');
    let output = '---\n';
    if (clientId.value) {
      // Export the client_id without any characters
      output += `client_id: ${clientId.value.replace(/[^0-9]/g, '')}\n`;
    }

    if (applicationId.value) {
      output += `application_id: ${applicationId.value.replace(/[^0-9]/g, '')}\n`;
    }

    if (name.value) {
      output += `pagename: '${name.value.replace(/'/g, "''")}'\n`;
    }

    if (shortDescription.value) {
      output += `description: '${shortDescription.value.replace(/'/g, "''")}'\n`;
    }

    if (avatar.value) {
      output += `avatar: '${avatar.value.replace(/'/g, "''")}'\n`;
    }

    if (invite.value) {
      output += `link: '${invite.value.replace(/'/g, "''")}'\n`
    }

    if (githubOwner.value && githubRepo.value) {
      output += `github:\n  owner: '${githubOwner.value}'\n  repo: '${githubRepo.value}'\n`;
    }

    if (prefix.value) {
      output += `prefix: '${prefix.value.replace(/'/g, "''")}'\n`;
    }

    if (support.value) {
      output += `support: '${support.value.replace(/'/g, "''")}'\n`;
    }

    if (nsfw.value === 'false') {
      output += `nsfw: false\n`;
    } else {
      output += `nsfw: true\n`;
    }
    
    output += '---\n';
    output += editor.getValue();

    exportEditor.setValue(output);
  }

  // editor.addAction({
  //   id: 'previewMarkdown',
  //   label: 'Preview Bot Page',
  //   run: () => {
  //     alert('Hello!');
  //   }
  // });

  editor.addAction({
    id: 'exportMarkdown',
    label: 'Export Bot Page',
    run: () => {
      exportPage(exportEditor);
    }
  });

  exportButton.addEventListener('click', () => {
    exportPage(exportEditor);
  });
}
