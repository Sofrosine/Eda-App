import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {IC3DotWhite} from '../../../assets';
import {colors, fonts} from '../../../utils';

const Navbar = ({title}) => {
  return (
    <View style={styles.container}>
      <View />
      <Text style={styles.h6White}>{title}</Text>
      <TouchableOpacity>
        <IC3DotWhite />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 59,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  h6White: {
    fontFamily: fonts.primary[700],
    fontSize: 18,
    lineHeight: 25,
    color: colors.white,
  },
});
