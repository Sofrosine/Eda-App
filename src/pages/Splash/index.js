import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import firebase from 'react-native-firebase';
import {ICEda} from '../../assets';
import {colors, getData, storeData} from '../../utils';
import UUIDGenerator from 'react-native-uuid-generator';
import {useDispatch} from 'react-redux';
import {
  showNotificationAction,
  getOrderActiveAction,
  getOrderInactiveAction, 
} from '../../redux/actions';

const Splash = ({navigation}) => {
  // const handleNavigation = async () => {
  //   const getToken = await getData('@user_token');
  //   setTimeout(() => {
  //     if (getToken) {
  //       navigation.replace('HomeDrawer');
  //     } else {
  //       navigation.replace('Auth');
  //     }
  //   }, 2000);
  // };

  // useEffect(() => {
  //   handleNavigation();
  // }, []);
  const unsubscribe = async () => {
    const token = await getData('@user_token');
    const check = setTimeout(() => {
      token ? navigation.replace('HomeDrawer') : navigation.replace('Auth');
    }, 2000);
  };

  // CHECK PERMISSION
  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  };

  // GET FCM TOKEN
  const getToken = async () => {
    let fcmToken = await getData('fcmToken');
    console.log('fcm', fcmToken);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      console.log('fcmToken', fcmToken);
      if (fcmToken) {
        // user has a device token
        await storeData('fcmToken', fcmToken);
      }
    }
    let imeiToken = await getData('imeiToken');
    console.log('imeitoken', imeiToken);
    if (!imeiToken) {
      UUIDGenerator.getRandomUUID().then(async (uuid) => {
        await storeData('imeiToken', uuid);
      });
    }
    unsubscribe();
  };

  // REQUEST PERMISSION
  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
      unsubscribe();
    }
  };

  const messageListener = async () => {
    // [***SAAT DI APP***]
    const notificationListener = firebase
      .notifications()
      .onNotification((notification) => {
        const {title, body, data} = notification;
        console.log('notiff', notification);
        showNotificationAlert(title, body, data);
        // console.log('1');
        dispatch(getOrderActiveAction());
        dispatch(getOrderInactiveAction());
      });

    // [***SAAT APP JALAN DI BG***]
    const notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen) => {
        const {title, body} = notificationOpen.notification;
        // showNotificationAlert(title, body);
        // navigation.navigate('Passing', {
        //   id: title,
        // });
        navigation.navigate('ListOrderRequest');
        // console.log('2');
        dispatch(getOrderActiveAction());
        dispatch(getOrderInactiveAction());
      });

    // [***DIBUKA SAAT KONDISI APP CLOSE***]
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const {title, body} = notificationOpen.notification;
      // showNotificationAlert(title, body);
      // console.log('3');
      dispatch(getOrderActiveAction());
      dispatch(getOrderInactiveAction());
    }

    const messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  };
  const dispatch = useDispatch();

  const showNotificationAlert = (title, body, data) => {
    console.log(title, body, data);
    dispatch(showNotificationAction(true, title, body, data));
  };

  useEffect(() => {
    // AsyncStorage.clear()
    messageListener();
    setTimeout(() => {
      checkPermission();
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.pages}>
      <StatusBar backgroundColor={colors.primary} />
      <ICEda width={174} height={174} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
