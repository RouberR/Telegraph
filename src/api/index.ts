

import AsyncStorage from '@react-native-async-storage/async-storage';
import ky from 'ky';

export interface ApiError {
    error: string;
    message: string;
    statusCode: number;
  }

export const api = ky.create({
    prefixUrl: 'https://chat-pai.onrender.com',
    hooks: {
      beforeRequest: [
        async(request) => {
            const accessToken = await AsyncStorage.getItem("accessToken")
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        },
      ],
    },
  });

