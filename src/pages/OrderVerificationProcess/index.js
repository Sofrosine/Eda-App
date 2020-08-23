import React, {useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {Navbar, Gap} from '../../components';
import {colors, fonts} from '../../utils';
import {ICProcess} from '../../assets';

const OrderVerificationProcess = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('OrderVerified');
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={styles.pages}>
      <Navbar />
      <View style={styles.content}>
        <ICProcess />
        <Gap height={24} />
        <Text style={styles.title}>Menunggu Verifikasi Order</Text>
        <Gap height={16} />
        <Text style={styles.p1GrayRegular}>
          Silahkan menunggu sebentar untuk proses verifikasi order
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default OrderVerificationProcess;

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
