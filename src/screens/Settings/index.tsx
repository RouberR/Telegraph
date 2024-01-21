import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CompositeScreenProps } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import Share from 'react-native-share';
import { Button, Text, Toggle, Touchable } from '../../components';
import { AsyncStore } from '../../utils/constants';
import { MainRoute, MainStackParamList } from '../../router/Main';
import { addGroup, chield, question, sun, userIcon } from '../../assets/settingsIcon';
import { useAppSelector, useColors } from '../../utils/hooks';
import { setTheme } from '../../store/Settings/settings';
import { deleteUser } from '../../api/Profile';
import { clearUser } from '../../store/User/User';
import { RootParamList } from '../../router';
import { signOut } from '../../api/Auth';
import { useTranslation } from 'react-i18next';

type Props = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, MainRoute.Settings>,
  NativeStackScreenProps<RootParamList>
>;
export const Settings = ({ route, navigation }: Props) => {
  const { colors } = useColors();
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();
  const dispatch = useDispatch();

  const theme = useAppSelector((state) => state.settings.theme);
  const user = useAppSelector((state) => state.user);
  const [userLanguage, setUserLanguage] = useState(i18next.language);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };

  const shareMessage = async () => {
    try {
      const options = {
        title: 'Приглашение',
        message: `Приглашаю присоединиться к чату! Найди меня '${user.userName}'. `,
        url: 'https://play.google.com/store/apps/details?id=com.telegraphh',
      };
      await Share.open(options);
    } catch (error) {
      console.error('Error share', error);
    }
  };

  const settingsConfig = [
    {
      id: '1',
      title: t('ACCOUNT'),
      icon: userIcon,
      onPress: () => navigation.navigate(MainRoute.Account),
    },
    {
      id: '2',
      title: t('PRIVACY'),
      icon: chield,
      onPress: () => navigation.navigate(MainRoute.Privacy),
    },
    {
      id: '3',
      title: t('DART_MODE'),
      icon: sun,
      onPress: () => toggleTheme(),
      dartMode: true,
    },
    {
      id: '4',
      title: t('LANGUAGE'),
      icon: sun,
      onPress: async () => {
        const language = userLanguage === 'ru' ? 'en' : 'ru';
        i18next.changeLanguage(language);
        await AsyncStorage.setItem(AsyncStore.LANGUAGE, language);
        setUserLanguage(language);
      },
      languageMode: true,
    },
    // {
    //   id: '5',
    //   title: 'Storage and Data',
    //   icon: folder,
    //   onPress: () => {},
    // },
    {
      id: '6',
      title: t('HELP'),
      icon: question,
      onPress: () => navigation.navigate(MainRoute.Help),
    },
    {
      id: '7',
      title: t('INVITE_FRIEND'),
      icon: addGroup,
      onPress: () => shareMessage(),
    },
  ];

  const showModalDeleteAccount = () => {
    Alert.alert(
      t('ACCOUNT_DELETING'),
      t('MESSAGE_DELETE_ACCOUNT'),
      [
        { text: t('CANCEL'), style: 'cancel' },
        { text: t('DELETE'), onPress: deleteAccount },
      ],
      { cancelable: false }
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
      dispatch(clearUser());
      await AsyncStorage.removeItem(AsyncStore.ACCESS_TOKEN);
    }
  };

  // const getUserLanguage = async () => {
  //   const language = await AsyncStorage.getItem(AsyncStore.LANGUAGE);
  //   if (!!language) {
  //     setUserLanguage(language);
  //   } else {
  //     setUserLanguage(i18next.language);
  //   }
  // };
  // useLayoutEffect(() => {
  //   getUserLanguage();
  // }, []);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollStyle}>
        <View style={styles.headerContainer}>
          <FastImage source={{ uri: user.avatarUrl }} style={styles.avatar} />
          <View style={styles.containerUserInfo}>
            <Text>{`${user.firstName} ${user.lastName}`}</Text>
            <Text fontSize={12}>{user.email}</Text>
          </View>
        </View>
        <View>
          {settingsConfig.map((item) => (
            <Touchable key={item.id} onPress={item.onPress} style={styles.settingsConfigContainer}>
              <View style={styles.settingsTitleContainer}>
                <FastImage source={item.icon} style={styles.icon} tintColor={colors.text} />

                <Text>{item.title}</Text>
              </View>
              {item.dartMode && <Toggle isToggled={theme === 'dark' ? true : false} />}
              {item.languageMode && <Text>{userLanguage === 'en' ? 'English' : 'Русский'}</Text>}
            </Touchable>
          ))}
          <Text
            fontWeight="600"
            style={styles.textLogout}
            color={colors.red}
            onPress={handleLogout}
          >
            {t('LOGOUT')}
          </Text>
        </View>
      </ScrollView>
      <Button
        containerStyle={StyleSheet.compose(styles.button, { marginBottom: bottom || 22 })}
        type="error"
        value={t('DELETE_ACCOUNT')}
        onPress={showModalDeleteAccount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    flex: 1,
  },
  scrollStyle: { flex: 1 },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  avatar: { width: 72, height: 72, borderRadius: 36 },
  containerUserInfo: { gap: 5 },
  settingsConfigContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  settingsTitleContainer: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  icon: { width: 24, height: 24 },
  textLogout: { marginTop: 10 },
  button: {
    marginTop: 20,
  },
});
