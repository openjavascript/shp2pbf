#!/bin/bash

echo
echo 'initing tippecanoe ( mac os x )'
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

echo
echo "tippecanoe enviorment init done" && echo
