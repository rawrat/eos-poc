/* eslint-disable */
import $ from 'jquery';

// your active private key of the slant account (private key of ActivePubKey that you used when creating the slant account (see README))
let keyProvider = ['5JewatSTzka6hzx2qWAo9Ri5FqukYm2PKvUw6ybZb7CsUEDxAqF'];

// let httpEndpoint = 'http://angelos-eos-testnet.drrrive.com:8888';
let httpEndpoint = 'http://localhost:8888';
let chainId = "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f";

let eos = Eos({keyProvider: keyProvider, httpEndpoint: httpEndpoint, chainId: chainId});

let account = 'slant';
let contract = 'slant';
const EosConnector = {};


function enhanceStats(rows) {
    return rows.map((item) => {
        let total = item.votes_yes + item.votes_no;
        let yes = 0;
        let no = 0;
        if (total > 0) {
            yes = ((item.votes_yes / total) * 100).toFixed(2);
            no = ((item.votes_no / total) * 100).toFixed(2);
        }
        console.log("test:", item, total, yes, no);
        item.percentYes = yes;
        item.percentNo = no;
        return item;
    });
}

function filterInactive(rows) {
    return rows.filter((item) => {
        return item.active
    });
}

EosConnector.fetchQuestions = () => {
    return eos.getTableRows({json:true, scope: account, code: contract,  table: 'topic', limit: 100 }).then(data => {
        console.log('HELLO', data);
        return Promise.resolve(data);
    })
}

EosConnector.addQuestion = (question) => {
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

EosConnector.addVote = (vote) => {
    console.log("vote", vote);
    return eos.transaction({
      actions: [
        {
          account: account,
          name: 'castvote',
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data: {
            sender: "angelo",
            topic_id: vote.question_id,
            author: "Anonymous",
            yesno: parseInt(vote.yesno, 10),
            reason: vote.reason
          }
        }
      ]
    });
}

EosConnector.removeQuestion = (questionId) => {
    console.log("remove question", questionId)
    return eos.transaction({
        actions: [
          {
            account: account,
            name: 'removetopic',
            authorization: [{
              actor: account,
              permission: 'active'
            }],
            data: {
              sender: account,
              topic_id: questionId
            }
          }
        ]
    })
}

export default EosConnector;
