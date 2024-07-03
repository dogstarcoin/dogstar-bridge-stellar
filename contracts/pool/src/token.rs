use soroban_sdk::{token, Address, Env};

use crate::pool::get_pool;

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
