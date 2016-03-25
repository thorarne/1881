/*jslint devel: true, node: true, nomen: true, plusplus: true, sloppy: true, vars: true, indent: 4, maxerr: 50, es5: true*/
/*jshint multistr: true, esnext: true */
/* global -Promise */


"use strict";

const rp = require('request-promise');
const qs = require('qs');
const _ = require('underscore');

const base_url = 'https://api.1881bedrift.no/search/search';

const defaultArgs = {
    'userName': '',
    'password': '',
    'msisdn': '',
    'catalogueIds': '',
    'level': 1,
    'query': '',
    'format': 'json'
};


class Client {
    constructor(options) {
        this.options = options;
        if (!this.options.username || !this.options.password || !this.options.msisdn) {
            throw new Error("You have to provide a username, password and msisdn");
        }
    }
    search(params) {
        var args = _.extend(_.clone(defaultArgs), params || {} );
        args.userName = this.options.username;
        args.password = this.options.password;
        args.msisdn = this.options.msisdn;
        var url = base_url + '?' + qs.stringify(args);
        return rp(url);
    }
}

module.exports = Client;
