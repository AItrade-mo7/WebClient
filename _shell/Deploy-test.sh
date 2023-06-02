#!/bin/bash
##WebHook:~ 发布 trade.mo7.cc ~

## 设置并加载变量
source "./_shell/init.sh"
NowPath=${NowPath}
OutPutPath=${OutPutPath}



## 清理目录 dist 和 git 仓库
rm -rf "${OutPutPath}"

## 开始编译
pnpm run build &&
  cp "${NowPath}/package.json" "${OutPutPath}"

# 开始进行发布步骤 OutPutPath -> 远程 DeployPath
cd "${OutPutPath}" || exit


exit 0
