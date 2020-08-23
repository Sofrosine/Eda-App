import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../utils';

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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }),
  p2Primary: {
    fontSize: 15,
    fontFamily: fonts.primary[500],
    color: colors.secondary,
  },
});
