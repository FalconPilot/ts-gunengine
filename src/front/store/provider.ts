import { configureStore } from '@reduxjs/toolkit'
import { gunSlice } from '$front/store/slices/gun'

export const store = configureStore({
  reducer: {
    gun: gunSlice.reducer
  }
})
