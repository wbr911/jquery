jQuery(function() {
	window.scrollTo(1000,1000);
	jQuery('#scroll-1')[0].scrollLeft = 5;
	jQuery('#scroll-1')[0].scrollTop = 5;
	jQuery('.scroll').click(function() {
		jQuery('#marker').css( jQuery(this).offset() );
		return false;
	});
});