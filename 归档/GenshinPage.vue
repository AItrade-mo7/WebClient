<script setup lang="ts">
import { onMounted } from 'vue';
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

const Info = $ref({
  CreateTime: '',
});

let ReqResult = $ref('');

function GetDBCookie() {
  GetGenshinCookie().then((res) => {
    if (res.Code > 0) {
      Info.CreateTime = res.Data.CreateTimeStr;
      formValue.Cookie = res.Data.MiYouSheCookie;
    }
  });
}

onMounted(() => {
  GetDBCookie();
});

// 提交按钮
const Submit = async () => {
  SubmitStatus = true;

  const res = await GenshinCheck({
    Cookie: formValue.Cookie,
  });

  ReqResult = JSON.stringify(res);

  SubmitStatus = false;

  GetDBCookie();
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
          :autosize="{ minRows: 5 }"
          name="Cookies"
          placeholder="填写Cookie, 例如：cookie_token_v2=v2_A_zUAV- ......"
          :inputProps="{ autocomplete: 'password' }"
        >
          <XIcon name="SkinOutlined" />
        </n-input>
      </n-form-item>
      <div class="UpdateTime" v-if="Info.CreateTime">Cookie 已存入数据库，上次更新时间: {{ Info.CreateTime }}</div>

      <div v-if="ReqResult" class="resultView"><span> 爬虫结果：</span>{{ ReqResult }}</div>

      <div class="SubmitItem">
        <n-button class="Submit" :disabled="SubmitStatus" type="primary" @click="Submit"> 提交（测试） </n-button>
      </div>
    </n-form>

    <div class="prompt">
      注意：每天的 1,10,15,21 点 会自动触发一次签到，签到出现问题则会发送邮件到当前邮箱，届时需要重新获取新的 Cookie
      并提交。
    </div>
  </div>
</template>
<style lang="less">
.GenshinForm {
  .n-form-item-feedback-wrapper {
    display: none;
  }
}
</style>

<style lang="less" scoped>
.GenshinForm {
  max-width: 800px;
  margin: 0 auto;
  margin-top: 30px;
  .Label {
    text-align: left;
  }
  .SubmitItem {
    margin-top: 18px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .n-form-item-feedback-wrapper {
    display: none;
  }
}

.ReqResult {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.UpdateTime {
  font-size: 14px;
  text-align: right;
  color: #999;
  margin: 12px 0;
}

.title {
  font-size: 16px;
  font-weight: bolder;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 18px;
}

.resultView {
  border: 1px solid #999;
  padding: 6px;
  span {
    color: #e2aa53;
  }
}

.prompt {
  font-size: 16px;
  text-align: center;

  max-width: 600px;
  margin: 0 auto;
  background-color: #e2aa53;
  padding: 6px 12px;
  border-radius: 8px;
  margin-top: 28px;
}
</style>
