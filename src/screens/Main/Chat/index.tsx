import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from '../../../components';

import {MainRoute, MainStackParamList} from '../../../router/Main';
import {useEffect, useState} from 'react';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';

type Props = NativeStackScreenProps<MainStackParamList, MainRoute.Chat>;

export const Chat = ({route, navigation}: Props) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  // useEffect(() => {
  //   // Create a WebSocket connection when the component mounts
  //   const newSocket = new WebSocket('YOUR_WEBSOCKET_SERVER_URL');
  //   setSocket(newSocket);

  //   // Clean up WebSocket connection on component unmount
  //   return () => {
  //     newSocket.close();
  //   };
  // }, []);

  useEffect(() => {
    if (socket) {
      // Set up WebSocket event listeners
      socket.onmessage = event => {
        const newMessage = JSON.parse(event.data);
        setMessages(prevMessages =>
          GiftedChat.append(prevMessages, newMessage),
        );
      };
    }
  }, [socket]);

  const onSend = (newMessages: IMessage[] = []) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      // Send the new message to the WebSocket server
      socket.send(JSON.stringify(newMessages[0]));
      setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessages => onSend(newMessages)}
      user={{_id: 1}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    gap: 24,
    marginTop: 24,
  },
});
