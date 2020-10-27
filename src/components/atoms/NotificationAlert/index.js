import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ICCloseCircularOrange, ILDriver} from '../../../assets';
import {closeNotificationAction} from '../../../redux/actions';
import {colors, fonts} from '../../../utils';
import Button from '../Button';
import Gap from '../Gap';
import * as navigation from '../../../../RootNavigation';

const NotificationAlert = () => {
  const dispatch = useDispatch();
  const {showNotificationAlertReducer} = useSelector((state) => state);
  const {section, id} = showNotificationAlertReducer.notificationData;

  const handleClose = () => {
    dispatch(closeNotificationAction());
  };
 
  const handleDetail = () => {
    dispatch(closeNotificationAction());
    console.log('secc', section);
    switch (section) {
      case 'detail-order':
        return navigation.navigate('Detail', {
          id,
        });
      case 'list-order':
        return navigation.navigate('ListRequestOrder');
      case 'detail-request-switch':
        return navigation.navigate('Passing', {
          id,
        });

      default:
        return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.alertContainer}>
        <TouchableOpacity onPress={handleClose} style={{alignSelf: 'flex-end'}}>
          <ICCloseCircularOrange height={32} width={32} />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <ILDriver height={200} width={200} />
        </View>
        <Text style={styles.title}>
          {showNotificationAlertReducer.notificationTitle}
        </Text>
        <Gap height={8} />
        <Text style={styles.subtitle}>
          {showNotificationAlertReducer.notificationBody}
        </Text>
        <Gap height={24} />
        {/* <View style={{alignItems: 'center'}}>
          <Button onPress={handleDetail} text="Lihat Detail" />
        </View> */}
      </View>
    </View>
  );
};

export default NotificationAlert;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999999999,
    paddingHorizontal: 24,
  },
  alertContainer: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 20,
    width: '100%',
  },
  title: {
    fontFamily: fonts.primary[600],
    fontSize: 22,
    color: colors.text.black,
  },
  subtitle: {
    fontFamily: fonts.primary[600],
    fontSize: 14,
    color: colors.text.gray,
  },
});
