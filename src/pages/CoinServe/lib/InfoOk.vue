<script setup lang="ts">
import { DateFormat } from '@/utils/filters';
import { defineAsyncComponent } from 'vue';
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));

const props = defineProps({
  WssData: Object,
});
</script>

<template>
  <div class="InfoOk" v-if="WssData.DataSource">
    <div class="title">系统状态</div>
    <n-space class="data-wrapper">
      <div class="block">
        <span class="label">系统时间</span>
        <span class="value"> {{ DateFormat(WssData.SysTime, true, true) }} </span>
      </div>
    </n-space>

    <div class="title">
      APIKey 管理
      <RouterLink :to="`/CoinServe/AddKey?id=${WssData.ServeID}`" class="addBtn">
        <n-button type="primary" size="tiny" circle>
          <template #icon>
            <XIcon name="PlusOutlined" />
          </template>
        </n-button>
      </RouterLink>
    </div>
    <div class="APIKeyWrapper">
      <template v-if="WssData.ApiKeyList">
        <n-card v-for="item in WssData.ApiKeyList" :key="item.Name" :title="item.Name" embedded hoverable size="small">
          <div class="Server__item">
            <span class="Server__label">ApiKey </span>
            <span class="Server__val">
              {{ item.ApiKey }}
            </span>
          </div>
          <div class="Server__item">
            <span class="Server__label">SecretKey </span>
            <span class="Server__val">
              {{ item.SecretKey }}
            </span>
          </div>
          <div class="Server__item">
            <span class="Server__label">Passphrase </span>
            <span class="Server__val">
              {{ item.Passphrase }}
            </span>
          </div>
          <template #footer>
            <div class="card_footer">
              <n-button size="small" v-if="!item.IsTrade" type="success"> 启用 </n-button>
              <n-button size="small" v-if="item.IsTrade" type="tertiary"> 禁用 </n-button>
              <n-button size="small" type="error"> 删除 </n-button>
              <n-button size="small" type="primary"> 查看详情 </n-button>
            </div>
          </template>
        </n-card>
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
.title {
  font-weight: 700;
  font-size: 18px;
  display: flex;
  align-items: center;
  .addBtn {
    display: block;
    margin-left: 12px;
  }
}
.data-wrapper {
  .block {
    font-size: 14px;
    .label {
      color: #666;
      font-size: 12px;
      &::after {
        content: ' : ';
      }
    }
  }
}

.APIKeyWrapper {
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  .n-card {
    margin: 0 4px;
    margin-bottom: 8px;
    display: inline-block;
    width: 230px;
  }
  .n-card__content {
    padding: 12px;
    padding-top: 12px;
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

.card_footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
