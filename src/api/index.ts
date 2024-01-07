import AsyncStorage from '@react-native-async-storage/async-storage';
import ky from 'ky';
import { AsyncStore } from '../utils/constants';
import { clearUser } from '../store/User/user';
import { RootRoutes } from '../router';

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}

let navigation: any;
let store: any;

export const setNavigationReference = (ref: ReactNavigation.RootParamList) => {
  navigation = ref;
};

export const setStoreReference = (reduxStore) => {
  store = reduxStore;
};

export const api = ky.create({
  throwHttpErrors: true,
  prefixUrl: 'https://chat-pai.onrender.com',
  hooks: {
    beforeRequest: [
      async request => {
        const accessToken = await AsyncStorage.getItem(AsyncStore.ACCESS_TOKEN);
        request.headers.set('Authorization', `${accessToken}`);
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 403 || response.status === 401) {
          try {
            const accessToken = await AsyncStorage.getItem(
              AsyncStore.ACCESS_TOKEN,
            );
            const token = await ky
              .post('https://chat-pai.onrender.com/auth/refresh-tokens', {
                headers: {
                  Authorization: `${accessToken}`,
                },
              })
              .text();
            await AsyncStorage.setItem(AsyncStore.ACCESS_TOKEN, token);
            request.headers.set('Authorization', `${token}`);
            return ky(request);
          } catch (e) {
            store.dispatch(clearUser());
            navigation.navigate(RootRoutes.Auth);
          }
        }
      },
    ],
  },
});
