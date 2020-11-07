
#!/bin/bash
source ~/.bashrc # to access "docker-compose" alias in production

# The api Gateway must be lauch at the end because it need the other service to work.
root="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$root"/api-gateway
docker-compose up -d --build --quiet-pull --remove-orphans