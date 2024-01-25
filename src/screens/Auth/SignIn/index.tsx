import { ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CompositeScreenProps } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { AuthRoute, AuthStackParamList } from '../../../router/Auth';
import { Button, TextInput } from '../../../components';
import { AsyncStore, MIN_EMAIL_LENGTH, MIN_PASSWORD_LENGTH } from '../../../utils/constants';
import { authSignIn } from '../../../api/Auth';
import { RootRoutes } from '../../../router';
import { MainStackParamList } from '../../../router/Main';
import { isEmailValid } from '../../../utils/stringsValidation';
import { getUser } from '../../../api/Profile';
import { setUserInfo } from '../../../store/User/User';

type Props = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, AuthRoute.SignIn>,
  NativeStackScreenProps<MainStackParamList>
>;
export const SignIn = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: '', message: '', statusCode: '' });
  const dispatch = useDispatch();
  const handleSignIn = async () => {
    if (!isEmailValid(email)) {
      setError({
        statusCode: '400',
        message: 'Email must be an email',
        error: 'Error',
      });
      return;
    }
    try {
      setLoading(true);
      const response = await authSignIn({ email: email, password: password });
      await AsyncStorage.setItem(AsyncStore.ACCESS_TOKEN, response.accessToken);
      await AsyncStorage.setItem(AsyncStore.REFRESH_TOKEN, response.refreshToken);
      const getUserResponse = await getUser();
      dispatch(setUserInfo(getUserResponse));
      navigation.navigate(RootRoutes.Main);
    } catch (e: any) {
      console.log('Error sign in', e);
      const error = await e.response.json();
      setError({
        statusCode: error.statusCode,
        message: error.message,
        error: 'Error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoFocus={true}
        error={!!error.statusCode}
        errorMessage={error.message}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        isSecurity={true}
      />
      <Button
        value="Sign In"
        onPress={handleSignIn}
        isLoading={loading}
        disabled={email.length < MIN_EMAIL_LENGTH || password.length < MIN_PASSWORD_LENGTH}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    gap: 24,
    marginTop: 24,
  },
});
