use soroban_sdk::{contracterror, contracttype, Address, String};

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Pool,
    Owner,
    Admin,
    Be,
}

#[derive(Clone)]
#[contracttype]
pub struct Pool {
    pub token: Address,
    pub other_chain_address: String,
    // 5 == 5%
    pub fee: u32,
    // 20 -> 20% admin  -  80% owner
    pub split_fees: u32,
    pub last_release: u64,
    pub is_public: bool,
    pub token_symbol: String,
}

#[derive(Clone)]
#[contracttype]
pub struct Authority {
    pub signer: Address,
    pub fee_wallet: Address,
}

#[derive(Clone)]
#[contracttype]
pub struct ReleaseLiqPayload {
    pub amount: i128,
    pub to: Address,
}

#[derive(Clone)]
#[contracttype]
pub struct LockLiqEvent {
    pub amount: i128,
    pub from: Address,
    pub to_other_chain: String,
    pub token_other_chain: String,
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    Unauthorized = 1,
    InvalidCoupon = 2,
    PoolIsPrivate = 3,
    InvalidParams = 4,
    PoolInitialized = 5,
}
