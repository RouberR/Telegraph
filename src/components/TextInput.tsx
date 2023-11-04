import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TextInputProps} from 'react-native';
import {useStyles} from '../utils/hooks';
import {TColors} from '../utils/theme/colors';
import Text from './Text';
import {Touchable} from '.';

interface ITextInput extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isSecurity?: boolean;
  autoFocus?: boolean;
}

const _TextInput: React.FC<ITextInput> = ({
  placeholder,
  value,
  onChangeText,
  isSecurity,
  autoFocus,
  ...props
}) => {
  const {colors, styles} = useStyles(createStyles);
  const [isFocused, setFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(isSecurity);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View
      style={[
        styles.inputContainer,
        {
          borderColor: isFocused ? colors.inputActive : colors.input,
        },
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
        {...props}
      />
      {isSecurity && isFocused && (
        <Touchable style={styles.toggleButton} onPress={toggleSecureTextEntry}>
          <Text>{secureTextEntry ? 'Show' : 'Hide'}</Text>
        </Touchable>
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
  });

export default _TextInput;
