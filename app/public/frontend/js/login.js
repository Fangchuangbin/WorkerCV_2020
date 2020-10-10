$(document).ready(function() {
  //用户登录
  $('#accountLogin #login').click(function() {
    var checkStatus = false;
    if($('#checkStatus').prop("checked") == true) {
      checkStatus = true;
      console.log(checkStatus);
    }
    const username = $('#accountLogin #username').val();
    const password = $('#accountLogin #password').val();
    $.ajax({
      url: '/login',
      type: 'post',
      dataType: 'json',
      timeout: 5000,
      headers: {
        "x-csrf-token": $.cookie('csrfToken')
      },
      data: {
        "username": username,
        "password": password
      },
      success: function(response) {
        console.log(response);
        if(response.result.code == 20000){
          alert('登录成功');
          $(location).attr('href', '/admin/' + response.verifyAccount.id);
        }else{
          alert('账号或密码出现错误！');
        }
      },
      error: function(error) {
        console.log(error);
      }
    })
  })
})