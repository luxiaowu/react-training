import { configureStore } from '@reduxjs/toolkit'
import vortex from './vortex'

const store = configureStore({
  reducer: {
    vortex: vortex.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
