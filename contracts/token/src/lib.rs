#![no_std]
#![cfg(test)]

mod admin;
mod allowance;
mod balance;
mod contract;
mod metadata;
mod storage_types;
mod test;

pub use crate::contract::TokenClient;