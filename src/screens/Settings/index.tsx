import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput, Toggle, Touchable} from '../../components';
import {useState} from 'react';
import {MIN_EMAIL_LENGTH, MIN_PASSWORD_LENGTH} from '../../utils/constants';
import {MainRoute, MainStackParamList} from '../../router/Main';
import FastImage from 'react-native-fast-image';
import {
  addGroup,
  chield,
  folder,
  question,
  sun,
  user,
} from '../../assets/settingsIcon';
import {useAppSelector, useColors} from '../../utils/hooks';
import {useDispatch} from 'react-redux';
import {setTheme} from '../../store/Settings/settings';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<MainStackParamList, MainRoute.Settings>;

export const Settings = ({route, navigation}: Props) => {
  const {colors} = useColors();
  const {bottom} = useSafeAreaInsets();
  const theme = useAppSelector(state => state.settings.theme);
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
      icon: user,
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
            <Text>Name</Text>
            <Text fontSize={12}>Email</Text>
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
          <Text fontWeight="600" style={{marginTop: 10}} color={colors.red}>
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
        onPress={() => {}}
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
