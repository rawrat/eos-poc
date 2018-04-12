/* eslint-disable */
import $ from 'jquery';

// your active private key of the slant account (private key of ActivePubKey that you used when creating the slant account (see README))
let keyProvider = ['5KdCF7dhNReA72xgetKkMffWF7PWXH3g85zi36gmSfZUCgoXWJ8'];

let httpEndpoint = 'http://angelos-eos-testnet.drrrive.com:8888';
// let httpEndpoint = 'http://localhost:8888';

let eos = Eos.Localnet({keyProvider: keyProvider, httpEndpoint: httpEndpoint});

let account = 'slant';
let contract = 'slant';
const EosConnector = {};

EosConnector.fetchQuestions = () => {
    return eos.getTableRows({json:true, scope: account, code: contract,  table: 'topic'})
}

EosConnector.addQuestion = () => {
    const question = "hello world";
    console.log("add question", question);
    return eos.transaction({
        actions: [
            {
                account: account,
                name: 'addtopic',
                authorization: [{
                    actor: account,
                    permission: 'active'
                }],
                data: {
                    sender: account,
                    question: question
                }
            }
        ]
    })
}

export default EosConnector;
