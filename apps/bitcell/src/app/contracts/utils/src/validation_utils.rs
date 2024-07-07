pub fn validate_email(email: &str) -> bool {
  let email_re = regex::Regex::new(
      r"^(?i)[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  ).unwrap();
  email_re.is_match(email)
}

pub fn validate_password(password: &str) -> bool {
  password.len() >= 8 && password.chars().any(|c| c.is_numeric())
}