import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from '../../../components';
import {useState} from 'react';
import {MIN_EMAIL_LENGTH, MIN_PASSWORD_LENGTH} from '../../../utils/constants';
import {MainRoute, MainStackParamList} from '../../../router/Main';

type Props = NativeStackScreenProps<MainStackParamList, MainRoute.Chat>;

export const Chat = ({route, navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {};

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <View>
        <Text>Chat</Text>
      </View>
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
