
# shp2pbf 

## 工具的作用
    .shp & .kml 生成 .pbf

## 全局安装
    sudo npm install -g shp2pbf

## 使用
### 方法1: 切换到项目根目录, 然后执行命令 shp2pbf
    cd projectRoot && shp2pbf

### 方法2: 使用 shp2pbf 路径, 支持相对路径
    shp2pbf /var/www/your_project_root

## 参数配置文件 shp2pbf.json
	如果运行命令的目录有 shp2pbf.json，工具会尝试读取JSON的配置参数，自动填充输入参数

## shp2pbf.json 说明
{
	//是否自动开始
    "autostart": false 	
	//城市名，为空表示处理所有数据
	, "city_name": "" 
	//建筑数据根目录
	, "building_dir": "./city/building"	
	//建筑数据编译参数
	, "building_params": "-z 15 -Z 10 --no-tile-size-limit --coalesce -n geodata -z 15 -l building"
	//建筑数据输出目录
	, "output_building_dir": "./output/building"

	//路网数据根目录
	, "road_dir": "./city/road"
	//路网数据编译参数
	, "road_params": "-z 15 -Z 10 --no-tile-size-limit --coalesce -n geodata -z 15"
	//路网数据输出目录
	, "output_road_dir": "./output/roads"

	//水路数据根目录
	, "water_dir": "./city/water"
	//水路数据编译参数
	, "water_params": "-z 15 -Z 10 --no-tile-size-limit --coalesce -n geodata -z 13"
	//水路数据输出目录
	, "output_water_dir": "./output/waters"
}
