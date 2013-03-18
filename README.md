[jQuery](http://jquery.com/) for [Closure-compiler](https://developers.google.com/closure/compiler/)
==================================================

Using jQuery with Closure Compiler Advanced Optimizations
--------------------------------------

Closure-compiler has a custom pass specifically to process jQuery. This branch of jQuery has the necessary changes and annotations to fully work with Closure-compiler.

Getting the code
-----------------
The easist method is to [download the pre-built source](http://people.missouristate.edu/chadkillingsworth/jquery/1.9.1/jquery.closure-compiler.js).

You can also build your own version from source. Use the [same directions as building the main jQuery source](https://github.com/jquery/jquery/blob/master/README.md), but substitute cloning this repository instead of the main jQuery repository. You'll also need to checkout the closure-compiler-1.9 branch once you clone the repository. You need to clone [my sizzle repository](https://github.com/chadkillingsworth/sizzle) into the src folder and checkout the closure-compiler-1.9 branch of it too.

How to build your jQuery code with closure-compiler
---------------------------------------------------
Make sure to use the **--process\_jquery\_primitives** flag of the compiler. It won't compile correctly without it.
You'll have to be work around collisions with local variables in jQuery since the function closure has been removed. You should use the following output wrapper with your code:

    (function(window, document, location, undefined) { %output% })(window, window.document, window.location)
jQuery Types
------------
* The jQuery function is a constructor - make sure to use the **new** keyword when calling it.
* Closure-compiler doesn't handle aliases well so the **$** shortcut has been removed.
* **jQuery.Deferred** and **jQuery.Callbacks** return anonymous types which adhere to the **jQuery.deferred** and **jQuery.callbacks** interfaces. Neither is a constructor. **jQuery.deferred** and **jQuery.jqXHR** implement the **jQuery.promise** interface. Ancillary type information can be found in [https://github.com/ChadKillingsworth/jquery/blob/closure-compiler-1.9/src/closure-compiler.js](https://github.com/ChadKillingsworth/jquery/blob/closure-compiler-1.9/src/closure-compiler.js)

Properties and Quotes
---------------------
Most properties can and should be used unquoted (jQuery.myPropery as opposed to jQuery["myProperty"])
This build does support the experimental type-based optimizations which are enabled using the **--use\_types\_for_optimization** flag

Deprecated Methods
------------------
Many of the deprecated methods have been removed and a future build will probably remove any I have missed. You shouldn't be using deprecated methods.

Miscellaneous
-------------
It's been a challenge modifying jQuery style code into a format that can be successfully processed by Closure-compiler. The public API methods all have type annotations, but the same type-casting requirements that come with using the official externs, apply here as well. Some dead code elimination does occur, but not as much as I had hoped. It will take some time to identify what blocks particular sections of code from being eliminated.

[More information on how the compiler handles jQuery](https://code.google.com/p/closure-compiler/wiki/jQueryExpansions)

Reporting Bugs
--------------
If you encounter bugs (which is highly probable), you should NOT post them on the closure-compiler issue tracker or on the official jQuery issue tracker. Instead, post them to [this GitHub repository](https://github.com/ChadKillingsworth/jquery/tree/closure-compiler-1.9)
