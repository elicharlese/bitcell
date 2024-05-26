use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, near_bindgen, AccountId, Promise};

// Define the mRNA sequence struct
#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Debug, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct MrnaSequence {
    pub id: u64,
    pub sequence: String,
}

// The contract struct
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Default)]
pub struct GolgiApparatus {
    mrna_sequences: Vec<MrnaSequence>,
}

#[near_bindgen]
impl GolgiApparatus {
    // Add a new mRNA sequence
    pub fn add_mrna_sequence(&mut self, id: u64, sequence: String) {
        let mrna_sequence = MrnaSequence { id, sequence };
        self.mrna_sequences.push(mrna_sequence);
        env::log_str(&format!("Added mRNA sequence with id: {}", id));
    }

    // Get an mRNA sequence by id
    pub fn get_mrna_sequence(&self, id: u64) -> Option<MrnaSequence> {
        for sequence in &self.mrna_sequences {
            if sequence.id == id {
                return Some(sequence.clone());
            }
        }
        env::log_str(&format!("mRNA sequence with id: {} not found", id));
        None
    }

    // Update an existing mRNA sequence
    pub fn update_mrna_sequence(&mut self, id: u64, new_sequence: String) -> bool {
        for sequence in &mut self.mrna_sequences {
            if sequence.id == id {
                sequence.sequence = new_sequence;
                env::log_str(&format!("Updated mRNA sequence with id: {}", id));
                return true;
            }
        }
        env::log_str(&format!("mRNA sequence with id: {} not found", id));
        false
    }
}