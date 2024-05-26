use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{UnorderedMap, LookupMap};
use near_sdk::{env, near_bindgen, AccountId, PanicOnDefault, Balance, BorshStorageKey};

/// Constants
const TRANSACTION_FEE: Balance = 10;  // Mock fee for demonstration

#[derive(BorshDeserialize, BorshSerialize)]
pub struct StorageUnit {
    id: u64,
    name: String,
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
pub struct Vacuole {
    storage_units: UnorderedMap<u64, StorageUnit>,
    transactions: LookupMap<u64, Transaction>,
    next_transaction_id: u64,
    owner_id: AccountId,
}

#[derive(BorshStorageKey, BorshSerialize)]
pub enum StorageKey {
    StorageUnits,
    Transactions,
}

#[near_bindgen]
impl Vacuole {
    #[init]
    pub fn new(owner_id: AccountId) -> Self {
        Self {
            storage_units: UnorderedMap::new(StorageKey::StorageUnits.into_bytes()),
            transactions: LookupMap::new(StorageKey::Transactions.into_bytes()),
            next_transaction_id: 0,
            owner_id,
        }
    }

    pub fn add_storage_unit(&mut self, id: u64, name: String, capacity: Balance) {
        self.assert_owner();
        let storage_unit = StorageUnit {
            id,
            name,
            capacity,
            current_level: 0,
        };
        self.storage_units.insert(&id, &storage_unit);
    }

    pub fn store(&mut self, unit_id: u64, amount: Balance) {
        self.update_storage_unit(unit_id, amount, "deposit");
    }

    pub fn release(&mut self, unit_id: u64, amount: Balance) {
        self.update_storage_unit(unit_id, amount, "withdraw");
    }

    fn update_storage_unit(&mut self, unit_id: u64, amount: Balance, action: &str) {
        if let Some(mut unit) = self.storage_units.get(&unit_id) {
            match action {
                "deposit" => {
                    if unit.current_level + amount - TRANSACTION_FEE <= unit.capacity {
                        unit.current_level += amount - TRANSACTION_FEE;
                    } else {
                        env::panic_str("Exceeded storage unit capacity.");
                    }
                },
                "withdraw" => {
                    if unit.current_level >= amount + TRANSACTION_FEE {
                        unit.current_level -= amount + TRANSACTION_FEE;
                    } else {
                        env::panic_str("Insufficient stored amount.");
                    }
                },
                _ => env::panic_str("Invalid action."),
            }
            self.storage_units.insert(&unit_id, &unit);
            self.record_transaction(unit_id, action.to_string(), amount);
        }
    }

    pub fn get_storage_unit(&self, unit_id: u64) -> Option<StorageUnit> {
        self.storage_units.get(&unit_id)
    }

    pub fn get_all_storage_units(&self) -> Vec<StorageUnit> {
        self.storage_units.iter().map(|(_, unit)| unit).collect()
    }

    pub fn get_transaction(&self, transaction_id: u64) -> Option<Transaction> {
        self.transactions.get(&transaction_id)
    }

    fn assert_owner(&self) {
        assert_eq!(env::predecessor_account_id(), self.owner_id, "Only the owner can perform this action");
    }

    fn record_transaction(&mut self, unit_id: u64, action: String, amount: Balance) {
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
    use near_sdk::test_utils::VMContextBuilder;
    use near_sdk::{testing_env, AccountId};

    fn get_context(predecessor: AccountId) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder.predecessor_account_id(predecessor);
        builder
    }

    #[test]
    fn test_add_storage_unit() {
        let owner_id = AccountId::new_unchecked("owner.testnet".to_string());
        let context = get_context(owner_id.clone());
        testing_env!(context.build());
        let mut contract = Vacuole::new(owner_id);
        contract.add_storage_unit(1, "Test Unit".to_string(), 200);
        assert!(contract.storage_units.get(&1).is_some());
    }

    #[test]
    fn test_store_and_release() {
        let owner_id = AccountId::new_unchecked("owner.testnet".to_string());
        let context = get_context(owner_id.clone());
        testing_env!(context.build());
        let mut contract = Vacuole::new(owner_id);
        contract.add_storage_unit(1, "Test Unit".to_string(), 200);
        contract.store(1, 100);
        assert_eq!(contract.storage_units.get(&1).unwrap().current_level, 90);
        contract.release(1, 50);
        assert_eq!(contract.storage_units.get(&1).unwrap().current_level, 30);
    }

    #[test]
    fn test_transaction_recording() {
        let owner_id = AccountId::new_unchecked("owner.testnet".to_string());
        let context = get_context(owner_id.clone());
        testing_env!(context.build());
        let mut contract = Vacuole::new(owner_id);
        contract.add_storage_unit(1, "Test Unit".to_string(), 200);
        contract.store(1, 100);
        assert_eq!(contract.get_transaction(0).unwrap().amount, 100);
        contract.release(1, 50);
        assert_eq!(contract.get_transaction(1).unwrap().amount, 50);
    }
}