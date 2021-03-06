'use strict';

const chokidar = require('chokidar');

const Service = require('../service');
const gitUtils = require('../utils/git');

const fsService = new Service('file system events proxy', {
    requester: {key: 'arbitration'},
    subscriber: {key: 'conversation'}
});

const path = process.argv[2];
const repo = process.argv[3];

if (!path || !repo) {
    console.error('Path or repository not provided');
    process.exit(1);
}

fsService.requester.send({ type: 'give me name', path, repo }, req => {
    const name = req.name;

    chokidar.watch(path).on('all', (event, path) => {
        fsService.requester.send(
            { type:'fs event', name, path, event, repo },
            console.log
        );
    });

    fsService.subscriber.on(name, req => {
        if (req.method === 'die') {
            process.exit(0);
        }
    });
});

setInterval(gitUtils.pull.bind(null, path), 10000);
