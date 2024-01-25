import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useState } from 'react';

import { Button, Text, TextInput } from '../../../components';
import { MIN_EMAIL_LENGTH, MIN_PASSWORD_LENGTH } from '../../../utils/constants';
import { MainRoute, MainStackParamList } from '../../../router/Main';
import { useAppSelector } from '../../../utils/hooks';
import { composeUserDisplayName } from '../../../utils/stringsValidation';

type Props = NativeStackScreenProps<MainStackParamList, MainRoute.Help>;

export const Help = ({ route, navigation }: Props) => {
  const [message, setMessage] = useState('');
  const user = useAppSelector((state) => state.user);

  const handleSendReport = () => {
    Alert.alert(
      `${composeUserDisplayName(user?.firstName, user?.lastName)}`,
      'Спасибо за сообщение! Мы обязательно  ответим вам в ближайшее время!'
    );
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text>Do you have any questions? Ideas? Complaints? Send them to us!</Text>
      <TextInput
        placeholder="Enter message"
        value={message}
        onChangeText={setMessage}
        multiline
        containerStyle={{ height: 150, alignItems: 'baseline' }}
      />
      <Button value="Send report" onPress={handleSendReport} containerStyle={{ marginTop: 32 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 24,
  },
});
