#! /usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');

var get_args = require('./utils/get_args.js');

var APP_ROOT = path.resolve(__dirname, '..');
var PROJECT_ROOT = process.env.PWD;

var args = get_args(process);

if (args.length && /\//.test(args[0])) {
    PROJECT_ROOT = path.resolve(args[0]);
}

var pack = fs.readFileSync(APP_ROOT + '/package.json', 'utf8');
var packJSON = JSON.parse(pack);

/*
console.log( args, PROJECT_ROOT );
return;
*/

require('babel-core/register');
var init = require('./app').init;
init(APP_ROOT, PROJECT_ROOT, packJSON);