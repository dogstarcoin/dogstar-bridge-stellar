use soroban_sdk::{
    contracterror, contracttype, symbol_short, Address, ConversionError, Env, Symbol, TryFromVal,
    Val,
};

pub const ADMIN: Symbol = symbol_short!("ADMIN");

#[derive(Clone, Copy)]
#[repr(u32)]
pub enum DataKey {
    POOL,
    OWNER,
    BE,
    DEPLOYER,
}

#[derive(Clone)]
#[contracttype]
pub struct Pool {
    pub token: Address,
    pub other_chain_address: Address,
    // 5 == 5%
    pub fee: u32,
    // 20 -> 20% admin  -  80% owner
    pub split_fees: u32,
    pub last_release: u64,
    pub is_public: bool,
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
    pub to_other_chain: Address,
    pub token_other_chain: Address,
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

impl TryFromVal<Env, DataKey> for Val {
    type Error = ConversionError;

    fn try_from_val(_env: &Env, v: &DataKey) -> Result<Self, Self::Error> {
        Ok((*v as u32).into())
    }
}
