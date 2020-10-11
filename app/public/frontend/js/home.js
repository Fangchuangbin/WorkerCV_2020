$(document).ready(() => {
	
	

	$('.login').mouseover(() => {
		$('.accountMenu').css('display', 'block');
	})
	$('.user').mouseleave(() => {
		$('.accountMenu').css('display', 'none');
	})
})