'use strict';

const net = require("net");

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
    ifPortInUse(7000, cb, endCb);
}

function ifGitClientNotStarted(cb, endCb) {
    ifPortNotInUse(7000, cb, endCb);
}

function exitIfArbitratorNotStarted(endCb) {
    ifArbitratorNotStarted(() => {
        console.error('Arbitrator not started');
        console.info('Please run settings-wizard');
        process.exit();
    }, endCb);
}

module.exports = {
    exitIfArbitratorNotStarted,
    ifArbitratorNotStarted,
    ifGitClientNotStarted,
    ifArbitratorStarted,
    ifGitClientStarted,
    ifPortNotInUse,
    ifPortInUse,
    portInUse
};
