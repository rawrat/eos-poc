


function load_table() {
    // manual join
    var topics = {};
    eos.getTableRows({json:true, scope: account, code: contract,  table: 'topic', limit:100}).then(res => {
        $.each(res.rows, function(index, row) {
            topics[row.id] = row;
        });
    });

    eos.getTableRows({json:true, scope: account, code: contract,  table: 'vote', limit:100}).then(res => {
        var table_rows = [];
        $.each(res.rows, function(index, row) {
            console.log(JSON.stringify(row));
            table_rows.push('<tr><td>' + row.author + '</td>' + '<td>' + topics[row.topic_id].question + '</td>' + '<td>' + vote(row) +'</td>' + '<td>' + row.reason + '</td>' +  ' </tr>');
        });

        $('table tbody').html(table_rows.join('\n'));

    });
}

function vote(row) {
    return row.yesno ? 'yes' : 'no';
}


$(function() {
    load_table();
});
