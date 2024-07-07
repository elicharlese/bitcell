use near_sdk::env;
use std::str;

pub fn encrypt(data: &str, key: &[u8]) -> Vec<u8> {
    let iv = env::random_seed();
    let cipher = openssl::symm::Cipher::aes_256_cbc();
    let ciphertext = openssl::symm::encrypt(cipher, key, Some(&iv), data.as_bytes()).unwrap();
    [iv.as_slice(), &ciphertext].concat()
}

pub fn decrypt(data: &[u8], key: &[u8]) -> String {
    let iv = &data[0..16];
    let ciphertext = &data[16..];
    let cipher = openssl::symm::Cipher::aes_256_cbc();
    let decrypted_data = openssl::symm::decrypt(cipher, key, Some(iv), ciphertext).unwrap();
    str::from_utf8(&decrypted_data).unwrap().to_string()
}