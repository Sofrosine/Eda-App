import {Picker} from '@react-native-community/picker';
import {Formik} from 'formik';
import React, {useEffect} from 'react';
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
import {Button, Dropdown, Gap, Input} from '../../components';
import {
  getCategoryAction,
  getLocationAction,
  getProfileAction,
  setCategoryAction,
  updateProfileAction,
} from '../../redux/actions';
import {colors, fonts} from '../../utils';

const registerSchema = yup.object({
  merchant_name: yup.string().required(),
  merchant_phone: yup.string().required(),
  email: yup.string().email().required(),
});

const EditName = ({navigation, route}) => {
  const globalState = useSelector((state) => state);
  const {
    categoryReducer,
    uploadImageReducer,
    profileReducer,
    getLocationReducer,
  } = globalState;
  const dispatch = useDispatch();
  const handleChangeData = (values) => {
    const formData = new FormData();
    formData.append('name', values.merchant_name);
    formData.append('merchant_name', values.merchant_name);
    formData.append('email', values.email);
    formData.append('merchant_phone', values.merchant_phone);
    formData.append(
      'merchant_address',
      profileReducer.data.merchant.merchant_address || 'Belum ada alamat',
    );
    formData.append('district_id', 3101010);
    formData.append('category_id', categoryReducer.selectedCategory || '');
    formData.append(
      'merchant_image_id',
      uploadImageReducer.data.id ? uploadImageReducer.data.id : '',
    );
    formData.append(
      'merchant_latitude',
      profileReducer.data.merchant.merchant_latitude
        ? profileReducer.data.merchant.merchant_latitude
        : getLocationReducer.latitude,
    );
    formData.append(
      'merchant_longitude',
      profileReducer.data.merchant.merchant_longitude
        ? profileReducer.data.merchant.merchant_longitude
        : getLocationReducer.longitude,
    );
    dispatch(updateProfileAction(formData, navigation));
  };

  const handleChange = async (val) => {
    dispatch(setCategoryAction(val));
  };

  useEffect(() => {
    dispatch(getCategoryAction());
    dispatch(getProfileAction());
    dispatch(getLocationAction());
    console.log('profile reducer', profileReducer);
  }, []);

  return (
    <SafeAreaView style={styles.pages}>
      <StatusBar backgroundColor={colors.primary} />
      <View style={styles.content}>
        <Formik
          validationSchema={registerSchema}
          initialValues={{
            merchant_name: profileReducer.data.merchant.merchant_name || '',
            merchant_phone: profileReducer.data.merchant.merchant_phone || '',
            email: profileReducer.data.email || '',
          }}
          onSubmit={(values) => {
            handleChangeData(values);
          }}>
          {(props) => (
            <ScrollView contentContainerStyle={{paddingHorizontal: 16}}>
              <Gap height={34} />
              <ICEda style={styles.icon} height={80} width={80} />
              <Gap height={27} />
              <Input
                defaultValue={profileReducer.data.merchant.merchant_name || ''}
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
              <Input
                defaultValue={profileReducer.data.merchant.merchant_phone || ''}
                label="Nomor Handphone"
                required
                placeholder="Masukkan nomor handphone Anda di sini"
                onChangeText={props.handleChange('merchant_phone')}
                value={props.values.merchant_phone}
                errorText={
                  props.touched.merchant_phone && props.errors.merchant_phone
                }
                onBlur={props.handleBlur('merchant_name')}
              />
              <Gap height={24} />
              <Input
                defaultValue={profileReducer.data.email || ''}
                label="Email"
                required
                placeholder="Masukkan email Anda di sini"
                onChangeText={props.handleChange('email')}
                value={props.values.email}
                errorText={props.touched.email && props.errors.email}
                onBlur={props.handleBlur('email')}
              />
              <Gap height={24} />
              {/* <Text style={styles.p2Primary}>Logo Toko</Text> */}
              {/* <Gap height={12} /> */}
              {/* <UploadButton /> */}
              <Gap height={30} />
              {profileReducer.loadingProfile ? (
                <ActivityIndicator size={32} color={colors.secondary} />
              ) : (
                <Button
                  onPress={props.handleSubmit}
                  text="Update Data"
                  position="center"
                />
              )}
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
