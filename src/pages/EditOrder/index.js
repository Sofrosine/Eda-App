import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-community/picker';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {
  Button,
  Dropdown,
  Gap,
  Input,
  InputDate,
  InputMapComplete,
  Navbar,
  UploadButton,
} from '../../components';
import {
  addOrderAction,
  getCategoryAction,
  getLocationAction,
  getProvinceAction,
  setCategoryAction,
  setCityAction,
  setDistrictAction,
  setProvinceAction,
  getDetailOrderAction,
  setAutoCompleteAction,
  setLocationAction,
  setUploadImageAction,
  setOnlyProvinceAction,
  getOnlyProvinceAction,
  getOnlyCityAction,
  getOnlyDistrictAction,
} from '../../redux/actions';
import {colors, fonts, setDate} from '../../utils';
import {editOrderAction} from '../../redux/EditOrder/actions';

const EditOrder = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {
    provinceReducer,
    cityReducer,
    districtReducer,
    categoryReducer,
    autoCompleteReducer,
    getLocationReducer,
    uploadImageReducer,
    detailOrderReducer,
  } = useSelector((state) => state);
  const {id} = route.params;
  const [nowDate, setNowDate] = useState(new Date());
  const [newDate, setNewDate] = useState('');
  const [show, setShow] = useState(false);
  const {
    receiver_name,
    receiver_phone,
    details,
    receiver_address,
    receiver_latitude,
    receiver_longitude,
    district,
  } = detailOrderReducer.data;
  const {
    product_name,
    product_description,
    product_height,
    product_length,
    product_weight,
    product_width,
    category,
    image,
  } = details[0];

  const createOrderSchema = yup.object({
    receiver_name: yup.string().required('Wajib diisi'),
    receiver_phone: yup.string().required('Wajib diisi'),
    product_name: yup.string().required('Wajib diisi'),
    product_description: yup.string().required('Wajib diisi'),
    product_weight: yup
      .string()
      .required('Wajib diisi')
      .test('min-1', 'Harus lebih besar atau sama dengan 1', (val) => {
        return Number(val) >= 1;
      }),
    product_height: yup
      .string()
      .required('Wajib diisi')
      .min(1)
      .test('min-1', 'Harus lebih besar atau sama dengan 1', (val) => {
        return Number(val) >= 1;
      }),
    product_width: yup
      .string()
      .required('Wajib diisi')
      .min(1)
      .test('min-1', 'Harus lebih besar atau sama dengan 1', (val) => {
        return Number(val) >= 1;
      }),
    product_length: yup
      .string()
      .required('Wajib diisi')
      .min(1)
      .test('min-1', 'Harus lebih besar atau sama dengan 1', (val) => {
        return Number(val) >= 1;
      }),
  });
  var tomorrow = new Date();

  const onChange = async (event, selectedDate) => {
    var convertNowDate = new Date(new Date().getTime());
    var convertNowDay = convertNowDate.getDate();
    var convertNowMonth = convertNowDate.getMonth() + 1;
    var convertNowYear = convertNowDate.getFullYear();
    var convertTomorrowDate = new Date(
      new Date().getTime() + 24 * 60 * 60 * 1000,
    );
    var convertTomorrowDay = convertTomorrowDate.getDate();
    var convertTomorrowMonth = convertTomorrowDate.getMonth() + 1;
    var convertTomorrowYear = convertTomorrowDate.getFullYear();
    const currentDate = selectedDate || nowDate;
    setShow(Platform.OS === 'ios');
    setNowDate(currentDate);
    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const dates = setDate(date, month, year);
    if (
      currentDate.getHours() > 20 &&
      `${year}-${date}-${month + 1}` ===
        `${convertTomorrowYear}-${convertTomorrowDay}-${convertTomorrowMonth}`
    ) {
      return Alert.alert(
        'Karena sudah melebihi pukul 20.00, minimal memilih lusa',
      );
    }
    setNewDate(dates);
  };

  const handleSubmit = (val) => {
    if (newDate.length < 1) {
      Alert.alert('Mohon lengkapi tanggal');
    } else if (autoCompleteReducer.selectedData.length < 1) {
      Alert.alert('Mohon isi Alamat Anda');
    } else if (districtReducer.selectedDistrict === 'placeholder') {
      Alert.alert('Mohon pilih distrik kota Anda');
    } else if (!uploadImageReducer.data.url) {
      Alert.alert('Mohon upload foto barang Anda');
    } else {
      dispatch(
        editOrderAction(
          {
            id,
            schedule: newDate,
            receiver_name: val.receiver_name,
            receiver_phone: `+62${val.receiver_phone}`,
            receiver_address: autoCompleteReducer.selectedData,
            receiver_latitude: getLocationReducer.latitude,
            receiver_longitude: getLocationReducer.longitude,
            district_id: districtReducer.selectedDistrict,
            payment_method: 'transfer',
            details: [
              {
                product_name: val.product_name,
                product_description: val.product_description,
                product_height: val.product_height,
                product_weight: val.product_weight,
                product_length: val.product_length,
                product_width: val.product_width,
                category_id: categoryReducer.selectedCategory,
                product_image_id: uploadImageReducer.data.id,
              },
            ],
          },
          navigation,
        ),
      );
    }
  };

  useEffect(() => {
    // dispatch(addOrderAction());
    dispatch(getLocationAction());
    dispatch(getProvinceAction('order'));
    dispatch(getCategoryAction());
    dispatch(getDetailOrderAction(id));
    dispatch(
      setAutoCompleteAction(
        receiver_latitude,
        receiver_longitude,
        receiver_address,
      ),
    );
    dispatch(
      setLocationAction(Number(receiver_latitude), Number(receiver_longitude)),
    );
    dispatch(setCategoryAction(category.id));
    dispatch(setUploadImageAction(image.url, image.id));
    dispatch(getOnlyProvinceAction('order', district.city.province.id));
    dispatch(
      getOnlyCityAction('order', district.city.province.id, district.city.id),
    );
    dispatch(getOnlyDistrictAction('order', district.city.id, district.id));
    // dispatch(setOnlyProvinceAction(district.city.province.id));
    // dispatch(setCityAction(district.city.id, 'order'));
    // dispatch(setDistrictAction(district.id));
    console.log('detaill', uploadImageReducer);
  }, []);

  return (
    <SafeAreaView style={styles.pages}>
      <Navbar
        onPress={() => navigation.replace('HomeDrawer')}
        type="back"
        title="Edit Order"
      />
      <Formik
        validationSchema={createOrderSchema}
        initialValues={{
          receiver_name,
          receiver_phone: receiver_phone.slice(4),
          product_name,
          product_description,
          product_weight: String(product_weight),
          product_height: String(product_height),
          product_width: String(product_width),
          product_length: String(product_length),
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}>
        {(props) => (
          <ScrollView contentContainerStyle={{paddingHorizontal: 16}}>
            <Gap height={24} />
            <InputDate
              text={newDate}
              onPress={() => setShow(true)}
              label="Pilih tanggal *"
            />
            {show && (
              <DateTimePicker
                minimumDate={tomorrow.setDate(new Date().getDate() + 1)}
                testID="dateTimePicker"
                value={nowDate}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <Gap height={24} />
            <Input
              value={props.values.receiver_name}
              errorText={
                props.touched.receiver_name && props.errors.receiver_name
              }
              onBlur={props.handleBlur('receiver_name')}
              onChangeText={props.handleChange('receiver_name')}
              placeholder="Masukkan nama penerima"
              label="Nama Penerima"
              theme="light"
              required
            />
            <Gap height={24} />
            <InputMapComplete
              theme="light"
              label="Alamat Penerima"
              placeholder="Masukkan alamat penerima di sini"
            />
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

            <Gap height={30} />
            <Input
              value={props.values.receiver_phone}
              errorText={
                props.touched.receiver_phone && props.errors.receiver_phone
              }
              onBlur={props.handleBlur('receiver_phone')}
              onChangeText={props.handleChange('receiver_phone')}
              placeholder="Masukkan nomor telepon"
              label="Nomor Telepon Penerima"
              type="phone"
              theme="light"
              required
            />
            <Gap height={24} />
            <Dropdown
              theme="light"
              onChange={(val) => dispatch(setCategoryAction(val))}
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
              value={props.values.product_name}
              errorText={
                props.touched.product_name && props.errors.product_name
              }
              onBlur={props.handleBlur('product_name')}
              onChangeText={props.handleChange('product_name')}
              placeholder="Masukkan nama barang"
              label="Nama Barang"
              theme="light"
              required
            />
            <Gap height={24} />
            <Input
              value={props.values.product_description}
              errorText={
                props.touched.product_description &&
                props.errors.product_description
              }
              onBlur={props.handleBlur('product_description')}
              onChangeText={props.handleChange('product_description')}
              label="Deskripsi Barang"
              required
              placeholder="Tulis keterangan barang yang akan dikirim"
              type="description"
              theme="light"
            />
            <Gap height={24} />
            <Input
              value={props.values.product_weight}
              errorText={
                props.touched.product_weight && props.errors.product_weight
              }
              onBlur={props.handleBlur('product_weight')}
              onChangeText={props.handleChange('product_weight')}
              label="Berat Barang"
              required
              placeholder="Tulis keterangan barang yang akan dikirim"
              type="weight"
              theme="light"
            />
            <Gap height={24} />
            <Input
              value={props.values.product_height}
              errorText={
                props.touched.product_height && props.errors.product_height
              }
              onBlur={props.handleBlur('product_height')}
              onChangeText={props.handleChange('product_height')}
              label="Tinggi Barang"
              required
              placeholder="Tulis tinggi barang yang akan dikirim"
              type="meter"
              theme="light"
            />
            <Gap height={24} />
            <Input
              value={props.values.product_width}
              errorText={
                props.touched.product_width && props.errors.product_width
              }
              onBlur={props.handleBlur('product_width')}
              onChangeText={props.handleChange('product_width')}
              label="Lebar Barang"
              required
              placeholder="Tulis lebar barang yang akan dikirim"
              type="meter"
              theme="light"
            />
            <Gap height={24} />
            <Input
              value={props.values.product_length}
              errorText={
                props.touched.product_length && props.errors.product_length
              }
              onBlur={props.handleBlur('product_length')}
              onChangeText={props.handleChange('product_length')}
              label="Panjang Barang"
              required
              placeholder="Tulis panjang barang yang akan dikirim"
              type="meter"
              theme="light"
            />
            <Gap height={24} />
            <Text style={styles.p2BoldRegular}>Foto Barang *</Text>
            <Gap height={8} />
            <UploadButton type="product-image" />
            <Gap height={8} />
            <Text style={styles.p2Regular}>Maksimal file size foto 10MB</Text>
            <Gap height={24} />
            <Button text="Lanjut" onPress={props.handleSubmit} />
            <Gap height={24} />
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default EditOrder;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white2,
  },
  marker: {
    position: 'absolute',
    zIndex: 9999,
    alignSelf: 'center',
    top: '42%',
  },
  p1Black: {
    fontFamily: fonts.primary[500],
    fontSize: 11,
    color: colors.black,
  },
  p1Regular: {
    fontFamily: fonts.primary[400],
    fontSize: 14,
    color: colors.black,
  },
  p2Regular: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    color: colors.black,
  },
  p2BoldRegular: {
    fontFamily: fonts.primary[500],
    fontSize: 12,
    color: colors.black,
  },
  rowCenter: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
});
