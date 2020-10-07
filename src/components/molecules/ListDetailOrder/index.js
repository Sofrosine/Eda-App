import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Gap} from '../../atoms';
import {IMGBarang2, IMGMenuBackground} from '../../../assets';

const ListDetailOrder = ({title, subtitle, type}) => {
  if (type === 'avatar') {
    return (
      <View style={[styles.container, styles.rowCenter]}>
        <Image style={styles.avatar} source={IMGMenuBackground} />
        <Gap width={8} />
        <View style={[styles.justifyBetween]}>
          <Text style={styles.title}>{title}</Text>
          <Gap height={4} />
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Gap height={4} />
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default ListDetailOrder;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border.off,
    paddingBottom: 8,
  },
  avatar: {
    borderRadius: 200,
    height: 41,
    width: 41,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.gray,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: fonts.primary[600],
    color: colors.text.black,
  },
});
