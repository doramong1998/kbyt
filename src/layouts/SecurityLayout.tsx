import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import type { ConnectProps } from 'umi';
import { Redirect, connect } from 'umi';
import { stringify } from 'querystring';
import type { ConnectState } from '@/models/connect';

type SecurityLayoutProps = {
  loading?: boolean;
  login?: any;
} & ConnectProps;

type SecurityLayoutState = {
  isReady: boolean;
};

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading } = this.props;
    // You can replace it to your authentication rule (such as check token exists)
    // You can replace it with your own login authentication rules (such as judging whether the token exists)
    const isLogin = localStorage.getItem('token');
    const queryString = stringify({
      redirect: window.location.href,
    });

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }
    if (
      !isLogin &&
      window.location.pathname !== '/login/user' &&
      window.location.pathname !== '/login/admin'
    ) {
      return <Redirect to={`/login/user?${queryString}`} />;
    }
    return children;
  }
}

export default connect(({ login, loading }: ConnectState) => ({
  login: login.userInfo,
  loading: loading.models.login,
}))(SecurityLayout);
