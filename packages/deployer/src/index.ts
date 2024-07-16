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
    contractId: "CAEZJPIV5CKQTA3EDRWRYJVNN3PGCHZ72O4BWXNKNSZ46RA2R5V6ZAVD",
  }
} as const


export interface Authority {
  fee_wallet: string;
  signer: string;
}

export const Errors = {
  
}

export interface Client {
  /**
   * Construct and simulate a init transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  init: ({admin, be}: {admin: Authority, be: string}, options?: {
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
   * Construct and simulate a deploy transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  deploy: ({deployer, wasm_hash, token, other_chain_address, fee, is_public, split_fees, owner, token_symbol}: {deployer: string, wasm_hash: Buffer, token: string, other_chain_address: string, fee: u32, is_public: boolean, split_fees: u32, owner: Authority, token_symbol: string}, options?: {
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
  }) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a set_be transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_be: ({user, new_be}: {user: string, new_be: string}, options?: {
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
  }) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a set_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_admin: ({user, new_admin}: {user: string, new_admin: Authority}, options?: {
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

}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAAAAAAAAAAAEaW5pdAAAAAIAAAAAAAAABWFkbWluAAAAAAAH0AAAAAlBdXRob3JpdHkAAAAAAAAAAAAAAmJlAAAAAAAQAAAAAA==",
        "AAAAAAAAAAAAAAAGZGVwbG95AAAAAAAJAAAAAAAAAAhkZXBsb3llcgAAABMAAAAAAAAACXdhc21faGFzaAAAAAAAA+4AAAAgAAAAAAAAAAV0b2tlbgAAAAAAABMAAAAAAAAAE290aGVyX2NoYWluX2FkZHJlc3MAAAAAEAAAAAAAAAADZmVlAAAAAAQAAAAAAAAACWlzX3B1YmxpYwAAAAAAAAEAAAAAAAAACnNwbGl0X2ZlZXMAAAAAAAQAAAAAAAAABW93bmVyAAAAAAAH0AAAAAlBdXRob3JpdHkAAAAAAAAAAAAADHRva2VuX3N5bWJvbAAAABAAAAABAAAAEw==",
        "AAAAAAAAAAAAAAAGc2V0X2JlAAAAAAACAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAGbmV3X2JlAAAAAAAQAAAAAA==",
        "AAAAAAAAAAAAAAAGZ2V0X2JlAAAAAAAAAAAAAQAAABA=",
        "AAAAAAAAAAAAAAAJc2V0X2FkbWluAAAAAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAACW5ld19hZG1pbgAAAAAAB9AAAAAJQXV0aG9yaXR5AAAAAAAAAA==",
        "AAAAAAAAAAAAAAAJZ2V0X2FkbWluAAAAAAAAAAAAAAEAAAfQAAAACUF1dGhvcml0eQAAAA==",
        "AAAAAQAAAAAAAAAAAAAACUF1dGhvcml0eQAAAAAAAAIAAAAAAAAACmZlZV93YWxsZXQAAAAAABMAAAAAAAAABnNpZ25lcgAAAAAAEw==" ]),
      options
    )
  }
  public readonly fromJSON = {
    init: this.txFromJSON<null>,
        deploy: this.txFromJSON<string>,
        set_be: this.txFromJSON<null>,
        get_be: this.txFromJSON<string>,
        set_admin: this.txFromJSON<null>,
        get_admin: this.txFromJSON<Authority>
  }
}