import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, StyleSheet} from 'react-native';
import {Button, Loading, TextInput} from '../../../components';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {MIN_EMAIL_LENGTH, MIN_PASSWORD_LENGTH} from '../../../utils/constants';
import {MainRoute, MainStackParamList} from '../../../router/Main';
import ContactList from '../../../components/ContactList';
import {createChat, getAllUsers} from '../../../api/Chat';
import {debounce} from 'lodash';
import {UsersResponse} from '../../../api/Chat/ChatType';
type Props = NativeStackScreenProps<MainStackParamList, MainRoute.Contacts>;

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

  const handleOnPressItem = async (item: any) => {
    try {
      const createNewChat = await createChat({
        title: item.userName,
        participantId: item.id,
        type: 'Direct',
      });
      navigation.navigate(MainRoute.Chat, {...createNewChat});
    } catch (e) {
      console.log('Error create chat ', e);
    }
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
