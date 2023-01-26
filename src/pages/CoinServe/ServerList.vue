<script setup lang="ts">
import { h, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import { GetCoinAILIst, GetPublicCoinAILIst, RemoveCoinAI } from '@/api/CoinAI/GetList';
import { GetCoinAIConfig } from '@/api/CoinAI/index';
import { cloneDeep } from '@/utils/tools';
import AuthModal from '@/lib/AuthModal';

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
  AuthModal({
    IsPassword: true,
    async OkBack(param) {
      const Password = param.Password;
      SubmitStatus = true;
      return RemoveCoinAI({
        ServeID,
        Password,
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
  var newList = cloneDeep(list);
  for (let i = 0; i < newList.length; i++) {
    const item = newList[i];
    GetCoinAIConfig({
      CoinServeID: item.ServeID,
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
onMounted(() => {
  GetCoinAILIstFun();
});

const Reload = () => {
  window.location.reload();
};
</script>

<template>
  <PageTitle>
    CoinServe
    <template #after>
      <RouterLink to="/About/CoinServe" className="CoinServe__about">
        <n-button circle quaternary size="tiny" class="About__btn">
          <template #icon> <XIcon name="QuestionCircleOutlined" /> </template>
        </n-button>
      </RouterLink>
      <n-button strong secondary type="warning" size="tiny" class="reload_btn" @click="Reload"> 刷新 </n-button>
    </template>
  </PageTitle>
  <div class="PageWrapper">
    <n-alert title="如果服务器状态不正确，请手动刷新页面。" type="warning" closable></n-alert>
    <div class="title">我的 CoinAI 服务</div>
    <div class="explain">
      部署私人的 CoinAI
      机器人交易服务，更加稳定可靠。交易延迟更低，下单不用排队。拥有独立的邮箱提醒服务和系统错误反应机制。可以第一时间知道特殊行情和系统运行状态。
    </div>
    <div class="ListWrapper">
      <n-card v-for="item in ServeList" :key="item.ServeID" :title="item.ServeID" embedded hoverable size="small">
        <div class="Server__item">
          <span class="Server__label"> Name </span>
          <span class="Server__val">
            {{ item.Name }}
          </span>
        </div>
        <div class="Server__item">
          <span class="Server__label"> Version </span>
          <span class="Server__val">
            {{ item.Version }}
          </span>
        </div>
        <template #footer>
          <div class="card_footer">
            <RouterLink :to="`/CoinServe/CoinAI?id=${item.ServeID}`" v-if="item.Status == 2">
              <n-button size="small" type="success"> 进入 </n-button>
            </RouterLink>
            <n-button
              size="small"
              v-else-if="item.Status == -2"
              type="error"
              :disabled="SubmitStatus"
              @click="RemoveCoinAIFun(item.ServeID)"
            >
              删除
            </n-button>
            <n-button size="small" v-else type="info" @click="RemoveCoinAIFun(item.ServeID)"> 加载中。。。 </n-button>
          </div>
        </template>
      </n-card>
      <n-card embedded hoverable size="small">
        <RouterLink to="/CoinServe/CreateCoinServe" class="addBtn">
          <XIcon name="PlusOutlined" />
        </RouterLink>
      </n-card>
    </div>
    <hr />
    <div class="title">公共 CoinAI 服务</div>
    <div class="explain">使用开发者提供的 CoinAI 服务，简单方便。</div>
    <div class="ListWrapper">
      <n-card v-for="item in PublicList" :key="item.ServeID" :title="item.ServeID" embedded hoverable size="small">
        <div class="Server__item">
          <span class="Server__label"> Name </span>
          <span class="Server__val">
            {{ item.Name }}
          </span>
        </div>
        <div class="Server__item">
          <span class="Server__label"> Version </span>
          <span class="Server__val">
            {{ item.Version }}
          </span>
        </div>
        <template #footer>
          <div class="card_footer">
            <RouterLink :to="`/CoinServe/CoinAI?id=${item.ServeID}`" v-if="item.Status == 2">
              <n-button size="small" type="success"> 进入 </n-button>
            </RouterLink>
            <n-button
              size="small"
              v-else-if="item.Status == -2"
              type="error"
              :disabled="SubmitStatus"
              @click="RemoveCoinAIFun(item.ServeID)"
            >
              删除
            </n-button>
            <n-button size="small" v-else type="info" @click="RemoveCoinAIFun(item.ServeID)"> 加载中。。。 </n-button>
          </div>
        </template>
      </n-card>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';
.CoinServe__about {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .n-button {
    color: @mainColor;
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
    height: 184px;
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
}

.explain {
  color: @mainColor;
  margin-bottom: 12px;
}

.Server__item {
  word-break: break-all;
  display: flex;
  font-size: 12px;
  padding: 8px 0;
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
  color: @mainColor;
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
</style>
