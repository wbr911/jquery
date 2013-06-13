jQuery.extend({
	/**
	 * @param {Element} elem
	 * @param {(string|Array.<function(?,?)>|function(?,?))=} type
	 * @param {(Array.<function(?,?)>|function(?,?))=} data
	 * @return {(Array.<Element>|!jQuery|undefined)}
	 */
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return /** @type {Array.<Element>|!jQuery} */ ( queue || [] );
		}
	},

	/**
	 * @param {Element} elem
	 * @param {string=} type
	 */
	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		hooks.cur = fn;
		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	/** @private not intended for public consumption - generates a queueHooks object, or returns the current one */
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	/**
	 * @param {(string|Array.<function(?, ?)>|function(?, ?))=} type
	 * @param {(Array.<function(?, ?)>|function(?, ?))=} data
	 * @return {(Array.<Element>|!jQuery)}
	 */
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return /** @type {(Array.<Element>|!jQuery)} */ ( jQuery.queue( this[0], type ) );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, /** @type {string} */ ( type ) );
				}
			});
	},
	/**
	 * @param {string=} type
	 * @return {!jQuery}
	 */
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	/** Based off of the plugin by Clint Helfers, with permission.
	 * @see http://blindsignals.com/index.php/2009/07/jquery-delay/
	 * @param {number} time
	 * @param {string=} type
	 * @return {!jQuery}
	 */
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return /** @type {!jQuery} */ ( this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		}) );
	},
	/**
	 * @param {string=} type
	 * @return {!jQuery}
	 */
	clearQueue: function( type ) {
		return /** @type {!jQuery} */ ( this.queue( type || "fx", [] ) );
	},
	/**
	 * Get a promise resolved when queues of a certain type
	 * are emptied (fx is the type by default)
	 * @param {(string|Object)=} type
	 * @param {Object=} obj
	 * @return {jQuery.promise}
	 */
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
