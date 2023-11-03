import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const MainStack = createNativeStackNavigator<MainStackParamList>();

const HomeScreen: React.FC = () => {
  return (
   <></>
  );
};

const ProfileScreen: React.FC = () => {
  return (
    <></>
  );
};

const SettingsScreen: React.FC = () => {
  return (
    <></>
  );
};

const MainNavigator: React.FC = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Profile" component={ProfileScreen} />
      <MainStack.Screen name="Settings" component={SettingsScreen} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
