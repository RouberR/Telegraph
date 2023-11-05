import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  id: string,
  firstName: string,
  lastName:string
  email: string

}

const initialState: UserState = {
  id: "",
  firstName: "",
  lastName:"",
  email: ""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setToken: (state, action) => {
    //   state.token = action.payload
    // },
    // setUserInfo: (state, action) => {
    //   state.userInfo = action.payload
    // },


    clearUser: () => initialState,
  },
})

export const { clearUser } = userSlice.actions