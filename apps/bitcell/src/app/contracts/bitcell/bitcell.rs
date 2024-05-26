use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::json_types::{U64, U128};
use near_sdk::{env, ext_contract, near_bindgen, AccountId, Balance, Gas, PanicOnDefault, Promise};
use rdkafka::producer::{BaseProducer, BaseRecord};
use rdkafka::ClientConfig;
use std::collections::HashMap;

const TGAS: Gas = 1_000_000_000_000;
const BASE_PERCENTAGE: u8 = 100;
const MAX_TRANSACTION_AMOUNT: u128 = 10_000_000; // Example maximum transaction limit

#[derive(BorshDeserialize, BorshSerialize)]
pub struct DataNode {
    pub id: U64,
    pub name: String,
    pub data: String,
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct StorageUnit {
    pub id: U64,
    pub name: String,
    pub capacity: U128,
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Chamber {
    pub id: U64,
    pub name: String,
    pub substance: String,
    pub capacity: U128,
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct LedgerEntry {
    pub id: U64,
    pub amount: U128,
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Balance {
    pub total: U128,
    pub transactions: Vec<LedgerEntry>,
}

#[ext_contract(ext_golgi_apparatus)]
trait GolgiApparatus {
    fn add_mrna_sequence(&mut self, id: u64, sequence: String);
    fn get_mrna_sequence(&self, id: u64) -> Option<MrnaSequence>;
    fn update_mrna_sequence(&mut self, id: u64, new_sequence: String) -> bool;
}

#[ext_contract(ext_nucleus)]
trait Nucleus {
    fn add_data_node(&mut self, id: U64, name: String, data: String);
    fn get_data_node(&self, id: U64) -> Option<DataNode>;
}

#[ext_contract(ext_vacuole)]
trait Vacuole {
    fn add_storage_unit(&mut self, id: U64, name: String, capacity: U128);
    fn store(&mut self, unit_id: U64, amount: U128);
    fn release(&mut self, unit_id: U64, amount: U128);
    fn get_storage_unit(&self, unit_id: U64) -> Option<StorageUnit>;
}

#[ext_contract(ext_lipid_store)]
trait LipidStore {
    fn add_chamber(&mut self, id: U64, name: String, substance: String, capacity: U128);
    fn store_substance(&mut self, chamber_id: U64, amount: U128);
    fn release_substance(&mut self, chamber_id: U64, amount: U128);
    fn get_chamber(&self, chamber_id: U64) -> Option<Chamber>;
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct MrnaSequence {
    pub id: U64,
    pub sequence: String,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct BitCell {
    nucleus_contract: AccountId,
    vacuole_contract: AccountId,
    lipid_store_contract: AccountId,
    golgi_apparatus_contract: AccountId,
    reinvest_percentage: u8,
    ledger: HashMap<AccountId, Balance>,
    kafka_producer: BaseProducer,
    reentrancy_guard: bool, // New field for reentrancy guard
}

impl BitCell {
    fn new_kafka_producer() -> BaseProducer {
        ClientConfig::new()
            .set("bootstrap.servers", "localhost:9092")
            .set("message.timeout.ms", "5000")
            .create()
            .expect("Producer creation error")
    }

    #[init]
    pub fn new(
        nucleus_contract: AccountId,
        vacuole_contract: AccountId,
        lipid_store_contract: AccountId,
        golgi_apparatus_contract: AccountId,
        reinvest_percentage: u8,
    ) -> Self {
        assert!(reinvest_percentage > 0 && reinvest_percentage <= 100, "Percentage must be between 1 and 100.");
        Self {
            nucleus_contract,
            vacuole_contract,
            lipid_store_contract,
            golgi_apparatus_contract,
            reinvest_percentage,
            ledger: HashMap::new(),
            kafka_producer: BitCell::new_kafka_producer(),
            reentrancy_guard: false, // Initialize reentrancy guard
        }
    }

    fn publish_to_kafka(&self, key: &str, value: &str) {
        self.kafka_producer
            .send(BaseRecord::to("nucleus-ledger-backup").key(key).payload(value))
            .expect("Failed to send message to Kafka");
    }

    pub fn add_transaction(&mut self, account_id: AccountId, id: U64, amount: U128) {
        // Reentrancy protection
        assert!(!self.reentrancy_guard, "Reentrancy detected!");
        self.reentrancy_guard = true;

        // Compliance: Check for transaction limits
        assert!(amount.0 <= MAX_TRANSACTION_AMOUNT, "Transaction amount exceeds the allowed limit.");

        let entry = LedgerEntry { id, amount };
        let balance = self
            .ledger
            .entry(account_id.clone())
            .or_insert(Balance { total: U128(0), transactions: vec![] });
        balance.total = U128(balance.total.0 + amount.0);
        balance.transactions.push(entry.clone());

        let message = format!(
            "{{\"account_id\": \"{}\", \"id\": {}, \"amount\": {}}}",
            account_id, id.0, amount.0
        );
        self.publish_to_kafka(&account_id.to_string(), &message);

        env::log(
            format!("Transaction added for {}: id={}, amount={}", account_id, id.0, amount.0).as_bytes(),
        );

        // Release reentrancy guard
        self.reentrancy_guard = false;
    }

    // New methods
    pub fn add_mrna_sequence_to_golgi(&mut self, id: u64, sequence: String) -> Promise {
        ext_golgi_apparatus::add_mrna_sequence(
            id,
            sequence,
            &self.golgi_apparatus_contract,
            0,
            TGAS,
        )
    }

    pub fn get_mrna_sequence_from_golgi(&self, id: u64) -> Promise {
        ext_golgi_apparatus::get_mrna_sequence(
            id,
            &self.golgi_apparatus_contract,
            0,
            TGAS,
        )
    }

    pub fn update_mrna_sequence_in_golgi(&mut self, id: u64, new_sequence: String) -> Promise {
        ext_golgi_apparatus::update_mrna_sequence(
            id,
            new_sequence,
            &self.golgi_apparatus_contract,
            0,
            TGAS,
        )
    }
}