import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import {Gap} from '../../atoms';
import {fonts, colors, getData} from '../../../utils';
import {CommonActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';
import {setLoadingAction} from '../../../redux/actions';
import {api} from '../../../api';

const TabDrawer = ({text, isActive, icon, routeName, logout}) => {
  const Icon = icon;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleNavigation = () => {
    if (!logout) {
      navigation.navigate(routeName);
    } else {
      Alert.alert(
        'Apakah Anda yakin ingin keluar?',
        '',
        [
          {
            text: 'Tidak',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Ya',
            onPress: async () => {
              dispatch(setLoadingAction(true));
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'Auth'}],
                }),
              );
              dispatch({type: 'DELETE_STATE'});
              const imei = await getData('imeiToken');
              console.log('ittitmei', imei);
              try {
                console.log('aa');
                const apiReq = await api('post', 'auth/logout', {
                  imei,
                });
                console.log('apiReq logout success', apiReq);
                AsyncStorage.removeItem('@user_token');

                ToastAndroid.show('Berhasil melakukan logout', 2000);
              } catch (error) {
                console.log('apiReq logout error', error);
                Alert.alert(
                  'Ada masalah saat melakukan logout, harap coba lagi',
                );
              }
              dispatch(setLoadingAction(false));
            },
          },
        ],
        {cancelable: false},
      );
    }
  };
  return (
    <TouchableOpacity
      onPress={handleNavigation}
      style={styles.container(isActive)}>
      <Icon height={16} width={16} />
      <Gap width={8} />
      <Text style={styles.p1White}>{text}</Text>
    </TouchableOpacity>
  );
};

export default TabDrawer;

const styles = StyleSheet.create({
  container: (isActive) => ({
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: isActive ? colors.drawer.active : colors.drawer.inactive,
    borderLeftWidth: isActive ? 6 : 0,
    borderColor: colors.border.on,
  }),
  p1White: {
    fontSize: 15,
    fontFamily: fonts.primary[600],
    color: colors.text.white,
  },
});
