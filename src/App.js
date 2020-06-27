import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import store from './state/store';
import SignInForm from './Auth/SignIn';
import SecureRoute from './Auth/SecureRoute';
import BaseLayout from './Layout/index';

Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 24 }} spin />);

const history = createBrowserHistory();

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter hashType="hashbang" history={history}>
        <Switch>
          <Route exact path="/" component={SignInForm} />
          <SecureRoute exact path="/app" Component={BaseLayout} />
        </Switch>
      </HashRouter>
    </Provider>
  );
};

export default App;
