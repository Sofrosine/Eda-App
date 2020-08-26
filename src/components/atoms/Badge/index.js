import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';

const Badge = ({status}) => {
  const [statusText, setStatusText] = useState('');
  const [bgColor, setBgColor] = useState('red');
  const [update, setUpdate] = useState(false);

  const getColor = (nowStatus) => {
    switch (nowStatus) {
      case 'pending':
        setStatusText('Pending');
        setBgColor('#292b2c');
        return;
      case 'waiting_for_approval':
        setStatusText('Waiting for Approval');
        setBgColor('#f0ad4e');
        return;
      case 'approved':
        setStatusText('Approved');
        setBgColor('#0275d8');
        return;
      case 'going_to_pick_up':
        setStatusText('Going to pickup');
        setBgColor('#5bc0de');
        return;
      case 'pick_up_by_driver':
        setStatusText('Pickup');
        setBgColor('#5bc0de');
        return;
      case 'completed':
        setStatusText('Complete');
        setBgColor('#5cb85c');
        return;
      case 'cancel_by_merchant':
        setStatusText('Cancel by merchant');
        setBgColor('#d9534f');
        return;
      case 'cancel_by_admin':
        setStatusText('Cancel by admin');
        setBgColor('#d9534f');
        return;
      case 'cancel_by_driver':
        setStatusText('Cancel by driver');
        setBgColor('#d9534f');
        return;
      case 'cancel_by_system':
        setStatusText('Cancel by system');
        setBgColor('#d9534f');
        return;
      case 'not_delivered':
        setStatusText('Not Delivered');
        setBgColor('#d9534f');
        return;
      default:
        return;
    }
  };

  useEffect(() => {
    getColor(status);
  }, [status]);

  return (
    <View style={styles.badges(bgColor)}>
      <Text style={styles.text}>{statusText}</Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  badges: (bgColor) => ({
    backgroundColor: bgColor,
    height: 22,
    paddingHorizontal: 8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',

  }),
  text: {
    fontSize: 10,
    fontFamily: fonts.primary[700],
    color: colors.white,
    textAlign: 'center',
  },
});
