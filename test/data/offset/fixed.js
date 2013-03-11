jQuery(function() {
	window.scrollTo(1000,1000);
	jQuery('.fixed').click(function() {
		jQuery('#marker').css( jQuery(this).offset() );
		return false;
	});
});