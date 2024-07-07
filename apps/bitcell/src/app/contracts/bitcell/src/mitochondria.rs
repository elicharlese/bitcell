use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::near_bindgen;

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Mitochondria {
    energy: u64,
}

#[near_bindgen]
impl Mitochondria {
    pub fn produce_energy(&mut self, amount: u64) {
        self.energy += amount;
    }

    pub fn consume_energy(&mut self, amount: u64) {
        self.energy -= amount;
    }

    pub fn get_energy(&self) -> u64 {
        return self.energy;
    }
}