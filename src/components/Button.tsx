import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Loading, Text, Touchable} from '.';
import {useStyles} from '../utils/hooks';
import {TColors} from '../utils/theme/colors';

type IButtonProps = {
  type?: 'primary' | 'secondary' | 'error';
  onPress: () => void;
  value: string;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
};

export const Button: React.FC<IButtonProps> = ({
  type = 'primary',
  onPress,
  value = '',
  disabled = false,
  containerStyle = {},
  isLoading = false,
}) => {
  const {colors, styles} = useStyles(createStyles);

  const buttonStyle = disabled ? styles.disabled : styles[type];

  return (
    <Touchable
      style={[StyleSheet.compose(buttonStyle, styles.button), containerStyle]}
      onPress={onPress}
      disabled={disabled || isLoading}>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Text
          fontWeight="600"
          fontSize={16}
          color={type === 'secondary' ? colors.textSecondary : colors.white}>
          {value}
        </Text>
      )}
    </Touchable>
  );
};

const createStyles = (colors: TColors) =>
  StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  error: {
    backgroundColor: colors.red,
  },
  button: {
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: colors.grey,
    opacity: 0.7,
  },
});
