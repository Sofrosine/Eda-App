import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  ICCopy,
  ICBNI,
  ICMandiri,
  ICCheckCircularOrange,
  ICUnChecked,
} from '../../../assets';
import {Gap} from '../../atoms';
import {fonts, colors} from '../../../utils';
import Clipboard from '@react-native-community/clipboard';

const BankList = ({
  type,
  bankName,
  bankAccountName,
  bankAccountNumber,
  isSelected,
  onPress,
}) => {
  if (type === 'Mandiri') {
    return (
      <View style={styles.container}>
        <View style={styles.rowCenter}>
          <ICMandiri />
          <Gap width={14} />
          <View>
            <Text style={[styles.p2Regular]}>Bank Mandiri 37849440</Text>
            <Text style={[styles.p2Regular]}>A/N Ridwan</Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.rowCenter, styles.copyContainer]}>
          <ICCopy />
          <Gap width={4} />
          <Text style={styles.p3Regular}>Copy</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.rowCenter}>
        <TouchableOpacity onPress={onPress}>
          {isSelected ? <ICCheckCircularOrange /> : <ICUnChecked />}
        </TouchableOpacity>
        <Gap width={16} />
        <View>
          <Text style={[styles.p2Regular]}>{bankName}</Text>
          <Text style={[styles.p2Regular]}>{bankAccountNumber}</Text>
          <Text style={[styles.p2Regular]}>A/N {bankAccountName}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => Clipboard.setString(bankAccountNumber)}
        style={[styles.rowCenter, styles.copyContainer]}>
        <ICCopy />
        <Gap width={4} />
        <Text style={styles.p3Regular}>Copy</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BankList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 24,
    borderColor: colors.border.off,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  p2Regular: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.black2,
  },
  p3Regular: {
    fontSize: 10,
    fontFamily: fonts.primary[400],
    color: colors.black,
  },
  copyContainer: {
    backgroundColor: '#e5e5e5',
    width: 62,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
