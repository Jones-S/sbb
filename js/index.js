console.log("hey there");

$( "#content-big" ).hide();

var click_start_aendern = function ( event ) {
	var $click_elem = $( event.target );
	
	console.log("buttontriggered");
	
	$("sidebar").addClass( 'sidebar-out');
	$("#content" ).hide();
	$("#content-big" ).show();
	
	$("#content-big" ).css('left', '-50px');
	
}

$( '.enterstart a.button.start' ).click( click_start_aendern );

