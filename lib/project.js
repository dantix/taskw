'use strict';

var Query = require('./query');

function where(options) {
    return new Query('Project').where(options);
}

function all() {
    return new Query('Project').all();
}

module.exports = {
    where: where,
    all: all
};

