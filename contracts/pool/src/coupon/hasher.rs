use sha3::{Digest, Keccak256};

pub const HASH_BYTES: usize = 32;

#[derive(Clone, Default)]
pub struct Hasher {
    hasher: Keccak256,
}

impl Hasher {
    pub fn hash(&mut self, val: &[u8]) {
        self.hasher.update(val);
    }

    pub fn result(self) -> [u8; HASH_BYTES] {
        // At the time of this writing, the sha3 library is stuck on an old version
        // of generic_array (0.9.0). Decouple ourselves with a clone to our version.
        <[u8; HASH_BYTES]>::try_from(self.hasher.finalize().as_slice()).unwrap()
    }
}
