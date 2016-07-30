$(document).ready(function(){
	$('#main').load('home.html');
	$('.navbar-nav').on('click','li',function(){
		$('.navbar-nav > li ').removeClass('active');
		$(this).addClass('active')
		$('#main').load($(this).data('href'));
	})
})