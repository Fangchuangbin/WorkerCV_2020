$(document).ready(() => {
  
  //公共变量
  var loginStatus = false; //用户登录状态

  //登录盒子按钮
	$('.login').mouseover(() => { $('.accountMenu').css('display', 'block'); });
  $('.user').mouseleave(() => { $('.accountMenu').css('display', 'none'); });

  //当前高亮
  $('.menu-item').each(function() { if(document.location.pathname == $(this).attr('href')) { $(this).css('border-bottom', '1px dotted #fff') } })

  //登录状态
  if($.cookie('loginToken')) {
    loginStatus = true;
    $('#loginButton').text('个人中心');
    $('#loginButton').attr('href', '/home/');
    $('#registerButton').text('退出');
    $('#registerButton').attr('id', 'clearCookie');
    $('.user .login').attr('data-toggle', '');
    $('.user .register').attr('data-toggle', '');
    $('.menu-item-home').css('display', 'block');
    $('.menu').css('margin-left', '200px');
  }else{ $('.login').mouseover(() => { $('.accountMenu').css('display', 'none'); }) }

  //退出登录
  $('#clearCookie').click(() => { $.removeCookie('loginToken', { path: '/' }); window.location.reload(); })

  //已有账号
  $('#registerOff').click(() => {$('#accountRegister').modal('hide')})

  //返回登录
  $('#resetOff').click(() => {$('#forgetPassword').modal('hide')})

  //注册账号
  $('#login1Off').click(() => {$('#accountLogin').modal('hide')}) //忘记密码
  $('#login2Off').click(() => {$('#accountLogin').modal('hide')}) //注册账号

  //首页->查看更多模板
  $('#moreTeamplate').click(() => {
    if($.cookie('loginToken')) {
      window.location.href = '/template';
    }else{ $('#resetOff').click() }
  })

  //首页->免费制作专业简历
  $('.makeResume').click(() => {
    if($.cookie('loginToken')) {
      window.location.href = '/home/';
    }else{ $('#resetOff').click() }
  })

  //用户登录
  $('#accountLogin #login').click(() => {
    if(loginStatus) {
      $(location).attr('href', '/home/');
    }else{
      const username = $('#accountLogin #username').val();
      const password = $('#accountLogin #password').val();
      $.ajax({
        url: '/api/login', type: 'post',
        dataType: 'json', timeout: 5000,
        headers: { 'x-csrf-token': $.cookie('csrfToken') },
        data: { username: username, password: password },
        success: function(response) {
          if(response.result.code == 20000){
            $(location).attr('href', '/home/');
          }else{ alert('账号或密码出现错误！'); }
        },
        error: function(error) { console.log(error); alert('账号或密码出现错误！'); }
      })
    }
  })

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
        url: '/api/register', type: 'post',
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

  //忘记密码->重置密码
  $('#forgetPassword').find('#resetNewPassword').click(() => {
    var realname = $('#forgetPassword').find('#realname').val();
    var phone = $('#forgetPassword').find('#phone').val();
    var email = $('#forgetPassword').find('#email').val();
    var resetQuestion = $('#forgetPassword').find('#resetQuestion').val();
    var resetAnswer = $('#forgetPassword').find('#resetAnswer').val();
    if(realname && phone && email && resetQuestion && resetAnswer) {
      $.ajax({
        url: '/api/forgetPassword', type: 'post',
        dataType: 'json', timeout: 5000,
        headers: { 'x-csrf-token': $.cookie('csrfToken') },
        data: { realname: realname, phone: phone, email: email, resetQuestion: resetQuestion, resetAnswer: resetAnswer },
        success: function(response) {
          if(response.result.code == 20000) {
            var forgetPassword = prompt('请输入你要设置的新密码：');
            if(forgetPassword) {
              $.ajax({
                url: '/api/resetNewPassword', type: 'post',
                dataType: 'json', timeout: 5000,
                headers: { 'x-csrf-token': $.cookie('csrfToken') },
                data: { userId: response.forgetPassword.id, nowPassword: response.forgetPassword.password, newPassword: forgetPassword },
                success: function(response) {
                  if(response.result.code == 20000) { alert('重置密码成功！'); window.location.reload(); }else{ alert('修改密码失败！'); }
                },
                error: function(error) { alert('重置密码失败！'); console.log(error); }
              })
            }
          }else{ alert('信息填写错误，重置密码失败！'); }
        },
        error: function(error) { alert('信息填写错误，重置密码失败！'); console.log(error); }
      })
    }else{
      alert('请填写完整信息！');
    }
  })
})