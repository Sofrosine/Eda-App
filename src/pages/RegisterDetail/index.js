import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
import {ICEda, ICMapMarker} from '../../assets';
import {Button, Gap, Input, UploadButton} from '../../components';
import {colors, fonts} from '../../utils';

const RegisterDetail = () => {
  return (
    <SafeAreaView style={styles.pages}>
      <StatusBar backgroundColor={colors.primary} />
      <View style={styles.content}>
        <ScrollView contentContainerStyle={{paddingHorizontal: 55}}>
          <Gap height={34} />
          <ICEda style={styles.icon} height={80} width={80} />
          <Gap height={19} />
          <Input label="Nama Toko" required />
          <Gap height={18} />
          <Input label="Telepon" required />
          <Gap height={18} />
          <Input label="Alamat" required />
          <Gap height={18} />
          <View>
            <MapView
              style={{height: 137}}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
            <ICMapMarker style={styles.marker} />
          </View>
          <Gap height={18} />
          <Input label="Jenis Toko" required />
          <Gap height={18} />
          <Text style={styles.p1Primary}>Logo Toko</Text>
          <Gap height={8} />
          <UploadButton />
          <Gap height={40} />
          <Button text="Daftar" position="center" />
          <Gap height={34} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default RegisterDetail;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
  },
  icon: {
    alignSelf: 'center',
  },
  marker: {
    position: 'absolute',
    zIndex: 9999,
    alignSelf: 'center',
    top: '42%',
  },
  p1Primary: {
    fontFamily: fonts.primary[700],
    fontSize: 14,
    color: colors.secondary,
  },
});
