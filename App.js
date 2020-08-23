import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Router} from './src';
import {Provider, useSelector} from 'react-redux';
import configureStore from './src/redux/store';
import {Loading} from './src/components';
import '@react-native-firebase/crashlytics';

const MainApp = () => {
  const {loading} = useSelector((state) => state.loadingReducer);
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      {loading && <Loading />}
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
