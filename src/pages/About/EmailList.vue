<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue';
import { GetSysEmailList } from '@/api/Ping';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));

let EmailList = $ref([]);
onMounted(() => {
  GetSysEmailList().then((res) => {
    EmailList = res.Data;
  });
});
</script>

<template>
  <PageTitle> 系统邮箱地址列表 </PageTitle>
  <div>
    <ul class="emailWrapper">
      <li v-for="item in EmailList">
        {{ item }}
      </li>
    </ul>
    <div>
      出于成本和政策原因，采用了 QQ 和 Gmail 邮箱服务用作系统邮件通知。 上述邮箱开发者很久才会登录一次。请勿回复。
      <br />
      系统发送给您的每一封电子邮件末尾必定带有【防钓鱼码】。否则可视为无效。
      <br />
      遇到任何问题可以发送邮件至：
      <br />
      <n-button
        text
        tag="a"
        href="mailto:meichangliang@outlook.com?subject=【AItrade求助】"
        target="_blank"
        type="primary"
      >
        meichangliang@outlook.com
      </n-button>
      <br />
      或者添加飞书群（请遵守相关条例法规）
      <br />
      <img class="feishu_code" src="//file.mo7.cc/disk/feishu_code.jpg" alt="" srcset="" />
      <br />
      <br />
    </div>
  </div>
</template>

<style lang="less" scoped>
.emailWrapper {
  font-size: 18px;
  li {
    margin: 14px 0;
  }
}

.hint {
  color: #999;
}

.linehig {
  color: #f0b90b;
}

.feishu_code {
  max-width: 80%;
}
</style>
