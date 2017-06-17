'use strict';

const chokidar = require('chokidar');
const Service = require('../service');

const fsService = new Service('file system events proxy');

const path = process.argv[2];
const repo = process.argv[3];

if (!path || !repo) {
    console.error('Path or repository not provided');
    process.exit(1);
}

fsService.requester.send({ type: 'give me name', path, repo }, req => {
    const name = req.name;

    chokidar.watch(path).on('all', event => {
        fsService.publisher.publish('fs event', {name, event});
    });

    fsService.subscriber.on(name, req => {
        if (req.method === 'die') {
            process.exit(0);
        }
        if (req.method === 'syn') {
            console.log('syn');
        }
    });
});
