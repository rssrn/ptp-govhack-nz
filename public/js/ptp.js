$(document).ready(function(){
	$('#main').load('home.html',function(){
		initMaps();
	});	
	$('.navbar-nav').on('click','li',function(){
		$('.navbar-nav > li ').removeClass('active');
		$(this).addClass('active')
		$('#main').load($(this).data('href'));
	})
	$('#main').on('click','.ontheway',function(){
		loadLayers($(this).val(),$(this).prop('checked'));
	})
	$('#main').on('click','.btn-plan',function(){
		$('html, body').animate({
            scrollTop:($("#googleMap").offset().top - 50)
        }, 1000);
	})
})