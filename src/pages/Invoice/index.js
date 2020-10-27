import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CardInvoice} from '../../components';
import {Button, Gap, Navbar} from '../../components/atoms';
import {getInvoiceListAction} from '../../redux/actions';
import {colors, fonts} from '../../utils';

const Invoice = ({navigation}) => {
  const {invoiceReducer} = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInvoiceListAction());
  }, []);
  return (
    <View style={styles.pages}>
      <Navbar onPress={() => navigation.openDrawer()} title="Invoice" />
      <FlatList
        contentContainerStyle={styles.content}
        keyExtractor={(item) => item.id}
        data={
          !invoiceReducer.data.invoices
            ? invoiceReducer.data
            : invoiceReducer.data.invoices.items
        }
        renderItem={({item}) =>
          invoiceReducer.loading ? (
            <ActivityIndicator size={32} color={colors.secondary} />
          ) : invoiceReducer.error ? (
            <Button
              type="nude"
              text="Reload data"
              onPress={() => dispatch(getInvoiceListAction())}
            />
          ) : (
            <CardInvoice item={item} />
          )
        }
        ItemSeparatorComponent={() => <Gap height={24} />}
        ListEmptyComponent={() => (
          <View style={styles.center}>
            <Text style={styles.p1MediumBlack}>Data Kosong</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    backgroundColor: colors.white,
    // flex: 1,
    padding: 16,
  },
  p1MediumBlack: {
    fontSize: 14,
    fontFamily: fonts.primary[500],
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
