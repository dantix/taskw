'use strict';

var Query = require('./query');

function where(options) {
    return new Query('Task').where(options);
}

function all() {
    return new Query('Task').all();
}

module.exports = {
    where: where,
    all: all
};
