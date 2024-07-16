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
        contractId: "CAEZJPIV5CKQTA3EDRWRYJVNN3PGCHZ72O4BWXNKNSZ46RA2R5V6ZAVD",
    }
};
export const Errors = {};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["AAAAAAAAAAAAAAAEaW5pdAAAAAIAAAAAAAAABWFkbWluAAAAAAAH0AAAAAlBdXRob3JpdHkAAAAAAAAAAAAAAmJlAAAAAAAQAAAAAA==",
            "AAAAAAAAAAAAAAAGZGVwbG95AAAAAAAJAAAAAAAAAAhkZXBsb3llcgAAABMAAAAAAAAACXdhc21faGFzaAAAAAAAA+4AAAAgAAAAAAAAAAV0b2tlbgAAAAAAABMAAAAAAAAAE290aGVyX2NoYWluX2FkZHJlc3MAAAAAEAAAAAAAAAADZmVlAAAAAAQAAAAAAAAACWlzX3B1YmxpYwAAAAAAAAEAAAAAAAAACnNwbGl0X2ZlZXMAAAAAAAQAAAAAAAAABW93bmVyAAAAAAAH0AAAAAlBdXRob3JpdHkAAAAAAAAAAAAADHRva2VuX3N5bWJvbAAAABAAAAABAAAAEw==",
            "AAAAAAAAAAAAAAAGc2V0X2JlAAAAAAACAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAGbmV3X2JlAAAAAAAQAAAAAA==",
            "AAAAAAAAAAAAAAAGZ2V0X2JlAAAAAAAAAAAAAQAAABA=",
            "AAAAAAAAAAAAAAAJc2V0X2FkbWluAAAAAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAACW5ld19hZG1pbgAAAAAAB9AAAAAJQXV0aG9yaXR5AAAAAAAAAA==",
            "AAAAAAAAAAAAAAAJZ2V0X2FkbWluAAAAAAAAAAAAAAEAAAfQAAAACUF1dGhvcml0eQAAAA==",
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
