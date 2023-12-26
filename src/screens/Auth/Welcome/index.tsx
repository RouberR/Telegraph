import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AuthRoute, AuthStackParamList} from '../../../router/Auth';
import {useAppSelector, useColors} from '../../../utils/hooks';
import {authSignIn} from '../../../api/Auth';
import React from 'react';
import {useDispatch} from 'react-redux';
import {setTheme} from '../../../store/Settings/settings';
import {Button, Text} from '../../../components';
import {RootRoutes} from '../../../router';
import {MainRoute} from '../../../router/Main';
import FastImage from 'react-native-fast-image';
import {welcomeLogo} from '../../../assets';
import {PrivacyPolicyLink, TermsOfUseLink} from '../../../utils/constants';

type Props = NativeStackScreenProps<AuthStackParamList, AuthRoute.Welcome>;

export const Welcome = ({route, navigation}: Props) => {
  const count = useAppSelector(state => state.user);
  const {colors} = useColors();

  console.log(count);

  // const getTest = async () => {
  //   const response = await authSignIn({
  //     email: 'i.s.toaccept@gmail.com',
  //     password: 'password',
  //   });
  //   console.log('response', response);
  // };
  // React.useEffect(() => {
  //   getTest();
  // }, []);

  return (
    <>
      <View style={styles.container}>
        <FastImage
          source={welcomeLogo}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.containerButtons}>
          <Button
            value="Sign Up"
            // onPress={() =>
            //   navigation.navigate(RootRoutes.Main, {screen: MainRoute.Settings})
            // }
            onPress={() => navigation.navigate(AuthRoute.SignUp)}
          />
          <Button
            type="secondary"
            value="Sign In"
            onPress={() => navigation.navigate(AuthRoute.SignIn)}
          />
        </View>
      </View>
      <View style={styles.containerFooter}>
        <Text textAlign="center" color={colors.grey} fontSize={14}>
          By tapping "Register" you agree to our
          <Text
            onPress={() => Linking.openURL(TermsOfUseLink)}
            color={colors.text}>
            {' '}
            Terms of Use
          </Text>{' '}
          and
          <Text
            onPress={() => Linking.openURL(PrivacyPolicyLink)}
            color={colors.text}>
            {' '}
            Privacy Policy
          </Text>
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: '100%',
    height: 400,
  },
  containerButtons: {
    marginHorizontal: 16,
    gap: 10,
  },
  containerFooter: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
});
