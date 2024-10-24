use soroban_sdk::Env;

use crate::storage_types::{DataKey, Pool, RELEASE_BUMP_AMOUNT, RELEASE_LIFETIME_THRESHOLD};

pub fn get_pool(e: &Env) -> Pool {
    e.storage()
        .instance()
        .extend_ttl(RELEASE_LIFETIME_THRESHOLD, RELEASE_BUMP_AMOUNT);
    e.storage().instance().get(&DataKey::Pool).unwrap()
}
pub fn set_pool(e: &Env, pool: &Pool) {
    e.storage().instance().set(&DataKey::Pool, pool);
}
