use crate::{
    admin::{get_admin, require_admin, set_admin},
    be::{get_be, set_be},
    types::{Authority, ADMIN, BE},
};

use soroban_sdk::{
    contract, contractimpl, symbol_short, vec, xdr::FromXdr, xdr::ToXdr, Address, BytesN, Env,
    IntoVal, Val, Vec,
};

#[contract]
pub struct BridgeDeployer;

#[contractimpl]
impl BridgeDeployer {
    pub fn init(e: Env, admin: Authority, be: BytesN<32>) {
        if e.storage().instance().has(&ADMIN) {
            panic!("already initialized")
        }

        e.storage().instance().set(&ADMIN, &admin);
        e.storage().instance().set(&BE, &be);
    }

    pub fn deploy(
        e: Env,
        deployer: Address,
        wasm_hash: BytesN<32>,
        token: Address,
        other_chain_address: Address,
        fee: u32,
        is_public: bool,
        split_fees: u32,
        owner: Authority,
    ) -> (Address, Val) {
        // Skip authorization if deployer is the current contract.
        require_admin(&e, &deployer);
        let admin = get_admin(&e);
        let be = get_be(&e);
        let token_val = token.into_val(&e);

        let args: Vec<Val> = vec![
            &e,
            token_val,
            other_chain_address.into_val(&e),
            fee.into_val(&e),
            is_public.into_val(&e),
            split_fees.into_val(&e),
            owner.into_val(&e),
            admin.into_val(&e),
            be.into_val(&e),
            deployer.into_val(&e),
        ];

        // Only one pool per token
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

    pub fn set_be(e: Env, user: Address, new_be: BytesN<32>) {
        set_be(&e, &user, &new_be)
    }

    pub fn get_be(e: Env) -> BytesN<32> {
        get_be(&e)
    }

    pub fn set_admin(e: Env, user: Address, new_admin: Address) {
        set_admin(&e, &user, &new_admin)
    }

    pub fn get_admin(e: Env) -> Address {
        get_admin(&e)
    }
}
