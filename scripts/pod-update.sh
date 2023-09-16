#!/usr/bin/env bash

FILE=Gemfile.lock

if [ -f "$FILE" ]; then
    bundle update
else
    bundle install --path vendor/bundle
fi

echo $OSTYPE

if [[ "$OSTYPE" == "darwin"* ]]; then 
    export USE_FRAMEWORKS=static
    export NO_FLIPPER=1
    export RCT_NEW_ARCH_ENABLED=0
    cd ios && bundle exec pod update

    cd ..
fi