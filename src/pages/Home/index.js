import React, {memo, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, CardTask, Gap, HomeTabBar, Navbar} from '../../components';
import {
  getInvoiceListAction,
  getOrderActiveAction,
  getOrderInactiveAction,
  getOrderPaginationActiveAction,
  getOrderPaginationInactiveAction,
  getTotalInvoiceAction,
} from '../../redux/actions';
import {colors, fonts, getData} from '../../utils';

const MemoView = memo(View);

const Home = ({navigation}) => {
  const [tabBarActive, setTabBar] = useState(true);
  const dispatch = useDispatch();
  const {getOrderReducer, invoiceReducer, profileReducer} = useSelector(
    (state) => state,
  );
  const {total} = invoiceReducer.totalAmount;
  const {showNotificationAlert, notificationTitle} = useSelector(
    (state) => state.showNotificationAlertReducer,
  );

  const handleCreateOrder = async () => {
    const getUser = await getData('@user_data');

    console.log('getuser', getUser);

    if (!getUser.merchant.is_complete) {
      return Alert.alert('Mohon lengkapi profile Anda terlebih dahulu');
    } else if (!total > 0) {
      navigation.navigate('CreateOrder', {
        request_order_id: false,
      });
    } else {
      Alert.alert('Mohon membayar invoice Anda terlebih dahulu');
      navigation.navigate('List Request Order');
      console.log('tototo', total);
    }
  };

  useEffect(() => {
    tabBarActive
      ? dispatch(getOrderActiveAction())
      : dispatch(getOrderInactiveAction());
    dispatch(getInvoiceListAction());
    dispatch(getTotalInvoiceAction());
    console.log('toto', total);
  }, [navigation]);
  return (
    <>
      {/* {showNotificationAlert && <NotificationAlert title={notificationTitle} />} */}
      <SafeAreaView style={styles.pages}>
        <Navbar onPress={() => navigation.openDrawer()} title="Home" />
        <View style={styles.content}>
          <Gap height={16} />
          <View style={{paddingHorizontal: 16}}>
            <HomeTabBar setState={setTabBar} isActive={tabBarActive} />
          </View>
          <Gap height={16} />
          <View style={[styles.content]}>
            {tabBarActive ? (
              getOrderReducer.activeData &&
              getOrderReducer.activeData.length > 0 ? (
                <FlatList
                  onEndReached={() =>
                    dispatch(getOrderPaginationActiveAction())
                  }
                  onEndReachedThreshold={0.5}
                  contentContainerStyle={{paddingHorizontal: 16}}
                  keyExtractor={(item) => item.id}
                  data={getOrderReducer.activeData}
                  renderItem={({item}) => (
                    <>
                      <CardTask
                        name={item.receiver_name}
                        type={item.order_status}
                        phone={item.receiver_phone}
                        location={item.receiver_address}
                        date={item.created_at}
                        onPress={() =>
                          navigation.navigate('DetailOrder', {
                            id: item.id,
                          })
                        }
                      />
                      <Gap height={16} />
                    </>
                  )}
                />
              ) : (
                <Text
                  style={[
                    styles.h6Black,
                    {textAlign: 'center', marginTop: 20},
                  ]}>
                  No active data
                </Text>
              )
            ) : getOrderReducer.inactiveData &&
              getOrderReducer.inactiveData.length > 0 ? (
              <FlatList
                onEndReached={() =>
                  dispatch(getOrderPaginationInactiveAction())
                }
                onEndReachedThreshold={0.5}
                contentContainerStyle={{paddingHorizontal: 16}}
                keyExtractor={(item) => item.id}
                data={getOrderReducer.inactiveData}
                renderItem={({item}) => (
                  <>
                    <CardTask
                      name={item.receiver_name}
                      type={item.order_status}
                      phone={item.receiver_phone}
                      location={item.receiver_address}
                      date={item.created_at}
                      onPress={() =>
                        navigation.navigate('DetailOrder', {
                          id: item.id,
                        })
                      }
                    />
                    <Gap height={16} />
                  </>
                )}
              />
            ) : (
              <Text
                style={[styles.h6Black, {textAlign: 'center', marginTop: 20}]}>
                No inactive data
              </Text>
            )}
          </View>
        </View>
        <MemoView style={styles.buttonBarWrapper}>
          <View style={styles.buttonFloatWrapper}>
            <Button onPress={handleCreateOrder} type="float" />
          </View>
          <View style={styles.bottomBarTextWrapper}>
            <Text style={styles.p3Regular}>Buat Order Baru</Text>
          </View>
        </MemoView>
      </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white2,
  },
  content: {
    flex: 1,
  },
  contentScroll: {
    paddingHorizontal: 22,
    paddingTop: 22,
  },
  h6Black: {
    fontSize: 18,
    lineHeight: 25,
    fontFamily: fonts.primary[600],
    color: colors.text.black,
  },
  p3Regular: {
    fontSize: 10,
    fontFamily: fonts.primary[400],
    color: colors.text.gray,
  },
  bottomBarTextWrapper: {
    alignSelf: 'center',
    elevation: 4,
    backgroundColor: colors.white,
    padding: 4,
    paddingHorizontal: 8,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    bottom: 0,
    position: 'absolute',
    width: 90,
    alignItems: 'center',
  },
  buttonBarWrapper: {
    backgroundColor: 'rgba(0,0,0,0)',
    height: 80,
    // width: '100%',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  buttonFloatWrapper: {
    width: 68,
    height: 68,
    borderRadius: 200,
    backgroundColor: colors.white2,
    alignSelf: 'center',
    bottom: 8,
    // position: 'absolute',
    zIndex: 99999999999,
  },
});
