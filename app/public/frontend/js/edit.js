$(document).ready(function() {
	$('#manager :input').bind('input propertychange', function() {
		$('#temp-name').text($('#manager-name').val());
	});

	$('#createcv').click(function() {
		console.log($('#temp-id').html());
		$.ajax({
			url: '/createPDF',
			type: 'get',
			dataType: 'json',
			data: {
				html: $('#temp-id').html()
			},
			error: function(err) {
				console.log(err);
			},
			success: function(result) {
				setTimeout(function() {
					window.open('/' + result.outpdf)
				}, 1500);
			}
		})
	})
})