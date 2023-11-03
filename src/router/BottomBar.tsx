import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainNavigator from './Main';

type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const MainTab = createBottomTabNavigator<MainTabParamList>();

const BottomBar: React.FC = () => {
  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Home" component={MainNavigator} />
      <MainTab.Screen name="Profile" component={MainNavigator} />
      <MainTab.Screen name="Settings" component={MainNavigator} />
    </MainTab.Navigator>
  );
};

export default BottomBar;
