#![no_std]

use soroban_sdk::{
    contract, contractimpl, symbol_short, vec,
    xdr::{FromXdr, ToXdr},
    Address, BytesN, Env, IntoVal, Symbol, Val, Vec,
};

#[contract]
pub struct BridgeDeployer;

pub trait BridgeDeployerTrait {
    fn deploy(
        e: Env,
        deployer: Address,
        wasm_hash: BytesN<32>,
        salt: BytesN<32>,
        init_fn: Symbol,
        init_args: Vec<Val>,
    );
}

#[contractimpl]
impl BridgeDeployer {
    pub fn deploy(
        e: Env,
        deployer: Address,
        wasm_hash: BytesN<32>,
        token: Address,
        other_chain_address: Address,
        fee: u32,
    ) -> (Address, Val) {
        // Skip authorization if deployer is the current contract.
        if deployer != e.current_contract_address() {
            deployer.require_auth();
        }

        let token_val = token.into_val(&e);

        let args: Vec<Val> = vec![
            &e,
            token_val,
            other_chain_address.into_val(&e),
            fee.into_val(&e),
        ];

        // Only one pool for token
        let salt: BytesN<32> = BytesN::from_xdr(&e, &token.to_xdr(&e)).unwrap();

        // Deploy the contract using the uploaded Wasm with given hash.
        let deployed_address = e.deployer().with_address(deployer, salt).deploy(wasm_hash);

        // Invoke the init function with the given arguments.
        let res: Val = e.invoke_contract(&deployed_address, &symbol_short!("init"), args);

        // Map token with his pool address
        e.storage().instance().set(&token_val, &deployed_address);

        // Return the contract ID of the deployed contract and the result of
        // invoking the init result.
        (deployed_address, res)
    }
}
