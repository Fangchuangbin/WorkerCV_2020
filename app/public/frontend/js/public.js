$(document).ready(() => {
  //公共变量
  var loginStatus = false; //登录状态
  $('.vip').tooltip(); //VIP用户提示
  $('.userAvatar').tooltip(); //设置个人头像提示

  //登录盒子按钮
	$('.login').mouseover(() => { $('.accountMenu').css('display', 'block'); });
  $('.user').mouseleave(() => { $('.accountMenu').css('display', 'none'); });

  //登录状态
  if($.cookie('loginToken')) {
    loginStatus = true;
    $('#loginButton').text('个人中心');
    $('#loginButton').attr('href', '/home');
    $('#registerButton').text('退出');
    $('#registerButton').attr('id', 'clearCookie');
    $('.user .login').attr('data-toggle', '');
    $('.user .register').attr('data-toggle', '');
    $('.menu-item-home').css('display', 'block');
    $('.menu').css('margin-left', '200px');
    $('.menu-item').each(function() { if(document.location.pathname == $(this).attr('href')) { $(this).css('border-bottom', '1px dotted #fff') } })
  }else{
    $('.login').mouseover(() => { $('.accountMenu').css('display', 'none'); })
  }

  //退出登录
  $('#clearCookie').click(() => { $.removeCookie('loginToken', { path: '/' }); window.location.reload(); })

  //已有账号
  $('#registerOff').click(() => {$('#accountRegister').modal('hide')})

  //返回登录
  $('#resetOff').click(() => {$('#resetPassword').modal('hide')})

  //注册账号
  $('#login1Off').click(() => {$('#accountLogin').modal('hide')}) //忘记密码
  $('#login2Off').click(() => {$('#accountLogin').modal('hide')}) //注册账号

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
        headers: { 'x-csrf-token': $.cookie('csrfToken') },
        data: { username: username, password: password },
        success: function(response) {
          if(response.result.code == 20000){
            $(location).attr('href', '/home');
          }else{
            alert('账号或密码出现错误！');
         }
        },
        error: function(error) { console.log(error); alert('账号或密码出现错误！'); }
      })
    }
  })

  //判断简历
  if($('.resume-list-group').attr('data-target') == '') {
    $('.resume-list-group').append('<h3 class="text-secondary text-center p-5">暂无简历，快去新建一份简历吧 (๑╹◡╹)ﾉ"""</h3>');
  }

  //设置个人头像
  $('#changeAvatar').click(() => {
    var formData = new FormData();
    var fileData = $('#avatarFile')[0].files[0];
    formData.append('name', $('#avatarFile').val());
    formData.append('image', fileData);
    $.ajax({
      url: '/api/changeAvatar?_csrf=' + $.cookie('csrfToken'), type: 'post',
      contentType: false, processData: false,
      data: formData,
      success: function(response) {
        console.log(response);
        if(response.result.code == 20000) { alert('设置个人头像成功！'); window.location.reload();
        }else{ alert('设置个人头像失败！'); }
      },
      error: function(error) { console.log(error); alert('更换个人头像失败！'); }

    })
  })

  //用户注册
  $('#register').click(() => {
    var realname = $('#accountRegister').find('#realname').val();
    var phone = $('#accountRegister').find('#phone').val();
    var email = $('#accountRegister').find('#email').val();
    var password = $('#accountRegister').find('#password').val();
    if(realname && username && email && password) {
      $.ajax({
        url: '/api/registerAccount', type: 'post',
        dataType: 'json', timeout: 5000,
        headers: { 'x-csrf-token': $.cookie('csrfToken') },
        data: { realname: realname, phone: phone, email: email, password: password },
        success: function(response) {
          if(response.result.code == 20000){
            alert('注册成功，快去新建一份简历吧 (๑╹◡╹)ﾉ"""');
            $('#registerOff').click();
          }else{ alert('注册用户失败！'); }
        },
        error: function(error) { alert('注册失败，请重试！！'); console.log(error); }
      })
    }else{ alert('请填写完整信息！'); }
  })
})