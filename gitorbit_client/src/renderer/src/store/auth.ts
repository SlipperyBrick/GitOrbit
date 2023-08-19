import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'authentication',
  initialState: [],
  reducers: {
    userLoggedIn: (user, action) => {
      /* Auth code goes here, can write mutating code too! */
    },
    userLoggedOut: (user, action) => {
      /* Auth code goes here, can write mutating code too! */
    }
  }
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions
export default authSlice.reducer
