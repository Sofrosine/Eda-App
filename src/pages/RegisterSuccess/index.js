import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {ICRegisterSuccess} from '../../assets';
import {Button, Gap, ProgressBar} from '../../components';
import {colors, fonts} from '../../utils';

const RegisterSuccess = ({navigation}) => {
  const dispatch = useDispatch();
  const handleConfirm = () => {
    navigation.replace('Auth');
    dispatch({type: 'DELETE_STATE'});
  };
  return (
    <>
      <ProgressBar percent={100} />
      <SafeAreaView style={styles.pages}>
        <ICRegisterSuccess />
        <Gap height={26} />
        <Text style={styles.title}>Registrasi Toko Anda Sukses!</Text>
        <Gap height={16} />
        <Text style={styles.p1Primary}>
          Silahkan cek email Anda untuk verifikasi
        </Text>
        <Gap height={92} />
        <Button
          onPress={handleConfirm}
          type="nude"
          text="Kembali ke Halaman Login"
        />
      </SafeAreaView>
    </>
  );
};

export default RegisterSuccess;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 55,
  },
  h4Primary: {
    fontSize: 24,
    lineHeight: 33,
    color: colors.secondary,
    fontFamily: fonts.primary[700],
  },
  title: {
    fontSize: 36,
    color: colors.white,
    fontFamily: fonts.primary[300],
    textAlign: 'center',
  },
  p1Primary: {
    fontSize: 14,
    lineHeight: 19,
    color: colors.secondary,
    fontFamily: fonts.primary[400],
    textAlign: 'center',
  },
  buttonWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    paddingBottom: 2,
  },
});
