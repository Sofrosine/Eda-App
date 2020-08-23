import {Formik} from 'formik';
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
import * as yup from 'yup';
import {ICEda} from '../../assets';
import {Button, Gap, Input, ProgressBar} from '../../components';
import {checkEmailAction} from '../../redux/actions';
import {colors} from '../../utils';

const Register = ({navigation}) => {
  const dispatch = useDispatch(); 
  const {data, loading, error} = useSelector(
    (state) => state.checkEmailReducer,
  );
  const registerSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
  const handleRegister = (form) => {
    dispatch(checkEmailAction(form, navigation));
  };
  const handleLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.pages}>
      <StatusBar backgroundColor={colors.primary} />
      <ProgressBar percent={33} />
      <View style={styles.content}>
        <Formik
          validationSchema={registerSchema}
          initialValues={{
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
          }}
          onSubmit={(values) => {
            handleRegister(values);
          }}>
          {(props) => (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Gap height={34} />
              <ICEda style={styles.icon} height={96} width={96} />
              <Gap height={27} />
              <Input
                placeholder="Masukkan nama Anda di sini"
                label="Nama"
                required
                onChangeText={props.handleChange('name')}
                value={props.values.name}
                errorText={props.touched.name && props.errors.name}
                onBlur={props.handleBlur('name')}
              />
              <Gap height={24} />
              <Input
                errorText={props.touched.email && props.errors.email}
                onBlur={props.handleBlur('email')}
                placeholder="Masukkan email  Anda di sini"
                label="Email"
                required
                onChangeText={props.handleChange('email')}
                value={props.values.email}
              />
              <Gap height={24} />
              <Input
                errorText={props.touched.password && props.errors.password}
                onBlur={props.handleBlur('password')}
                placeholder="Masukkan password Anda di sini"
                required
                onChangeText={props.handleChange('password')}
                label="Password"
                password
                value={props.values.password}
              />
              <Gap height={24} />
              <Input
                errorText={
                  props.touched.password_confirmation &&
                  props.errors.password_confirmation
                }
                onBlur={props.handleBlur('password_confirmation')}
                placeholder="Masukkan konfirmasi password Anda di sini"
                required
                onChangeText={props.handleChange('password_confirmation')}
                label="Konfirmasi Password"
                password
                value={props.values.password_confirmation}
              />
              <Gap height={6} />
              <Gap height={40} />
              {loading ? (
                <ActivityIndicator size={32} color={colors.secondary} />
              ) : (
                <>
                  <Button
                    onPress={props.handleSubmit}
                    position="center"
                    text="Buat Akun Toko"
                  />
                  <Gap height={24} />
                  <Button
                    onPress={handleLogin}
                    position="center"
                    type="nude"
                    text="Login Di sini"
                  />
                </>
              )}
            </ScrollView>
          )}
        </Formik>
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
    paddingHorizontal: 16,
  },
  icon: {
    alignSelf: 'center',
  },
});
