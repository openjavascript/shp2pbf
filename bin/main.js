#! /usr/bin/env node
'use strict';

var fs = require('fs');
var os = require('os');
var path = require('path');
var shelljs = require('shelljs');
var get_args = require('./utils/get_args.js');

var osInfo = shelljs.exec('cat /etc/os-release', { silent: true });
var osName = '';
/ubuntu/i.test(osInfo) && (osName = 'Ubuntu');
/centos/i.test(osInfo) && (osName = 'Centos');

if (!osName) {
	console.log('不支持的系统');
	process.exit(0);
}

var APP_ROOT = path.resolve(__dirname, '..');
var PROJECT_ROOT = process.env.PWD;

var args = get_args(process);
if (args.length && /\//.test(args[0])) {
	PROJECT_ROOT = path.resolve(args[0]);
}
var pack = fs.readFileSync(APP_ROOT + '/package.json', 'utf8');
var packJSON = JSON.parse(pack);

require('babel-core/register');
require("babel-polyfill");
var init = require('./app').init;
init(APP_ROOT, PROJECT_ROOT, packJSON, osName);