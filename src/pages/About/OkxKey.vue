<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { CopyText } from '@/utils/tools';
import { OKXBaseUrl, OKXjoin, OKXjoinCode } from '@/config/constant';

const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
const copyJoinCode = (text) => {
  CopyText(text);
};
</script>

<template>
  <PageTitle> OKX API Key 申请指南 </PageTitle>
  <div class="Content">
    <br />
    如何创建 OKX Api Key:
    <n-button
      text
      tag="a"
      href="https://helpokexsupport.zendesk.com/hc/zh-cn/articles/5181414708623-如何创建API"
      target="_blank"
      type="primary"
      class="createApiLinkBtn"
    >
      <div class="createApiLink">https://helpokexsupport.zendesk.com/hc/zh-cn/articles/5181414708623-如何创建API</div>
    </n-button>

    <h3>欧意(OKX)官网：</h3>
    官网：
    <n-button text tag="a" href="https://www.okx.com" target="_blank" type="primary"> https://www.okx.com </n-button>
    <br />
    备选地址：<n-button text tag="a" :href="OKXBaseUrl" target="_blank" type="primary">
      {{ OKXBaseUrl }}
    </n-button>

    <br />
    <br />

    开发者的邀请链接：
    <n-button text tag="a" :href="`${OKXjoin}`" target="_blank" type="primary">
      {{ OKXjoin }}
    </n-button>
    <br />
    <br />
    <span class="joinCode">注册邀请码： {{ OKXjoinCode }}</span>
    <n-button type="primary" size="tiny" @click="copyJoinCode(OKXjoinCode)"> 复制 </n-button>
    <br />
    <br />
    PS： 官方网址可能需要科学上网才能访问，推荐使用备选地址下载客户端，若备选地址失效请联系开发者更换。
  </div>
</template>

<style lang="scss" scoped>
.joinCode {
  margin-right: 6px;
}

.createApiLinkBtn {
  max-width: 100%;
  text-align: left;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
}
</style>
