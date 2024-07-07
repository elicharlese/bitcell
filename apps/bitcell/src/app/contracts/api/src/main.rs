#[macro_use]
extern crate serde_derive;
extern crate near_sdk;
extern crate near_sdk_sim;
extern crate serde_json;

use near_sdk::env;
use near_sdk::json_types::U128;
use near_sdk::collections::UnorderedMap;
use near_sdk::AccountId;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::near_bindgen;
use near_sdk::PanicOnDefault;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct ApiContract {
    pub data: UnorderedMap<AccountId, U128>,
}

#[near_bindgen]
impl ApiContract {
    #[init]
    pub fn new() -> Self {
        Self {
            data: UnorderedMap::new(b"data"),
        }
    }

    pub fn set_data(&mut self, account_id: AccountId, value: U128) {
        self.data.insert(&account_id, &value);
    }

    pub fn get_data(&self, account_id: AccountId) -> U128 {
        return self.data.get(&account_id).unwrap_or(U128(0));
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_initial_data() {
        let contract = ApiContract::new();
        assert_eq!(contract.get_data("bob.near".to_string()), U128(0));
    }

    #[test]
    fn test_set_data() {
        let mut contract = ApiContract::new();
        contract.set_data("alice.near".to_string(), U128(42));
        assert_eq!(contract.get_data("alice.near".to_string()), U128(42));
    }
}