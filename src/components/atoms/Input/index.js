import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {fonts, colors} from '../../../utils';
import Gap from '../Gap';

const Input = ({label, required, password, description}) => {
  return (
    <View>
      <Text style={styles.p1Primary}>
        {label} {required ? '*' : null}
      </Text>
      <Gap height={8} />
      <TextInput secureTextEntry={password} style={styles.input} />
      <Text style={[styles.p2ItalicPrimary, styles.description]}>
        {description}
      </Text>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  p1Primary: {
    fontFamily: fonts.primary[700],
    fontSize: 14,
    color: colors.secondary,
    lineHeight: 16,
  },
  p2ItalicPrimary: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    color: colors.secondary,
    lineHeight: 16,
    fontStyle: 'italic',
  },
  input: {
    borderBottomWidth: 3,
    borderColor: colors.secondary,
    padding: 4,
    fontFamily: fonts.primary[700],
    fontSize: 14,
    color: colors.secondary,
  },
  description: {
    right: 0,
    position: 'absolute',
    bottom: -20,
  },
});
