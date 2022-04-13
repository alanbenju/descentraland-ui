import { ethers } from 'ethers'

export type TransactionState = {
  addressToTransfer: string | null
  amountToTransfer: number | 0
  isTransfering: boolean
  error: string | null
}

export type WindowWithEthereum = Window & {
  ethereum: ethers.providers.ExternalProvider
}
