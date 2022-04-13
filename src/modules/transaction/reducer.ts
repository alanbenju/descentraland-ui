import { AnyAction } from 'redux'
import {
  TransferFailureAction,
  TransferRequestAction,
  TRANSFER_FAILURE,
  TRANSFER_REQUEST,
  TRANSFER_SUCCESS
} from './actions'
import { TransactionState } from './types'

const INITIAL_STATE: TransactionState = {
  addressToTransfer: null,
  amountToTransfer: 0,
  isTransfering: false,
  error: null
}

export function transactionReducer(
  state: TransactionState = INITIAL_STATE,
  action: AnyAction
): TransactionState {
  switch (action.type) {
    case TRANSFER_REQUEST: {
      const { addressToTransfer, amountToTransfer } =
        action.payload as TransferRequestAction['payload']
      return {
        ...state,
        error: null,
        addressToTransfer, 
        amountToTransfer,
        isTransfering: true
      }
    }
    case TRANSFER_SUCCESS: {
      return {
        ...state,
        isTransfering: false,
        error: null,
        addressToTransfer: null,
        amountToTransfer: 0
      }
    }

    case TRANSFER_FAILURE: {
      const { error } = action.payload as TransferFailureAction['payload']
      return {
        ...state,
        isTransfering: false,
        error,
      }
    }

    default:
      return state
  }
}
