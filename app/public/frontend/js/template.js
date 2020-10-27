$(document).ready(function() {
  //当前高亮
  $('.menu-item').each(function() { if($(this).attr('href') == '/template/') { $(this).css('border-bottom', '1px dotted #fff') } })

  //列表分页
  $(function listPaginator() {
    var currentPage = Number($('.template-page').attr('page-data')); //获取当前页面
    var totalPages = Number($('.template-page').attr('all-page-data')); //获取总页面
    var pathname = window.location.pathname; //获取路径
    if(!currentPage) { currentPage = Number('1') }
    $('#templateListPagination').jqPaginator({
      totalPages: totalPages,
      currentPage: currentPage,
      first: '<li class="page-item first"><a class="page-link text-secondary" href="javascript:void(0);">首页</a></li>',
      prev: '<li class="page-item prev"><a class="page-link text-secondary" href="javascript:void(0);">上一页</a></li>',
      next: '<li class="page-item next"><a class="page-link text-secondary" href="javascript:void(0);">下一页</a></li>',
      last: '<li class="page-item last"><a class="page-link text-secondary" href="javascript:void(0);">末页</a></li>',
      page: '<li class="page-item page"><a class="page-link text-secondary" href="' + pathname +'?page={{page}}">{{page}}</a></li>',
      onPageChange: function (num) { $('.template-page').attr('come-data', num); },
    });
    var firstPage = $('.template-page').find('.first').attr('jp-data');
    $('.template-page').find('.first').find('a').attr('href', pathname+ '?page=' + firstPage);
    var prevPage = $('.template-page').find('.prev').attr('jp-data');
    $('.template-page').find('.prev').find('a').attr('href', pathname+ '?page=' + prevPage);
    var nextPage = $('.template-page').find('.next').attr('jp-data');
    $('.template-page').find('.next').find('a').attr('href', pathname+ '?page=' + nextPage);
    var lastPage = $('.template-page').find('.last').attr('jp-data');
    $('.template-page').find('.last').find('a').attr('href', pathname+ '?page=' + lastPage);
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
})