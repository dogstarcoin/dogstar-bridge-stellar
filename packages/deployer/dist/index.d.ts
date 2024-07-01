/// <reference types="node" resolution-mode="require"/>
import { Buffer } from "buffer";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
} from "@stellar/stellar-sdk/contract";
import type { u32 } from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";
export declare const networks: {
  readonly standalone: {
    readonly networkPassphrase: "Standalone Network ; February 2017";
    readonly contractId: "CAM35F33APDXQ36IVOQ5OSL5VEO42V3YX2QTDXY3IGW4RV6A6SW65H57";
  };
};
export interface Authority {
  fee_wallet: string;
  signer: string;
}
export declare const Errors: {};
export interface Client {
  /**
   * Construct and simulate a deploy transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  deploy: (
    {
      deployer,
      wasm_hash,
      token,
      other_chain_address,
      fee,
      is_public,
      split_fees,
      owner,
      admin,
    }: {
      deployer: string;
      wasm_hash: Buffer;
      token: string;
      other_chain_address: string;
      fee: u32;
      is_public: boolean;
      split_fees: u32;
      owner: Authority;
      admin: Authority;
    },
    options?: {
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
    }
  ) => Promise<AssembledTransaction<readonly [string, any]>>;
}
export declare class Client extends ContractClient {
  readonly options: ContractClientOptions;
  constructor(options: ContractClientOptions);
  readonly fromJSON: {
    deploy: (json: string) => AssembledTransaction<readonly [string, any]>;
  };
}
