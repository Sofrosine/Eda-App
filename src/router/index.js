import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {DrawerContent} from '../components';
import {
  AddCustomer,
  CreateOrder,
  CreateOrder2,
  DetailOrder,
  Home,
  ListCustomer,
  Login,
  OrderVerificationProcess,
  OrderVerified,
  Profile,
  Register,
  RegisterDetail2,
  RegisterSuccess,
  Splash,
  UpdatePassword,
} from '../pages';
import EditName from '../pages/EditName';
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
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="List Customer" component={ListCustomer} />
      <Drawer.Screen name="Invoice" component={RegisterDetail2} />
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
      <Stack.Screen name="AddCustomer" component={AddCustomer} />
      <Stack.Screen name="EditName" component={EditName} />
      <Stack.Screen name="RegisterDetail2" component={RegisterDetail2} />
      <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
    </Stack.Navigator>
  );
};

export default Router;
