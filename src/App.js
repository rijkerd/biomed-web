import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Switch, Route, HashRouter, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './state/store';
import SignInForm from './Auth/SignIn';
import SecureRoute from './Auth/SecureRoute';
import BaseLayout from './Layout/index';

Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 24 }} spin />);

const history = createBrowserHistory();

const persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter hashType="hashbang" history={history}>
          <Switch>
            <Route path="/signin" component={SignInForm} />
            <SecureRoute path="/app" component={BaseLayout} />
            <Redirect to="/signin" />
          </Switch>
        </HashRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
