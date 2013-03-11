window.onunload = function() {};
jQuery(function() {
	setTimeout(function() {
		var parent = window.parent;
		document.write("");
		parent.iframeCallback();
	}, 200 );
	var number = 50;
	while( number-- ) {
		jQuery.ajax("../name.php?wait=600");
	}
});