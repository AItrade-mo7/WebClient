<script setup lang="ts">
import { cloneDeep } from '@/utils/tools';
import { useRouter } from 'vue-router';
import { Logo } from '@/config/constant';
import { Register } from '@/api/Account';
import { verifyConfig } from '@/utils/verify';

import { defineAsyncComponent } from 'vue';
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
const SendCode = defineAsyncComponent(() => import('@/lib/SendCode.vue'));
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));

const $router = useRouter();

let SubmitStatus: boolean = $ref(false);

const formValue = $ref({
  Email: '',
  Code: '',
  EntrapmentCode: '',
});

const Submit = async () => {
  const v1 = verifyConfig('Email', formValue.Email);
  const v2 = verifyConfig('Code', formValue.Code);
  if (v1 || v2) {
    window.$message.warning(v1 || v2);
    return;
  }

  SubmitStatus = true;
  const res = await Register({
    ...cloneDeep(formValue),
  });
  SubmitStatus = false;
  if (res.Code > 0) {
    window.$notification.success({
      meta: res.Data,
      content: res.Msg,
      onClose() {
        $router.replace('/Login');
      },
    });
  } else if (res.Code == -13) {
    setTimeout(() => {
      $router.replace('/Login');
    }, 1000);
  }
};
</script>

<template>
  <PageTitle>Register</PageTitle>
  <div class="PageWrapper">
    <div className="logo-box">
      <img className="logo" :src="Logo" alt="" />
    </div>
    <h2 className="title">
      <div>注册</div>
    </h2>

    <n-form ref="loginForm" :model="formValue" size="small" class="myForm">
      <n-form-item class="myForm__item">
        <div class="input_hint_wrapper">
          <n-input
            name="Email"
            v-model:value="formValue.Email"
            :inputProps="{ autocomplete: 'password' }"
            placeholder="请输入邮箱地址"
          >
            <template #prefix> <XIcon name="MailOutlined" /> </template>
          </n-input>
          <div class="input_hint">
            <span> 提示</span>：邮箱是您的身份凭证，请注意邮箱安全。
            <br />
            可以在
            <RouterLink class="link" to="/Personal">个人中心</RouterLink>
            进行管理。
          </div>
        </div>
      </n-form-item>

      <n-form-item class="myForm__item">
        <div class="input_hint_wrapper">
          <n-input
            name="EntrapmentCode"
            v-model:value="formValue.EntrapmentCode"
            :inputProps="{ autocomplete: 'password' }"
            placeholder="请输入防钓鱼码"
          >
            <template #prefix> <XIcon name="VerifiedOutlined" /> </template>
          </n-input>
          <div class="input_hint">
            <span>注意：</span>您收到的<span>任何</span>来自系统的邮件都会携带此防钓鱼码。
            <br />
            否则可视为<span>钓鱼邮件</span>。可在<RouterLink class="link" to="/Personal">个人中心</RouterLink>定期更换。
          </div>
        </div>
      </n-form-item>

      <n-form-item class="myForm__item">
        <div class="input_hint_wrapper">
          <n-input-group>
            <n-input
              name="Code"
              v-model:value="formValue.Code"
              :inputProps="{ autocomplete: 'password' }"
              placeholder="请输入6位验证码"
              :maxlength="6"
            />
            <SendCode :Email="formValue.Email" Action="注册" :EntrapmentCode="formValue.EntrapmentCode" />
          </n-input-group>
          <div class="input_hint">
            <RouterLink class="link" to="/About/EmailList">查看当前系统邮箱地址</RouterLink>
          </div>
        </div>
      </n-form-item>

      <n-form-item class="myForm__item">
        <n-button class="Submit" :disabled="SubmitStatus" type="primary" @click="Submit"> 注册 </n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';

.logo-box {
  padding-bottom: 36px;
}

.link {
  color: @mainColor;
}

.logo {
  display: block;
  border-radius: 100px;
  overflow: hidden;
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

.title {
  margin: 0;
  text-align: center;
}

.title-str {
  display: block;
}
.forget {
  text-align: center;
}
</style>
