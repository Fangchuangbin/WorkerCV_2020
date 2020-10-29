$(document).ready(function() {


  //当前高亮
  $('.menu-item').each(function() { if($(this).attr('href') == '/template/') { $(this).css('border-bottom', '1px dotted #fff') } })

  //模板列表首页判断VIP
  $('.list-box').find('.teamplate-type').each(function() {
    if($(this).text() == 'VIP') {
      $(this).addClass('badge-warning')
    }
  })


  //列表分类
  $(function templateListClass() {
    $('.class-item-main').find('a').each(function() {
      if($(this).text() == $('.template-class').attr('class-data')) {
        $(this).addClass('text-danger'); $(this).addClass('font-weight-bold');
        $(this).attr('bold-data','true')
      }
    })
    $('.template-class-list').find('.template-type').each(function() {
      if($(this).text() !== '免费') {
        $(this).addClass('badge-warning');
      }
    })
    $('.template-class-item').each(function() {
      if($(this).height() > 35) { $(this).css('height', '38px'); $(this).find('.class-item-more').css('display', 'block'); }
      $(this).find('.class-item-more').click(() => {
        if($(this).find('.class-item-more').text() == '更多 >') {
          $(this).css('height', 'auto'); $(this).find('.class-item-more').find('a').text('收回 <');
        }else{
          $(this).css('height', '38px'); $(this).find('.class-item-more').find('a').text('更多 >');
        }
      })
    })
    $('.template-class').find('.item-1').each(function() {
      if($(this).find('a').hasClass('font-weight-bold')){ $(this).css('height', 'auto'); $(this).find('.class-item-more').find('a').text('收回 <'); }
    })
    $('.template-class').find('.item-2').each(function() {
      if($(this).find('a').hasClass('font-weight-bold')){ $(this).css('height', 'auto'); $(this).find('.class-item-more').find('a').text('收回 <'); }
    })
    $('.template-class').find('.item-3').each(function() {
      if($(this).find('a').hasClass('font-weight-bold')){ $(this).css('height', 'auto'); $(this).find('.class-item-more').find('a').text('收回 <'); }
    })
    $('.template-class').find('.item-4').each(function() {
      if($(this).find('a').hasClass('font-weight-bold')){ $(this).css('height', 'auto'); $(this).find('.class-item-more').find('a').text('收回 <'); }
    })
  })

  //判断上下文
  if($('.context').find('.prev').attr('data-target') == '') { $('.context').find('.prev').text('上一个：暂无'); };
  if($('.context').find('.next').attr('data-target') == '') { $('.context').find('.next').text('下一个：暂无'); $('.context').find('.next').attr('href', 'javascript:void(0);') };

  //判断简历类型
  if($('.template-item-main') !== '免费') { $('.template-item-main').find('.template-type').addClass('badge-warning') }
})