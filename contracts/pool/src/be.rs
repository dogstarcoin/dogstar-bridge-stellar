use soroban_sdk::{BytesN, Env};

use crate::storage_types::DataKey;

pub fn set_be(e: &Env, be: &BytesN<32>) {
    e.storage().instance().set(&DataKey::BE, be);
}

pub fn get_be(e: &Env) -> BytesN<32> {
    e.storage().instance().get(&DataKey::BE).unwrap()
}
