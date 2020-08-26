import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Navbar,
  Gap,
  UploadButton,
  Button,
  BankList,
  CardOrder,
  Input,
  Dropdown,
} from '../../components';
import {colors, fonts} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAvailablePaymentAction,
  getDetailOrderAction,
  getBankListAction,
  setBankListAction,
  setPaymentAction,
} from '../../redux/actions';
import {Picker} from '@react-native-community/picker';
import {Formik} from 'formik';
import * as yup from 'yup';

const paymentSchema = yup.object({
  bank_sender_account_name: yup.string().required('Nama Rekening wajib diisi!'),
  bank_sender_account_number: yup
    .string()
    .required('Nomor Rekening wajib diisi!'),
});

const CreateOrder2 = ({navigation, route}) => {
  const {order_id} = route.params;
  const [checked, setChecked] = useState(0);
  const dispatch = useDispatch();
  const {
    availablePaymentReducer,
    detailOrderReducer,
    bankListReducer,
    uploadImageReducer,
  } = useSelector((state) => state);
  const {data} = detailOrderReducer;

  useEffect(() => {
    dispatch(getAvailablePaymentAction());
    dispatch(getDetailOrderAction(order_id));
    console.log('detailOrder', detailOrderReducer.data.total_amount);
    dispatch(getBankListAction());
    console.log('reducah', detailOrderReducer);
  }, []);

  const handleSubmit = (values) => {
    const {bank_sender_account_name, bank_sender_account_number} = values;
    const bankReceiver = availablePaymentReducer.transferData[checked];
    if (bankListReducer.selectedBank === 'placeholder') {
      return Alert.alert('Mohon pilih jenis rekening Anda');
    } else if (!uploadImageReducer.data.id) {
      return Alert.alert('Mohon upload foto barang Anda');
    } else {
      dispatch(
        setPaymentAction(
          {
            order_id,
            bank_sender_account_name,
            bank_sender_account_number,
            bank_sender_id: bankListReducer.selectedBank,
            bank_receiver_account_name: bankReceiver.bank_account_name,
            bank_receiver_account_number: bankReceiver.bank_account_number,
            bank_receiver_id: bankReceiver.bank.id,
            amount: data.total_amount,
            transfer_proof_id: uploadImageReducer.data.id,
          },
          navigation,
        ),
      );
    }
  };
  return (
    <SafeAreaView style={styles.pages}>
      <Navbar
        onPress={() => navigation.navigate('HomeDrawer')}
        type="back"
        title="Buat Order Baru"
      />
      <Formik
        validationSchema={paymentSchema}
        initialValues={{
          bank_sender_account_name: '',
          bank_sender_account_number: '',
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}>
        {(props) => (
          <>
            <View style={{flex: 1}}>
              <ScrollView>
                <Gap height={24} />
                <View style={styles.content}>
                  {data && (
                    <CardOrder
                      name={data.receiver_name}
                      number={data.receiver_phone}
                      location={data.receiver_address}
                      date={data.schedule}
                      image={data.details && data.details[0].image.url}
                    />
                  )}
                  <Gap height={24} />
                  <Text style={styles.h6Medium}>Pembayaran</Text>
                  <Gap height={24} />
                  <View style={styles.bankContainer}>
                    <Text style={styles.buttonMedium}>Transfer Bank</Text>
                    {availablePaymentReducer.transferData &&
                      availablePaymentReducer.transferData.map((item, key) => {
                        return (
                          <View key={key}>
                            <Gap height={16} />
                            <BankList
                              isSelected={checked === key}
                              bankAccountName={item.bank_account_name}
                              bankAccountNumber={item.bank_account_number}
                              bankName={item.bank.bank_name}
                              onPress={() => setChecked(key)}
                            />
                          </View>
                        );
                      })}
                  </View>
                  <Gap height={24} />
                  <View>
                    <Text style={styles.p2Bold}>Total Pembayaran</Text>
                    <Text style={styles.p1Regular}>
                      {detailOrderReducer.data.total_amount}
                    </Text>
                  </View>
                  <Gap height={24} />
                  <Input
                    value={props.values.bank_sender_account_name}
                    errorText={
                      props.touched.bank_sender_account_name &&
                      props.errors.bank_sender_account_name
                    }
                    onBlur={props.handleBlur('bank_sender_account_name')}
                    onChangeText={props.handleChange(
                      'bank_sender_account_name',
                    )}
                    placeholder="Masukkan nama rekening Anda"
                    label="Nama Rekening"
                    theme="light"
                    required
                  />
                  <Gap height={24} />
                  <Input
                    value={props.values.bank_sender_account_number}
                    errorText={
                      props.touched.bank_sender_account_number &&
                      props.errors.bank_sender_account_number
                    }
                    onBlur={props.handleBlur('bank_sender_account_number')}
                    onChangeText={props.handleChange(
                      'bank_sender_account_number',
                    )}
                    placeholder="Masukkan nomor rekening Anda"
                    label="Nomor Rekening"
                    theme="light"
                    required
                  />
                  <Gap height={24} />
                  <Dropdown
                    onChange={(val) => dispatch(setBankListAction(val))}
                    value={bankListReducer.selectedBank}
                    label="Jenis Rekening"
                    required
                    theme="light">
                    {bankListReducer.data.map((item) => {
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
                  <Text style={styles.h6Medium}>Upload Bukti Transfer</Text>
                  <Gap height={8} />
                  <UploadButton type="payment-confirmation" />
                  <Gap height={8} />
                  <Text style={styles.p2Regular}>
                    Maksimal file size foto 10MB
                  </Text>
                </View>
              </ScrollView>
            </View>
            <View style={{padding: 16}}>
              <Button onPress={props.handleSubmit} text="Lanjut" />
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default CreateOrder2;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  h6Medium: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    color: colors.black,
  },
  buttonMedium: {
    fontSize: 15,
    fontFamily: fonts.primary[500],
    color: colors.text.black2,
  },
  bankContainer: {
    paddingHorizontal: 4,
  },
  p2Regular: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    color: colors.black,
  },
  p1Regular: {
    fontFamily: fonts.primary[400],
    fontSize: 14,
    color: colors.black,
  },
  p2Bold: {
    fontFamily: fonts.primary[500],
    fontSize: 12,
    color: colors.black,
  },
  p3GrayRegular: {
    fontFamily: fonts.primary[400],
    fontSize: 10,
    color: colors.gray,
  },
});
