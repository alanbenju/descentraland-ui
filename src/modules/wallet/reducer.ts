import { AnyAction } from 'redux'
import {
  ConnectWalletFailureAction,
  ConnectWalletSuccessAction,
  CONNECT_WALLET_FAILURE,
  CONNECT_WALLET_REQUEST,
  CONNECT_WALLET_SUCCESS,
  GET_FUNDS_FAILURE,
  GetFundsSuccessAction,
  GetFundsFailureAction,
  GET_FUNDS_SUCCESS
} from './actions'
import { WalletState } from './types'

const INITIAL_STATE: WalletState = {
  address: null,
  isConnecting: false,
  error: null,
  balance: 0,
}

export function walletReducer(
  state: WalletState = INITIAL_STATE,
  action: AnyAction
): WalletState {
  switch (action.type) {
    case CONNECT_WALLET_REQUEST: {
      return {
        ...state,
        isConnecting: true,
        error: null,
      }
    }
    case CONNECT_WALLET_SUCCESS: {
      const { address } =
        action.payload as ConnectWalletSuccessAction['payload']
      return {
        ...state,
        isConnecting: false,
        address,
        error: null
      }
    }

    case CONNECT_WALLET_FAILURE: {
      const { error } = action.payload as ConnectWalletFailureAction['payload']
      return {
        ...state,
        isConnecting: false,
        error,
      }
    }

    case GET_FUNDS_SUCCESS: {
      const { balance } =
        action.payload as GetFundsSuccessAction['payload']
      return {
        ...state,
        isConnecting: false,
        balance,
        error: null
      }
    }

    case GET_FUNDS_FAILURE: {
      const { error } = action.payload as GetFundsFailureAction['payload']
      return {
        ...state,
        isConnecting: false,
        error,
      }
    }

    default:
      return state
  }
}
