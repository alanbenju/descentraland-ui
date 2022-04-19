import expect from 'expect';
import { AnyAction } from 'redux';
import { TRANSFER_REQUEST, TRANSFER_SUCCESS, TRANSFER_FAILURE } from '../modules/transaction/actions';
import { transactionReducer } from '../modules/transaction/reducer';
import { TransactionState } from '../modules/transaction/types';

const INITIAL_STATE: TransactionState = {
  addressToTransfer: null,
  amountToTransfer: 0,
  isTransfering: false,
  error: null
}

describe('wallet reducer', () => {
  it('should return the initial state', () => {
    expect(transactionReducer(INITIAL_STATE, {} as AnyAction)).toEqual(INITIAL_STATE);
  });

  it('should handle TRANSFER_REQUEST', () => {

    const addressToTransfer = "0x123", amountToTransfer = 100
    const startAction = {
      type: TRANSFER_REQUEST,
      payload: { addressToTransfer, amountToTransfer }
    };

    const expected = {
      ...INITIAL_STATE,
      isTransfering: true,
      addressToTransfer,
      amountToTransfer
    }

    expect(transactionReducer(INITIAL_STATE, startAction)).toEqual(expected);
  });

  it('should handle TRANSFER_SUCCESS', () => {
    const successAction = {
      type: TRANSFER_SUCCESS,
    };

    expect(transactionReducer(INITIAL_STATE, successAction)).toEqual(INITIAL_STATE);
  });

  it('should handle TRANSFER_FAILURE', () => {
    const failAction = {
      type: TRANSFER_FAILURE,
      payload: { error: "error" },
    };
    const expected = {
      ...INITIAL_STATE,
      error: "error"
    }
    expect(transactionReducer(INITIAL_STATE, failAction)).toEqual(expected);
  });

});
