import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {Button, Text} from '../../../components';
import {MainRoute, MainStackParamList} from '../../../router/Main';
import ContactList from '../../../components/ContactList';
import {useAppSelector, useStyles} from '../../../utils/hooks';
import {getChat} from '../../../api/Chat';
import {TColors} from '../../../utils/theme/colors';

type Props = NativeStackScreenProps<MainStackParamList, MainRoute.Home>;

export const Home = ({route, navigation}: Props) => {
  const {bottom} = useSafeAreaInsets();

  const { styles } = useStyles(createStyles(bottom));

  const user = useAppSelector((state) => state.user);

  const handleOnPressItem = async (item: any) => {
    try {
      const response = await getChat(item.id);
      navigation.navigate(MainRoute.Chat, { ...response });
    } catch (e) {
      console.log('Error get chat ', e);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.containerHeader}>
        <FastImage style={styles.avatarUser} source={{ uri: user.avatarUrl }} />
        <Text>{user.email}</Text>
        <Text>{`${user.firstName} ${user.lastName} (${user.userName})`}</Text>
      </View>
      <ContactList
        contacts={user.chats}
        onPressItem={handleOnPressItem}
        showHeader
      />
      <Button
        type="secondary"
        value="Add contact"
        containerStyle={styles.containerButton}
        onPress={() => navigation.navigate(MainRoute.Contacts)}
      />
    </ScrollView>
  );
}

const createStyles = (bottom: number) => (colors: TColors) =>
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
});
