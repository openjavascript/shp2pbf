#!/bin/bash
echo 
echo 'initing tippecanoe ( centos )'
echo 
echo 'please waiting a moment...'
echo 
if which sudo >/dev/null; then
    sudo yum install -y epel-release && echo 
    sudo yum update -y && echo 
    sudo yum group install -y "Development Tools" && echo 
    sudo yum install -y wget gzip tree && echo 
    sudo yum install -y gdal-devel && echo 
    sudo yum install -y libsqlite3x-devel zlib zlib-devel && echo 
    git clone https://github.com/mapbox/tippecanoe.git ~/tippecanoe && echo 
    sudo make -j -C ~/tippecanoe && echo 
    sudo make -C ~/tippecanoe install && echo 
    sudo rm -rf ~/tippecanoe && echo 

else
    yum install -y epel-release && echo 
    yum update -y && echo 
    yum group install -y "Development Tools" && echo 
    yum install -y wget gzip tree && echo 
    yum install -y gdal gdal-python gdal-devel && echo 
    yum install -y libsqlite3x-devel zlib zlib-devel && echo 
    git clone https://github.com/mapbox/tippecanoe.git ~/tippecanoe && echo 
    make -j -C ~/tippecanoe && echo 
    make -C ~/tippecanoe install && echo 
    rm -rf ~/tippecanoe && echo 
fi

echo  
echo "tippecanoe enviorment init done" && echo 
