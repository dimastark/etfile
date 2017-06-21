'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function readSettings() {
    const settingsPath = path.join(__dirname, '../services/settings.json');
    try {
        return JSON.parse(fs.readFileSync(settingsPath));
    } catch (err) {
        console.error('Settings file not exists');
        process.exit(1);
    }
};
