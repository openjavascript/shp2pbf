#!/bin/bash
echo 
echo 'initing tippecanoe'
echo 
echo 'please waiting a moment...'
echo 

if which sudo >/dev/null; then
    sudo add-apt-repository ppa:ubuntugis/ppa -y && echo 
    sudo apt-get update && echo 
    sudo apt-get -y upgrade && echo 

    sudo apt-get -y install git build-essential libsqlite3-dev zlib1g-dev tree gzip && echo 
    sudo git clone https://github.com/mapbox/tippecanoe.git ~/tippecanoe && echo 
    sudo make -j -C ~/tippecanoe && echo 
    sudo make -C ~/tippecanoe install && echo 
    sudo rm -rf ~/tippecanoe

    sudo apt-get install gdal-bin -y && echo  
else
    add-apt-repository ppa:ubuntugis/ppa -y && echo 
    apt-get update && echo 
    apt-get -y upgrade && echo 

    apt-get -y install git build-essential libsqlite3-dev zlib1g-dev tree gzip && echo 
    git clone https://github.com/mapbox/tippecanoe.git ~/tippecanoe && echo 
    make -j -C ~/tippecanoe && echo 
    make -C ~/tippecanoe install && echo 
    rm -rf ~/tippecanoe

    apt-get install gdal-bin -y && echo 
fi


echo  
echo "tippecanoe enviorment init done"
