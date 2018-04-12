import $ from 'jquery';
import Eos from 'eosjs';

// your active private key of the slant account (private key of ActivePubKey that you used when creating the slant account (see README))
let keyProvider = ['5KdCF7dhNReA72xgetKkMffWF7PWXH3g85zi36gmSfZUCgoXWJ8'];


let eos = Eos.Localnet({keyProvider});

let account = 'slant';
let contract = 'slant';
const EosConnector = {};

EosConnector.fetchQuestions = () => {
    return eos.getTableRows({json:true, scope: account, code: contract,  table: 'topic', mode: 'no-cors'})
}

export default EosConnector;