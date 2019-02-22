#!/bin/bash

TAR="crm-common-fe.tar.gz"

export PATH=/home/fis/node/v6/bin:/home/fis/v6/npm/bin:/home/fis/npm/bin:$PATH

fis3 --version --no-color

echo "build start"

mkdir -p output

mv ./* output/

cd output
tar zcf $TAR ./*

echo "template complete"


