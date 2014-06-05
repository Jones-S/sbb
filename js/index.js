$( document ).ready(function(){
	
	console.log("hey there");

	/* $( "#content-big" ).hide(); */
/* 	$( "#vonnach" ).hide(); */
	$( "#via" ).hide();
	$( "#datum" ).hide();
	$( "#einfachretour" ).hide();
	$( "#klasse" ).hide();
	$( "#tickets" ).hide();
	$( "#preis" ).hide();


	
	var active_tab = "vonnach"; //active tab as string
	
	
	function clock() {
	   var now = new Date();
	   var timeStr = now.getHours()+':'+now.getMinutes();
	   var dateStr = now.getDate() + '.' + (now.getMonth()+1) + '.' + now.getFullYear();
	   $('header .datum').text(dateStr);
	   $('header .zeit').text(timeStr);
	}
	clock();
	
	
	/* switch case statement depending on active tab */
	
	var switch_tab = function (){
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
	    $('#content > section').hide();
	    
	    // show the section belonging to the clicked tab
	    $('#content > section#' + active_tab ).show();
	
		switch (active_tab) {
		  case "vonnach":
		  	$('img.active_triangle').css('top', '65px');
		    console.log("active: vonnach");
		    break;
		  case "via":
			$('img.active_triangle').css('top', '183px');
		    console.log("active: via");
		    break;
		  case "datum":
			$('img.active_triangle').css('top', '259px');
		    console.log("active: datum");
		    break;
		  case "einfachretour":
			$('img.active_triangle').css('top', '335px');
		    console.log("active: einfachretour");
		    break;
		  case "klasse":
			$('img.active_triangle').css('top', '410px');
		  	console.log("active: klasse");
		    break;
	      case "tickets":
			$('img.active_triangle').css('top', '486px');
		  	console.log("active: tickets");
		    break;
		  case "preis":
			$('img.active_triangle').css('top', '618px');
		    console.log("active: preis");
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
	
	var next_tab = function ( event ) {
		var $section_name = $( event.target ).closest('section').attr('id');
		console.log( $section_name );
		$('#' + $section_name ).hide();
		$('#' + $section_name ).next().show();
		active_tab = $('#' + $section_name ).next().attr('id'); //update active tab
		switch_tab(); //call switch case function
		
		
	}
	
	$( 'sidebar a' ).click( click_tab );
	$( 'a.next' ).click ( next_tab );
	
	
	
	var click_start_aendern = function ( event ) {
		var $click_elem = $( event.target );
		
		console.log("buttontriggered");
		
		$("sidebar").addClass( 'sidebar-out');
		$("#content" ).hide();
		$("#content-big" ).show();
		
		/* $("#content-big" ).css('left', '-50px'); */
		
	}
	
	var click_zurueck = function ( event ) {
		var $click_elem = $( event.target );
		
		console.log("zurueck");
		
		$("sidebar").removeClass( 'sidebar-out');
		$("#content" ).show();
		$("#content-big" ).hide();
		
		/* $("#content-big" ).css('left', '-50px'); */
		
	}
	
	$( '.enterstart a.button.start, .enterdestination a.button.ziel' ).click( click_start_aendern );
	$( '.zieleingabe a.button.zurueck' ).click( click_zurueck );
	
	$( '.enterstart input, .enterdestination input' ).focus( click_start_aendern );
	
	
	
	/* ----- Via Verbindungen ------- */
	
	
/* 	$('.timetable').hide(); */
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