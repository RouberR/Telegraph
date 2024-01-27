import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, StyleSheet, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { Socket, io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';

import { useAppSelector, useStyles } from '../../../utils/hooks';
import { AsyncStore } from '../../../utils/constants';
import { MainRoute, MainStackParamList } from '../../../router/Main';
import { Text, Touchable } from '../../../components';
import { backIcon, deleteIcon } from '../../../assets';
import { deleteChat } from '../../../api/Chat';
import { TColors } from '../../../utils/theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<MainStackParamList, MainRoute.Chat>;

export const Chat = ({ route, navigation }: Props) => {
  const { styles, colors } = useStyles(createStyles);
  const user = useAppSelector((state) => state.user);
  const chatParams = route.params;
  const { participants } = chatParams;

  const formatMessage = (message: any) => ({
    _id: message.id,
    text: message.content,
    createdAt: new Date(message.createdAt),
    user: {
      _id: message.senderId,
      name:
        participants?.find((participant: any) => participant.id === message.senderId)?.userName ||
        '',
      avatar:
        participants?.find((participant: any) => participant.id === message.senderId)?.avatarUrl ||
        '',
    },
  });

  const initialMessages = chatParams.messages.map(formatMessage);

  const [messages, setMessages] = useState<IMessage[]>(initialMessages.reverse());
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const connectSocket = useCallback(async () => {
    try {
      const newSocket = io('wss://chat-pai.onrender.com', {
        extraHeaders: {
          Authorization: (await AsyncStorage.getItem(AsyncStore.ACCESS_TOKEN)) || '',
        },
      });

      newSocket.on('connect', () => {
        setIsSocketConnected(true);
      });

      newSocket.on(`new-message-in-chat-${chatParams.id}`, (message) => {
        console.log('Новое сообщение в чате:', message);
        if (message.senderId !== user.id) {
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, [formatMessage(message)])
          );
        }
      });

      newSocket.on('disconnect', () => {
        setIsSocketConnected(false);
      });

      setSocket(newSocket);
    } catch (error) {
      console.error('Ошибка подключения:', error);
    }
  }, [chatParams.id]);

  useEffect(() => {
    if (!isSocketConnected) {
      connectSocket();
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [isSocketConnected]);

  const onSend = useCallback(
    async (newMessages: IMessage[] = []) => {
      if (socket?.connected) {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
        socket.emit('send-message', {
          content: newMessages[0].text,
          chatId: chatParams.id,
        });
      }
    },
    [socket, chatParams.id]
  );

  const handleDeleteChat = async () => {
    try {
      await deleteChat(chatParams.id);
      navigation.navigate(MainRoute.Messenger);
    } catch (e) {
      console.log('Error delete chat', e);
    }
  };

  const showModalDeleteAccount = () => {
    Alert.alert(
      'Удаление чата',
      `Вы уверены, что хотите чат c ${
        chatParams.participants[1].userName || chatParams.participants[0].userName
      }?`,
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Удалить', onPress: handleDeleteChat },
      ],
      { cancelable: false }
    );
  };
  const participant = participants?.find((i) => i.id !== user.id);
  console.log('participant', participant);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <View style={styles.headerLeft}>
            <Touchable onPress={() => navigation.goBack()}>
              <FastImage source={backIcon} style={styles.icon} tintColor={colors.text} />
            </Touchable>
            <FastImage
              source={{ uri: participant?.avatarUrl || user?.avatarUrl }}
              style={styles.avatar}
            />
            <Text>{participant.userName || user?.userName}</Text>
          </View>
          <Touchable onPress={showModalDeleteAccount}>
            <FastImage source={deleteIcon} style={styles.icon} tintColor={colors.red} />
          </Touchable>
        </View>
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{ _id: user.id, name: user.userName, avatar: user.avatarUrl }}
        />
      </View>
    </SafeAreaView>
  );
};

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    containerHeader: {
      flexDirection: 'row',
      borderBottomWidth: 0.7,
      alignItems: 'center',
      paddingHorizontal: 16,
      justifyContent: 'space-between',
      borderColor: colors.text,
      marginTop: 10,
    },
    headerLeft: { gap: 10, flexDirection: 'row', alignItems: 'center' },
    icon: { width: 24, height: 24 },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: colors.default,
    },
  });
