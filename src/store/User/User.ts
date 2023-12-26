import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  id: string,
  firstName: string,
  lastName:string,
  email: string,
  userName: string,
  updatedAt: string,
  avatarUrl: string;
}

const initialState: UserState = {
  id: "",
  firstName: "",
  lastName:"",
  email: "",
  userName: "",
  updatedAt: "",
  avatarUrl: "",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setToken: (state, action) => {
    //   state.token = action.payload
    // },
    setUserInfo: (state, action) => {
      return {
        ...action.payload,
      };
    },


    clearUser: () => {
      return initialState
    },
  },
})

export const { clearUser, setUserInfo } = userSlice.actions