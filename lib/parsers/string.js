'use strict';

var _ = require('underscore');

function parse(data) {
    data = data.toString();
    var parts = data.split('\n');
    return _(parts).initial();
}

module.exports = {
    parse: parse
};
