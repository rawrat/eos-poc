

# eos-poc

## Backend

### Set up eosio (install bios contract)
```
cd build/contracts/eosio.bios
cleos set contract eosio ../eosio.bios -p eosio
```

### Deploy slant contracts
```
cleos create account eosio slant ACTIVE_PUBKEY OWNER_PUBKEY
eosiocpp -o slant.wast slant.cpp
eosiocpp -g slant.abi slant.cpp
cleos set contract slant ../slant
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

### Build the app into static files for production

```
cd frontend && npm run build
```

### Run the tests

```
cd frontend && npm test
```

