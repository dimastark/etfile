'use strict';

const Service = require('../service');
const gitUtils = require('../utils/git');

const gitClientService = new Service('git client', {
    responder: {key: 'telling'}
});

gitClientService.responder.on('git add', (req, cb) => {
    cb('ok');
    gitUtils.add(req.path);
});

gitClientService.responder.on('git commit', (req, cb) => {
    cb('ok');
    gitUtils.commit(req.path, 'Changes');
});

gitClientService.responder.on('git push', (req, cb) => {
    cb('ok');
    gitUtils.pull(req.path);
    gitUtils.push(req.path);
});
