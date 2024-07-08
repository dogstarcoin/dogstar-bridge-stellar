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
        contractId: "CCWIP3U6LQQDWXAM54QYUTAMN64YSJINJOYOZRUGBFPQJGVMV6J3QZGG",
    }
};
export const Errors = {};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["AAAAAAAAAAAAAAAEaW5pdAAAAAIAAAAAAAAABWFkbWluAAAAAAAH0AAAAAlBdXRob3JpdHkAAAAAAAAAAAAAAmJlAAAAAAPuAAAAIAAAAAA=",
            "AAAAAAAAAAAAAAAGZGVwbG95AAAAAAAIAAAAAAAAAAhkZXBsb3llcgAAABMAAAAAAAAACXdhc21faGFzaAAAAAAAA+4AAAAgAAAAAAAAAAV0b2tlbgAAAAAAABMAAAAAAAAAE290aGVyX2NoYWluX2FkZHJlc3MAAAAAEwAAAAAAAAADZmVlAAAAAAQAAAAAAAAACWlzX3B1YmxpYwAAAAAAAAEAAAAAAAAACnNwbGl0X2ZlZXMAAAAAAAQAAAAAAAAABW93bmVyAAAAAAAH0AAAAAlBdXRob3JpdHkAAAAAAAABAAAD7QAAAAIAAAATAAAAAA==",
            "AAAAAAAAAAAAAAAGc2V0X2JlAAAAAAACAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAGbmV3X2JlAAAAAAPuAAAAIAAAAAA=",
            "AAAAAAAAAAAAAAAGZ2V0X2JlAAAAAAAAAAAAAQAAA+4AAAAg",
            "AAAAAAAAAAAAAAAJc2V0X2FkbWluAAAAAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAACW5ld19hZG1pbgAAAAAAABMAAAAA",
            "AAAAAAAAAAAAAAAJZ2V0X2FkbWluAAAAAAAAAAAAAAEAAAAT",
            "AAAAAQAAAAAAAAAAAAAACUF1dGhvcml0eQAAAAAAAAIAAAAAAAAACmZlZV93YWxsZXQAAAAAABMAAAAAAAAABnNpZ25lcgAAAAAAEw=="]), options);
        this.options = options;
    }
    fromJSON = {
        init: (this.txFromJSON),
        deploy: (this.txFromJSON),
        set_be: (this.txFromJSON),
        get_be: (this.txFromJSON),
        set_admin: (this.txFromJSON),
        get_admin: (this.txFromJSON)
    };
}
