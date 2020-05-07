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

if test ${#scriptArguments[@]} -lt 1
then
  echo "Launch all"
  scriptArguments=(article cart documentation)
fi
cd "$root"/api-gateway
ENV=$env docker-compose up -d --build --quiet-pull --remove-orphans
if [[ $env != "prod" ]]
then
  cd "$root"/kafka
  ENV=$env docker-compose up -d --build --quiet-pull --remove-orphans
fi
for i in "${scriptArguments[@]}"
do 
  echo "=============================== Launch "$i" ==============================="
  cd "$root"/"$i" 

  if [[ $env == "prod" ]]
  then 
    ENV=$env docker-compose -f docker-compose.yaml up --build -d --quiet-pull --remove-orphans
  elif [[ $env == "test" ]]
  then
    ENV=$env docker-compose -f docker-compose.yaml -f docker-compose.local.yaml up --build -d --quiet-pull --remove-orphans
  elif [[ $env == "dev" ]]
  then
    ENV=$env docker-compose -f docker-compose.yaml -f docker-compose.local.yaml -f docker-compose.hot-reload.yaml up --build -d --quiet-pull --remove-orphans
  fi
  
  if [[ $env == "test" ]]
  then
    docker logs -f "$i"_app_1
    res=$(docker wait "$i"_app_1)
    if [[ $res != 0 ]]
    then
      echo ""
      echo "=================================================================================="
      echo "TEST FAIL FOR "$i""
      echo "=================================================================================="
      echo ""
      exit 1
    fi
  fi
done