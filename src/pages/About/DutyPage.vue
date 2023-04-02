<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { RouterLink } from 'vue-router';
import AuthModal from '@/lib/AuthModal';
import { RemoveAccount, logout } from '@/api/Account';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));

const RemoveAccountFun = () => {
  AuthModal({
    EmailAction: '注销账户操作',
    IsPassword: true,
    async OkBack(param) {
      return RemoveAccount({
        EmailCode: param.Code,
        Password: param.Password,
      }).then((res) => {
        window.$message.success(res.Msg);
        logout();
      });
    },
  });
};
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

    注销账户必要操作：<br /><br />

    <RouterLink class="link" to="/ApiKey"> 1. 必须删除所有的 ApiKey </RouterLink> <br /><br />
    <RouterLink class="link" to="/SatelliteServe"> 2. 必须停止并删除所有的卫星服务数据 </RouterLink> <br /><br />
    <RouterLink class="link" to="/ManageEmail"> 3. 必须解绑所有的额外邮箱 </RouterLink> <br /><br />

    <n-button type="error" @click="RemoveAccountFun()"> 注销此账户(不可挽回) </n-button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/config/constant.scss';
.link {
  color: $mainColor;
}
</style>
