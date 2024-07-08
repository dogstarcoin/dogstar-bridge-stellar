use soroban_sdk::{contracttype, symbol_short, Address, Symbol};

pub const ADMIN: Symbol = symbol_short!("ADMIN");
pub const BE: Symbol = symbol_short!("BE");

#[derive(Clone)]
#[contracttype]
pub struct Authority {
    pub signer: Address,
    pub fee_wallet: Address,
}
