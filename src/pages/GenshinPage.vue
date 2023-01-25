<script setup lang="ts">
import { UserInfoStore } from '@/store';
import { Logo } from '@/config/constant';
import { GenshinCheck } from '@/api/Account';
import { cloneDeep, UpLoadFileEncrypt, $lcg, getToken, setToken } from '@/utils/tools';
import AuthModal from '@/lib/AuthModal';

import { defineAsyncComponent } from 'vue';
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));

let SubmitStatus: boolean = $ref(false);
const formValue = $ref({
  Cookies: [''],
});

// 提交按钮
const Submit = async () => {
  SubmitStatus = true;
  const res = await GenshinCheck({
    ...cloneDeep(formValue),
  });
  SubmitStatus = false;
  if (res.Code > 0) {
  }
};

const AddLine = () => {
  formValue.Cookies.push('');
};

const RemoveLine = (index) => {
  formValue.Cookies.splice(index, 1);
};
</script>

<template>
  <PageTitle>米游社自动签到(原神)</PageTitle>
  <div class="PageWrapper">
    <div class="title">原神自动签到服务</div>

    <n-form :model="formValue" size="small" class="GenshinForm">
      <div class="Label">
        提交 Cookie (
        <n-button
          class="LinkBlog"
          text
          tag="a"
          href="https://blog.mo7.cc/tools/Genshin_auto_check"
          target="_blank"
          type="primary"
        >
          如何获取 Cookie ?
        </n-button>
        ) :
      </div>
      <div v-for="(item, index) in formValue.Cookies" class="InputWrapper">
        <n-form-item class="inputItem">
          <n-input
            v-model:value="formValue.Cookies[index]"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 5 }"
            name="Cookies"
            placeholder="填写Cookie, 例如：_MHYUUID=2bd94c1b-ffee-4cdd-87e8-ff0de88d2ba1; DEVICEFP_SE ......"
            :inputProps="{ autocomplete: 'password' }"
          >
            <XIcon name="SkinOutlined" />
          </n-input>
        </n-form-item>
        <div class="ReqResult" @click="RemoveLine(index)">
          <div>请求结果</div>
          <n-button tertiary circle type="error">
            <template #icon>
              <XIcon name="MinusCircleFilled" />
            </template>
          </n-button>
        </div>
      </div>

      <div class="SubmitItem">
        <n-button class="Submit" :disabled="SubmitStatus" type="primary" @click="Submit"> 提交 </n-button>
        <n-button class="Submit" :disabled="SubmitStatus" @click="AddLine">
          <template #icon>
            <XIcon name="PlusCircleFilled" />
          </template>
          新增一行
        </n-button>
      </div>
    </n-form>
  </div>
</template>

<style lang="less" scoped>
.GenshinForm {
  max-width: 800px;
  margin: 0 auto;
  margin-top: 30px;
  .Label {
    text-align: left;
  }
  .SubmitItem {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}

.InputWrapper {
  padding: 16px;

  .ReqResult {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.title {
  font-size: 16px;
  font-weight: bolder;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 18px;
}
</style>
