import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Menu, Row } from 'antd';
import { RouteNames } from '../routes';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

const Navbar: FC = () => {
  const { logout } = useActions();
  const router = useHistory();
  const {isAuth, user} = useTypedSelector(state => state.authReducer);

  const logoutHandler = () => {
    logout();
  };

  return (
    <Layout.Header>
      <Row justify={'end'}>
        {
          isAuth
            ? (
              <>
                <div
                  style={{color: 'white', marginRight: 12, textTransform: 'capitalize'}}
                >{user.username}</div>
                <Menu theme={'dark'} mode={'horizontal'} selectable={false}>
                  <Menu.Item key={1} onClick={logoutHandler}>Logout</Menu.Item>
                </Menu>
              </>
            )
            : (
              <Menu theme={'dark'} mode={'horizontal'} selectable={false}>
                <Menu.Item key={2} onClick={() => router.push(RouteNames.LOGIN)}>Login</Menu.Item>
              </Menu>
            )
        }
      </Row>
    </Layout.Header>
  );
};

export default Navbar;