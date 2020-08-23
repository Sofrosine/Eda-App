import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {ICEda} from '../../assets';
import {colors, getData} from '../../utils';

const Splash = ({navigation}) => {
  const handleNavigation = async () => {
    const getToken = await getData('@user_token');
    setTimeout(() => {
      if (getToken) {
        navigation.replace('HomeDrawer');
      } else {
        navigation.replace('Auth');
      }
    }, 2000);
  };

  useEffect(() => {
    handleNavigation();
  }, []);
  return (
    <View style={styles.pages}>
      <StatusBar backgroundColor={colors.primary} />
      <ICEda width={174} height={174} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
