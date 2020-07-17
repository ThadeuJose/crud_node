$(function () {
  pollQuotes();

  $('#submit').click(function () {
      console.log('OK');
      let value = $('#quote').val();
      if (value) {
        console.log('Send');
        $.post('/quote',{ quote:value },function (data) {
          pollQuotes();
        });
      }
      // TODO: Fazer o else
  });

  function pollQuotes(){
    $.get( "/allquote", function(data) {
        console.log(data);
        $('#quotes').empty();
        for (var i of data) {
          console.log(i);
          let btnDelete = $('<button>').text('Delete').click(deleteQuote);

          $('<div>')
              .text(i.quote)
              .attr('id',i.id)
              .append(btnDelete)
              .appendTo($('#quotes'));
        }
    });
  }

  function deleteQuote(e){
    let id = e.target.parentElement.id
    console.log(id);

    $.ajax({
        url: '/quote/'+id,
        type: 'DELETE',
        success: function(data) {
            console.log(data);
            pollQuotes();
        }
    });
  }


});
