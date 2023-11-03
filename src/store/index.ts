import { combineReducers, configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer, persistStore } from 'redux-persist'
import { userSlice } from './User/User'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
}

const rootReducer = combineReducers({
  user: userSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store, null, () => {})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch