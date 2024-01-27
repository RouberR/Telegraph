import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet } from 'react-native';
import { useCallback, useState } from 'react';
import { debounce } from 'lodash';

import { Loading, TextInput } from '../../../components';
import { MainRoute, MainStackParamList } from '../../../router/Main';
import ContactList from '../../../components/ContactList';
import { createChat, getAllUsers, getChat } from '../../../api/Chat';
import { ParticipantType, UsersResponse } from '../../../api/Chat/ChatType';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../../utils/hooks';

type Props = NativeStackScreenProps<MainStackParamList, MainRoute.Contacts>;

export const Contacts = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<UsersResponse>();
  const [loading, setLoading] = useState(false);
  const user = useAppSelector((state) => state.user);
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

  const handleOnPressItem = async (item: ParticipantType) => {
    try {
      const existChat = user.chats.find((i) => i.title === item.userName);
      if (existChat) {
        console.log('hi 222');
        const response = await getChat(existChat.id);
        navigation.navigate(MainRoute.Chat, { ...response });
        return;
      }
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
      <ContactList
        data={searchResults?.data.filter((i) => i.userName !== user.userName) || []}
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
    marginTop: 12,
    flex: 1,
  },
});
