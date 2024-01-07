import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import {MainRoute} from './Main';
import {Home} from '../screens/Main/Home';
import {Messenger} from '../screens/Main/Messenger';
import {Contacts} from '../screens/Main/Contacts';
import { contact, home, logo, messenger, settings } from '../assets/bottomBar';
import { useColors } from '../utils/hooks';
import { Touchable } from '../components';
import { RootRoutes } from '.';

type MainTabParamList = {
  Home: undefined;
  Messenger: undefined;
  Contacts: undefined;
};

export enum MainTabRoute {
  HomeTab = 'HomeTab',
  MessengerTab = 'MessengerTab',
  ContactsTab = 'ContactsTab',
}

const Tab = createBottomTabNavigator<MainTabParamList>();

const BottomBar: React.FC = () => {
  const {colors} = useColors();
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: '',
        headerStyle: {
          backgroundColor: colors.appBackground,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          height: 40,
        },
        headerShown: true,
        tabBarStyle: {
          backgroundColor: colors.appBackground,
          borderTopColor: colors.grey,
        },
        tabBarShowLabel: false,
        headerLeft: () => (
          <FastImage
            source={logo}
            style={{width: 120, height: 32, marginLeft: 12}}
            tintColor={colors.primary}
          />
        ),
        headerRight: () => (
          <Touchable onPress={() => navigation.navigate(MainRoute.Settings)}>
            <FastImage
              source={settings}
              style={{width: 24, height: 24, marginRight: 12}}
              tintColor={colors.primary}
            />
          </Touchable>
        ),
      }}>
      <Tab.Screen
        name={MainRoute.Home}
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <FastImage
              source={home}
              style={{width: 24, height: 24}}
              tintColor={focused ? colors.primary : colors.grey}
            />
          ),
        }}
      />
      <Tab.Screen
        name={MainRoute.Messenger}
        component={Messenger}
        options={{
          tabBarIcon: ({focused}) => (
            <FastImage
              source={messenger}
              style={{width: 24, height: 24}}
              tintColor={focused ? colors.primary : colors.grey}
            />
          ),
        }}
      />
      <Tab.Screen
        name={MainRoute.Contacts}
        component={Contacts}
        options={{
          tabBarIcon: ({focused}) => (
            <FastImage
              source={contact}
              style={{width: 24, height: 24}}
              tintColor={focused ? colors.primary : colors.grey}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomBar;
