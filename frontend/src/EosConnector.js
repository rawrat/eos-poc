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

EosConnector.fetchQuestions = () => {
    return eos.getTableRows({json:true, scope: account, code: contract,  table: 'topic', limit: 100 }).then(data => {
        data.rows = enhanceStats(data.rows);
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
