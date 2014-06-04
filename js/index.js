console.log("hey there");

/* $( "#content-big" ).hide(); */
/* $( "#via" ).hide(); */

var active_tab = "klasse"; //active tab as string


function clock() {
   var now = new Date();
   var timeStr = now.getHours()+':'+now.getMinutes();
   var dateStr = now.getDate() + '.' + (now.getMonth()+1) + '.' + now.getFullYear();
   $('header .datum').text(dateStr);
   $('header .zeit').text(timeStr);
}
clock();


/* switch case statement depending on active tab */



var click_tab = function ( event ) {
	var $clicked_elem = $( event.target );
	var $tab = $clicked_elem.closest( '.tablink' );
	
	var $link_name = $tab.attr('name');
	active_tab = $link_name;
	
	switch (active_tab) {
	  case "vonnach":
	    console.log("vonnach");
	   /*
 $('.tab.' + active_tab).siblings().removeClass('active');
	    $('.tab.' + active_tab).addClass('active');
*/
	
	    
	    break;
	  case "via":
	    console.log("via");
	    break;
	  case "datum":
	    console.log("datum");
	    break;
	  case "einfachretour":
	    console.log("einfachretour");
	    break;
	  case "klasse":
	  	console.log("klasse");
	    break;
	  case "tickets":
	    console.log("tickets");
	    break;
}

}

$( 'sidebar a' ).click( click_tab );



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

