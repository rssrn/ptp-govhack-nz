function processEvent(e) {
	var key = (e.keyCode ? e.keyCode : e.which);
	if (key == 13) {
		chat();
	}
};

function chat() {
	var $message = $("#message-textarea");
	var message = $message.val();

	console.log('Asking ' + message);

	var newElement = '<div class="row"><div class="col-lg-12"><div class="media"><a class="pull-left" href="#">' +
					 '<img class="media-object img-circle" src="http://lorempixel.com/30/30/people/7/" alt="">' +
                     '</a><div class="media-body"><h4 class="media-heading">Visitor</h4>' +
					 '<p>' + message + '</p></div>' +
                     '</div></div></div><hr>';

    var $chatbox = $("#chatbox");
    $chatbox.append(newElement);

    $message.val('');
    $chatbox.scrollTop($chatbox.prop('scrollHeight') - $chatbox.height());

	var url = "http://localhost:5000/bot?q=" + message;
	$.get(url, function(data) {
		console.log(data);
    	var intent = data.intents[0].intent;
		if (intent === 'toilets') {
			console.log('show toilets');
			if (!$("#toilets").prop('checked'))
				$('#toilets').click();
		} else if (intent == 'walk') {
			console.log('show walking paths');
			if (!$("#walkTrack").prop('checked'))
				$('#walkTrack').click();
		} else if (intent == 'events') {
			console.log('show events');
			if (!$("#event").prop('checked'))
				$('#event').click();
		} else if (intent == 'picnic') {
			console.log('show picnic');
			if (!$("#picTable").prop('checked'))
				$('#picTable').click();
		} else if (intent == 'dog') {
			console.log('show dog walking');
			if (!$("#dogEx").prop('checked'))
				$('#dogEx').click();
		} else if (intent == 'heritage') {
			console.log('show heritage');
			if (!$("#heritage").prop('checked'))
				$('#heritage').click();
		} else {
			console.log('Unknown intent: ' + intent);
		}

		var botsays = data.output.text[0];
		console.log(botsays);

		if (typeof botsays === typeof undefined || botsays === '') {
			botsays = "Sorry, I couldn't understand you. Could you reword it a bit?";
		}

		var newElement = '<div class="row"><div class="col-lg-12"><div class="media"><a class="pull-left" href="#">' +
					 '<img class="media-object img-circle" src="http://lorempixel.com/30/30/people/1/" alt="">' +
                     '</a><div class="media-body"><h4 class="media-heading">Le Bot' + '</h4>' +
					 '<p>' + botsays + '</p></div>' +
                     '</div></div></div><hr>';

    	$chatbox.append(newElement);
    	$chatbox.scrollTop($chatbox.prop('scrollHeight') - $chatbox.height());

    });
};


$(document).ready(function(){
	$('#main').load('home.html',function(){
		initMaps();
	});	
	$('.navbar-nav').on('click','li',function(){
		$('.navbar-nav > li ').removeClass('active');
		$(this).addClass('active')
		$('#main').load($(this).data('href'));
	});
	$('#main').on('click','.ontheway',function(){
		loadLayers($(this).val(),$(this).prop('checked'));
	});
	$('#main').on('click','.btn-plan',function(){
		$('html, body').animate({
            scrollTop:($("#googleMap").offset().top - 50)
        }, 1000);
	});
	
	$("#main").on('click', '#message-btn', function() { chat(); });
})