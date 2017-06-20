'use strict';

const cp = require('child_process');

function repositoryExists(repoUrl, cb) {
    cp.exec(`git ls-remote ${repoUrl} HEAD`, error => cb(!error));
}

function getNameFromGitUrl(url) {
    const gitNameReg = /([^/]+)\.git$/;

    return gitNameReg.exec(url)[1];
}

module.exports = {
    getNameFromGitUrl,
    repositoryExists
};
