use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedMap;
use near_sdk::{env, near_bindgen, AccountId, PanicOnDefault, Balance, BorshStorageKey};

#[derive(BorshDeserialize, BorshSerialize)]
pub struct DataNode {
    id: u64,
    name: String,
    data: String,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Nucleus {
    data_nodes: UnorderedMap<u64, DataNode>,
    owner_id: AccountId,
}

#[derive(BorshStorageKey, BorshSerialize)]
pub enum StorageKey {
    DataNodes,
}

#[near_bindgen]
impl Nucleus {
    #[init]
    pub fn new(owner_id: AccountId) -> Self {
        Self {
            data_nodes: UnorderedMap::new(StorageKey::DataNodes.into_bytes()),
            owner_id,
        }
    }

    pub fn add_data_node(&mut self, id: u64, name: String, data: String) {
        self.assert_owner();
        let data_node = DataNode {
            id,
            name,
            data,
        };
        self.data_nodes.insert(&id, &data_node);
    }

    pub fn get_data_node(&self, id: u64) -> Option<DataNode> {
        self.data_nodes.get(&id)
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
    fn test_add_data_node() {
        let owner_id = AccountId::new_unchecked("owner.testnet".to_string());
        let context = get_context(owner_id.clone());
        testing_env!(context.build());
        let mut contract = Nucleus::new(owner_id);
        contract.add_data_node(1, "Test Node".to_string(), "Sample Data".to_string());
        assert!(contract.data_nodes.get(&1).is_some());
    }

    #[test]
    fn test_get_data_node() {
        let owner_id = AccountId::new_unchecked("owner.testnet".to_string());
        let context = get_context(owner_id.clone());
        testing_env!(context.build());
        let mut contract = Nucleus::new(owner_id);
        contract.add_data_node(1, "Test Node".to_string(), "Sample Data".to_string());
        let node = contract.get_data_node(1).unwrap();
        assert_eq!(node.data, "Sample Data");
    }
}