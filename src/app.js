
import fs from "fs";
import path from "path";

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';

import shell from 'shelljs';

import inquirer from 'inquirer';

const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const success = chalk.greenBright;
const info = chalk.bold.blue;

import * as CONST from './data/constant.js';
import * as DATA from './data/data.js';

import ProjectExample from './ProjectExample.js';



export default class App {
    constructor( appRoot, projectRoot, packJSON, osName ) {

        this.appRoot = appRoot;
        this.projectRoot = projectRoot;
        this.packJSON = packJSON;   
        this.osName = osName;

        console.log( [ 
            'appRoot: ' + this.appRoot
            , 'projectRoot: ' + this.projectRoot 
            ].join("\n") );

        this.init();

        console.log();
    }

    init() {
        clear();

        this.project;
        this.prompt = inquirer.createPromptModule();
        this.welcome();

        this.system = 1;

        /*
        shell.exec(  [ 
            'cd ' + this.projectRoot
            , 'git config core.fileMode false && git config core.autocrlf false'
        ].join('&&') );
        */

        console.log();

        new Promise( function( resolve ){
            setTimeout( resolve, 1);
        //}).then( () => {
/*            return this.getSourceDir();*/
        //}).then( () => {
            //return this.getOutputDir();
        }).then( () => {
            return this.getCityName();
        }).then( () => {
            return this.getBuildingDir();
        }).then( () => {
            return this.getBuildingParams();
        }).then( () => {
            return this.getOutputBuildingDir();
        }).then( () => {
            this.isGood = 1;

            //this.isGood = 0;
            return new Promise( function( resolve ){
                setTimeout( resolve, 1);
            });
        }).then( () => {
			if( !this.isGood ){
				this.confirm = 'no';
				return;
			}
            return this.getConfirm();
        }).then( ()=>{
			 if( this.confirm == 'no' ) return;
            this.project = new ProjectExample( this );
        });
    }

    async getOutputBuildingDir(){
        let data = await this.prompt( DATA.Q_OUTPUT_BUILDING_DIR );
        this.output_building_dir  = data.output_building_dir;
    }

    async getBuildingParams(){
        let data = await this.prompt( DATA.Q_BUILDING_PARAMS );
        this.building_params = data.building_params;
    }

    async getBuildingDir(){
        let data = await this.prompt( DATA.Q_BUILDING_DIR );
        this.building_dir  = data.building_dir;
    }

    async getCityName(){
        let data = await this.prompt( DATA.Q_CITY_NAME );
        this.city_name  = data.city_name;
    }

    async getSourceDir(){
        let data = await this.prompt( DATA.Q_SOURCE_DIR);
        this.source_dir = data.source_dir;
    }

    async getOutputDir(){
        let data = await this.prompt( DATA.Q_OUTPUT_DIR);
        this.output_dir = data.output_dir;
    }

    async getConfirm(){
        let data = await this.prompt( DATA.Q_CONFIRM );
        this.confirm = data.confirm;
    }

    async getExample(){
        let data = await this.prompt( DATA.Q_EXAMPLE );
        this.example = data.example;
    }
    fileExists( file ) {
        return fs.existsSync( file );
    }

    welcome() {
        console.log(
          chalk.yellow(
            figlet.textSync( CONST.APPNAME, { horizontalLayout: 'full' })
          )
        );
        console.log(
          chalk.bold.yellow(
            `${CONST.TITLE} - ${this.packJSON.version}`
          )
        );
        console.log();
        console.log( info( `github: ${this.packJSON.repository.url}` ) );

        console.log();
        console.log( info( '使用:' ) );
        console.log( info( '     方法1: 使用说明' ) );
        console.log();
        console.log( info( '     方法2: 使用说明' ) );
        console.log();
    }

}

export function init( APP_ROOT, PROJECT_ROOT, packJSON ){
    let AppIns = new App( APP_ROOT, PROJECT_ROOT, packJSON ); 
}

