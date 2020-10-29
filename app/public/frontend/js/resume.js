$(document).ready(() => {

	//转换简历格式->Sourse=>Html
  $('#RscToText').append($('#Rsc').text());
	$('#TextToHtml').append($('#RscToText').text());

	//保存简历
	$('#setResume').click(() => {
		//转换简历格式->Html=>Sourse
		var HtmlToText = document.createElement('p');
		var TextToRsc = document.createElement('p');
		HtmlToText.innerText = $('#TextToHtml').html();
		$.ajax({
			url: '/api/setResume',
			type: 'post',
			dataType: 'json',
			headers: { 'x-csrf-token': $.cookie('csrfToken') },
			data: {
				resumeName: $('#resumeName').text(), resumeKey: $('#resumeKey').text(),
				resumeCode: TextToRsc.innerText = $(HtmlToText).html(), resumeScore: $('#resumeScore').text()
			},
			success: function(response) { if(response.result.code == 20000) { alert('保存成功！');window.location.reload(); }else{ alert('未知错误，请重试！'); } },
			error: function(error) { alert('未知错误，请重试！'); }
		});
	});

	//下载简历
	$('#downResume').click(() => {
		$.ajax({
			url: '/api/downResume',
			type: 'post',
			dataType: 'json',
			headers: { 'x-csrf-token': $.cookie('csrfToken') },
			data: { resumeName: $('#resumeName').text(), resumeCode: $('#TextToHtml').html() },
			success: function(response) { if(response.result.code === 20000) { 
				setTimeout(function() {
					window.location.href= '/file/' + response.pdfUrl;

					// var download = document.createElement('a');
					// download.href = '/file/' + response.pdfUrl;
					// download.download = $('#resumeName').text();
					// download.click(); download.remove();
				}, 1200);
			}else{ alert('下载失败，请重试！'); } },
			error: function(error) { console.log(error) ; alert('下载失败，请重试！'); }
		});
	});

	//打印简历
	$('#printResume').click(() => { window.print(); });

	//分享简历
	$('#shareResume').click(() => { alert('敬请期待...'); });

	//返回主页
	$('.menu-item-home').text('返回主页');

	//获取用户信息
	$(document).each(function() {
		$('#TextToHtml').find('#realname').text($('#forRealname').text()); //姓名
		$('#TextToHtml').find('#avatar').attr('src', $('#forAvatar').text()); //头像
	})

	//渲染数据
	$('#TextToHtml').bind('DOMNodeInserted', function() {
		var resumeScore = $('#TextToHtml').text().length * 0.033 / 10; //简历评分
		$('#resumeScore').text(resumeScore.toFixed(1));
	});
	
	//工具栏 -> 页边距
	$('#pagePadding').bind('input propertychange', function() {
		setTimeout(() => { $('.resume-template').css('padding', $(this).val() + 'cm'); }, 400)
	});
	//工具栏 -> 行边距
	$('#pageLineHeight').bind('input propertychange', function() {
		setTimeout(() => { $('.resume-box').find('div').css('line-height', $(this).val() + 'px'); }, 400);
	});
	//工具栏 -> 文字大小
	$('#pageFontSize').bind('input propertychange', function() {
		setTimeout(() => { $('.resume-box').find('div').css('font-size', $(this).val() + 'px'); }, 400)
	});
	//工具栏 -> 字体
	$('#pageFontFamily').bind('input propertychange', function() {
		setTimeout(() => { $('.resume-box').find('.resume-template').find('div').css('font-family', $(this).val()); }, 400)
	});
	//工具栏 -> 字体颜色
	$('#pageFontColor').bind('input propertychange', function() {
		setTimeout(() => { $('.resume-box').find('.diy-h4').css('color', $(this).val()); $('.diy-h4').css('border-bottom', '1px solid ' + $(this).val()); $('.diy-f-w-b').css('color', $(this).val()); }, 400)
	})

})

//删除简历
function deleteResume(e) {
	var confirmDel = window.confirm('确定删除所选的简历吗？');
	var resumeKey = e;
	if(confirmDel) {
		$.ajax({
			url: '/api/deleteResume',
			type: 'post',
			dataType: 'json',
			headers: { 'x-csrf-token': $.cookie('csrfToken') },
			data: {
				resumeKey: resumeKey
			},
			success: function(response) {
				if(response.result.code == 20000) { alert('删除简历成功！'); window.location.href = '/home/'; }
			},
			error: function(error) { console.log(error); alert('创建简历失败！'); }
		})
	}
}