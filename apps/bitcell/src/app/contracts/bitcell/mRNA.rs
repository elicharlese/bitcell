use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};

// Define the mRNA sequence struct
#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Debug, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct MrnaSequence {
    pub id: u64,
    pub sequence: String,
}

// Utility functions for mRNA sequences (if any)
impl MrnaSequence {
    // Create a new mRNA sequence
    pub fn new(id: u64, sequence: String) -> Self {
        Self { id, sequence }
    }

    // Display the mRNA sequence in a readable format
    pub fn display(&self) -> String {
        format!("mRNA Sequence ID: {}, Sequence: {}", self.id, self.sequence)
    }
}

// Additional helper functions, validations, or struct extensions can go here
// For example, if you need to convert a sequence to another format, process it, validate it, etc.
impl MrnaSequence {
    // Validate if the mRNA sequence only contains valid nucleotides (A, U, C, G)
    pub fn is_valid(&self) -> bool {
        self.sequence.chars().all(|c| matches!(c, 'A' | 'U' | 'C' | 'G'))
    }
}

// Example unit tests for MrnaSequence
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_create_mrna_sequence() {
        let sequence = MrnaSequence::new(1, "AUCGAU".to_string());
        assert_eq!(sequence.id, 1);
        assert_eq!(sequence.sequence, "AUCGAU");
    }

    #[test]
    fn test_display_mrna_sequence() {
        let sequence = MrnaSequence::new(1, "AUCGAU".to_string());
        assert_eq!(sequence.display(), "mRNA Sequence ID: 1, Sequence: AUCGAU");
    }

    #[test]
    fn test_valid_mrna_sequence() {
        let sequence = MrnaSequence::new(1, "AUCGAU".to_string());
        assert!(sequence.is_valid());

        let invalid_sequence = MrnaSequence::new(2, "AUXGAU".to_string());
        assert!(!invalid_sequence.is_valid());
    }
}