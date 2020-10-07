import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {ICUploadWhite} from '../../../assets';
import {uploadImageAction} from '../../../redux/actions';
import {colors} from '../../../utils';

const UploadButton = ({type = 'avatar'}) => {
  const dispatch = useDispatch();
  const [yo, setYo] = useState('');
  const {uploadImageReducer} = useSelector((state) => state);
  const {data} = uploadImageReducer;
  const formData = new FormData();
  const handleUpload = async () => {
    ImagePicker.openPicker({
      cropping: true,
      cropperCircleOverlay: type === 'avatar' ? true : false,
    })
      .then(async (res) => {
        console.log('ress', res);
        await formData.append('image', {
          uri: res.path,
          type: res.mime,
          name: `${new Date().getTime().toString()}.jpg`,
        });
        await formData.append('section', type);
        setYo(res.path);
        dispatch(uploadImageAction(formData));
        // Axios.post('http://178.128.212.200/api/merchant/image/upload', formData)
        //   .then((result) => console.log('results', res))
        //   .catch((e) => console.log('error image', e));
      })
      .catch((err) => console.log('error', err));
  };
  return (
    <>
      <TouchableOpacity onPress={handleUpload} style={styles.container}>
        {!data.url && <ICUploadWhite height={20} width={23} />}
        {data.url && <Image source={{uri: data.url}} style={styles.image} />}
      </TouchableOpacity>
    </>
  );
};

export default UploadButton;

const styles = StyleSheet.create({
  container: {
    height: 103,
    borderRadius: 4,
    backgroundColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 103,
    borderRadius: 4,
  },
});
