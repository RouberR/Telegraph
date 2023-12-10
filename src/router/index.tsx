import React, {useEffect, useRef} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  useNavigationContainerRef,
} from '@react-navigation/native';
import AuthNavigator from './Auth';
import {useAppSelector, useColors} from '../utils/hooks';
import {Colors} from '../utils/theme';
import BottomBar from './BottomBar';
import MainNavigator from './Main';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {setNavigationReference} from '../api';

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
  const user = useAppSelector(state => state.user);
  const {applyColors, colors} = useColors();
  const theme = useAppSelector(state => state.settings.theme);
  const navigationRef = useNavigationContainerRef();
  useEffect(() => {
    applyColors(theme === 'dark' ? Colors.dark : Colors.light);
  }, [theme]);

  useEffect(() => {
    setNavigationReference(navigationRef.current);
  }, []);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.appBackground,
    },
  };
  console.log('123', !!user.id);
  return (
    <NavigationContainer theme={MyTheme} ref={navigationRef}>
      <RootStack.Navigator
        initialRouteName={RootRoutes.Auth}
        screenOptions={{headerShown: false}}>
        {user.id ? (
          <RootStack.Screen component={MainNavigator} name={RootRoutes.Main} />
        ) : (
          <RootStack.Screen component={AuthNavigator} name={RootRoutes.Auth} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
