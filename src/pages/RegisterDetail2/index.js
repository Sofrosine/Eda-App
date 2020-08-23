import {Picker} from '@react-native-community/picker';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {ICEda, ICLocationOrange} from '../../assets';
import {
  Button,
  Dropdown,
  Gap,
  Input,
  InputMap,
  ProgressBar,
} from '../../components';
import {
  getLocationAction,
  getProvinceAction,
  setAutoCompleteAction,
  setCityAction,
  setDistrictAction,
  setProvinceAction,
  setRegisterAction,
} from '../../redux/actions';
import {colors, fonts} from '../../utils';
import {Formik} from 'formik';
import * as yup from 'yup';

const registerSchema = yup.object({
  merchant_phone: yup.string().required(),
});

const RegisterDetail2 = ({navigation, route}) => {
  const {
    name,
    email,
    password,
    password_confirmation,
    merchant_name,
    category_id,
    merchant_image_id,
  } = route.params;
  const dispatch = useDispatch();
  const {
    autoCompleteReducer,
    getLocationReducer,
    provinceReducer,
    cityReducer,
    districtReducer,
  } = useSelector((state) => state);
  const {data, selectedData} = autoCompleteReducer;
  const {latitude, longitude} = getLocationReducer;
  const handleRegister = (form) => {
    if (selectedData.length < 1) {
      return alert('Harap lengkapi data yang ada');
    }
    if (districtReducer.selectedDistrict === 'placeholder') {
      return alert('Harap lengkapi data yang ada');
    } else {
      dispatch(
        setRegisterAction(
          {
            name,
            email,
            password,
            password_confirmation,
            merchant_name,
            merchant_phone: form.merchant_phone,
            merchant_address: selectedData,
            category_id,
            district_id: districtReducer.selectedDistrict,
            merchant_image_id,
            merchant_latitude: latitude,
            merchant_longitude: longitude,
          },
          navigation,
        ),
      );
    }
  };

  useEffect(() => {
    dispatch(getLocationAction());
    dispatch(getProvinceAction('register'));
  }, []);

  return (
    <SafeAreaView style={styles.pages}>
      <StatusBar backgroundColor={colors.primary} />
      <ProgressBar percent={100} />
      <View style={styles.content}>
        <Formik
          initialValues={{
            merchant_phone: '',
            // merchant_address: selectedData,
          }}
          validationSchema={registerSchema}
          onSubmit={(value) => {
            console.log('value', value);
            handleRegister(value);
          }}>
          {(props) => (
            <ScrollView contentContainerStyle={{paddingHorizontal: 16}}>
              <Gap height={34} />
              <ICEda style={styles.icon} height={80} width={80} />
              <Gap height={27} />
              <Input
                label="Nomor Telepon"
                required
                placeholder="Masukkan nomor toko Anda di sini"
                type="phone"
                onChangeText={props.handleChange('merchant_phone')}
                value={props.values.merchant_phone}
                errorText={
                  props.touched.merchant_phone && props.errors.merchant_phone
                }
                onBlur={props.handleBlur('merchant_phone')}
              />
              <Gap height={24} />
              <InputMap
                value={selectedData}
                data={data}
                onChangeText={(val) =>
                  dispatch(
                    setAutoCompleteAction(
                      getLocationReducer.latitude,
                      getLocationReducer.longitude,
                      val,
                    ),
                  )
                }
                label="Alamat Toko"
                required
                placeholder="Masukkan alamat toko Anda di sini"
              />
              <Gap height={24} />
              <View>
                {getLocationReducer.loading ? (
                  <ActivityIndicator size={36} color={colors.secondary} />
                ) : (
                  <>
                    <MapView
                      style={{height: 137}}
                      initialRegion={{
                        latitude: getLocationReducer.latitude,
                        longitude: getLocationReducer.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                      }}>
                      <Marker
                        coordinate={{
                          latitude: getLocationReducer.latitude,
                          longitude: getLocationReducer.longitude,
                          latitudeDelta: 0.005,
                          longitudeDelta: 0.005,
                        }}
                        icon={ICLocationOrange}
                      />
                    </MapView>
                  </>
                )}
              </View>
              <Gap height={24} />
              <Dropdown
                onChange={(val) => dispatch(setProvinceAction(val))}
                value={provinceReducer.selectedProvince}
                label="Provinsi"
                required>
                {provinceReducer.data.map((item) => {
                  return (
                    <Picker.Item
                      key={item.name}
                      label={item.name}
                      value={item.id}
                    />
                  );
                })}
              </Dropdown>
              {cityReducer.data.length > 0 && (
                <>
                  <Gap height={24} />
                  <Dropdown
                    onChange={(val) => dispatch(setCityAction(val))}
                    value={cityReducer.selectedCity}
                    label="Kota"
                    required>
                    {cityReducer.data.map((item) => {
                      return (
                        <Picker.Item
                          key={item.name}
                          label={item.name}
                          value={item.id}
                        />
                      );
                    })}
                  </Dropdown>
                </>
              )}
              {districtReducer.data.length > 0 && (
                <>
                  <Gap height={24} />
                  <Dropdown
                    onChange={(val) => dispatch(setDistrictAction(val))}
                    value={districtReducer.selectedDistrict}
                    label="Distrik"
                    required>
                    {districtReducer.data.map((item) => {
                      return (
                        <Picker.Item
                          key={item.name}
                          label={item.name}
                          value={item.id}
                        />
                      );
                    })}
                  </Dropdown>
                </>
              )}
              <Gap height={30} />
              <Button
                onPress={props.handleSubmit}
                text="Selesaikan"
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

export default RegisterDetail2;

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
