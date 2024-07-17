#![cfg(test)]

use super::{contract::BridgeDeployerClient, types::Authority, BridgeDeployer};
use soroban_sdk::{testutils::Address as _, Address, Env};
use soroban_sdk::{BytesN, String};

fn init(e: &Env) -> (BridgeDeployerClient, Authority, BytesN<65>) {
    let contract_id = e.register_contract(None, BridgeDeployer {});
    let deployer_client = BridgeDeployerClient::new(&e, &contract_id);

    let admin = Authority {
        signer: Address::generate(&e),
        fee_wallet: Address::generate(&e),
    };

    let be = string_to_byte_n65(&e, "0452a51c1bef8056119d5f114af2d71a2e978a9b260e1a156c2af1a1643291b0e90c38da6d1bef18fc80588dddfc5344638954482c7de6613a0c5eef6ec2e36ee3").unwrap();

    deployer_client.init(&admin, &be);

    (deployer_client, admin, be)
}
fn string_to_byte_n65(e: &Env, s: &str) -> Result<BytesN<65>, &'static str> {
    let vec = hex::decode(s).unwrap();
    let byte_array: [u8; 65] = vec
        .try_into()
        .map_err(|_| "Failed to convert to [u8; 65].")?;

    Ok(BytesN::from_array(&e, &byte_array))
}

#[test]
fn test_init() {
    let env: Env = Env::default();
    let (client, admin, be) = init(&env);

    let stored_admin = client.get_admin();
    assert_eq!(stored_admin.signer, admin.signer);
    assert_eq!(stored_admin.fee_wallet, admin.fee_wallet);

    let stored_be = client.get_be();
    assert_eq!(stored_be, be);
}

#[test]
fn test_deploy() {
    let env = Env::default();
    env.mock_all_auths();

    let (client, admin, _) = init(&env);

    let deployer = admin.signer.clone();
    let token = Address::generate(&env);
    let other_chain_address = String::from_str(&env, "0x1234");
    let fee = 10u32;
    let is_public = true;
    let split_fees = 50u32;
    let owner = Authority {
        signer: Address::generate(&env),
        fee_wallet: Address::generate(&env),
    };
    let token_symbol = String::from_str(&env, "TKN");

    let (deployed_address, _) = client.deploy(
        &deployer,
        &token,
        &other_chain_address,
        &fee,
        &is_public,
        &split_fees,
        &owner,
        &token_symbol,
    );

    let stored_deployed_address = client.get_deployed_address(&token);

    assert_eq!(stored_deployed_address, deployed_address);
}

#[test]
fn test_set_admin() {
    let env = Env::default();
    env.mock_all_auths();
    let (client, admin, _) = init(&env);

    let new_admin = Authority {
        signer: Address::generate(&env),
        fee_wallet: Address::generate(&env),
    };

    client.set_admin(&admin.signer, &new_admin);

    let stored_admin = client.get_admin();
    assert_eq!(stored_admin.signer, new_admin.signer);
    assert_eq!(stored_admin.fee_wallet, new_admin.fee_wallet);
}
