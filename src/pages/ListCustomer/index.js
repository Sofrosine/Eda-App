import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, CustomerList, Gap, Navbar} from '../../components';
import {getCustomerAction, searchCustomerAction} from '../../redux/actions';
import {colors, fonts} from '../../utils';

const ListCustomer = ({navigation}) => {
  const dispatch = useDispatch();
  const {data, loading} = useSelector((state) => state.customerReducer);

  useEffect(() => {
    dispatch(getCustomerAction());
  }, []);
  return (
    <SafeAreaView style={styles.pages}>
      <Navbar title="List Customer" />
      <View style={styles.content}>
        {loading ? (
          <View style={styles.contentEmpty}>
            <ActivityIndicator size={48} color={colors.progress.on} />
          </View>
        ) : data.data && data.data.customers.items.length < 1 ? (
          <View style={styles.contentEmpty}>
            <Text style={styles.h6PrimaryMedium}>List Customer Kosong</Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{paddingHorizontal: 16}}
            ListHeaderComponent={() => <Gap height={32} />}
            data={data.data && data.data.customers.items}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <>
                <CustomerList data={item} />
                <Gap height={12} />
              </>
            )}
          />
        )}
      </View>
      <View style={{padding: 16}}>
        <Button
          onPress={() => navigation.navigate('AddCustomer')}
          text="Tambah Customer Baru"
        />
      </View>
    </SafeAreaView>
  );
};

export default ListCustomer;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white2,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white2,
  },
  contentEmpty: {alignItems: 'center', justifyContent: 'center', flex: 1},
  h6PrimaryMedium: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    color: colors.black,
  },
});
