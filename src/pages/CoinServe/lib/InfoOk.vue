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

    <div class="title">APIKey 管控</div>
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
        </n-card>
      </template>
      <n-card embedded hoverable size="small">
        <RouterLink :to="`/CoinServe/AddKey?id=${WssData.ServeID}`" class="addBtn">
          <XIcon name="PlusOutlined" />
        </RouterLink>
      </n-card>
    </div>
  </div>
</template>

<style lang="less" scoped>
.title {
  font-weight: 700;
  font-size: 18px;
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
    width: 248px;
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
</style>
