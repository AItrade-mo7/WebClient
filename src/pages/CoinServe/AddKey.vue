<script setup lang="ts">
import { h, onMounted, onUnmounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { cloneDeep, ParseOkxKey } from '@/utils/tools';
import { CopyText } from '@/utils/tools';
import AuthModal from '@/lib/AuthModal';
import { useRouter } from 'vue-router';
import { GetCoinAIConfig, SetKey } from '@/api/CoinAI/index';
import { defineAsyncComponent } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));

const $router = useRouter();

let Config = $ref({
  AppEnv: {},
  GithubInfo: {},
});

let SubmitStatus: boolean = $ref(false);
let formValue = $ref({
  Name: '',
  ApiKey: '',
  SecretKey: '',
  Passphrase: '',
  Password: '',
});

const SendForm = async () => {
  const res = await SetKey({
    ...cloneDeep(formValue),
    CoinServeID: Config.AppEnv.ServeID,
  });
  if (res.Code > 0) {
    window.$message.success(res.Msg);
    $router.go(-1);
  }
};

const Submit = async () => {
  SubmitStatus = true;
  AuthModal({
    IsPassword: true,
    async OkBack(param) {
      SubmitStatus = false;
      formValue.Password = param.Password;
      return SendForm();
    },
  });
  SubmitStatus = false;
};

const readPlate = async () => {
  const text = await navigator.clipboard.readText();
  const obj = ParseOkxKey(text);
  if (obj.ApiKey.length > 10) {
    window.$message.success('解析成功!');
    formValue = {
      ...formValue,
      ...obj,
    };
  } else {
    window.$message.warning('解析失败!');
  }
};

function GetConfig(ServeID) {
  GetCoinAIConfig({
    CoinServeID: ServeID,
  })
    .then((res) => {
      if (res.Code > 0) {
        Config = res.Data;
      }
    })
    .catch((err) => {
      window.$message.error('服务尚未启动', {
        onAfterLeave() {
          window.location.href = '/CoinServe';
        },
      });
    });
}

onMounted(() => {
  const route = useRoute();
  GetConfig(route.query.id);
});

const copyFun = () => {
  CopyText(Config.AppEnv.IP);
};
</script>

<template>
  <PageTitle>
    新增 OKX Key 密钥
    <template #after>
      <RouterLink to="/About/OkxKey" className="CreateOkxKey__about">
        <n-button circle quaternary size="tiny" class="About__btn">
          <template #icon> <XIcon name="QuestionCircleOutlined" /> </template>
        </n-button>
      </RouterLink>
    </template>
  </PageTitle>

  <div class="PageWrapper">
    <n-form ref="loginForm" :model="formValue" size="small" class="myForm">
      <n-form-item class="myForm__item" label="备注名">
        <n-input
          name="Name"
          v-model:value="formValue.Name"
          :inputProps="{ autocomplete: 'password' }"
          placeholder="申请秘钥时的备注名"
        >
          <template #prefix> <XIcon name="SkinOutlined" /> </template>
        </n-input>
      </n-form-item>

      <n-form-item class="myForm__item" label="密码短语">
        <n-input
          name="Passphrase"
          v-model:value="formValue.Passphrase"
          :inputProps="{ autocomplete: 'password' }"
          placeholder="申请 API key 时设置的密码"
        >
          <template #prefix> <XIcon name="OkxLogo" /> </template>
        </n-input>
      </n-form-item>

      <n-form-item class="myForm__item" label="API key">
        <n-input
          name="ApiKey"
          v-model:value="formValue.ApiKey"
          :inputProps="{ autocomplete: 'password' }"
          placeholder="okx 生成的 Api key"
        >
          <template #prefix> <XIcon name="OkxLogo" /> </template>
        </n-input>
      </n-form-item>

      <n-form-item class="myForm__item" label="Secret key">
        <n-input
          name="SecretKey"
          v-model:value="formValue.SecretKey"
          :inputProps="{ autocomplete: 'password' }"
          placeholder="okx 生成的 Secret key"
        >
          <template #prefix> <XIcon name="OkxLogo" /> </template>
        </n-input>
      </n-form-item>

      <n-form-item class="myForm__item" label="绑定IP地址">
        <n-input
          name="IP"
          v-model:value="Config.AppEnv.IP"
          :inputProps="{ autocomplete: 'password' }"
          disabled
          placeholder="申请密钥时绑定的IP地址"
        >
          <template #prefix> <XIcon name="OkxLogo" /> </template>
        </n-input>
        <n-button type="primary" @click="copyFun"> 复制 </n-button>
      </n-form-item>

      <n-form-item class="myForm__item">
        <n-button class="Submit" :disabled="SubmitStatus" type="primary" @click="Submit"> 提交 </n-button>
      </n-form-item>
      <div class="page__footer">
        <n-button size="tiny" tertiary type="success" @click="readPlate"> 读取剪切板 </n-button>
      </div>
    </n-form>
  </div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';
.Create__title {
  font-size: 16px;
  margin: 0;
  .About__btn {
    color: @mainColor;
  }
}
.CreateOkxKey__about {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .n-button {
    color: @mainColor;
  }
}

.page__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
