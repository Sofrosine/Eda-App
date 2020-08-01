import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {ICThumbWhite} from '../../assets';
import {colors, fonts} from '../../utils';
import {Gap} from '../../components';

const RegisterSuccess = () => {
  return (
    <SafeAreaView style={styles.pages}>
      <Text style={styles.h4Primary}>Registrasi Sukses</Text>
      <Gap height={44} />
      <ICThumbWhite />
      <Gap height={44} />
      <Text style={styles.h6Primary}>
        Silahkan cek email anda untuk verifikasi
      </Text>
      <Gap height={44} />
      <TouchableOpacity style={styles.buttonWrapper}>
        <Text style={styles.p1White}>Kembali ke login page</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RegisterSuccess;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  h4Primary: {
    fontSize: 24,
    lineHeight: 33,
    color: colors.secondary,
    fontFamily: fonts.primary[700],
  },
  h6Primary: {
    fontSize: 18,
    lineHeight: 25,
    color: colors.secondary,
    fontFamily: fonts.primary[700],
  },
  p1White: {
    fontSize: 14,
    lineHeight: 19,
    color: colors.white,
    fontFamily: fonts.primary[700],
  },
  buttonWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    paddingBottom: 2,
  },
});
