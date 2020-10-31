root="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$root"/article
yarn audit
cd "$root"/cart
yarn audit
cd "$root"/documentation
yarn audit