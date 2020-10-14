$(document).ready(() => {
  
  //修改个人信息
  $('#userInfo #setUserInfo').click(() => {
    var id = $('#id').text(); var realname = $('#realname').val();
    var sex = $('#sex').val(); var birth = $('#birth').val();
    var identity = $('#identity').val(); var native_place = $('#native_place').val();
    var phone = $('#phone').val(); var email = $('#email').val();
    if(id && realname && sex && birth && identity && native_place && phone && email) {
      $.ajax({
        url: '/api/setUserInfo', type: 'post',
        dataType: 'json', timeout: 5000,
        headers: { "x-csrf-token": $.cookie('csrfToken') },
        data: {
          "id": id, "realname": realname, "sex": sex, "birth": birth,
          "identity": identity, "native_place": native_place, "phone": phone, "email": email
        },
        success: function(response) {
          if(response.result.code == 20000) {
            alert('修改个人信息成功！')
            window.location.reload();
          }
        },
        error: function(error) { alert('未知错误，修改个人信息失败！'); }
      })
    }else{ alert('未知错误，修改个人信息失败！'); }
  });
})