'use strict';

const chokidar = require('chokidar');

const { logRequest } = require('../utils/log-utils');
const { makeRequester } = require('../utils/handlers-utils');

const directory = process.argv[2];
const serviceName = 'file system service';

const requester = makeRequester({ name: serviceName });

chokidar.watch(directory, {}).on('all', (event, path) => {
    const request = {
        type: 'file system event',
        event, path
    };

    const logCallback = logRequest.bind(null, serviceName, request);
    requester.send(request, logCallback);
});
