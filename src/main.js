#! /usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path');
const shelljs = require( 'shelljs' );
const get_args = require('./utils/get_args.js');

let osInfo = shelljs.exec( 'cat /etc/os-release', { silent: true } );
let osName = '';
/ubuntu/i.test( osInfo ) && ( osName = 'Ubuntu' );
/centos/i.test( osInfo ) && ( osName = 'Centos' );

if( !osName ){	
	console.log( '不支持的系统' );
	process.exit( 0 );
}

const APP_ROOT = path.resolve(__dirname, '..');
let PROJECT_ROOT = process.env.PWD;

let args = get_args(process);
if( args.length && /\//.test( args[0] ) ){
    PROJECT_ROOT = path.resolve( args[0] );
}
const pack = fs.readFileSync( `${APP_ROOT}/package.json`, 'utf8' );
const packJSON = JSON.parse( pack );

require('babel-core/register');
const init = require( './app' ).init;
init( APP_ROOT, PROJECT_ROOT, packJSON, osName );
