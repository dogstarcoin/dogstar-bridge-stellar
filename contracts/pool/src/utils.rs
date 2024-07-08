use soroban_sdk::{panic_with_error, Address, Env, String};

use crate::{admin::get_admin, storage_types::Error};

pub fn require_admin(e: &Env, user: Address) {
    user.require_auth();
    if user.eq(&get_admin(&e).signer) {
        panic_with_error!(&e, Error::Unauthorized)
    }
}
