import { AnyAction, Dispatch } from 'redux'
import { TransferRequestAction } from '../../modules/transaction/actions'
import { ConnectWalletRequestAction } from '../../modules/wallet/actions'

export type Props = {
  isConnected: boolean
  error: string | null
  onTransfer: (addressToTransfer: string, amountToTransfer: number) => void
  isTransfering: boolean
}

export type MapStateProps = Pick<
  Props,
  'isConnected' | 'error' | 'isTransfering'
>
export type MapDispatchProps = Pick<Props, 'onTransfer'>
export type MapDispatch = Dispatch<TransferRequestAction | ConnectWalletRequestAction | AnyAction>