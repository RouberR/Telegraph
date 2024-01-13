import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { Loading, TextInput } from '../../../components';
import { MainRoute, MainStackParamList } from '../../../router/Main';
import ContactList from '../../../components/ContactList';
import { TYPE_CHAT } from '../../../api/Chat/ChatType';
import { getChat } from '../../../api/Chat';
import { useAppSelector } from '../../../utils/hooks';
import { setUserInfo } from '../../../store/User/User';

type Props = NativeStackScreenProps<MainStackParamList, MainRoute.Messenger>;

export const Messenger = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] =
    useState<Array<{ id: string; title: string; type: TYPE_CHAT }>>();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSearch = async (textSearch: string) => {
    try {
      setLoading(true);
      const filteredChats = user.chats.filter((chat) =>
        chat.title.toLowerCase().includes(textSearch.toLowerCase())
      );
      setSearchResults(filteredChats);
    } catch (e) {
      console.log('Error get all users', e);
    } finally {
      setLoading(false);
    }
  };
  const debouncedSearch = useCallback(debounce(handleSearch, 2000), []);

  const handleInputChange = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  const handleOnPressItem = async (item: any) => {
    try {
      const response = await getChat(item.id);
      navigation.navigate(MainRoute.Chat, { ...response });
    } catch (e) {
      console.log('Error get chat ', e);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      getUser();
    } catch (e) {
      console.log('Error refresh ', e);
    } finally {
      setRefreshing(false);
    }
  };

  const getUser = async () => {
    const getUserResponse = await getUser();
    dispatch(setUserInfo(getUserResponse));
  };

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, [])
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <TextInput
        placeholder={t('FIND_USER_BY_USERNAME')}
        value={search}
        onChangeText={handleInputChange}
        rightIcon
      />
      <ContactList contacts={searchResults || user.chats} onPressItem={handleOnPressItem} />
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
