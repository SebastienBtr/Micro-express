#!/bin/bash
source ~/.bashrc # to access "docker-compose" alias in production
root="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

env="dev"
declare -a scriptArguments

# process arguments
while [[ $# -gt 0 ]]
do
    case "$1" in
      -e)
      if [[ $2 != "" ]]; then env=$2; fi
      shift 2
      ;;
      *)
      scriptArguments+=( $1 )
      shift 1
      ;;
    esac
done

launchAll() {
  cd "$root"/api-gateway
  ENV=$env docker-compose up -d --build --force-recreate
  cd "$root"/kafka
  ENV=$env docker-compose up -d --build --force-recreate
  cd "$root"/article
  ENV=$env docker-compose up -d --build --force-recreate
  cd "$root"/cart
  ENV=$env docker-compose up -d --build --force-recreate
  cd "$root"/documentation
  ENV=$env docker-compose up -d --build --force-recreate
}

if test ${#scriptArguments[@]} -lt 1
then
  echo "Launch all"
  launchAll
else
  cd "$root"/api-gateway
  ENV=$env docker-compose up -d --build --force-recreate
  if [[ $env != "prod" ]]
  then
    cd "$root"/kafka
    ENV=$env docker-compose up -d --build --force-recreate
  fi
  for var in $scriptArguments
  do 
    echo "Launch " $var
    cd "$root"/$var
    ENV=$env docker-compose up -d --build --force-recreate
  done
fi