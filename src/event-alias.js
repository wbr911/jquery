jQuery.expandedEach( ("blur focus focusin focusout resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	/**
	 * Handle event binding
	 * @param {(function(!jQuery.Event=)|Object.<string, *>)=} data
	 * @param {function(!jQuery.Event=)=} fn
	 * @return {!jQuery}
	 */
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

/**
 * Handle event binding
 * @param {function(!jQuery.Event=)} fnOver
 * @param {function(!jQuery.Event=)=} fnOut
 * @return {!jQuery}
 */
jQuery.fn.hover = function( fnOver, fnOut ) {
	return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
};
