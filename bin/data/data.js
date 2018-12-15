"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Q_OUTPUT_DIR = exports.Q_SOURCE_DIR = exports.Q_EXAMPLE = undefined;

var _constant = require("./constant.js");

var Q_EXAMPLE = exports.Q_EXAMPLE = [{
    "name": "example",
    "type": "input",
    "message": "示例输入"
}];

var Q_SOURCE_DIR = exports.Q_SOURCE_DIR = [{
    "name": "soruce_dir",
    "type": "input",
    "message": "请输入源数据根目录",
    "default": "./city"
}];

var Q_OUTPUT_DIR = exports.Q_OUTPUT_DIR = [{
    "name": "output_dir",
    "type": "input",
    "message": "请输入生成数据根目录",
    "default": "./output"
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