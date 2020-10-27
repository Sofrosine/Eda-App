import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Gap} from '../../atoms';

const CardInvoice = ({item}) => {
  const navigation = useNavigation();
  return (
    <View
      //   onPress={() =>
      //     item.status === 'pending'
      //       ? navigation.navigate('CreateOrder2', {
      //           request_order_id: item.id,
      //           item,
      //         })
      //       : {}
      //   }
      style={styles.container}>
      <Text style={styles.p1MediumPrimary}>Invoice ID: {item.id}</Text>
      <Gap height={8} />
      <Text style={styles.p1RegularBlack}>
        Total Amount: {item.total_amount}
      </Text>
      <Gap height={8} />
      <Text style={styles.p1RegularBlack}>
        Status: <Text style={styles.p1MediumSecondary}>{item.status}</Text>
      </Text>
    </View>
  );
};

export default CardInvoice;

const styles = StyleSheet.create({
  p1MediumPrimary: {
    fontSize: 14,
    fontFamily: fonts.primary[500],
    color: colors.primary,
  },
  p1RegularBlack: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
  },
  p1MediumSecondary: {
    fontSize: 14,
    fontFamily: fonts.primary[500],
    color: colors.secondary,
  },
  container: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.secondary,
    elevation: 4,
    backgroundColor: colors.white,
  },
});
