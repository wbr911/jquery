// Additional type information for closure-compiler

/** @typedef {(Window|Document|Element|Array.<Element>|string|jQuery|
 *     NodeList)}
 */
var jQuerySelector;

/** @typedef {function(...)|Array.<function(...)>} */
var jQueryCallback;

/** @interface */
jQuery.callbacks = function() {};

/**
 * @param {...function(?):?} args
 * @return {!jQuery.callbacks}
 */
jQuery.callbacks.prototype.add = function( args ) {};

/** @return {!jQuery.callbacks} */
jQuery.callbacks.prototype.disable = function() {};

/** @return {boolean} */
jQuery.callbacks.prototype.disabled = function() {};

/** @return {!jQuery.callbacks} */
jQuery.callbacks.prototype.empty = function() {};

/**
 * @param {...*} args
 * @return {!jQuery.callbacks}
 */
jQuery.callbacks.prototype.fire = function( args ) {};

/** @return {boolean} */
jQuery.callbacks.prototype.fired = function() {};

/**
 * @param {*} context
 * @param {...*} args
 * @return {!jQuery.callbacks}
 */
jQuery.callbacks.prototype.fireWith = function( context, args ) {};

/**
 * @param {function(?):?} fn
 * @return {boolean}
 */
jQuery.callbacks.prototype.has = function( fn ) {};

/** @return {!jQuery.callbacks} */
jQuery.callbacks.prototype.lock = function() {};

/** @return {boolean} */
jQuery.callbacks.prototype.locked = function() {};

/**
 * @param {...function(?):?} args
 * @return {!jQuery.callbacks}
 */
jQuery.callbacks.prototype.remove = function( args ) {};

/** @interface */
jQuery.promise = function () {};

/**
 * @param {...jQueryCallback} alwaysCallbacks
 * @return {jQuery.promise}
 */
jQuery.promise.prototype.always = function( alwaysCallbacks ) {};

/**
 * @param {...jQueryCallback} doneCallbacks
 * @return {jQuery.promise}
 */
jQuery.promise.prototype.done = function( doneCallbacks ) {};

/**
 * @param {...jQueryCallback} failCallbacks
 * @return {jQuery.promise}
 */
jQuery.promise.prototype.fail = function( failCallbacks ) {};

/**
 * @param {...jQueryCallback} progressCallbacks
 * @return {jQuery.promise}
 */
jQuery.promise.prototype.progress = function( progressCallbacks ) {};

/**
 * @param {function(this:jQuery.promise)} doneCallback
 * @param {function(this:jQuery.promise)=} failCallback
 * @param {function(this:jQuery.promise)=} progressCallback
 * @return {jQuery.promise}
 */
jQuery.promise.prototype.then = function( doneCallback, failCallback, progressCallback ) {};

/**
 * @interface
 * @extends {jQuery.promise}
 */
jQuery.deferred = function() {};

/**
 * @override
 * @param {...jQueryCallback} alwaysCallbacks
 * @return {jQuery.deferred}
 */
jQuery.deferred.prototype.always = function( alwaysCallbacks ) {};

/**
 * @override
 * @param {...jQueryCallback} doneCallbacks
 * @return {jQuery.deferred}
 */
jQuery.deferred.prototype.done = function( doneCallbacks ) {};

/**
 * @override
 * @param {...jQueryCallback} failCallbacks
 * @return {jQuery.deferred}
 */
jQuery.deferred.prototype.fail = function( failCallbacks ) {};

/**
 * @param {...*} var_args
 * @return {jQuery.deferred}
 */
jQuery.deferred.prototype.notify = function( var_args ) {};

/**
 * @param {Object} context
 * @param {...*} var_args
 * @return {jQuery.deferred}
 */
jQuery.deferred.prototype.notifyWith = function( context, var_args ) {};

/**
 * @override
 * @param {function(this:jQuery.deferred)} doneCallback
 * @param {function(this:jQuery.deferred)=} failCallback
 * @param {function(this:jQuery.deferred)=} progressCallback
 * @return {jQuery.deferred}
 */
jQuery.deferred.prototype.then = function( doneCallback, failCallback, progressCallback ) {};

/**
 * @param {Object=} target
 * @return {jQuery.promise}
 */
jQuery.deferred.prototype.promise = function( target ) {};

/**
 * @param {...*} var_args
 * @return {jQuery.deferred}
 */
jQuery.deferred.prototype.reject = function( var_args ) {};

/**
 * @param {Object} context
 * @param {Array.<*>=} args
 * @return {jQuery.deferred}
 */
jQuery.deferred.prototype.rejectWith = function( context, args ) {};

/**
 * @param {...*} var_args
 * @return {jQuery.deferred}
 */
jQuery.deferred.prototype.resolve = function( var_args ) {};

/**
 * @param {Object} context
 * @param {Array.<*>=} args
 * @return {jQuery.deferred}
 */
jQuery.deferred.prototype.resolveWith = function( context, args ) {};

/** @return {string} */
jQuery.deferred.prototype.state = function() {};

/**
 * @expose
 * @type {string}
 */
jQuery.Event.prototype.namespace = "";

/** @interface */
var jQuerySpecialEvent = function() {};

/**
 * @this {Element|Document}
 * @param {Event} e
 * @param {*} data
 */
jQuerySpecialEvent.prototype._default = function( e, data ) {};

/**
 * @this {Element}
 * @param {*} data
 * @param {string} namespaces
 * @param {function(Event)} eventHandle
 */
jQuerySpecialEvent.prototype.setup = function( data, namespaces, eventHandle ) {};

/**
 * @this {Element}
 * @param {string} namespaces
 * @param {function(Event)} eventHandle
 */
jQuerySpecialEvent.prototype.teardown = function( namespaces, eventHandle ) {};

/**
 * @this {Element}
 * @param {Object.<string, *>} handleObj
 */
jQuerySpecialEvent.prototype.add = function( handleObj ) {};

/**
 * @this {Element}
 * @param {Object.<string, *>} handleObj
 */
jQuerySpecialEvent.prototype.remove = function( handleObj ) {};

/**
 * @this {Element}
 * @param {jQuery.Event} event
 */
jQuerySpecialEvent.prototype.handle = function( event ) {};

/** @type {string} */
jQuerySpecialEvent.prototype.bindType;

/** @type {string} */
jQuerySpecialEvent.prototype.delegateType;

/** @type {boolean} */
jQuerySpecialEvent.prototype.noBubble;

/**
 * @constructor
 * @extends {XMLHttpRequest}
 * @implements {jQuery.promise}
 * @private
 * @see http://api.jquery.com/jQuery.ajax/#jqXHR
 */
jQuery.jqXHR = function () {};

/**
 * @override
 * @param {string=} statusText
 * @return {undefined}
 */
jQuery.jqXHR.prototype.abort = function( statusText ) {};

/**
 * @override
 * @param {...jQueryCallback} alwaysCallbacks
 * @return {jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.always = function( alwaysCallbacks ) {};

/**
 * @override
 * @param {...jQueryCallback} doneCallbacks
 * @return {jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.done = function( doneCallbacks ) {};

/**
 * @override
 * @param {...jQueryCallback} failCallbacks
 * @return {jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.fail = function( failCallbacks ) {};

/**
 * @override
 * @deprecated
 */
jQuery.jqXHR.prototype.onreadystatechange = function ( callback ) {};

/**
 * @override
 * @param {...jQueryCallback} callbacks
 * @return {jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.progress = function( callbacks ) {};

/**
 * @type {Object.<string, *>}
 * @expose
 */
jQuery.jqXHR.prototype.responseJSON;

/**
 * @private
 * @param {Object.<string,function (): ?>=} map
 * @return {jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.statusCode = function( map ) {};

/**
 * @override
 * @param {function(this:jQuery.jqXHR)} doneCallback
 * @param {function(this:jQuery.jqXHR)=} failCallback
 * @param {function(this:jQuery.jqXHR)=} progressCallback
 * @return {jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.then = function( doneCallback, failCallback, progressCallback ) {};

/** @interface */
jQuery.AjaxSettings = function() {};

/** @type {Object.<string,string>} */
jQuery.AjaxSettings.prototype.accepts;

/** @type {boolean} */
jQuery.AjaxSettings.prototype.async;
	
/**
 * @param {jQuery.jqXHR} jqXHR
 * @param {jQuery.AjaxSettings} settings
 * @this {(jQuery.AjaxSettings|Object)}
 */
jQuery.AjaxSettings.prototype.beforeSend = function( jqXHR, settings ) {};
	
/** @type {string|boolean} */
jQuery.AjaxSettings.prototype.cache;
	
/** @type {Array.<function(jQuery.jqXHR,string)>|function(jQuery.jqXHR,string)} */
jQuery.AjaxSettings.prototype.complete = function( jqXHR, textStatus ) {};
	
/** @type {Object.<string,string>} */
jQuery.AjaxSettings.prototype.contents;
	
/** @type {string|boolean} */
jQuery.AjaxSettings.prototype.contentType;
	
/** @type {(jQuery.AjaxSettings|Object)} */
jQuery.AjaxSettings.prototype.context;
	
/** @type {Object.<string,string>} */
jQuery.AjaxSettings.prototype.converters;
	
/** @type {boolean} */
jQuery.AjaxSettings.prototype.crossDomain;
	
/** @type {*} */
jQuery.AjaxSettings.prototype.data;

/**
 * @param {string|Document} data
 * @param {string} type
 * @return {string|Document}
 */
jQuery.AjaxSettings.prototype.dataFilter = function( data, type ) {};

/** @type {string} */
jQuery.AjaxSettings.prototype.dataType;

/** @type {Array.<function(jQuery.jqXHR,String)>|function(jQuery.jqXHR,String)} */
jQuery.AjaxSettings.prototype.error = function( jqXHR, textStatus ) {};

/** @type {jQuery.AjaxSettings} */
jQuery.AjaxSettings.prototype.flatOptions;

/** @type {boolean} */
jQuery.AjaxSettings.prototype.global;

/** @type {Object.<string, string>} */
jQuery.AjaxSettings.prototype.headers;

/** @type {boolean} */
jQuery.AjaxSettings.prototype.ifModified;

/** @type {boolean} */
jQuery.AjaxSettings.prototype.isLocal;

/** @type {boolean|string} */
jQuery.AjaxSettings.prototype.jsonp;

/** @type {string|function():string} */
jQuery.AjaxSettings.prototype.jsonpCallback;

/** @type {string} */
jQuery.AjaxSettings.prototype.method;

/** @type {string} */
jQuery.AjaxSettings.prototype.mimeType;

/** @type {string} */
jQuery.AjaxSettings.prototype.password;

/** @type {boolean} */
jQuery.AjaxSettings.prototype.processData;

/** @type {Object.<string,string>} */
jQuery.AjaxSettings.prototype.responseFields;

/** @type {string} */
jQuery.AjaxSettings.prototype.scriptCharset;

/** @type {Object.<string,function()>} */
jQuery.AjaxSettings.prototype.statusCode;

/**
 * @param {*} data
 * @param {string} textStatus
 * @param {jQuery.jqXHR} jqXHR
 */
jQuery.AjaxSettings.prototype.success = function( data, textStatus, jqXHR ) {};

/** @type {number} */
jQuery.AjaxSettings.prototype.timeout;

/** @type {boolean} */
jQuery.AjaxSettings.prototype.traditional;

/** @type {string} */
jQuery.AjaxSettings.prototype.type;

/** @type {string} */
jQuery.AjaxSettings.prototype.url;

/** @type {string} */
jQuery.AjaxSettings.prototype.username;

/** @return {XMLHttpRequest} */
jQuery.AjaxSettings.prototype.xhr = function() {};

/** @type {Object.<string,*>} */
jQuery.AjaxSettings.prototype.xhrFields;

/**
 * @interface
 * @extends {jQuery.promise}
 */
jQuery.animation = function() {};

/**
 * @override
 * @param {...jQueryCallback} alwaysCallbacks
 * @return {jQuery.animation}
 */
jQuery.animation.prototype.always = function( alwaysCallbacks ) {};

/**
 * @param {string} prop
 * @param {number} end
 * @return {jQuery.Tween}
 */
jQuery.animation.prototype.createTween = function( prop, end ) {};

/**
 * @override
 * @param {...jQueryCallback} doneCallbacks
 * @return {jQuery.animation}
 */
jQuery.animation.prototype.done = function( doneCallbacks ) {};

/** @type {number} */
jQuery.animation.prototype.duration;

/** @type {Element} */
jQuery.animation.prototype.elem;

/**
 * @override
 * @param {...jQueryCallback} failCallbacks
 * @return {jQuery.animation}
 */
jQuery.animation.prototype.fail = function( failCallbacks ) {};

/** @type {jQuery.animationOptions} */
jQuery.animation.prototype.opts;

/** @type {jQuery.animationOptions} */
jQuery.animation.prototype.originalOptions;

/** @type {Object.<string, *>} */
jQuery.animation.prototype.originalProperties;

/**
 * @override
 * @param {...jQueryCallback} progressCallbacks
 * @return {jQuery.animation}
 */
jQuery.animation.prototype.progress = function( progressCallbacks ) {};

/** @type {Object.<string, *>} */
jQuery.animation.prototype.props;

/** @type {number} */
jQuery.animation.prototype.startTime;

/** @param {boolean=} gotoEnd */
jQuery.animation.prototype.stop = function( gotoEnd ) {};

/**
 * @override
 * @param {function(this:jQuery.animation)} doneCallback
 * @param {function(this:jQuery.animation)=} failCallback
 * @param {function(this:jQuery.animation)=} progressCallback
 * @return {jQuery.animation}
 */
jQuery.animation.prototype.then = function( doneCallback, failCallback, progressCallback ) {};

/** @type {Array.<jQuery.Tween>} */
jQuery.animation.prototype.tweens;


/**
 * @interface
 * @extends {jQuery.promise}
 */
jQuery.animationOptions = function() {};

jQuery.animationOptions.prototype.complete = function() {};

/**
 * @this {Element}
 * @param {number} now
 * @param {jQuery.Tween} tween
 */
jQuery.animationOptions.prototype.step = function( now, tween ) {};

/** @type {(string|number)} */
jQuery.animationOptions.prototype.duartion;

/** @type {string} */
jQuery.animationOptions.prototype.easing;

/** @type {(boolean|string)} */
jQuery.animationOptions.prototype.queue;

/** @type {Object.<string,string>} */
jQuery.animationOptions.prototype.specialEasing;

/** @type {string} */
jQuery.Tween.prototype.easing = "";

/** @type {Element} */
jQuery.Tween.prototype.elem = null;

/** @type {number} */
jQuery.Tween.prototype.end = 0;

/** @type {jQuery.animationOptions} */
jQuery.Tween.prototype.options = null;

/** @type {number} */
jQuery.Tween.prototype.start = 0;

/** @type {string} */
jQuery.Tween.prototype.prop = "";
