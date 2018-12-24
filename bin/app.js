"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.init = init;

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _clear = require("clear");

var _clear2 = _interopRequireDefault(_clear);

var _figlet = require("figlet");

var _figlet2 = _interopRequireDefault(_figlet);

var _shelljs = require("shelljs");

var _shelljs2 = _interopRequireDefault(_shelljs);

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _constant = require("./data/constant.js");

var CONST = _interopRequireWildcard(_constant);

var _data = require("./data/data.js");

var DATA = _interopRequireWildcard(_data);

var _ProjectExample = require("./ProjectExample.js");

var _ProjectExample2 = _interopRequireDefault(_ProjectExample);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var error = _chalk2.default.bold.red;
var warning = _chalk2.default.keyword('orange');
var success = _chalk2.default.greenBright;
var info = _chalk2.default.bold.blue;

var App = function () {
    function App(appRoot, projectRoot, packJSON, osName, cityName) {
        _classCallCheck(this, App);

        this.appRoot = appRoot;
        this.projectRoot = projectRoot;
        this.packJSON = packJSON;
        this.osName = osName;

        this.cmdCityName = cityName;

        console.log(['appRoot: ' + this.appRoot, 'projectRoot: ' + this.projectRoot].join("\n"));

        this.init();

        console.log();
    }

    _createClass(App, [{
        key: "init",
        value: function init() {
            var _this = this;

            (0, _clear2.default)();

            this.project;
            this.prompt = _inquirer2.default.createPromptModule();
            this.welcome();

            this.system = 1;

            /*
            shell.exec(  [ 
                'cd ' + this.projectRoot
                , 'git config core.fileMode false && git config core.autocrlf false'
            ].join('&&') );
            */

            console.log();

            new Promise(function (resolve) {
                setTimeout(resolve, 1);
            }).then(function () {
                _this.readConfigJson(DATA.Q_CONFIG_FILE[0].default);

                if (_this.config) {
                    return new Promise(function (resolve) {
                        setTimeout(resolve, 1);
                    });
                }
                console.log();
                return _this.getConfigFile();
                //}).then( () => {
                /*            return this.getSourceDir();*/
                //}).then( () => {
                //return this.getOutputDir();
            }).then(function () {
                if (_this.config && "city_name" in _this.config) {
                    _this.city_name = _this.config.city_name;
                    return new Promise(function (resolve) {
                        setTimeout(resolve, 1);
                    });
                }
                if (_this.cmdCityName) {
                    _this.city_name = _this.cmdCityName;
                    return new Promise(function (resolve) {
                        setTimeout(resolve, 1);
                    });
                }
                return _this.getCityName();
            }).then(function () {
                if (_this.config && _this.config.building_dir) {
                    _this.building_dir = _this.config.building_dir;
                    return new Promise(function (resolve) {
                        setTimeout(resolve, 1);
                    });
                }
                return _this.getBuildingDir();
            }).then(function () {
                if (_this.config && _this.config.building_params) {
                    _this.building_params = _this.config.building_params;
                    return new Promise(function (resolve) {
                        setTimeout(resolve, 1);
                    });
                }
                return _this.getBuildingParams();
            }).then(function () {
                if (_this.config && _this.config.output_building_dir) {
                    _this.output_building_dir = _this.config.output_building_dir;
                    return new Promise(function (resolve) {
                        setTimeout(resolve, 1);
                    });
                }
                return _this.getOutputBuildingDir();
            }).then(function () {
                if (_this.config && _this.config.road_dir) {
                    _this.road_dir = _this.config.road_dir;
                    return new Promise(function (resolve) {
                        setTimeout(resolve, 1);
                    });
                }
                return _this.getRoadDir();
            }).then(function () {
                if (_this.config && _this.config.road_params) {
                    _this.road_params = _this.config.road_params;
                    return new Promise(function (resolve) {
                        setTimeout(resolve, 1);
                    });
                }
                return _this.getRoadParams();
            }).then(function () {
                if (_this.config && _this.config.output_road_dir) {
                    _this.output_road_dir = _this.config.output_road_dir;
                    return new Promise(function (resolve) {
                        setTimeout(resolve, 1);
                    });
                }
                return _this.getOutputRoadDir();
            }).then(function () {
                if (_this.config && _this.config.water_dir) {
                    _this.water_dir = _this.config.water_dir;
                    return new Promise(function (resolve) {
                        setTimeout(resolve, 1);
                    });
                }
                return _this.getWaterDir();
            }).then(function () {
                if (_this.config && _this.config.water_params) {
                    _this.water_params = _this.config.water_params;
                    return new Promise(function (resolve) {
                        setTimeout(resolve, 1);
                    });
                }
                return _this.getWaterParams();
            }).then(function () {
                if (_this.config && _this.config.output_water_dir) {
                    _this.output_water_dir = _this.config.output_water_dir;
                    return new Promise(function (resolve) {
                        setTimeout(resolve, 1);
                    });
                }
                return _this.getOutputWaterDir();
            }).then(function () {
                _this.isGood = 1;

                _this.buildingList = _this.resolveDir(_this.building_dir, _this.output_building_dir);
                _this.roadList = _this.resolveDir(_this.road_dir, _this.output_road_dir);
                _this.waterList = _this.resolveDir(_this.water_dir, _this.output_water_dir);

                var space = '        ';

                console.log(space + 'os-release:', _this.osName);
                console.log();
                console.log(space + 'building list:');
                _this.buildingList.map(function (item) {
                    console.log(space + '    source:', item.source);
                    console.log(space + '    output:', item.output);
                });
                console.log();
                console.log(space + 'road list:');
                _this.roadList.map(function (item) {
                    console.log(space + '    source:', item.source);
                    console.log(space + '    output:', item.output);
                });
                console.log();
                console.log(space + 'water list:');
                _this.waterList.map(function (item) {
                    console.log(space + '    source:', item.source);
                    console.log(space + '    output:', item.output);
                });

                console.log();

                //this.isGood = 0;
                return new Promise(function (resolve) {
                    setTimeout(resolve, 1);
                });
            }).then(function () {

                if (!(_shelljs2.default.which('tippecanoe') && _shelljs2.default.which('ogrinfo') && _shelljs2.default.which('ogr2ogr') && _shelljs2.default.which('gzip')
                //&& shell.which( 'notexitst' )  
                )) {
                    return _this.getConfirmInstallTools();
                }

                return new Promise(function (resolve) {
                    setTimeout(resolve, 1);
                });
            }).then(function () {
                if (_this.confirm_install_tools && _this.confirm_install_tools == 'yes') {
                    var shellFile = "/bin/bash " + _this.appRoot + "/shell/" + _this.osName + ".sh";
                    _shelljs2.default.exec(shellFile);
                }
                return new Promise(function (resolve) {
                    setTimeout(resolve, 1);
                });
            }).then(function () {
                if (!_this.isGood) {
                    _this.confirm = 'no';
                    return;
                }

                if (_this.config && _this.config.autostart) {
                    _this.confirm = 'yes';
                    return new Promise(function (resolve) {
                        setTimeout(resolve, 1);
                    });
                }

                return _this.getConfirm();
            }).then(function () {
                if (_this.confirm == 'no') return;
                _this.project = new _ProjectExample2.default(_this);
            });
        }
    }, {
        key: "resolveDir",
        value: function resolveDir(src, output) {
            var r = [];

            if (this.city_name) {
                r = this.resolveDirCityName(src, output, this.city_name);
            } else {
                r = this.resolveDirBatch(src, output);
            }

            return r;
        }
    }, {
        key: "resolveDirCityName",
        value: function resolveDirCityName(src, output, cityName) {
            var r = [];

            var obj = {};
            var tmp = _path2.default.resolve(this.projectRoot, src, cityName);
            var postfix = this.getPostfixName(src);

            if (_fsExtra2.default.pathExistsSync(tmp)) {
                obj.source = tmp;
            }

            if (!obj.source) {
                tmp = _path2.default.resolve(this.projectRoot, src, cityName + ['_', postfix].join(''));
                if (_fsExtra2.default.pathExistsSync(tmp)) {
                    obj.source = tmp;
                }
            }
            if (!obj.source) return r;

            obj.cityName = cityName;
            tmp = _path2.default.resolve(this.projectRoot, output, obj.cityName.replace(/shi$/i, '') + 'shi');

            obj.output = tmp;

            r.push(obj);

            return r;
        }
    }, {
        key: "getPostfixName",
        value: function getPostfixName(dir) {
            var r = '';
            r = dir.replace(/\/$/, '').split('/');
            r = r[r.length - 1] || '';

            return r;
        }
    }, {
        key: "getDirCityName",
        value: function getDirCityName(dir) {
            var r = '';

            r = dir.replace(/.*\//, '');
            r = r.replace(/\_.*/, '');
            r = r.replace(/shi$/, '');

            return r;
        }
    }, {
        key: "resolveDirBatch",
        value: function resolveDirBatch(src, output) {
            var _this2 = this;

            var r = [];

            var dir = _path2.default.resolve(this.projectRoot, src);

            var dirList = _fsExtra2.default.readdirSync(dir);

            var p = this;

            dirList.map(function (item) {
                var obj = {};

                obj.source = _path2.default.resolve(dir, item);
                obj.cityName = p.getDirCityName(item);
                obj.output = _path2.default.resolve(_this2.projectRoot, output, obj.cityName.replace(/shi$/i, '') + 'shi');

                r.push(obj);
            });

            return r;
        }
    }, {
        key: "getConfigFile",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var data;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.prompt(DATA.Q_CONFIG_FILE);

                            case 2:
                                data = _context.sent;

                                this.config_file = data.config_file;
                                this.readConfigJson(this.config_file);

                            case 5:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getConfigFile() {
                return _ref.apply(this, arguments);
            }

            return getConfigFile;
        }()
    }, {
        key: "readConfigJson",
        value: function readConfigJson(fileName) {
            var configFilePath = _path2.default.resolve([this.projectRoot, fileName].join('/'));
            if (_fsExtra2.default.existsSync(configFilePath)) {
                this.config = _fsExtra2.default.readJsonSync(configFilePath);
            }
        }
    }, {
        key: "getOutputWaterDir",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var data;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.prompt(DATA.Q_OUTPUT_WATER_DIR);

                            case 2:
                                data = _context2.sent;

                                this.output_water_dir = data.output_water_dir;

                            case 4:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getOutputWaterDir() {
                return _ref2.apply(this, arguments);
            }

            return getOutputWaterDir;
        }()
    }, {
        key: "getWaterParams",
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var data;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.prompt(DATA.Q_WATER_PARAMS);

                            case 2:
                                data = _context3.sent;

                                this.water_params = data.water_params;

                            case 4:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getWaterParams() {
                return _ref3.apply(this, arguments);
            }

            return getWaterParams;
        }()
    }, {
        key: "getWaterDir",
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var data;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.prompt(DATA.Q_WATER_DIR);

                            case 2:
                                data = _context4.sent;

                                this.water_dir = data.water_dir;

                            case 4:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getWaterDir() {
                return _ref4.apply(this, arguments);
            }

            return getWaterDir;
        }()
    }, {
        key: "getOutputRoadDir",
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var data;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return this.prompt(DATA.Q_OUTPUT_ROAD_DIR);

                            case 2:
                                data = _context5.sent;

                                this.output_road_dir = data.output_road_dir;

                            case 4:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function getOutputRoadDir() {
                return _ref5.apply(this, arguments);
            }

            return getOutputRoadDir;
        }()
    }, {
        key: "getRoadParams",
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                var data;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return this.prompt(DATA.Q_ROAD_PARAMS);

                            case 2:
                                data = _context6.sent;

                                this.road_params = data.road_params;

                            case 4:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function getRoadParams() {
                return _ref6.apply(this, arguments);
            }

            return getRoadParams;
        }()
    }, {
        key: "getRoadDir",
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                var data;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return this.prompt(DATA.Q_ROAD_DIR);

                            case 2:
                                data = _context7.sent;

                                this.road_dir = data.road_dir;

                            case 4:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function getRoadDir() {
                return _ref7.apply(this, arguments);
            }

            return getRoadDir;
        }()
    }, {
        key: "getOutputBuildingDir",
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                var data;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                _context8.next = 2;
                                return this.prompt(DATA.Q_OUTPUT_BUILDING_DIR);

                            case 2:
                                data = _context8.sent;

                                this.output_building_dir = data.output_building_dir;

                            case 4:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function getOutputBuildingDir() {
                return _ref8.apply(this, arguments);
            }

            return getOutputBuildingDir;
        }()
    }, {
        key: "getBuildingParams",
        value: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                var data;
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _context9.next = 2;
                                return this.prompt(DATA.Q_BUILDING_PARAMS);

                            case 2:
                                data = _context9.sent;

                                this.building_params = data.building_params;

                            case 4:
                            case "end":
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function getBuildingParams() {
                return _ref9.apply(this, arguments);
            }

            return getBuildingParams;
        }()
    }, {
        key: "getBuildingDir",
        value: function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
                var data;
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                _context10.next = 2;
                                return this.prompt(DATA.Q_BUILDING_DIR);

                            case 2:
                                data = _context10.sent;

                                this.building_dir = data.building_dir;

                            case 4:
                            case "end":
                                return _context10.stop();
                        }
                    }
                }, _callee10, this);
            }));

            function getBuildingDir() {
                return _ref10.apply(this, arguments);
            }

            return getBuildingDir;
        }()
    }, {
        key: "getCityName",
        value: function () {
            var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
                var data;
                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                _context11.next = 2;
                                return this.prompt(DATA.Q_CITY_NAME);

                            case 2:
                                data = _context11.sent;

                                this.city_name = data.city_name;

                            case 4:
                            case "end":
                                return _context11.stop();
                        }
                    }
                }, _callee11, this);
            }));

            function getCityName() {
                return _ref11.apply(this, arguments);
            }

            return getCityName;
        }()
    }, {
        key: "getSourceDir",
        value: function () {
            var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
                var data;
                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                _context12.next = 2;
                                return this.prompt(DATA.Q_SOURCE_DIR);

                            case 2:
                                data = _context12.sent;

                                this.source_dir = data.source_dir;

                            case 4:
                            case "end":
                                return _context12.stop();
                        }
                    }
                }, _callee12, this);
            }));

            function getSourceDir() {
                return _ref12.apply(this, arguments);
            }

            return getSourceDir;
        }()
    }, {
        key: "getOutputDir",
        value: function () {
            var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
                var data;
                return regeneratorRuntime.wrap(function _callee13$(_context13) {
                    while (1) {
                        switch (_context13.prev = _context13.next) {
                            case 0:
                                _context13.next = 2;
                                return this.prompt(DATA.Q_OUTPUT_DIR);

                            case 2:
                                data = _context13.sent;

                                this.output_dir = data.output_dir;

                            case 4:
                            case "end":
                                return _context13.stop();
                        }
                    }
                }, _callee13, this);
            }));

            function getOutputDir() {
                return _ref13.apply(this, arguments);
            }

            return getOutputDir;
        }()
    }, {
        key: "getConfirmInstallTools",
        value: function () {
            var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
                var data;
                return regeneratorRuntime.wrap(function _callee14$(_context14) {
                    while (1) {
                        switch (_context14.prev = _context14.next) {
                            case 0:
                                _context14.next = 2;
                                return this.prompt(DATA.Q_CONFIRM_INSTALL_TOOLS);

                            case 2:
                                data = _context14.sent;

                                this.confirm_install_tools = data.confirm_install_tools;

                            case 4:
                            case "end":
                                return _context14.stop();
                        }
                    }
                }, _callee14, this);
            }));

            function getConfirmInstallTools() {
                return _ref14.apply(this, arguments);
            }

            return getConfirmInstallTools;
        }()
    }, {
        key: "getConfirm",
        value: function () {
            var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
                var data;
                return regeneratorRuntime.wrap(function _callee15$(_context15) {
                    while (1) {
                        switch (_context15.prev = _context15.next) {
                            case 0:
                                _context15.next = 2;
                                return this.prompt(DATA.Q_CONFIRM);

                            case 2:
                                data = _context15.sent;

                                this.confirm = data.confirm;

                            case 4:
                            case "end":
                                return _context15.stop();
                        }
                    }
                }, _callee15, this);
            }));

            function getConfirm() {
                return _ref15.apply(this, arguments);
            }

            return getConfirm;
        }()
    }, {
        key: "getExample",
        value: function () {
            var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
                var data;
                return regeneratorRuntime.wrap(function _callee16$(_context16) {
                    while (1) {
                        switch (_context16.prev = _context16.next) {
                            case 0:
                                _context16.next = 2;
                                return this.prompt(DATA.Q_EXAMPLE);

                            case 2:
                                data = _context16.sent;

                                this.example = data.example;

                            case 4:
                            case "end":
                                return _context16.stop();
                        }
                    }
                }, _callee16, this);
            }));

            function getExample() {
                return _ref16.apply(this, arguments);
            }

            return getExample;
        }()
    }, {
        key: "fileExists",
        value: function fileExists(file) {
            return _fsExtra2.default.existsSync(file);
        }
    }, {
        key: "welcome",
        value: function welcome() {
            console.log(_chalk2.default.yellow(_figlet2.default.textSync(CONST.APPNAME, { horizontalLayout: 'full' })));
            console.log(_chalk2.default.bold.yellow(CONST.TITLE + " - " + this.packJSON.version));
            console.log();
            console.log(info("github: " + this.packJSON.repository.url));

            console.log();
            console.log('使用:');
            console.log('     方法1: 切换到项目根目录, 然后执行命令 shp2pbf');
            console.log(info('         cd projectRoot && shp2pbf '));
            console.log();
            console.log('     方法2: 使用 shp2pbf 路径, 支持相对路径');
            console.log(info('         shp2pbf /var/www/your_project_root '));
            console.log();
        }
    }]);

    return App;
}();

exports.default = App;
function init(APP_ROOT, PROJECT_ROOT, packJSON, osName, cityName) {
    var AppIns = new App(APP_ROOT, PROJECT_ROOT, packJSON, osName, cityName);
}