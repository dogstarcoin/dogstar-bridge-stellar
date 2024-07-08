use soroban_sdk::Env;

use crate::storage_types::{Authority, DataKey};

// ADMIN
pub fn has_admin(e: &Env) -> bool {
    e.storage().instance().has(&DataKey::ADMIN)
}

pub fn get_admin(e: &Env) -> Authority {
    e.storage().instance().get(&DataKey::ADMIN).unwrap()
}

pub fn set_admin(e: &Env, admin: &Authority) {
    e.storage().instance().set(&DataKey::ADMIN, admin);
}
