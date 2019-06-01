#!/bin/bash

echo
echo 'initing tippecanoe ( centos )'
echo
echo 'please waiting a moment...'
echo

if ! which brew >/dev/null; then
    echo 'install brew...'
    cd ~ && /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
fi

if ! which tippecanoe >/dev/null; then
    echo 'install tippecanoe with brew'
    brew install tippecanoe
    echo ''
fi

if ! which wget >/dev/null; then
    echo 'install wget'
    brew install wget
fi

if ! which gzip >/dev/null; then
    echo 'install gzip'
    brew install gzip
fi

if ! which tree >/dev/null; then
    echo 'install tree'
    brew install tree
fi

if ! which gdal >/dev/null; then
    echo 'install gdal'
    brew install gdal
fi


#sudo yum group install -y "Development Tools" && echo
#sudo yum install -y wget gzip tree && echo
#sudo yum install -y gdal-devel && echo
#sudo yum install -y libsqlite3x-devel zlib zlib-devel && echo
#git clone https://github.com/mapbox/tippecanoe.git ~/tippecanoe && echo
#sudo make -j -C ~/tippecanoe && echo
#sudo make -C ~/tippecanoe install && echo
#sudo rm -rf ~/tippecanoe && echo

#echo
#echo "tippecanoe enviorment init done" && echo
