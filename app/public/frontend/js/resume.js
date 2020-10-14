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
			headers: { "x-csrf-token": $.cookie('csrfToken') },
			data: {
				resumeName: $('#resumeName').text(), resumeToken: $('#resumeToken').text(),
				resumeCode: TextToRsc.innerText = $(HtmlToText).html()
			},
			success: function(response) { if(response.result.code == 20000) { alert('保存成功！'); }else{ alert('未知错误，请重试！'); } },
			error: function(error) { alert('未知错误，请重试！'); }
		});
	});

	//下载简历
	$('#downResume').click(() => {
		$.ajax({
			url: '/api/downResume',
			type: 'post',
			dataType: 'json',
			headers: { "x-csrf-token": $.cookie('csrfToken') },
			data: {
				resumeName: $('#resumeName').text(),
				resumeCode: $('#TextToHtml').html()
			},
			success: function(response) { if(response.result.code === 20000) { 
				setTimeout(function() {
					var download = document.createElement('a');
					download.href = '/' + response.pdfUrl;
					download.download = $('#resumeName').text();
					download.click();
					download.remove();
				}, 1500);
			}else{ alert('下载失败，请重试！'); } },
			error: function(error) { alert('下载失败，请重试！'); }
		});
	});

	//打印简历
	$('#printResume').click(() => {
		alert('敬请期待...')
	})
})