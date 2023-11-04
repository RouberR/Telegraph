import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AuthNavigator from './Auth';
import {  useAppSelector, useColors } from '../utils/hooks';
import { Colors } from '../utils/theme';

const RootNavigator: React.FC = () => {
  const { applyColors, colors} = useColors();
  const theme = useAppSelector((state) => state.settings.theme);
  

  useEffect(() => {
    applyColors(theme === 'dark' ? Colors.dark : Colors.light);
  }, [ theme]);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.appBackground
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <AuthNavigator />
      {/* <BottomBar /> */}
    </NavigationContainer>
  );
};

export default RootNavigator;
