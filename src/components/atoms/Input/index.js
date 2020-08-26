import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {ICLocationOrange} from '../../../assets';
import {colors, fonts} from '../../../utils';
import Gap from '../Gap';

const Input = ({
  label,
  required,
  password,
  description,
  placeholder,
  errorText = '',
  error,
  type,
  theme,
  onChangeText,
  onFocus,
  value,
  onBlur,
  defaultValue,
}) => {
  if (type === 'map') {
    return (
      <View>
        <View style={styles.flexBetween}>
          <Text
            style={
              theme === 'light' ? styles.p2BlackPrimary : styles.p2Primary
            }>
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
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.text.placeholder}
            secureTextEntry={password}
            style={styles.inputMap(error, theme)}
          />
          <ICLocationOrange style={styles.iconMap} />
        </View>
        <Text style={[styles.p2ItalicPrimary, styles.description]}>
          {description}
        </Text>
      </View>
    );
  }
  if (type === 'phone') {
    return (
      <View>
        <View style={styles.flexBetween}>
          <Text
            style={
              theme === 'light' ? styles.p2BlackPrimary : styles.p2Primary
            }>
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
        <Text
          style={[
            theme === 'light' ? styles.p1Black : styles.p1White,
            styles.phoneArea,
          ]}>
          +62
        </Text>
        <TextInput
          value={value}
          keyboardType="number-pad"
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.placeholder}
          secureTextEntry={password}
          style={styles.inputPhone(errorText, theme)}
        />
        <Text style={[styles.p2ItalicPrimary, styles.description]}>
          {description}
        </Text>
      </View>
    );
  }
  if (type === 'weight') {
    return (
      <View>
        <View style={styles.flexBetween}>
          <Text
            style={
              theme === 'light' ? styles.p2BlackPrimary : styles.p2Primary
            }>
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
        <Text
          style={[
            theme === 'light' ? styles.p1Black : styles.p1White,
            styles.phoneArea,
          ]}>
          gram
        </Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.placeholder}
          secureTextEntry={password}
          style={styles.inputWeight(errorText, theme)}
          keyboardType="number-pad"
        />
        <Text style={[styles.p2ItalicPrimary, styles.description]}>
          {description}
        </Text>
      </View>
    );
  }
  if (type === 'meter') {
    return (
      <View>
        <View style={styles.flexBetween}>
          <Text
            style={
              theme === 'light' ? styles.p2BlackPrimary : styles.p2Primary
            }>
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
        <Text
          style={[
            theme === 'light' ? styles.p1Black : styles.p1White,
            styles.phoneArea,
          ]}>
          cm
        </Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.placeholder}
          secureTextEntry={password}
          style={styles.inputPhone(errorText, theme)}
          keyboardType="number-pad"
        />
        <Text style={[styles.p2ItalicPrimary, styles.description]}>
          {description}
        </Text>
      </View>
    );
  }

  if (type === 'description') {
    return (
      <View>
        <View style={styles.flexBetween}>
          <Text
            style={
              theme === 'light' ? styles.p2BlackPrimary : styles.p2Primary
            }>
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
        <Gap height={4} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          numberOfLines={6}
          textAlignVertical="top"
          multiline
          placeholder={placeholder}
          placeholderTextColor={colors.text.placeholder}
          secureTextEntry={password}
          style={styles.inputDescription(errorText, theme)}
        />
        <Text style={[styles.p2ItalicPrimary, styles.description]}>
          {description}
        </Text>
      </View>
    );
  }

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
      <TextInput
        defaultValue={defaultValue}
        onBlur={onBlur}
        value={value}
        onFocus={onFocus}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text.placeholder}
        secureTextEntry={password}
        style={styles.input(errorText, theme)}
      />
      <Text style={[styles.p2ItalicPrimary, styles.description]}>
        {description}
      </Text>
    </View>
  );
};

export default Input;

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
  input: (errorText, theme) => ({
    borderBottomWidth: 3,
    borderColor: errorText.length > 0 ? colors.border.error : colors.secondary,
    padding: 4,
    paddingBottom: 12,
    fontFamily: fonts.primary[400],
    fontSize: 14,
    color: theme === 'light' ? colors.black : colors.white,
  }),
  inputDescription: (errorText, theme) => ({
    borderBottomWidth: 3,
    borderColor: errorText.length > 0 ? colors.border.error : colors.secondary,
    padding: 4,
    paddingBottom: 12,
    fontFamily: fonts.primary[400],
    fontSize: 14,
    color: theme === 'light' ? colors.black : colors.white,
    height: 100,
  }),
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
  inputPhone: (errorText, theme) => ({
    borderBottomWidth: 3,
    borderColor: errorText.length > 0 ? colors.border.error : colors.secondary,
    padding: 4,
    paddingLeft: 32,
    paddingBottom: 12,
    fontFamily: fonts.primary[400],
    fontSize: 14,
    color: theme === 'light' ? colors.black : colors.white,
  }),
  inputWeight: (errorText, theme) => ({
    borderBottomWidth: 3,
    borderColor: errorText.length > 0 ? colors.border.error : colors.secondary,
    padding: 4,
    paddingLeft: 42,
    paddingBottom: 12,
    fontFamily: fonts.primary[400],
    fontSize: 14,
    color: theme === 'light' ? colors.black : colors.white,
  }),
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
    fontFamily: fonts.primary[400],
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
});
