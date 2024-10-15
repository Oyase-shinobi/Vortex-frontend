'use client';

import { Route, Routes, useLocation } from 'react-router';
import { useContext, useEffect, useMemo } from 'react';

import Home from '@/containers/Home/Home';
import Rules from '@/containers/Rules/Rules';

import Header from '@/components/Header/Header';
import HeaderMobile from '@/components/HeaderMobile/HeaderMobile';
import History from '@/containers/History/History';
import Loading from '@/components/Loading/Loading';
import NotificationBox from '@/components/NotificationBox/NotificationBox';

import ClientProvider from '@/lib/ClientProvider/ClientProvider';
import ModalScaffold from '@/lib/ModalScaffold/ModalScaffold';
import TransitionComponent from '@/lib/TransitionComponent/TransitionComponent';
import useWindowSize from '@/utils/hooks/useWindowSize';
import { ModalContext } from '@/utils/contexts/ModalContext/ModalContext';

import '@aptos-labs/wallet-adapter-ant-design/dist/index.css';
import './app.scss';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/history"
        element={
          <TransitionComponent>
            <History />
          </TransitionComponent>
        }
      />
      <Route
        path="/rules"
        element={
          <TransitionComponent>
            <Rules />
          </TransitionComponent>
        }
      />
      <Route
        path="*"
        element={
          <TransitionComponent>
            <Home />
          </TransitionComponent>
        }
      />
    </Routes>
  );
};

const Body = () => {
  const location = useLocation();

  const { isOpenModal, isOpenWelcome } = useContext(ModalContext);
  const isOpenModalClassname =
    isOpenModal || isOpenWelcome ? 'overflow-hidden' : '';

  const { isWindowSmall } = useWindowSize();
  const windowSmallClassname = useMemo(() => {
    return isWindowSmall ? 'window-small' : '';
  }, [isWindowSmall]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <body className={isOpenModalClassname}>
      <main className={windowSmallClassname}>
        <div className="app-container">
          {isWindowSmall ? <HeaderMobile /> : <Header />}
          <AppRoutes />
        </div>
        <ModalScaffold />
        <Loading />
        <NotificationBox />
      </main>
    </body>
  );
};

export default function App() {
  return (
    <ClientProvider>
      <Body />
    </ClientProvider>
  );
}
