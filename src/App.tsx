import React, { FC, useEffect } from "react";
import { Layout } from 'antd';

import AppRouter from "./components/AppRouter";
import Navbar from './components/Navbar';
import './App.css';
import { useActions } from './hooks/useActions';
import { IUser } from './models';

const App: FC = () => {
  const { setIsAuth, setUser } = useActions();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setUser({ username: localStorage.getItem('username' || '')} as IUser);
      setIsAuth(true);
    }
  }, []);

  return (
    <Layout>
      <Navbar/>
      <Layout.Content>
        <AppRouter/>
      </Layout.Content>
    </Layout>
  );
};

export default App;
