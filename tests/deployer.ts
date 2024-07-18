import { get_client_deployer } from "../contracts/deployer.ts";

import { ADMIN, BE, submit_txn, USER } from "./utils/index.ts";
import { get_client_soroban_token_contract } from "../contracts/soroban_token_contract.ts";

describe("deployer", () => {
  const admin_pub_key = ADMIN.publicKey();
  const user_pub_key = USER.publicKey();

  describe("success", () => {
    it("init", async () => {
      const deployer = get_client_deployer(admin_pub_key);
      const txn_deployer = await deployer.init(
        {
          admin: { signer: admin_pub_key, fee_wallet: user_pub_key },
          be: BE,
        },
        { simulate: false }
      );

      await submit_txn(txn_deployer, ADMIN);

      const token = get_client_soroban_token_contract(admin_pub_key);
      const txn_token = await token.initialize(
        {
          admin: admin_pub_key,
          decimal: 9,
          name: "xtar",
          symbol: "xtar",
        },
        { simulate: false }
      );

      await submit_txn(txn_token, ADMIN);

      const txn_mint = await token.mint(
        {
          to: admin_pub_key,
          amount: BigInt(10000),
        },
        { simulate: false }
      );

      await submit_txn(txn_mint, ADMIN);
    });
  });
});
