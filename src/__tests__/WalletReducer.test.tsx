import expect from 'expect';
import { walletReducer } from '../modules/wallet/reducer';
import { WalletState } from '../modules/wallet/types';
import { AnyAction } from 'redux';
import { CONNECT_WALLET_FAILURE, CONNECT_WALLET_REQUEST, CONNECT_WALLET_SUCCESS, GET_FUNDS_FAILURE, GET_FUNDS_SUCCESS } from '../modules/wallet/actions';

const INITIAL_STATE: WalletState = {
  address: null,
  isConnecting: false,
  error: null,
  balance: 0,
}

describe('wallet reducer', () => {
  it('should return the initial state', () => {
    expect(walletReducer(INITIAL_STATE, {} as AnyAction)).toEqual(INITIAL_STATE);
  });

  it('should handle CONNECT_WALLET_REQUEST', () => {
    const startAction = {
      type: CONNECT_WALLET_REQUEST
    };

    const expected = {
      ...INITIAL_STATE,
      isConnecting: true
    }

    expect(walletReducer(INITIAL_STATE, startAction)).toEqual(expected);
  });

  it('should handle CONNECT_WALLET_SUCCESS', () => {
    const address = "0x123"
    const successAction = {
      type: CONNECT_WALLET_SUCCESS,
      payload: { address },
    };

    const expected = {
      ...INITIAL_STATE,
      address
    }

    expect(walletReducer(INITIAL_STATE, successAction)).toEqual(expected);
  });

  it('should handle CONNECT_WALLET_FAILURE', () => {
    const failAction = {
      type: CONNECT_WALLET_FAILURE,
      payload: { error: "error" },
    };
    const expected = {
      ...INITIAL_STATE,
      error: "error"
    }
    expect(walletReducer(INITIAL_STATE, failAction)).toEqual(expected);
  });

  it('should handle GET_FUNDS_SUCCESS', () => {
    const balance = 100
    const updateAction = {
      type: GET_FUNDS_SUCCESS,
      payload: { balance },
    };

    const expected = {
      ...INITIAL_STATE,
      balance
    }
    expect(walletReducer(INITIAL_STATE, updateAction)).toEqual(expected);
  });

  it('should handle GET_FUNDS_FAILURE', () => {
    const failAction = {
      type: GET_FUNDS_FAILURE,
      payload: { error: "error" },
    };
    const expected = {
      ...INITIAL_STATE,
      error: "error"
    }
    expect(walletReducer(INITIAL_STATE, failAction)).toEqual(expected);
  });
});
