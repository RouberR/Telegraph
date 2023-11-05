import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens/Main/Home';
import {View} from 'react-native';
import BottomBar from './BottomBar';
import {Chat} from '../screens/Main/Chat';

export type MainStackParamList = {
  Main: undefined;
  Home: undefined;
  Messenger: undefined;
  Contacts: undefined;
  Chat: undefined;
};

export enum MainRoute {
  Main = 'Main',
  Home = 'Home',
  Messenger = 'Messenger',
  Contacts = 'Contacts',
  Chat = 'Chat',
}

const MainStack = createNativeStackNavigator<MainStackParamList>();

const SettingsScreen: React.FC = () => {
  return <View></View>;
};

const MainNavigator: React.FC = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen name={MainRoute.Main} component={BottomBar} />
      <MainStack.Screen name={MainRoute.Chat} component={Chat} />
      {/* <MainStack.Screen name="Profile" component={ProfileScreen} />
      <MainStack.Screen name="Settings" component={SettingsScreen} /> */}
    </MainStack.Navigator>
  );
};

export default MainNavigator;
