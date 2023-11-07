import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens/Main/Home';
import {View} from 'react-native';
import BottomBar from './BottomBar';
import {Chat} from '../screens/Main/Chat';
import {Settings} from '../screens/Settings';
import {useColors} from '../utils/hooks';
import {Account} from '../screens/Settings/Account';
import {Privacy} from '../screens/Settings/Privacy';
import {Help} from '../screens/Settings/Help';

export type MainStackParamList = {
  Main: undefined;
  Home: undefined;
  Messenger: undefined;
  Contacts: undefined;
  Chat: undefined;
  Settings: undefined;
  Account: undefined;
  Privacy: undefined;
  Help: undefined;
};

export enum MainRoute {
  Main = 'Main',
  Home = 'Home',
  Messenger = 'Messenger',
  Contacts = 'Contacts',
  Chat = 'Chat',
  Settings = 'Settings',
  Account = 'Account',
  Privacy = 'Privacy',
  Help = 'Help',
}

const MainStack = createNativeStackNavigator<MainStackParamList>();

const SettingsScreen: React.FC = () => {
  return <View></View>;
};

const MainNavigator: React.FC = () => {
  const {colors} = useColors();
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}>
      <MainStack.Screen name={MainRoute.Main} component={BottomBar} />
      <MainStack.Screen name={MainRoute.Chat} component={Chat} />
      {/* <MainStack.Screen name="Profile" component={ProfileScreen} />
      <MainStack.Screen name="Settings" component={SettingsScreen} /> */}
      <MainStack.Group
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.appBackground,
          },
          headerTintColor: colors.text,
        }}>
        <MainStack.Screen
          name={MainRoute.Settings}
          component={Settings}
          options={{headerTitle: 'Settings'}}
        />
        <MainStack.Screen
          name={MainRoute.Account}
          component={Account}
          options={{headerTitle: 'Account'}}
        />
        <MainStack.Screen
          name={MainRoute.Privacy}
          component={Privacy}
          options={{headerTitle: 'Privacy'}}
        />
        <MainStack.Screen
          name={MainRoute.Help}
          component={Help}
          options={{headerTitle: 'Help'}}
        />
      </MainStack.Group>
    </MainStack.Navigator>
  );
};

export default MainNavigator;
