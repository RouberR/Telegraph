import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import {Button, Loading, TextInput} from '../../../components';
import { MIN_EMAIL_LENGTH, MIN_PASSWORD_LENGTH } from '../../../utils/constants';
import { MainRoute, MainStackParamList } from '../../../router/Main';
import ContactList from '../../../components/ContactList';
import { TYPE_CHAT, UsersResponse } from '../../../api/Chat/ChatType';
import {createChat, getAllUsers, getChat} from '../../../api/Chat';
import {useAppSelector} from '../../../utils/hooks';
import {getUser} from '../../../api/Profile';
import {setUserInfo} from '../../../store/User/user';

type Props = NativeStackScreenProps<MainStackParamList, MainRoute.Messenger>;

export const Messenger = ({route, navigation}: Props) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] =    useState<Array<{id: string; title: string; type: TYPE_CHAT}>>();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSearch = async (textSearch: string) => {
    try {
      setLoading(true);
      const filteredChats = user.chats.filter((chat) => chat.title.toLowerCase().includes(textSearch.toLowerCase()),);
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
      const getUserResponse = await getUser();
      dispatch(setUserInfo(getUserResponse));
    } catch (e) {
      console.log('Error refresh ', e);
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      async () => {
        const getUserResponse = await getUser();
        dispatch(setUserInfo(getUserResponse));
      };
    }, []),
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <TextInput
        placeholder="Find the chat by username"
        value={search}
        onChangeText={handleInputChange}
        rightIcon
      />
      <ContactList
        contacts={searchResults || user.chats}
        onPressItem={handleOnPressItem}
      />
      <Loading loading={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    gap: 24,
    marginTop: 24,
    flex: 1,
  },
});
