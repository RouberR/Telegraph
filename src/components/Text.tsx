import React, {memo} from 'react';
import {ColorValue, StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import {useColors} from '../utils/hooks';

interface ITextProps extends TextProps {
  letterSpacing?: 0 | 0.2 | 0.4 | 0.5;
  opacity?: number;
  color?: ColorValue;
  fontSize?: number;
  lineHeight?: number;
  flexShrink?: 0 | 1;
  textAlign?: TextStyle['textAlign'];
  fontWeight?: TextStyle['fontWeight'];
  textDecorationLine?: TextStyle['textDecorationLine'];
}

const _Text: React.FC<ITextProps> = memo(
  ({
    children,
    fontWeight = '400',
    opacity = 1,
    color,
    fontSize = 16,
    style = {},
    numberOfLines,
    lineHeight = fontSize * 1.25,
    selectable = false,
    onPress,
    textAlign = 'left',
    flexShrink = 1,
    letterSpacing = 0.2,
    textDecorationLine,
    ...props
  }) => {
    const {colors} = useColors();
    return (
      <Text
        numberOfLines={numberOfLines}
        selectable={selectable}
        style={StyleSheet.compose(
          {
            fontWeight,
            opacity,
            fontSize,
            color: color ? color : colors.text,
            lineHeight,
            textAlign,
            flexShrink,
            letterSpacing,
            textDecorationLine,
          },
          style,
        )}
        onPress={onPress}
        {...props}>
        {children}
      </Text>
    );
  },
);

export default React.memo(_Text);
