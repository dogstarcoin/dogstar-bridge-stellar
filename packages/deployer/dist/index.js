import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    standalone: {
        networkPassphrase: "Standalone Network ; February 2017",
        contractId: "CAM35F33APDXQ36IVOQ5OSL5VEO42V3YX2QTDXY3IGW4RV6A6SW65H57",
    }
};
export const Errors = {};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["AAAAAQAAAAAAAAAAAAAACUF1dGhvcml0eQAAAAAAAAIAAAAAAAAACmZlZV93YWxsZXQAAAAAABMAAAAAAAAABnNpZ25lcgAAAAAAEw==",
            "AAAAAAAAAAAAAAAGZGVwbG95AAAAAAAJAAAAAAAAAAhkZXBsb3llcgAAABMAAAAAAAAACXdhc21faGFzaAAAAAAAA+4AAAAgAAAAAAAAAAV0b2tlbgAAAAAAABMAAAAAAAAAE290aGVyX2NoYWluX2FkZHJlc3MAAAAAEwAAAAAAAAADZmVlAAAAAAQAAAAAAAAACWlzX3B1YmxpYwAAAAAAAAEAAAAAAAAACnNwbGl0X2ZlZXMAAAAAAAQAAAAAAAAABW93bmVyAAAAAAAH0AAAAAlBdXRob3JpdHkAAAAAAAAAAAAABWFkbWluAAAAAAAH0AAAAAlBdXRob3JpdHkAAAAAAAABAAAD7QAAAAIAAAATAAAAAA=="]), options);
        this.options = options;
    }
    fromJSON = {
        deploy: (this.txFromJSON)
    };
}
