<script setup lang="ts">
import { GetEmailList, AddEmail, SetMainEmail, DelEmail } from '@/api/Account';
import { defineAsyncComponent, onMounted } from 'vue';
import { verifyConfig } from '@/utils/verify';
import { cloneDeep } from '@/utils/tools';
import AuthModal from '@/lib/AuthModal';

const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
const SendCode = defineAsyncComponent(() => import('@/lib/SendCode.vue'));

let EmailInfo = $ref({});
const GetList = () => {
  GetEmailList().then((res) => {
    if (res.Code > 0) {
      EmailInfo = res.Data;
    }
  });
  formValue.Email = '';
  formValue.EmailCode = '';
  formValue.Password = '';
};

let SubmitStatus: boolean = $ref(false);

const formValue = $ref({
  Email: '',
  EmailCode: '',
  Password: '',
});

const Submit = async () => {
  const v1 = verifyConfig('Email', formValue.Email);
  const v2 = verifyConfig('Code', formValue.EmailCode);
  if (v1 || v2) {
    window.$message.warning(v1 || v2);
    return;
  }

  SubmitStatus = true;
  const res = await AddEmail({
    ...cloneDeep(formValue),
  });
  SubmitStatus = false;
  if (res.Code > 0) {
    GetList();
  }
};

const SetMainBtn = (item) => {
  AuthModal({
    Title: `邮件已发送至${item}`,
    Email: item,
    EmailAction: '设置主要邮箱',
    IsPassword: true,
    async OkBack(param) {
      formValue.Email = item;
      formValue.EmailCode = param.Code;
      formValue.Password = param.Password;
      return SetMainEmail({
        ...cloneDeep(formValue),
      }).then(() => {
        GetList();
      });
    },
  });
};
const DelBtn = (item) => {
  AuthModal({
    Title: '邮件已发送至主要邮箱',
    Email: EmailInfo.Email,
    EmailAction: `删除邮箱${item}`,
    IsPassword: true,
    async OkBack(param) {
      formValue.Email = item;
      formValue.EmailCode = param.Code;
      formValue.Password = param.Password;
      return DelEmail({
        ...cloneDeep(formValue),
      }).then(() => {
        GetList();
      });
    },
  });
};

onMounted(() => {
  GetList();
});
</script>

<template>
  <PageTitle>ManageEmail</PageTitle>
  <div class="PageWrapper ManageEmail">
    <div className="Personal__info">
      <n-avatar round :size="70" :src="EmailInfo.Avatar" />
      <div className="Personal__NickName">{{ EmailInfo.NickName }}</div>
      <div className="Personal__Email">{{ EmailInfo.Email }}</div>
    </div>

    <div class="EmailWrapper">
      <div
        v-for="(item, index) in EmailInfo.UserEmail"
        :key="index"
        class="Email_item"
        :class="{
          Main: item == EmailInfo.Email,
        }"
      >
        <div class="Email">
          {{ item }}
        </div>
        <div v-if="item == EmailInfo.Email" class="MainTxt">主要</div>
        <div v-if="item != EmailInfo.Email" class="Btn">
          <n-button size="tiny" type="error" @click="DelBtn(item)"> 删除 </n-button>
          <n-button size="tiny" type="primary" @click="SetMainBtn(item)"> 设为主要 </n-button>
        </div>
      </div>
      <div class="AddWrapper">
        <n-form ref="loginForm" :model="formValue" size="small" class="myForm">
          <n-form-item class="myForm__item">
            <n-input
              name="Email"
              v-model:value="formValue.Email"
              :inputProps="{ autocomplete: 'password' }"
              placeholder="新增邮箱地址"
            >
              <template #prefix> <XIcon name="MailOutlined" /> </template>
            </n-input>
          </n-form-item>

          <n-form-item class="myForm__item">
            <n-input-group>
              <n-input
                name="EmailCode"
                v-model:value="formValue.EmailCode"
                :inputProps="{ autocomplete: 'password' }"
                placeholder="请输入6位验证码"
                :maxlength="6"
              />
              <SendCode :Email="formValue.Email" Action="新增邮箱" />
            </n-input-group>
          </n-form-item>

          <n-form-item class="myForm__item">
            <n-input
              v-model:value="formValue.Password"
              type="password"
              name="Password"
              show-password-on="click"
              placeholder="请输入密码"
              :inputProps="{ autocomplete: 'password' }"
            ></n-input>
          </n-form-item>

          <n-form-item class="myForm__item">
            <n-button class="Submit" :disabled="SubmitStatus" type="primary" @click="Submit"> 新增邮箱 </n-button>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.PageWrapper {
  text-align: center;
}

.EmailWrapper {
  max-width: 500px;
  text-align: left;
  margin: 0 auto;
}

.Email_item {
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
  .Email {
    font-size: 18px;
    color: #999;
  }
  .MainTxt {
    display: none;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  .Btn {
    display: flex;
    button {
      margin: 5px;
    }
  }
}

.Email_item.Main {
  .Email {
    font-size: 22px;
    color: #333;
  }
  .MainTxt {
    display: block;
    color: #666;
    font-size: 16px;
  }
}

.AddWrapper {
  width: 100%;
  margin: 20px auto;
}

.Personal__info {
  margin-bottom: 24px;
  .n-avatar {
    margin-bottom: 6px;
    animation: Rotate infinite 36s linear;
  }
  .Personal__NickName {
    font-size: 16px;
    color: #333;
    margin-bottom: 4px;
  }
  .Personal__Email {
    font-size: 12px;
    color: #999;
  }
}
</style>

<style lang="less">
.ManageEmail {
  .n-form-item-feedback-wrapper {
    display: none;
  }
}
</style>
