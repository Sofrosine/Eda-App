import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CardRequestOrder} from '../../components';
import {Button, Gap, Navbar} from '../../components/atoms';
import {requestOrderAction} from '../../redux/actions';
import {colors, fonts} from '../../utils';

const ListRequestOrder = ({navigation}) => {
  const {requestOrderReducer} = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestOrderAction());
  }, []);
  return (
    <View style={styles.pages}>
      <Navbar
        onPress={() => navigation.openDrawer()}
        title="List Request Order"
      />
      <FlatList
        contentContainerStyle={styles.content}
        keyExtractor={(item) => item.id}
        data={
          !requestOrderReducer.data.request_orders
            ? requestOrderReducer.data
            : requestOrderReducer.data.request_orders.items
        }
        renderItem={({item}) =>
          requestOrderReducer.loading ? (
            <ActivityIndicator size={32} color={colors.secondary} />
          ) : requestOrderReducer.error ? (
            <Button
              type="nude"
              text="Reload data"
              onPress={() => dispatch(requestOrderAction())}
            />
          ) : (
            <CardRequestOrder item={item} />
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

export default ListRequestOrder;

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
