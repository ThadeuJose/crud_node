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
          $('<div>').text(i.quote).appendTo($('#quotes'));
        }
    });
  }
});
