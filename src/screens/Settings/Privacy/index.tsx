import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthRoute, AuthStackParamList } from '../../../router/Auth';
import { Button, TextInput } from '../../../components';
import { MIN_EMAIL_LENGTH, MIN_PASSWORD_LENGTH } from '../../../utils/constants';
import { authSignUp } from '../../../api/Auth';
import { MainRoute, MainStackParamList } from '../../../router/Main';

type Props = NativeStackScreenProps<MainStackParamList, MainRoute.Privacy>;

interface SignUpForm {
  [key: string]: string;
}
const initialFormState: SignUpForm = {
  oldPassword: '',
  password: '',
  confirmPassword: '',
};

const placeholders: Record<keyof SignUpForm, string> = {
  oldPassword: 'Old password',
  password: 'New password',
  confirmPassword: 'New confirm Password',
};

export const Privacy = ({ route, navigation }: Props) => {
  const [formState, setFormState] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const handleFieldChange = (fieldName: keyof SignUpForm, value: string) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [fieldName]: value,
    }));
  };

  const isSignUpDisabled = () => {
    return (
      formState.password.length < MIN_PASSWORD_LENGTH ||
      formState.password !== formState.confirmPassword
    );
  };

  const handleSave = () => {};
  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      {Object.keys(initialFormState).map((fieldName) => (
        <TextInput
          key={fieldName}
          placeholder={placeholders[fieldName]}
          value={formState[fieldName]}
          onChangeText={(text) => handleFieldChange(fieldName, text)}
          isSecurity={fieldName === 'password' || fieldName === 'confirmPassword'}
        />
      ))}
      <KeyboardAvoidingView behavior="padding" enabled>
        <Button
          value="Save"
          onPress={handleSave}
          disabled={isSignUpDisabled()}
          isLoading={loading}
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
