'use strict';

var JSONParser = require('../parsers/json');

module.exports = function () {
    this._process = function () {
        return {
            command: 'export',
            parser: JSONParser
        };
    };

    this.all = function () {
        return this._process();
    };

    this.where = function () {
        return this._process();
    };
};
