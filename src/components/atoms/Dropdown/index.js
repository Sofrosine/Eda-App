import {Picker} from '@react-native-community/picker';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';

const Dropdown = ({label, required, onChange, children, value, theme}) => {
  return (
    <View style={styles.container}>
      <Text
        style={theme === 'light' ? styles.p3BlackPrimary : styles.p3Primary}>
        {label} {required ? '*' : null}
      </Text>
      <Picker
        mode="dropdown"
        selectedValue={value}
        style={styles.pickerContainer(theme)}
        onValueChange={onChange}>
        {children}
      </Picker>
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  p3Primary: {
    fontSize: 11,
    fontFamily: fonts.primary[500],
    color: colors.text.secondary,
  },
  p3BlackPrimary: {
    fontSize: 11,
    fontFamily: fonts.primary[500],
    color: colors.black,
  },
  container: {
    borderBottomWidth: 3,
    borderColor: colors.border.on,
  },
  pickerContainer: (theme) => ({
    width: '100%',
    color: theme === 'light' ? colors.black : colors.text.secondary,
    height: 40,
    left: -6,
  }),
});
