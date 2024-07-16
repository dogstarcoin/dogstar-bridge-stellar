use soroban_sdk::Env;

use crate::storage_types::{Authority, DataKey};

pub fn get_owner(e: &Env) -> Authority {
    e.storage().instance().get(&DataKey::Owner).unwrap()
}

pub fn set_owner(e: &Env, admin: &Authority) {
    e.storage().instance().set(&DataKey::Owner, admin);
}

pub fn require_owner(e: &Env) {
    let owner = get_owner(&e).signer;
    owner.require_auth();
}
