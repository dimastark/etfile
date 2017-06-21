'use strict';

const Service = require('../service');
const readSettings = require('../utils/settings');

const gitClientService = new Service('git client', {
    responder: {key: 'telling'}
});
const settings = readSettings();

gitClientService.responder.on('git add', (req, cb) => {

});

gitClientService.responder.on('git commit', (req, cb) => {

});
