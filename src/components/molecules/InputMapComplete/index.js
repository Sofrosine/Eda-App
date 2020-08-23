import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {ICLocationOrange} from '../../../assets';
import {setAutoCompleteAction} from '../../../redux/actions';
import {colors} from '../../../utils';
import {Gap} from '../../atoms';
import InputMap from '../InputMap';

const InputMapComplete = ({label, placeholder, theme}) => {
  const dispatch = useDispatch();
  const {autoCompleteReducer, getLocationReducer} = useSelector(
    (state) => state,
  );
  const {data, selectedData} = autoCompleteReducer;

  return (
    <>
      <InputMap
        value={selectedData}
        data={data}
        onChangeText={(val) =>
          dispatch(
            setAutoCompleteAction(
              getLocationReducer.latitude,
              getLocationReducer.longitude,
              val,
            ),
          )
        }
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
          <>
            <MapView
              style={{height: 137}}
              initialRegion={{
                latitude: getLocationReducer.latitude,
                longitude: getLocationReducer.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}>
              <Marker
                coordinate={{
                  latitude: getLocationReducer.latitude,
                  longitude: getLocationReducer.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
                icon={ICLocationOrange}
              />
            </MapView>
          </>
        )}
      </View>
    </>
  );
};

export default InputMapComplete;
