import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet } from 'react-native';
import { useCallback, useState } from 'react';
import { debounce } from 'lodash';

import { Loading, TextInput } from '../../../components';
import { MainRoute, MainStackParamList } from '../../../router/Main';
import ContactList from '../../../components/ContactList';
import { createChat, getAllUsers } from '../../../api/Chat';
import { UsersResponse } from '../../../api/Chat/ChatType';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<MainStackParamList, MainRoute.Contacts>;

export const Contacts = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<UsersResponse>();
  const [loading, setLoading] = useState(false);
  const handleSearch = async (textSearch: string) => {
    try {
      setLoading(true);
      const isEmail = /\S+@\S+\.\S+/.test(textSearch);
      const result = await getAllUsers('asc', 1, 50, isEmail ? 'email' : 'userName', textSearch);
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
      navigation.navigate(MainRoute.Chat, { ...createNewChat });
    } catch (e) {
      console.log('Error create chat ', e);
    }
  };

  const handleInputChange = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <TextInput
        placeholder={t('FIND_USER_BY_EMAIL')}
        value={search}
        onChangeText={handleInputChange}
        rightIcon
      />
      <ContactList contacts={searchResults?.data || []} onPressItem={handleOnPressItem} />
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
