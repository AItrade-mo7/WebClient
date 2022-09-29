package main

import (
	_ "embed"

	"DataCenter.net/server/global"
	"DataCenter.net/server/global/config"
	"DataCenter.net/server/ready"
	"DataCenter.net/server/router"
	jsoniter "github.com/json-iterator/go"
)

//go:embed package.json
var AppPackage []byte

func main() {
	jsoniter.Unmarshal(AppPackage, &config.AppInfo)
	// 初始化系统参数
	global.Start()

	ready.Start()

	// 启动 http 监听服务
	router.Start()
}
