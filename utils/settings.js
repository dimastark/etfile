'use strict';

const fs = require('fs');
const path = require('path');
const trueRe = /^(yes|y|true)$/;

module.exports = function readSettings() {
    const settingsPath = path.join(__dirname, '../services/settings.json');
    try {
        const obj = JSON.parse(fs.readFileSync(settingsPath));

        return {
            smartMode: !!trueRe.exec(obj.smartMode),
            needSquash: !!trueRe.exec(obj.needSquash),
            pushFrequency: Number(obj.pushFrequency),
            commitFrequency: Number(obj.commitFrequency),
        };
    } catch (err) {
        console.error('Settings file not exists');
        process.exit(1);
    }
};
