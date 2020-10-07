import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-community/picker';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  Dropdown,
  Gap,
  Input,
  InputDate,
  InputMapComplete,
  Navbar,
  UploadButton,
  ModalImport,
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
} from '../../redux/actions';
import {colors, fonts, getData, setDate, storeData, useForm} from '../../utils';

const CreateOrder = ({navigation}) => {
  const [nowDate, setNowDate] = useState(new Date());
  const [newDate, setNewDate] = useState('');
  const [show, setShow] = useState(false);

  const [form, setForm] = useForm({
    receiver_name: '',
    receiver_phone: '',
    product_name: '',
    product_description: '',
    product_weight: '',
    product_height: '',
    product_width: '',
    product_length: '',
  });
  const [errorForm, setErrorForm] = useForm({
    receiver_name: '',
    receiver_phone: '',
    product_name: '',
    product_description: '',
    product_weight: '',
    product_height: '',
    product_width: '',
    product_length: '',
  });

  const [receiver_phone, setReceiverPhone] = useState('');
  const [product_name, setProductName] = useState('');
  const [receiver_name, setReceiverName] = useState('');
  const [product_description, setDescription] = useState('');
  const [product_weight, setWeight] = useState('');
  const [product_height, setHeight] = useState('');
  const [product_width, setWidth] = useState('');
  const [product_length, setLength] = useState('');

  const getName = async () => {
    const receiver_name_val = await getData('receiver_name');
    const receiver_phone_val = await getData('receiver_phone');
    const product_name_val = await getData('product_name');
    const product_description_val = await getData('product_description');
    const product_weight_val = await getData('product_weight');
    const product_height_val = await getData('product_height');
    const product_width_val = await getData('product_width');
    const product_length_val = await getData('product_length');

    receiver_phone_val && setReceiverPhone(receiver_phone_val);
    receiver_name_val && setReceiverName(receiver_name_val);
    product_name_val && setProductName(product_name_val);
    product_description_val && setDescription(product_description_val);

    product_weight_val && setWeight(product_weight_val);
    product_height_val && setHeight(product_height_val);
    product_width_val && setWidth(product_width_val);
    product_length_val && setLength(product_length_val);
  };

  var tomorrow = new Date();

  const onChange = async (event, selectedDate) => {
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

  const dispatch = useDispatch();
  const {
    provinceReducer,
    cityReducer,
    districtReducer,
    categoryReducer,
    autoCompleteReducer,
    getLocationReducer,
    uploadImageReducer,
  } = useSelector((state) => state);

  const handleSubmit = async (val) => {
    if (receiver_name === '') {
      return Alert.alert('Mohon Lengkapi Data Anda');
    }
    if (receiver_phone === '') {
      return Alert.alert('Mohon Lengkapi Data Anda');
    }
    if (product_name === '') {
      return Alert.alert('Mohon Lengkapi Data Anda');
    }
    if (product_description === '') {
      return Alert.alert('Mohon Lengkapi Data Anda');
    }
    if (product_weight === '') {
      return Alert.alert('Mohon Lengkapi Data Anda');
    }
    if (product_height === '') {
      return Alert.alert('Mohon Lengkapi Data Anda');
    }
    if (product_width === '') {
      return Alert.alert('Mohon Lengkapi Data Anda');
    }
    if (product_length === '') {
      return Alert.alert('Mohon Lengkapi Data Anda');
    }
    if (newDate.length < 1) {
      Alert.alert('Mohon lengkapi data Anda');
    } else if (autoCompleteReducer.selectedData.length < 1) {
      Alert.alert('Mohon isi Alamat Anda');
    } else if (districtReducer.selectedDistrict === 'placeholder') {
      Alert.alert('Mohon pilih distrik kota Anda');
    } else if (!uploadImageReducer.data.id) {
      Alert.alert('Mohon upload foto barang Anda');
    } else {
      dispatch(
        addOrderAction(
          {
            schedule: newDate,
            receiver_name: receiver_name,
            receiver_phone: `+62${receiver_phone}`,
            receiver_address: autoCompleteReducer.selectedData,
            receiver_latitude: getLocationReducer.latitude,
            receiver_longitude: getLocationReducer.longitude,
            district_id: districtReducer.selectedDistrict,
            payment_method: 'transfer',
            details: [
              {
                product_name: product_name,
                product_description: product_description,
                product_height: product_height,
                product_weight: product_weight,
                product_length: product_length,
                product_width: product_width,
                category_id: categoryReducer.selectedCategory,
                product_image_id: uploadImageReducer.data.id,
              },
            ],
          },
          navigation,
        ),
      );
      await AsyncStorage.removeItem('receiver_name');
      await AsyncStorage.removeItem('receiver_phone');
      await AsyncStorage.removeItem('product_name');
      await AsyncStorage.removeItem('product_description');
      await AsyncStorage.removeItem('product_weight');
      await AsyncStorage.removeItem('product_height');
      await AsyncStorage.removeItem('product_width');
      await AsyncStorage.removeItem('product_length');
    }
  };

  const handleChange = (val, id) => {
    setForm(id, val);
    storeData(`${id}`, val);
  };

  useEffect(() => {
    getName();
    dispatch({type: 'DELETE_STATE'});
    dispatch(getLocationAction());
    dispatch(getProvinceAction('order'));
    dispatch(getCategoryAction());
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.replace('HomeDrawer');
      return true;
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        navigation.replace('HomeDrawer');
        return true;
      });
    };
  }, []);

  const [isVisible, setVisible] = useState(false);

  return (
    <SafeAreaView style={styles.pages}>
      <Navbar
        onPress={() => navigation.replace('HomeDrawer')}
        type="back"
        title="Buat Order Baru"
      />
      <ScrollView contentContainerStyle={{paddingHorizontal: 16}}>
        <Gap height={24} />
        <View style={styles.rowCenterBetween}>
          <Text style={[styles.buttonPrimaryBold, styles.textTitle]}>
            ORDER #1
          </Text>
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={[styles.selfCenter]}>
            <Text style={[styles.p1PrimaryBold]}>Import Data Penerima</Text>
          </TouchableOpacity>
        </View>

        <Gap height={16} />
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
          value={receiver_name}
          errorText={errorForm.receiver_name}
          // onBlur={props.handleBlur('receiver_name')}
          onChangeText={(val) => {
            setReceiverName(val);
            storeData('receiver_name', val);
          }}
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
              <Picker.Item key={item.name} label={item.name} value={item.id} />
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
        <Input
          value={receiver_phone}
          errorText={errorForm.receiver_phone}
          // onBlur={props.handleBlur('receiver_phone')}
          onChangeText={(val) => {
            setReceiverPhone(val);
            storeData('receiver_phone', val);
          }}
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
              <Picker.Item key={item.name} label={item.name} value={item.id} />
            );
          })}
        </Dropdown>
        <Gap height={24} />
        <Input
          value={product_name}
          errorText={errorForm.product_name}
          // onBlur={props.handleBlur('product_name')}
          onChangeText={(val) => {
            setProductName(val);
            storeData('product_name', val);
          }}
          placeholder="Masukkan nama barang"
          label="Nama Barang"
          theme="light"
          required
        />
        <Gap height={24} />
        <Input
          value={product_description}
          errorText={errorForm.product_description}
          // onBlur={props.handleBlur('product_description')}
          onChangeText={(val) => {
            setDescription(val);
            storeData('product_description', val);
          }}
          label="Deskripsi Barang"
          required
          placeholder="Tulis keterangan barang yang akan dikirim"
          type="description"
          theme="light"
        />
        <Gap height={24} />
        <Input
          value={product_weight}
          errorText={errorForm.product_weight}
          // onBlur={props.handleBlur('product_weight')}
          onChangeText={(val) => {
            setWeight(val);
            storeData('product_weight', val);
          }}
          label="Berat Barang"
          required
          placeholder="Tulis keterangan barang yang akan dikirim"
          type="weight"
          theme="light"
        />
        <Gap height={24} />
        <Input
          value={product_height}
          errorText={errorForm.product_height}
          // onBlur={props.handleBlur('product_height')}
          onChangeText={(val) => {
            setHeight(val);
            storeData('product_height', val);
          }}
          label="Tinggi Barang"
          required
          placeholder="Tulis tinggi barang yang akan dikirim"
          type="meter"
          theme="light"
        />
        <Gap height={24} />
        <Input
          value={product_width}
          errorText={errorForm.product_width}
          // onBlur={props.handleBlur('product_width')}
          onChangeText={(val) => {
            setWidth(val);
            storeData('product_width', val);
          }}
          label="Lebar Barang"
          required
          placeholder="Tulis lebar barang yang akan dikirim"
          type="meter"
          theme="light"
        />
        <Gap height={24} />
        <Input
          value={product_length}
          errorText={errorForm.product_length}
          // onBlur={props.handleBlur('product_length')}
          onChangeText={(val) => {
            setLength(val);
            storeData('product_length', val);
          }}
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
        <Button text="Lanjut" onPress={() => handleSubmit(form)} />
        <Gap height={24} />
      </ScrollView>
      <ModalImport isVisible={isVisible} setVisible={setVisible} />
    </SafeAreaView>
  );
};

export default CreateOrder;

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
  selfCenter: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  textTitle: {
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  buttonPrimaryBold: {
    fontFamily: fonts.primary[600],
    fontSize: 16,
    color: colors.primary,
  },
  p1PrimaryBold: {
    fontFamily: fonts.primary[600],
    fontSize: 14,
    color: colors.primary,
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
  rowCenterBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
