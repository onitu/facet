#! /usr/bin/env bash

for e in pdf jpg ogg docx ppt mp3 xls; do
    for i in $(seq $((RANDOM % 3 + 1))); do
        head -c $((RANDOM % 500 + 1)) /dev/urandom > $(echo $i | md5sum - | cut -d ' ' -f 1).$e
    done
done
