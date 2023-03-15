<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
</script>

<template>
  <PageTitle> 用户协议与免责声明 </PageTitle>
  <div>
    <br />
    <br />
    用户协议与免责声明 [暂时还没有]

    <hr />
    <br />
    注销功能：<br />
    1. 发出警告并验证邮箱和密码<br />
    2. 检查是否绑定秘钥<br />
    3. 检查是否存在正在运行的卫星服务<br />
    4. 检查是否解绑所有邮箱<br />
    5. 检查是否存在其余的历史数据<br />
    6. 发出警告并请求确认<br />
    7. 永久删除该条用户数据<br />
    PS： 注销功能尚在规划当中。<br />
  </div>
</template>

<style lang="less" scoped></style>
