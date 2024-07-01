use soroban_sdk::{contracttype, Address, ConversionError, Env, TryFromVal, Val};

#[derive(Clone, Copy)]
#[repr(u32)]
pub enum DataKey {
    POOL = 0,
    ADMIN = 1,
    OWNER = 2,
    BE = 3,
}

impl TryFromVal<Env, DataKey> for Val {
    type Error = ConversionError;

    fn try_from_val(_env: &Env, v: &DataKey) -> Result<Self, Self::Error> {
        Ok((*v as u32).into())
    }
}

#[derive(Clone)]
#[contracttype]
pub struct Pool {
    pub token: Address,
    pub other_chain_address: Address,
    // 0.5 == 5%
    pub fee: u32,
    // 0.2 -> 20% admin  -  80% owner
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
