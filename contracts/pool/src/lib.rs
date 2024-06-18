#![no_std]

use coupon::{Coupon, CouponPayload};
use soroban_sdk::{contract, contractimpl, symbol_short, xdr::ToXdr, Address, Env};
use state::{LockLiqEvent, Pool, ReleaseLiqPayload, POOL};
use utils::{get_admin, get_pool, transfer, transfer_in, transfer_out};
pub mod coupon;
pub mod errors;
pub mod state;
pub mod utils;

#[contract]
pub struct BridgePool;

pub trait BridgePoolTrait {
    fn initialize(e: Env);
    fn lock_liq(e: Env, to: Address, from: Address);
    fn release_liq(e: Env);
    // TODO
    fn update_fee(e: Env, fee: u32);
    fn update_admin_wallet(e: Env, fee: u32);
    fn update_other_chain_address(e: Env, fee: u32);
}

#[contractimpl]
impl BridgePool {
    pub fn init(e: Env, token: Address, other_chain_address: Address, fee: u32) {
        let pool = Pool {
            token: token,
            other_chain_address: other_chain_address,
            fee: fee,
            last_release: 0,
        };
        e.storage().instance().set(&POOL, &pool)
    }

    pub fn release_liq(e: Env, coupon_payload: CouponPayload, payload: ReleaseLiqPayload) {
        // Validate Coupon
        let coupon = Coupon::new(&e, coupon_payload);
        let mut serialized_payload = [0u8];

        payload
            .clone()
            .to_xdr(&e)
            .copy_into_slice(&mut serialized_payload);

        coupon.verify(&serialized_payload).unwrap();

        transfer_out(&e, &payload.to, &payload.amount);
    }

    pub fn lock_liq(e: Env, amount: i128, from: Address, to_other_chain: Address) {
        let pool = get_pool(&e);
        let as_fee = amount.checked_mul(pool.fee.into()).unwrap();
        let to_receive = amount.checked_sub(as_fee).unwrap();

        transfer_in(&e, &from, &to_receive);
        transfer(&e, &&get_admin(&e), &from, &as_fee);

        e.events().publish(
            (symbol_short!("locked"),),
            LockLiqEvent {
                amount: amount,
                from: from,
                token_other_chain: pool.other_chain_address,
                to_other_chain,
            },
        );
    }
}
