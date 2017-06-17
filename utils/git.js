'use strict';

const cp = require('child_process');

function repositoryExists(repoUrl, cb) {
    cp.exec(`git ls-remote ${repoUrl} HEAD`, error => cb(!error));
}

module.exports = {
    repositoryExists
};
