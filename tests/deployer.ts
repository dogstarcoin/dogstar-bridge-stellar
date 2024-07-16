import { expect } from "chai";
import { get_client_deployer } from "../contracts/deployer.ts";

import {
  ADMIN,
  BE,
  poolWarm,
  scValToAuthority,
  submit_txn,
  USER,
  XTAR,
  XTAR_sol,
} from "./utils/index.ts";
import { scValToNative } from "../packages/deployer/dist/index.js";

describe("deployer", () => {
  const admin_pub_key = ADMIN.publicKey();
  const user_pub_key = USER.publicKey();

  describe("success", () => {
    it("init", async () => {
      const client = get_client_deployer(admin_pub_key);

      const txn = await client.init(
        {
          admin: { signer: admin_pub_key, fee_wallet: user_pub_key },
          be: BE,
        },
        { simulate: false }
      );

      await submit_txn(txn, ADMIN);

      const get_admin = await client.get_admin();
      const result_get_admin = await submit_txn(get_admin, ADMIN);
      const authority = scValToAuthority(result_get_admin);

      const get_be = await client.get_be();
      const result_get_be = await submit_txn(get_be, ADMIN);

      expect(authority.signer).eq(admin_pub_key);
      expect(authority.fee_wallet).eq(user_pub_key);
      expect(scValToNative(result_get_be)).eq(BE);
    });

    it("deploy", async () => {
      const client = get_client_deployer(admin_pub_key);
      const txn = await client.deploy({
        deployer: admin_pub_key,
        wasm_hash: poolWarm,
        token: XTAR,
        other_chain_address: XTAR_sol,
        fee: 5,
        is_public: true,
        split_fees: 40,
        owner: {
          signer: admin_pub_key,
          fee_wallet: admin_pub_key,
        },
        token_symbol: "xtar",
      });

      try {
        const result = await txn.simulate();

        console.log("Simulation result:", result);
      } catch (error) {
        console.log(error.simulation.events);
      }
    });
  });
  describe("error", () => {});
});
