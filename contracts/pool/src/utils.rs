use soroban_sdk::{panic_with_error, Address, Env, String};

use crate::{admin::get_admin, storage_types::Error};

pub fn require_admin(e: &Env, user: Address) {
    user.require_auth();
    if user.eq(&get_admin(&e).signer) {
        panic_with_error!(&e, Error::Unauthorized)
    }
}

pub fn get_deployer_contractid(e: &Env) -> Address {
    Address::from_string(&String::from_str(
        &e,
        "CBRQZH3JEFDYW44NBDLXDILKTZFY7OICZYRPECJ2KVWL4ZT4AXDKJ2DD",
    ))
}
