$(document).ready(() => {
  
  //修改个人信息
  $('#setUserInfo').click(() => {
    var id = $('#userInfo').find('#setUserInfoId').text(); var realname = $('#userInfo').find('#realname').val();
    var sex = $('#userInfo').find('#sex').val(); var birth = $('#userInfo').find('#birth').val();
    var identity = $('#userInfo').find('#identity').val(); var native_place = $('#userInfo').find('#native_place').val();
    var phone = $('#userInfo').find('#phone').val(); var email = $('#userInfo').find('#email').val();
    if(id, realname, sex, birth, identity, native_place, phone, email) {
      $.ajax({
        url: '/api/setUserInfo', type: 'post',
        dataType: 'json', timeout: 5000,
        headers: { 'x-csrf-token': $.cookie('csrfToken') },
        data: {
          id: id, realname: realname, sex: sex, birth: birth,
          identity: identity, native_place: native_place, phone: phone, email: email
        },
        success: function(response) {
          if(response.result.code == 20000) { alert('修改个人信息成功！'); window.location.reload();
          }else{ alert('未知错误，修改个人信息失败！'); }
        },
        error: function(error) { console.log(error); alert('未知错误，修改个人信息失败！'); }
      })
    }else{ alert('请填写完整个人信息！'); }
  });

  //VIP用户
  if($('.vip').attr('data-target') == 1) { $('.vip').addClass('badge-warning'); $('.vip').attr('title', 'VIP用户'); }
  //VIP简历
  $('.teamplate-type').each(function() {
    if($(this).text() == 'VIP') {
      $(this).css('background-color', '#dc3545');
    }
  })
})