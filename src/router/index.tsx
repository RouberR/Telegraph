import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './Auth';
import BottomBar from './BottomBar';

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
      {/* <BottomBar /> */}
    </NavigationContainer>
  );
};

export default RootNavigator;
