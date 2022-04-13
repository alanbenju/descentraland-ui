import { ethers } from 'ethers'

export type WalletState = {
  address: string | null
  balance: number | 0
  isConnecting: boolean
  error: string | null
}

export type WindowWithEthereum = Window & {
  ethereum: ethers.providers.ExternalProvider
}
