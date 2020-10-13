$(document).ready(() => {
  //公共变量
  var loginStatus = false;

  //登录状态
  if($.cookie('loginToken')) {
    loginStatus = true;
    $('#loginButton').text('个人中心');
    $('#loginButton').attr('href', '/home');
    $('#registerButton').text('退出');
    $('#registerButton').attr('id', 'clearCookie');
    $('.user .login').attr('data-toggle', '');
  }else{
    $('.login').mouseover(() => { $('.accountMenu').css('display', 'none'); })
  }

  //退出登录
  $('#clearCookie').click(() => {
    $.removeCookie('loginToken');
    window.location.reload();
  })

  //用户登录
  $('#accountLogin #login').click(() => {
    if(loginStatus) {
      $(location).attr('href', '/home');
    }else{
      const username = $('#accountLogin #username').val();
      const password = $('#accountLogin #password').val();
      $.ajax({
        url: '/login', type: 'post',
        dataType: 'json', timeout: 5000,
        headers: { "x-csrf-token": $.cookie('csrfToken') },
        data: { "username": username, "password": password },
        success: function(response) {
          if(response.result.code == 20000){
            $(location).attr('href', '/home');
          }else{
            alert('账号或密码出现错误！');
          }
        },
        error: function(error) {
          console.log(error);
        }
      })
    }
  })
  
})