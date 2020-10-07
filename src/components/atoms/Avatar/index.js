import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors} from '../../../utils';

const Avatar = ({url}) => {
  return (
    <View style={[styles.container, styles.center]}>
      <Text style={styles.h4WhiteBold}>No Photo</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.btnUpdate, styles.center]}>
        <Text style={styles.h5PrimaryBold}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 200,
    backgroundColor: colors.primary,
  },
  h4WhiteBold: {
    fontSize: 26,
    color: colors.white,
    textAlign: 'center',
  },
  h5PrimaryBold: {
    fontSize: 22,
    color: colors.primary,
    fontWeight: '600',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnUpdate: {
    width: 32,
    height: 32,
    borderRadius: 200,
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: -4,
    right: 4,
    elevation: 4,
  },
});
