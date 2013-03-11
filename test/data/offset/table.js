jQuery(function() {
	jQuery('table, th, td').click(function() {
		jQuery('#marker').css( jQuery(this).offset() );
		return false;
	});
});