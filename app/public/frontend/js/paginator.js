$(document).ready(function() {
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
})