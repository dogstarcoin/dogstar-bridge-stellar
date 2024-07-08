import { get_client_deployer } from "../contracts/deployer.ts";
import {
  BASE_FEE,
  Networks,
  SorobanRpc,
  TransactionBuilder,
  nativeToScVal,
  xdr,
} from "../packages/deployer/dist/index.js";

import {
  ADMIN,
  BE,
  XTAR,
  XTAR_sol,
  poolWarm,
  server,
  submit_txn,
  deployer_ct,
  ADMIN_ADDRESS_VAL,
  BE_VAL,
} from "./util.ts";

describe("deployer", () => {
  const admin_pub_key = ADMIN.publicKey();

  describe("success", () => {
    it.only("init", async () => {
      const client = get_client_deployer(admin_pub_key);
      // const a = await client.get_admin();
      // console.log(await a.simulate());

      // const contractId =
      //   "CCXKY7B63BSZXQMBZXQIYPIDD6KMIQML2MA364H5PP2WCCFRHVPATNVI";
      // const key = xdr.ScVal.scvSymbol("ADMIN");
      // try {
      //   const b = await server.getContractData(
      //     deployer_ct.contractId(),
      //     key,
      //     SorobanRpc.Durability.Temporary
      //   );
      // } catch (e) {
      //   console.log(e);
      // }

      // console.log(await submit_txn(await client.get_admin(), ADMIN));
      // const b = await a.simulate();
      // const c = await submit_txn(b, ADMIN);
      // console.log(c.value());
      const txn = await client.init(
        {
          admin: { signer: admin_pub_key, fee_wallet: admin_pub_key },
          be: BE,
        },
        { simulate: false }
      );

      const c = await submit_txn(txn, ADMIN);

      const n = await client.get_admin();
      console.log(await n.simulate());

      // console.log(c);
      // const x = await server.getContractData(
      //   deployer_ct.contractId(),
      //   key,
      //   SorobanRpc.Durability.Persistent
      // );
      // console.log(x);
    });

    it("deploy", async () => {
      // const txn = await deployer.deploy({
      //   deployer: admin_pub_key,
      //   wasm_hash: poolWarm,
      //   token: XTAR,
      //   other_chain_address: XTAR_sol,
      //   fee: 5,
      //   is_public: true,
      //   split_fees: 40,
      //   owner: {
      //     signer: admin_pub_key,
      //     fee_wallet: admin_pub_key,
      //   },
      // });
      // console.log(await txn.simulate());
      // await submit_txn(txn);
    });
  });
  describe("error", () => {});
});
