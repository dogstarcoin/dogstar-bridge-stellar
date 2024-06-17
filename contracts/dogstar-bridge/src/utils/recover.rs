use super::HASH_BYTES;

pub const SECP256K1_PUBLIC_KEY_LENGTH: usize = 64;

pub struct Secp256k1Pubkey(pub [u8; SECP256K1_PUBLIC_KEY_LENGTH]);

impl Secp256k1Pubkey {
    pub fn new(pubkey_vec: &[u8]) -> Self {
        Self(
            <[u8; SECP256K1_PUBLIC_KEY_LENGTH]>::try_from(<&[u8]>::clone(&pubkey_vec))
                .expect("Slice must be the same length as a Pubkey"),
        )
    }

    pub fn to_bytes(self) -> [u8; 64] {
        self.0
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Secp256k1RecoverError {
    InvalidHash,
    InvalidRecoveryId,
    InvalidSignature,
}

pub fn recover(
    hash: &[u8; HASH_BYTES],
    recovery_id: u8,
    signature: &[u8],
) -> Result<Secp256k1Pubkey, Secp256k1RecoverError> {
    let message =
        libsecp256k1::Message::parse_slice(hash).map_err(|_| Secp256k1RecoverError::InvalidHash)?;
    let recovery_id = libsecp256k1::RecoveryId::parse(recovery_id)
        .map_err(|_| Secp256k1RecoverError::InvalidRecoveryId)?;
    let signature = libsecp256k1::Signature::parse_standard_slice(signature)
        .map_err(|_| Secp256k1RecoverError::InvalidSignature)?;
    let secp256k1_key = libsecp256k1::recover(&message, &signature, &recovery_id)
        .map_err(|_| Secp256k1RecoverError::InvalidSignature)?;
    Ok(Secp256k1Pubkey::new(&secp256k1_key.serialize()[1..65]))
}
