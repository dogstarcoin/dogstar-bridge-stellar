use soroban_sdk::{token, Address, Env, String};

use crate::state::{Pool, POOL};

pub fn transfer(e: &Env, to: &Address, from: &Address, amount: &i128) {
    let pool = get_pool(e);
    let client = token::Client::new(e, &pool.token);
    client.transfer(from, to, amount);
}

pub fn get_pool(e: &Env) -> Pool {
    e.storage().instance().get(&POOL).unwrap()
}

pub fn transfer_in(e: &Env, from: &Address, amount: &i128) {
    transfer(e, &e.current_contract_address(), &from, amount)
}
pub fn transfer_out(e: &Env, to: &Address, amount: &i128) {
    transfer(e, &to, &e.current_contract_address(), amount)
}

pub fn get_admin(e: &Env) -> Address {
    Address::from_string(&String::from_str(
        e,
        "GCHBASWTKBZUEW72DEDVROMZD2R3NCKV4FVTJVJUEMUJIFEU7DGM3WDA",
    ))
}
