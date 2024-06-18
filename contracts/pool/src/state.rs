use soroban_sdk::{contracttype, symbol_short, Address, Symbol};

pub const POOL: Symbol = symbol_short!("POOL");

#[derive(Clone)]
#[contracttype]
pub struct Pool {
    pub token: Address,
    pub other_chain_address: Address,
    // 0.5 == 5%
    pub fee: u32,
    pub last_release: u64,
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
