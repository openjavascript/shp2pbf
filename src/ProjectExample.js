
import fs from "fs-extra";
import path from "path";

import chalk from 'chalk';
import clear from 'clear';

const shell = require( 'shelljs' );
const glob = require("glob");

const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const success = chalk.greenBright;
const info = chalk.bold.blue;


import Project from './Project.js';

export default class ProjectExample extends Project {
    constructor( app ){
        super( app );
    }

    init() {
        //console.log( 'ProjectExample', Date.now() )
        //this.initMethod();
        this.cleanOutput();
        this.cleanBuildingKml();
        this.initBuilding();
        this.initRoad();
        this.initWater();
    }

    initWater(){
        if( !( this.app.waterList && this.app.waterList.length) ) return;

        this.app.waterList.map( ( item ) => {
            let pattern = `${item.source}/**/*.kml`;
            let match = glob.sync( pattern );
            if( !match.length ){
                console.log( warning( `water path: ${item.source} do not have any .kml`) );
                return;
            }
            fs.ensureDirSync( item.output );
            console.log( match );

            match.map( ( filename ) => {
				let layer;
                let cmd = `ogrinfo -ro -so -q ${filename} | cut -d ' ' -f 2`;
				let tmp = shell.exec( cmd, { silent: true } );
				layer = tmp.stdout.trim().split( '\n' );
				let dir = path.dirname( filename );
			
				layer.map( ( layerItem ) => {
					if( !layerItem ) return;

					let kml_desc = this.kmlDesc( layerItem );
					let geojson = `${dir}/${kml_desc}.geojson`;
					let cmd = `ogr2ogr -f "GeoJSON" -nln ${kml_desc} "${geojson}" ${filename} "${layerItem}"`;
					shell.exec( cmd );
				});
            });

            pattern = `${item.source}/**/*.geojson`;
            match = glob.sync( pattern );
            if( !match.length ){
                console.log( warning( `building path: ${item.source} do not have any .geojson `) );
                return;
            }
            fs.ensureDirSync( item.output );
            let cmd = `tippecanoe --output-to-directory=${item.output} ${this.app.water_params} ${match.join(' ')}`;
            console.log( info( cmd ) );
			shell.exec( cmd );
        });
    }


    initRoad(){
        if( !( this.app.roadList && this.app.roadList.length) ) return;

        this.app.roadList.map( ( item ) => {
            let pattern = `${item.source}/**/*.kml`;
            let match = glob.sync( pattern );
            if( !match.length ){
                console.log( warning( `road path: ${item.source} do not have any .kml`) );
                return;
            }
            fs.ensureDirSync( item.output );
            console.log( match );

            match.map( ( filename ) => {
				let layer;
                let cmd = `ogrinfo -ro -so -q ${filename} | cut -d ' ' -f 2`;
				let tmp = shell.exec( cmd, { silent: true } );
				layer = tmp.stdout.trim().split( '\n' );
				let dir = path.dirname( filename );
			
				layer.map( ( layerItem ) => {
					if( !layerItem ) return;

					let kml_desc = this.kmlDesc( layerItem );
					let geojson = `${dir}/${kml_desc}.geojson`;
					let cmd = `ogr2ogr -f "GeoJSON" -nln ${kml_desc} "${geojson}" ${filename} "${layerItem}"`;
					shell.exec( cmd );
				});
            });

            pattern = `${item.source}/**/*.geojson`;
            match = glob.sync( pattern );
            if( !match.length ){
                console.log( warning( `building path: ${item.source} do not have any .geojson `) );
                return;
            }
            fs.ensureDirSync( item.output );
            let cmd = `tippecanoe --output-to-directory=${item.output} ${this.app.road_params} ${match.join(' ')}`;
            console.log( info( cmd ) );
			shell.exec( cmd );
        });
    }

    kmlDesc( item ){
		let kml_desc = 'unknown';
		switch( item ){
			case "道路": kml_desc="road"; break;
			case "高速公路": kml_desc="highway"; break;
			case "主要道路（国道、省道、环路等）": kml_desc="main_road"; break;
			case "二级道路（城市主干道等）": kml_desc="second_road"; break;
			case "其他道路（城镇街道、乡村道路等）": kml_desc="other_road"; break;
			case "铁路": kml_desc="railway"; break;
			case "水系": kml_desc="water_system"; break;
			case "水域": kml_desc="water_body"; break;
		} 

		return kml_desc;
    }

    initBuilding(){
        if( !( this.app.buildingList && this.app.buildingList.length) ) return;
        return;

        this.app.buildingList.map( ( item ) => {
            let pattern = `${item.source}/**/*.geojson`;
            let match = glob.sync( pattern );
            if( !match.length ){
                console.log( warning( `building path: ${item.source} do not have any .geojson `) );
                return;
            }
            fs.ensureDirSync( item.output );
            let cmd = `tippecanoe --output-to-directory=${item.output} ${this.app.building_params} ${match.join(' ')}`;
            console.log( info( cmd ) );
            shell.exec( cmd );
        });
    }

    cleanBuildingKml() {
        let cmd = `${path.resolve( this.app.projectRoot, this.app.building_dir)}/*.kml`;
        shell.rm( '-rf', cmd );
    }

    cleanOutput(){
		let cmd = '';
		
		if( this.app.output_building_dir ){
			cmd = `${path.resolve( this.app.projectRoot, this.app.output_building_dir)}/*`;
			shell.rm( '-rf', cmd );
		}
		
		if( this.app.output_road_dir ){
			cmd = `${path.resolve( this.app.projectRoot, this.app.output_road_dir)}/*`;
			shell.rm( '-rf', cmd );
		}

		if( this.app.output_water_dir ){
			cmd = `${path.resolve( this.app.projectRoot, this.app.output_water_dir)}/*`;
			shell.rm( '-rf', cmd );
		}

    }

}
