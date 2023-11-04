import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  token: string | undefined
  userInfo: any | undefined

}

const initialState: UserState = {
  token: undefined,
  userInfo: undefined,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },


    clearUser: (state) => {
      state.token = undefined
      state.userInfo = undefined
    },
  },
})

export const { setUserInfo, setToken, clearUser } = userSlice.actions