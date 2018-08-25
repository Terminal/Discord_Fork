const { showModal, closeModal } = require('./../helpers/modals');

import * as monaco from 'monaco-editor';

const EDITOR_NOTE = `
---
This pull request was created using the https://discordbots.co.uk/edit menu.
`

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
  const mergeBox = document.getElementById('merge-editor');

  const exportButton = document.getElementById('export-button');
  const mergeButton = document.getElementById('merge-button');
  const mergeModalSubmitButton = document.getElementById('merge-modal-submit-button');

  const mergeModal = document.getElementById('merge-modal');
  const mergeModalContent = document.getElementById('merge-modal-content');
  const mergeModalLoadingContent = document.getElementById('merge-modal-loading-content');
  const mergeModalLogs = document.getElementById('merge-modal-logs');

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
    value: appdata.strings.edit.default,
    language: 'markdown',
    automaticLayout: true
  });

  const exportEditor = monaco.editor.create(exportBox, {
    language: 'markdown',
    automaticLayout: true,
    readOnly: true
  });

  const mergeEditor = monaco.editor.create(mergeBox, {
    language: 'markdown',
    automaticLayout: true
  });
  
  const getContents = () => {
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
    return output;
  };

  const exportPage = () => {
    showModal('export-modal');
    exportEditor.setValue(getContents());
  };

  const pullLog = (text) => {
    mergeModalLogs.innerText += `${text}\n`;
  };

  editor.addAction({
    id: 'exportMarkdown',
    label: 'Export Bot Page',
    run: () => {
      exportPage(exportEditor);
    }
  });

  editor.addAction({
    id: 'mergeMarkdown',
    label: 'Create a pull request',
    run: () => {
      showModal('merge-modal');
    }
  });

  exportButton.addEventListener('click', () => {
    exportPage(exportEditor);
  });

  mergeButton.addEventListener('click', () => {
    showModal('merge-modal');
  });

  // TODO: use async
  mergeModalSubmitButton.addEventListener('click', () => {
    mergeModal.dataset.noclose = 'true';
    mergeModalContent.classList.add('hidden');
    mergeModalLoadingContent.classList.remove('hidden');

    const terminalOwner = mergeModal.dataset.owner;
    const terminalRepoName = mergeModal.dataset.repo;
    const terminalRepo = github.getRepo(terminalOwner, terminalRepoName);

    pullLog(`Forking ${terminalOwner}/${terminalRepoName} on GitHub`);
    terminalRepo.fork((error1, forkData) => {
      if (error1) {
        pullLog(error1);
      } else {
        const userOwner = forkData.owner.login;
        const userRepoName = forkData.name;
        const userRepo = github.getRepo(userOwner, userRepoName);

        const writeToFork = () => {
          pullLog('Writing file to GitHub');
          const siteLang = document.documentElement.getAttribute('lang');
          const folder = siteLang === 'en' ? '' : `${siteLang}/`;
          userRepo.writeFile(forkData.default_branch, `_bots/${folder}${clientId.value.replace(/[^0-9]/g, '')}.md`, getContents(), `Adding ${name.value} via Discord_Fork Editor`, {}, (error2) => {
            if (error2) {
              pullLog(error2);
            } else {
              pullLog('Creating pull request');
              terminalRepo.createPullRequest({
                title: `Adding ${name.value}`,
                head: `${userOwner}:master`,
                base: 'master',
                body: mergeEditor.getValue() + EDITOR_NOTE,
                maintainer_can_modify: true
              }, (error3, pullRequestData) => {
                if (error3) {
                  pullLog(error3);
                } else {
                  pullLog('Successfully created pull request!');
                  window.location.href = pullRequestData.html_url;
                }
              })
            }
          });
        }

        terminalRepo.listCommits({}, (error2, terminalCommits) => {
          if (error2) {
            pullLog(error2);
          } else {
            userRepo.listCommits({}, (error3, userCommits) => {
              if (error3) {
                pullLog(error3);
              } else {
                // There is a difference in SHA commits.
                // Update the head of our fork
                if (terminalCommits[0].sha !== userCommits[0].sha) {
                  pullLog(`Latest Terminal commit ${terminalCommits[0].sha} differs from fork commit ${userCommits[0].sha} - Updating head.`)
                  userRepo.updateHead('heads/master', terminalCommits[0].sha, true, (error4) => {
                    if (error4) {
                      pullLog(error4);
                    } else {
                      writeToFork();
                    }
                  })
                } else {
                  writeToFork();
                }
              }
            });
          }
        });
      }
    });
  });
}
