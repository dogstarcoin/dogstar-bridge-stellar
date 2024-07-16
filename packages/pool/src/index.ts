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
    contractId: "CBJ2LFVT3CDEJS2AL5ZAJJIPJNAQIVCAKRV3FY2IDI6EQ7IGBEFIUWRE",
  }
} as const


export interface CouponPayload {
  recovery_id: u32;
  signature: string;
}

export type DataKey = {tag: "Pool", values: void} | {tag: "Owner", values: void} | {tag: "Admin", values: void} | {tag: "Be", values: void};


export interface Pool {
  fee: u32;
  is_public: boolean;
  last_release: u64;
  other_chain_address: string;
  split_fees: u32;
  token: string;
  token_symbol: string;
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
  initialize: ({token, other_chain_address, fee, is_public, split_fees, owner, admin, be, token_symbol}: {token: string, other_chain_address: string, fee: u32, is_public: boolean, split_fees: u32, owner: Authority, admin: Authority, be: Buffer, token_symbol: string}, options?: {
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
   * Construct and simulate a get_pool transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_pool: (options?: {
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
  }) => Promise<AssembledTransaction<Pool>>

  /**
   * Construct and simulate a set_split transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_split: ({user, split_fees}: {user: string, split_fees: u32}, options?: {
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
   * Construct and simulate a set_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_admin: ({user, admin}: {user: string, admin: Authority}, options?: {
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
   * Construct and simulate a set_be transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_be: ({user, be}: {user: string, be: Buffer}, options?: {
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
   * Construct and simulate a get_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_admin: (options?: {
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
  }) => Promise<AssembledTransaction<Authority>>

  /**
   * Construct and simulate a set_visibility transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_visibility: ({user, is_public}: {user: string, is_public: boolean}, options?: {
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
   * Construct and simulate a set_owner transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_owner: ({user, owner}: {user: string, owner: Authority}, options?: {
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
   * Construct and simulate a set_other_chain_address transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_other_chain_address: ({user, other_chain_address}: {user: string, other_chain_address: string}, options?: {
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
   * Construct and simulate a set_fee transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_fee: ({user, fee}: {user: string, fee: u32}, options?: {
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
   * Construct and simulate a get_be transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_be: (options?: {
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
  }) => Promise<AssembledTransaction<Buffer>>

}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAACQAAAAAAAAAFdG9rZW4AAAAAAAATAAAAAAAAABNvdGhlcl9jaGFpbl9hZGRyZXNzAAAAABAAAAAAAAAAA2ZlZQAAAAAEAAAAAAAAAAlpc19wdWJsaWMAAAAAAAABAAAAAAAAAApzcGxpdF9mZWVzAAAAAAAEAAAAAAAAAAVvd25lcgAAAAAAB9AAAAAJQXV0aG9yaXR5AAAAAAAAAAAAAAVhZG1pbgAAAAAAB9AAAAAJQXV0aG9yaXR5AAAAAAAAAAAAAAJiZQAAAAAD7gAAACAAAAAAAAAADHRva2VuX3N5bWJvbAAAABAAAAAA",
        "AAAAAAAAAAAAAAALcmVsZWFzZV9saXEAAAAAAgAAAAAAAAAOY291cG9uX3BheWxvYWQAAAAAB9AAAAANQ291cG9uUGF5bG9hZAAAAAAAAAAAAAAHcGF5bG9hZAAAAAfQAAAAEVJlbGVhc2VMaXFQYXlsb2FkAAAAAAAAAA==",
        "AAAAAAAAAAAAAAAIbG9ja19saXEAAAAEAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAOdG9fb3RoZXJfY2hhaW4AAAAAABMAAAAA",
        "AAAAAAAAAAAAAAAIZ2V0X3Bvb2wAAAAAAAAAAQAAB9AAAAAEUG9vbA==",
        "AAAAAAAAAAAAAAAJc2V0X3NwbGl0AAAAAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAACnNwbGl0X2ZlZXMAAAAAAAQAAAAA",
        "AAAAAAAAAAAAAAAJc2V0X2FkbWluAAAAAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAABWFkbWluAAAAAAAH0AAAAAlBdXRob3JpdHkAAAAAAAAA",
        "AAAAAAAAAAAAAAAGc2V0X2JlAAAAAAACAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAACYmUAAAAAA+4AAAAgAAAAAA==",
        "AAAAAAAAAAAAAAAJZ2V0X2FkbWluAAAAAAAAAAAAAAEAAAfQAAAACUF1dGhvcml0eQAAAA==",
        "AAAAAAAAAAAAAAAOc2V0X3Zpc2liaWxpdHkAAAAAAAIAAAAAAAAABHVzZXIAAAATAAAAAAAAAAlpc19wdWJsaWMAAAAAAAABAAAAAA==",
        "AAAAAAAAAAAAAAAJc2V0X293bmVyAAAAAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAABW93bmVyAAAAAAAH0AAAAAlBdXRob3JpdHkAAAAAAAAA",
        "AAAAAAAAAAAAAAAXc2V0X290aGVyX2NoYWluX2FkZHJlc3MAAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAAE290aGVyX2NoYWluX2FkZHJlc3MAAAAAEAAAAAA=",
        "AAAAAAAAAAAAAAAHc2V0X2ZlZQAAAAACAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAADZmVlAAAAAAQAAAAA",
        "AAAAAAAAAAAAAAAGZ2V0X2JlAAAAAAAAAAAAAQAAA+4AAAAg",
        "AAAAAQAAAAAAAAAAAAAADUNvdXBvblBheWxvYWQAAAAAAAACAAAAAAAAAAtyZWNvdmVyeV9pZAAAAAAEAAAAAAAAAAlzaWduYXR1cmUAAAAAAAAQ",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABAAAAAAAAAAAAAAABFBvb2wAAAAAAAAAAAAAAAVPd25lcgAAAAAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAACQmUAAA==",
        "AAAAAQAAAAAAAAAAAAAABFBvb2wAAAAHAAAAAAAAAANmZWUAAAAABAAAAAAAAAAJaXNfcHVibGljAAAAAAAAAQAAAAAAAAAMbGFzdF9yZWxlYXNlAAAABgAAAAAAAAATb3RoZXJfY2hhaW5fYWRkcmVzcwAAAAAQAAAAAAAAAApzcGxpdF9mZWVzAAAAAAAEAAAAAAAAAAV0b2tlbgAAAAAAABMAAAAAAAAADHRva2VuX3N5bWJvbAAAABA=",
        "AAAAAQAAAAAAAAAAAAAACUF1dGhvcml0eQAAAAAAAAIAAAAAAAAACmZlZV93YWxsZXQAAAAAABMAAAAAAAAABnNpZ25lcgAAAAAAEw==",
        "AAAAAQAAAAAAAAAAAAAAEVJlbGVhc2VMaXFQYXlsb2FkAAAAAAAAAgAAAAAAAAAGYW1vdW50AAAAAAALAAAAAAAAAAJ0bwAAAAAAEw==",
        "AAAAAQAAAAAAAAAAAAAADExvY2tMaXFFdmVudAAAAAQAAAAAAAAABmFtb3VudAAAAAAACwAAAAAAAAAEZnJvbQAAABMAAAAAAAAADnRvX290aGVyX2NoYWluAAAAAAATAAAAAAAAABF0b2tlbl9vdGhlcl9jaGFpbgAAAAAAABA=",
        "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAABQAAAAAAAAAMVW5hdXRob3JpemVkAAAAAQAAAAAAAAANSW52YWxpZENvdXBvbgAAAAAAAAIAAAAAAAAADVBvb2xJc1ByaXZhdGUAAAAAAAADAAAAAAAAAA1JbnZhbGlkUGFyYW1zAAAAAAAABAAAAAAAAAAPUG9vbEluaXRpYWxpemVkAAAAAAU=" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<null>,
        release_liq: this.txFromJSON<null>,
        lock_liq: this.txFromJSON<null>,
        get_pool: this.txFromJSON<Pool>,
        set_split: this.txFromJSON<null>,
        set_admin: this.txFromJSON<null>,
        set_be: this.txFromJSON<null>,
        get_admin: this.txFromJSON<Authority>,
        set_visibility: this.txFromJSON<null>,
        set_owner: this.txFromJSON<null>,
        set_other_chain_address: this.txFromJSON<null>,
        set_fee: this.txFromJSON<null>,
        get_be: this.txFromJSON<Buffer>
  }
}