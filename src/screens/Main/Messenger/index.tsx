import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, StyleSheet} from 'react-native';
import {Button, TextInput} from '../../../components';
import {useState} from 'react';
import {MIN_EMAIL_LENGTH, MIN_PASSWORD_LENGTH} from '../../../utils/constants';
import {MainRoute, MainStackParamList} from '../../../router/Main';

type Props = NativeStackScreenProps<MainStackParamList, MainRoute.Messenger>;

export const Messenger = ({route, navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {};

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"></ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    gap: 24,
    marginTop: 24,
  },
});
