<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import { GetCoinAILIst, GetPublicCoinAILIst, RemoveCoinAI } from '@/api/CoinAI/GetList';
import { GetCoinAIConfig } from '@/api/CoinAI/index';
import { cloneDeep, ServeIDToParam } from '@/utils/tools';
import AuthModal from '@/lib/AuthModal';
import { UserInfoStore } from '@/store';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));

let ServeList = $ref([]);
let PublicList = $ref([]);

const GetCoinAILIstFun = () => {
  GetCoinAILIst().then((res) => {
    if (res.Code > 0) {
      ServeList = res.Data;
      GetConfig(res.Data, 'my');
    }
  });

  GetPublicCoinAILIst().then((res) => {
    if (res.Code > 0) {
      PublicList = res.Data;
      GetConfig(res.Data, 'pub');
    }
  });
};

let SubmitStatus: boolean = $ref(false);
const RemoveCoinAIFun = (ServeID) => {
  GetCoinAILIstFun();
  AuthModal({
    Email: UserInfoStore.value.Email,
    IsPassword: true,
    EmailAction: `删除 ${ServeID} 服务`,
    async OkBack(param) {
      const Password = param.Password;
      const EmailCode = param.Code;
      SubmitStatus = true;
      return RemoveCoinAI({
        ServeID,
        Password,
        EmailCode,
      }).then((res) => {
        if (res.Code > 0) {
          GetCoinAILIstFun();
        }
        SubmitStatus = false;
      });
    },
  });
};

function GetConfig(list, lType) {
  const newList = cloneDeep(list);
  for (let i = 0; i < newList.length; i++) {
    const item = newList[i];
    GetCoinAIConfig({
      SatelliteServe: item.ServeID,
    })
      .then((res) => {
        if (res.Code > 0) {
          item.Status = 2;
        }
        if (lType == 'my') {
          ServeList[i] = item;
        }
        if (lType == 'pub') {
          PublicList[i] = item;
        }
      })
      .catch(() => {
        item.Status = -2;
        if (lType == 'my') {
          ServeList[i] = item;
        }
        if (lType == 'pub') {
          PublicList[i] = item;
        }
      });
  }
}

let timer: any = null;
onMounted(() => {
  GetCoinAILIstFun();
  clearInterval(timer);
  timer = setInterval(() => {
    GetCoinAILIstFun();
  }, 180000); // 3 分钟自动重新请求一次
});

const Reload = () => {
  window.location.reload();
};
</script>

<template>
  <PageTitle>
    SatelliteServe
    <template #after>
      <RouterLink to="/About/SatelliteServe" className="CoinServe__about">
        <n-button circle quaternary size="tiny" class="About__btn">
          <template #icon> <XIcon name="QuestionCircleOutlined" /> </template>
        </n-button>
      </RouterLink>
      <n-button strong secondary type="warning" size="tiny" class="reload_btn" @click="Reload"> 刷新 </n-button>
    </template>
  </PageTitle>
  <div class="PageWrapper">
    <n-alert title="如果服务器状态不正确，请手动刷新页面。" type="warning" closable></n-alert>
    <div class="title">我的卫星服务</div>
    <div class="explain">
      部署私人的卫星服务，更加稳定可靠。拥有独立的系统错误邮箱提醒机制。可以第一时间知道特殊行情和系统运行状态。
      适合有一定云服务运维经验的朋友。
    </div>
    <div class="ListWrapper">
      <n-card v-for="(item, index) in ServeList" :key="index" :title="item.ServeID" embedded hoverable size="small">
        <div class="Server__item">
          <span class="Server__label"> Name </span>
          <span class="Server__val">
            {{ item.SysName }}
          </span>
        </div>
        <div class="Server__item">
          <span class="Server__label"> Version </span>
          <span class="Server__val">
            {{ item.SysVersion }}
          </span>
        </div>
        <div class="Server__item">
          <span class="Server__label"> Type </span>
          <span class="Server__val">
            {{ item.Type }}
          </span>
        </div>
        <div class="Server__item">
          <span class="Server__label"> Describe </span>
          <span class="Server__val">
            {{ item.Describe }}
          </span>
        </div>
        <template #footer>
          <div class="card_footer">
            <RouterLink :to="`/SatelliteServe/CoinAI/${ServeIDToParam(item.ServeID)}`" v-if="item.Status == 2">
              <n-button size="small" type="success"> 进入 </n-button>
            </RouterLink>
            <template v-else-if="item.Status == -2">
              <n-button size="small" type="error" :disabled="SubmitStatus" @click="RemoveCoinAIFun(item.ServeID)">
                删除
              </n-button>
              <RouterLink class="Reboot" :to="`/SatelliteServe/CreateCoinServe?port=${item.Port}`">
                <n-button size="small" type="primary"> 重新部署 </n-button>
              </RouterLink>
            </template>
            <n-button size="small" v-else type="info" @click="RemoveCoinAIFun(item.ServeID)"> 加载中。。。 </n-button>
          </div>
        </template>
      </n-card>
      <n-card embedded hoverable size="small">
        <RouterLink to="/SatelliteServe/CreateCoinServe" class="addBtn">
          <XIcon name="PlusOutlined" />
        </RouterLink>
      </n-card>
    </div>
    <hr />
    <div class="title">公开的卫星服务</div>
    <div class="explain">使用他人公开的卫星服务，简单方便。系统的运行状态和权限归服务器所有者掌控。</div>
    <div class="ListWrapper">
      <n-card v-for="(item, index) in PublicList" :key="index" :title="item.ServeID" embedded hoverable size="small">
        <div class="Server__item">
          <span class="Server__label"> Name </span>
          <span class="Server__val">
            {{ item.SysName }}
          </span>
        </div>
        <div class="Server__item">
          <span class="Server__label"> Version </span>
          <span class="Server__val">
            {{ item.SysVersion }}
          </span>
        </div>
        <div class="Server__item">
          <span class="Server__label"> Type </span>
          <span class="Server__val">
            {{ item.Type }}
          </span>
        </div>
        <div class="Server__item">
          <span class="Server__label"> Describe </span>
          <span class="Server__val">
            {{ item.Describe }}
          </span>
        </div>
        <template #footer>
          <div class="card_footer">
            <RouterLink class="OwnerBtn" :to="`/SatelliteServe/MainUser/${ServeIDToParam(item.ServeID)}`">
              <n-button size="small" tertiary type="primary"> 查看拥有者 </n-button>
            </RouterLink>
            <RouterLink :to="`/SatelliteServe/CoinAI/${ServeIDToParam(item.ServeID)}`" v-if="item.Status == 2">
              <n-button size="small" type="success"> 进入 </n-button>
            </RouterLink>
            <template v-else-if="item.Status == -2">
              <n-button size="small" type="error"> 故障！ </n-button>
            </template>
            <n-button size="small" v-else type="info" @click="RemoveCoinAIFun(item.ServeID)"> 加载中。。。 </n-button>
          </div>
        </template>
      </n-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/config/constant.scss';
.CoinServe__about {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .n-button {
    color: $mainColor;
  }
}
.ListWrapper {
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .n-card {
    margin: 0 4px;
    margin-bottom: 8px;
    display: inline-block;
    width: 248px;
    height: auto;
  }
  .n-card__content {
    padding: 12px;
    padding-top: 12px;
    .Server_del {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }

  .OwnerBtn {
    margin-right: 12px;
    display: inline-block;
  }
}

.explain {
  color: $mainColor;
  margin-bottom: 12px;
}

.Server__item {
  word-break: break-all;
  display: flex;
  font-size: 12px;
  padding: 4px 0;
  align-items: center;
}
.Server__label {
  width: 74px;
  flex-grow: 0;
  flex-shrink: 0;
  color: #999;
  &::after {
    content: ':';
  }
}

.Server__val {
  color: #333;
}

.Server__link {
  color: $mainColor;
}

.card_footer {
  text-align: right;
}

.addBtn {
  display: block;
  height: 148px;
  width: 148px;
  margin: 0 auto;
  .xicon {
    display: block;
    width: 148px;
    height: 148px;
    font-size: 30px;
    line-height: 148px;
    text-align: center;
  }
}

.title {
  font-size: 18px;
  font-weight: 700;
  margin-top: 12px;
  margin-bottom: 10px;
}

.reload_btn {
  margin-left: 4px;
  margin-right: 4px;
}

.Reboot {
  margin-left: 12px;
}
</style>
