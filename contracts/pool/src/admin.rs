use soroban_sdk::Env;

use crate::storage_types::{Authority, DataKey, RELEASE_BUMP_AMOUNT, RELEASE_LIFETIME_THRESHOLD};

pub fn has_admin(e: &Env) -> bool {
    let key = DataKey::Admin;
    e.storage().instance().has(&key)
}

pub fn get_admin(e: &Env) -> Authority {
    e.storage().instance().get(&DataKey::Admin).unwrap()
}

pub fn set_admin(e: &Env, admin: &Authority) {
    e.storage()
        .instance()
        .extend_ttl(RELEASE_LIFETIME_THRESHOLD, RELEASE_BUMP_AMOUNT);
    e.storage().instance().set(&DataKey::Admin, admin);
}
