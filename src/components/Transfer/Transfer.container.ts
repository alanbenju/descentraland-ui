import { connect } from 'react-redux'
import { transferRequest } from '../../modules/transaction/actions'
import {
  getError,
  isTransfering,
} from '../../modules/transaction/selectors'
import { RootState } from '../../modules/types'
import { MapDispatch, MapDispatchProps, MapStateProps } from './Transfer.types'
import Transfer from './Transfer'
import { isConnected } from '../../modules/wallet/selectors'

const mapState = (state: RootState): MapStateProps => ({
  isConnected: isConnected(state),
  isTransfering: isTransfering(state),
  error: getError(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onTransfer: (addressToTransfer: string, amountToTransfer: number) => dispatch(transferRequest(addressToTransfer, amountToTransfer)),
})

export default connect(mapState, mapDispatch)(Transfer)
