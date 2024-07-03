#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, panic_with_error, symbol_short, vec,
    xdr::{Error, FromXdr, ToXdr},
    Address, BytesN, Env, IntoVal, Symbol, Val, Vec,
};

const ADMIN: Symbol = symbol_short!("ADMIN");
const BE: Symbol = symbol_short!("BE");

#[derive(Clone)]
#[contracttype]
pub struct Authority {
    pub signer: Address,
    pub fee_wallet: Address,
}

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

pub fn get_be(e: &Env) -> Address {
    e.storage().instance().get(&BE).unwrap()
}

pub fn set_be(e: &Env, user: &Address, new_be: &BytesN<32>) {
    require_admin(e, user);
    e.storage().instance().set(&BE, new_be);
}

pub fn get_admin(e: &Env) -> Option<Address> {
    e.storage().instance().get(&ADMIN)
}

pub fn set_admin(e: &Env, user: &Address, new_admin: &Address) {
    require_admin(e, user);
    e.storage().instance().set(&ADMIN, new_admin);
}

pub fn require_admin(e: &Env, user: &Address) {
    user.require_auth();
    if user.eq(&get_admin(&e).unwrap()) {
        panic_with_error!(&e, Error::Invalid)
    }
}

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
        let admin = get_admin(&e).unwrap();
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

    pub fn set_admin(e: Env, user: Address, new_admin: Address) {
        set_admin(&e, &user, &new_admin)
    }
}
