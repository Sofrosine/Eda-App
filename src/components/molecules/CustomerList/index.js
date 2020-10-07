import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';

const CustomerList = ({data}) => {
  return (
    <View style={[styles.rowCenter, styles.avatarContainer]}>
      {/* <Image source={IMGMenuBackground} style={styles.avatar} />
      <Gap width={8} /> */}
      <View>
        {/* <Text style={styles.p2GrayRegular}>Data Customer</Text>
        <Gap height={4} /> */}
        <Text style={styles.p1Bold}>{data && data.customer_name}</Text>
        <Text style={styles.p2Gray2Regular}>{data.customer_address}</Text>
      </View>
    </View>
  );
};

export default CustomerList;

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    borderBottomWidth: 1,
    paddingBottom: 12,
    borderColor: colors.border.off,
  },
  avatar: {
    height: 41,
    width: 41,
    borderRadius: 200,
  },
  p2GrayRegular: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.gray,
  },
  p1Bold: {
    fontSize: 15,
    fontFamily: fonts.primary[700],
    color: colors.text.black,
  },
  p2Gray2Regular: {
    fontSize: 12,
    fontFamily: fonts.primary[500],
    color: colors.text.secondary,
  },
});
