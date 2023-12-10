import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput, Toggle, Touchable} from '../../components';
import {useState} from 'react';
import {
  AsyncStore,
  MIN_EMAIL_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../../utils/constants';
import {MainRoute, MainStackParamList} from '../../router/Main';
import FastImage from 'react-native-fast-image';
import {
  addGroup,
  chield,
  folder,
  question,
  sun,
  userIcon,
} from '../../assets/settingsIcon';
import {useAppSelector, useColors} from '../../utils/hooks';
import {useDispatch} from 'react-redux';
import {setTheme} from '../../store/Settings/settings';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {deleteUser} from '../../api/Profile';
import {clearUser} from '../../store/User/user';
import {RootParamList, RootRoutes} from '../../router';
import {AuthStackParamList} from '../../router/Auth';
import {CompositeScreenProps} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {signOut} from '../../api/Auth';

type Props = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, MainRoute.Settings>,
  NativeStackScreenProps<RootParamList>
>;
export const Settings = ({route, navigation}: Props) => {
  const {colors} = useColors();
  const {bottom} = useSafeAreaInsets();
  const theme = useAppSelector(state => state.settings.theme);
  const user = useAppSelector(state => state.user);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {};

  const settingsConfig = [
    {
      id: '1',
      title: 'Account',
      icon: userIcon,
      onPress: () => navigation.navigate(MainRoute.Account),
    },
    {
      id: '2',
      title: 'Privacy',
      icon: chield,
      onPress: () => navigation.navigate(MainRoute.Privacy),
    },
    {
      id: '3',
      title: 'Dart mode',
      icon: sun,
      onPress: () => toggleTheme(),
      dartMode: true,
    },
    {
      id: '4',
      title: 'Storage and Data',
      icon: folder,
      onPress: () => {},
    },
    {
      id: '5',
      title: 'Help',
      icon: question,
      onPress: () => navigation.navigate(MainRoute.Help),
    },
    {
      id: '6',
      title: 'Invite a Friend',
      icon: addGroup,
      onPress: () => {},
    },
  ];

  const showModalDeleteAccount = () => {
    Alert.alert(
      'Удаление аккаунта',
      'Вы уверены, что хотите удалить аккаунт?',
      [
        {text: 'Отмена', style: 'cancel'},
        {text: 'Удалить', onPress: deleteAccount},
      ],
      {cancelable: false},
    );
  };

  const deleteAccount = async () => {
    try {
      await deleteUser();
      dispatch(clearUser());
      await AsyncStorage.removeItem(AsyncStore.ACCESS_TOKEN);
    } catch (e) {
      console.log('Error delete account', e);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      dispatch(clearUser());
      await AsyncStorage.removeItem(AsyncStore.ACCESS_TOKEN);
    } catch (e) {
      console.log('Error logout user ', e);
    }
  };

  return (
    <View style={{marginHorizontal: 16, flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            marginBottom: 20,
          }}>
          <FastImage
            source={require('../Main/Home/256.png')}
            style={{width: 72, height: 72}}
          />
          <View style={{gap: 5}}>
            <Text>{`${user.firstName} ${user.lastName}`}</Text>
            <Text fontSize={12}>{user.email}</Text>
          </View>
        </View>
        <View>
          {settingsConfig.map(item => (
            <Touchable
              onPress={item.onPress}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                // borderWidth: 1,
                paddingVertical: 10,
              }}>
              <View
                style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <FastImage
                  source={item.icon}
                  style={{width: 24, height: 24}}
                  tintColor={colors.text}
                />

                <Text>{item.title}</Text>
              </View>
              {item.dartMode && (
                <Toggle isToggled={theme === 'dark' ? true : false} />
              )}
            </Touchable>
          ))}
          <Text
            fontWeight="600"
            style={{marginTop: 10}}
            color={colors.red}
            onPress={handleLogout}>
            Logout
          </Text>
        </View>
      </ScrollView>
      <Button
        containerStyle={{
          marginTop: 20,
          marginBottom: bottom || 22,
        }}
        type="error"
        value="Delete account"
        onPress={showModalDeleteAccount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginHorizontal: 16,
    gap: 24,
    marginTop: 24,
  },
});