jQuery(function() {
	jQuery('.static').click(function() {
		jQuery('#marker').css( jQuery(this).offset() );
		var pos = jQuery(this).position();
		jQuery(this).css({ position: 'absolute', top: pos.top, left: pos.left });
		return false;
	});
});