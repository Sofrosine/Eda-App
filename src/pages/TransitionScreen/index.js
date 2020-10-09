import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const TransitionScreen = ({navigation}) => {
  useEffect(() => {
    navigation.replace('CreateOrder');
  }, []);
  return <View></View>;
};

export default TransitionScreen;

const styles = StyleSheet.create({});
