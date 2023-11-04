import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, StyleSheet, View} from 'react-native';
import {AuthRoute, AuthStackParamList} from '../../../router/Auth';
import {Button, CodeFieldAnimated, Text, TextInput} from '../../../components';
import {useState} from 'react';
import {MIN_EMAIL_LENGTH, MIN_PASSWORD_LENGTH} from '../../../utils/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<AuthStackParamList, AuthRoute.Confirm>;

export const Confirm = ({route, navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {bottom} = useSafeAreaInsets();
  const handleSignIn = () => {};

  return (
    <>
      <View style={styles.container}>
        <Text textAlign="center" fontSize={24} fontWeight="600">
          Email
        </Text>
        <Text textAlign="center">
          Enter the 4-digit OTP code that has been sent from Email to complete
          your account registration
        </Text>
        <CodeFieldAnimated />
        <Text textAlign="center">
          Haven't got the confirmation code yet? Resend
        </Text>
      </View>
      <Button
        value="Sign In"
        onPress={handleSignIn}
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
