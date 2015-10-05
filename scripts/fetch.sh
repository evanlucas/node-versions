#!/bin/bash

git ls-remote -t git://github.com/nodejs/node \
  | awk '{print $2}' \
  | cut -d '/' -f 3 \
  | grep -v '\^' \
  | grep -v '-' \
  | grep -v 'heads' \
  | grep -v 'jenkins' \
  | sed 's/v//g' \
  | sort -u -k 1,1n -k 2,2n -k 3,3n -t .
