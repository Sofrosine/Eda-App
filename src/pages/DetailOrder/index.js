import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IMGMenuBackground} from '../../assets';
import {Badge, Button, Gap, ListDetailOrder, Navbar} from '../../components';
import {cancelOrderAction, getDetailOrderAction} from '../../redux/actions';
import {colors, fonts} from '../../utils';

const DetailOrder = ({route, navigation}) => {
  const {id} = route.params;
  const {data} = useSelector((state) => state.detailOrderReducer);
  const [update, setUpdate] = useState(false);
  const {details} = data;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetailOrderAction(id));
    const yo = setTimeout(() => {
      setUpdate(!update);
    }, 1000);
    () => {
      clearTimeout(yo);
    };
  }, []);

  const handleCancel = () => {
    Alert.alert('Apakah Anda yakin ingin membatalkan order?', '', [
      {
        text: 'Tidak',
        style: 'cancel',
      },
      {
        text: 'Ya',
        onPress: () => dispatch(cancelOrderAction(data.id, navigation)),
      },
    ]);
  };
  return (
    <SafeAreaView style={styles.pages}>
      <Navbar
        onPress={() => navigation.navigate('HomeDrawer')}
        title="Detail Order"
        type="back"
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={24} />
          {data.order_status === 'pending' && (
            <>
              <Button
                onPress={() => navigation.navigate('EditOrder', {id: data.id})}
                text="Edit Order"
                type="edit"
              />
              <Gap height={8} />
              <Button
                onPress={handleCancel}
                text="Batalkan Order"
                type="delete"
              />
              <Gap height={24} />
            </>
          )}
          <View style={styles.rowCenterBetween}>
            {data.details && details && (
              <>
                <View style={{opacity: 0}}>
                  <Badge status={data.order_status} />
                </View>
                <Text style={styles.p2GrayRegular}>{data.created_at}</Text>
                <Badge status={data.order_status} />
              </>
            )}
          </View>
          <Gap height={24} />
          <View style={[styles.rowCenter, styles.avatarContainer]}>
            <Image source={IMGMenuBackground} style={styles.avatar} />
            <Gap width={8} />
            <View>
              <Text style={styles.p2GrayRegular}>Nama Driver</Text>
              <Gap height={4} />
              <Text style={styles.p1Bold}>Ridwan M.</Text>
            </View>
          </View>
          <Gap height={16} />
          <ListDetailOrder
            title="Nama Penerima"
            subtitle={data.receiver_name}
          />
          <Gap height={16} />
          <ListDetailOrder
            title="Nomor Handphone"
            subtitle={data.receiver_phone}
          />
          <Gap height={16} />
          <ListDetailOrder
            title="Alamat Penerima"
            subtitle={data.receiver_address}
          />
          <Gap height={16} />
          <ListDetailOrder
            title="Nama Barang"
            subtitle={details && details[0].product_name}
          />
          <Gap height={16} />
          <ListDetailOrder
            title="Deskripsi Barang"
            subtitle={details && details[0].product_description}
          />
          <Gap height={16} />
          <ListDetailOrder
            title="Harga"
            subtitle={details && details[0].price}
          />
          <Gap height={16} />
          <Text style={styles.p2GrayRegular}>Foto Barang</Text>
          <Gap height={8} />
          <Image
            source={
              details
                ? {uri: details[0].image.url}
                : {
                    uri:
                      'https://d2l12sz4ewcavz.cloudfront.net/assets/boxes/oversized_items/oversized_02-155efcabd68291d16f8fbb2376dea0dd69219898688e934490e21f6cb50eba30.jpg',
                  }
            }
            style={styles.image}
          />
          <Gap height={16} />
          {data.order_status === 'completed' && (
            <>
              <Text style={styles.p2GrayRegular}>Foto Bukti Pengiriman</Text>
              <Gap height={8} />
              <Image
                source={
                  details
                    ? {uri: details[0].image.url}
                    : {
                        uri:
                          'https://d2l12sz4ewcavz.cloudfront.net/assets/boxes/oversized_items/oversized_02-155efcabd68291d16f8fbb2376dea0dd69219898688e934490e21f6cb50eba30.jpg',
                      }
                }
                style={styles.image}
              />
              <Gap height={16} />
            </>
          )}
          <Gap height={24} />
          {data.order_status === 'pending' && (
            <>
              <Button
                text="Lanjutkan"
                onPress={() =>
                  navigation.navigate('CreateOrder2', {
                    request_order_id: data.request_order_id.id,
                    item: data.request_order_id,
                  })
                }
              />
              <Gap height={24} />
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DetailOrder;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.white2,
  },
  image: {
    width: '100%',
    height: 200,
  },
  rowCenterBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  p2GrayRegular: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.gray,
  },
  p3BoldWhite: {
    fontSize: 10,
    fontFamily: fonts.primary[700],
    color: colors.white,
  },
  p1Bold: {
    fontSize: 15,
    fontFamily: fonts.primary[700],
    color: colors.text.black,
  },
  badges: {
    backgroundColor: colors.tersiary,
    width: 72,
    height: 22,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 41,
    height: 41,
    borderRadius: 200,
  },
  avatarContainer: {
    borderBottomWidth: 1,
    paddingBottom: 12,
    borderColor: colors.border.off,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonWhiteText: {
    fontSize: 16,
    fontFamily: fonts.primary[500],
    color: colors.text.white,
  },
});
