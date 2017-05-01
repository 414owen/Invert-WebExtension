#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
mkdir -p ${DIR}/icons
for i in 16 32 48 96 128 192 256; do
	convert icons/icon.svg -size ${i}x${i} icons/${i}.png
done


