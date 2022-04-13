import { BigNumber, ethers } from 'ethers'
import { call, put, takeEvery } from 'redux-saga/effects'
import {
  connectWalletFailure,
  connectWalletSuccess,
  CONNECT_WALLET_REQUEST,
  getFundsFailure,
  getFundsSuccess,
} from './actions'
import { WindowWithEthereum } from './types'

// The regular `window` object with `ethereum` injected by MetaMask
const windowWithEthereum = window as unknown as WindowWithEthereum

/* This is the Dummy Token address, it identifies the token contract once deployed */
export const TOKEN_ADDRESS = process.env.REACT_APP_TOKEN_ADDRESS!
if (!TOKEN_ADDRESS) {
  console.error(`Missing env variable REACT_APP_TOKEN_ADDRESS`)
}

export const TOKEN_ABI = [
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint)',
  'function transfer(address to, uint amount)',
]

export function* walletSaga() {
  yield takeEvery(CONNECT_WALLET_REQUEST, handleConnectWalletRequest)
}

function* handleConnectWalletRequest() {
  try {
    const provider = new ethers.providers.Web3Provider(
      windowWithEthereum.ethereum
    )
    yield call(() => provider.send('eth_requestAccounts', []))
    const signer = provider.getSigner()
    const address: string = yield call(() => signer.getAddress())
    yield put(connectWalletSuccess(address))
    yield handleGetBalanceRequest(address)
  } catch (error: any) {
    yield put(connectWalletFailure(error.message))
  }
}


function* handleGetBalanceRequest(address: string){
  try {
    const provider = new ethers.providers.Web3Provider(
      windowWithEthereum.ethereum
    )
    const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider)
    const balance: string = yield call(() => token.balanceOf(address))  // --> returns the balance of DummyToken of the walletAddress
    const otro = BigNumber.from(balance).toNumber()
    yield put(getFundsSuccess(otro))
  } catch (error: any) {
    yield put(getFundsFailure(error.message))
  }
}