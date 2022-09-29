package installShell

import (
	"bytes"
	"fmt"
	"os"
	"strings"
	"text/template"

	"DataCenter.net/server/global/config"
	"DataCenter.net/server/tmpl"
	"github.com/EasyGolang/goTools/mFile"
	"github.com/EasyGolang/goTools/mPath"
	"github.com/EasyGolang/goTools/mStr"
)

// 生成外部脚本
type InstShellOpt struct {
	Port        string
	UserID      string
	CoinServeID string
}

type ShellUrl struct {
	Src string
}

func CoinFund(opt InstShellOpt) (resData ShellUrl, resErr error) {
	resErr = nil
	resData = ShellUrl{}

	savePath := mStr.Join(
		config.Dir.AITrade,
		mStr.ToStr(os.PathSeparator),
		"install",
	)
	// 目录不存在则创建
	isSavePath := mPath.Exists(savePath)
	if !isSavePath {
		err := os.MkdirAll(savePath, os.FileMode(0o777))
		if err != nil {
			resErr = fmt.Errorf("创建目录失败")
			return
		}
	}

	fileName := mFile.GetName(mFile.GetNameOpt{
		FileName: mStr.Join("i-", opt.Port, ".sh"),
		SavePath: savePath,
	})
	filePath := mStr.Join(
		savePath,
		mStr.ToStr(os.PathSeparator),
		fileName,
	)

	// 生成文件
	Body := new(bytes.Buffer)
	Tmpl := template.Must(template.New("").Parse(tmpl.InstCoinServe))
	Tmpl.Execute(Body, tmpl.InstCoinServeParam{
		Port:        opt.Port,
		UserID:      opt.UserID,
		CoinServeID: opt.CoinServeID,
	})
	Cont := Body.String()

	// 写入文件
	mFile.Write(filePath, Cont)

	remoteUrl := strings.Replace(filePath, config.Dir.File, config.Dir.FilRemote, 1)

	resData.Src = remoteUrl

	return
}
