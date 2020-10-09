$(document).ready(function() {
  //获取getCookie方法
  function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
  }

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
        "x-csrf-token": getCookie("csrfToken")
      },
      data: {
        "username": username,
        "password": password,
        "csrfToken": getCookie("csrfToken")
      },
      success: function(result) {
        console.log(result);
      },
      error: function(error) {
        console.log(error);
      }
    })
  })
})