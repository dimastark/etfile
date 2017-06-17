'use strict';

const chokidar = require('chokidar');
const Service = require('../service/index');

const fsService = new Service('file system events proxy');
const path = process.argv[2];
const repo = process.argv[3];

fsService.requester.send({ type: 'give me name', path, repo }, res => {
    const name = res.name;

    chokidar.watch(path).on('all', event => {
        fsService.publisher.publish('fs event', {name, event});
    });

    fsService.subscriber.on(name, req => {
        if (req.method === 'die') {
            process.exit(0);
        }
    });
});
