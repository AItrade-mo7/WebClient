#!/bin/bash
# 加载变量
source "./_shell/init.sh"
#############

GitSet

desc=$1

echo "${desc}"

if [ -z "${desc}" ]; then
  desc="exit-push"
fi

echo "${desc}"

git pull &&
  git add . &&
  git commit -m "${desc}" &&
  git push &&
  echo "同步完成"

GitSet &&
  exit 0
