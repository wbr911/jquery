jQuery(function() {
	jQuery('body').click(function() {
		jQuery('#marker').css( jQuery(this).offset() );
		return false;
	});
});