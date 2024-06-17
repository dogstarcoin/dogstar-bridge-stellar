use soroban_sdk::contracterror;

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    FirstError = 1,
    AnotherError = 2,
    YetAnotherError = 3,
    GenericError = 4,
}
