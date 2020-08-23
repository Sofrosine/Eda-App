import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {DrawerContent} from '../components';
import {
  CreateOrder,
  CreateOrder2,
  DetailOrder,
  Home,
  Login,
  OrderVerificationProcess,
  OrderVerified,
  Register,
  RegisterDetail,
  RegisterDetail2,
  RegisterSuccess,
  Splash,
} from '../pages';
import EditOrder from '../pages/EditOrder';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerRouter = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerContentOptions={{}}
      drawerStyle={{width: '80%'}}
      initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      {/* <Drawer.Screen name="Profile" component={Login} />
      <Drawer.Screen name="Contact" component={DetailOrder} />
      <Drawer.Screen name="History" component={RegisterDetail} /> */}
    </Drawer.Navigator>
  );
};

const RegisterRouter = () => {
  return (
    <Stack.Navigator
      screenOptions={({}) => ({
        headerShown: false,
        gestureEnabled: true,
      })}
      initialRouteName="Register">
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RegisterDetail" component={RegisterDetail} />
      <Stack.Screen name="RegisterDetail2" component={RegisterDetail2} />
    </Stack.Navigator>
  );
};

const AuthRouter = () => {
  return (
    <Stack.Navigator
      screenOptions={({}) => ({
        headerShown: false,
        gestureEnabled: true,
      })}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={RegisterRouter} />
    </Stack.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={({}) => ({
        headerShown: false,
        gestureEnabled: true,
      })}
      initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Auth" component={AuthRouter} />
      <Stack.Screen name="RegisterSuccess" component={RegisterSuccess} />
      <Stack.Screen name="HomeDrawer" component={DrawerRouter} />
      <Stack.Screen name="CreateOrder" component={CreateOrder} />
      <Stack.Screen name="CreateOrder2" component={CreateOrder2} />
      <Stack.Screen
        name="OrderVerificationProcess"
        component={OrderVerificationProcess}
      />
      <Stack.Screen name="OrderVerified" component={OrderVerified} />
      <Stack.Screen name="DetailOrder" component={DetailOrder} />
      <Stack.Screen name="EditOrder" component={EditOrder} />
    </Stack.Navigator>
  );
};

export default Router;
