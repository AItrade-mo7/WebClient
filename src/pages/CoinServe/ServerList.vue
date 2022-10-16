<script setup lang="ts">
import { h, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import { GetCoinAILIst } from '@/api/CoinAI/GetList';
import { GetCoinAIConfig } from '@/api/CoinAI/index';
import { cloneDeep } from '@/utils/tools';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));

var ServeList = $ref([]);

const GetCoinAILIstFun = () => {
  GetCoinAILIst().then((res) => {
    if (res.Code > 0) {
      ServeList = res.Data;
      GetConfig(res.Data);
    }
  });
};

function GetConfig(list) {
  var newList = cloneDeep(list);
  for (let i = 0; i < newList.length; i++) {
    const item = newList[i];
    GetCoinAIConfig({
      CoinServeID: item.ServeID,
    }).then((res) => {
      if (res.Code > 0) {
        item.Status = true;
      } else {
        item.Status = false;
      }
      console.log(i);

      ServeList[i] = item;
    });
  }
}

onMounted(() => {
  GetCoinAILIstFun();
});
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
    </template>
  </PageTitle>
  <div class="PageWrapper">
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
            <RouterLink :to="`/CoinServe/CoinAI?id=${item.ServeID}`" v-if="item.Status">
              <n-button size="small" type="success"> 进入 </n-button>
            </RouterLink>
            <n-button size="small" v-else type="error"> 删除 </n-button>
          </div>
        </template>
      </n-card>
    </div>
    <div>
      <RouterLink to="/CoinServe/CreateCoinServe">
        <n-button type="primary">
          <template #icon>
            <XIcon name="AITradeLogo" />
          </template>
          创建一个 CoinAI.net 服务
        </n-button>
      </RouterLink>
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
  .n-card {
    margin: 0 4px;
    margin-bottom: 8px;
    display: inline-block;
    width: 248px;
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
  color: #333;
  &::after {
    content: ':';
  }
}

.Server__val {
  color: #999;
}

.Server__link {
  color: @mainColor;
}

.card_footer {
  text-align: right;
}
</style>
