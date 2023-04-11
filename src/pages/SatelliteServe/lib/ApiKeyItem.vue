<script setup lang="ts">
import { UserInfoStore } from '@/store';
import AuthModal from '@/lib/AuthModal';
import { cloneDeep } from '@/utils/tools';
import { HandleKey } from '@/api/CoinAI/index';

const $emit = defineEmits(['ShowDetail']);
const props = defineProps({
  ApiKey: Object,
  WssData: Object,
  ApiKeyIdx: Number,
});

const ShowDetail = (index) => {
  $emit('ShowDetail', index);
};

const GetHunterData = () => {
  const HunterMap = cloneDeep(props.WssData.HunterData);

  let HunterData: any = {};

  if (props.ApiKey.Hunter.length > 1) {
    HunterData = HunterMap[props.ApiKey.Hunter] || {};
  }

  return HunterData;
};

let HandleKeyStatus: boolean = $ref(false);
let HandleKeyFormValue = $ref({
  Name: '',
  Password: '',
  Type: '',
});

const SendForm = async () => {
  const res = await HandleKey({
    ...cloneDeep(HandleKeyFormValue),
    SatelliteServe: props.WssData.ServeID,
  });
  if (res.Code > 0) {
    window.$message.success(res.Msg);
  }
  window.$Event['CoinAIGetConfig']();
};

const HandleKeySubmit = async (type: string, name: string) => {
  HandleKeyFormValue = {};
  HandleKeyStatus = true;
  AuthModal({
    IsPassword: true,
    async OkBack(param) {
      HandleKeyStatus = false;
      HandleKeyFormValue.Password = param.Password;
      HandleKeyFormValue.Type = type;
      HandleKeyFormValue.Name = name;
      return SendForm();
    },
  });
  HandleKeyStatus = false;
};
const ShowMyAccount = (index) => {
  window.$message.warning(`当前功能尚在开发中${index}`);
};
</script>

<template>
  <n-card :title="props.ApiKey.Name" embedded hoverable size="small" class="ApiKeyItem">
    <div class="Server__item">
      <span class="Server__label">ApiKey </span>
      <span class="Server__val">
        {{ props.ApiKey.ApiKey }}
      </span>
    </div>
    <div class="Server__item">
      <span class="Server__label">SecretKey </span>
      <span class="Server__val">
        {{ props.ApiKey.SecretKey }}
      </span>
    </div>
    <div class="Server__item">
      <span class="Server__label">Passphrase </span>
      <span class="Server__val"> {{ props.ApiKey.Passphrase }} </span>
    </div>

    <template #footer>
      <div class="card_footer" v-if="UserInfoStore.value.UserID == props.ApiKey.UserID">
        <n-button
          size="small"
          type="error"
          :disabled="HandleKeyStatus"
          v-if="!GetHunterData().HunterName"
          @click="HandleKeySubmit('delete', props.ApiKey.Name)"
        >
          删除
        </n-button>

        <n-button
          class="disableBtn"
          v-if="!GetHunterData().HunterName"
          size="small"
          type="tertiary"
          @click="ShowDetail(ApiKeyIdx)"
        >
          请选择策略
        </n-button>

        <n-button size="small" v-if="GetHunterData().HunterName" @click="ShowMyAccount(ApiKeyIdx)">
          显摆/低调
        </n-button>
        <n-button size="small" v-if="GetHunterData().HunterName" type="primary" @click="ShowDetail(ApiKeyIdx)">
          查看详情
        </n-button>
      </div>
    </template>
  </n-card>
</template>

<style lang="scss" scoped>
@import '@/config/constant.scss';

.Server__item {
  word-break: break-all;
  display: flex;
  font-size: 12px;
  padding: 8px 0;
  align-items: center;
}
.Server__label {
  width: 74px;
  flex-grow: 0;
  flex-shrink: 0;
  color: #333;
  &::after {
    content: ':';
  }
}

.Server__val {
  color: #999;
}

.card_footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .n-button {
    margin-left: 6px;
  }
}

.disableBtn {
  animation: promptBorder 1.5s infinite;
}
</style>
