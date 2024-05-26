// lipid_store/src/lib.rs

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{UnorderedMap, LookupMap};
use near_sdk::{env, near_bindgen, AccountId, PanicOnDefault, Balance};

/// Constants
const TRANSACTION_FEE: Balance = 10; // Mock fee for demonstration

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Chamber {
    id: u64,
    name: String,
    substance: String,
    capacity: Balance,
    current_level: Balance,
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Transaction {
    id: u64,
    amount: Balance,
    action: String,
    timestamp: u64,
    account_id: AccountId,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct LipidStore {
    chambers: UnorderedMap<u64, Chamber>,
    transactions: LookupMap<u64, Transaction>,
    next_transaction_id: u64,
}

#[near_bindgen]
impl LipidStore {
    #[init]
    pub fn new() -> Self {
        Self {
            chambers: UnorderedMap::new(b"c".to_vec()),
            transactions: LookupMap::new(b"t".to_vec()),
            next_transaction_id: 0,
        }
    }

    pub fn add_chamber(&mut self, id: u64, name: String, substance: String, capacity: Balance) {
        let chamber = Chamber {
            id,
            name,
            substance,
            capacity,
            current_level: 0,
        };
        self.chambers.insert(&id, &chamber);
    }

    pub fn store_substance(&mut self, chamber_id: u64, amount: Balance) {
        self.update_chamber(chamber_id, amount, "deposit");
    }

    pub fn release_substance(&mut self, chamber_id: u64, amount: Balance) {
        self.update_chamber(chamber_id, amount, "withdraw");
    }

    fn update_chamber(&mut self, chamber_id: u64, amount: Balance, action: &str) {
        if let Some(mut chamber) = self.chambers.get(&chamber_id) {
            match action {
                "deposit" => {
                    if chamber.current_level + amount - TRANSACTION_FEE <= chamber.capacity {
                        chamber.current_level += amount - TRANSACTION_FEE;
                    } else {
                        env::panic_str("Exceeded chamber capacity.");
                    }
                },
                "withdraw" => {
                    if chamber.current_level >= amount + TRANSACTION_FEE {
                        chamber.current_level -= amount + TRANSACTION_FEE;
                    } else {
                        env::panic_str("Insufficient substance level.");
                    }
                },
                _ => env::panic_str("Invalid action."),
            }
            self.chambers.insert(&chamber_id, &chamber);
            self.record_transaction(chamber_id, action.to_string(), amount);
        }
    }

    pub fn get_chamber(&self, chamber_id: u64) -> Option<Chamber> {
        self.chambers.get(&chamber_id)
    }

    pub fn get_all_chambers(&self) -> Vec<Chamber> {
        self.chambers.iter().map(|(_, chamber)| chamber).collect()
    }

    pub fn get_transaction(&self, transaction_id: u64) -> Option<Transaction> {
        self.transactions.get(&transaction_id)
    }

    fn record_transaction(&mut self, chamber_id: u64, action: String, amount: Balance) {
        let transaction = Transaction {
            id: self.next_transaction_id,
            amount,
            action,
            timestamp: env::block_timestamp(),
            account_id: env::signer_account_id(),
        };
        self.transactions.insert(&self.next_transaction_id, &transaction);
        self.next_transaction_id += 1;
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add_chamber() {
        let mut contract = LipidStore::new();
        contract.add_chamber(1, "Test Chamber".to_string(), "USDT".to_string(), 200);
        assert!(contract.get_chamber(1).is_some());
    }

    #[test]
    fn test_store_substance() {
        let mut contract = LipidStore::new();
        contract.add_chamber(1, "Test Chamber".to_string(), "USDT".to_string(), 200);
        contract.store_substance(1, 50);
        assert_eq!(contract.get_chamber(1).unwrap().current_level, 40); // Deduct 10 as fee
    }

    #[test]
    fn test_release_substance() {
        let mut contract = LipidStore::new();
        contract.add_chamber(1, "Test Chamber".to_string(), "USDT".to_string(), 200);
        contract.store_substance(1, 50);
        contract.release_substance(1, 20);
        assert_eq!(contract.get_chamber(1).unwrap().current_level, 10); // 40 - 20 - 10 (fee)
    }

    #[test]
    fn test_transaction_recording() {
        let mut contract = LipidStore::new();
        contract.add_chamber(1, "Test Chamber".to_string(), "USDT".to_string(), 200);
        contract.store_substance(1, 50);
        assert_eq!(contract.get_transaction(0).unwrap().amount, 50);
        contract.release_substance(1, 20);
        assert_eq!(contract.get_transaction(1).unwrap().amount, 20);
    }
}