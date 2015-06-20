'use strict';

var StringParser = require('../parsers/string');

module.exports = function () {
    this._process = function () {
        return {
            command: '_projects',
            parser: StringParser
        };
    };

    this.all = function () {
        return this._process();
    };

    this.where = function (params) {
        return this._process(params);
    };
};

