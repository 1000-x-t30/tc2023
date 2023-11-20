#!/bin/sh

export PATH=$PATH:/usr/local/bin
cd $(dirname $0)
# -----↑↑↑ 実行するためのおまじない ↑↑↑-----

php -d max_execution_time=0 -d memory_limit=512M -f example.php

exit $?
