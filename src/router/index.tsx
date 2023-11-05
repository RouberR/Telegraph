import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import AuthNavigator from './Auth';
import {useAppSelector, useColors} from '../utils/hooks';
import {Colors} from '../utils/theme';
import BottomBar from './BottomBar';
import MainNavigator from './Main';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export enum RootRoutes {
  Auth = 'Auth',
  Main = 'Main',
}

export type RootParamList = {
  [RootRoutes.Auth]: undefined;
  [RootRoutes.Main]: undefined;
};

const RootStack = createNativeStackNavigator<RootParamList>();

const RootNavigator: React.FC = () => {
  const {applyColors, colors} = useColors();
  const theme = useAppSelector(state => state.settings.theme);

  useEffect(() => {
    applyColors(theme === 'dark' ? Colors.dark : Colors.light);
  }, [theme]);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.appBackground,
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <RootStack.Navigator
        initialRouteName={RootRoutes.Auth}
        screenOptions={{headerShown: false}}>
        <RootStack.Screen component={AuthNavigator} name={RootRoutes.Auth} />
        <RootStack.Screen component={MainNavigator} name={RootRoutes.Main} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
