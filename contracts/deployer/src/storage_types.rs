use soroban_sdk::{contracttype, vec, Address, Env, Vec};

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Admin,
    Be,
    Pools(Address),
    Tokens,
}

#[derive(Clone)]
#[contracttype]
pub struct Authority {
    pub signer: Address,
    pub fee_wallet: Address,
}

pub fn read_tokens(e: &Env) -> Vec<Address> {
    match e.storage().instance().get(&DataKey::Tokens) {
        Some(tokens) => tokens,
        _ => vec![e],
    }
}
fn write_token(e: &Env, token: Address) {
    let mut tokens = read_tokens(e);
    tokens.push_back(token);
    e.storage().instance().set(&DataKey::Tokens, &tokens);
}

pub fn read_pool(e: &Env, token: Address) -> Address {
    if let Some(pool) = e.storage().instance().get(&DataKey::Pools(token)) {
        pool
    } else {
        panic!("no pool for given token")
    }
}

pub fn read_all_pool(e: &Env) -> Vec<Address> {
    let tokens = read_tokens(e);
    let mut pools = Vec::<Address>::new(&e);
    for token in tokens.iter() {
        pools.push_back(read_pool(e, token));
    }
    pools
}

pub fn write_pool(e: &Env, token: Address, pool: &Address) {
    write_token(e, token.clone());
    e.storage().instance().set(&DataKey::Pools(token), &pool);
}
