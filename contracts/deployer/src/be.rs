use soroban_sdk::{Address, Env, String};

use crate::{admin::require_admin, types::DataKey};

pub fn get_be(e: &Env) -> String {
    e.storage().instance().get(&DataKey::Be).unwrap()
}

pub fn set_be(e: &Env, user: &Address, new_be: &String) {
    require_admin(e, user);
    e.storage().instance().set(&DataKey::Be, new_be);
}
