#!/bin/bash
scriptArguments=$@
root="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Check if the script arguments contains a given value
containsElement() {
  for var in $scriptArguments
  do 
    if [ $1 == $var ]
    then
      return 0
    fi
  done
  return 1
}

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
  if containsElement api-gateway
  then
    echo "gateway"
    # TODO: lauch api gateway
  fi
    if containsElement kafka
  then
    echo "kafka"
    cd "$root"/kafka
    docker-compose up -d
  fi
    if containsElement article
  then
    echo "article"
    cd "$root"/article
    docker-compose up -d
  fi
  if containsElement cart
  then
    echo "cart"
    cd "$root"/cart
    docker-compose up -d
  fi
fi