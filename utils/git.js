'use strict';

const cp = require('child_process');

function repositoryExists(repoUrl, cb) {
    cp.exec(`git ls-remote ${repoUrl} HEAD`, error => cb(!error));
}

function getNameFromGitUrl(url) {
    const gitNameReg = /([^/]+)\.git$/;

    return gitNameReg.exec(url)[1];
}

function add(path) {
    cp.execSync(`git -C "${path}" add .`);
}

function commit(path, message) {
    cp.execSync(`git -C "${path}" commit . -m ${message}`);
}

function pull(path) {
    cp.execSync(`git -C "${path}" pull -s recursive -X ours`);
}

function push(path) {
    cp.execSync(`git -C "${path}" push`);
}

module.exports = {
    commit, pull, push, add,
    getNameFromGitUrl,
    repositoryExists
};
