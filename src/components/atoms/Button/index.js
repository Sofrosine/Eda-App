import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../utils';
import NudeButton from './NudeButton';
import FloatButton from './FloatButton';

const Button = ({size, position, onPress, text, type, icon}) => {
  if (type === 'nude') {
    return <NudeButton text={text} onPress={onPress} position={position} />;
  }

  if (type === 'float') {
    return <FloatButton icon={icon} onPress={onPress} />;
  }

  if (type === 'edit') {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.btnEdit}>
        <Text style={styles.p1WhiteItalic}>{text}</Text>
      </TouchableOpacity>
    );
  }
  if (type === 'delete') {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.btnDelete}>
        <Text style={styles.p1WhiteItalic}>{text}</Text>
      </TouchableOpacity>
    );
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
    width: '100%',
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999999,
  }),
  btnEdit: {
    backgroundColor: '#5cb85c',
    height: 48,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDelete: {
    backgroundColor: '#d9534f',
    height: 48,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  p1WhiteItalic: {
    fontFamily: fonts.primary[500],
    fontSize: 15,
    color: colors.white,
  },
});
