import deployer from "../contracts/deployer.ts";
import {
  BASE_FEE,
  Networks,
  TransactionBuilder,
} from "../packages/deployer/dist/index.js";
import {
  ADMIN,
  BE,
  XTAR,
  XTAR_sol,
  poolWarm,
  server,
  submit_txn,
} from "./util.ts";

describe("deployer", () => {
  const admin_pub_key = ADMIN.publicKey();
  describe("success", () => {
    it.only("init", async () => {
      const txn = await deployer.init({
        admin: {
          signer: admin_pub_key,
          fee_wallet: admin_pub_key,
        },
        be: BE,
      });

      await submit_txn(txn);
    });
    it("deploy", async () => {
      const txn = await deployer.deploy({
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
      });

      await submit_txn(txn);
    });
  });
  describe("error", () => {});
});
