use soroban_sdk::{Address, Env};

use crate::types::ADMIN;

pub fn get_admin(e: &Env) -> Address {
    e.storage().instance().get(&ADMIN).unwrap()
}

pub fn set_admin(e: &Env, user: &Address, new_admin: &Address) {
    require_admin(e, user);
    e.storage().instance().set(&ADMIN, new_admin);
}

pub fn require_admin(e: &Env, user: &Address) {
    user.require_auth();
    if user.eq(&get_admin(&e)) {
        panic!("admin required")
    }
}
