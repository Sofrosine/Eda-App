import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {fonts, colors} from '../../../utils';
import {Gap} from '../../atoms';

const InputDate = ({label, text, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Gap height={8} />
      <Text>{text === '' ? 'Pilih tanggal' : text}</Text>
    </TouchableOpacity>
  );
};

export default InputDate;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 3.5,
    borderColor: colors.secondary,
    paddingBottom: 12,
  },
  label: {
    fontSize: 11,
    fontFamily: fonts.primary[500],
  },
});
