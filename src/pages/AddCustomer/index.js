import {Formik} from 'formik';
import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {ICLocationOrange} from '../../assets';
import {Button, Gap, Input, InputMap, Navbar} from '../../components';
import {setAutoCompleteAction, addCustomerAction} from '../../redux/actions';
import {colors} from '../../utils';

const addCustomerSchema = yup.object({
  customer_name: yup.string().required(),
  customer_phone: yup.string().required().min(9),
});

const AddCustomer = ({navigation}) => {
  const dispatch = useDispatch();
  const {autoCompleteReducer, getLocationReducer} = useSelector(
    (state) => state,
  );
  const {data, selectedData} = autoCompleteReducer;
  const {latitude, longitude} = getLocationReducer;
  const handleAdd = (value) => {
    const {customer_name, customer_phone} = value;
    console.log('value', value, selectedData, latitude, longitude);
    if (selectedData.length < 1) {
      return Alert.alert('Mohon isi alamat customer');
    }
    dispatch(
      addCustomerAction(
        {
          customer_name,
          customer_phone,
        },
        navigation,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.pages}>
      <Navbar
        onPress={() => navigation.goBack()}
        type="back"
        title="Tambah Customer Baru"
      />
      <View style={styles.content}>
        <Formik
          initialValues={{
            customer_name: '',
            customer_phone: '',
          }}
          validationSchema={addCustomerSchema}
          onSubmit={(value) => {
            handleAdd(value);
          }}>
          {(props) => (
            <>
              <ScrollView>
                <Gap height={16} />
                <Input
                  theme="light"
                  label="Nama Customer"
                  required
                  placeholder="Masukkan nomor toko Anda di sini"
                  onChangeText={props.handleChange('customer_name')}
                  value={props.values.customer_name}
                  errorText={
                    props.touched.customer_name && props.errors.customer_name
                  }
                  onBlur={props.handleBlur('customer_name')}
                />
                <Gap height={24} />
                <Input
                  theme="light"
                  label="Nomor Telepon Customer"
                  required
                  placeholder="Masukkan nomor toko Anda di sini"
                  type="phone"
                  onChangeText={props.handleChange('customer_phone')}
                  value={props.values.customer_phone}
                  errorText={
                    props.touched.customer_phone && props.errors.customer_phone
                  }
                  onBlur={props.handleBlur('customer_phone')}
                />
                <Gap height={24} />
                <InputMap
                  theme="light"
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
                  label="Alamat Customer"
                  required
                  placeholder="Masukkan alamat customer di sini"
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
              </ScrollView>
              <View style={{paddingBottom: 16}}>
                <Button
                  onPress={props.handleSubmit}
                  text="Simpan"
                  position="center"
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default AddCustomer;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white2,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white2,
    paddingHorizontal: 16,
  },
});
