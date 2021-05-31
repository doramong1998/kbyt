import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoFoundPage: React.FC = () => (
  <Result
    status="success"
    title="KHAI BÁO Y TẾ ĐIỆN TỬ THÀNH CÔNG!"
    subTitle="Cảm ơn bạn đã khai báo y tế điện tử!"
    extra={[
      <Button type="primary" key="console" onClick={() => history.push('/')}>
        Về trang chủ
      </Button>,
    ]}
  />
);

export default NoFoundPage;
