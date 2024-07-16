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
        contractId: "CBJ2LFVT3CDEJS2AL5ZAJJIPJNAQIVCAKRV3FY2IDI6EQ7IGBEFIUWRE",
    }
};
export const Errors = {
    1: { message: "" },
    2: { message: "" },
    3: { message: "" },
    4: { message: "" },
    5: { message: "" }
};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAACQAAAAAAAAAFdG9rZW4AAAAAAAATAAAAAAAAABNvdGhlcl9jaGFpbl9hZGRyZXNzAAAAABAAAAAAAAAAA2ZlZQAAAAAEAAAAAAAAAAlpc19wdWJsaWMAAAAAAAABAAAAAAAAAApzcGxpdF9mZWVzAAAAAAAEAAAAAAAAAAVvd25lcgAAAAAAB9AAAAAJQXV0aG9yaXR5AAAAAAAAAAAAAAVhZG1pbgAAAAAAB9AAAAAJQXV0aG9yaXR5AAAAAAAAAAAAAAJiZQAAAAAD7gAAACAAAAAAAAAADHRva2VuX3N5bWJvbAAAABAAAAAA",
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
            "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAABQAAAAAAAAAMVW5hdXRob3JpemVkAAAAAQAAAAAAAAANSW52YWxpZENvdXBvbgAAAAAAAAIAAAAAAAAADVBvb2xJc1ByaXZhdGUAAAAAAAADAAAAAAAAAA1JbnZhbGlkUGFyYW1zAAAAAAAABAAAAAAAAAAPUG9vbEluaXRpYWxpemVkAAAAAAU="]), options);
        this.options = options;
    }
    fromJSON = {
        initialize: (this.txFromJSON),
        release_liq: (this.txFromJSON),
        lock_liq: (this.txFromJSON),
        get_pool: (this.txFromJSON),
        set_split: (this.txFromJSON),
        set_admin: (this.txFromJSON),
        set_be: (this.txFromJSON),
        get_admin: (this.txFromJSON),
        set_visibility: (this.txFromJSON),
        set_owner: (this.txFromJSON),
        set_other_chain_address: (this.txFromJSON),
        set_fee: (this.txFromJSON),
        get_be: (this.txFromJSON)
    };
}
