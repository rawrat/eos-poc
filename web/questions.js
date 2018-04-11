
// your active private key of the slant account (private key of ActivePubKey that you used when creating the slant account (see README))
let keyProvider = ['5JUpswQJNATU3ne9xYfHxb8E37MPG1anzenvqoretTq2AENHi9Y'];

let eos = Eos.Localnet({keyProvider});

let account = 'slant';
let contract = 'slant';

function load_table() {
    eos.getTableRows({json:true, scope: account, code: contract,  table: 'topic'}).then(res => {
        var table_rows = [];
        $.each(res.rows, function(index, row) {
            table_rows.push('<tr><td>' + row.question + '</td><td>' + row.votes_yes + '</td>' + '<td>' + row.votes_no + '</td>' + ' </tr>');
        });

        $('table tbody').html(table_rows.join('\n'));
    });
}

function addQuestion(event) {
    eos.transaction({
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
            question: $('input[name=question]').val()
          }
        }
      ]
  }).then(x => {
      load_table();
  });
  event.preventDefault();
}

$(function() {
    load_table();
    $('form').submit(addQuestion);
});