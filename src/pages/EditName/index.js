import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ICEda} from '../../assets';
import {
  Button,
  Gap,
  Input,
  ProgressBar,
  UploadButton,
  Dropdown,
} from '../../components';
import {colors, fonts} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {getCategoryAction, setCategoryAction} from '../../redux/actions';
import {Picker} from '@react-native-community/picker';
import {Formik} from 'formik';
import * as yup from 'yup';

const registerSchema = yup.object({
  merchant_name: yup.string().required(),
});

const EditName = ({navigation, route}) => {
  // const {name, email, password, password_confirmation} = route.params;
  const globalState = useSelector((state) => state);
  const {categoryReducer, uploadImageReducer} = globalState;
  const dispatch = useDispatch();
  const handleRegister = (values) => {
    navigation.navigate('RegisterDetail2', {
      // name,
      // email,
      // password,
      // password_confirmation,
      merchant_name: values.merchant_name,
      category_id: categoryReducer.selectedCategory,
      merchant_image_id: uploadImageReducer.data.id
        ? uploadImageReducer.data.id
        : '',
    });
    // console.log('hm', {
    //   name,
    //   email,
    //   password,
    //   password_confirmation,
    //   merchant_name: values.merchant_name,
    //   category_id: categoryReducer.selectedCategory,
    //   merchant_image_id: uploadImageReducer.data.id,
    // });
  };

  const handleChange = async (val) => {
    dispatch(setCategoryAction(val));
    console.log('categoryre', categoryReducer);
  };

  useEffect(() => {
    dispatch(getCategoryAction());
    console.log('uwuu', route.params);
  }, []);

  return (
    <SafeAreaView style={styles.pages}>
      <StatusBar backgroundColor={colors.primary} />
      <View style={styles.content}>
        <Formik
          validationSchema={registerSchema}
          initialValues={{
            merchant_name: '',
          }}
          onSubmit={(values) => {
            handleRegister(values);
          }}>
          {(props) => (
            <ScrollView contentContainerStyle={{paddingHorizontal: 16}}>
              <Gap height={34} />
              <ICEda style={styles.icon} height={80} width={80} />
              <Gap height={27} />
              <Input
                label="Nama Toko"
                required
                placeholder="Masukkan nama toko Anda di sini"
                onChangeText={props.handleChange('merchant_name')}
                value={props.values.merchant_name}
                errorText={
                  props.touched.merchant_name && props.errors.merchant_name
                }
                onBlur={props.handleBlur('merchant_name')}
              />
              <Gap height={24} />
              <Dropdown
                onChange={(val) => handleChange(val)}
                value={categoryReducer.selectedCategory}
                label="Jenis Toko"
                required>
                {categoryReducer.data.map((item) => {
                  return (
                    <Picker.Item
                      key={item.name}
                      label={item.name}
                      value={item.id}
                    />
                  );
                })}
              </Dropdown>
              <Gap height={24} />
              <Text style={styles.p2Primary}>Logo Toko</Text>
              <Gap height={12} />
              <UploadButton />
              <Gap height={30} />
              <Button
                onPress={props.handleSubmit}
                text="Selanjutnya"
                position="center"
              />
              <Gap height={24} />
              <Button text="Login Di sini" type="nude" position="center" />
              <Gap height={34} />
            </ScrollView>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default EditName;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
  },
  icon: {
    alignSelf: 'center',
  },
  marker: {
    position: 'absolute',
    zIndex: 9999,
    alignSelf: 'center',
    top: '42%',
  },
  p2Primary: {
    fontFamily: fonts.primary[500],
    fontSize: 11,
    color: colors.secondary,
  },
});
