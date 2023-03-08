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
      出于成本和政策原因，采用了 QQ 和 Gmail 邮箱服务用系统邮件通知。 上述邮件开发者很久才会登录一次。
      <br />
      遇到任何问题可以发送邮件至：
      <br />
      <span class="linehig"> meichangliang@outlook.com </span>
      <br />
      或者添加飞书群
      <br />
      群二维码：
      <img class="feishu_code" src="//file.mo7.cc/disk/feishu_code.jpg" alt="" srcset="" />
      <span class="hint">注： 此列表会根据业务需求动态扩增。</span>
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
