package coinServe

import (
	"DataCenter.net/server/global/dbType"
	"DataCenter.net/server/router/middle"
	"DataCenter.net/server/router/result"
	"DataCenter.net/server/utils/dbUser"
	"DataCenter.net/server/utils/installShell"
	"github.com/EasyGolang/goTools/mFiber"
	"github.com/EasyGolang/goTools/mStr"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

type StartParam struct {
	CoinServeID string `bson:"CoinServeID"`
	Password    string `bson:"Password"`
}

func DeployShell(c *fiber.Ctx) error {
	var json StartParam
	mFiber.Parser(c, &json)

	if len(json.Password) < 3 {
		return c.JSON(result.ErrStartAITradeServer.WithMsg("需要密码"))
	}

	if len(json.CoinServeID) < 3 {
		return c.JSON(result.ErrStartAITradeServer.WithMsg("CoinServeID 不能为空"))
	}

	UserID, err := middle.TokenAuth(c)
	if err != nil {
		return c.JSON(result.ErrToken.WithData(mStr.ToStr(err)))
	}
	UserDB, err := dbUser.NewUserDB(dbUser.NewUserOpt{
		UserID: UserID,
	})
	if err != nil {
		UserDB.DB.Close()
		return c.JSON(result.ErrDB.WithData(mStr.ToStr(err)))
	}

	// 密码验证
	err = UserDB.CheckPassword(json.Password)
	if err != nil {
		return c.JSON(result.ErrLogin.WithMsg(err))
	}

	// 连接 AITradeServer 表
	ServerDB, err := LineCoinServerDB()
	if err != nil {
		ServerDB.Close()
		return c.JSON(result.ErrDB.WithData(mStr.ToStr(err)))
	}
	// 检查服务是否存在  --  CoinServeID
	FK := bson.D{{
		Key:   "CoinServeID",
		Value: json.CoinServeID,
	}}
	var ServerData dbType.CoinServeTable
	ServerDB.Table.FindOne(ServerDB.Ctx, FK).Decode(&ServerData)
	if len(ServerData.CoinServeID) < 3 {
		ServerDB.Close()
		return c.JSON(result.ErrStartAITradeServerNot.WithData("该服务尚未注册"))
	}
	if ServerData.UserID != UserID {
		ServerDB.Close()
		return c.JSON(result.ErrStartAITradeServer.WithMsg("当前账户没有权限"))
	}
	ServerDB.Close()

	ShellUrl, err := installShell.CoinFund(installShell.InstShellOpt{
		Port:        ServerData.Port,
		UserID:      ServerData.UserID,
		CoinServeID: ServerData.CoinServeID,
	})
	if err != nil {
		ServerDB.Close()
		return c.JSON(result.ErrDB.WithData(mStr.ToStr(err)))
	}

	return c.JSON(result.Succeed.WithData(ShellUrl))
}
