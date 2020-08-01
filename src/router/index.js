import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Register, Login, RegisterDetail, RegisterSuccess, Home} from '../pages';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={({}) => ({
        headerShown: false,
        gestureEnabled: true,
      })}
      initialRouteName="Home">
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RegisterDetail" component={RegisterDetail} />
      <Stack.Screen name="RegisterSuccess" component={RegisterSuccess} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default Router;
