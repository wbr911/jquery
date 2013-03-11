jQuery(function() {
	jQuery('.absolute').click(function() {
		jQuery('#marker').css( jQuery(this).offset() );
		var pos = jQuery(this).position();
		jQuery(this).css({ top: pos.top, left: pos.left });
		return false;
	});
});