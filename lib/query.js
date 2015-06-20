'use strict';

var q = require('q');
var _ = require('underscore');

var spawn = require('child_process').spawn;

var TaskQuery = require('./queries/task');
var ProjectQuery = require('./queries/project');

var binary = require('../config').binary;

var Query = function (type) {
    this._type = type;

    this.innerQuery = null;
    switch (type) {
        case 'Task':
            this.innerQuery = new TaskQuery();
            break;
        case 'Project':
            this.innerQuery = new ProjectQuery();
            break;
        //case 'Tag':
            //this.innerQuery = new TagQuery();
            //break;
        default:
            throw new Error('Unknown type');
    }

    this._process = function(params, querySpecific) {
        var pairs = _(params).pairs();

        var args = _(pairs).map(function (pair) {
            var entity = pair[0];
            var options = pair[1];

            var queryString = options;
            if (typeof options === 'object' ) {
                entity += '.' + options.predicate;
                queryString = options.value;
            }

            return entity + ':' + queryString;
        });

        args.push(querySpecific.command, 'rc.json.array=on');

        var promise = this._runCommand(args, querySpecific);

        return promise;
    };

    this._runCommand = function(args, querySpecific) {
        var deffered = q.defer();

        var taskProcess = spawn(binary, args);

        taskProcess.stdout.on('data', function(data) {
            var result = querySpecific.parser.parse(data);

            deffered.resolve(result);
        });

        taskProcess.stderr.on('data', function(data) {
            deffered.reject(data);
        });

        return deffered.promise;
    };

    this.all = function () {
        var querySpecific = this.innerQuery.all();
        return this._process({}, querySpecific);
    };

    this.where = function (params) {
        var querySpecific = this.innerQuery.where(params);
        return this._process(params, querySpecific);
    };
};

module.exports = Query;
