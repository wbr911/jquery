//Prevent exported static properties from being collapsed
(function() {
/** @expose */
jQuery.cache;
/** @expose */
jQuery.fragments;
/** @expose */
jQuery.timers;
/** @expose */
jQuery.ajaxSettings;
})();

jQuery.fn["html"] = jQuery.fn.html;
jQuery.fn["get"] = jQuery.fn.get;
jQuery.fn["appendTo"] = jQuery.fn.appendTo;
jQuery.fn["attr"] = jQuery.fn.attr;
jQuery.fn["css"] = jQuery.fn.css;
jQuery.fn["jquery"] = jQuery.fn.jquery;
jQuery.fn["toArray"] = jQuery.fn.toArray;
jQuery["cache"] = jQuery.cache;
jQuery["fragments"] = jQuery.fragments;
jQuery["timers"] = jQuery.timers;
jQuery["active"] = jQuery.active;
jQuery["noConflict"] = jQuery.noConflict;
jQuery["ajaxSettings"] = jQuery.ajaxSettings;
jQuery.event["global"] = jQuery.event.global;
jQuery["event"] = jQuery.event;
jQuery["each"] = jQuery.each;
jQuery["extend"] = jQuery.extend;
jQuery["support"] = jQuery.support;
jQuery["globalEval"] = jQuery.globalEval;
jQuery["parseXML"] = jQuery.parseXML;
jQuery["isArray"] = jQuery.isArray;
jQuery["isFunction"] = jQuery.isFunction;
jQuery["expando"] = jQuery.expando;

window["jQuery"] = window["$"] = jQuery;

// Redefine the isReady property since it may be eliminated as dead code
// Needed for offset and selector tests
jQuery(function() { jQuery["isReady"] = true; });