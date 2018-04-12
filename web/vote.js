
var question_id;
function load_data() {
    // id of the question
    question_id = getUrlParameter('id');
    eos.getTableRows({json:true, scope: account, code: contract,  table: 'topic', table_key: question_id}).then(res => {
        // filtering by table_key doesn't seem to work in current master, so we're filtering manually
        let row = get_row_by_key(res.rows, question_id);

        $('h1').text(row.question);

        let total = row.votes_yes + row.votes_no;
        var yes, no;
        if(total > 0) {
            yes = row.votes_yes / total;
            no = row.votes_no / total;
        } else {
            yes = 0;
            no = 0;
        }

        $('span.votes_yes').text(decimal_to_percent_rounded(yes) + "% Ja");
        $('span.votes_no').text(decimal_to_percent_rounded(no) + "% Nein");

        console.log(row.question);
    });
}

function castVote(event) {
    eos.transaction({
      actions: [
        {
          account: account,
          name: 'castvote',
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data: {
            topic_id: question_id,
            author: "Anonymous",
            yesno: parseInt($('select[name=yesno').val(), 10),
            reason: $('input[name=reason]').val()
          }
        }
      ]
  }).then(x => {
      load_data();
  });
  event.preventDefault();
}

$(function() {
    load_data();
    $('form').submit(castVote);
});

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function get_row_by_key(rows, key) {
    for (var i in rows) {
        if(rows[i].id == key) {
            return rows[i];
        }
    }
}

function decimal_to_percent_rounded(value) {
    return Math.round(100*value);
}
