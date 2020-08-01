import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../utils';
import NudeButton from './NudeButton';

const Button = ({size, position, onPress, text, type}) => {
  if (type === 'nude') {
    return <NudeButton text={text} onPress={onPress} position={position} />;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container(position)}>
      <Text style={styles.p1WhiteItalic}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (position) => ({
    backgroundColor: colors.secondary,
    width: 133,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: position,
  }),
  p1WhiteItalic: {
    fontFamily: fonts.primary[400],
    fontSize: 14,
    color: colors.white,
  },
});
