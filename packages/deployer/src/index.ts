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
    contractId: "CAM35F33APDXQ36IVOQ5OSL5VEO42V3YX2QTDXY3IGW4RV6A6SW65H57",
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
   * Construct and simulate a deploy transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  deploy: ({deployer, wasm_hash, token, other_chain_address, fee, is_public, split_fees, owner, admin}: {deployer: string, wasm_hash: Buffer, token: string, other_chain_address: string, fee: u32, is_public: boolean, split_fees: u32, owner: Authority, admin: Authority}, options?: {
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
  }) => Promise<AssembledTransaction<readonly [string, any]>>

}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAQAAAAAAAAAAAAAACUF1dGhvcml0eQAAAAAAAAIAAAAAAAAACmZlZV93YWxsZXQAAAAAABMAAAAAAAAABnNpZ25lcgAAAAAAEw==",
        "AAAAAAAAAAAAAAAGZGVwbG95AAAAAAAJAAAAAAAAAAhkZXBsb3llcgAAABMAAAAAAAAACXdhc21faGFzaAAAAAAAA+4AAAAgAAAAAAAAAAV0b2tlbgAAAAAAABMAAAAAAAAAE290aGVyX2NoYWluX2FkZHJlc3MAAAAAEwAAAAAAAAADZmVlAAAAAAQAAAAAAAAACWlzX3B1YmxpYwAAAAAAAAEAAAAAAAAACnNwbGl0X2ZlZXMAAAAAAAQAAAAAAAAABW93bmVyAAAAAAAH0AAAAAlBdXRob3JpdHkAAAAAAAAAAAAABWFkbWluAAAAAAAH0AAAAAlBdXRob3JpdHkAAAAAAAABAAAD7QAAAAIAAAATAAAAAA==" ]),
      options
    )
  }
  public readonly fromJSON = {
    deploy: this.txFromJSON<readonly [string, any]>
  }
}