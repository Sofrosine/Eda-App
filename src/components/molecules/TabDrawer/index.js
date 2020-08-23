import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Gap} from '../../atoms';
import {fonts, colors} from '../../../utils';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';

const TabDrawer = ({text, isActive, icon, routeName, logout}) => {
  const Icon = icon;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleNavigation = () => {
    if (!logout) {
      navigation.navigate(routeName);
    } else {
      AsyncStorage.clear();
      dispatch({type: 'DELETE_STATE'});
      navigation.replace('Auth');
    }
  };
  return (
    <TouchableOpacity
      onPress={handleNavigation}
      style={styles.container(isActive)}>
      <Icon height={16} width={16} />
      <Gap width={8} />
      <Text style={styles.p1White}>{text}</Text>
    </TouchableOpacity>
  );
};

export default TabDrawer;

const styles = StyleSheet.create({
  container: (isActive) => ({
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: isActive ? colors.drawer.active : colors.drawer.inactive,
    borderLeftWidth: isActive ? 6 : 0,
    borderColor: colors.border.on,
  }),
  p1White: {
    fontSize: 15,
    fontFamily: fonts.primary[600],
    color: colors.text.white,
  },
});
