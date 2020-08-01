import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  ICMotorcycleWhite,
  ICPhoneBlack,
  ICLocationBlack,
} from '../../../assets';
import {Gap} from '../../atoms';
import {colors, fonts} from '../../../utils';

const CardTask = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconWrapper}>
        <ICMotorcycleWhite width={40} height={24} />
      </View>
      <Gap width={20} />
      <View style={styles.dataWrapper}>
        <Text style={styles.h6Normal}>Ridwan M</Text>
        <View style={styles.rowAlignCenter}>
          <ICPhoneBlack />
          <Gap width={6} />
          <Text style={styles.p2Normal}>08123898292</Text>
        </View>
        <View style={styles.rowAlignCenter}>
          <ICLocationBlack />
          <Gap width={6} />
          <Text style={styles.p2Normal}>Depok</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardTask;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
    elevation: 2,
    backgroundColor: colors.white,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 5,
    height: 97,
    alignItems: 'center',
  },
  dataWrapper: {alignSelf: 'flex-start', marginTop: 5},
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  h6Normal: {
    fontSize: 18,
    color: colors.text.black,
    fontFamily: fonts.primary[600],
    lineHeight: 25,
  },
  p2Normal: {
    fontSize: 12,
    color: colors.text.black,
    fontFamily: fonts.primary[500],
    lineHeight: 16,
  },
  iconWrapper: {
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 69,
    height: 66,
    borderRadius: 200,
  },
});
