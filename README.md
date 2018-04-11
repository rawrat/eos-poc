# eos-poc


## Set up eosio (install bios contract)
```
cd build/contracts/eosio.bios
cleos set contract eosio ../eosio.bios -p eosio
```

## Deploy slant contracts
```
cleos create account eosio slant ACTIVE_PUBKEY OWNER_PUBKEY
eosiocpp -o eos-poc.wast eos-poc.cpp
eosiocpp -g eos-poc.abi eos-poc.cpp
cleos set contract slant ../eos-poc
```

## Add topic
```
cleos push action slant addtopic '["slant", "Sollte Grillen auf der Terrasse verboten werden?"]' -p slant
```

## Check if topic was successfully added
```
cleos get table slant slant topic
```

## Vote on a topic
```
cleos push action slant castvote '{"topic_id": "0", "author": "Mickey", "yesno": "0", "reason": "Darum"}' -p slant
```

## Check vote table
```
cleos get table slant slant vote
```

## Check if vote counter was correctly updated
```
cleos get table slant slant topic
```
