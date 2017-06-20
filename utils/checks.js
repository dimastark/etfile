'use strict';

const net = require("net");
const git = require('./git');

function portInUse(port, cb) {
    const client = new net.Socket();
    client.once('connect', () => cb(true));
    client.once('error', () => cb(false));
    client.connect({port});
}

function ifPortInUse(port, cb, endCb) {
    portInUse(port, inUse => {
        if (inUse) {
            cb();
        }
        if (endCb && !inUse) {
            endCb();
        }
    });
}

function ifPortNotInUse(port, cb, endCb) {
    portInUse(port, inUse => {
        if (!inUse) {
            cb();
        }
        if (endCb && inUse) {
            endCb();
        }
    });
}

function ifArbitratorStarted(cb, endCb) {
    ifPortInUse(8000, cb, endCb);
}

function ifArbitratorNotStarted(cb, endCb) {
    ifPortNotInUse(8000, cb, endCb);
}

function ifGitClientStarted(cb, endCb) {
    ifPortInUse(8001, cb, endCb);
}

function ifGitClientNotStarted(cb, endCb) {
    ifPortNotInUse(8001, cb, endCb);
}

function exitIfArbitratorNotStarted(endCb) {
    ifArbitratorNotStarted(() => {
        console.error('Arbitrator not started');
        console.info('Please run setup-wizard');
        process.exit();
    }, endCb);
}

function ifRepositoryNotExists(repo, cb, endCb) {
    git.repositoryExists(repo, exists => {
        if (!exists) {
            cb();
        }
        if (endCb && exists) {
            endCb();
        }
    });
}

module.exports = {
    exitIfArbitratorNotStarted,
    ifArbitratorNotStarted,
    ifGitClientNotStarted,
    ifRepositoryNotExists,
    ifArbitratorStarted,
    ifGitClientStarted,
    ifPortNotInUse,
    ifPortInUse,
    portInUse
};
