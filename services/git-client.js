'use strict';

const Service = require('./service').Service;
const gitClientService = new Service('git client');

gitClientService.responder.on('update files', (req, cb) => {

});

gitClientService.responder.on('synchronize files', (req, cb) => {

});
