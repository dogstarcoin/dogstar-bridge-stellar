use soroban_sdk::{Address, BytesN, Env};

use crate::{admin::require_admin, types::BE};

pub fn get_be(e: &Env) -> BytesN<32> {
    e.storage().instance().get(&BE).unwrap()
}

pub fn set_be(e: &Env, user: &Address, new_be: &BytesN<32>) {
    require_admin(e, user);
    e.storage().instance().set(&BE, new_be);
}
