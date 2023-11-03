import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Welcome } from '../screens/Auth/Welcome';
import { SignIn } from '../screens/Auth/SignIn';
import { SignUp } from '../screens/Auth/SignUp';



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
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
     <AuthStack.Screen  name={AuthRoute.Welcome} component={Welcome} />
     <AuthStack.Screen  name={AuthRoute.SignIn} component={SignIn} />
     <AuthStack.Screen  name={AuthRoute.SignUp} component={SignUp} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
