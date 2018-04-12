/* eslint-disable */
import $ from 'jquery';

// your active private key of the slant account (private key of ActivePubKey that you used when creating the slant account (see README))
let keyProvider = ['5KdCF7dhNReA72xgetKkMffWF7PWXH3g85zi36gmSfZUCgoXWJ8'];


let eos = Eos.Localnet({keyProvider});

let account = 'slant';
let contract = 'slant';
const EosConnector = {};

EosConnector.fetchQuestions = () => {
    return eos.getTableRows({json:true, scope: account, code: contract,  table: 'topic', limit: 100 })
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

export default EosConnector;