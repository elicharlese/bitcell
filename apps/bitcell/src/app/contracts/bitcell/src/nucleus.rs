use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::near_bindgen;

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Nucleus {
    dna: String,
}

#[near_bindgen]
impl Nucleus {
    pub fn replicate_dna(&mut self) {
        self.dna = format!("{}{}", self.dna, self.dna);
    }

    pub fn mutate_dna(&mut self, mutation: String) {
        self.dna = mutation;
    }

    pub fn get_dna(&self) -> String {
        return self.dna.clone();
    }
}