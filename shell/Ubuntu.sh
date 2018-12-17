#!/bin/bash
echo 
echo 'initing tippecanoe'
echo 
echo 'please waiting a moment...'
echo 
sudo add-apt-repository ppa:ubuntugis/ppa -y && echo 
sudo apt-get update && echo 
sudo apt-get -y upgrade && echo 

sudo apt-get -y install git build-essential libsqlite3-dev zlib1g-dev tree gzip && echo 
sudo git clone https://github.com/mapbox/tippecanoe.git ./tippecanoe && echo 
sudo make -j -C ./tippecanoe && echo 
sudo make -C ./tippecanoe install && echo 
sudo rm -rf ./tippecanoe

sudo apt-get install gdal-bin -y && echo  

echo  
echo "tippecanoe enviorment init done"
