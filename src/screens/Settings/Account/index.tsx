import React, {useState} from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthRoute, AuthStackParamList} from '../../../router/Auth';
import {Button, Loading, TextInput} from '../../../components';
import {
  MIN_EMAIL_LENGTH,
  MIN_FIRST_NAME_LENGTH,
  MIN_LAST_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../../../utils/constants';
import {authSignUp} from '../../../api/Auth';
import {MainRoute, MainStackParamList} from '../../../router/Main';
import FastImage from 'react-native-fast-image';
import {useAppSelector} from '../../../utils/hooks';
import {getUser, updateUser} from '../../../api/Profile';
import {setUserInfo} from '../../../store/User/user';
import {useDispatch} from 'react-redux';

type Props = NativeStackScreenProps<MainStackParamList, MainRoute.Account>;

interface SignUpForm {
  [key: string]: string;
}

const placeholders: Record<keyof SignUpForm, string> = {
  firstName: 'First Name',
  lastName: 'Last Name',
  email: 'Email',
};

export const Account = ({route, navigation}: Props) => {
  const user = useAppSelector(state => state.user);

  const [formState, setFormState] = useState<SignUpForm>({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const handleFieldChange = (fieldName: keyof SignUpForm, value: string) => {
    setFormState(prevFormState => ({
      ...prevFormState,
      [fieldName]: value,
    }));
  };

  const isDisableButtonSave = () => {
    return (
      formState.email.length < MIN_EMAIL_LENGTH ||
      formState.lastName.length < MIN_LAST_NAME_LENGTH ||
      formState.firstName.length < MIN_FIRST_NAME_LENGTH
    );
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const newUserInfo = await updateUser({
        firstName: formState.firstName,
        lastName: formState.lastName,
      });
      dispatch(setUserInfo(newUserInfo));
      navigation.goBack();
    } catch (e) {
      console.log('Error update user ', e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <FastImage
        source={require('../../Main/Home/256.png')}
        style={{width: 121, height: 121, alignSelf: 'center'}}
      />

      <View style={{gap: 16, marginBottom: 22}}>
        {Object.keys(formState).map(fieldName => (
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
            disabled={isDisableButtonSave()}
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