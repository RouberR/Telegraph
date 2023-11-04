import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Welcome} from '../screens/Auth/Welcome';
import {SignIn} from '../screens/Auth/SignIn';
import {SignUp} from '../screens/Auth/SignUp';
import {useColors} from '../utils/hooks';
import {StyleSheet} from 'react-native';

export enum AuthRoute {
  Welcome = 'Welcome',
  SignIn = 'SignIn',
  SignUp = 'SignUp',
}

export type AuthStackParamList = {
  [AuthRoute.Welcome]: undefined;
  [AuthRoute.SignIn]: undefined;
  [AuthRoute.SignUp]: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  const {colors} = useColors();
  return (
    <AuthStack.Navigator
      screenOptions={{
        presentation: 'card',
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
        headerTintColor: colors.text,
        headerStyle: {
          backgroundColor: colors.appBackground,
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
          color: colors.text,
        },
      }}>
      <AuthStack.Screen
        name={AuthRoute.Welcome}
        component={Welcome}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={AuthRoute.SignIn}
        component={SignIn}
        options={{title: 'Sign In'}}
      />
      <AuthStack.Screen name={AuthRoute.SignUp} component={SignUp} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
