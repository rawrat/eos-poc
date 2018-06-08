// your active private key of the slant account (private key of ActivePubKey that you used when creating the slant account (see README))
let keyProvider = ['5JewatSTzka6hzx2qWAo9Ri5FqukYm2PKvUw6ybZb7CsUEDxAqF'];

// our testnet
// let httpEndpoint = 'http://angelos-eos-testnet.drrrive.com:8888';
// local development
let httpEndpoint = 'http://localhost:8888';
let chainId = 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f';

let eos = Eos({keyProvider: keyProvider, httpEndpoint: httpEndpoint, chainId: chainId});

let account = 'slant';
let contract = 'slant';
