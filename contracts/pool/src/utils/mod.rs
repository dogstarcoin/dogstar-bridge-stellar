use soroban_sdk::{panic_with_error, token, Address, BytesN, Env};

use crate::state::{Authority, DataKey, Error, Pool};

// POOL
pub fn get_pool(e: &Env) -> Pool {
    e.storage().instance().get(&DataKey::POOL).unwrap()
}
pub fn set_pool(e: &Env, pool: &Pool) {
    e.storage().instance().set(&DataKey::POOL, pool);
}

// TRANSFERS
pub fn transfer(e: &Env, to: &Address, from: &Address, amount: &i128) {
    let pool = get_pool(e);
    let client = token::Client::new(e, &pool.token);
    client.transfer(from, to, amount);
}
pub fn transfer_in(e: &Env, from: &Address, amount: &i128) {
    transfer(e, &e.current_contract_address(), &from, amount)
}
pub fn transfer_out(e: &Env, to: &Address, amount: &i128) {
    transfer(e, &to, &e.current_contract_address(), amount)
}

// ADMIN
pub fn get_admin(e: &Env) -> Authority {
    e.storage().instance().get(&DataKey::ADMIN).unwrap()
}

pub fn set_admin(e: &Env, admin: &Authority) {
    e.storage().instance().set(&DataKey::ADMIN, admin);
}

pub fn require_admin(e: &Env, user: Address) {
    user.require_auth();
    if user.eq(&get_admin(&e).signer) {
        panic_with_error!(&e, Error::Unauthorized)
    }
}

// OWNER
pub fn get_owner(e: &Env) -> Authority {
    e.storage().instance().get(&DataKey::OWNER).unwrap()
}

pub fn set_owner(e: &Env, admin: &Authority) {
    e.storage().instance().set(&DataKey::OWNER, admin);
}

pub fn require_owner(e: &Env, user: Address) {
    user.require_auth();
    if user.eq(&get_owner(&e).signer) {
        panic_with_error!(&e, Error::Unauthorized)
    }
}

//BE

pub fn set_be(e: &Env, be: &BytesN<65>) {
    e.storage().instance().set(&DataKey::BE, be);
}

pub fn get_be(e: &Env) -> BytesN<65> {
    e.storage().instance().get(&DataKey::BE).unwrap()
}
