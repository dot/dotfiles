#!/bin/bash

package_id=$1

rm-pkg-files() {
    while read line; do
        file="/${line}"
        if [ -f "$file" ]; then
            rm "$file"
        elif [ -d "$file" ]; then
            rmdir "$file"
        fi
    done
}

pkgutil --files $package_id | tail -r | rm-pkg-files
pkgutil --forget $package_id
