import { useEffect } from 'react';
import type { FC } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import type { Dispatch } from 'umi';
import { history, connect } from 'umi';
import classNames from 'classnames';
import styles from './index.less';

type Props = {
  dispatch: Dispatch;
  userInfo: any;
};

const AvatarDropdown: FC<Props> = ({ dispatch, userInfo }) => {
  useEffect(() => {
    dispatch({
      type: 'login/getUser',
    });
  }, []);

  const onMenuClick = (e: any) => {
    if (e.key === 'logout') {
      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }

    history.push(`/account`);
  };

  return (
    <Dropdown
      overlayClassName={classNames(styles.container)}
      overlay={
        <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
          {/* <Menu.Item key="account">
            <SettingOutlined />
            <FormattedMessage id="header.avatar.account"
              defaultMessage="Account" />
          </Menu.Item> */}
          {/* <Menu.Divider /> */}
          <Menu.Item key="logout">
            <LogoutOutlined />
            Đăng xuất
          </Menu.Item>
        </Menu>
      }
    >
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} alt="avatar" src={userInfo?.data?.avatar} />
        <span className="anticon">{userInfo?.data?.lastName}</span>
      </span>
    </Dropdown>
  );
};

export default connect(({ login }: { login: any }) => ({
  userInfo: login.userInfo,
}))(AvatarDropdown);
