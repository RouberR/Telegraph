import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from '../../../components';
import {useState} from 'react';
import {MIN_EMAIL_LENGTH, MIN_PASSWORD_LENGTH} from '../../../utils/constants';
import {MainRoute, MainStackParamList} from '../../../router/Main';

type Props = NativeStackScreenProps<MainStackParamList, MainRoute.Help>;

export const Help = ({route, navigation}: Props) => {
  const [message, setMessage] = useState('');

  const handleSendReport = () => {};

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <Text>
        Do you have any questions? Ideas? Complaints? Send them to us!
      </Text>
      <TextInput
        placeholder="Enter message"
        value={message}
        onChangeText={setMessage}
        multiline={true}
        containerStyle={{height: 150, alignItems: 'baseline'}}
      />
      <Button
        value="Send report"
        onPress={handleSendReport}
        containerStyle={{marginTop: 32}}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 24,
  },
});