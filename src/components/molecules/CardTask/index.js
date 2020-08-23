import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {ICDate, ICLocation, ICPhone, IMGBarang1} from '../../../assets';
import {colors, fonts} from '../../../utils';
import {Badge, Gap} from '../../atoms';

const CardTask = ({type, name, phone, location, date, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.bottomRight]}>
        <Badge status={type} />
      </View>
      <Image
        height={72}
        width={75}
        style={styles.image}
        source={{
          uri:
            'https://d2l12sz4ewcavz.cloudfront.net/assets/boxes/oversized_items/oversized_02-155efcabd68291d16f8fbb2376dea0dd69219898688e934490e21f6cb50eba30.jpg',
        }}
      />
      <Gap width={8} />
      <View style={styles.dataWrapper}>
        <Text style={styles.h6Normal}>{name}</Text>
        <Gap height={8} />
        <View style={styles.rowAlignCenter}>
          <ICPhone height={12} width={12} />
          <Gap width={6} />
          <Text style={styles.p2Normal}>{phone}</Text>
        </View>
        <Gap height={8} />
        <View style={[styles.rowAlignCenter]}>
          <ICLocation height={12} width={12} />
          <Gap width={6} />
          <Text numberOfLines={1} style={[styles.p2Normal, {maxWidth: '70%'}]}>
            {location}
          </Text>
        </View>
        <Gap height={8} />
        <View style={styles.rowAlignCenter}>
          <ICDate height={12} width={12} />
          <Gap width={6} />
          <Text style={styles.p2Normal}>{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardTask;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
    elevation: 3,
    backgroundColor: colors.white,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 5,
    height: 133,
  },
  dataWrapper: {alignSelf: 'flex-start', marginTop: 5},
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 80,
    width: 83,
    marginTop: 4,
  },
  h6Normal: {
    fontSize: 18,
    color: colors.text.black,
    fontFamily: fonts.primary[600],
    lineHeight: 25,
  },
  p2Normal: {
    fontSize: 12,
    color: colors.text.gray,
    fontFamily: fonts.primary[400],
    lineHeight: 16,
  },
  type: (type) => ({
    backgroundColor:
      type === 'pick-up' ? colors.taskType.pickUp : colors.taskType.delivered,
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    height: 22,
    borderRadius: 5,
  }),
  p3Gray: {
    fontSize: 10,
    color: colors.text.black,
    fontFamily: fonts.primary[500],
    fontStyle: 'italic',
    lineHeight: 10,
  },
  p3Yellow: {
    fontSize: 10,
    color: colors.text.secondary,
    fontFamily: fonts.primary[500],
    fontStyle: 'italic',
    lineHeight: 10,
  },
  p3White: {
    fontSize: 10,
    color: colors.text.white,
    fontFamily: fonts.primary[500],
  },
  p3Green: {
    fontSize: 10,
    color: colors.text.tersiary,
    fontFamily: fonts.primary[500],
    fontStyle: 'italic',
    lineHeight: 10,
  },
  topRight: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  bottomRight: {
    position: 'absolute',
    bottom: 22,
    right: -8,
  },
});
