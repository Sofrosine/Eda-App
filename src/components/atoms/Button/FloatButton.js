import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../utils';
import {ICPlusWhite} from '../../../assets';

const FloatButton = ({icon = ICPlusWhite, onPress}) => {
  const Icon = icon;
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Icon width={18} height={18} />
      </TouchableOpacity>
    </View>
  );
};

export default FloatButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 200,
    // shadowColor: colors.black,
    // shadowOffset: {height: 1, width: 0},
    // shadowOpacity: 0.2,
    // shadowRadius: 5,
    // elevation: 2,
  },
});
