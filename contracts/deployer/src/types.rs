use soroban_sdk::{contracttype, Address};

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Admin,
    Be,
    Pools(Address),
}

#[derive(Clone)]
#[contracttype]
pub struct Authority {
    pub signer: Address,
    pub fee_wallet: Address,
}
