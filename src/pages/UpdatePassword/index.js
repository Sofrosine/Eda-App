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
import {checkEmailAction, updatePasswordAction} from '../../redux/actions';
import {colors} from '../../utils';

const UpdatePassword = ({navigation}) => {
  const dispatch = useDispatch();
  const {loadingPassword} = useSelector((state) => state.profileReducer);
  const registerSchema = yup.object({
    originalPassword: yup.string().required().min(6),
    password: yup.string().required().min(6),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
  const handleChangePassword = (form) => {
    console.log('form', form);
    dispatch(
      updatePasswordAction(
        form.originalPassword,
        form.password,
        form.password_confirmation,
        navigation,
      ),
    );
  };
  return (
    <SafeAreaView style={styles.pages}>
      <StatusBar backgroundColor={colors.primary} />
      <View style={styles.content}>
        <Formik
          validationSchema={registerSchema}
          initialValues={{
            originalPassword: '',
            password: '',
            password_confirmation: '',
          }}
          onSubmit={(values) => {
            handleChangePassword(values);
          }}>
          {(props) => (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Gap height={34} />
              <ICEda style={styles.icon} height={96} width={96} />
              <Gap height={27} />
              <Input
                errorText={
                  props.touched.originalPassword &&
                  props.errors.originalPassword
                }
                onBlur={props.handleBlur('originalPassword')}
                placeholder="Masukkan password Anda di sini"
                label="Password"
                required
                password
                onChangeText={props.handleChange('originalPassword')}
                value={props.values.originalPassword}
              />
              <Gap height={24} />
              <Input
                errorText={props.touched.password && props.errors.password}
                onBlur={props.handleBlur('password')}
                placeholder="Masukkan password baru Anda di sini"
                required
                onChangeText={props.handleChange('password')}
                label="Password Baru"
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
                placeholder="Masukkan konfirmasi password baru Anda di sini"
                required
                onChangeText={props.handleChange('password_confirmation')}
                label="Konfirmasi Password Baru"
                password
                value={props.values.password_confirmation}
              />
              <Gap height={6} />
              <Gap height={40} />
              {loadingPassword ? (
                <ActivityIndicator size={32} color={colors.secondary} />
              ) : (
                <>
                  <Button
                    onPress={props.handleSubmit}
                    position="center"
                    text="Ubah Password"
                  />
                  <Gap height={24} />
                </>
              )}
            </ScrollView>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default UpdatePassword;

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
