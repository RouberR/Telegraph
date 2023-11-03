import React, { memo } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

const _Touchable: React.FC<TouchableOpacityProps> = memo(
  ({ children, ...props }) => {
    return (
      <TouchableOpacity
        accessible={false}
        activeOpacity={0.75}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  },
);

export default _Touchable;
