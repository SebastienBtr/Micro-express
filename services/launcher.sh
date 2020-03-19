#!/bin/bash
scriptArguments=$@
root="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

launchAll() {
  # TODO: lauch api gateway
  cd "$root"/kafka
  docker-compose up -d
  cd "$root"/article
  docker-compose up -d
  cd "$root"/cart
  docker-compose up -d
}

if test "$#" -lt 1
then
  launchAll
else
  for var in $scriptArguments
  do 
    echo "Launch " $var
    cd "$root"/$var
    docker-compose up -d
  done
fi