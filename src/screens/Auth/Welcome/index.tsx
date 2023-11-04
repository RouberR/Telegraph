import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TouchableOpacity, View} from 'react-native';
import {AuthRoute, AuthStackParamList} from '../../../router/Auth';
import {useAppSelector, useColors} from '../../../utils/hooks';
import {authSignIn} from '../../../api/Auth';
import React from 'react';
import {useDispatch} from 'react-redux';
import {setTheme} from '../../../store/Settings/settings';
import {Button, Text} from '../../../components';

type Props = NativeStackScreenProps<AuthStackParamList, AuthRoute.Welcome>;

export const Welcome = ({route, navigation}: Props) => {
  const count = useAppSelector(state => state.user);
  const {colors} = useColors();

  console.log(count);

  const getTest = async () => {
    const response = await authSignIn({
      email: 'i.s.toaccept@gmail.com',
      password: 'password',
    });
    console.log('response', response);
  };
  React.useEffect(() => {
    getTest();
  }, []);

  const theme = useAppSelector(state => state.settings.theme);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    // Toggle the theme when the button is pressed
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };
  return (
    <View>
      <Text>Hello</Text>
      <TouchableOpacity onPress={() => navigation.navigate(AuthRoute.SignIn)}>
        <Text style={{color: colors.primary}}>Go SignIn</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(AuthRoute.SignUp)}>
        <View>
          <Text>go SignUp</Text>
        </View>
      </TouchableOpacity>

      <View>
        <Text>First Screen</Text>
        <TouchableOpacity onPress={toggleTheme}>
          <Text style={{color: 'red'}}>"Toggle Theme": {theme}</Text>
        </TouchableOpacity>
        <View style={{marginHorizontal: 16, gap: 10}}>
          <Button
            value="Sign Up"
            onPress={() => navigation.navigate(AuthRoute.Confirm)}
          />
          <Button
            type="secondary"
            value="Sign In"
            onPress={() => navigation.navigate(AuthRoute.SignIn)}
          />
        </View>
      </View>
    </View>
  );
};
