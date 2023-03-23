<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
</script>

<template>
  <PageTitle> 用户协议与免责声明 </PageTitle>
  <div>
    <br />
    用户协议与免责声明 【 尚未完善 】：<br />

    本系统不会向中国大陆地区用户提供服务。若有任何触犯当地法律的行为，本系统将会立即终止相关服务。<br />
    卫星服务开源免费，其使用和运行，是用户自的主行为，跟本系统没有任何关系。<br />

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
    PS： 注销功能尚在开发当中。<br />
  </div>
</template>

<style lang="less" scoped></style>
