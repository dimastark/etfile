'use strict';

function logRequest(requesterName, request, result) {
    const requestStr = JSON.stringify(request);
    const resultStr = JSON.stringify(result);

    console.log(
        `Request: ${requestStr} 
         from ${requesterName}
         -> ${resultStr}`
    );
}

module.exports = { logRequest };
