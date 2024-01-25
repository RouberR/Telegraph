import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import React, { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { ChatList, Loading, TextInput } from '../../../components';
import { MainRoute, MainStackParamList } from '../../../router/Main';
import ContactList from '../../../components/ContactList';
import { getChat } from '../../../api/Chat';
import { useAppSelector } from '../../../utils/hooks';
import { setUserInfo } from '../../../store/User/User';
import { UserProfile } from '../../../api/Profile/ProfileType';
import { getUser } from '../../../api/Profile';

type Props = NativeStackScreenProps<MainStackParamList, MainRoute.Messenger>;

export const Messenger = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<UserProfile['chats']>();
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
  const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

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
      handleGetUser();
    } catch (e) {
      console.log('Error refresh ', e);
    } finally {
      setRefreshing(false);
    }
  };

  const handleGetUser = async () => {
    try {
      const getUserResponse = await getUser();
      dispatch(setUserInfo(getUserResponse));
    } catch (e) {
      console.log('Error get user ', e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGetUser();
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
      <ChatList data={searchResults || user.chats} onPressItem={handleOnPressItem} />
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
