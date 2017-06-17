'use strict';

const faker = require('faker');
const Service = require('../service');

const arbitrationService = new Service('arbitrator');
const fsServices = {};

arbitrationService.responder.on('give me name', (req, cb) => {
    const name = nextName();
    fsServices[name] = { path: req.path, repo: req.repo, params: {} };
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

arbitrationService.responder.on('sync please', (req, cb) => {
    if (fsServices.hasOwnProperty(req.name)) {
        arbitrationService.publisher.publish(req.name, {method: 'syn'});
        cb('ok');
    } else {
        cb('not started')
    }
});

function nextName() {
    let name = faker.name.firstName(null);
    while (fsServices[name]) {
        name = faker.name.firstName(null);
    }

    return name;
}
