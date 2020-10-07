import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Navbar, Avatar, Gap} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {getProfileAction} from '../../redux/actions';
import {colors, fonts} from '../../utils';
import {useNavigation} from '@react-navigation/native';

const Info = ({label, text, route}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.p1Secondary}>{label}</Text>
      <Gap height={8} />
      <Text style={styles.p1Black}>{text}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate(route)}
        style={styles.editInfoContainer}>
        <Text style={styles.p1Primary}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

const Profile = ({navigation}) => {
  const {profileReducer} = useSelector((state) => state);
  const {merchant} = profileReducer.data;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileAction());
    console.log('ini merchant', profileReducer);
  }, []);
  return (
    <View style={styles.pages}>
      <Navbar title="Profile" />
      <ScrollView contentContainerStyle={styles.content}>
        {profileReducer.loading ? (
          <ActivityIndicator size={32} color={colors.primary} />
        ) : (
          <>
            <View style={styles.alignSelfCenter}>
              <Avatar />
            </View>
            <Gap height={24} />
            <Info
              label="Nama"
              text={(merchant && merchant.merchant_name) || '-'}
              route="EditName"
            />
            <Gap height={24} />
            <Info
              label="Nomor Handphone"
              text={(merchant && merchant.merchant_phone) || '-'}
            />
            <Gap height={24} />
            <Info label="Email" text={profileReducer.data.email || '-'} />
            <Gap height={24} />
            <Info
              label="Alamat"
              text={(merchant && merchant.merchant_address) || '-'}
            />
            <Gap height={24} />
            <TouchableOpacity
              onPress={() => navigation.navigate('UpdatePassword')}
              style={[styles.rowCenter]}>
              <Text style={styles.p1Secondary}>- </Text>
              <Text style={styles.p1Secondary}>Update Password ?</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  rowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  infoContainer: {
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingRight: 24,
  },
  p1Secondary: {
    fontSize: 14,
    color: colors.secondary,
    fontFamily: fonts.primary['600'],
  },
  p1Black: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.primary['500'],
  },
  p1Primary: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: fonts.primary['500'],
  },
  editInfoContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
});
