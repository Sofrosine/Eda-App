import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../../utils';

const ProgressBar = ({percent = 0}) => {
  return (
    <View style={styles.containerOff}>
      <View style={styles.containerOn(percent)} />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  containerOff: {
    width: '100%',
    height: 8,
    backgroundColor: colors.progress.off,
  },
  containerOn: (percent) => ({
    width: `${percent}%`,
    height: 8,
    backgroundColor: colors.progress.on,
  }),
});
