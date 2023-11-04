import { createSlice } from '@reduxjs/toolkit';

interface SettingsState {
    theme: "dark" | "light"
    language: "en"
  
  }

const initialState: SettingsState = {
  theme: 'dark',
  language: 'en',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setTheme, setLanguage } = settingsSlice.actions;

