'use strict';

const cote = require('cote');

const requester = new cote.Requester({ name: 'git client requester' });
const responder = new cote.Responder({ name: 'git client responder' });

responder.on('update files', (req, cb) => {

});

responder.on('sync files', (req, cb) => {

});
