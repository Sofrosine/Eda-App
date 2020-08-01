import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {ICEda} from '../../assets';
import {Button, Gap, Input} from '../../components';
import {colors} from '../../utils';

const Register = () => {
  return (
    <SafeAreaView style={styles.pages}>
      <StatusBar backgroundColor={colors.primary} />
      <View style={styles.content}>
        <Gap height={34} />
        <ICEda style={styles.icon} height={80} width={80} />
        <Gap height={19} />
        <Input label="Nama" required />
        <Gap height={18} />
        <Input label="Email" required />
        <Gap height={18} />
        <Input label="Password" password required />
        <Gap height={18} />
        <Input
          label="Confirm Password"
          description="* Wajib diisi"
          password
          required
        />
        <Gap height={40} />
        <Button text="Next" position="center" />
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 55,
  },
  icon: {
    alignSelf: 'center',
  },
});
