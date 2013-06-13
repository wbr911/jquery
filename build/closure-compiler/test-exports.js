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
/** @expose */
jQuery.expando;
})();

/** @expose */
jQuery.event;

/** @expose */
jQuery.event.global;

jQuery.fn["html"] = jQuery.fn.html;
jQuery.fn["get"] = jQuery.fn.get;
jQuery.fn["appendTo"] = jQuery.fn.appendTo;
jQuery.fn["attr"] = jQuery.fn.attr;
jQuery.fn["css"] = jQuery.fn.css;
jQuery.prototype["jquery"] = jQuery.prototype.jquery;
jQuery.fn["toArray"] = jQuery.fn.toArray;
jQuery["cache"] = jQuery.cache;
jQuery["fragments"] = jQuery.fragments;
jQuery["timers"] = jQuery.timers;
jQuery["active"] = jQuery.active;
jQuery["noConflict"] = jQuery.noConflict;
jQuery["ajaxSettings"] = jQuery.ajaxSettings;
jQuery["each"] = jQuery.each;
jQuery["extend"] = jQuery.extend;
jQuery["support"] = jQuery.support;
jQuery["globalEval"] = jQuery.globalEval;
jQuery["parseXML"] = jQuery.parseXML;
jQuery["isArray"] = jQuery.isArray;
jQuery["isFunction"] = jQuery.isFunction;

window["jQuery"] = jQuery;

// Redefine the isReady property since it may be eliminated as dead code
// Needed for offset and selector tests
new jQuery(function() { jQuery["isReady"] = true; });