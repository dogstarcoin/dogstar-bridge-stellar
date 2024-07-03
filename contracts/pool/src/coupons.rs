use soroban_sdk::{
    contracttype, symbol_short,
    xdr::{FromXdr, ToXdr},
    Bytes, BytesN, Env, String, Symbol,
};

use crate::{be::get_be, storage_types::Error};

#[derive(Clone)]
#[contracttype]
pub struct CouponPayload {
    recovery_id: u32,
    signature: String,
}

pub struct Coupon {
    pub recovery_id: u32,
    pub signature: BytesN<64>,
    pub payload: Bytes,
}

impl Coupon {
    pub fn new<T: Clone + ToXdr>(e: &Env, coupon: CouponPayload, payload: &T) -> Self {
        let sig: BytesN<64> = BytesN::from_xdr(&e, &coupon.signature.to_xdr(&e)).unwrap();
        let serialized_payload: Bytes = Bytes::from_xdr(&e, &payload.clone().to_xdr(&e)).unwrap();

        Coupon {
            recovery_id: coupon.recovery_id,
            signature: sig,
            payload: serialized_payload,
        }
    }

    pub fn verify(&self, env: &Env) -> Result<Symbol, Error> {
        let hash = env.crypto().keccak256(&self.payload);
        let recovered_pubkey =
            env.crypto()
                .secp256k1_recover(&hash, &self.signature, self.recovery_id);
        let hashed_pub_key = env.crypto().keccak256(&recovered_pubkey.into());
        if hashed_pub_key.ne(&get_be(&env)) {
            return Err(Error::InvalidCoupon);
        }

        Ok(symbol_short!("Ok"))
    }
}
