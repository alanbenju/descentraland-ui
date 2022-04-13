import { all } from '@redux-saga/core/effects'
import { TransactionSaga } from './transaction/sagas'
import { walletSaga } from './wallet/sagas'

export function* sagas() {
  yield all([walletSaga(), TransactionSaga()])
}
