$(function () {
  $('#submit').click(function () {
      console.log('OK');
      let value = $('#quote').val();
      if (value) {
        console.log('Send');
        $.post('/quote',{ quote:value },function (data) {
          alert(data)
        });
      }
      // TODO: Fazer o else
  });
});
