use soroban_sdk::{contract, contractimpl, panic_with_error, symbol_short, Address, BytesN, Env};

use crate::{
    admin::{get_admin, has_admin, set_admin},
    be::set_be,
    coupons::{Coupon, CouponPayload},
    owner::{get_owner, require_owner, set_owner},
    pool::{get_pool, set_pool},
    storage_types::{Authority, DataKey, Error, LockLiqEvent, Pool, ReleaseLiqPayload, ADMIN},
    token::{transfer, transfer_in, transfer_out},
    utils::require_admin,
};

fn check_nonnegative_amount(amount: i128) {
    if amount < 0 {
        panic!("negative amount is not allowed: {}", amount)
    }
}

fn check_fee(fee: u32) {
    if fee > 100 {
        panic!("fee must be between 0 and 100 {}", fee)
    }
}

#[contract]
pub struct BridgePool;

#[contractimpl]
impl BridgePool {
    pub fn initialize(
        e: Env,
        token: Address,
        other_chain_address: Address,
        fee: u32,
        is_public: bool,
        split_fees: u32,
        owner: Authority,
        admin: Authority,
        be: BytesN<32>,
    ) {
        if has_admin(&e) {
            !panic!("already initialized")
        }

        check_fee(split_fees);
        check_fee(fee);

        let pool = Pool {
            token,
            other_chain_address,
            fee,
            split_fees,
            is_public,
            last_release: 0,
        };

        set_pool(&e, &pool);
        set_admin(&e, &admin);
        set_owner(&e, &owner);
        set_be(&e, &be);
    }

    pub fn release_liq(e: Env, coupon_payload: CouponPayload, payload: ReleaseLiqPayload) {
        let coupon = Coupon::new::<ReleaseLiqPayload>(&e, coupon_payload, &payload);

        coupon.verify(&e).unwrap();

        transfer_out(&e, &payload.to, &payload.amount);
    }

    pub fn lock_liq(e: Env, user: Address, amount: i128, from: Address, to_other_chain: Address) {
        user.require_auth();
        check_nonnegative_amount(amount);

        let pool = get_pool(&e);
        let owner = get_owner(&e);
        let admin = get_admin(&e);

        if !pool.is_public && user.ne(&owner.signer) {
            panic_with_error!(&e, Error::Unauthorized)
        }

        let fee: i128 = pool.fee.checked_div(100).unwrap().into();
        let as_fee = amount.checked_mul(fee).unwrap();
        let to_receive = amount.checked_sub(as_fee).unwrap();

        let one: i128 = 1;
        let admin_fee_share: i128 = pool.split_fees.checked_div(100).unwrap().into();
        let owner_fee_share: i128 = one.checked_sub(admin_fee_share).unwrap();
        let amount_to_admin = as_fee.checked_mul(admin_fee_share).unwrap();
        let amount_to_owner = as_fee.checked_mul(owner_fee_share).unwrap();

        transfer_in(&e, &from, &to_receive);
        transfer(&e, &admin.fee_wallet, &from, &amount_to_admin);
        transfer(&e, &owner.fee_wallet, &from, &amount_to_owner);

        e.events().publish(
            (symbol_short!("locked"),),
            LockLiqEvent {
                amount: to_receive,
                from: from,
                token_other_chain: pool.other_chain_address,
                to_other_chain,
            },
        );
    }

    // ADMIN
    pub fn update_split(e: Env, user: Address, split_fees: u32) {
        check_fee(split_fees);
        require_admin(&e, user);

        let mut pool = get_pool(&e);
        pool.split_fees = split_fees;
        set_pool(&e, &pool);
    }

    pub fn update_admin(e: Env, user: Address, admin: Authority) {
        require_admin(&e, user);

        set_admin(&e, &admin);
    }

    pub fn update_be(e: Env, user: Address, be: BytesN<32>) {
        require_admin(&e, user);

        set_be(&e, &be);
    }

    // OWNER
    pub fn update_visibility(e: Env, user: Address, is_public: bool) {
        require_owner(&e, user);

        let mut pool = get_pool(&e);
        pool.is_public = is_public;
        set_pool(&e, &pool);
    }

    pub fn update_owner(e: Env, user: Address, owner: Authority) {
        require_owner(&e, user);

        set_owner(&e, &owner);
    }

    pub fn update_other_chain_address(e: Env, user: Address, other_chain_address: Address) {
        require_owner(&e, user);

        let mut pool = get_pool(&e);
        pool.other_chain_address = other_chain_address;
        set_pool(&e, &pool);
    }

    pub fn update_fee(e: Env, user: Address, fee: u32) {
        check_fee(fee);
        require_owner(&e, user);

        let mut pool = get_pool(&e);
        pool.fee = fee;
        set_pool(&e, &pool);
    }
}
