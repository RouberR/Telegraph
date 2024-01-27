import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, ChatList, Text, Touchable } from '../../../components';
import { MainRoute, MainStackParamList } from '../../../router/Main';
import { useAppSelector, useStyles } from '../../../utils/hooks';
import { getChat } from '../../../api/Chat';
import { TColors } from '../../../utils/theme/colors';
import { composeUserDisplayName } from '../../../utils/stringsValidation';
import { ChatResponse } from '../../../api/Chat/ChatType';
import React, { useState } from 'react';
import { getUser } from '../../../api/Profile';
import { useFocusEffect } from '@react-navigation/native';
import { setUserInfo } from '../../../store/User/User';
import { useDispatch } from 'react-redux';

type Props = NativeStackScreenProps<MainStackParamList, MainRoute.Home>;

export const Home = ({ route, navigation }: Props) => {
  const { bottom } = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState('Contact');
  const { styles, colors } = useStyles(createStyles(bottom, selectedTab));
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);

  const handleOnPressItem = async (item: ChatResponse) => {
    try {
      const response = await getChat(item.id);
      navigation.navigate(MainRoute.Chat, { ...response });
    } catch (e) {
      console.log('Error get chat ', e);
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.containerHeader}>
        <FastImage style={styles.avatarUser} source={{ uri: user.avatarUrl }} />
        <Text>{user.email}</Text>
        <Text>{composeUserDisplayName(user.firstName, user.lastName, user.userName)}</Text>
      </View>
      <View style={styles.containerTab}>
        <Touchable onPress={() => setSelectedTab('Contact')} style={styles.tabContact}>
          <Text color={colors.text}>Contact</Text>
        </Touchable>
        <Touchable disabled onPress={() => setSelectedTab('Group')} style={styles.tabGroup}>
          <Text style={{ opacity: 0.5 }} color={colors.grey}>
            Group
          </Text>
        </Touchable>
      </View>
      <ChatList data={user.chats} onPressItem={handleOnPressItem} />
      <Button
        type="secondary"
        value="Add contact"
        containerStyle={styles.containerButton}
        onPress={() => navigation.navigate(MainRoute.Contacts)}
      />
    </ScrollView>
  );
};

const createStyles = (bottom: number, selectedTab: string) => (colors: TColors) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 16,
      gap: 16,
      marginTop: 8,
      flexGrow: 1,
    },
    containerHeader: {
      gap: 12,
      marginBottom: 20,
    },
    avatarUser: {
      height: 121,
      width: 121,
      alignSelf: 'center',
      borderWidth: 1.5,
      borderColor: colors.default,
      borderRadius: 60,
    },
    containerButton: {
      marginBottom: bottom || 20,
      marginTop: 10,
    },
    containerTab: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    tabContact: {
      borderBottomWidth: selectedTab === 'Contact' ? 2 : 0,
      borderBottomColor: selectedTab === 'Contact' ? colors.default : 'transparent',
      padding: 10,
      flex: 1,
      alignItems: 'center',
    },
    tabGroup: {
      borderBottomWidth: selectedTab === 'Group' ? 2 : 0,
      borderBottomColor: selectedTab === 'Group' ? colors.default : 'transparent',
      padding: 10,
      flex: 1,
      alignItems: 'center',
    },
  });
