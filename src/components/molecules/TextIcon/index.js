import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Gap} from '../../atoms';
import {ICProfile} from '../../../assets';

const TextIcon = ({text, icon = ICProfile}) => {
  const Icon = icon;
  return (
    <TouchableOpacity style={styles.container}>
      <Icon height={20} width={20} />
      <Gap width={16} />
      <Text style={styles.h6Primary}>{text}</Text>
    </TouchableOpacity>
  );
};

export default TextIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    width: '100%',
  },
  h6Primary: {
    fontSize: 18,
    fontFamily: fonts.primary[400],
    lineHeight: 25,
    color: colors.text.black,
  },
});
