'use strict';

const git = require('simple-git');
const Service = require('../service');
const gitPull = require('../utils/git').gitPull;

const gitClientService = new Service('git client', {
    responder: {key: 'telling'}
});

gitClientService.responder.on('git add', (req, cb) => {
    cb('ok');
    git(req.path).add('.');
});

gitClientService.responder.on('git commit', (req, cb) => {
    cb('ok');
    git(req.path).commit(`Change ${req.file}`);
});

gitClientService.responder.on('git push', (req, cb) => {
    cb('ok');
    gitPull(req.path);
    git(req.path).push();
});
