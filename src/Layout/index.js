import React from 'react';
import PropTypes from 'proptypes';
import { Layout, Menu } from 'antd';
import { Switch } from 'react-router-dom';
import { wrappedLogout } from '../state/actions/auth';
import ListAll from '../Module/ListAll';
import SecureRoute from '../Auth/SecureRoute';
import ListTopics from '../Module/ListTopics';

import './styles.css';

const { Header, Content, Footer } = Layout;

const BaseLayout = ({ match: { url: baseUrl } }) => {
  const onClickMenu = ({ key }) => {
    if (key === '1') {
      wrappedLogout();
    }
  };

  return (
    <Layout className="BaseLayout">
      <Header className="BaseLayoutHeader">
        <Menu mode="horizontal" onClick={onClickMenu}>
          <Menu.Item style={{ float: 'right' }} key="1">
            Logout
          </Menu.Item>
        </Menu>
      </Header>
      <Layout className="BaseLayoutWhiteBg">
        <Content className="BaseLayoutContent">
          <Switch>
            <SecureRoute exact path={`${baseUrl}/`} component={ListAll} />
            <SecureRoute path={`${baseUrl}/:id`} component={ListTopics} />
          </Switch>
        </Content>
      </Layout>
      <Footer className="BaseLayoutFooter">Biomed</Footer>
    </Layout>
  );
};

BaseLayout.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  match: PropTypes.shape({ url: PropTypes.string, path: PropTypes.string })
    .isRequired,
};

export default BaseLayout;
