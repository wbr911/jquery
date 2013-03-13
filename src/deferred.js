jQuery.extend({

	/**
	 * @param {function(jQuery.deferred,jQuery.deferred=)=} func
	 * @return {jQuery.deferred}
	 */
	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( /** @type {Array.<function(...)>} */ ( arguments ) ).fail( /** @type {Array.<function(...)>} */ ( arguments ) );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 1 ] === "done" ? deferred.done : ( tuple[ 1 ] === "fail" ? deferred.fail : deferred.progress ),
								actionWith = tuple[ 0 ] === "resolve" ? newDefer.resolveWith : ( tuple[ 0 ] === "reject" ? newDefer.rejectWith : newDefer.notifyWith ),
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							action.call( deferred, function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									actionWith.call( newDefer, this === promise ? newDefer.promise() : this,
										/** @type {Array.<function(...)>} */ ( fn ? [ returned ] : arguments ) );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = /** @type {jQuery.deferred} */ ( {} );

		// Keep pipe for back-compat
		// promise.pipe = promise.then; //deprecated

		promise.done = tuples[ 0 ][ 2 ].add;
		promise.fail = tuples[ 1 ][ 2 ].add;
		promise.progress = tuples[ 2 ][ 2 ].add;

		// Add list-specific methods
		jQuery.expandedEach({
			"resolve": tuples[ 0 ],
			"reject": tuples[ 1 ],
			"notify": tuples[ 2 ]
		}, function( key, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ],
				action = key;

			// deferred[ resolve | reject | notify ]
			deferred[ key ] = function() {
				deferred[ key + "With" ]( this === deferred ? promise : this,
					/** @type {Array.<function(...)>} */ ( arguments ) );
				return this;
			};
			deferred[ key + "With" ] = list.fireWith;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ action === "resolve" ? 1 : 0 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
