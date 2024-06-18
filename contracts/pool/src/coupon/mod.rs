use soroban_sdk::{contracttype, symbol_short, xdr::ToXdr, Env, String, Symbol};

pub mod recover;
pub use recover::*;

pub mod hasher;
pub use hasher::*;

use crate::errors::Error;

#[derive(Clone)]
#[contracttype]
pub struct CouponPayload {
    recovery_id: u32,
    signature: String,
}

pub struct Coupon {
    pub recovery_id: u8,
    pub signature: [u8; 32],
}

impl Coupon {
    pub fn new(e: &Env, payload: CouponPayload) -> Self {
        let mut sig = [0u8; 32];
        payload.signature.to_xdr(&e).copy_into_slice(&mut sig);

        Coupon {
            recovery_id: payload.recovery_id as u8,
            signature: sig,
        }
    }

    const ADMIN_PUB_KEY: &'static str = "52a51c1bef8056119d5f114af2d71a2e978a9b260e1a156c2af1a1643291b0e90c38da6d1bef18fc80588dddfc5344638954482c7de6613a0c5eef6ec2e36ee3";

    pub fn verify(&self, serialized_data: &[u8]) -> Result<Symbol, Error> {
        let hash = self.hash(serialized_data);

        let recovered_pubkey = recover(&hash, self.recovery_id, &self.signature).unwrap();
        let recovered_pubkey_hex = hex::encode(recovered_pubkey.0);

        if recovered_pubkey_hex.ne(Coupon::ADMIN_PUB_KEY) {
            return Err(Error::FirstError);
        }

        Ok(symbol_short!("Ok"))
    }

    fn hash(&self, serialized_data: &[u8]) -> [u8; HASH_BYTES] {
        let hash = {
            let mut hasher = Hasher::default();
            hasher.hash(&serialized_data);
            hasher.result()
        };

        hash
    }
}
