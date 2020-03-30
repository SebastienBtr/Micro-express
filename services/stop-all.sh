#!/bin/bash
source ~/.bashrc # to access "docker-compose" alias in production
root="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$root"/api-gateway
docker-compose down
cd "$root"/kafka
docker-compose down
cd "$root"/article
docker-compose down
cd "$root"/cart
docker-compose down
cd "$root"/documentation
docker-compose down