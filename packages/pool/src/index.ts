import { Buffer } from "buffer";
import { Address } from '@stellar/stellar-sdk';
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  Result,
  Spec as ContractSpec,
} from '@stellar/stellar-sdk/contract';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
export * as rpc from '@stellar/stellar-sdk/rpc'

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  standalone: {
    networkPassphrase: "Standalone Network ; February 2017",
    contractId: "CDIQPCLXZFSW5AF62BUQA3H5CI5SMBGLBFPG5NLNGZ73PUISJERA7Q6W",
  }
} as const


export interface CouponPayload {
  recovery_id: u32;
  signature: string;
}


export interface Pool {
  fee: u32;
  is_public: boolean;
  last_release: u64;
  other_chain_address: string;
  split_fees: u32;
  token: string;
}


export interface Authority {
  fee_wallet: string;
  signer: string;
}


export interface ReleaseLiqPayload {
  amount: i128;
  to: string;
}


export interface LockLiqEvent {
  amount: i128;
  from: string;
  to_other_chain: string;
  token_other_chain: string;
}

export const Errors = {
  1: {message:""},
  2: {message:""},
  3: {message:""},
  4: {message:""},
  5: {message:""}
}

export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  initialize: ({token, other_chain_address, fee, is_public, split_fees, owner, admin, be}: {token: string, other_chain_address: string, fee: u32, is_public: boolean, split_fees: u32, owner: Authority, admin: Authority, be: Buffer}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a release_liq transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  release_liq: ({coupon_payload, payload}: {coupon_payload: CouponPayload, payload: ReleaseLiqPayload}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a lock_liq transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  lock_liq: ({user, amount, from, to_other_chain}: {user: string, amount: i128, from: string, to_other_chain: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a update_split transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  update_split: ({user, split_fees}: {user: string, split_fees: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a update_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  update_admin: ({user, admin}: {user: string, admin: Authority}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a update_be transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  update_be: ({user, be}: {user: string, be: Buffer}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a update_visibility transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  update_visibility: ({user, is_public}: {user: string, is_public: boolean}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a update_owner transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  update_owner: ({user, owner}: {user: string, owner: Authority}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a update_other_chain_address transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  update_other_chain_address: ({user, other_chain_address}: {user: string, other_chain_address: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a update_fee transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  update_fee: ({user, fee}: {user: string, fee: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAACAAAAAAAAAAFdG9rZW4AAAAAAAATAAAAAAAAABNvdGhlcl9jaGFpbl9hZGRyZXNzAAAAABMAAAAAAAAAA2ZlZQAAAAAEAAAAAAAAAAlpc19wdWJsaWMAAAAAAAABAAAAAAAAAApzcGxpdF9mZWVzAAAAAAAEAAAAAAAAAAVvd25lcgAAAAAAB9AAAAAJQXV0aG9yaXR5AAAAAAAAAAAAAAVhZG1pbgAAAAAAB9AAAAAJQXV0aG9yaXR5AAAAAAAAAAAAAAJiZQAAAAAD7gAAACAAAAAA",
        "AAAAAAAAAAAAAAALcmVsZWFzZV9saXEAAAAAAgAAAAAAAAAOY291cG9uX3BheWxvYWQAAAAAB9AAAAANQ291cG9uUGF5bG9hZAAAAAAAAAAAAAAHcGF5bG9hZAAAAAfQAAAAEVJlbGVhc2VMaXFQYXlsb2FkAAAAAAAAAA==",
        "AAAAAAAAAAAAAAAIbG9ja19saXEAAAAEAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAOdG9fb3RoZXJfY2hhaW4AAAAAABMAAAAA",
        "AAAAAAAAAAAAAAAMdXBkYXRlX3NwbGl0AAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAACnNwbGl0X2ZlZXMAAAAAAAQAAAAA",
        "AAAAAAAAAAAAAAAMdXBkYXRlX2FkbWluAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAABWFkbWluAAAAAAAH0AAAAAlBdXRob3JpdHkAAAAAAAAA",
        "AAAAAAAAAAAAAAAJdXBkYXRlX2JlAAAAAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAAAmJlAAAAAAPuAAAAIAAAAAA=",
        "AAAAAAAAAAAAAAARdXBkYXRlX3Zpc2liaWxpdHkAAAAAAAACAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAJaXNfcHVibGljAAAAAAAAAQAAAAA=",
        "AAAAAAAAAAAAAAAMdXBkYXRlX293bmVyAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAABW93bmVyAAAAAAAH0AAAAAlBdXRob3JpdHkAAAAAAAAA",
        "AAAAAAAAAAAAAAAadXBkYXRlX290aGVyX2NoYWluX2FkZHJlc3MAAAAAAAIAAAAAAAAABHVzZXIAAAATAAAAAAAAABNvdGhlcl9jaGFpbl9hZGRyZXNzAAAAABMAAAAA",
        "AAAAAAAAAAAAAAAKdXBkYXRlX2ZlZQAAAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAAA2ZlZQAAAAAEAAAAAA==",
        "AAAAAQAAAAAAAAAAAAAADUNvdXBvblBheWxvYWQAAAAAAAACAAAAAAAAAAtyZWNvdmVyeV9pZAAAAAAEAAAAAAAAAAlzaWduYXR1cmUAAAAAAAAQ",
        "AAAAAQAAAAAAAAAAAAAABFBvb2wAAAAGAAAAAAAAAANmZWUAAAAABAAAAAAAAAAJaXNfcHVibGljAAAAAAAAAQAAAAAAAAAMbGFzdF9yZWxlYXNlAAAABgAAAAAAAAATb3RoZXJfY2hhaW5fYWRkcmVzcwAAAAATAAAAAAAAAApzcGxpdF9mZWVzAAAAAAAEAAAAAAAAAAV0b2tlbgAAAAAAABM=",
        "AAAAAQAAAAAAAAAAAAAACUF1dGhvcml0eQAAAAAAAAIAAAAAAAAACmZlZV93YWxsZXQAAAAAABMAAAAAAAAABnNpZ25lcgAAAAAAEw==",
        "AAAAAQAAAAAAAAAAAAAAEVJlbGVhc2VMaXFQYXlsb2FkAAAAAAAAAgAAAAAAAAAGYW1vdW50AAAAAAALAAAAAAAAAAJ0bwAAAAAAEw==",
        "AAAAAQAAAAAAAAAAAAAADExvY2tMaXFFdmVudAAAAAQAAAAAAAAABmFtb3VudAAAAAAACwAAAAAAAAAEZnJvbQAAABMAAAAAAAAADnRvX290aGVyX2NoYWluAAAAAAATAAAAAAAAABF0b2tlbl9vdGhlcl9jaGFpbgAAAAAAABM=",
        "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAABQAAAAAAAAAMVW5hdXRob3JpemVkAAAAAQAAAAAAAAANSW52YWxpZENvdXBvbgAAAAAAAAIAAAAAAAAADVBvb2xJc1ByaXZhdGUAAAAAAAADAAAAAAAAAA1JbnZhbGlkUGFyYW1zAAAAAAAABAAAAAAAAAAPUG9vbEluaXRpYWxpemVkAAAAAAU=" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<null>,
        release_liq: this.txFromJSON<null>,
        lock_liq: this.txFromJSON<null>,
        update_split: this.txFromJSON<null>,
        update_admin: this.txFromJSON<null>,
        update_be: this.txFromJSON<null>,
        update_visibility: this.txFromJSON<null>,
        update_owner: this.txFromJSON<null>,
        update_other_chain_address: this.txFromJSON<null>,
        update_fee: this.txFromJSON<null>
  }
}