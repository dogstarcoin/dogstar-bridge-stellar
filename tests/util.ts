import {
  Contract,
  Keypair,
  SorobanRpc,
  networks as deployerNet,
} from "../packages/deployer/dist/index.js";
import { networks as poolNet } from "../packages/pool/dist/index.js";

import { readFileSync } from "fs";

export const ADMIN = Keypair.fromSecret(process.env.ADMIN_PRIV_KEY);
export const OWNER = Keypair.fromSecret(process.env.OWNER_PRIV_KEY);
export const USER = Keypair.fromSecret(process.env.USER_PRIV_KEY);

export const server = new SorobanRpc.Server(process.env.PUBLIC_SOROBAN_RPC_URL);

export const deployer = new Contract(deployerNet.standalone.contractId);
export const pool = new Contract(poolNet.standalone.contractId);

export const poolWarm = readFileSync(
  "../target/wasm32-unknown-unknown/release/pool.wasm"
);

export const submit_txn = async (txn: any) => {
  const preparedTxn = await server.prepareTransaction(txn);
  preparedTxn.sign(ADMIN);
  try {
    let sendResponse = await server.sendTransaction(preparedTxn);
    console.log(`Sent transaction: ${JSON.stringify(sendResponse)}`);

    if (sendResponse.status === "PENDING") {
      let getResponse = await server.getTransaction(sendResponse.hash);
      // Poll `getTransaction` until the status is not "NOT_FOUND"
      while (getResponse.status === "NOT_FOUND") {
        console.log("Waiting for transaction confirmation...");
        // See if the transaction is complete
        getResponse = await server.getTransaction(sendResponse.hash);
        // Wait one second
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      console.log(`getTransaction response: ${JSON.stringify(getResponse)}`);

      if (getResponse.status === "SUCCESS") {
        // Make sure the transaction's resultMetaXDR is not empty
        if (!getResponse.resultMetaXdr) {
          throw "Empty resultMetaXDR in getTransaction response";
        }
        // Find the return value from the contract and return it
        let transactionMeta = getResponse.resultMetaXdr;
        let returnValue = transactionMeta.v3().sorobanMeta().returnValue();
        console.log(`Transaction result: ${returnValue.value()}`);
      } else {
        throw `Transaction failed: ${getResponse.resultXdr}`;
      }
    } else {
      throw sendResponse.errorResult;
    }
  } catch (err) {
    // Catch and report any errors we've thrown
    console.log("Sending transaction failed");
    console.log(JSON.stringify(err));
  }
};
