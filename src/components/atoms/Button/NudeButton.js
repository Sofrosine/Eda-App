import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {fonts, colors} from '../../../utils';

const NudeButton = ({text, onPress, position}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container(position)}>
      <Text style={styles.p2Primary}>{text}</Text>
    </TouchableOpacity>
  );
};

export default NudeButton;

const styles = StyleSheet.create({
  container: (position) => ({
    alignSelf: position,
  }),
  p2Primary: {
    fontSize: 12,
    fontFamily: fonts.primary[500],
    color: colors.secondary,
  },
});
