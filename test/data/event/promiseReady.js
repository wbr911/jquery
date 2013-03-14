jQuery.when( jQuery.ready ).done(function() {
	jQuery("body").append("<div>modifying DOM</div>");
	window.parent["iframeCallback"]( jQuery("div").text() === "modifying DOM" );
});