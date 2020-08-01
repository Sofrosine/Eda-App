import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ICUploadWhite} from '../../../assets';
import {colors} from '../../../utils';

const UploadButton = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <ICUploadWhite />
    </TouchableOpacity>
  );
};

export default UploadButton;

const styles = StyleSheet.create({
  container: {
    height: 148,
    backgroundColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
