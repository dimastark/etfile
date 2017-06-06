'use strict';

const cote = require('cote');

/**
 * Make handlers for micro service
 * @param {String} name - name of service
 * @param {String} key - key for service
 * @returns {[cote.Requester, cote.Responder]}
 */
function makeHandlers({ name, key = 'etfile' }) {
    return [
        makeRequester({ name, key }),
        makeResponder({ name, key })
    ];
}

/**
 * Make cote.Requester for micro service
 * @returns {cote.Requester}
 */
function makeRequester({ name, key = 'etfile' }) {
    return new cote.Requester({ name: `${name} requester`, key });
}

/**
 * Make cote.Responder for micro service
 * @returns {cote.Responder}
 */
function makeResponder({ name, key = 'etfile' }) {
    return new cote.Responder({ name: `${name} responder`, key });
}

module.exports = {
    makeHandlers,
    makeRequester,
    makeResponder
};
