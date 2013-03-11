<?php
	# Support: Firefox
	header("X-Content-Security-Policy: default-src 'self';");

	# Support: Webkit, Safari 5
	# http://stackoverflow.com/questions/13663302/why-does-my-content-security-policy-work-everywhere-but-safari
	header("X-WebKit-CSP: script-src " . $_SERVER["HTTP_HOST"] . " 'self'");

	header("Content-Security-Policy: default-src 'self'");
?>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>CSP Test Page</title>
	<script>
		if ( parent.location.search.search( /(\?|&)closureCompiler=true/ ) >= 0 ) {
			document.write( "<script src='../../../build/closure-compiler/jquery_compiled.js'><\/script>" );
			document.write( "<script src='../../../build/closure-compiler/csp_data.js'><\/script>" );
		} else {
			document.write( "<script src='../../../dist/jquery.js'><\/script>" );
			document.write( "<script src='csp.js'><\/script>" );
		}
	</script>
</head>
<body>
	<p>CSP Test Page</p>
</body>
</html>
