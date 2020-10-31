root="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$root"/article
yarn upgrade
cd "$root"/cart
yarn upgrade
cd "$root"/documentation
yarn upgrade