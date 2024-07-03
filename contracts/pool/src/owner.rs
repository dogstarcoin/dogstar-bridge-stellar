use soroban_sdk::{panic_with_error, Address, Env};

use crate::storage_types::{Authority, DataKey, Error};

pub fn get_owner(e: &Env) -> Authority {
    e.storage().instance().get(&DataKey::OWNER).unwrap()
}

pub fn set_owner(e: &Env, admin: &Authority) {
    e.storage().instance().set(&DataKey::OWNER, admin);
}

pub fn require_owner(e: &Env, user: Address) {
    user.require_auth();
    if user.eq(&get_owner(&e).signer) {
        panic_with_error!(&e, Error::Unauthorized)
    }
}
