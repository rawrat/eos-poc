


function load_table() {
    eos.getTableRows({json:true, scope: account, code: contract,  table: 'topic', limit:100}).then(res => {
        var table_rows = [];
        let rows = res.rows.filter(x => x.active);
        $.each(rows, function(index, row) {
            table_rows.push('<tr><td><a target="_new" href="vote.html?id=' + row.id + '">' + row.question + '</a></td><td>' + row.votes_yes + '</td>' + '<td>' + row.votes_no + '</td>' + '<td><a href="#" class="delete" data-id="' + row.id + '">x</a>' + '</td>' + ' </tr>');
        });

        $('table tbody').html(table_rows.join('\n'));
        $('a.delete').click(function(event) {
          event.preventDefault();
          console.log("ohai " + $(event.target).data().id );
          eos.transaction({
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
                  topic_id: $(event.target).data().id
                }
              }
            ]
        }).then(x => {
            load_table();
        });
        })
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
