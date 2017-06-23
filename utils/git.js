'use strict';

const git = require('simple-git');
const cp = require('child_process');

function repositoryExists(repoUrl, cb) {
    cp.exec(`git ls-remote ${repoUrl} HEAD`, error => cb(!error));
}

function getNameFromGitUrl(url) {
    const gitNameReg = /([^/]+)\.git$/;

    return gitNameReg.exec(url)[1];
}

function gitPull(path) {
    git(path).pull('origin', 'master', {
        '-s recursive': null, '-X ours': null
    });
}

module.exports = {
    getNameFromGitUrl,
    repositoryExists,
    gitPull
};
