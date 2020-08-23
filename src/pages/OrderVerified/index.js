import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ICVerified} from '../../assets';
import {Gap, Navbar, Button} from '../../components';
import {colors, fonts} from '../../utils';
import {useDispatch} from 'react-redux';

const OrderVerified = ({navigation}) => {
  const dispatch = useDispatch();
  const handleDone = () => {
    navigation.replace('HomeDrawer');
    dispatch({type: 'DELETE_STATE'});
  };
  return (
    <SafeAreaView style={styles.pages}>
      <Navbar />
      <View style={styles.content}>
        <ICVerified />
        <Gap height={24} />
        <Text style={[styles.title]}>Order</Text>
        <Text style={[styles.title]}>Terverifikasi</Text>
        <Gap height={36} />
        <Button onPress={handleDone} text="Lihat Status Order" />
      </View>
    </SafeAreaView>
  );
};

export default OrderVerified;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white2,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    fontFamily: fonts.primary[300],
    color: colors.text.black,
    textAlign: 'center',
  },
  p1GrayRegular: {
    fontSize: 15,
    fontFamily: fonts.primary[300],
    color: colors.text.black,
    textAlign: 'center',
  },
});
