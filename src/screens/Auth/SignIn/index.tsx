import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, StyleSheet} from 'react-native';
import {AuthRoute, AuthStackParamList} from '../../../router/Auth';
import {Button, TextInput} from '../../../components';
import {useState} from 'react';
import {MIN_EMAIL_LENGTH, MIN_PASSWORD_LENGTH} from '../../../utils/constants';

type Props = NativeStackScreenProps<AuthStackParamList, AuthRoute.SignIn>;

export const SignIn = ({route, navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    
  const handleSignIn = () => {};

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoFocus={true}
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
