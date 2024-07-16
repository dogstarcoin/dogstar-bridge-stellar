#![cfg(test)]

use soroban_sdk::{
    log, symbol_short,
    testutils::{Address as _, Events},
    token::{StellarAssetClient, TokenClient},
    xdr::ToXdr,
    Address, Env, FromVal, IntoVal, String,
};

use crate::{
    contract::BridgePoolClient,
    storage_types::{Authority, LockLiqEvent, Pool},
    BridgePool,
};

fn create_token_contract<'a>(
    e: &Env,
    admin: &Address,
) -> (TokenClient<'a>, StellarAssetClient<'a>) {
    let contract_address = e.register_stellar_asset_contract(admin.clone());
    (
        TokenClient::new(e, &contract_address),
        StellarAssetClient::new(e, &contract_address),
    )
}

fn init(
    e: &Env,
    is_public: bool,
) -> (
    BridgePoolClient,
    Pool,
    Authority,
    Authority,
    TokenClient,
    StellarAssetClient,
) {
    let client = BridgePoolClient::new(&e, &e.register_contract(None, BridgePool {}));

    let other_chain_address = String::from_str(&e, "3B5wuUrMEi5yATD7on46hKfej3pfmd7t1RKgrsN3pump");

    let admin = Authority {
        signer: Address::generate(&e),
        fee_wallet: Address::generate(&e),
    };

    let (token, token_admin) = create_token_contract(&e, &admin.signer);

    let owner = Authority {
        signer: Address::generate(&e),
        fee_wallet: Address::generate(&e),
    };

    let be = e.crypto().keccak256(&String::from_str(&e, "52a51c1bef8056119d5f114af2d71a2e978a9b260e1a156c2af1a1643291b0e90c38da6d1bef18fc80588dddfc5344638954482c7de6613a0c5eef6ec2e36ee3").to_xdr(&e));
    let token_symbol = String::from_str(&e, "BILLY");

    client.init(
        &token.address,
        &other_chain_address,
        &15u32,
        &is_public,
        &30u32,
        &owner,
        &admin,
        &be,
        &token_symbol,
    );

    let pool = client.get_pool();

    (client, pool, admin, owner, token, token_admin)
}

#[test]
fn test_init() {
    let e = Env::default();
    let client = BridgePoolClient::new(&e, &e.register_contract(None, BridgePool {}));

    let other_chain_address = String::from_str(&e, "3B5wuUrMEi5yATD7on46hKfej3pfmd7t1RKgrsN3pump");

    let admin = Authority {
        signer: Address::generate(&e),
        fee_wallet: Address::generate(&e),
    };

    let (token, _) = create_token_contract(&e, &admin.signer);

    let owner = Authority {
        signer: Address::generate(&e),
        fee_wallet: Address::generate(&e),
    };

    let be = e.crypto().keccak256(&String::from_str(&e, "52a51c1bef8056119d5f114af2d71a2e978a9b260e1a156c2af1a1643291b0e90c38da6d1bef18fc80588dddfc5344638954482c7de6613a0c5eef6ec2e36ee3").to_xdr(&e));
    let token_symbol = String::from_str(&e, "BILLY");

    client.init(
        &token.address,
        &other_chain_address,
        &15u32,
        &false,
        &30u32,
        &owner,
        &admin,
        &be,
        &token_symbol,
    );

    let pool = client.get_pool();
    let stored_admin = client.get_admin();
    let stored_owner = client.get_owner();
    let stored_be = client.get_be();

    assert_eq!(pool.fee, 15u32);
    assert_eq!(pool.split_fees, 30u32);
    assert_eq!(pool.other_chain_address, other_chain_address);
    assert_eq!(pool.token, token.address);
    assert_eq!(pool.is_public, false);
    assert_eq!(pool.token_symbol, token_symbol);

    assert_eq!(stored_owner.signer, owner.signer);
    assert_eq!(stored_owner.fee_wallet, owner.fee_wallet);
    assert_eq!(stored_admin.signer, admin.signer);
    assert_eq!(stored_admin.fee_wallet, admin.fee_wallet);
    assert_eq!(stored_be, be);
}

#[test]
fn test_lock_liq() {
    let e = Env::default();
    e.mock_all_auths();
    let other_chain_wallet = String::from_str(&e, "4UEAHjxeHGetMjjPniMsks27j8CVWPZg2oSMDSAa7fHi");
    let user = Address::generate(&e);

    let (client, pool, admin, owner, token, token_admin) = init(&e, true);

    token_admin.mint(&user, &1500);
    assert_eq!(token.balance(&user), 1500);

    token.approve(&user, &client.address, &1000, &500);

    log!(&e, "allowance {}", token.allowance(&user, &client.address));

    client.lock_liq(&user, &1000, &other_chain_wallet);

    assert_eq!(token.balance(&client.address), 850);
    assert_eq!(token.balance(&owner.fee_wallet), 105);
    assert_eq!(token.balance(&admin.fee_wallet), 45);
    let (contract_id, label, object) = e.events().all().last().unwrap();
    assert_eq!(contract_id, client.address);
    assert_eq!(label, (symbol_short!("locked"),).into_val(&e));
    let lock_event = LockLiqEvent::from_val(&e, &object);
    assert_eq!(lock_event.amount, 850);
    assert_eq!(lock_event.from, user);
    assert_eq!(lock_event.token_other_chain, pool.other_chain_address);
    assert_eq!(lock_event.to_other_chain, other_chain_wallet);
}
