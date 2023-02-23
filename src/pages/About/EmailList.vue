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
      <span class="linehig"> meichangliang@gmail.com </span>
      和
      <span class="linehig"> meichangliang@qq.com </span>
      则为开发者自用邮箱。
      <br />
      <span class="hint">注： 此列表会根据业务需求动态扩增。</span>
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
</style>
