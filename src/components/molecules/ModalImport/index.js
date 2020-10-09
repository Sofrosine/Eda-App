import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {ListDetailOrder} from '..';
import {searchCustomerAction} from '../../../redux/actions';
import {colors, fonts} from '../../../utils';
import {Gap, Input} from '../../atoms';

const ModalImport = ({isVisible, setVisible}) => {
  const {data, loading} = useSelector((state) => state.searchCustomerReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchCustomerAction(''));
  }, []);

  return (
    <Modal
      swipeDirection="down"
      onSwipeComplete={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
      style={{margin: 0}}
      isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.swipe} />
        <Gap height={8} />
        <View style={styles.swipe} />
        <Gap height={16} />
        <Input
          onChangeText={(val) => {
            dispatch(searchCustomerAction(val));
          }}
          label="Cari Nama Customer"
          theme="light"
          placeholder="Misal: John"
        />
        <Gap height={24} />
        {loading ? (
          <ActivityIndicator size={32} color={colors.progress.on} />
        ) : data.customer && data.customer.length < 1 ? (
          <Text style={styles.buttonBlackBold}>Tidak ada data</Text>
        ) : (
          data.customer &&
          data.customer.map((item, index) => (
            <View>
              <ListDetailOrder
                type="avatar"
                title={item.customer_name}
                subtitle={item.customer_address}
              />
              <Gap height={16} />
            </View>
          ))
        )}
      </View>
    </Modal>
  );
};

export default ModalImport;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: 16,
  },
  swipe: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors.gray,
    alignSelf: 'center',
    width: 53,
  },
  buttonBlackBold: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    alignSelf: 'center',
  },
});
