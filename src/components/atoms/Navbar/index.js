import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ICHamburger, ICLeftWhite} from '../../../assets';
import {colors, fonts} from '../../../utils';
import LinearGradient from 'react-native-linear-gradient';

const Navbar = ({title, onPress, type}) => {
  if (type === 'back') {
    return (
      <LinearGradient
        start={{x: 0.0, y: 0}}
        end={{x: 0.7, y: 1.0}}
        colors={['#4557B2', '#1E2F89']}
        style={styles.container}>
        <StatusBar backgroundColor={colors.primary} />
        <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
          <ICLeftWhite />
        </TouchableOpacity>
        <Text style={styles.h6White}>{title}</Text>
        <View />
      </LinearGradient>
    );
  }
  return (
    <LinearGradient
      start={{x: 0.0, y: 0}}
      end={{x: 0.7, y: 1.0}}
      colors={['#4557B2', '#1E2F89']}
      style={styles.container}>
      <StatusBar backgroundColor={colors.primary} />
      <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
        <ICHamburger />
      </TouchableOpacity>
      <Text style={styles.h6White}>{title}</Text>
      <View />
    </LinearGradient>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.primary,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  h6White: {
    fontFamily: fonts.primary[500],
    fontSize: 18,
    lineHeight: 25,
    color: colors.white,
  },
  btnContainer: {
    width: 60,
    alignItems: 'flex-start',
    position: 'absolute',
    paddingLeft: 16,
    left: 8,
    borderColor: 'white',
    height: '100%',
    justifyContent: 'center',
  },
});
