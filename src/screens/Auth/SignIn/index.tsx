import {ScrollView, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AuthRoute, AuthStackParamList} from '../../../router/Auth';
import {Button, TextInput} from '../../../components';
import {useState} from 'react';
import {
  AsyncStore,
  MIN_EMAIL_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../../../utils/constants';
import {authSignIn} from '../../../api/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootRoutes} from '../../../router';
import {CompositeScreenProps} from '@react-navigation/native';
import {MainStackParamList} from '../../../router/Main';
import {isEmailValid} from '../../../utils/stringsValidation';

type Props = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, AuthRoute.SignIn>,
  NativeStackScreenProps<MainStackParamList>
>;
export const SignIn = ({route, navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({errorCode: '', message: ''});

  const handleSignIn = async () => {
    if (!isEmailValid(email)) {
      setError({errorCode: '400', message: 'Email must be an email'});
      return;
    }
    try {
      setLoading(true);
      const response = await authSignIn({email: email, password: password});
      AsyncStorage.setItem(AsyncStore.ACCESS_TOKEN, response.accessToken);
      navigation.navigate(RootRoutes.Main);
    } catch (e: any) {
      console.log('Error sign in', e);
      const error = await e.response.json();
      setError({errorCode: error.statusCode, message: error.message});
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoFocus={true}
        error={!!error.errorCode}
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
        disabled={
          email.length < MIN_EMAIL_LENGTH ||
          password.length < MIN_PASSWORD_LENGTH
        }
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
