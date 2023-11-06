import AsyncStorage from '@react-native-async-storage/async-storage';
import ky from 'ky';
import { AsyncStore } from '../utils/constants';

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}

export const api = ky.create({
  throwHttpErrors: true,
  prefixUrl: 'https://chat-pai.onrender.com',
  hooks: {
    beforeRequest: [
      async request => {
        const accessToken = await AsyncStorage.getItem(AsyncStore.ACCESS_TOKEN);
        request.headers.set('Authorization', `Bearer ${accessToken}`);
      },
    ],
    afterResponse: [
      async (request, options, response) => {
       
        if (response.status === 403) {
          const token = await ky('https://chat-pai.onrender.com/auth/refresh-tokens').text();
          await AsyncStorage.setItem(AsyncStore.ACCESS_TOKEN, token);
          request.headers.set('Authorization', `token ${token}`);

          return ky(request);
        }
      },
    ],
  },
});
