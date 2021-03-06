
var
	// Map over jQuery in case of overwrite
	_jQuery = window[ "jQuery" ],

	// Map over the $ in case of overwrite
	_$ = window[ "$" ],
	
	// A central reference to the root jQuery(document)
	rootjQuery;

/**
 * Define a local copy of jQuery
 * @constructor
 * @const
 * @param {(jQuerySelector|Element|Object|Array.<Element>|jQuery|string|
 *     function())=} selector
 * @param {(Element|jQuery|Document|
 *     Object.<string, (string|function(!Event=))>)=} context
 * @return {!jQuery}
 */
var jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	};

(function() {

var
	// The deferred used on DOM ready
	readyList,

	// Support: IE<9
	// For `typeof node.method` instead of `node.method !== undefined`
	core_strundefined = typeof undefined,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,
	location = window.location,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "@VERSION",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler
	completed = function( event ) {

		// readyState === "complete" is good enough for us to call the dom ready in oldIE
		if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
			detach();
			jQuery.ready();
		}
	},
	// Clean-up method for dom ready events
	detach = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", completed, false );
			window.removeEventListener( "load", completed, false );

		} else {
			document.detachEvent( "onreadystatechange", completed );
			window.detachEvent( "onload", completed );
		}
	};

jQuery.fn = jQuery.prototype;

	// The current version of jQuery being used
jQuery.prototype.jquery = core_version;

jQuery.prototype.constructor = jQuery;
jQuery.prototype.init = /** @type {function(new:jQuery,?,?,?)} */ ( function( selector, context, rootjQuery ) {
	var match, elem;

	// HANDLE: $(""), $(null), $(undefined), $(false)
	if ( !selector ) {
		return this;
	}

	// Handle HTML strings
	if ( typeof selector === "string" ) {
		if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
			// Assume that strings that start and end with <> are HTML and skip the regex check
			match = [ null, selector, null ];

		} else {
			match = rquickExpr.exec( selector );
		}

		// Match html or make sure no context is specified for #id
		if ( match && (match[1] || !context) ) {

			// HANDLE: $(html) -> $(array)
			if ( match[1] ) {
				context = context instanceof jQuery ? context[0] : context;

				// scripts is true for back-compat
				jQuery.merge( /** @type {!jQuery} */ ( this ), jQuery.parseHTML(
					match[1],
					context && context.nodeType ? context.ownerDocument || context : document,
					true
				) );

				// HANDLE: $(html, props)
				if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
					for ( match in context ) {
						// Properties of context are called as methods if possible
						if ( jQuery.isFunction( this[ match ] ) ) {
							this[ match ]( context[ match ] );

						// ...and otherwise set as attributes
						} else {
							this.attr( match, context[ match ] );
						}
					}
				}

				return this;

			// HANDLE: $(#id)
			} else {
				elem = document.getElementById( match[2] );

				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				if ( elem && elem.parentNode ) {
					// Handle the case where IE and Opera return items
					// by name instead of ID
					if ( elem.id !== match[2] ) {
						return rootjQuery.find( selector );
					}

					// Otherwise, we inject the element directly into the jQuery object
					this.length = 1;
					this[0] = elem;
				}

				this.context = document;
				this.selector = selector;
				return this;
			}

		// HANDLE: $(expr, $(...))
		} else if ( !context || context.jquery ) {
			return ( context || rootjQuery ).find( selector );

		// HANDLE: $(expr, context)
		// (which is just equivalent to: $(context).find(expr)
		} else {
			return this.constructor( context ).find( selector );
		}

	// HANDLE: $(DOMElement)
	} else if ( selector.nodeType ) {
		this.context = this[0] = selector;
		this.length = 1;
		return this;

	// HANDLE: $(function)
	// Shortcut for document ready
	} else if ( jQuery.isFunction( selector ) ) {
		return rootjQuery.ready( selector );
	}

	if ( selector.selector !== undefined ) {
		this.selector = selector.selector;
		this.context = selector.context;
	}

	return /** @type {!jQuery} */ ( jQuery.makeArray( selector, /** @type {!jQuery} */ ( this ) ) );
} );

// Start with an empty selector
jQuery.prototype.selector = "";

/** @type {number} The default length of a jQuery object is 0 */
jQuery.prototype.length = 0;

	/** @return {number} the number of elements contained in the matched element set */
jQuery.prototype.size = function() {
		return this.length;
	};

	/** @return {Array.<*>} */
jQuery.prototype.toArray = function() {
	return core_slice.call( this );
};

/**
 * Get the Nth element in the matched element set OR
 * Get the whole matched element set as a clean array
 * @param {number=} num
 * @return {(Element|Window|Document|Node|Array.<Element|Window|Document|Node>)}
 */
jQuery.prototype.get = function( num ) {
	return num == null ?

		// Return a 'clean' array
		this.toArray() :

		// Return just the object
		( num < 0 ? this[ this.length + num ] : this[ num ] );
};

/**
 * Take an array of elements and push it onto the stack
 * (returning the new matched element set)
 * @param {Array.<Element>|!jQuery} elems
 * @return {!jQuery}
 */
jQuery.prototype.pushStack = function( elems ) {

	// Build a new jQuery matched element set
	var ret = /** @type {!jQuery} */ ( jQuery.merge( this.constructor(), elems ) );

	// Add the old object onto the stack (as a reference)
	ret.prevObject = this;
	ret.context = this.context;

	// Return the newly-formed element set
	return ret;
};

/**
 * Execute a callback for every element in the matched set.
 * (You can seed the arguments with an array of args, but this is
 * only used internally.)
 * @param {function(this:Element,(number|string),Element)} callback
 * @param {Array=} args
 * @return {!jQuery}
 */
jQuery.prototype.each = function( callback, args ) {
	return /** @type {!jQuery} */ ( jQuery.each( this, callback, args ) );
};

/**
 * @param {function()=} fn
 * @return {!jQuery}
 */
jQuery.prototype.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

/**
 * @param {number} begin
 * @param {number=} end
 * @return {jQuery}
 */
jQuery.prototype.slice = function( begin, end ) {
	return this.pushStack( core_slice.apply( this, arguments ) );
};

/** @return {!jQuery} */
jQuery.prototype.first = function() {
	return this.eq( 0 );
};

/** @return {!jQuery} */
jQuery.prototype.last = function() {
	return this.eq( -1 );
};

/**
 * @param {number} i
 * @return {!jQuery}
 */
jQuery.prototype.eq = function( i ) {
	var len = this.length,
		j = +i + ( i < 0 ? len : 0 );
	return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
};

/**
 * @param {function(number,Element):*} callback
 * @return {*}
 */
jQuery.prototype.map = function( callback ) {
	return this.pushStack( jQuery.map(this, function( elem, i ) {
		return callback.call( elem, i, elem );
	}));
};

/** @return {!jQuery} */
jQuery.prototype.end = function() {
	return this.prevObject || this.constructor(null);
};

// For internal use only.
// Behaves like an Array's method, not like a jQuery method.
/** @private */
jQuery.prototype.push = core_push;
/** @private */
jQuery.prototype.sort = [].sort;
/** @private */
jQuery.prototype.splice = [].splice;
//};

jQuery.fn.init.prototype = jQuery.prototype;

/**
 * @param {...*} var_args
 * @return {Object}
 */
jQuery.extend = jQuery.fn.extend = function( var_args ) {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	/**
	 * @param {boolean=} deep
	 * @return {Object}
	 */
	noConflict: function( deep ) {
		if ( window[ "$" ] === jQuery ) {
			window[ "$" ] = _$;
		}

		if ( deep && window[ "jQuery" ] === jQuery ) {
			window[ "jQuery" ] = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	/**
	 * Hold (or release) the ready event
	 * @param {boolean} hold
	 */
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	/**
	 * Handle when the DOM is ready
	 * @param {boolean=} wait
	 * @return {number|undefined}
	 */
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready, 0 );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	/**
	 * See test/unit/core.js for details concerning isFunction.
	 * Since version 1.3, DOM methods and functions like alert
	 * aren't supported. They return false on IE (#2968).
	 * @param {*} obj
	 * @return {boolean}
	 */
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	/** @type {function(*):boolean} */
	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	/**
	 * @param {*} obj
	 * @return {boolean}
	 */
	isWindow: function( obj ) {
		return obj != null && obj == obj.window;
	},

	/**
	 * @param {*} obj
	 * @return {boolean}
	 */
	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	/**
	 * @param {*} obj
	 * @return {string}
	 */
	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	/**
	 * @param {Object} obj
	 * @return {boolean}
	 */
	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	/**
	 * @param {Object} obj
	 * @return {boolean}
	 */
	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	/** @param {string} msg */
	error: function( msg ) {
		throw new Error( msg );
	},

	/**
	 * @param {string} data: string of html
	 * @param {(Object|boolean)=} context (optional): If specified, the fragment will be created in this context, defaults to document
	 * @param {boolean=} keepScripts (optional): If true, will include scripts passed in the html string
	 */
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], /** @type {Object} */ ( context ), /** @type {Array} */ ( scripts ) );
		if ( scripts ) {
			jQuery( /** @type {Object} */ ( scripts ) ).remove();
		}
		return jQuery.merge( [], parsed.childNodes );
	},

	/**
	 * @param {string} data
	 * @return {*|undefined}
	 */
	parseJSON: function( data ) {
		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		if ( data === null ) {
			return data;
		}

		if ( typeof data === "string" ) {

			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = jQuery.trim( data );

			if ( data ) {
				// Make sure the incoming data is actual JSON
				// Logic borrowed from http://json.org/json2.js
				if ( rvalidchars.test( data.replace( rvalidescape, "@" )
					.replace( rvalidtokens, "]" )
					.replace( rvalidbraces, "")) ) {

					return ( new Function( "return " + data ) )();
				}
			}
		}

		jQuery.error( "Invalid JSON: " + data );
	},

	/**
	 * Cross-browser xml parsing
	 * @param {string} data
	 * @return {Document}
	 */
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	/** @return {undefined} */
	noop: function() {},

	/**
	 * Evaluates a script in a global context
	 * Workarounds based on findings by Jim Driscoll
	 * http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	 * @param {string} data
	 */
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	/**
	 * Convert dashed to camelCase; used by the css and data modules
	 * Microsoft forgot to hump their vendor prefix (#9572)
	 * @param {string} string
	 * @return {string}
	 */
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	/**
	 * @param {Node|Element|Document} elem
	 * @param {string} name
	 * @return {boolean}
	 */
	nodeName: function( elem, name ) {
		return elem.nodeName !== undefined && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	/**
	 * @param {Object} obj
	 * @param {function(...[?])} callback
	 * @param {?=} args is for internal usage only
	 * @return {Object}
	 */
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	/**
	 * Use native String.trim function wherever possible
	 * @type {function(string):string}
	 */
	trim: core_trim && !core_trim.call( new window["String"]( "\uFEFF\xA0" ) ) ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	/**
	 * @param {string|Array.<*>|!jQuery|*} arr
	 * @param {(Array.<*>|!jQuery)=} results is for internal usage only
	 * @return {Array.<*>|!jQuery}
	 */
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					/** @type {Array.<*>} */ (typeof arr === "string" ?
					[ arr ] :  arr )
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return /** @type {Array.<*>} */ ( ret );
	},

	/**
	 * @param {*} elem
	 * @param {Array.<*>|!jQuery} arr
	 * @param {number=} i
	 * @return {number}
	 */
	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	/**
	 * @param {Array.<*>|!jQuery} first
	 * @param {Array.<*>|!jQuery} second
	 * @return {Array.<*>|!jQuery}
	 */
	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	/**
	 * @param {Array.<*>} elems
	 * @param {function(*,number)} callback
	 * @param {boolean=} inv
	 * @return {Array.<*>}
	 */
	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	/**
	 * @param {(Array.<*>|Object.<string, *>)} elems
	 * @param {(function(*,number)|function(*,(string|number)))} callback
	 * @param {*=} arg is for internal usage only
	 * @return {Array.<*>}
	 */
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	/**
	 * Bind a function to a context, optionally partially applying any
	 * arguments.
	 * @param {function(?):?|Object} fn
	 * @param {Object|string} context
	 * @param {...*} var_args
	 * @return {function(?):?|undefined}
	 */
	proxy: function( fn, context, var_args ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	/**
	 * Multifunctional method to get and set values of a collection
	 * The value/s can optionally be executed if it's a function
	 * @param {jQuery|Array.<Element>} elems
	 * @param {(function(?=, ?=, ?=):?|null)=} fn
	 * @param {(string|null|Object.<string,*>)=} key
	 * @param {*=} value
	 * @param {(boolean|number)=} chainable
	 * @param {(function(?):?|null)=} emptyGet
	 * @param {boolean=} raw
	 * @return {*}
	 */
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn =
						/**
						 * @param {?=} elem
						 * @param {?=} key
						 * @param {?=} value
						 * @return {?}
						 */
						function( elem, key, value ) {
							return bulk.call( jQuery( elem ), value );
						};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	/** @return {number} */
	now: function() {
		return ( new Date() ).getTime();
	}
});

/** @param {Object=} obj */
jQuery.ready.promise = function( obj ) {

	
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready, 0 );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);

jQuery.expandedEach = jQuery.each;