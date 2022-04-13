import { ethers } from 'ethers'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import {
  transferFailure,
  transferSuccess,
  TRANSFER_REQUEST,
} from './actions'
import { getAddressToTransfer, getAmountToTransfer } from './selectors'
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

export function* TransactionSaga() {
  yield takeEvery(TRANSFER_REQUEST, handleTransferRequest)
}

function* handleTransferRequest() {
  let addressToTransfer:string = yield select(getAddressToTransfer);
  let amountToTransfer:string = yield select(getAmountToTransfer);
  try {
    const provider = new ethers.providers.Web3Provider(
      windowWithEthereum.ethereum
    )
    const signer = provider.getSigner()
    const tokenContract = new ethers.Contract(
      TOKEN_ADDRESS,
      TOKEN_ABI,
      signer
    )
    interface transferResponse{
      wait: any
    }
    const tx:transferResponse = yield call(() => tokenContract.transfer(addressToTransfer, amountToTransfer))
    yield call(()=> tx.wait())
    yield put(transferSuccess())
  } catch (error: any) {
    yield put(transferFailure(error.message))
  }
}