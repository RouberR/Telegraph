import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput, Touchable} from '../../../components';

import {MainRoute, MainStackParamList} from '../../../router/Main';
import {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {Socket, io} from 'socket.io-client';
import {useAppSelector, useColors} from '../../../utils/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStore} from '../../../utils/constants';
import FastImage from 'react-native-fast-image';
import {backIcon, deleteIcon} from '../../../assets';
import {Colors} from '../../../utils/theme';

type Props = NativeStackScreenProps<MainStackParamList, MainRoute.Chat>;

export const Chat = ({route, navigation}: Props) => {
  const user = useAppSelector(state => state.user);
  const {colors} = useColors();
  const chatParams = route.params;
  const {title, participants} = chatParams;

  const formatMessage = (message: any) => ({
    _id: message.id,
    text: message.content,
    createdAt: new Date(message.createdAt),
    user: {
      _id: message.senderId,
      name:
        participants.find(participant => participant.id === message.senderId)
          ?.userName || '',
      avatar:
        participants.find(participant => participant.id === message.senderId)
          ?.avatarUrl || '',
    },
  });

  const initialMessages = chatParams.messages.map(formatMessage);

  const [messages, setMessages] = useState<IMessage[]>(
    initialMessages.reverse(),
  );
  console.log('messages', messages);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const connectSocket = useCallback(async () => {
    try {
      const newSocket = io('wss://chat-pai.onrender.com', {
        extraHeaders: {
          Authorization:
            (await AsyncStorage.getItem(AsyncStore.ACCESS_TOKEN)) || '',
        },
      });

      newSocket.on('connect', () => {
        setIsSocketConnected(true);
      });

      newSocket.on(`new-message-in-chat-${chatParams.id}`, message => {
        console.log('Новое сообщение в чате:', message);
        if (message.senderId !== user.id) {
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, [formatMessage(message)]),
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
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, newMessages),
        );
        socket.emit(`send-message`, {
          content: newMessages[0].text,
          chatId: chatParams.id,
        });
      }
    },
    [socket, chatParams.id],
  );

  // const onInputTextChanged = useCallback((text: string) => {
  //   // Здесь вы можете добавить логику для отслеживания текста, который пользователь вводит
  //   console.log('Текст ввода:', text);
  // }, []);

  const handleDeleteChat = (chatId: string) => {
    // Добавьте логику для удаления чата
    console.log(`Удаление чата с id: ${chatId}`);
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 0.7,
          alignItems: 'center',
          paddingHorizontal: 16,
          justifyContent: 'space-between',
          borderColor: colors.text,
          marginTop: 10,
        }}>
        <View style={{gap: 10, flexDirection: 'row', alignItems: 'center'}}>
          <Touchable onPress={() => navigation.goBack()}>
            <FastImage
              source={backIcon}
              style={{width: 24, height: 24}}
              tintColor={colors.text}
            />
          </Touchable>
          <FastImage
            source={{uri: participants[0]?.avatarUrl}}
            style={{width: 44, height: 44}}
          />
          <Text>{participants[1]?.userName || participants[0]?.userName}</Text>
        </View>
        <Touchable onPress={() => handleDeleteChat(chatParams.id)}>
          <FastImage
            source={deleteIcon}
            style={{width: 24, height: 24}}
            tintColor={colors.red}
          />
        </Touchable>
      </View>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{_id: user.id, name: user.userName, avatar: user.avatarUrl}}
        // onInputTextChanged={onInputTextChanged}
        // isTyping={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    gap: 24,
    marginTop: 24,
  },
});
