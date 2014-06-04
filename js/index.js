console.log("hey there");

$( "#content-big" ).hide();

function clock() {
   var now = new Date();
   var timeStr = now.getHours()+':'+now.getMinutes();
   var dateStr = now.getDate() + '.' + (now.getMonth()+1) + '.' + now.getFullYear();
   $('header .datum').text(dateStr);
   $('header .zeit').text(timeStr);
}
clock();









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

