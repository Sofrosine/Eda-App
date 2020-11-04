import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {ICLocationOrange} from '../../../assets';
import {
  changeVersaStatusAction,
  setAutoCompleteAction,
  setLocationMoveAction,
} from '../../../redux/actions';
import {colors} from '../../../utils';
import {Gap} from '../../atoms';
import InputMap from '../InputMap';

const InputMapComplete = ({label, placeholder, theme}) => {
  const dispatch = useDispatch();
  const {autoCompleteReducer, getLocationReducer} = useSelector(
    (state) => state,
  );
  const {data, selectedData} = autoCompleteReducer;

  const handleChangeRegion = (region) => {
    if (
      region.latitude.toFixed(4) === getLocationReducer.latitude.toFixed(4) &&
      region.longitude.toFixed(4) === getLocationReducer.longitude.toFixed(4)
    ) {
      return;
    }
    dispatch(setLocationMoveAction(region.latitude, region.longitude));
    console.log(getLocationReducer.latitude.toFixed(4));
    console.log(region.latitude.toFixed(4));
    console.log(getLocationReducer.longitude.toFixed(4));
    console.log(region.longitude.toFixed(4));
  };

  return (
    <>
      <InputMap
        value={selectedData}
        data={data}
        onChangeText={(val) => {
          dispatch(
            setAutoCompleteAction(
              getLocationReducer.latitude,
              getLocationReducer.longitude,
              val,
            ),
          );
        }}
        label={label}
        required
        placeholder={placeholder}
        theme={theme}
      />
      <Gap height={24} />
      <View>
        {getLocationReducer.loading ? (
          <ActivityIndicator size={36} color={colors.secondary} />
        ) : (
          <View>
            <MapView
              style={{height: 137}}
              initialRegion={{
                latitude: getLocationReducer.latitude,
                longitude: getLocationReducer.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              onRegionChangeComplete={(region) => {
                handleChangeRegion(region);
              }}>
              {/* <Marker
                coordinate={{
                  latitude: getLocationReducer.latitude,
                  longitude: getLocationReducer.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
                icon={ICLocationOrange}
              /> */}
            </MapView>
            <View style={styles.iconMap}>
              <ICLocationOrange height={32} width={32} />
              {/* {detail && (
                <TouchableOpacity
                  onPress={() => setDetail(false)}
                  style={styles.changePinpoint}>
                  <Text style={fonts.p2PoppinsGrayRegular}>Ubah Pinpoint</Text>
                </TouchableOpacity>
              )} */}
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export default InputMapComplete;

const styles = StyleSheet.create({
  iconMap: {
    position: 'absolute',
    left: '45%',
    top: '33%',
  },
});
