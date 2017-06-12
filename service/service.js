'use strict';

const cote = require('cote');

class Service {
    constructor(name) {
        this.name = name;
    }

    _get(part) {
        const prop = `_${part}`;

        if (!this[prop]) {
            const name = `${this.name} ${part}`;
            this[prop] = new {
                subscriber: cote.Subscriber,
                publisher: cote.Publisher,
                requester: cote.Requester,
                responder: cote.Responder
            }[part]({name});
        }

        return this[prop];
    }

    get subscriber() {
        return this._get('subscriber');
    }

    get publisher() {
        return this._get('publisher');
    }

    get requester() {
        return this._get('requester');
    }

    get responder() {
        return this._get('responder');
    }
}

module.exports = Service;
