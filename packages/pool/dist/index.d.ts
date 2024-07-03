/// <reference types="node" resolution-mode="require"/>
import { Buffer } from "buffer";
import { AssembledTransaction, Client as ContractClient, ClientOptions as ContractClientOptions } from '@stellar/stellar-sdk/contract';
import type { u32, u64, i128 } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
export declare const networks: {
    readonly standalone: {
        readonly networkPassphrase: "Standalone Network ; February 2017";
        readonly contractId: "CDIQPCLXZFSW5AF62BUQA3H5CI5SMBGLBFPG5NLNGZ73PUISJERA7Q6W";
    };
};
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
export declare const Errors: {
    1: {
        message: string;
    };
    2: {
        message: string;
    };
    3: {
        message: string;
    };
    4: {
        message: string;
    };
    5: {
        message: string;
    };
};
export interface Client {
    /**
     * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    initialize: ({ token, other_chain_address, fee, is_public, split_fees, owner, admin, be }: {
        token: string;
        other_chain_address: string;
        fee: u32;
        is_public: boolean;
        split_fees: u32;
        owner: Authority;
        admin: Authority;
        be: Buffer;
    }, options?: {
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
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a release_liq transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    release_liq: ({ coupon_payload, payload }: {
        coupon_payload: CouponPayload;
        payload: ReleaseLiqPayload;
    }, options?: {
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
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a lock_liq transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    lock_liq: ({ user, amount, from, to_other_chain }: {
        user: string;
        amount: i128;
        from: string;
        to_other_chain: string;
    }, options?: {
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
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a update_split transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    update_split: ({ user, split_fees }: {
        user: string;
        split_fees: u32;
    }, options?: {
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
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a update_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    update_admin: ({ user, admin }: {
        user: string;
        admin: Authority;
    }, options?: {
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
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a update_be transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    update_be: ({ user, be }: {
        user: string;
        be: Buffer;
    }, options?: {
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
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a update_visibility transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    update_visibility: ({ user, is_public }: {
        user: string;
        is_public: boolean;
    }, options?: {
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
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a update_owner transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    update_owner: ({ user, owner }: {
        user: string;
        owner: Authority;
    }, options?: {
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
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a update_other_chain_address transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    update_other_chain_address: ({ user, other_chain_address }: {
        user: string;
        other_chain_address: string;
    }, options?: {
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
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a update_fee transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    update_fee: ({ user, fee }: {
        user: string;
        fee: u32;
    }, options?: {
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
    }) => Promise<AssembledTransaction<null>>;
}
export declare class Client extends ContractClient {
    readonly options: ContractClientOptions;
    constructor(options: ContractClientOptions);
    readonly fromJSON: {
        initialize: (json: string) => AssembledTransaction<null>;
        release_liq: (json: string) => AssembledTransaction<null>;
        lock_liq: (json: string) => AssembledTransaction<null>;
        update_split: (json: string) => AssembledTransaction<null>;
        update_admin: (json: string) => AssembledTransaction<null>;
        update_be: (json: string) => AssembledTransaction<null>;
        update_visibility: (json: string) => AssembledTransaction<null>;
        update_owner: (json: string) => AssembledTransaction<null>;
        update_other_chain_address: (json: string) => AssembledTransaction<null>;
        update_fee: (json: string) => AssembledTransaction<null>;
    };
}
