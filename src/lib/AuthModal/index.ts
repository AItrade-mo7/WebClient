import CodeView from './CodeView.vue';
import PasswordView from './PasswordView.vue';
import AllView from './AllView.vue';
import { fetchSendCode } from '@/api/Account';
import { UserInfoStore } from '@/store';

export interface BackData {
  Email: string;
  Password: string;
  Code: string;
}

export interface Config {
  Email?: string;
  Title?: string;
  IsPassword?: boolean;
  EmailAction?: string;
  OkBack: (res: BackData) => void;
}
export default (opt: Config) => {
  const { Title = '需要验证' } = opt;

  let Modal = PasswordView.render;

  let SendEmail = UserInfoStore.value.Email;
  if (opt.Email) {
    SendEmail = opt.Email;
  }

  if (opt.EmailAction) {
    Modal = CodeView.render;
    fetchSendCode({
      Email: SendEmail,
      Action: opt.EmailAction,
    }).then((res) => {
      if (res.Code > 0) {
        window.$message.success(res.Msg);
      }
    });
  }

  if (opt.EmailAction && opt.IsPassword) {
    Modal = AllView.render;
  }

  window.$dialog.info({
    title: Title,
    content: Modal,
    bordered: true,
    maskClosable: false,
    closable: false,
    positiveText: '确认',
    negativeText: '取消',
    onPositiveClick: (event) => {
      const CodeElm: any = window.document.getElementById('AuthModal_Code');
      const PasswordElm: any = window.document.getElementById('AuthModal_Password');

      return opt.OkBack({
        Email: UserInfoStore.value.Email,
        Password: PasswordElm?.value,
        Code: CodeElm?.value,
      });
    },
  });
};
