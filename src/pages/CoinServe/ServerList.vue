<script setup lang="ts">
import { GetServerList, DelServer } from '@/api/CoinServe';
import { GetOkxKeyList } from '@/api/OkxKey';
import { DateFormat } from '@/utils/filters';
import { CoinFundPing } from '@/api/CoinAI';
import { $lcg, mStorage, cloneDeep } from '@/utils/tools';
import { useRouter } from 'vue-router';
import AuthModal from '@/lib/AuthModal';

import { defineAsyncComponent } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));

const $router = useRouter();
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
  <div class="PageWrapper">阿斯打扫</div>
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
