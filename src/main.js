#! /usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path');
const shell = require( 'shelljs' );
const get_args = require('./utils/get_args.js');

let osInfo = shell.exec( 'cat /etc/os-release', { silent: true } );
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
let cityName = '';
if( args.length ) {
    if( /\//.test( args[0] ) ){
        PROJECT_ROOT = path.resolve( args[0] );
    }else if( cityName = args[0].trim() ){
        console.log( cityName );
    }
}

const pack = fs.readFileSync( `${APP_ROOT}/package.json`, 'utf8' );
const packJSON = JSON.parse( pack );

//process.exit( 0 );

require('babel-core/register');
require("babel-polyfill");
const init = require( './app' ).init;
init( APP_ROOT, PROJECT_ROOT, packJSON, osName, cityName );
