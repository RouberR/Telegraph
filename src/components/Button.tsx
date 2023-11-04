import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, Touchable} from '.';
import {useStyles} from '../utils/hooks';
import {TColors} from '../utils/theme/colors';

type IButtonProps = {
  type: 'primary' | 'secondary' | 'error';
  onPress: () => void;
  value: string;
  disabled: boolean;
};

export const Button: React.FC<IButtonProps> = ({
  type = 'primary',
  onPress,
  value = '',
  disabled = false,
}) => {
  const {colors, styles} = useStyles(createStyles);

  const buttonStyle = disabled ? styles.disabled : styles[type];

  return (
    <Touchable
      style={[StyleSheet.compose(buttonStyle, styles.button)]}
      onPress={onPress}
      disabled={disabled}>
      <Text
        fontWeight="600"
        fontSize={16}
        color={type === 'secondary' ? colors.textSecondary : colors.white}>
        {value}
      </Text>
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
