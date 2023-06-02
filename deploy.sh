#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка приложения
npm run build

# переход в каталог сборки
cd dist

# инициализация репозитория и загрузка кода в GitHub
git init
git add .
git commit -m 'deploy'

git push -f https://github.com/4Avelon4/technosaurus.git master:gh-pages

cd -