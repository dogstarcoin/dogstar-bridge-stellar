#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, token, xdr::ToXdr, Address, ConversionError, Env, String,
    TryFromVal, Val,
};
use utils::Coupon;
pub mod utils;

pub trait BridgeTrait {
    fn initialize(e: Env);
    fn lock_liq(e: Env, to: Address, from: Address);
    fn release_liq(e: Env);
}

#[derive(Clone, Copy)]
#[repr(u32)]
pub enum DataKey {
    Pool = 0,
}

#[derive(Clone)]
#[contracttype]
pub struct Pool {
    token: Address,
    other_chain_address: Address,
    // 0.5 == 5%
    fee: u32,
    last_release: u64,
}

impl TryFromVal<Env, DataKey> for Val {
    type Error = ConversionError;

    fn try_from_val(_env: &Env, v: &DataKey) -> Result<Self, Self::Error> {
        Ok((*v as u32).into())
    }
}

#[contract]
pub struct DogstarBridge;

pub fn get_pool(e: &Env) -> Pool {
    e.storage()
        .instance()
        .get::<DataKey, Pool>(&DataKey::Pool)
        .unwrap()
}

pub fn transfer_in(e: &Env, from: &Address, amount: &i128) {
    transfer(e, &e.current_contract_address(), &from, amount)
}
pub fn transfer_out(e: &Env, to: &Address, amount: &i128) {
    transfer(e, &to, &e.current_contract_address(), amount)
}

pub fn transfer(e: &Env, to: &Address, from: &Address, amount: &i128) {
    let pool = get_pool(e);
    let client = token::Client::new(e, &pool.token);
    client.transfer(from, to, amount);
}

#[contractimpl]
impl DogstarBridge {
    pub fn initialize(e: Env, token: Address, other_chain_address: Address, fee: u32) {
        let pool = Pool {
            token: token,
            other_chain_address: other_chain_address,
            fee: fee,
            last_release: 0,
        };
        e.storage().instance().set(&DataKey::Pool, &pool)
    }

    pub fn release_liq(e: Env, recovery_id: u32, signature: String, amount: i128, to: Address) {
        // Validate Coupon
        let coupon = Coupon::new(e, recovery_id, signature);

        coupon.verify(serialized_data);

        transfer_out(&e, &to, &amount);
        // Event
    }

    pub fn lock_liq(e: Env, amount: i128, from: Address) {
        let pool = get_pool(&e);
        let as_fee = amount.checked_mul(pool.fee.into()).unwrap();
        let to_receive = amount.checked_sub(as_fee).unwrap();

        transfer_in(&e, &from, &to_receive);
        // send fee to admin
        // event
    }
}

mod test;
