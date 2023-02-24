<script setup lang="ts">
import { Logo } from '@/config/constant';
import { logout } from '@/api/Account';
import { UserInfoStore } from '@/store';
import { defineAsyncComponent } from 'vue';
import { TopBarStore } from '@/store';
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
</script>

<template>
  <PageTitle>Personal</PageTitle>
  <div class="PageWrapper">
    <div className="Personal__info">
      <n-avatar round :size="70" :src="UserInfoStore.value.Avatar" :fallback-src="Logo" />
      <div className="Personal__NickName">{{ UserInfoStore.value.NickName }}</div>
      <div className="Personal__Email">{{ UserInfoStore.value.Email }}</div>
    </div>

    <div className="Personal__link">
      <div class="Personal__Card">
        <RouterLink to="/EditProfile">
          <n-button type="primary">
            <template #icon>
              <XIcon name="EditOutlined" />
            </template>
            编辑资料
          </n-button>
        </RouterLink>
      </div>
      <div class="Personal__Card">
        <RouterLink to="/ChangePassword">
          <n-button secondary type="primary">
            <template #icon>
              <XIcon name="KeyOutlined" />
            </template>
            修改密码
          </n-button>
        </RouterLink>
      </div>
      <div class="Personal__Card">
        <RouterLink to="/ManageEmail">
          <n-button tertiary type="info">
            <template #icon>
              <XIcon name="MailOutlined" />
            </template>
            邮箱管理
          </n-button>
        </RouterLink>
      </div>
      <div class="Personal__Card">
        <RouterLink to="/About/Duty">
          <n-button type="error">
            <template #icon>
              <XIcon name="DeleteOutlined" />
            </template>
            注销账户
          </n-button>
        </RouterLink>
      </div>
      <div class="Personal__Card">
        <n-button type="warning" ghost @click="logout">
          <template #icon>
            <XIcon name="LoginOutlined" />
          </template>
          退出登录
        </n-button>
      </div>
      <div class="Personal__Card">
        <n-button type="info" @click="TopBarStore.open()">
          <template #icon>
            <XIcon name="MenuFoldOutlined" />
          </template>
          开始
        </n-button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.PageWrapper {
  text-align: center;
  .n-button {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    text-align: center;
  }
}

.Personal__link {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  .Personal__Card {
    width: 200px;
    height: 120px;
    padding: 20px;
    margin: 20px;
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
