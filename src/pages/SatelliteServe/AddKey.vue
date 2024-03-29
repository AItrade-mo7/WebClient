<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { cloneDeep, GetParamServeID } from '@/utils/tools';
import { CopyText } from '@/utils/tools';
import AuthModal from '@/lib/AuthModal';
import { useRouter } from 'vue-router';
import { GetCoinAIConfig, SetKey } from '@/api/CoinAI/index';
import { defineAsyncComponent } from 'vue';
import { OKXjoin, OKXjoinCode } from '@/config/constant';

const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));

const $router = useRouter();

let Config = $ref({
  AppEnv: {},
  GithubInfo: {},
});

let SubmitStatus: boolean = $ref(false);
const formValue = $ref({
  Name: '',
  ApiKey: '',
  SecretKey: '',
  Passphrase: '',
  Password: '',
});

const SendForm = async () => {
  const res = await SetKey({
    ...cloneDeep(formValue),
    SatelliteServe: Config.AppEnv.ServeID,
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

function GetConfig(ServeID) {
  GetCoinAIConfig({
    SatelliteServe: ServeID,
  })
    .then((res) => {
      if (res.Code > 0) {
        Config = res.Data;
      }
    })
    .catch(() => {
      window.$message.error('服务尚未启动', {
        onAfterLeave() {
          window.location.href = '/SatelliteServe';
        },
      });
    });
}

onMounted(() => {
  const ServeID = GetParamServeID();
  GetConfig(ServeID);
});

const copyFun = () => {
  CopyText(Config.AppEnv.IP);
};
const copyJoinCode = (text) => {
  CopyText(text);
};

const IsEnCode = () => {
  if (formValue.ApiKey || formValue.SecretKey || formValue.Passphrase) {
    return true;
  }
  return false;
};
</script>

<template>
  <PageTitle>
    新增 OKX API 密钥
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

      <n-form-item class="myForm__item" label="密码 (申请欧意 V5 API 时设置的密码短语)">
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

      <n-form-item class="myForm__item" label="复制以下内容 并填写到【绑定IP地址】一栏">
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
        <div class="input_hint_wrapper">
          <div class="input_hint" v-if="IsEnCode()">您当前的输入已被加密</div>
          <n-button class="Submit" :disabled="SubmitStatus" type="primary" @click="Submit"> 提交 </n-button>
        </div>
      </n-form-item>
    </n-form>

    <div class="joinFooter">
      <div>
        <span class="joinCode">注册邀请码： {{ OKXjoinCode }}</span>
        <n-button type="primary" size="tiny" @click="copyJoinCode(OKXjoinCode)"> 复制 </n-button>

        <br />
        <n-button text tag="a" :href="OKXjoin" target="_blank" type="primary"> 邀请链接 </n-button>
      </div>
    </div>

    <div class="pageFooter">
      <RouterLink to="/About/OkxKey" className="CreateOkxKey__about--footer"> OKX秘钥申请指南 </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/config/constant.scss';
.Create__title {
  font-size: 16px;
  margin: 0;
  .About__btn {
    color: $mainColor;
  }
}
.CreateOkxKey__about {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .n-button {
    color: $mainColor;
  }
}
.pageFooter {
  text-align: center;
  margin-bottom: 12px;
}
.CreateOkxKey__about--footer {
  text-align: center;
  color: $mainColor;
}

.page__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.joinFooter {
  text-align: center;
  margin-bottom: 12px;
}
.joinCode {
  margin-right: 6px;
}
.joinLink {
  color: $mainColor;
  display: inline-block;
  margin-top: 12px;
}
</style>
