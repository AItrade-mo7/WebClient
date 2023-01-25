<script setup lang="ts">
import { UserInfoStore } from '@/store';
import { Logo } from '@/config/constant';
import { GenshinCheck, GetGenshinCookie } from '@/api/Account';
import { cloneDeep, UpLoadFileEncrypt, $lcg, getToken, setToken } from '@/utils/tools';
import AuthModal from '@/lib/AuthModal';

import { defineAsyncComponent } from 'vue';
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));

let SubmitStatus: boolean = $ref(false);
const formValue = $ref({
  Cookie: '',
});

let ReqResult = $ref('');

// 提交按钮
const Submit = async () => {
  SubmitStatus = true;

  const res = await GenshinCheck({
    Cookie: formValue.Cookie,
  });

  ReqResult = JSON.stringify(res);

  SubmitStatus = false;
};
</script>

<template>
  <PageTitle>米游社自动签到(原神)</PageTitle>
  <div class="PageWrapper">
    <div class="title">原神自动签到服务</div>

    <n-form :model="formValue" size="small" class="GenshinForm">
      <div class="Label">
        提交并验证

        <n-button class="LinkBlog" text tag="a" href="https://www.miyoushe.com/ys" target="_blank" type="primary">
          米游社
        </n-button>

        Cookie (
        <n-button
          class="LinkBlog"
          text
          tag="a"
          href="https://blog.mo7.cc/tools/Genshin_auto_check"
          target="_blank"
          type="primary"
        >
          如何获取 米游社 Cookie ?
        </n-button>
        ) :
      </div>
      <n-form-item class="inputItem">
        <n-input
          v-model:value="formValue.Cookie"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 5 }"
          name="Cookies"
          placeholder="填写Cookie, 例如：_MHYUUID=2bd94c1b-ffee-4cdd-87e8-ff0de88d2ba1; DEVICEFP_SE ......"
          :inputProps="{ autocomplete: 'password' }"
        >
          <XIcon name="SkinOutlined" />
        </n-input>
      </n-form-item>

      <div>
        {{ ReqResult }}
      </div>

      <div class="SubmitItem">
        <n-button class="Submit" :disabled="SubmitStatus" type="primary" @click="Submit"> 提交（测试） </n-button>
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

.ReqResult {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-size: 16px;
  font-weight: bolder;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 18px;
}
</style>
