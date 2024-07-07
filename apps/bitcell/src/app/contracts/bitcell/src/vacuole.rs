use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::near_bindgen;

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Vacuole {
    contents: Vec<String>,
}

#[near_bindgen]
impl Vacuole {
    pub fn add_content(&mut self, item: String) {
        self.contents.push(item);
    }

    pub fn remove_content(&mut self, index: usize) {
        if index < self.contents.len() {
            self.contents.remove(index);
        }
    }

    pub fn get_contents(&self) -> Vec<String> {
        return self.contents.clone();
    }
}