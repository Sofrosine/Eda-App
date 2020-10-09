import {Picker} from '@react-native-community/picker';
import {Formik} from 'formik';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {ICEda, ICLocationOrange} from '../../assets';
import {Button, Dropdown, Gap, InputMap} from '../../components';
import {
  getLocationAction,
  getProvinceAction,
  setAutoCompleteAction,
  setCityAction,
  setDistrictAction,
  setProvinceAction,
  updateProfileAction,
} from '../../redux/actions';
import {colors, fonts} from '../../utils';

const EditAddress = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    autoCompleteReducer,
    getLocationReducer,
    provinceReducer,
    cityReducer,
    districtReducer,
    profileReducer,
  } = useSelector((state) => state);
  const {data, selectedData} = autoCompleteReducer;
  const {latitude, longitude} = getLocationReducer;
  const {
    merchant_name,
    merchant_phone,
    merchant_address,
    category,
  } = profileReducer.data.merchant;

  const handleChangeAddress = (form) => {
    console.log('jyann');
    if (selectedData.length < 1) {
      return Alert.alert('Harap lengkapi data yang ada');
    }
    if (districtReducer.selectedDistrict === 'placeholder') {
      return Alert.alert('Harap lengkapi data yang ada');
    } else {
      const formData = new FormData();
      formData.append('name', merchant_name || '-');
      formData.append('merchant_name', merchant_name || '-');
      formData.append('email', profileReducer.data.email);
      formData.append('merchant_phone', merchant_phone || '081231264912');
      formData.append(
        'merchant_address',
        selectedData || merchant_address || 'Belum ada alamat',
      );
      formData.append(
        'district_id',
        districtReducer.selectedDistrict || 3101010,
      );
      formData.append('category_id', category.id || 1);
      formData.append('merchant_latitude', latitude);
      formData.append('merchant_longitude', longitude);
      dispatch(updateProfileAction(formData, navigation));
      // dispatch(
      //   setRegisterAction(
      //     {
      //       merchant_phone: form.merchant_phone,
      //       merchant_address: selectedData,
      //       district_id: districtReducer.selectedDistrict,
      //       merchant_latitude: latitude,
      //       merchant_longitude: longitude,
      //     },
      //     navigation,
      //   ),
      // );
    }
  };

  useEffect(() => {
    dispatch(getLocationAction());
    dispatch(getProvinceAction('register'));
  }, []);

  return (
    <SafeAreaView style={styles.pages}>
      <StatusBar backgroundColor={colors.primary} />
      <View style={styles.content}>
        <Formik>
          {(props) => (
            <ScrollView contentContainerStyle={{paddingHorizontal: 16}}>
              <Gap height={34} />
              <ICEda style={styles.icon} height={80} width={80} />
              <Gap height={27} />
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
              {profileReducer.loadingProfile ? (
                <ActivityIndicator size={32} color={colors.secondary} />
              ) : (
                <Button
                  onPress={handleChangeAddress}
                  text="Update Data"
                  position="center"
                />
              )}
              <Gap height={34} />
            </ScrollView>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default EditAddress;

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
