# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_newouija_session',
  :secret      => '3e4e27dd86dafcb3c2fb7482cccabb75a51aac01572060127cae2ac87ecb39c3a9f2c31a8039b278dab479a73cc4fff5d3c08dc8f7e7a1e81323551bbca36ab3'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
