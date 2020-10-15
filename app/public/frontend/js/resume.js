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
				resumeName: $('#resumeName').text(), resumeKey: $('#resumeKey').text(),
				resumeCode: TextToRsc.innerText = $(HtmlToText).html()
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
					download.click(); download.remove();
				}, 1500);
			}else{ alert('下载失败，请重试！'); } },
			error: function(error) { console.log(error) ; alert('下载失败，请重试！'); }
		});
	});

	//打印简历
	$('#printResume').click(() => { alert('敬请期待...'); });

	//打印简历
	$('#shareResume').click(() => { alert('敬请期待...'); });

	//选择模板
	$('.select-template-item').click(function() {
		$(this).addClass('hover').siblings().removeClass('hover');
	});


	//创建简历
	$('#createResume').click(() => {
		if($('.select-template-group').find('.hover').attr('data-target') !== undefined){
			var userId = $('#selectTeamplateUserId').text();
			var templateKey = $('.select-template-group').find('.hover').attr('data-target');
			var realname = $('#selectTeamplateRealname').text();
			$.ajax({
				url: '/api/createResume',
				type: 'post',
				dataType: 'json',
				headers: { "x-csrf-token": $.cookie('csrfToken') },
				data: {
					"userId": userId,
					"realname": realname,
					"templateKey": templateKey
				},
				success: function(response) {
					if(response.result.code == 20000) { alert('创建简历成功！'); window.location.href = '/resume/edit/' + response.resumeKey; }
				},
				error: function(error) { console.log(error); alert('创建简历失败！'); }
			})
		}else{ alert('请选择简历模板！'); }
	});

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
			headers: { "x-csrf-token": $.cookie('csrfToken') },
			data: {
				"resumeKey": resumeKey
			},
			success: function(response) {
				if(response.result.code == 20000) { alert('删除简历成功！'); window.location.reload(); }
			},
			error: function(error) { console.log(error); alert('创建简历失败！'); }
		})
	}
}