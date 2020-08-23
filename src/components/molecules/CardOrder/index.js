import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  ICCheckCircularOrange,
  ICDate,
  ICEditOrange,
  ICLocation,
  ICPhone,
  IMGBarang2,
} from '../../../assets';
import {colors, fonts} from '../../../utils';
import {Gap} from '../../atoms';

const CardOrder = ({image, name, number, location, date}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.rowCenter, styles.topContainer]}>
        <Image
          height={75}
          width={75}
          source={{
            uri: image,
          }}
          style={styles.image}
        />
        <Gap width={16} />
        <View>
          <Text style={styles.buttonMedium}>{name}</Text>
          <Gap height={4} />
          <View style={styles.rowCenter}>
            <ICPhone />
            <Gap width={4} />
            <Text style={styles.p2Regular}>{number}</Text>
          </View>
          <Gap height={4} />
          <View style={[styles.rowCenter]}>
            <ICLocation />
            <Gap width={4} />
            <Text style={[styles.p2Regular, {maxWidth: '80%'}]} numberOfLines={1}>{location}</Text>
          </View>
          <Gap height={4} />
          <View style={styles.rowCenter}>
            <ICDate />
            <Gap width={4} />
            <Text style={styles.p2Regular}>{date}</Text>
          </View>
          <Gap height={4} />
        </View>
      </View>
      {/* <View style={styles.bottomContainer}>
        <TouchableOpacity style={[styles.rowCenter, styles.btnContainer]}>
          <ICEditOrange />
          <Gap width={8} />
          <Text style={styles.p2Regular}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.rowCenter, styles.btnContainer]}>
          <ICCheckCircularOrange />
          <Gap width={8} />
          <Text style={styles.p2Regular}>Batalkan Order</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default CardOrder;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white2,
    borderRadius: 4,
    elevation: 4,
    paddingVertical: 4,
  },
  topContainer: {
    padding: 8,
    paddingTop: 12,
    // borderBottomWidth: 1,
    borderColor: colors.border.off,
  },
  bottomContainer: {
    flexDirection: 'row',
  },
  btnContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  image: {
    height: 75,
    width: 75,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonMedium: {
    fontSize: 15,
    color: colors.black,
    fontFamily: fonts.primary[600],
  },
  p2Regular: {
    fontSize: 12,
    color: colors.text.gray,
    fontFamily: fonts.primary[400],
  },
});
