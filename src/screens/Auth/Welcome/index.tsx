import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Linking, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';

import { AuthRoute, AuthStackParamList } from '../../../router/Auth';
import { useColors } from '../../../utils/hooks';
import { Button, Text } from '../../../components';
import { welcomeLogo } from '../../../assets';
import { PrivacyPolicyLink, TermsOfUseLink } from '../../../utils/constants';

type Props = NativeStackScreenProps<AuthStackParamList, AuthRoute.Welcome>;

export const Welcome = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const { colors } = useColors();

  return (
    <>
      <View style={styles.container}>
        <FastImage source={welcomeLogo} style={styles.logo} resizeMode="contain" />
        <View style={styles.containerButtons}>
          <Button value={t('SIGN_UP')} onPress={() => navigation.navigate(AuthRoute.SignUp)} />
          <Button
            type="secondary"
            value={t('SIGN_IN')}
            onPress={() => navigation.navigate(AuthRoute.SignIn)}
          />
        </View>
      </View>
      <View style={styles.containerFooter}>
        <Text textAlign="center" color={colors.grey} fontSize={14}>
          By tapping "Register" you agree to our
          <Text onPress={() => Linking.openURL(TermsOfUseLink)} color={colors.text}>
            {' '}
            Terms of Use
          </Text>{' '}
          and
          <Text onPress={() => Linking.openURL(PrivacyPolicyLink)} color={colors.text}>
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
