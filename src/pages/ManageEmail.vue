<script setup lang="ts">
import { GetEmailList, AddEmail, SetMainEmail } from '@/api/Account';
import { defineAsyncComponent, onMounted } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));

let EmailInfo = $ref({});
const GetList = () => {
  GetEmailList().then((res) => {
    if (res.Code > 0) {
      EmailInfo = res.Data;
    }
    console.log('GetEmailList', res.Data);
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
        v-for="item in EmailInfo.UserEmail"
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
          <n-button size="tiny" type="error"> 删除 </n-button>
          <n-button size="tiny" type="primary"> 设为主要 </n-button>
        </div>
      </div>
      <div class="AddBtn">
        <n-button strong type="primary">
          <template #icon>
            <XIcon name="PlusOutlined" />
          </template>
        </n-button>
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
  padding-bottom: 8px;
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

.AddBtn {
  width: 100%;
  margin: 20px auto;
  button {
    width: 100%;
  }
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
