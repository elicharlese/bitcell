use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::near_bindgen;

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct LipidStore {
    storage: Vec<String>,
}

#[near_bindgen]
impl LipidStore {
    pub fn add_store(&mut self, item: String) {
        self.storage.push(item);
    }

    pub fn get_store(&self) -> Vec<String> {
        return self.storage.clone();
    }
}