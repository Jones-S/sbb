$( document ).ready(function(){
	
	console.log("hey there");

	$( "#content-big" ).hide();
/* 	$( "#vonnach" ).hide(); */
	$( "#via" ).hide();
	$( "#datum" ).hide();
	$( "#einfachretour" ).hide();
	$( "#klasse" ).hide();
	$( "#tickets" ).hide();
	$( "#preis" ).hide();
	$( "p.aendern").hide();


	
	var active_tab = "vonnach"; //active tab as string
	var current_count_half = 0;
	var current_count_full = 0;
	
	var ticket_values = {
		start:"Zürich HB", 
		ziel: "", 
		via: undefined,
		datum: undefined,
		einfachretour: undefined,
		klasse: undefined,
		tickets: {
			halbtax: 0,
			ganz: 0,
		},
		preis: {
			chf: "CHF 157.20",
			euro: "€ 110.40",
		}
	};
	
	function arrayshow() {
		console.log(ticket_values['klasse']);
	};
	arrayshow();
	
	var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
	
	function clock() {
	   var now = new Date();
	   var timeStr = now.getHours()+':'+now.getMinutes();
	   var dateStr = now.getDate() + '. ' + monthNames[now.getMonth()] + ' ' + now.getFullYear();
	   $('header .datum').text(dateStr);
	   $('header .zeit').text(timeStr);
	};
	clock();
	
	
	/* switch case statement depending on active tab */
	
	var switch_tab = function ( event ){
		//on every click; remove all active classes and add it to the clicked tab
		$('.tab.' + active_tab).siblings().removeClass('active');
	    $('.tab.' + active_tab).addClass('active');
	    
	    //make all icons grey except clicked one
	    $('.tab img').not('.tab.' + active_tab + ' img').each(function() {
		    var $imgsrc = $( this ).attr('src');
		    var newsrc = $imgsrc.replace("white", "grey");
		    $( this ).attr('src', newsrc);
/* 		    console.log(newsrc); */
	    });
	    
	    // change icon -> get src as string replace grey > white
		var $imgsrc = $('.tab.' + active_tab + ' img').attr('src');
		var newsrc = $imgsrc.replace("grey", "white");
	    $('.tab.' + active_tab + ' img').attr('src', newsrc);

	    
	    // hide all sections in content
	    $('#content > section').fadeOut(100);
	    
	    // show the section belonging to the clicked tab
	    $('#content > section#' + active_tab ).delay( 100 ).fadeIn(200);
	
		switch (active_tab) {
		  case "vonnach":
		  	$('img.active_triangle').css('top', '65px');
		    break;
		  case "via":
			$('img.active_triangle').css('top', '183px');
		    break;
		  case "datum":
			$('img.active_triangle').css('top', '259px');
		    break;
		  case "einfachretour":
			$('img.active_triangle').css('top', '335px');
		    break;
		  case "klasse":
			$('img.active_triangle').css('top', '410px');
		    break;
	      case "tickets":
			$('img.active_triangle').css('top', '486px');
		    break;
		  case "preis":
			$('img.active_triangle').css('top', '618px');
		    break;
		}
	}
	
	var click_tab = function ( event ) {
		var $clicked_elem = $( event.target );
		var $tab = $clicked_elem.closest( '.tablink' );
		
		var $link_name = $tab.attr('name');
		active_tab = $link_name;
	    
	    switch_tab();
		
			
	
	}
	
	var goto_via = function () {
		active_tab = "via";
		switch_tab(); //call switch tab
		//redundant but fuck it... (click_zurueck would do the same, but it aint working)
		setTimeout(function(){
        	$('sidebar').removeClass('sidebar-out');
		}, 200);
		$("#content-big" ).fadeOut( 300 );
		$("#content" ).delay( 300 ).fadeIn( 300 );
		//set ziel
		ticket_values['ziel'] = $('input.autocomplete').val();;
		//update summary
		update('ziel', $('input.autocomplete').val()); //passing wahl = ziel und value = input value
		$(".autocomplete").blur();
	}
	
	
	var update = function ( wahl, value ){
		
		if ( wahl != 'tickets' ){
			ticket_values[wahl] = value;
		} else {
			ticket_values[wahl]['halbtax'] = value[0];
			ticket_values[wahl]['ganz'] = value[1];
		}
		switch (wahl) {
			case "ziel":
				if (ticket_values['ziel'] == "") {
					$('p.zielort').text('Zielort');
				} else {
					$('.zielort').text(ticket_values['ziel']);
				}
				$('.vonnach p.aendern').show();
				break;
			case "via":
				$('li.via p.beschreibung').text(ticket_values[wahl]);
				$('.via p.aendern').show();
				break;
			case "datum":
				$('li.datum p.beschreibung').text(ticket_values[wahl]);
				$('.datum p.aendern').show();
				break;
			case "einfachretour":
				$('li.einfachretour p.beschreibung').text(ticket_values[wahl]);
				$('.einfachretour p.aendern').show();
				break;
			case "klasse":
				$('li.klasse p.beschreibung').text(ticket_values[wahl]);
				$('.klasse p.aendern').show();
				break;
			case "tickets":
				console.log(value);
				$('li.tickets p.beschreibung').text( ticket_values['tickets']['halbtax']+ 'x Halbtax, ' +  ticket_values['tickets']['ganz'] + 'x Erwachsene');
				$('li.preis p.chf').text(ticket_values['preis']['chf']);
				$('li.preis p.euro').text(ticket_values['preis']['euro']);
				$('li.tickets p.beschreibung').css('font-size', '14px');
				$('.tickets p.aendern').show();
				$('.preis p.aendern').show();
				break;
				
	  	}

	}
	
	var next_tab = function ( event ) {
		var $section_name = $( event.target ).closest('section').attr('id');
		$('#' + $section_name ).hide();
		$('#' + $section_name ).next().show();
		active_tab = $('#' + $section_name ).next().attr('id'); //update active tab
		switch_tab( ); //call switch case function
		
		if ($section_name != 'tickets'){
			var $value = $(event.target).attr('data-value');
		} else if ( $section_name = 'tickets' ) {
			var $halbtax_ct = $('.counter:first').text();
			var $ganz_ct = $('.counter:eq(1)').text(); //get second of class counter
			if ($halbtax_ct == '–'){ $halbtax_ct = '0'};
			if ($ganz_ct == '–'){ $ganz_ct = '0'}
			var $value = [$halbtax_ct, $ganz_ct]; //array with numbers
		}
		//var $value = $(event.target).dataset;
		//$value.dataset.value = mein wert   ( in html: data-value="mein wert" )
		//funktioniert leider nicht - JONAS
		
		
		update( $section_name, $value ); //update summary
		
	}
	
	var counter = function ( event ) {
		$target = $(event.target); //a.button.plus
		// check if plus or minus is clicked
		if ( $(this).attr("class") != undefined && $(this).hasClass('plus') ) {
			console.log("+");
			if ($(this).hasClass('half')) {
				current_count_half ++;
				$target.parent().parent().find( 'a.counter').text(current_count_half);
			} else {
				current_count_full ++;
				$target.parent().parent().find( 'a.counter').text(current_count_full);
			}
			
		} else {
			console.log("-");
			if ($(this).hasClass('half')){
				current_count_half --;
				if(current_count_half <= 0){
					$target.parent().parent().find( 'a.counter').text("–");
					current_count_half = 0;
				}
				$target.parent().parent().find( 'a.counter').text(current_count_half);
			} else {
				current_count_full --;
				if(current_count_full <= 0){
					$target.parent().parent().find( 'a.counter').text("–");
					current_count_full = 0;
				}
				$target.parent().parent().find( 'a.counter').text(current_count_full);
			}

		};
	}
	
	var vorschlaege = [ "c++", "java", "php", "coldfusion", "javascript", "asp", "ruby" ];
	$( ".autocomplete" ).autocomplete({
		source: function( request, response ) {
			$.get('http://transport.opendata.ch/v1/locations?query=' + request.term,
			function callback (data) {
				var dataarray = [];
				for (var i = 0; i < data.stations.length; i++){
					dataarray.push(data.stations[i].name);
				}
				response(dataarray);
			});
		}
	});
	
	$( 'sidebar a' ).click( click_tab );
	$( 'a.next' ).click ( next_tab );
	$( 'a.next2' ).click ( goto_via );
	$( '#tickets .plus, #tickets .minus').click ( counter ); //call counter func on -/+
	$( '.ui-corner-all' ).click ( goto_via );
	
	
	
	var click_start_aendern = function ( event ) {
		var $click_elem = $( event.target );
		console.log("buttontriggered");
		$("sidebar").addClass( 'sidebar-out');
		$("#content" ).hide();
		$("#content-big" ).css('left', '0');
		$("#content-big" ).delay( 250 ).fadeIn( 250 );
	}
	
	var click_zurueck = function ( event ) {
		var $click_elem = $( event.target );
		console.log("zurueck");
		//delay removing class -> time to fadeout keyboard
		setTimeout(function(){
        	$('sidebar').removeClass('sidebar-out');
		}, 200);
		$("#content-big" ).fadeOut( 300 );
		$("#content" ).delay( 300 ).fadeIn( 300 );
	}
	
	$( '.enterstart a.button.start, .enterdestination a.button.ziel' ).click( click_start_aendern );
	$( '.zieleingabe a.button.zurueck' ).click( click_zurueck );
	
	$( '.enterstart input, .enterdestination input' ).focus( click_start_aendern );
	
	
	
	/* ----- Via Verbindungen ------- */
	
	
	$('.timetable').hide();
	$('.button.via-info').click(function() {
		if( $('.timetable').is(':hidden') ) {
			$('.timetable').slideDown(500);
			console.log("DOWN");
		} else {
	    	$('.timetable').slideUp();
	    	console.log("UP");
		}
    	console.log("infobutton mached");
    });
	
});