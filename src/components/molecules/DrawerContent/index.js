import {DrawerContentScrollView} from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  ICContactWhite,
  ICHomeWhite,
  ICInvoiceWhite,
  ICLogoutWhite,
  ICProfileWhite,
} from '../../../assets';
import {colors, fonts, getData} from '../../../utils';
import {Gap} from '../../atoms';
import TabDrawer from '../TabDrawer';

const DrawerContent = (props) => {
  const [isLoading, setLoading] = useState(true);
  const routeActiveIndex = props.state.index;
  const routeActiveName = props.state.routeNames[routeActiveIndex];
  const listIcon = [
    ICHomeWhite,
    ICProfileWhite,
    ICContactWhite,
    ICInvoiceWhite,
  ];
  const [user, setUser] = useState({});
  const handleGetUser = async () => {
    const getUser = await getData('@user_data');
    console.log('gett', getUser);
    await setUser(getUser);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  useEffect(() => {
    handleGetUser();
  }, []);
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{margin: 0, flex: 1, backgroundColor: '#4557B2'}}>
      <LinearGradient colors={['#4557B2', '#1E2F89']} style={{flex: 1}}>
        <Gap height={35} />
        <View style={styles.rowH16}>
          {isLoading ? (
            <ActivityIndicator size={32} color={colors.white} />
          ) : (
            <>
              <TouchableOpacity style={styles.profilePhoto}>
                <Image
                  height={58}
                  width={58}
                  source={{
                    uri:
                      user.merchant && user.merchant.avatar
                        ? user.merchant.avatar.url
                        : 'https://i.pinimg.com/236x/fc/7e/ce/fc7ece8e8ee1f5db97577a4622f33975--photo-icon-sad.jpg',
                  }}
                  style={styles.profilePhoto}
                />
              </TouchableOpacity>
              <Gap width={16} />
              <View>
                <Text style={styles.h6White}>
                  {user.merchant && user.merchant.merchant_name}
                </Text>
                <Gap height={8} />
                <Text style={styles.p2White}>
                  {user.merchant && user.merchant.merchant_phone}
                </Text>
                <Text style={styles.p2White}>
                  {user.merchant &&
                    user.merchant.category &&
                    user.merchant.category.name}
                </Text>
              </View>
            </>
          )}
        </View>
        <Gap height={78} />

        {props.state.routes.map((route, index) => {
          return (
            <TabDrawer
              icon={listIcon[index]}
              key={route.name}
              text={route.name}
              isActive={routeActiveName === route.name}
              routeName={route.name}
            />
          );
        })}
        <View style={styles.logout}>
          <TabDrawer logout icon={ICLogoutWhite} text="Logout" />
        </View>
      </LinearGradient>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  rowH16: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  profilePhoto: {
    height: 58,
    width: 58,
    backgroundColor: colors.white,
    borderRadius: 200,
  },
  p1WhiteBold: {
    fontSize: 15,
    fontFamily: fonts.primary[500],
    color: colors.white,
  },
  h6White: {
    fontSize: 18,
    fontFamily: fonts.primary[500],
    color: colors.white,
  },
  p2White: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.white,
  },
  logout: {
    bottom: 0,
    position: 'absolute',
  },
});
