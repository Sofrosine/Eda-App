import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Gap} from '../../atoms';

const ListDetailOrder = ({title, subtitle}) => {
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
