import { RootState } from '../types'

export const getState = (state: RootState) => state.transaction
export const getAddressToTransfer = (state: RootState) => getState(state).addressToTransfer || ''
export const getAmountToTransfer = (state: RootState) => getState(state).amountToTransfer || 0
export const isTransfering = (state: RootState) => getState(state).isTransfering
export const getError = (state: RootState) => getState(state).error
