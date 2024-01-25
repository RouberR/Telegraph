import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  withTiming,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { useColors } from '../utils/hooks';

interface ToggleProps {
  isToggled: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ isToggled }) => {
  const { colors } = useColors();
  const isToggledInternal = useDerivedValue(() => (isToggled ? 1 : 0));

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(isToggledInternal.value * 24, {
            duration: 300,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.toggleSwitch,
          {
            backgroundColor: colors.primary,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.toggleSwitchButton,
            animatedStyle,
            {
              backgroundColor: colors.text,
            },
          ]}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  toggleSwitch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
  },
  toggleSwitchButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
});

export default Toggle;
