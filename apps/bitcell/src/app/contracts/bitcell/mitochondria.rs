// mitochondria/src/lib.rs

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{UnorderedMap, LookupMap};
use near_sdk::{env, near_bindgen, AccountId, BorshStorageKey, PanicOnDefault};

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Organelle {
    id: u64,
    name: String,
    function: String,
    energy_production_level: u32,
    chambers: UnorderedMap<u64, Chamber>,
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Chamber {
    id: u64,
    name: String,
    capacity: u32,
    current_level: u32,
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Transaction {
    id: u64,
    organelle_id: u64,
    chamber_id: u64,
    amount: u32,
    action: String,
    timestamp: u64,
    account_id: AccountId,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Mitochondria {
    organelles: UnorderedMap<u64, Organelle>,
    transactions: LookupMap<u64, Transaction>,
    next_transaction_id: u64,
    owner_id: AccountId,
}

#[derive(BorshStorageKey, BorshSerialize)]
pub enum StorageKey {
    Organelles,
    Chambers { organelle_id: u64 },
    Transactions,
}

#[near_bindgen]
impl Mitochondria {
    #[init]
    pub fn new(owner_id: AccountId) -> Self {
        Self {
            organelles: UnorderedMap::new(StorageKey::Organelles.into_bytes()),
            transactions: LookupMap::new(StorageKey::Transactions.into_bytes()),
            next_transaction_id: 0,
            owner_id,
        }
    }

    pub fn add_organelle(&mut self, id: u64, name: String, function: String) {
        self.assert_owner();
        let organelle = Organelle {
            id,
            name,
            function,
            energy_production_level: 0,
            chambers: UnorderedMap::new(StorageKey::Chambers { organelle_id: id }.into_bytes()),
        };
        self.organelles.insert(&id, &organelle);
    }

    pub fn add_chamber(&mut self, organelle_id: u64, chamber_id: u64, name: String, capacity: u32) {
        self.assert_owner();
        if let Some(mut organelle) = self.organelles.get(&organelle_id) {
            let chamber = Chamber {
                id: chamber_id,
                name,
                capacity,
                current_level: 0,
            };
            organelle.chambers.insert(&chamber_id, &chamber);
            self.organelles.insert(&organelle_id, &organelle);
        }
    }

    pub fn pump_substance(&mut self, organelle_id: u64, chamber_id: u64, amount: u32) {
        self.update_chamber(organelle_id, chamber_id, amount, "pump");
    }

    pub fn release_substance(&mut self, organelle_id: u64, chamber_id: u64, amount: u32) {
        self.update_chamber(organelle_id, chamber_id, amount, "release");
    }

    fn update_chamber(&mut self, organelle_id: u64, chamber_id: u64, amount: u32, action: &str) {
        if let Some(mut organelle) = self.organelles.get(&organelle_id) {
            if let Some(mut chamber) = organelle.chambers.get(&chamber_id) {
                match action {
                    "pump" => {
                        if chamber.current_level + amount <= chamber.capacity {
                            chamber.current_level += amount;
                        } else {
                            env::panic_str("Exceeded chamber capacity.");
                        }
                    },
                    "release" => {
                        if chamber.current_level >= amount {
                            chamber.current_level -= amount;
                        } else {
                            env::panic_str("Insufficient substance level.");
                        }
                    },
                    _ => env::panic_str("Invalid action."),
                }
                organelle.chambers.insert(&chamber_id, &chamber);
                self.organelles.insert(&organelle_id, &organelle);

                let transaction = Transaction {
                    id: self.next_transaction_id,
                    organelle_id,
                    chamber_id,
                    amount,
                    action: action.to_string(),
                    timestamp: env::block_timestamp(),
                    account_id: env::signer_account_id(),
                };
                self.transactions.insert(&self.next_transaction_id, &transaction);
                self.next_transaction_id += 1;
            }
        }
    }

    pub fn increase_energy_production(&mut self, organelle_id: u64, amount: u32) {
        self.assert_owner();
        if let Some(mut organelle) = self.organelles.get(&organelle_id) {
            organelle.energy_production_level += amount;
            self.organelles.insert(&organelle_id, &organelle);
        }
    }

    pub fn decrease_energy_production(&mut self, organelle_id: u64, amount: u32) {
        self.assert_owner();
        if let Some(mut organelle) = self.organelles.get(&organelle_id) {
            if organelle.energy_production_level >= amount {
                organelle.energy_production_level -= amount;
                self.organelles.insert(&organelle_id, &organelle);
            }
        }
    }

    pub fn get_organelle(&self, organelle_id: u64) -> Option<Organelle> {
        self.organelles.get(&organelle_id)
    }

    pub fn get_all_organelles(&self) -> Vec<Organelle> {
        self.organelles.iter().map(|(_, organelle)| organelle).collect()
    }

    pub fn get_transaction(&self, transaction_id: u64) -> Option<Transaction> {
        self.transactions.get(&transaction_id)
    }

    fn assert_owner(&self) {
        assert_eq!(env::predecessor_account_id(), self.owner_id, "Only the owner can perform this action");
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::test_utils::VMContextBuilder;
    use near_sdk::{testing_env, AccountId};

    fn get_context(predecessor: AccountId) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder.predecessor_account_id(predecessor);
        builder
    }

    #[test]
    fn test_add_organelle() {
        let owner_id = AccountId::new_unchecked("owner.testnet".to_string());
        let context = get_context(owner_id.clone());
        testing_env!(context.build());
        let mut contract = Mitochondria::new(owner_id);
        contract.add_organelle(1, "Test Organelle".to_string(), "ATP Production".to_string());
        assert!(contract.get_organelle(1).is_some());
    }

    #[test]
    fn test_add_chamber() {
        let owner_id = AccountId::new_unchecked("owner.testnet".to_string());
        let context = get_context(owner_id.clone());
        testing_env!(context.build());
        let mut contract = Mitochondria::new(owner_id);
        contract.add_organelle(1, "Test Organelle".to_string(), "ATP Production".to_string());
        contract.add_chamber(1, 1, "Test Chamber".to_string(), 100);
        let organelle = contract.get_organelle(1).unwrap();
        assert!(organelle.chambers.get(&1).is_some());
    }

    #[test]
    fn test_pump_substance() {
        let owner_id = AccountId::new_unchecked("owner.testnet".to_string());
        let context = get_context(owner_id.clone());
        testing_env!(context.build());
        let mut contract = Mitochondria::new(owner_id);
        contract.add_organelle(1, "Test Organelle".to_string(), "ATP Production".to_string());
        contract.add_chamber(1, 1, "Test Chamber".to_string(), 100);
        contract.pump_substance(1, 1, 50);
        let organelle = contract.get_organelle(