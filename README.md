

# eos-poc

## Backend

### Prereqisites

Make sure that you've installed EOS, its CLI-Tools and the Docker Node (see [](https://github.com/EOSIO/eos/wiki/Local-Environment)).

> Please also exchange the keys in the commands you generated.

### Set CORS

Edit the file _~/Library/Application\ Support/eosio/nodeos/config/config.ini_ in order to allow cors:

```
access-control-allow-origin = *
```

### Start eos node
```
nodeos -e -p eosio --plugin eosio::wallet_api_plugin --plugin eosio::chain_api_plugin --plugin eosio::account_history_api_plugin 
```

### Verify the node is running correctly
```
$ curl http://127.0.0.1:8888/v1/chain/get_info
{"server_version":"f5cc977a","head_block_num":296,"last_irreversible_block_num":295,"head_block_id":"000001280e55867acabbf1b9ff82a0b2dfe3e038ab4ea0580f06eeb4c226adeb","head_block_time":"2018-04-12T05:59:51","head_block_producer":"eosio"
```

### Create Wallet

```
$ cleos wallet create
Creating wallet: default
Save password to use in the future to unlock this wallet.
Without password imported keys will not be retrievable.
"PW5JFJgyTCvzyhWHk1yz3yuMKrMtYWddsBoGN4A2YXsjG7bk9LZPA"
```

#### Unlock Wallet
```
cleos wallet unlock --password PW5JFJgyTCvzyhWHk1yz3yuMKrMtYWddsBoGN4A2YXsjG7bk9LZPA
```

#### Create Keys

```
$ cleos create key
Private key: 5KdCF7dhNReA72xgetKkMffWF7PWXH3g85zi36gmSfZUCgoXWJ8
Public key: EOS7VPcVaaYQkh8kEJRqRPR5mKMLPAhu7DCnTTkyoYoBrifBjc9gx
```

#### Import Keys into wallet

```
cleos wallet import 5KdCF7dhNReA72xgetKkMffWF7PWXH3g85zi36gmSfZUCgoXWJ8
```

### Install eos Bios Contract

The bios contract provides some basic functionalities in order to make our contract working properly.

```
cd <EOS_FOLDER>/build/contracts/eosio.bios
cleos set contract eosio ../eosio.bios -p eosio
```

### Deploy slant contracts
```
cleos create account eosio slant EOS7VPcVaaYQkh8kEJRqRPR5mKMLPAhu7DCnTTkyoYoBrifBjc9gx EOS7VPcVaaYQkh8kEJRqRPR5mKMLPAhu7DCnTTkyoYoBrifBjc9gx
./deploy
```

### Re-deploying changes to the contracts
```
./deploy
```

### Add topic
```
cleos push action slant addtopic '["slant", "Sollte Grillen auf der Terrasse verboten werden?"]' -p slant
```

### Check if topic was successfully added
```
cleos get table slant slant topic
```

## Vote on a topic
```
cleos push action slant castvote '{"topic_id": "0", "author": "Mickey", "yesno": "0", "reason": "Darum"}' -p slant
```

### Check vote table
```
cleos get table slant slant vote
```

### Check if vote counter was correctly updated
```
cleos get table slant slant topic
```

## Frontend

The frontend is written in react.

### Start the development server

```
cd frontend && npm start
```

### Exchange the key private key

Exchange the key in frontend/src/EosConnector.js with the one you generated above.

### Build the app into static files for production

```
cd frontend && npm run build
```

### Run the tests

```
cd frontend && npm test
```
