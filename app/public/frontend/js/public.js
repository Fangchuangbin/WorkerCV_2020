$(document).ready(() => {

  //登录状态
  if($.cookie('loginToken')) {
    $('#loginButton').text('个人中心');
    $('#loginButton').attr('href', '/home');
    $('#registerButton').text('退出');
    $('#registerButton').attr('id', 'clearCookie');
    $('.user .login').attr('data-toggle', '');
    $('.menu-item-home').css('display', 'block');
    $('.menu').css('margin-left', '200px');
    $('.menu-item').each(function() {
      if(document.location.pathname == $(this).attr('href')) {
        $(this).css('border-bottom', '1px dotted #fff') }
      }
    )
  }else{
    $('.login').mouseover(() => { $('.accountMenu').css('display', 'none'); })
  }

  //退出登录
  $('#clearCookie').click(() => {
    $.removeCookie('loginToken', { path: '/' });
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
        url: '/api/getUser', type: 'post',
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