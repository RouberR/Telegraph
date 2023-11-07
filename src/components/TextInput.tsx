import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {useStyles} from '../utils/hooks';
import {TColors} from '../utils/theme/colors';
import Text from './Text';
import {Touchable} from '.';
import Animated, {FadeInDown, FadeOut} from 'react-native-reanimated';

interface ITextInput extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isSecurity?: boolean;
  autoFocus?: boolean;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const _TextInput: React.FC<ITextInput> = ({
  placeholder,
  value,
  onChangeText,
  isSecurity,
  autoFocus,
  error,
  errorMessage,
  disabled,
  containerStyle,
  ...props
}) => {
  const {colors, styles} = useStyles(createStyles);
  const [isFocused, setFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(isSecurity);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View>
      <Animated.Text
        entering={FadeInDown}
        exiting={FadeOut}
        style={[
          styles.label,
          {
            color: isFocused
              ? colors.inputActive
              : error
              ? colors.red
              : colors.input,
          },
        ]}>
        {value && placeholder}
      </Animated.Text>

      <View
        style={[
          styles.inputContainer,
          {
            borderColor: isFocused
              ? colors.inputActive
              : error
              ? colors.red
              : colors.input,
          },
          containerStyle,
        ]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={isFocused ? colors.inputActive : colors.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          secureTextEntry={secureTextEntry}
          autoFocus={autoFocus}
          editable={disabled}
          {...props}
        />
        {isSecurity && isFocused && (
          <Touchable
            style={styles.toggleButton}
            onPress={toggleSecureTextEntry}>
            <Text>{secureTextEntry ? 'Show' : 'Hide'}</Text>
          </Touchable>
        )}
      </View>
      {error && (
        <Text style={styles.errorText} fontSize={14}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.input,
      borderRadius: 10,
      height: 56,
    },
    input: {
      flex: 1,
      color: colors.text,
      paddingHorizontal: 10,
    },
    toggleButton: {
      marginRight: 8,
    },
    errorText: {
      color: colors.red,
      padding: 10,
    },
    label: {
      bottom: -8,
      left: 8,
      backgroundColor: colors.appBackground,
      alignSelf: 'flex-start',
      zIndex: 2,
      fontSize: 12,
    },
  });

export default _TextInput;
