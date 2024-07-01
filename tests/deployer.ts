import deployer from "../contracts/deployer.ts";
import { ADMIN, poolWarm, submit_txn } from "./util.ts";

describe("deployer", () => {
  describe("success", () => {
    it("deploy", async () => {
      const admin_pub_key = ADMIN.publicKey();
      const txn = await deployer.deploy({
        deployer: admin_pub_key,
        wasm_hash: poolWarm,
        token: "",
        other_chain_address: "",
        fee: 0.5,
        is_public: true,
        split_fees: 0.4,
        owner: {
          signer: admin_pub_key,
          fee_wallet: admin_pub_key,
        },
        admin: {
          signer: admin_pub_key,
          fee_wallet: admin_pub_key,
        },
      });

      await submit_txn(txn);
    });
  });
  describe("error", () => {});
});
