import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CompositeScreenProps } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { AuthRoute, AuthStackParamList } from '../../../router/Auth';
import { Button, CodeFieldAnimated, Text } from '../../../components';
import { AsyncStore } from '../../../utils/constants';
import { confirmEmail, resendEmailCode } from '../../../api/Auth';
import { RootRoutes } from '../../../router';
import { MainStackParamList } from '../../../router/Main';
import { getUser } from '../../../api/Profile';
import { setUserInfo } from '../../../store/User/User';

type Props = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, AuthRoute.Confirm>,
  NativeStackScreenProps<MainStackParamList>
>;

export const Confirm = ({ route, navigation }: Props) => {
  const { codeExpired, email } = route?.params || '';
  const [code, setCode] = useState('');
  const { bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(codeExpired.seconds);
  const dispatch = useDispatch();
  const handleSignIn = async () => {
    try {
      setLoading(true);
      const response = await confirmEmail({ code: code, email: email });
      await AsyncStorage.setItem(AsyncStore.ACCESS_TOKEN, response.accessToken);
      await AsyncStorage.setItem(AsyncStore.REFRESH_TOKEN, response.refreshToken);
      const getUserResponse = await getUser();
      dispatch(setUserInfo(getUserResponse));
      navigation.navigate(RootRoutes.Main);
    } catch (e) {
      console.log('Error confirm email', e);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendEmailCode({ email: email });
      startResendTimer();
    } catch (e) {
      console.log('Error resend code', e);
    }
  };

  const startResendTimer = () => {
    setTimer(codeExpired.seconds);
    if (timer > 0) {
      const timerInterval = setInterval(() => {
        setTimer((timer) => timer - 1);
        if (timer <= 0) {
          clearInterval(timerInterval);
        }
      }, 1000);
    }
  };

  useEffect(() => {
    if (codeExpired) {
      startResendTimer();
    }
  }, [codeExpired]);

  return (
    <>
      <View style={styles.container}>
        <Text textAlign="center" fontSize={24} fontWeight="600">
          {email}
        </Text>
        <Text textAlign="center">
          Enter the 4-digit OTP code that has been sent from Email to complete your account
          registration
        </Text>
        <CodeFieldAnimated value={code} setValue={setCode} />

        <Text textAlign="center">Haven't got the confirmation code yet?</Text>
        {timer <= 0 ? (
          <Text textAlign="center" onPress={handleResend}>
            Resend
          </Text>
        ) : (
          <Text textAlign="center">{timer}</Text>
        )}
      </View>
      <Button
        value="Sign In"
        onPress={handleSignIn}
        isLoading={loading}
        disabled={code.length < 4}
        containerStyle={StyleSheet.compose(styles.containerButton, {
          marginBottom: bottom || 22,
        })}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    gap: 12,
    marginTop: 24,
    flex: 1,
  },
  containerButton: {
    marginHorizontal: 16,
  },
});
