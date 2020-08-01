import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {ICEda} from '../../assets';
import {Button, Gap, Input} from '../../components';
import {colors} from '../../utils';

const Login = () => {
  return (
    <SafeAreaView style={styles.pages}>
      <StatusBar backgroundColor={colors.primary} />
      <View style={styles.content}>
        <Gap height={34} />
        <ICEda style={styles.icon} height={170} width={170} />
        <Gap height={19} />
        <Input label="Email" />
        <Gap height={18} />
        <Input label="Password" password />
        <Gap height={6} />
        <Button position="flex-end" type="nude" text="Sign-up" />
        <Gap height={40} />
        <Button onPress={() => alert('aahaa')} position="center" text="Login" />
      </View>
    </SafeAreaView>
  );
};

export default Login;

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
