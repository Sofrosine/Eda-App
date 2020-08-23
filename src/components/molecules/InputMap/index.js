import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {ICLocationOrange} from '../../../assets';
import {colors, fonts} from '../../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {selectAutoCompleteAction} from '../../../redux/actions';

const InputMap = ({
  label,
  required,
  password,
  placeholder,
  errorText = '',
  error,
  theme,
  onChangeText,
  onPress,
  data = [],
  value,
}) => {
  const dispatch = useDispatch();
  const {showPrediction} = useSelector((state) => state.autoCompleteReducer);
  return (
    <View>
      <View style={styles.flexBetween}>
        <Text
          style={theme === 'light' ? styles.p2BlackPrimary : styles.p2Primary}>
          {label} {required ? '*' : null}
        </Text>
        {errorText.length > 0 && (
          <Text
            numberOfLines={1}
            lineBreakMode="tail"
            style={[[styles.p2RedPrimary]]}>
            {errorText}
          </Text>
        )}
      </View>
      {/* <Gap height={4} /> */}
      <View>
        <TextInput
          selectTextOnFocus
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.placeholder}
          secureTextEntry={password}
          style={styles.inputMap(error, theme)}
        />
        <ICLocationOrange style={styles.iconMap} />
      </View>
      {showPrediction && (
        <View style={styles.suggestionContainer}>
          {data.map((item) => {
            return (
              <TouchableOpacity
                onPress={() => dispatch(selectAutoCompleteAction(item, data))}
                key={item.place_id}
                style={styles.suggestBtn}>
                <Text style={styles.p1Black}>{item.description}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default InputMap;

const styles = StyleSheet.create({
  p2Primary: {
    fontFamily: fonts.primary[500],
    fontSize: 11,
    color: colors.secondary,
    lineHeight: 16,
  },
  p2BlackPrimary: {
    fontFamily: fonts.primary[500],
    fontSize: 11,
    color: colors.black,
    lineHeight: 16,
  },
  p2RedPrimary: {
    fontFamily: fonts.primary[500],
    fontSize: 11,
    color: colors.text.red,
    lineHeight: 16,
  },
  p2ItalicPrimary: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    color: colors.secondary,
    lineHeight: 16,
    fontStyle: 'italic',
  },
  inputMap: (error, theme) => ({
    borderBottomWidth: 3,
    borderColor: error ? colors.border.error : colors.secondary,
    padding: 4,
    paddingRight: 24,
    paddingBottom: 12,
    fontFamily: fonts.primary[400],
    fontSize: 14,
    color: theme === 'light' ? colors.black : colors.white,
  }),
  iconMap: {
    position: 'absolute',
    right: 8,
    bottom: 22,
  },
  phoneArea: {
    position: 'absolute',
    top: 27,
  },
  p1White: {
    fontFamily: fonts.primary[400],
    fontSize: 14,
    color: colors.white,
  },
  p1Black: {
    fontFamily: fonts.primary[300],
    fontSize: 14,
    color: colors.black,
  },
  description: {
    right: 0,
    position: 'absolute',
    bottom: -20,
  },
  flexBetween: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  suggestionContainer: {
    backgroundColor: colors.white,
    width: '100%',
    padding: 2,
  },
  suggestBtn: {
    padding: 4,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: colors.border.off,
  },
});
