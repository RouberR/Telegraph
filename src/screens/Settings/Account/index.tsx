import React, {useState} from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthRoute, AuthStackParamList} from '../../../router/Auth';
import {Button, TextInput} from '../../../components';
import {MIN_EMAIL_LENGTH, MIN_PASSWORD_LENGTH} from '../../../utils/constants';
import {authSignUp} from '../../../api/Auth';
import {MainRoute, MainStackParamList} from '../../../router/Main';
import FastImage from 'react-native-fast-image';

type Props = NativeStackScreenProps<MainStackParamList, MainRoute.Account>;

interface SignUpForm {
  [key: string]: string;
}
const initialFormState: SignUpForm = {
  firstName: '',
  lastName: '',
  email: '',
};

const placeholders: Record<keyof SignUpForm, string> = {
  firstName: 'First Name',
  lastName: 'Last Name',
  email: 'Email',
};

export const Account = ({route, navigation}: Props) => {
  const [formState, setFormState] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
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

  const handleSave = () => {};
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <FastImage
        source={require('../../Main/Home/256.png')}
        style={{width: 121, height: 121, alignSelf: 'center'}}
      />
      <View style={{gap: 16, marginBottom: 22}}>
        {Object.keys(initialFormState).map(fieldName => (
          <TextInput
            key={fieldName}
            placeholder={placeholders[fieldName]}
            value={formState[fieldName]}
            onChangeText={text => handleFieldChange(fieldName, text)}
            disabled={fieldName !== 'email'}
            isSecurity={
              fieldName === 'password' || fieldName === 'confirmPassword'
            }
          />
        ))}
        <KeyboardAvoidingView behavior="padding" enabled>
          <Button
            containerStyle={{marginTop: 20}}
            value="Save"
            onPress={handleSave}
            disabled={isSignUpDisabled()}
            isLoading={loading}
          />
        </KeyboardAvoidingView>
      </View>
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
