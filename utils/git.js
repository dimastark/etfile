'use strict';

const fs = require('fs');
const path = require('path');
const cp = require('child_process');

function repositoryExists(repoUrl, cb) {
    cp.exec(`git ls-remote ${repoUrl} HEAD`, error => cb(!error));
}

function getNameFromGitUrl(url) {
    const gitNameReg = /([^/]+)\.git$/;

    return gitNameReg.exec(url)[1];
}

function add(path_) {
    try {
        cp.execSync(`git -C "${path_}" add .`);
    } catch (err) {
        console.log('Errors');
    }
}

function commit(path_, message) {
    try {
        cp.execSync(`git -C "${path_}" commit . -m ${message}`);
    } catch (err) {
        console.log('Nothing to commit.');
    }
}

function pull(path_) {
    try {
        fs.statSync(path.join(path_, '.git/index.lock'));
    } catch (err) {
        try {
            cp.execSync(`git -C "${path_}" pull -s recursive -X ours`);
        } catch (error) {
            console.log('Git already running.');
        }
    }
}

function push(path_) {
    try {
        cp.execSync(`git -C "${path_}" push`);
    } catch (err) {
        console.log('Errors');
    }
}

module.exports = {
    commit, pull, push, add,
    getNameFromGitUrl,
    repositoryExists
};
