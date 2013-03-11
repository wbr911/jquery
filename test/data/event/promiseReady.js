jQuery.when( jQuery.ready ).done(function() {
	jQuery("body").append("<div>modifying DOM</div>");
	window.parent["iframeCallback"]( $("div").text() === "modifying DOM" );
});