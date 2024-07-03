use soroban_sdk::Env;

use crate::storage_types::{DataKey, Pool};

pub fn get_pool(e: &Env) -> Pool {
    e.storage().instance().get(&DataKey::POOL).unwrap()
}
pub fn set_pool(e: &Env, pool: &Pool) {
    e.storage().instance().set(&DataKey::POOL, pool);
}
