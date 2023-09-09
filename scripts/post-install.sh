#!/usr/bin/env bash

FILE=Gemfile.lock

if [ -f "$FILE" ]; then
    bundle update
else
    bundle install --path vendor/bundle
fi

echo $OSTYPE

if [[ "$OSTYPE" == "darwin"* ]]; then 
    cd ios && bundle exec pod install

    cd ..
fi