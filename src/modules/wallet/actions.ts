// Connect Wallet
export const CONNECT_WALLET_REQUEST = '[Request] Connect Wallet'
export const CONNECT_WALLET_SUCCESS = '[Success] Connect Wallet'
export const CONNECT_WALLET_FAILURE = '[Failure] Connect Wallet'

// Get funds
export const GET_FUNDS_SUCCESS = '[Success] Get funds'
export const GET_FUNDS_FAILURE = '[Failure] Get funds'

export function connectWalletRequest() {
  return {
    type: CONNECT_WALLET_REQUEST,
    payload: {},
  }
}

export function connectWalletSuccess(address: string) {
  return {
    type: CONNECT_WALLET_SUCCESS,
    payload: {
      address,
    },
  }
}

export function connectWalletFailure(error: string) {
  return {
    type: CONNECT_WALLET_FAILURE,
    payload: {
      error,
    },
  }
}

export function getFundsSuccess(balance: number) {
  return {
    type: GET_FUNDS_SUCCESS,
    payload: {
      balance,
    },
  }
}

export function getFundsFailure(error: string) {
  return {
    type: GET_FUNDS_FAILURE,
    payload: {
      error,
    },
  }
}

export type ConnectWalletRequestAction = ReturnType<typeof connectWalletRequest>
export type ConnectWalletSuccessAction = ReturnType<typeof connectWalletSuccess>
export type ConnectWalletFailureAction = ReturnType<typeof connectWalletFailure>
export type GetFundsSuccessAction = ReturnType<typeof getFundsSuccess>
export type GetFundsFailureAction = ReturnType<typeof getFundsFailure>
