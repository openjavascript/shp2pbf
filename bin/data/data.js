"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Q_CONFIRM_INSTALL_TOOLS = exports.Q_CONFIRM = exports.Q_EXAMPLE = exports.Q_SOURCE_DIR = exports.Q_OUTPUT_DIR = exports.Q_CITY_NAME = exports.Q_BUILDING_DIR = exports.Q_BUILDING_PARAMS = exports.Q_OUTPUT_BUILDING_DIR = exports.Q_ROAD_DIR = exports.Q_ROAD_PARAMS = exports.Q_OUTPUT_ROAD_DIR = exports.Q_WATER_DIR = exports.Q_WATER_PARAMS = exports.Q_OUTPUT_WATER_DIR = exports.Q_CONFIG_FILE = undefined;

var _constant = require("./constant.js");

var Q_CONFIG_FILE = exports.Q_CONFIG_FILE = [{
    "name": "config_file",
    "type": "input",
    "message": "请输入配置文件路径",
    "default": "shp2pbf.json"
}];

var Q_OUTPUT_WATER_DIR = exports.Q_OUTPUT_WATER_DIR = [{
    "name": "output_water_dir",
    "type": "input",
    "message": "请输入水域输出目录",
    "default": "./output/waters"
}];

var Q_WATER_PARAMS = exports.Q_WATER_PARAMS = [{
    "name": "water_params",
    "type": "input",
    "message": "请输入水域编译参数",
    "default": "-z 15 -Z 10 --no-tile-size-limit --coalesce -n geodata -z 13"
}];

var Q_WATER_DIR = exports.Q_WATER_DIR = [{
    "name": "water_dir",
    "type": "input",
    "message": "请输入水域目录",
    "default": "./city/water"
}];

var Q_OUTPUT_ROAD_DIR = exports.Q_OUTPUT_ROAD_DIR = [{
    "name": "output_road_dir",
    "type": "input",
    "message": "请输入路网输出目录",
    "default": "./output/roads"
}];

var Q_ROAD_PARAMS = exports.Q_ROAD_PARAMS = [{
    "name": "road_params",
    "type": "input",
    "message": "请输入路网编译参数",
    "default": "-z 15 -Z 10 --no-tile-size-limit --coalesce -n geodata -z 15"
}];

var Q_ROAD_DIR = exports.Q_ROAD_DIR = [{
    "name": "road_dir",
    "type": "input",
    "message": "请输入路网目录",
    "default": "./city/road"
}];

var Q_OUTPUT_BUILDING_DIR = exports.Q_OUTPUT_BUILDING_DIR = [{
    "name": "output_building_dir",
    "type": "input",
    "message": "请输入建筑输出目录",
    "default": "./output/building"
}];

var Q_BUILDING_PARAMS = exports.Q_BUILDING_PARAMS = [{
    "name": "building_params",
    "type": "input",
    "message": "请输入建筑编译参数",
    "default": "-z 15 -Z 10 --no-tile-size-limit --coalesce -n geodata -z 15 -l building"
}];

var Q_BUILDING_DIR = exports.Q_BUILDING_DIR = [{
    "name": "building_dir",
    "type": "input",
    "message": "请输入建筑目录",
    "default": "./city/building"
}];

var Q_CITY_NAME = exports.Q_CITY_NAME = [{
    "name": "city_name",
    "type": "input",
    "message": "请输入城市名称(留空表示处理所有城市)"
    //, "default": "macao"
    , "default": ""
}];

var Q_OUTPUT_DIR = exports.Q_OUTPUT_DIR = [{
    "name": "output_dir",
    "type": "input",
    "message": "请输入生成数据根目录",
    "default": "./output"
}];

var Q_SOURCE_DIR = exports.Q_SOURCE_DIR = [{
    "name": "soruce_dir",
    "type": "input",
    "message": "请输入源数据根目录",
    "default": "./city"
}];

var Q_EXAMPLE = exports.Q_EXAMPLE = [{
    "name": "example",
    "type": "input",
    "message": "示例输入"
}];

var Q_CONFIRM = exports.Q_CONFIRM = [{
    "name": "confirm",
    "type": "list",
    "message": "开始执行操作？",
    "choices": ['yes', 'no'],
    "default": 'yes'
}];

var Q_CONFIRM_INSTALL_TOOLS = exports.Q_CONFIRM_INSTALL_TOOLS = [{
    "name": "confirm_install_tools",
    "type": "list",
    "message": "缺少地图编译工具，是否安装？(仅支持Ubuntu、Centos)",
    "choices": ['yes', 'no'],
    "default": 'yes'
}];

/*
export const Q_INIT_PUBLIC = [
    { 
        "name": "init_public"
        , "type": "list"
        , "message": "是否需要初始化前端public目录"
        , "choices": [ 'yes', 'no' ]
        , "default": 'no'
    }
];


export const Q_IP_LIST = [
    { 
        "name": "ip"
        , "type": "input"
        , "message": "请输入静态资源HOST/IP, 无须设置请按回车。"
    }
];

export const Q_PORT_LIST = [
    { 
        "name": "port"
        , "type": "input"
        , "message": "请输入静态资源端口号, 无须设置请按回车。"
    }
];

export const Q_PASSWORD = [
    { 
        "name": "password"
        , "type": "password"
        , "message": "请输入数据库密码, 无须设置请按回车。"
    }
];
*/