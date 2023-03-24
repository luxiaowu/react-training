import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IValue {
  row: number | string
  col: number | string
}

interface VortexState {
  value: IValue
  directionVisible: boolean
}

const initialState: VortexState = {
  value: {
    row: 3,
    col: 4
  },
  directionVisible: false
}

const vortexSlice = createSlice({
  name: 'vortex',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<Partial<IValue>>) => {
      state.value = { ...state.value, ...action.payload }
    },
    setDirectionVisible: (state, action: PayloadAction<boolean>) => {
      state.directionVisible = action.payload
    }
  }
})

export default vortexSlice
