import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Gap} from '../../atoms';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={32} color={colors.secondary} />
      <Gap height={24} />
      <Text style={styles.text}>Harap tunggu...</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.secondary,
  },
});
