import React, { FC, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { rules } from '../utils/rules';

const LoginForm: FC = () => {
  const {isLoading, error} = useTypedSelector(state => state.authReducer);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useActions();

  const onSubmit = () => {
    login(username, password);
  };

  return (
    <Form
      onFinish={onSubmit}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[rules.required('Please input your username!')]}
      >
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[rules.required('Please input your password!')]}
      >
        <Input
          value={password}
          type={'password'}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      {error && <div style={{color: 'red', marginBottom: 12}}>
        {error}
      </div>}

      <Form.Item wrapperCol={{offset: 8, span: 16}}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;