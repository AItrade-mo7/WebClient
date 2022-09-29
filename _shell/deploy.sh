#!/bin/bash
# 加载变量
source "./_shell/init.sh"
#############

pnpm install
echo "开始打包" &&
  pnpm run build

echo "移动文件到 ProdProject 目录"
rm -rf ${deployPath}
cp -r ${outPutPath}"/." ${deployPath}"/"
cp -r ${path}"/package.json" ${deployPath}
