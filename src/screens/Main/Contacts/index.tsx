import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, StyleSheet} from 'react-native';
import {Button, TextInput} from '../../../components';
import {useState} from 'react';
import {MIN_EMAIL_LENGTH, MIN_PASSWORD_LENGTH} from '../../../utils/constants';
import {MainRoute, MainStackParamList} from '../../../router/Main';
import ContactList from '../../../components/ContactList';
type Props = NativeStackScreenProps<MainStackParamList, MainRoute.Contacts>;
const contacts = [
  {
    id: '1',
    name: 'John Doe',
    avatar: require('../Home/256.png'),
    lastMessage: 'Hello there!',
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: require('../Home/256.png'),
    lastMessage: 'How are you doing?',
  },
  {
    id: '3',
    name: 'Jane Smith',
    avatar: require('../Home/256.png'),
    lastMessage: 'How are you doing?',
  },
  {
    id: '4',
    name: 'Jane Smith',
    avatar: require('../Home/256.png'),
    lastMessage: 'How are you doing?',
  },
  {
    id: '5',
    name: 'Jane Smith',
    avatar: require('../Home/256.png'),
    lastMessage: 'How are you doing?',
  },
  {
    id: '6',
    name: 'Jane Smith',
    avatar: require('../Home/256.png'),
    lastMessage: 'How are you doing?',
  },
];
export const Contacts = ({route, navigation}: Props) => {
  const [search, setSearch] = useState('');
  const handleOnPressItem = (item: any) => {
    console.log('item', item);
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <TextInput
        placeholder="Find the user by email"
        value={search}
        onChangeText={setSearch}
        rightIcon={true}
      />
      <ContactList contacts={contacts} onPressItem={handleOnPressItem} />
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
