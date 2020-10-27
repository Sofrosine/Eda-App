import {NavigationContainer} from '@react-navigation/native';
import React, { useEffect } from 'react';
import {Router} from './src';
import {Provider, useSelector} from 'react-redux';
import configureStore from './src/redux/store';
import {Loading, NotificationAlert} from './src/components';
import {navigationRef} from './RootNavigation';
import AsyncStorage from '@react-native-community/async-storage';

const MainApp = () => {
  const {loading} = useSelector((state) => state.loadingReducer);
  const {showNotificationAlert, notificationTitle} = useSelector(
    (state) => state.showNotificationAlertReducer,
  );

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Router />
      </NavigationContainer>
      {loading && <Loading />}
      {showNotificationAlert && <NotificationAlert title={notificationTitle} />}
    </>
  );
};

const App = () => {
  return (
    <Provider store={configureStore()}>
      <MainApp />
    </Provider>
  );
};

export default App;
