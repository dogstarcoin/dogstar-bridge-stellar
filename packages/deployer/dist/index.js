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
        contractId: "CCW3O3OFZHJNUIBNLZCPMTTQDVGSCBQVGNHINKI4RMDY33GWKANALVEV",
    }
};
export const Errors = {};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["AAAAAAAAAAAAAAAEaW5pdAAAAAIAAAAAAAAABWFkbWluAAAAAAAH0AAAAAlBdXRob3JpdHkAAAAAAAAAAAAAAmJlAAAAAAPuAAAAQQAAAAA=",
            "AAAAAAAAAAAAAAAGZGVwbG95AAAAAAAIAAAAAAAAAAhkZXBsb3llcgAAABMAAAAAAAAABXRva2VuAAAAAAAAEwAAAAAAAAATb3RoZXJfY2hhaW5fYWRkcmVzcwAAAAAQAAAAAAAAAANmZWUAAAAABAAAAAAAAAAJaXNfcHVibGljAAAAAAAAAQAAAAAAAAAKc3BsaXRfZmVlcwAAAAAABAAAAAAAAAAFb3duZXIAAAAAAAfQAAAACUF1dGhvcml0eQAAAAAAAAAAAAAMdG9rZW5fc3ltYm9sAAAAEAAAAAEAAAPtAAAAAgAAABMAAAAA",
            "AAAAAAAAAAAAAAAGc2V0X2JlAAAAAAACAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAGbmV3X2JlAAAAAAPuAAAAQQAAAAA=",
            "AAAAAAAAAAAAAAAGZ2V0X2JlAAAAAAAAAAAAAQAAA+4AAABB",
            "AAAAAAAAAAAAAAAJc2V0X2FkbWluAAAAAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAACW5ld19hZG1pbgAAAAAAB9AAAAAJQXV0aG9yaXR5AAAAAAAAAA==",
            "AAAAAAAAAAAAAAAJZ2V0X2FkbWluAAAAAAAAAAAAAAEAAAfQAAAACUF1dGhvcml0eQAAAA==",
            "AAAAAAAAAAAAAAAUZ2V0X2RlcGxveWVkX2FkZHJlc3MAAAABAAAAAAAAAAV0b2tlbgAAAAAAABMAAAABAAAAEw==",
            "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAAAwAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAACQmUAAAAAAAEAAAAAAAAABVBvb2xzAAAAAAAAAQAAABM=",
            "AAAAAQAAAAAAAAAAAAAACUF1dGhvcml0eQAAAAAAAAIAAAAAAAAACmZlZV93YWxsZXQAAAAAABMAAAAAAAAABnNpZ25lcgAAAAAAEw=="]), options);
        this.options = options;
    }
    fromJSON = {
        init: (this.txFromJSON),
        deploy: (this.txFromJSON),
        set_be: (this.txFromJSON),
        get_be: (this.txFromJSON),
        set_admin: (this.txFromJSON),
        get_admin: (this.txFromJSON),
        get_deployed_address: (this.txFromJSON)
    };
}
