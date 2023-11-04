import React, {useState} from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthRoute, AuthStackParamList} from '../../../router/Auth';
import {Button, TextInput} from '../../../components';
import {MIN_EMAIL_LENGTH, MIN_PASSWORD_LENGTH} from '../../../utils/constants';

type Props = NativeStackScreenProps<AuthStackParamList, AuthRoute.SignUp>;

interface SignUpForm {
  [key: string]: string;
}
const initialFormState: SignUpForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const placeholders: Record<keyof SignUpForm, string> = {
  firstName: 'First Name',
  lastName: 'Last Name',
  email: 'Email',
  password: 'Password',
  confirmPassword: 'Confirm Password',
};

export const SignUp = ({route, navigation}: Props) => {
  const [formState, setFormState] = useState(initialFormState);

  const handleFieldChange = (fieldName: keyof SignUpForm, value: string) => {
    setFormState(prevFormState => ({
      ...prevFormState,
      [fieldName]: value,
    }));
  };

  const isSignUpDisabled = () => {
    return (
      formState.email.length < MIN_EMAIL_LENGTH ||
      formState.password.length < MIN_PASSWORD_LENGTH ||
      formState.password !== formState.confirmPassword
    );
  };

  const handleSignUp = () => {};

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      {Object.keys(initialFormState).map(fieldName => (
        <TextInput
          key={fieldName}
          placeholder={placeholders[fieldName]}
          value={formState[fieldName]}
          onChangeText={text => handleFieldChange(fieldName, text)}
          isSecurity={
            fieldName === 'password' || fieldName === 'confirmPassword'
          }
        />
      ))}
      <KeyboardAvoidingView behavior="padding" enabled>
        <Button
          value="Sign Up"
          onPress={handleSignUp}
          disabled={isSignUpDisabled()}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    gap: 24,
    marginTop: 24,
  },
});
