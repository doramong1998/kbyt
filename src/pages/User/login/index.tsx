import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Tabs, Button, Card, Alert } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { connect } from 'umi';
import type { Dispatch } from 'umi';

import styles from './index.less';

export type LoginProps = {
  dispatch: Dispatch;
  login: any;
  loading?: boolean;
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = ({ dispatch, login, loading }) => {
  const [type, setType] = useState<string>('signin');
  const { statusCode, message } = login;
  const [form] = ProForm.useForm();
  const handleSubmit = (values: any) => {
    if (type === 'signin') {
      dispatch({
        type: 'login/login',
        payload: {
          data: values,
        },
      });
    } else {
      dispatch({
        type: 'login/register',
        payload: {
          data: values,
        },
      }).then((res: any) => {
        if (res?.statusCode === 201) {
          form.resetFields();
          setType('signin');
        }
      });
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.main}>
        <div className={styles.logo__login}>
          <img
            style={{ width: 200 }}
            src="http://inhoangkien.vn/wp-content/uploads/2020/04/Logo-B%E1%BB%99-Y-t%E1%BA%BF-01-e1585994422207-300x213.png"
          ></img>
        </div>
        <ProForm
          form={form}
          submitter={{
            render: (propsData: any) => {
              if (type === 'signin')
                return [
                  <Button
                    type="primary"
                    key="submit"
                    style={{ width: '100%' }}
                    onClick={() => propsData.form?.submit()}
                  >
                    Đăng nhập
                  </Button>,
                ];
              return [
                <Button type="default" key="reset" onClick={() => propsData.form?.resetFields()}>
                  Làm mới
                </Button>,
                <Button type="primary" key="submit" onClick={() => propsData.form?.submit()}>
                  Đăng kí
                </Button>,
              ];
            },
          }}
          onFinish={(values) => {
            handleSubmit(values);
            return Promise.resolve();
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="signin" tab="Đăng nhập" />
            <Tabs.TabPane key="signup" tab="Đăng kí" />
          </Tabs>
          {type === 'signin' && (
            <>
              <>
                {!/^2/g.test(String(statusCode)) && !loading && (
                  <LoginMessage content={message || ''} />
                )}
              </>
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined className={styles.prefixIcon} />,
                }}
                placeholder="Tài khoản"
                rules={[
                  {
                    required: true,
                    message: 'Trường này là bắt buộc!',
                  },
                  {
                    type: 'email',
                    message: 'Không đúng định dạng email!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="Mật khẩu"
                rules={[
                  {
                    required: true,
                    message: 'Trường này là bắt buộc!',
                  },
                ]}
              />
            </>
          )}

          {type === 'signup' && (
            <>
              <ProFormText
                name="firstName"
                placeholder="Họ và tên đệm"
                fieldProps={{
                  size: 'large',
                }}
                rules={[
                  {
                    required: true,
                    message: 'Trường này là bắt buộc!',
                  },
                ]}
              />
              <ProFormText
                name="lastName"
                placeholder="Tên"
                fieldProps={{
                  size: 'large',
                }}
                rules={[
                  {
                    required: true,
                    message: 'Trường này là bắt buộc!',
                  },
                ]}
              />
              <ProFormSelect
                name="companyName"
                placeholder="Công ty"
                fieldProps={{
                  size: 'large',
                }}
                options={[
                  {
                    value: 'hisoft',
                    label: 'HiSoft',
                  },
                  {
                    value: 'other',
                    label: 'Công ty khác',
                  },
                ]}
                rules={[
                  {
                    required: true,
                    message: 'Trường này là bắt buộc!',
                  },
                ]}
              />
              <ProFormText
                name="phone"
                placeholder="Số điện thoại"
                fieldProps={{
                  size: 'large',
                }}
                rules={[
                  {
                    required: true,
                    message: 'Trường này là bắt buộc!',
                  },
                  {
                    pattern: /^0\d{9}$/,
                    message: 'Không đúng định dạng số điện thoại!',
                  },
                ]}
              />
              <ProFormText
                name="email"
                placeholder="Email"
                fieldProps={{
                  size: 'large',
                }}
                rules={[
                  {
                    required: true,
                    message: 'Trường này là bắt buộc!',
                  },
                  {
                    type: 'email',
                    message: 'Không đúng định dạng email!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                }}
                placeholder="Mật khẩu"
                rules={[
                  {
                    required: true,
                    message: 'Trường này là bắt buộc!',
                  },
                ]}
              />
            </>
          )}
        </ProForm>
      </Card>
    </div>
  );
};

export default connect(
  ({
    login,
    loading,
  }: {
    login: any;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    login: login.login,
    loading: loading.effects['login/login'],
  }),
)(Login);
