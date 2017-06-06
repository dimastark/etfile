'use strict';

const handlersUtils = require('../utils/handlers-utils');

const {requester, responder} = handlersUtils.makeHandlers({ name: 'git client service' });

responder.on('update files', (req, cb) => {

});

responder.on('synchronize files', (req, cb) => {

});
