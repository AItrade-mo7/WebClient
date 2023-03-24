<script setup lang="ts">
import { ReStart, Remove, TheOpen } from '@/api/CoinAI/sys';
import AuthModal from '@/lib/AuthModal';
import { mStorage } from '@/utils/tools';

const props = defineProps({
  WssData: Object,
});

let isUpdate = false;
if (props.WssData.GithubVersion && props.WssData.SysVersion) {
  isUpdate = props.WssData.GithubVersion !== props.WssData.SysVersion;
}

let BtnStatus = $ref(0);
const stopServer = () => {
  BtnStatus = -1;
};

const restartServer = () => {
  BtnStatus = 1;
};

const SendFetch = (type: number) => {
  let EmailAction = '修改资料';
  if (type == 1) {
    EmailAction = '重启服务';
  }

  if (type == -1) {
    EmailAction = '删除服务';
  }

  if (type == 2) {
    EmailAction = '公开服务';
  }

  AuthModal({
    EmailAction,
    IsPassword: true,
    async OkBack(param) {
      const Info = {
        Password: param.Password,
        Code: param.Code,
      };
      if (type === 1) {
        return SendReStart(Info);
      }

      if (type === -1) {
        return SendStop(Info);
      }

      if (type === 2) {
        return SendTheOpen(Info);
      }
    },
  });
};

const SendStop = async (Info) => {
  const res = await Remove({
    ...Info,
    SatelliteServe: props.WssData.ServeID,
  });
  if (res.Code > 0) {
    window.$message.warning('删除指令已发送!', {
      onAfterLeave() {
        window.location.replace('/SatelliteServe');
      },
    });
  }
};

const SendReStart = async (Info) => {
  const res = await ReStart({
    ...Info,
    SatelliteServe: props.WssData.ServeID,
  });
  if (res.Code > 0) {
    window.$message.success('重启指令已发送!请等待页面跳转', {
      onAfterLeave() {
        mStorage.remove('SatelliteServe');
        window.location.replace('/SatelliteServe');
      },
      duration: 5000,
    });
  }
};

const SendTheOpen = async (Info) => {
  const res = await TheOpen({
    ...Info,
    SatelliteServe: props.WssData.ServeID,
  });
  if (res.Code > 0) {
    window.$message.success(res.Msg);
  }
};

const ApplyPublic = async () => {
  BtnStatus = 2;
};
</script>

<template>
  <div class="SysManage">
    <div className="SysManage__hint">当前版本：{{ props.WssData.SysVersion }}</div>
    <div className="SysManage__hint new">
      最新版本：{{ props.WssData.GithubVersion }}
      <a href="https://github.com/AItrade-mo7/CoinAIPackage" target="_blank" class="lineHeight">(GitHub)</a>
    </div>

    <div class="btn-wrapper">
      <n-button ghost type="error" @click="stopServer"> 停止服务 </n-button>
      <n-button ghost type="success" @click="restartServer"> 更新并重启 </n-button>
      <n-button ghost @click="ApplyPublic"> 公开服务 </n-button>
    </div>
    <div class="warn">
      <div v-if="BtnStatus == 0">
        <div v-if="isUpdate" class="SysManage__hint">
          建议执行
          <span className="lineHeight-success">更新并重启</span>
          操作或查看
          <RouterLink to="/About/ReleaseNotes" className="lineHeight">更新日志</RouterLink>
        </div>
        <div v-else>程序将 7*24 小时监听您的账户,并根据您的设置自动执行交易。</div>
      </div>
      <div v-if="BtnStatus == 1">
        将会从
        <a href="https://github.com/AItrade-mo7/CoinAIPackage" target="_blank" class="lineHeight">GitHub</a>
        下载最新安装包,并完成
        <span class="lineHeight-warn">冷重启</span>, 重启之后该服务下的所有账户将会重新受到托管。
        <n-button size="tiny" type="success" @click="SendFetch(1)">执行升级</n-button>
      </div>
      <div v-if="BtnStatus == -1">
        这将彻底
        <span class="lineHeight-err">停止</span>
        您的服务，<span class="lineHeight-err">彻底删除</span>包括程序文件和本地的运行日志。
        <br />
        但该服务器的数据不会丢失，稍后可重新部署并自动恢复。 <br />
        若想彻底删除数据，请在停止服务后前往
        <RouterLink to="/SatelliteServe" className="lineHeight"> 卫星服务管理列表 </RouterLink>
        执行删除。
        <n-button size="tiny" type="error" @click="SendFetch(-1)">我就是要停止它</n-button>
      </div>

      <div v-if="BtnStatus == 2">
        公开此卫星服务以便被其它人查看和使用，同时您具有该卫星服务的最高掌控权，未来也将开放更多的可自定义功能为您独享。<br />
        卫星服务下绑定的每一个 Key 都是平等的。 <br />
        同时该卫星服务的运营和维护以及安全也将由您来负责。
        <n-button size="tiny" type="primary" @click="SendFetch(2)">确认公开</n-button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.SysManage {
  font-size: 14px;
}

.SysManage__hint {
  color: #999;
  &.new {
    color: #0b8235;
  }
}
.lineHeight {
  color: #f0b90b;
}

.lineHeight-warn {
  color: #fcb040;
}
.lineHeight-err {
  color: #d03050;
}

.lineHeight-success {
  color: #18a058;
}

.btn-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;
}

.warn {
  font-size: 16px;
  margin-top: 20px;
}
</style>
