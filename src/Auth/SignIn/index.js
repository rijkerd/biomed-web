import React from 'react';
import PropTypes from 'proptypes';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Connect } from '../../state/index';
import { wrappedAuthLogin } from '../../state/actions/auth';

import './styles.css';

const SignInForm = ({ history, loading }) => {
  const onFinish = (values) => {
    wrappedAuthLogin(
      values,
      () => {
        history.push('/app');
      },
      (err) => {
        message.error(err.message);
      }
    );
  };

  return (
    <div className="SignInForm">
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
        labelAlign="left"
      >
        <h2>Sign in to your Account</h2>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="johndoe"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="signIn-form-button"
            loading={loading}
          >
            Log in
          </Button>
          {/* Or <Link to="/signup">register now!</Link>
          <Link to="/passwordreset" className="login-form-forgot">
            Forgot password?
          </Link> */}
        </Form.Item>
      </Form>
    </div>
  );
};

SignInForm.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Connect(SignInForm, {
  loading: 'auth.loading',
});
