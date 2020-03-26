#!/bin/bash
scriptArguments=$@
root="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

launchAll() {
  cd "$root"/api-gateway
  docker-compose up -d --build
  cd "$root"/kafka
  docker-compose up -d --build
  cd "$root"/article
  docker-compose up -d --build
  cd "$root"/cart
  docker-compose up -d --build
  cd "$root"/documentation
  docker-compose up -d --build
}

if test "$#" -lt 1
then
  launchAll
else
  cd "$root"/api-gateway
  docker-compose up -d --build
  cd "$root"/kafka
  docker-compose up -d --build
  for var in $scriptArguments
  do 
    echo "Launch " $var
    cd "$root"/$var
    docker-compose up -d --build
  done
fi