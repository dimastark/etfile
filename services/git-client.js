'use strict';

const Service = require('../service');
const gitClientService = new Service('git client', {
    responder: {key: 'telling'}
});

gitClientService.responder.on('update files', (req, cb) => {

});

gitClientService.responder.on('synchronize files', (req, cb) => {

});
