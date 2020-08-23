import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Gap} from '../../atoms';
import {useDispatch, useSelector} from 'react-redux';
import {
  getOrderActiveAction,
  getOrderInactiveAction,
} from '../../../redux/actions';

const HomeTabBar = ({isActive, setState}) => {
  const dispatch = useDispatch();
  const {getOrderReducer} = useSelector((state) => state);

  const handleActive = () => {
    dispatch(getOrderActiveAction());
    setState(true);
  };
  const handleInActive = () => {
    dispatch(getOrderInactiveAction());
    setState(false);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleActive}
        style={[
          styles.btn(isActive),
          {
            borderTopRightRadius: isActive ? 4 : 1,
            borderBottomRightRadius: isActive ? 4 : 1,
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}>
        <Text style={styles.text(isActive)}>Active Order</Text>
        <Gap width={5} />
        {getOrderReducer.activeData && getOrderReducer.activeData.length > 0 ? (
          <View style={styles.viewNotif(isActive)}>
            <Text style={styles.p3Text(isActive)}>
              {getOrderReducer.activeData.length}
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleInActive}
        style={[
          styles.btn(!isActive),
          {
            borderTopLeftRadius: !isActive ? 4 : 1,
            borderBottomLeftRadius: !isActive ? 4 : 1,
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}>
        <Text style={styles.text(!isActive)}>History</Text>
        <Gap width={5} />
        {getOrderReducer.inactiveData &&
        getOrderReducer.inactiveData.length > 0 ? (
          <View style={styles.viewNotif(!isActive)}>
            <Text style={styles.p3Text(!isActive)}>
              {getOrderReducer.inactiveData.length}
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default HomeTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  btn: (isActive) => ({
    borderWidth: 1,
    borderColor: colors.border.on,
    borderRadius: 4,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: isActive ? colors.secondary : colors.white,
  }),
  text: (isActive) => ({
    fontSize: 12,
    fontFamily: fonts.primary[600],
    color: isActive ? colors.white : colors.secondary,
  }),
  viewNotif: (isActive) => ({
    height: 15,
    width: 15,
    backgroundColor: !isActive ? colors.secondary : colors.white,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  }),
  p3Text: (isActive) => ({
    fontSize: 10,
    fontFamily: fonts.primary[600],
    color: !isActive ? colors.white : colors.secondary,
  }),
});
