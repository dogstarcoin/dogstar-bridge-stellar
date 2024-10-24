use soroban_sdk::{BytesN, Env};

use crate::storage_types::{DataKey, RELEASE_BUMP_AMOUNT, RELEASE_LIFETIME_THRESHOLD};

pub fn write_be(e: &Env, be: &BytesN<65>) {
    e.storage()
        .instance()
        .extend_ttl(RELEASE_LIFETIME_THRESHOLD, RELEASE_BUMP_AMOUNT);
    e.storage().instance().set(&DataKey::Be, be);
}

pub fn read_be(e: &Env) -> BytesN<65> {
    e.storage().instance().get(&DataKey::Be).unwrap()
}
