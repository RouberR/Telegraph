import { createSlice } from '@reduxjs/toolkit'
import { UserProfile } from '../../api/Profile/ProfileType';



const initialState: UserProfile = {
  id: "",
  firstName: "",
  lastName:"",
  email: "",
  userName: "",
  updatedAt: "",
  avatarUrl: "",
  chats: []
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