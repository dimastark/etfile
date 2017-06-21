'use strict';

const fs = require('fs');
const path = require('path');
const faker = require('faker');

const Service = require('../service');
const readSettings = require('../utils/settings');

const arbitrationService = new Service('arbitrator', {
    responder: {key: 'arbitration'},
    publisher: {key: 'conversation'},
    requester: {key: 'telling'}
});
const settings = readSettings();
const fsServices = {};
const commits = {};

arbitrationService.responder.on('give me name', (req, cb) => {
    const name = nextName();
    fsServices[name] = { path: req.path, repo: req.repo, params: {} };
    commits[name] = { count: 0, lastPath: '' };
    cb({ name });
});

arbitrationService.responder.on('tell me all', (req, cb) => {
    cb(fsServices);
});

arbitrationService.requester.on('tell me', (req, cb) => {
    cb(fsServices[req.name]);
});

arbitrationService.responder.on('kill please', (req, cb) => {
    if (fsServices.hasOwnProperty(req.name)) {
        delete fsServices[req.name];
        arbitrationService.publisher.publish(req.name, {method: 'die'});
        cb('ok');
    } else {
        cb('not started')
    }
});

arbitrationService.responder.on('fs event', (req, cb) => {
    cb('ok');
    if (req.event === 'add' || req.event === 'addDir') {
        arbitrationService.requester.send({
            type: 'git add',
            path: fsServices[req.name].path
        });
    } else {
        handleEvent(req);
    }
});

function nextName() {
    let name = faker.name.firstName(null);
    while (fsServices[name]) {
        name = faker.name.firstName(null);
    }

    return name;
}

function handleEvent(event) {
    const commitsObj = commits[event.name];
    const fsServiceObj = fsServices[event.name];

    const isSmartMode = settings.smartMode;
    const isPathEqual = event.path === commitsObj.lastPath;
    const needCommit = commitsObj.count % settings.commitFrequency === 0;
    const needPush = commitsObj.count % settings.pushFrequency === 0;

    if (isSmartMode && isPathEqual || !isSmartMode && needCommit) {
        arbitrationService.requester.send({
            type: 'git commit',
            path: fsServiceObj.path
        });
    }

    if (isSmartMode && !isPathEqual || !isSmartMode && needPush) {
        arbitrationService.requester.send({
            type: 'git push',
            path: fsServiceObj.path
        });
    }

    commitsObj.count += 1;
    commitsObj.count %= settings.pushFrequency;
    commits[event.name].lastPath = event.path;
}
