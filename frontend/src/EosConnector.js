/* eslint-disable */
import $ from 'jquery';

// your active private key of the slant account (private key of ActivePubKey that you used when creating the slant account (see README))
let keyProvider = ['5HrPkye4vSeMzUhuT8oYNKNbKjTd3Dh2yxkQsBBkH8sJkeUR78Q'];

let httpEndpoint = 'http://angelos-eos-testnet.drrrive.com:8888';
// let httpEndpoint = 'http://localhost:8888';

let eos = Eos.Localnet({keyProvider: keyProvider, httpEndpoint: httpEndpoint});

let account = 'slant';
let contract = 'slant';
const EosConnector = {};

EosConnector.fetchQuestions = () => {
    return eos.getTableRows({json:true, scope: account, code: contract,  table: 'topic', limit: 100})
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
