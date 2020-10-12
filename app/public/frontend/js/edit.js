$(document).ready(function() {
	$('#manager :input').bind('input propertychange', function() {
		$('#temp-name').text($('#manager-name').val());
	});

	$('#createcv').click(function() {
		//console.log($('#temp-id').html());
		// $.ajax({
		// 	url: '/createPDF',
		// 	type: 'post',
		// 	dataType: 'json',
		// 	headers: { "x-csrf-token": $.cookie('csrfToken') },
		// 	data: {
		// 		html: $('#temp-id').html()
		// 	},
		// 	error: function(err) {
		// 		console.log(err);
		// 	},
		// 	success: function(result) {
		// 		setTimeout(function() {
		// 			window.open('/' + result.outpdf)
		// 		}, 1500);
		// 	}
		// });
		var p1 = document.createElement('p');
		var p2 = document.createElement('p');
		p1.innerText = $('#temp-id').html();
		p2.innerText = $(p1).html();
		console.log(p2);
		$.ajax({
			url: '/setResume',
			type: 'post',
			dataType: 'json',
			headers: { "x-csrf-token": $.cookie('csrfToken') },
			data: {
				resumeData: p2.innerText = $(p1).html()
			},
			error: function(err) {
				console.log(err);
			},
			success: function(result) {
				console.log(result);
			}
		})
	})
})