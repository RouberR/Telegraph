import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from '../../../components';
import {useState} from 'react';
import {MIN_EMAIL_LENGTH, MIN_PASSWORD_LENGTH} from '../../../utils/constants';
import {MainRoute, MainStackParamList} from '../../../router/Main';
import FastImage from 'react-native-fast-image';
import ContactList from '../../../components/ContactList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppSelector} from '../../../utils/hooks';

type Props = NativeStackScreenProps<MainStackParamList, MainRoute.Home>;
const contacts = [
  {
    id: '1',
    name: 'John Doe',
    avatar: require('./256.png'),
    lastMessage: 'Hello there!',
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: require('./256.png'),
    lastMessage: 'How are you doing?',
  },
  {
    id: '3',
    name: 'Jane Smith',
    avatar: require('./256.png'),
    lastMessage: 'How are you doing?',
  },
  {
    id: '4',
    name: 'Jane Smith',
    avatar: require('./256.png'),
    lastMessage: 'How are you doing?',
  },
  {
    id: '5',
    name: 'Jane Smith',
    avatar: require('./256.png'),
    lastMessage: 'How are you doing?',
  },
  {
    id: '6',
    name: 'Jane Smith',
    avatar: require('./256.png'),
    lastMessage: 'How are you doing?',
  },
];
export const Home = ({route, navigation}: Props) => {
  const {bottom} = useSafeAreaInsets();
  const user = useAppSelector(state => state.user);
  const handleOnPressItem = (item: any) => {
    console.log('item', item);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <FastImage
          style={{
            height: 121,
            width: 121,
            alignSelf: 'center',
            borderWidth: 1.5,
            borderColor: 'white',
            borderRadius: 60,
          }}
          source={require('./256.png')}
        />
        <Text>{user.email}</Text>
        <Text>{`${user.firstName} ${user.lastName}`}</Text>
      </View>
      <ContactList
        contacts={contacts}
        onPressItem={handleOnPressItem}
        showHeader={true}
      />
      <Button
        type="secondary"
        value="Add contact"
        containerStyle={{marginBottom: bottom || 20}}
        onPress={() => navigation.navigate('Chat')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    gap: 16,
    marginTop: 8,
    flexGrow: 1,
  },
});
