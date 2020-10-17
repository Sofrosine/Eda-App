import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ICEda} from '../../assets';
import {Button, Gap, Input} from '../../components';
import {setLoginAction, setLoginErrorAction} from '../../redux/actions';
import {colors, useForm} from '../../utils';

const Login = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });
  const {loading, error} = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const handleRegister = () => {
    navigation.navigate('Register');
  };
  const handleSubmit = () => {
    dispatch(setLoginAction(form.email, form.password, navigation));
  };

  // useEffect(() => {
  //   AsyncStorage.clear();
  // }, []);

  return (
    <SafeAreaView style={styles.pages}>
      <StatusBar backgroundColor={colors.primary} />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={34} />
          <ICEda style={styles.icon} height={96} width={96} />
          <Gap height={72} />
          <Input
            onFocus={() => dispatch(setLoginErrorAction(false))}
            error={error}
            errorText={error && 'Email/Password Salah'}
            onChangeText={(val) => setForm('email', val)}
            placeholder="Masukkan email Anda di sini"
            label="Email"
          />
          <Gap height={24} />
          <Input
            onFocus={() => dispatch(setLoginErrorAction(false))}
            error={error}
            errorText={error && 'Email/Password Salah'}
            onChangeText={(val) => setForm('password', val)}
            placeholder="Masukkan password Anda di sini"
            label="Password"
            password
          />
          <Gap height={6} />
          <Gap height={24} />
          {loading ? (
            <ActivityIndicator size={32} color={colors.secondary} />
          ) : (
            <>
              <Button onPress={handleSubmit} position="center" text="Login" />
              <Gap height={24} />
              <Button
                onPress={handleRegister}
                position="center"
                type="nude"
                text="Sign Up Di sini"
              />
            </>
          )}
        </ScrollView>
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
    paddingHorizontal: 16,
  },
  icon: {
    alignSelf: 'center',
  },
});
