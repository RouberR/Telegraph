import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, StyleSheet} from 'react-native';
import {Button, Loading, TextInput} from '../../../components';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {MIN_EMAIL_LENGTH, MIN_PASSWORD_LENGTH} from '../../../utils/constants';
import {MainRoute, MainStackParamList} from '../../../router/Main';
import ContactList from '../../../components/ContactList';
import {getAllUsers} from '../../../api/Chat';
import {debounce} from 'lodash';
import {UsersResponse} from '../../../api/Chat/ChatType';
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
  const [searchResults, setSearchResults] = useState<UsersResponse>();
  const [loading, setLoading] = useState(false);
  const handleSearch = async (textSearch: string) => {
    try {
      setLoading(true);
      const isEmail = /\S+@\S+\.\S+/.test(textSearch);
      const result = await getAllUsers(
        'asc',
        1,
        50,
        isEmail ? 'email' : 'userName',
        textSearch,
      );
      setSearchResults(result);
    } catch (e) {
      console.log('Error get all users', e);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 2000), []);

  const handleOnPressItem = (item: any) => {
    navigation.navigate(MainRoute.Chat);
    console.log('item', item);
  };

  const handleInputChange = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <TextInput
        placeholder="Find the user by email"
        value={search}
        onChangeText={handleInputChange}
        rightIcon={true}
      />
      <ContactList
        contacts={searchResults?.data || []}
        onPressItem={handleOnPressItem}
      />
      <Loading loading={loading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    gap: 24,
    marginTop: 24,
    flex: 1,
  },
});
