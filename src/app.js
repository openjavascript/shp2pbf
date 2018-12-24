
import fs from "fs-extra";
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
    constructor( appRoot, projectRoot, packJSON, osName, cityName ) {

        this.appRoot = appRoot;
        this.projectRoot = projectRoot;
        this.packJSON = packJSON;   
        this.osName = osName;

        this.cmdCityName = cityName;

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
        }).then( () => {
            this.readConfigJson( DATA.Q_CONFIG_FILE[0].default );

            if( this.config ){
                return new Promise( function( resolve ){ setTimeout( resolve, 1); });
            }
            console.log();
            return this.getConfigFile();
        //}).then( () => {
/*            return this.getSourceDir();*/
        //}).then( () => {
            //return this.getOutputDir();
        }).then( () => {
			if( this.config && "city_name" in this.config ){
				this.city_name = this.config.city_name;
                return new Promise( function( resolve ){ setTimeout( resolve, 1); });
			}
            if( this.cmdCityName ){
				this.city_name = this.cmdCityName;
                return new Promise( function( resolve ){ setTimeout( resolve, 1); });
            }
            return this.getCityName();
        }).then( () => {
			if( this.config && this.config.building_dir ){
				this.building_dir = this.config.building_dir;
                return new Promise( function( resolve ){ setTimeout( resolve, 1); });
			}
            return this.getBuildingDir();
        }).then( () => {
			if( this.config && this.config.building_params ){
				this.building_params = this.config.building_params;
                return new Promise( function( resolve ){ setTimeout( resolve, 1); });
			}
            return this.getBuildingParams();
        }).then( () => {
			if( this.config && this.config.output_building_dir ){
				this.output_building_dir = this.config.output_building_dir;
                return new Promise( function( resolve ){ setTimeout( resolve, 1); });
			}
            return this.getOutputBuildingDir();
        }).then( () => {
			if( this.config && this.config.road_dir ){
				this.road_dir = this.config.road_dir;
                return new Promise( function( resolve ){ setTimeout( resolve, 1); });
			}
            return this.getRoadDir();
        }).then( () => {
			if( this.config && this.config.road_params ){
				this.road_params = this.config.road_params;
                return new Promise( function( resolve ){ setTimeout( resolve, 1); });
			}
            return this.getRoadParams();
        }).then( () => {
			if( this.config && this.config.output_road_dir ){
				this.output_road_dir = this.config.output_road_dir;
                return new Promise( function( resolve ){ setTimeout( resolve, 1); });
			}
            return this.getOutputRoadDir();
        }).then( () => {
			if( this.config && this.config.water_dir ){
				this.water_dir = this.config.water_dir;
                return new Promise( function( resolve ){ setTimeout( resolve, 1); });
			}
            return this.getWaterDir();
        }).then( () => {
			if( this.config && this.config.water_params ){
				this.water_params = this.config.water_params;
                return new Promise( function( resolve ){ setTimeout( resolve, 1); });
			}
            return this.getWaterParams();
        }).then( () => {
			if( this.config && this.config.output_water_dir ){
				this.output_water_dir = this.config.output_water_dir;
                return new Promise( function( resolve ){ setTimeout( resolve, 1); });
			}
            return this.getOutputWaterDir();
        }).then( () => {
            this.isGood = 1;

			this.buildingList = this.resolveDir( this.building_dir, this.output_building_dir );
			this.roadList = this.resolveDir( this.road_dir, this.output_road_dir );
			this.waterList = this.resolveDir( this.water_dir, this.output_water_dir );

			let space = '        ';

			console.log( space + 'os-release:', this.osName );
			console.log()
			console.log( space + 'building list:' );
			this.buildingList.map( ( item ) => {
				console.log( space + '    source:', item.source );
				console.log( space + '    output:', item.output );
			});
			console.log()
			console.log( space + 'road list:' );
			this.roadList.map( ( item ) => {
				console.log( space + '    source:', item.source );
				console.log( space + '    output:', item.output );
			});
			console.log()
			console.log( space + 'water list:' );
			this.waterList.map( ( item ) => {
				console.log( space + '    source:', item.source );
				console.log( space + '    output:', item.output );
			});


			console.log();

            //this.isGood = 0;
            return new Promise( ( resolve ) => {
                setTimeout( resolve, 1);
            });
        }).then( () => {

			if( !( 
				shell.which( 'tippecanoe' )  
				&& shell.which( 'ogrinfo' )  
				&& shell.which( 'ogr2ogr' )  
				&& shell.which( 'gzip' )  
				//&& shell.which( 'notexitst' )  
			)){
				return this.getConfirmInstallTools();
			}

            return new Promise( ( resolve ) => {
                setTimeout( resolve, 1);
            });
        }).then( () => {
			if( this.confirm_install_tools && this.confirm_install_tools == 'yes' ){
				let shellFile = `/bin/bash ${this.appRoot}/shell/${this.osName}.sh`;
				shell.exec( shellFile ); 
			}
            return new Promise( ( resolve ) => {
                setTimeout( resolve, 1);
            });
        }).then( () => {
			if( !this.isGood ){
				this.confirm = 'no';
				return;
			}

            if( this.config && this.config.autostart){
                this.confirm = 'yes';
                return new Promise( function( resolve ){
                    setTimeout( resolve, 1);
                });
            }

            return this.getConfirm();
        }).then( ()=>{
			 if( this.confirm == 'no' ) return;
            this.project = new ProjectExample( this );
        });
    }

	resolveDir( src, output ){
		let r = [];
		
		if( this.city_name ){
			r = this.resolveDirCityName( src, output, this.city_name );
		}else{
			r = this.resolveDirBatch( src, output );
		}

		return r;
	}

	resolveDirCityName( src, output, cityName ){
		let r = [];

		let obj = {};
		let tmp = path.resolve( this.projectRoot, src, cityName );
		let postfix = this.getPostfixName( src )

		if( fs.pathExistsSync( tmp ) ){
			obj.source = tmp;
		}

		if( !obj.source ){
			tmp = path.resolve( this.projectRoot, src, cityName +  [ '_', postfix ].join('')  );
			if( fs.pathExistsSync( tmp ) ){
				obj.source = tmp;
			}
		}
		if( !obj.source ) return r;

		obj.cityName = cityName;
		tmp = path.resolve( this.projectRoot, output,  obj.cityName.replace( /shi$/i, '' ) + 'shi'  );

		obj.output = tmp;

		r.push( obj );

		return r;
	}

	getPostfixName( dir ){	
		let r = '';
		r = dir.replace( /\/$/, '').split( '/' )
		r = r[ r.length - 1] || '';

		return r;
	}

	getDirCityName( dir ) {
		let r = '';

		r = dir.replace( /.*\//, '' );
		r = r.replace( /\_.*/, '' );
		r = r.replace( /shi$/, '' );

		return r;
	}

	resolveDirBatch( src, output ){
		let r = [];

		let dir =  path.resolve( this.projectRoot, src ) ;

		let dirList = fs.readdirSync( dir );

		let p = this;

		dirList.map( (item)=> {
			let obj = {};

			obj.source = path.resolve( dir, item );
			obj.cityName = p.getDirCityName( item );
			obj.output = path.resolve( this.projectRoot, output,  obj.cityName.replace( /shi$/i, '' ) + 'shi'  );

			r.push( obj );
		});

		return r;
	}

    async getConfigFile(){
        let data = await this.prompt( DATA.Q_CONFIG_FILE );
        this.config_file = data.config_file;
        this.readConfigJson( this.config_file );
    }

    readConfigJson( fileName ){
        let configFilePath = path.resolve( [ this.projectRoot, fileName ].join('/') );
        if( fs.existsSync( configFilePath ) ){
            this.config = fs.readJsonSync( configFilePath );
        }
    }

    async getOutputWaterDir(){
        let data = await this.prompt( DATA.Q_OUTPUT_WATER_DIR );
        this.output_water_dir  = data.output_water_dir;
    }

    async getWaterParams(){
        let data = await this.prompt( DATA.Q_WATER_PARAMS );
        this.water_params = data.water_params;
    }

    async getWaterDir(){
        let data = await this.prompt( DATA.Q_WATER_DIR );
        this.water_dir  = data.water_dir;
    }


    async getOutputRoadDir(){
        let data = await this.prompt( DATA.Q_OUTPUT_ROAD_DIR );
        this.output_road_dir  = data.output_road_dir;
    }

    async getRoadParams(){
        let data = await this.prompt( DATA.Q_ROAD_PARAMS );
        this.road_params = data.road_params;
    }

    async getRoadDir(){
        let data = await this.prompt( DATA.Q_ROAD_DIR );
        this.road_dir  = data.road_dir;
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

    async getConfirmInstallTools(){
        let data = await this.prompt( DATA.Q_CONFIRM_INSTALL_TOOLS );
        this.confirm_install_tools = data.confirm_install_tools;
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
        console.log( ( '使用:' ) );
        console.log( ( '     方法1: 切换到项目根目录, 然后执行命令 shp2pbf' ) );
        console.log( info('         cd projectRoot && shp2pbf ') ); 
        console.log();
        console.log( ( '     方法2: 使用 shp2pbf 路径, 支持相对路径' ) );
        console.log( info('         shp2pbf /var/www/your_project_root ' ) ); 
        console.log();
    }

}

export function init( APP_ROOT, PROJECT_ROOT, packJSON, osName, cityName ){
    let AppIns = new App( APP_ROOT, PROJECT_ROOT, packJSON, osName, cityName ); 
}

