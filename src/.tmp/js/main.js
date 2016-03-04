"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/*!
 * jQuery JavaScript Library v2.2.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-02-22T19:11Z
 */

(function (global, factory) {

	if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ? factory(global, true) : function (w) {
			if (!w.document) {
				throw new Error("jQuery requires a window with a document");
			}
			return factory(w);
		};
	} else {
		factory(global);
	}

	// Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : undefined, function (window, noGlobal) {

	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//"use strict";
	var arr = [];

	var document = window.document;

	var _slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};

	var version = "2.2.1",


	// Define a local copy of jQuery
	jQuery = function jQuery(selector, context) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init(selector, context);
	},


	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,


	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	    rdashAlpha = /-([\da-z])/gi,


	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function fcamelCase(all, letter) {
		return letter.toUpperCase();
	};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function toArray() {
			return _slice.call(this);
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function get(num) {
			return num != null ?

			// Return just the one element from the set
			num < 0 ? this[num + this.length] : this[num] :

			// Return all the elements in a clean array
			_slice.call(this);
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function pushStack(elems) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge(this.constructor(), elems);

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function each(callback) {
			return jQuery.each(this, callback);
		},

		map: function map(callback) {
			return this.pushStack(jQuery.map(this, function (elem, i) {
				return callback.call(elem, i, elem);
			}));
		},

		slice: function slice() {
			return this.pushStack(_slice.apply(this, arguments));
		},

		first: function first() {
			return this.eq(0);
		},

		last: function last() {
			return this.eq(-1);
		},

		eq: function eq(i) {
			var len = this.length,
			    j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
		},

		end: function end() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function () {
		var options,
		    name,
		    src,
		    copy,
		    copyIsArray,
		    clone,
		    target = arguments[0] || {},
		    i = 1,
		    length = arguments.length,
		    deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;

			// Skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ((typeof target === "undefined" ? "undefined" : _typeof(target)) !== "object" && !jQuery.isFunction(target)) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {

			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {

				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {

						if (copyIsArray) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = jQuery.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
							target[name] = copy;
						}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend({

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function error(msg) {
			throw new Error(msg);
		},

		noop: function noop() {},

		isFunction: function isFunction(obj) {
			return jQuery.type(obj) === "function";
		},

		isArray: Array.isArray,

		isWindow: function isWindow(obj) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function isNumeric(obj) {

			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			var realStringObj = obj && obj.toString();
			return !jQuery.isArray(obj) && realStringObj - parseFloat(realStringObj) + 1 >= 0;
		},

		isPlainObject: function isPlainObject(obj) {

			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
				return false;
			}

			if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
				return false;
			}

			// If the function hasn't returned already, we're confident that
			// |obj| is a plain object, created by {} or constructed with new Object
			return true;
		},

		isEmptyObject: function isEmptyObject(obj) {
			var name;
			for (name in obj) {
				return false;
			}
			return true;
		},

		type: function type(obj) {
			if (obj == null) {
				return obj + "";
			}

			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
		},

		// Evaluates a script in a global context
		globalEval: function globalEval(code) {
			var script,
			    indirect = eval;

			code = jQuery.trim(code);

			if (code) {

				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if (code.indexOf("use strict") === 1) {
					script = document.createElement("script");
					script.text = code;
					document.head.appendChild(script).parentNode.removeChild(script);
				} else {

					// Otherwise, avoid the DOM node creation, insertion
					// and removal by using an indirect global eval

					indirect(code);
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function camelCase(string) {
			return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
		},

		nodeName: function nodeName(elem, name) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		each: function each(obj, callback) {
			var length,
			    i = 0;

			if (isArrayLike(obj)) {
				length = obj.length;
				for (; i < length; i++) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function trim(text) {
			return text == null ? "" : (text + "").replace(rtrim, "");
		},

		// results is for internal usage only
		makeArray: function makeArray(arr, results) {
			var ret = results || [];

			if (arr != null) {
				if (isArrayLike(Object(arr))) {
					jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
				} else {
					push.call(ret, arr);
				}
			}

			return ret;
		},

		inArray: function inArray(elem, arr, i) {
			return arr == null ? -1 : indexOf.call(arr, elem, i);
		},

		merge: function merge(first, second) {
			var len = +second.length,
			    j = 0,
			    i = first.length;

			for (; j < len; j++) {
				first[i++] = second[j];
			}

			first.length = i;

			return first;
		},

		grep: function grep(elems, callback, invert) {
			var callbackInverse,
			    matches = [],
			    i = 0,
			    length = elems.length,
			    callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for (; i < length; i++) {
				callbackInverse = !callback(elems[i], i);
				if (callbackInverse !== callbackExpect) {
					matches.push(elems[i]);
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function map(elems, callback, arg) {
			var length,
			    value,
			    i = 0,
			    ret = [];

			// Go through the array, translating each of the items to their new values
			if (isArrayLike(elems)) {
				length = elems.length;
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						ret.push(value);
					}
				}

				// Go through every key on the object,
			} else {
					for (i in elems) {
						value = callback(elems[i], i, arg);

						if (value != null) {
							ret.push(value);
						}
					}
				}

			// Flatten any nested arrays
			return concat.apply([], ret);
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function proxy(fn, context) {
			var tmp, args, proxy;

			if (typeof context === "string") {
				tmp = fn[context];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if (!jQuery.isFunction(fn)) {
				return undefined;
			}

			// Simulated bind
			args = _slice.call(arguments, 2);
			proxy = function proxy() {
				return fn.apply(context || this, args.concat(_slice.call(arguments)));
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

	// JSHint would error on this code due to the Symbol not being defined in ES5.
	// Defining this global in .jshintrc would create a danger of using the global
	// unguarded in another place, it seems safer to just disable JSHint for these
	// three lines.
	/* jshint ignore: start */
	if (typeof Symbol === "function") {
		jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
	}
	/* jshint ignore: end */

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});

	function isArrayLike(obj) {

		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
		    type = jQuery.type(obj);

		if (type === "function" || jQuery.isWindow(obj)) {
			return false;
		}

		return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
	}
	var Sizzle =
	/*!
  * Sizzle CSS Selector Engine v2.2.1
  * http://sizzlejs.com/
  *
  * Copyright jQuery Foundation and other contributors
  * Released under the MIT license
  * http://jquery.org/license
  *
  * Date: 2015-10-17
  */
	function (window) {

		var i,
		    support,
		    Expr,
		    getText,
		    isXML,
		    tokenize,
		    compile,
		    select,
		    outermostContext,
		    sortInput,
		    hasDuplicate,


		// Local document vars
		setDocument,
		    document,
		    docElem,
		    documentIsHTML,
		    rbuggyQSA,
		    rbuggyMatches,
		    matches,
		    contains,


		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		    preferredDoc = window.document,
		    dirruns = 0,
		    done = 0,
		    classCache = createCache(),
		    tokenCache = createCache(),
		    compilerCache = createCache(),
		    sortOrder = function sortOrder(a, b) {
			if (a === b) {
				hasDuplicate = true;
			}
			return 0;
		},


		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,


		// Instance methods
		hasOwn = {}.hasOwnProperty,
		    arr = [],
		    pop = arr.pop,
		    push_native = arr.push,
		    push = arr.push,
		    slice = arr.slice,

		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function indexOf(list, elem) {
			var i = 0,
			    len = list.length;
			for (; i < len; i++) {
				if (list[i] === elem) {
					return i;
				}
			}
			return -1;
		},
		    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",


		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",


		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",


		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
		    pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" + ")\\)|)",


		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp(whitespace + "+", "g"),
		    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
		    rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
		    rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
		    rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
		    rpseudo = new RegExp(pseudos),
		    ridentifier = new RegExp("^" + identifier + "$"),
		    matchExpr = {
			"ID": new RegExp("^#(" + identifier + ")"),
			"CLASS": new RegExp("^\\.(" + identifier + ")"),
			"TAG": new RegExp("^(" + identifier + "|[*])"),
			"ATTR": new RegExp("^" + attributes),
			"PSEUDO": new RegExp("^" + pseudos),
			"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
			"bool": new RegExp("^(?:" + booleans + ")$", "i"),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
		},
		    rinputs = /^(?:input|select|textarea|button)$/i,
		    rheader = /^h\d$/i,
		    rnative = /^[^{]+\{\s*\[native \w/,


		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
		    rsibling = /[+~]/,
		    rescape = /'|\\/g,


		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
		    funescape = function funescape(_, escaped, escapedWhitespace) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ? escaped : high < 0 ?
			// BMP codepoint
			String.fromCharCode(high + 0x10000) :
			// Supplemental Plane codepoint (surrogate pair)
			String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
		},


		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function unloadHandler() {
			setDocument();
		};

		// Optimize for push.apply( _, NodeList )
		try {
			push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
			// Support: Android<4.0
			// Detect silently failing push.apply
			arr[preferredDoc.childNodes.length].nodeType;
		} catch (e) {
			push = { apply: arr.length ?

				// Leverage slice if possible
				function (target, els) {
					push_native.apply(target, slice.call(els));
				} :

				// Support: IE<9
				// Otherwise append directly
				function (target, els) {
					var j = target.length,
					    i = 0;
					// Can't trust NodeList.length
					while (target[j++] = els[i++]) {}
					target.length = j - 1;
				}
			};
		}

		function Sizzle(selector, context, results, seed) {
			var m,
			    i,
			    elem,
			    nid,
			    nidselect,
			    match,
			    groups,
			    newSelector,
			    newContext = context && context.ownerDocument,


			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

			results = results || [];

			// Return early from calls with invalid selector or context
			if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

				return results;
			}

			// Try to shortcut find operations (as opposed to filters) in HTML documents
			if (!seed) {

				if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
					setDocument(context);
				}
				context = context || document;

				if (documentIsHTML) {

					// If the selector is sufficiently simple, try using a "get*By*" DOM method
					// (excepting DocumentFragment context, where the methods don't exist)
					if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

						// ID selector
						if (m = match[1]) {

							// Document context
							if (nodeType === 9) {
								if (elem = context.getElementById(m)) {

									// Support: IE, Opera, Webkit
									// TODO: identify versions
									// getElementById can match elements by name instead of ID
									if (elem.id === m) {
										results.push(elem);
										return results;
									}
								} else {
									return results;
								}

								// Element context
							} else {

									// Support: IE, Opera, Webkit
									// TODO: identify versions
									// getElementById can match elements by name instead of ID
									if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {

										results.push(elem);
										return results;
									}
								}

							// Type selector
						} else if (match[2]) {
								push.apply(results, context.getElementsByTagName(selector));
								return results;

								// Class selector
							} else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {

									push.apply(results, context.getElementsByClassName(m));
									return results;
								}
					}

					// Take advantage of querySelectorAll
					if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {

						if (nodeType !== 1) {
							newContext = context;
							newSelector = selector;

							// qSA looks outside Element context, which is not what we want
							// Thanks to Andrew Dupont for this workaround technique
							// Support: IE <=8
							// Exclude object elements
						} else if (context.nodeName.toLowerCase() !== "object") {

								// Capture the context ID, setting it first if necessary
								if (nid = context.getAttribute("id")) {
									nid = nid.replace(rescape, "\\$&");
								} else {
									context.setAttribute("id", nid = expando);
								}

								// Prefix every selector in the list
								groups = tokenize(selector);
								i = groups.length;
								nidselect = ridentifier.test(nid) ? "#" + nid : "[id='" + nid + "']";
								while (i--) {
									groups[i] = nidselect + " " + toSelector(groups[i]);
								}
								newSelector = groups.join(",");

								// Expand context for sibling selectors
								newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
							}

						if (newSelector) {
							try {
								push.apply(results, newContext.querySelectorAll(newSelector));
								return results;
							} catch (qsaError) {} finally {
								if (nid === expando) {
									context.removeAttribute("id");
								}
							}
						}
					}
				}
			}

			// All others
			return select(selector.replace(rtrim, "$1"), context, results, seed);
		}

		/**
   * Create key-value caches of limited size
   * @returns {function(string, object)} Returns the Object data after storing it on itself with
   *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
   *	deleting the oldest entry
   */
		function createCache() {
			var keys = [];

			function cache(key, value) {
				// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
				if (keys.push(key + " ") > Expr.cacheLength) {
					// Only keep the most recent entries
					delete cache[keys.shift()];
				}
				return cache[key + " "] = value;
			}
			return cache;
		}

		/**
   * Mark a function for special use by Sizzle
   * @param {Function} fn The function to mark
   */
		function markFunction(fn) {
			fn[expando] = true;
			return fn;
		}

		/**
   * Support testing using an element
   * @param {Function} fn Passed the created div and expects a boolean result
   */
		function assert(fn) {
			var div = document.createElement("div");

			try {
				return !!fn(div);
			} catch (e) {
				return false;
			} finally {
				// Remove from its parent by default
				if (div.parentNode) {
					div.parentNode.removeChild(div);
				}
				// release memory in IE
				div = null;
			}
		}

		/**
   * Adds the same handler for all of the specified attrs
   * @param {String} attrs Pipe-separated list of attributes
   * @param {Function} handler The method that will be applied
   */
		function addHandle(attrs, handler) {
			var arr = attrs.split("|"),
			    i = arr.length;

			while (i--) {
				Expr.attrHandle[arr[i]] = handler;
			}
		}

		/**
   * Checks document order of two siblings
   * @param {Element} a
   * @param {Element} b
   * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
   */
		function siblingCheck(a, b) {
			var cur = b && a,
			    diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);

			// Use IE sourceIndex if available on both nodes
			if (diff) {
				return diff;
			}

			// Check if b follows a
			if (cur) {
				while (cur = cur.nextSibling) {
					if (cur === b) {
						return -1;
					}
				}
			}

			return a ? 1 : -1;
		}

		/**
   * Returns a function to use in pseudos for input types
   * @param {String} type
   */
		function createInputPseudo(type) {
			return function (elem) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === type;
			};
		}

		/**
   * Returns a function to use in pseudos for buttons
   * @param {String} type
   */
		function createButtonPseudo(type) {
			return function (elem) {
				var name = elem.nodeName.toLowerCase();
				return (name === "input" || name === "button") && elem.type === type;
			};
		}

		/**
   * Returns a function to use in pseudos for positionals
   * @param {Function} fn
   */
		function createPositionalPseudo(fn) {
			return markFunction(function (argument) {
				argument = +argument;
				return markFunction(function (seed, matches) {
					var j,
					    matchIndexes = fn([], seed.length, argument),
					    i = matchIndexes.length;

					// Match elements found at the specified indexes
					while (i--) {
						if (seed[j = matchIndexes[i]]) {
							seed[j] = !(matches[j] = seed[j]);
						}
					}
				});
			});
		}

		/**
   * Checks a node for validity as a Sizzle context
   * @param {Element|Object=} context
   * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
   */
		function testContext(context) {
			return context && typeof context.getElementsByTagName !== "undefined" && context;
		}

		// Expose support vars for convenience
		support = Sizzle.support = {};

		/**
   * Detects XML nodes
   * @param {Element|Object} elem An element or a document
   * @returns {Boolean} True iff elem is a non-HTML XML node
   */
		isXML = Sizzle.isXML = function (elem) {
			// documentElement is verified for cases where it doesn't yet exist
			// (such as loading iframes in IE - #4833)
			var documentElement = elem && (elem.ownerDocument || elem).documentElement;
			return documentElement ? documentElement.nodeName !== "HTML" : false;
		};

		/**
   * Sets document-related variables once based on the current document
   * @param {Element|Object} [doc] An element or document object to use to set the document
   * @returns {Object} Returns the current document
   */
		setDocument = Sizzle.setDocument = function (node) {
			var hasCompare,
			    parent,
			    doc = node ? node.ownerDocument || node : preferredDoc;

			// Return early if doc is invalid or already selected
			if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
				return document;
			}

			// Update global variables
			document = doc;
			docElem = document.documentElement;
			documentIsHTML = !isXML(document);

			// Support: IE 9-11, Edge
			// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
			if ((parent = document.defaultView) && parent.top !== parent) {
				// Support: IE 11
				if (parent.addEventListener) {
					parent.addEventListener("unload", unloadHandler, false);

					// Support: IE 9 - 10 only
				} else if (parent.attachEvent) {
						parent.attachEvent("onunload", unloadHandler);
					}
			}

			/* Attributes
   ---------------------------------------------------------------------- */

			// Support: IE<8
			// Verify that getAttribute really returns attributes and not properties
			// (excepting IE8 booleans)
			support.attributes = assert(function (div) {
				div.className = "i";
				return !div.getAttribute("className");
			});

			/* getElement(s)By*
   ---------------------------------------------------------------------- */

			// Check if getElementsByTagName("*") returns only elements
			support.getElementsByTagName = assert(function (div) {
				div.appendChild(document.createComment(""));
				return !div.getElementsByTagName("*").length;
			});

			// Support: IE<9
			support.getElementsByClassName = rnative.test(document.getElementsByClassName);

			// Support: IE<10
			// Check if getElementById returns elements by name
			// The broken getElementById methods don't pick up programatically-set names,
			// so use a roundabout getElementsByName test
			support.getById = assert(function (div) {
				docElem.appendChild(div).id = expando;
				return !document.getElementsByName || !document.getElementsByName(expando).length;
			});

			// ID find and filter
			if (support.getById) {
				Expr.find["ID"] = function (id, context) {
					if (typeof context.getElementById !== "undefined" && documentIsHTML) {
						var m = context.getElementById(id);
						return m ? [m] : [];
					}
				};
				Expr.filter["ID"] = function (id) {
					var attrId = id.replace(runescape, funescape);
					return function (elem) {
						return elem.getAttribute("id") === attrId;
					};
				};
			} else {
				// Support: IE6/7
				// getElementById is not reliable as a find shortcut
				delete Expr.find["ID"];

				Expr.filter["ID"] = function (id) {
					var attrId = id.replace(runescape, funescape);
					return function (elem) {
						var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
						return node && node.value === attrId;
					};
				};
			}

			// Tag
			Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
				if (typeof context.getElementsByTagName !== "undefined") {
					return context.getElementsByTagName(tag);

					// DocumentFragment nodes don't have gEBTN
				} else if (support.qsa) {
						return context.querySelectorAll(tag);
					}
			} : function (tag, context) {
				var elem,
				    tmp = [],
				    i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName(tag);

				// Filter out possible comments
				if (tag === "*") {
					while (elem = results[i++]) {
						if (elem.nodeType === 1) {
							tmp.push(elem);
						}
					}

					return tmp;
				}
				return results;
			};

			// Class
			Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
				if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
					return context.getElementsByClassName(className);
				}
			};

			/* QSA/matchesSelector
   ---------------------------------------------------------------------- */

			// QSA and matchesSelector support

			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			rbuggyMatches = [];

			// qSa(:focus) reports false when true (Chrome 21)
			// We allow this because of a bug in IE8/9 that throws an error
			// whenever `document.activeElement` is accessed on an iframe
			// So, we allow :focus to pass through QSA all the time to avoid the IE error
			// See http://bugs.jquery.com/ticket/13378
			rbuggyQSA = [];

			if (support.qsa = rnative.test(document.querySelectorAll)) {
				// Build QSA regex
				// Regex strategy adopted from Diego Perini
				assert(function (div) {
					// Select is set to empty string on purpose
					// This is to test IE's treatment of not explicitly
					// setting a boolean content attribute,
					// since its presence should be enough
					// http://bugs.jquery.com/ticket/12359
					docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";

					// Support: IE8, Opera 11-12.16
					// Nothing should be selected when empty strings follow ^= or $= or *=
					// The test attribute must be unknown in Opera but "safe" for WinRT
					// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
					if (div.querySelectorAll("[msallowcapture^='']").length) {
						rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
					}

					// Support: IE8
					// Boolean attributes and "value" are not treated correctly
					if (!div.querySelectorAll("[selected]").length) {
						rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
					}

					// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
					if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
						rbuggyQSA.push("~=");
					}

					// Webkit/Opera - :checked should return selected option elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					// IE8 throws error here and will not see later tests
					if (!div.querySelectorAll(":checked").length) {
						rbuggyQSA.push(":checked");
					}

					// Support: Safari 8+, iOS 8+
					// https://bugs.webkit.org/show_bug.cgi?id=136851
					// In-page `selector#id sibing-combinator selector` fails
					if (!div.querySelectorAll("a#" + expando + "+*").length) {
						rbuggyQSA.push(".#.+[+~]");
					}
				});

				assert(function (div) {
					// Support: Windows 8 Native Apps
					// The type and name attributes are restricted during .innerHTML assignment
					var input = document.createElement("input");
					input.setAttribute("type", "hidden");
					div.appendChild(input).setAttribute("name", "D");

					// Support: IE8
					// Enforce case-sensitivity of name attribute
					if (div.querySelectorAll("[name=d]").length) {
						rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
					}

					// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
					// IE8 throws error here and will not see later tests
					if (!div.querySelectorAll(":enabled").length) {
						rbuggyQSA.push(":enabled", ":disabled");
					}

					// Opera 10-11 does not throw on post-comma invalid pseudos
					div.querySelectorAll("*,:x");
					rbuggyQSA.push(",.*:");
				});
			}

			if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {

				assert(function (div) {
					// Check to see if it's possible to do matchesSelector
					// on a disconnected node (IE 9)
					support.disconnectedMatch = matches.call(div, "div");

					// This should fail with an exception
					// Gecko does not error, returns false instead
					matches.call(div, "[s!='']:x");
					rbuggyMatches.push("!=", pseudos);
				});
			}

			rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
			rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

			/* Contains
   ---------------------------------------------------------------------- */
			hasCompare = rnative.test(docElem.compareDocumentPosition);

			// Element contains another
			// Purposefully self-exclusive
			// As in, an element does not contain itself
			contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
				    bup = b && b.parentNode;
				return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
			} : function (a, b) {
				if (b) {
					while (b = b.parentNode) {
						if (b === a) {
							return true;
						}
					}
				}
				return false;
			};

			/* Sorting
   ---------------------------------------------------------------------- */

			// Document order sorting
			sortOrder = hasCompare ? function (a, b) {

				// Flag for duplicate removal
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				// Sort on method existence if only one input has compareDocumentPosition
				var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
				if (compare) {
					return compare;
				}

				// Calculate position if both inputs belong to the same document
				compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) :

				// Otherwise we know they are disconnected
				1;

				// Disconnected nodes
				if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {

					// Choose the first element that is related to our preferred document
					if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
						return -1;
					}
					if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
						return 1;
					}

					// Maintain original order
					return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
				}

				return compare & 4 ? -1 : 1;
			} : function (a, b) {
				// Exit early if the nodes are identical
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				var cur,
				    i = 0,
				    aup = a.parentNode,
				    bup = b.parentNode,
				    ap = [a],
				    bp = [b];

				// Parentless nodes are either documents or disconnected
				if (!aup || !bup) {
					return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;

					// If the nodes are siblings, we can do a quick check
				} else if (aup === bup) {
						return siblingCheck(a, b);
					}

				// Otherwise we need full lists of their ancestors for comparison
				cur = a;
				while (cur = cur.parentNode) {
					ap.unshift(cur);
				}
				cur = b;
				while (cur = cur.parentNode) {
					bp.unshift(cur);
				}

				// Walk down the tree looking for a discrepancy
				while (ap[i] === bp[i]) {
					i++;
				}

				return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck(ap[i], bp[i]) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
			};

			return document;
		};

		Sizzle.matches = function (expr, elements) {
			return Sizzle(expr, null, null, elements);
		};

		Sizzle.matchesSelector = function (elem, expr) {
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem);
			}

			// Make sure that attribute selectors are quoted
			expr = expr.replace(rattributeQuotes, "='$1']");

			if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {

				try {
					var ret = matches.call(elem, expr);

					// IE 9's matchesSelector returns false on disconnected nodes
					if (ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11) {
						return ret;
					}
				} catch (e) {}
			}

			return Sizzle(expr, document, null, [elem]).length > 0;
		};

		Sizzle.contains = function (context, elem) {
			// Set document vars if needed
			if ((context.ownerDocument || context) !== document) {
				setDocument(context);
			}
			return contains(context, elem);
		};

		Sizzle.attr = function (elem, name) {
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem);
			}

			var fn = Expr.attrHandle[name.toLowerCase()],

			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;

			return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
		};

		Sizzle.error = function (msg) {
			throw new Error("Syntax error, unrecognized expression: " + msg);
		};

		/**
   * Document sorting and removing duplicates
   * @param {ArrayLike} results
   */
		Sizzle.uniqueSort = function (results) {
			var elem,
			    duplicates = [],
			    j = 0,
			    i = 0;

			// Unless we *know* we can detect duplicates, assume their presence
			hasDuplicate = !support.detectDuplicates;
			sortInput = !support.sortStable && results.slice(0);
			results.sort(sortOrder);

			if (hasDuplicate) {
				while (elem = results[i++]) {
					if (elem === results[i]) {
						j = duplicates.push(i);
					}
				}
				while (j--) {
					results.splice(duplicates[j], 1);
				}
			}

			// Clear input after sorting to release objects
			// See https://github.com/jquery/sizzle/pull/225
			sortInput = null;

			return results;
		};

		/**
   * Utility function for retrieving the text value of an array of DOM nodes
   * @param {Array|Element} elem
   */
		getText = Sizzle.getText = function (elem) {
			var node,
			    ret = "",
			    i = 0,
			    nodeType = elem.nodeType;

			if (!nodeType) {
				// If no nodeType, this is expected to be an array
				while (node = elem[i++]) {
					// Do not traverse comment nodes
					ret += getText(node);
				}
			} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
				// Use textContent for elements
				// innerText usage removed for consistency of new lines (jQuery #11153)
				if (typeof elem.textContent === "string") {
					return elem.textContent;
				} else {
					// Traverse its children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						ret += getText(elem);
					}
				}
			} else if (nodeType === 3 || nodeType === 4) {
				return elem.nodeValue;
			}
			// Do not include comment or processing instruction nodes

			return ret;
		};

		Expr = Sizzle.selectors = {

			// Can be adjusted by the user
			cacheLength: 50,

			createPseudo: markFunction,

			match: matchExpr,

			attrHandle: {},

			find: {},

			relative: {
				">": { dir: "parentNode", first: true },
				" ": { dir: "parentNode" },
				"+": { dir: "previousSibling", first: true },
				"~": { dir: "previousSibling" }
			},

			preFilter: {
				"ATTR": function ATTR(match) {
					match[1] = match[1].replace(runescape, funescape);

					// Move the given value to match[3] whether quoted or unquoted
					match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

					if (match[2] === "~=") {
						match[3] = " " + match[3] + " ";
					}

					return match.slice(0, 4);
				},

				"CHILD": function CHILD(match) {
					/* matches from matchExpr["CHILD"]
     	1 type (only|nth|...)
     	2 what (child|of-type)
     	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
     	4 xn-component of xn+y argument ([+-]?\d*n|)
     	5 sign of xn-component
     	6 x of xn-component
     	7 sign of y-component
     	8 y of y-component
     */
					match[1] = match[1].toLowerCase();

					if (match[1].slice(0, 3) === "nth") {
						// nth-* requires argument
						if (!match[3]) {
							Sizzle.error(match[0]);
						}

						// numeric x and y parameters for Expr.filter.CHILD
						// remember that false/true cast respectively to 0/1
						match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
						match[5] = +(match[7] + match[8] || match[3] === "odd");

						// other types prohibit arguments
					} else if (match[3]) {
							Sizzle.error(match[0]);
						}

					return match;
				},

				"PSEUDO": function PSEUDO(match) {
					var excess,
					    unquoted = !match[6] && match[2];

					if (matchExpr["CHILD"].test(match[0])) {
						return null;
					}

					// Accept quoted arguments as-is
					if (match[3]) {
						match[2] = match[4] || match[5] || "";

						// Strip excess characters from unquoted arguments
					} else if (unquoted && rpseudo.test(unquoted) && (
						// Get excess from tokenize (recursively)
						excess = tokenize(unquoted, true)) && (
						// advance to the next closing parenthesis
						excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

							// excess is a negative index
							match[0] = match[0].slice(0, excess);
							match[2] = unquoted.slice(0, excess);
						}

					// Return only captures needed by the pseudo filter method (type and argument)
					return match.slice(0, 3);
				}
			},

			filter: {

				"TAG": function TAG(nodeNameSelector) {
					var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
					return nodeNameSelector === "*" ? function () {
						return true;
					} : function (elem) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
				},

				"CLASS": function CLASS(className) {
					var pattern = classCache[className + " "];

					return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
						return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
					});
				},

				"ATTR": function ATTR(name, operator, check) {
					return function (elem) {
						var result = Sizzle.attr(elem, name);

						if (result == null) {
							return operator === "!=";
						}
						if (!operator) {
							return true;
						}

						result += "";

						return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
					};
				},

				"CHILD": function CHILD(type, what, argument, first, last) {
					var simple = type.slice(0, 3) !== "nth",
					    forward = type.slice(-4) !== "last",
					    ofType = what === "of-type";

					return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function (elem) {
						return !!elem.parentNode;
					} : function (elem, context, xml) {
						var cache,
						    uniqueCache,
						    outerCache,
						    node,
						    nodeIndex,
						    start,
						    dir = simple !== forward ? "nextSibling" : "previousSibling",
						    parent = elem.parentNode,
						    name = ofType && elem.nodeName.toLowerCase(),
						    useCache = !xml && !ofType,
						    diff = false;

						if (parent) {

							// :(first|last|only)-(child|of-type)
							if (simple) {
								while (dir) {
									node = elem;
									while (node = node[dir]) {
										if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [forward ? parent.firstChild : parent.lastChild];

							// non-xml :nth-child(...) stores cache data on `parent`
							if (forward && useCache) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[expando] || (node[expando] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

								cache = uniqueCache[type] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = nodeIndex && cache[2];
								node = nodeIndex && parent.childNodes[nodeIndex];

								while (node = ++nodeIndex && node && node[dir] || (

								// Fallback to seeking `elem` from the start
								diff = nodeIndex = 0) || start.pop()) {

									// When found, cache indexes on `parent` and break
									if (node.nodeType === 1 && ++diff && node === elem) {
										uniqueCache[type] = [dirruns, nodeIndex, diff];
										break;
									}
								}
							} else {
								// Use previously-cached element index if available
								if (useCache) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[expando] || (node[expando] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

									cache = uniqueCache[type] || [];
									nodeIndex = cache[0] === dirruns && cache[1];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if (diff === false) {
									// Use the same loop as above to seek `elem` from the start
									while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {

										if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {

											// Cache the index of each encountered element
											if (useCache) {
												outerCache = node[expando] || (node[expando] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

												uniqueCache[type] = [dirruns, diff];
											}

											if (node === elem) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || diff % first === 0 && diff / first >= 0;
						}
					};
				},

				"PSEUDO": function PSEUDO(pseudo, argument) {
					// pseudo-class names are case-insensitive
					// http://www.w3.org/TR/selectors/#pseudo-classes
					// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
					// Remember that setFilters inherits from pseudos
					var args,
					    fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);

					// The user may use createPseudo to indicate that
					// arguments are needed to create the filter function
					// just as Sizzle does
					if (fn[expando]) {
						return fn(argument);
					}

					// But maintain support for old signatures
					if (fn.length > 1) {
						args = [pseudo, pseudo, "", argument];
						return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
							var idx,
							    matched = fn(seed, argument),
							    i = matched.length;
							while (i--) {
								idx = indexOf(seed, matched[i]);
								seed[idx] = !(matches[idx] = matched[i]);
							}
						}) : function (elem) {
							return fn(elem, 0, args);
						};
					}

					return fn;
				}
			},

			pseudos: {
				// Potentially complex pseudos
				"not": markFunction(function (selector) {
					// Trim the selector passed to compile
					// to avoid treating leading and trailing
					// spaces as combinators
					var input = [],
					    results = [],
					    matcher = compile(selector.replace(rtrim, "$1"));

					return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
						var elem,
						    unmatched = matcher(seed, null, xml, []),
						    i = seed.length;

						// Match elements unmatched by `matcher`
						while (i--) {
							if (elem = unmatched[i]) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) : function (elem, context, xml) {
						input[0] = elem;
						matcher(input, null, xml, results);
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
				}),

				"has": markFunction(function (selector) {
					return function (elem) {
						return Sizzle(selector, elem).length > 0;
					};
				}),

				"contains": markFunction(function (text) {
					text = text.replace(runescape, funescape);
					return function (elem) {
						return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
					};
				}),

				// "Whether an element is represented by a :lang() selector
				// is based solely on the element's language value
				// being equal to the identifier C,
				// or beginning with the identifier C immediately followed by "-".
				// The matching of C against the element's language value is performed case-insensitively.
				// The identifier C does not have to be a valid language name."
				// http://www.w3.org/TR/selectors/#lang-pseudo
				"lang": markFunction(function (lang) {
					// lang value must be a valid identifier
					if (!ridentifier.test(lang || "")) {
						Sizzle.error("unsupported lang: " + lang);
					}
					lang = lang.replace(runescape, funescape).toLowerCase();
					return function (elem) {
						var elemLang;
						do {
							if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {

								elemLang = elemLang.toLowerCase();
								return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
							}
						} while ((elem = elem.parentNode) && elem.nodeType === 1);
						return false;
					};
				}),

				// Miscellaneous
				"target": function target(elem) {
					var hash = window.location && window.location.hash;
					return hash && hash.slice(1) === elem.id;
				},

				"root": function root(elem) {
					return elem === docElem;
				},

				"focus": function focus(elem) {
					return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
				},

				// Boolean properties
				"enabled": function enabled(elem) {
					return elem.disabled === false;
				},

				"disabled": function disabled(elem) {
					return elem.disabled === true;
				},

				"checked": function checked(elem) {
					// In CSS3, :checked should return both checked and selected elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					var nodeName = elem.nodeName.toLowerCase();
					return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
				},

				"selected": function selected(elem) {
					// Accessing this property makes selected-by-default
					// options in Safari work properly
					if (elem.parentNode) {
						elem.parentNode.selectedIndex;
					}

					return elem.selected === true;
				},

				// Contents
				"empty": function empty(elem) {
					// http://www.w3.org/TR/selectors/#empty-pseudo
					// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
					//   but not by others (comment: 8; processing instruction: 7; etc.)
					// nodeType < 6 works because attributes (2) do not appear as children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						if (elem.nodeType < 6) {
							return false;
						}
					}
					return true;
				},

				"parent": function parent(elem) {
					return !Expr.pseudos["empty"](elem);
				},

				// Element/input types
				"header": function header(elem) {
					return rheader.test(elem.nodeName);
				},

				"input": function input(elem) {
					return rinputs.test(elem.nodeName);
				},

				"button": function button(elem) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === "button" || name === "button";
				},

				"text": function text(elem) {
					var attr;
					return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && (

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					(attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
				},

				// Position-in-collection
				"first": createPositionalPseudo(function () {
					return [0];
				}),

				"last": createPositionalPseudo(function (matchIndexes, length) {
					return [length - 1];
				}),

				"eq": createPositionalPseudo(function (matchIndexes, length, argument) {
					return [argument < 0 ? argument + length : argument];
				}),

				"even": createPositionalPseudo(function (matchIndexes, length) {
					var i = 0;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"odd": createPositionalPseudo(function (matchIndexes, length) {
					var i = 1;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"lt": createPositionalPseudo(function (matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; --i >= 0;) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"gt": createPositionalPseudo(function (matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; ++i < length;) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				})
			}
		};

		Expr.pseudos["nth"] = Expr.pseudos["eq"];

		// Add button/input type pseudos
		for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
			Expr.pseudos[i] = createInputPseudo(i);
		}
		for (i in { submit: true, reset: true }) {
			Expr.pseudos[i] = createButtonPseudo(i);
		}

		// Easy API for creating new setFilters
		function setFilters() {}
		setFilters.prototype = Expr.filters = Expr.pseudos;
		Expr.setFilters = new setFilters();

		tokenize = Sizzle.tokenize = function (selector, parseOnly) {
			var matched,
			    match,
			    tokens,
			    type,
			    soFar,
			    groups,
			    preFilters,
			    cached = tokenCache[selector + " "];

			if (cached) {
				return parseOnly ? 0 : cached.slice(0);
			}

			soFar = selector;
			groups = [];
			preFilters = Expr.preFilter;

			while (soFar) {

				// Comma and first run
				if (!matched || (match = rcomma.exec(soFar))) {
					if (match) {
						// Don't consume trailing commas as valid
						soFar = soFar.slice(match[0].length) || soFar;
					}
					groups.push(tokens = []);
				}

				matched = false;

				// Combinators
				if (match = rcombinators.exec(soFar)) {
					matched = match.shift();
					tokens.push({
						value: matched,
						// Cast descendant combinators to space
						type: match[0].replace(rtrim, " ")
					});
					soFar = soFar.slice(matched.length);
				}

				// Filters
				for (type in Expr.filter) {
					if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
						matched = match.shift();
						tokens.push({
							value: matched,
							type: type,
							matches: match
						});
						soFar = soFar.slice(matched.length);
					}
				}

				if (!matched) {
					break;
				}
			}

			// Return the length of the invalid excess
			// if we're just parsing
			// Otherwise, throw an error or return tokens
			return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) :
			// Cache the tokens
			tokenCache(selector, groups).slice(0);
		};

		function toSelector(tokens) {
			var i = 0,
			    len = tokens.length,
			    selector = "";
			for (; i < len; i++) {
				selector += tokens[i].value;
			}
			return selector;
		}

		function addCombinator(matcher, combinator, base) {
			var dir = combinator.dir,
			    checkNonElements = base && dir === "parentNode",
			    doneName = done++;

			return combinator.first ?
			// Check against closest ancestor/preceding element
			function (elem, context, xml) {
				while (elem = elem[dir]) {
					if (elem.nodeType === 1 || checkNonElements) {
						return matcher(elem, context, xml);
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function (elem, context, xml) {
				var oldCache,
				    uniqueCache,
				    outerCache,
				    newCache = [dirruns, doneName];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if (xml) {
					while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) {
							if (matcher(elem, context, xml)) {
								return true;
							}
						}
					}
				} else {
					while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) {
							outerCache = elem[expando] || (elem[expando] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

							if ((oldCache = uniqueCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {

								// Assign to newCache so results back-propagate to previous elements
								return newCache[2] = oldCache[2];
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[dir] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if (newCache[2] = matcher(elem, context, xml)) {
									return true;
								}
							}
						}
					}
				}
			};
		}

		function elementMatcher(matchers) {
			return matchers.length > 1 ? function (elem, context, xml) {
				var i = matchers.length;
				while (i--) {
					if (!matchers[i](elem, context, xml)) {
						return false;
					}
				}
				return true;
			} : matchers[0];
		}

		function multipleContexts(selector, contexts, results) {
			var i = 0,
			    len = contexts.length;
			for (; i < len; i++) {
				Sizzle(selector, contexts[i], results);
			}
			return results;
		}

		function condense(unmatched, map, filter, context, xml) {
			var elem,
			    newUnmatched = [],
			    i = 0,
			    len = unmatched.length,
			    mapped = map != null;

			for (; i < len; i++) {
				if (elem = unmatched[i]) {
					if (!filter || filter(elem, context, xml)) {
						newUnmatched.push(elem);
						if (mapped) {
							map.push(i);
						}
					}
				}
			}

			return newUnmatched;
		}

		function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
			if (postFilter && !postFilter[expando]) {
				postFilter = setMatcher(postFilter);
			}
			if (postFinder && !postFinder[expando]) {
				postFinder = setMatcher(postFinder, postSelector);
			}
			return markFunction(function (seed, results, context, xml) {
				var temp,
				    i,
				    elem,
				    preMap = [],
				    postMap = [],
				    preexisting = results.length,


				// Get initial elements from seed or context
				elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),


				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
				    matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || (seed ? preFilter : preexisting || postFilter) ?

				// ...intermediate processing is necessary
				[] :

				// ...otherwise use results directly
				results : matcherIn;

				// Find primary matches
				if (matcher) {
					matcher(matcherIn, matcherOut, context, xml);
				}

				// Apply postFilter
				if (postFilter) {
					temp = condense(matcherOut, postMap);
					postFilter(temp, [], context, xml);

					// Un-match failing elements by moving them back to matcherIn
					i = temp.length;
					while (i--) {
						if (elem = temp[i]) {
							matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
						}
					}
				}

				if (seed) {
					if (postFinder || preFilter) {
						if (postFinder) {
							// Get the final matcherOut by condensing this intermediate into postFinder contexts
							temp = [];
							i = matcherOut.length;
							while (i--) {
								if (elem = matcherOut[i]) {
									// Restore matcherIn since elem is not yet a final match
									temp.push(matcherIn[i] = elem);
								}
							}
							postFinder(null, matcherOut = [], temp, xml);
						}

						// Move matched elements from seed to results to keep them synchronized
						i = matcherOut.length;
						while (i--) {
							if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

								seed[temp] = !(results[temp] = elem);
							}
						}
					}

					// Add elements to results, through postFinder if defined
				} else {
						matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
						if (postFinder) {
							postFinder(null, results, matcherOut, xml);
						} else {
							push.apply(results, matcherOut);
						}
					}
			});
		}

		function matcherFromTokens(tokens) {
			var checkContext,
			    matcher,
			    j,
			    len = tokens.length,
			    leadingRelative = Expr.relative[tokens[0].type],
			    implicitRelative = leadingRelative || Expr.relative[" "],
			    i = leadingRelative ? 1 : 0,


			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator(function (elem) {
				return elem === checkContext;
			}, implicitRelative, true),
			    matchAnyContext = addCombinator(function (elem) {
				return indexOf(checkContext, elem) > -1;
			}, implicitRelative, true),
			    matchers = [function (elem, context, xml) {
				var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			}];

			for (; i < len; i++) {
				if (matcher = Expr.relative[tokens[i].type]) {
					matchers = [addCombinator(elementMatcher(matchers), matcher)];
				} else {
					matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

					// Return special upon seeing a positional matcher
					if (matcher[expando]) {
						// Find the next relative operator (if any) for proper handling
						j = ++i;
						for (; j < len; j++) {
							if (Expr.relative[tokens[j].type]) {
								break;
							}
						}
						return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
					}
					matchers.push(matcher);
				}
			}

			return elementMatcher(matchers);
		}

		function matcherFromGroupMatchers(elementMatchers, setMatchers) {
			var bySet = setMatchers.length > 0,
			    byElement = elementMatchers.length > 0,
			    superMatcher = function superMatcher(seed, context, xml, results, outermost) {
				var elem,
				    j,
				    matcher,
				    matchedCount = 0,
				    i = "0",
				    unmatched = seed && [],
				    setMatched = [],
				    contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]("*", outermost),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
				    len = elems.length;

				if (outermost) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for (; i !== len && (elem = elems[i]) != null; i++) {
					if (byElement && elem) {
						j = 0;
						if (!context && elem.ownerDocument !== document) {
							setDocument(elem);
							xml = !documentIsHTML;
						}
						while (matcher = elementMatchers[j++]) {
							if (matcher(elem, context || document, xml)) {
								results.push(elem);
								break;
							}
						}
						if (outermost) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if (bySet) {
						// They will have gone through all possible matchers
						if (elem = !matcher && elem) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if (seed) {
							unmatched.push(elem);
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if (bySet && i !== matchedCount) {
					j = 0;
					while (matcher = setMatchers[j++]) {
						matcher(unmatched, setMatched, context, xml);
					}

					if (seed) {
						// Reintegrate element matches to eliminate the need for sorting
						if (matchedCount > 0) {
							while (i--) {
								if (!(unmatched[i] || setMatched[i])) {
									setMatched[i] = pop.call(results);
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense(setMatched);
					}

					// Add matches to results
					push.apply(results, setMatched);

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {

						Sizzle.uniqueSort(results);
					}
				}

				// Override manipulation of globals by nested matchers
				if (outermost) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

			return bySet ? markFunction(superMatcher) : superMatcher;
		}

		compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
			var i,
			    setMatchers = [],
			    elementMatchers = [],
			    cached = compilerCache[selector + " "];

			if (!cached) {
				// Generate a function of recursive functions that can be used to check each element
				if (!match) {
					match = tokenize(selector);
				}
				i = match.length;
				while (i--) {
					cached = matcherFromTokens(match[i]);
					if (cached[expando]) {
						setMatchers.push(cached);
					} else {
						elementMatchers.push(cached);
					}
				}

				// Cache the compiled function
				cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

				// Save selector and tokenization
				cached.selector = selector;
			}
			return cached;
		};

		/**
   * A low-level selection function that works with Sizzle's compiled
   *  selector functions
   * @param {String|Function} selector A selector or a pre-compiled
   *  selector function built with Sizzle.compile
   * @param {Element} context
   * @param {Array} [results]
   * @param {Array} [seed] A set of elements to match against
   */
		select = Sizzle.select = function (selector, context, results, seed) {
			var i,
			    tokens,
			    token,
			    type,
			    find,
			    compiled = typeof selector === "function" && selector,
			    match = !seed && tokenize(selector = compiled.selector || selector);

			results = results || [];

			// Try to minimize operations if there is only one selector in the list and no seed
			// (the latter of which guarantees us context)
			if (match.length === 1) {

				// Reduce context if the leading compound selector is an ID
				tokens = match[0] = match[0].slice(0);
				if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

					context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
					if (!context) {
						return results;

						// Precompiled matchers will still verify ancestry, so step up a level
					} else if (compiled) {
							context = context.parentNode;
						}

					selector = selector.slice(tokens.shift().value.length);
				}

				// Fetch a seed set for right-to-left matching
				i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
				while (i--) {
					token = tokens[i];

					// Abort if we hit a combinator
					if (Expr.relative[type = token.type]) {
						break;
					}
					if (find = Expr.find[type]) {
						// Search, expanding context for leading sibling combinators
						if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {

							// If seed is empty or no tokens remain, we can return early
							tokens.splice(i, 1);
							selector = seed.length && toSelector(tokens);
							if (!selector) {
								push.apply(results, seed);
								return results;
							}

							break;
						}
					}
				}
			}

			// Compile and execute a filtering function if one is not provided
			// Provide `match` to avoid retokenization if we modified the selector above
			(compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
			return results;
		};

		// One-time assignments

		// Sort stability
		support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

		// Support: Chrome 14-35+
		// Always assume duplicates if they aren't passed to the comparison function
		support.detectDuplicates = !!hasDuplicate;

		// Initialize against the default document
		setDocument();

		// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
		// Detached nodes confoundingly follow *each other*
		support.sortDetached = assert(function (div1) {
			// Should return 1, but returns 4 (following)
			return div1.compareDocumentPosition(document.createElement("div")) & 1;
		});

		// Support: IE<8
		// Prevent attribute/property "interpolation"
		// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
		if (!assert(function (div) {
			div.innerHTML = "<a href='#'></a>";
			return div.firstChild.getAttribute("href") === "#";
		})) {
			addHandle("type|href|height|width", function (elem, name, isXML) {
				if (!isXML) {
					return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
				}
			});
		}

		// Support: IE<9
		// Use defaultValue in place of getAttribute("value")
		if (!support.attributes || !assert(function (div) {
			div.innerHTML = "<input/>";
			div.firstChild.setAttribute("value", "");
			return div.firstChild.getAttribute("value") === "";
		})) {
			addHandle("value", function (elem, name, isXML) {
				if (!isXML && elem.nodeName.toLowerCase() === "input") {
					return elem.defaultValue;
				}
			});
		}

		// Support: IE<9
		// Use getAttributeNode to fetch booleans when getAttribute lies
		if (!assert(function (div) {
			return div.getAttribute("disabled") == null;
		})) {
			addHandle(booleans, function (elem, name, isXML) {
				var val;
				if (!isXML) {
					return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
				}
			});
		}

		return Sizzle;
	}(window);

	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;

	var dir = function dir(elem, _dir, until) {
		var matched = [],
		    truncate = until !== undefined;

		while ((elem = elem[_dir]) && elem.nodeType !== 9) {
			if (elem.nodeType === 1) {
				if (truncate && jQuery(elem).is(until)) {
					break;
				}
				matched.push(elem);
			}
		}
		return matched;
	};

	var _siblings = function _siblings(n, elem) {
		var matched = [];

		for (; n; n = n.nextSibling) {
			if (n.nodeType === 1 && n !== elem) {
				matched.push(n);
			}
		}

		return matched;
	};

	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/;

	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow(elements, qualifier, not) {
		if (jQuery.isFunction(qualifier)) {
			return jQuery.grep(elements, function (elem, i) {
				/* jshint -W018 */
				return !!qualifier.call(elem, i, elem) !== not;
			});
		}

		if (qualifier.nodeType) {
			return jQuery.grep(elements, function (elem) {
				return elem === qualifier !== not;
			});
		}

		if (typeof qualifier === "string") {
			if (risSimple.test(qualifier)) {
				return jQuery.filter(qualifier, elements, not);
			}

			qualifier = jQuery.filter(qualifier, elements);
		}

		return jQuery.grep(elements, function (elem) {
			return indexOf.call(qualifier, elem) > -1 !== not;
		});
	}

	jQuery.filter = function (expr, elems, not) {
		var elem = elems[0];

		if (not) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
			return elem.nodeType === 1;
		}));
	};

	jQuery.fn.extend({
		find: function find(selector) {
			var i,
			    len = this.length,
			    ret = [],
			    self = this;

			if (typeof selector !== "string") {
				return this.pushStack(jQuery(selector).filter(function () {
					for (i = 0; i < len; i++) {
						if (jQuery.contains(self[i], this)) {
							return true;
						}
					}
				}));
			}

			for (i = 0; i < len; i++) {
				jQuery.find(selector, self[i], ret);
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function filter(selector) {
			return this.pushStack(winnow(this, selector || [], false));
		},
		not: function not(selector) {
			return this.pushStack(winnow(this, selector || [], true));
		},
		is: function is(selector) {
			return !!winnow(this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
		}
	});

	// Initialize a jQuery object

	// A central reference to the root jQuery(document)
	var rootjQuery,


	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	    init = jQuery.fn.init = function (selector, context, root) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if (!selector) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if (typeof selector === "string") {
			if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [null, selector, null];
			} else {
				match = rquickExpr.exec(selector);
			}

			// Match html or make sure no context is specified for #id
			if (match && (match[1] || !context)) {

				// HANDLE: $(html) -> $(array)
				if (match[1]) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

					// HANDLE: $(html, props)
					if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
						for (match in context) {

							// Properties of context are called as methods if possible
							if (jQuery.isFunction(this[match])) {
								this[match](context[match]);

								// ...and otherwise set as attributes
							} else {
									this.attr(match, context[match]);
								}
						}
					}

					return this;

					// HANDLE: $(#id)
				} else {
						elem = document.getElementById(match[2]);

						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if (elem && elem.parentNode) {

							// Inject the element directly into the jQuery object
							this.length = 1;
							this[0] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

				// HANDLE: $(expr, $(...))
			} else if (!context || context.jquery) {
					return (context || root).find(selector);

					// HANDLE: $(expr, context)
					// (which is just equivalent to: $(context).find(expr)
				} else {
						return this.constructor(context).find(selector);
					}

			// HANDLE: $(DOMElement)
		} else if (selector.nodeType) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;

				// HANDLE: $(function)
				// Shortcut for document ready
			} else if (jQuery.isFunction(selector)) {
					return root.ready !== undefined ? root.ready(selector) :

					// Execute immediately if ready is not present
					selector(jQuery);
				}

		if (selector.selector !== undefined) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray(selector, this);
	};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery(document);

	var rparentsprev = /^(?:parents|prev(?:Until|All))/,


	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

	jQuery.fn.extend({
		has: function has(target) {
			var targets = jQuery(target, this),
			    l = targets.length;

			return this.filter(function () {
				var i = 0;
				for (; i < l; i++) {
					if (jQuery.contains(this, targets[i])) {
						return true;
					}
				}
			});
		},

		closest: function closest(selectors, context) {
			var cur,
			    i = 0,
			    l = this.length,
			    matched = [],
			    pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;

			for (; i < l; i++) {
				for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

					// Always skip document fragments
					if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {

						matched.push(cur);
						break;
					}
				}
			}

			return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
		},

		// Determine the position of an element within the set
		index: function index(elem) {

			// No argument, return index in parent
			if (!elem) {
				return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if (typeof elem === "string") {
				return indexOf.call(jQuery(elem), this[0]);
			}

			// Locate the position of the desired element
			return indexOf.call(this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem);
		},

		add: function add(selector, context) {
			return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
		},

		addBack: function addBack(selector) {
			return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
		}
	});

	function sibling(cur, dir) {
		while ((cur = cur[dir]) && cur.nodeType !== 1) {}
		return cur;
	}

	jQuery.each({
		parent: function parent(elem) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function parents(elem) {
			return dir(elem, "parentNode");
		},
		parentsUntil: function parentsUntil(elem, i, until) {
			return dir(elem, "parentNode", until);
		},
		next: function next(elem) {
			return sibling(elem, "nextSibling");
		},
		prev: function prev(elem) {
			return sibling(elem, "previousSibling");
		},
		nextAll: function nextAll(elem) {
			return dir(elem, "nextSibling");
		},
		prevAll: function prevAll(elem) {
			return dir(elem, "previousSibling");
		},
		nextUntil: function nextUntil(elem, i, until) {
			return dir(elem, "nextSibling", until);
		},
		prevUntil: function prevUntil(elem, i, until) {
			return dir(elem, "previousSibling", until);
		},
		siblings: function siblings(elem) {
			return _siblings((elem.parentNode || {}).firstChild, elem);
		},
		children: function children(elem) {
			return _siblings(elem.firstChild);
		},
		contents: function contents(elem) {
			return elem.contentDocument || jQuery.merge([], elem.childNodes);
		}
	}, function (name, fn) {
		jQuery.fn[name] = function (until, selector) {
			var matched = jQuery.map(this, fn, until);

			if (name.slice(-5) !== "Until") {
				selector = until;
			}

			if (selector && typeof selector === "string") {
				matched = jQuery.filter(selector, matched);
			}

			if (this.length > 1) {

				// Remove duplicates
				if (!guaranteedUnique[name]) {
					jQuery.uniqueSort(matched);
				}

				// Reverse order for parents* and prev-derivatives
				if (rparentsprev.test(name)) {
					matched.reverse();
				}
			}

			return this.pushStack(matched);
		};
	});
	var rnotwhite = /\S+/g;

	// Convert String-formatted options into Object-formatted ones
	function createOptions(options) {
		var object = {};
		jQuery.each(options.match(rnotwhite) || [], function (_, flag) {
			object[flag] = true;
		});
		return object;
	}

	/*
  * Create a callback list using the following parameters:
  *
  *	options: an optional list of space-separated options that will change how
  *			the callback list behaves or a more traditional option object
  *
  * By default a callback list will act like an event callback list and can be
  * "fired" multiple times.
  *
  * Possible options:
  *
  *	once:			will ensure the callback list can only be fired once (like a Deferred)
  *
  *	memory:			will keep track of previous values and will call any callback added
  *					after the list has been fired right away with the latest "memorized"
  *					values (like a Deferred)
  *
  *	unique:			will ensure a callback can only be added once (no duplicate in the list)
  *
  *	stopOnFalse:	interrupt callings when a callback returns false
  *
  */
	jQuery.Callbacks = function (options) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);

		var // Flag to know if list is currently firing
		firing,


		// Last fire value for non-forgettable lists
		memory,


		// Flag to know if list was already fired
		_fired,


		// Flag to prevent firing
		_locked,


		// Actual callback list
		list = [],


		// Queue of execution data for repeatable lists
		queue = [],


		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,


		// Fire callbacks
		fire = function fire() {

			// Enforce single-firing
			_locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			_fired = firing = true;
			for (; queue.length; firingIndex = -1) {
				memory = queue.shift();
				while (++firingIndex < list.length) {

					// Run callback and check for early termination
					if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if (!options.memory) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if (_locked) {

				// Keep an empty list if we have data for future add calls
				if (memory) {
					list = [];

					// Otherwise, this object is spent
				} else {
						list = "";
					}
			}
		},


		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function add() {
				if (list) {

					// If we have memory from a past run, we should fire after adding
					if (memory && !firing) {
						firingIndex = list.length - 1;
						queue.push(memory);
					}

					(function add(args) {
						jQuery.each(args, function (_, arg) {
							if (jQuery.isFunction(arg)) {
								if (!options.unique || !self.has(arg)) {
									list.push(arg);
								}
							} else if (arg && arg.length && jQuery.type(arg) !== "string") {

								// Inspect recursively
								add(arg);
							}
						});
					})(arguments);

					if (memory && !firing) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function remove() {
				jQuery.each(arguments, function (_, arg) {
					var index;
					while ((index = jQuery.inArray(arg, list, index)) > -1) {
						list.splice(index, 1);

						// Handle firing indexes
						if (index <= firingIndex) {
							firingIndex--;
						}
					}
				});
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function has(fn) {
				return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function empty() {
				if (list) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function disable() {
				_locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function disabled() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function lock() {
				_locked = queue = [];
				if (!memory) {
					list = memory = "";
				}
				return this;
			},
			locked: function locked() {
				return !!_locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function fireWith(context, args) {
				if (!_locked) {
					args = args || [];
					args = [context, args.slice ? args.slice() : args];
					queue.push(args);
					if (!firing) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function fire() {
				self.fireWith(this, arguments);
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function fired() {
				return !!_fired;
			}
		};

		return self;
	};

	jQuery.extend({

		Deferred: function Deferred(func) {
			var tuples = [

			// action, add listener, listener list, final state
			["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
			    _state = "pending",
			    _promise = {
				state: function state() {
					return _state;
				},
				always: function always() {
					deferred.done(arguments).fail(arguments);
					return this;
				},
				then: function then() /* fnDone, fnFail, fnProgress */{
					var fns = arguments;
					return jQuery.Deferred(function (newDefer) {
						jQuery.each(tuples, function (i, tuple) {
							var fn = jQuery.isFunction(fns[i]) && fns[i];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[tuple[1]](function () {
								var returned = fn && fn.apply(this, arguments);
								if (returned && jQuery.isFunction(returned.promise)) {
									returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
								} else {
									newDefer[tuple[0] + "With"](this === _promise ? newDefer.promise() : this, fn ? [returned] : arguments);
								}
							});
						});
						fns = null;
					}).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function promise(obj) {
					return obj != null ? jQuery.extend(obj, _promise) : _promise;
				}
			},
			    deferred = {};

			// Keep pipe for back-compat
			_promise.pipe = _promise.then;

			// Add list-specific methods
			jQuery.each(tuples, function (i, tuple) {
				var list = tuple[2],
				    stateString = tuple[3];

				// promise[ done | fail | progress ] = list.add
				_promise[tuple[1]] = list.add;

				// Handle state
				if (stateString) {
					list.add(function () {

						// state = [ resolved | rejected ]
						_state = stateString;

						// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[i ^ 1][2].disable, tuples[2][2].lock);
				}

				// deferred[ resolve | reject | notify ]
				deferred[tuple[0]] = function () {
					deferred[tuple[0] + "With"](this === deferred ? _promise : this, arguments);
					return this;
				};
				deferred[tuple[0] + "With"] = list.fireWith;
			});

			// Make the deferred a promise
			_promise.promise(deferred);

			// Call given func if any
			if (func) {
				func.call(deferred, deferred);
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function when(subordinate /* , ..., subordinateN */) {
			var i = 0,
			    resolveValues = _slice.call(arguments),
			    length = resolveValues.length,


			// the count of uncompleted subordinates
			remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0,


			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),


			// Update function for both resolve and progress values
			updateFunc = function updateFunc(i, contexts, values) {
				return function (value) {
					contexts[i] = this;
					values[i] = arguments.length > 1 ? _slice.call(arguments) : value;
					if (values === progressValues) {
						deferred.notifyWith(contexts, values);
					} else if (! --remaining) {
						deferred.resolveWith(contexts, values);
					}
				};
			},
			    progressValues,
			    progressContexts,
			    resolveContexts;

			// Add listeners to Deferred subordinates; treat others as resolved
			if (length > 1) {
				progressValues = new Array(length);
				progressContexts = new Array(length);
				resolveContexts = new Array(length);
				for (; i < length; i++) {
					if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
						resolveValues[i].promise().progress(updateFunc(i, progressContexts, progressValues)).done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject);
					} else {
						--remaining;
					}
				}
			}

			// If we're not waiting on anything, resolve the master
			if (!remaining) {
				deferred.resolveWith(resolveContexts, resolveValues);
			}

			return deferred.promise();
		}
	});

	// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function (fn) {

		// Add the callback
		jQuery.ready.promise().done(fn);

		return this;
	};

	jQuery.extend({

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function holdReady(hold) {
			if (hold) {
				jQuery.readyWait++;
			} else {
				jQuery.ready(true);
			}
		},

		// Handle when the DOM is ready
		ready: function ready(wait) {

			// Abort if there are pending holds or we're already ready
			if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if (wait !== true && --jQuery.readyWait > 0) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith(document, [jQuery]);

			// Trigger any bound ready events
			if (jQuery.fn.triggerHandler) {
				jQuery(document).triggerHandler("ready");
				jQuery(document).off("ready");
			}
		}
	});

	/**
  * The ready event handler and self cleanup method
  */
	function completed() {
		document.removeEventListener("DOMContentLoaded", completed);
		window.removeEventListener("load", completed);
		jQuery.ready();
	}

	jQuery.ready.promise = function (obj) {
		if (!readyList) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called
			// after the browser event has already occurred.
			// Support: IE9-10 only
			// Older IE sometimes signals "interactive" too soon
			if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {

				// Handle it asynchronously to allow scripts the opportunity to delay ready
				window.setTimeout(jQuery.ready);
			} else {

				// Use the handy event callback
				document.addEventListener("DOMContentLoaded", completed);

				// A fallback to window.onload, that will always work
				window.addEventListener("load", completed);
			}
		}
		return readyList.promise(obj);
	};

	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function access(elems, fn, key, value, chainable, emptyGet, raw) {
		var i = 0,
		    len = elems.length,
		    bulk = key == null;

		// Sets many values
		if (jQuery.type(key) === "object") {
			chainable = true;
			for (i in key) {
				access(elems, fn, i, key[i], true, emptyGet, raw);
			}

			// Sets one value
		} else if (value !== undefined) {
				chainable = true;

				if (!jQuery.isFunction(value)) {
					raw = true;
				}

				if (bulk) {

					// Bulk operations run against the entire set
					if (raw) {
						fn.call(elems, value);
						fn = null;

						// ...except when executing function values
					} else {
							bulk = fn;
							fn = function fn(elem, key, value) {
								return bulk.call(jQuery(elem), value);
							};
						}
				}

				if (fn) {
					for (; i < len; i++) {
						fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
					}
				}
			}

		return chainable ? elems :

		// Gets
		bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
	};
	var acceptData = function acceptData(owner) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || ! +owner.nodeType;
	};

	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		register: function register(owner, initial) {
			var value = initial || {};

			// If it is a node unlikely to be stringify-ed or looped over
			// use plain assignment
			if (owner.nodeType) {
				owner[this.expando] = value;

				// Otherwise secure it in a non-enumerable, non-writable property
				// configurability must be true to allow the property to be
				// deleted with the delete operator
			} else {
					Object.defineProperty(owner, this.expando, {
						value: value,
						writable: true,
						configurable: true
					});
				}
			return owner[this.expando];
		},
		cache: function cache(owner) {

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if (!acceptData(owner)) {
				return {};
			}

			// Check if the owner object already has a cache
			var value = owner[this.expando];

			// If not, create one
			if (!value) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if (acceptData(owner)) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if (owner.nodeType) {
						owner[this.expando] = value;

						// Otherwise secure it in a non-enumerable property
						// configurable must be true to allow the property to be
						// deleted when data is removed
					} else {
							Object.defineProperty(owner, this.expando, {
								value: value,
								configurable: true
							});
						}
				}
			}

			return value;
		},
		set: function set(owner, data, value) {
			var prop,
			    cache = this.cache(owner);

			// Handle: [ owner, key, value ] args
			if (typeof data === "string") {
				cache[data] = value;

				// Handle: [ owner, { properties } ] args
			} else {

					// Copy the properties one-by-one to the cache object
					for (prop in data) {
						cache[prop] = data[prop];
					}
				}
			return cache;
		},
		get: function get(owner, key) {
			return key === undefined ? this.cache(owner) : owner[this.expando] && owner[this.expando][key];
		},
		access: function access(owner, key, value) {
			var stored;

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if (key === undefined || key && typeof key === "string" && value === undefined) {

				stored = this.get(owner, key);

				return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key));
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set(owner, key, value);

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function remove(owner, key) {
			var i,
			    name,
			    camel,
			    cache = owner[this.expando];

			if (cache === undefined) {
				return;
			}

			if (key === undefined) {
				this.register(owner);
			} else {

				// Support array or space separated string of keys
				if (jQuery.isArray(key)) {

					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat(key.map(jQuery.camelCase));
				} else {
					camel = jQuery.camelCase(key);

					// Try the string as a key before any manipulation
					if (key in cache) {
						name = [key, camel];
					} else {

						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ? [name] : name.match(rnotwhite) || [];
					}
				}

				i = name.length;

				while (i--) {
					delete cache[name[i]];
				}
			}

			// Remove the expando if there's no more data
			if (key === undefined || jQuery.isEmptyObject(cache)) {

				// Support: Chrome <= 35-45+
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://code.google.com/p/chromium/issues/detail?id=378607
				if (owner.nodeType) {
					owner[this.expando] = undefined;
				} else {
					delete owner[this.expando];
				}
			}
		},
		hasData: function hasData(owner) {
			var cache = owner[this.expando];
			return cache !== undefined && !jQuery.isEmptyObject(cache);
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();

	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	    rmultiDash = /[A-Z]/g;

	function dataAttr(elem, key, data) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if (data === undefined && elem.nodeType === 1) {
			name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
			data = elem.getAttribute(name);

			if (typeof data === "string") {
				try {
					data = data === "true" ? true : data === "false" ? false : data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
				} catch (e) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set(elem, key, data);
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend({
		hasData: function hasData(elem) {
			return dataUser.hasData(elem) || dataPriv.hasData(elem);
		},

		data: function data(elem, name, _data) {
			return dataUser.access(elem, name, _data);
		},

		removeData: function removeData(elem, name) {
			dataUser.remove(elem, name);
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function _data(elem, name, data) {
			return dataPriv.access(elem, name, data);
		},

		_removeData: function _removeData(elem, name) {
			dataPriv.remove(elem, name);
		}
	});

	jQuery.fn.extend({
		data: function data(key, value) {
			var i,
			    name,
			    data,
			    elem = this[0],
			    attrs = elem && elem.attributes;

			// Gets all values
			if (key === undefined) {
				if (this.length) {
					data = dataUser.get(elem);

					if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
						i = attrs.length;
						while (i--) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if (attrs[i]) {
								name = attrs[i].name;
								if (name.indexOf("data-") === 0) {
									name = jQuery.camelCase(name.slice(5));
									dataAttr(elem, name, data[name]);
								}
							}
						}
						dataPriv.set(elem, "hasDataAttrs", true);
					}
				}

				return data;
			}

			// Sets multiple values
			if ((typeof key === "undefined" ? "undefined" : _typeof(key)) === "object") {
				return this.each(function () {
					dataUser.set(this, key);
				});
			}

			return access(this, function (value) {
				var data, camelKey;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if (elem && value === undefined) {

					// Attempt to get data from the cache
					// with the key as-is
					data = dataUser.get(elem, key) ||

					// Try to find dashed key if it exists (gh-2779)
					// This is for 2.2.x only
					dataUser.get(elem, key.replace(rmultiDash, "-$&").toLowerCase());

					if (data !== undefined) {
						return data;
					}

					camelKey = jQuery.camelCase(key);

					// Attempt to get data from the cache
					// with the key camelized
					data = dataUser.get(elem, camelKey);
					if (data !== undefined) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr(elem, camelKey, undefined);
					if (data !== undefined) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				camelKey = jQuery.camelCase(key);
				this.each(function () {

					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = dataUser.get(this, camelKey);

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					dataUser.set(this, camelKey, value);

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if (key.indexOf("-") > -1 && data !== undefined) {
						dataUser.set(this, key, value);
					}
				});
			}, null, value, arguments.length > 1, null, true);
		},

		removeData: function removeData(key) {
			return this.each(function () {
				dataUser.remove(this, key);
			});
		}
	});

	jQuery.extend({
		queue: function queue(elem, type, data) {
			var queue;

			if (elem) {
				type = (type || "fx") + "queue";
				queue = dataPriv.get(elem, type);

				// Speed up dequeue by getting out quickly if this is just a lookup
				if (data) {
					if (!queue || jQuery.isArray(data)) {
						queue = dataPriv.access(elem, type, jQuery.makeArray(data));
					} else {
						queue.push(data);
					}
				}
				return queue || [];
			}
		},

		dequeue: function dequeue(elem, type) {
			type = type || "fx";

			var queue = jQuery.queue(elem, type),
			    startLength = queue.length,
			    fn = queue.shift(),
			    hooks = jQuery._queueHooks(elem, type),
			    next = function next() {
				jQuery.dequeue(elem, type);
			};

			// If the fx queue is dequeued, always remove the progress sentinel
			if (fn === "inprogress") {
				fn = queue.shift();
				startLength--;
			}

			if (fn) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if (type === "fx") {
					queue.unshift("inprogress");
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call(elem, next, hooks);
			}

			if (!startLength && hooks) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function _queueHooks(elem, type) {
			var key = type + "queueHooks";
			return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
				empty: jQuery.Callbacks("once memory").add(function () {
					dataPriv.remove(elem, [type + "queue", key]);
				})
			});
		}
	});

	jQuery.fn.extend({
		queue: function queue(type, data) {
			var setter = 2;

			if (typeof type !== "string") {
				data = type;
				type = "fx";
				setter--;
			}

			if (arguments.length < setter) {
				return jQuery.queue(this[0], type);
			}

			return data === undefined ? this : this.each(function () {
				var queue = jQuery.queue(this, type, data);

				// Ensure a hooks for this queue
				jQuery._queueHooks(this, type);

				if (type === "fx" && queue[0] !== "inprogress") {
					jQuery.dequeue(this, type);
				}
			});
		},
		dequeue: function dequeue(type) {
			return this.each(function () {
				jQuery.dequeue(this, type);
			});
		},
		clearQueue: function clearQueue(type) {
			return this.queue(type || "fx", []);
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function promise(type, obj) {
			var tmp,
			    count = 1,
			    defer = jQuery.Deferred(),
			    elements = this,
			    i = this.length,
			    resolve = function resolve() {
				if (! --count) {
					defer.resolveWith(elements, [elements]);
				}
			};

			if (typeof type !== "string") {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while (i--) {
				tmp = dataPriv.get(elements[i], type + "queueHooks");
				if (tmp && tmp.empty) {
					count++;
					tmp.empty.add(resolve);
				}
			}
			resolve();
			return defer.promise(obj);
		}
	});
	var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;

	var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");

	var cssExpand = ["Top", "Right", "Bottom", "Left"];

	var isHidden = function isHidden(elem, el) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
	};

	function adjustCSS(elem, prop, valueParts, tween) {
		var adjusted,
		    scale = 1,
		    maxIterations = 20,
		    currentValue = tween ? function () {
			return tween.cur();
		} : function () {
			return jQuery.css(elem, prop, "");
		},
		    initial = currentValue(),
		    unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),


		// Starting value computation is required for potential unit mismatches
		initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));

		if (initialInUnit && initialInUnit[3] !== unit) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[3];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style(elem, prop, initialInUnit + unit);

				// Update scale, tolerating zero or NaN from tween.cur()
				// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
		}

		if (valueParts) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
			if (tween) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	var rcheckableType = /^(?:checkbox|radio)$/i;

	var rtagName = /<([\w:-]+)/;

	var rscriptType = /^$|\/(?:java|ecma)script/i;

	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE9
		option: [1, "<select multiple='multiple'>", "</select>"],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [1, "<table>", "</table>"],
		col: [2, "<table><colgroup>", "</colgroup></table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

		_default: [0, "", ""]
	};

	// Support: IE9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	function getAll(context, tag) {

		// Support: IE9-11+
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== "undefined" ? context.querySelectorAll(tag || "*") : [];

		return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret;
	}

	// Mark scripts as having already been evaluated
	function setGlobalEval(elems, refElements) {
		var i = 0,
		    l = elems.length;

		for (; i < l; i++) {
			dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
		}
	}

	var rhtml = /<|&#?\w+;/;

	function buildFragment(elems, context, scripts, selection, ignored) {
		var elem,
		    tmp,
		    tag,
		    wrap,
		    contains,
		    j,
		    fragment = context.createDocumentFragment(),
		    nodes = [],
		    i = 0,
		    l = elems.length;

		for (; i < l; i++) {
			elem = elems[i];

			if (elem || elem === 0) {

				// Add nodes directly
				if (jQuery.type(elem) === "object") {

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

					// Convert non-html into a text node
				} else if (!rhtml.test(elem)) {
						nodes.push(context.createTextNode(elem));

						// Convert html into DOM nodes
					} else {
							tmp = tmp || fragment.appendChild(context.createElement("div"));

							// Deserialize a standard representation
							tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
							wrap = wrapMap[tag] || wrapMap._default;
							tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

							// Descend through wrappers to the right content
							j = wrap[0];
							while (j--) {
								tmp = tmp.lastChild;
							}

							// Support: Android<4.1, PhantomJS<2
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge(nodes, tmp.childNodes);

							// Remember the top-level container
							tmp = fragment.firstChild;

							// Ensure the created nodes are orphaned (#12392)
							tmp.textContent = "";
						}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while (elem = nodes[i++]) {

			// Skip elements already in the context collection (trac-4087)
			if (selection && jQuery.inArray(elem, selection) > -1) {
				if (ignored) {
					ignored.push(elem);
				}
				continue;
			}

			contains = jQuery.contains(elem.ownerDocument, elem);

			// Append to fragment
			tmp = getAll(fragment.appendChild(elem), "script");

			// Preserve script evaluation history
			if (contains) {
				setGlobalEval(tmp);
			}

			// Capture executables
			if (scripts) {
				j = 0;
				while (elem = tmp[j++]) {
					if (rscriptType.test(elem.type || "")) {
						scripts.push(elem);
					}
				}
			}
		}

		return fragment;
	}

	(function () {
		var fragment = document.createDocumentFragment(),
		    div = fragment.appendChild(document.createElement("div")),
		    input = document.createElement("input");

		// Support: Android 4.0-4.3, Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute("type", "radio");
		input.setAttribute("checked", "checked");
		input.setAttribute("name", "t");

		div.appendChild(input);

		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
	})();

	var rkeyEvent = /^key/,
	    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	    rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE9
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch (err) {}
	}

	function _on(elem, types, selector, data, fn, one) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

			// ( types-Object, selector, data )
			if (typeof selector !== "string") {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for (type in types) {
				_on(elem, type, selector, data, types[type], one);
			}
			return elem;
		}

		if (data == null && fn == null) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if (fn == null) {
			if (typeof selector === "string") {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if (fn === false) {
			fn = returnFalse;
		} else if (!fn) {
			return elem;
		}

		if (one === 1) {
			origFn = fn;
			fn = function fn(event) {

				// Can use an empty set, since event contains the info
				jQuery().off(event);
				return origFn.apply(this, arguments);
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
		}
		return elem.each(function () {
			jQuery.event.add(this, types, fn, data, selector);
		});
	}

	/*
  * Helper functions for managing events -- not part of the public interface.
  * Props to Dean Edwards' addEvent library for many of the ideas.
  */
	jQuery.event = {

		global: {},

		add: function add(elem, types, handler, data, selector) {

			var handleObjIn,
			    eventHandle,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.get(elem);

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if (!elemData) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if (handler.handler) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if (!handler.guid) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if (!(events = elemData.events)) {
				events = elemData.events = {};
			}
			if (!(eventHandle = elemData.handle)) {
				eventHandle = elemData.handle = function (e) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = (types || "").match(rnotwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// There *must* be a type, no attaching namespace-only handlers
				if (!type) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[type] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = (selector ? special.delegateType : special.bindType) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[type] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test(selector),
					namespace: namespaces.join(".")
				}, handleObjIn);

				// Init the event handler queue if we're the first
				if (!(handlers = events[type])) {
					handlers = events[type] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {

						if (elem.addEventListener) {
							elem.addEventListener(type, eventHandle);
						}
					}
				}

				if (special.add) {
					special.add.call(elem, handleObj);

					if (!handleObj.handler.guid) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if (selector) {
					handlers.splice(handlers.delegateCount++, 0, handleObj);
				} else {
					handlers.push(handleObj);
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[type] = true;
			}
		},

		// Detach an event or set of events from an element
		remove: function remove(elem, types, handler, selector, mappedTypes) {

			var j,
			    origCount,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

			if (!elemData || !(events = elemData.events)) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = (types || "").match(rnotwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// Unbind all events (on this namespace, if provided) for the element
				if (!type) {
					for (type in events) {
						jQuery.event.remove(elem, type + types[t], handler, selector, true);
					}
					continue;
				}

				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				handlers = events[type] || [];
				tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

				// Remove matching events
				origCount = j = handlers.length;
				while (j--) {
					handleObj = handlers[j];

					if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
						handlers.splice(j, 1);

						if (handleObj.selector) {
							handlers.delegateCount--;
						}
						if (special.remove) {
							special.remove.call(elem, handleObj);
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if (origCount && !handlers.length) {
					if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {

						jQuery.removeEvent(elem, type, elemData.handle);
					}

					delete events[type];
				}
			}

			// Remove data and the expando if it's no longer used
			if (jQuery.isEmptyObject(events)) {
				dataPriv.remove(elem, "handle events");
			}
		},

		dispatch: function dispatch(event) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix(event);

			var i,
			    j,
			    ret,
			    matched,
			    handleObj,
			    handlerQueue = [],
			    args = _slice.call(arguments),
			    handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
			    special = jQuery.event.special[event.type] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if (special.preDispatch && special.preDispatch.call(this, event) === false) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call(this, event, handlers);

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
				event.currentTarget = matched.elem;

				j = 0;
				while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);

						if (ret !== undefined) {
							if ((event.result = ret) === false) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if (special.postDispatch) {
				special.postDispatch.call(this, event);
			}

			return event.result;
		},

		handlers: function handlers(event, _handlers) {
			var i,
			    matches,
			    sel,
			    handleObj,
			    handlerQueue = [],
			    delegateCount = _handlers.delegateCount,
			    cur = event.target;

			// Support (at least): Chrome, IE9
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			//
			// Support: Firefox<=42+
			// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
			if (delegateCount && cur.nodeType && (event.type !== "click" || isNaN(event.button) || event.button < 1)) {

				for (; cur !== this; cur = cur.parentNode || this) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
						matches = [];
						for (i = 0; i < delegateCount; i++) {
							handleObj = _handlers[i];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if (matches[sel] === undefined) {
								matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
							}
							if (matches[sel]) {
								matches.push(handleObj);
							}
						}
						if (matches.length) {
							handlerQueue.push({ elem: cur, handlers: matches });
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if (delegateCount < _handlers.length) {
				handlerQueue.push({ elem: this, handlers: _handlers.slice(delegateCount) });
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: ("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " + "metaKey relatedTarget shiftKey target timeStamp view which").split(" "),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function filter(event, original) {

				// Add which for key events
				if (event.which == null) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: ("button buttons clientX clientY offsetX offsetY pageX pageY " + "screenX screenY toElement").split(" "),
			filter: function filter(event, original) {
				var eventDoc,
				    doc,
				    body,
				    button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if (event.pageX == null && original.clientX != null) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
					event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if (!event.which && button !== undefined) {
					event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
				}

				return event;
			}
		},

		fix: function fix(event) {
			if (event[jQuery.expando]) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i,
			    prop,
			    copy,
			    type = event.type,
			    originalEvent = event,
			    fixHook = this.fixHooks[type];

			if (!fixHook) {
				this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
			}
			copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;

			event = new jQuery.Event(originalEvent);

			i = copy.length;
			while (i--) {
				prop = copy[i];
				event[prop] = originalEvent[prop];
			}

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if (!event.target) {
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if (event.target.nodeType === 3) {
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function trigger() {
					if (this !== safeActiveElement() && this.focus) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function trigger() {
					if (this === safeActiveElement() && this.blur) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function trigger() {
					if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function _default(event) {
					return jQuery.nodeName(event.target, "a");
				}
			},

			beforeunload: {
				postDispatch: function postDispatch(event) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if (event.result !== undefined && event.originalEvent) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function (elem, type, handle) {

		// This "if" is needed for plain objects
		if (elem.removeEventListener) {
			elem.removeEventListener(type, handle);
		}
	};

	jQuery.Event = function (src, props) {

		// Allow instantiation without the 'new' keyword
		if (!(this instanceof jQuery.Event)) {
			return new jQuery.Event(src, props);
		}

		// Event object
		if (src && src.type) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined &&

			// Support: Android<4.0
			src.returnValue === false ? returnTrue : returnFalse;

			// Event type
		} else {
				this.type = src;
			}

		// Put explicitly provided properties onto the event object
		if (props) {
			jQuery.extend(this, props);
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[jQuery.expando] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,

		preventDefault: function preventDefault() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if (e) {
				e.preventDefault();
			}
		},
		stopPropagation: function stopPropagation() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if (e) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function stopImmediatePropagation() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if (e) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://code.google.com/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function (orig, fix) {
		jQuery.event.special[orig] = {
			delegateType: fix,
			bindType: fix,

			handle: function handle(event) {
				var ret,
				    target = this,
				    related = event.relatedTarget,
				    handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if (!related || related !== target && !jQuery.contains(target, related)) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply(this, arguments);
					event.type = fix;
				}
				return ret;
			}
		};
	});

	jQuery.fn.extend({
		on: function on(types, selector, data, fn) {
			return _on(this, types, selector, data, fn);
		},
		one: function one(types, selector, data, fn) {
			return _on(this, types, selector, data, fn, 1);
		},
		off: function off(types, selector, fn) {
			var handleObj, type;
			if (types && types.preventDefault && types.handleObj) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
				return this;
			}
			if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

				// ( types-object [, selector] )
				for (type in types) {
					this.off(type, selector, types[type]);
				}
				return this;
			}
			if (selector === false || typeof selector === "function") {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if (fn === false) {
				fn = returnFalse;
			}
			return this.each(function () {
				jQuery.event.remove(this, types, fn, selector);
			});
		}
	});

	var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,


	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,


	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	    rscriptTypeMasked = /^true\/(.*)/,
	    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	// Manipulating tables requires a tbody
	function manipulationTarget(elem, content) {
		return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript(elem) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript(elem) {
		var match = rscriptTypeMasked.exec(elem.type);

		if (match) {
			elem.type = match[1];
		} else {
			elem.removeAttribute("type");
		}

		return elem;
	}

	function cloneCopyEvent(src, dest) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if (dest.nodeType !== 1) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if (dataPriv.hasData(src)) {
			pdataOld = dataPriv.access(src);
			pdataCur = dataPriv.set(dest, pdataOld);
			events = pdataOld.events;

			if (events) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for (type in events) {
					for (i = 0, l = events[type].length; i < l; i++) {
						jQuery.event.add(dest, type, events[type][i]);
					}
				}
			}
		}

		// 2. Copy user data
		if (dataUser.hasData(src)) {
			udataOld = dataUser.access(src);
			udataCur = jQuery.extend({}, udataOld);

			dataUser.set(dest, udataCur);
		}
	}

	// Fix IE bugs, see support tests
	function fixInput(src, dest) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if (nodeName === "input" && rcheckableType.test(src.type)) {
			dest.checked = src.checked;

			// Fails to return the selected option to the default selected state when cloning options
		} else if (nodeName === "input" || nodeName === "textarea") {
				dest.defaultValue = src.defaultValue;
			}
	}

	function domManip(collection, args, callback, ignored) {

		// Flatten any nested arrays
		args = concat.apply([], args);

		var fragment,
		    first,
		    scripts,
		    hasScripts,
		    node,
		    doc,
		    i = 0,
		    l = collection.length,
		    iNoClone = l - 1,
		    value = args[0],
		    isFunction = jQuery.isFunction(value);

		// We can't cloneNode fragments that contain checked, in WebKit
		if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
			return collection.each(function (index) {
				var self = collection.eq(index);
				if (isFunction) {
					args[0] = value.call(this, index, self.html());
				}
				domManip(self, args, callback, ignored);
			});
		}

		if (l) {
			fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
			first = fragment.firstChild;

			if (fragment.childNodes.length === 1) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if (first || ignored) {
				scripts = jQuery.map(getAll(fragment, "script"), disableScript);
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for (; i < l; i++) {
					node = fragment;

					if (i !== iNoClone) {
						node = jQuery.clone(node, true, true);

						// Keep references to cloned scripts for later restoration
						if (hasScripts) {

							// Support: Android<4.1, PhantomJS<2
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge(scripts, getAll(node, "script"));
						}
					}

					callback.call(collection[i], node, i);
				}

				if (hasScripts) {
					doc = scripts[scripts.length - 1].ownerDocument;

					// Reenable scripts
					jQuery.map(scripts, restoreScript);

					// Evaluate executable scripts on first document insertion
					for (i = 0; i < hasScripts; i++) {
						node = scripts[i];
						if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {

							if (node.src) {

								// Optional AJAX dependency, but won't run scripts if not present
								if (jQuery._evalUrl) {
									jQuery._evalUrl(node.src);
								}
							} else {
								jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function _remove(elem, selector, keepData) {
		var node,
		    nodes = selector ? jQuery.filter(selector, elem) : elem,
		    i = 0;

		for (; (node = nodes[i]) != null; i++) {
			if (!keepData && node.nodeType === 1) {
				jQuery.cleanData(getAll(node));
			}

			if (node.parentNode) {
				if (keepData && jQuery.contains(node.ownerDocument, node)) {
					setGlobalEval(getAll(node, "script"));
				}
				node.parentNode.removeChild(node);
			}
		}

		return elem;
	}

	jQuery.extend({
		htmlPrefilter: function htmlPrefilter(html) {
			return html.replace(rxhtmlTag, "<$1></$2>");
		},

		clone: function clone(elem, dataAndEvents, deepDataAndEvents) {
			var i,
			    l,
			    srcElements,
			    destElements,
			    clone = elem.cloneNode(true),
			    inPage = jQuery.contains(elem.ownerDocument, elem);

			// Fix IE cloning issues
			if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll(clone);
				srcElements = getAll(elem);

				for (i = 0, l = srcElements.length; i < l; i++) {
					fixInput(srcElements[i], destElements[i]);
				}
			}

			// Copy the events from the original to the clone
			if (dataAndEvents) {
				if (deepDataAndEvents) {
					srcElements = srcElements || getAll(elem);
					destElements = destElements || getAll(clone);

					for (i = 0, l = srcElements.length; i < l; i++) {
						cloneCopyEvent(srcElements[i], destElements[i]);
					}
				} else {
					cloneCopyEvent(elem, clone);
				}
			}

			// Preserve script evaluation history
			destElements = getAll(clone, "script");
			if (destElements.length > 0) {
				setGlobalEval(destElements, !inPage && getAll(elem, "script"));
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function cleanData(elems) {
			var data,
			    elem,
			    type,
			    special = jQuery.event.special,
			    i = 0;

			for (; (elem = elems[i]) !== undefined; i++) {
				if (acceptData(elem)) {
					if (data = elem[dataPriv.expando]) {
						if (data.events) {
							for (type in data.events) {
								if (special[type]) {
									jQuery.event.remove(elem, type);

									// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
										jQuery.removeEvent(elem, type, data.handle);
									}
							}
						}

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataPriv.expando] = undefined;
					}
					if (elem[dataUser.expando]) {

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataUser.expando] = undefined;
					}
				}
			}
		}
	});

	jQuery.fn.extend({

		// Keep domManip exposed until 3.0 (gh-2225)
		domManip: domManip,

		detach: function detach(selector) {
			return _remove(this, selector, true);
		},

		remove: function remove(selector) {
			return _remove(this, selector);
		},

		text: function text(value) {
			return access(this, function (value) {
				return value === undefined ? jQuery.text(this) : this.empty().each(function () {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						this.textContent = value;
					}
				});
			}, null, value, arguments.length);
		},

		append: function append() {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.appendChild(elem);
				}
			});
		},

		prepend: function prepend() {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.insertBefore(elem, target.firstChild);
				}
			});
		},

		before: function before() {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this);
				}
			});
		},

		after: function after() {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this.nextSibling);
				}
			});
		},

		empty: function empty() {
			var elem,
			    i = 0;

			for (; (elem = this[i]) != null; i++) {
				if (elem.nodeType === 1) {

					// Prevent memory leaks
					jQuery.cleanData(getAll(elem, false));

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function clone(dataAndEvents, deepDataAndEvents) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map(function () {
				return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
			});
		},

		html: function html(value) {
			return access(this, function (value) {
				var elem = this[0] || {},
				    i = 0,
				    l = this.length;

				if (value === undefined && elem.nodeType === 1) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

					value = jQuery.htmlPrefilter(value);

					try {
						for (; i < l; i++) {
							elem = this[i] || {};

							// Remove element nodes and prevent memory leaks
							if (elem.nodeType === 1) {
								jQuery.cleanData(getAll(elem, false));
								elem.innerHTML = value;
							}
						}

						elem = 0;

						// If using innerHTML throws an exception, use the fallback method
					} catch (e) {}
				}

				if (elem) {
					this.empty().append(value);
				}
			}, null, value, arguments.length);
		},

		replaceWith: function replaceWith() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip(this, arguments, function (elem) {
				var parent = this.parentNode;

				if (jQuery.inArray(this, ignored) < 0) {
					jQuery.cleanData(getAll(this));
					if (parent) {
						parent.replaceChild(elem, this);
					}
				}

				// Force callback invocation
			}, ignored);
		}
	});

	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function (name, original) {
		jQuery.fn[name] = function (selector) {
			var elems,
			    ret = [],
			    insert = jQuery(selector),
			    last = insert.length - 1,
			    i = 0;

			for (; i <= last; i++) {
				elems = i === last ? this : this.clone(true);
				jQuery(insert[i])[original](elems);

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply(ret, elems.get());
			}

			return this.pushStack(ret);
		};
	});

	var iframe,
	    elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

	/**
  * Retrieve the actual display of a element
  * @param {String} name nodeName of the element
  * @param {Object} doc Document object
  */

	// Called only from within defaultDisplay
	function actualDisplay(name, doc) {
		var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
		    display = jQuery.css(elem[0], "display");

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
  * Try to determine the default display value of an element
  * @param {String} nodeName
  */
	function defaultDisplay(nodeName) {
		var doc = document,
		    display = elemdisplay[nodeName];

		if (!display) {
			display = actualDisplay(nodeName, doc);

			// If the simple way fails, read from inside an iframe
			if (display === "none" || !display) {

				// Use the already-created iframe if possible
				iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[0].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay(nodeName, doc);
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[nodeName] = display;
		}

		return display;
	}
	var rmargin = /^margin/;

	var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

	var getStyles = function getStyles(elem) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if (!view || !view.opener) {
			view = window;
		}

		return view.getComputedStyle(elem);
	};

	var swap = function swap(elem, options, callback, args) {
		var ret,
		    name,
		    old = {};

		// Remember the old values, and insert the new ones
		for (name in options) {
			old[name] = elem.style[name];
			elem.style[name] = options[name];
		}

		ret = callback.apply(elem, args || []);

		// Revert the old values
		for (name in options) {
			elem.style[name] = old[name];
		}

		return ret;
	};

	var documentElement = document.documentElement;

	(function () {
		var pixelPositionVal,
		    boxSizingReliableVal,
		    pixelMarginRightVal,
		    reliableMarginLeftVal,
		    container = document.createElement("div"),
		    div = document.createElement("div");

		// Finish early in limited (non-browser) environments
		if (!div.style) {
			return;
		}

		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode(true).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
		container.appendChild(div);

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
			div.style.cssText =

			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild(container);

			var divStyle = window.getComputedStyle(div);
			pixelPositionVal = divStyle.top !== "1%";
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild(container);
		}

		jQuery.extend(support, {
			pixelPosition: function pixelPosition() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function boxSizingReliable() {
				if (boxSizingReliableVal == null) {
					computeStyleTests();
				}
				return boxSizingReliableVal;
			},
			pixelMarginRight: function pixelMarginRight() {

				// Support: Android 4.0-4.3
				// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
				// since that compresses better and they're computed together anyway.
				if (boxSizingReliableVal == null) {
					computeStyleTests();
				}
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function reliableMarginLeft() {

				// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
				if (boxSizingReliableVal == null) {
					computeStyleTests();
				}
				return reliableMarginLeftVal;
			},
			reliableMarginRight: function reliableMarginRight() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
				    marginDiv = div.appendChild(document.createElement("div"));

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;box-sizing:content-box;" + "display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				documentElement.appendChild(container);

				ret = !parseFloat(window.getComputedStyle(marginDiv).marginRight);

				documentElement.removeChild(container);
				div.removeChild(marginDiv);

				return ret;
			}
		});
	})();

	function curCSS(elem, name, computed) {
		var width,
		    minWidth,
		    maxWidth,
		    ret,
		    style = elem.style;

		computed = computed || getStyles(elem);
		ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ((ret === "" || ret === undefined) && !jQuery.contains(elem.ownerDocument, elem)) {
			ret = jQuery.style(elem, name);
		}

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if (computed) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

		// Support: IE9-11+
		// IE returns zIndex value as an integer.
		ret + "" : ret;
	}

	function addGetHookIf(conditionFn, hookFn) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function get() {
				if (conditionFn()) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return (this.get = hookFn).apply(this, arguments);
			}
		};
	}

	var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	    cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	    cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},
	    cssPrefixes = ["Webkit", "O", "Moz", "ms"],
	    emptyStyle = document.createElement("div").style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName(name) {

		// Shortcut for names that are not vendor prefixed
		if (name in emptyStyle) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
		    i = cssPrefixes.length;

		while (i--) {
			name = cssPrefixes[i] + capName;
			if (name in emptyStyle) {
				return name;
			}
		}
	}

	function setPositiveNumber(elem, value, subtract) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec(value);
		return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
	}

	function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
		var i = extra === (isBorderBox ? "border" : "content") ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,
		    val = 0;

		for (; i < 4; i += 2) {

			// Both box models exclude margin, so add it if we want it
			if (extra === "margin") {
				val += jQuery.css(elem, extra + cssExpand[i], true, styles);
			}

			if (isBorderBox) {

				// border-box includes padding, so remove it if we want content
				if (extra === "content") {
					val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
				}

				// At this point, extra isn't border nor margin, so remove border
				if (extra !== "margin") {
					val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

				// At this point, extra isn't content nor padding, so add border
				if (extra !== "padding") {
					val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			}
		}

		return val;
	}

	function getWidthOrHeight(elem, name, extra) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
		    val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		    styles = getStyles(elem),
		    isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

		// Support: IE11 only
		// In IE 11 fullscreen elements inside of an iframe have
		// 100x too small dimensions (gh-1764).
		if (document.msFullscreenElement && window.top !== window) {

			// Support: IE11 only
			// Running getBoundingClientRect on a disconnected node
			// in IE throws an error.
			if (elem.getClientRects().length) {
				val = Math.round(elem.getBoundingClientRect()[name] * 100);
			}
		}

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if (val <= 0 || val == null) {

			// Fall back to computed then uncomputed css if necessary
			val = curCSS(elem, name, styles);
			if (val < 0 || val == null) {
				val = elem.style[name];
			}

			// Computed unit is not pixels. Stop here and return.
			if (rnumnonpx.test(val)) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);

			// Normalize "", auto, and prepare for extra
			val = parseFloat(val) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
	}

	function showHide(elements, show) {
		var display,
		    elem,
		    hidden,
		    values = [],
		    index = 0,
		    length = elements.length;

		for (; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue;
			}

			values[index] = dataPriv.get(elem, "olddisplay");
			display = elem.style.display;
			if (show) {

				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if (!values[index] && display === "none") {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if (elem.style.display === "" && isHidden(elem)) {
					values[index] = dataPriv.access(elem, "olddisplay", defaultDisplay(elem.nodeName));
				}
			} else {
				hidden = isHidden(elem);

				if (display !== "none" || !hidden) {
					dataPriv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for (index = 0; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue;
			}
			if (!show || elem.style.display === "none" || elem.style.display === "") {
				elem.style.display = show ? values[index] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.extend({

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function get(elem, computed) {
					if (computed) {

						// We should always get a number back from opacity
						var ret = curCSS(elem, "opacity");
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function style(elem, name, value, extra) {

			// Don't set styles on text and comment nodes
			if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
				return;
			}

			// Make sure that we're working with the right name
			var ret,
			    type,
			    hooks,
			    origName = jQuery.camelCase(name),
			    style = elem.style;

			name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// Check if we're setting a value
			if (value !== undefined) {
				type = typeof value === "undefined" ? "undefined" : _typeof(value);

				// Convert "+=" or "-=" to relative numbers (#7345)
				if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
					value = adjustCSS(elem, name, ret);

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if (value == null || value !== value) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if (type === "number") {
					value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
				}

				// Support: IE9-11+
				// background-* props affect original clone's values
				if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
					style[name] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

					style[name] = value;
				}
			} else {

				// If a hook was provided get the non-computed value from there
				if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[name];
			}
		},

		css: function css(elem, name, extra, styles) {
			var val,
			    num,
			    hooks,
			    origName = jQuery.camelCase(name);

			// Make sure that we're working with the right name
			name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// If a hook was provided get the computed value from there
			if (hooks && "get" in hooks) {
				val = hooks.get(elem, true, extra);
			}

			// Otherwise, if a way to get the computed value exists, use that
			if (val === undefined) {
				val = curCSS(elem, name, styles);
			}

			// Convert "normal" to computed value
			if (val === "normal" && name in cssNormalTransform) {
				val = cssNormalTransform[name];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if (extra === "" || extra) {
				num = parseFloat(val);
				return extra === true || isFinite(num) ? num || 0 : val;
			}
			return val;
		}
	});

	jQuery.each(["height", "width"], function (i, name) {
		jQuery.cssHooks[name] = {
			get: function get(elem, computed, extra) {
				if (computed) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? swap(elem, cssShow, function () {
						return getWidthOrHeight(elem, name, extra);
					}) : getWidthOrHeight(elem, name, extra);
				}
			},

			set: function set(elem, value, extra) {
				var matches,
				    styles = extra && getStyles(elem),
				    subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);

				// Convert to pixels if value adjustment is needed
				if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {

					elem.style[name] = value;
					value = jQuery.css(elem, name);
				}

				return setPositiveNumber(elem, value, subtract);
			}
		};
	});

	jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
		if (computed) {
			return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function () {
				return elem.getBoundingClientRect().left;
			})) + "px";
		}
	});

	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function (elem, computed) {
		if (computed) {
			return swap(elem, { "display": "inline-block" }, curCSS, [elem, "marginRight"]);
		}
	});

	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function (prefix, suffix) {
		jQuery.cssHooks[prefix + suffix] = {
			expand: function expand(value) {
				var i = 0,
				    expanded = {},


				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [value];

				for (; i < 4; i++) {
					expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
				}

				return expanded;
			}
		};

		if (!rmargin.test(prefix)) {
			jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
		}
	});

	jQuery.fn.extend({
		css: function css(name, value) {
			return access(this, function (elem, name, value) {
				var styles,
				    len,
				    map = {},
				    i = 0;

				if (jQuery.isArray(name)) {
					styles = getStyles(elem);
					len = name.length;

					for (; i < len; i++) {
						map[name[i]] = jQuery.css(elem, name[i], false, styles);
					}

					return map;
				}

				return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
			}, name, value, arguments.length > 1);
		},
		show: function show() {
			return showHide(this, true);
		},
		hide: function hide() {
			return showHide(this);
		},
		toggle: function toggle(state) {
			if (typeof state === "boolean") {
				return state ? this.show() : this.hide();
			}

			return this.each(function () {
				if (isHidden(this)) {
					jQuery(this).show();
				} else {
					jQuery(this).hide();
				}
			});
		}
	});

	function Tween(elem, options, prop, end, easing) {
		return new Tween.prototype.init(elem, options, prop, end, easing);
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function init(elem, options, prop, end, easing, unit) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
		},
		cur: function cur() {
			var hooks = Tween.propHooks[this.prop];

			return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
		},
		run: function run(percent) {
			var eased,
			    hooks = Tween.propHooks[this.prop];

			if (this.options.duration) {
				this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
			} else {
				this.pos = eased = percent;
			}
			this.now = (this.end - this.start) * eased + this.start;

			if (this.options.step) {
				this.options.step.call(this.elem, this.now, this);
			}

			if (hooks && hooks.set) {
				hooks.set(this);
			} else {
				Tween.propHooks._default.set(this);
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function get(tween) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
					return tween.elem[tween.prop];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css(tween.elem, tween.prop, "");

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function set(tween) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if (jQuery.fx.step[tween.prop]) {
					jQuery.fx.step[tween.prop](tween);
				} else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
					jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
				} else {
					tween.elem[tween.prop] = tween.now;
				}
			}
		}
	};

	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function set(tween) {
			if (tween.elem.nodeType && tween.elem.parentNode) {
				tween.elem[tween.prop] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function linear(p) {
			return p;
		},
		swing: function swing(p) {
			return 0.5 - Math.cos(p * Math.PI) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};

	var fxNow,
	    timerId,
	    rfxtypes = /^(?:toggle|show|hide)$/,
	    rrun = /queueHooks$/;

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout(function () {
			fxNow = undefined;
		});
		return fxNow = jQuery.now();
	}

	// Generate parameters to create a standard animation
	function genFx(type, includeWidth) {
		var which,
		    i = 0,
		    attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for (; i < 4; i += 2 - includeWidth) {
			which = cssExpand[i];
			attrs["margin" + which] = attrs["padding" + which] = type;
		}

		if (includeWidth) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween(value, prop, animation) {
		var tween,
		    collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
		    index = 0,
		    length = collection.length;
		for (; index < length; index++) {
			if (tween = collection[index].call(animation, prop, value)) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter(elem, props, opts) {
		/* jshint validthis: true */
		var prop,
		    value,
		    toggle,
		    tween,
		    hooks,
		    oldfire,
		    display,
		    checkDisplay,
		    anim = this,
		    orig = {},
		    style = elem.style,
		    hidden = elem.nodeType && isHidden(elem),
		    dataShow = dataPriv.get(elem, "fxshow");

		// Handle queue: false promises
		if (!opts.queue) {
			hooks = jQuery._queueHooks(elem, "fx");
			if (hooks.unqueued == null) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function () {
					if (!hooks.unqueued) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always(function () {

				// Ensure the complete handler is called before this completes
				anim.always(function () {
					hooks.unqueued--;
					if (!jQuery.queue(elem, "fx").length) {
						hooks.empty.fire();
					}
				});
			});
		}

		// Height/width overflow pass
		if (elem.nodeType === 1 && ("height" in props || "width" in props)) {

			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [style.overflow, style.overflowX, style.overflowY];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css(elem, "display");

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ? dataPriv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;

			if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
				style.display = "inline-block";
			}
		}

		if (opts.overflow) {
			style.overflow = "hidden";
			anim.always(function () {
				style.overflow = opts.overflow[0];
				style.overflowX = opts.overflow[1];
				style.overflowY = opts.overflow[2];
			});
		}

		// show/hide pass
		for (prop in props) {
			value = props[prop];
			if (rfxtypes.exec(value)) {
				delete props[prop];
				toggle = toggle || value === "toggle";
				if (value === (hidden ? "hide" : "show")) {

					// If there is dataShow left over from a stopped hide or show
					// and we are going to proceed with show, we should pretend to be hidden
					if (value === "show" && dataShow && dataShow[prop] !== undefined) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);

				// Any non-fx value stops us from restoring the original display value
			} else {
					display = undefined;
				}
		}

		if (!jQuery.isEmptyObject(orig)) {
			if (dataShow) {
				if ("hidden" in dataShow) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access(elem, "fxshow", {});
			}

			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if (toggle) {
				dataShow.hidden = !hidden;
			}
			if (hidden) {
				jQuery(elem).show();
			} else {
				anim.done(function () {
					jQuery(elem).hide();
				});
			}
			anim.done(function () {
				var prop;

				dataPriv.remove(elem, "fxshow");
				for (prop in orig) {
					jQuery.style(elem, prop, orig[prop]);
				}
			});
			for (prop in orig) {
				tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);

				if (!(prop in dataShow)) {
					dataShow[prop] = tween.start;
					if (hidden) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

			// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
				style.display = display;
			}
	}

	function propFilter(props, specialEasing) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for (index in props) {
			name = jQuery.camelCase(index);
			easing = specialEasing[name];
			value = props[index];
			if (jQuery.isArray(value)) {
				easing = value[1];
				value = props[index] = value[0];
			}

			if (index !== name) {
				props[name] = value;
				delete props[index];
			}

			hooks = jQuery.cssHooks[name];
			if (hooks && "expand" in hooks) {
				value = hooks.expand(value);
				delete props[name];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for (index in value) {
					if (!(index in props)) {
						props[index] = value[index];
						specialEasing[index] = easing;
					}
				}
			} else {
				specialEasing[name] = easing;
			}
		}
	}

	function Animation(elem, properties, options) {
		var result,
		    stopped,
		    index = 0,
		    length = Animation.prefilters.length,
		    deferred = jQuery.Deferred().always(function () {

			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		    tick = function tick() {
			if (stopped) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
			    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),


			// Support: Android 2.3
			// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
			temp = remaining / animation.duration || 0,
			    percent = 1 - temp,
			    index = 0,
			    length = animation.tweens.length;

			for (; index < length; index++) {
				animation.tweens[index].run(percent);
			}

			deferred.notifyWith(elem, [animation, percent, remaining]);

			if (percent < 1 && length) {
				return remaining;
			} else {
				deferred.resolveWith(elem, [animation]);
				return false;
			}
		},
		    animation = deferred.promise({
			elem: elem,
			props: jQuery.extend({}, properties),
			opts: jQuery.extend(true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function createTween(prop, end) {
				var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
				animation.tweens.push(tween);
				return tween;
			},
			stop: function stop(gotoEnd) {
				var index = 0,


				// If we are going to the end, we want to run all the tweens
				// otherwise we skip this part
				length = gotoEnd ? animation.tweens.length : 0;
				if (stopped) {
					return this;
				}
				stopped = true;
				for (; index < length; index++) {
					animation.tweens[index].run(1);
				}

				// Resolve when we played the last frame; otherwise, reject
				if (gotoEnd) {
					deferred.notifyWith(elem, [animation, 1, 0]);
					deferred.resolveWith(elem, [animation, gotoEnd]);
				} else {
					deferred.rejectWith(elem, [animation, gotoEnd]);
				}
				return this;
			}
		}),
		    props = animation.props;

		propFilter(props, animation.opts.specialEasing);

		for (; index < length; index++) {
			result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
			if (result) {
				if (jQuery.isFunction(result.stop)) {
					jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
				}
				return result;
			}
		}

		jQuery.map(props, createTween, animation);

		if (jQuery.isFunction(animation.opts.start)) {
			animation.opts.start.call(elem, animation);
		}

		jQuery.fx.timer(jQuery.extend(tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		}));

		// attach callbacks from options
		return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
	}

	jQuery.Animation = jQuery.extend(Animation, {
		tweeners: {
			"*": [function (prop, value) {
				var tween = this.createTween(prop, value);
				adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
				return tween;
			}]
		},

		tweener: function tweener(props, callback) {
			if (jQuery.isFunction(props)) {
				callback = props;
				props = ["*"];
			} else {
				props = props.match(rnotwhite);
			}

			var prop,
			    index = 0,
			    length = props.length;

			for (; index < length; index++) {
				prop = props[index];
				Animation.tweeners[prop] = Animation.tweeners[prop] || [];
				Animation.tweeners[prop].unshift(callback);
			}
		},

		prefilters: [defaultPrefilter],

		prefilter: function prefilter(callback, prepend) {
			if (prepend) {
				Animation.prefilters.unshift(callback);
			} else {
				Animation.prefilters.push(callback);
			}
		}
	});

	jQuery.speed = function (speed, easing, fn) {
		var opt = speed && (typeof speed === "undefined" ? "undefined" : _typeof(speed)) === "object" ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;

		// Normalize opt.queue - true/undefined/null -> "fx"
		if (opt.queue == null || opt.queue === true) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function () {
			if (jQuery.isFunction(opt.old)) {
				opt.old.call(this);
			}

			if (opt.queue) {
				jQuery.dequeue(this, opt.queue);
			}
		};

		return opt;
	};

	jQuery.fn.extend({
		fadeTo: function fadeTo(speed, to, easing, callback) {

			// Show any hidden elements after setting opacity to 0
			return this.filter(isHidden).css("opacity", 0).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback);
		},
		animate: function animate(prop, speed, easing, callback) {
			var empty = jQuery.isEmptyObject(prop),
			    optall = jQuery.speed(speed, easing, callback),
			    doAnimation = function doAnimation() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation(this, jQuery.extend({}, prop), optall);

				// Empty animations, or finishing resolves immediately
				if (empty || dataPriv.get(this, "finish")) {
					anim.stop(true);
				}
			};
			doAnimation.finish = doAnimation;

			return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
		},
		stop: function stop(type, clearQueue, gotoEnd) {
			var stopQueue = function stopQueue(hooks) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop(gotoEnd);
			};

			if (typeof type !== "string") {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if (clearQueue && type !== false) {
				this.queue(type || "fx", []);
			}

			return this.each(function () {
				var dequeue = true,
				    index = type != null && type + "queueHooks",
				    timers = jQuery.timers,
				    data = dataPriv.get(this);

				if (index) {
					if (data[index] && data[index].stop) {
						stopQueue(data[index]);
					}
				} else {
					for (index in data) {
						if (data[index] && data[index].stop && rrun.test(index)) {
							stopQueue(data[index]);
						}
					}
				}

				for (index = timers.length; index--;) {
					if (timers[index].elem === this && (type == null || timers[index].queue === type)) {

						timers[index].anim.stop(gotoEnd);
						dequeue = false;
						timers.splice(index, 1);
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if (dequeue || !gotoEnd) {
					jQuery.dequeue(this, type);
				}
			});
		},
		finish: function finish(type) {
			if (type !== false) {
				type = type || "fx";
			}
			return this.each(function () {
				var index,
				    data = dataPriv.get(this),
				    queue = data[type + "queue"],
				    hooks = data[type + "queueHooks"],
				    timers = jQuery.timers,
				    length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue(this, type, []);

				if (hooks && hooks.stop) {
					hooks.stop.call(this, true);
				}

				// Look for any active animations, and finish them
				for (index = timers.length; index--;) {
					if (timers[index].elem === this && timers[index].queue === type) {
						timers[index].anim.stop(true);
						timers.splice(index, 1);
					}
				}

				// Look for any animations in the old queue and finish them
				for (index = 0; index < length; index++) {
					if (queue[index] && queue[index].finish) {
						queue[index].finish.call(this);
					}
				}

				// Turn off finishing flag
				delete data.finish;
			});
		}
	});

	jQuery.each(["toggle", "show", "hide"], function (i, name) {
		var cssFn = jQuery.fn[name];
		jQuery.fn[name] = function (speed, easing, callback) {
			return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
		};
	});

	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function (name, props) {
		jQuery.fn[name] = function (speed, easing, callback) {
			return this.animate(props, speed, easing, callback);
		};
	});

	jQuery.timers = [];
	jQuery.fx.tick = function () {
		var timer,
		    i = 0,
		    timers = jQuery.timers;

		fxNow = jQuery.now();

		for (; i < timers.length; i++) {
			timer = timers[i];

			// Checks the timer has not already been removed
			if (!timer() && timers[i] === timer) {
				timers.splice(i--, 1);
			}
		}

		if (!timers.length) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function (timer) {
		jQuery.timers.push(timer);
		if (timer()) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function () {
		if (!timerId) {
			timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
		}
	};

	jQuery.fx.stop = function () {
		window.clearInterval(timerId);

		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};

	// Based off of the plugin by Clint Helfers, with permission.
	// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function (time, type) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";

		return this.queue(type, function (next, hooks) {
			var timeout = window.setTimeout(next, time);
			hooks.stop = function () {
				window.clearTimeout(timeout);
			};
		});
	};

	(function () {
		var input = document.createElement("input"),
		    select = document.createElement("select"),
		    opt = select.appendChild(document.createElement("option"));

		input.type = "checkbox";

		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement("input");
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();

	var boolHook,
	    attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend({
		attr: function attr(name, value) {
			return access(this, jQuery.attr, name, value, arguments.length > 1);
		},

		removeAttr: function removeAttr(name) {
			return this.each(function () {
				jQuery.removeAttr(this, name);
			});
		}
	});

	jQuery.extend({
		attr: function attr(elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if (typeof elem.getAttribute === "undefined") {
				return jQuery.prop(elem, name, value);
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
			}

			if (value !== undefined) {
				if (value === null) {
					jQuery.removeAttr(elem, name);
					return;
				}

				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				elem.setAttribute(name, value + "");
				return value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			ret = jQuery.find.attr(elem, name);

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function set(elem, value) {
					if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
						var val = elem.value;
						elem.setAttribute("type", value);
						if (val) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function removeAttr(elem, value) {
			var name,
			    propName,
			    i = 0,
			    attrNames = value && value.match(rnotwhite);

			if (attrNames && elem.nodeType === 1) {
				while (name = attrNames[i++]) {
					propName = jQuery.propFix[name] || name;

					// Boolean attributes get special treatment (#10870)
					if (jQuery.expr.match.bool.test(name)) {

						// Set corresponding property to false
						elem[propName] = false;
					}

					elem.removeAttribute(name);
				}
			}
		}
	});

	// Hooks for boolean attributes
	boolHook = {
		set: function set(elem, value, name) {
			if (value === false) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr(elem, name);
			} else {
				elem.setAttribute(name, name);
			}
			return name;
		}
	};
	jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
		var getter = attrHandle[name] || jQuery.find.attr;

		attrHandle[name] = function (elem, name, isXML) {
			var ret, handle;
			if (!isXML) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[name];
				attrHandle[name] = ret;
				ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
				attrHandle[name] = handle;
			}
			return ret;
		};
	});

	var rfocusable = /^(?:input|select|textarea|button)$/i,
	    rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend({
		prop: function prop(name, value) {
			return access(this, jQuery.prop, name, value, arguments.length > 1);
		},

		removeProp: function removeProp(name) {
			return this.each(function () {
				delete this[jQuery.propFix[name] || name];
			});
		}
	});

	jQuery.extend({
		prop: function prop(elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {

				// Fix name and attach hooks
				name = jQuery.propFix[name] || name;
				hooks = jQuery.propHooks[name];
			}

			if (value !== undefined) {
				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				return elem[name] = value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			return elem[name];
		},

		propHooks: {
			tabIndex: {
				get: function get(elem) {

					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr(elem, "tabindex");

					return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	});

	if (!support.optSelected) {
		jQuery.propHooks.selected = {
			get: function get(elem) {
				var parent = elem.parentNode;
				if (parent && parent.parentNode) {
					parent.parentNode.selectedIndex;
				}
				return null;
			}
		};
	}

	jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
		jQuery.propFix[this.toLowerCase()] = this;
	});

	var rclass = /[\t\r\n\f]/g;

	function getClass(elem) {
		return elem.getAttribute && elem.getAttribute("class") || "";
	}

	jQuery.fn.extend({
		addClass: function addClass(value) {
			var classes,
			    elem,
			    cur,
			    curValue,
			    clazz,
			    j,
			    finalValue,
			    i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).addClass(value.call(this, j, getClass(this)));
				});
			}

			if (typeof value === "string" && value) {
				classes = value.match(rnotwhite) || [];

				while (elem = this[i++]) {
					curValue = getClass(elem);
					cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");

					if (cur) {
						j = 0;
						while (clazz = classes[j++]) {
							if (cur.indexOf(" " + clazz + " ") < 0) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		removeClass: function removeClass(value) {
			var classes,
			    elem,
			    cur,
			    curValue,
			    clazz,
			    j,
			    finalValue,
			    i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).removeClass(value.call(this, j, getClass(this)));
				});
			}

			if (!arguments.length) {
				return this.attr("class", "");
			}

			if (typeof value === "string" && value) {
				classes = value.match(rnotwhite) || [];

				while (elem = this[i++]) {
					curValue = getClass(elem);

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");

					if (cur) {
						j = 0;
						while (clazz = classes[j++]) {

							// Remove *all* instances
							while (cur.indexOf(" " + clazz + " ") > -1) {
								cur = cur.replace(" " + clazz + " ", " ");
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		toggleClass: function toggleClass(value, stateVal) {
			var type = typeof value === "undefined" ? "undefined" : _typeof(value);

			if (typeof stateVal === "boolean" && type === "string") {
				return stateVal ? this.addClass(value) : this.removeClass(value);
			}

			if (jQuery.isFunction(value)) {
				return this.each(function (i) {
					jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
				});
			}

			return this.each(function () {
				var className, i, self, classNames;

				if (type === "string") {

					// Toggle individual class names
					i = 0;
					self = jQuery(this);
					classNames = value.match(rnotwhite) || [];

					while (className = classNames[i++]) {

						// Check each className given, space separated list
						if (self.hasClass(className)) {
							self.removeClass(className);
						} else {
							self.addClass(className);
						}
					}

					// Toggle whole class name
				} else if (value === undefined || type === "boolean") {
						className = getClass(this);
						if (className) {

							// Store className if set
							dataPriv.set(this, "__className__", className);
						}

						// If the element has a class name or if we're passed `false`,
						// then remove the whole classname (if there was one, the above saved it).
						// Otherwise bring back whatever was previously saved (if anything),
						// falling back to the empty string if nothing was stored.
						if (this.setAttribute) {
							this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
						}
					}
			});
		},

		hasClass: function hasClass(selector) {
			var className,
			    elem,
			    i = 0;

			className = " " + selector + " ";
			while (elem = this[i++]) {
				if (elem.nodeType === 1 && (" " + getClass(elem) + " ").replace(rclass, " ").indexOf(className) > -1) {
					return true;
				}
			}

			return false;
		}
	});

	var rreturn = /\r/g;

	jQuery.fn.extend({
		val: function val(value) {
			var hooks,
			    ret,
			    isFunction,
			    elem = this[0];

			if (!arguments.length) {
				if (elem) {
					hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

					if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace(rreturn, "") :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction(value);

			return this.each(function (i) {
				var val;

				if (this.nodeType !== 1) {
					return;
				}

				if (isFunction) {
					val = value.call(this, i, jQuery(this).val());
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if (val == null) {
					val = "";
				} else if (typeof val === "number") {
					val += "";
				} else if (jQuery.isArray(val)) {
					val = jQuery.map(val, function (value) {
						return value == null ? "" : value + "";
					});
				}

				hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

				// If set returns undefined, fall back to normal setting
				if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
					this.value = val;
				}
			});
		}
	});

	jQuery.extend({
		valHooks: {
			option: {
				get: function get(elem) {

					// Support: IE<11
					// option.value not trimmed (#14858)
					return jQuery.trim(elem.value);
				}
			},
			select: {
				get: function get(elem) {
					var value,
					    option,
					    options = elem.options,
					    index = elem.selectedIndex,
					    one = elem.type === "select-one" || index < 0,
					    values = one ? null : [],
					    max = one ? index + 1 : options.length,
					    i = index < 0 ? max : one ? index : 0;

					// Loop through all the selected options
					for (; i < max; i++) {
						option = options[i];

						// IE8-9 doesn't update selected after form reset (#2551)
						if ((option.selected || i === index) && (

						// Don't return options that are disabled or in a disabled optgroup
						support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {

							// Get the specific value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if (one) {
								return value;
							}

							// Multi-Selects return an array
							values.push(value);
						}
					}

					return values;
				},

				set: function set(elem, value) {
					var optionSet,
					    option,
					    options = elem.options,
					    values = jQuery.makeArray(value),
					    i = options.length;

					while (i--) {
						option = options[i];
						if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
							optionSet = true;
						}
					}

					// Force browsers to behave consistently when non-matching value is set
					if (!optionSet) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});

	// Radios and checkboxes getter/setter
	jQuery.each(["radio", "checkbox"], function () {
		jQuery.valHooks[this] = {
			set: function set(elem, value) {
				if (jQuery.isArray(value)) {
					return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
				}
			}
		};
		if (!support.checkOn) {
			jQuery.valHooks[this].get = function (elem) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});

	// Return jQuery for attributes-only inclusion

	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend(jQuery.event, {

		trigger: function trigger(event, data, elem, onlyHandlers) {

			var i,
			    cur,
			    tmp,
			    bubbleType,
			    ontype,
			    handle,
			    special,
			    eventPath = [elem || document],
			    type = hasOwn.call(event, "type") ? event.type : event,
			    namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if (elem.nodeType === 3 || elem.nodeType === 8) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if (rfocusMorph.test(type + jQuery.event.triggered)) {
				return;
			}

			if (type.indexOf(".") > -1) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[jQuery.expando] ? event : new jQuery.Event(type, (typeof event === "undefined" ? "undefined" : _typeof(event)) === "object" && event);

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if (!event.target) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ? [event] : jQuery.makeArray(data, [event]);

			// Allow special events to draw outside the lines
			special = jQuery.event.special[type] || {};
			if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

				bubbleType = special.delegateType || type;
				if (!rfocusMorph.test(bubbleType + type)) {
					cur = cur.parentNode;
				}
				for (; cur; cur = cur.parentNode) {
					eventPath.push(cur);
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if (tmp === (elem.ownerDocument || document)) {
					eventPath.push(tmp.defaultView || tmp.parentWindow || window);
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

				event.type = i > 1 ? bubbleType : special.bindType || type;

				// jQuery handler
				handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
				if (handle) {
					handle.apply(cur, data);
				}

				// Native handler
				handle = ontype && cur[ontype];
				if (handle && handle.apply && acceptData(cur)) {
					event.result = handle.apply(cur, data);
					if (event.result === false) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if (!onlyHandlers && !event.isDefaultPrevented()) {

				if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {

					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ontype];

						if (tmp) {
							elem[ontype] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[type]();
						jQuery.event.triggered = undefined;

						if (tmp) {
							elem[ontype] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		simulate: function simulate(type, elem, event) {
			var e = jQuery.extend(new jQuery.Event(), event, {
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// But now, this "simulate" function is used only for events
				// for which stopPropagation() is noop, so there is no need for that anymore.
				//
				// For the 1.x branch though, guard for "click" and "submit"
				// events is still used, but was moved to jQuery.event.stopPropagation function
				// because `originalEvent` should point to the original event for the constancy
				// with other events and for more focused logic
			});

			jQuery.event.trigger(e, null, elem);

			if (e.isDefaultPrevented()) {
				event.preventDefault();
			}
		}

	});

	jQuery.fn.extend({

		trigger: function trigger(type, data) {
			return this.each(function () {
				jQuery.event.trigger(type, data, this);
			});
		},
		triggerHandler: function triggerHandler(type, data) {
			var elem = this[0];
			if (elem) {
				return jQuery.event.trigger(type, data, elem, true);
			}
		}
	});

	jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function (i, name) {

		// Handle event binding
		jQuery.fn[name] = function (data, fn) {
			return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
		};
	});

	jQuery.fn.extend({
		hover: function hover(fnOver, fnOut) {
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
		}
	});

	support.focusin = "onfocusin" in window;

	// Support: Firefox
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome, Safari
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
	if (!support.focusin) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function handler(event) {
				jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
			};

			jQuery.event.special[fix] = {
				setup: function setup() {
					var doc = this.ownerDocument || this,
					    attaches = dataPriv.access(doc, fix);

					if (!attaches) {
						doc.addEventListener(orig, handler, true);
					}
					dataPriv.access(doc, fix, (attaches || 0) + 1);
				},
				teardown: function teardown() {
					var doc = this.ownerDocument || this,
					    attaches = dataPriv.access(doc, fix) - 1;

					if (!attaches) {
						doc.removeEventListener(orig, handler, true);
						dataPriv.remove(doc, fix);
					} else {
						dataPriv.access(doc, fix, attaches);
					}
				}
			};
		});
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = /\?/;

	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function (data) {
		return JSON.parse(data + "");
	};

	// Cross-browser xml parsing
	jQuery.parseXML = function (data) {
		var xml;
		if (!data || typeof data !== "string") {
			return null;
		}

		// Support: IE9
		try {
			xml = new window.DOMParser().parseFromString(data, "text/xml");
		} catch (e) {
			xml = undefined;
		}

		if (!xml || xml.getElementsByTagName("parsererror").length) {
			jQuery.error("Invalid XML: " + data);
		}
		return xml;
	};

	var rhash = /#.*$/,
	    rts = /([?&])_=[^&]*/,
	    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,


	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	    rnoContent = /^(?:GET|HEAD)$/,
	    rprotocol = /^\/\//,


	/* Prefilters
  * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
  * 2) These are called:
  *    - BEFORE asking for a transport
  *    - AFTER param serialization (s.data is a string if s.processData is true)
  * 3) key is the dataType
  * 4) the catchall symbol "*" can be used
  * 5) execution will start with transport dataType and THEN continue down to "*" if needed
  */
	prefilters = {},


	/* Transports bindings
  * 1) key is the dataType
  * 2) the catchall symbol "*" can be used
  * 3) selection will start with transport dataType and THEN go to "*" if needed
  */
	transports = {},


	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*"),


	// Anchor tag for parsing the document origin
	originAnchor = document.createElement("a");
	originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports(structure) {

		// dataTypeExpression is optional and defaults to "*"
		return function (dataTypeExpression, func) {

			if (typeof dataTypeExpression !== "string") {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
			    i = 0,
			    dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];

			if (jQuery.isFunction(func)) {

				// For each dataType in the dataTypeExpression
				while (dataType = dataTypes[i++]) {

					// Prepend if requested
					if (dataType[0] === "+") {
						dataType = dataType.slice(1) || "*";
						(structure[dataType] = structure[dataType] || []).unshift(func);

						// Otherwise append
					} else {
							(structure[dataType] = structure[dataType] || []).push(func);
						}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

		var inspected = {},
		    seekingTransport = structure === transports;

		function inspect(dataType) {
			var selected;
			inspected[dataType] = true;
			jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
				var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
				if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {

					options.dataTypes.unshift(dataTypeOrTransport);
					inspect(dataTypeOrTransport);
					return false;
				} else if (seekingTransport) {
					return !(selected = dataTypeOrTransport);
				}
			});
			return selected;
		}

		return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend(target, src) {
		var key,
		    deep,
		    flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for (key in src) {
			if (src[key] !== undefined) {
				(flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
			}
		}
		if (deep) {
			jQuery.extend(true, target, deep);
		}

		return target;
	}

	/* Handles responses to an ajax request:
  * - finds the right dataType (mediates between content-type and expected dataType)
  * - returns the corresponding response
  */
	function ajaxHandleResponses(s, jqXHR, responses) {

		var ct,
		    type,
		    finalDataType,
		    firstDataType,
		    contents = s.contents,
		    dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while (dataTypes[0] === "*") {
			dataTypes.shift();
			if (ct === undefined) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}

		// Check if we're dealing with a known content-type
		if (ct) {
			for (type in contents) {
				if (contents[type] && contents[type].test(ct)) {
					dataTypes.unshift(type);
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if (dataTypes[0] in responses) {
			finalDataType = dataTypes[0];
		} else {

			// Try convertible dataTypes
			for (type in responses) {
				if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
					finalDataType = type;
					break;
				}
				if (!firstDataType) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if (finalDataType) {
			if (finalDataType !== dataTypes[0]) {
				dataTypes.unshift(finalDataType);
			}
			return responses[finalDataType];
		}
	}

	/* Chain conversions given the request and the original response
  * Also sets the responseXXX fields on the jqXHR instance
  */
	function ajaxConvert(s, response, jqXHR, isSuccess) {
		var conv2,
		    current,
		    conv,
		    tmp,
		    prev,
		    converters = {},


		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if (dataTypes[1]) {
			for (conv in s.converters) {
				converters[conv.toLowerCase()] = s.converters[conv];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while (current) {

			if (s.responseFields[current]) {
				jqXHR[s.responseFields[current]] = response;
			}

			// Apply the dataFilter if provided
			if (!prev && isSuccess && s.dataFilter) {
				response = s.dataFilter(response, s.dataType);
			}

			prev = current;
			current = dataTypes.shift();

			if (current) {

				// There's only work to do if current dataType is non-auto
				if (current === "*") {

					current = prev;

					// Convert response if prev dataType is non-auto and differs from current
				} else if (prev !== "*" && prev !== current) {

						// Seek a direct converter
						conv = converters[prev + " " + current] || converters["* " + current];

						// If none found, seek a pair
						if (!conv) {
							for (conv2 in converters) {

								// If conv2 outputs current
								tmp = conv2.split(" ");
								if (tmp[1] === current) {

									// If prev can be converted to accepted input
									conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
									if (conv) {

										// Condense equivalence converters
										if (conv === true) {
											conv = converters[conv2];

											// Otherwise, insert the intermediate dataType
										} else if (converters[conv2] !== true) {
												current = tmp[0];
												dataTypes.unshift(tmp[1]);
											}
										break;
									}
								}
							}
						}

						// Apply converter (if not an equivalence)
						if (conv !== true) {

							// Unless errors are allowed to bubble, catch and return them
							if (conv && s.throws) {
								response = conv(response);
							} else {
								try {
									response = conv(response);
								} catch (e) {
									return {
										state: "parsererror",
										error: conv ? e : "No conversion from " + prev + " to " + current
									};
								}
							}
						}
					}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend({

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test(location.protocol),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
   timeout: 0,
   data: null,
   dataType: null,
   username: null,
   password: null,
   cache: null,
   throws: false,
   traditional: false,
   headers: {},
   */

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function ajaxSetup(target, settings) {
			return settings ?

			// Building a settings object
			ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

			// Extending ajaxSettings
			ajaxExtend(jQuery.ajaxSettings, target);
		},

		ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
		ajaxTransport: addToPrefiltersOrTransports(transports),

		// Main method
		ajax: function ajax(url, options) {

			// If url is an object, simulate pre-1.5 signature
			if ((typeof url === "undefined" ? "undefined" : _typeof(url)) === "object") {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,


			// URL without anti-cache param
			cacheURL,


			// Response headers
			responseHeadersString,
			    responseHeaders,


			// timeout handle
			timeoutTimer,


			// Url cleanup var
			urlAnchor,


			// To know if global events are to be dispatched
			fireGlobals,


			// Loop variable
			i,


			// Create the final options object
			s = jQuery.ajaxSetup({}, options),


			// Callbacks context
			callbackContext = s.context || s,


			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,


			// Deferreds
			deferred = jQuery.Deferred(),
			    completeDeferred = jQuery.Callbacks("once memory"),


			// Status-dependent callbacks
			_statusCode = s.statusCode || {},


			// Headers (they are sent all at once)
			requestHeaders = {},
			    requestHeadersNames = {},


			// The jqXHR state
			state = 0,


			// Default abort message
			strAbort = "canceled",


			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function getResponseHeader(key) {
					var match;
					if (state === 2) {
						if (!responseHeaders) {
							responseHeaders = {};
							while (match = rheaders.exec(responseHeadersString)) {
								responseHeaders[match[1].toLowerCase()] = match[2];
							}
						}
						match = responseHeaders[key.toLowerCase()];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function getAllResponseHeaders() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function setRequestHeader(name, value) {
					var lname = name.toLowerCase();
					if (!state) {
						name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
						requestHeaders[name] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function overrideMimeType(type) {
					if (!state) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function statusCode(map) {
					var code;
					if (map) {
						if (state < 2) {
							for (code in map) {

								// Lazy-add the new callback in a way that preserves old ones
								_statusCode[code] = [_statusCode[code], map[code]];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always(map[jqXHR.status]);
						}
					}
					return this;
				},

				// Cancel the request
				abort: function abort(statusText) {
					var finalText = statusText || strAbort;
					if (transport) {
						transport.abort(finalText);
					}
					done(0, finalText);
					return this;
				}
			};

			// Attach deferreds
			deferred.promise(jqXHR).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ((url || s.url || location.href) + "").replace(rhash, "").replace(rprotocol, location.protocol + "//");

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if (s.crossDomain == null) {
				urlAnchor = document.createElement("a");

				// Support: IE8-11+
				// IE throws exception if url is malformed, e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE8-11+
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
				} catch (e) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if (s.data && s.processData && typeof s.data !== "string") {
				s.data = jQuery.param(s.data, s.traditional);
			}

			// Apply prefilters
			inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

			// If request was aborted inside a prefilter, stop there
			if (state === 2) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if (fireGlobals && jQuery.active++ === 0) {
				jQuery.event.trigger("ajaxStart");
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test(s.type);

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if (!s.hasContent) {

				// If data is available, append data to url
				if (s.data) {
					cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data;

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if (s.cache === false) {
					s.url = rts.test(cacheURL) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace(rts, "$1_=" + nonce++) :

					// Otherwise add one to the end
					cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if (s.ifModified) {
				if (jQuery.lastModified[cacheURL]) {
					jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
				}
				if (jQuery.etag[cacheURL]) {
					jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
				}
			}

			// Set the correct header, if data is being sent
			if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
				jqXHR.setRequestHeader("Content-Type", s.contentType);
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);

			// Check for headers option
			for (i in s.headers) {
				jqXHR.setRequestHeader(i, s.headers[i]);
			}

			// Allow custom headers/mimetypes and early abort
			if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for (i in { success: 1, error: 1, complete: 1 }) {
				jqXHR[i](s[i]);
			}

			// Get transport
			transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

			// If no transport, we auto-abort
			if (!transport) {
				done(-1, "No Transport");
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if (fireGlobals) {
					globalEventContext.trigger("ajaxSend", [jqXHR, s]);
				}

				// If request was aborted inside ajaxSend, stop there
				if (state === 2) {
					return jqXHR;
				}

				// Timeout
				if (s.async && s.timeout > 0) {
					timeoutTimer = window.setTimeout(function () {
						jqXHR.abort("timeout");
					}, s.timeout);
				}

				try {
					state = 1;
					transport.send(requestHeaders, done);
				} catch (e) {

					// Propagate exception as error if not done
					if (state < 2) {
						done(-1, e);

						// Simply rethrow otherwise
					} else {
							throw e;
						}
				}
			}

			// Callback for when everything is done
			function done(status, nativeStatusText, responses, headers) {
				var isSuccess,
				    success,
				    error,
				    response,
				    modified,
				    statusText = nativeStatusText;

				// Called once
				if (state === 2) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if (timeoutTimer) {
					window.clearTimeout(timeoutTimer);
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if (responses) {
					response = ajaxHandleResponses(s, jqXHR, responses);
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert(s, response, jqXHR, isSuccess);

				// If successful, handle type chaining
				if (isSuccess) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if (s.ifModified) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if (modified) {
							jQuery.lastModified[cacheURL] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if (modified) {
							jQuery.etag[cacheURL] = modified;
						}
					}

					// if no content
					if (status === 204 || s.type === "HEAD") {
						statusText = "nocontent";

						// if not modified
					} else if (status === 304) {
							statusText = "notmodified";

							// If we have data, let's convert it
						} else {
								statusText = response.state;
								success = response.data;
								error = response.error;
								isSuccess = !error;
							}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if (status || !statusText) {
						statusText = "error";
						if (status < 0) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = (nativeStatusText || statusText) + "";

				// Success/Error
				if (isSuccess) {
					deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
				} else {
					deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
				}

				// Status-dependent callbacks
				jqXHR.statusCode(_statusCode);
				_statusCode = undefined;

				if (fireGlobals) {
					globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
				}

				// Complete
				completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

				if (fireGlobals) {
					globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

					// Handle the global AJAX counter
					if (! --jQuery.active) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}

			return jqXHR;
		},

		getJSON: function getJSON(url, data, callback) {
			return jQuery.get(url, data, callback, "json");
		},

		getScript: function getScript(url, callback) {
			return jQuery.get(url, undefined, callback, "script");
		}
	});

	jQuery.each(["get", "post"], function (i, method) {
		jQuery[method] = function (url, data, callback, type) {

			// Shift arguments if data argument was omitted
			if (jQuery.isFunction(data)) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax(jQuery.extend({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject(url) && url));
		};
	});

	jQuery._evalUrl = function (url) {
		return jQuery.ajax({
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	};

	jQuery.fn.extend({
		wrapAll: function wrapAll(html) {
			var wrap;

			if (jQuery.isFunction(html)) {
				return this.each(function (i) {
					jQuery(this).wrapAll(html.call(this, i));
				});
			}

			if (this[0]) {

				// The elements to wrap the target around
				wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

				if (this[0].parentNode) {
					wrap.insertBefore(this[0]);
				}

				wrap.map(function () {
					var elem = this;

					while (elem.firstElementChild) {
						elem = elem.firstElementChild;
					}

					return elem;
				}).append(this);
			}

			return this;
		},

		wrapInner: function wrapInner(html) {
			if (jQuery.isFunction(html)) {
				return this.each(function (i) {
					jQuery(this).wrapInner(html.call(this, i));
				});
			}

			return this.each(function () {
				var self = jQuery(this),
				    contents = self.contents();

				if (contents.length) {
					contents.wrapAll(html);
				} else {
					self.append(html);
				}
			});
		},

		wrap: function wrap(html) {
			var isFunction = jQuery.isFunction(html);

			return this.each(function (i) {
				jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
			});
		},

		unwrap: function unwrap() {
			return this.parent().each(function () {
				if (!jQuery.nodeName(this, "body")) {
					jQuery(this).replaceWith(this.childNodes);
				}
			}).end();
		}
	});

	jQuery.expr.filters.hidden = function (elem) {
		return !jQuery.expr.filters.visible(elem);
	};
	jQuery.expr.filters.visible = function (elem) {

		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		// Use OR instead of AND as the element is not visible if either is true
		// See tickets #10406 and #13132
		return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
	};

	var r20 = /%20/g,
	    rbracket = /\[\]$/,
	    rCRLF = /\r?\n/g,
	    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	    rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams(prefix, obj, traditional, add) {
		var name;

		if (jQuery.isArray(obj)) {

			// Serialize array item.
			jQuery.each(obj, function (i, v) {
				if (traditional || rbracket.test(prefix)) {

					// Treat each array item as a scalar.
					add(prefix, v);
				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(prefix + "[" + ((typeof v === "undefined" ? "undefined" : _typeof(v)) === "object" && v != null ? i : "") + "]", v, traditional, add);
				}
			});
		} else if (!traditional && jQuery.type(obj) === "object") {

			// Serialize object item.
			for (name in obj) {
				buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
			}
		} else {

			// Serialize scalar item.
			add(prefix, obj);
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function (a, traditional) {
		var prefix,
		    s = [],
		    add = function add(key, value) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction(value) ? value() : value == null ? "" : value;
			s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
		};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if (traditional === undefined) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {

			// Serialize the form elements
			jQuery.each(a, function () {
				add(this.name, this.value);
			});
		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for (prefix in a) {
				buildParams(prefix, a[prefix], traditional, add);
			}
		}

		// Return the resulting serialization
		return s.join("&").replace(r20, "+");
	};

	jQuery.fn.extend({
		serialize: function serialize() {
			return jQuery.param(this.serializeArray());
		},
		serializeArray: function serializeArray() {
			return this.map(function () {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop(this, "elements");
				return elements ? jQuery.makeArray(elements) : this;
			}).filter(function () {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
			}).map(function (i, elem) {
				var val = jQuery(this).val();

				return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val) {
					return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
				}) : { name: elem.name, value: val.replace(rCRLF, "\r\n") };
			}).get();
		}
	});

	jQuery.ajaxSettings.xhr = function () {
		try {
			return new window.XMLHttpRequest();
		} catch (e) {}
	};

	var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	    xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport(function (options) {
		var _callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if (support.cors || xhrSupported && !options.crossDomain) {
			return {
				send: function send(headers, complete) {
					var i,
					    xhr = options.xhr();

					xhr.open(options.type, options.url, options.async, options.username, options.password);

					// Apply custom fields if provided
					if (options.xhrFields) {
						for (i in options.xhrFields) {
							xhr[i] = options.xhrFields[i];
						}
					}

					// Override mime type if needed
					if (options.mimeType && xhr.overrideMimeType) {
						xhr.overrideMimeType(options.mimeType);
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if (!options.crossDomain && !headers["X-Requested-With"]) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for (i in headers) {
						xhr.setRequestHeader(i, headers[i]);
					}

					// Callback
					_callback = function callback(type) {
						return function () {
							if (_callback) {
								_callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if (type === "abort") {
									xhr.abort();
								} else if (type === "error") {

									// Support: IE9
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if (typeof xhr.status !== "number") {
										complete(0, "error");
									} else {
										complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status, xhr.statusText);
									}
								} else {
									complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText,

									// Support: IE9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									(xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText }, xhr.getAllResponseHeaders());
								}
							}
						};
					};

					// Listen to events
					xhr.onload = _callback();
					errorCallback = xhr.onerror = _callback("error");

					// Support: IE9
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if (xhr.onabort !== undefined) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function () {

							// Check readyState before timeout as it changes
							if (xhr.readyState === 4) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout(function () {
									if (_callback) {
										errorCallback();
									}
								});
							}
						};
					}

					// Create the abort callback
					_callback = _callback("abort");

					try {

						// Do send the request (this may raise an exception)
						xhr.send(options.hasContent && options.data || null);
					} catch (e) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if (_callback) {
							throw e;
						}
					}
				},

				abort: function abort() {
					if (_callback) {
						_callback();
					}
				}
			};
		}
	});

	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function textScript(text) {
				jQuery.globalEval(text);
				return text;
			}
		}
	});

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter("script", function (s) {
		if (s.cache === undefined) {
			s.cache = false;
		}
		if (s.crossDomain) {
			s.type = "GET";
		}
	});

	// Bind script tag hack transport
	jQuery.ajaxTransport("script", function (s) {

		// This transport only deals with cross domain requests
		if (s.crossDomain) {
			var script, _callback2;
			return {
				send: function send(_, complete) {
					script = jQuery("<script>").prop({
						charset: s.scriptCharset,
						src: s.url
					}).on("load error", _callback2 = function callback(evt) {
						script.remove();
						_callback2 = null;
						if (evt) {
							complete(evt.type === "error" ? 404 : 200, evt.type);
						}
					});

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild(script[0]);
				},
				abort: function abort() {
					if (_callback2) {
						_callback2();
					}
				}
			};
		}
	});

	var oldCallbacks = [],
	    rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function jsonpCallback() {
			var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
			this[callback] = true;
			return callback;
		}
	});

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

		var callbackName,
		    overwritten,
		    responseContainer,
		    jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if (jsonProp || s.dataTypes[0] === "jsonp") {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;

			// Insert callback into url or form data
			if (jsonProp) {
				s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
			} else if (s.jsonp !== false) {
				s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function () {
				if (!responseContainer) {
					jQuery.error(callbackName + " was not called");
				}
				return responseContainer[0];
			};

			// Force json dataType
			s.dataTypes[0] = "json";

			// Install callback
			overwritten = window[callbackName];
			window[callbackName] = function () {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always(function () {

				// If previous value didn't exist - remove it
				if (overwritten === undefined) {
					jQuery(window).removeProp(callbackName);

					// Otherwise restore preexisting value
				} else {
						window[callbackName] = overwritten;
					}

				// Save back as free
				if (s[callbackName]) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push(callbackName);
				}

				// Call if it was a function and we have a response
				if (responseContainer && jQuery.isFunction(overwritten)) {
					overwritten(responseContainer[0]);
				}

				responseContainer = overwritten = undefined;
			});

			// Delegate to script
			return "script";
		}
	});

	// Support: Safari 8+
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = function () {
		var body = document.implementation.createHTMLDocument("").body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	}();

	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function (data, context, keepScripts) {
		if (!data || typeof data !== "string") {
			return null;
		}
		if (typeof context === "boolean") {
			keepScripts = context;
			context = false;
		}

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		context = context || (support.createHTMLDocument ? document.implementation.createHTMLDocument("") : document);

		var parsed = rsingleTag.exec(data),
		    scripts = !keepScripts && [];

		// Single tag
		if (parsed) {
			return [context.createElement(parsed[1])];
		}

		parsed = buildFragment([data], context, scripts);

		if (scripts && scripts.length) {
			jQuery(scripts).remove();
		}

		return jQuery.merge([], parsed.childNodes);
	};

	// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
  * Load a url into a page
  */
	jQuery.fn.load = function (url, params, callback) {
		if (typeof url !== "string" && _load) {
			return _load.apply(this, arguments);
		}

		var selector,
		    type,
		    response,
		    self = this,
		    off = url.indexOf(" ");

		if (off > -1) {
			selector = jQuery.trim(url.slice(off));
			url = url.slice(0, off);
		}

		// If it's a function
		if (jQuery.isFunction(params)) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

			// Otherwise, build a param string
		} else if (params && (typeof params === "undefined" ? "undefined" : _typeof(params)) === "object") {
				type = "POST";
			}

		// If we have elements to modify, make the request
		if (self.length > 0) {
			jQuery.ajax({
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			}).done(function (responseText) {

				// Save response for use in complete callback
				response = arguments;

				self.html(selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

				// Otherwise use the full result
				responseText);

				// If the request succeeds, this function gets "data", "status", "jqXHR"
				// but they are ignored because response was set above.
				// If it fails, this function gets "jqXHR", "status", "error"
			}).always(callback && function (jqXHR, status) {
				self.each(function () {
					callback.apply(self, response || [jqXHR.responseText, status, jqXHR]);
				});
			});
		}

		return this;
	};

	// Attach a bunch of functions for handling common AJAX events
	jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
		jQuery.fn[type] = function (fn) {
			return this.on(type, fn);
		};
	});

	jQuery.expr.filters.animated = function (elem) {
		return jQuery.grep(jQuery.timers, function (fn) {
			return elem === fn.elem;
		}).length;
	};

	/**
  * Gets a window from an element
  */
	function getWindow(elem) {
		return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function setOffset(elem, options, i) {
			var curPosition,
			    curLeft,
			    curCSSTop,
			    curTop,
			    curOffset,
			    curCSSLeft,
			    calculatePosition,
			    position = jQuery.css(elem, "position"),
			    curElem = jQuery(elem),
			    props = {};

			// Set position first, in-case top/left are set even on static elem
			if (position === "static") {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css(elem, "top");
			curCSSLeft = jQuery.css(elem, "left");
			calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if (calculatePosition) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
			} else {
				curTop = parseFloat(curCSSTop) || 0;
				curLeft = parseFloat(curCSSLeft) || 0;
			}

			if (jQuery.isFunction(options)) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call(elem, i, jQuery.extend({}, curOffset));
			}

			if (options.top != null) {
				props.top = options.top - curOffset.top + curTop;
			}
			if (options.left != null) {
				props.left = options.left - curOffset.left + curLeft;
			}

			if ("using" in options) {
				options.using.call(elem, props);
			} else {
				curElem.css(props);
			}
		}
	};

	jQuery.fn.extend({
		offset: function offset(options) {
			if (arguments.length) {
				return options === undefined ? this : this.each(function (i) {
					jQuery.offset.setOffset(this, options, i);
				});
			}

			var docElem,
			    win,
			    elem = this[0],
			    box = { top: 0, left: 0 },
			    doc = elem && elem.ownerDocument;

			if (!doc) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if (!jQuery.contains(docElem, elem)) {
				return box;
			}

			box = elem.getBoundingClientRect();
			win = getWindow(doc);
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function position() {
			if (!this[0]) {
				return;
			}

			var offsetParent,
			    offset,
			    elem = this[0],
			    parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if (jQuery.css(elem, "position") === "fixed") {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();
			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if (!jQuery.nodeName(offsetParent[0], "html")) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
				parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
				left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function offsetParent() {
			return this.map(function () {
				var offsetParent = this.offsetParent;

				while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			});
		}
	});

	// Create scrollLeft and scrollTop methods
	jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
		var top = "pageYOffset" === prop;

		jQuery.fn[method] = function (val) {
			return access(this, function (elem, method, val) {
				var win = getWindow(elem);

				if (val === undefined) {
					return win ? win[prop] : elem[method];
				}

				if (win) {
					win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
				} else {
					elem[method] = val;
				}
			}, method, val, arguments.length);
		};
	});

	// Support: Safari<7-8+, Chrome<37-44+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each(["top", "left"], function (i, prop) {
		jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
			if (computed) {
				computed = curCSS(elem, prop);

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
			}
		});
	});

	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
		jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function (defaultExtra, funcName) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[funcName] = function (margin, value) {
				var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
				    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

				return access(this, function (elem, type, value) {
					var doc;

					if (jQuery.isWindow(elem)) {

						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement["client" + name];
					}

					// Get document width or height
					if (elem.nodeType === 9) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
					}

					return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css(elem, type, extra) :

					// Set width or height on the element
					jQuery.style(elem, type, value, extra);
				}, type, chainable ? margin : undefined, chainable, null);
			};
		});
	});

	jQuery.fn.extend({

		bind: function bind(types, data, fn) {
			return this.on(types, null, data, fn);
		},
		unbind: function unbind(types, fn) {
			return this.off(types, null, fn);
		},

		delegate: function delegate(selector, types, data, fn) {
			return this.on(types, selector, data, fn);
		},
		undelegate: function undelegate(selector, types, fn) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
		},
		size: function size() {
			return this.length;
		}
	});

	jQuery.fn.andSelf = jQuery.fn.addBack;

	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if (typeof define === "function" && define.amd) {
		define("jquery", [], function () {
			return jQuery;
		});
	}

	var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,


	// Map over the $ in case of overwrite
	_$ = window.$;

	jQuery.noConflict = function (deep) {
		if (window.$ === jQuery) {
			window.$ = _$;
		}

		if (deep && window.jQuery === jQuery) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if (!noGlobal) {
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
});
//# sourceMappingURL=data:application/json;base64,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QUFWLEtBQXFCLENBQXJCLEdBQ04sS0FBSyxHQUFMLENBQVUsUUFBVixFQUFvQixJQUFwQixDQURNLEdBRU4sS0FBSyxHQUFMLENBQVUsS0FBVixFQUFpQixZQUFZLElBQVosRUFBa0IsRUFBbkMsQ0FGTSxDQUhvQztHQUFoQztBQU9aLFFBQU0sZ0JBQVc7QUFDaEIsVUFBTyxLQUFLLE1BQUwsQ0FEUztHQUFYO0VBbkJQLEVBbi9TOEU7O0FBMmdUOUUsUUFBTyxFQUFQLENBQVUsT0FBVixHQUFvQixPQUFPLEVBQVAsQ0FBVSxPQUFWOzs7Ozs7Ozs7Ozs7Ozs7QUEzZ1QwRCxLQTZoVHpFLE9BQU8sTUFBUCxLQUFrQixVQUFsQixJQUFnQyxPQUFPLEdBQVAsRUFBYTtBQUNqRCxTQUFRLFFBQVIsRUFBa0IsRUFBbEIsRUFBc0IsWUFBVztBQUNoQyxVQUFPLE1BQVAsQ0FEZ0M7R0FBWCxDQUF0QixDQURpRDtFQUFsRDs7QUFRQTs7O0FBR0MsV0FBVSxPQUFPLE1BQVA7Ozs7QUFHVixNQUFLLE9BQU8sQ0FBUCxDQTNpVHdFOztBQTZpVDlFLFFBQU8sVUFBUCxHQUFvQixVQUFVLElBQVYsRUFBaUI7QUFDcEMsTUFBSyxPQUFPLENBQVAsS0FBYSxNQUFiLEVBQXNCO0FBQzFCLFVBQU8sQ0FBUCxHQUFXLEVBQVgsQ0FEMEI7R0FBM0I7O0FBSUEsTUFBSyxRQUFRLE9BQU8sTUFBUCxLQUFrQixNQUFsQixFQUEyQjtBQUN2QyxVQUFPLE1BQVAsR0FBZ0IsT0FBaEIsQ0FEdUM7R0FBeEM7O0FBSUEsU0FBTyxNQUFQLENBVG9DO0VBQWpCOzs7OztBQTdpVDBELEtBNGpUekUsQ0FBQyxRQUFELEVBQVk7QUFDaEIsU0FBTyxNQUFQLEdBQWdCLE9BQU8sQ0FBUCxHQUFXLE1BQVgsQ0FEQTtFQUFqQjs7QUFJQSxRQUFPLE1BQVAsQ0Foa1Q4RTtDQUE3QixDQXZCakQiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogalF1ZXJ5IEphdmFTY3JpcHQgTGlicmFyeSB2Mi4yLjFcbiAqIGh0dHA6Ly9qcXVlcnkuY29tL1xuICpcbiAqIEluY2x1ZGVzIFNpenpsZS5qc1xuICogaHR0cDovL3NpenpsZWpzLmNvbS9cbiAqXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKlxuICogRGF0ZTogMjAxNi0wMi0yMlQxOToxMVpcbiAqL1xuXG4oZnVuY3Rpb24oIGdsb2JhbCwgZmFjdG9yeSApIHtcblxuXHRpZiAoIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiICkge1xuXHRcdC8vIEZvciBDb21tb25KUyBhbmQgQ29tbW9uSlMtbGlrZSBlbnZpcm9ubWVudHMgd2hlcmUgYSBwcm9wZXIgYHdpbmRvd2Bcblx0XHQvLyBpcyBwcmVzZW50LCBleGVjdXRlIHRoZSBmYWN0b3J5IGFuZCBnZXQgalF1ZXJ5LlxuXHRcdC8vIEZvciBlbnZpcm9ubWVudHMgdGhhdCBkbyBub3QgaGF2ZSBhIGB3aW5kb3dgIHdpdGggYSBgZG9jdW1lbnRgXG5cdFx0Ly8gKHN1Y2ggYXMgTm9kZS5qcyksIGV4cG9zZSBhIGZhY3RvcnkgYXMgbW9kdWxlLmV4cG9ydHMuXG5cdFx0Ly8gVGhpcyBhY2NlbnR1YXRlcyB0aGUgbmVlZCBmb3IgdGhlIGNyZWF0aW9uIG9mIGEgcmVhbCBgd2luZG93YC5cblx0XHQvLyBlLmcuIHZhciBqUXVlcnkgPSByZXF1aXJlKFwianF1ZXJ5XCIpKHdpbmRvdyk7XG5cdFx0Ly8gU2VlIHRpY2tldCAjMTQ1NDkgZm9yIG1vcmUgaW5mby5cblx0XHRtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbC5kb2N1bWVudCA/XG5cdFx0XHRmYWN0b3J5KCBnbG9iYWwsIHRydWUgKSA6XG5cdFx0XHRmdW5jdGlvbiggdyApIHtcblx0XHRcdFx0aWYgKCAhdy5kb2N1bWVudCApIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoIFwialF1ZXJ5IHJlcXVpcmVzIGEgd2luZG93IHdpdGggYSBkb2N1bWVudFwiICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhY3RvcnkoIHcgKTtcblx0XHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0ZmFjdG9yeSggZ2xvYmFsICk7XG5cdH1cblxuLy8gUGFzcyB0aGlzIGlmIHdpbmRvdyBpcyBub3QgZGVmaW5lZCB5ZXRcbn0odHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHRoaXMsIGZ1bmN0aW9uKCB3aW5kb3csIG5vR2xvYmFsICkge1xuXG4vLyBTdXBwb3J0OiBGaXJlZm94IDE4K1xuLy8gQ2FuJ3QgYmUgaW4gc3RyaWN0IG1vZGUsIHNldmVyYWwgbGlicyBpbmNsdWRpbmcgQVNQLk5FVCB0cmFjZVxuLy8gdGhlIHN0YWNrIHZpYSBhcmd1bWVudHMuY2FsbGVyLmNhbGxlZSBhbmQgRmlyZWZveCBkaWVzIGlmXG4vLyB5b3UgdHJ5IHRvIHRyYWNlIHRocm91Z2ggXCJ1c2Ugc3RyaWN0XCIgY2FsbCBjaGFpbnMuICgjMTMzMzUpXG4vL1widXNlIHN0cmljdFwiO1xudmFyIGFyciA9IFtdO1xuXG52YXIgZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQ7XG5cbnZhciBzbGljZSA9IGFyci5zbGljZTtcblxudmFyIGNvbmNhdCA9IGFyci5jb25jYXQ7XG5cbnZhciBwdXNoID0gYXJyLnB1c2g7XG5cbnZhciBpbmRleE9mID0gYXJyLmluZGV4T2Y7XG5cbnZhciBjbGFzczJ0eXBlID0ge307XG5cbnZhciB0b1N0cmluZyA9IGNsYXNzMnR5cGUudG9TdHJpbmc7XG5cbnZhciBoYXNPd24gPSBjbGFzczJ0eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgc3VwcG9ydCA9IHt9O1xuXG5cblxudmFyXG5cdHZlcnNpb24gPSBcIjIuMi4xXCIsXG5cblx0Ly8gRGVmaW5lIGEgbG9jYWwgY29weSBvZiBqUXVlcnlcblx0alF1ZXJ5ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0ICkge1xuXG5cdFx0Ly8gVGhlIGpRdWVyeSBvYmplY3QgaXMgYWN0dWFsbHkganVzdCB0aGUgaW5pdCBjb25zdHJ1Y3RvciAnZW5oYW5jZWQnXG5cdFx0Ly8gTmVlZCBpbml0IGlmIGpRdWVyeSBpcyBjYWxsZWQgKGp1c3QgYWxsb3cgZXJyb3IgdG8gYmUgdGhyb3duIGlmIG5vdCBpbmNsdWRlZClcblx0XHRyZXR1cm4gbmV3IGpRdWVyeS5mbi5pbml0KCBzZWxlY3RvciwgY29udGV4dCApO1xuXHR9LFxuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQ8NC4xXG5cdC8vIE1ha2Ugc3VyZSB3ZSB0cmltIEJPTSBhbmQgTkJTUFxuXHRydHJpbSA9IC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZyxcblxuXHQvLyBNYXRjaGVzIGRhc2hlZCBzdHJpbmcgZm9yIGNhbWVsaXppbmdcblx0cm1zUHJlZml4ID0gL14tbXMtLyxcblx0cmRhc2hBbHBoYSA9IC8tKFtcXGRhLXpdKS9naSxcblxuXHQvLyBVc2VkIGJ5IGpRdWVyeS5jYW1lbENhc2UgYXMgY2FsbGJhY2sgdG8gcmVwbGFjZSgpXG5cdGZjYW1lbENhc2UgPSBmdW5jdGlvbiggYWxsLCBsZXR0ZXIgKSB7XG5cdFx0cmV0dXJuIGxldHRlci50b1VwcGVyQ2FzZSgpO1xuXHR9O1xuXG5qUXVlcnkuZm4gPSBqUXVlcnkucHJvdG90eXBlID0ge1xuXG5cdC8vIFRoZSBjdXJyZW50IHZlcnNpb24gb2YgalF1ZXJ5IGJlaW5nIHVzZWRcblx0anF1ZXJ5OiB2ZXJzaW9uLFxuXG5cdGNvbnN0cnVjdG9yOiBqUXVlcnksXG5cblx0Ly8gU3RhcnQgd2l0aCBhbiBlbXB0eSBzZWxlY3RvclxuXHRzZWxlY3RvcjogXCJcIixcblxuXHQvLyBUaGUgZGVmYXVsdCBsZW5ndGggb2YgYSBqUXVlcnkgb2JqZWN0IGlzIDBcblx0bGVuZ3RoOiAwLFxuXG5cdHRvQXJyYXk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBzbGljZS5jYWxsKCB0aGlzICk7XG5cdH0sXG5cblx0Ly8gR2V0IHRoZSBOdGggZWxlbWVudCBpbiB0aGUgbWF0Y2hlZCBlbGVtZW50IHNldCBPUlxuXHQvLyBHZXQgdGhlIHdob2xlIG1hdGNoZWQgZWxlbWVudCBzZXQgYXMgYSBjbGVhbiBhcnJheVxuXHRnZXQ6IGZ1bmN0aW9uKCBudW0gKSB7XG5cdFx0cmV0dXJuIG51bSAhPSBudWxsID9cblxuXHRcdFx0Ly8gUmV0dXJuIGp1c3QgdGhlIG9uZSBlbGVtZW50IGZyb20gdGhlIHNldFxuXHRcdFx0KCBudW0gPCAwID8gdGhpc1sgbnVtICsgdGhpcy5sZW5ndGggXSA6IHRoaXNbIG51bSBdICkgOlxuXG5cdFx0XHQvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyBpbiBhIGNsZWFuIGFycmF5XG5cdFx0XHRzbGljZS5jYWxsKCB0aGlzICk7XG5cdH0sXG5cblx0Ly8gVGFrZSBhbiBhcnJheSBvZiBlbGVtZW50cyBhbmQgcHVzaCBpdCBvbnRvIHRoZSBzdGFja1xuXHQvLyAocmV0dXJuaW5nIHRoZSBuZXcgbWF0Y2hlZCBlbGVtZW50IHNldClcblx0cHVzaFN0YWNrOiBmdW5jdGlvbiggZWxlbXMgKSB7XG5cblx0XHQvLyBCdWlsZCBhIG5ldyBqUXVlcnkgbWF0Y2hlZCBlbGVtZW50IHNldFxuXHRcdHZhciByZXQgPSBqUXVlcnkubWVyZ2UoIHRoaXMuY29uc3RydWN0b3IoKSwgZWxlbXMgKTtcblxuXHRcdC8vIEFkZCB0aGUgb2xkIG9iamVjdCBvbnRvIHRoZSBzdGFjayAoYXMgYSByZWZlcmVuY2UpXG5cdFx0cmV0LnByZXZPYmplY3QgPSB0aGlzO1xuXHRcdHJldC5jb250ZXh0ID0gdGhpcy5jb250ZXh0O1xuXG5cdFx0Ly8gUmV0dXJuIHRoZSBuZXdseS1mb3JtZWQgZWxlbWVudCBzZXRcblx0XHRyZXR1cm4gcmV0O1xuXHR9LFxuXG5cdC8vIEV4ZWN1dGUgYSBjYWxsYmFjayBmb3IgZXZlcnkgZWxlbWVudCBpbiB0aGUgbWF0Y2hlZCBzZXQuXG5cdGVhY2g6IGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmVhY2goIHRoaXMsIGNhbGxiYWNrICk7XG5cdH0sXG5cblx0bWFwOiBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqUXVlcnkubWFwKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgaSApIHtcblx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKCBlbGVtLCBpLCBlbGVtICk7XG5cdFx0fSApICk7XG5cdH0sXG5cblx0c2xpY2U6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggc2xpY2UuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApICk7XG5cdH0sXG5cblx0Zmlyc3Q6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmVxKCAwICk7XG5cdH0sXG5cblx0bGFzdDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZXEoIC0xICk7XG5cdH0sXG5cblx0ZXE6IGZ1bmN0aW9uKCBpICkge1xuXHRcdHZhciBsZW4gPSB0aGlzLmxlbmd0aCxcblx0XHRcdGogPSAraSArICggaSA8IDAgPyBsZW4gOiAwICk7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqID49IDAgJiYgaiA8IGxlbiA/IFsgdGhpc1sgaiBdIF0gOiBbXSApO1xuXHR9LFxuXG5cdGVuZDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMucHJldk9iamVjdCB8fCB0aGlzLmNvbnN0cnVjdG9yKCk7XG5cdH0sXG5cblx0Ly8gRm9yIGludGVybmFsIHVzZSBvbmx5LlxuXHQvLyBCZWhhdmVzIGxpa2UgYW4gQXJyYXkncyBtZXRob2QsIG5vdCBsaWtlIGEgalF1ZXJ5IG1ldGhvZC5cblx0cHVzaDogcHVzaCxcblx0c29ydDogYXJyLnNvcnQsXG5cdHNwbGljZTogYXJyLnNwbGljZVxufTtcblxualF1ZXJ5LmV4dGVuZCA9IGpRdWVyeS5mbi5leHRlbmQgPSBmdW5jdGlvbigpIHtcblx0dmFyIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY29weUlzQXJyYXksIGNsb25lLFxuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1sgMCBdIHx8IHt9LFxuXHRcdGkgPSAxLFxuXHRcdGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdFx0ZGVlcCA9IGZhbHNlO1xuXG5cdC8vIEhhbmRsZSBhIGRlZXAgY29weSBzaXR1YXRpb25cblx0aWYgKCB0eXBlb2YgdGFyZ2V0ID09PSBcImJvb2xlYW5cIiApIHtcblx0XHRkZWVwID0gdGFyZ2V0O1xuXG5cdFx0Ly8gU2tpcCB0aGUgYm9vbGVhbiBhbmQgdGhlIHRhcmdldFxuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1sgaSBdIHx8IHt9O1xuXHRcdGkrKztcblx0fVxuXG5cdC8vIEhhbmRsZSBjYXNlIHdoZW4gdGFyZ2V0IGlzIGEgc3RyaW5nIG9yIHNvbWV0aGluZyAocG9zc2libGUgaW4gZGVlcCBjb3B5KVxuXHRpZiAoIHR5cGVvZiB0YXJnZXQgIT09IFwib2JqZWN0XCIgJiYgIWpRdWVyeS5pc0Z1bmN0aW9uKCB0YXJnZXQgKSApIHtcblx0XHR0YXJnZXQgPSB7fTtcblx0fVxuXG5cdC8vIEV4dGVuZCBqUXVlcnkgaXRzZWxmIGlmIG9ubHkgb25lIGFyZ3VtZW50IGlzIHBhc3NlZFxuXHRpZiAoIGkgPT09IGxlbmd0aCApIHtcblx0XHR0YXJnZXQgPSB0aGlzO1xuXHRcdGktLTtcblx0fVxuXG5cdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXG5cdFx0Ly8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuXHRcdGlmICggKCBvcHRpb25zID0gYXJndW1lbnRzWyBpIF0gKSAhPSBudWxsICkge1xuXG5cdFx0XHQvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0XG5cdFx0XHRmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG5cdFx0XHRcdHNyYyA9IHRhcmdldFsgbmFtZSBdO1xuXHRcdFx0XHRjb3B5ID0gb3B0aW9uc1sgbmFtZSBdO1xuXG5cdFx0XHRcdC8vIFByZXZlbnQgbmV2ZXItZW5kaW5nIGxvb3Bcblx0XHRcdFx0aWYgKCB0YXJnZXQgPT09IGNvcHkgKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBSZWN1cnNlIGlmIHdlJ3JlIG1lcmdpbmcgcGxhaW4gb2JqZWN0cyBvciBhcnJheXNcblx0XHRcdFx0aWYgKCBkZWVwICYmIGNvcHkgJiYgKCBqUXVlcnkuaXNQbGFpbk9iamVjdCggY29weSApIHx8XG5cdFx0XHRcdFx0KCBjb3B5SXNBcnJheSA9IGpRdWVyeS5pc0FycmF5KCBjb3B5ICkgKSApICkge1xuXG5cdFx0XHRcdFx0aWYgKCBjb3B5SXNBcnJheSApIHtcblx0XHRcdFx0XHRcdGNvcHlJc0FycmF5ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBqUXVlcnkuaXNBcnJheSggc3JjICkgPyBzcmMgOiBbXTtcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBqUXVlcnkuaXNQbGFpbk9iamVjdCggc3JjICkgPyBzcmMgOiB7fTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBOZXZlciBtb3ZlIG9yaWdpbmFsIG9iamVjdHMsIGNsb25lIHRoZW1cblx0XHRcdFx0XHR0YXJnZXRbIG5hbWUgXSA9IGpRdWVyeS5leHRlbmQoIGRlZXAsIGNsb25lLCBjb3B5ICk7XG5cblx0XHRcdFx0Ly8gRG9uJ3QgYnJpbmcgaW4gdW5kZWZpbmVkIHZhbHVlc1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBjb3B5ICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0dGFyZ2V0WyBuYW1lIF0gPSBjb3B5O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBtb2RpZmllZCBvYmplY3Rcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cbmpRdWVyeS5leHRlbmQoIHtcblxuXHQvLyBVbmlxdWUgZm9yIGVhY2ggY29weSBvZiBqUXVlcnkgb24gdGhlIHBhZ2Vcblx0ZXhwYW5kbzogXCJqUXVlcnlcIiArICggdmVyc2lvbiArIE1hdGgucmFuZG9tKCkgKS5yZXBsYWNlKCAvXFxEL2csIFwiXCIgKSxcblxuXHQvLyBBc3N1bWUgalF1ZXJ5IGlzIHJlYWR5IHdpdGhvdXQgdGhlIHJlYWR5IG1vZHVsZVxuXHRpc1JlYWR5OiB0cnVlLFxuXG5cdGVycm9yOiBmdW5jdGlvbiggbXNnICkge1xuXHRcdHRocm93IG5ldyBFcnJvciggbXNnICk7XG5cdH0sXG5cblx0bm9vcDogZnVuY3Rpb24oKSB7fSxcblxuXHRpc0Z1bmN0aW9uOiBmdW5jdGlvbiggb2JqICkge1xuXHRcdHJldHVybiBqUXVlcnkudHlwZSggb2JqICkgPT09IFwiZnVuY3Rpb25cIjtcblx0fSxcblxuXHRpc0FycmF5OiBBcnJheS5pc0FycmF5LFxuXG5cdGlzV2luZG93OiBmdW5jdGlvbiggb2JqICkge1xuXHRcdHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmogPT09IG9iai53aW5kb3c7XG5cdH0sXG5cblx0aXNOdW1lcmljOiBmdW5jdGlvbiggb2JqICkge1xuXG5cdFx0Ly8gcGFyc2VGbG9hdCBOYU5zIG51bWVyaWMtY2FzdCBmYWxzZSBwb3NpdGl2ZXMgKG51bGx8dHJ1ZXxmYWxzZXxcIlwiKVxuXHRcdC8vIC4uLmJ1dCBtaXNpbnRlcnByZXRzIGxlYWRpbmctbnVtYmVyIHN0cmluZ3MsIHBhcnRpY3VsYXJseSBoZXggbGl0ZXJhbHMgKFwiMHguLi5cIilcblx0XHQvLyBzdWJ0cmFjdGlvbiBmb3JjZXMgaW5maW5pdGllcyB0byBOYU5cblx0XHQvLyBhZGRpbmcgMSBjb3JyZWN0cyBsb3NzIG9mIHByZWNpc2lvbiBmcm9tIHBhcnNlRmxvYXQgKCMxNTEwMClcblx0XHR2YXIgcmVhbFN0cmluZ09iaiA9IG9iaiAmJiBvYmoudG9TdHJpbmcoKTtcblx0XHRyZXR1cm4gIWpRdWVyeS5pc0FycmF5KCBvYmogKSAmJiAoIHJlYWxTdHJpbmdPYmogLSBwYXJzZUZsb2F0KCByZWFsU3RyaW5nT2JqICkgKyAxICkgPj0gMDtcblx0fSxcblxuXHRpc1BsYWluT2JqZWN0OiBmdW5jdGlvbiggb2JqICkge1xuXG5cdFx0Ly8gTm90IHBsYWluIG9iamVjdHM6XG5cdFx0Ly8gLSBBbnkgb2JqZWN0IG9yIHZhbHVlIHdob3NlIGludGVybmFsIFtbQ2xhc3NdXSBwcm9wZXJ0eSBpcyBub3QgXCJbb2JqZWN0IE9iamVjdF1cIlxuXHRcdC8vIC0gRE9NIG5vZGVzXG5cdFx0Ly8gLSB3aW5kb3dcblx0XHRpZiAoIGpRdWVyeS50eXBlKCBvYmogKSAhPT0gXCJvYmplY3RcIiB8fCBvYmoubm9kZVR5cGUgfHwgalF1ZXJ5LmlzV2luZG93KCBvYmogKSApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRpZiAoIG9iai5jb25zdHJ1Y3RvciAmJlxuXHRcdFx0XHQhaGFzT3duLmNhbGwoIG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIFwiaXNQcm90b3R5cGVPZlwiICkgKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlIGZ1bmN0aW9uIGhhc24ndCByZXR1cm5lZCBhbHJlYWR5LCB3ZSdyZSBjb25maWRlbnQgdGhhdFxuXHRcdC8vIHxvYmp8IGlzIGEgcGxhaW4gb2JqZWN0LCBjcmVhdGVkIGJ5IHt9IG9yIGNvbnN0cnVjdGVkIHdpdGggbmV3IE9iamVjdFxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdGlzRW1wdHlPYmplY3Q6IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0dmFyIG5hbWU7XG5cdFx0Zm9yICggbmFtZSBpbiBvYmogKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdHR5cGU6IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0aWYgKCBvYmogPT0gbnVsbCApIHtcblx0XHRcdHJldHVybiBvYmogKyBcIlwiO1xuXHRcdH1cblxuXHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQ8NC4wLCBpT1M8NiAoZnVuY3Rpb25pc2ggUmVnRXhwKVxuXHRcdHJldHVybiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIiA/XG5cdFx0XHRjbGFzczJ0eXBlWyB0b1N0cmluZy5jYWxsKCBvYmogKSBdIHx8IFwib2JqZWN0XCIgOlxuXHRcdFx0dHlwZW9mIG9iajtcblx0fSxcblxuXHQvLyBFdmFsdWF0ZXMgYSBzY3JpcHQgaW4gYSBnbG9iYWwgY29udGV4dFxuXHRnbG9iYWxFdmFsOiBmdW5jdGlvbiggY29kZSApIHtcblx0XHR2YXIgc2NyaXB0LFxuXHRcdFx0aW5kaXJlY3QgPSBldmFsO1xuXG5cdFx0Y29kZSA9IGpRdWVyeS50cmltKCBjb2RlICk7XG5cblx0XHRpZiAoIGNvZGUgKSB7XG5cblx0XHRcdC8vIElmIHRoZSBjb2RlIGluY2x1ZGVzIGEgdmFsaWQsIHByb2xvZ3VlIHBvc2l0aW9uXG5cdFx0XHQvLyBzdHJpY3QgbW9kZSBwcmFnbWEsIGV4ZWN1dGUgY29kZSBieSBpbmplY3RpbmcgYVxuXHRcdFx0Ly8gc2NyaXB0IHRhZyBpbnRvIHRoZSBkb2N1bWVudC5cblx0XHRcdGlmICggY29kZS5pbmRleE9mKCBcInVzZSBzdHJpY3RcIiApID09PSAxICkge1xuXHRcdFx0XHRzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcInNjcmlwdFwiICk7XG5cdFx0XHRcdHNjcmlwdC50ZXh0ID0gY29kZTtcblx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCggc2NyaXB0ICkucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggc2NyaXB0ICk7XG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSwgYXZvaWQgdGhlIERPTSBub2RlIGNyZWF0aW9uLCBpbnNlcnRpb25cblx0XHRcdFx0Ly8gYW5kIHJlbW92YWwgYnkgdXNpbmcgYW4gaW5kaXJlY3QgZ2xvYmFsIGV2YWxcblxuXHRcdFx0XHRpbmRpcmVjdCggY29kZSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHQvLyBDb252ZXJ0IGRhc2hlZCB0byBjYW1lbENhc2U7IHVzZWQgYnkgdGhlIGNzcyBhbmQgZGF0YSBtb2R1bGVzXG5cdC8vIFN1cHBvcnQ6IElFOS0xMStcblx0Ly8gTWljcm9zb2Z0IGZvcmdvdCB0byBodW1wIHRoZWlyIHZlbmRvciBwcmVmaXggKCM5NTcyKVxuXHRjYW1lbENhc2U6IGZ1bmN0aW9uKCBzdHJpbmcgKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKCBybXNQcmVmaXgsIFwibXMtXCIgKS5yZXBsYWNlKCByZGFzaEFscGhhLCBmY2FtZWxDYXNlICk7XG5cdH0sXG5cblx0bm9kZU5hbWU6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuXHRcdHJldHVybiBlbGVtLm5vZGVOYW1lICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXHR9LFxuXG5cdGVhY2g6IGZ1bmN0aW9uKCBvYmosIGNhbGxiYWNrICkge1xuXHRcdHZhciBsZW5ndGgsIGkgPSAwO1xuXG5cdFx0aWYgKCBpc0FycmF5TGlrZSggb2JqICkgKSB7XG5cdFx0XHRsZW5ndGggPSBvYmoubGVuZ3RoO1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdGlmICggY2FsbGJhY2suY2FsbCggb2JqWyBpIF0sIGksIG9ialsgaSBdICkgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvciAoIGkgaW4gb2JqICkge1xuXHRcdFx0XHRpZiAoIGNhbGxiYWNrLmNhbGwoIG9ialsgaSBdLCBpLCBvYmpbIGkgXSApID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBvYmo7XG5cdH0sXG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZDw0LjFcblx0dHJpbTogZnVuY3Rpb24oIHRleHQgKSB7XG5cdFx0cmV0dXJuIHRleHQgPT0gbnVsbCA/XG5cdFx0XHRcIlwiIDpcblx0XHRcdCggdGV4dCArIFwiXCIgKS5yZXBsYWNlKCBydHJpbSwgXCJcIiApO1xuXHR9LFxuXG5cdC8vIHJlc3VsdHMgaXMgZm9yIGludGVybmFsIHVzYWdlIG9ubHlcblx0bWFrZUFycmF5OiBmdW5jdGlvbiggYXJyLCByZXN1bHRzICkge1xuXHRcdHZhciByZXQgPSByZXN1bHRzIHx8IFtdO1xuXG5cdFx0aWYgKCBhcnIgIT0gbnVsbCApIHtcblx0XHRcdGlmICggaXNBcnJheUxpa2UoIE9iamVjdCggYXJyICkgKSApIHtcblx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCByZXQsXG5cdFx0XHRcdFx0dHlwZW9mIGFyciA9PT0gXCJzdHJpbmdcIiA/XG5cdFx0XHRcdFx0WyBhcnIgXSA6IGFyclxuXHRcdFx0XHQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cHVzaC5jYWxsKCByZXQsIGFyciApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXQ7XG5cdH0sXG5cblx0aW5BcnJheTogZnVuY3Rpb24oIGVsZW0sIGFyciwgaSApIHtcblx0XHRyZXR1cm4gYXJyID09IG51bGwgPyAtMSA6IGluZGV4T2YuY2FsbCggYXJyLCBlbGVtLCBpICk7XG5cdH0sXG5cblx0bWVyZ2U6IGZ1bmN0aW9uKCBmaXJzdCwgc2Vjb25kICkge1xuXHRcdHZhciBsZW4gPSArc2Vjb25kLmxlbmd0aCxcblx0XHRcdGogPSAwLFxuXHRcdFx0aSA9IGZpcnN0Lmxlbmd0aDtcblxuXHRcdGZvciAoIDsgaiA8IGxlbjsgaisrICkge1xuXHRcdFx0Zmlyc3RbIGkrKyBdID0gc2Vjb25kWyBqIF07XG5cdFx0fVxuXG5cdFx0Zmlyc3QubGVuZ3RoID0gaTtcblxuXHRcdHJldHVybiBmaXJzdDtcblx0fSxcblxuXHRncmVwOiBmdW5jdGlvbiggZWxlbXMsIGNhbGxiYWNrLCBpbnZlcnQgKSB7XG5cdFx0dmFyIGNhbGxiYWNrSW52ZXJzZSxcblx0XHRcdG1hdGNoZXMgPSBbXSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0bGVuZ3RoID0gZWxlbXMubGVuZ3RoLFxuXHRcdFx0Y2FsbGJhY2tFeHBlY3QgPSAhaW52ZXJ0O1xuXG5cdFx0Ly8gR28gdGhyb3VnaCB0aGUgYXJyYXksIG9ubHkgc2F2aW5nIHRoZSBpdGVtc1xuXHRcdC8vIHRoYXQgcGFzcyB0aGUgdmFsaWRhdG9yIGZ1bmN0aW9uXG5cdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRjYWxsYmFja0ludmVyc2UgPSAhY2FsbGJhY2soIGVsZW1zWyBpIF0sIGkgKTtcblx0XHRcdGlmICggY2FsbGJhY2tJbnZlcnNlICE9PSBjYWxsYmFja0V4cGVjdCApIHtcblx0XHRcdFx0bWF0Y2hlcy5wdXNoKCBlbGVtc1sgaSBdICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1hdGNoZXM7XG5cdH0sXG5cblx0Ly8gYXJnIGlzIGZvciBpbnRlcm5hbCB1c2FnZSBvbmx5XG5cdG1hcDogZnVuY3Rpb24oIGVsZW1zLCBjYWxsYmFjaywgYXJnICkge1xuXHRcdHZhciBsZW5ndGgsIHZhbHVlLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRyZXQgPSBbXTtcblxuXHRcdC8vIEdvIHRocm91Z2ggdGhlIGFycmF5LCB0cmFuc2xhdGluZyBlYWNoIG9mIHRoZSBpdGVtcyB0byB0aGVpciBuZXcgdmFsdWVzXG5cdFx0aWYgKCBpc0FycmF5TGlrZSggZWxlbXMgKSApIHtcblx0XHRcdGxlbmd0aCA9IGVsZW1zLmxlbmd0aDtcblx0XHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXHRcdFx0XHR2YWx1ZSA9IGNhbGxiYWNrKCBlbGVtc1sgaSBdLCBpLCBhcmcgKTtcblxuXHRcdFx0XHRpZiAoIHZhbHVlICE9IG51bGwgKSB7XG5cdFx0XHRcdFx0cmV0LnB1c2goIHZhbHVlICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdC8vIEdvIHRocm91Z2ggZXZlcnkga2V5IG9uIHRoZSBvYmplY3QsXG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvciAoIGkgaW4gZWxlbXMgKSB7XG5cdFx0XHRcdHZhbHVlID0gY2FsbGJhY2soIGVsZW1zWyBpIF0sIGksIGFyZyApO1xuXG5cdFx0XHRcdGlmICggdmFsdWUgIT0gbnVsbCApIHtcblx0XHRcdFx0XHRyZXQucHVzaCggdmFsdWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEZsYXR0ZW4gYW55IG5lc3RlZCBhcnJheXNcblx0XHRyZXR1cm4gY29uY2F0LmFwcGx5KCBbXSwgcmV0ICk7XG5cdH0sXG5cblx0Ly8gQSBnbG9iYWwgR1VJRCBjb3VudGVyIGZvciBvYmplY3RzXG5cdGd1aWQ6IDEsXG5cblx0Ly8gQmluZCBhIGZ1bmN0aW9uIHRvIGEgY29udGV4dCwgb3B0aW9uYWxseSBwYXJ0aWFsbHkgYXBwbHlpbmcgYW55XG5cdC8vIGFyZ3VtZW50cy5cblx0cHJveHk6IGZ1bmN0aW9uKCBmbiwgY29udGV4dCApIHtcblx0XHR2YXIgdG1wLCBhcmdzLCBwcm94eTtcblxuXHRcdGlmICggdHlwZW9mIGNvbnRleHQgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHR0bXAgPSBmblsgY29udGV4dCBdO1xuXHRcdFx0Y29udGV4dCA9IGZuO1xuXHRcdFx0Zm4gPSB0bXA7XG5cdFx0fVxuXG5cdFx0Ly8gUXVpY2sgY2hlY2sgdG8gZGV0ZXJtaW5lIGlmIHRhcmdldCBpcyBjYWxsYWJsZSwgaW4gdGhlIHNwZWNcblx0XHQvLyB0aGlzIHRocm93cyBhIFR5cGVFcnJvciwgYnV0IHdlIHdpbGwganVzdCByZXR1cm4gdW5kZWZpbmVkLlxuXHRcdGlmICggIWpRdWVyeS5pc0Z1bmN0aW9uKCBmbiApICkge1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHQvLyBTaW11bGF0ZWQgYmluZFxuXHRcdGFyZ3MgPSBzbGljZS5jYWxsKCBhcmd1bWVudHMsIDIgKTtcblx0XHRwcm94eSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGZuLmFwcGx5KCBjb250ZXh0IHx8IHRoaXMsIGFyZ3MuY29uY2F0KCBzbGljZS5jYWxsKCBhcmd1bWVudHMgKSApICk7XG5cdFx0fTtcblxuXHRcdC8vIFNldCB0aGUgZ3VpZCBvZiB1bmlxdWUgaGFuZGxlciB0byB0aGUgc2FtZSBvZiBvcmlnaW5hbCBoYW5kbGVyLCBzbyBpdCBjYW4gYmUgcmVtb3ZlZFxuXHRcdHByb3h5Lmd1aWQgPSBmbi5ndWlkID0gZm4uZ3VpZCB8fCBqUXVlcnkuZ3VpZCsrO1xuXG5cdFx0cmV0dXJuIHByb3h5O1xuXHR9LFxuXG5cdG5vdzogRGF0ZS5ub3csXG5cblx0Ly8galF1ZXJ5LnN1cHBvcnQgaXMgbm90IHVzZWQgaW4gQ29yZSBidXQgb3RoZXIgcHJvamVjdHMgYXR0YWNoIHRoZWlyXG5cdC8vIHByb3BlcnRpZXMgdG8gaXQgc28gaXQgbmVlZHMgdG8gZXhpc3QuXG5cdHN1cHBvcnQ6IHN1cHBvcnRcbn0gKTtcblxuLy8gSlNIaW50IHdvdWxkIGVycm9yIG9uIHRoaXMgY29kZSBkdWUgdG8gdGhlIFN5bWJvbCBub3QgYmVpbmcgZGVmaW5lZCBpbiBFUzUuXG4vLyBEZWZpbmluZyB0aGlzIGdsb2JhbCBpbiAuanNoaW50cmMgd291bGQgY3JlYXRlIGEgZGFuZ2VyIG9mIHVzaW5nIHRoZSBnbG9iYWxcbi8vIHVuZ3VhcmRlZCBpbiBhbm90aGVyIHBsYWNlLCBpdCBzZWVtcyBzYWZlciB0byBqdXN0IGRpc2FibGUgSlNIaW50IGZvciB0aGVzZVxuLy8gdGhyZWUgbGluZXMuXG4vKiBqc2hpbnQgaWdub3JlOiBzdGFydCAqL1xuaWYgKCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgKSB7XG5cdGpRdWVyeS5mblsgU3ltYm9sLml0ZXJhdG9yIF0gPSBhcnJbIFN5bWJvbC5pdGVyYXRvciBdO1xufVxuLyoganNoaW50IGlnbm9yZTogZW5kICovXG5cbi8vIFBvcHVsYXRlIHRoZSBjbGFzczJ0eXBlIG1hcFxualF1ZXJ5LmVhY2goIFwiQm9vbGVhbiBOdW1iZXIgU3RyaW5nIEZ1bmN0aW9uIEFycmF5IERhdGUgUmVnRXhwIE9iamVjdCBFcnJvciBTeW1ib2xcIi5zcGxpdCggXCIgXCIgKSxcbmZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXHRjbGFzczJ0eXBlWyBcIltvYmplY3QgXCIgKyBuYW1lICsgXCJdXCIgXSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbn0gKTtcblxuZnVuY3Rpb24gaXNBcnJheUxpa2UoIG9iaiApIHtcblxuXHQvLyBTdXBwb3J0OiBpT1MgOC4yIChub3QgcmVwcm9kdWNpYmxlIGluIHNpbXVsYXRvcilcblx0Ly8gYGluYCBjaGVjayB1c2VkIHRvIHByZXZlbnQgSklUIGVycm9yIChnaC0yMTQ1KVxuXHQvLyBoYXNPd24gaXNuJ3QgdXNlZCBoZXJlIGR1ZSB0byBmYWxzZSBuZWdhdGl2ZXNcblx0Ly8gcmVnYXJkaW5nIE5vZGVsaXN0IGxlbmd0aCBpbiBJRVxuXHR2YXIgbGVuZ3RoID0gISFvYmogJiYgXCJsZW5ndGhcIiBpbiBvYmogJiYgb2JqLmxlbmd0aCxcblx0XHR0eXBlID0galF1ZXJ5LnR5cGUoIG9iaiApO1xuXG5cdGlmICggdHlwZSA9PT0gXCJmdW5jdGlvblwiIHx8IGpRdWVyeS5pc1dpbmRvdyggb2JqICkgKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0cmV0dXJuIHR5cGUgPT09IFwiYXJyYXlcIiB8fCBsZW5ndGggPT09IDAgfHxcblx0XHR0eXBlb2YgbGVuZ3RoID09PSBcIm51bWJlclwiICYmIGxlbmd0aCA+IDAgJiYgKCBsZW5ndGggLSAxICkgaW4gb2JqO1xufVxudmFyIFNpenpsZSA9XG4vKiFcbiAqIFNpenpsZSBDU1MgU2VsZWN0b3IgRW5naW5lIHYyLjIuMVxuICogaHR0cDovL3NpenpsZWpzLmNvbS9cbiAqXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKlxuICogRGF0ZTogMjAxNS0xMC0xN1xuICovXG4oZnVuY3Rpb24oIHdpbmRvdyApIHtcblxudmFyIGksXG5cdHN1cHBvcnQsXG5cdEV4cHIsXG5cdGdldFRleHQsXG5cdGlzWE1MLFxuXHR0b2tlbml6ZSxcblx0Y29tcGlsZSxcblx0c2VsZWN0LFxuXHRvdXRlcm1vc3RDb250ZXh0LFxuXHRzb3J0SW5wdXQsXG5cdGhhc0R1cGxpY2F0ZSxcblxuXHQvLyBMb2NhbCBkb2N1bWVudCB2YXJzXG5cdHNldERvY3VtZW50LFxuXHRkb2N1bWVudCxcblx0ZG9jRWxlbSxcblx0ZG9jdW1lbnRJc0hUTUwsXG5cdHJidWdneVFTQSxcblx0cmJ1Z2d5TWF0Y2hlcyxcblx0bWF0Y2hlcyxcblx0Y29udGFpbnMsXG5cblx0Ly8gSW5zdGFuY2Utc3BlY2lmaWMgZGF0YVxuXHRleHBhbmRvID0gXCJzaXp6bGVcIiArIDEgKiBuZXcgRGF0ZSgpLFxuXHRwcmVmZXJyZWREb2MgPSB3aW5kb3cuZG9jdW1lbnQsXG5cdGRpcnJ1bnMgPSAwLFxuXHRkb25lID0gMCxcblx0Y2xhc3NDYWNoZSA9IGNyZWF0ZUNhY2hlKCksXG5cdHRva2VuQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxuXHRjb21waWxlckNhY2hlID0gY3JlYXRlQ2FjaGUoKSxcblx0c29ydE9yZGVyID0gZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0aWYgKCBhID09PSBiICkge1xuXHRcdFx0aGFzRHVwbGljYXRlID0gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIDA7XG5cdH0sXG5cblx0Ly8gR2VuZXJhbC1wdXJwb3NlIGNvbnN0YW50c1xuXHRNQVhfTkVHQVRJVkUgPSAxIDw8IDMxLFxuXG5cdC8vIEluc3RhbmNlIG1ldGhvZHNcblx0aGFzT3duID0gKHt9KS5oYXNPd25Qcm9wZXJ0eSxcblx0YXJyID0gW10sXG5cdHBvcCA9IGFyci5wb3AsXG5cdHB1c2hfbmF0aXZlID0gYXJyLnB1c2gsXG5cdHB1c2ggPSBhcnIucHVzaCxcblx0c2xpY2UgPSBhcnIuc2xpY2UsXG5cdC8vIFVzZSBhIHN0cmlwcGVkLWRvd24gaW5kZXhPZiBhcyBpdCdzIGZhc3RlciB0aGFuIG5hdGl2ZVxuXHQvLyBodHRwOi8vanNwZXJmLmNvbS90aG9yLWluZGV4b2YtdnMtZm9yLzVcblx0aW5kZXhPZiA9IGZ1bmN0aW9uKCBsaXN0LCBlbGVtICkge1xuXHRcdHZhciBpID0gMCxcblx0XHRcdGxlbiA9IGxpc3QubGVuZ3RoO1xuXHRcdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0aWYgKCBsaXN0W2ldID09PSBlbGVtICkge1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIC0xO1xuXHR9LFxuXG5cdGJvb2xlYW5zID0gXCJjaGVja2VkfHNlbGVjdGVkfGFzeW5jfGF1dG9mb2N1c3xhdXRvcGxheXxjb250cm9sc3xkZWZlcnxkaXNhYmxlZHxoaWRkZW58aXNtYXB8bG9vcHxtdWx0aXBsZXxvcGVufHJlYWRvbmx5fHJlcXVpcmVkfHNjb3BlZFwiLFxuXG5cdC8vIFJlZ3VsYXIgZXhwcmVzc2lvbnNcblxuXHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9jc3MzLXNlbGVjdG9ycy8jd2hpdGVzcGFjZVxuXHR3aGl0ZXNwYWNlID0gXCJbXFxcXHgyMFxcXFx0XFxcXHJcXFxcblxcXFxmXVwiLFxuXG5cdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL0NTUzIxL3N5bmRhdGEuaHRtbCN2YWx1ZS1kZWYtaWRlbnRpZmllclxuXHRpZGVudGlmaWVyID0gXCIoPzpcXFxcXFxcXC58W1xcXFx3LV18W15cXFxceDAwLVxcXFx4YTBdKStcIixcblxuXHQvLyBBdHRyaWJ1dGUgc2VsZWN0b3JzOiBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI2F0dHJpYnV0ZS1zZWxlY3RvcnNcblx0YXR0cmlidXRlcyA9IFwiXFxcXFtcIiArIHdoaXRlc3BhY2UgKyBcIiooXCIgKyBpZGVudGlmaWVyICsgXCIpKD86XCIgKyB3aGl0ZXNwYWNlICtcblx0XHQvLyBPcGVyYXRvciAoY2FwdHVyZSAyKVxuXHRcdFwiKihbKl4kfCF+XT89KVwiICsgd2hpdGVzcGFjZSArXG5cdFx0Ly8gXCJBdHRyaWJ1dGUgdmFsdWVzIG11c3QgYmUgQ1NTIGlkZW50aWZpZXJzIFtjYXB0dXJlIDVdIG9yIHN0cmluZ3MgW2NhcHR1cmUgMyBvciBjYXB0dXJlIDRdXCJcblx0XHRcIiooPzonKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcJ10pKiknfFxcXCIoKD86XFxcXFxcXFwufFteXFxcXFxcXFxcXFwiXSkqKVxcXCJ8KFwiICsgaWRlbnRpZmllciArIFwiKSl8KVwiICsgd2hpdGVzcGFjZSArXG5cdFx0XCIqXFxcXF1cIixcblxuXHRwc2V1ZG9zID0gXCI6KFwiICsgaWRlbnRpZmllciArIFwiKSg/OlxcXFwoKFwiICtcblx0XHQvLyBUbyByZWR1Y2UgdGhlIG51bWJlciBvZiBzZWxlY3RvcnMgbmVlZGluZyB0b2tlbml6ZSBpbiB0aGUgcHJlRmlsdGVyLCBwcmVmZXIgYXJndW1lbnRzOlxuXHRcdC8vIDEuIHF1b3RlZCAoY2FwdHVyZSAzOyBjYXB0dXJlIDQgb3IgY2FwdHVyZSA1KVxuXHRcdFwiKCcoKD86XFxcXFxcXFwufFteXFxcXFxcXFwnXSkqKSd8XFxcIigoPzpcXFxcXFxcXC58W15cXFxcXFxcXFxcXCJdKSopXFxcIil8XCIgK1xuXHRcdC8vIDIuIHNpbXBsZSAoY2FwdHVyZSA2KVxuXHRcdFwiKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcKClbXFxcXF1dfFwiICsgYXR0cmlidXRlcyArIFwiKSopfFwiICtcblx0XHQvLyAzLiBhbnl0aGluZyBlbHNlIChjYXB0dXJlIDIpXG5cdFx0XCIuKlwiICtcblx0XHRcIilcXFxcKXwpXCIsXG5cblx0Ly8gTGVhZGluZyBhbmQgbm9uLWVzY2FwZWQgdHJhaWxpbmcgd2hpdGVzcGFjZSwgY2FwdHVyaW5nIHNvbWUgbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVycyBwcmVjZWRpbmcgdGhlIGxhdHRlclxuXHRyd2hpdGVzcGFjZSA9IG5ldyBSZWdFeHAoIHdoaXRlc3BhY2UgKyBcIitcIiwgXCJnXCIgKSxcblx0cnRyaW0gPSBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgKyBcIit8KCg/Ol58W15cXFxcXFxcXF0pKD86XFxcXFxcXFwuKSopXCIgKyB3aGl0ZXNwYWNlICsgXCIrJFwiLCBcImdcIiApLFxuXG5cdHJjb21tYSA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKixcIiArIHdoaXRlc3BhY2UgKyBcIipcIiApLFxuXHRyY29tYmluYXRvcnMgPSBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgKyBcIiooWz4rfl18XCIgKyB3aGl0ZXNwYWNlICsgXCIpXCIgKyB3aGl0ZXNwYWNlICsgXCIqXCIgKSxcblxuXHRyYXR0cmlidXRlUXVvdGVzID0gbmV3IFJlZ0V4cCggXCI9XCIgKyB3aGl0ZXNwYWNlICsgXCIqKFteXFxcXF0nXFxcIl0qPylcIiArIHdoaXRlc3BhY2UgKyBcIipcXFxcXVwiLCBcImdcIiApLFxuXG5cdHJwc2V1ZG8gPSBuZXcgUmVnRXhwKCBwc2V1ZG9zICksXG5cdHJpZGVudGlmaWVyID0gbmV3IFJlZ0V4cCggXCJeXCIgKyBpZGVudGlmaWVyICsgXCIkXCIgKSxcblxuXHRtYXRjaEV4cHIgPSB7XG5cdFx0XCJJRFwiOiBuZXcgUmVnRXhwKCBcIl4jKFwiICsgaWRlbnRpZmllciArIFwiKVwiICksXG5cdFx0XCJDTEFTU1wiOiBuZXcgUmVnRXhwKCBcIl5cXFxcLihcIiArIGlkZW50aWZpZXIgKyBcIilcIiApLFxuXHRcdFwiVEFHXCI6IG5ldyBSZWdFeHAoIFwiXihcIiArIGlkZW50aWZpZXIgKyBcInxbKl0pXCIgKSxcblx0XHRcIkFUVFJcIjogbmV3IFJlZ0V4cCggXCJeXCIgKyBhdHRyaWJ1dGVzICksXG5cdFx0XCJQU0VVRE9cIjogbmV3IFJlZ0V4cCggXCJeXCIgKyBwc2V1ZG9zICksXG5cdFx0XCJDSElMRFwiOiBuZXcgUmVnRXhwKCBcIl46KG9ubHl8Zmlyc3R8bGFzdHxudGh8bnRoLWxhc3QpLShjaGlsZHxvZi10eXBlKSg/OlxcXFwoXCIgKyB3aGl0ZXNwYWNlICtcblx0XHRcdFwiKihldmVufG9kZHwoKFsrLV18KShcXFxcZCopbnwpXCIgKyB3aGl0ZXNwYWNlICsgXCIqKD86KFsrLV18KVwiICsgd2hpdGVzcGFjZSArXG5cdFx0XHRcIiooXFxcXGQrKXwpKVwiICsgd2hpdGVzcGFjZSArIFwiKlxcXFwpfClcIiwgXCJpXCIgKSxcblx0XHRcImJvb2xcIjogbmV3IFJlZ0V4cCggXCJeKD86XCIgKyBib29sZWFucyArIFwiKSRcIiwgXCJpXCIgKSxcblx0XHQvLyBGb3IgdXNlIGluIGxpYnJhcmllcyBpbXBsZW1lbnRpbmcgLmlzKClcblx0XHQvLyBXZSB1c2UgdGhpcyBmb3IgUE9TIG1hdGNoaW5nIGluIGBzZWxlY3RgXG5cdFx0XCJuZWVkc0NvbnRleHRcIjogbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIqWz4rfl18OihldmVufG9kZHxlcXxndHxsdHxudGh8Zmlyc3R8bGFzdCkoPzpcXFxcKFwiICtcblx0XHRcdHdoaXRlc3BhY2UgKyBcIiooKD86LVxcXFxkKT9cXFxcZCopXCIgKyB3aGl0ZXNwYWNlICsgXCIqXFxcXCl8KSg/PVteLV18JClcIiwgXCJpXCIgKVxuXHR9LFxuXG5cdHJpbnB1dHMgPSAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxidXR0b24pJC9pLFxuXHRyaGVhZGVyID0gL15oXFxkJC9pLFxuXG5cdHJuYXRpdmUgPSAvXltee10rXFx7XFxzKlxcW25hdGl2ZSBcXHcvLFxuXG5cdC8vIEVhc2lseS1wYXJzZWFibGUvcmV0cmlldmFibGUgSUQgb3IgVEFHIG9yIENMQVNTIHNlbGVjdG9yc1xuXHRycXVpY2tFeHByID0gL14oPzojKFtcXHctXSspfChcXHcrKXxcXC4oW1xcdy1dKykpJC8sXG5cblx0cnNpYmxpbmcgPSAvWyt+XS8sXG5cdHJlc2NhcGUgPSAvJ3xcXFxcL2csXG5cblx0Ly8gQ1NTIGVzY2FwZXMgaHR0cDovL3d3dy53My5vcmcvVFIvQ1NTMjEvc3luZGF0YS5odG1sI2VzY2FwZWQtY2hhcmFjdGVyc1xuXHRydW5lc2NhcGUgPSBuZXcgUmVnRXhwKCBcIlxcXFxcXFxcKFtcXFxcZGEtZl17MSw2fVwiICsgd2hpdGVzcGFjZSArIFwiP3woXCIgKyB3aGl0ZXNwYWNlICsgXCIpfC4pXCIsIFwiaWdcIiApLFxuXHRmdW5lc2NhcGUgPSBmdW5jdGlvbiggXywgZXNjYXBlZCwgZXNjYXBlZFdoaXRlc3BhY2UgKSB7XG5cdFx0dmFyIGhpZ2ggPSBcIjB4XCIgKyBlc2NhcGVkIC0gMHgxMDAwMDtcblx0XHQvLyBOYU4gbWVhbnMgbm9uLWNvZGVwb2ludFxuXHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3g8MjRcblx0XHQvLyBXb3JrYXJvdW5kIGVycm9uZW91cyBudW1lcmljIGludGVycHJldGF0aW9uIG9mICtcIjB4XCJcblx0XHRyZXR1cm4gaGlnaCAhPT0gaGlnaCB8fCBlc2NhcGVkV2hpdGVzcGFjZSA/XG5cdFx0XHRlc2NhcGVkIDpcblx0XHRcdGhpZ2ggPCAwID9cblx0XHRcdFx0Ly8gQk1QIGNvZGVwb2ludFxuXHRcdFx0XHRTdHJpbmcuZnJvbUNoYXJDb2RlKCBoaWdoICsgMHgxMDAwMCApIDpcblx0XHRcdFx0Ly8gU3VwcGxlbWVudGFsIFBsYW5lIGNvZGVwb2ludCAoc3Vycm9nYXRlIHBhaXIpXG5cdFx0XHRcdFN0cmluZy5mcm9tQ2hhckNvZGUoIGhpZ2ggPj4gMTAgfCAweEQ4MDAsIGhpZ2ggJiAweDNGRiB8IDB4REMwMCApO1xuXHR9LFxuXG5cdC8vIFVzZWQgZm9yIGlmcmFtZXNcblx0Ly8gU2VlIHNldERvY3VtZW50KClcblx0Ly8gUmVtb3ZpbmcgdGhlIGZ1bmN0aW9uIHdyYXBwZXIgY2F1c2VzIGEgXCJQZXJtaXNzaW9uIERlbmllZFwiXG5cdC8vIGVycm9yIGluIElFXG5cdHVubG9hZEhhbmRsZXIgPSBmdW5jdGlvbigpIHtcblx0XHRzZXREb2N1bWVudCgpO1xuXHR9O1xuXG4vLyBPcHRpbWl6ZSBmb3IgcHVzaC5hcHBseSggXywgTm9kZUxpc3QgKVxudHJ5IHtcblx0cHVzaC5hcHBseShcblx0XHQoYXJyID0gc2xpY2UuY2FsbCggcHJlZmVycmVkRG9jLmNoaWxkTm9kZXMgKSksXG5cdFx0cHJlZmVycmVkRG9jLmNoaWxkTm9kZXNcblx0KTtcblx0Ly8gU3VwcG9ydDogQW5kcm9pZDw0LjBcblx0Ly8gRGV0ZWN0IHNpbGVudGx5IGZhaWxpbmcgcHVzaC5hcHBseVxuXHRhcnJbIHByZWZlcnJlZERvYy5jaGlsZE5vZGVzLmxlbmd0aCBdLm5vZGVUeXBlO1xufSBjYXRjaCAoIGUgKSB7XG5cdHB1c2ggPSB7IGFwcGx5OiBhcnIubGVuZ3RoID9cblxuXHRcdC8vIExldmVyYWdlIHNsaWNlIGlmIHBvc3NpYmxlXG5cdFx0ZnVuY3Rpb24oIHRhcmdldCwgZWxzICkge1xuXHRcdFx0cHVzaF9uYXRpdmUuYXBwbHkoIHRhcmdldCwgc2xpY2UuY2FsbChlbHMpICk7XG5cdFx0fSA6XG5cblx0XHQvLyBTdXBwb3J0OiBJRTw5XG5cdFx0Ly8gT3RoZXJ3aXNlIGFwcGVuZCBkaXJlY3RseVxuXHRcdGZ1bmN0aW9uKCB0YXJnZXQsIGVscyApIHtcblx0XHRcdHZhciBqID0gdGFyZ2V0Lmxlbmd0aCxcblx0XHRcdFx0aSA9IDA7XG5cdFx0XHQvLyBDYW4ndCB0cnVzdCBOb2RlTGlzdC5sZW5ndGhcblx0XHRcdHdoaWxlICggKHRhcmdldFtqKytdID0gZWxzW2krK10pICkge31cblx0XHRcdHRhcmdldC5sZW5ndGggPSBqIC0gMTtcblx0XHR9XG5cdH07XG59XG5cbmZ1bmN0aW9uIFNpenpsZSggc2VsZWN0b3IsIGNvbnRleHQsIHJlc3VsdHMsIHNlZWQgKSB7XG5cdHZhciBtLCBpLCBlbGVtLCBuaWQsIG5pZHNlbGVjdCwgbWF0Y2gsIGdyb3VwcywgbmV3U2VsZWN0b3IsXG5cdFx0bmV3Q29udGV4dCA9IGNvbnRleHQgJiYgY29udGV4dC5vd25lckRvY3VtZW50LFxuXG5cdFx0Ly8gbm9kZVR5cGUgZGVmYXVsdHMgdG8gOSwgc2luY2UgY29udGV4dCBkZWZhdWx0cyB0byBkb2N1bWVudFxuXHRcdG5vZGVUeXBlID0gY29udGV4dCA/IGNvbnRleHQubm9kZVR5cGUgOiA5O1xuXG5cdHJlc3VsdHMgPSByZXN1bHRzIHx8IFtdO1xuXG5cdC8vIFJldHVybiBlYXJseSBmcm9tIGNhbGxzIHdpdGggaW52YWxpZCBzZWxlY3RvciBvciBjb250ZXh0XG5cdGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiIHx8ICFzZWxlY3RvciB8fFxuXHRcdG5vZGVUeXBlICE9PSAxICYmIG5vZGVUeXBlICE9PSA5ICYmIG5vZGVUeXBlICE9PSAxMSApIHtcblxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cblx0Ly8gVHJ5IHRvIHNob3J0Y3V0IGZpbmQgb3BlcmF0aW9ucyAoYXMgb3Bwb3NlZCB0byBmaWx0ZXJzKSBpbiBIVE1MIGRvY3VtZW50c1xuXHRpZiAoICFzZWVkICkge1xuXG5cdFx0aWYgKCAoIGNvbnRleHQgPyBjb250ZXh0Lm93bmVyRG9jdW1lbnQgfHwgY29udGV4dCA6IHByZWZlcnJlZERvYyApICE9PSBkb2N1bWVudCApIHtcblx0XHRcdHNldERvY3VtZW50KCBjb250ZXh0ICk7XG5cdFx0fVxuXHRcdGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xuXG5cdFx0aWYgKCBkb2N1bWVudElzSFRNTCApIHtcblxuXHRcdFx0Ly8gSWYgdGhlIHNlbGVjdG9yIGlzIHN1ZmZpY2llbnRseSBzaW1wbGUsIHRyeSB1c2luZyBhIFwiZ2V0KkJ5KlwiIERPTSBtZXRob2Rcblx0XHRcdC8vIChleGNlcHRpbmcgRG9jdW1lbnRGcmFnbWVudCBjb250ZXh0LCB3aGVyZSB0aGUgbWV0aG9kcyBkb24ndCBleGlzdClcblx0XHRcdGlmICggbm9kZVR5cGUgIT09IDExICYmIChtYXRjaCA9IHJxdWlja0V4cHIuZXhlYyggc2VsZWN0b3IgKSkgKSB7XG5cblx0XHRcdFx0Ly8gSUQgc2VsZWN0b3Jcblx0XHRcdFx0aWYgKCAobSA9IG1hdGNoWzFdKSApIHtcblxuXHRcdFx0XHRcdC8vIERvY3VtZW50IGNvbnRleHRcblx0XHRcdFx0XHRpZiAoIG5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoZWxlbSA9IGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIG0gKSkgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUsIE9wZXJhLCBXZWJraXRcblx0XHRcdFx0XHRcdFx0Ly8gVE9ETzogaWRlbnRpZnkgdmVyc2lvbnNcblx0XHRcdFx0XHRcdFx0Ly8gZ2V0RWxlbWVudEJ5SWQgY2FuIG1hdGNoIGVsZW1lbnRzIGJ5IG5hbWUgaW5zdGVhZCBvZiBJRFxuXHRcdFx0XHRcdFx0XHRpZiAoIGVsZW0uaWQgPT09IG0gKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0cy5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gRWxlbWVudCBjb250ZXh0XG5cdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUsIE9wZXJhLCBXZWJraXRcblx0XHRcdFx0XHRcdC8vIFRPRE86IGlkZW50aWZ5IHZlcnNpb25zXG5cdFx0XHRcdFx0XHQvLyBnZXRFbGVtZW50QnlJZCBjYW4gbWF0Y2ggZWxlbWVudHMgYnkgbmFtZSBpbnN0ZWFkIG9mIElEXG5cdFx0XHRcdFx0XHRpZiAoIG5ld0NvbnRleHQgJiYgKGVsZW0gPSBuZXdDb250ZXh0LmdldEVsZW1lbnRCeUlkKCBtICkpICYmXG5cdFx0XHRcdFx0XHRcdGNvbnRhaW5zKCBjb250ZXh0LCBlbGVtICkgJiZcblx0XHRcdFx0XHRcdFx0ZWxlbS5pZCA9PT0gbSApIHtcblxuXHRcdFx0XHRcdFx0XHRyZXN1bHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFR5cGUgc2VsZWN0b3Jcblx0XHRcdFx0fSBlbHNlIGlmICggbWF0Y2hbMl0gKSB7XG5cdFx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggc2VsZWN0b3IgKSApO1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXG5cdFx0XHRcdC8vIENsYXNzIHNlbGVjdG9yXG5cdFx0XHRcdH0gZWxzZSBpZiAoIChtID0gbWF0Y2hbM10pICYmIHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSAmJlxuXHRcdFx0XHRcdGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSApIHtcblxuXHRcdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggbSApICk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gVGFrZSBhZHZhbnRhZ2Ugb2YgcXVlcnlTZWxlY3RvckFsbFxuXHRcdFx0aWYgKCBzdXBwb3J0LnFzYSAmJlxuXHRcdFx0XHQhY29tcGlsZXJDYWNoZVsgc2VsZWN0b3IgKyBcIiBcIiBdICYmXG5cdFx0XHRcdCghcmJ1Z2d5UVNBIHx8ICFyYnVnZ3lRU0EudGVzdCggc2VsZWN0b3IgKSkgKSB7XG5cblx0XHRcdFx0aWYgKCBub2RlVHlwZSAhPT0gMSApIHtcblx0XHRcdFx0XHRuZXdDb250ZXh0ID0gY29udGV4dDtcblx0XHRcdFx0XHRuZXdTZWxlY3RvciA9IHNlbGVjdG9yO1xuXG5cdFx0XHRcdC8vIHFTQSBsb29rcyBvdXRzaWRlIEVsZW1lbnQgY29udGV4dCwgd2hpY2ggaXMgbm90IHdoYXQgd2Ugd2FudFxuXHRcdFx0XHQvLyBUaGFua3MgdG8gQW5kcmV3IER1cG9udCBmb3IgdGhpcyB3b3JrYXJvdW5kIHRlY2huaXF1ZVxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8PThcblx0XHRcdFx0Ly8gRXhjbHVkZSBvYmplY3QgZWxlbWVudHNcblx0XHRcdFx0fSBlbHNlIGlmICggY29udGV4dC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICE9PSBcIm9iamVjdFwiICkge1xuXG5cdFx0XHRcdFx0Ly8gQ2FwdHVyZSB0aGUgY29udGV4dCBJRCwgc2V0dGluZyBpdCBmaXJzdCBpZiBuZWNlc3Nhcnlcblx0XHRcdFx0XHRpZiAoIChuaWQgPSBjb250ZXh0LmdldEF0dHJpYnV0ZSggXCJpZFwiICkpICkge1xuXHRcdFx0XHRcdFx0bmlkID0gbmlkLnJlcGxhY2UoIHJlc2NhcGUsIFwiXFxcXCQmXCIgKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29udGV4dC5zZXRBdHRyaWJ1dGUoIFwiaWRcIiwgKG5pZCA9IGV4cGFuZG8pICk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gUHJlZml4IGV2ZXJ5IHNlbGVjdG9yIGluIHRoZSBsaXN0XG5cdFx0XHRcdFx0Z3JvdXBzID0gdG9rZW5pemUoIHNlbGVjdG9yICk7XG5cdFx0XHRcdFx0aSA9IGdyb3Vwcy5sZW5ndGg7XG5cdFx0XHRcdFx0bmlkc2VsZWN0ID0gcmlkZW50aWZpZXIudGVzdCggbmlkICkgPyBcIiNcIiArIG5pZCA6IFwiW2lkPSdcIiArIG5pZCArIFwiJ11cIjtcblx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdGdyb3Vwc1tpXSA9IG5pZHNlbGVjdCArIFwiIFwiICsgdG9TZWxlY3RvciggZ3JvdXBzW2ldICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG5ld1NlbGVjdG9yID0gZ3JvdXBzLmpvaW4oIFwiLFwiICk7XG5cblx0XHRcdFx0XHQvLyBFeHBhbmQgY29udGV4dCBmb3Igc2libGluZyBzZWxlY3RvcnNcblx0XHRcdFx0XHRuZXdDb250ZXh0ID0gcnNpYmxpbmcudGVzdCggc2VsZWN0b3IgKSAmJiB0ZXN0Q29udGV4dCggY29udGV4dC5wYXJlbnROb2RlICkgfHxcblx0XHRcdFx0XHRcdGNvbnRleHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIG5ld1NlbGVjdG9yICkge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLFxuXHRcdFx0XHRcdFx0XHRuZXdDb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIG5ld1NlbGVjdG9yIClcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0XHR9IGNhdGNoICggcXNhRXJyb3IgKSB7XG5cdFx0XHRcdFx0fSBmaW5hbGx5IHtcblx0XHRcdFx0XHRcdGlmICggbmlkID09PSBleHBhbmRvICkge1xuXHRcdFx0XHRcdFx0XHRjb250ZXh0LnJlbW92ZUF0dHJpYnV0ZSggXCJpZFwiICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gQWxsIG90aGVyc1xuXHRyZXR1cm4gc2VsZWN0KCBzZWxlY3Rvci5yZXBsYWNlKCBydHJpbSwgXCIkMVwiICksIGNvbnRleHQsIHJlc3VsdHMsIHNlZWQgKTtcbn1cblxuLyoqXG4gKiBDcmVhdGUga2V5LXZhbHVlIGNhY2hlcyBvZiBsaW1pdGVkIHNpemVcbiAqIEByZXR1cm5zIHtmdW5jdGlvbihzdHJpbmcsIG9iamVjdCl9IFJldHVybnMgdGhlIE9iamVjdCBkYXRhIGFmdGVyIHN0b3JpbmcgaXQgb24gaXRzZWxmIHdpdGhcbiAqXHRwcm9wZXJ0eSBuYW1lIHRoZSAoc3BhY2Utc3VmZml4ZWQpIHN0cmluZyBhbmQgKGlmIHRoZSBjYWNoZSBpcyBsYXJnZXIgdGhhbiBFeHByLmNhY2hlTGVuZ3RoKVxuICpcdGRlbGV0aW5nIHRoZSBvbGRlc3QgZW50cnlcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ2FjaGUoKSB7XG5cdHZhciBrZXlzID0gW107XG5cblx0ZnVuY3Rpb24gY2FjaGUoIGtleSwgdmFsdWUgKSB7XG5cdFx0Ly8gVXNlIChrZXkgKyBcIiBcIikgdG8gYXZvaWQgY29sbGlzaW9uIHdpdGggbmF0aXZlIHByb3RvdHlwZSBwcm9wZXJ0aWVzIChzZWUgSXNzdWUgIzE1Nylcblx0XHRpZiAoIGtleXMucHVzaCgga2V5ICsgXCIgXCIgKSA+IEV4cHIuY2FjaGVMZW5ndGggKSB7XG5cdFx0XHQvLyBPbmx5IGtlZXAgdGhlIG1vc3QgcmVjZW50IGVudHJpZXNcblx0XHRcdGRlbGV0ZSBjYWNoZVsga2V5cy5zaGlmdCgpIF07XG5cdFx0fVxuXHRcdHJldHVybiAoY2FjaGVbIGtleSArIFwiIFwiIF0gPSB2YWx1ZSk7XG5cdH1cblx0cmV0dXJuIGNhY2hlO1xufVxuXG4vKipcbiAqIE1hcmsgYSBmdW5jdGlvbiBmb3Igc3BlY2lhbCB1c2UgYnkgU2l6emxlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gbWFya1xuICovXG5mdW5jdGlvbiBtYXJrRnVuY3Rpb24oIGZuICkge1xuXHRmblsgZXhwYW5kbyBdID0gdHJ1ZTtcblx0cmV0dXJuIGZuO1xufVxuXG4vKipcbiAqIFN1cHBvcnQgdGVzdGluZyB1c2luZyBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBQYXNzZWQgdGhlIGNyZWF0ZWQgZGl2IGFuZCBleHBlY3RzIGEgYm9vbGVhbiByZXN1bHRcbiAqL1xuZnVuY3Rpb24gYXNzZXJ0KCBmbiApIHtcblx0dmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cblx0dHJ5IHtcblx0XHRyZXR1cm4gISFmbiggZGl2ICk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0gZmluYWxseSB7XG5cdFx0Ly8gUmVtb3ZlIGZyb20gaXRzIHBhcmVudCBieSBkZWZhdWx0XG5cdFx0aWYgKCBkaXYucGFyZW50Tm9kZSApIHtcblx0XHRcdGRpdi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBkaXYgKTtcblx0XHR9XG5cdFx0Ly8gcmVsZWFzZSBtZW1vcnkgaW4gSUVcblx0XHRkaXYgPSBudWxsO1xuXHR9XG59XG5cbi8qKlxuICogQWRkcyB0aGUgc2FtZSBoYW5kbGVyIGZvciBhbGwgb2YgdGhlIHNwZWNpZmllZCBhdHRyc1xuICogQHBhcmFtIHtTdHJpbmd9IGF0dHJzIFBpcGUtc2VwYXJhdGVkIGxpc3Qgb2YgYXR0cmlidXRlc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlciBUaGUgbWV0aG9kIHRoYXQgd2lsbCBiZSBhcHBsaWVkXG4gKi9cbmZ1bmN0aW9uIGFkZEhhbmRsZSggYXR0cnMsIGhhbmRsZXIgKSB7XG5cdHZhciBhcnIgPSBhdHRycy5zcGxpdChcInxcIiksXG5cdFx0aSA9IGFyci5sZW5ndGg7XG5cblx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0RXhwci5hdHRySGFuZGxlWyBhcnJbaV0gXSA9IGhhbmRsZXI7XG5cdH1cbn1cblxuLyoqXG4gKiBDaGVja3MgZG9jdW1lbnQgb3JkZXIgb2YgdHdvIHNpYmxpbmdzXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGFcbiAqIEBwYXJhbSB7RWxlbWVudH0gYlxuICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyBsZXNzIHRoYW4gMCBpZiBhIHByZWNlZGVzIGIsIGdyZWF0ZXIgdGhhbiAwIGlmIGEgZm9sbG93cyBiXG4gKi9cbmZ1bmN0aW9uIHNpYmxpbmdDaGVjayggYSwgYiApIHtcblx0dmFyIGN1ciA9IGIgJiYgYSxcblx0XHRkaWZmID0gY3VyICYmIGEubm9kZVR5cGUgPT09IDEgJiYgYi5ub2RlVHlwZSA9PT0gMSAmJlxuXHRcdFx0KCB+Yi5zb3VyY2VJbmRleCB8fCBNQVhfTkVHQVRJVkUgKSAtXG5cdFx0XHQoIH5hLnNvdXJjZUluZGV4IHx8IE1BWF9ORUdBVElWRSApO1xuXG5cdC8vIFVzZSBJRSBzb3VyY2VJbmRleCBpZiBhdmFpbGFibGUgb24gYm90aCBub2Rlc1xuXHRpZiAoIGRpZmYgKSB7XG5cdFx0cmV0dXJuIGRpZmY7XG5cdH1cblxuXHQvLyBDaGVjayBpZiBiIGZvbGxvd3MgYVxuXHRpZiAoIGN1ciApIHtcblx0XHR3aGlsZSAoIChjdXIgPSBjdXIubmV4dFNpYmxpbmcpICkge1xuXHRcdFx0aWYgKCBjdXIgPT09IGIgKSB7XG5cdFx0XHRcdHJldHVybiAtMTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gYSA/IDEgOiAtMTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIGlucHV0IHR5cGVzXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICovXG5mdW5jdGlvbiBjcmVhdGVJbnB1dFBzZXVkbyggdHlwZSApIHtcblx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdHJldHVybiBuYW1lID09PSBcImlucHV0XCIgJiYgZWxlbS50eXBlID09PSB0eXBlO1xuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgYnV0dG9uc1xuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQnV0dG9uUHNldWRvKCB0eXBlICkge1xuXHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0dmFyIG5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0cmV0dXJuIChuYW1lID09PSBcImlucHV0XCIgfHwgbmFtZSA9PT0gXCJidXR0b25cIikgJiYgZWxlbS50eXBlID09PSB0eXBlO1xuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgcG9zaXRpb25hbHNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oIGZuICkge1xuXHRyZXR1cm4gbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBhcmd1bWVudCApIHtcblx0XHRhcmd1bWVudCA9ICthcmd1bWVudDtcblx0XHRyZXR1cm4gbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWVkLCBtYXRjaGVzICkge1xuXHRcdFx0dmFyIGosXG5cdFx0XHRcdG1hdGNoSW5kZXhlcyA9IGZuKCBbXSwgc2VlZC5sZW5ndGgsIGFyZ3VtZW50ICksXG5cdFx0XHRcdGkgPSBtYXRjaEluZGV4ZXMubGVuZ3RoO1xuXG5cdFx0XHQvLyBNYXRjaCBlbGVtZW50cyBmb3VuZCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4ZXNcblx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRpZiAoIHNlZWRbIChqID0gbWF0Y2hJbmRleGVzW2ldKSBdICkge1xuXHRcdFx0XHRcdHNlZWRbal0gPSAhKG1hdGNoZXNbal0gPSBzZWVkW2pdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgYSBub2RlIGZvciB2YWxpZGl0eSBhcyBhIFNpenpsZSBjb250ZXh0XG4gKiBAcGFyYW0ge0VsZW1lbnR8T2JqZWN0PX0gY29udGV4dFxuICogQHJldHVybnMge0VsZW1lbnR8T2JqZWN0fEJvb2xlYW59IFRoZSBpbnB1dCBub2RlIGlmIGFjY2VwdGFibGUsIG90aGVyd2lzZSBhIGZhbHN5IHZhbHVlXG4gKi9cbmZ1bmN0aW9uIHRlc3RDb250ZXh0KCBjb250ZXh0ICkge1xuXHRyZXR1cm4gY29udGV4dCAmJiB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb250ZXh0O1xufVxuXG4vLyBFeHBvc2Ugc3VwcG9ydCB2YXJzIGZvciBjb252ZW5pZW5jZVxuc3VwcG9ydCA9IFNpenpsZS5zdXBwb3J0ID0ge307XG5cbi8qKlxuICogRGV0ZWN0cyBYTUwgbm9kZXNcbiAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3R9IGVsZW0gQW4gZWxlbWVudCBvciBhIGRvY3VtZW50XG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZmYgZWxlbSBpcyBhIG5vbi1IVE1MIFhNTCBub2RlXG4gKi9cbmlzWE1MID0gU2l6emxlLmlzWE1MID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdC8vIGRvY3VtZW50RWxlbWVudCBpcyB2ZXJpZmllZCBmb3IgY2FzZXMgd2hlcmUgaXQgZG9lc24ndCB5ZXQgZXhpc3Rcblx0Ly8gKHN1Y2ggYXMgbG9hZGluZyBpZnJhbWVzIGluIElFIC0gIzQ4MzMpXG5cdHZhciBkb2N1bWVudEVsZW1lbnQgPSBlbGVtICYmIChlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSkuZG9jdW1lbnRFbGVtZW50O1xuXHRyZXR1cm4gZG9jdW1lbnRFbGVtZW50ID8gZG9jdW1lbnRFbGVtZW50Lm5vZGVOYW1lICE9PSBcIkhUTUxcIiA6IGZhbHNlO1xufTtcblxuLyoqXG4gKiBTZXRzIGRvY3VtZW50LXJlbGF0ZWQgdmFyaWFibGVzIG9uY2UgYmFzZWQgb24gdGhlIGN1cnJlbnQgZG9jdW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3R9IFtkb2NdIEFuIGVsZW1lbnQgb3IgZG9jdW1lbnQgb2JqZWN0IHRvIHVzZSB0byBzZXQgdGhlIGRvY3VtZW50XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjdXJyZW50IGRvY3VtZW50XG4gKi9cbnNldERvY3VtZW50ID0gU2l6emxlLnNldERvY3VtZW50ID0gZnVuY3Rpb24oIG5vZGUgKSB7XG5cdHZhciBoYXNDb21wYXJlLCBwYXJlbnQsXG5cdFx0ZG9jID0gbm9kZSA/IG5vZGUub3duZXJEb2N1bWVudCB8fCBub2RlIDogcHJlZmVycmVkRG9jO1xuXG5cdC8vIFJldHVybiBlYXJseSBpZiBkb2MgaXMgaW52YWxpZCBvciBhbHJlYWR5IHNlbGVjdGVkXG5cdGlmICggZG9jID09PSBkb2N1bWVudCB8fCBkb2Mubm9kZVR5cGUgIT09IDkgfHwgIWRvYy5kb2N1bWVudEVsZW1lbnQgKSB7XG5cdFx0cmV0dXJuIGRvY3VtZW50O1xuXHR9XG5cblx0Ly8gVXBkYXRlIGdsb2JhbCB2YXJpYWJsZXNcblx0ZG9jdW1lbnQgPSBkb2M7XG5cdGRvY0VsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cdGRvY3VtZW50SXNIVE1MID0gIWlzWE1MKCBkb2N1bWVudCApO1xuXG5cdC8vIFN1cHBvcnQ6IElFIDktMTEsIEVkZ2Vcblx0Ly8gQWNjZXNzaW5nIGlmcmFtZSBkb2N1bWVudHMgYWZ0ZXIgdW5sb2FkIHRocm93cyBcInBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3JzIChqUXVlcnkgIzEzOTM2KVxuXHRpZiAoIChwYXJlbnQgPSBkb2N1bWVudC5kZWZhdWx0VmlldykgJiYgcGFyZW50LnRvcCAhPT0gcGFyZW50ICkge1xuXHRcdC8vIFN1cHBvcnQ6IElFIDExXG5cdFx0aWYgKCBwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lciApIHtcblx0XHRcdHBhcmVudC5hZGRFdmVudExpc3RlbmVyKCBcInVubG9hZFwiLCB1bmxvYWRIYW5kbGVyLCBmYWxzZSApO1xuXG5cdFx0Ly8gU3VwcG9ydDogSUUgOSAtIDEwIG9ubHlcblx0XHR9IGVsc2UgaWYgKCBwYXJlbnQuYXR0YWNoRXZlbnQgKSB7XG5cdFx0XHRwYXJlbnQuYXR0YWNoRXZlbnQoIFwib251bmxvYWRcIiwgdW5sb2FkSGFuZGxlciApO1xuXHRcdH1cblx0fVxuXG5cdC8qIEF0dHJpYnV0ZXNcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdC8vIFN1cHBvcnQ6IElFPDhcblx0Ly8gVmVyaWZ5IHRoYXQgZ2V0QXR0cmlidXRlIHJlYWxseSByZXR1cm5zIGF0dHJpYnV0ZXMgYW5kIG5vdCBwcm9wZXJ0aWVzXG5cdC8vIChleGNlcHRpbmcgSUU4IGJvb2xlYW5zKVxuXHRzdXBwb3J0LmF0dHJpYnV0ZXMgPSBhc3NlcnQoZnVuY3Rpb24oIGRpdiApIHtcblx0XHRkaXYuY2xhc3NOYW1lID0gXCJpXCI7XG5cdFx0cmV0dXJuICFkaXYuZ2V0QXR0cmlidXRlKFwiY2xhc3NOYW1lXCIpO1xuXHR9KTtcblxuXHQvKiBnZXRFbGVtZW50KHMpQnkqXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXHQvLyBDaGVjayBpZiBnZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIikgcmV0dXJucyBvbmx5IGVsZW1lbnRzXG5cdHN1cHBvcnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgPSBhc3NlcnQoZnVuY3Rpb24oIGRpdiApIHtcblx0XHRkaXYuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoXCJcIikgKTtcblx0XHRyZXR1cm4gIWRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIikubGVuZ3RoO1xuXHR9KTtcblxuXHQvLyBTdXBwb3J0OiBJRTw5XG5cdHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSA9IHJuYXRpdmUudGVzdCggZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSApO1xuXG5cdC8vIFN1cHBvcnQ6IElFPDEwXG5cdC8vIENoZWNrIGlmIGdldEVsZW1lbnRCeUlkIHJldHVybnMgZWxlbWVudHMgYnkgbmFtZVxuXHQvLyBUaGUgYnJva2VuIGdldEVsZW1lbnRCeUlkIG1ldGhvZHMgZG9uJ3QgcGljayB1cCBwcm9ncmFtYXRpY2FsbHktc2V0IG5hbWVzLFxuXHQvLyBzbyB1c2UgYSByb3VuZGFib3V0IGdldEVsZW1lbnRzQnlOYW1lIHRlc3Rcblx0c3VwcG9ydC5nZXRCeUlkID0gYXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG5cdFx0ZG9jRWxlbS5hcHBlbmRDaGlsZCggZGl2ICkuaWQgPSBleHBhbmRvO1xuXHRcdHJldHVybiAhZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUgfHwgIWRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCBleHBhbmRvICkubGVuZ3RoO1xuXHR9KTtcblxuXHQvLyBJRCBmaW5kIGFuZCBmaWx0ZXJcblx0aWYgKCBzdXBwb3J0LmdldEJ5SWQgKSB7XG5cdFx0RXhwci5maW5kW1wiSURcIl0gPSBmdW5jdGlvbiggaWQsIGNvbnRleHQgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRCeUlkICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50SXNIVE1MICkge1xuXHRcdFx0XHR2YXIgbSA9IGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIGlkICk7XG5cdFx0XHRcdHJldHVybiBtID8gWyBtIF0gOiBbXTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdEV4cHIuZmlsdGVyW1wiSURcIl0gPSBmdW5jdGlvbiggaWQgKSB7XG5cdFx0XHR2YXIgYXR0cklkID0gaWQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0cmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKFwiaWRcIikgPT09IGF0dHJJZDtcblx0XHRcdH07XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHQvLyBTdXBwb3J0OiBJRTYvN1xuXHRcdC8vIGdldEVsZW1lbnRCeUlkIGlzIG5vdCByZWxpYWJsZSBhcyBhIGZpbmQgc2hvcnRjdXRcblx0XHRkZWxldGUgRXhwci5maW5kW1wiSURcIl07XG5cblx0XHRFeHByLmZpbHRlcltcIklEXCJdID0gIGZ1bmN0aW9uKCBpZCApIHtcblx0XHRcdHZhciBhdHRySWQgPSBpZC5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHR2YXIgbm9kZSA9IHR5cGVvZiBlbGVtLmdldEF0dHJpYnV0ZU5vZGUgIT09IFwidW5kZWZpbmVkXCIgJiZcblx0XHRcdFx0XHRlbGVtLmdldEF0dHJpYnV0ZU5vZGUoXCJpZFwiKTtcblx0XHRcdFx0cmV0dXJuIG5vZGUgJiYgbm9kZS52YWx1ZSA9PT0gYXR0cklkO1xuXHRcdFx0fTtcblx0XHR9O1xuXHR9XG5cblx0Ly8gVGFnXG5cdEV4cHIuZmluZFtcIlRBR1wiXSA9IHN1cHBvcnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgP1xuXHRcdGZ1bmN0aW9uKCB0YWcsIGNvbnRleHQgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lICE9PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggdGFnICk7XG5cblx0XHRcdC8vIERvY3VtZW50RnJhZ21lbnQgbm9kZXMgZG9uJ3QgaGF2ZSBnRUJUTlxuXHRcdFx0fSBlbHNlIGlmICggc3VwcG9ydC5xc2EgKSB7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIHRhZyApO1xuXHRcdFx0fVxuXHRcdH0gOlxuXG5cdFx0ZnVuY3Rpb24oIHRhZywgY29udGV4dCApIHtcblx0XHRcdHZhciBlbGVtLFxuXHRcdFx0XHR0bXAgPSBbXSxcblx0XHRcdFx0aSA9IDAsXG5cdFx0XHRcdC8vIEJ5IGhhcHB5IGNvaW5jaWRlbmNlLCBhIChicm9rZW4pIGdFQlROIGFwcGVhcnMgb24gRG9jdW1lbnRGcmFnbWVudCBub2RlcyB0b29cblx0XHRcdFx0cmVzdWx0cyA9IGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIHRhZyApO1xuXG5cdFx0XHQvLyBGaWx0ZXIgb3V0IHBvc3NpYmxlIGNvbW1lbnRzXG5cdFx0XHRpZiAoIHRhZyA9PT0gXCIqXCIgKSB7XG5cdFx0XHRcdHdoaWxlICggKGVsZW0gPSByZXN1bHRzW2krK10pICkge1xuXHRcdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdFx0XHRcdHRtcC5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRtcDtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdH07XG5cblx0Ly8gQ2xhc3Ncblx0RXhwci5maW5kW1wiQ0xBU1NcIl0gPSBzdXBwb3J0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgJiYgZnVuY3Rpb24oIGNsYXNzTmFtZSwgY29udGV4dCApIHtcblx0XHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnRJc0hUTUwgKSB7XG5cdFx0XHRyZXR1cm4gY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBjbGFzc05hbWUgKTtcblx0XHR9XG5cdH07XG5cblx0LyogUVNBL21hdGNoZXNTZWxlY3RvclxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0Ly8gUVNBIGFuZCBtYXRjaGVzU2VsZWN0b3Igc3VwcG9ydFxuXG5cdC8vIG1hdGNoZXNTZWxlY3Rvcig6YWN0aXZlKSByZXBvcnRzIGZhbHNlIHdoZW4gdHJ1ZSAoSUU5L09wZXJhIDExLjUpXG5cdHJidWdneU1hdGNoZXMgPSBbXTtcblxuXHQvLyBxU2EoOmZvY3VzKSByZXBvcnRzIGZhbHNlIHdoZW4gdHJ1ZSAoQ2hyb21lIDIxKVxuXHQvLyBXZSBhbGxvdyB0aGlzIGJlY2F1c2Ugb2YgYSBidWcgaW4gSUU4LzkgdGhhdCB0aHJvd3MgYW4gZXJyb3Jcblx0Ly8gd2hlbmV2ZXIgYGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRgIGlzIGFjY2Vzc2VkIG9uIGFuIGlmcmFtZVxuXHQvLyBTbywgd2UgYWxsb3cgOmZvY3VzIHRvIHBhc3MgdGhyb3VnaCBRU0EgYWxsIHRoZSB0aW1lIHRvIGF2b2lkIHRoZSBJRSBlcnJvclxuXHQvLyBTZWUgaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTMzNzhcblx0cmJ1Z2d5UVNBID0gW107XG5cblx0aWYgKCAoc3VwcG9ydC5xc2EgPSBybmF0aXZlLnRlc3QoIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwgKSkgKSB7XG5cdFx0Ly8gQnVpbGQgUVNBIHJlZ2V4XG5cdFx0Ly8gUmVnZXggc3RyYXRlZ3kgYWRvcHRlZCBmcm9tIERpZWdvIFBlcmluaVxuXHRcdGFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuXHRcdFx0Ly8gU2VsZWN0IGlzIHNldCB0byBlbXB0eSBzdHJpbmcgb24gcHVycG9zZVxuXHRcdFx0Ly8gVGhpcyBpcyB0byB0ZXN0IElFJ3MgdHJlYXRtZW50IG9mIG5vdCBleHBsaWNpdGx5XG5cdFx0XHQvLyBzZXR0aW5nIGEgYm9vbGVhbiBjb250ZW50IGF0dHJpYnV0ZSxcblx0XHRcdC8vIHNpbmNlIGl0cyBwcmVzZW5jZSBzaG91bGQgYmUgZW5vdWdoXG5cdFx0XHQvLyBodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMjM1OVxuXHRcdFx0ZG9jRWxlbS5hcHBlbmRDaGlsZCggZGl2ICkuaW5uZXJIVE1MID0gXCI8YSBpZD0nXCIgKyBleHBhbmRvICsgXCInPjwvYT5cIiArXG5cdFx0XHRcdFwiPHNlbGVjdCBpZD0nXCIgKyBleHBhbmRvICsgXCItXFxyXFxcXCcgbXNhbGxvd2NhcHR1cmU9Jyc+XCIgK1xuXHRcdFx0XHRcIjxvcHRpb24gc2VsZWN0ZWQ9Jyc+PC9vcHRpb24+PC9zZWxlY3Q+XCI7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFOCwgT3BlcmEgMTEtMTIuMTZcblx0XHRcdC8vIE5vdGhpbmcgc2hvdWxkIGJlIHNlbGVjdGVkIHdoZW4gZW1wdHkgc3RyaW5ncyBmb2xsb3cgXj0gb3IgJD0gb3IgKj1cblx0XHRcdC8vIFRoZSB0ZXN0IGF0dHJpYnV0ZSBtdXN0IGJlIHVua25vd24gaW4gT3BlcmEgYnV0IFwic2FmZVwiIGZvciBXaW5SVFxuXHRcdFx0Ly8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL2hoNDY1Mzg4LmFzcHgjYXR0cmlidXRlX3NlY3Rpb25cblx0XHRcdGlmICggZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbbXNhbGxvd2NhcHR1cmVePScnXVwiKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIlsqXiRdPVwiICsgd2hpdGVzcGFjZSArIFwiKig/OicnfFxcXCJcXFwiKVwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFOFxuXHRcdFx0Ly8gQm9vbGVhbiBhdHRyaWJ1dGVzIGFuZCBcInZhbHVlXCIgYXJlIG5vdCB0cmVhdGVkIGNvcnJlY3RseVxuXHRcdFx0aWYgKCAhZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbc2VsZWN0ZWRdXCIpLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiXFxcXFtcIiArIHdoaXRlc3BhY2UgKyBcIiooPzp2YWx1ZXxcIiArIGJvb2xlYW5zICsgXCIpXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogQ2hyb21lPDI5LCBBbmRyb2lkPDQuNCwgU2FmYXJpPDcuMCssIGlPUzw3LjArLCBQaGFudG9tSlM8MS45LjgrXG5cdFx0XHRpZiAoICFkaXYucXVlcnlTZWxlY3RvckFsbCggXCJbaWR+PVwiICsgZXhwYW5kbyArIFwiLV1cIiApLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goXCJ+PVwiKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gV2Via2l0L09wZXJhIC0gOmNoZWNrZWQgc2hvdWxkIHJldHVybiBzZWxlY3RlZCBvcHRpb24gZWxlbWVudHNcblx0XHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTEvUkVDLWNzczMtc2VsZWN0b3JzLTIwMTEwOTI5LyNjaGVja2VkXG5cdFx0XHQvLyBJRTggdGhyb3dzIGVycm9yIGhlcmUgYW5kIHdpbGwgbm90IHNlZSBsYXRlciB0ZXN0c1xuXHRcdFx0aWYgKCAhZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCI6Y2hlY2tlZFwiKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKFwiOmNoZWNrZWRcIik7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IFNhZmFyaSA4KywgaU9TIDgrXG5cdFx0XHQvLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTM2ODUxXG5cdFx0XHQvLyBJbi1wYWdlIGBzZWxlY3RvciNpZCBzaWJpbmctY29tYmluYXRvciBzZWxlY3RvcmAgZmFpbHNcblx0XHRcdGlmICggIWRpdi5xdWVyeVNlbGVjdG9yQWxsKCBcImEjXCIgKyBleHBhbmRvICsgXCIrKlwiICkubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaChcIi4jLitbK35dXCIpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0YXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG5cdFx0XHQvLyBTdXBwb3J0OiBXaW5kb3dzIDggTmF0aXZlIEFwcHNcblx0XHRcdC8vIFRoZSB0eXBlIGFuZCBuYW1lIGF0dHJpYnV0ZXMgYXJlIHJlc3RyaWN0ZWQgZHVyaW5nIC5pbm5lckhUTUwgYXNzaWdubWVudFxuXHRcdFx0dmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuXHRcdFx0aW5wdXQuc2V0QXR0cmlidXRlKCBcInR5cGVcIiwgXCJoaWRkZW5cIiApO1xuXHRcdFx0ZGl2LmFwcGVuZENoaWxkKCBpbnB1dCApLnNldEF0dHJpYnV0ZSggXCJuYW1lXCIsIFwiRFwiICk7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFOFxuXHRcdFx0Ly8gRW5mb3JjZSBjYXNlLXNlbnNpdGl2aXR5IG9mIG5hbWUgYXR0cmlidXRlXG5cdFx0XHRpZiAoIGRpdi5xdWVyeVNlbGVjdG9yQWxsKFwiW25hbWU9ZF1cIikubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCJuYW1lXCIgKyB3aGl0ZXNwYWNlICsgXCIqWypeJHwhfl0/PVwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZGIDMuNSAtIDplbmFibGVkLzpkaXNhYmxlZCBhbmQgaGlkZGVuIGVsZW1lbnRzIChoaWRkZW4gZWxlbWVudHMgYXJlIHN0aWxsIGVuYWJsZWQpXG5cdFx0XHQvLyBJRTggdGhyb3dzIGVycm9yIGhlcmUgYW5kIHdpbGwgbm90IHNlZSBsYXRlciB0ZXN0c1xuXHRcdFx0aWYgKCAhZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCI6ZW5hYmxlZFwiKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIjplbmFibGVkXCIsIFwiOmRpc2FibGVkXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gT3BlcmEgMTAtMTEgZG9lcyBub3QgdGhyb3cgb24gcG9zdC1jb21tYSBpbnZhbGlkIHBzZXVkb3Ncblx0XHRcdGRpdi5xdWVyeVNlbGVjdG9yQWxsKFwiKiw6eFwiKTtcblx0XHRcdHJidWdneVFTQS5wdXNoKFwiLC4qOlwiKTtcblx0XHR9KTtcblx0fVxuXG5cdGlmICggKHN1cHBvcnQubWF0Y2hlc1NlbGVjdG9yID0gcm5hdGl2ZS50ZXN0KCAobWF0Y2hlcyA9IGRvY0VsZW0ubWF0Y2hlcyB8fFxuXHRcdGRvY0VsZW0ud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0ZG9jRWxlbS5tb3pNYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRkb2NFbGVtLm9NYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRkb2NFbGVtLm1zTWF0Y2hlc1NlbGVjdG9yKSApKSApIHtcblxuXHRcdGFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuXHRcdFx0Ly8gQ2hlY2sgdG8gc2VlIGlmIGl0J3MgcG9zc2libGUgdG8gZG8gbWF0Y2hlc1NlbGVjdG9yXG5cdFx0XHQvLyBvbiBhIGRpc2Nvbm5lY3RlZCBub2RlIChJRSA5KVxuXHRcdFx0c3VwcG9ydC5kaXNjb25uZWN0ZWRNYXRjaCA9IG1hdGNoZXMuY2FsbCggZGl2LCBcImRpdlwiICk7XG5cblx0XHRcdC8vIFRoaXMgc2hvdWxkIGZhaWwgd2l0aCBhbiBleGNlcHRpb25cblx0XHRcdC8vIEdlY2tvIGRvZXMgbm90IGVycm9yLCByZXR1cm5zIGZhbHNlIGluc3RlYWRcblx0XHRcdG1hdGNoZXMuY2FsbCggZGl2LCBcIltzIT0nJ106eFwiICk7XG5cdFx0XHRyYnVnZ3lNYXRjaGVzLnB1c2goIFwiIT1cIiwgcHNldWRvcyApO1xuXHRcdH0pO1xuXHR9XG5cblx0cmJ1Z2d5UVNBID0gcmJ1Z2d5UVNBLmxlbmd0aCAmJiBuZXcgUmVnRXhwKCByYnVnZ3lRU0Euam9pbihcInxcIikgKTtcblx0cmJ1Z2d5TWF0Y2hlcyA9IHJidWdneU1hdGNoZXMubGVuZ3RoICYmIG5ldyBSZWdFeHAoIHJidWdneU1hdGNoZXMuam9pbihcInxcIikgKTtcblxuXHQvKiBDb250YWluc1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cdGhhc0NvbXBhcmUgPSBybmF0aXZlLnRlc3QoIGRvY0VsZW0uY29tcGFyZURvY3VtZW50UG9zaXRpb24gKTtcblxuXHQvLyBFbGVtZW50IGNvbnRhaW5zIGFub3RoZXJcblx0Ly8gUHVycG9zZWZ1bGx5IHNlbGYtZXhjbHVzaXZlXG5cdC8vIEFzIGluLCBhbiBlbGVtZW50IGRvZXMgbm90IGNvbnRhaW4gaXRzZWxmXG5cdGNvbnRhaW5zID0gaGFzQ29tcGFyZSB8fCBybmF0aXZlLnRlc3QoIGRvY0VsZW0uY29udGFpbnMgKSA/XG5cdFx0ZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0XHR2YXIgYWRvd24gPSBhLm5vZGVUeXBlID09PSA5ID8gYS5kb2N1bWVudEVsZW1lbnQgOiBhLFxuXHRcdFx0XHRidXAgPSBiICYmIGIucGFyZW50Tm9kZTtcblx0XHRcdHJldHVybiBhID09PSBidXAgfHwgISEoIGJ1cCAmJiBidXAubm9kZVR5cGUgPT09IDEgJiYgKFxuXHRcdFx0XHRhZG93bi5jb250YWlucyA/XG5cdFx0XHRcdFx0YWRvd24uY29udGFpbnMoIGJ1cCApIDpcblx0XHRcdFx0XHRhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uICYmIGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGJ1cCApICYgMTZcblx0XHRcdCkpO1xuXHRcdH0gOlxuXHRcdGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdFx0aWYgKCBiICkge1xuXHRcdFx0XHR3aGlsZSAoIChiID0gYi5wYXJlbnROb2RlKSApIHtcblx0XHRcdFx0XHRpZiAoIGIgPT09IGEgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXG5cdC8qIFNvcnRpbmdcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdC8vIERvY3VtZW50IG9yZGVyIHNvcnRpbmdcblx0c29ydE9yZGVyID0gaGFzQ29tcGFyZSA/XG5cdGZ1bmN0aW9uKCBhLCBiICkge1xuXG5cdFx0Ly8gRmxhZyBmb3IgZHVwbGljYXRlIHJlbW92YWxcblx0XHRpZiAoIGEgPT09IGIgKSB7XG5cdFx0XHRoYXNEdXBsaWNhdGUgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXG5cdFx0Ly8gU29ydCBvbiBtZXRob2QgZXhpc3RlbmNlIGlmIG9ubHkgb25lIGlucHV0IGhhcyBjb21wYXJlRG9jdW1lbnRQb3NpdGlvblxuXHRcdHZhciBjb21wYXJlID0gIWEuY29tcGFyZURvY3VtZW50UG9zaXRpb24gLSAhYi5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbjtcblx0XHRpZiAoIGNvbXBhcmUgKSB7XG5cdFx0XHRyZXR1cm4gY29tcGFyZTtcblx0XHR9XG5cblx0XHQvLyBDYWxjdWxhdGUgcG9zaXRpb24gaWYgYm90aCBpbnB1dHMgYmVsb25nIHRvIHRoZSBzYW1lIGRvY3VtZW50XG5cdFx0Y29tcGFyZSA9ICggYS5vd25lckRvY3VtZW50IHx8IGEgKSA9PT0gKCBiLm93bmVyRG9jdW1lbnQgfHwgYiApID9cblx0XHRcdGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGIgKSA6XG5cblx0XHRcdC8vIE90aGVyd2lzZSB3ZSBrbm93IHRoZXkgYXJlIGRpc2Nvbm5lY3RlZFxuXHRcdFx0MTtcblxuXHRcdC8vIERpc2Nvbm5lY3RlZCBub2Rlc1xuXHRcdGlmICggY29tcGFyZSAmIDEgfHxcblx0XHRcdCghc3VwcG9ydC5zb3J0RGV0YWNoZWQgJiYgYi5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggYSApID09PSBjb21wYXJlKSApIHtcblxuXHRcdFx0Ly8gQ2hvb3NlIHRoZSBmaXJzdCBlbGVtZW50IHRoYXQgaXMgcmVsYXRlZCB0byBvdXIgcHJlZmVycmVkIGRvY3VtZW50XG5cdFx0XHRpZiAoIGEgPT09IGRvY3VtZW50IHx8IGEub3duZXJEb2N1bWVudCA9PT0gcHJlZmVycmVkRG9jICYmIGNvbnRhaW5zKHByZWZlcnJlZERvYywgYSkgKSB7XG5cdFx0XHRcdHJldHVybiAtMTtcblx0XHRcdH1cblx0XHRcdGlmICggYiA9PT0gZG9jdW1lbnQgfHwgYi5vd25lckRvY3VtZW50ID09PSBwcmVmZXJyZWREb2MgJiYgY29udGFpbnMocHJlZmVycmVkRG9jLCBiKSApIHtcblx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE1haW50YWluIG9yaWdpbmFsIG9yZGVyXG5cdFx0XHRyZXR1cm4gc29ydElucHV0ID9cblx0XHRcdFx0KCBpbmRleE9mKCBzb3J0SW5wdXQsIGEgKSAtIGluZGV4T2YoIHNvcnRJbnB1dCwgYiApICkgOlxuXHRcdFx0XHQwO1xuXHRcdH1cblxuXHRcdHJldHVybiBjb21wYXJlICYgNCA/IC0xIDogMTtcblx0fSA6XG5cdGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdC8vIEV4aXQgZWFybHkgaWYgdGhlIG5vZGVzIGFyZSBpZGVudGljYWxcblx0XHRpZiAoIGEgPT09IGIgKSB7XG5cdFx0XHRoYXNEdXBsaWNhdGUgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXG5cdFx0dmFyIGN1cixcblx0XHRcdGkgPSAwLFxuXHRcdFx0YXVwID0gYS5wYXJlbnROb2RlLFxuXHRcdFx0YnVwID0gYi5wYXJlbnROb2RlLFxuXHRcdFx0YXAgPSBbIGEgXSxcblx0XHRcdGJwID0gWyBiIF07XG5cblx0XHQvLyBQYXJlbnRsZXNzIG5vZGVzIGFyZSBlaXRoZXIgZG9jdW1lbnRzIG9yIGRpc2Nvbm5lY3RlZFxuXHRcdGlmICggIWF1cCB8fCAhYnVwICkge1xuXHRcdFx0cmV0dXJuIGEgPT09IGRvY3VtZW50ID8gLTEgOlxuXHRcdFx0XHRiID09PSBkb2N1bWVudCA/IDEgOlxuXHRcdFx0XHRhdXAgPyAtMSA6XG5cdFx0XHRcdGJ1cCA/IDEgOlxuXHRcdFx0XHRzb3J0SW5wdXQgP1xuXHRcdFx0XHQoIGluZGV4T2YoIHNvcnRJbnB1dCwgYSApIC0gaW5kZXhPZiggc29ydElucHV0LCBiICkgKSA6XG5cdFx0XHRcdDA7XG5cblx0XHQvLyBJZiB0aGUgbm9kZXMgYXJlIHNpYmxpbmdzLCB3ZSBjYW4gZG8gYSBxdWljayBjaGVja1xuXHRcdH0gZWxzZSBpZiAoIGF1cCA9PT0gYnVwICkge1xuXHRcdFx0cmV0dXJuIHNpYmxpbmdDaGVjayggYSwgYiApO1xuXHRcdH1cblxuXHRcdC8vIE90aGVyd2lzZSB3ZSBuZWVkIGZ1bGwgbGlzdHMgb2YgdGhlaXIgYW5jZXN0b3JzIGZvciBjb21wYXJpc29uXG5cdFx0Y3VyID0gYTtcblx0XHR3aGlsZSAoIChjdXIgPSBjdXIucGFyZW50Tm9kZSkgKSB7XG5cdFx0XHRhcC51bnNoaWZ0KCBjdXIgKTtcblx0XHR9XG5cdFx0Y3VyID0gYjtcblx0XHR3aGlsZSAoIChjdXIgPSBjdXIucGFyZW50Tm9kZSkgKSB7XG5cdFx0XHRicC51bnNoaWZ0KCBjdXIgKTtcblx0XHR9XG5cblx0XHQvLyBXYWxrIGRvd24gdGhlIHRyZWUgbG9va2luZyBmb3IgYSBkaXNjcmVwYW5jeVxuXHRcdHdoaWxlICggYXBbaV0gPT09IGJwW2ldICkge1xuXHRcdFx0aSsrO1xuXHRcdH1cblxuXHRcdHJldHVybiBpID9cblx0XHRcdC8vIERvIGEgc2libGluZyBjaGVjayBpZiB0aGUgbm9kZXMgaGF2ZSBhIGNvbW1vbiBhbmNlc3RvclxuXHRcdFx0c2libGluZ0NoZWNrKCBhcFtpXSwgYnBbaV0gKSA6XG5cblx0XHRcdC8vIE90aGVyd2lzZSBub2RlcyBpbiBvdXIgZG9jdW1lbnQgc29ydCBmaXJzdFxuXHRcdFx0YXBbaV0gPT09IHByZWZlcnJlZERvYyA/IC0xIDpcblx0XHRcdGJwW2ldID09PSBwcmVmZXJyZWREb2MgPyAxIDpcblx0XHRcdDA7XG5cdH07XG5cblx0cmV0dXJuIGRvY3VtZW50O1xufTtcblxuU2l6emxlLm1hdGNoZXMgPSBmdW5jdGlvbiggZXhwciwgZWxlbWVudHMgKSB7XG5cdHJldHVybiBTaXp6bGUoIGV4cHIsIG51bGwsIG51bGwsIGVsZW1lbnRzICk7XG59O1xuXG5TaXp6bGUubWF0Y2hlc1NlbGVjdG9yID0gZnVuY3Rpb24oIGVsZW0sIGV4cHIgKSB7XG5cdC8vIFNldCBkb2N1bWVudCB2YXJzIGlmIG5lZWRlZFxuXHRpZiAoICggZWxlbS5vd25lckRvY3VtZW50IHx8IGVsZW0gKSAhPT0gZG9jdW1lbnQgKSB7XG5cdFx0c2V0RG9jdW1lbnQoIGVsZW0gKTtcblx0fVxuXG5cdC8vIE1ha2Ugc3VyZSB0aGF0IGF0dHJpYnV0ZSBzZWxlY3RvcnMgYXJlIHF1b3RlZFxuXHRleHByID0gZXhwci5yZXBsYWNlKCByYXR0cmlidXRlUXVvdGVzLCBcIj0nJDEnXVwiICk7XG5cblx0aWYgKCBzdXBwb3J0Lm1hdGNoZXNTZWxlY3RvciAmJiBkb2N1bWVudElzSFRNTCAmJlxuXHRcdCFjb21waWxlckNhY2hlWyBleHByICsgXCIgXCIgXSAmJlxuXHRcdCggIXJidWdneU1hdGNoZXMgfHwgIXJidWdneU1hdGNoZXMudGVzdCggZXhwciApICkgJiZcblx0XHQoICFyYnVnZ3lRU0EgICAgIHx8ICFyYnVnZ3lRU0EudGVzdCggZXhwciApICkgKSB7XG5cblx0XHR0cnkge1xuXHRcdFx0dmFyIHJldCA9IG1hdGNoZXMuY2FsbCggZWxlbSwgZXhwciApO1xuXG5cdFx0XHQvLyBJRSA5J3MgbWF0Y2hlc1NlbGVjdG9yIHJldHVybnMgZmFsc2Ugb24gZGlzY29ubmVjdGVkIG5vZGVzXG5cdFx0XHRpZiAoIHJldCB8fCBzdXBwb3J0LmRpc2Nvbm5lY3RlZE1hdGNoIHx8XG5cdFx0XHRcdFx0Ly8gQXMgd2VsbCwgZGlzY29ubmVjdGVkIG5vZGVzIGFyZSBzYWlkIHRvIGJlIGluIGEgZG9jdW1lbnRcblx0XHRcdFx0XHQvLyBmcmFnbWVudCBpbiBJRSA5XG5cdFx0XHRcdFx0ZWxlbS5kb2N1bWVudCAmJiBlbGVtLmRvY3VtZW50Lm5vZGVUeXBlICE9PSAxMSApIHtcblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlKSB7fVxuXHR9XG5cblx0cmV0dXJuIFNpenpsZSggZXhwciwgZG9jdW1lbnQsIG51bGwsIFsgZWxlbSBdICkubGVuZ3RoID4gMDtcbn07XG5cblNpenpsZS5jb250YWlucyA9IGZ1bmN0aW9uKCBjb250ZXh0LCBlbGVtICkge1xuXHQvLyBTZXQgZG9jdW1lbnQgdmFycyBpZiBuZWVkZWRcblx0aWYgKCAoIGNvbnRleHQub3duZXJEb2N1bWVudCB8fCBjb250ZXh0ICkgIT09IGRvY3VtZW50ICkge1xuXHRcdHNldERvY3VtZW50KCBjb250ZXh0ICk7XG5cdH1cblx0cmV0dXJuIGNvbnRhaW5zKCBjb250ZXh0LCBlbGVtICk7XG59O1xuXG5TaXp6bGUuYXR0ciA9IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuXHQvLyBTZXQgZG9jdW1lbnQgdmFycyBpZiBuZWVkZWRcblx0aWYgKCAoIGVsZW0ub3duZXJEb2N1bWVudCB8fCBlbGVtICkgIT09IGRvY3VtZW50ICkge1xuXHRcdHNldERvY3VtZW50KCBlbGVtICk7XG5cdH1cblxuXHR2YXIgZm4gPSBFeHByLmF0dHJIYW5kbGVbIG5hbWUudG9Mb3dlckNhc2UoKSBdLFxuXHRcdC8vIERvbid0IGdldCBmb29sZWQgYnkgT2JqZWN0LnByb3RvdHlwZSBwcm9wZXJ0aWVzIChqUXVlcnkgIzEzODA3KVxuXHRcdHZhbCA9IGZuICYmIGhhc093bi5jYWxsKCBFeHByLmF0dHJIYW5kbGUsIG5hbWUudG9Mb3dlckNhc2UoKSApID9cblx0XHRcdGZuKCBlbGVtLCBuYW1lLCAhZG9jdW1lbnRJc0hUTUwgKSA6XG5cdFx0XHR1bmRlZmluZWQ7XG5cblx0cmV0dXJuIHZhbCAhPT0gdW5kZWZpbmVkID9cblx0XHR2YWwgOlxuXHRcdHN1cHBvcnQuYXR0cmlidXRlcyB8fCAhZG9jdW1lbnRJc0hUTUwgP1xuXHRcdFx0ZWxlbS5nZXRBdHRyaWJ1dGUoIG5hbWUgKSA6XG5cdFx0XHQodmFsID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKG5hbWUpKSAmJiB2YWwuc3BlY2lmaWVkID9cblx0XHRcdFx0dmFsLnZhbHVlIDpcblx0XHRcdFx0bnVsbDtcbn07XG5cblNpenpsZS5lcnJvciA9IGZ1bmN0aW9uKCBtc2cgKSB7XG5cdHRocm93IG5ldyBFcnJvciggXCJTeW50YXggZXJyb3IsIHVucmVjb2duaXplZCBleHByZXNzaW9uOiBcIiArIG1zZyApO1xufTtcblxuLyoqXG4gKiBEb2N1bWVudCBzb3J0aW5nIGFuZCByZW1vdmluZyBkdXBsaWNhdGVzXG4gKiBAcGFyYW0ge0FycmF5TGlrZX0gcmVzdWx0c1xuICovXG5TaXp6bGUudW5pcXVlU29ydCA9IGZ1bmN0aW9uKCByZXN1bHRzICkge1xuXHR2YXIgZWxlbSxcblx0XHRkdXBsaWNhdGVzID0gW10sXG5cdFx0aiA9IDAsXG5cdFx0aSA9IDA7XG5cblx0Ly8gVW5sZXNzIHdlICprbm93KiB3ZSBjYW4gZGV0ZWN0IGR1cGxpY2F0ZXMsIGFzc3VtZSB0aGVpciBwcmVzZW5jZVxuXHRoYXNEdXBsaWNhdGUgPSAhc3VwcG9ydC5kZXRlY3REdXBsaWNhdGVzO1xuXHRzb3J0SW5wdXQgPSAhc3VwcG9ydC5zb3J0U3RhYmxlICYmIHJlc3VsdHMuc2xpY2UoIDAgKTtcblx0cmVzdWx0cy5zb3J0KCBzb3J0T3JkZXIgKTtcblxuXHRpZiAoIGhhc0R1cGxpY2F0ZSApIHtcblx0XHR3aGlsZSAoIChlbGVtID0gcmVzdWx0c1tpKytdKSApIHtcblx0XHRcdGlmICggZWxlbSA9PT0gcmVzdWx0c1sgaSBdICkge1xuXHRcdFx0XHRqID0gZHVwbGljYXRlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHdoaWxlICggai0tICkge1xuXHRcdFx0cmVzdWx0cy5zcGxpY2UoIGR1cGxpY2F0ZXNbIGogXSwgMSApO1xuXHRcdH1cblx0fVxuXG5cdC8vIENsZWFyIGlucHV0IGFmdGVyIHNvcnRpbmcgdG8gcmVsZWFzZSBvYmplY3RzXG5cdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L3NpenpsZS9wdWxsLzIyNVxuXHRzb3J0SW5wdXQgPSBudWxsO1xuXG5cdHJldHVybiByZXN1bHRzO1xufTtcblxuLyoqXG4gKiBVdGlsaXR5IGZ1bmN0aW9uIGZvciByZXRyaWV2aW5nIHRoZSB0ZXh0IHZhbHVlIG9mIGFuIGFycmF5IG9mIERPTSBub2Rlc1xuICogQHBhcmFtIHtBcnJheXxFbGVtZW50fSBlbGVtXG4gKi9cbmdldFRleHQgPSBTaXp6bGUuZ2V0VGV4dCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHR2YXIgbm9kZSxcblx0XHRyZXQgPSBcIlwiLFxuXHRcdGkgPSAwLFxuXHRcdG5vZGVUeXBlID0gZWxlbS5ub2RlVHlwZTtcblxuXHRpZiAoICFub2RlVHlwZSApIHtcblx0XHQvLyBJZiBubyBub2RlVHlwZSwgdGhpcyBpcyBleHBlY3RlZCB0byBiZSBhbiBhcnJheVxuXHRcdHdoaWxlICggKG5vZGUgPSBlbGVtW2krK10pICkge1xuXHRcdFx0Ly8gRG8gbm90IHRyYXZlcnNlIGNvbW1lbnQgbm9kZXNcblx0XHRcdHJldCArPSBnZXRUZXh0KCBub2RlICk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKCBub2RlVHlwZSA9PT0gMSB8fCBub2RlVHlwZSA9PT0gOSB8fCBub2RlVHlwZSA9PT0gMTEgKSB7XG5cdFx0Ly8gVXNlIHRleHRDb250ZW50IGZvciBlbGVtZW50c1xuXHRcdC8vIGlubmVyVGV4dCB1c2FnZSByZW1vdmVkIGZvciBjb25zaXN0ZW5jeSBvZiBuZXcgbGluZXMgKGpRdWVyeSAjMTExNTMpXG5cdFx0aWYgKCB0eXBlb2YgZWxlbS50ZXh0Q29udGVudCA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldHVybiBlbGVtLnRleHRDb250ZW50O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBUcmF2ZXJzZSBpdHMgY2hpbGRyZW5cblx0XHRcdGZvciAoIGVsZW0gPSBlbGVtLmZpcnN0Q2hpbGQ7IGVsZW07IGVsZW0gPSBlbGVtLm5leHRTaWJsaW5nICkge1xuXHRcdFx0XHRyZXQgKz0gZ2V0VGV4dCggZWxlbSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIGlmICggbm9kZVR5cGUgPT09IDMgfHwgbm9kZVR5cGUgPT09IDQgKSB7XG5cdFx0cmV0dXJuIGVsZW0ubm9kZVZhbHVlO1xuXHR9XG5cdC8vIERvIG5vdCBpbmNsdWRlIGNvbW1lbnQgb3IgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbiBub2Rlc1xuXG5cdHJldHVybiByZXQ7XG59O1xuXG5FeHByID0gU2l6emxlLnNlbGVjdG9ycyA9IHtcblxuXHQvLyBDYW4gYmUgYWRqdXN0ZWQgYnkgdGhlIHVzZXJcblx0Y2FjaGVMZW5ndGg6IDUwLFxuXG5cdGNyZWF0ZVBzZXVkbzogbWFya0Z1bmN0aW9uLFxuXG5cdG1hdGNoOiBtYXRjaEV4cHIsXG5cblx0YXR0ckhhbmRsZToge30sXG5cblx0ZmluZDoge30sXG5cblx0cmVsYXRpdmU6IHtcblx0XHRcIj5cIjogeyBkaXI6IFwicGFyZW50Tm9kZVwiLCBmaXJzdDogdHJ1ZSB9LFxuXHRcdFwiIFwiOiB7IGRpcjogXCJwYXJlbnROb2RlXCIgfSxcblx0XHRcIitcIjogeyBkaXI6IFwicHJldmlvdXNTaWJsaW5nXCIsIGZpcnN0OiB0cnVlIH0sXG5cdFx0XCJ+XCI6IHsgZGlyOiBcInByZXZpb3VzU2libGluZ1wiIH1cblx0fSxcblxuXHRwcmVGaWx0ZXI6IHtcblx0XHRcIkFUVFJcIjogZnVuY3Rpb24oIG1hdGNoICkge1xuXHRcdFx0bWF0Y2hbMV0gPSBtYXRjaFsxXS5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXG5cdFx0XHQvLyBNb3ZlIHRoZSBnaXZlbiB2YWx1ZSB0byBtYXRjaFszXSB3aGV0aGVyIHF1b3RlZCBvciB1bnF1b3RlZFxuXHRcdFx0bWF0Y2hbM10gPSAoIG1hdGNoWzNdIHx8IG1hdGNoWzRdIHx8IG1hdGNoWzVdIHx8IFwiXCIgKS5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXG5cdFx0XHRpZiAoIG1hdGNoWzJdID09PSBcIn49XCIgKSB7XG5cdFx0XHRcdG1hdGNoWzNdID0gXCIgXCIgKyBtYXRjaFszXSArIFwiIFwiO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbWF0Y2guc2xpY2UoIDAsIDQgKTtcblx0XHR9LFxuXG5cdFx0XCJDSElMRFwiOiBmdW5jdGlvbiggbWF0Y2ggKSB7XG5cdFx0XHQvKiBtYXRjaGVzIGZyb20gbWF0Y2hFeHByW1wiQ0hJTERcIl1cblx0XHRcdFx0MSB0eXBlIChvbmx5fG50aHwuLi4pXG5cdFx0XHRcdDIgd2hhdCAoY2hpbGR8b2YtdHlwZSlcblx0XHRcdFx0MyBhcmd1bWVudCAoZXZlbnxvZGR8XFxkKnxcXGQqbihbKy1dXFxkKyk/fC4uLilcblx0XHRcdFx0NCB4bi1jb21wb25lbnQgb2YgeG4reSBhcmd1bWVudCAoWystXT9cXGQqbnwpXG5cdFx0XHRcdDUgc2lnbiBvZiB4bi1jb21wb25lbnRcblx0XHRcdFx0NiB4IG9mIHhuLWNvbXBvbmVudFxuXHRcdFx0XHQ3IHNpZ24gb2YgeS1jb21wb25lbnRcblx0XHRcdFx0OCB5IG9mIHktY29tcG9uZW50XG5cdFx0XHQqL1xuXHRcdFx0bWF0Y2hbMV0gPSBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0XHRpZiAoIG1hdGNoWzFdLnNsaWNlKCAwLCAzICkgPT09IFwibnRoXCIgKSB7XG5cdFx0XHRcdC8vIG50aC0qIHJlcXVpcmVzIGFyZ3VtZW50XG5cdFx0XHRcdGlmICggIW1hdGNoWzNdICkge1xuXHRcdFx0XHRcdFNpenpsZS5lcnJvciggbWF0Y2hbMF0gKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIG51bWVyaWMgeCBhbmQgeSBwYXJhbWV0ZXJzIGZvciBFeHByLmZpbHRlci5DSElMRFxuXHRcdFx0XHQvLyByZW1lbWJlciB0aGF0IGZhbHNlL3RydWUgY2FzdCByZXNwZWN0aXZlbHkgdG8gMC8xXG5cdFx0XHRcdG1hdGNoWzRdID0gKyggbWF0Y2hbNF0gPyBtYXRjaFs1XSArIChtYXRjaFs2XSB8fCAxKSA6IDIgKiAoIG1hdGNoWzNdID09PSBcImV2ZW5cIiB8fCBtYXRjaFszXSA9PT0gXCJvZGRcIiApICk7XG5cdFx0XHRcdG1hdGNoWzVdID0gKyggKCBtYXRjaFs3XSArIG1hdGNoWzhdICkgfHwgbWF0Y2hbM10gPT09IFwib2RkXCIgKTtcblxuXHRcdFx0Ly8gb3RoZXIgdHlwZXMgcHJvaGliaXQgYXJndW1lbnRzXG5cdFx0XHR9IGVsc2UgaWYgKCBtYXRjaFszXSApIHtcblx0XHRcdFx0U2l6emxlLmVycm9yKCBtYXRjaFswXSApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbWF0Y2g7XG5cdFx0fSxcblxuXHRcdFwiUFNFVURPXCI6IGZ1bmN0aW9uKCBtYXRjaCApIHtcblx0XHRcdHZhciBleGNlc3MsXG5cdFx0XHRcdHVucXVvdGVkID0gIW1hdGNoWzZdICYmIG1hdGNoWzJdO1xuXG5cdFx0XHRpZiAoIG1hdGNoRXhwcltcIkNISUxEXCJdLnRlc3QoIG1hdGNoWzBdICkgKSB7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBY2NlcHQgcXVvdGVkIGFyZ3VtZW50cyBhcy1pc1xuXHRcdFx0aWYgKCBtYXRjaFszXSApIHtcblx0XHRcdFx0bWF0Y2hbMl0gPSBtYXRjaFs0XSB8fCBtYXRjaFs1XSB8fCBcIlwiO1xuXG5cdFx0XHQvLyBTdHJpcCBleGNlc3MgY2hhcmFjdGVycyBmcm9tIHVucXVvdGVkIGFyZ3VtZW50c1xuXHRcdFx0fSBlbHNlIGlmICggdW5xdW90ZWQgJiYgcnBzZXVkby50ZXN0KCB1bnF1b3RlZCApICYmXG5cdFx0XHRcdC8vIEdldCBleGNlc3MgZnJvbSB0b2tlbml6ZSAocmVjdXJzaXZlbHkpXG5cdFx0XHRcdChleGNlc3MgPSB0b2tlbml6ZSggdW5xdW90ZWQsIHRydWUgKSkgJiZcblx0XHRcdFx0Ly8gYWR2YW5jZSB0byB0aGUgbmV4dCBjbG9zaW5nIHBhcmVudGhlc2lzXG5cdFx0XHRcdChleGNlc3MgPSB1bnF1b3RlZC5pbmRleE9mKCBcIilcIiwgdW5xdW90ZWQubGVuZ3RoIC0gZXhjZXNzICkgLSB1bnF1b3RlZC5sZW5ndGgpICkge1xuXG5cdFx0XHRcdC8vIGV4Y2VzcyBpcyBhIG5lZ2F0aXZlIGluZGV4XG5cdFx0XHRcdG1hdGNoWzBdID0gbWF0Y2hbMF0uc2xpY2UoIDAsIGV4Y2VzcyApO1xuXHRcdFx0XHRtYXRjaFsyXSA9IHVucXVvdGVkLnNsaWNlKCAwLCBleGNlc3MgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmV0dXJuIG9ubHkgY2FwdHVyZXMgbmVlZGVkIGJ5IHRoZSBwc2V1ZG8gZmlsdGVyIG1ldGhvZCAodHlwZSBhbmQgYXJndW1lbnQpXG5cdFx0XHRyZXR1cm4gbWF0Y2guc2xpY2UoIDAsIDMgKTtcblx0XHR9XG5cdH0sXG5cblx0ZmlsdGVyOiB7XG5cblx0XHRcIlRBR1wiOiBmdW5jdGlvbiggbm9kZU5hbWVTZWxlY3RvciApIHtcblx0XHRcdHZhciBub2RlTmFtZSA9IG5vZGVOYW1lU2VsZWN0b3IucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0cmV0dXJuIG5vZGVOYW1lU2VsZWN0b3IgPT09IFwiKlwiID9cblx0XHRcdFx0ZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9IDpcblx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVsZW0ubm9kZU5hbWUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBub2RlTmFtZTtcblx0XHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0XCJDTEFTU1wiOiBmdW5jdGlvbiggY2xhc3NOYW1lICkge1xuXHRcdFx0dmFyIHBhdHRlcm4gPSBjbGFzc0NhY2hlWyBjbGFzc05hbWUgKyBcIiBcIiBdO1xuXG5cdFx0XHRyZXR1cm4gcGF0dGVybiB8fFxuXHRcdFx0XHQocGF0dGVybiA9IG5ldyBSZWdFeHAoIFwiKF58XCIgKyB3aGl0ZXNwYWNlICsgXCIpXCIgKyBjbGFzc05hbWUgKyBcIihcIiArIHdoaXRlc3BhY2UgKyBcInwkKVwiICkpICYmXG5cdFx0XHRcdGNsYXNzQ2FjaGUoIGNsYXNzTmFtZSwgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHBhdHRlcm4udGVzdCggdHlwZW9mIGVsZW0uY2xhc3NOYW1lID09PSBcInN0cmluZ1wiICYmIGVsZW0uY2xhc3NOYW1lIHx8IHR5cGVvZiBlbGVtLmdldEF0dHJpYnV0ZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBlbGVtLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpIHx8IFwiXCIgKTtcblx0XHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdFwiQVRUUlwiOiBmdW5jdGlvbiggbmFtZSwgb3BlcmF0b3IsIGNoZWNrICkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gU2l6emxlLmF0dHIoIGVsZW0sIG5hbWUgKTtcblxuXHRcdFx0XHRpZiAoIHJlc3VsdCA9PSBudWxsICkge1xuXHRcdFx0XHRcdHJldHVybiBvcGVyYXRvciA9PT0gXCIhPVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggIW9wZXJhdG9yICkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmVzdWx0ICs9IFwiXCI7XG5cblx0XHRcdFx0cmV0dXJuIG9wZXJhdG9yID09PSBcIj1cIiA/IHJlc3VsdCA9PT0gY2hlY2sgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIiE9XCIgPyByZXN1bHQgIT09IGNoZWNrIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCJePVwiID8gY2hlY2sgJiYgcmVzdWx0LmluZGV4T2YoIGNoZWNrICkgPT09IDAgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIio9XCIgPyBjaGVjayAmJiByZXN1bHQuaW5kZXhPZiggY2hlY2sgKSA+IC0xIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCIkPVwiID8gY2hlY2sgJiYgcmVzdWx0LnNsaWNlKCAtY2hlY2subGVuZ3RoICkgPT09IGNoZWNrIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCJ+PVwiID8gKCBcIiBcIiArIHJlc3VsdC5yZXBsYWNlKCByd2hpdGVzcGFjZSwgXCIgXCIgKSArIFwiIFwiICkuaW5kZXhPZiggY2hlY2sgKSA+IC0xIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCJ8PVwiID8gcmVzdWx0ID09PSBjaGVjayB8fCByZXN1bHQuc2xpY2UoIDAsIGNoZWNrLmxlbmd0aCArIDEgKSA9PT0gY2hlY2sgKyBcIi1cIiA6XG5cdFx0XHRcdFx0ZmFsc2U7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRcIkNISUxEXCI6IGZ1bmN0aW9uKCB0eXBlLCB3aGF0LCBhcmd1bWVudCwgZmlyc3QsIGxhc3QgKSB7XG5cdFx0XHR2YXIgc2ltcGxlID0gdHlwZS5zbGljZSggMCwgMyApICE9PSBcIm50aFwiLFxuXHRcdFx0XHRmb3J3YXJkID0gdHlwZS5zbGljZSggLTQgKSAhPT0gXCJsYXN0XCIsXG5cdFx0XHRcdG9mVHlwZSA9IHdoYXQgPT09IFwib2YtdHlwZVwiO1xuXG5cdFx0XHRyZXR1cm4gZmlyc3QgPT09IDEgJiYgbGFzdCA9PT0gMCA/XG5cblx0XHRcdFx0Ly8gU2hvcnRjdXQgZm9yIDpudGgtKihuKVxuXHRcdFx0XHRmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0XHRyZXR1cm4gISFlbGVtLnBhcmVudE5vZGU7XG5cdFx0XHRcdH0gOlxuXG5cdFx0XHRcdGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHRcdFx0dmFyIGNhY2hlLCB1bmlxdWVDYWNoZSwgb3V0ZXJDYWNoZSwgbm9kZSwgbm9kZUluZGV4LCBzdGFydCxcblx0XHRcdFx0XHRcdGRpciA9IHNpbXBsZSAhPT0gZm9yd2FyZCA/IFwibmV4dFNpYmxpbmdcIiA6IFwicHJldmlvdXNTaWJsaW5nXCIsXG5cdFx0XHRcdFx0XHRwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGUsXG5cdFx0XHRcdFx0XHRuYW1lID0gb2ZUeXBlICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSxcblx0XHRcdFx0XHRcdHVzZUNhY2hlID0gIXhtbCAmJiAhb2ZUeXBlLFxuXHRcdFx0XHRcdFx0ZGlmZiA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKCBwYXJlbnQgKSB7XG5cblx0XHRcdFx0XHRcdC8vIDooZmlyc3R8bGFzdHxvbmx5KS0oY2hpbGR8b2YtdHlwZSlcblx0XHRcdFx0XHRcdGlmICggc2ltcGxlICkge1xuXHRcdFx0XHRcdFx0XHR3aGlsZSAoIGRpciApIHtcblx0XHRcdFx0XHRcdFx0XHRub2RlID0gZWxlbTtcblx0XHRcdFx0XHRcdFx0XHR3aGlsZSAoIChub2RlID0gbm9kZVsgZGlyIF0pICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBvZlR5cGUgP1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUgOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRub2RlLm5vZGVUeXBlID09PSAxICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0Ly8gUmV2ZXJzZSBkaXJlY3Rpb24gZm9yIDpvbmx5LSogKGlmIHdlIGhhdmVuJ3QgeWV0IGRvbmUgc28pXG5cdFx0XHRcdFx0XHRcdFx0c3RhcnQgPSBkaXIgPSB0eXBlID09PSBcIm9ubHlcIiAmJiAhc3RhcnQgJiYgXCJuZXh0U2libGluZ1wiO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRzdGFydCA9IFsgZm9yd2FyZCA/IHBhcmVudC5maXJzdENoaWxkIDogcGFyZW50Lmxhc3RDaGlsZCBdO1xuXG5cdFx0XHRcdFx0XHQvLyBub24teG1sIDpudGgtY2hpbGQoLi4uKSBzdG9yZXMgY2FjaGUgZGF0YSBvbiBgcGFyZW50YFxuXHRcdFx0XHRcdFx0aWYgKCBmb3J3YXJkICYmIHVzZUNhY2hlICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIFNlZWsgYGVsZW1gIGZyb20gYSBwcmV2aW91c2x5LWNhY2hlZCBpbmRleFxuXG5cdFx0XHRcdFx0XHRcdC8vIC4uLmluIGEgZ3ppcC1mcmllbmRseSB3YXlcblx0XHRcdFx0XHRcdFx0bm9kZSA9IHBhcmVudDtcblx0XHRcdFx0XHRcdFx0b3V0ZXJDYWNoZSA9IG5vZGVbIGV4cGFuZG8gXSB8fCAobm9kZVsgZXhwYW5kbyBdID0ge30pO1xuXG5cdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw5IG9ubHlcblx0XHRcdFx0XHRcdFx0Ly8gRGVmZW5kIGFnYWluc3QgY2xvbmVkIGF0dHJvcGVydGllcyAoalF1ZXJ5IGdoLTE3MDkpXG5cdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlID0gb3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdIHx8XG5cdFx0XHRcdFx0XHRcdFx0KG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSA9IHt9KTtcblxuXHRcdFx0XHRcdFx0XHRjYWNoZSA9IHVuaXF1ZUNhY2hlWyB0eXBlIF0gfHwgW107XG5cdFx0XHRcdFx0XHRcdG5vZGVJbmRleCA9IGNhY2hlWyAwIF0gPT09IGRpcnJ1bnMgJiYgY2FjaGVbIDEgXTtcblx0XHRcdFx0XHRcdFx0ZGlmZiA9IG5vZGVJbmRleCAmJiBjYWNoZVsgMiBdO1xuXHRcdFx0XHRcdFx0XHRub2RlID0gbm9kZUluZGV4ICYmIHBhcmVudC5jaGlsZE5vZGVzWyBub2RlSW5kZXggXTtcblxuXHRcdFx0XHRcdFx0XHR3aGlsZSAoIChub2RlID0gKytub2RlSW5kZXggJiYgbm9kZSAmJiBub2RlWyBkaXIgXSB8fFxuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gRmFsbGJhY2sgdG8gc2Vla2luZyBgZWxlbWAgZnJvbSB0aGUgc3RhcnRcblx0XHRcdFx0XHRcdFx0XHQoZGlmZiA9IG5vZGVJbmRleCA9IDApIHx8IHN0YXJ0LnBvcCgpKSApIHtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIFdoZW4gZm91bmQsIGNhY2hlIGluZGV4ZXMgb24gYHBhcmVudGAgYW5kIGJyZWFrXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBub2RlLm5vZGVUeXBlID09PSAxICYmICsrZGlmZiAmJiBub2RlID09PSBlbGVtICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGVbIHR5cGUgXSA9IFsgZGlycnVucywgbm9kZUluZGV4LCBkaWZmIF07XG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Ly8gVXNlIHByZXZpb3VzbHktY2FjaGVkIGVsZW1lbnQgaW5kZXggaWYgYXZhaWxhYmxlXG5cdFx0XHRcdFx0XHRcdGlmICggdXNlQ2FjaGUgKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gLi4uaW4gYSBnemlwLWZyaWVuZGx5IHdheVxuXHRcdFx0XHRcdFx0XHRcdG5vZGUgPSBlbGVtO1xuXHRcdFx0XHRcdFx0XHRcdG91dGVyQ2FjaGUgPSBub2RlWyBleHBhbmRvIF0gfHwgKG5vZGVbIGV4cGFuZG8gXSA9IHt9KTtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw5IG9ubHlcblx0XHRcdFx0XHRcdFx0XHQvLyBEZWZlbmQgYWdhaW5zdCBjbG9uZWQgYXR0cm9wZXJ0aWVzIChqUXVlcnkgZ2gtMTcwOSlcblx0XHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZSA9IG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSB8fFxuXHRcdFx0XHRcdFx0XHRcdFx0KG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSA9IHt9KTtcblxuXHRcdFx0XHRcdFx0XHRcdGNhY2hlID0gdW5pcXVlQ2FjaGVbIHR5cGUgXSB8fCBbXTtcblx0XHRcdFx0XHRcdFx0XHRub2RlSW5kZXggPSBjYWNoZVsgMCBdID09PSBkaXJydW5zICYmIGNhY2hlWyAxIF07XG5cdFx0XHRcdFx0XHRcdFx0ZGlmZiA9IG5vZGVJbmRleDtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdC8vIHhtbCA6bnRoLWNoaWxkKC4uLilcblx0XHRcdFx0XHRcdFx0Ly8gb3IgOm50aC1sYXN0LWNoaWxkKC4uLikgb3IgOm50aCgtbGFzdCk/LW9mLXR5cGUoLi4uKVxuXHRcdFx0XHRcdFx0XHRpZiAoIGRpZmYgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIFVzZSB0aGUgc2FtZSBsb29wIGFzIGFib3ZlIHRvIHNlZWsgYGVsZW1gIGZyb20gdGhlIHN0YXJ0XG5cdFx0XHRcdFx0XHRcdFx0d2hpbGUgKCAobm9kZSA9ICsrbm9kZUluZGV4ICYmIG5vZGUgJiYgbm9kZVsgZGlyIF0gfHxcblx0XHRcdFx0XHRcdFx0XHRcdChkaWZmID0gbm9kZUluZGV4ID0gMCkgfHwgc3RhcnQucG9wKCkpICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoICggb2ZUeXBlID9cblx0XHRcdFx0XHRcdFx0XHRcdFx0bm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lIDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0bm9kZS5ub2RlVHlwZSA9PT0gMSApICYmXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCsrZGlmZiApIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBDYWNoZSB0aGUgaW5kZXggb2YgZWFjaCBlbmNvdW50ZXJlZCBlbGVtZW50XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICggdXNlQ2FjaGUgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3V0ZXJDYWNoZSA9IG5vZGVbIGV4cGFuZG8gXSB8fCAobm9kZVsgZXhwYW5kbyBdID0ge30pO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPDkgb25seVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIERlZmVuZCBhZ2FpbnN0IGNsb25lZCBhdHRyb3BlcnRpZXMgKGpRdWVyeSBnaC0xNzA5KVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlID0gb3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQob3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdID0ge30pO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGVbIHR5cGUgXSA9IFsgZGlycnVucywgZGlmZiBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBub2RlID09PSBlbGVtICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIEluY29ycG9yYXRlIHRoZSBvZmZzZXQsIHRoZW4gY2hlY2sgYWdhaW5zdCBjeWNsZSBzaXplXG5cdFx0XHRcdFx0XHRkaWZmIC09IGxhc3Q7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZGlmZiA9PT0gZmlyc3QgfHwgKCBkaWZmICUgZmlyc3QgPT09IDAgJiYgZGlmZiAvIGZpcnN0ID49IDAgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0fSxcblxuXHRcdFwiUFNFVURPXCI6IGZ1bmN0aW9uKCBwc2V1ZG8sIGFyZ3VtZW50ICkge1xuXHRcdFx0Ly8gcHNldWRvLWNsYXNzIG5hbWVzIGFyZSBjYXNlLWluc2Vuc2l0aXZlXG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI3BzZXVkby1jbGFzc2VzXG5cdFx0XHQvLyBQcmlvcml0aXplIGJ5IGNhc2Ugc2Vuc2l0aXZpdHkgaW4gY2FzZSBjdXN0b20gcHNldWRvcyBhcmUgYWRkZWQgd2l0aCB1cHBlcmNhc2UgbGV0dGVyc1xuXHRcdFx0Ly8gUmVtZW1iZXIgdGhhdCBzZXRGaWx0ZXJzIGluaGVyaXRzIGZyb20gcHNldWRvc1xuXHRcdFx0dmFyIGFyZ3MsXG5cdFx0XHRcdGZuID0gRXhwci5wc2V1ZG9zWyBwc2V1ZG8gXSB8fCBFeHByLnNldEZpbHRlcnNbIHBzZXVkby50b0xvd2VyQ2FzZSgpIF0gfHxcblx0XHRcdFx0XHRTaXp6bGUuZXJyb3IoIFwidW5zdXBwb3J0ZWQgcHNldWRvOiBcIiArIHBzZXVkbyApO1xuXG5cdFx0XHQvLyBUaGUgdXNlciBtYXkgdXNlIGNyZWF0ZVBzZXVkbyB0byBpbmRpY2F0ZSB0aGF0XG5cdFx0XHQvLyBhcmd1bWVudHMgYXJlIG5lZWRlZCB0byBjcmVhdGUgdGhlIGZpbHRlciBmdW5jdGlvblxuXHRcdFx0Ly8ganVzdCBhcyBTaXp6bGUgZG9lc1xuXHRcdFx0aWYgKCBmblsgZXhwYW5kbyBdICkge1xuXHRcdFx0XHRyZXR1cm4gZm4oIGFyZ3VtZW50ICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEJ1dCBtYWludGFpbiBzdXBwb3J0IGZvciBvbGQgc2lnbmF0dXJlc1xuXHRcdFx0aWYgKCBmbi5sZW5ndGggPiAxICkge1xuXHRcdFx0XHRhcmdzID0gWyBwc2V1ZG8sIHBzZXVkbywgXCJcIiwgYXJndW1lbnQgXTtcblx0XHRcdFx0cmV0dXJuIEV4cHIuc2V0RmlsdGVycy5oYXNPd25Qcm9wZXJ0eSggcHNldWRvLnRvTG93ZXJDYXNlKCkgKSA/XG5cdFx0XHRcdFx0bWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWVkLCBtYXRjaGVzICkge1xuXHRcdFx0XHRcdFx0dmFyIGlkeCxcblx0XHRcdFx0XHRcdFx0bWF0Y2hlZCA9IGZuKCBzZWVkLCBhcmd1bWVudCApLFxuXHRcdFx0XHRcdFx0XHRpID0gbWF0Y2hlZC5sZW5ndGg7XG5cdFx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdFx0aWR4ID0gaW5kZXhPZiggc2VlZCwgbWF0Y2hlZFtpXSApO1xuXHRcdFx0XHRcdFx0XHRzZWVkWyBpZHggXSA9ICEoIG1hdGNoZXNbIGlkeCBdID0gbWF0Y2hlZFtpXSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pIDpcblx0XHRcdFx0XHRmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbiggZWxlbSwgMCwgYXJncyApO1xuXHRcdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmbjtcblx0XHR9XG5cdH0sXG5cblx0cHNldWRvczoge1xuXHRcdC8vIFBvdGVudGlhbGx5IGNvbXBsZXggcHNldWRvc1xuXHRcdFwibm90XCI6IG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0XHQvLyBUcmltIHRoZSBzZWxlY3RvciBwYXNzZWQgdG8gY29tcGlsZVxuXHRcdFx0Ly8gdG8gYXZvaWQgdHJlYXRpbmcgbGVhZGluZyBhbmQgdHJhaWxpbmdcblx0XHRcdC8vIHNwYWNlcyBhcyBjb21iaW5hdG9yc1xuXHRcdFx0dmFyIGlucHV0ID0gW10sXG5cdFx0XHRcdHJlc3VsdHMgPSBbXSxcblx0XHRcdFx0bWF0Y2hlciA9IGNvbXBpbGUoIHNlbGVjdG9yLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSApO1xuXG5cdFx0XHRyZXR1cm4gbWF0Y2hlclsgZXhwYW5kbyBdID9cblx0XHRcdFx0bWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWVkLCBtYXRjaGVzLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHRcdFx0dmFyIGVsZW0sXG5cdFx0XHRcdFx0XHR1bm1hdGNoZWQgPSBtYXRjaGVyKCBzZWVkLCBudWxsLCB4bWwsIFtdICksXG5cdFx0XHRcdFx0XHRpID0gc2VlZC5sZW5ndGg7XG5cblx0XHRcdFx0XHQvLyBNYXRjaCBlbGVtZW50cyB1bm1hdGNoZWQgYnkgYG1hdGNoZXJgXG5cdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRpZiAoIChlbGVtID0gdW5tYXRjaGVkW2ldKSApIHtcblx0XHRcdFx0XHRcdFx0c2VlZFtpXSA9ICEobWF0Y2hlc1tpXSA9IGVsZW0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkgOlxuXHRcdFx0XHRmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0XHRcdGlucHV0WzBdID0gZWxlbTtcblx0XHRcdFx0XHRtYXRjaGVyKCBpbnB1dCwgbnVsbCwgeG1sLCByZXN1bHRzICk7XG5cdFx0XHRcdFx0Ly8gRG9uJ3Qga2VlcCB0aGUgZWxlbWVudCAoaXNzdWUgIzI5OSlcblx0XHRcdFx0XHRpbnB1dFswXSA9IG51bGw7XG5cdFx0XHRcdFx0cmV0dXJuICFyZXN1bHRzLnBvcCgpO1xuXHRcdFx0XHR9O1xuXHRcdH0pLFxuXG5cdFx0XCJoYXNcIjogbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0cmV0dXJuIFNpenpsZSggc2VsZWN0b3IsIGVsZW0gKS5sZW5ndGggPiAwO1xuXHRcdFx0fTtcblx0XHR9KSxcblxuXHRcdFwiY29udGFpbnNcIjogbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCB0ZXh0ICkge1xuXHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0cmV0dXJuICggZWxlbS50ZXh0Q29udGVudCB8fCBlbGVtLmlubmVyVGV4dCB8fCBnZXRUZXh0KCBlbGVtICkgKS5pbmRleE9mKCB0ZXh0ICkgPiAtMTtcblx0XHRcdH07XG5cdFx0fSksXG5cblx0XHQvLyBcIldoZXRoZXIgYW4gZWxlbWVudCBpcyByZXByZXNlbnRlZCBieSBhIDpsYW5nKCkgc2VsZWN0b3Jcblx0XHQvLyBpcyBiYXNlZCBzb2xlbHkgb24gdGhlIGVsZW1lbnQncyBsYW5ndWFnZSB2YWx1ZVxuXHRcdC8vIGJlaW5nIGVxdWFsIHRvIHRoZSBpZGVudGlmaWVyIEMsXG5cdFx0Ly8gb3IgYmVnaW5uaW5nIHdpdGggdGhlIGlkZW50aWZpZXIgQyBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSBcIi1cIi5cblx0XHQvLyBUaGUgbWF0Y2hpbmcgb2YgQyBhZ2FpbnN0IHRoZSBlbGVtZW50J3MgbGFuZ3VhZ2UgdmFsdWUgaXMgcGVyZm9ybWVkIGNhc2UtaW5zZW5zaXRpdmVseS5cblx0XHQvLyBUaGUgaWRlbnRpZmllciBDIGRvZXMgbm90IGhhdmUgdG8gYmUgYSB2YWxpZCBsYW5ndWFnZSBuYW1lLlwiXG5cdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNsYW5nLXBzZXVkb1xuXHRcdFwibGFuZ1wiOiBtYXJrRnVuY3Rpb24oIGZ1bmN0aW9uKCBsYW5nICkge1xuXHRcdFx0Ly8gbGFuZyB2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgaWRlbnRpZmllclxuXHRcdFx0aWYgKCAhcmlkZW50aWZpZXIudGVzdChsYW5nIHx8IFwiXCIpICkge1xuXHRcdFx0XHRTaXp6bGUuZXJyb3IoIFwidW5zdXBwb3J0ZWQgbGFuZzogXCIgKyBsYW5nICk7XG5cdFx0XHR9XG5cdFx0XHRsYW5nID0gbGFuZy5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciBlbGVtTGFuZztcblx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdGlmICggKGVsZW1MYW5nID0gZG9jdW1lbnRJc0hUTUwgP1xuXHRcdFx0XHRcdFx0ZWxlbS5sYW5nIDpcblx0XHRcdFx0XHRcdGVsZW0uZ2V0QXR0cmlidXRlKFwieG1sOmxhbmdcIikgfHwgZWxlbS5nZXRBdHRyaWJ1dGUoXCJsYW5nXCIpKSApIHtcblxuXHRcdFx0XHRcdFx0ZWxlbUxhbmcgPSBlbGVtTGFuZy50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW1MYW5nID09PSBsYW5nIHx8IGVsZW1MYW5nLmluZGV4T2YoIGxhbmcgKyBcIi1cIiApID09PSAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSB3aGlsZSAoIChlbGVtID0gZWxlbS5wYXJlbnROb2RlKSAmJiBlbGVtLm5vZGVUeXBlID09PSAxICk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH07XG5cdFx0fSksXG5cblx0XHQvLyBNaXNjZWxsYW5lb3VzXG5cdFx0XCJ0YXJnZXRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHR2YXIgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbiAmJiB3aW5kb3cubG9jYXRpb24uaGFzaDtcblx0XHRcdHJldHVybiBoYXNoICYmIGhhc2guc2xpY2UoIDEgKSA9PT0gZWxlbS5pZDtcblx0XHR9LFxuXG5cdFx0XCJyb290XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0gPT09IGRvY0VsZW07XG5cdFx0fSxcblxuXHRcdFwiZm9jdXNcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiAoIWRvY3VtZW50Lmhhc0ZvY3VzIHx8IGRvY3VtZW50Lmhhc0ZvY3VzKCkpICYmICEhKGVsZW0udHlwZSB8fCBlbGVtLmhyZWYgfHwgfmVsZW0udGFiSW5kZXgpO1xuXHRcdH0sXG5cblx0XHQvLyBCb29sZWFuIHByb3BlcnRpZXNcblx0XHRcImVuYWJsZWRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5kaXNhYmxlZCA9PT0gZmFsc2U7XG5cdFx0fSxcblxuXHRcdFwiZGlzYWJsZWRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5kaXNhYmxlZCA9PT0gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0XCJjaGVja2VkXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0Ly8gSW4gQ1NTMywgOmNoZWNrZWQgc2hvdWxkIHJldHVybiBib3RoIGNoZWNrZWQgYW5kIHNlbGVjdGVkIGVsZW1lbnRzXG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDExL1JFQy1jc3MzLXNlbGVjdG9ycy0yMDExMDkyOS8jY2hlY2tlZFxuXHRcdFx0dmFyIG5vZGVOYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0cmV0dXJuIChub2RlTmFtZSA9PT0gXCJpbnB1dFwiICYmICEhZWxlbS5jaGVja2VkKSB8fCAobm9kZU5hbWUgPT09IFwib3B0aW9uXCIgJiYgISFlbGVtLnNlbGVjdGVkKTtcblx0XHR9LFxuXG5cdFx0XCJzZWxlY3RlZFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdC8vIEFjY2Vzc2luZyB0aGlzIHByb3BlcnR5IG1ha2VzIHNlbGVjdGVkLWJ5LWRlZmF1bHRcblx0XHRcdC8vIG9wdGlvbnMgaW4gU2FmYXJpIHdvcmsgcHJvcGVybHlcblx0XHRcdGlmICggZWxlbS5wYXJlbnROb2RlICkge1xuXHRcdFx0XHRlbGVtLnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGVsZW0uc2VsZWN0ZWQgPT09IHRydWU7XG5cdFx0fSxcblxuXHRcdC8vIENvbnRlbnRzXG5cdFx0XCJlbXB0eVwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jZW1wdHktcHNldWRvXG5cdFx0XHQvLyA6ZW1wdHkgaXMgbmVnYXRlZCBieSBlbGVtZW50ICgxKSBvciBjb250ZW50IG5vZGVzICh0ZXh0OiAzOyBjZGF0YTogNDsgZW50aXR5IHJlZjogNSksXG5cdFx0XHQvLyAgIGJ1dCBub3QgYnkgb3RoZXJzIChjb21tZW50OiA4OyBwcm9jZXNzaW5nIGluc3RydWN0aW9uOiA3OyBldGMuKVxuXHRcdFx0Ly8gbm9kZVR5cGUgPCA2IHdvcmtzIGJlY2F1c2UgYXR0cmlidXRlcyAoMikgZG8gbm90IGFwcGVhciBhcyBjaGlsZHJlblxuXHRcdFx0Zm9yICggZWxlbSA9IGVsZW0uZmlyc3RDaGlsZDsgZWxlbTsgZWxlbSA9IGVsZW0ubmV4dFNpYmxpbmcgKSB7XG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA8IDYgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0XCJwYXJlbnRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gIUV4cHIucHNldWRvc1tcImVtcHR5XCJdKCBlbGVtICk7XG5cdFx0fSxcblxuXHRcdC8vIEVsZW1lbnQvaW5wdXQgdHlwZXNcblx0XHRcImhlYWRlclwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiByaGVhZGVyLnRlc3QoIGVsZW0ubm9kZU5hbWUgKTtcblx0XHR9LFxuXG5cdFx0XCJpbnB1dFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiByaW5wdXRzLnRlc3QoIGVsZW0ubm9kZU5hbWUgKTtcblx0XHR9LFxuXG5cdFx0XCJidXR0b25cIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHR2YXIgbmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdHJldHVybiBuYW1lID09PSBcImlucHV0XCIgJiYgZWxlbS50eXBlID09PSBcImJ1dHRvblwiIHx8IG5hbWUgPT09IFwiYnV0dG9uXCI7XG5cdFx0fSxcblxuXHRcdFwidGV4dFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHZhciBhdHRyO1xuXHRcdFx0cmV0dXJuIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnB1dFwiICYmXG5cdFx0XHRcdGVsZW0udHlwZSA9PT0gXCJ0ZXh0XCIgJiZcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRTw4XG5cdFx0XHRcdC8vIE5ldyBIVE1MNSBhdHRyaWJ1dGUgdmFsdWVzIChlLmcuLCBcInNlYXJjaFwiKSBhcHBlYXIgd2l0aCBlbGVtLnR5cGUgPT09IFwidGV4dFwiXG5cdFx0XHRcdCggKGF0dHIgPSBlbGVtLmdldEF0dHJpYnV0ZShcInR5cGVcIikpID09IG51bGwgfHwgYXR0ci50b0xvd2VyQ2FzZSgpID09PSBcInRleHRcIiApO1xuXHRcdH0sXG5cblx0XHQvLyBQb3NpdGlvbi1pbi1jb2xsZWN0aW9uXG5cdFx0XCJmaXJzdFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIFsgMCBdO1xuXHRcdH0pLFxuXG5cdFx0XCJsYXN0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoICkge1xuXHRcdFx0cmV0dXJuIFsgbGVuZ3RoIC0gMSBdO1xuXHRcdH0pLFxuXG5cdFx0XCJlcVwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCwgYXJndW1lbnQgKSB7XG5cdFx0XHRyZXR1cm4gWyBhcmd1bWVudCA8IDAgPyBhcmd1bWVudCArIGxlbmd0aCA6IGFyZ3VtZW50IF07XG5cdFx0fSksXG5cblx0XHRcImV2ZW5cIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGggKSB7XG5cdFx0XHR2YXIgaSA9IDA7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkgKz0gMiApIHtcblx0XHRcdFx0bWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtYXRjaEluZGV4ZXM7XG5cdFx0fSksXG5cblx0XHRcIm9kZFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCApIHtcblx0XHRcdHZhciBpID0gMTtcblx0XHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSArPSAyICkge1xuXHRcdFx0XHRtYXRjaEluZGV4ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1hdGNoSW5kZXhlcztcblx0XHR9KSxcblxuXHRcdFwibHRcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGgsIGFyZ3VtZW50ICkge1xuXHRcdFx0dmFyIGkgPSBhcmd1bWVudCA8IDAgPyBhcmd1bWVudCArIGxlbmd0aCA6IGFyZ3VtZW50O1xuXHRcdFx0Zm9yICggOyAtLWkgPj0gMDsgKSB7XG5cdFx0XHRcdG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbWF0Y2hJbmRleGVzO1xuXHRcdH0pLFxuXG5cdFx0XCJndFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCwgYXJndW1lbnQgKSB7XG5cdFx0XHR2YXIgaSA9IGFyZ3VtZW50IDwgMCA/IGFyZ3VtZW50ICsgbGVuZ3RoIDogYXJndW1lbnQ7XG5cdFx0XHRmb3IgKCA7ICsraSA8IGxlbmd0aDsgKSB7XG5cdFx0XHRcdG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbWF0Y2hJbmRleGVzO1xuXHRcdH0pXG5cdH1cbn07XG5cbkV4cHIucHNldWRvc1tcIm50aFwiXSA9IEV4cHIucHNldWRvc1tcImVxXCJdO1xuXG4vLyBBZGQgYnV0dG9uL2lucHV0IHR5cGUgcHNldWRvc1xuZm9yICggaSBpbiB7IHJhZGlvOiB0cnVlLCBjaGVja2JveDogdHJ1ZSwgZmlsZTogdHJ1ZSwgcGFzc3dvcmQ6IHRydWUsIGltYWdlOiB0cnVlIH0gKSB7XG5cdEV4cHIucHNldWRvc1sgaSBdID0gY3JlYXRlSW5wdXRQc2V1ZG8oIGkgKTtcbn1cbmZvciAoIGkgaW4geyBzdWJtaXQ6IHRydWUsIHJlc2V0OiB0cnVlIH0gKSB7XG5cdEV4cHIucHNldWRvc1sgaSBdID0gY3JlYXRlQnV0dG9uUHNldWRvKCBpICk7XG59XG5cbi8vIEVhc3kgQVBJIGZvciBjcmVhdGluZyBuZXcgc2V0RmlsdGVyc1xuZnVuY3Rpb24gc2V0RmlsdGVycygpIHt9XG5zZXRGaWx0ZXJzLnByb3RvdHlwZSA9IEV4cHIuZmlsdGVycyA9IEV4cHIucHNldWRvcztcbkV4cHIuc2V0RmlsdGVycyA9IG5ldyBzZXRGaWx0ZXJzKCk7XG5cbnRva2VuaXplID0gU2l6emxlLnRva2VuaXplID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBwYXJzZU9ubHkgKSB7XG5cdHZhciBtYXRjaGVkLCBtYXRjaCwgdG9rZW5zLCB0eXBlLFxuXHRcdHNvRmFyLCBncm91cHMsIHByZUZpbHRlcnMsXG5cdFx0Y2FjaGVkID0gdG9rZW5DYWNoZVsgc2VsZWN0b3IgKyBcIiBcIiBdO1xuXG5cdGlmICggY2FjaGVkICkge1xuXHRcdHJldHVybiBwYXJzZU9ubHkgPyAwIDogY2FjaGVkLnNsaWNlKCAwICk7XG5cdH1cblxuXHRzb0ZhciA9IHNlbGVjdG9yO1xuXHRncm91cHMgPSBbXTtcblx0cHJlRmlsdGVycyA9IEV4cHIucHJlRmlsdGVyO1xuXG5cdHdoaWxlICggc29GYXIgKSB7XG5cblx0XHQvLyBDb21tYSBhbmQgZmlyc3QgcnVuXG5cdFx0aWYgKCAhbWF0Y2hlZCB8fCAobWF0Y2ggPSByY29tbWEuZXhlYyggc29GYXIgKSkgKSB7XG5cdFx0XHRpZiAoIG1hdGNoICkge1xuXHRcdFx0XHQvLyBEb24ndCBjb25zdW1lIHRyYWlsaW5nIGNvbW1hcyBhcyB2YWxpZFxuXHRcdFx0XHRzb0ZhciA9IHNvRmFyLnNsaWNlKCBtYXRjaFswXS5sZW5ndGggKSB8fCBzb0Zhcjtcblx0XHRcdH1cblx0XHRcdGdyb3Vwcy5wdXNoKCAodG9rZW5zID0gW10pICk7XG5cdFx0fVxuXG5cdFx0bWF0Y2hlZCA9IGZhbHNlO1xuXG5cdFx0Ly8gQ29tYmluYXRvcnNcblx0XHRpZiAoIChtYXRjaCA9IHJjb21iaW5hdG9ycy5leGVjKCBzb0ZhciApKSApIHtcblx0XHRcdG1hdGNoZWQgPSBtYXRjaC5zaGlmdCgpO1xuXHRcdFx0dG9rZW5zLnB1c2goe1xuXHRcdFx0XHR2YWx1ZTogbWF0Y2hlZCxcblx0XHRcdFx0Ly8gQ2FzdCBkZXNjZW5kYW50IGNvbWJpbmF0b3JzIHRvIHNwYWNlXG5cdFx0XHRcdHR5cGU6IG1hdGNoWzBdLnJlcGxhY2UoIHJ0cmltLCBcIiBcIiApXG5cdFx0XHR9KTtcblx0XHRcdHNvRmFyID0gc29GYXIuc2xpY2UoIG1hdGNoZWQubGVuZ3RoICk7XG5cdFx0fVxuXG5cdFx0Ly8gRmlsdGVyc1xuXHRcdGZvciAoIHR5cGUgaW4gRXhwci5maWx0ZXIgKSB7XG5cdFx0XHRpZiAoIChtYXRjaCA9IG1hdGNoRXhwclsgdHlwZSBdLmV4ZWMoIHNvRmFyICkpICYmICghcHJlRmlsdGVyc1sgdHlwZSBdIHx8XG5cdFx0XHRcdChtYXRjaCA9IHByZUZpbHRlcnNbIHR5cGUgXSggbWF0Y2ggKSkpICkge1xuXHRcdFx0XHRtYXRjaGVkID0gbWF0Y2guc2hpZnQoKTtcblx0XHRcdFx0dG9rZW5zLnB1c2goe1xuXHRcdFx0XHRcdHZhbHVlOiBtYXRjaGVkLFxuXHRcdFx0XHRcdHR5cGU6IHR5cGUsXG5cdFx0XHRcdFx0bWF0Y2hlczogbWF0Y2hcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHNvRmFyID0gc29GYXIuc2xpY2UoIG1hdGNoZWQubGVuZ3RoICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCAhbWF0Y2hlZCApIHtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgbGVuZ3RoIG9mIHRoZSBpbnZhbGlkIGV4Y2Vzc1xuXHQvLyBpZiB3ZSdyZSBqdXN0IHBhcnNpbmdcblx0Ly8gT3RoZXJ3aXNlLCB0aHJvdyBhbiBlcnJvciBvciByZXR1cm4gdG9rZW5zXG5cdHJldHVybiBwYXJzZU9ubHkgP1xuXHRcdHNvRmFyLmxlbmd0aCA6XG5cdFx0c29GYXIgP1xuXHRcdFx0U2l6emxlLmVycm9yKCBzZWxlY3RvciApIDpcblx0XHRcdC8vIENhY2hlIHRoZSB0b2tlbnNcblx0XHRcdHRva2VuQ2FjaGUoIHNlbGVjdG9yLCBncm91cHMgKS5zbGljZSggMCApO1xufTtcblxuZnVuY3Rpb24gdG9TZWxlY3RvciggdG9rZW5zICkge1xuXHR2YXIgaSA9IDAsXG5cdFx0bGVuID0gdG9rZW5zLmxlbmd0aCxcblx0XHRzZWxlY3RvciA9IFwiXCI7XG5cdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdHNlbGVjdG9yICs9IHRva2Vuc1tpXS52YWx1ZTtcblx0fVxuXHRyZXR1cm4gc2VsZWN0b3I7XG59XG5cbmZ1bmN0aW9uIGFkZENvbWJpbmF0b3IoIG1hdGNoZXIsIGNvbWJpbmF0b3IsIGJhc2UgKSB7XG5cdHZhciBkaXIgPSBjb21iaW5hdG9yLmRpcixcblx0XHRjaGVja05vbkVsZW1lbnRzID0gYmFzZSAmJiBkaXIgPT09IFwicGFyZW50Tm9kZVwiLFxuXHRcdGRvbmVOYW1lID0gZG9uZSsrO1xuXG5cdHJldHVybiBjb21iaW5hdG9yLmZpcnN0ID9cblx0XHQvLyBDaGVjayBhZ2FpbnN0IGNsb3Nlc3QgYW5jZXN0b3IvcHJlY2VkaW5nIGVsZW1lbnRcblx0XHRmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0d2hpbGUgKCAoZWxlbSA9IGVsZW1bIGRpciBdKSApIHtcblx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxIHx8IGNoZWNrTm9uRWxlbWVudHMgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSA6XG5cblx0XHQvLyBDaGVjayBhZ2FpbnN0IGFsbCBhbmNlc3Rvci9wcmVjZWRpbmcgZWxlbWVudHNcblx0XHRmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0dmFyIG9sZENhY2hlLCB1bmlxdWVDYWNoZSwgb3V0ZXJDYWNoZSxcblx0XHRcdFx0bmV3Q2FjaGUgPSBbIGRpcnJ1bnMsIGRvbmVOYW1lIF07XG5cblx0XHRcdC8vIFdlIGNhbid0IHNldCBhcmJpdHJhcnkgZGF0YSBvbiBYTUwgbm9kZXMsIHNvIHRoZXkgZG9uJ3QgYmVuZWZpdCBmcm9tIGNvbWJpbmF0b3IgY2FjaGluZ1xuXHRcdFx0aWYgKCB4bWwgKSB7XG5cdFx0XHRcdHdoaWxlICggKGVsZW0gPSBlbGVtWyBkaXIgXSkgKSB7XG5cdFx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxIHx8IGNoZWNrTm9uRWxlbWVudHMgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHdoaWxlICggKGVsZW0gPSBlbGVtWyBkaXIgXSkgKSB7XG5cdFx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxIHx8IGNoZWNrTm9uRWxlbWVudHMgKSB7XG5cdFx0XHRcdFx0XHRvdXRlckNhY2hlID0gZWxlbVsgZXhwYW5kbyBdIHx8IChlbGVtWyBleHBhbmRvIF0gPSB7fSk7XG5cblx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw5IG9ubHlcblx0XHRcdFx0XHRcdC8vIERlZmVuZCBhZ2FpbnN0IGNsb25lZCBhdHRyb3BlcnRpZXMgKGpRdWVyeSBnaC0xNzA5KVxuXHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGUgPSBvdXRlckNhY2hlWyBlbGVtLnVuaXF1ZUlEIF0gfHwgKG91dGVyQ2FjaGVbIGVsZW0udW5pcXVlSUQgXSA9IHt9KTtcblxuXHRcdFx0XHRcdFx0aWYgKCAob2xkQ2FjaGUgPSB1bmlxdWVDYWNoZVsgZGlyIF0pICYmXG5cdFx0XHRcdFx0XHRcdG9sZENhY2hlWyAwIF0gPT09IGRpcnJ1bnMgJiYgb2xkQ2FjaGVbIDEgXSA9PT0gZG9uZU5hbWUgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gQXNzaWduIHRvIG5ld0NhY2hlIHNvIHJlc3VsdHMgYmFjay1wcm9wYWdhdGUgdG8gcHJldmlvdXMgZWxlbWVudHNcblx0XHRcdFx0XHRcdFx0cmV0dXJuIChuZXdDYWNoZVsgMiBdID0gb2xkQ2FjaGVbIDIgXSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQvLyBSZXVzZSBuZXdjYWNoZSBzbyByZXN1bHRzIGJhY2stcHJvcGFnYXRlIHRvIHByZXZpb3VzIGVsZW1lbnRzXG5cdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlWyBkaXIgXSA9IG5ld0NhY2hlO1xuXG5cdFx0XHRcdFx0XHRcdC8vIEEgbWF0Y2ggbWVhbnMgd2UncmUgZG9uZTsgYSBmYWlsIG1lYW5zIHdlIGhhdmUgdG8ga2VlcCBjaGVja2luZ1xuXHRcdFx0XHRcdFx0XHRpZiAoIChuZXdDYWNoZVsgMiBdID0gbWF0Y2hlciggZWxlbSwgY29udGV4dCwgeG1sICkpICkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcbn1cblxuZnVuY3Rpb24gZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICkge1xuXHRyZXR1cm4gbWF0Y2hlcnMubGVuZ3RoID4gMSA/XG5cdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdHZhciBpID0gbWF0Y2hlcnMubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdGlmICggIW1hdGNoZXJzW2ldKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gOlxuXHRcdG1hdGNoZXJzWzBdO1xufVxuXG5mdW5jdGlvbiBtdWx0aXBsZUNvbnRleHRzKCBzZWxlY3RvciwgY29udGV4dHMsIHJlc3VsdHMgKSB7XG5cdHZhciBpID0gMCxcblx0XHRsZW4gPSBjb250ZXh0cy5sZW5ndGg7XG5cdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFNpenpsZSggc2VsZWN0b3IsIGNvbnRleHRzW2ldLCByZXN1bHRzICk7XG5cdH1cblx0cmV0dXJuIHJlc3VsdHM7XG59XG5cbmZ1bmN0aW9uIGNvbmRlbnNlKCB1bm1hdGNoZWQsIG1hcCwgZmlsdGVyLCBjb250ZXh0LCB4bWwgKSB7XG5cdHZhciBlbGVtLFxuXHRcdG5ld1VubWF0Y2hlZCA9IFtdLFxuXHRcdGkgPSAwLFxuXHRcdGxlbiA9IHVubWF0Y2hlZC5sZW5ndGgsXG5cdFx0bWFwcGVkID0gbWFwICE9IG51bGw7XG5cblx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0aWYgKCAoZWxlbSA9IHVubWF0Y2hlZFtpXSkgKSB7XG5cdFx0XHRpZiAoICFmaWx0ZXIgfHwgZmlsdGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApIHtcblx0XHRcdFx0bmV3VW5tYXRjaGVkLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0aWYgKCBtYXBwZWQgKSB7XG5cdFx0XHRcdFx0bWFwLnB1c2goIGkgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBuZXdVbm1hdGNoZWQ7XG59XG5cbmZ1bmN0aW9uIHNldE1hdGNoZXIoIHByZUZpbHRlciwgc2VsZWN0b3IsIG1hdGNoZXIsIHBvc3RGaWx0ZXIsIHBvc3RGaW5kZXIsIHBvc3RTZWxlY3RvciApIHtcblx0aWYgKCBwb3N0RmlsdGVyICYmICFwb3N0RmlsdGVyWyBleHBhbmRvIF0gKSB7XG5cdFx0cG9zdEZpbHRlciA9IHNldE1hdGNoZXIoIHBvc3RGaWx0ZXIgKTtcblx0fVxuXHRpZiAoIHBvc3RGaW5kZXIgJiYgIXBvc3RGaW5kZXJbIGV4cGFuZG8gXSApIHtcblx0XHRwb3N0RmluZGVyID0gc2V0TWF0Y2hlciggcG9zdEZpbmRlciwgcG9zdFNlbGVjdG9yICk7XG5cdH1cblx0cmV0dXJuIG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VlZCwgcmVzdWx0cywgY29udGV4dCwgeG1sICkge1xuXHRcdHZhciB0ZW1wLCBpLCBlbGVtLFxuXHRcdFx0cHJlTWFwID0gW10sXG5cdFx0XHRwb3N0TWFwID0gW10sXG5cdFx0XHRwcmVleGlzdGluZyA9IHJlc3VsdHMubGVuZ3RoLFxuXG5cdFx0XHQvLyBHZXQgaW5pdGlhbCBlbGVtZW50cyBmcm9tIHNlZWQgb3IgY29udGV4dFxuXHRcdFx0ZWxlbXMgPSBzZWVkIHx8IG11bHRpcGxlQ29udGV4dHMoIHNlbGVjdG9yIHx8IFwiKlwiLCBjb250ZXh0Lm5vZGVUeXBlID8gWyBjb250ZXh0IF0gOiBjb250ZXh0LCBbXSApLFxuXG5cdFx0XHQvLyBQcmVmaWx0ZXIgdG8gZ2V0IG1hdGNoZXIgaW5wdXQsIHByZXNlcnZpbmcgYSBtYXAgZm9yIHNlZWQtcmVzdWx0cyBzeW5jaHJvbml6YXRpb25cblx0XHRcdG1hdGNoZXJJbiA9IHByZUZpbHRlciAmJiAoIHNlZWQgfHwgIXNlbGVjdG9yICkgP1xuXHRcdFx0XHRjb25kZW5zZSggZWxlbXMsIHByZU1hcCwgcHJlRmlsdGVyLCBjb250ZXh0LCB4bWwgKSA6XG5cdFx0XHRcdGVsZW1zLFxuXG5cdFx0XHRtYXRjaGVyT3V0ID0gbWF0Y2hlciA/XG5cdFx0XHRcdC8vIElmIHdlIGhhdmUgYSBwb3N0RmluZGVyLCBvciBmaWx0ZXJlZCBzZWVkLCBvciBub24tc2VlZCBwb3N0RmlsdGVyIG9yIHByZWV4aXN0aW5nIHJlc3VsdHMsXG5cdFx0XHRcdHBvc3RGaW5kZXIgfHwgKCBzZWVkID8gcHJlRmlsdGVyIDogcHJlZXhpc3RpbmcgfHwgcG9zdEZpbHRlciApID9cblxuXHRcdFx0XHRcdC8vIC4uLmludGVybWVkaWF0ZSBwcm9jZXNzaW5nIGlzIG5lY2Vzc2FyeVxuXHRcdFx0XHRcdFtdIDpcblxuXHRcdFx0XHRcdC8vIC4uLm90aGVyd2lzZSB1c2UgcmVzdWx0cyBkaXJlY3RseVxuXHRcdFx0XHRcdHJlc3VsdHMgOlxuXHRcdFx0XHRtYXRjaGVySW47XG5cblx0XHQvLyBGaW5kIHByaW1hcnkgbWF0Y2hlc1xuXHRcdGlmICggbWF0Y2hlciApIHtcblx0XHRcdG1hdGNoZXIoIG1hdGNoZXJJbiwgbWF0Y2hlck91dCwgY29udGV4dCwgeG1sICk7XG5cdFx0fVxuXG5cdFx0Ly8gQXBwbHkgcG9zdEZpbHRlclxuXHRcdGlmICggcG9zdEZpbHRlciApIHtcblx0XHRcdHRlbXAgPSBjb25kZW5zZSggbWF0Y2hlck91dCwgcG9zdE1hcCApO1xuXHRcdFx0cG9zdEZpbHRlciggdGVtcCwgW10sIGNvbnRleHQsIHhtbCApO1xuXG5cdFx0XHQvLyBVbi1tYXRjaCBmYWlsaW5nIGVsZW1lbnRzIGJ5IG1vdmluZyB0aGVtIGJhY2sgdG8gbWF0Y2hlckluXG5cdFx0XHRpID0gdGVtcC5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0aWYgKCAoZWxlbSA9IHRlbXBbaV0pICkge1xuXHRcdFx0XHRcdG1hdGNoZXJPdXRbIHBvc3RNYXBbaV0gXSA9ICEobWF0Y2hlckluWyBwb3N0TWFwW2ldIF0gPSBlbGVtKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICggc2VlZCApIHtcblx0XHRcdGlmICggcG9zdEZpbmRlciB8fCBwcmVGaWx0ZXIgKSB7XG5cdFx0XHRcdGlmICggcG9zdEZpbmRlciApIHtcblx0XHRcdFx0XHQvLyBHZXQgdGhlIGZpbmFsIG1hdGNoZXJPdXQgYnkgY29uZGVuc2luZyB0aGlzIGludGVybWVkaWF0ZSBpbnRvIHBvc3RGaW5kZXIgY29udGV4dHNcblx0XHRcdFx0XHR0ZW1wID0gW107XG5cdFx0XHRcdFx0aSA9IG1hdGNoZXJPdXQubGVuZ3RoO1xuXHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoZWxlbSA9IG1hdGNoZXJPdXRbaV0pICkge1xuXHRcdFx0XHRcdFx0XHQvLyBSZXN0b3JlIG1hdGNoZXJJbiBzaW5jZSBlbGVtIGlzIG5vdCB5ZXQgYSBmaW5hbCBtYXRjaFxuXHRcdFx0XHRcdFx0XHR0ZW1wLnB1c2goIChtYXRjaGVySW5baV0gPSBlbGVtKSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwb3N0RmluZGVyKCBudWxsLCAobWF0Y2hlck91dCA9IFtdKSwgdGVtcCwgeG1sICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBNb3ZlIG1hdGNoZWQgZWxlbWVudHMgZnJvbSBzZWVkIHRvIHJlc3VsdHMgdG8ga2VlcCB0aGVtIHN5bmNocm9uaXplZFxuXHRcdFx0XHRpID0gbWF0Y2hlck91dC5sZW5ndGg7XG5cdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdGlmICggKGVsZW0gPSBtYXRjaGVyT3V0W2ldKSAmJlxuXHRcdFx0XHRcdFx0KHRlbXAgPSBwb3N0RmluZGVyID8gaW5kZXhPZiggc2VlZCwgZWxlbSApIDogcHJlTWFwW2ldKSA+IC0xICkge1xuXG5cdFx0XHRcdFx0XHRzZWVkW3RlbXBdID0gIShyZXN1bHRzW3RlbXBdID0gZWxlbSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHQvLyBBZGQgZWxlbWVudHMgdG8gcmVzdWx0cywgdGhyb3VnaCBwb3N0RmluZGVyIGlmIGRlZmluZWRcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWF0Y2hlck91dCA9IGNvbmRlbnNlKFxuXHRcdFx0XHRtYXRjaGVyT3V0ID09PSByZXN1bHRzID9cblx0XHRcdFx0XHRtYXRjaGVyT3V0LnNwbGljZSggcHJlZXhpc3RpbmcsIG1hdGNoZXJPdXQubGVuZ3RoICkgOlxuXHRcdFx0XHRcdG1hdGNoZXJPdXRcblx0XHRcdCk7XG5cdFx0XHRpZiAoIHBvc3RGaW5kZXIgKSB7XG5cdFx0XHRcdHBvc3RGaW5kZXIoIG51bGwsIHJlc3VsdHMsIG1hdGNoZXJPdXQsIHhtbCApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgbWF0Y2hlck91dCApO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXJGcm9tVG9rZW5zKCB0b2tlbnMgKSB7XG5cdHZhciBjaGVja0NvbnRleHQsIG1hdGNoZXIsIGosXG5cdFx0bGVuID0gdG9rZW5zLmxlbmd0aCxcblx0XHRsZWFkaW5nUmVsYXRpdmUgPSBFeHByLnJlbGF0aXZlWyB0b2tlbnNbMF0udHlwZSBdLFxuXHRcdGltcGxpY2l0UmVsYXRpdmUgPSBsZWFkaW5nUmVsYXRpdmUgfHwgRXhwci5yZWxhdGl2ZVtcIiBcIl0sXG5cdFx0aSA9IGxlYWRpbmdSZWxhdGl2ZSA/IDEgOiAwLFxuXG5cdFx0Ly8gVGhlIGZvdW5kYXRpb25hbCBtYXRjaGVyIGVuc3VyZXMgdGhhdCBlbGVtZW50cyBhcmUgcmVhY2hhYmxlIGZyb20gdG9wLWxldmVsIGNvbnRleHQocylcblx0XHRtYXRjaENvbnRleHQgPSBhZGRDb21iaW5hdG9yKCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtID09PSBjaGVja0NvbnRleHQ7XG5cdFx0fSwgaW1wbGljaXRSZWxhdGl2ZSwgdHJ1ZSApLFxuXHRcdG1hdGNoQW55Q29udGV4dCA9IGFkZENvbWJpbmF0b3IoIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGluZGV4T2YoIGNoZWNrQ29udGV4dCwgZWxlbSApID4gLTE7XG5cdFx0fSwgaW1wbGljaXRSZWxhdGl2ZSwgdHJ1ZSApLFxuXHRcdG1hdGNoZXJzID0gWyBmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0dmFyIHJldCA9ICggIWxlYWRpbmdSZWxhdGl2ZSAmJiAoIHhtbCB8fCBjb250ZXh0ICE9PSBvdXRlcm1vc3RDb250ZXh0ICkgKSB8fCAoXG5cdFx0XHRcdChjaGVja0NvbnRleHQgPSBjb250ZXh0KS5ub2RlVHlwZSA/XG5cdFx0XHRcdFx0bWF0Y2hDb250ZXh0KCBlbGVtLCBjb250ZXh0LCB4bWwgKSA6XG5cdFx0XHRcdFx0bWF0Y2hBbnlDb250ZXh0KCBlbGVtLCBjb250ZXh0LCB4bWwgKSApO1xuXHRcdFx0Ly8gQXZvaWQgaGFuZ2luZyBvbnRvIGVsZW1lbnQgKGlzc3VlICMyOTkpXG5cdFx0XHRjaGVja0NvbnRleHQgPSBudWxsO1xuXHRcdFx0cmV0dXJuIHJldDtcblx0XHR9IF07XG5cblx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0aWYgKCAobWF0Y2hlciA9IEV4cHIucmVsYXRpdmVbIHRva2Vuc1tpXS50eXBlIF0pICkge1xuXHRcdFx0bWF0Y2hlcnMgPSBbIGFkZENvbWJpbmF0b3IoZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICksIG1hdGNoZXIpIF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdG1hdGNoZXIgPSBFeHByLmZpbHRlclsgdG9rZW5zW2ldLnR5cGUgXS5hcHBseSggbnVsbCwgdG9rZW5zW2ldLm1hdGNoZXMgKTtcblxuXHRcdFx0Ly8gUmV0dXJuIHNwZWNpYWwgdXBvbiBzZWVpbmcgYSBwb3NpdGlvbmFsIG1hdGNoZXJcblx0XHRcdGlmICggbWF0Y2hlclsgZXhwYW5kbyBdICkge1xuXHRcdFx0XHQvLyBGaW5kIHRoZSBuZXh0IHJlbGF0aXZlIG9wZXJhdG9yIChpZiBhbnkpIGZvciBwcm9wZXIgaGFuZGxpbmdcblx0XHRcdFx0aiA9ICsraTtcblx0XHRcdFx0Zm9yICggOyBqIDwgbGVuOyBqKysgKSB7XG5cdFx0XHRcdFx0aWYgKCBFeHByLnJlbGF0aXZlWyB0b2tlbnNbal0udHlwZSBdICkge1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBzZXRNYXRjaGVyKFxuXHRcdFx0XHRcdGkgPiAxICYmIGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApLFxuXHRcdFx0XHRcdGkgPiAxICYmIHRvU2VsZWN0b3IoXG5cdFx0XHRcdFx0XHQvLyBJZiB0aGUgcHJlY2VkaW5nIHRva2VuIHdhcyBhIGRlc2NlbmRhbnQgY29tYmluYXRvciwgaW5zZXJ0IGFuIGltcGxpY2l0IGFueS1lbGVtZW50IGAqYFxuXHRcdFx0XHRcdFx0dG9rZW5zLnNsaWNlKCAwLCBpIC0gMSApLmNvbmNhdCh7IHZhbHVlOiB0b2tlbnNbIGkgLSAyIF0udHlwZSA9PT0gXCIgXCIgPyBcIipcIiA6IFwiXCIgfSlcblx0XHRcdFx0XHQpLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSxcblx0XHRcdFx0XHRtYXRjaGVyLFxuXHRcdFx0XHRcdGkgPCBqICYmIG1hdGNoZXJGcm9tVG9rZW5zKCB0b2tlbnMuc2xpY2UoIGksIGogKSApLFxuXHRcdFx0XHRcdGogPCBsZW4gJiYgbWF0Y2hlckZyb21Ub2tlbnMoICh0b2tlbnMgPSB0b2tlbnMuc2xpY2UoIGogKSkgKSxcblx0XHRcdFx0XHRqIDwgbGVuICYmIHRvU2VsZWN0b3IoIHRva2VucyApXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRtYXRjaGVycy5wdXNoKCBtYXRjaGVyICk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApO1xufVxuXG5mdW5jdGlvbiBtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMoIGVsZW1lbnRNYXRjaGVycywgc2V0TWF0Y2hlcnMgKSB7XG5cdHZhciBieVNldCA9IHNldE1hdGNoZXJzLmxlbmd0aCA+IDAsXG5cdFx0YnlFbGVtZW50ID0gZWxlbWVudE1hdGNoZXJzLmxlbmd0aCA+IDAsXG5cdFx0c3VwZXJNYXRjaGVyID0gZnVuY3Rpb24oIHNlZWQsIGNvbnRleHQsIHhtbCwgcmVzdWx0cywgb3V0ZXJtb3N0ICkge1xuXHRcdFx0dmFyIGVsZW0sIGosIG1hdGNoZXIsXG5cdFx0XHRcdG1hdGNoZWRDb3VudCA9IDAsXG5cdFx0XHRcdGkgPSBcIjBcIixcblx0XHRcdFx0dW5tYXRjaGVkID0gc2VlZCAmJiBbXSxcblx0XHRcdFx0c2V0TWF0Y2hlZCA9IFtdLFxuXHRcdFx0XHRjb250ZXh0QmFja3VwID0gb3V0ZXJtb3N0Q29udGV4dCxcblx0XHRcdFx0Ly8gV2UgbXVzdCBhbHdheXMgaGF2ZSBlaXRoZXIgc2VlZCBlbGVtZW50cyBvciBvdXRlcm1vc3QgY29udGV4dFxuXHRcdFx0XHRlbGVtcyA9IHNlZWQgfHwgYnlFbGVtZW50ICYmIEV4cHIuZmluZFtcIlRBR1wiXSggXCIqXCIsIG91dGVybW9zdCApLFxuXHRcdFx0XHQvLyBVc2UgaW50ZWdlciBkaXJydW5zIGlmZiB0aGlzIGlzIHRoZSBvdXRlcm1vc3QgbWF0Y2hlclxuXHRcdFx0XHRkaXJydW5zVW5pcXVlID0gKGRpcnJ1bnMgKz0gY29udGV4dEJhY2t1cCA9PSBudWxsID8gMSA6IE1hdGgucmFuZG9tKCkgfHwgMC4xKSxcblx0XHRcdFx0bGVuID0gZWxlbXMubGVuZ3RoO1xuXG5cdFx0XHRpZiAoIG91dGVybW9zdCApIHtcblx0XHRcdFx0b3V0ZXJtb3N0Q29udGV4dCA9IGNvbnRleHQgPT09IGRvY3VtZW50IHx8IGNvbnRleHQgfHwgb3V0ZXJtb3N0O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgZWxlbWVudHMgcGFzc2luZyBlbGVtZW50TWF0Y2hlcnMgZGlyZWN0bHkgdG8gcmVzdWx0c1xuXHRcdFx0Ly8gU3VwcG9ydDogSUU8OSwgU2FmYXJpXG5cdFx0XHQvLyBUb2xlcmF0ZSBOb2RlTGlzdCBwcm9wZXJ0aWVzIChJRTogXCJsZW5ndGhcIjsgU2FmYXJpOiA8bnVtYmVyPikgbWF0Y2hpbmcgZWxlbWVudHMgYnkgaWRcblx0XHRcdGZvciAoIDsgaSAhPT0gbGVuICYmIChlbGVtID0gZWxlbXNbaV0pICE9IG51bGw7IGkrKyApIHtcblx0XHRcdFx0aWYgKCBieUVsZW1lbnQgJiYgZWxlbSApIHtcblx0XHRcdFx0XHRqID0gMDtcblx0XHRcdFx0XHRpZiAoICFjb250ZXh0ICYmIGVsZW0ub3duZXJEb2N1bWVudCAhPT0gZG9jdW1lbnQgKSB7XG5cdFx0XHRcdFx0XHRzZXREb2N1bWVudCggZWxlbSApO1xuXHRcdFx0XHRcdFx0eG1sID0gIWRvY3VtZW50SXNIVE1MO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR3aGlsZSAoIChtYXRjaGVyID0gZWxlbWVudE1hdGNoZXJzW2orK10pICkge1xuXHRcdFx0XHRcdFx0aWYgKCBtYXRjaGVyKCBlbGVtLCBjb250ZXh0IHx8IGRvY3VtZW50LCB4bWwpICkge1xuXHRcdFx0XHRcdFx0XHRyZXN1bHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggb3V0ZXJtb3N0ICkge1xuXHRcdFx0XHRcdFx0ZGlycnVucyA9IGRpcnJ1bnNVbmlxdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gVHJhY2sgdW5tYXRjaGVkIGVsZW1lbnRzIGZvciBzZXQgZmlsdGVyc1xuXHRcdFx0XHRpZiAoIGJ5U2V0ICkge1xuXHRcdFx0XHRcdC8vIFRoZXkgd2lsbCBoYXZlIGdvbmUgdGhyb3VnaCBhbGwgcG9zc2libGUgbWF0Y2hlcnNcblx0XHRcdFx0XHRpZiAoIChlbGVtID0gIW1hdGNoZXIgJiYgZWxlbSkgKSB7XG5cdFx0XHRcdFx0XHRtYXRjaGVkQ291bnQtLTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBMZW5ndGhlbiB0aGUgYXJyYXkgZm9yIGV2ZXJ5IGVsZW1lbnQsIG1hdGNoZWQgb3Igbm90XG5cdFx0XHRcdFx0aWYgKCBzZWVkICkge1xuXHRcdFx0XHRcdFx0dW5tYXRjaGVkLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gYGlgIGlzIG5vdyB0aGUgY291bnQgb2YgZWxlbWVudHMgdmlzaXRlZCBhYm92ZSwgYW5kIGFkZGluZyBpdCB0byBgbWF0Y2hlZENvdW50YFxuXHRcdFx0Ly8gbWFrZXMgdGhlIGxhdHRlciBub25uZWdhdGl2ZS5cblx0XHRcdG1hdGNoZWRDb3VudCArPSBpO1xuXG5cdFx0XHQvLyBBcHBseSBzZXQgZmlsdGVycyB0byB1bm1hdGNoZWQgZWxlbWVudHNcblx0XHRcdC8vIE5PVEU6IFRoaXMgY2FuIGJlIHNraXBwZWQgaWYgdGhlcmUgYXJlIG5vIHVubWF0Y2hlZCBlbGVtZW50cyAoaS5lLiwgYG1hdGNoZWRDb3VudGBcblx0XHRcdC8vIGVxdWFscyBgaWApLCB1bmxlc3Mgd2UgZGlkbid0IHZpc2l0IF9hbnlfIGVsZW1lbnRzIGluIHRoZSBhYm92ZSBsb29wIGJlY2F1c2Ugd2UgaGF2ZVxuXHRcdFx0Ly8gbm8gZWxlbWVudCBtYXRjaGVycyBhbmQgbm8gc2VlZC5cblx0XHRcdC8vIEluY3JlbWVudGluZyBhbiBpbml0aWFsbHktc3RyaW5nIFwiMFwiIGBpYCBhbGxvd3MgYGlgIHRvIHJlbWFpbiBhIHN0cmluZyBvbmx5IGluIHRoYXRcblx0XHRcdC8vIGNhc2UsIHdoaWNoIHdpbGwgcmVzdWx0IGluIGEgXCIwMFwiIGBtYXRjaGVkQ291bnRgIHRoYXQgZGlmZmVycyBmcm9tIGBpYCBidXQgaXMgYWxzb1xuXHRcdFx0Ly8gbnVtZXJpY2FsbHkgemVyby5cblx0XHRcdGlmICggYnlTZXQgJiYgaSAhPT0gbWF0Y2hlZENvdW50ICkge1xuXHRcdFx0XHRqID0gMDtcblx0XHRcdFx0d2hpbGUgKCAobWF0Y2hlciA9IHNldE1hdGNoZXJzW2orK10pICkge1xuXHRcdFx0XHRcdG1hdGNoZXIoIHVubWF0Y2hlZCwgc2V0TWF0Y2hlZCwgY29udGV4dCwgeG1sICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIHNlZWQgKSB7XG5cdFx0XHRcdFx0Ly8gUmVpbnRlZ3JhdGUgZWxlbWVudCBtYXRjaGVzIHRvIGVsaW1pbmF0ZSB0aGUgbmVlZCBmb3Igc29ydGluZ1xuXHRcdFx0XHRcdGlmICggbWF0Y2hlZENvdW50ID4gMCApIHtcblx0XHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdFx0XHRpZiAoICEodW5tYXRjaGVkW2ldIHx8IHNldE1hdGNoZWRbaV0pICkge1xuXHRcdFx0XHRcdFx0XHRcdHNldE1hdGNoZWRbaV0gPSBwb3AuY2FsbCggcmVzdWx0cyApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gRGlzY2FyZCBpbmRleCBwbGFjZWhvbGRlciB2YWx1ZXMgdG8gZ2V0IG9ubHkgYWN0dWFsIG1hdGNoZXNcblx0XHRcdFx0XHRzZXRNYXRjaGVkID0gY29uZGVuc2UoIHNldE1hdGNoZWQgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFkZCBtYXRjaGVzIHRvIHJlc3VsdHNcblx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgc2V0TWF0Y2hlZCApO1xuXG5cdFx0XHRcdC8vIFNlZWRsZXNzIHNldCBtYXRjaGVzIHN1Y2NlZWRpbmcgbXVsdGlwbGUgc3VjY2Vzc2Z1bCBtYXRjaGVycyBzdGlwdWxhdGUgc29ydGluZ1xuXHRcdFx0XHRpZiAoIG91dGVybW9zdCAmJiAhc2VlZCAmJiBzZXRNYXRjaGVkLmxlbmd0aCA+IDAgJiZcblx0XHRcdFx0XHQoIG1hdGNoZWRDb3VudCArIHNldE1hdGNoZXJzLmxlbmd0aCApID4gMSApIHtcblxuXHRcdFx0XHRcdFNpenpsZS51bmlxdWVTb3J0KCByZXN1bHRzICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gT3ZlcnJpZGUgbWFuaXB1bGF0aW9uIG9mIGdsb2JhbHMgYnkgbmVzdGVkIG1hdGNoZXJzXG5cdFx0XHRpZiAoIG91dGVybW9zdCApIHtcblx0XHRcdFx0ZGlycnVucyA9IGRpcnJ1bnNVbmlxdWU7XG5cdFx0XHRcdG91dGVybW9zdENvbnRleHQgPSBjb250ZXh0QmFja3VwO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdW5tYXRjaGVkO1xuXHRcdH07XG5cblx0cmV0dXJuIGJ5U2V0ID9cblx0XHRtYXJrRnVuY3Rpb24oIHN1cGVyTWF0Y2hlciApIDpcblx0XHRzdXBlck1hdGNoZXI7XG59XG5cbmNvbXBpbGUgPSBTaXp6bGUuY29tcGlsZSA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgbWF0Y2ggLyogSW50ZXJuYWwgVXNlIE9ubHkgKi8gKSB7XG5cdHZhciBpLFxuXHRcdHNldE1hdGNoZXJzID0gW10sXG5cdFx0ZWxlbWVudE1hdGNoZXJzID0gW10sXG5cdFx0Y2FjaGVkID0gY29tcGlsZXJDYWNoZVsgc2VsZWN0b3IgKyBcIiBcIiBdO1xuXG5cdGlmICggIWNhY2hlZCApIHtcblx0XHQvLyBHZW5lcmF0ZSBhIGZ1bmN0aW9uIG9mIHJlY3Vyc2l2ZSBmdW5jdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCB0byBjaGVjayBlYWNoIGVsZW1lbnRcblx0XHRpZiAoICFtYXRjaCApIHtcblx0XHRcdG1hdGNoID0gdG9rZW5pemUoIHNlbGVjdG9yICk7XG5cdFx0fVxuXHRcdGkgPSBtYXRjaC5sZW5ndGg7XG5cdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRjYWNoZWQgPSBtYXRjaGVyRnJvbVRva2VucyggbWF0Y2hbaV0gKTtcblx0XHRcdGlmICggY2FjaGVkWyBleHBhbmRvIF0gKSB7XG5cdFx0XHRcdHNldE1hdGNoZXJzLnB1c2goIGNhY2hlZCApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWxlbWVudE1hdGNoZXJzLnB1c2goIGNhY2hlZCApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIENhY2hlIHRoZSBjb21waWxlZCBmdW5jdGlvblxuXHRcdGNhY2hlZCA9IGNvbXBpbGVyQ2FjaGUoIHNlbGVjdG9yLCBtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMoIGVsZW1lbnRNYXRjaGVycywgc2V0TWF0Y2hlcnMgKSApO1xuXG5cdFx0Ly8gU2F2ZSBzZWxlY3RvciBhbmQgdG9rZW5pemF0aW9uXG5cdFx0Y2FjaGVkLnNlbGVjdG9yID0gc2VsZWN0b3I7XG5cdH1cblx0cmV0dXJuIGNhY2hlZDtcbn07XG5cbi8qKlxuICogQSBsb3ctbGV2ZWwgc2VsZWN0aW9uIGZ1bmN0aW9uIHRoYXQgd29ya3Mgd2l0aCBTaXp6bGUncyBjb21waWxlZFxuICogIHNlbGVjdG9yIGZ1bmN0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IHNlbGVjdG9yIEEgc2VsZWN0b3Igb3IgYSBwcmUtY29tcGlsZWRcbiAqICBzZWxlY3RvciBmdW5jdGlvbiBidWlsdCB3aXRoIFNpenpsZS5jb21waWxlXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNvbnRleHRcbiAqIEBwYXJhbSB7QXJyYXl9IFtyZXN1bHRzXVxuICogQHBhcmFtIHtBcnJheX0gW3NlZWRdIEEgc2V0IG9mIGVsZW1lbnRzIHRvIG1hdGNoIGFnYWluc3RcbiAqL1xuc2VsZWN0ID0gU2l6emxlLnNlbGVjdCA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApIHtcblx0dmFyIGksIHRva2VucywgdG9rZW4sIHR5cGUsIGZpbmQsXG5cdFx0Y29tcGlsZWQgPSB0eXBlb2Ygc2VsZWN0b3IgPT09IFwiZnVuY3Rpb25cIiAmJiBzZWxlY3Rvcixcblx0XHRtYXRjaCA9ICFzZWVkICYmIHRva2VuaXplKCAoc2VsZWN0b3IgPSBjb21waWxlZC5zZWxlY3RvciB8fCBzZWxlY3RvcikgKTtcblxuXHRyZXN1bHRzID0gcmVzdWx0cyB8fCBbXTtcblxuXHQvLyBUcnkgdG8gbWluaW1pemUgb3BlcmF0aW9ucyBpZiB0aGVyZSBpcyBvbmx5IG9uZSBzZWxlY3RvciBpbiB0aGUgbGlzdCBhbmQgbm8gc2VlZFxuXHQvLyAodGhlIGxhdHRlciBvZiB3aGljaCBndWFyYW50ZWVzIHVzIGNvbnRleHQpXG5cdGlmICggbWF0Y2gubGVuZ3RoID09PSAxICkge1xuXG5cdFx0Ly8gUmVkdWNlIGNvbnRleHQgaWYgdGhlIGxlYWRpbmcgY29tcG91bmQgc2VsZWN0b3IgaXMgYW4gSURcblx0XHR0b2tlbnMgPSBtYXRjaFswXSA9IG1hdGNoWzBdLnNsaWNlKCAwICk7XG5cdFx0aWYgKCB0b2tlbnMubGVuZ3RoID4gMiAmJiAodG9rZW4gPSB0b2tlbnNbMF0pLnR5cGUgPT09IFwiSURcIiAmJlxuXHRcdFx0XHRzdXBwb3J0LmdldEJ5SWQgJiYgY29udGV4dC5ub2RlVHlwZSA9PT0gOSAmJiBkb2N1bWVudElzSFRNTCAmJlxuXHRcdFx0XHRFeHByLnJlbGF0aXZlWyB0b2tlbnNbMV0udHlwZSBdICkge1xuXG5cdFx0XHRjb250ZXh0ID0gKCBFeHByLmZpbmRbXCJJRFwiXSggdG9rZW4ubWF0Y2hlc1swXS5yZXBsYWNlKHJ1bmVzY2FwZSwgZnVuZXNjYXBlKSwgY29udGV4dCApIHx8IFtdIClbMF07XG5cdFx0XHRpZiAoICFjb250ZXh0ICkge1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblxuXHRcdFx0Ly8gUHJlY29tcGlsZWQgbWF0Y2hlcnMgd2lsbCBzdGlsbCB2ZXJpZnkgYW5jZXN0cnksIHNvIHN0ZXAgdXAgYSBsZXZlbFxuXHRcdFx0fSBlbHNlIGlmICggY29tcGlsZWQgKSB7XG5cdFx0XHRcdGNvbnRleHQgPSBjb250ZXh0LnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdHNlbGVjdG9yID0gc2VsZWN0b3Iuc2xpY2UoIHRva2Vucy5zaGlmdCgpLnZhbHVlLmxlbmd0aCApO1xuXHRcdH1cblxuXHRcdC8vIEZldGNoIGEgc2VlZCBzZXQgZm9yIHJpZ2h0LXRvLWxlZnQgbWF0Y2hpbmdcblx0XHRpID0gbWF0Y2hFeHByW1wibmVlZHNDb250ZXh0XCJdLnRlc3QoIHNlbGVjdG9yICkgPyAwIDogdG9rZW5zLmxlbmd0aDtcblx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdHRva2VuID0gdG9rZW5zW2ldO1xuXG5cdFx0XHQvLyBBYm9ydCBpZiB3ZSBoaXQgYSBjb21iaW5hdG9yXG5cdFx0XHRpZiAoIEV4cHIucmVsYXRpdmVbICh0eXBlID0gdG9rZW4udHlwZSkgXSApIHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIChmaW5kID0gRXhwci5maW5kWyB0eXBlIF0pICkge1xuXHRcdFx0XHQvLyBTZWFyY2gsIGV4cGFuZGluZyBjb250ZXh0IGZvciBsZWFkaW5nIHNpYmxpbmcgY29tYmluYXRvcnNcblx0XHRcdFx0aWYgKCAoc2VlZCA9IGZpbmQoXG5cdFx0XHRcdFx0dG9rZW4ubWF0Y2hlc1swXS5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLFxuXHRcdFx0XHRcdHJzaWJsaW5nLnRlc3QoIHRva2Vuc1swXS50eXBlICkgJiYgdGVzdENvbnRleHQoIGNvbnRleHQucGFyZW50Tm9kZSApIHx8IGNvbnRleHRcblx0XHRcdFx0KSkgKSB7XG5cblx0XHRcdFx0XHQvLyBJZiBzZWVkIGlzIGVtcHR5IG9yIG5vIHRva2VucyByZW1haW4sIHdlIGNhbiByZXR1cm4gZWFybHlcblx0XHRcdFx0XHR0b2tlbnMuc3BsaWNlKCBpLCAxICk7XG5cdFx0XHRcdFx0c2VsZWN0b3IgPSBzZWVkLmxlbmd0aCAmJiB0b1NlbGVjdG9yKCB0b2tlbnMgKTtcblx0XHRcdFx0XHRpZiAoICFzZWxlY3RvciApIHtcblx0XHRcdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIHNlZWQgKTtcblx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gQ29tcGlsZSBhbmQgZXhlY3V0ZSBhIGZpbHRlcmluZyBmdW5jdGlvbiBpZiBvbmUgaXMgbm90IHByb3ZpZGVkXG5cdC8vIFByb3ZpZGUgYG1hdGNoYCB0byBhdm9pZCByZXRva2VuaXphdGlvbiBpZiB3ZSBtb2RpZmllZCB0aGUgc2VsZWN0b3IgYWJvdmVcblx0KCBjb21waWxlZCB8fCBjb21waWxlKCBzZWxlY3RvciwgbWF0Y2ggKSApKFxuXHRcdHNlZWQsXG5cdFx0Y29udGV4dCxcblx0XHQhZG9jdW1lbnRJc0hUTUwsXG5cdFx0cmVzdWx0cyxcblx0XHQhY29udGV4dCB8fCByc2libGluZy50ZXN0KCBzZWxlY3RvciApICYmIHRlc3RDb250ZXh0KCBjb250ZXh0LnBhcmVudE5vZGUgKSB8fCBjb250ZXh0XG5cdCk7XG5cdHJldHVybiByZXN1bHRzO1xufTtcblxuLy8gT25lLXRpbWUgYXNzaWdubWVudHNcblxuLy8gU29ydCBzdGFiaWxpdHlcbnN1cHBvcnQuc29ydFN0YWJsZSA9IGV4cGFuZG8uc3BsaXQoXCJcIikuc29ydCggc29ydE9yZGVyICkuam9pbihcIlwiKSA9PT0gZXhwYW5kbztcblxuLy8gU3VwcG9ydDogQ2hyb21lIDE0LTM1K1xuLy8gQWx3YXlzIGFzc3VtZSBkdXBsaWNhdGVzIGlmIHRoZXkgYXJlbid0IHBhc3NlZCB0byB0aGUgY29tcGFyaXNvbiBmdW5jdGlvblxuc3VwcG9ydC5kZXRlY3REdXBsaWNhdGVzID0gISFoYXNEdXBsaWNhdGU7XG5cbi8vIEluaXRpYWxpemUgYWdhaW5zdCB0aGUgZGVmYXVsdCBkb2N1bWVudFxuc2V0RG9jdW1lbnQoKTtcblxuLy8gU3VwcG9ydDogV2Via2l0PDUzNy4zMiAtIFNhZmFyaSA2LjAuMy9DaHJvbWUgMjUgKGZpeGVkIGluIENocm9tZSAyNylcbi8vIERldGFjaGVkIG5vZGVzIGNvbmZvdW5kaW5nbHkgZm9sbG93ICplYWNoIG90aGVyKlxuc3VwcG9ydC5zb3J0RGV0YWNoZWQgPSBhc3NlcnQoZnVuY3Rpb24oIGRpdjEgKSB7XG5cdC8vIFNob3VsZCByZXR1cm4gMSwgYnV0IHJldHVybnMgNCAoZm9sbG93aW5nKVxuXHRyZXR1cm4gZGl2MS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSApICYgMTtcbn0pO1xuXG4vLyBTdXBwb3J0OiBJRTw4XG4vLyBQcmV2ZW50IGF0dHJpYnV0ZS9wcm9wZXJ0eSBcImludGVycG9sYXRpb25cIlxuLy8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zNTM2NDI5JTI4VlMuODUlMjkuYXNweFxuaWYgKCAhYXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG5cdGRpdi5pbm5lckhUTUwgPSBcIjxhIGhyZWY9JyMnPjwvYT5cIjtcblx0cmV0dXJuIGRpdi5maXJzdENoaWxkLmdldEF0dHJpYnV0ZShcImhyZWZcIikgPT09IFwiI1wiIDtcbn0pICkge1xuXHRhZGRIYW5kbGUoIFwidHlwZXxocmVmfGhlaWdodHx3aWR0aFwiLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG5cdFx0aWYgKCAhaXNYTUwgKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoIG5hbWUsIG5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJ0eXBlXCIgPyAxIDogMiApO1xuXHRcdH1cblx0fSk7XG59XG5cbi8vIFN1cHBvcnQ6IElFPDlcbi8vIFVzZSBkZWZhdWx0VmFsdWUgaW4gcGxhY2Ugb2YgZ2V0QXR0cmlidXRlKFwidmFsdWVcIilcbmlmICggIXN1cHBvcnQuYXR0cmlidXRlcyB8fCAhYXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG5cdGRpdi5pbm5lckhUTUwgPSBcIjxpbnB1dC8+XCI7XG5cdGRpdi5maXJzdENoaWxkLnNldEF0dHJpYnV0ZSggXCJ2YWx1ZVwiLCBcIlwiICk7XG5cdHJldHVybiBkaXYuZmlyc3RDaGlsZC5nZXRBdHRyaWJ1dGUoIFwidmFsdWVcIiApID09PSBcIlwiO1xufSkgKSB7XG5cdGFkZEhhbmRsZSggXCJ2YWx1ZVwiLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG5cdFx0aWYgKCAhaXNYTUwgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlucHV0XCIgKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5kZWZhdWx0VmFsdWU7XG5cdFx0fVxuXHR9KTtcbn1cblxuLy8gU3VwcG9ydDogSUU8OVxuLy8gVXNlIGdldEF0dHJpYnV0ZU5vZGUgdG8gZmV0Y2ggYm9vbGVhbnMgd2hlbiBnZXRBdHRyaWJ1dGUgbGllc1xuaWYgKCAhYXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG5cdHJldHVybiBkaXYuZ2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIikgPT0gbnVsbDtcbn0pICkge1xuXHRhZGRIYW5kbGUoIGJvb2xlYW5zLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG5cdFx0dmFyIHZhbDtcblx0XHRpZiAoICFpc1hNTCApIHtcblx0XHRcdHJldHVybiBlbGVtWyBuYW1lIF0gPT09IHRydWUgPyBuYW1lLnRvTG93ZXJDYXNlKCkgOlxuXHRcdFx0XHRcdCh2YWwgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoIG5hbWUgKSkgJiYgdmFsLnNwZWNpZmllZCA/XG5cdFx0XHRcdFx0dmFsLnZhbHVlIDpcblx0XHRcdFx0bnVsbDtcblx0XHR9XG5cdH0pO1xufVxuXG5yZXR1cm4gU2l6emxlO1xuXG59KSggd2luZG93ICk7XG5cblxuXG5qUXVlcnkuZmluZCA9IFNpenpsZTtcbmpRdWVyeS5leHByID0gU2l6emxlLnNlbGVjdG9ycztcbmpRdWVyeS5leHByWyBcIjpcIiBdID0galF1ZXJ5LmV4cHIucHNldWRvcztcbmpRdWVyeS51bmlxdWVTb3J0ID0galF1ZXJ5LnVuaXF1ZSA9IFNpenpsZS51bmlxdWVTb3J0O1xualF1ZXJ5LnRleHQgPSBTaXp6bGUuZ2V0VGV4dDtcbmpRdWVyeS5pc1hNTERvYyA9IFNpenpsZS5pc1hNTDtcbmpRdWVyeS5jb250YWlucyA9IFNpenpsZS5jb250YWlucztcblxuXG5cbnZhciBkaXIgPSBmdW5jdGlvbiggZWxlbSwgZGlyLCB1bnRpbCApIHtcblx0dmFyIG1hdGNoZWQgPSBbXSxcblx0XHR0cnVuY2F0ZSA9IHVudGlsICE9PSB1bmRlZmluZWQ7XG5cblx0d2hpbGUgKCAoIGVsZW0gPSBlbGVtWyBkaXIgXSApICYmIGVsZW0ubm9kZVR5cGUgIT09IDkgKSB7XG5cdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0aWYgKCB0cnVuY2F0ZSAmJiBqUXVlcnkoIGVsZW0gKS5pcyggdW50aWwgKSApIHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRtYXRjaGVkLnB1c2goIGVsZW0gKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIG1hdGNoZWQ7XG59O1xuXG5cbnZhciBzaWJsaW5ncyA9IGZ1bmN0aW9uKCBuLCBlbGVtICkge1xuXHR2YXIgbWF0Y2hlZCA9IFtdO1xuXG5cdGZvciAoIDsgbjsgbiA9IG4ubmV4dFNpYmxpbmcgKSB7XG5cdFx0aWYgKCBuLm5vZGVUeXBlID09PSAxICYmIG4gIT09IGVsZW0gKSB7XG5cdFx0XHRtYXRjaGVkLnB1c2goIG4gKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gbWF0Y2hlZDtcbn07XG5cblxudmFyIHJuZWVkc0NvbnRleHQgPSBqUXVlcnkuZXhwci5tYXRjaC5uZWVkc0NvbnRleHQ7XG5cbnZhciByc2luZ2xlVGFnID0gKCAvXjwoW1xcdy1dKylcXHMqXFwvPz4oPzo8XFwvXFwxPnwpJC8gKTtcblxuXG5cbnZhciByaXNTaW1wbGUgPSAvXi5bXjojXFxbXFwuLF0qJC87XG5cbi8vIEltcGxlbWVudCB0aGUgaWRlbnRpY2FsIGZ1bmN0aW9uYWxpdHkgZm9yIGZpbHRlciBhbmQgbm90XG5mdW5jdGlvbiB3aW5ub3coIGVsZW1lbnRzLCBxdWFsaWZpZXIsIG5vdCApIHtcblx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggcXVhbGlmaWVyICkgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5ncmVwKCBlbGVtZW50cywgZnVuY3Rpb24oIGVsZW0sIGkgKSB7XG5cdFx0XHQvKiBqc2hpbnQgLVcwMTggKi9cblx0XHRcdHJldHVybiAhIXF1YWxpZmllci5jYWxsKCBlbGVtLCBpLCBlbGVtICkgIT09IG5vdDtcblx0XHR9ICk7XG5cblx0fVxuXG5cdGlmICggcXVhbGlmaWVyLm5vZGVUeXBlICkge1xuXHRcdHJldHVybiBqUXVlcnkuZ3JlcCggZWxlbWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuICggZWxlbSA9PT0gcXVhbGlmaWVyICkgIT09IG5vdDtcblx0XHR9ICk7XG5cblx0fVxuXG5cdGlmICggdHlwZW9mIHF1YWxpZmllciA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRpZiAoIHJpc1NpbXBsZS50ZXN0KCBxdWFsaWZpZXIgKSApIHtcblx0XHRcdHJldHVybiBqUXVlcnkuZmlsdGVyKCBxdWFsaWZpZXIsIGVsZW1lbnRzLCBub3QgKTtcblx0XHR9XG5cblx0XHRxdWFsaWZpZXIgPSBqUXVlcnkuZmlsdGVyKCBxdWFsaWZpZXIsIGVsZW1lbnRzICk7XG5cdH1cblxuXHRyZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gKCBpbmRleE9mLmNhbGwoIHF1YWxpZmllciwgZWxlbSApID4gLTEgKSAhPT0gbm90O1xuXHR9ICk7XG59XG5cbmpRdWVyeS5maWx0ZXIgPSBmdW5jdGlvbiggZXhwciwgZWxlbXMsIG5vdCApIHtcblx0dmFyIGVsZW0gPSBlbGVtc1sgMCBdO1xuXG5cdGlmICggbm90ICkge1xuXHRcdGV4cHIgPSBcIjpub3QoXCIgKyBleHByICsgXCIpXCI7XG5cdH1cblxuXHRyZXR1cm4gZWxlbXMubGVuZ3RoID09PSAxICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgP1xuXHRcdGpRdWVyeS5maW5kLm1hdGNoZXNTZWxlY3RvciggZWxlbSwgZXhwciApID8gWyBlbGVtIF0gOiBbXSA6XG5cdFx0alF1ZXJ5LmZpbmQubWF0Y2hlcyggZXhwciwgalF1ZXJ5LmdyZXAoIGVsZW1zLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtLm5vZGVUeXBlID09PSAxO1xuXHRcdH0gKSApO1xufTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRmaW5kOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0dmFyIGksXG5cdFx0XHRsZW4gPSB0aGlzLmxlbmd0aCxcblx0XHRcdHJldCA9IFtdLFxuXHRcdFx0c2VsZiA9IHRoaXM7XG5cblx0XHRpZiAoIHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggalF1ZXJ5KCBzZWxlY3RvciApLmZpbHRlciggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGZvciAoIGkgPSAwOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRcdFx0aWYgKCBqUXVlcnkuY29udGFpbnMoIHNlbGZbIGkgXSwgdGhpcyApICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9ICkgKTtcblx0XHR9XG5cblx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0alF1ZXJ5LmZpbmQoIHNlbGVjdG9yLCBzZWxmWyBpIF0sIHJldCApO1xuXHRcdH1cblxuXHRcdC8vIE5lZWRlZCBiZWNhdXNlICQoIHNlbGVjdG9yLCBjb250ZXh0ICkgYmVjb21lcyAkKCBjb250ZXh0ICkuZmluZCggc2VsZWN0b3IgKVxuXHRcdHJldCA9IHRoaXMucHVzaFN0YWNrKCBsZW4gPiAxID8galF1ZXJ5LnVuaXF1ZSggcmV0ICkgOiByZXQgKTtcblx0XHRyZXQuc2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9yID8gdGhpcy5zZWxlY3RvciArIFwiIFwiICsgc2VsZWN0b3IgOiBzZWxlY3Rvcjtcblx0XHRyZXR1cm4gcmV0O1xuXHR9LFxuXHRmaWx0ZXI6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHdpbm5vdyggdGhpcywgc2VsZWN0b3IgfHwgW10sIGZhbHNlICkgKTtcblx0fSxcblx0bm90OiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCB3aW5ub3coIHRoaXMsIHNlbGVjdG9yIHx8IFtdLCB0cnVlICkgKTtcblx0fSxcblx0aXM6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gISF3aW5ub3coXG5cdFx0XHR0aGlzLFxuXG5cdFx0XHQvLyBJZiB0aGlzIGlzIGEgcG9zaXRpb25hbC9yZWxhdGl2ZSBzZWxlY3RvciwgY2hlY2sgbWVtYmVyc2hpcCBpbiB0aGUgcmV0dXJuZWQgc2V0XG5cdFx0XHQvLyBzbyAkKFwicDpmaXJzdFwiKS5pcyhcInA6bGFzdFwiKSB3b24ndCByZXR1cm4gdHJ1ZSBmb3IgYSBkb2Mgd2l0aCB0d28gXCJwXCIuXG5cdFx0XHR0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgJiYgcm5lZWRzQ29udGV4dC50ZXN0KCBzZWxlY3RvciApID9cblx0XHRcdFx0alF1ZXJ5KCBzZWxlY3RvciApIDpcblx0XHRcdFx0c2VsZWN0b3IgfHwgW10sXG5cdFx0XHRmYWxzZVxuXHRcdCkubGVuZ3RoO1xuXHR9XG59ICk7XG5cblxuLy8gSW5pdGlhbGl6ZSBhIGpRdWVyeSBvYmplY3RcblxuXG4vLyBBIGNlbnRyYWwgcmVmZXJlbmNlIHRvIHRoZSByb290IGpRdWVyeShkb2N1bWVudClcbnZhciByb290alF1ZXJ5LFxuXG5cdC8vIEEgc2ltcGxlIHdheSB0byBjaGVjayBmb3IgSFRNTCBzdHJpbmdzXG5cdC8vIFByaW9yaXRpemUgI2lkIG92ZXIgPHRhZz4gdG8gYXZvaWQgWFNTIHZpYSBsb2NhdGlvbi5oYXNoICgjOTUyMSlcblx0Ly8gU3RyaWN0IEhUTUwgcmVjb2duaXRpb24gKCMxMTI5MDogbXVzdCBzdGFydCB3aXRoIDwpXG5cdHJxdWlja0V4cHIgPSAvXig/OlxccyooPFtcXHdcXFddKz4pW14+XSp8IyhbXFx3LV0qKSkkLyxcblxuXHRpbml0ID0galF1ZXJ5LmZuLmluaXQgPSBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQsIHJvb3QgKSB7XG5cdFx0dmFyIG1hdGNoLCBlbGVtO1xuXG5cdFx0Ly8gSEFORExFOiAkKFwiXCIpLCAkKG51bGwpLCAkKHVuZGVmaW5lZCksICQoZmFsc2UpXG5cdFx0aWYgKCAhc2VsZWN0b3IgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHQvLyBNZXRob2QgaW5pdCgpIGFjY2VwdHMgYW4gYWx0ZXJuYXRlIHJvb3RqUXVlcnlcblx0XHQvLyBzbyBtaWdyYXRlIGNhbiBzdXBwb3J0IGpRdWVyeS5zdWIgKGdoLTIxMDEpXG5cdFx0cm9vdCA9IHJvb3QgfHwgcm9vdGpRdWVyeTtcblxuXHRcdC8vIEhhbmRsZSBIVE1MIHN0cmluZ3Ncblx0XHRpZiAoIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdGlmICggc2VsZWN0b3JbIDAgXSA9PT0gXCI8XCIgJiZcblx0XHRcdFx0c2VsZWN0b3JbIHNlbGVjdG9yLmxlbmd0aCAtIDEgXSA9PT0gXCI+XCIgJiZcblx0XHRcdFx0c2VsZWN0b3IubGVuZ3RoID49IDMgKSB7XG5cblx0XHRcdFx0Ly8gQXNzdW1lIHRoYXQgc3RyaW5ncyB0aGF0IHN0YXJ0IGFuZCBlbmQgd2l0aCA8PiBhcmUgSFRNTCBhbmQgc2tpcCB0aGUgcmVnZXggY2hlY2tcblx0XHRcdFx0bWF0Y2ggPSBbIG51bGwsIHNlbGVjdG9yLCBudWxsIF07XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG1hdGNoID0gcnF1aWNrRXhwci5leGVjKCBzZWxlY3RvciApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBNYXRjaCBodG1sIG9yIG1ha2Ugc3VyZSBubyBjb250ZXh0IGlzIHNwZWNpZmllZCBmb3IgI2lkXG5cdFx0XHRpZiAoIG1hdGNoICYmICggbWF0Y2hbIDEgXSB8fCAhY29udGV4dCApICkge1xuXG5cdFx0XHRcdC8vIEhBTkRMRTogJChodG1sKSAtPiAkKGFycmF5KVxuXHRcdFx0XHRpZiAoIG1hdGNoWyAxIF0gKSB7XG5cdFx0XHRcdFx0Y29udGV4dCA9IGNvbnRleHQgaW5zdGFuY2VvZiBqUXVlcnkgPyBjb250ZXh0WyAwIF0gOiBjb250ZXh0O1xuXG5cdFx0XHRcdFx0Ly8gT3B0aW9uIHRvIHJ1biBzY3JpcHRzIGlzIHRydWUgZm9yIGJhY2stY29tcGF0XG5cdFx0XHRcdFx0Ly8gSW50ZW50aW9uYWxseSBsZXQgdGhlIGVycm9yIGJlIHRocm93biBpZiBwYXJzZUhUTUwgaXMgbm90IHByZXNlbnRcblx0XHRcdFx0XHRqUXVlcnkubWVyZ2UoIHRoaXMsIGpRdWVyeS5wYXJzZUhUTUwoXG5cdFx0XHRcdFx0XHRtYXRjaFsgMSBdLFxuXHRcdFx0XHRcdFx0Y29udGV4dCAmJiBjb250ZXh0Lm5vZGVUeXBlID8gY29udGV4dC5vd25lckRvY3VtZW50IHx8IGNvbnRleHQgOiBkb2N1bWVudCxcblx0XHRcdFx0XHRcdHRydWVcblx0XHRcdFx0XHQpICk7XG5cblx0XHRcdFx0XHQvLyBIQU5ETEU6ICQoaHRtbCwgcHJvcHMpXG5cdFx0XHRcdFx0aWYgKCByc2luZ2xlVGFnLnRlc3QoIG1hdGNoWyAxIF0gKSAmJiBqUXVlcnkuaXNQbGFpbk9iamVjdCggY29udGV4dCApICkge1xuXHRcdFx0XHRcdFx0Zm9yICggbWF0Y2ggaW4gY29udGV4dCApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBQcm9wZXJ0aWVzIG9mIGNvbnRleHQgYXJlIGNhbGxlZCBhcyBtZXRob2RzIGlmIHBvc3NpYmxlXG5cdFx0XHRcdFx0XHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHRoaXNbIG1hdGNoIF0gKSApIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzWyBtYXRjaCBdKCBjb250ZXh0WyBtYXRjaCBdICk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gLi4uYW5kIG90aGVyd2lzZSBzZXQgYXMgYXR0cmlidXRlc1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuYXR0ciggbWF0Y2gsIGNvbnRleHRbIG1hdGNoIF0gKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0XHRcdC8vIEhBTkRMRTogJCgjaWQpXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBtYXRjaFsgMiBdICk7XG5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBCbGFja2JlcnJ5IDQuNlxuXHRcdFx0XHRcdC8vIGdFQklEIHJldHVybnMgbm9kZXMgbm8gbG9uZ2VyIGluIHRoZSBkb2N1bWVudCAoIzY5NjMpXG5cdFx0XHRcdFx0aWYgKCBlbGVtICYmIGVsZW0ucGFyZW50Tm9kZSApIHtcblxuXHRcdFx0XHRcdFx0Ly8gSW5qZWN0IHRoZSBlbGVtZW50IGRpcmVjdGx5IGludG8gdGhlIGpRdWVyeSBvYmplY3Rcblx0XHRcdFx0XHRcdHRoaXMubGVuZ3RoID0gMTtcblx0XHRcdFx0XHRcdHRoaXNbIDAgXSA9IGVsZW07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhpcy5jb250ZXh0ID0gZG9jdW1lbnQ7XG5cdFx0XHRcdFx0dGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8vIEhBTkRMRTogJChleHByLCAkKC4uLikpXG5cdFx0XHR9IGVsc2UgaWYgKCAhY29udGV4dCB8fCBjb250ZXh0LmpxdWVyeSApIHtcblx0XHRcdFx0cmV0dXJuICggY29udGV4dCB8fCByb290ICkuZmluZCggc2VsZWN0b3IgKTtcblxuXHRcdFx0Ly8gSEFORExFOiAkKGV4cHIsIGNvbnRleHQpXG5cdFx0XHQvLyAod2hpY2ggaXMganVzdCBlcXVpdmFsZW50IHRvOiAkKGNvbnRleHQpLmZpbmQoZXhwcilcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yKCBjb250ZXh0ICkuZmluZCggc2VsZWN0b3IgKTtcblx0XHRcdH1cblxuXHRcdC8vIEhBTkRMRTogJChET01FbGVtZW50KVxuXHRcdH0gZWxzZSBpZiAoIHNlbGVjdG9yLm5vZGVUeXBlICkge1xuXHRcdFx0dGhpcy5jb250ZXh0ID0gdGhpc1sgMCBdID0gc2VsZWN0b3I7XG5cdFx0XHR0aGlzLmxlbmd0aCA9IDE7XG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdC8vIEhBTkRMRTogJChmdW5jdGlvbilcblx0XHQvLyBTaG9ydGN1dCBmb3IgZG9jdW1lbnQgcmVhZHlcblx0XHR9IGVsc2UgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggc2VsZWN0b3IgKSApIHtcblx0XHRcdHJldHVybiByb290LnJlYWR5ICE9PSB1bmRlZmluZWQgP1xuXHRcdFx0XHRyb290LnJlYWR5KCBzZWxlY3RvciApIDpcblxuXHRcdFx0XHQvLyBFeGVjdXRlIGltbWVkaWF0ZWx5IGlmIHJlYWR5IGlzIG5vdCBwcmVzZW50XG5cdFx0XHRcdHNlbGVjdG9yKCBqUXVlcnkgKTtcblx0XHR9XG5cblx0XHRpZiAoIHNlbGVjdG9yLnNlbGVjdG9yICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHR0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3Iuc2VsZWN0b3I7XG5cdFx0XHR0aGlzLmNvbnRleHQgPSBzZWxlY3Rvci5jb250ZXh0O1xuXHRcdH1cblxuXHRcdHJldHVybiBqUXVlcnkubWFrZUFycmF5KCBzZWxlY3RvciwgdGhpcyApO1xuXHR9O1xuXG4vLyBHaXZlIHRoZSBpbml0IGZ1bmN0aW9uIHRoZSBqUXVlcnkgcHJvdG90eXBlIGZvciBsYXRlciBpbnN0YW50aWF0aW9uXG5pbml0LnByb3RvdHlwZSA9IGpRdWVyeS5mbjtcblxuLy8gSW5pdGlhbGl6ZSBjZW50cmFsIHJlZmVyZW5jZVxucm9vdGpRdWVyeSA9IGpRdWVyeSggZG9jdW1lbnQgKTtcblxuXG52YXIgcnBhcmVudHNwcmV2ID0gL14oPzpwYXJlbnRzfHByZXYoPzpVbnRpbHxBbGwpKS8sXG5cblx0Ly8gTWV0aG9kcyBndWFyYW50ZWVkIHRvIHByb2R1Y2UgYSB1bmlxdWUgc2V0IHdoZW4gc3RhcnRpbmcgZnJvbSBhIHVuaXF1ZSBzZXRcblx0Z3VhcmFudGVlZFVuaXF1ZSA9IHtcblx0XHRjaGlsZHJlbjogdHJ1ZSxcblx0XHRjb250ZW50czogdHJ1ZSxcblx0XHRuZXh0OiB0cnVlLFxuXHRcdHByZXY6IHRydWVcblx0fTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRoYXM6IGZ1bmN0aW9uKCB0YXJnZXQgKSB7XG5cdFx0dmFyIHRhcmdldHMgPSBqUXVlcnkoIHRhcmdldCwgdGhpcyApLFxuXHRcdFx0bCA9IHRhcmdldHMubGVuZ3RoO1xuXG5cdFx0cmV0dXJuIHRoaXMuZmlsdGVyKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBpID0gMDtcblx0XHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0aWYgKCBqUXVlcnkuY29udGFpbnMoIHRoaXMsIHRhcmdldHNbIGkgXSApICkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGNsb3Nlc3Q6IGZ1bmN0aW9uKCBzZWxlY3RvcnMsIGNvbnRleHQgKSB7XG5cdFx0dmFyIGN1cixcblx0XHRcdGkgPSAwLFxuXHRcdFx0bCA9IHRoaXMubGVuZ3RoLFxuXHRcdFx0bWF0Y2hlZCA9IFtdLFxuXHRcdFx0cG9zID0gcm5lZWRzQ29udGV4dC50ZXN0KCBzZWxlY3RvcnMgKSB8fCB0eXBlb2Ygc2VsZWN0b3JzICE9PSBcInN0cmluZ1wiID9cblx0XHRcdFx0alF1ZXJ5KCBzZWxlY3RvcnMsIGNvbnRleHQgfHwgdGhpcy5jb250ZXh0ICkgOlxuXHRcdFx0XHQwO1xuXG5cdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0Zm9yICggY3VyID0gdGhpc1sgaSBdOyBjdXIgJiYgY3VyICE9PSBjb250ZXh0OyBjdXIgPSBjdXIucGFyZW50Tm9kZSApIHtcblxuXHRcdFx0XHQvLyBBbHdheXMgc2tpcCBkb2N1bWVudCBmcmFnbWVudHNcblx0XHRcdFx0aWYgKCBjdXIubm9kZVR5cGUgPCAxMSAmJiAoIHBvcyA/XG5cdFx0XHRcdFx0cG9zLmluZGV4KCBjdXIgKSA+IC0xIDpcblxuXHRcdFx0XHRcdC8vIERvbid0IHBhc3Mgbm9uLWVsZW1lbnRzIHRvIFNpenpsZVxuXHRcdFx0XHRcdGN1ci5ub2RlVHlwZSA9PT0gMSAmJlxuXHRcdFx0XHRcdFx0alF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKCBjdXIsIHNlbGVjdG9ycyApICkgKSB7XG5cblx0XHRcdFx0XHRtYXRjaGVkLnB1c2goIGN1ciApO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBtYXRjaGVkLmxlbmd0aCA+IDEgPyBqUXVlcnkudW5pcXVlU29ydCggbWF0Y2hlZCApIDogbWF0Y2hlZCApO1xuXHR9LFxuXG5cdC8vIERldGVybWluZSB0aGUgcG9zaXRpb24gb2YgYW4gZWxlbWVudCB3aXRoaW4gdGhlIHNldFxuXHRpbmRleDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHQvLyBObyBhcmd1bWVudCwgcmV0dXJuIGluZGV4IGluIHBhcmVudFxuXHRcdGlmICggIWVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gKCB0aGlzWyAwIF0gJiYgdGhpc1sgMCBdLnBhcmVudE5vZGUgKSA/IHRoaXMuZmlyc3QoKS5wcmV2QWxsKCkubGVuZ3RoIDogLTE7XG5cdFx0fVxuXG5cdFx0Ly8gSW5kZXggaW4gc2VsZWN0b3Jcblx0XHRpZiAoIHR5cGVvZiBlbGVtID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cmV0dXJuIGluZGV4T2YuY2FsbCggalF1ZXJ5KCBlbGVtICksIHRoaXNbIDAgXSApO1xuXHRcdH1cblxuXHRcdC8vIExvY2F0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGRlc2lyZWQgZWxlbWVudFxuXHRcdHJldHVybiBpbmRleE9mLmNhbGwoIHRoaXMsXG5cblx0XHRcdC8vIElmIGl0IHJlY2VpdmVzIGEgalF1ZXJ5IG9iamVjdCwgdGhlIGZpcnN0IGVsZW1lbnQgaXMgdXNlZFxuXHRcdFx0ZWxlbS5qcXVlcnkgPyBlbGVtWyAwIF0gOiBlbGVtXG5cdFx0KTtcblx0fSxcblxuXHRhZGQ6IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCApIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soXG5cdFx0XHRqUXVlcnkudW5pcXVlU29ydChcblx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCB0aGlzLmdldCgpLCBqUXVlcnkoIHNlbGVjdG9yLCBjb250ZXh0ICkgKVxuXHRcdFx0KVxuXHRcdCk7XG5cdH0sXG5cblx0YWRkQmFjazogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiB0aGlzLmFkZCggc2VsZWN0b3IgPT0gbnVsbCA/XG5cdFx0XHR0aGlzLnByZXZPYmplY3QgOiB0aGlzLnByZXZPYmplY3QuZmlsdGVyKCBzZWxlY3RvciApXG5cdFx0KTtcblx0fVxufSApO1xuXG5mdW5jdGlvbiBzaWJsaW5nKCBjdXIsIGRpciApIHtcblx0d2hpbGUgKCAoIGN1ciA9IGN1clsgZGlyIF0gKSAmJiBjdXIubm9kZVR5cGUgIT09IDEgKSB7fVxuXHRyZXR1cm4gY3VyO1xufVxuXG5qUXVlcnkuZWFjaCgge1xuXHRwYXJlbnQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cdFx0cmV0dXJuIHBhcmVudCAmJiBwYXJlbnQubm9kZVR5cGUgIT09IDExID8gcGFyZW50IDogbnVsbDtcblx0fSxcblx0cGFyZW50czogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJwYXJlbnROb2RlXCIgKTtcblx0fSxcblx0cGFyZW50c1VudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJwYXJlbnROb2RlXCIsIHVudGlsICk7XG5cdH0sXG5cdG5leHQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBzaWJsaW5nKCBlbGVtLCBcIm5leHRTaWJsaW5nXCIgKTtcblx0fSxcblx0cHJldjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIHNpYmxpbmcoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIgKTtcblx0fSxcblx0bmV4dEFsbDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJuZXh0U2libGluZ1wiICk7XG5cdH0sXG5cdHByZXZBbGw6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBkaXIoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIgKTtcblx0fSxcblx0bmV4dFVudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJuZXh0U2libGluZ1wiLCB1bnRpbCApO1xuXHR9LFxuXHRwcmV2VW50aWw6IGZ1bmN0aW9uKCBlbGVtLCBpLCB1bnRpbCApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcInByZXZpb3VzU2libGluZ1wiLCB1bnRpbCApO1xuXHR9LFxuXHRzaWJsaW5nczogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIHNpYmxpbmdzKCAoIGVsZW0ucGFyZW50Tm9kZSB8fCB7fSApLmZpcnN0Q2hpbGQsIGVsZW0gKTtcblx0fSxcblx0Y2hpbGRyZW46IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBzaWJsaW5ncyggZWxlbS5maXJzdENoaWxkICk7XG5cdH0sXG5cdGNvbnRlbnRzOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gZWxlbS5jb250ZW50RG9jdW1lbnQgfHwgalF1ZXJ5Lm1lcmdlKCBbXSwgZWxlbS5jaGlsZE5vZGVzICk7XG5cdH1cbn0sIGZ1bmN0aW9uKCBuYW1lLCBmbiApIHtcblx0alF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggdW50aWwsIHNlbGVjdG9yICkge1xuXHRcdHZhciBtYXRjaGVkID0galF1ZXJ5Lm1hcCggdGhpcywgZm4sIHVudGlsICk7XG5cblx0XHRpZiAoIG5hbWUuc2xpY2UoIC01ICkgIT09IFwiVW50aWxcIiApIHtcblx0XHRcdHNlbGVjdG9yID0gdW50aWw7XG5cdFx0fVxuXG5cdFx0aWYgKCBzZWxlY3RvciAmJiB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRtYXRjaGVkID0galF1ZXJ5LmZpbHRlciggc2VsZWN0b3IsIG1hdGNoZWQgKTtcblx0XHR9XG5cblx0XHRpZiAoIHRoaXMubGVuZ3RoID4gMSApIHtcblxuXHRcdFx0Ly8gUmVtb3ZlIGR1cGxpY2F0ZXNcblx0XHRcdGlmICggIWd1YXJhbnRlZWRVbmlxdWVbIG5hbWUgXSApIHtcblx0XHRcdFx0alF1ZXJ5LnVuaXF1ZVNvcnQoIG1hdGNoZWQgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmV2ZXJzZSBvcmRlciBmb3IgcGFyZW50cyogYW5kIHByZXYtZGVyaXZhdGl2ZXNcblx0XHRcdGlmICggcnBhcmVudHNwcmV2LnRlc3QoIG5hbWUgKSApIHtcblx0XHRcdFx0bWF0Y2hlZC5yZXZlcnNlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBtYXRjaGVkICk7XG5cdH07XG59ICk7XG52YXIgcm5vdHdoaXRlID0gKCAvXFxTKy9nICk7XG5cblxuXG4vLyBDb252ZXJ0IFN0cmluZy1mb3JtYXR0ZWQgb3B0aW9ucyBpbnRvIE9iamVjdC1mb3JtYXR0ZWQgb25lc1xuZnVuY3Rpb24gY3JlYXRlT3B0aW9ucyggb3B0aW9ucyApIHtcblx0dmFyIG9iamVjdCA9IHt9O1xuXHRqUXVlcnkuZWFjaCggb3B0aW9ucy5tYXRjaCggcm5vdHdoaXRlICkgfHwgW10sIGZ1bmN0aW9uKCBfLCBmbGFnICkge1xuXHRcdG9iamVjdFsgZmxhZyBdID0gdHJ1ZTtcblx0fSApO1xuXHRyZXR1cm4gb2JqZWN0O1xufVxuXG4vKlxuICogQ3JlYXRlIGEgY2FsbGJhY2sgbGlzdCB1c2luZyB0aGUgZm9sbG93aW5nIHBhcmFtZXRlcnM6XG4gKlxuICpcdG9wdGlvbnM6IGFuIG9wdGlvbmFsIGxpc3Qgb2Ygc3BhY2Utc2VwYXJhdGVkIG9wdGlvbnMgdGhhdCB3aWxsIGNoYW5nZSBob3dcbiAqXHRcdFx0dGhlIGNhbGxiYWNrIGxpc3QgYmVoYXZlcyBvciBhIG1vcmUgdHJhZGl0aW9uYWwgb3B0aW9uIG9iamVjdFxuICpcbiAqIEJ5IGRlZmF1bHQgYSBjYWxsYmFjayBsaXN0IHdpbGwgYWN0IGxpa2UgYW4gZXZlbnQgY2FsbGJhY2sgbGlzdCBhbmQgY2FuIGJlXG4gKiBcImZpcmVkXCIgbXVsdGlwbGUgdGltZXMuXG4gKlxuICogUG9zc2libGUgb3B0aW9uczpcbiAqXG4gKlx0b25jZTpcdFx0XHR3aWxsIGVuc3VyZSB0aGUgY2FsbGJhY2sgbGlzdCBjYW4gb25seSBiZSBmaXJlZCBvbmNlIChsaWtlIGEgRGVmZXJyZWQpXG4gKlxuICpcdG1lbW9yeTpcdFx0XHR3aWxsIGtlZXAgdHJhY2sgb2YgcHJldmlvdXMgdmFsdWVzIGFuZCB3aWxsIGNhbGwgYW55IGNhbGxiYWNrIGFkZGVkXG4gKlx0XHRcdFx0XHRhZnRlciB0aGUgbGlzdCBoYXMgYmVlbiBmaXJlZCByaWdodCBhd2F5IHdpdGggdGhlIGxhdGVzdCBcIm1lbW9yaXplZFwiXG4gKlx0XHRcdFx0XHR2YWx1ZXMgKGxpa2UgYSBEZWZlcnJlZClcbiAqXG4gKlx0dW5pcXVlOlx0XHRcdHdpbGwgZW5zdXJlIGEgY2FsbGJhY2sgY2FuIG9ubHkgYmUgYWRkZWQgb25jZSAobm8gZHVwbGljYXRlIGluIHRoZSBsaXN0KVxuICpcbiAqXHRzdG9wT25GYWxzZTpcdGludGVycnVwdCBjYWxsaW5ncyB3aGVuIGEgY2FsbGJhY2sgcmV0dXJucyBmYWxzZVxuICpcbiAqL1xualF1ZXJ5LkNhbGxiYWNrcyA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXG5cdC8vIENvbnZlcnQgb3B0aW9ucyBmcm9tIFN0cmluZy1mb3JtYXR0ZWQgdG8gT2JqZWN0LWZvcm1hdHRlZCBpZiBuZWVkZWRcblx0Ly8gKHdlIGNoZWNrIGluIGNhY2hlIGZpcnN0KVxuXHRvcHRpb25zID0gdHlwZW9mIG9wdGlvbnMgPT09IFwic3RyaW5nXCIgP1xuXHRcdGNyZWF0ZU9wdGlvbnMoIG9wdGlvbnMgKSA6XG5cdFx0alF1ZXJ5LmV4dGVuZCgge30sIG9wdGlvbnMgKTtcblxuXHR2YXIgLy8gRmxhZyB0byBrbm93IGlmIGxpc3QgaXMgY3VycmVudGx5IGZpcmluZ1xuXHRcdGZpcmluZyxcblxuXHRcdC8vIExhc3QgZmlyZSB2YWx1ZSBmb3Igbm9uLWZvcmdldHRhYmxlIGxpc3RzXG5cdFx0bWVtb3J5LFxuXG5cdFx0Ly8gRmxhZyB0byBrbm93IGlmIGxpc3Qgd2FzIGFscmVhZHkgZmlyZWRcblx0XHRmaXJlZCxcblxuXHRcdC8vIEZsYWcgdG8gcHJldmVudCBmaXJpbmdcblx0XHRsb2NrZWQsXG5cblx0XHQvLyBBY3R1YWwgY2FsbGJhY2sgbGlzdFxuXHRcdGxpc3QgPSBbXSxcblxuXHRcdC8vIFF1ZXVlIG9mIGV4ZWN1dGlvbiBkYXRhIGZvciByZXBlYXRhYmxlIGxpc3RzXG5cdFx0cXVldWUgPSBbXSxcblxuXHRcdC8vIEluZGV4IG9mIGN1cnJlbnRseSBmaXJpbmcgY2FsbGJhY2sgKG1vZGlmaWVkIGJ5IGFkZC9yZW1vdmUgYXMgbmVlZGVkKVxuXHRcdGZpcmluZ0luZGV4ID0gLTEsXG5cblx0XHQvLyBGaXJlIGNhbGxiYWNrc1xuXHRcdGZpcmUgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0Ly8gRW5mb3JjZSBzaW5nbGUtZmlyaW5nXG5cdFx0XHRsb2NrZWQgPSBvcHRpb25zLm9uY2U7XG5cblx0XHRcdC8vIEV4ZWN1dGUgY2FsbGJhY2tzIGZvciBhbGwgcGVuZGluZyBleGVjdXRpb25zLFxuXHRcdFx0Ly8gcmVzcGVjdGluZyBmaXJpbmdJbmRleCBvdmVycmlkZXMgYW5kIHJ1bnRpbWUgY2hhbmdlc1xuXHRcdFx0ZmlyZWQgPSBmaXJpbmcgPSB0cnVlO1xuXHRcdFx0Zm9yICggOyBxdWV1ZS5sZW5ndGg7IGZpcmluZ0luZGV4ID0gLTEgKSB7XG5cdFx0XHRcdG1lbW9yeSA9IHF1ZXVlLnNoaWZ0KCk7XG5cdFx0XHRcdHdoaWxlICggKytmaXJpbmdJbmRleCA8IGxpc3QubGVuZ3RoICkge1xuXG5cdFx0XHRcdFx0Ly8gUnVuIGNhbGxiYWNrIGFuZCBjaGVjayBmb3IgZWFybHkgdGVybWluYXRpb25cblx0XHRcdFx0XHRpZiAoIGxpc3RbIGZpcmluZ0luZGV4IF0uYXBwbHkoIG1lbW9yeVsgMCBdLCBtZW1vcnlbIDEgXSApID09PSBmYWxzZSAmJlxuXHRcdFx0XHRcdFx0b3B0aW9ucy5zdG9wT25GYWxzZSApIHtcblxuXHRcdFx0XHRcdFx0Ly8gSnVtcCB0byBlbmQgYW5kIGZvcmdldCB0aGUgZGF0YSBzbyAuYWRkIGRvZXNuJ3QgcmUtZmlyZVxuXHRcdFx0XHRcdFx0ZmlyaW5nSW5kZXggPSBsaXN0Lmxlbmd0aDtcblx0XHRcdFx0XHRcdG1lbW9yeSA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBGb3JnZXQgdGhlIGRhdGEgaWYgd2UncmUgZG9uZSB3aXRoIGl0XG5cdFx0XHRpZiAoICFvcHRpb25zLm1lbW9yeSApIHtcblx0XHRcdFx0bWVtb3J5ID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGZpcmluZyA9IGZhbHNlO1xuXG5cdFx0XHQvLyBDbGVhbiB1cCBpZiB3ZSdyZSBkb25lIGZpcmluZyBmb3IgZ29vZFxuXHRcdFx0aWYgKCBsb2NrZWQgKSB7XG5cblx0XHRcdFx0Ly8gS2VlcCBhbiBlbXB0eSBsaXN0IGlmIHdlIGhhdmUgZGF0YSBmb3IgZnV0dXJlIGFkZCBjYWxsc1xuXHRcdFx0XHRpZiAoIG1lbW9yeSApIHtcblx0XHRcdFx0XHRsaXN0ID0gW107XG5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlLCB0aGlzIG9iamVjdCBpcyBzcGVudFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGxpc3QgPSBcIlwiO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIEFjdHVhbCBDYWxsYmFja3Mgb2JqZWN0XG5cdFx0c2VsZiA9IHtcblxuXHRcdFx0Ly8gQWRkIGEgY2FsbGJhY2sgb3IgYSBjb2xsZWN0aW9uIG9mIGNhbGxiYWNrcyB0byB0aGUgbGlzdFxuXHRcdFx0YWRkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCBsaXN0ICkge1xuXG5cdFx0XHRcdFx0Ly8gSWYgd2UgaGF2ZSBtZW1vcnkgZnJvbSBhIHBhc3QgcnVuLCB3ZSBzaG91bGQgZmlyZSBhZnRlciBhZGRpbmdcblx0XHRcdFx0XHRpZiAoIG1lbW9yeSAmJiAhZmlyaW5nICkge1xuXHRcdFx0XHRcdFx0ZmlyaW5nSW5kZXggPSBsaXN0Lmxlbmd0aCAtIDE7XG5cdFx0XHRcdFx0XHRxdWV1ZS5wdXNoKCBtZW1vcnkgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQoIGZ1bmN0aW9uIGFkZCggYXJncyApIHtcblx0XHRcdFx0XHRcdGpRdWVyeS5lYWNoKCBhcmdzLCBmdW5jdGlvbiggXywgYXJnICkge1xuXHRcdFx0XHRcdFx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBhcmcgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoICFvcHRpb25zLnVuaXF1ZSB8fCAhc2VsZi5oYXMoIGFyZyApICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bGlzdC5wdXNoKCBhcmcgKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIGFyZyAmJiBhcmcubGVuZ3RoICYmIGpRdWVyeS50eXBlKCBhcmcgKSAhPT0gXCJzdHJpbmdcIiApIHtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIEluc3BlY3QgcmVjdXJzaXZlbHlcblx0XHRcdFx0XHRcdFx0XHRhZGQoIGFyZyApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0fSApKCBhcmd1bWVudHMgKTtcblxuXHRcdFx0XHRcdGlmICggbWVtb3J5ICYmICFmaXJpbmcgKSB7XG5cdFx0XHRcdFx0XHRmaXJlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gUmVtb3ZlIGEgY2FsbGJhY2sgZnJvbSB0aGUgbGlzdFxuXHRcdFx0cmVtb3ZlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0alF1ZXJ5LmVhY2goIGFyZ3VtZW50cywgZnVuY3Rpb24oIF8sIGFyZyApIHtcblx0XHRcdFx0XHR2YXIgaW5kZXg7XG5cdFx0XHRcdFx0d2hpbGUgKCAoIGluZGV4ID0galF1ZXJ5LmluQXJyYXkoIGFyZywgbGlzdCwgaW5kZXggKSApID4gLTEgKSB7XG5cdFx0XHRcdFx0XHRsaXN0LnNwbGljZSggaW5kZXgsIDEgKTtcblxuXHRcdFx0XHRcdFx0Ly8gSGFuZGxlIGZpcmluZyBpbmRleGVzXG5cdFx0XHRcdFx0XHRpZiAoIGluZGV4IDw9IGZpcmluZ0luZGV4ICkge1xuXHRcdFx0XHRcdFx0XHRmaXJpbmdJbmRleC0tO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cblx0XHRcdC8vIENoZWNrIGlmIGEgZ2l2ZW4gY2FsbGJhY2sgaXMgaW4gdGhlIGxpc3QuXG5cdFx0XHQvLyBJZiBubyBhcmd1bWVudCBpcyBnaXZlbiwgcmV0dXJuIHdoZXRoZXIgb3Igbm90IGxpc3QgaGFzIGNhbGxiYWNrcyBhdHRhY2hlZC5cblx0XHRcdGhhczogZnVuY3Rpb24oIGZuICkge1xuXHRcdFx0XHRyZXR1cm4gZm4gP1xuXHRcdFx0XHRcdGpRdWVyeS5pbkFycmF5KCBmbiwgbGlzdCApID4gLTEgOlxuXHRcdFx0XHRcdGxpc3QubGVuZ3RoID4gMDtcblx0XHRcdH0sXG5cblx0XHRcdC8vIFJlbW92ZSBhbGwgY2FsbGJhY2tzIGZyb20gdGhlIGxpc3Rcblx0XHRcdGVtcHR5OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCBsaXN0ICkge1xuXHRcdFx0XHRcdGxpc3QgPSBbXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cblx0XHRcdC8vIERpc2FibGUgLmZpcmUgYW5kIC5hZGRcblx0XHRcdC8vIEFib3J0IGFueSBjdXJyZW50L3BlbmRpbmcgZXhlY3V0aW9uc1xuXHRcdFx0Ly8gQ2xlYXIgYWxsIGNhbGxiYWNrcyBhbmQgdmFsdWVzXG5cdFx0XHRkaXNhYmxlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0bG9ja2VkID0gcXVldWUgPSBbXTtcblx0XHRcdFx0bGlzdCA9IG1lbW9yeSA9IFwiXCI7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblx0XHRcdGRpc2FibGVkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuICFsaXN0O1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gRGlzYWJsZSAuZmlyZVxuXHRcdFx0Ly8gQWxzbyBkaXNhYmxlIC5hZGQgdW5sZXNzIHdlIGhhdmUgbWVtb3J5IChzaW5jZSBpdCB3b3VsZCBoYXZlIG5vIGVmZmVjdClcblx0XHRcdC8vIEFib3J0IGFueSBwZW5kaW5nIGV4ZWN1dGlvbnNcblx0XHRcdGxvY2s6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRsb2NrZWQgPSBxdWV1ZSA9IFtdO1xuXHRcdFx0XHRpZiAoICFtZW1vcnkgKSB7XG5cdFx0XHRcdFx0bGlzdCA9IG1lbW9yeSA9IFwiXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0bG9ja2VkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuICEhbG9ja2VkO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gQ2FsbCBhbGwgY2FsbGJhY2tzIHdpdGggdGhlIGdpdmVuIGNvbnRleHQgYW5kIGFyZ3VtZW50c1xuXHRcdFx0ZmlyZVdpdGg6IGZ1bmN0aW9uKCBjb250ZXh0LCBhcmdzICkge1xuXHRcdFx0XHRpZiAoICFsb2NrZWQgKSB7XG5cdFx0XHRcdFx0YXJncyA9IGFyZ3MgfHwgW107XG5cdFx0XHRcdFx0YXJncyA9IFsgY29udGV4dCwgYXJncy5zbGljZSA/IGFyZ3Muc2xpY2UoKSA6IGFyZ3MgXTtcblx0XHRcdFx0XHRxdWV1ZS5wdXNoKCBhcmdzICk7XG5cdFx0XHRcdFx0aWYgKCAhZmlyaW5nICkge1xuXHRcdFx0XHRcdFx0ZmlyZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cblx0XHRcdC8vIENhbGwgYWxsIHRoZSBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gYXJndW1lbnRzXG5cdFx0XHRmaXJlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0c2VsZi5maXJlV2l0aCggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gVG8ga25vdyBpZiB0aGUgY2FsbGJhY2tzIGhhdmUgYWxyZWFkeSBiZWVuIGNhbGxlZCBhdCBsZWFzdCBvbmNlXG5cdFx0XHRmaXJlZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAhIWZpcmVkO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0cmV0dXJuIHNlbGY7XG59O1xuXG5cbmpRdWVyeS5leHRlbmQoIHtcblxuXHREZWZlcnJlZDogZnVuY3Rpb24oIGZ1bmMgKSB7XG5cdFx0dmFyIHR1cGxlcyA9IFtcblxuXHRcdFx0XHQvLyBhY3Rpb24sIGFkZCBsaXN0ZW5lciwgbGlzdGVuZXIgbGlzdCwgZmluYWwgc3RhdGVcblx0XHRcdFx0WyBcInJlc29sdmVcIiwgXCJkb25lXCIsIGpRdWVyeS5DYWxsYmFja3MoIFwib25jZSBtZW1vcnlcIiApLCBcInJlc29sdmVkXCIgXSxcblx0XHRcdFx0WyBcInJlamVjdFwiLCBcImZhaWxcIiwgalF1ZXJ5LkNhbGxiYWNrcyggXCJvbmNlIG1lbW9yeVwiICksIFwicmVqZWN0ZWRcIiBdLFxuXHRcdFx0XHRbIFwibm90aWZ5XCIsIFwicHJvZ3Jlc3NcIiwgalF1ZXJ5LkNhbGxiYWNrcyggXCJtZW1vcnlcIiApIF1cblx0XHRcdF0sXG5cdFx0XHRzdGF0ZSA9IFwicGVuZGluZ1wiLFxuXHRcdFx0cHJvbWlzZSA9IHtcblx0XHRcdFx0c3RhdGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiBzdGF0ZTtcblx0XHRcdFx0fSxcblx0XHRcdFx0YWx3YXlzOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRkZWZlcnJlZC5kb25lKCBhcmd1bWVudHMgKS5mYWlsKCBhcmd1bWVudHMgKTtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fSxcblx0XHRcdFx0dGhlbjogZnVuY3Rpb24oIC8qIGZuRG9uZSwgZm5GYWlsLCBmblByb2dyZXNzICovICkge1xuXHRcdFx0XHRcdHZhciBmbnMgPSBhcmd1bWVudHM7XG5cdFx0XHRcdFx0cmV0dXJuIGpRdWVyeS5EZWZlcnJlZCggZnVuY3Rpb24oIG5ld0RlZmVyICkge1xuXHRcdFx0XHRcdFx0alF1ZXJ5LmVhY2goIHR1cGxlcywgZnVuY3Rpb24oIGksIHR1cGxlICkge1xuXHRcdFx0XHRcdFx0XHR2YXIgZm4gPSBqUXVlcnkuaXNGdW5jdGlvbiggZm5zWyBpIF0gKSAmJiBmbnNbIGkgXTtcblxuXHRcdFx0XHRcdFx0XHQvLyBkZWZlcnJlZFsgZG9uZSB8IGZhaWwgfCBwcm9ncmVzcyBdIGZvciBmb3J3YXJkaW5nIGFjdGlvbnMgdG8gbmV3RGVmZXJcblx0XHRcdFx0XHRcdFx0ZGVmZXJyZWRbIHR1cGxlWyAxIF0gXSggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHJldHVybmVkID0gZm4gJiYgZm4uYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRcdFx0XHRcdGlmICggcmV0dXJuZWQgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIHJldHVybmVkLnByb21pc2UgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybmVkLnByb21pc2UoKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQucHJvZ3Jlc3MoIG5ld0RlZmVyLm5vdGlmeSApXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5kb25lKCBuZXdEZWZlci5yZXNvbHZlIClcblx0XHRcdFx0XHRcdFx0XHRcdFx0LmZhaWwoIG5ld0RlZmVyLnJlamVjdCApO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRuZXdEZWZlclsgdHVwbGVbIDAgXSArIFwiV2l0aFwiIF0oXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMgPT09IHByb21pc2UgPyBuZXdEZWZlci5wcm9taXNlKCkgOiB0aGlzLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRmbiA/IFsgcmV0dXJuZWQgXSA6IGFyZ3VtZW50c1xuXHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHRcdGZucyA9IG51bGw7XG5cdFx0XHRcdFx0fSApLnByb21pc2UoKTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBHZXQgYSBwcm9taXNlIGZvciB0aGlzIGRlZmVycmVkXG5cdFx0XHRcdC8vIElmIG9iaiBpcyBwcm92aWRlZCwgdGhlIHByb21pc2UgYXNwZWN0IGlzIGFkZGVkIHRvIHRoZSBvYmplY3Rcblx0XHRcdFx0cHJvbWlzZTogZnVuY3Rpb24oIG9iaiApIHtcblx0XHRcdFx0XHRyZXR1cm4gb2JqICE9IG51bGwgPyBqUXVlcnkuZXh0ZW5kKCBvYmosIHByb21pc2UgKSA6IHByb21pc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRkZWZlcnJlZCA9IHt9O1xuXG5cdFx0Ly8gS2VlcCBwaXBlIGZvciBiYWNrLWNvbXBhdFxuXHRcdHByb21pc2UucGlwZSA9IHByb21pc2UudGhlbjtcblxuXHRcdC8vIEFkZCBsaXN0LXNwZWNpZmljIG1ldGhvZHNcblx0XHRqUXVlcnkuZWFjaCggdHVwbGVzLCBmdW5jdGlvbiggaSwgdHVwbGUgKSB7XG5cdFx0XHR2YXIgbGlzdCA9IHR1cGxlWyAyIF0sXG5cdFx0XHRcdHN0YXRlU3RyaW5nID0gdHVwbGVbIDMgXTtcblxuXHRcdFx0Ly8gcHJvbWlzZVsgZG9uZSB8IGZhaWwgfCBwcm9ncmVzcyBdID0gbGlzdC5hZGRcblx0XHRcdHByb21pc2VbIHR1cGxlWyAxIF0gXSA9IGxpc3QuYWRkO1xuXG5cdFx0XHQvLyBIYW5kbGUgc3RhdGVcblx0XHRcdGlmICggc3RhdGVTdHJpbmcgKSB7XG5cdFx0XHRcdGxpc3QuYWRkKCBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdC8vIHN0YXRlID0gWyByZXNvbHZlZCB8IHJlamVjdGVkIF1cblx0XHRcdFx0XHRzdGF0ZSA9IHN0YXRlU3RyaW5nO1xuXG5cdFx0XHRcdC8vIFsgcmVqZWN0X2xpc3QgfCByZXNvbHZlX2xpc3QgXS5kaXNhYmxlOyBwcm9ncmVzc19saXN0LmxvY2tcblx0XHRcdFx0fSwgdHVwbGVzWyBpIF4gMSBdWyAyIF0uZGlzYWJsZSwgdHVwbGVzWyAyIF1bIDIgXS5sb2NrICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGRlZmVycmVkWyByZXNvbHZlIHwgcmVqZWN0IHwgbm90aWZ5IF1cblx0XHRcdGRlZmVycmVkWyB0dXBsZVsgMCBdIF0gPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0ZGVmZXJyZWRbIHR1cGxlWyAwIF0gKyBcIldpdGhcIiBdKCB0aGlzID09PSBkZWZlcnJlZCA/IHByb21pc2UgOiB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9O1xuXHRcdFx0ZGVmZXJyZWRbIHR1cGxlWyAwIF0gKyBcIldpdGhcIiBdID0gbGlzdC5maXJlV2l0aDtcblx0XHR9ICk7XG5cblx0XHQvLyBNYWtlIHRoZSBkZWZlcnJlZCBhIHByb21pc2Vcblx0XHRwcm9taXNlLnByb21pc2UoIGRlZmVycmVkICk7XG5cblx0XHQvLyBDYWxsIGdpdmVuIGZ1bmMgaWYgYW55XG5cdFx0aWYgKCBmdW5jICkge1xuXHRcdFx0ZnVuYy5jYWxsKCBkZWZlcnJlZCwgZGVmZXJyZWQgKTtcblx0XHR9XG5cblx0XHQvLyBBbGwgZG9uZSFcblx0XHRyZXR1cm4gZGVmZXJyZWQ7XG5cdH0sXG5cblx0Ly8gRGVmZXJyZWQgaGVscGVyXG5cdHdoZW46IGZ1bmN0aW9uKCBzdWJvcmRpbmF0ZSAvKiAsIC4uLiwgc3Vib3JkaW5hdGVOICovICkge1xuXHRcdHZhciBpID0gMCxcblx0XHRcdHJlc29sdmVWYWx1ZXMgPSBzbGljZS5jYWxsKCBhcmd1bWVudHMgKSxcblx0XHRcdGxlbmd0aCA9IHJlc29sdmVWYWx1ZXMubGVuZ3RoLFxuXG5cdFx0XHQvLyB0aGUgY291bnQgb2YgdW5jb21wbGV0ZWQgc3Vib3JkaW5hdGVzXG5cdFx0XHRyZW1haW5pbmcgPSBsZW5ndGggIT09IDEgfHxcblx0XHRcdFx0KCBzdWJvcmRpbmF0ZSAmJiBqUXVlcnkuaXNGdW5jdGlvbiggc3Vib3JkaW5hdGUucHJvbWlzZSApICkgPyBsZW5ndGggOiAwLFxuXG5cdFx0XHQvLyB0aGUgbWFzdGVyIERlZmVycmVkLlxuXHRcdFx0Ly8gSWYgcmVzb2x2ZVZhbHVlcyBjb25zaXN0IG9mIG9ubHkgYSBzaW5nbGUgRGVmZXJyZWQsIGp1c3QgdXNlIHRoYXQuXG5cdFx0XHRkZWZlcnJlZCA9IHJlbWFpbmluZyA9PT0gMSA/IHN1Ym9yZGluYXRlIDogalF1ZXJ5LkRlZmVycmVkKCksXG5cblx0XHRcdC8vIFVwZGF0ZSBmdW5jdGlvbiBmb3IgYm90aCByZXNvbHZlIGFuZCBwcm9ncmVzcyB2YWx1ZXNcblx0XHRcdHVwZGF0ZUZ1bmMgPSBmdW5jdGlvbiggaSwgY29udGV4dHMsIHZhbHVlcyApIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdFx0XHRjb250ZXh0c1sgaSBdID0gdGhpcztcblx0XHRcdFx0XHR2YWx1ZXNbIGkgXSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gc2xpY2UuY2FsbCggYXJndW1lbnRzICkgOiB2YWx1ZTtcblx0XHRcdFx0XHRpZiAoIHZhbHVlcyA9PT0gcHJvZ3Jlc3NWYWx1ZXMgKSB7XG5cdFx0XHRcdFx0XHRkZWZlcnJlZC5ub3RpZnlXaXRoKCBjb250ZXh0cywgdmFsdWVzICk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICggISggLS1yZW1haW5pbmcgKSApIHtcblx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmVXaXRoKCBjb250ZXh0cywgdmFsdWVzICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fSxcblxuXHRcdFx0cHJvZ3Jlc3NWYWx1ZXMsIHByb2dyZXNzQ29udGV4dHMsIHJlc29sdmVDb250ZXh0cztcblxuXHRcdC8vIEFkZCBsaXN0ZW5lcnMgdG8gRGVmZXJyZWQgc3Vib3JkaW5hdGVzOyB0cmVhdCBvdGhlcnMgYXMgcmVzb2x2ZWRcblx0XHRpZiAoIGxlbmd0aCA+IDEgKSB7XG5cdFx0XHRwcm9ncmVzc1ZhbHVlcyA9IG5ldyBBcnJheSggbGVuZ3RoICk7XG5cdFx0XHRwcm9ncmVzc0NvbnRleHRzID0gbmV3IEFycmF5KCBsZW5ndGggKTtcblx0XHRcdHJlc29sdmVDb250ZXh0cyA9IG5ldyBBcnJheSggbGVuZ3RoICk7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0aWYgKCByZXNvbHZlVmFsdWVzWyBpIF0gJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIHJlc29sdmVWYWx1ZXNbIGkgXS5wcm9taXNlICkgKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZVZhbHVlc1sgaSBdLnByb21pc2UoKVxuXHRcdFx0XHRcdFx0LnByb2dyZXNzKCB1cGRhdGVGdW5jKCBpLCBwcm9ncmVzc0NvbnRleHRzLCBwcm9ncmVzc1ZhbHVlcyApIClcblx0XHRcdFx0XHRcdC5kb25lKCB1cGRhdGVGdW5jKCBpLCByZXNvbHZlQ29udGV4dHMsIHJlc29sdmVWYWx1ZXMgKSApXG5cdFx0XHRcdFx0XHQuZmFpbCggZGVmZXJyZWQucmVqZWN0ICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0LS1yZW1haW5pbmc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBJZiB3ZSdyZSBub3Qgd2FpdGluZyBvbiBhbnl0aGluZywgcmVzb2x2ZSB0aGUgbWFzdGVyXG5cdFx0aWYgKCAhcmVtYWluaW5nICkge1xuXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZVdpdGgoIHJlc29sdmVDb250ZXh0cywgcmVzb2x2ZVZhbHVlcyApO1xuXHRcdH1cblxuXHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG5cdH1cbn0gKTtcblxuXG4vLyBUaGUgZGVmZXJyZWQgdXNlZCBvbiBET00gcmVhZHlcbnZhciByZWFkeUxpc3Q7XG5cbmpRdWVyeS5mbi5yZWFkeSA9IGZ1bmN0aW9uKCBmbiApIHtcblxuXHQvLyBBZGQgdGhlIGNhbGxiYWNrXG5cdGpRdWVyeS5yZWFkeS5wcm9taXNlKCkuZG9uZSggZm4gKTtcblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbmpRdWVyeS5leHRlbmQoIHtcblxuXHQvLyBJcyB0aGUgRE9NIHJlYWR5IHRvIGJlIHVzZWQ/IFNldCB0byB0cnVlIG9uY2UgaXQgb2NjdXJzLlxuXHRpc1JlYWR5OiBmYWxzZSxcblxuXHQvLyBBIGNvdW50ZXIgdG8gdHJhY2sgaG93IG1hbnkgaXRlbXMgdG8gd2FpdCBmb3IgYmVmb3JlXG5cdC8vIHRoZSByZWFkeSBldmVudCBmaXJlcy4gU2VlICM2NzgxXG5cdHJlYWR5V2FpdDogMSxcblxuXHQvLyBIb2xkIChvciByZWxlYXNlKSB0aGUgcmVhZHkgZXZlbnRcblx0aG9sZFJlYWR5OiBmdW5jdGlvbiggaG9sZCApIHtcblx0XHRpZiAoIGhvbGQgKSB7XG5cdFx0XHRqUXVlcnkucmVhZHlXYWl0Kys7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGpRdWVyeS5yZWFkeSggdHJ1ZSApO1xuXHRcdH1cblx0fSxcblxuXHQvLyBIYW5kbGUgd2hlbiB0aGUgRE9NIGlzIHJlYWR5XG5cdHJlYWR5OiBmdW5jdGlvbiggd2FpdCApIHtcblxuXHRcdC8vIEFib3J0IGlmIHRoZXJlIGFyZSBwZW5kaW5nIGhvbGRzIG9yIHdlJ3JlIGFscmVhZHkgcmVhZHlcblx0XHRpZiAoIHdhaXQgPT09IHRydWUgPyAtLWpRdWVyeS5yZWFkeVdhaXQgOiBqUXVlcnkuaXNSZWFkeSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBSZW1lbWJlciB0aGF0IHRoZSBET00gaXMgcmVhZHlcblx0XHRqUXVlcnkuaXNSZWFkeSA9IHRydWU7XG5cblx0XHQvLyBJZiBhIG5vcm1hbCBET00gUmVhZHkgZXZlbnQgZmlyZWQsIGRlY3JlbWVudCwgYW5kIHdhaXQgaWYgbmVlZCBiZVxuXHRcdGlmICggd2FpdCAhPT0gdHJ1ZSAmJiAtLWpRdWVyeS5yZWFkeVdhaXQgPiAwICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIElmIHRoZXJlIGFyZSBmdW5jdGlvbnMgYm91bmQsIHRvIGV4ZWN1dGVcblx0XHRyZWFkeUxpc3QucmVzb2x2ZVdpdGgoIGRvY3VtZW50LCBbIGpRdWVyeSBdICk7XG5cblx0XHQvLyBUcmlnZ2VyIGFueSBib3VuZCByZWFkeSBldmVudHNcblx0XHRpZiAoIGpRdWVyeS5mbi50cmlnZ2VySGFuZGxlciApIHtcblx0XHRcdGpRdWVyeSggZG9jdW1lbnQgKS50cmlnZ2VySGFuZGxlciggXCJyZWFkeVwiICk7XG5cdFx0XHRqUXVlcnkoIGRvY3VtZW50ICkub2ZmKCBcInJlYWR5XCIgKTtcblx0XHR9XG5cdH1cbn0gKTtcblxuLyoqXG4gKiBUaGUgcmVhZHkgZXZlbnQgaGFuZGxlciBhbmQgc2VsZiBjbGVhbnVwIG1ldGhvZFxuICovXG5mdW5jdGlvbiBjb21wbGV0ZWQoKSB7XG5cdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwiRE9NQ29udGVudExvYWRlZFwiLCBjb21wbGV0ZWQgKTtcblx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwibG9hZFwiLCBjb21wbGV0ZWQgKTtcblx0alF1ZXJ5LnJlYWR5KCk7XG59XG5cbmpRdWVyeS5yZWFkeS5wcm9taXNlID0gZnVuY3Rpb24oIG9iaiApIHtcblx0aWYgKCAhcmVhZHlMaXN0ICkge1xuXG5cdFx0cmVhZHlMaXN0ID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cblx0XHQvLyBDYXRjaCBjYXNlcyB3aGVyZSAkKGRvY3VtZW50KS5yZWFkeSgpIGlzIGNhbGxlZFxuXHRcdC8vIGFmdGVyIHRoZSBicm93c2VyIGV2ZW50IGhhcyBhbHJlYWR5IG9jY3VycmVkLlxuXHRcdC8vIFN1cHBvcnQ6IElFOS0xMCBvbmx5XG5cdFx0Ly8gT2xkZXIgSUUgc29tZXRpbWVzIHNpZ25hbHMgXCJpbnRlcmFjdGl2ZVwiIHRvbyBzb29uXG5cdFx0aWYgKCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgfHxcblx0XHRcdCggZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gXCJsb2FkaW5nXCIgJiYgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kb1Njcm9sbCApICkge1xuXG5cdFx0XHQvLyBIYW5kbGUgaXQgYXN5bmNocm9ub3VzbHkgdG8gYWxsb3cgc2NyaXB0cyB0aGUgb3Bwb3J0dW5pdHkgdG8gZGVsYXkgcmVhZHlcblx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KCBqUXVlcnkucmVhZHkgKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIFVzZSB0aGUgaGFuZHkgZXZlbnQgY2FsbGJhY2tcblx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwiRE9NQ29udGVudExvYWRlZFwiLCBjb21wbGV0ZWQgKTtcblxuXHRcdFx0Ly8gQSBmYWxsYmFjayB0byB3aW5kb3cub25sb2FkLCB0aGF0IHdpbGwgYWx3YXlzIHdvcmtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCBcImxvYWRcIiwgY29tcGxldGVkICk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZWFkeUxpc3QucHJvbWlzZSggb2JqICk7XG59O1xuXG4vLyBLaWNrIG9mZiB0aGUgRE9NIHJlYWR5IGNoZWNrIGV2ZW4gaWYgdGhlIHVzZXIgZG9lcyBub3RcbmpRdWVyeS5yZWFkeS5wcm9taXNlKCk7XG5cblxuXG5cbi8vIE11bHRpZnVuY3Rpb25hbCBtZXRob2QgdG8gZ2V0IGFuZCBzZXQgdmFsdWVzIG9mIGEgY29sbGVjdGlvblxuLy8gVGhlIHZhbHVlL3MgY2FuIG9wdGlvbmFsbHkgYmUgZXhlY3V0ZWQgaWYgaXQncyBhIGZ1bmN0aW9uXG52YXIgYWNjZXNzID0gZnVuY3Rpb24oIGVsZW1zLCBmbiwga2V5LCB2YWx1ZSwgY2hhaW5hYmxlLCBlbXB0eUdldCwgcmF3ICkge1xuXHR2YXIgaSA9IDAsXG5cdFx0bGVuID0gZWxlbXMubGVuZ3RoLFxuXHRcdGJ1bGsgPSBrZXkgPT0gbnVsbDtcblxuXHQvLyBTZXRzIG1hbnkgdmFsdWVzXG5cdGlmICggalF1ZXJ5LnR5cGUoIGtleSApID09PSBcIm9iamVjdFwiICkge1xuXHRcdGNoYWluYWJsZSA9IHRydWU7XG5cdFx0Zm9yICggaSBpbiBrZXkgKSB7XG5cdFx0XHRhY2Nlc3MoIGVsZW1zLCBmbiwgaSwga2V5WyBpIF0sIHRydWUsIGVtcHR5R2V0LCByYXcgKTtcblx0XHR9XG5cblx0Ly8gU2V0cyBvbmUgdmFsdWVcblx0fSBlbHNlIGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRjaGFpbmFibGUgPSB0cnVlO1xuXG5cdFx0aWYgKCAhalF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyYXcgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGlmICggYnVsayApIHtcblxuXHRcdFx0Ly8gQnVsayBvcGVyYXRpb25zIHJ1biBhZ2FpbnN0IHRoZSBlbnRpcmUgc2V0XG5cdFx0XHRpZiAoIHJhdyApIHtcblx0XHRcdFx0Zm4uY2FsbCggZWxlbXMsIHZhbHVlICk7XG5cdFx0XHRcdGZuID0gbnVsbDtcblxuXHRcdFx0Ly8gLi4uZXhjZXB0IHdoZW4gZXhlY3V0aW5nIGZ1bmN0aW9uIHZhbHVlc1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YnVsayA9IGZuO1xuXHRcdFx0XHRmbiA9IGZ1bmN0aW9uKCBlbGVtLCBrZXksIHZhbHVlICkge1xuXHRcdFx0XHRcdHJldHVybiBidWxrLmNhbGwoIGpRdWVyeSggZWxlbSApLCB2YWx1ZSApO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICggZm4gKSB7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdFx0Zm4oXG5cdFx0XHRcdFx0ZWxlbXNbIGkgXSwga2V5LCByYXcgP1xuXHRcdFx0XHRcdHZhbHVlIDpcblx0XHRcdFx0XHR2YWx1ZS5jYWxsKCBlbGVtc1sgaSBdLCBpLCBmbiggZWxlbXNbIGkgXSwga2V5ICkgKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjaGFpbmFibGUgP1xuXHRcdGVsZW1zIDpcblxuXHRcdC8vIEdldHNcblx0XHRidWxrID9cblx0XHRcdGZuLmNhbGwoIGVsZW1zICkgOlxuXHRcdFx0bGVuID8gZm4oIGVsZW1zWyAwIF0sIGtleSApIDogZW1wdHlHZXQ7XG59O1xudmFyIGFjY2VwdERhdGEgPSBmdW5jdGlvbiggb3duZXIgKSB7XG5cblx0Ly8gQWNjZXB0cyBvbmx5OlxuXHQvLyAgLSBOb2RlXG5cdC8vICAgIC0gTm9kZS5FTEVNRU5UX05PREVcblx0Ly8gICAgLSBOb2RlLkRPQ1VNRU5UX05PREVcblx0Ly8gIC0gT2JqZWN0XG5cdC8vICAgIC0gQW55XG5cdC8qIGpzaGludCAtVzAxOCAqL1xuXHRyZXR1cm4gb3duZXIubm9kZVR5cGUgPT09IDEgfHwgb3duZXIubm9kZVR5cGUgPT09IDkgfHwgISggK293bmVyLm5vZGVUeXBlICk7XG59O1xuXG5cblxuXG5mdW5jdGlvbiBEYXRhKCkge1xuXHR0aGlzLmV4cGFuZG8gPSBqUXVlcnkuZXhwYW5kbyArIERhdGEudWlkKys7XG59XG5cbkRhdGEudWlkID0gMTtcblxuRGF0YS5wcm90b3R5cGUgPSB7XG5cblx0cmVnaXN0ZXI6IGZ1bmN0aW9uKCBvd25lciwgaW5pdGlhbCApIHtcblx0XHR2YXIgdmFsdWUgPSBpbml0aWFsIHx8IHt9O1xuXG5cdFx0Ly8gSWYgaXQgaXMgYSBub2RlIHVubGlrZWx5IHRvIGJlIHN0cmluZ2lmeS1lZCBvciBsb29wZWQgb3ZlclxuXHRcdC8vIHVzZSBwbGFpbiBhc3NpZ25tZW50XG5cdFx0aWYgKCBvd25lci5ub2RlVHlwZSApIHtcblx0XHRcdG93bmVyWyB0aGlzLmV4cGFuZG8gXSA9IHZhbHVlO1xuXG5cdFx0Ly8gT3RoZXJ3aXNlIHNlY3VyZSBpdCBpbiBhIG5vbi1lbnVtZXJhYmxlLCBub24td3JpdGFibGUgcHJvcGVydHlcblx0XHQvLyBjb25maWd1cmFiaWxpdHkgbXVzdCBiZSB0cnVlIHRvIGFsbG93IHRoZSBwcm9wZXJ0eSB0byBiZVxuXHRcdC8vIGRlbGV0ZWQgd2l0aCB0aGUgZGVsZXRlIG9wZXJhdG9yXG5cdFx0fSBlbHNlIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggb3duZXIsIHRoaXMuZXhwYW5kbywge1xuXHRcdFx0XHR2YWx1ZTogdmFsdWUsXG5cdFx0XHRcdHdyaXRhYmxlOiB0cnVlLFxuXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWVcblx0XHRcdH0gKTtcblx0XHR9XG5cdFx0cmV0dXJuIG93bmVyWyB0aGlzLmV4cGFuZG8gXTtcblx0fSxcblx0Y2FjaGU6IGZ1bmN0aW9uKCBvd25lciApIHtcblxuXHRcdC8vIFdlIGNhbiBhY2NlcHQgZGF0YSBmb3Igbm9uLWVsZW1lbnQgbm9kZXMgaW4gbW9kZXJuIGJyb3dzZXJzLFxuXHRcdC8vIGJ1dCB3ZSBzaG91bGQgbm90LCBzZWUgIzgzMzUuXG5cdFx0Ly8gQWx3YXlzIHJldHVybiBhbiBlbXB0eSBvYmplY3QuXG5cdFx0aWYgKCAhYWNjZXB0RGF0YSggb3duZXIgKSApIHtcblx0XHRcdHJldHVybiB7fTtcblx0XHR9XG5cblx0XHQvLyBDaGVjayBpZiB0aGUgb3duZXIgb2JqZWN0IGFscmVhZHkgaGFzIGEgY2FjaGVcblx0XHR2YXIgdmFsdWUgPSBvd25lclsgdGhpcy5leHBhbmRvIF07XG5cblx0XHQvLyBJZiBub3QsIGNyZWF0ZSBvbmVcblx0XHRpZiAoICF2YWx1ZSApIHtcblx0XHRcdHZhbHVlID0ge307XG5cblx0XHRcdC8vIFdlIGNhbiBhY2NlcHQgZGF0YSBmb3Igbm9uLWVsZW1lbnQgbm9kZXMgaW4gbW9kZXJuIGJyb3dzZXJzLFxuXHRcdFx0Ly8gYnV0IHdlIHNob3VsZCBub3QsIHNlZSAjODMzNS5cblx0XHRcdC8vIEFsd2F5cyByZXR1cm4gYW4gZW1wdHkgb2JqZWN0LlxuXHRcdFx0aWYgKCBhY2NlcHREYXRhKCBvd25lciApICkge1xuXG5cdFx0XHRcdC8vIElmIGl0IGlzIGEgbm9kZSB1bmxpa2VseSB0byBiZSBzdHJpbmdpZnktZWQgb3IgbG9vcGVkIG92ZXJcblx0XHRcdFx0Ly8gdXNlIHBsYWluIGFzc2lnbm1lbnRcblx0XHRcdFx0aWYgKCBvd25lci5ub2RlVHlwZSApIHtcblx0XHRcdFx0XHRvd25lclsgdGhpcy5leHBhbmRvIF0gPSB2YWx1ZTtcblxuXHRcdFx0XHQvLyBPdGhlcndpc2Ugc2VjdXJlIGl0IGluIGEgbm9uLWVudW1lcmFibGUgcHJvcGVydHlcblx0XHRcdFx0Ly8gY29uZmlndXJhYmxlIG11c3QgYmUgdHJ1ZSB0byBhbGxvdyB0aGUgcHJvcGVydHkgdG8gYmVcblx0XHRcdFx0Ly8gZGVsZXRlZCB3aGVuIGRhdGEgaXMgcmVtb3ZlZFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggb3duZXIsIHRoaXMuZXhwYW5kbywge1xuXHRcdFx0XHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlXG5cdFx0XHRcdFx0fSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9LFxuXHRzZXQ6IGZ1bmN0aW9uKCBvd25lciwgZGF0YSwgdmFsdWUgKSB7XG5cdFx0dmFyIHByb3AsXG5cdFx0XHRjYWNoZSA9IHRoaXMuY2FjaGUoIG93bmVyICk7XG5cblx0XHQvLyBIYW5kbGU6IFsgb3duZXIsIGtleSwgdmFsdWUgXSBhcmdzXG5cdFx0aWYgKCB0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdGNhY2hlWyBkYXRhIF0gPSB2YWx1ZTtcblxuXHRcdC8vIEhhbmRsZTogWyBvd25lciwgeyBwcm9wZXJ0aWVzIH0gXSBhcmdzXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gQ29weSB0aGUgcHJvcGVydGllcyBvbmUtYnktb25lIHRvIHRoZSBjYWNoZSBvYmplY3Rcblx0XHRcdGZvciAoIHByb3AgaW4gZGF0YSApIHtcblx0XHRcdFx0Y2FjaGVbIHByb3AgXSA9IGRhdGFbIHByb3AgXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGNhY2hlO1xuXHR9LFxuXHRnZXQ6IGZ1bmN0aW9uKCBvd25lciwga2V5ICkge1xuXHRcdHJldHVybiBrZXkgPT09IHVuZGVmaW5lZCA/XG5cdFx0XHR0aGlzLmNhY2hlKCBvd25lciApIDpcblx0XHRcdG93bmVyWyB0aGlzLmV4cGFuZG8gXSAmJiBvd25lclsgdGhpcy5leHBhbmRvIF1bIGtleSBdO1xuXHR9LFxuXHRhY2Nlc3M6IGZ1bmN0aW9uKCBvd25lciwga2V5LCB2YWx1ZSApIHtcblx0XHR2YXIgc3RvcmVkO1xuXG5cdFx0Ly8gSW4gY2FzZXMgd2hlcmUgZWl0aGVyOlxuXHRcdC8vXG5cdFx0Ly8gICAxLiBObyBrZXkgd2FzIHNwZWNpZmllZFxuXHRcdC8vICAgMi4gQSBzdHJpbmcga2V5IHdhcyBzcGVjaWZpZWQsIGJ1dCBubyB2YWx1ZSBwcm92aWRlZFxuXHRcdC8vXG5cdFx0Ly8gVGFrZSB0aGUgXCJyZWFkXCIgcGF0aCBhbmQgYWxsb3cgdGhlIGdldCBtZXRob2QgdG8gZGV0ZXJtaW5lXG5cdFx0Ly8gd2hpY2ggdmFsdWUgdG8gcmV0dXJuLCByZXNwZWN0aXZlbHkgZWl0aGVyOlxuXHRcdC8vXG5cdFx0Ly8gICAxLiBUaGUgZW50aXJlIGNhY2hlIG9iamVjdFxuXHRcdC8vICAgMi4gVGhlIGRhdGEgc3RvcmVkIGF0IHRoZSBrZXlcblx0XHQvL1xuXHRcdGlmICgga2V5ID09PSB1bmRlZmluZWQgfHxcblx0XHRcdFx0KCAoIGtleSAmJiB0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiICkgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCApICkge1xuXG5cdFx0XHRzdG9yZWQgPSB0aGlzLmdldCggb3duZXIsIGtleSApO1xuXG5cdFx0XHRyZXR1cm4gc3RvcmVkICE9PSB1bmRlZmluZWQgP1xuXHRcdFx0XHRzdG9yZWQgOiB0aGlzLmdldCggb3duZXIsIGpRdWVyeS5jYW1lbENhc2UoIGtleSApICk7XG5cdFx0fVxuXG5cdFx0Ly8gV2hlbiB0aGUga2V5IGlzIG5vdCBhIHN0cmluZywgb3IgYm90aCBhIGtleSBhbmQgdmFsdWVcblx0XHQvLyBhcmUgc3BlY2lmaWVkLCBzZXQgb3IgZXh0ZW5kIChleGlzdGluZyBvYmplY3RzKSB3aXRoIGVpdGhlcjpcblx0XHQvL1xuXHRcdC8vICAgMS4gQW4gb2JqZWN0IG9mIHByb3BlcnRpZXNcblx0XHQvLyAgIDIuIEEga2V5IGFuZCB2YWx1ZVxuXHRcdC8vXG5cdFx0dGhpcy5zZXQoIG93bmVyLCBrZXksIHZhbHVlICk7XG5cblx0XHQvLyBTaW5jZSB0aGUgXCJzZXRcIiBwYXRoIGNhbiBoYXZlIHR3byBwb3NzaWJsZSBlbnRyeSBwb2ludHNcblx0XHQvLyByZXR1cm4gdGhlIGV4cGVjdGVkIGRhdGEgYmFzZWQgb24gd2hpY2ggcGF0aCB3YXMgdGFrZW5bKl1cblx0XHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoga2V5O1xuXHR9LFxuXHRyZW1vdmU6IGZ1bmN0aW9uKCBvd25lciwga2V5ICkge1xuXHRcdHZhciBpLCBuYW1lLCBjYW1lbCxcblx0XHRcdGNhY2hlID0gb3duZXJbIHRoaXMuZXhwYW5kbyBdO1xuXG5cdFx0aWYgKCBjYWNoZSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICgga2V5ID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHR0aGlzLnJlZ2lzdGVyKCBvd25lciApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gU3VwcG9ydCBhcnJheSBvciBzcGFjZSBzZXBhcmF0ZWQgc3RyaW5nIG9mIGtleXNcblx0XHRcdGlmICggalF1ZXJ5LmlzQXJyYXkoIGtleSApICkge1xuXG5cdFx0XHRcdC8vIElmIFwibmFtZVwiIGlzIGFuIGFycmF5IG9mIGtleXMuLi5cblx0XHRcdFx0Ly8gV2hlbiBkYXRhIGlzIGluaXRpYWxseSBjcmVhdGVkLCB2aWEgKFwia2V5XCIsIFwidmFsXCIpIHNpZ25hdHVyZSxcblx0XHRcdFx0Ly8ga2V5cyB3aWxsIGJlIGNvbnZlcnRlZCB0byBjYW1lbENhc2UuXG5cdFx0XHRcdC8vIFNpbmNlIHRoZXJlIGlzIG5vIHdheSB0byB0ZWxsIF9ob3dfIGEga2V5IHdhcyBhZGRlZCwgcmVtb3ZlXG5cdFx0XHRcdC8vIGJvdGggcGxhaW4ga2V5IGFuZCBjYW1lbENhc2Uga2V5LiAjMTI3ODZcblx0XHRcdFx0Ly8gVGhpcyB3aWxsIG9ubHkgcGVuYWxpemUgdGhlIGFycmF5IGFyZ3VtZW50IHBhdGguXG5cdFx0XHRcdG5hbWUgPSBrZXkuY29uY2F0KCBrZXkubWFwKCBqUXVlcnkuY2FtZWxDYXNlICkgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNhbWVsID0galF1ZXJ5LmNhbWVsQ2FzZSgga2V5ICk7XG5cblx0XHRcdFx0Ly8gVHJ5IHRoZSBzdHJpbmcgYXMgYSBrZXkgYmVmb3JlIGFueSBtYW5pcHVsYXRpb25cblx0XHRcdFx0aWYgKCBrZXkgaW4gY2FjaGUgKSB7XG5cdFx0XHRcdFx0bmFtZSA9IFsga2V5LCBjYW1lbCBdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0Ly8gSWYgYSBrZXkgd2l0aCB0aGUgc3BhY2VzIGV4aXN0cywgdXNlIGl0LlxuXHRcdFx0XHRcdC8vIE90aGVyd2lzZSwgY3JlYXRlIGFuIGFycmF5IGJ5IG1hdGNoaW5nIG5vbi13aGl0ZXNwYWNlXG5cdFx0XHRcdFx0bmFtZSA9IGNhbWVsO1xuXHRcdFx0XHRcdG5hbWUgPSBuYW1lIGluIGNhY2hlID9cblx0XHRcdFx0XHRcdFsgbmFtZSBdIDogKCBuYW1lLm1hdGNoKCBybm90d2hpdGUgKSB8fCBbXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGkgPSBuYW1lLmxlbmd0aDtcblxuXHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdGRlbGV0ZSBjYWNoZVsgbmFtZVsgaSBdIF07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUmVtb3ZlIHRoZSBleHBhbmRvIGlmIHRoZXJlJ3Mgbm8gbW9yZSBkYXRhXG5cdFx0aWYgKCBrZXkgPT09IHVuZGVmaW5lZCB8fCBqUXVlcnkuaXNFbXB0eU9iamVjdCggY2FjaGUgKSApIHtcblxuXHRcdFx0Ly8gU3VwcG9ydDogQ2hyb21lIDw9IDM1LTQ1K1xuXHRcdFx0Ly8gV2Via2l0ICYgQmxpbmsgcGVyZm9ybWFuY2Ugc3VmZmVycyB3aGVuIGRlbGV0aW5nIHByb3BlcnRpZXNcblx0XHRcdC8vIGZyb20gRE9NIG5vZGVzLCBzbyBzZXQgdG8gdW5kZWZpbmVkIGluc3RlYWRcblx0XHRcdC8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0zNzg2MDdcblx0XHRcdGlmICggb3duZXIubm9kZVR5cGUgKSB7XG5cdFx0XHRcdG93bmVyWyB0aGlzLmV4cGFuZG8gXSA9IHVuZGVmaW5lZDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRlbGV0ZSBvd25lclsgdGhpcy5leHBhbmRvIF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRoYXNEYXRhOiBmdW5jdGlvbiggb3duZXIgKSB7XG5cdFx0dmFyIGNhY2hlID0gb3duZXJbIHRoaXMuZXhwYW5kbyBdO1xuXHRcdHJldHVybiBjYWNoZSAhPT0gdW5kZWZpbmVkICYmICFqUXVlcnkuaXNFbXB0eU9iamVjdCggY2FjaGUgKTtcblx0fVxufTtcbnZhciBkYXRhUHJpdiA9IG5ldyBEYXRhKCk7XG5cbnZhciBkYXRhVXNlciA9IG5ldyBEYXRhKCk7XG5cblxuXG4vL1x0SW1wbGVtZW50YXRpb24gU3VtbWFyeVxuLy9cbi8vXHQxLiBFbmZvcmNlIEFQSSBzdXJmYWNlIGFuZCBzZW1hbnRpYyBjb21wYXRpYmlsaXR5IHdpdGggMS45LnggYnJhbmNoXG4vL1x0Mi4gSW1wcm92ZSB0aGUgbW9kdWxlJ3MgbWFpbnRhaW5hYmlsaXR5IGJ5IHJlZHVjaW5nIHRoZSBzdG9yYWdlXG4vL1x0XHRwYXRocyB0byBhIHNpbmdsZSBtZWNoYW5pc20uXG4vL1x0My4gVXNlIHRoZSBzYW1lIHNpbmdsZSBtZWNoYW5pc20gdG8gc3VwcG9ydCBcInByaXZhdGVcIiBhbmQgXCJ1c2VyXCIgZGF0YS5cbi8vXHQ0LiBfTmV2ZXJfIGV4cG9zZSBcInByaXZhdGVcIiBkYXRhIHRvIHVzZXIgY29kZSAoVE9ETzogRHJvcCBfZGF0YSwgX3JlbW92ZURhdGEpXG4vL1x0NS4gQXZvaWQgZXhwb3NpbmcgaW1wbGVtZW50YXRpb24gZGV0YWlscyBvbiB1c2VyIG9iamVjdHMgKGVnLiBleHBhbmRvIHByb3BlcnRpZXMpXG4vL1x0Ni4gUHJvdmlkZSBhIGNsZWFyIHBhdGggZm9yIGltcGxlbWVudGF0aW9uIHVwZ3JhZGUgdG8gV2Vha01hcCBpbiAyMDE0XG5cbnZhciByYnJhY2UgPSAvXig/Olxce1tcXHdcXFddKlxcfXxcXFtbXFx3XFxXXSpcXF0pJC8sXG5cdHJtdWx0aURhc2ggPSAvW0EtWl0vZztcblxuZnVuY3Rpb24gZGF0YUF0dHIoIGVsZW0sIGtleSwgZGF0YSApIHtcblx0dmFyIG5hbWU7XG5cblx0Ly8gSWYgbm90aGluZyB3YXMgZm91bmQgaW50ZXJuYWxseSwgdHJ5IHRvIGZldGNoIGFueVxuXHQvLyBkYXRhIGZyb20gdGhlIEhUTUw1IGRhdGEtKiBhdHRyaWJ1dGVcblx0aWYgKCBkYXRhID09PSB1bmRlZmluZWQgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRuYW1lID0gXCJkYXRhLVwiICsga2V5LnJlcGxhY2UoIHJtdWx0aURhc2gsIFwiLSQmXCIgKS50b0xvd2VyQ2FzZSgpO1xuXHRcdGRhdGEgPSBlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSApO1xuXG5cdFx0aWYgKCB0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGRhdGEgPSBkYXRhID09PSBcInRydWVcIiA/IHRydWUgOlxuXHRcdFx0XHRcdGRhdGEgPT09IFwiZmFsc2VcIiA/IGZhbHNlIDpcblx0XHRcdFx0XHRkYXRhID09PSBcIm51bGxcIiA/IG51bGwgOlxuXG5cdFx0XHRcdFx0Ly8gT25seSBjb252ZXJ0IHRvIGEgbnVtYmVyIGlmIGl0IGRvZXNuJ3QgY2hhbmdlIHRoZSBzdHJpbmdcblx0XHRcdFx0XHQrZGF0YSArIFwiXCIgPT09IGRhdGEgPyArZGF0YSA6XG5cdFx0XHRcdFx0cmJyYWNlLnRlc3QoIGRhdGEgKSA/IGpRdWVyeS5wYXJzZUpTT04oIGRhdGEgKSA6XG5cdFx0XHRcdFx0ZGF0YTtcblx0XHRcdH0gY2F0Y2ggKCBlICkge31cblxuXHRcdFx0Ly8gTWFrZSBzdXJlIHdlIHNldCB0aGUgZGF0YSBzbyBpdCBpc24ndCBjaGFuZ2VkIGxhdGVyXG5cdFx0XHRkYXRhVXNlci5zZXQoIGVsZW0sIGtleSwgZGF0YSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkYXRhID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZGF0YTtcbn1cblxualF1ZXJ5LmV4dGVuZCgge1xuXHRoYXNEYXRhOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gZGF0YVVzZXIuaGFzRGF0YSggZWxlbSApIHx8IGRhdGFQcml2Lmhhc0RhdGEoIGVsZW0gKTtcblx0fSxcblxuXHRkYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgZGF0YSApIHtcblx0XHRyZXR1cm4gZGF0YVVzZXIuYWNjZXNzKCBlbGVtLCBuYW1lLCBkYXRhICk7XG5cdH0sXG5cblx0cmVtb3ZlRGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG5cdFx0ZGF0YVVzZXIucmVtb3ZlKCBlbGVtLCBuYW1lICk7XG5cdH0sXG5cblx0Ly8gVE9ETzogTm93IHRoYXQgYWxsIGNhbGxzIHRvIF9kYXRhIGFuZCBfcmVtb3ZlRGF0YSBoYXZlIGJlZW4gcmVwbGFjZWRcblx0Ly8gd2l0aCBkaXJlY3QgY2FsbHMgdG8gZGF0YVByaXYgbWV0aG9kcywgdGhlc2UgY2FuIGJlIGRlcHJlY2F0ZWQuXG5cdF9kYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgZGF0YSApIHtcblx0XHRyZXR1cm4gZGF0YVByaXYuYWNjZXNzKCBlbGVtLCBuYW1lLCBkYXRhICk7XG5cdH0sXG5cblx0X3JlbW92ZURhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuXHRcdGRhdGFQcml2LnJlbW92ZSggZWxlbSwgbmFtZSApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0ZGF0YTogZnVuY3Rpb24oIGtleSwgdmFsdWUgKSB7XG5cdFx0dmFyIGksIG5hbWUsIGRhdGEsXG5cdFx0XHRlbGVtID0gdGhpc1sgMCBdLFxuXHRcdFx0YXR0cnMgPSBlbGVtICYmIGVsZW0uYXR0cmlidXRlcztcblxuXHRcdC8vIEdldHMgYWxsIHZhbHVlc1xuXHRcdGlmICgga2V5ID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRpZiAoIHRoaXMubGVuZ3RoICkge1xuXHRcdFx0XHRkYXRhID0gZGF0YVVzZXIuZ2V0KCBlbGVtICk7XG5cblx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICYmICFkYXRhUHJpdi5nZXQoIGVsZW0sIFwiaGFzRGF0YUF0dHJzXCIgKSApIHtcblx0XHRcdFx0XHRpID0gYXR0cnMubGVuZ3RoO1xuXHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXG5cdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRTExK1xuXHRcdFx0XHRcdFx0Ly8gVGhlIGF0dHJzIGVsZW1lbnRzIGNhbiBiZSBudWxsICgjMTQ4OTQpXG5cdFx0XHRcdFx0XHRpZiAoIGF0dHJzWyBpIF0gKSB7XG5cdFx0XHRcdFx0XHRcdG5hbWUgPSBhdHRyc1sgaSBdLm5hbWU7XG5cdFx0XHRcdFx0XHRcdGlmICggbmFtZS5pbmRleE9mKCBcImRhdGEtXCIgKSA9PT0gMCApIHtcblx0XHRcdFx0XHRcdFx0XHRuYW1lID0galF1ZXJ5LmNhbWVsQ2FzZSggbmFtZS5zbGljZSggNSApICk7XG5cdFx0XHRcdFx0XHRcdFx0ZGF0YUF0dHIoIGVsZW0sIG5hbWUsIGRhdGFbIG5hbWUgXSApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRhdGFQcml2LnNldCggZWxlbSwgXCJoYXNEYXRhQXR0cnNcIiwgdHJ1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH1cblxuXHRcdC8vIFNldHMgbXVsdGlwbGUgdmFsdWVzXG5cdFx0aWYgKCB0eXBlb2Yga2V5ID09PSBcIm9iamVjdFwiICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGRhdGFVc2VyLnNldCggdGhpcywga2V5ICk7XG5cdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0dmFyIGRhdGEsIGNhbWVsS2V5O1xuXG5cdFx0XHQvLyBUaGUgY2FsbGluZyBqUXVlcnkgb2JqZWN0IChlbGVtZW50IG1hdGNoZXMpIGlzIG5vdCBlbXB0eVxuXHRcdFx0Ly8gKGFuZCB0aGVyZWZvcmUgaGFzIGFuIGVsZW1lbnQgYXBwZWFycyBhdCB0aGlzWyAwIF0pIGFuZCB0aGVcblx0XHRcdC8vIGB2YWx1ZWAgcGFyYW1ldGVyIHdhcyBub3QgdW5kZWZpbmVkLiBBbiBlbXB0eSBqUXVlcnkgb2JqZWN0XG5cdFx0XHQvLyB3aWxsIHJlc3VsdCBpbiBgdW5kZWZpbmVkYCBmb3IgZWxlbSA9IHRoaXNbIDAgXSB3aGljaCB3aWxsXG5cdFx0XHQvLyB0aHJvdyBhbiBleGNlcHRpb24gaWYgYW4gYXR0ZW1wdCB0byByZWFkIGEgZGF0YSBjYWNoZSBpcyBtYWRlLlxuXHRcdFx0aWYgKCBlbGVtICYmIHZhbHVlID09PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0Ly8gQXR0ZW1wdCB0byBnZXQgZGF0YSBmcm9tIHRoZSBjYWNoZVxuXHRcdFx0XHQvLyB3aXRoIHRoZSBrZXkgYXMtaXNcblx0XHRcdFx0ZGF0YSA9IGRhdGFVc2VyLmdldCggZWxlbSwga2V5ICkgfHxcblxuXHRcdFx0XHRcdC8vIFRyeSB0byBmaW5kIGRhc2hlZCBrZXkgaWYgaXQgZXhpc3RzIChnaC0yNzc5KVxuXHRcdFx0XHRcdC8vIFRoaXMgaXMgZm9yIDIuMi54IG9ubHlcblx0XHRcdFx0XHRkYXRhVXNlci5nZXQoIGVsZW0sIGtleS5yZXBsYWNlKCBybXVsdGlEYXNoLCBcIi0kJlwiICkudG9Mb3dlckNhc2UoKSApO1xuXG5cdFx0XHRcdGlmICggZGF0YSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdHJldHVybiBkYXRhO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y2FtZWxLZXkgPSBqUXVlcnkuY2FtZWxDYXNlKCBrZXkgKTtcblxuXHRcdFx0XHQvLyBBdHRlbXB0IHRvIGdldCBkYXRhIGZyb20gdGhlIGNhY2hlXG5cdFx0XHRcdC8vIHdpdGggdGhlIGtleSBjYW1lbGl6ZWRcblx0XHRcdFx0ZGF0YSA9IGRhdGFVc2VyLmdldCggZWxlbSwgY2FtZWxLZXkgKTtcblx0XHRcdFx0aWYgKCBkYXRhICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBBdHRlbXB0IHRvIFwiZGlzY292ZXJcIiB0aGUgZGF0YSBpblxuXHRcdFx0XHQvLyBIVE1MNSBjdXN0b20gZGF0YS0qIGF0dHJzXG5cdFx0XHRcdGRhdGEgPSBkYXRhQXR0ciggZWxlbSwgY2FtZWxLZXksIHVuZGVmaW5lZCApO1xuXHRcdFx0XHRpZiAoIGRhdGEgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRyZXR1cm4gZGF0YTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFdlIHRyaWVkIHJlYWxseSBoYXJkLCBidXQgdGhlIGRhdGEgZG9lc24ndCBleGlzdC5cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTZXQgdGhlIGRhdGEuLi5cblx0XHRcdGNhbWVsS2V5ID0galF1ZXJ5LmNhbWVsQ2FzZSgga2V5ICk7XG5cdFx0XHR0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdC8vIEZpcnN0LCBhdHRlbXB0IHRvIHN0b3JlIGEgY29weSBvciByZWZlcmVuY2Ugb2YgYW55XG5cdFx0XHRcdC8vIGRhdGEgdGhhdCBtaWdodCd2ZSBiZWVuIHN0b3JlIHdpdGggYSBjYW1lbENhc2VkIGtleS5cblx0XHRcdFx0dmFyIGRhdGEgPSBkYXRhVXNlci5nZXQoIHRoaXMsIGNhbWVsS2V5ICk7XG5cblx0XHRcdFx0Ly8gRm9yIEhUTUw1IGRhdGEtKiBhdHRyaWJ1dGUgaW50ZXJvcCwgd2UgaGF2ZSB0b1xuXHRcdFx0XHQvLyBzdG9yZSBwcm9wZXJ0eSBuYW1lcyB3aXRoIGRhc2hlcyBpbiBhIGNhbWVsQ2FzZSBmb3JtLlxuXHRcdFx0XHQvLyBUaGlzIG1pZ2h0IG5vdCBhcHBseSB0byBhbGwgcHJvcGVydGllcy4uLipcblx0XHRcdFx0ZGF0YVVzZXIuc2V0KCB0aGlzLCBjYW1lbEtleSwgdmFsdWUgKTtcblxuXHRcdFx0XHQvLyAqLi4uIEluIHRoZSBjYXNlIG9mIHByb3BlcnRpZXMgdGhhdCBtaWdodCBfYWN0dWFsbHlfXG5cdFx0XHRcdC8vIGhhdmUgZGFzaGVzLCB3ZSBuZWVkIHRvIGFsc28gc3RvcmUgYSBjb3B5IG9mIHRoYXRcblx0XHRcdFx0Ly8gdW5jaGFuZ2VkIHByb3BlcnR5LlxuXHRcdFx0XHRpZiAoIGtleS5pbmRleE9mKCBcIi1cIiApID4gLTEgJiYgZGF0YSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdGRhdGFVc2VyLnNldCggdGhpcywga2V5LCB2YWx1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9ICk7XG5cdFx0fSwgbnVsbCwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAxLCBudWxsLCB0cnVlICk7XG5cdH0sXG5cblx0cmVtb3ZlRGF0YTogZnVuY3Rpb24oIGtleSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGRhdGFVc2VyLnJlbW92ZSggdGhpcywga2V5ICk7XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cblxualF1ZXJ5LmV4dGVuZCgge1xuXHRxdWV1ZTogZnVuY3Rpb24oIGVsZW0sIHR5cGUsIGRhdGEgKSB7XG5cdFx0dmFyIHF1ZXVlO1xuXG5cdFx0aWYgKCBlbGVtICkge1xuXHRcdFx0dHlwZSA9ICggdHlwZSB8fCBcImZ4XCIgKSArIFwicXVldWVcIjtcblx0XHRcdHF1ZXVlID0gZGF0YVByaXYuZ2V0KCBlbGVtLCB0eXBlICk7XG5cblx0XHRcdC8vIFNwZWVkIHVwIGRlcXVldWUgYnkgZ2V0dGluZyBvdXQgcXVpY2tseSBpZiB0aGlzIGlzIGp1c3QgYSBsb29rdXBcblx0XHRcdGlmICggZGF0YSApIHtcblx0XHRcdFx0aWYgKCAhcXVldWUgfHwgalF1ZXJ5LmlzQXJyYXkoIGRhdGEgKSApIHtcblx0XHRcdFx0XHRxdWV1ZSA9IGRhdGFQcml2LmFjY2VzcyggZWxlbSwgdHlwZSwgalF1ZXJ5Lm1ha2VBcnJheSggZGF0YSApICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cXVldWUucHVzaCggZGF0YSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcXVldWUgfHwgW107XG5cdFx0fVxuXHR9LFxuXG5cdGRlcXVldWU6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlICkge1xuXHRcdHR5cGUgPSB0eXBlIHx8IFwiZnhcIjtcblxuXHRcdHZhciBxdWV1ZSA9IGpRdWVyeS5xdWV1ZSggZWxlbSwgdHlwZSApLFxuXHRcdFx0c3RhcnRMZW5ndGggPSBxdWV1ZS5sZW5ndGgsXG5cdFx0XHRmbiA9IHF1ZXVlLnNoaWZ0KCksXG5cdFx0XHRob29rcyA9IGpRdWVyeS5fcXVldWVIb29rcyggZWxlbSwgdHlwZSApLFxuXHRcdFx0bmV4dCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRqUXVlcnkuZGVxdWV1ZSggZWxlbSwgdHlwZSApO1xuXHRcdFx0fTtcblxuXHRcdC8vIElmIHRoZSBmeCBxdWV1ZSBpcyBkZXF1ZXVlZCwgYWx3YXlzIHJlbW92ZSB0aGUgcHJvZ3Jlc3Mgc2VudGluZWxcblx0XHRpZiAoIGZuID09PSBcImlucHJvZ3Jlc3NcIiApIHtcblx0XHRcdGZuID0gcXVldWUuc2hpZnQoKTtcblx0XHRcdHN0YXJ0TGVuZ3RoLS07XG5cdFx0fVxuXG5cdFx0aWYgKCBmbiApIHtcblxuXHRcdFx0Ly8gQWRkIGEgcHJvZ3Jlc3Mgc2VudGluZWwgdG8gcHJldmVudCB0aGUgZnggcXVldWUgZnJvbSBiZWluZ1xuXHRcdFx0Ly8gYXV0b21hdGljYWxseSBkZXF1ZXVlZFxuXHRcdFx0aWYgKCB0eXBlID09PSBcImZ4XCIgKSB7XG5cdFx0XHRcdHF1ZXVlLnVuc2hpZnQoIFwiaW5wcm9ncmVzc1wiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENsZWFyIHVwIHRoZSBsYXN0IHF1ZXVlIHN0b3AgZnVuY3Rpb25cblx0XHRcdGRlbGV0ZSBob29rcy5zdG9wO1xuXHRcdFx0Zm4uY2FsbCggZWxlbSwgbmV4dCwgaG9va3MgKTtcblx0XHR9XG5cblx0XHRpZiAoICFzdGFydExlbmd0aCAmJiBob29rcyApIHtcblx0XHRcdGhvb2tzLmVtcHR5LmZpcmUoKTtcblx0XHR9XG5cdH0sXG5cblx0Ly8gTm90IHB1YmxpYyAtIGdlbmVyYXRlIGEgcXVldWVIb29rcyBvYmplY3QsIG9yIHJldHVybiB0aGUgY3VycmVudCBvbmVcblx0X3F1ZXVlSG9va3M6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlICkge1xuXHRcdHZhciBrZXkgPSB0eXBlICsgXCJxdWV1ZUhvb2tzXCI7XG5cdFx0cmV0dXJuIGRhdGFQcml2LmdldCggZWxlbSwga2V5ICkgfHwgZGF0YVByaXYuYWNjZXNzKCBlbGVtLCBrZXksIHtcblx0XHRcdGVtcHR5OiBqUXVlcnkuQ2FsbGJhY2tzKCBcIm9uY2UgbWVtb3J5XCIgKS5hZGQoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRkYXRhUHJpdi5yZW1vdmUoIGVsZW0sIFsgdHlwZSArIFwicXVldWVcIiwga2V5IF0gKTtcblx0XHRcdH0gKVxuXHRcdH0gKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdHF1ZXVlOiBmdW5jdGlvbiggdHlwZSwgZGF0YSApIHtcblx0XHR2YXIgc2V0dGVyID0gMjtcblxuXHRcdGlmICggdHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRkYXRhID0gdHlwZTtcblx0XHRcdHR5cGUgPSBcImZ4XCI7XG5cdFx0XHRzZXR0ZXItLTtcblx0XHR9XG5cblx0XHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggPCBzZXR0ZXIgKSB7XG5cdFx0XHRyZXR1cm4galF1ZXJ5LnF1ZXVlKCB0aGlzWyAwIF0sIHR5cGUgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZGF0YSA9PT0gdW5kZWZpbmVkID9cblx0XHRcdHRoaXMgOlxuXHRcdFx0dGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHF1ZXVlID0galF1ZXJ5LnF1ZXVlKCB0aGlzLCB0eXBlLCBkYXRhICk7XG5cblx0XHRcdFx0Ly8gRW5zdXJlIGEgaG9va3MgZm9yIHRoaXMgcXVldWVcblx0XHRcdFx0alF1ZXJ5Ll9xdWV1ZUhvb2tzKCB0aGlzLCB0eXBlICk7XG5cblx0XHRcdFx0aWYgKCB0eXBlID09PSBcImZ4XCIgJiYgcXVldWVbIDAgXSAhPT0gXCJpbnByb2dyZXNzXCIgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmRlcXVldWUoIHRoaXMsIHR5cGUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSApO1xuXHR9LFxuXHRkZXF1ZXVlOiBmdW5jdGlvbiggdHlwZSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeS5kZXF1ZXVlKCB0aGlzLCB0eXBlICk7XG5cdFx0fSApO1xuXHR9LFxuXHRjbGVhclF1ZXVlOiBmdW5jdGlvbiggdHlwZSApIHtcblx0XHRyZXR1cm4gdGhpcy5xdWV1ZSggdHlwZSB8fCBcImZ4XCIsIFtdICk7XG5cdH0sXG5cblx0Ly8gR2V0IGEgcHJvbWlzZSByZXNvbHZlZCB3aGVuIHF1ZXVlcyBvZiBhIGNlcnRhaW4gdHlwZVxuXHQvLyBhcmUgZW1wdGllZCAoZnggaXMgdGhlIHR5cGUgYnkgZGVmYXVsdClcblx0cHJvbWlzZTogZnVuY3Rpb24oIHR5cGUsIG9iaiApIHtcblx0XHR2YXIgdG1wLFxuXHRcdFx0Y291bnQgPSAxLFxuXHRcdFx0ZGVmZXIgPSBqUXVlcnkuRGVmZXJyZWQoKSxcblx0XHRcdGVsZW1lbnRzID0gdGhpcyxcblx0XHRcdGkgPSB0aGlzLmxlbmd0aCxcblx0XHRcdHJlc29sdmUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCAhKCAtLWNvdW50ICkgKSB7XG5cdFx0XHRcdFx0ZGVmZXIucmVzb2x2ZVdpdGgoIGVsZW1lbnRzLCBbIGVsZW1lbnRzIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdGlmICggdHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRvYmogPSB0eXBlO1xuXHRcdFx0dHlwZSA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG5cdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHR0bXAgPSBkYXRhUHJpdi5nZXQoIGVsZW1lbnRzWyBpIF0sIHR5cGUgKyBcInF1ZXVlSG9va3NcIiApO1xuXHRcdFx0aWYgKCB0bXAgJiYgdG1wLmVtcHR5ICkge1xuXHRcdFx0XHRjb3VudCsrO1xuXHRcdFx0XHR0bXAuZW1wdHkuYWRkKCByZXNvbHZlICk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJlc29sdmUoKTtcblx0XHRyZXR1cm4gZGVmZXIucHJvbWlzZSggb2JqICk7XG5cdH1cbn0gKTtcbnZhciBwbnVtID0gKCAvWystXT8oPzpcXGQqXFwufClcXGQrKD86W2VFXVsrLV0/XFxkK3wpLyApLnNvdXJjZTtcblxudmFyIHJjc3NOdW0gPSBuZXcgUmVnRXhwKCBcIl4oPzooWystXSk9fCkoXCIgKyBwbnVtICsgXCIpKFthLXolXSopJFwiLCBcImlcIiApO1xuXG5cbnZhciBjc3NFeHBhbmQgPSBbIFwiVG9wXCIsIFwiUmlnaHRcIiwgXCJCb3R0b21cIiwgXCJMZWZ0XCIgXTtcblxudmFyIGlzSGlkZGVuID0gZnVuY3Rpb24oIGVsZW0sIGVsICkge1xuXG5cdFx0Ly8gaXNIaWRkZW4gbWlnaHQgYmUgY2FsbGVkIGZyb20galF1ZXJ5I2ZpbHRlciBmdW5jdGlvbjtcblx0XHQvLyBpbiB0aGF0IGNhc2UsIGVsZW1lbnQgd2lsbCBiZSBzZWNvbmQgYXJndW1lbnRcblx0XHRlbGVtID0gZWwgfHwgZWxlbTtcblx0XHRyZXR1cm4galF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKSA9PT0gXCJub25lXCIgfHxcblx0XHRcdCFqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApO1xuXHR9O1xuXG5cblxuZnVuY3Rpb24gYWRqdXN0Q1NTKCBlbGVtLCBwcm9wLCB2YWx1ZVBhcnRzLCB0d2VlbiApIHtcblx0dmFyIGFkanVzdGVkLFxuXHRcdHNjYWxlID0gMSxcblx0XHRtYXhJdGVyYXRpb25zID0gMjAsXG5cdFx0Y3VycmVudFZhbHVlID0gdHdlZW4gP1xuXHRcdFx0ZnVuY3Rpb24oKSB7IHJldHVybiB0d2Vlbi5jdXIoKTsgfSA6XG5cdFx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIGpRdWVyeS5jc3MoIGVsZW0sIHByb3AsIFwiXCIgKTsgfSxcblx0XHRpbml0aWFsID0gY3VycmVudFZhbHVlKCksXG5cdFx0dW5pdCA9IHZhbHVlUGFydHMgJiYgdmFsdWVQYXJ0c1sgMyBdIHx8ICggalF1ZXJ5LmNzc051bWJlclsgcHJvcCBdID8gXCJcIiA6IFwicHhcIiApLFxuXG5cdFx0Ly8gU3RhcnRpbmcgdmFsdWUgY29tcHV0YXRpb24gaXMgcmVxdWlyZWQgZm9yIHBvdGVudGlhbCB1bml0IG1pc21hdGNoZXNcblx0XHRpbml0aWFsSW5Vbml0ID0gKCBqUXVlcnkuY3NzTnVtYmVyWyBwcm9wIF0gfHwgdW5pdCAhPT0gXCJweFwiICYmICtpbml0aWFsICkgJiZcblx0XHRcdHJjc3NOdW0uZXhlYyggalF1ZXJ5LmNzcyggZWxlbSwgcHJvcCApICk7XG5cblx0aWYgKCBpbml0aWFsSW5Vbml0ICYmIGluaXRpYWxJblVuaXRbIDMgXSAhPT0gdW5pdCApIHtcblxuXHRcdC8vIFRydXN0IHVuaXRzIHJlcG9ydGVkIGJ5IGpRdWVyeS5jc3Ncblx0XHR1bml0ID0gdW5pdCB8fCBpbml0aWFsSW5Vbml0WyAzIF07XG5cblx0XHQvLyBNYWtlIHN1cmUgd2UgdXBkYXRlIHRoZSB0d2VlbiBwcm9wZXJ0aWVzIGxhdGVyIG9uXG5cdFx0dmFsdWVQYXJ0cyA9IHZhbHVlUGFydHMgfHwgW107XG5cblx0XHQvLyBJdGVyYXRpdmVseSBhcHByb3hpbWF0ZSBmcm9tIGEgbm9uemVybyBzdGFydGluZyBwb2ludFxuXHRcdGluaXRpYWxJblVuaXQgPSAraW5pdGlhbCB8fCAxO1xuXG5cdFx0ZG8ge1xuXG5cdFx0XHQvLyBJZiBwcmV2aW91cyBpdGVyYXRpb24gemVyb2VkIG91dCwgZG91YmxlIHVudGlsIHdlIGdldCAqc29tZXRoaW5nKi5cblx0XHRcdC8vIFVzZSBzdHJpbmcgZm9yIGRvdWJsaW5nIHNvIHdlIGRvbid0IGFjY2lkZW50YWxseSBzZWUgc2NhbGUgYXMgdW5jaGFuZ2VkIGJlbG93XG5cdFx0XHRzY2FsZSA9IHNjYWxlIHx8IFwiLjVcIjtcblxuXHRcdFx0Ly8gQWRqdXN0IGFuZCBhcHBseVxuXHRcdFx0aW5pdGlhbEluVW5pdCA9IGluaXRpYWxJblVuaXQgLyBzY2FsZTtcblx0XHRcdGpRdWVyeS5zdHlsZSggZWxlbSwgcHJvcCwgaW5pdGlhbEluVW5pdCArIHVuaXQgKTtcblxuXHRcdC8vIFVwZGF0ZSBzY2FsZSwgdG9sZXJhdGluZyB6ZXJvIG9yIE5hTiBmcm9tIHR3ZWVuLmN1cigpXG5cdFx0Ly8gQnJlYWsgdGhlIGxvb3AgaWYgc2NhbGUgaXMgdW5jaGFuZ2VkIG9yIHBlcmZlY3QsIG9yIGlmIHdlJ3ZlIGp1c3QgaGFkIGVub3VnaC5cblx0XHR9IHdoaWxlIChcblx0XHRcdHNjYWxlICE9PSAoIHNjYWxlID0gY3VycmVudFZhbHVlKCkgLyBpbml0aWFsICkgJiYgc2NhbGUgIT09IDEgJiYgLS1tYXhJdGVyYXRpb25zXG5cdFx0KTtcblx0fVxuXG5cdGlmICggdmFsdWVQYXJ0cyApIHtcblx0XHRpbml0aWFsSW5Vbml0ID0gK2luaXRpYWxJblVuaXQgfHwgK2luaXRpYWwgfHwgMDtcblxuXHRcdC8vIEFwcGx5IHJlbGF0aXZlIG9mZnNldCAoKz0vLT0pIGlmIHNwZWNpZmllZFxuXHRcdGFkanVzdGVkID0gdmFsdWVQYXJ0c1sgMSBdID9cblx0XHRcdGluaXRpYWxJblVuaXQgKyAoIHZhbHVlUGFydHNbIDEgXSArIDEgKSAqIHZhbHVlUGFydHNbIDIgXSA6XG5cdFx0XHQrdmFsdWVQYXJ0c1sgMiBdO1xuXHRcdGlmICggdHdlZW4gKSB7XG5cdFx0XHR0d2Vlbi51bml0ID0gdW5pdDtcblx0XHRcdHR3ZWVuLnN0YXJ0ID0gaW5pdGlhbEluVW5pdDtcblx0XHRcdHR3ZWVuLmVuZCA9IGFkanVzdGVkO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gYWRqdXN0ZWQ7XG59XG52YXIgcmNoZWNrYWJsZVR5cGUgPSAoIC9eKD86Y2hlY2tib3h8cmFkaW8pJC9pICk7XG5cbnZhciBydGFnTmFtZSA9ICggLzwoW1xcdzotXSspLyApO1xuXG52YXIgcnNjcmlwdFR5cGUgPSAoIC9eJHxcXC8oPzpqYXZhfGVjbWEpc2NyaXB0L2kgKTtcblxuXG5cbi8vIFdlIGhhdmUgdG8gY2xvc2UgdGhlc2UgdGFncyB0byBzdXBwb3J0IFhIVE1MICgjMTMyMDApXG52YXIgd3JhcE1hcCA9IHtcblxuXHQvLyBTdXBwb3J0OiBJRTlcblx0b3B0aW9uOiBbIDEsIFwiPHNlbGVjdCBtdWx0aXBsZT0nbXVsdGlwbGUnPlwiLCBcIjwvc2VsZWN0PlwiIF0sXG5cblx0Ly8gWEhUTUwgcGFyc2VycyBkbyBub3QgbWFnaWNhbGx5IGluc2VydCBlbGVtZW50cyBpbiB0aGVcblx0Ly8gc2FtZSB3YXkgdGhhdCB0YWcgc291cCBwYXJzZXJzIGRvLiBTbyB3ZSBjYW5ub3Qgc2hvcnRlblxuXHQvLyB0aGlzIGJ5IG9taXR0aW5nIDx0Ym9keT4gb3Igb3RoZXIgcmVxdWlyZWQgZWxlbWVudHMuXG5cdHRoZWFkOiBbIDEsIFwiPHRhYmxlPlwiLCBcIjwvdGFibGU+XCIgXSxcblx0Y29sOiBbIDIsIFwiPHRhYmxlPjxjb2xncm91cD5cIiwgXCI8L2NvbGdyb3VwPjwvdGFibGU+XCIgXSxcblx0dHI6IFsgMiwgXCI8dGFibGU+PHRib2R5PlwiLCBcIjwvdGJvZHk+PC90YWJsZT5cIiBdLFxuXHR0ZDogWyAzLCBcIjx0YWJsZT48dGJvZHk+PHRyPlwiLCBcIjwvdHI+PC90Ym9keT48L3RhYmxlPlwiIF0sXG5cblx0X2RlZmF1bHQ6IFsgMCwgXCJcIiwgXCJcIiBdXG59O1xuXG4vLyBTdXBwb3J0OiBJRTlcbndyYXBNYXAub3B0Z3JvdXAgPSB3cmFwTWFwLm9wdGlvbjtcblxud3JhcE1hcC50Ym9keSA9IHdyYXBNYXAudGZvb3QgPSB3cmFwTWFwLmNvbGdyb3VwID0gd3JhcE1hcC5jYXB0aW9uID0gd3JhcE1hcC50aGVhZDtcbndyYXBNYXAudGggPSB3cmFwTWFwLnRkO1xuXG5cbmZ1bmN0aW9uIGdldEFsbCggY29udGV4dCwgdGFnICkge1xuXG5cdC8vIFN1cHBvcnQ6IElFOS0xMStcblx0Ly8gVXNlIHR5cGVvZiB0byBhdm9pZCB6ZXJvLWFyZ3VtZW50IG1ldGhvZCBpbnZvY2F0aW9uIG9uIGhvc3Qgb2JqZWN0cyAoIzE1MTUxKVxuXHR2YXIgcmV0ID0gdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgIT09IFwidW5kZWZpbmVkXCIgP1xuXHRcdFx0Y29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggdGFnIHx8IFwiKlwiICkgOlxuXHRcdFx0dHlwZW9mIGNvbnRleHQucXVlcnlTZWxlY3RvckFsbCAhPT0gXCJ1bmRlZmluZWRcIiA/XG5cdFx0XHRcdGNvbnRleHQucXVlcnlTZWxlY3RvckFsbCggdGFnIHx8IFwiKlwiICkgOlxuXHRcdFx0W107XG5cblx0cmV0dXJuIHRhZyA9PT0gdW5kZWZpbmVkIHx8IHRhZyAmJiBqUXVlcnkubm9kZU5hbWUoIGNvbnRleHQsIHRhZyApID9cblx0XHRqUXVlcnkubWVyZ2UoIFsgY29udGV4dCBdLCByZXQgKSA6XG5cdFx0cmV0O1xufVxuXG5cbi8vIE1hcmsgc2NyaXB0cyBhcyBoYXZpbmcgYWxyZWFkeSBiZWVuIGV2YWx1YXRlZFxuZnVuY3Rpb24gc2V0R2xvYmFsRXZhbCggZWxlbXMsIHJlZkVsZW1lbnRzICkge1xuXHR2YXIgaSA9IDAsXG5cdFx0bCA9IGVsZW1zLmxlbmd0aDtcblxuXHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0ZGF0YVByaXYuc2V0KFxuXHRcdFx0ZWxlbXNbIGkgXSxcblx0XHRcdFwiZ2xvYmFsRXZhbFwiLFxuXHRcdFx0IXJlZkVsZW1lbnRzIHx8IGRhdGFQcml2LmdldCggcmVmRWxlbWVudHNbIGkgXSwgXCJnbG9iYWxFdmFsXCIgKVxuXHRcdCk7XG5cdH1cbn1cblxuXG52YXIgcmh0bWwgPSAvPHwmIz9cXHcrOy87XG5cbmZ1bmN0aW9uIGJ1aWxkRnJhZ21lbnQoIGVsZW1zLCBjb250ZXh0LCBzY3JpcHRzLCBzZWxlY3Rpb24sIGlnbm9yZWQgKSB7XG5cdHZhciBlbGVtLCB0bXAsIHRhZywgd3JhcCwgY29udGFpbnMsIGosXG5cdFx0ZnJhZ21lbnQgPSBjb250ZXh0LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcblx0XHRub2RlcyA9IFtdLFxuXHRcdGkgPSAwLFxuXHRcdGwgPSBlbGVtcy5sZW5ndGg7XG5cblx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdGVsZW0gPSBlbGVtc1sgaSBdO1xuXG5cdFx0aWYgKCBlbGVtIHx8IGVsZW0gPT09IDAgKSB7XG5cblx0XHRcdC8vIEFkZCBub2RlcyBkaXJlY3RseVxuXHRcdFx0aWYgKCBqUXVlcnkudHlwZSggZWxlbSApID09PSBcIm9iamVjdFwiICkge1xuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQ8NC4xLCBQaGFudG9tSlM8MlxuXHRcdFx0XHQvLyBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzIG9uIGFuY2llbnQgV2ViS2l0XG5cdFx0XHRcdGpRdWVyeS5tZXJnZSggbm9kZXMsIGVsZW0ubm9kZVR5cGUgPyBbIGVsZW0gXSA6IGVsZW0gKTtcblxuXHRcdFx0Ly8gQ29udmVydCBub24taHRtbCBpbnRvIGEgdGV4dCBub2RlXG5cdFx0XHR9IGVsc2UgaWYgKCAhcmh0bWwudGVzdCggZWxlbSApICkge1xuXHRcdFx0XHRub2Rlcy5wdXNoKCBjb250ZXh0LmNyZWF0ZVRleHROb2RlKCBlbGVtICkgKTtcblxuXHRcdFx0Ly8gQ29udmVydCBodG1sIGludG8gRE9NIG5vZGVzXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0bXAgPSB0bXAgfHwgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGNvbnRleHQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApICk7XG5cblx0XHRcdFx0Ly8gRGVzZXJpYWxpemUgYSBzdGFuZGFyZCByZXByZXNlbnRhdGlvblxuXHRcdFx0XHR0YWcgPSAoIHJ0YWdOYW1lLmV4ZWMoIGVsZW0gKSB8fCBbIFwiXCIsIFwiXCIgXSApWyAxIF0udG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0d3JhcCA9IHdyYXBNYXBbIHRhZyBdIHx8IHdyYXBNYXAuX2RlZmF1bHQ7XG5cdFx0XHRcdHRtcC5pbm5lckhUTUwgPSB3cmFwWyAxIF0gKyBqUXVlcnkuaHRtbFByZWZpbHRlciggZWxlbSApICsgd3JhcFsgMiBdO1xuXG5cdFx0XHRcdC8vIERlc2NlbmQgdGhyb3VnaCB3cmFwcGVycyB0byB0aGUgcmlnaHQgY29udGVudFxuXHRcdFx0XHRqID0gd3JhcFsgMCBdO1xuXHRcdFx0XHR3aGlsZSAoIGotLSApIHtcblx0XHRcdFx0XHR0bXAgPSB0bXAubGFzdENoaWxkO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZDw0LjEsIFBoYW50b21KUzwyXG5cdFx0XHRcdC8vIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Mgb24gYW5jaWVudCBXZWJLaXRcblx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCBub2RlcywgdG1wLmNoaWxkTm9kZXMgKTtcblxuXHRcdFx0XHQvLyBSZW1lbWJlciB0aGUgdG9wLWxldmVsIGNvbnRhaW5lclxuXHRcdFx0XHR0bXAgPSBmcmFnbWVudC5maXJzdENoaWxkO1xuXG5cdFx0XHRcdC8vIEVuc3VyZSB0aGUgY3JlYXRlZCBub2RlcyBhcmUgb3JwaGFuZWQgKCMxMjM5Milcblx0XHRcdFx0dG1wLnRleHRDb250ZW50ID0gXCJcIjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBSZW1vdmUgd3JhcHBlciBmcm9tIGZyYWdtZW50XG5cdGZyYWdtZW50LnRleHRDb250ZW50ID0gXCJcIjtcblxuXHRpID0gMDtcblx0d2hpbGUgKCAoIGVsZW0gPSBub2Rlc1sgaSsrIF0gKSApIHtcblxuXHRcdC8vIFNraXAgZWxlbWVudHMgYWxyZWFkeSBpbiB0aGUgY29udGV4dCBjb2xsZWN0aW9uICh0cmFjLTQwODcpXG5cdFx0aWYgKCBzZWxlY3Rpb24gJiYgalF1ZXJ5LmluQXJyYXkoIGVsZW0sIHNlbGVjdGlvbiApID4gLTEgKSB7XG5cdFx0XHRpZiAoIGlnbm9yZWQgKSB7XG5cdFx0XHRcdGlnbm9yZWQucHVzaCggZWxlbSApO1xuXHRcdFx0fVxuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0Y29udGFpbnMgPSBqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApO1xuXG5cdFx0Ly8gQXBwZW5kIHRvIGZyYWdtZW50XG5cdFx0dG1wID0gZ2V0QWxsKCBmcmFnbWVudC5hcHBlbmRDaGlsZCggZWxlbSApLCBcInNjcmlwdFwiICk7XG5cblx0XHQvLyBQcmVzZXJ2ZSBzY3JpcHQgZXZhbHVhdGlvbiBoaXN0b3J5XG5cdFx0aWYgKCBjb250YWlucyApIHtcblx0XHRcdHNldEdsb2JhbEV2YWwoIHRtcCApO1xuXHRcdH1cblxuXHRcdC8vIENhcHR1cmUgZXhlY3V0YWJsZXNcblx0XHRpZiAoIHNjcmlwdHMgKSB7XG5cdFx0XHRqID0gMDtcblx0XHRcdHdoaWxlICggKCBlbGVtID0gdG1wWyBqKysgXSApICkge1xuXHRcdFx0XHRpZiAoIHJzY3JpcHRUeXBlLnRlc3QoIGVsZW0udHlwZSB8fCBcIlwiICkgKSB7XG5cdFx0XHRcdFx0c2NyaXB0cy5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZnJhZ21lbnQ7XG59XG5cblxuKCBmdW5jdGlvbigpIHtcblx0dmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxuXHRcdGRpdiA9IGZyYWdtZW50LmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkgKSxcblx0XHRpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiaW5wdXRcIiApO1xuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQgNC4wLTQuMywgU2FmYXJpPD01LjFcblx0Ly8gQ2hlY2sgc3RhdGUgbG9zdCBpZiB0aGUgbmFtZSBpcyBzZXQgKCMxMTIxNylcblx0Ly8gU3VwcG9ydDogV2luZG93cyBXZWIgQXBwcyAoV1dBKVxuXHQvLyBgbmFtZWAgYW5kIGB0eXBlYCBtdXN0IHVzZSAuc2V0QXR0cmlidXRlIGZvciBXV0EgKCMxNDkwMSlcblx0aW5wdXQuc2V0QXR0cmlidXRlKCBcInR5cGVcIiwgXCJyYWRpb1wiICk7XG5cdGlucHV0LnNldEF0dHJpYnV0ZSggXCJjaGVja2VkXCIsIFwiY2hlY2tlZFwiICk7XG5cdGlucHV0LnNldEF0dHJpYnV0ZSggXCJuYW1lXCIsIFwidFwiICk7XG5cblx0ZGl2LmFwcGVuZENoaWxkKCBpbnB1dCApO1xuXG5cdC8vIFN1cHBvcnQ6IFNhZmFyaTw9NS4xLCBBbmRyb2lkPDQuMlxuXHQvLyBPbGRlciBXZWJLaXQgZG9lc24ndCBjbG9uZSBjaGVja2VkIHN0YXRlIGNvcnJlY3RseSBpbiBmcmFnbWVudHNcblx0c3VwcG9ydC5jaGVja0Nsb25lID0gZGl2LmNsb25lTm9kZSggdHJ1ZSApLmNsb25lTm9kZSggdHJ1ZSApLmxhc3RDaGlsZC5jaGVja2VkO1xuXG5cdC8vIFN1cHBvcnQ6IElFPD0xMStcblx0Ly8gTWFrZSBzdXJlIHRleHRhcmVhIChhbmQgY2hlY2tib3gpIGRlZmF1bHRWYWx1ZSBpcyBwcm9wZXJseSBjbG9uZWRcblx0ZGl2LmlubmVySFRNTCA9IFwiPHRleHRhcmVhPng8L3RleHRhcmVhPlwiO1xuXHRzdXBwb3J0Lm5vQ2xvbmVDaGVja2VkID0gISFkaXYuY2xvbmVOb2RlKCB0cnVlICkubGFzdENoaWxkLmRlZmF1bHRWYWx1ZTtcbn0gKSgpO1xuXG5cbnZhclxuXHRya2V5RXZlbnQgPSAvXmtleS8sXG5cdHJtb3VzZUV2ZW50ID0gL14oPzptb3VzZXxwb2ludGVyfGNvbnRleHRtZW51fGRyYWd8ZHJvcCl8Y2xpY2svLFxuXHRydHlwZW5hbWVzcGFjZSA9IC9eKFteLl0qKSg/OlxcLiguKyl8KS87XG5cbmZ1bmN0aW9uIHJldHVyblRydWUoKSB7XG5cdHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiByZXR1cm5GYWxzZSgpIHtcblx0cmV0dXJuIGZhbHNlO1xufVxuXG4vLyBTdXBwb3J0OiBJRTlcbi8vIFNlZSAjMTMzOTMgZm9yIG1vcmUgaW5mb1xuZnVuY3Rpb24gc2FmZUFjdGl2ZUVsZW1lbnQoKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cdH0gY2F0Y2ggKCBlcnIgKSB7IH1cbn1cblxuZnVuY3Rpb24gb24oIGVsZW0sIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4sIG9uZSApIHtcblx0dmFyIG9yaWdGbiwgdHlwZTtcblxuXHQvLyBUeXBlcyBjYW4gYmUgYSBtYXAgb2YgdHlwZXMvaGFuZGxlcnNcblx0aWYgKCB0eXBlb2YgdHlwZXMgPT09IFwib2JqZWN0XCIgKSB7XG5cblx0XHQvLyAoIHR5cGVzLU9iamVjdCwgc2VsZWN0b3IsIGRhdGEgKVxuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiICkge1xuXG5cdFx0XHQvLyAoIHR5cGVzLU9iamVjdCwgZGF0YSApXG5cdFx0XHRkYXRhID0gZGF0YSB8fCBzZWxlY3Rvcjtcblx0XHRcdHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHRmb3IgKCB0eXBlIGluIHR5cGVzICkge1xuXHRcdFx0b24oIGVsZW0sIHR5cGUsIHNlbGVjdG9yLCBkYXRhLCB0eXBlc1sgdHlwZSBdLCBvbmUgKTtcblx0XHR9XG5cdFx0cmV0dXJuIGVsZW07XG5cdH1cblxuXHRpZiAoIGRhdGEgPT0gbnVsbCAmJiBmbiA9PSBudWxsICkge1xuXG5cdFx0Ly8gKCB0eXBlcywgZm4gKVxuXHRcdGZuID0gc2VsZWN0b3I7XG5cdFx0ZGF0YSA9IHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKCBmbiA9PSBudWxsICkge1xuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuXG5cdFx0XHQvLyAoIHR5cGVzLCBzZWxlY3RvciwgZm4gKVxuXHRcdFx0Zm4gPSBkYXRhO1xuXHRcdFx0ZGF0YSA9IHVuZGVmaW5lZDtcblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyAoIHR5cGVzLCBkYXRhLCBmbiApXG5cdFx0XHRmbiA9IGRhdGE7XG5cdFx0XHRkYXRhID0gc2VsZWN0b3I7XG5cdFx0XHRzZWxlY3RvciA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblx0aWYgKCBmbiA9PT0gZmFsc2UgKSB7XG5cdFx0Zm4gPSByZXR1cm5GYWxzZTtcblx0fSBlbHNlIGlmICggIWZuICkge1xuXHRcdHJldHVybiBlbGVtO1xuXHR9XG5cblx0aWYgKCBvbmUgPT09IDEgKSB7XG5cdFx0b3JpZ0ZuID0gZm47XG5cdFx0Zm4gPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cblx0XHRcdC8vIENhbiB1c2UgYW4gZW1wdHkgc2V0LCBzaW5jZSBldmVudCBjb250YWlucyB0aGUgaW5mb1xuXHRcdFx0alF1ZXJ5KCkub2ZmKCBldmVudCApO1xuXHRcdFx0cmV0dXJuIG9yaWdGbi5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0fTtcblxuXHRcdC8vIFVzZSBzYW1lIGd1aWQgc28gY2FsbGVyIGNhbiByZW1vdmUgdXNpbmcgb3JpZ0ZuXG5cdFx0Zm4uZ3VpZCA9IG9yaWdGbi5ndWlkIHx8ICggb3JpZ0ZuLmd1aWQgPSBqUXVlcnkuZ3VpZCsrICk7XG5cdH1cblx0cmV0dXJuIGVsZW0uZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0alF1ZXJ5LmV2ZW50LmFkZCggdGhpcywgdHlwZXMsIGZuLCBkYXRhLCBzZWxlY3RvciApO1xuXHR9ICk7XG59XG5cbi8qXG4gKiBIZWxwZXIgZnVuY3Rpb25zIGZvciBtYW5hZ2luZyBldmVudHMgLS0gbm90IHBhcnQgb2YgdGhlIHB1YmxpYyBpbnRlcmZhY2UuXG4gKiBQcm9wcyB0byBEZWFuIEVkd2FyZHMnIGFkZEV2ZW50IGxpYnJhcnkgZm9yIG1hbnkgb2YgdGhlIGlkZWFzLlxuICovXG5qUXVlcnkuZXZlbnQgPSB7XG5cblx0Z2xvYmFsOiB7fSxcblxuXHRhZGQ6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlcywgaGFuZGxlciwgZGF0YSwgc2VsZWN0b3IgKSB7XG5cblx0XHR2YXIgaGFuZGxlT2JqSW4sIGV2ZW50SGFuZGxlLCB0bXAsXG5cdFx0XHRldmVudHMsIHQsIGhhbmRsZU9iaixcblx0XHRcdHNwZWNpYWwsIGhhbmRsZXJzLCB0eXBlLCBuYW1lc3BhY2VzLCBvcmlnVHlwZSxcblx0XHRcdGVsZW1EYXRhID0gZGF0YVByaXYuZ2V0KCBlbGVtICk7XG5cblx0XHQvLyBEb24ndCBhdHRhY2ggZXZlbnRzIHRvIG5vRGF0YSBvciB0ZXh0L2NvbW1lbnQgbm9kZXMgKGJ1dCBhbGxvdyBwbGFpbiBvYmplY3RzKVxuXHRcdGlmICggIWVsZW1EYXRhICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIENhbGxlciBjYW4gcGFzcyBpbiBhbiBvYmplY3Qgb2YgY3VzdG9tIGRhdGEgaW4gbGlldSBvZiB0aGUgaGFuZGxlclxuXHRcdGlmICggaGFuZGxlci5oYW5kbGVyICkge1xuXHRcdFx0aGFuZGxlT2JqSW4gPSBoYW5kbGVyO1xuXHRcdFx0aGFuZGxlciA9IGhhbmRsZU9iakluLmhhbmRsZXI7XG5cdFx0XHRzZWxlY3RvciA9IGhhbmRsZU9iakluLnNlbGVjdG9yO1xuXHRcdH1cblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBoYW5kbGVyIGhhcyBhIHVuaXF1ZSBJRCwgdXNlZCB0byBmaW5kL3JlbW92ZSBpdCBsYXRlclxuXHRcdGlmICggIWhhbmRsZXIuZ3VpZCApIHtcblx0XHRcdGhhbmRsZXIuZ3VpZCA9IGpRdWVyeS5ndWlkKys7XG5cdFx0fVxuXG5cdFx0Ly8gSW5pdCB0aGUgZWxlbWVudCdzIGV2ZW50IHN0cnVjdHVyZSBhbmQgbWFpbiBoYW5kbGVyLCBpZiB0aGlzIGlzIHRoZSBmaXJzdFxuXHRcdGlmICggISggZXZlbnRzID0gZWxlbURhdGEuZXZlbnRzICkgKSB7XG5cdFx0XHRldmVudHMgPSBlbGVtRGF0YS5ldmVudHMgPSB7fTtcblx0XHR9XG5cdFx0aWYgKCAhKCBldmVudEhhbmRsZSA9IGVsZW1EYXRhLmhhbmRsZSApICkge1xuXHRcdFx0ZXZlbnRIYW5kbGUgPSBlbGVtRGF0YS5oYW5kbGUgPSBmdW5jdGlvbiggZSApIHtcblxuXHRcdFx0XHQvLyBEaXNjYXJkIHRoZSBzZWNvbmQgZXZlbnQgb2YgYSBqUXVlcnkuZXZlbnQudHJpZ2dlcigpIGFuZFxuXHRcdFx0XHQvLyB3aGVuIGFuIGV2ZW50IGlzIGNhbGxlZCBhZnRlciBhIHBhZ2UgaGFzIHVubG9hZGVkXG5cdFx0XHRcdHJldHVybiB0eXBlb2YgalF1ZXJ5ICE9PSBcInVuZGVmaW5lZFwiICYmIGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgIT09IGUudHlwZSA/XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LmRpc3BhdGNoLmFwcGx5KCBlbGVtLCBhcmd1bWVudHMgKSA6IHVuZGVmaW5lZDtcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Ly8gSGFuZGxlIG11bHRpcGxlIGV2ZW50cyBzZXBhcmF0ZWQgYnkgYSBzcGFjZVxuXHRcdHR5cGVzID0gKCB0eXBlcyB8fCBcIlwiICkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFsgXCJcIiBdO1xuXHRcdHQgPSB0eXBlcy5sZW5ndGg7XG5cdFx0d2hpbGUgKCB0LS0gKSB7XG5cdFx0XHR0bXAgPSBydHlwZW5hbWVzcGFjZS5leGVjKCB0eXBlc1sgdCBdICkgfHwgW107XG5cdFx0XHR0eXBlID0gb3JpZ1R5cGUgPSB0bXBbIDEgXTtcblx0XHRcdG5hbWVzcGFjZXMgPSAoIHRtcFsgMiBdIHx8IFwiXCIgKS5zcGxpdCggXCIuXCIgKS5zb3J0KCk7XG5cblx0XHRcdC8vIFRoZXJlICptdXN0KiBiZSBhIHR5cGUsIG5vIGF0dGFjaGluZyBuYW1lc3BhY2Utb25seSBoYW5kbGVyc1xuXHRcdFx0aWYgKCAhdHlwZSApIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGV2ZW50IGNoYW5nZXMgaXRzIHR5cGUsIHVzZSB0aGUgc3BlY2lhbCBldmVudCBoYW5kbGVycyBmb3IgdGhlIGNoYW5nZWQgdHlwZVxuXHRcdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cblx0XHRcdC8vIElmIHNlbGVjdG9yIGRlZmluZWQsIGRldGVybWluZSBzcGVjaWFsIGV2ZW50IGFwaSB0eXBlLCBvdGhlcndpc2UgZ2l2ZW4gdHlwZVxuXHRcdFx0dHlwZSA9ICggc2VsZWN0b3IgPyBzcGVjaWFsLmRlbGVnYXRlVHlwZSA6IHNwZWNpYWwuYmluZFR5cGUgKSB8fCB0eXBlO1xuXG5cdFx0XHQvLyBVcGRhdGUgc3BlY2lhbCBiYXNlZCBvbiBuZXdseSByZXNldCB0eXBlXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcblxuXHRcdFx0Ly8gaGFuZGxlT2JqIGlzIHBhc3NlZCB0byBhbGwgZXZlbnQgaGFuZGxlcnNcblx0XHRcdGhhbmRsZU9iaiA9IGpRdWVyeS5leHRlbmQoIHtcblx0XHRcdFx0dHlwZTogdHlwZSxcblx0XHRcdFx0b3JpZ1R5cGU6IG9yaWdUeXBlLFxuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHRoYW5kbGVyOiBoYW5kbGVyLFxuXHRcdFx0XHRndWlkOiBoYW5kbGVyLmd1aWQsXG5cdFx0XHRcdHNlbGVjdG9yOiBzZWxlY3Rvcixcblx0XHRcdFx0bmVlZHNDb250ZXh0OiBzZWxlY3RvciAmJiBqUXVlcnkuZXhwci5tYXRjaC5uZWVkc0NvbnRleHQudGVzdCggc2VsZWN0b3IgKSxcblx0XHRcdFx0bmFtZXNwYWNlOiBuYW1lc3BhY2VzLmpvaW4oIFwiLlwiIClcblx0XHRcdH0sIGhhbmRsZU9iakluICk7XG5cblx0XHRcdC8vIEluaXQgdGhlIGV2ZW50IGhhbmRsZXIgcXVldWUgaWYgd2UncmUgdGhlIGZpcnN0XG5cdFx0XHRpZiAoICEoIGhhbmRsZXJzID0gZXZlbnRzWyB0eXBlIF0gKSApIHtcblx0XHRcdFx0aGFuZGxlcnMgPSBldmVudHNbIHR5cGUgXSA9IFtdO1xuXHRcdFx0XHRoYW5kbGVycy5kZWxlZ2F0ZUNvdW50ID0gMDtcblxuXHRcdFx0XHQvLyBPbmx5IHVzZSBhZGRFdmVudExpc3RlbmVyIGlmIHRoZSBzcGVjaWFsIGV2ZW50cyBoYW5kbGVyIHJldHVybnMgZmFsc2Vcblx0XHRcdFx0aWYgKCAhc3BlY2lhbC5zZXR1cCB8fFxuXHRcdFx0XHRcdHNwZWNpYWwuc2V0dXAuY2FsbCggZWxlbSwgZGF0YSwgbmFtZXNwYWNlcywgZXZlbnRIYW5kbGUgKSA9PT0gZmFsc2UgKSB7XG5cblx0XHRcdFx0XHRpZiAoIGVsZW0uYWRkRXZlbnRMaXN0ZW5lciApIHtcblx0XHRcdFx0XHRcdGVsZW0uYWRkRXZlbnRMaXN0ZW5lciggdHlwZSwgZXZlbnRIYW5kbGUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBzcGVjaWFsLmFkZCApIHtcblx0XHRcdFx0c3BlY2lhbC5hZGQuY2FsbCggZWxlbSwgaGFuZGxlT2JqICk7XG5cblx0XHRcdFx0aWYgKCAhaGFuZGxlT2JqLmhhbmRsZXIuZ3VpZCApIHtcblx0XHRcdFx0XHRoYW5kbGVPYmouaGFuZGxlci5ndWlkID0gaGFuZGxlci5ndWlkO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCB0byB0aGUgZWxlbWVudCdzIGhhbmRsZXIgbGlzdCwgZGVsZWdhdGVzIGluIGZyb250XG5cdFx0XHRpZiAoIHNlbGVjdG9yICkge1xuXHRcdFx0XHRoYW5kbGVycy5zcGxpY2UoIGhhbmRsZXJzLmRlbGVnYXRlQ291bnQrKywgMCwgaGFuZGxlT2JqICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRoYW5kbGVycy5wdXNoKCBoYW5kbGVPYmogKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gS2VlcCB0cmFjayBvZiB3aGljaCBldmVudHMgaGF2ZSBldmVyIGJlZW4gdXNlZCwgZm9yIGV2ZW50IG9wdGltaXphdGlvblxuXHRcdFx0alF1ZXJ5LmV2ZW50Lmdsb2JhbFsgdHlwZSBdID0gdHJ1ZTtcblx0XHR9XG5cblx0fSxcblxuXHQvLyBEZXRhY2ggYW4gZXZlbnQgb3Igc2V0IG9mIGV2ZW50cyBmcm9tIGFuIGVsZW1lbnRcblx0cmVtb3ZlOiBmdW5jdGlvbiggZWxlbSwgdHlwZXMsIGhhbmRsZXIsIHNlbGVjdG9yLCBtYXBwZWRUeXBlcyApIHtcblxuXHRcdHZhciBqLCBvcmlnQ291bnQsIHRtcCxcblx0XHRcdGV2ZW50cywgdCwgaGFuZGxlT2JqLFxuXHRcdFx0c3BlY2lhbCwgaGFuZGxlcnMsIHR5cGUsIG5hbWVzcGFjZXMsIG9yaWdUeXBlLFxuXHRcdFx0ZWxlbURhdGEgPSBkYXRhUHJpdi5oYXNEYXRhKCBlbGVtICkgJiYgZGF0YVByaXYuZ2V0KCBlbGVtICk7XG5cblx0XHRpZiAoICFlbGVtRGF0YSB8fCAhKCBldmVudHMgPSBlbGVtRGF0YS5ldmVudHMgKSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBPbmNlIGZvciBlYWNoIHR5cGUubmFtZXNwYWNlIGluIHR5cGVzOyB0eXBlIG1heSBiZSBvbWl0dGVkXG5cdFx0dHlwZXMgPSAoIHR5cGVzIHx8IFwiXCIgKS5tYXRjaCggcm5vdHdoaXRlICkgfHwgWyBcIlwiIF07XG5cdFx0dCA9IHR5cGVzLmxlbmd0aDtcblx0XHR3aGlsZSAoIHQtLSApIHtcblx0XHRcdHRtcCA9IHJ0eXBlbmFtZXNwYWNlLmV4ZWMoIHR5cGVzWyB0IF0gKSB8fCBbXTtcblx0XHRcdHR5cGUgPSBvcmlnVHlwZSA9IHRtcFsgMSBdO1xuXHRcdFx0bmFtZXNwYWNlcyA9ICggdG1wWyAyIF0gfHwgXCJcIiApLnNwbGl0KCBcIi5cIiApLnNvcnQoKTtcblxuXHRcdFx0Ly8gVW5iaW5kIGFsbCBldmVudHMgKG9uIHRoaXMgbmFtZXNwYWNlLCBpZiBwcm92aWRlZCkgZm9yIHRoZSBlbGVtZW50XG5cdFx0XHRpZiAoICF0eXBlICkge1xuXHRcdFx0XHRmb3IgKCB0eXBlIGluIGV2ZW50cyApIHtcblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQucmVtb3ZlKCBlbGVtLCB0eXBlICsgdHlwZXNbIHQgXSwgaGFuZGxlciwgc2VsZWN0b3IsIHRydWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cdFx0XHR0eXBlID0gKCBzZWxlY3RvciA/IHNwZWNpYWwuZGVsZWdhdGVUeXBlIDogc3BlY2lhbC5iaW5kVHlwZSApIHx8IHR5cGU7XG5cdFx0XHRoYW5kbGVycyA9IGV2ZW50c1sgdHlwZSBdIHx8IFtdO1xuXHRcdFx0dG1wID0gdG1wWyAyIF0gJiZcblx0XHRcdFx0bmV3IFJlZ0V4cCggXCIoXnxcXFxcLilcIiArIG5hbWVzcGFjZXMuam9pbiggXCJcXFxcLig/Oi4qXFxcXC58KVwiICkgKyBcIihcXFxcLnwkKVwiICk7XG5cblx0XHRcdC8vIFJlbW92ZSBtYXRjaGluZyBldmVudHNcblx0XHRcdG9yaWdDb3VudCA9IGogPSBoYW5kbGVycy5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoIGotLSApIHtcblx0XHRcdFx0aGFuZGxlT2JqID0gaGFuZGxlcnNbIGogXTtcblxuXHRcdFx0XHRpZiAoICggbWFwcGVkVHlwZXMgfHwgb3JpZ1R5cGUgPT09IGhhbmRsZU9iai5vcmlnVHlwZSApICYmXG5cdFx0XHRcdFx0KCAhaGFuZGxlciB8fCBoYW5kbGVyLmd1aWQgPT09IGhhbmRsZU9iai5ndWlkICkgJiZcblx0XHRcdFx0XHQoICF0bXAgfHwgdG1wLnRlc3QoIGhhbmRsZU9iai5uYW1lc3BhY2UgKSApICYmXG5cdFx0XHRcdFx0KCAhc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGhhbmRsZU9iai5zZWxlY3RvciB8fFxuXHRcdFx0XHRcdFx0c2VsZWN0b3IgPT09IFwiKipcIiAmJiBoYW5kbGVPYmouc2VsZWN0b3IgKSApIHtcblx0XHRcdFx0XHRoYW5kbGVycy5zcGxpY2UoIGosIDEgKTtcblxuXHRcdFx0XHRcdGlmICggaGFuZGxlT2JqLnNlbGVjdG9yICkge1xuXHRcdFx0XHRcdFx0aGFuZGxlcnMuZGVsZWdhdGVDb3VudC0tO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIHNwZWNpYWwucmVtb3ZlICkge1xuXHRcdFx0XHRcdFx0c3BlY2lhbC5yZW1vdmUuY2FsbCggZWxlbSwgaGFuZGxlT2JqICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlbW92ZSBnZW5lcmljIGV2ZW50IGhhbmRsZXIgaWYgd2UgcmVtb3ZlZCBzb21ldGhpbmcgYW5kIG5vIG1vcmUgaGFuZGxlcnMgZXhpc3Rcblx0XHRcdC8vIChhdm9pZHMgcG90ZW50aWFsIGZvciBlbmRsZXNzIHJlY3Vyc2lvbiBkdXJpbmcgcmVtb3ZhbCBvZiBzcGVjaWFsIGV2ZW50IGhhbmRsZXJzKVxuXHRcdFx0aWYgKCBvcmlnQ291bnQgJiYgIWhhbmRsZXJzLmxlbmd0aCApIHtcblx0XHRcdFx0aWYgKCAhc3BlY2lhbC50ZWFyZG93biB8fFxuXHRcdFx0XHRcdHNwZWNpYWwudGVhcmRvd24uY2FsbCggZWxlbSwgbmFtZXNwYWNlcywgZWxlbURhdGEuaGFuZGxlICkgPT09IGZhbHNlICkge1xuXG5cdFx0XHRcdFx0alF1ZXJ5LnJlbW92ZUV2ZW50KCBlbGVtLCB0eXBlLCBlbGVtRGF0YS5oYW5kbGUgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRlbGV0ZSBldmVudHNbIHR5cGUgXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBSZW1vdmUgZGF0YSBhbmQgdGhlIGV4cGFuZG8gaWYgaXQncyBubyBsb25nZXIgdXNlZFxuXHRcdGlmICggalF1ZXJ5LmlzRW1wdHlPYmplY3QoIGV2ZW50cyApICkge1xuXHRcdFx0ZGF0YVByaXYucmVtb3ZlKCBlbGVtLCBcImhhbmRsZSBldmVudHNcIiApO1xuXHRcdH1cblx0fSxcblxuXHRkaXNwYXRjaDogZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdFx0Ly8gTWFrZSBhIHdyaXRhYmxlIGpRdWVyeS5FdmVudCBmcm9tIHRoZSBuYXRpdmUgZXZlbnQgb2JqZWN0XG5cdFx0ZXZlbnQgPSBqUXVlcnkuZXZlbnQuZml4KCBldmVudCApO1xuXG5cdFx0dmFyIGksIGosIHJldCwgbWF0Y2hlZCwgaGFuZGxlT2JqLFxuXHRcdFx0aGFuZGxlclF1ZXVlID0gW10sXG5cdFx0XHRhcmdzID0gc2xpY2UuY2FsbCggYXJndW1lbnRzICksXG5cdFx0XHRoYW5kbGVycyA9ICggZGF0YVByaXYuZ2V0KCB0aGlzLCBcImV2ZW50c1wiICkgfHwge30gKVsgZXZlbnQudHlwZSBdIHx8IFtdLFxuXHRcdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyBldmVudC50eXBlIF0gfHwge307XG5cblx0XHQvLyBVc2UgdGhlIGZpeC1lZCBqUXVlcnkuRXZlbnQgcmF0aGVyIHRoYW4gdGhlIChyZWFkLW9ubHkpIG5hdGl2ZSBldmVudFxuXHRcdGFyZ3NbIDAgXSA9IGV2ZW50O1xuXHRcdGV2ZW50LmRlbGVnYXRlVGFyZ2V0ID0gdGhpcztcblxuXHRcdC8vIENhbGwgdGhlIHByZURpc3BhdGNoIGhvb2sgZm9yIHRoZSBtYXBwZWQgdHlwZSwgYW5kIGxldCBpdCBiYWlsIGlmIGRlc2lyZWRcblx0XHRpZiAoIHNwZWNpYWwucHJlRGlzcGF0Y2ggJiYgc3BlY2lhbC5wcmVEaXNwYXRjaC5jYWxsKCB0aGlzLCBldmVudCApID09PSBmYWxzZSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBEZXRlcm1pbmUgaGFuZGxlcnNcblx0XHRoYW5kbGVyUXVldWUgPSBqUXVlcnkuZXZlbnQuaGFuZGxlcnMuY2FsbCggdGhpcywgZXZlbnQsIGhhbmRsZXJzICk7XG5cblx0XHQvLyBSdW4gZGVsZWdhdGVzIGZpcnN0OyB0aGV5IG1heSB3YW50IHRvIHN0b3AgcHJvcGFnYXRpb24gYmVuZWF0aCB1c1xuXHRcdGkgPSAwO1xuXHRcdHdoaWxlICggKCBtYXRjaGVkID0gaGFuZGxlclF1ZXVlWyBpKysgXSApICYmICFldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXHRcdFx0ZXZlbnQuY3VycmVudFRhcmdldCA9IG1hdGNoZWQuZWxlbTtcblxuXHRcdFx0aiA9IDA7XG5cdFx0XHR3aGlsZSAoICggaGFuZGxlT2JqID0gbWF0Y2hlZC5oYW5kbGVyc1sgaisrIF0gKSAmJlxuXHRcdFx0XHQhZXZlbnQuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKSApIHtcblxuXHRcdFx0XHQvLyBUcmlnZ2VyZWQgZXZlbnQgbXVzdCBlaXRoZXIgMSkgaGF2ZSBubyBuYW1lc3BhY2UsIG9yIDIpIGhhdmUgbmFtZXNwYWNlKHMpXG5cdFx0XHRcdC8vIGEgc3Vic2V0IG9yIGVxdWFsIHRvIHRob3NlIGluIHRoZSBib3VuZCBldmVudCAoYm90aCBjYW4gaGF2ZSBubyBuYW1lc3BhY2UpLlxuXHRcdFx0XHRpZiAoICFldmVudC5ybmFtZXNwYWNlIHx8IGV2ZW50LnJuYW1lc3BhY2UudGVzdCggaGFuZGxlT2JqLm5hbWVzcGFjZSApICkge1xuXG5cdFx0XHRcdFx0ZXZlbnQuaGFuZGxlT2JqID0gaGFuZGxlT2JqO1xuXHRcdFx0XHRcdGV2ZW50LmRhdGEgPSBoYW5kbGVPYmouZGF0YTtcblxuXHRcdFx0XHRcdHJldCA9ICggKCBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgaGFuZGxlT2JqLm9yaWdUeXBlIF0gfHwge30gKS5oYW5kbGUgfHxcblx0XHRcdFx0XHRcdGhhbmRsZU9iai5oYW5kbGVyICkuYXBwbHkoIG1hdGNoZWQuZWxlbSwgYXJncyApO1xuXG5cdFx0XHRcdFx0aWYgKCByZXQgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRcdGlmICggKCBldmVudC5yZXN1bHQgPSByZXQgKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIENhbGwgdGhlIHBvc3REaXNwYXRjaCBob29rIGZvciB0aGUgbWFwcGVkIHR5cGVcblx0XHRpZiAoIHNwZWNpYWwucG9zdERpc3BhdGNoICkge1xuXHRcdFx0c3BlY2lhbC5wb3N0RGlzcGF0Y2guY2FsbCggdGhpcywgZXZlbnQgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZXZlbnQucmVzdWx0O1xuXHR9LFxuXG5cdGhhbmRsZXJzOiBmdW5jdGlvbiggZXZlbnQsIGhhbmRsZXJzICkge1xuXHRcdHZhciBpLCBtYXRjaGVzLCBzZWwsIGhhbmRsZU9iaixcblx0XHRcdGhhbmRsZXJRdWV1ZSA9IFtdLFxuXHRcdFx0ZGVsZWdhdGVDb3VudCA9IGhhbmRsZXJzLmRlbGVnYXRlQ291bnQsXG5cdFx0XHRjdXIgPSBldmVudC50YXJnZXQ7XG5cblx0XHQvLyBTdXBwb3J0IChhdCBsZWFzdCk6IENocm9tZSwgSUU5XG5cdFx0Ly8gRmluZCBkZWxlZ2F0ZSBoYW5kbGVyc1xuXHRcdC8vIEJsYWNrLWhvbGUgU1ZHIDx1c2U+IGluc3RhbmNlIHRyZWVzICgjMTMxODApXG5cdFx0Ly9cblx0XHQvLyBTdXBwb3J0OiBGaXJlZm94PD00Mitcblx0XHQvLyBBdm9pZCBub24tbGVmdC1jbGljayBpbiBGRiBidXQgZG9uJ3QgYmxvY2sgSUUgcmFkaW8gZXZlbnRzICgjMzg2MSwgZ2gtMjM0Mylcblx0XHRpZiAoIGRlbGVnYXRlQ291bnQgJiYgY3VyLm5vZGVUeXBlICYmXG5cdFx0XHQoIGV2ZW50LnR5cGUgIT09IFwiY2xpY2tcIiB8fCBpc05hTiggZXZlbnQuYnV0dG9uICkgfHwgZXZlbnQuYnV0dG9uIDwgMSApICkge1xuXG5cdFx0XHRmb3IgKCA7IGN1ciAhPT0gdGhpczsgY3VyID0gY3VyLnBhcmVudE5vZGUgfHwgdGhpcyApIHtcblxuXHRcdFx0XHQvLyBEb24ndCBjaGVjayBub24tZWxlbWVudHMgKCMxMzIwOClcblx0XHRcdFx0Ly8gRG9uJ3QgcHJvY2VzcyBjbGlja3Mgb24gZGlzYWJsZWQgZWxlbWVudHMgKCM2OTExLCAjODE2NSwgIzExMzgyLCAjMTE3NjQpXG5cdFx0XHRcdGlmICggY3VyLm5vZGVUeXBlID09PSAxICYmICggY3VyLmRpc2FibGVkICE9PSB0cnVlIHx8IGV2ZW50LnR5cGUgIT09IFwiY2xpY2tcIiApICkge1xuXHRcdFx0XHRcdG1hdGNoZXMgPSBbXTtcblx0XHRcdFx0XHRmb3IgKCBpID0gMDsgaSA8IGRlbGVnYXRlQ291bnQ7IGkrKyApIHtcblx0XHRcdFx0XHRcdGhhbmRsZU9iaiA9IGhhbmRsZXJzWyBpIF07XG5cblx0XHRcdFx0XHRcdC8vIERvbid0IGNvbmZsaWN0IHdpdGggT2JqZWN0LnByb3RvdHlwZSBwcm9wZXJ0aWVzICgjMTMyMDMpXG5cdFx0XHRcdFx0XHRzZWwgPSBoYW5kbGVPYmouc2VsZWN0b3IgKyBcIiBcIjtcblxuXHRcdFx0XHRcdFx0aWYgKCBtYXRjaGVzWyBzZWwgXSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdFx0XHRtYXRjaGVzWyBzZWwgXSA9IGhhbmRsZU9iai5uZWVkc0NvbnRleHQgP1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeSggc2VsLCB0aGlzICkuaW5kZXgoIGN1ciApID4gLTEgOlxuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5maW5kKCBzZWwsIHRoaXMsIG51bGwsIFsgY3VyIF0gKS5sZW5ndGg7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoIG1hdGNoZXNbIHNlbCBdICkge1xuXHRcdFx0XHRcdFx0XHRtYXRjaGVzLnB1c2goIGhhbmRsZU9iaiApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIG1hdGNoZXMubGVuZ3RoICkge1xuXHRcdFx0XHRcdFx0aGFuZGxlclF1ZXVlLnB1c2goIHsgZWxlbTogY3VyLCBoYW5kbGVyczogbWF0Y2hlcyB9ICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQWRkIHRoZSByZW1haW5pbmcgKGRpcmVjdGx5LWJvdW5kKSBoYW5kbGVyc1xuXHRcdGlmICggZGVsZWdhdGVDb3VudCA8IGhhbmRsZXJzLmxlbmd0aCApIHtcblx0XHRcdGhhbmRsZXJRdWV1ZS5wdXNoKCB7IGVsZW06IHRoaXMsIGhhbmRsZXJzOiBoYW5kbGVycy5zbGljZSggZGVsZWdhdGVDb3VudCApIH0gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gaGFuZGxlclF1ZXVlO1xuXHR9LFxuXG5cdC8vIEluY2x1ZGVzIHNvbWUgZXZlbnQgcHJvcHMgc2hhcmVkIGJ5IEtleUV2ZW50IGFuZCBNb3VzZUV2ZW50XG5cdHByb3BzOiAoIFwiYWx0S2V5IGJ1YmJsZXMgY2FuY2VsYWJsZSBjdHJsS2V5IGN1cnJlbnRUYXJnZXQgZGV0YWlsIGV2ZW50UGhhc2UgXCIgK1xuXHRcdFwibWV0YUtleSByZWxhdGVkVGFyZ2V0IHNoaWZ0S2V5IHRhcmdldCB0aW1lU3RhbXAgdmlldyB3aGljaFwiICkuc3BsaXQoIFwiIFwiICksXG5cblx0Zml4SG9va3M6IHt9LFxuXG5cdGtleUhvb2tzOiB7XG5cdFx0cHJvcHM6IFwiY2hhciBjaGFyQ29kZSBrZXkga2V5Q29kZVwiLnNwbGl0KCBcIiBcIiApLFxuXHRcdGZpbHRlcjogZnVuY3Rpb24oIGV2ZW50LCBvcmlnaW5hbCApIHtcblxuXHRcdFx0Ly8gQWRkIHdoaWNoIGZvciBrZXkgZXZlbnRzXG5cdFx0XHRpZiAoIGV2ZW50LndoaWNoID09IG51bGwgKSB7XG5cdFx0XHRcdGV2ZW50LndoaWNoID0gb3JpZ2luYWwuY2hhckNvZGUgIT0gbnVsbCA/IG9yaWdpbmFsLmNoYXJDb2RlIDogb3JpZ2luYWwua2V5Q29kZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGV2ZW50O1xuXHRcdH1cblx0fSxcblxuXHRtb3VzZUhvb2tzOiB7XG5cdFx0cHJvcHM6ICggXCJidXR0b24gYnV0dG9ucyBjbGllbnRYIGNsaWVudFkgb2Zmc2V0WCBvZmZzZXRZIHBhZ2VYIHBhZ2VZIFwiICtcblx0XHRcdFwic2NyZWVuWCBzY3JlZW5ZIHRvRWxlbWVudFwiICkuc3BsaXQoIFwiIFwiICksXG5cdFx0ZmlsdGVyOiBmdW5jdGlvbiggZXZlbnQsIG9yaWdpbmFsICkge1xuXHRcdFx0dmFyIGV2ZW50RG9jLCBkb2MsIGJvZHksXG5cdFx0XHRcdGJ1dHRvbiA9IG9yaWdpbmFsLmJ1dHRvbjtcblxuXHRcdFx0Ly8gQ2FsY3VsYXRlIHBhZ2VYL1kgaWYgbWlzc2luZyBhbmQgY2xpZW50WC9ZIGF2YWlsYWJsZVxuXHRcdFx0aWYgKCBldmVudC5wYWdlWCA9PSBudWxsICYmIG9yaWdpbmFsLmNsaWVudFggIT0gbnVsbCApIHtcblx0XHRcdFx0ZXZlbnREb2MgPSBldmVudC50YXJnZXQub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudDtcblx0XHRcdFx0ZG9jID0gZXZlbnREb2MuZG9jdW1lbnRFbGVtZW50O1xuXHRcdFx0XHRib2R5ID0gZXZlbnREb2MuYm9keTtcblxuXHRcdFx0XHRldmVudC5wYWdlWCA9IG9yaWdpbmFsLmNsaWVudFggK1xuXHRcdFx0XHRcdCggZG9jICYmIGRvYy5zY3JvbGxMZWZ0IHx8IGJvZHkgJiYgYm9keS5zY3JvbGxMZWZ0IHx8IDAgKSAtXG5cdFx0XHRcdFx0KCBkb2MgJiYgZG9jLmNsaWVudExlZnQgfHwgYm9keSAmJiBib2R5LmNsaWVudExlZnQgfHwgMCApO1xuXHRcdFx0XHRldmVudC5wYWdlWSA9IG9yaWdpbmFsLmNsaWVudFkgK1xuXHRcdFx0XHRcdCggZG9jICYmIGRvYy5zY3JvbGxUb3AgIHx8IGJvZHkgJiYgYm9keS5zY3JvbGxUb3AgIHx8IDAgKSAtXG5cdFx0XHRcdFx0KCBkb2MgJiYgZG9jLmNsaWVudFRvcCAgfHwgYm9keSAmJiBib2R5LmNsaWVudFRvcCAgfHwgMCApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgd2hpY2ggZm9yIGNsaWNrOiAxID09PSBsZWZ0OyAyID09PSBtaWRkbGU7IDMgPT09IHJpZ2h0XG5cdFx0XHQvLyBOb3RlOiBidXR0b24gaXMgbm90IG5vcm1hbGl6ZWQsIHNvIGRvbid0IHVzZSBpdFxuXHRcdFx0aWYgKCAhZXZlbnQud2hpY2ggJiYgYnV0dG9uICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdGV2ZW50LndoaWNoID0gKCBidXR0b24gJiAxID8gMSA6ICggYnV0dG9uICYgMiA/IDMgOiAoIGJ1dHRvbiAmIDQgPyAyIDogMCApICkgKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGV2ZW50O1xuXHRcdH1cblx0fSxcblxuXHRmaXg6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRpZiAoIGV2ZW50WyBqUXVlcnkuZXhwYW5kbyBdICkge1xuXHRcdFx0cmV0dXJuIGV2ZW50O1xuXHRcdH1cblxuXHRcdC8vIENyZWF0ZSBhIHdyaXRhYmxlIGNvcHkgb2YgdGhlIGV2ZW50IG9iamVjdCBhbmQgbm9ybWFsaXplIHNvbWUgcHJvcGVydGllc1xuXHRcdHZhciBpLCBwcm9wLCBjb3B5LFxuXHRcdFx0dHlwZSA9IGV2ZW50LnR5cGUsXG5cdFx0XHRvcmlnaW5hbEV2ZW50ID0gZXZlbnQsXG5cdFx0XHRmaXhIb29rID0gdGhpcy5maXhIb29rc1sgdHlwZSBdO1xuXG5cdFx0aWYgKCAhZml4SG9vayApIHtcblx0XHRcdHRoaXMuZml4SG9va3NbIHR5cGUgXSA9IGZpeEhvb2sgPVxuXHRcdFx0XHRybW91c2VFdmVudC50ZXN0KCB0eXBlICkgPyB0aGlzLm1vdXNlSG9va3MgOlxuXHRcdFx0XHRya2V5RXZlbnQudGVzdCggdHlwZSApID8gdGhpcy5rZXlIb29rcyA6XG5cdFx0XHRcdHt9O1xuXHRcdH1cblx0XHRjb3B5ID0gZml4SG9vay5wcm9wcyA/IHRoaXMucHJvcHMuY29uY2F0KCBmaXhIb29rLnByb3BzICkgOiB0aGlzLnByb3BzO1xuXG5cdFx0ZXZlbnQgPSBuZXcgalF1ZXJ5LkV2ZW50KCBvcmlnaW5hbEV2ZW50ICk7XG5cblx0XHRpID0gY29weS5sZW5ndGg7XG5cdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRwcm9wID0gY29weVsgaSBdO1xuXHRcdFx0ZXZlbnRbIHByb3AgXSA9IG9yaWdpbmFsRXZlbnRbIHByb3AgXTtcblx0XHR9XG5cblx0XHQvLyBTdXBwb3J0OiBDb3Jkb3ZhIDIuNSAoV2ViS2l0KSAoIzEzMjU1KVxuXHRcdC8vIEFsbCBldmVudHMgc2hvdWxkIGhhdmUgYSB0YXJnZXQ7IENvcmRvdmEgZGV2aWNlcmVhZHkgZG9lc24ndFxuXHRcdGlmICggIWV2ZW50LnRhcmdldCApIHtcblx0XHRcdGV2ZW50LnRhcmdldCA9IGRvY3VtZW50O1xuXHRcdH1cblxuXHRcdC8vIFN1cHBvcnQ6IFNhZmFyaSA2LjArLCBDaHJvbWU8Mjhcblx0XHQvLyBUYXJnZXQgc2hvdWxkIG5vdCBiZSBhIHRleHQgbm9kZSAoIzUwNCwgIzEzMTQzKVxuXHRcdGlmICggZXZlbnQudGFyZ2V0Lm5vZGVUeXBlID09PSAzICkge1xuXHRcdFx0ZXZlbnQudGFyZ2V0ID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZpeEhvb2suZmlsdGVyID8gZml4SG9vay5maWx0ZXIoIGV2ZW50LCBvcmlnaW5hbEV2ZW50ICkgOiBldmVudDtcblx0fSxcblxuXHRzcGVjaWFsOiB7XG5cdFx0bG9hZDoge1xuXG5cdFx0XHQvLyBQcmV2ZW50IHRyaWdnZXJlZCBpbWFnZS5sb2FkIGV2ZW50cyBmcm9tIGJ1YmJsaW5nIHRvIHdpbmRvdy5sb2FkXG5cdFx0XHRub0J1YmJsZTogdHJ1ZVxuXHRcdH0sXG5cdFx0Zm9jdXM6IHtcblxuXHRcdFx0Ly8gRmlyZSBuYXRpdmUgZXZlbnQgaWYgcG9zc2libGUgc28gYmx1ci9mb2N1cyBzZXF1ZW5jZSBpcyBjb3JyZWN0XG5cdFx0XHR0cmlnZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCB0aGlzICE9PSBzYWZlQWN0aXZlRWxlbWVudCgpICYmIHRoaXMuZm9jdXMgKSB7XG5cdFx0XHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGRlbGVnYXRlVHlwZTogXCJmb2N1c2luXCJcblx0XHR9LFxuXHRcdGJsdXI6IHtcblx0XHRcdHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIHRoaXMgPT09IHNhZmVBY3RpdmVFbGVtZW50KCkgJiYgdGhpcy5ibHVyICkge1xuXHRcdFx0XHRcdHRoaXMuYmx1cigpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGRlbGVnYXRlVHlwZTogXCJmb2N1c291dFwiXG5cdFx0fSxcblx0XHRjbGljazoge1xuXG5cdFx0XHQvLyBGb3IgY2hlY2tib3gsIGZpcmUgbmF0aXZlIGV2ZW50IHNvIGNoZWNrZWQgc3RhdGUgd2lsbCBiZSByaWdodFxuXHRcdFx0dHJpZ2dlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggdGhpcy50eXBlID09PSBcImNoZWNrYm94XCIgJiYgdGhpcy5jbGljayAmJiBqUXVlcnkubm9kZU5hbWUoIHRoaXMsIFwiaW5wdXRcIiApICkge1xuXHRcdFx0XHRcdHRoaXMuY2xpY2soKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8vIEZvciBjcm9zcy1icm93c2VyIGNvbnNpc3RlbmN5LCBkb24ndCBmaXJlIG5hdGl2ZSAuY2xpY2soKSBvbiBsaW5rc1xuXHRcdFx0X2RlZmF1bHQ6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0cmV0dXJuIGpRdWVyeS5ub2RlTmFtZSggZXZlbnQudGFyZ2V0LCBcImFcIiApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRiZWZvcmV1bmxvYWQ6IHtcblx0XHRcdHBvc3REaXNwYXRjaDogZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3ggMjArXG5cdFx0XHRcdC8vIEZpcmVmb3ggZG9lc24ndCBhbGVydCBpZiB0aGUgcmV0dXJuVmFsdWUgZmllbGQgaXMgbm90IHNldC5cblx0XHRcdFx0aWYgKCBldmVudC5yZXN1bHQgIT09IHVuZGVmaW5lZCAmJiBldmVudC5vcmlnaW5hbEV2ZW50ICkge1xuXHRcdFx0XHRcdGV2ZW50Lm9yaWdpbmFsRXZlbnQucmV0dXJuVmFsdWUgPSBldmVudC5yZXN1bHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn07XG5cbmpRdWVyeS5yZW1vdmVFdmVudCA9IGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCBoYW5kbGUgKSB7XG5cblx0Ly8gVGhpcyBcImlmXCIgaXMgbmVlZGVkIGZvciBwbGFpbiBvYmplY3RzXG5cdGlmICggZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyICkge1xuXHRcdGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggdHlwZSwgaGFuZGxlICk7XG5cdH1cbn07XG5cbmpRdWVyeS5FdmVudCA9IGZ1bmN0aW9uKCBzcmMsIHByb3BzICkge1xuXG5cdC8vIEFsbG93IGluc3RhbnRpYXRpb24gd2l0aG91dCB0aGUgJ25ldycga2V5d29yZFxuXHRpZiAoICEoIHRoaXMgaW5zdGFuY2VvZiBqUXVlcnkuRXZlbnQgKSApIHtcblx0XHRyZXR1cm4gbmV3IGpRdWVyeS5FdmVudCggc3JjLCBwcm9wcyApO1xuXHR9XG5cblx0Ly8gRXZlbnQgb2JqZWN0XG5cdGlmICggc3JjICYmIHNyYy50eXBlICkge1xuXHRcdHRoaXMub3JpZ2luYWxFdmVudCA9IHNyYztcblx0XHR0aGlzLnR5cGUgPSBzcmMudHlwZTtcblxuXHRcdC8vIEV2ZW50cyBidWJibGluZyB1cCB0aGUgZG9jdW1lbnQgbWF5IGhhdmUgYmVlbiBtYXJrZWQgYXMgcHJldmVudGVkXG5cdFx0Ly8gYnkgYSBoYW5kbGVyIGxvd2VyIGRvd24gdGhlIHRyZWU7IHJlZmxlY3QgdGhlIGNvcnJlY3QgdmFsdWUuXG5cdFx0dGhpcy5pc0RlZmF1bHRQcmV2ZW50ZWQgPSBzcmMuZGVmYXVsdFByZXZlbnRlZCB8fFxuXHRcdFx0XHRzcmMuZGVmYXVsdFByZXZlbnRlZCA9PT0gdW5kZWZpbmVkICYmXG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZDw0LjBcblx0XHRcdFx0c3JjLnJldHVyblZhbHVlID09PSBmYWxzZSA/XG5cdFx0XHRyZXR1cm5UcnVlIDpcblx0XHRcdHJldHVybkZhbHNlO1xuXG5cdC8vIEV2ZW50IHR5cGVcblx0fSBlbHNlIHtcblx0XHR0aGlzLnR5cGUgPSBzcmM7XG5cdH1cblxuXHQvLyBQdXQgZXhwbGljaXRseSBwcm92aWRlZCBwcm9wZXJ0aWVzIG9udG8gdGhlIGV2ZW50IG9iamVjdFxuXHRpZiAoIHByb3BzICkge1xuXHRcdGpRdWVyeS5leHRlbmQoIHRoaXMsIHByb3BzICk7XG5cdH1cblxuXHQvLyBDcmVhdGUgYSB0aW1lc3RhbXAgaWYgaW5jb21pbmcgZXZlbnQgZG9lc24ndCBoYXZlIG9uZVxuXHR0aGlzLnRpbWVTdGFtcCA9IHNyYyAmJiBzcmMudGltZVN0YW1wIHx8IGpRdWVyeS5ub3coKTtcblxuXHQvLyBNYXJrIGl0IGFzIGZpeGVkXG5cdHRoaXNbIGpRdWVyeS5leHBhbmRvIF0gPSB0cnVlO1xufTtcblxuLy8galF1ZXJ5LkV2ZW50IGlzIGJhc2VkIG9uIERPTTMgRXZlbnRzIGFzIHNwZWNpZmllZCBieSB0aGUgRUNNQVNjcmlwdCBMYW5ndWFnZSBCaW5kaW5nXG4vLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAzL1dELURPTS1MZXZlbC0zLUV2ZW50cy0yMDAzMDMzMS9lY21hLXNjcmlwdC1iaW5kaW5nLmh0bWxcbmpRdWVyeS5FdmVudC5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBqUXVlcnkuRXZlbnQsXG5cdGlzRGVmYXVsdFByZXZlbnRlZDogcmV0dXJuRmFsc2UsXG5cdGlzUHJvcGFnYXRpb25TdG9wcGVkOiByZXR1cm5GYWxzZSxcblx0aXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQ6IHJldHVybkZhbHNlLFxuXG5cdHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudDtcblxuXHRcdHRoaXMuaXNEZWZhdWx0UHJldmVudGVkID0gcmV0dXJuVHJ1ZTtcblxuXHRcdGlmICggZSApIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdH0sXG5cdHN0b3BQcm9wYWdhdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGUgPSB0aGlzLm9yaWdpbmFsRXZlbnQ7XG5cblx0XHR0aGlzLmlzUHJvcGFnYXRpb25TdG9wcGVkID0gcmV0dXJuVHJ1ZTtcblxuXHRcdGlmICggZSApIHtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fVxuXHR9LFxuXHRzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBlID0gdGhpcy5vcmlnaW5hbEV2ZW50O1xuXG5cdFx0dGhpcy5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IHJldHVyblRydWU7XG5cblx0XHRpZiAoIGUgKSB7XG5cdFx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdH1cblxuXHRcdHRoaXMuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdH1cbn07XG5cbi8vIENyZWF0ZSBtb3VzZWVudGVyL2xlYXZlIGV2ZW50cyB1c2luZyBtb3VzZW92ZXIvb3V0IGFuZCBldmVudC10aW1lIGNoZWNrc1xuLy8gc28gdGhhdCBldmVudCBkZWxlZ2F0aW9uIHdvcmtzIGluIGpRdWVyeS5cbi8vIERvIHRoZSBzYW1lIGZvciBwb2ludGVyZW50ZXIvcG9pbnRlcmxlYXZlIGFuZCBwb2ludGVyb3Zlci9wb2ludGVyb3V0XG4vL1xuLy8gU3VwcG9ydDogU2FmYXJpIDcgb25seVxuLy8gU2FmYXJpIHNlbmRzIG1vdXNlZW50ZXIgdG9vIG9mdGVuOyBzZWU6XG4vLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDcwMjU4XG4vLyBmb3IgdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBidWcgKGl0IGV4aXN0ZWQgaW4gb2xkZXIgQ2hyb21lIHZlcnNpb25zIGFzIHdlbGwpLlxualF1ZXJ5LmVhY2goIHtcblx0bW91c2VlbnRlcjogXCJtb3VzZW92ZXJcIixcblx0bW91c2VsZWF2ZTogXCJtb3VzZW91dFwiLFxuXHRwb2ludGVyZW50ZXI6IFwicG9pbnRlcm92ZXJcIixcblx0cG9pbnRlcmxlYXZlOiBcInBvaW50ZXJvdXRcIlxufSwgZnVuY3Rpb24oIG9yaWcsIGZpeCApIHtcblx0alF1ZXJ5LmV2ZW50LnNwZWNpYWxbIG9yaWcgXSA9IHtcblx0XHRkZWxlZ2F0ZVR5cGU6IGZpeCxcblx0XHRiaW5kVHlwZTogZml4LFxuXG5cdFx0aGFuZGxlOiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHR2YXIgcmV0LFxuXHRcdFx0XHR0YXJnZXQgPSB0aGlzLFxuXHRcdFx0XHRyZWxhdGVkID0gZXZlbnQucmVsYXRlZFRhcmdldCxcblx0XHRcdFx0aGFuZGxlT2JqID0gZXZlbnQuaGFuZGxlT2JqO1xuXG5cdFx0XHQvLyBGb3IgbW91c2VlbnRlci9sZWF2ZSBjYWxsIHRoZSBoYW5kbGVyIGlmIHJlbGF0ZWQgaXMgb3V0c2lkZSB0aGUgdGFyZ2V0LlxuXHRcdFx0Ly8gTkI6IE5vIHJlbGF0ZWRUYXJnZXQgaWYgdGhlIG1vdXNlIGxlZnQvZW50ZXJlZCB0aGUgYnJvd3NlciB3aW5kb3dcblx0XHRcdGlmICggIXJlbGF0ZWQgfHwgKCByZWxhdGVkICE9PSB0YXJnZXQgJiYgIWpRdWVyeS5jb250YWlucyggdGFyZ2V0LCByZWxhdGVkICkgKSApIHtcblx0XHRcdFx0ZXZlbnQudHlwZSA9IGhhbmRsZU9iai5vcmlnVHlwZTtcblx0XHRcdFx0cmV0ID0gaGFuZGxlT2JqLmhhbmRsZXIuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRldmVudC50eXBlID0gZml4O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJldDtcblx0XHR9XG5cdH07XG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0b246IGZ1bmN0aW9uKCB0eXBlcywgc2VsZWN0b3IsIGRhdGEsIGZuICkge1xuXHRcdHJldHVybiBvbiggdGhpcywgdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApO1xuXHR9LFxuXHRvbmU6IGZ1bmN0aW9uKCB0eXBlcywgc2VsZWN0b3IsIGRhdGEsIGZuICkge1xuXHRcdHJldHVybiBvbiggdGhpcywgdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiwgMSApO1xuXHR9LFxuXHRvZmY6IGZ1bmN0aW9uKCB0eXBlcywgc2VsZWN0b3IsIGZuICkge1xuXHRcdHZhciBoYW5kbGVPYmosIHR5cGU7XG5cdFx0aWYgKCB0eXBlcyAmJiB0eXBlcy5wcmV2ZW50RGVmYXVsdCAmJiB0eXBlcy5oYW5kbGVPYmogKSB7XG5cblx0XHRcdC8vICggZXZlbnQgKSAgZGlzcGF0Y2hlZCBqUXVlcnkuRXZlbnRcblx0XHRcdGhhbmRsZU9iaiA9IHR5cGVzLmhhbmRsZU9iajtcblx0XHRcdGpRdWVyeSggdHlwZXMuZGVsZWdhdGVUYXJnZXQgKS5vZmYoXG5cdFx0XHRcdGhhbmRsZU9iai5uYW1lc3BhY2UgP1xuXHRcdFx0XHRcdGhhbmRsZU9iai5vcmlnVHlwZSArIFwiLlwiICsgaGFuZGxlT2JqLm5hbWVzcGFjZSA6XG5cdFx0XHRcdFx0aGFuZGxlT2JqLm9yaWdUeXBlLFxuXHRcdFx0XHRoYW5kbGVPYmouc2VsZWN0b3IsXG5cdFx0XHRcdGhhbmRsZU9iai5oYW5kbGVyXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHRcdGlmICggdHlwZW9mIHR5cGVzID09PSBcIm9iamVjdFwiICkge1xuXG5cdFx0XHQvLyAoIHR5cGVzLW9iamVjdCBbLCBzZWxlY3Rvcl0gKVxuXHRcdFx0Zm9yICggdHlwZSBpbiB0eXBlcyApIHtcblx0XHRcdFx0dGhpcy5vZmYoIHR5cGUsIHNlbGVjdG9yLCB0eXBlc1sgdHlwZSBdICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cdFx0aWYgKCBzZWxlY3RvciA9PT0gZmFsc2UgfHwgdHlwZW9mIHNlbGVjdG9yID09PSBcImZ1bmN0aW9uXCIgKSB7XG5cblx0XHRcdC8vICggdHlwZXMgWywgZm5dIClcblx0XHRcdGZuID0gc2VsZWN0b3I7XG5cdFx0XHRzZWxlY3RvciA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0aWYgKCBmbiA9PT0gZmFsc2UgKSB7XG5cdFx0XHRmbiA9IHJldHVybkZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeS5ldmVudC5yZW1vdmUoIHRoaXMsIHR5cGVzLCBmbiwgc2VsZWN0b3IgKTtcblx0XHR9ICk7XG5cdH1cbn0gKTtcblxuXG52YXJcblx0cnhodG1sVGFnID0gLzwoPyFhcmVhfGJyfGNvbHxlbWJlZHxocnxpbWd8aW5wdXR8bGlua3xtZXRhfHBhcmFtKSgoW1xcdzotXSspW14+XSopXFwvPi9naSxcblxuXHQvLyBTdXBwb3J0OiBJRSAxMC0xMSwgRWRnZSAxMDI0MCtcblx0Ly8gSW4gSUUvRWRnZSB1c2luZyByZWdleCBncm91cHMgaGVyZSBjYXVzZXMgc2V2ZXJlIHNsb3dkb3ducy5cblx0Ly8gU2VlIGh0dHBzOi8vY29ubmVjdC5taWNyb3NvZnQuY29tL0lFL2ZlZWRiYWNrL2RldGFpbHMvMTczNjUxMi9cblx0cm5vSW5uZXJodG1sID0gLzxzY3JpcHR8PHN0eWxlfDxsaW5rL2ksXG5cblx0Ly8gY2hlY2tlZD1cImNoZWNrZWRcIiBvciBjaGVja2VkXG5cdHJjaGVja2VkID0gL2NoZWNrZWRcXHMqKD86W149XXw9XFxzKi5jaGVja2VkLikvaSxcblx0cnNjcmlwdFR5cGVNYXNrZWQgPSAvXnRydWVcXC8oLiopLyxcblx0cmNsZWFuU2NyaXB0ID0gL15cXHMqPCEoPzpcXFtDREFUQVxcW3wtLSl8KD86XFxdXFxdfC0tKT5cXHMqJC9nO1xuXG4vLyBNYW5pcHVsYXRpbmcgdGFibGVzIHJlcXVpcmVzIGEgdGJvZHlcbmZ1bmN0aW9uIG1hbmlwdWxhdGlvblRhcmdldCggZWxlbSwgY29udGVudCApIHtcblx0cmV0dXJuIGpRdWVyeS5ub2RlTmFtZSggZWxlbSwgXCJ0YWJsZVwiICkgJiZcblx0XHRqUXVlcnkubm9kZU5hbWUoIGNvbnRlbnQubm9kZVR5cGUgIT09IDExID8gY29udGVudCA6IGNvbnRlbnQuZmlyc3RDaGlsZCwgXCJ0clwiICkgP1xuXG5cdFx0ZWxlbS5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJ0Ym9keVwiIClbIDAgXSB8fFxuXHRcdFx0ZWxlbS5hcHBlbmRDaGlsZCggZWxlbS5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwidGJvZHlcIiApICkgOlxuXHRcdGVsZW07XG59XG5cbi8vIFJlcGxhY2UvcmVzdG9yZSB0aGUgdHlwZSBhdHRyaWJ1dGUgb2Ygc2NyaXB0IGVsZW1lbnRzIGZvciBzYWZlIERPTSBtYW5pcHVsYXRpb25cbmZ1bmN0aW9uIGRpc2FibGVTY3JpcHQoIGVsZW0gKSB7XG5cdGVsZW0udHlwZSA9ICggZWxlbS5nZXRBdHRyaWJ1dGUoIFwidHlwZVwiICkgIT09IG51bGwgKSArIFwiL1wiICsgZWxlbS50eXBlO1xuXHRyZXR1cm4gZWxlbTtcbn1cbmZ1bmN0aW9uIHJlc3RvcmVTY3JpcHQoIGVsZW0gKSB7XG5cdHZhciBtYXRjaCA9IHJzY3JpcHRUeXBlTWFza2VkLmV4ZWMoIGVsZW0udHlwZSApO1xuXG5cdGlmICggbWF0Y2ggKSB7XG5cdFx0ZWxlbS50eXBlID0gbWF0Y2hbIDEgXTtcblx0fSBlbHNlIHtcblx0XHRlbGVtLnJlbW92ZUF0dHJpYnV0ZSggXCJ0eXBlXCIgKTtcblx0fVxuXG5cdHJldHVybiBlbGVtO1xufVxuXG5mdW5jdGlvbiBjbG9uZUNvcHlFdmVudCggc3JjLCBkZXN0ICkge1xuXHR2YXIgaSwgbCwgdHlwZSwgcGRhdGFPbGQsIHBkYXRhQ3VyLCB1ZGF0YU9sZCwgdWRhdGFDdXIsIGV2ZW50cztcblxuXHRpZiAoIGRlc3Qubm9kZVR5cGUgIT09IDEgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gMS4gQ29weSBwcml2YXRlIGRhdGE6IGV2ZW50cywgaGFuZGxlcnMsIGV0Yy5cblx0aWYgKCBkYXRhUHJpdi5oYXNEYXRhKCBzcmMgKSApIHtcblx0XHRwZGF0YU9sZCA9IGRhdGFQcml2LmFjY2Vzcyggc3JjICk7XG5cdFx0cGRhdGFDdXIgPSBkYXRhUHJpdi5zZXQoIGRlc3QsIHBkYXRhT2xkICk7XG5cdFx0ZXZlbnRzID0gcGRhdGFPbGQuZXZlbnRzO1xuXG5cdFx0aWYgKCBldmVudHMgKSB7XG5cdFx0XHRkZWxldGUgcGRhdGFDdXIuaGFuZGxlO1xuXHRcdFx0cGRhdGFDdXIuZXZlbnRzID0ge307XG5cblx0XHRcdGZvciAoIHR5cGUgaW4gZXZlbnRzICkge1xuXHRcdFx0XHRmb3IgKCBpID0gMCwgbCA9IGV2ZW50c1sgdHlwZSBdLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQuYWRkKCBkZXN0LCB0eXBlLCBldmVudHNbIHR5cGUgXVsgaSBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyAyLiBDb3B5IHVzZXIgZGF0YVxuXHRpZiAoIGRhdGFVc2VyLmhhc0RhdGEoIHNyYyApICkge1xuXHRcdHVkYXRhT2xkID0gZGF0YVVzZXIuYWNjZXNzKCBzcmMgKTtcblx0XHR1ZGF0YUN1ciA9IGpRdWVyeS5leHRlbmQoIHt9LCB1ZGF0YU9sZCApO1xuXG5cdFx0ZGF0YVVzZXIuc2V0KCBkZXN0LCB1ZGF0YUN1ciApO1xuXHR9XG59XG5cbi8vIEZpeCBJRSBidWdzLCBzZWUgc3VwcG9ydCB0ZXN0c1xuZnVuY3Rpb24gZml4SW5wdXQoIHNyYywgZGVzdCApIHtcblx0dmFyIG5vZGVOYW1lID0gZGVzdC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG5cdC8vIEZhaWxzIHRvIHBlcnNpc3QgdGhlIGNoZWNrZWQgc3RhdGUgb2YgYSBjbG9uZWQgY2hlY2tib3ggb3IgcmFkaW8gYnV0dG9uLlxuXHRpZiAoIG5vZGVOYW1lID09PSBcImlucHV0XCIgJiYgcmNoZWNrYWJsZVR5cGUudGVzdCggc3JjLnR5cGUgKSApIHtcblx0XHRkZXN0LmNoZWNrZWQgPSBzcmMuY2hlY2tlZDtcblxuXHQvLyBGYWlscyB0byByZXR1cm4gdGhlIHNlbGVjdGVkIG9wdGlvbiB0byB0aGUgZGVmYXVsdCBzZWxlY3RlZCBzdGF0ZSB3aGVuIGNsb25pbmcgb3B0aW9uc1xuXHR9IGVsc2UgaWYgKCBub2RlTmFtZSA9PT0gXCJpbnB1dFwiIHx8IG5vZGVOYW1lID09PSBcInRleHRhcmVhXCIgKSB7XG5cdFx0ZGVzdC5kZWZhdWx0VmFsdWUgPSBzcmMuZGVmYXVsdFZhbHVlO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGRvbU1hbmlwKCBjb2xsZWN0aW9uLCBhcmdzLCBjYWxsYmFjaywgaWdub3JlZCApIHtcblxuXHQvLyBGbGF0dGVuIGFueSBuZXN0ZWQgYXJyYXlzXG5cdGFyZ3MgPSBjb25jYXQuYXBwbHkoIFtdLCBhcmdzICk7XG5cblx0dmFyIGZyYWdtZW50LCBmaXJzdCwgc2NyaXB0cywgaGFzU2NyaXB0cywgbm9kZSwgZG9jLFxuXHRcdGkgPSAwLFxuXHRcdGwgPSBjb2xsZWN0aW9uLmxlbmd0aCxcblx0XHRpTm9DbG9uZSA9IGwgLSAxLFxuXHRcdHZhbHVlID0gYXJnc1sgMCBdLFxuXHRcdGlzRnVuY3Rpb24gPSBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKTtcblxuXHQvLyBXZSBjYW4ndCBjbG9uZU5vZGUgZnJhZ21lbnRzIHRoYXQgY29udGFpbiBjaGVja2VkLCBpbiBXZWJLaXRcblx0aWYgKCBpc0Z1bmN0aW9uIHx8XG5cdFx0XHQoIGwgPiAxICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJlxuXHRcdFx0XHQhc3VwcG9ydC5jaGVja0Nsb25lICYmIHJjaGVja2VkLnRlc3QoIHZhbHVlICkgKSApIHtcblx0XHRyZXR1cm4gY29sbGVjdGlvbi5lYWNoKCBmdW5jdGlvbiggaW5kZXggKSB7XG5cdFx0XHR2YXIgc2VsZiA9IGNvbGxlY3Rpb24uZXEoIGluZGV4ICk7XG5cdFx0XHRpZiAoIGlzRnVuY3Rpb24gKSB7XG5cdFx0XHRcdGFyZ3NbIDAgXSA9IHZhbHVlLmNhbGwoIHRoaXMsIGluZGV4LCBzZWxmLmh0bWwoKSApO1xuXHRcdFx0fVxuXHRcdFx0ZG9tTWFuaXAoIHNlbGYsIGFyZ3MsIGNhbGxiYWNrLCBpZ25vcmVkICk7XG5cdFx0fSApO1xuXHR9XG5cblx0aWYgKCBsICkge1xuXHRcdGZyYWdtZW50ID0gYnVpbGRGcmFnbWVudCggYXJncywgY29sbGVjdGlvblsgMCBdLm93bmVyRG9jdW1lbnQsIGZhbHNlLCBjb2xsZWN0aW9uLCBpZ25vcmVkICk7XG5cdFx0Zmlyc3QgPSBmcmFnbWVudC5maXJzdENoaWxkO1xuXG5cdFx0aWYgKCBmcmFnbWVudC5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSApIHtcblx0XHRcdGZyYWdtZW50ID0gZmlyc3Q7XG5cdFx0fVxuXG5cdFx0Ly8gUmVxdWlyZSBlaXRoZXIgbmV3IGNvbnRlbnQgb3IgYW4gaW50ZXJlc3QgaW4gaWdub3JlZCBlbGVtZW50cyB0byBpbnZva2UgdGhlIGNhbGxiYWNrXG5cdFx0aWYgKCBmaXJzdCB8fCBpZ25vcmVkICkge1xuXHRcdFx0c2NyaXB0cyA9IGpRdWVyeS5tYXAoIGdldEFsbCggZnJhZ21lbnQsIFwic2NyaXB0XCIgKSwgZGlzYWJsZVNjcmlwdCApO1xuXHRcdFx0aGFzU2NyaXB0cyA9IHNjcmlwdHMubGVuZ3RoO1xuXG5cdFx0XHQvLyBVc2UgdGhlIG9yaWdpbmFsIGZyYWdtZW50IGZvciB0aGUgbGFzdCBpdGVtXG5cdFx0XHQvLyBpbnN0ZWFkIG9mIHRoZSBmaXJzdCBiZWNhdXNlIGl0IGNhbiBlbmQgdXBcblx0XHRcdC8vIGJlaW5nIGVtcHRpZWQgaW5jb3JyZWN0bHkgaW4gY2VydGFpbiBzaXR1YXRpb25zICgjODA3MCkuXG5cdFx0XHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdG5vZGUgPSBmcmFnbWVudDtcblxuXHRcdFx0XHRpZiAoIGkgIT09IGlOb0Nsb25lICkge1xuXHRcdFx0XHRcdG5vZGUgPSBqUXVlcnkuY2xvbmUoIG5vZGUsIHRydWUsIHRydWUgKTtcblxuXHRcdFx0XHRcdC8vIEtlZXAgcmVmZXJlbmNlcyB0byBjbG9uZWQgc2NyaXB0cyBmb3IgbGF0ZXIgcmVzdG9yYXRpb25cblx0XHRcdFx0XHRpZiAoIGhhc1NjcmlwdHMgKSB7XG5cblx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQ8NC4xLCBQaGFudG9tSlM8MlxuXHRcdFx0XHRcdFx0Ly8gcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93cyBvbiBhbmNpZW50IFdlYktpdFxuXHRcdFx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCBzY3JpcHRzLCBnZXRBbGwoIG5vZGUsIFwic2NyaXB0XCIgKSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNhbGxiYWNrLmNhbGwoIGNvbGxlY3Rpb25bIGkgXSwgbm9kZSwgaSApO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGhhc1NjcmlwdHMgKSB7XG5cdFx0XHRcdGRvYyA9IHNjcmlwdHNbIHNjcmlwdHMubGVuZ3RoIC0gMSBdLm93bmVyRG9jdW1lbnQ7XG5cblx0XHRcdFx0Ly8gUmVlbmFibGUgc2NyaXB0c1xuXHRcdFx0XHRqUXVlcnkubWFwKCBzY3JpcHRzLCByZXN0b3JlU2NyaXB0ICk7XG5cblx0XHRcdFx0Ly8gRXZhbHVhdGUgZXhlY3V0YWJsZSBzY3JpcHRzIG9uIGZpcnN0IGRvY3VtZW50IGluc2VydGlvblxuXHRcdFx0XHRmb3IgKCBpID0gMDsgaSA8IGhhc1NjcmlwdHM7IGkrKyApIHtcblx0XHRcdFx0XHRub2RlID0gc2NyaXB0c1sgaSBdO1xuXHRcdFx0XHRcdGlmICggcnNjcmlwdFR5cGUudGVzdCggbm9kZS50eXBlIHx8IFwiXCIgKSAmJlxuXHRcdFx0XHRcdFx0IWRhdGFQcml2LmFjY2Vzcyggbm9kZSwgXCJnbG9iYWxFdmFsXCIgKSAmJlxuXHRcdFx0XHRcdFx0alF1ZXJ5LmNvbnRhaW5zKCBkb2MsIG5vZGUgKSApIHtcblxuXHRcdFx0XHRcdFx0aWYgKCBub2RlLnNyYyApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBPcHRpb25hbCBBSkFYIGRlcGVuZGVuY3ksIGJ1dCB3b24ndCBydW4gc2NyaXB0cyBpZiBub3QgcHJlc2VudFxuXHRcdFx0XHRcdFx0XHRpZiAoIGpRdWVyeS5fZXZhbFVybCApIHtcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuX2V2YWxVcmwoIG5vZGUuc3JjICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGpRdWVyeS5nbG9iYWxFdmFsKCBub2RlLnRleHRDb250ZW50LnJlcGxhY2UoIHJjbGVhblNjcmlwdCwgXCJcIiApICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGNvbGxlY3Rpb247XG59XG5cbmZ1bmN0aW9uIHJlbW92ZSggZWxlbSwgc2VsZWN0b3IsIGtlZXBEYXRhICkge1xuXHR2YXIgbm9kZSxcblx0XHRub2RlcyA9IHNlbGVjdG9yID8galF1ZXJ5LmZpbHRlciggc2VsZWN0b3IsIGVsZW0gKSA6IGVsZW0sXG5cdFx0aSA9IDA7XG5cblx0Zm9yICggOyAoIG5vZGUgPSBub2Rlc1sgaSBdICkgIT0gbnVsbDsgaSsrICkge1xuXHRcdGlmICggIWtlZXBEYXRhICYmIG5vZGUubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIG5vZGUgKSApO1xuXHRcdH1cblxuXHRcdGlmICggbm9kZS5wYXJlbnROb2RlICkge1xuXHRcdFx0aWYgKCBrZWVwRGF0YSAmJiBqUXVlcnkuY29udGFpbnMoIG5vZGUub3duZXJEb2N1bWVudCwgbm9kZSApICkge1xuXHRcdFx0XHRzZXRHbG9iYWxFdmFsKCBnZXRBbGwoIG5vZGUsIFwic2NyaXB0XCIgKSApO1xuXHRcdFx0fVxuXHRcdFx0bm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBub2RlICk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGVsZW07XG59XG5cbmpRdWVyeS5leHRlbmQoIHtcblx0aHRtbFByZWZpbHRlcjogZnVuY3Rpb24oIGh0bWwgKSB7XG5cdFx0cmV0dXJuIGh0bWwucmVwbGFjZSggcnhodG1sVGFnLCBcIjwkMT48LyQyPlwiICk7XG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uKCBlbGVtLCBkYXRhQW5kRXZlbnRzLCBkZWVwRGF0YUFuZEV2ZW50cyApIHtcblx0XHR2YXIgaSwgbCwgc3JjRWxlbWVudHMsIGRlc3RFbGVtZW50cyxcblx0XHRcdGNsb25lID0gZWxlbS5jbG9uZU5vZGUoIHRydWUgKSxcblx0XHRcdGluUGFnZSA9IGpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICk7XG5cblx0XHQvLyBGaXggSUUgY2xvbmluZyBpc3N1ZXNcblx0XHRpZiAoICFzdXBwb3J0Lm5vQ2xvbmVDaGVja2VkICYmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBlbGVtLm5vZGVUeXBlID09PSAxMSApICYmXG5cdFx0XHRcdCFqUXVlcnkuaXNYTUxEb2MoIGVsZW0gKSApIHtcblxuXHRcdFx0Ly8gV2UgZXNjaGV3IFNpenpsZSBoZXJlIGZvciBwZXJmb3JtYW5jZSByZWFzb25zOiBodHRwOi8vanNwZXJmLmNvbS9nZXRhbGwtdnMtc2l6emxlLzJcblx0XHRcdGRlc3RFbGVtZW50cyA9IGdldEFsbCggY2xvbmUgKTtcblx0XHRcdHNyY0VsZW1lbnRzID0gZ2V0QWxsKCBlbGVtICk7XG5cblx0XHRcdGZvciAoIGkgPSAwLCBsID0gc3JjRWxlbWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRmaXhJbnB1dCggc3JjRWxlbWVudHNbIGkgXSwgZGVzdEVsZW1lbnRzWyBpIF0gKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDb3B5IHRoZSBldmVudHMgZnJvbSB0aGUgb3JpZ2luYWwgdG8gdGhlIGNsb25lXG5cdFx0aWYgKCBkYXRhQW5kRXZlbnRzICkge1xuXHRcdFx0aWYgKCBkZWVwRGF0YUFuZEV2ZW50cyApIHtcblx0XHRcdFx0c3JjRWxlbWVudHMgPSBzcmNFbGVtZW50cyB8fCBnZXRBbGwoIGVsZW0gKTtcblx0XHRcdFx0ZGVzdEVsZW1lbnRzID0gZGVzdEVsZW1lbnRzIHx8IGdldEFsbCggY2xvbmUgKTtcblxuXHRcdFx0XHRmb3IgKCBpID0gMCwgbCA9IHNyY0VsZW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0XHRjbG9uZUNvcHlFdmVudCggc3JjRWxlbWVudHNbIGkgXSwgZGVzdEVsZW1lbnRzWyBpIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y2xvbmVDb3B5RXZlbnQoIGVsZW0sIGNsb25lICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUHJlc2VydmUgc2NyaXB0IGV2YWx1YXRpb24gaGlzdG9yeVxuXHRcdGRlc3RFbGVtZW50cyA9IGdldEFsbCggY2xvbmUsIFwic2NyaXB0XCIgKTtcblx0XHRpZiAoIGRlc3RFbGVtZW50cy5sZW5ndGggPiAwICkge1xuXHRcdFx0c2V0R2xvYmFsRXZhbCggZGVzdEVsZW1lbnRzLCAhaW5QYWdlICYmIGdldEFsbCggZWxlbSwgXCJzY3JpcHRcIiApICk7XG5cdFx0fVxuXG5cdFx0Ly8gUmV0dXJuIHRoZSBjbG9uZWQgc2V0XG5cdFx0cmV0dXJuIGNsb25lO1xuXHR9LFxuXG5cdGNsZWFuRGF0YTogZnVuY3Rpb24oIGVsZW1zICkge1xuXHRcdHZhciBkYXRhLCBlbGVtLCB0eXBlLFxuXHRcdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRmb3IgKCA7ICggZWxlbSA9IGVsZW1zWyBpIF0gKSAhPT0gdW5kZWZpbmVkOyBpKysgKSB7XG5cdFx0XHRpZiAoIGFjY2VwdERhdGEoIGVsZW0gKSApIHtcblx0XHRcdFx0aWYgKCAoIGRhdGEgPSBlbGVtWyBkYXRhUHJpdi5leHBhbmRvIF0gKSApIHtcblx0XHRcdFx0XHRpZiAoIGRhdGEuZXZlbnRzICkge1xuXHRcdFx0XHRcdFx0Zm9yICggdHlwZSBpbiBkYXRhLmV2ZW50cyApIHtcblx0XHRcdFx0XHRcdFx0aWYgKCBzcGVjaWFsWyB0eXBlIF0gKSB7XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnJlbW92ZSggZWxlbSwgdHlwZSApO1xuXG5cdFx0XHRcdFx0XHRcdC8vIFRoaXMgaXMgYSBzaG9ydGN1dCB0byBhdm9pZCBqUXVlcnkuZXZlbnQucmVtb3ZlJ3Mgb3ZlcmhlYWRcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkucmVtb3ZlRXZlbnQoIGVsZW0sIHR5cGUsIGRhdGEuaGFuZGxlICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBDaHJvbWUgPD0gMzUtNDUrXG5cdFx0XHRcdFx0Ly8gQXNzaWduIHVuZGVmaW5lZCBpbnN0ZWFkIG9mIHVzaW5nIGRlbGV0ZSwgc2VlIERhdGEjcmVtb3ZlXG5cdFx0XHRcdFx0ZWxlbVsgZGF0YVByaXYuZXhwYW5kbyBdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggZWxlbVsgZGF0YVVzZXIuZXhwYW5kbyBdICkge1xuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogQ2hyb21lIDw9IDM1LTQ1K1xuXHRcdFx0XHRcdC8vIEFzc2lnbiB1bmRlZmluZWQgaW5zdGVhZCBvZiB1c2luZyBkZWxldGUsIHNlZSBEYXRhI3JlbW92ZVxuXHRcdFx0XHRcdGVsZW1bIGRhdGFVc2VyLmV4cGFuZG8gXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cblx0Ly8gS2VlcCBkb21NYW5pcCBleHBvc2VkIHVudGlsIDMuMCAoZ2gtMjIyNSlcblx0ZG9tTWFuaXA6IGRvbU1hbmlwLFxuXG5cdGRldGFjaDogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiByZW1vdmUoIHRoaXMsIHNlbGVjdG9yLCB0cnVlICk7XG5cdH0sXG5cblx0cmVtb3ZlOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuIHJlbW92ZSggdGhpcywgc2VsZWN0b3IgKTtcblx0fSxcblxuXHR0ZXh0OiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgP1xuXHRcdFx0XHRqUXVlcnkudGV4dCggdGhpcyApIDpcblx0XHRcdFx0dGhpcy5lbXB0eSgpLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmICggdGhpcy5ub2RlVHlwZSA9PT0gMSB8fCB0aGlzLm5vZGVUeXBlID09PSAxMSB8fCB0aGlzLm5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHRcdFx0dGhpcy50ZXh0Q29udGVudCA9IHZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApO1xuXHRcdH0sIG51bGwsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoICk7XG5cdH0sXG5cblx0YXBwZW5kOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZG9tTWFuaXAoIHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRpZiAoIHRoaXMubm9kZVR5cGUgPT09IDEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gMTEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0dmFyIHRhcmdldCA9IG1hbmlwdWxhdGlvblRhcmdldCggdGhpcywgZWxlbSApO1xuXHRcdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoIGVsZW0gKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0cHJlcGVuZDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLm5vZGVUeXBlID09PSAxIHx8IHRoaXMubm9kZVR5cGUgPT09IDExIHx8IHRoaXMubm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdHZhciB0YXJnZXQgPSBtYW5pcHVsYXRpb25UYXJnZXQoIHRoaXMsIGVsZW0gKTtcblx0XHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZSggZWxlbSwgdGFyZ2V0LmZpcnN0Q2hpbGQgKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0YmVmb3JlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZG9tTWFuaXAoIHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRpZiAoIHRoaXMucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0dGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggZWxlbSwgdGhpcyApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblxuXHRhZnRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIGVsZW0sIHRoaXMubmV4dFNpYmxpbmcgKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0ZW1wdHk6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBlbGVtLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRmb3IgKCA7ICggZWxlbSA9IHRoaXNbIGkgXSApICE9IG51bGw7IGkrKyApIHtcblx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblxuXHRcdFx0XHQvLyBQcmV2ZW50IG1lbW9yeSBsZWFrc1xuXHRcdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIGVsZW0sIGZhbHNlICkgKTtcblxuXHRcdFx0XHQvLyBSZW1vdmUgYW55IHJlbWFpbmluZyBub2Rlc1xuXHRcdFx0XHRlbGVtLnRleHRDb250ZW50ID0gXCJcIjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRjbG9uZTogZnVuY3Rpb24oIGRhdGFBbmRFdmVudHMsIGRlZXBEYXRhQW5kRXZlbnRzICkge1xuXHRcdGRhdGFBbmRFdmVudHMgPSBkYXRhQW5kRXZlbnRzID09IG51bGwgPyBmYWxzZSA6IGRhdGFBbmRFdmVudHM7XG5cdFx0ZGVlcERhdGFBbmRFdmVudHMgPSBkZWVwRGF0YUFuZEV2ZW50cyA9PSBudWxsID8gZGF0YUFuZEV2ZW50cyA6IGRlZXBEYXRhQW5kRXZlbnRzO1xuXG5cdFx0cmV0dXJuIHRoaXMubWFwKCBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBqUXVlcnkuY2xvbmUoIHRoaXMsIGRhdGFBbmRFdmVudHMsIGRlZXBEYXRhQW5kRXZlbnRzICk7XG5cdFx0fSApO1xuXHR9LFxuXG5cdGh0bWw6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHR2YXIgZWxlbSA9IHRoaXNbIDAgXSB8fCB7fSxcblx0XHRcdFx0aSA9IDAsXG5cdFx0XHRcdGwgPSB0aGlzLmxlbmd0aDtcblxuXHRcdFx0aWYgKCB2YWx1ZSA9PT0gdW5kZWZpbmVkICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRcdHJldHVybiBlbGVtLmlubmVySFRNTDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2VlIGlmIHdlIGNhbiB0YWtlIGEgc2hvcnRjdXQgYW5kIGp1c3QgdXNlIGlubmVySFRNTFxuXHRcdFx0aWYgKCB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgIXJub0lubmVyaHRtbC50ZXN0KCB2YWx1ZSApICYmXG5cdFx0XHRcdCF3cmFwTWFwWyAoIHJ0YWdOYW1lLmV4ZWMoIHZhbHVlICkgfHwgWyBcIlwiLCBcIlwiIF0gKVsgMSBdLnRvTG93ZXJDYXNlKCkgXSApIHtcblxuXHRcdFx0XHR2YWx1ZSA9IGpRdWVyeS5odG1sUHJlZmlsdGVyKCB2YWx1ZSApO1xuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRcdFx0ZWxlbSA9IHRoaXNbIGkgXSB8fCB7fTtcblxuXHRcdFx0XHRcdFx0Ly8gUmVtb3ZlIGVsZW1lbnQgbm9kZXMgYW5kIHByZXZlbnQgbWVtb3J5IGxlYWtzXG5cdFx0XHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRcdFx0XHRcdGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggZWxlbSwgZmFsc2UgKSApO1xuXHRcdFx0XHRcdFx0XHRlbGVtLmlubmVySFRNTCA9IHZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGVsZW0gPSAwO1xuXG5cdFx0XHRcdC8vIElmIHVzaW5nIGlubmVySFRNTCB0aHJvd3MgYW4gZXhjZXB0aW9uLCB1c2UgdGhlIGZhbGxiYWNrIG1ldGhvZFxuXHRcdFx0XHR9IGNhdGNoICggZSApIHt9XG5cdFx0XHR9XG5cblx0XHRcdGlmICggZWxlbSApIHtcblx0XHRcdFx0dGhpcy5lbXB0eSgpLmFwcGVuZCggdmFsdWUgKTtcblx0XHRcdH1cblx0XHR9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCApO1xuXHR9LFxuXG5cdHJlcGxhY2VXaXRoOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgaWdub3JlZCA9IFtdO1xuXG5cdFx0Ly8gTWFrZSB0aGUgY2hhbmdlcywgcmVwbGFjaW5nIGVhY2ggbm9uLWlnbm9yZWQgY29udGV4dCBlbGVtZW50IHdpdGggdGhlIG5ldyBjb250ZW50XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0dmFyIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcblxuXHRcdFx0aWYgKCBqUXVlcnkuaW5BcnJheSggdGhpcywgaWdub3JlZCApIDwgMCApIHtcblx0XHRcdFx0alF1ZXJ5LmNsZWFuRGF0YSggZ2V0QWxsKCB0aGlzICkgKTtcblx0XHRcdFx0aWYgKCBwYXJlbnQgKSB7XG5cdFx0XHRcdFx0cGFyZW50LnJlcGxhY2VDaGlsZCggZWxlbSwgdGhpcyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHQvLyBGb3JjZSBjYWxsYmFjayBpbnZvY2F0aW9uXG5cdFx0fSwgaWdub3JlZCApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5lYWNoKCB7XG5cdGFwcGVuZFRvOiBcImFwcGVuZFwiLFxuXHRwcmVwZW5kVG86IFwicHJlcGVuZFwiLFxuXHRpbnNlcnRCZWZvcmU6IFwiYmVmb3JlXCIsXG5cdGluc2VydEFmdGVyOiBcImFmdGVyXCIsXG5cdHJlcGxhY2VBbGw6IFwicmVwbGFjZVdpdGhcIlxufSwgZnVuY3Rpb24oIG5hbWUsIG9yaWdpbmFsICkge1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHR2YXIgZWxlbXMsXG5cdFx0XHRyZXQgPSBbXSxcblx0XHRcdGluc2VydCA9IGpRdWVyeSggc2VsZWN0b3IgKSxcblx0XHRcdGxhc3QgPSBpbnNlcnQubGVuZ3RoIC0gMSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Zm9yICggOyBpIDw9IGxhc3Q7IGkrKyApIHtcblx0XHRcdGVsZW1zID0gaSA9PT0gbGFzdCA/IHRoaXMgOiB0aGlzLmNsb25lKCB0cnVlICk7XG5cdFx0XHRqUXVlcnkoIGluc2VydFsgaSBdIClbIG9yaWdpbmFsIF0oIGVsZW1zICk7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IFF0V2ViS2l0XG5cdFx0XHQvLyAuZ2V0KCkgYmVjYXVzZSBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzXG5cdFx0XHRwdXNoLmFwcGx5KCByZXQsIGVsZW1zLmdldCgpICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCByZXQgKTtcblx0fTtcbn0gKTtcblxuXG52YXIgaWZyYW1lLFxuXHRlbGVtZGlzcGxheSA9IHtcblxuXHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3hcblx0XHQvLyBXZSBoYXZlIHRvIHByZS1kZWZpbmUgdGhlc2UgdmFsdWVzIGZvciBGRiAoIzEwMjI3KVxuXHRcdEhUTUw6IFwiYmxvY2tcIixcblx0XHRCT0RZOiBcImJsb2NrXCJcblx0fTtcblxuLyoqXG4gKiBSZXRyaWV2ZSB0aGUgYWN0dWFsIGRpc3BsYXkgb2YgYSBlbGVtZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBub2RlTmFtZSBvZiB0aGUgZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IGRvYyBEb2N1bWVudCBvYmplY3RcbiAqL1xuXG4vLyBDYWxsZWQgb25seSBmcm9tIHdpdGhpbiBkZWZhdWx0RGlzcGxheVxuZnVuY3Rpb24gYWN0dWFsRGlzcGxheSggbmFtZSwgZG9jICkge1xuXHR2YXIgZWxlbSA9IGpRdWVyeSggZG9jLmNyZWF0ZUVsZW1lbnQoIG5hbWUgKSApLmFwcGVuZFRvKCBkb2MuYm9keSApLFxuXG5cdFx0ZGlzcGxheSA9IGpRdWVyeS5jc3MoIGVsZW1bIDAgXSwgXCJkaXNwbGF5XCIgKTtcblxuXHQvLyBXZSBkb24ndCBoYXZlIGFueSBkYXRhIHN0b3JlZCBvbiB0aGUgZWxlbWVudCxcblx0Ly8gc28gdXNlIFwiZGV0YWNoXCIgbWV0aG9kIGFzIGZhc3Qgd2F5IHRvIGdldCByaWQgb2YgdGhlIGVsZW1lbnRcblx0ZWxlbS5kZXRhY2goKTtcblxuXHRyZXR1cm4gZGlzcGxheTtcbn1cblxuLyoqXG4gKiBUcnkgdG8gZGV0ZXJtaW5lIHRoZSBkZWZhdWx0IGRpc3BsYXkgdmFsdWUgb2YgYW4gZWxlbWVudFxuICogQHBhcmFtIHtTdHJpbmd9IG5vZGVOYW1lXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHREaXNwbGF5KCBub2RlTmFtZSApIHtcblx0dmFyIGRvYyA9IGRvY3VtZW50LFxuXHRcdGRpc3BsYXkgPSBlbGVtZGlzcGxheVsgbm9kZU5hbWUgXTtcblxuXHRpZiAoICFkaXNwbGF5ICkge1xuXHRcdGRpc3BsYXkgPSBhY3R1YWxEaXNwbGF5KCBub2RlTmFtZSwgZG9jICk7XG5cblx0XHQvLyBJZiB0aGUgc2ltcGxlIHdheSBmYWlscywgcmVhZCBmcm9tIGluc2lkZSBhbiBpZnJhbWVcblx0XHRpZiAoIGRpc3BsYXkgPT09IFwibm9uZVwiIHx8ICFkaXNwbGF5ICkge1xuXG5cdFx0XHQvLyBVc2UgdGhlIGFscmVhZHktY3JlYXRlZCBpZnJhbWUgaWYgcG9zc2libGVcblx0XHRcdGlmcmFtZSA9ICggaWZyYW1lIHx8IGpRdWVyeSggXCI8aWZyYW1lIGZyYW1lYm9yZGVyPScwJyB3aWR0aD0nMCcgaGVpZ2h0PScwJy8+XCIgKSApXG5cdFx0XHRcdC5hcHBlbmRUbyggZG9jLmRvY3VtZW50RWxlbWVudCApO1xuXG5cdFx0XHQvLyBBbHdheXMgd3JpdGUgYSBuZXcgSFRNTCBza2VsZXRvbiBzbyBXZWJraXQgYW5kIEZpcmVmb3ggZG9uJ3QgY2hva2Ugb24gcmV1c2Vcblx0XHRcdGRvYyA9IGlmcmFtZVsgMCBdLmNvbnRlbnREb2N1bWVudDtcblxuXHRcdFx0Ly8gU3VwcG9ydDogSUVcblx0XHRcdGRvYy53cml0ZSgpO1xuXHRcdFx0ZG9jLmNsb3NlKCk7XG5cblx0XHRcdGRpc3BsYXkgPSBhY3R1YWxEaXNwbGF5KCBub2RlTmFtZSwgZG9jICk7XG5cdFx0XHRpZnJhbWUuZGV0YWNoKCk7XG5cdFx0fVxuXG5cdFx0Ly8gU3RvcmUgdGhlIGNvcnJlY3QgZGVmYXVsdCBkaXNwbGF5XG5cdFx0ZWxlbWRpc3BsYXlbIG5vZGVOYW1lIF0gPSBkaXNwbGF5O1xuXHR9XG5cblx0cmV0dXJuIGRpc3BsYXk7XG59XG52YXIgcm1hcmdpbiA9ICggL15tYXJnaW4vICk7XG5cbnZhciBybnVtbm9ucHggPSBuZXcgUmVnRXhwKCBcIl4oXCIgKyBwbnVtICsgXCIpKD8hcHgpW2EteiVdKyRcIiwgXCJpXCIgKTtcblxudmFyIGdldFN0eWxlcyA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0Ly8gU3VwcG9ydDogSUU8PTExKywgRmlyZWZveDw9MzArICgjMTUwOTgsICMxNDE1MClcblx0XHQvLyBJRSB0aHJvd3Mgb24gZWxlbWVudHMgY3JlYXRlZCBpbiBwb3B1cHNcblx0XHQvLyBGRiBtZWFud2hpbGUgdGhyb3dzIG9uIGZyYW1lIGVsZW1lbnRzIHRocm91Z2ggXCJkZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlXCJcblx0XHR2YXIgdmlldyA9IGVsZW0ub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldztcblxuXHRcdGlmICggIXZpZXcgfHwgIXZpZXcub3BlbmVyICkge1xuXHRcdFx0dmlldyA9IHdpbmRvdztcblx0XHR9XG5cblx0XHRyZXR1cm4gdmlldy5nZXRDb21wdXRlZFN0eWxlKCBlbGVtICk7XG5cdH07XG5cbnZhciBzd2FwID0gZnVuY3Rpb24oIGVsZW0sIG9wdGlvbnMsIGNhbGxiYWNrLCBhcmdzICkge1xuXHR2YXIgcmV0LCBuYW1lLFxuXHRcdG9sZCA9IHt9O1xuXG5cdC8vIFJlbWVtYmVyIHRoZSBvbGQgdmFsdWVzLCBhbmQgaW5zZXJ0IHRoZSBuZXcgb25lc1xuXHRmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG5cdFx0b2xkWyBuYW1lIF0gPSBlbGVtLnN0eWxlWyBuYW1lIF07XG5cdFx0ZWxlbS5zdHlsZVsgbmFtZSBdID0gb3B0aW9uc1sgbmFtZSBdO1xuXHR9XG5cblx0cmV0ID0gY2FsbGJhY2suYXBwbHkoIGVsZW0sIGFyZ3MgfHwgW10gKTtcblxuXHQvLyBSZXZlcnQgdGhlIG9sZCB2YWx1ZXNcblx0Zm9yICggbmFtZSBpbiBvcHRpb25zICkge1xuXHRcdGVsZW0uc3R5bGVbIG5hbWUgXSA9IG9sZFsgbmFtZSBdO1xuXHR9XG5cblx0cmV0dXJuIHJldDtcbn07XG5cblxudmFyIGRvY3VtZW50RWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXG5cbiggZnVuY3Rpb24oKSB7XG5cdHZhciBwaXhlbFBvc2l0aW9uVmFsLCBib3hTaXppbmdSZWxpYWJsZVZhbCwgcGl4ZWxNYXJnaW5SaWdodFZhbCwgcmVsaWFibGVNYXJnaW5MZWZ0VmFsLFxuXHRcdGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKSxcblx0XHRkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICk7XG5cblx0Ly8gRmluaXNoIGVhcmx5IGluIGxpbWl0ZWQgKG5vbi1icm93c2VyKSBlbnZpcm9ubWVudHNcblx0aWYgKCAhZGl2LnN0eWxlICkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIFN1cHBvcnQ6IElFOS0xMStcblx0Ly8gU3R5bGUgb2YgY2xvbmVkIGVsZW1lbnQgYWZmZWN0cyBzb3VyY2UgZWxlbWVudCBjbG9uZWQgKCM4OTA4KVxuXHRkaXYuc3R5bGUuYmFja2dyb3VuZENsaXAgPSBcImNvbnRlbnQtYm94XCI7XG5cdGRpdi5jbG9uZU5vZGUoIHRydWUgKS5zdHlsZS5iYWNrZ3JvdW5kQ2xpcCA9IFwiXCI7XG5cdHN1cHBvcnQuY2xlYXJDbG9uZVN0eWxlID0gZGl2LnN0eWxlLmJhY2tncm91bmRDbGlwID09PSBcImNvbnRlbnQtYm94XCI7XG5cblx0Y29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBcImJvcmRlcjowO3dpZHRoOjhweDtoZWlnaHQ6MDt0b3A6MDtsZWZ0Oi05OTk5cHg7XCIgK1xuXHRcdFwicGFkZGluZzowO21hcmdpbi10b3A6MXB4O3Bvc2l0aW9uOmFic29sdXRlXCI7XG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZCggZGl2ICk7XG5cblx0Ly8gRXhlY3V0aW5nIGJvdGggcGl4ZWxQb3NpdGlvbiAmIGJveFNpemluZ1JlbGlhYmxlIHRlc3RzIHJlcXVpcmUgb25seSBvbmUgbGF5b3V0XG5cdC8vIHNvIHRoZXkncmUgZXhlY3V0ZWQgYXQgdGhlIHNhbWUgdGltZSB0byBzYXZlIHRoZSBzZWNvbmQgY29tcHV0YXRpb24uXG5cdGZ1bmN0aW9uIGNvbXB1dGVTdHlsZVRlc3RzKCkge1xuXHRcdGRpdi5zdHlsZS5jc3NUZXh0ID1cblxuXHRcdFx0Ly8gU3VwcG9ydDogRmlyZWZveDwyOSwgQW5kcm9pZCAyLjNcblx0XHRcdC8vIFZlbmRvci1wcmVmaXggYm94LXNpemluZ1xuXHRcdFx0XCItd2Via2l0LWJveC1zaXppbmc6Ym9yZGVyLWJveDstbW96LWJveC1zaXppbmc6Ym9yZGVyLWJveDtib3gtc2l6aW5nOmJvcmRlci1ib3g7XCIgK1xuXHRcdFx0XCJwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrO1wiICtcblx0XHRcdFwibWFyZ2luOmF1dG87Ym9yZGVyOjFweDtwYWRkaW5nOjFweDtcIiArXG5cdFx0XHRcInRvcDoxJTt3aWR0aDo1MCVcIjtcblx0XHRkaXYuaW5uZXJIVE1MID0gXCJcIjtcblx0XHRkb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoIGNvbnRhaW5lciApO1xuXG5cdFx0dmFyIGRpdlN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoIGRpdiApO1xuXHRcdHBpeGVsUG9zaXRpb25WYWwgPSBkaXZTdHlsZS50b3AgIT09IFwiMSVcIjtcblx0XHRyZWxpYWJsZU1hcmdpbkxlZnRWYWwgPSBkaXZTdHlsZS5tYXJnaW5MZWZ0ID09PSBcIjJweFwiO1xuXHRcdGJveFNpemluZ1JlbGlhYmxlVmFsID0gZGl2U3R5bGUud2lkdGggPT09IFwiNHB4XCI7XG5cblx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDQuMCAtIDQuMyBvbmx5XG5cdFx0Ly8gU29tZSBzdHlsZXMgY29tZSBiYWNrIHdpdGggcGVyY2VudGFnZSB2YWx1ZXMsIGV2ZW4gdGhvdWdoIHRoZXkgc2hvdWxkbid0XG5cdFx0ZGl2LnN0eWxlLm1hcmdpblJpZ2h0ID0gXCI1MCVcIjtcblx0XHRwaXhlbE1hcmdpblJpZ2h0VmFsID0gZGl2U3R5bGUubWFyZ2luUmlnaHQgPT09IFwiNHB4XCI7XG5cblx0XHRkb2N1bWVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoIGNvbnRhaW5lciApO1xuXHR9XG5cblx0alF1ZXJ5LmV4dGVuZCggc3VwcG9ydCwge1xuXHRcdHBpeGVsUG9zaXRpb246IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBUaGlzIHRlc3QgaXMgZXhlY3V0ZWQgb25seSBvbmNlIGJ1dCB3ZSBzdGlsbCBkbyBtZW1vaXppbmdcblx0XHRcdC8vIHNpbmNlIHdlIGNhbiB1c2UgdGhlIGJveFNpemluZ1JlbGlhYmxlIHByZS1jb21wdXRpbmcuXG5cdFx0XHQvLyBObyBuZWVkIHRvIGNoZWNrIGlmIHRoZSB0ZXN0IHdhcyBhbHJlYWR5IHBlcmZvcm1lZCwgdGhvdWdoLlxuXHRcdFx0Y29tcHV0ZVN0eWxlVGVzdHMoKTtcblx0XHRcdHJldHVybiBwaXhlbFBvc2l0aW9uVmFsO1xuXHRcdH0sXG5cdFx0Ym94U2l6aW5nUmVsaWFibGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCBib3hTaXppbmdSZWxpYWJsZVZhbCA9PSBudWxsICkge1xuXHRcdFx0XHRjb21wdXRlU3R5bGVUZXN0cygpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGJveFNpemluZ1JlbGlhYmxlVmFsO1xuXHRcdH0sXG5cdFx0cGl4ZWxNYXJnaW5SaWdodDogZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgNC4wLTQuM1xuXHRcdFx0Ly8gV2UncmUgY2hlY2tpbmcgZm9yIGJveFNpemluZ1JlbGlhYmxlVmFsIGhlcmUgaW5zdGVhZCBvZiBwaXhlbE1hcmdpblJpZ2h0VmFsXG5cdFx0XHQvLyBzaW5jZSB0aGF0IGNvbXByZXNzZXMgYmV0dGVyIGFuZCB0aGV5J3JlIGNvbXB1dGVkIHRvZ2V0aGVyIGFueXdheS5cblx0XHRcdGlmICggYm94U2l6aW5nUmVsaWFibGVWYWwgPT0gbnVsbCApIHtcblx0XHRcdFx0Y29tcHV0ZVN0eWxlVGVzdHMoKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBwaXhlbE1hcmdpblJpZ2h0VmFsO1xuXHRcdH0sXG5cdFx0cmVsaWFibGVNYXJnaW5MZWZ0OiBmdW5jdGlvbigpIHtcblxuXHRcdFx0Ly8gU3VwcG9ydDogSUUgPD04IG9ubHksIEFuZHJvaWQgNC4wIC0gNC4zIG9ubHksIEZpcmVmb3ggPD0zIC0gMzdcblx0XHRcdGlmICggYm94U2l6aW5nUmVsaWFibGVWYWwgPT0gbnVsbCApIHtcblx0XHRcdFx0Y29tcHV0ZVN0eWxlVGVzdHMoKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZWxpYWJsZU1hcmdpbkxlZnRWYWw7XG5cdFx0fSxcblx0XHRyZWxpYWJsZU1hcmdpblJpZ2h0OiBmdW5jdGlvbigpIHtcblxuXHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCAyLjNcblx0XHRcdC8vIENoZWNrIGlmIGRpdiB3aXRoIGV4cGxpY2l0IHdpZHRoIGFuZCBubyBtYXJnaW4tcmlnaHQgaW5jb3JyZWN0bHlcblx0XHRcdC8vIGdldHMgY29tcHV0ZWQgbWFyZ2luLXJpZ2h0IGJhc2VkIG9uIHdpZHRoIG9mIGNvbnRhaW5lci4gKCMzMzMzKVxuXHRcdFx0Ly8gV2ViS2l0IEJ1ZyAxMzM0MyAtIGdldENvbXB1dGVkU3R5bGUgcmV0dXJucyB3cm9uZyB2YWx1ZSBmb3IgbWFyZ2luLXJpZ2h0XG5cdFx0XHQvLyBUaGlzIHN1cHBvcnQgZnVuY3Rpb24gaXMgb25seSBleGVjdXRlZCBvbmNlIHNvIG5vIG1lbW9pemluZyBpcyBuZWVkZWQuXG5cdFx0XHR2YXIgcmV0LFxuXHRcdFx0XHRtYXJnaW5EaXYgPSBkaXYuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKSApO1xuXG5cdFx0XHQvLyBSZXNldCBDU1M6IGJveC1zaXppbmc7IGRpc3BsYXk7IG1hcmdpbjsgYm9yZGVyOyBwYWRkaW5nXG5cdFx0XHRtYXJnaW5EaXYuc3R5bGUuY3NzVGV4dCA9IGRpdi5zdHlsZS5jc3NUZXh0ID1cblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDIuM1xuXHRcdFx0XHQvLyBWZW5kb3ItcHJlZml4IGJveC1zaXppbmdcblx0XHRcdFx0XCItd2Via2l0LWJveC1zaXppbmc6Y29udGVudC1ib3g7Ym94LXNpemluZzpjb250ZW50LWJveDtcIiArXG5cdFx0XHRcdFwiZGlzcGxheTpibG9jazttYXJnaW46MDtib3JkZXI6MDtwYWRkaW5nOjBcIjtcblx0XHRcdG1hcmdpbkRpdi5zdHlsZS5tYXJnaW5SaWdodCA9IG1hcmdpbkRpdi5zdHlsZS53aWR0aCA9IFwiMFwiO1xuXHRcdFx0ZGl2LnN0eWxlLndpZHRoID0gXCIxcHhcIjtcblx0XHRcdGRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZCggY29udGFpbmVyICk7XG5cblx0XHRcdHJldCA9ICFwYXJzZUZsb2F0KCB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSggbWFyZ2luRGl2ICkubWFyZ2luUmlnaHQgKTtcblxuXHRcdFx0ZG9jdW1lbnRFbGVtZW50LnJlbW92ZUNoaWxkKCBjb250YWluZXIgKTtcblx0XHRcdGRpdi5yZW1vdmVDaGlsZCggbWFyZ2luRGl2ICk7XG5cblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fVxuXHR9ICk7XG59ICkoKTtcblxuXG5mdW5jdGlvbiBjdXJDU1MoIGVsZW0sIG5hbWUsIGNvbXB1dGVkICkge1xuXHR2YXIgd2lkdGgsIG1pbldpZHRoLCBtYXhXaWR0aCwgcmV0LFxuXHRcdHN0eWxlID0gZWxlbS5zdHlsZTtcblxuXHRjb21wdXRlZCA9IGNvbXB1dGVkIHx8IGdldFN0eWxlcyggZWxlbSApO1xuXHRyZXQgPSBjb21wdXRlZCA/IGNvbXB1dGVkLmdldFByb3BlcnR5VmFsdWUoIG5hbWUgKSB8fCBjb21wdXRlZFsgbmFtZSBdIDogdW5kZWZpbmVkO1xuXG5cdC8vIFN1cHBvcnQ6IE9wZXJhIDEyLjF4IG9ubHlcblx0Ly8gRmFsbCBiYWNrIHRvIHN0eWxlIGV2ZW4gd2l0aG91dCBjb21wdXRlZFxuXHQvLyBjb21wdXRlZCBpcyB1bmRlZmluZWQgZm9yIGVsZW1zIG9uIGRvY3VtZW50IGZyYWdtZW50c1xuXHRpZiAoICggcmV0ID09PSBcIlwiIHx8IHJldCA9PT0gdW5kZWZpbmVkICkgJiYgIWpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICkgKSB7XG5cdFx0cmV0ID0galF1ZXJ5LnN0eWxlKCBlbGVtLCBuYW1lICk7XG5cdH1cblxuXHQvLyBTdXBwb3J0OiBJRTlcblx0Ly8gZ2V0UHJvcGVydHlWYWx1ZSBpcyBvbmx5IG5lZWRlZCBmb3IgLmNzcygnZmlsdGVyJykgKCMxMjUzNylcblx0aWYgKCBjb21wdXRlZCApIHtcblxuXHRcdC8vIEEgdHJpYnV0ZSB0byB0aGUgXCJhd2Vzb21lIGhhY2sgYnkgRGVhbiBFZHdhcmRzXCJcblx0XHQvLyBBbmRyb2lkIEJyb3dzZXIgcmV0dXJucyBwZXJjZW50YWdlIGZvciBzb21lIHZhbHVlcyxcblx0XHQvLyBidXQgd2lkdGggc2VlbXMgdG8gYmUgcmVsaWFibHkgcGl4ZWxzLlxuXHRcdC8vIFRoaXMgaXMgYWdhaW5zdCB0aGUgQ1NTT00gZHJhZnQgc3BlYzpcblx0XHQvLyBodHRwOi8vZGV2LnczLm9yZy9jc3N3Zy9jc3NvbS8jcmVzb2x2ZWQtdmFsdWVzXG5cdFx0aWYgKCAhc3VwcG9ydC5waXhlbE1hcmdpblJpZ2h0KCkgJiYgcm51bW5vbnB4LnRlc3QoIHJldCApICYmIHJtYXJnaW4udGVzdCggbmFtZSApICkge1xuXG5cdFx0XHQvLyBSZW1lbWJlciB0aGUgb3JpZ2luYWwgdmFsdWVzXG5cdFx0XHR3aWR0aCA9IHN0eWxlLndpZHRoO1xuXHRcdFx0bWluV2lkdGggPSBzdHlsZS5taW5XaWR0aDtcblx0XHRcdG1heFdpZHRoID0gc3R5bGUubWF4V2lkdGg7XG5cblx0XHRcdC8vIFB1dCBpbiB0aGUgbmV3IHZhbHVlcyB0byBnZXQgYSBjb21wdXRlZCB2YWx1ZSBvdXRcblx0XHRcdHN0eWxlLm1pbldpZHRoID0gc3R5bGUubWF4V2lkdGggPSBzdHlsZS53aWR0aCA9IHJldDtcblx0XHRcdHJldCA9IGNvbXB1dGVkLndpZHRoO1xuXG5cdFx0XHQvLyBSZXZlcnQgdGhlIGNoYW5nZWQgdmFsdWVzXG5cdFx0XHRzdHlsZS53aWR0aCA9IHdpZHRoO1xuXHRcdFx0c3R5bGUubWluV2lkdGggPSBtaW5XaWR0aDtcblx0XHRcdHN0eWxlLm1heFdpZHRoID0gbWF4V2lkdGg7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJldCAhPT0gdW5kZWZpbmVkID9cblxuXHRcdC8vIFN1cHBvcnQ6IElFOS0xMStcblx0XHQvLyBJRSByZXR1cm5zIHpJbmRleCB2YWx1ZSBhcyBhbiBpbnRlZ2VyLlxuXHRcdHJldCArIFwiXCIgOlxuXHRcdHJldDtcbn1cblxuXG5mdW5jdGlvbiBhZGRHZXRIb29rSWYoIGNvbmRpdGlvbkZuLCBob29rRm4gKSB7XG5cblx0Ly8gRGVmaW5lIHRoZSBob29rLCB3ZSdsbCBjaGVjayBvbiB0aGUgZmlyc3QgcnVuIGlmIGl0J3MgcmVhbGx5IG5lZWRlZC5cblx0cmV0dXJuIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCBjb25kaXRpb25GbigpICkge1xuXG5cdFx0XHRcdC8vIEhvb2sgbm90IG5lZWRlZCAob3IgaXQncyBub3QgcG9zc2libGUgdG8gdXNlIGl0IGR1ZVxuXHRcdFx0XHQvLyB0byBtaXNzaW5nIGRlcGVuZGVuY3kpLCByZW1vdmUgaXQuXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLmdldDtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBIb29rIG5lZWRlZDsgcmVkZWZpbmUgaXQgc28gdGhhdCB0aGUgc3VwcG9ydCB0ZXN0IGlzIG5vdCBleGVjdXRlZCBhZ2Fpbi5cblx0XHRcdHJldHVybiAoIHRoaXMuZ2V0ID0gaG9va0ZuICkuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdH1cblx0fTtcbn1cblxuXG52YXJcblxuXHQvLyBTd2FwcGFibGUgaWYgZGlzcGxheSBpcyBub25lIG9yIHN0YXJ0cyB3aXRoIHRhYmxlXG5cdC8vIGV4Y2VwdCBcInRhYmxlXCIsIFwidGFibGUtY2VsbFwiLCBvciBcInRhYmxlLWNhcHRpb25cIlxuXHQvLyBTZWUgaGVyZSBmb3IgZGlzcGxheSB2YWx1ZXM6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvQ1NTL2Rpc3BsYXlcblx0cmRpc3BsYXlzd2FwID0gL14obm9uZXx0YWJsZSg/IS1jW2VhXSkuKykvLFxuXG5cdGNzc1Nob3cgPSB7IHBvc2l0aW9uOiBcImFic29sdXRlXCIsIHZpc2liaWxpdHk6IFwiaGlkZGVuXCIsIGRpc3BsYXk6IFwiYmxvY2tcIiB9LFxuXHRjc3NOb3JtYWxUcmFuc2Zvcm0gPSB7XG5cdFx0bGV0dGVyU3BhY2luZzogXCIwXCIsXG5cdFx0Zm9udFdlaWdodDogXCI0MDBcIlxuXHR9LFxuXG5cdGNzc1ByZWZpeGVzID0gWyBcIldlYmtpdFwiLCBcIk9cIiwgXCJNb3pcIiwgXCJtc1wiIF0sXG5cdGVtcHR5U3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkuc3R5bGU7XG5cbi8vIFJldHVybiBhIGNzcyBwcm9wZXJ0eSBtYXBwZWQgdG8gYSBwb3RlbnRpYWxseSB2ZW5kb3IgcHJlZml4ZWQgcHJvcGVydHlcbmZ1bmN0aW9uIHZlbmRvclByb3BOYW1lKCBuYW1lICkge1xuXG5cdC8vIFNob3J0Y3V0IGZvciBuYW1lcyB0aGF0IGFyZSBub3QgdmVuZG9yIHByZWZpeGVkXG5cdGlmICggbmFtZSBpbiBlbXB0eVN0eWxlICkge1xuXHRcdHJldHVybiBuYW1lO1xuXHR9XG5cblx0Ly8gQ2hlY2sgZm9yIHZlbmRvciBwcmVmaXhlZCBuYW1lc1xuXHR2YXIgY2FwTmFtZSA9IG5hbWVbIDAgXS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSggMSApLFxuXHRcdGkgPSBjc3NQcmVmaXhlcy5sZW5ndGg7XG5cblx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0bmFtZSA9IGNzc1ByZWZpeGVzWyBpIF0gKyBjYXBOYW1lO1xuXHRcdGlmICggbmFtZSBpbiBlbXB0eVN0eWxlICkge1xuXHRcdFx0cmV0dXJuIG5hbWU7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIHNldFBvc2l0aXZlTnVtYmVyKCBlbGVtLCB2YWx1ZSwgc3VidHJhY3QgKSB7XG5cblx0Ly8gQW55IHJlbGF0aXZlICgrLy0pIHZhbHVlcyBoYXZlIGFscmVhZHkgYmVlblxuXHQvLyBub3JtYWxpemVkIGF0IHRoaXMgcG9pbnRcblx0dmFyIG1hdGNoZXMgPSByY3NzTnVtLmV4ZWMoIHZhbHVlICk7XG5cdHJldHVybiBtYXRjaGVzID9cblxuXHRcdC8vIEd1YXJkIGFnYWluc3QgdW5kZWZpbmVkIFwic3VidHJhY3RcIiwgZS5nLiwgd2hlbiB1c2VkIGFzIGluIGNzc0hvb2tzXG5cdFx0TWF0aC5tYXgoIDAsIG1hdGNoZXNbIDIgXSAtICggc3VidHJhY3QgfHwgMCApICkgKyAoIG1hdGNoZXNbIDMgXSB8fCBcInB4XCIgKSA6XG5cdFx0dmFsdWU7XG59XG5cbmZ1bmN0aW9uIGF1Z21lbnRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBuYW1lLCBleHRyYSwgaXNCb3JkZXJCb3gsIHN0eWxlcyApIHtcblx0dmFyIGkgPSBleHRyYSA9PT0gKCBpc0JvcmRlckJveCA/IFwiYm9yZGVyXCIgOiBcImNvbnRlbnRcIiApID9cblxuXHRcdC8vIElmIHdlIGFscmVhZHkgaGF2ZSB0aGUgcmlnaHQgbWVhc3VyZW1lbnQsIGF2b2lkIGF1Z21lbnRhdGlvblxuXHRcdDQgOlxuXG5cdFx0Ly8gT3RoZXJ3aXNlIGluaXRpYWxpemUgZm9yIGhvcml6b250YWwgb3IgdmVydGljYWwgcHJvcGVydGllc1xuXHRcdG5hbWUgPT09IFwid2lkdGhcIiA/IDEgOiAwLFxuXG5cdFx0dmFsID0gMDtcblxuXHRmb3IgKCA7IGkgPCA0OyBpICs9IDIgKSB7XG5cblx0XHQvLyBCb3RoIGJveCBtb2RlbHMgZXhjbHVkZSBtYXJnaW4sIHNvIGFkZCBpdCBpZiB3ZSB3YW50IGl0XG5cdFx0aWYgKCBleHRyYSA9PT0gXCJtYXJnaW5cIiApIHtcblx0XHRcdHZhbCArPSBqUXVlcnkuY3NzKCBlbGVtLCBleHRyYSArIGNzc0V4cGFuZFsgaSBdLCB0cnVlLCBzdHlsZXMgKTtcblx0XHR9XG5cblx0XHRpZiAoIGlzQm9yZGVyQm94ICkge1xuXG5cdFx0XHQvLyBib3JkZXItYm94IGluY2x1ZGVzIHBhZGRpbmcsIHNvIHJlbW92ZSBpdCBpZiB3ZSB3YW50IGNvbnRlbnRcblx0XHRcdGlmICggZXh0cmEgPT09IFwiY29udGVudFwiICkge1xuXHRcdFx0XHR2YWwgLT0galF1ZXJ5LmNzcyggZWxlbSwgXCJwYWRkaW5nXCIgKyBjc3NFeHBhbmRbIGkgXSwgdHJ1ZSwgc3R5bGVzICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEF0IHRoaXMgcG9pbnQsIGV4dHJhIGlzbid0IGJvcmRlciBub3IgbWFyZ2luLCBzbyByZW1vdmUgYm9yZGVyXG5cdFx0XHRpZiAoIGV4dHJhICE9PSBcIm1hcmdpblwiICkge1xuXHRcdFx0XHR2YWwgLT0galF1ZXJ5LmNzcyggZWxlbSwgXCJib3JkZXJcIiArIGNzc0V4cGFuZFsgaSBdICsgXCJXaWR0aFwiLCB0cnVlLCBzdHlsZXMgKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBBdCB0aGlzIHBvaW50LCBleHRyYSBpc24ndCBjb250ZW50LCBzbyBhZGQgcGFkZGluZ1xuXHRcdFx0dmFsICs9IGpRdWVyeS5jc3MoIGVsZW0sIFwicGFkZGluZ1wiICsgY3NzRXhwYW5kWyBpIF0sIHRydWUsIHN0eWxlcyApO1xuXG5cdFx0XHQvLyBBdCB0aGlzIHBvaW50LCBleHRyYSBpc24ndCBjb250ZW50IG5vciBwYWRkaW5nLCBzbyBhZGQgYm9yZGVyXG5cdFx0XHRpZiAoIGV4dHJhICE9PSBcInBhZGRpbmdcIiApIHtcblx0XHRcdFx0dmFsICs9IGpRdWVyeS5jc3MoIGVsZW0sIFwiYm9yZGVyXCIgKyBjc3NFeHBhbmRbIGkgXSArIFwiV2lkdGhcIiwgdHJ1ZSwgc3R5bGVzICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHZhbDtcbn1cblxuZnVuY3Rpb24gZ2V0V2lkdGhPckhlaWdodCggZWxlbSwgbmFtZSwgZXh0cmEgKSB7XG5cblx0Ly8gU3RhcnQgd2l0aCBvZmZzZXQgcHJvcGVydHksIHdoaWNoIGlzIGVxdWl2YWxlbnQgdG8gdGhlIGJvcmRlci1ib3ggdmFsdWVcblx0dmFyIHZhbHVlSXNCb3JkZXJCb3ggPSB0cnVlLFxuXHRcdHZhbCA9IG5hbWUgPT09IFwid2lkdGhcIiA/IGVsZW0ub2Zmc2V0V2lkdGggOiBlbGVtLm9mZnNldEhlaWdodCxcblx0XHRzdHlsZXMgPSBnZXRTdHlsZXMoIGVsZW0gKSxcblx0XHRpc0JvcmRlckJveCA9IGpRdWVyeS5jc3MoIGVsZW0sIFwiYm94U2l6aW5nXCIsIGZhbHNlLCBzdHlsZXMgKSA9PT0gXCJib3JkZXItYm94XCI7XG5cblx0Ly8gU3VwcG9ydDogSUUxMSBvbmx5XG5cdC8vIEluIElFIDExIGZ1bGxzY3JlZW4gZWxlbWVudHMgaW5zaWRlIG9mIGFuIGlmcmFtZSBoYXZlXG5cdC8vIDEwMHggdG9vIHNtYWxsIGRpbWVuc2lvbnMgKGdoLTE3NjQpLlxuXHRpZiAoIGRvY3VtZW50Lm1zRnVsbHNjcmVlbkVsZW1lbnQgJiYgd2luZG93LnRvcCAhPT0gd2luZG93ICkge1xuXG5cdFx0Ly8gU3VwcG9ydDogSUUxMSBvbmx5XG5cdFx0Ly8gUnVubmluZyBnZXRCb3VuZGluZ0NsaWVudFJlY3Qgb24gYSBkaXNjb25uZWN0ZWQgbm9kZVxuXHRcdC8vIGluIElFIHRocm93cyBhbiBlcnJvci5cblx0XHRpZiAoIGVsZW0uZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggKSB7XG5cdFx0XHR2YWwgPSBNYXRoLnJvdW5kKCBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpWyBuYW1lIF0gKiAxMDAgKTtcblx0XHR9XG5cdH1cblxuXHQvLyBTb21lIG5vbi1odG1sIGVsZW1lbnRzIHJldHVybiB1bmRlZmluZWQgZm9yIG9mZnNldFdpZHRoLCBzbyBjaGVjayBmb3IgbnVsbC91bmRlZmluZWRcblx0Ly8gc3ZnIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NjQ5Mjg1XG5cdC8vIE1hdGhNTCAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTQ5MTY2OFxuXHRpZiAoIHZhbCA8PSAwIHx8IHZhbCA9PSBudWxsICkge1xuXG5cdFx0Ly8gRmFsbCBiYWNrIHRvIGNvbXB1dGVkIHRoZW4gdW5jb21wdXRlZCBjc3MgaWYgbmVjZXNzYXJ5XG5cdFx0dmFsID0gY3VyQ1NTKCBlbGVtLCBuYW1lLCBzdHlsZXMgKTtcblx0XHRpZiAoIHZhbCA8IDAgfHwgdmFsID09IG51bGwgKSB7XG5cdFx0XHR2YWwgPSBlbGVtLnN0eWxlWyBuYW1lIF07XG5cdFx0fVxuXG5cdFx0Ly8gQ29tcHV0ZWQgdW5pdCBpcyBub3QgcGl4ZWxzLiBTdG9wIGhlcmUgYW5kIHJldHVybi5cblx0XHRpZiAoIHJudW1ub25weC50ZXN0KCB2YWwgKSApIHtcblx0XHRcdHJldHVybiB2YWw7XG5cdFx0fVxuXG5cdFx0Ly8gQ2hlY2sgZm9yIHN0eWxlIGluIGNhc2UgYSBicm93c2VyIHdoaWNoIHJldHVybnMgdW5yZWxpYWJsZSB2YWx1ZXNcblx0XHQvLyBmb3IgZ2V0Q29tcHV0ZWRTdHlsZSBzaWxlbnRseSBmYWxscyBiYWNrIHRvIHRoZSByZWxpYWJsZSBlbGVtLnN0eWxlXG5cdFx0dmFsdWVJc0JvcmRlckJveCA9IGlzQm9yZGVyQm94ICYmXG5cdFx0XHQoIHN1cHBvcnQuYm94U2l6aW5nUmVsaWFibGUoKSB8fCB2YWwgPT09IGVsZW0uc3R5bGVbIG5hbWUgXSApO1xuXG5cdFx0Ly8gTm9ybWFsaXplIFwiXCIsIGF1dG8sIGFuZCBwcmVwYXJlIGZvciBleHRyYVxuXHRcdHZhbCA9IHBhcnNlRmxvYXQoIHZhbCApIHx8IDA7XG5cdH1cblxuXHQvLyBVc2UgdGhlIGFjdGl2ZSBib3gtc2l6aW5nIG1vZGVsIHRvIGFkZC9zdWJ0cmFjdCBpcnJlbGV2YW50IHN0eWxlc1xuXHRyZXR1cm4gKCB2YWwgK1xuXHRcdGF1Z21lbnRXaWR0aE9ySGVpZ2h0KFxuXHRcdFx0ZWxlbSxcblx0XHRcdG5hbWUsXG5cdFx0XHRleHRyYSB8fCAoIGlzQm9yZGVyQm94ID8gXCJib3JkZXJcIiA6IFwiY29udGVudFwiICksXG5cdFx0XHR2YWx1ZUlzQm9yZGVyQm94LFxuXHRcdFx0c3R5bGVzXG5cdFx0KVxuXHQpICsgXCJweFwiO1xufVxuXG5mdW5jdGlvbiBzaG93SGlkZSggZWxlbWVudHMsIHNob3cgKSB7XG5cdHZhciBkaXNwbGF5LCBlbGVtLCBoaWRkZW4sXG5cdFx0dmFsdWVzID0gW10sXG5cdFx0aW5kZXggPSAwLFxuXHRcdGxlbmd0aCA9IGVsZW1lbnRzLmxlbmd0aDtcblxuXHRmb3IgKCA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuXHRcdGVsZW0gPSBlbGVtZW50c1sgaW5kZXggXTtcblx0XHRpZiAoICFlbGVtLnN0eWxlICkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0dmFsdWVzWyBpbmRleCBdID0gZGF0YVByaXYuZ2V0KCBlbGVtLCBcIm9sZGRpc3BsYXlcIiApO1xuXHRcdGRpc3BsYXkgPSBlbGVtLnN0eWxlLmRpc3BsYXk7XG5cdFx0aWYgKCBzaG93ICkge1xuXG5cdFx0XHQvLyBSZXNldCB0aGUgaW5saW5lIGRpc3BsYXkgb2YgdGhpcyBlbGVtZW50IHRvIGxlYXJuIGlmIGl0IGlzXG5cdFx0XHQvLyBiZWluZyBoaWRkZW4gYnkgY2FzY2FkZWQgcnVsZXMgb3Igbm90XG5cdFx0XHRpZiAoICF2YWx1ZXNbIGluZGV4IF0gJiYgZGlzcGxheSA9PT0gXCJub25lXCIgKSB7XG5cdFx0XHRcdGVsZW0uc3R5bGUuZGlzcGxheSA9IFwiXCI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNldCBlbGVtZW50cyB3aGljaCBoYXZlIGJlZW4gb3ZlcnJpZGRlbiB3aXRoIGRpc3BsYXk6IG5vbmVcblx0XHRcdC8vIGluIGEgc3R5bGVzaGVldCB0byB3aGF0ZXZlciB0aGUgZGVmYXVsdCBicm93c2VyIHN0eWxlIGlzXG5cdFx0XHQvLyBmb3Igc3VjaCBhbiBlbGVtZW50XG5cdFx0XHRpZiAoIGVsZW0uc3R5bGUuZGlzcGxheSA9PT0gXCJcIiAmJiBpc0hpZGRlbiggZWxlbSApICkge1xuXHRcdFx0XHR2YWx1ZXNbIGluZGV4IF0gPSBkYXRhUHJpdi5hY2Nlc3MoXG5cdFx0XHRcdFx0ZWxlbSxcblx0XHRcdFx0XHRcIm9sZGRpc3BsYXlcIixcblx0XHRcdFx0XHRkZWZhdWx0RGlzcGxheSggZWxlbS5ub2RlTmFtZSApXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGhpZGRlbiA9IGlzSGlkZGVuKCBlbGVtICk7XG5cblx0XHRcdGlmICggZGlzcGxheSAhPT0gXCJub25lXCIgfHwgIWhpZGRlbiApIHtcblx0XHRcdFx0ZGF0YVByaXYuc2V0KFxuXHRcdFx0XHRcdGVsZW0sXG5cdFx0XHRcdFx0XCJvbGRkaXNwbGF5XCIsXG5cdFx0XHRcdFx0aGlkZGVuID8gZGlzcGxheSA6IGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiIClcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBTZXQgdGhlIGRpc3BsYXkgb2YgbW9zdCBvZiB0aGUgZWxlbWVudHMgaW4gYSBzZWNvbmQgbG9vcFxuXHQvLyB0byBhdm9pZCB0aGUgY29uc3RhbnQgcmVmbG93XG5cdGZvciAoIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG5cdFx0ZWxlbSA9IGVsZW1lbnRzWyBpbmRleCBdO1xuXHRcdGlmICggIWVsZW0uc3R5bGUgKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cdFx0aWYgKCAhc2hvdyB8fCBlbGVtLnN0eWxlLmRpc3BsYXkgPT09IFwibm9uZVwiIHx8IGVsZW0uc3R5bGUuZGlzcGxheSA9PT0gXCJcIiApIHtcblx0XHRcdGVsZW0uc3R5bGUuZGlzcGxheSA9IHNob3cgPyB2YWx1ZXNbIGluZGV4IF0gfHwgXCJcIiA6IFwibm9uZVwiO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBlbGVtZW50cztcbn1cblxualF1ZXJ5LmV4dGVuZCgge1xuXG5cdC8vIEFkZCBpbiBzdHlsZSBwcm9wZXJ0eSBob29rcyBmb3Igb3ZlcnJpZGluZyB0aGUgZGVmYXVsdFxuXHQvLyBiZWhhdmlvciBvZiBnZXR0aW5nIGFuZCBzZXR0aW5nIGEgc3R5bGUgcHJvcGVydHlcblx0Y3NzSG9va3M6IHtcblx0XHRvcGFjaXR5OiB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCApIHtcblx0XHRcdFx0aWYgKCBjb21wdXRlZCApIHtcblxuXHRcdFx0XHRcdC8vIFdlIHNob3VsZCBhbHdheXMgZ2V0IGEgbnVtYmVyIGJhY2sgZnJvbSBvcGFjaXR5XG5cdFx0XHRcdFx0dmFyIHJldCA9IGN1ckNTUyggZWxlbSwgXCJvcGFjaXR5XCIgKTtcblx0XHRcdFx0XHRyZXR1cm4gcmV0ID09PSBcIlwiID8gXCIxXCIgOiByZXQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Ly8gRG9uJ3QgYXV0b21hdGljYWxseSBhZGQgXCJweFwiIHRvIHRoZXNlIHBvc3NpYmx5LXVuaXRsZXNzIHByb3BlcnRpZXNcblx0Y3NzTnVtYmVyOiB7XG5cdFx0XCJhbmltYXRpb25JdGVyYXRpb25Db3VudFwiOiB0cnVlLFxuXHRcdFwiY29sdW1uQ291bnRcIjogdHJ1ZSxcblx0XHRcImZpbGxPcGFjaXR5XCI6IHRydWUsXG5cdFx0XCJmbGV4R3Jvd1wiOiB0cnVlLFxuXHRcdFwiZmxleFNocmlua1wiOiB0cnVlLFxuXHRcdFwiZm9udFdlaWdodFwiOiB0cnVlLFxuXHRcdFwibGluZUhlaWdodFwiOiB0cnVlLFxuXHRcdFwib3BhY2l0eVwiOiB0cnVlLFxuXHRcdFwib3JkZXJcIjogdHJ1ZSxcblx0XHRcIm9ycGhhbnNcIjogdHJ1ZSxcblx0XHRcIndpZG93c1wiOiB0cnVlLFxuXHRcdFwiekluZGV4XCI6IHRydWUsXG5cdFx0XCJ6b29tXCI6IHRydWVcblx0fSxcblxuXHQvLyBBZGQgaW4gcHJvcGVydGllcyB3aG9zZSBuYW1lcyB5b3Ugd2lzaCB0byBmaXggYmVmb3JlXG5cdC8vIHNldHRpbmcgb3IgZ2V0dGluZyB0aGUgdmFsdWVcblx0Y3NzUHJvcHM6IHtcblx0XHRcImZsb2F0XCI6IFwiY3NzRmxvYXRcIlxuXHR9LFxuXG5cdC8vIEdldCBhbmQgc2V0IHRoZSBzdHlsZSBwcm9wZXJ0eSBvbiBhIERPTSBOb2RlXG5cdHN0eWxlOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUsIGV4dHJhICkge1xuXG5cdFx0Ly8gRG9uJ3Qgc2V0IHN0eWxlcyBvbiB0ZXh0IGFuZCBjb21tZW50IG5vZGVzXG5cdFx0aWYgKCAhZWxlbSB8fCBlbGVtLm5vZGVUeXBlID09PSAzIHx8IGVsZW0ubm9kZVR5cGUgPT09IDggfHwgIWVsZW0uc3R5bGUgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgd2UncmUgd29ya2luZyB3aXRoIHRoZSByaWdodCBuYW1lXG5cdFx0dmFyIHJldCwgdHlwZSwgaG9va3MsXG5cdFx0XHRvcmlnTmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIG5hbWUgKSxcblx0XHRcdHN0eWxlID0gZWxlbS5zdHlsZTtcblxuXHRcdG5hbWUgPSBqUXVlcnkuY3NzUHJvcHNbIG9yaWdOYW1lIF0gfHxcblx0XHRcdCggalF1ZXJ5LmNzc1Byb3BzWyBvcmlnTmFtZSBdID0gdmVuZG9yUHJvcE5hbWUoIG9yaWdOYW1lICkgfHwgb3JpZ05hbWUgKTtcblxuXHRcdC8vIEdldHMgaG9vayBmb3IgdGhlIHByZWZpeGVkIHZlcnNpb24sIHRoZW4gdW5wcmVmaXhlZCB2ZXJzaW9uXG5cdFx0aG9va3MgPSBqUXVlcnkuY3NzSG9va3NbIG5hbWUgXSB8fCBqUXVlcnkuY3NzSG9va3NbIG9yaWdOYW1lIF07XG5cblx0XHQvLyBDaGVjayBpZiB3ZSdyZSBzZXR0aW5nIGEgdmFsdWVcblx0XHRpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHR0eXBlID0gdHlwZW9mIHZhbHVlO1xuXG5cdFx0XHQvLyBDb252ZXJ0IFwiKz1cIiBvciBcIi09XCIgdG8gcmVsYXRpdmUgbnVtYmVycyAoIzczNDUpXG5cdFx0XHRpZiAoIHR5cGUgPT09IFwic3RyaW5nXCIgJiYgKCByZXQgPSByY3NzTnVtLmV4ZWMoIHZhbHVlICkgKSAmJiByZXRbIDEgXSApIHtcblx0XHRcdFx0dmFsdWUgPSBhZGp1c3RDU1MoIGVsZW0sIG5hbWUsIHJldCApO1xuXG5cdFx0XHRcdC8vIEZpeGVzIGJ1ZyAjOTIzN1xuXHRcdFx0XHR0eXBlID0gXCJudW1iZXJcIjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTWFrZSBzdXJlIHRoYXQgbnVsbCBhbmQgTmFOIHZhbHVlcyBhcmVuJ3Qgc2V0ICgjNzExNilcblx0XHRcdGlmICggdmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdmFsdWUgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgYSBudW1iZXIgd2FzIHBhc3NlZCBpbiwgYWRkIHRoZSB1bml0IChleGNlcHQgZm9yIGNlcnRhaW4gQ1NTIHByb3BlcnRpZXMpXG5cdFx0XHRpZiAoIHR5cGUgPT09IFwibnVtYmVyXCIgKSB7XG5cdFx0XHRcdHZhbHVlICs9IHJldCAmJiByZXRbIDMgXSB8fCAoIGpRdWVyeS5jc3NOdW1iZXJbIG9yaWdOYW1lIF0gPyBcIlwiIDogXCJweFwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFOS0xMStcblx0XHRcdC8vIGJhY2tncm91bmQtKiBwcm9wcyBhZmZlY3Qgb3JpZ2luYWwgY2xvbmUncyB2YWx1ZXNcblx0XHRcdGlmICggIXN1cHBvcnQuY2xlYXJDbG9uZVN0eWxlICYmIHZhbHVlID09PSBcIlwiICYmIG5hbWUuaW5kZXhPZiggXCJiYWNrZ3JvdW5kXCIgKSA9PT0gMCApIHtcblx0XHRcdFx0c3R5bGVbIG5hbWUgXSA9IFwiaW5oZXJpdFwiO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBhIGhvb2sgd2FzIHByb3ZpZGVkLCB1c2UgdGhhdCB2YWx1ZSwgb3RoZXJ3aXNlIGp1c3Qgc2V0IHRoZSBzcGVjaWZpZWQgdmFsdWVcblx0XHRcdGlmICggIWhvb2tzIHx8ICEoIFwic2V0XCIgaW4gaG9va3MgKSB8fFxuXHRcdFx0XHQoIHZhbHVlID0gaG9va3Muc2V0KCBlbGVtLCB2YWx1ZSwgZXh0cmEgKSApICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0c3R5bGVbIG5hbWUgXSA9IHZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gSWYgYSBob29rIHdhcyBwcm92aWRlZCBnZXQgdGhlIG5vbi1jb21wdXRlZCB2YWx1ZSBmcm9tIHRoZXJlXG5cdFx0XHRpZiAoIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgJiZcblx0XHRcdFx0KCByZXQgPSBob29rcy5nZXQoIGVsZW0sIGZhbHNlLCBleHRyYSApICkgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBPdGhlcndpc2UganVzdCBnZXQgdGhlIHZhbHVlIGZyb20gdGhlIHN0eWxlIG9iamVjdFxuXHRcdFx0cmV0dXJuIHN0eWxlWyBuYW1lIF07XG5cdFx0fVxuXHR9LFxuXG5cdGNzczogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGV4dHJhLCBzdHlsZXMgKSB7XG5cdFx0dmFyIHZhbCwgbnVtLCBob29rcyxcblx0XHRcdG9yaWdOYW1lID0galF1ZXJ5LmNhbWVsQ2FzZSggbmFtZSApO1xuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgd2UncmUgd29ya2luZyB3aXRoIHRoZSByaWdodCBuYW1lXG5cdFx0bmFtZSA9IGpRdWVyeS5jc3NQcm9wc1sgb3JpZ05hbWUgXSB8fFxuXHRcdFx0KCBqUXVlcnkuY3NzUHJvcHNbIG9yaWdOYW1lIF0gPSB2ZW5kb3JQcm9wTmFtZSggb3JpZ05hbWUgKSB8fCBvcmlnTmFtZSApO1xuXG5cdFx0Ly8gVHJ5IHByZWZpeGVkIG5hbWUgZm9sbG93ZWQgYnkgdGhlIHVucHJlZml4ZWQgbmFtZVxuXHRcdGhvb2tzID0galF1ZXJ5LmNzc0hvb2tzWyBuYW1lIF0gfHwgalF1ZXJ5LmNzc0hvb2tzWyBvcmlnTmFtZSBdO1xuXG5cdFx0Ly8gSWYgYSBob29rIHdhcyBwcm92aWRlZCBnZXQgdGhlIGNvbXB1dGVkIHZhbHVlIGZyb20gdGhlcmVcblx0XHRpZiAoIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgKSB7XG5cdFx0XHR2YWwgPSBob29rcy5nZXQoIGVsZW0sIHRydWUsIGV4dHJhICk7XG5cdFx0fVxuXG5cdFx0Ly8gT3RoZXJ3aXNlLCBpZiBhIHdheSB0byBnZXQgdGhlIGNvbXB1dGVkIHZhbHVlIGV4aXN0cywgdXNlIHRoYXRcblx0XHRpZiAoIHZhbCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0dmFsID0gY3VyQ1NTKCBlbGVtLCBuYW1lLCBzdHlsZXMgKTtcblx0XHR9XG5cblx0XHQvLyBDb252ZXJ0IFwibm9ybWFsXCIgdG8gY29tcHV0ZWQgdmFsdWVcblx0XHRpZiAoIHZhbCA9PT0gXCJub3JtYWxcIiAmJiBuYW1lIGluIGNzc05vcm1hbFRyYW5zZm9ybSApIHtcblx0XHRcdHZhbCA9IGNzc05vcm1hbFRyYW5zZm9ybVsgbmFtZSBdO1xuXHRcdH1cblxuXHRcdC8vIE1ha2UgbnVtZXJpYyBpZiBmb3JjZWQgb3IgYSBxdWFsaWZpZXIgd2FzIHByb3ZpZGVkIGFuZCB2YWwgbG9va3MgbnVtZXJpY1xuXHRcdGlmICggZXh0cmEgPT09IFwiXCIgfHwgZXh0cmEgKSB7XG5cdFx0XHRudW0gPSBwYXJzZUZsb2F0KCB2YWwgKTtcblx0XHRcdHJldHVybiBleHRyYSA9PT0gdHJ1ZSB8fCBpc0Zpbml0ZSggbnVtICkgPyBudW0gfHwgMCA6IHZhbDtcblx0XHR9XG5cdFx0cmV0dXJuIHZhbDtcblx0fVxufSApO1xuXG5qUXVlcnkuZWFjaCggWyBcImhlaWdodFwiLCBcIndpZHRoXCIgXSwgZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cdGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdID0ge1xuXHRcdGdldDogZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkLCBleHRyYSApIHtcblx0XHRcdGlmICggY29tcHV0ZWQgKSB7XG5cblx0XHRcdFx0Ly8gQ2VydGFpbiBlbGVtZW50cyBjYW4gaGF2ZSBkaW1lbnNpb24gaW5mbyBpZiB3ZSBpbnZpc2libHkgc2hvdyB0aGVtXG5cdFx0XHRcdC8vIGJ1dCBpdCBtdXN0IGhhdmUgYSBjdXJyZW50IGRpc3BsYXkgc3R5bGUgdGhhdCB3b3VsZCBiZW5lZml0XG5cdFx0XHRcdHJldHVybiByZGlzcGxheXN3YXAudGVzdCggalF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKSApICYmXG5cdFx0XHRcdFx0ZWxlbS5vZmZzZXRXaWR0aCA9PT0gMCA/XG5cdFx0XHRcdFx0XHRzd2FwKCBlbGVtLCBjc3NTaG93LCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGdldFdpZHRoT3JIZWlnaHQoIGVsZW0sIG5hbWUsIGV4dHJhICk7XG5cdFx0XHRcdFx0XHR9ICkgOlxuXHRcdFx0XHRcdFx0Z2V0V2lkdGhPckhlaWdodCggZWxlbSwgbmFtZSwgZXh0cmEgKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0c2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUsIGV4dHJhICkge1xuXHRcdFx0dmFyIG1hdGNoZXMsXG5cdFx0XHRcdHN0eWxlcyA9IGV4dHJhICYmIGdldFN0eWxlcyggZWxlbSApLFxuXHRcdFx0XHRzdWJ0cmFjdCA9IGV4dHJhICYmIGF1Z21lbnRXaWR0aE9ySGVpZ2h0KFxuXHRcdFx0XHRcdGVsZW0sXG5cdFx0XHRcdFx0bmFtZSxcblx0XHRcdFx0XHRleHRyYSxcblx0XHRcdFx0XHRqUXVlcnkuY3NzKCBlbGVtLCBcImJveFNpemluZ1wiLCBmYWxzZSwgc3R5bGVzICkgPT09IFwiYm9yZGVyLWJveFwiLFxuXHRcdFx0XHRcdHN0eWxlc1xuXHRcdFx0XHQpO1xuXG5cdFx0XHQvLyBDb252ZXJ0IHRvIHBpeGVscyBpZiB2YWx1ZSBhZGp1c3RtZW50IGlzIG5lZWRlZFxuXHRcdFx0aWYgKCBzdWJ0cmFjdCAmJiAoIG1hdGNoZXMgPSByY3NzTnVtLmV4ZWMoIHZhbHVlICkgKSAmJlxuXHRcdFx0XHQoIG1hdGNoZXNbIDMgXSB8fCBcInB4XCIgKSAhPT0gXCJweFwiICkge1xuXG5cdFx0XHRcdGVsZW0uc3R5bGVbIG5hbWUgXSA9IHZhbHVlO1xuXHRcdFx0XHR2YWx1ZSA9IGpRdWVyeS5jc3MoIGVsZW0sIG5hbWUgKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHNldFBvc2l0aXZlTnVtYmVyKCBlbGVtLCB2YWx1ZSwgc3VidHJhY3QgKTtcblx0XHR9XG5cdH07XG59ICk7XG5cbmpRdWVyeS5jc3NIb29rcy5tYXJnaW5MZWZ0ID0gYWRkR2V0SG9va0lmKCBzdXBwb3J0LnJlbGlhYmxlTWFyZ2luTGVmdCxcblx0ZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkICkge1xuXHRcdGlmICggY29tcHV0ZWQgKSB7XG5cdFx0XHRyZXR1cm4gKCBwYXJzZUZsb2F0KCBjdXJDU1MoIGVsZW0sIFwibWFyZ2luTGVmdFwiICkgKSB8fFxuXHRcdFx0XHRlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLVxuXHRcdFx0XHRcdHN3YXAoIGVsZW0sIHsgbWFyZ2luTGVmdDogMCB9LCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG5cdFx0XHRcdFx0fSApXG5cdFx0XHRcdCkgKyBcInB4XCI7XG5cdFx0fVxuXHR9XG4pO1xuXG4vLyBTdXBwb3J0OiBBbmRyb2lkIDIuM1xualF1ZXJ5LmNzc0hvb2tzLm1hcmdpblJpZ2h0ID0gYWRkR2V0SG9va0lmKCBzdXBwb3J0LnJlbGlhYmxlTWFyZ2luUmlnaHQsXG5cdGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCApIHtcblx0XHRpZiAoIGNvbXB1dGVkICkge1xuXHRcdFx0cmV0dXJuIHN3YXAoIGVsZW0sIHsgXCJkaXNwbGF5XCI6IFwiaW5saW5lLWJsb2NrXCIgfSxcblx0XHRcdFx0Y3VyQ1NTLCBbIGVsZW0sIFwibWFyZ2luUmlnaHRcIiBdICk7XG5cdFx0fVxuXHR9XG4pO1xuXG4vLyBUaGVzZSBob29rcyBhcmUgdXNlZCBieSBhbmltYXRlIHRvIGV4cGFuZCBwcm9wZXJ0aWVzXG5qUXVlcnkuZWFjaCgge1xuXHRtYXJnaW46IFwiXCIsXG5cdHBhZGRpbmc6IFwiXCIsXG5cdGJvcmRlcjogXCJXaWR0aFwiXG59LCBmdW5jdGlvbiggcHJlZml4LCBzdWZmaXggKSB7XG5cdGpRdWVyeS5jc3NIb29rc1sgcHJlZml4ICsgc3VmZml4IF0gPSB7XG5cdFx0ZXhwYW5kOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHR2YXIgaSA9IDAsXG5cdFx0XHRcdGV4cGFuZGVkID0ge30sXG5cblx0XHRcdFx0Ly8gQXNzdW1lcyBhIHNpbmdsZSBudW1iZXIgaWYgbm90IGEgc3RyaW5nXG5cdFx0XHRcdHBhcnRzID0gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiID8gdmFsdWUuc3BsaXQoIFwiIFwiICkgOiBbIHZhbHVlIF07XG5cblx0XHRcdGZvciAoIDsgaSA8IDQ7IGkrKyApIHtcblx0XHRcdFx0ZXhwYW5kZWRbIHByZWZpeCArIGNzc0V4cGFuZFsgaSBdICsgc3VmZml4IF0gPVxuXHRcdFx0XHRcdHBhcnRzWyBpIF0gfHwgcGFydHNbIGkgLSAyIF0gfHwgcGFydHNbIDAgXTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGV4cGFuZGVkO1xuXHRcdH1cblx0fTtcblxuXHRpZiAoICFybWFyZ2luLnRlc3QoIHByZWZpeCApICkge1xuXHRcdGpRdWVyeS5jc3NIb29rc1sgcHJlZml4ICsgc3VmZml4IF0uc2V0ID0gc2V0UG9zaXRpdmVOdW1iZXI7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRjc3M6IGZ1bmN0aW9uKCBuYW1lLCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG5cdFx0XHR2YXIgc3R5bGVzLCBsZW4sXG5cdFx0XHRcdG1hcCA9IHt9LFxuXHRcdFx0XHRpID0gMDtcblxuXHRcdFx0aWYgKCBqUXVlcnkuaXNBcnJheSggbmFtZSApICkge1xuXHRcdFx0XHRzdHlsZXMgPSBnZXRTdHlsZXMoIGVsZW0gKTtcblx0XHRcdFx0bGVuID0gbmFtZS5sZW5ndGg7XG5cblx0XHRcdFx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRcdFx0bWFwWyBuYW1lWyBpIF0gXSA9IGpRdWVyeS5jc3MoIGVsZW0sIG5hbWVbIGkgXSwgZmFsc2UsIHN0eWxlcyApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIG1hcDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgP1xuXHRcdFx0XHRqUXVlcnkuc3R5bGUoIGVsZW0sIG5hbWUsIHZhbHVlICkgOlxuXHRcdFx0XHRqUXVlcnkuY3NzKCBlbGVtLCBuYW1lICk7XG5cdFx0fSwgbmFtZSwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAxICk7XG5cdH0sXG5cdHNob3c6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBzaG93SGlkZSggdGhpcywgdHJ1ZSApO1xuXHR9LFxuXHRoaWRlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gc2hvd0hpZGUoIHRoaXMgKTtcblx0fSxcblx0dG9nZ2xlOiBmdW5jdGlvbiggc3RhdGUgKSB7XG5cdFx0aWYgKCB0eXBlb2Ygc3RhdGUgPT09IFwiYm9vbGVhblwiICkge1xuXHRcdFx0cmV0dXJuIHN0YXRlID8gdGhpcy5zaG93KCkgOiB0aGlzLmhpZGUoKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggaXNIaWRkZW4oIHRoaXMgKSApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkuc2hvdygpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkuaGlkZSgpO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fVxufSApO1xuXG5cbmZ1bmN0aW9uIFR3ZWVuKCBlbGVtLCBvcHRpb25zLCBwcm9wLCBlbmQsIGVhc2luZyApIHtcblx0cmV0dXJuIG5ldyBUd2Vlbi5wcm90b3R5cGUuaW5pdCggZWxlbSwgb3B0aW9ucywgcHJvcCwgZW5kLCBlYXNpbmcgKTtcbn1cbmpRdWVyeS5Ud2VlbiA9IFR3ZWVuO1xuXG5Ud2Vlbi5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBUd2Vlbixcblx0aW5pdDogZnVuY3Rpb24oIGVsZW0sIG9wdGlvbnMsIHByb3AsIGVuZCwgZWFzaW5nLCB1bml0ICkge1xuXHRcdHRoaXMuZWxlbSA9IGVsZW07XG5cdFx0dGhpcy5wcm9wID0gcHJvcDtcblx0XHR0aGlzLmVhc2luZyA9IGVhc2luZyB8fCBqUXVlcnkuZWFzaW5nLl9kZWZhdWx0O1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdFx0dGhpcy5zdGFydCA9IHRoaXMubm93ID0gdGhpcy5jdXIoKTtcblx0XHR0aGlzLmVuZCA9IGVuZDtcblx0XHR0aGlzLnVuaXQgPSB1bml0IHx8ICggalF1ZXJ5LmNzc051bWJlclsgcHJvcCBdID8gXCJcIiA6IFwicHhcIiApO1xuXHR9LFxuXHRjdXI6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBob29rcyA9IFR3ZWVuLnByb3BIb29rc1sgdGhpcy5wcm9wIF07XG5cblx0XHRyZXR1cm4gaG9va3MgJiYgaG9va3MuZ2V0ID9cblx0XHRcdGhvb2tzLmdldCggdGhpcyApIDpcblx0XHRcdFR3ZWVuLnByb3BIb29rcy5fZGVmYXVsdC5nZXQoIHRoaXMgKTtcblx0fSxcblx0cnVuOiBmdW5jdGlvbiggcGVyY2VudCApIHtcblx0XHR2YXIgZWFzZWQsXG5cdFx0XHRob29rcyA9IFR3ZWVuLnByb3BIb29rc1sgdGhpcy5wcm9wIF07XG5cblx0XHRpZiAoIHRoaXMub3B0aW9ucy5kdXJhdGlvbiApIHtcblx0XHRcdHRoaXMucG9zID0gZWFzZWQgPSBqUXVlcnkuZWFzaW5nWyB0aGlzLmVhc2luZyBdKFxuXHRcdFx0XHRwZXJjZW50LCB0aGlzLm9wdGlvbnMuZHVyYXRpb24gKiBwZXJjZW50LCAwLCAxLCB0aGlzLm9wdGlvbnMuZHVyYXRpb25cblx0XHRcdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMucG9zID0gZWFzZWQgPSBwZXJjZW50O1xuXHRcdH1cblx0XHR0aGlzLm5vdyA9ICggdGhpcy5lbmQgLSB0aGlzLnN0YXJ0ICkgKiBlYXNlZCArIHRoaXMuc3RhcnQ7XG5cblx0XHRpZiAoIHRoaXMub3B0aW9ucy5zdGVwICkge1xuXHRcdFx0dGhpcy5vcHRpb25zLnN0ZXAuY2FsbCggdGhpcy5lbGVtLCB0aGlzLm5vdywgdGhpcyApO1xuXHRcdH1cblxuXHRcdGlmICggaG9va3MgJiYgaG9va3Muc2V0ICkge1xuXHRcdFx0aG9va3Muc2V0KCB0aGlzICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdFR3ZWVuLnByb3BIb29rcy5fZGVmYXVsdC5zZXQoIHRoaXMgKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn07XG5cblR3ZWVuLnByb3RvdHlwZS5pbml0LnByb3RvdHlwZSA9IFR3ZWVuLnByb3RvdHlwZTtcblxuVHdlZW4ucHJvcEhvb2tzID0ge1xuXHRfZGVmYXVsdDoge1xuXHRcdGdldDogZnVuY3Rpb24oIHR3ZWVuICkge1xuXHRcdFx0dmFyIHJlc3VsdDtcblxuXHRcdFx0Ly8gVXNlIGEgcHJvcGVydHkgb24gdGhlIGVsZW1lbnQgZGlyZWN0bHkgd2hlbiBpdCBpcyBub3QgYSBET00gZWxlbWVudCxcblx0XHRcdC8vIG9yIHdoZW4gdGhlcmUgaXMgbm8gbWF0Y2hpbmcgc3R5bGUgcHJvcGVydHkgdGhhdCBleGlzdHMuXG5cdFx0XHRpZiAoIHR3ZWVuLmVsZW0ubm9kZVR5cGUgIT09IDEgfHxcblx0XHRcdFx0dHdlZW4uZWxlbVsgdHdlZW4ucHJvcCBdICE9IG51bGwgJiYgdHdlZW4uZWxlbS5zdHlsZVsgdHdlZW4ucHJvcCBdID09IG51bGwgKSB7XG5cdFx0XHRcdHJldHVybiB0d2Vlbi5lbGVtWyB0d2Vlbi5wcm9wIF07XG5cdFx0XHR9XG5cblx0XHRcdC8vIFBhc3NpbmcgYW4gZW1wdHkgc3RyaW5nIGFzIGEgM3JkIHBhcmFtZXRlciB0byAuY3NzIHdpbGwgYXV0b21hdGljYWxseVxuXHRcdFx0Ly8gYXR0ZW1wdCBhIHBhcnNlRmxvYXQgYW5kIGZhbGxiYWNrIHRvIGEgc3RyaW5nIGlmIHRoZSBwYXJzZSBmYWlscy5cblx0XHRcdC8vIFNpbXBsZSB2YWx1ZXMgc3VjaCBhcyBcIjEwcHhcIiBhcmUgcGFyc2VkIHRvIEZsb2F0O1xuXHRcdFx0Ly8gY29tcGxleCB2YWx1ZXMgc3VjaCBhcyBcInJvdGF0ZSgxcmFkKVwiIGFyZSByZXR1cm5lZCBhcy1pcy5cblx0XHRcdHJlc3VsdCA9IGpRdWVyeS5jc3MoIHR3ZWVuLmVsZW0sIHR3ZWVuLnByb3AsIFwiXCIgKTtcblxuXHRcdFx0Ly8gRW1wdHkgc3RyaW5ncywgbnVsbCwgdW5kZWZpbmVkIGFuZCBcImF1dG9cIiBhcmUgY29udmVydGVkIHRvIDAuXG5cdFx0XHRyZXR1cm4gIXJlc3VsdCB8fCByZXN1bHQgPT09IFwiYXV0b1wiID8gMCA6IHJlc3VsdDtcblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24oIHR3ZWVuICkge1xuXG5cdFx0XHQvLyBVc2Ugc3RlcCBob29rIGZvciBiYWNrIGNvbXBhdC5cblx0XHRcdC8vIFVzZSBjc3NIb29rIGlmIGl0cyB0aGVyZS5cblx0XHRcdC8vIFVzZSAuc3R5bGUgaWYgYXZhaWxhYmxlIGFuZCB1c2UgcGxhaW4gcHJvcGVydGllcyB3aGVyZSBhdmFpbGFibGUuXG5cdFx0XHRpZiAoIGpRdWVyeS5meC5zdGVwWyB0d2Vlbi5wcm9wIF0gKSB7XG5cdFx0XHRcdGpRdWVyeS5meC5zdGVwWyB0d2Vlbi5wcm9wIF0oIHR3ZWVuICk7XG5cdFx0XHR9IGVsc2UgaWYgKCB0d2Vlbi5lbGVtLm5vZGVUeXBlID09PSAxICYmXG5cdFx0XHRcdCggdHdlZW4uZWxlbS5zdHlsZVsgalF1ZXJ5LmNzc1Byb3BzWyB0d2Vlbi5wcm9wIF0gXSAhPSBudWxsIHx8XG5cdFx0XHRcdFx0alF1ZXJ5LmNzc0hvb2tzWyB0d2Vlbi5wcm9wIF0gKSApIHtcblx0XHRcdFx0alF1ZXJ5LnN0eWxlKCB0d2Vlbi5lbGVtLCB0d2Vlbi5wcm9wLCB0d2Vlbi5ub3cgKyB0d2Vlbi51bml0ICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0d2Vlbi5lbGVtWyB0d2Vlbi5wcm9wIF0gPSB0d2Vlbi5ub3c7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59O1xuXG4vLyBTdXBwb3J0OiBJRTlcbi8vIFBhbmljIGJhc2VkIGFwcHJvYWNoIHRvIHNldHRpbmcgdGhpbmdzIG9uIGRpc2Nvbm5lY3RlZCBub2Rlc1xuVHdlZW4ucHJvcEhvb2tzLnNjcm9sbFRvcCA9IFR3ZWVuLnByb3BIb29rcy5zY3JvbGxMZWZ0ID0ge1xuXHRzZXQ6IGZ1bmN0aW9uKCB0d2VlbiApIHtcblx0XHRpZiAoIHR3ZWVuLmVsZW0ubm9kZVR5cGUgJiYgdHdlZW4uZWxlbS5wYXJlbnROb2RlICkge1xuXHRcdFx0dHdlZW4uZWxlbVsgdHdlZW4ucHJvcCBdID0gdHdlZW4ubm93O1xuXHRcdH1cblx0fVxufTtcblxualF1ZXJ5LmVhc2luZyA9IHtcblx0bGluZWFyOiBmdW5jdGlvbiggcCApIHtcblx0XHRyZXR1cm4gcDtcblx0fSxcblx0c3dpbmc6IGZ1bmN0aW9uKCBwICkge1xuXHRcdHJldHVybiAwLjUgLSBNYXRoLmNvcyggcCAqIE1hdGguUEkgKSAvIDI7XG5cdH0sXG5cdF9kZWZhdWx0OiBcInN3aW5nXCJcbn07XG5cbmpRdWVyeS5meCA9IFR3ZWVuLnByb3RvdHlwZS5pbml0O1xuXG4vLyBCYWNrIENvbXBhdCA8MS44IGV4dGVuc2lvbiBwb2ludFxualF1ZXJ5LmZ4LnN0ZXAgPSB7fTtcblxuXG5cblxudmFyXG5cdGZ4Tm93LCB0aW1lcklkLFxuXHRyZnh0eXBlcyA9IC9eKD86dG9nZ2xlfHNob3d8aGlkZSkkLyxcblx0cnJ1biA9IC9xdWV1ZUhvb2tzJC87XG5cbi8vIEFuaW1hdGlvbnMgY3JlYXRlZCBzeW5jaHJvbm91c2x5IHdpbGwgcnVuIHN5bmNocm9ub3VzbHlcbmZ1bmN0aW9uIGNyZWF0ZUZ4Tm93KCkge1xuXHR3aW5kb3cuc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG5cdFx0ZnhOb3cgPSB1bmRlZmluZWQ7XG5cdH0gKTtcblx0cmV0dXJuICggZnhOb3cgPSBqUXVlcnkubm93KCkgKTtcbn1cblxuLy8gR2VuZXJhdGUgcGFyYW1ldGVycyB0byBjcmVhdGUgYSBzdGFuZGFyZCBhbmltYXRpb25cbmZ1bmN0aW9uIGdlbkZ4KCB0eXBlLCBpbmNsdWRlV2lkdGggKSB7XG5cdHZhciB3aGljaCxcblx0XHRpID0gMCxcblx0XHRhdHRycyA9IHsgaGVpZ2h0OiB0eXBlIH07XG5cblx0Ly8gSWYgd2UgaW5jbHVkZSB3aWR0aCwgc3RlcCB2YWx1ZSBpcyAxIHRvIGRvIGFsbCBjc3NFeHBhbmQgdmFsdWVzLFxuXHQvLyBvdGhlcndpc2Ugc3RlcCB2YWx1ZSBpcyAyIHRvIHNraXAgb3ZlciBMZWZ0IGFuZCBSaWdodFxuXHRpbmNsdWRlV2lkdGggPSBpbmNsdWRlV2lkdGggPyAxIDogMDtcblx0Zm9yICggOyBpIDwgNCA7IGkgKz0gMiAtIGluY2x1ZGVXaWR0aCApIHtcblx0XHR3aGljaCA9IGNzc0V4cGFuZFsgaSBdO1xuXHRcdGF0dHJzWyBcIm1hcmdpblwiICsgd2hpY2ggXSA9IGF0dHJzWyBcInBhZGRpbmdcIiArIHdoaWNoIF0gPSB0eXBlO1xuXHR9XG5cblx0aWYgKCBpbmNsdWRlV2lkdGggKSB7XG5cdFx0YXR0cnMub3BhY2l0eSA9IGF0dHJzLndpZHRoID0gdHlwZTtcblx0fVxuXG5cdHJldHVybiBhdHRycztcbn1cblxuZnVuY3Rpb24gY3JlYXRlVHdlZW4oIHZhbHVlLCBwcm9wLCBhbmltYXRpb24gKSB7XG5cdHZhciB0d2Vlbixcblx0XHRjb2xsZWN0aW9uID0gKCBBbmltYXRpb24udHdlZW5lcnNbIHByb3AgXSB8fCBbXSApLmNvbmNhdCggQW5pbWF0aW9uLnR3ZWVuZXJzWyBcIipcIiBdICksXG5cdFx0aW5kZXggPSAwLFxuXHRcdGxlbmd0aCA9IGNvbGxlY3Rpb24ubGVuZ3RoO1xuXHRmb3IgKCA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuXHRcdGlmICggKCB0d2VlbiA9IGNvbGxlY3Rpb25bIGluZGV4IF0uY2FsbCggYW5pbWF0aW9uLCBwcm9wLCB2YWx1ZSApICkgKSB7XG5cblx0XHRcdC8vIFdlJ3JlIGRvbmUgd2l0aCB0aGlzIHByb3BlcnR5XG5cdFx0XHRyZXR1cm4gdHdlZW47XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRQcmVmaWx0ZXIoIGVsZW0sIHByb3BzLCBvcHRzICkge1xuXHQvKiBqc2hpbnQgdmFsaWR0aGlzOiB0cnVlICovXG5cdHZhciBwcm9wLCB2YWx1ZSwgdG9nZ2xlLCB0d2VlbiwgaG9va3MsIG9sZGZpcmUsIGRpc3BsYXksIGNoZWNrRGlzcGxheSxcblx0XHRhbmltID0gdGhpcyxcblx0XHRvcmlnID0ge30sXG5cdFx0c3R5bGUgPSBlbGVtLnN0eWxlLFxuXHRcdGhpZGRlbiA9IGVsZW0ubm9kZVR5cGUgJiYgaXNIaWRkZW4oIGVsZW0gKSxcblx0XHRkYXRhU2hvdyA9IGRhdGFQcml2LmdldCggZWxlbSwgXCJmeHNob3dcIiApO1xuXG5cdC8vIEhhbmRsZSBxdWV1ZTogZmFsc2UgcHJvbWlzZXNcblx0aWYgKCAhb3B0cy5xdWV1ZSApIHtcblx0XHRob29rcyA9IGpRdWVyeS5fcXVldWVIb29rcyggZWxlbSwgXCJmeFwiICk7XG5cdFx0aWYgKCBob29rcy51bnF1ZXVlZCA9PSBudWxsICkge1xuXHRcdFx0aG9va3MudW5xdWV1ZWQgPSAwO1xuXHRcdFx0b2xkZmlyZSA9IGhvb2tzLmVtcHR5LmZpcmU7XG5cdFx0XHRob29rcy5lbXB0eS5maXJlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggIWhvb2tzLnVucXVldWVkICkge1xuXHRcdFx0XHRcdG9sZGZpcmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9XG5cdFx0aG9va3MudW5xdWV1ZWQrKztcblxuXHRcdGFuaW0uYWx3YXlzKCBmdW5jdGlvbigpIHtcblxuXHRcdFx0Ly8gRW5zdXJlIHRoZSBjb21wbGV0ZSBoYW5kbGVyIGlzIGNhbGxlZCBiZWZvcmUgdGhpcyBjb21wbGV0ZXNcblx0XHRcdGFuaW0uYWx3YXlzKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0aG9va3MudW5xdWV1ZWQtLTtcblx0XHRcdFx0aWYgKCAhalF1ZXJ5LnF1ZXVlKCBlbGVtLCBcImZ4XCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdFx0aG9va3MuZW1wdHkuZmlyZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9ICk7XG5cdFx0fSApO1xuXHR9XG5cblx0Ly8gSGVpZ2h0L3dpZHRoIG92ZXJmbG93IHBhc3Ncblx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICYmICggXCJoZWlnaHRcIiBpbiBwcm9wcyB8fCBcIndpZHRoXCIgaW4gcHJvcHMgKSApIHtcblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGF0IG5vdGhpbmcgc25lYWtzIG91dFxuXHRcdC8vIFJlY29yZCBhbGwgMyBvdmVyZmxvdyBhdHRyaWJ1dGVzIGJlY2F1c2UgSUU5LTEwIGRvIG5vdFxuXHRcdC8vIGNoYW5nZSB0aGUgb3ZlcmZsb3cgYXR0cmlidXRlIHdoZW4gb3ZlcmZsb3dYIGFuZFxuXHRcdC8vIG92ZXJmbG93WSBhcmUgc2V0IHRvIHRoZSBzYW1lIHZhbHVlXG5cdFx0b3B0cy5vdmVyZmxvdyA9IFsgc3R5bGUub3ZlcmZsb3csIHN0eWxlLm92ZXJmbG93WCwgc3R5bGUub3ZlcmZsb3dZIF07XG5cblx0XHQvLyBTZXQgZGlzcGxheSBwcm9wZXJ0eSB0byBpbmxpbmUtYmxvY2sgZm9yIGhlaWdodC93aWR0aFxuXHRcdC8vIGFuaW1hdGlvbnMgb24gaW5saW5lIGVsZW1lbnRzIHRoYXQgYXJlIGhhdmluZyB3aWR0aC9oZWlnaHQgYW5pbWF0ZWRcblx0XHRkaXNwbGF5ID0galF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKTtcblxuXHRcdC8vIFRlc3QgZGVmYXVsdCBkaXNwbGF5IGlmIGRpc3BsYXkgaXMgY3VycmVudGx5IFwibm9uZVwiXG5cdFx0Y2hlY2tEaXNwbGF5ID0gZGlzcGxheSA9PT0gXCJub25lXCIgP1xuXHRcdFx0ZGF0YVByaXYuZ2V0KCBlbGVtLCBcIm9sZGRpc3BsYXlcIiApIHx8IGRlZmF1bHREaXNwbGF5KCBlbGVtLm5vZGVOYW1lICkgOiBkaXNwbGF5O1xuXG5cdFx0aWYgKCBjaGVja0Rpc3BsYXkgPT09IFwiaW5saW5lXCIgJiYgalF1ZXJ5LmNzcyggZWxlbSwgXCJmbG9hdFwiICkgPT09IFwibm9uZVwiICkge1xuXHRcdFx0c3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG5cdFx0fVxuXHR9XG5cblx0aWYgKCBvcHRzLm92ZXJmbG93ICkge1xuXHRcdHN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcblx0XHRhbmltLmFsd2F5cyggZnVuY3Rpb24oKSB7XG5cdFx0XHRzdHlsZS5vdmVyZmxvdyA9IG9wdHMub3ZlcmZsb3dbIDAgXTtcblx0XHRcdHN0eWxlLm92ZXJmbG93WCA9IG9wdHMub3ZlcmZsb3dbIDEgXTtcblx0XHRcdHN0eWxlLm92ZXJmbG93WSA9IG9wdHMub3ZlcmZsb3dbIDIgXTtcblx0XHR9ICk7XG5cdH1cblxuXHQvLyBzaG93L2hpZGUgcGFzc1xuXHRmb3IgKCBwcm9wIGluIHByb3BzICkge1xuXHRcdHZhbHVlID0gcHJvcHNbIHByb3AgXTtcblx0XHRpZiAoIHJmeHR5cGVzLmV4ZWMoIHZhbHVlICkgKSB7XG5cdFx0XHRkZWxldGUgcHJvcHNbIHByb3AgXTtcblx0XHRcdHRvZ2dsZSA9IHRvZ2dsZSB8fCB2YWx1ZSA9PT0gXCJ0b2dnbGVcIjtcblx0XHRcdGlmICggdmFsdWUgPT09ICggaGlkZGVuID8gXCJoaWRlXCIgOiBcInNob3dcIiApICkge1xuXG5cdFx0XHRcdC8vIElmIHRoZXJlIGlzIGRhdGFTaG93IGxlZnQgb3ZlciBmcm9tIGEgc3RvcHBlZCBoaWRlIG9yIHNob3dcblx0XHRcdFx0Ly8gYW5kIHdlIGFyZSBnb2luZyB0byBwcm9jZWVkIHdpdGggc2hvdywgd2Ugc2hvdWxkIHByZXRlbmQgdG8gYmUgaGlkZGVuXG5cdFx0XHRcdGlmICggdmFsdWUgPT09IFwic2hvd1wiICYmIGRhdGFTaG93ICYmIGRhdGFTaG93WyBwcm9wIF0gIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRoaWRkZW4gPSB0cnVlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRvcmlnWyBwcm9wIF0gPSBkYXRhU2hvdyAmJiBkYXRhU2hvd1sgcHJvcCBdIHx8IGpRdWVyeS5zdHlsZSggZWxlbSwgcHJvcCApO1xuXG5cdFx0Ly8gQW55IG5vbi1meCB2YWx1ZSBzdG9wcyB1cyBmcm9tIHJlc3RvcmluZyB0aGUgb3JpZ2luYWwgZGlzcGxheSB2YWx1ZVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRkaXNwbGF5ID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXG5cdGlmICggIWpRdWVyeS5pc0VtcHR5T2JqZWN0KCBvcmlnICkgKSB7XG5cdFx0aWYgKCBkYXRhU2hvdyApIHtcblx0XHRcdGlmICggXCJoaWRkZW5cIiBpbiBkYXRhU2hvdyApIHtcblx0XHRcdFx0aGlkZGVuID0gZGF0YVNob3cuaGlkZGVuO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRkYXRhU2hvdyA9IGRhdGFQcml2LmFjY2VzcyggZWxlbSwgXCJmeHNob3dcIiwge30gKTtcblx0XHR9XG5cblx0XHQvLyBTdG9yZSBzdGF0ZSBpZiBpdHMgdG9nZ2xlIC0gZW5hYmxlcyAuc3RvcCgpLnRvZ2dsZSgpIHRvIFwicmV2ZXJzZVwiXG5cdFx0aWYgKCB0b2dnbGUgKSB7XG5cdFx0XHRkYXRhU2hvdy5oaWRkZW4gPSAhaGlkZGVuO1xuXHRcdH1cblx0XHRpZiAoIGhpZGRlbiApIHtcblx0XHRcdGpRdWVyeSggZWxlbSApLnNob3coKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YW5pbS5kb25lKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0alF1ZXJ5KCBlbGVtICkuaGlkZSgpO1xuXHRcdFx0fSApO1xuXHRcdH1cblx0XHRhbmltLmRvbmUoIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHByb3A7XG5cblx0XHRcdGRhdGFQcml2LnJlbW92ZSggZWxlbSwgXCJmeHNob3dcIiApO1xuXHRcdFx0Zm9yICggcHJvcCBpbiBvcmlnICkge1xuXHRcdFx0XHRqUXVlcnkuc3R5bGUoIGVsZW0sIHByb3AsIG9yaWdbIHByb3AgXSApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0XHRmb3IgKCBwcm9wIGluIG9yaWcgKSB7XG5cdFx0XHR0d2VlbiA9IGNyZWF0ZVR3ZWVuKCBoaWRkZW4gPyBkYXRhU2hvd1sgcHJvcCBdIDogMCwgcHJvcCwgYW5pbSApO1xuXG5cdFx0XHRpZiAoICEoIHByb3AgaW4gZGF0YVNob3cgKSApIHtcblx0XHRcdFx0ZGF0YVNob3dbIHByb3AgXSA9IHR3ZWVuLnN0YXJ0O1xuXHRcdFx0XHRpZiAoIGhpZGRlbiApIHtcblx0XHRcdFx0XHR0d2Vlbi5lbmQgPSB0d2Vlbi5zdGFydDtcblx0XHRcdFx0XHR0d2Vlbi5zdGFydCA9IHByb3AgPT09IFwid2lkdGhcIiB8fCBwcm9wID09PSBcImhlaWdodFwiID8gMSA6IDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0Ly8gSWYgdGhpcyBpcyBhIG5vb3AgbGlrZSAuaGlkZSgpLmhpZGUoKSwgcmVzdG9yZSBhbiBvdmVyd3JpdHRlbiBkaXNwbGF5IHZhbHVlXG5cdH0gZWxzZSBpZiAoICggZGlzcGxheSA9PT0gXCJub25lXCIgPyBkZWZhdWx0RGlzcGxheSggZWxlbS5ub2RlTmFtZSApIDogZGlzcGxheSApID09PSBcImlubGluZVwiICkge1xuXHRcdHN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xuXHR9XG59XG5cbmZ1bmN0aW9uIHByb3BGaWx0ZXIoIHByb3BzLCBzcGVjaWFsRWFzaW5nICkge1xuXHR2YXIgaW5kZXgsIG5hbWUsIGVhc2luZywgdmFsdWUsIGhvb2tzO1xuXG5cdC8vIGNhbWVsQ2FzZSwgc3BlY2lhbEVhc2luZyBhbmQgZXhwYW5kIGNzc0hvb2sgcGFzc1xuXHRmb3IgKCBpbmRleCBpbiBwcm9wcyApIHtcblx0XHRuYW1lID0galF1ZXJ5LmNhbWVsQ2FzZSggaW5kZXggKTtcblx0XHRlYXNpbmcgPSBzcGVjaWFsRWFzaW5nWyBuYW1lIF07XG5cdFx0dmFsdWUgPSBwcm9wc1sgaW5kZXggXTtcblx0XHRpZiAoIGpRdWVyeS5pc0FycmF5KCB2YWx1ZSApICkge1xuXHRcdFx0ZWFzaW5nID0gdmFsdWVbIDEgXTtcblx0XHRcdHZhbHVlID0gcHJvcHNbIGluZGV4IF0gPSB2YWx1ZVsgMCBdO1xuXHRcdH1cblxuXHRcdGlmICggaW5kZXggIT09IG5hbWUgKSB7XG5cdFx0XHRwcm9wc1sgbmFtZSBdID0gdmFsdWU7XG5cdFx0XHRkZWxldGUgcHJvcHNbIGluZGV4IF07XG5cdFx0fVxuXG5cdFx0aG9va3MgPSBqUXVlcnkuY3NzSG9va3NbIG5hbWUgXTtcblx0XHRpZiAoIGhvb2tzICYmIFwiZXhwYW5kXCIgaW4gaG9va3MgKSB7XG5cdFx0XHR2YWx1ZSA9IGhvb2tzLmV4cGFuZCggdmFsdWUgKTtcblx0XHRcdGRlbGV0ZSBwcm9wc1sgbmFtZSBdO1xuXG5cdFx0XHQvLyBOb3QgcXVpdGUgJC5leHRlbmQsIHRoaXMgd29uJ3Qgb3ZlcndyaXRlIGV4aXN0aW5nIGtleXMuXG5cdFx0XHQvLyBSZXVzaW5nICdpbmRleCcgYmVjYXVzZSB3ZSBoYXZlIHRoZSBjb3JyZWN0IFwibmFtZVwiXG5cdFx0XHRmb3IgKCBpbmRleCBpbiB2YWx1ZSApIHtcblx0XHRcdFx0aWYgKCAhKCBpbmRleCBpbiBwcm9wcyApICkge1xuXHRcdFx0XHRcdHByb3BzWyBpbmRleCBdID0gdmFsdWVbIGluZGV4IF07XG5cdFx0XHRcdFx0c3BlY2lhbEVhc2luZ1sgaW5kZXggXSA9IGVhc2luZztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRzcGVjaWFsRWFzaW5nWyBuYW1lIF0gPSBlYXNpbmc7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIEFuaW1hdGlvbiggZWxlbSwgcHJvcGVydGllcywgb3B0aW9ucyApIHtcblx0dmFyIHJlc3VsdCxcblx0XHRzdG9wcGVkLFxuXHRcdGluZGV4ID0gMCxcblx0XHRsZW5ndGggPSBBbmltYXRpb24ucHJlZmlsdGVycy5sZW5ndGgsXG5cdFx0ZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKS5hbHdheXMoIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBEb24ndCBtYXRjaCBlbGVtIGluIHRoZSA6YW5pbWF0ZWQgc2VsZWN0b3Jcblx0XHRcdGRlbGV0ZSB0aWNrLmVsZW07XG5cdFx0fSApLFxuXHRcdHRpY2sgPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggc3RvcHBlZCApIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGN1cnJlbnRUaW1lID0gZnhOb3cgfHwgY3JlYXRlRnhOb3coKSxcblx0XHRcdFx0cmVtYWluaW5nID0gTWF0aC5tYXgoIDAsIGFuaW1hdGlvbi5zdGFydFRpbWUgKyBhbmltYXRpb24uZHVyYXRpb24gLSBjdXJyZW50VGltZSApLFxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgMi4zXG5cdFx0XHRcdC8vIEFyY2hhaWMgY3Jhc2ggYnVnIHdvbid0IGFsbG93IHVzIHRvIHVzZSBgMSAtICggMC41IHx8IDAgKWAgKCMxMjQ5Nylcblx0XHRcdFx0dGVtcCA9IHJlbWFpbmluZyAvIGFuaW1hdGlvbi5kdXJhdGlvbiB8fCAwLFxuXHRcdFx0XHRwZXJjZW50ID0gMSAtIHRlbXAsXG5cdFx0XHRcdGluZGV4ID0gMCxcblx0XHRcdFx0bGVuZ3RoID0gYW5pbWF0aW9uLnR3ZWVucy5sZW5ndGg7XG5cblx0XHRcdGZvciAoIDsgaW5kZXggPCBsZW5ndGggOyBpbmRleCsrICkge1xuXHRcdFx0XHRhbmltYXRpb24udHdlZW5zWyBpbmRleCBdLnJ1biggcGVyY2VudCApO1xuXHRcdFx0fVxuXG5cdFx0XHRkZWZlcnJlZC5ub3RpZnlXaXRoKCBlbGVtLCBbIGFuaW1hdGlvbiwgcGVyY2VudCwgcmVtYWluaW5nIF0gKTtcblxuXHRcdFx0aWYgKCBwZXJjZW50IDwgMSAmJiBsZW5ndGggKSB7XG5cdFx0XHRcdHJldHVybiByZW1haW5pbmc7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlV2l0aCggZWxlbSwgWyBhbmltYXRpb24gXSApO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRhbmltYXRpb24gPSBkZWZlcnJlZC5wcm9taXNlKCB7XG5cdFx0XHRlbGVtOiBlbGVtLFxuXHRcdFx0cHJvcHM6IGpRdWVyeS5leHRlbmQoIHt9LCBwcm9wZXJ0aWVzICksXG5cdFx0XHRvcHRzOiBqUXVlcnkuZXh0ZW5kKCB0cnVlLCB7XG5cdFx0XHRcdHNwZWNpYWxFYXNpbmc6IHt9LFxuXHRcdFx0XHRlYXNpbmc6IGpRdWVyeS5lYXNpbmcuX2RlZmF1bHRcblx0XHRcdH0sIG9wdGlvbnMgKSxcblx0XHRcdG9yaWdpbmFsUHJvcGVydGllczogcHJvcGVydGllcyxcblx0XHRcdG9yaWdpbmFsT3B0aW9uczogb3B0aW9ucyxcblx0XHRcdHN0YXJ0VGltZTogZnhOb3cgfHwgY3JlYXRlRnhOb3coKSxcblx0XHRcdGR1cmF0aW9uOiBvcHRpb25zLmR1cmF0aW9uLFxuXHRcdFx0dHdlZW5zOiBbXSxcblx0XHRcdGNyZWF0ZVR3ZWVuOiBmdW5jdGlvbiggcHJvcCwgZW5kICkge1xuXHRcdFx0XHR2YXIgdHdlZW4gPSBqUXVlcnkuVHdlZW4oIGVsZW0sIGFuaW1hdGlvbi5vcHRzLCBwcm9wLCBlbmQsXG5cdFx0XHRcdFx0XHRhbmltYXRpb24ub3B0cy5zcGVjaWFsRWFzaW5nWyBwcm9wIF0gfHwgYW5pbWF0aW9uLm9wdHMuZWFzaW5nICk7XG5cdFx0XHRcdGFuaW1hdGlvbi50d2VlbnMucHVzaCggdHdlZW4gKTtcblx0XHRcdFx0cmV0dXJuIHR3ZWVuO1xuXHRcdFx0fSxcblx0XHRcdHN0b3A6IGZ1bmN0aW9uKCBnb3RvRW5kICkge1xuXHRcdFx0XHR2YXIgaW5kZXggPSAwLFxuXG5cdFx0XHRcdFx0Ly8gSWYgd2UgYXJlIGdvaW5nIHRvIHRoZSBlbmQsIHdlIHdhbnQgdG8gcnVuIGFsbCB0aGUgdHdlZW5zXG5cdFx0XHRcdFx0Ly8gb3RoZXJ3aXNlIHdlIHNraXAgdGhpcyBwYXJ0XG5cdFx0XHRcdFx0bGVuZ3RoID0gZ290b0VuZCA/IGFuaW1hdGlvbi50d2VlbnMubGVuZ3RoIDogMDtcblx0XHRcdFx0aWYgKCBzdG9wcGVkICkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHN0b3BwZWQgPSB0cnVlO1xuXHRcdFx0XHRmb3IgKCA7IGluZGV4IDwgbGVuZ3RoIDsgaW5kZXgrKyApIHtcblx0XHRcdFx0XHRhbmltYXRpb24udHdlZW5zWyBpbmRleCBdLnJ1biggMSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gUmVzb2x2ZSB3aGVuIHdlIHBsYXllZCB0aGUgbGFzdCBmcmFtZTsgb3RoZXJ3aXNlLCByZWplY3Rcblx0XHRcdFx0aWYgKCBnb3RvRW5kICkge1xuXHRcdFx0XHRcdGRlZmVycmVkLm5vdGlmeVdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uLCAxLCAwIF0gKTtcblx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlV2l0aCggZWxlbSwgWyBhbmltYXRpb24sIGdvdG9FbmQgXSApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdFdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uLCBnb3RvRW5kIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9ICksXG5cdFx0cHJvcHMgPSBhbmltYXRpb24ucHJvcHM7XG5cblx0cHJvcEZpbHRlciggcHJvcHMsIGFuaW1hdGlvbi5vcHRzLnNwZWNpYWxFYXNpbmcgKTtcblxuXHRmb3IgKCA7IGluZGV4IDwgbGVuZ3RoIDsgaW5kZXgrKyApIHtcblx0XHRyZXN1bHQgPSBBbmltYXRpb24ucHJlZmlsdGVyc1sgaW5kZXggXS5jYWxsKCBhbmltYXRpb24sIGVsZW0sIHByb3BzLCBhbmltYXRpb24ub3B0cyApO1xuXHRcdGlmICggcmVzdWx0ICkge1xuXHRcdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggcmVzdWx0LnN0b3AgKSApIHtcblx0XHRcdFx0alF1ZXJ5Ll9xdWV1ZUhvb2tzKCBhbmltYXRpb24uZWxlbSwgYW5pbWF0aW9uLm9wdHMucXVldWUgKS5zdG9wID1cblx0XHRcdFx0XHRqUXVlcnkucHJveHkoIHJlc3VsdC5zdG9wLCByZXN1bHQgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXHR9XG5cblx0alF1ZXJ5Lm1hcCggcHJvcHMsIGNyZWF0ZVR3ZWVuLCBhbmltYXRpb24gKTtcblxuXHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBhbmltYXRpb24ub3B0cy5zdGFydCApICkge1xuXHRcdGFuaW1hdGlvbi5vcHRzLnN0YXJ0LmNhbGwoIGVsZW0sIGFuaW1hdGlvbiApO1xuXHR9XG5cblx0alF1ZXJ5LmZ4LnRpbWVyKFxuXHRcdGpRdWVyeS5leHRlbmQoIHRpY2ssIHtcblx0XHRcdGVsZW06IGVsZW0sXG5cdFx0XHRhbmltOiBhbmltYXRpb24sXG5cdFx0XHRxdWV1ZTogYW5pbWF0aW9uLm9wdHMucXVldWVcblx0XHR9IClcblx0KTtcblxuXHQvLyBhdHRhY2ggY2FsbGJhY2tzIGZyb20gb3B0aW9uc1xuXHRyZXR1cm4gYW5pbWF0aW9uLnByb2dyZXNzKCBhbmltYXRpb24ub3B0cy5wcm9ncmVzcyApXG5cdFx0LmRvbmUoIGFuaW1hdGlvbi5vcHRzLmRvbmUsIGFuaW1hdGlvbi5vcHRzLmNvbXBsZXRlIClcblx0XHQuZmFpbCggYW5pbWF0aW9uLm9wdHMuZmFpbCApXG5cdFx0LmFsd2F5cyggYW5pbWF0aW9uLm9wdHMuYWx3YXlzICk7XG59XG5cbmpRdWVyeS5BbmltYXRpb24gPSBqUXVlcnkuZXh0ZW5kKCBBbmltYXRpb24sIHtcblx0dHdlZW5lcnM6IHtcblx0XHRcIipcIjogWyBmdW5jdGlvbiggcHJvcCwgdmFsdWUgKSB7XG5cdFx0XHR2YXIgdHdlZW4gPSB0aGlzLmNyZWF0ZVR3ZWVuKCBwcm9wLCB2YWx1ZSApO1xuXHRcdFx0YWRqdXN0Q1NTKCB0d2Vlbi5lbGVtLCBwcm9wLCByY3NzTnVtLmV4ZWMoIHZhbHVlICksIHR3ZWVuICk7XG5cdFx0XHRyZXR1cm4gdHdlZW47XG5cdFx0fSBdXG5cdH0sXG5cblx0dHdlZW5lcjogZnVuY3Rpb24oIHByb3BzLCBjYWxsYmFjayApIHtcblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBwcm9wcyApICkge1xuXHRcdFx0Y2FsbGJhY2sgPSBwcm9wcztcblx0XHRcdHByb3BzID0gWyBcIipcIiBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwcm9wcyA9IHByb3BzLm1hdGNoKCBybm90d2hpdGUgKTtcblx0XHR9XG5cblx0XHR2YXIgcHJvcCxcblx0XHRcdGluZGV4ID0gMCxcblx0XHRcdGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuXHRcdGZvciAoIDsgaW5kZXggPCBsZW5ndGggOyBpbmRleCsrICkge1xuXHRcdFx0cHJvcCA9IHByb3BzWyBpbmRleCBdO1xuXHRcdFx0QW5pbWF0aW9uLnR3ZWVuZXJzWyBwcm9wIF0gPSBBbmltYXRpb24udHdlZW5lcnNbIHByb3AgXSB8fCBbXTtcblx0XHRcdEFuaW1hdGlvbi50d2VlbmVyc1sgcHJvcCBdLnVuc2hpZnQoIGNhbGxiYWNrICk7XG5cdFx0fVxuXHR9LFxuXG5cdHByZWZpbHRlcnM6IFsgZGVmYXVsdFByZWZpbHRlciBdLFxuXG5cdHByZWZpbHRlcjogZnVuY3Rpb24oIGNhbGxiYWNrLCBwcmVwZW5kICkge1xuXHRcdGlmICggcHJlcGVuZCApIHtcblx0XHRcdEFuaW1hdGlvbi5wcmVmaWx0ZXJzLnVuc2hpZnQoIGNhbGxiYWNrICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdEFuaW1hdGlvbi5wcmVmaWx0ZXJzLnB1c2goIGNhbGxiYWNrICk7XG5cdFx0fVxuXHR9XG59ICk7XG5cbmpRdWVyeS5zcGVlZCA9IGZ1bmN0aW9uKCBzcGVlZCwgZWFzaW5nLCBmbiApIHtcblx0dmFyIG9wdCA9IHNwZWVkICYmIHR5cGVvZiBzcGVlZCA9PT0gXCJvYmplY3RcIiA/IGpRdWVyeS5leHRlbmQoIHt9LCBzcGVlZCApIDoge1xuXHRcdGNvbXBsZXRlOiBmbiB8fCAhZm4gJiYgZWFzaW5nIHx8XG5cdFx0XHRqUXVlcnkuaXNGdW5jdGlvbiggc3BlZWQgKSAmJiBzcGVlZCxcblx0XHRkdXJhdGlvbjogc3BlZWQsXG5cdFx0ZWFzaW5nOiBmbiAmJiBlYXNpbmcgfHwgZWFzaW5nICYmICFqUXVlcnkuaXNGdW5jdGlvbiggZWFzaW5nICkgJiYgZWFzaW5nXG5cdH07XG5cblx0b3B0LmR1cmF0aW9uID0galF1ZXJ5LmZ4Lm9mZiA/IDAgOiB0eXBlb2Ygb3B0LmR1cmF0aW9uID09PSBcIm51bWJlclwiID9cblx0XHRvcHQuZHVyYXRpb24gOiBvcHQuZHVyYXRpb24gaW4galF1ZXJ5LmZ4LnNwZWVkcyA/XG5cdFx0XHRqUXVlcnkuZnguc3BlZWRzWyBvcHQuZHVyYXRpb24gXSA6IGpRdWVyeS5meC5zcGVlZHMuX2RlZmF1bHQ7XG5cblx0Ly8gTm9ybWFsaXplIG9wdC5xdWV1ZSAtIHRydWUvdW5kZWZpbmVkL251bGwgLT4gXCJmeFwiXG5cdGlmICggb3B0LnF1ZXVlID09IG51bGwgfHwgb3B0LnF1ZXVlID09PSB0cnVlICkge1xuXHRcdG9wdC5xdWV1ZSA9IFwiZnhcIjtcblx0fVxuXG5cdC8vIFF1ZXVlaW5nXG5cdG9wdC5vbGQgPSBvcHQuY29tcGxldGU7XG5cblx0b3B0LmNvbXBsZXRlID0gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggb3B0Lm9sZCApICkge1xuXHRcdFx0b3B0Lm9sZC5jYWxsKCB0aGlzICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBvcHQucXVldWUgKSB7XG5cdFx0XHRqUXVlcnkuZGVxdWV1ZSggdGhpcywgb3B0LnF1ZXVlICk7XG5cdFx0fVxuXHR9O1xuXG5cdHJldHVybiBvcHQ7XG59O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGZhZGVUbzogZnVuY3Rpb24oIHNwZWVkLCB0bywgZWFzaW5nLCBjYWxsYmFjayApIHtcblxuXHRcdC8vIFNob3cgYW55IGhpZGRlbiBlbGVtZW50cyBhZnRlciBzZXR0aW5nIG9wYWNpdHkgdG8gMFxuXHRcdHJldHVybiB0aGlzLmZpbHRlciggaXNIaWRkZW4gKS5jc3MoIFwib3BhY2l0eVwiLCAwICkuc2hvdygpXG5cblx0XHRcdC8vIEFuaW1hdGUgdG8gdGhlIHZhbHVlIHNwZWNpZmllZFxuXHRcdFx0LmVuZCgpLmFuaW1hdGUoIHsgb3BhY2l0eTogdG8gfSwgc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKTtcblx0fSxcblx0YW5pbWF0ZTogZnVuY3Rpb24oIHByb3AsIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICkge1xuXHRcdHZhciBlbXB0eSA9IGpRdWVyeS5pc0VtcHR5T2JqZWN0KCBwcm9wICksXG5cdFx0XHRvcHRhbGwgPSBqUXVlcnkuc3BlZWQoIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICksXG5cdFx0XHRkb0FuaW1hdGlvbiA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdC8vIE9wZXJhdGUgb24gYSBjb3B5IG9mIHByb3Agc28gcGVyLXByb3BlcnR5IGVhc2luZyB3b24ndCBiZSBsb3N0XG5cdFx0XHRcdHZhciBhbmltID0gQW5pbWF0aW9uKCB0aGlzLCBqUXVlcnkuZXh0ZW5kKCB7fSwgcHJvcCApLCBvcHRhbGwgKTtcblxuXHRcdFx0XHQvLyBFbXB0eSBhbmltYXRpb25zLCBvciBmaW5pc2hpbmcgcmVzb2x2ZXMgaW1tZWRpYXRlbHlcblx0XHRcdFx0aWYgKCBlbXB0eSB8fCBkYXRhUHJpdi5nZXQoIHRoaXMsIFwiZmluaXNoXCIgKSApIHtcblx0XHRcdFx0XHRhbmltLnN0b3AoIHRydWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGRvQW5pbWF0aW9uLmZpbmlzaCA9IGRvQW5pbWF0aW9uO1xuXG5cdFx0cmV0dXJuIGVtcHR5IHx8IG9wdGFsbC5xdWV1ZSA9PT0gZmFsc2UgP1xuXHRcdFx0dGhpcy5lYWNoKCBkb0FuaW1hdGlvbiApIDpcblx0XHRcdHRoaXMucXVldWUoIG9wdGFsbC5xdWV1ZSwgZG9BbmltYXRpb24gKTtcblx0fSxcblx0c3RvcDogZnVuY3Rpb24oIHR5cGUsIGNsZWFyUXVldWUsIGdvdG9FbmQgKSB7XG5cdFx0dmFyIHN0b3BRdWV1ZSA9IGZ1bmN0aW9uKCBob29rcyApIHtcblx0XHRcdHZhciBzdG9wID0gaG9va3Muc3RvcDtcblx0XHRcdGRlbGV0ZSBob29rcy5zdG9wO1xuXHRcdFx0c3RvcCggZ290b0VuZCApO1xuXHRcdH07XG5cblx0XHRpZiAoIHR5cGVvZiB0eXBlICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0Z290b0VuZCA9IGNsZWFyUXVldWU7XG5cdFx0XHRjbGVhclF1ZXVlID0gdHlwZTtcblx0XHRcdHR5cGUgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdGlmICggY2xlYXJRdWV1ZSAmJiB0eXBlICE9PSBmYWxzZSApIHtcblx0XHRcdHRoaXMucXVldWUoIHR5cGUgfHwgXCJmeFwiLCBbXSApO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGRlcXVldWUgPSB0cnVlLFxuXHRcdFx0XHRpbmRleCA9IHR5cGUgIT0gbnVsbCAmJiB0eXBlICsgXCJxdWV1ZUhvb2tzXCIsXG5cdFx0XHRcdHRpbWVycyA9IGpRdWVyeS50aW1lcnMsXG5cdFx0XHRcdGRhdGEgPSBkYXRhUHJpdi5nZXQoIHRoaXMgKTtcblxuXHRcdFx0aWYgKCBpbmRleCApIHtcblx0XHRcdFx0aWYgKCBkYXRhWyBpbmRleCBdICYmIGRhdGFbIGluZGV4IF0uc3RvcCApIHtcblx0XHRcdFx0XHRzdG9wUXVldWUoIGRhdGFbIGluZGV4IF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9yICggaW5kZXggaW4gZGF0YSApIHtcblx0XHRcdFx0XHRpZiAoIGRhdGFbIGluZGV4IF0gJiYgZGF0YVsgaW5kZXggXS5zdG9wICYmIHJydW4udGVzdCggaW5kZXggKSApIHtcblx0XHRcdFx0XHRcdHN0b3BRdWV1ZSggZGF0YVsgaW5kZXggXSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKCBpbmRleCA9IHRpbWVycy5sZW5ndGg7IGluZGV4LS07ICkge1xuXHRcdFx0XHRpZiAoIHRpbWVyc1sgaW5kZXggXS5lbGVtID09PSB0aGlzICYmXG5cdFx0XHRcdFx0KCB0eXBlID09IG51bGwgfHwgdGltZXJzWyBpbmRleCBdLnF1ZXVlID09PSB0eXBlICkgKSB7XG5cblx0XHRcdFx0XHR0aW1lcnNbIGluZGV4IF0uYW5pbS5zdG9wKCBnb3RvRW5kICk7XG5cdFx0XHRcdFx0ZGVxdWV1ZSA9IGZhbHNlO1xuXHRcdFx0XHRcdHRpbWVycy5zcGxpY2UoIGluZGV4LCAxICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gU3RhcnQgdGhlIG5leHQgaW4gdGhlIHF1ZXVlIGlmIHRoZSBsYXN0IHN0ZXAgd2Fzbid0IGZvcmNlZC5cblx0XHRcdC8vIFRpbWVycyBjdXJyZW50bHkgd2lsbCBjYWxsIHRoZWlyIGNvbXBsZXRlIGNhbGxiYWNrcywgd2hpY2hcblx0XHRcdC8vIHdpbGwgZGVxdWV1ZSBidXQgb25seSBpZiB0aGV5IHdlcmUgZ290b0VuZC5cblx0XHRcdGlmICggZGVxdWV1ZSB8fCAhZ290b0VuZCApIHtcblx0XHRcdFx0alF1ZXJ5LmRlcXVldWUoIHRoaXMsIHR5cGUgKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cdGZpbmlzaDogZnVuY3Rpb24oIHR5cGUgKSB7XG5cdFx0aWYgKCB0eXBlICE9PSBmYWxzZSApIHtcblx0XHRcdHR5cGUgPSB0eXBlIHx8IFwiZnhcIjtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgaW5kZXgsXG5cdFx0XHRcdGRhdGEgPSBkYXRhUHJpdi5nZXQoIHRoaXMgKSxcblx0XHRcdFx0cXVldWUgPSBkYXRhWyB0eXBlICsgXCJxdWV1ZVwiIF0sXG5cdFx0XHRcdGhvb2tzID0gZGF0YVsgdHlwZSArIFwicXVldWVIb29rc1wiIF0sXG5cdFx0XHRcdHRpbWVycyA9IGpRdWVyeS50aW1lcnMsXG5cdFx0XHRcdGxlbmd0aCA9IHF1ZXVlID8gcXVldWUubGVuZ3RoIDogMDtcblxuXHRcdFx0Ly8gRW5hYmxlIGZpbmlzaGluZyBmbGFnIG9uIHByaXZhdGUgZGF0YVxuXHRcdFx0ZGF0YS5maW5pc2ggPSB0cnVlO1xuXG5cdFx0XHQvLyBFbXB0eSB0aGUgcXVldWUgZmlyc3Rcblx0XHRcdGpRdWVyeS5xdWV1ZSggdGhpcywgdHlwZSwgW10gKTtcblxuXHRcdFx0aWYgKCBob29rcyAmJiBob29rcy5zdG9wICkge1xuXHRcdFx0XHRob29rcy5zdG9wLmNhbGwoIHRoaXMsIHRydWUgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTG9vayBmb3IgYW55IGFjdGl2ZSBhbmltYXRpb25zLCBhbmQgZmluaXNoIHRoZW1cblx0XHRcdGZvciAoIGluZGV4ID0gdGltZXJzLmxlbmd0aDsgaW5kZXgtLTsgKSB7XG5cdFx0XHRcdGlmICggdGltZXJzWyBpbmRleCBdLmVsZW0gPT09IHRoaXMgJiYgdGltZXJzWyBpbmRleCBdLnF1ZXVlID09PSB0eXBlICkge1xuXHRcdFx0XHRcdHRpbWVyc1sgaW5kZXggXS5hbmltLnN0b3AoIHRydWUgKTtcblx0XHRcdFx0XHR0aW1lcnMuc3BsaWNlKCBpbmRleCwgMSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIExvb2sgZm9yIGFueSBhbmltYXRpb25zIGluIHRoZSBvbGQgcXVldWUgYW5kIGZpbmlzaCB0aGVtXG5cdFx0XHRmb3IgKCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuXHRcdFx0XHRpZiAoIHF1ZXVlWyBpbmRleCBdICYmIHF1ZXVlWyBpbmRleCBdLmZpbmlzaCApIHtcblx0XHRcdFx0XHRxdWV1ZVsgaW5kZXggXS5maW5pc2guY2FsbCggdGhpcyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFR1cm4gb2ZmIGZpbmlzaGluZyBmbGFnXG5cdFx0XHRkZWxldGUgZGF0YS5maW5pc2g7XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5lYWNoKCBbIFwidG9nZ2xlXCIsIFwic2hvd1wiLCBcImhpZGVcIiBdLCBmdW5jdGlvbiggaSwgbmFtZSApIHtcblx0dmFyIGNzc0ZuID0galF1ZXJ5LmZuWyBuYW1lIF07XG5cdGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiBzcGVlZCA9PSBudWxsIHx8IHR5cGVvZiBzcGVlZCA9PT0gXCJib29sZWFuXCIgP1xuXHRcdFx0Y3NzRm4uYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApIDpcblx0XHRcdHRoaXMuYW5pbWF0ZSggZ2VuRngoIG5hbWUsIHRydWUgKSwgc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKTtcblx0fTtcbn0gKTtcblxuLy8gR2VuZXJhdGUgc2hvcnRjdXRzIGZvciBjdXN0b20gYW5pbWF0aW9uc1xualF1ZXJ5LmVhY2goIHtcblx0c2xpZGVEb3duOiBnZW5GeCggXCJzaG93XCIgKSxcblx0c2xpZGVVcDogZ2VuRngoIFwiaGlkZVwiICksXG5cdHNsaWRlVG9nZ2xlOiBnZW5GeCggXCJ0b2dnbGVcIiApLFxuXHRmYWRlSW46IHsgb3BhY2l0eTogXCJzaG93XCIgfSxcblx0ZmFkZU91dDogeyBvcGFjaXR5OiBcImhpZGVcIiB9LFxuXHRmYWRlVG9nZ2xlOiB7IG9wYWNpdHk6IFwidG9nZ2xlXCIgfVxufSwgZnVuY3Rpb24oIG5hbWUsIHByb3BzICkge1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApIHtcblx0XHRyZXR1cm4gdGhpcy5hbmltYXRlKCBwcm9wcywgc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKTtcblx0fTtcbn0gKTtcblxualF1ZXJ5LnRpbWVycyA9IFtdO1xualF1ZXJ5LmZ4LnRpY2sgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRpbWVyLFxuXHRcdGkgPSAwLFxuXHRcdHRpbWVycyA9IGpRdWVyeS50aW1lcnM7XG5cblx0ZnhOb3cgPSBqUXVlcnkubm93KCk7XG5cblx0Zm9yICggOyBpIDwgdGltZXJzLmxlbmd0aDsgaSsrICkge1xuXHRcdHRpbWVyID0gdGltZXJzWyBpIF07XG5cblx0XHQvLyBDaGVja3MgdGhlIHRpbWVyIGhhcyBub3QgYWxyZWFkeSBiZWVuIHJlbW92ZWRcblx0XHRpZiAoICF0aW1lcigpICYmIHRpbWVyc1sgaSBdID09PSB0aW1lciApIHtcblx0XHRcdHRpbWVycy5zcGxpY2UoIGktLSwgMSApO1xuXHRcdH1cblx0fVxuXG5cdGlmICggIXRpbWVycy5sZW5ndGggKSB7XG5cdFx0alF1ZXJ5LmZ4LnN0b3AoKTtcblx0fVxuXHRmeE5vdyA9IHVuZGVmaW5lZDtcbn07XG5cbmpRdWVyeS5meC50aW1lciA9IGZ1bmN0aW9uKCB0aW1lciApIHtcblx0alF1ZXJ5LnRpbWVycy5wdXNoKCB0aW1lciApO1xuXHRpZiAoIHRpbWVyKCkgKSB7XG5cdFx0alF1ZXJ5LmZ4LnN0YXJ0KCk7XG5cdH0gZWxzZSB7XG5cdFx0alF1ZXJ5LnRpbWVycy5wb3AoKTtcblx0fVxufTtcblxualF1ZXJ5LmZ4LmludGVydmFsID0gMTM7XG5qUXVlcnkuZnguc3RhcnQgPSBmdW5jdGlvbigpIHtcblx0aWYgKCAhdGltZXJJZCApIHtcblx0XHR0aW1lcklkID0gd2luZG93LnNldEludGVydmFsKCBqUXVlcnkuZngudGljaywgalF1ZXJ5LmZ4LmludGVydmFsICk7XG5cdH1cbn07XG5cbmpRdWVyeS5meC5zdG9wID0gZnVuY3Rpb24oKSB7XG5cdHdpbmRvdy5jbGVhckludGVydmFsKCB0aW1lcklkICk7XG5cblx0dGltZXJJZCA9IG51bGw7XG59O1xuXG5qUXVlcnkuZnguc3BlZWRzID0ge1xuXHRzbG93OiA2MDAsXG5cdGZhc3Q6IDIwMCxcblxuXHQvLyBEZWZhdWx0IHNwZWVkXG5cdF9kZWZhdWx0OiA0MDBcbn07XG5cblxuLy8gQmFzZWQgb2ZmIG9mIHRoZSBwbHVnaW4gYnkgQ2xpbnQgSGVsZmVycywgd2l0aCBwZXJtaXNzaW9uLlxuLy8gaHR0cDovL3dlYi5hcmNoaXZlLm9yZy93ZWIvMjAxMDAzMjQwMTQ3NDcvaHR0cDovL2JsaW5kc2lnbmFscy5jb20vaW5kZXgucGhwLzIwMDkvMDcvanF1ZXJ5LWRlbGF5L1xualF1ZXJ5LmZuLmRlbGF5ID0gZnVuY3Rpb24oIHRpbWUsIHR5cGUgKSB7XG5cdHRpbWUgPSBqUXVlcnkuZnggPyBqUXVlcnkuZnguc3BlZWRzWyB0aW1lIF0gfHwgdGltZSA6IHRpbWU7XG5cdHR5cGUgPSB0eXBlIHx8IFwiZnhcIjtcblxuXHRyZXR1cm4gdGhpcy5xdWV1ZSggdHlwZSwgZnVuY3Rpb24oIG5leHQsIGhvb2tzICkge1xuXHRcdHZhciB0aW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoIG5leHQsIHRpbWUgKTtcblx0XHRob29rcy5zdG9wID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR3aW5kb3cuY2xlYXJUaW1lb3V0KCB0aW1lb3V0ICk7XG5cdFx0fTtcblx0fSApO1xufTtcblxuXG4oIGZ1bmN0aW9uKCkge1xuXHR2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImlucHV0XCIgKSxcblx0XHRzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcInNlbGVjdFwiICksXG5cdFx0b3B0ID0gc2VsZWN0LmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcIm9wdGlvblwiICkgKTtcblxuXHRpbnB1dC50eXBlID0gXCJjaGVja2JveFwiO1xuXG5cdC8vIFN1cHBvcnQ6IGlPUzw9NS4xLCBBbmRyb2lkPD00LjIrXG5cdC8vIERlZmF1bHQgdmFsdWUgZm9yIGEgY2hlY2tib3ggc2hvdWxkIGJlIFwib25cIlxuXHRzdXBwb3J0LmNoZWNrT24gPSBpbnB1dC52YWx1ZSAhPT0gXCJcIjtcblxuXHQvLyBTdXBwb3J0OiBJRTw9MTErXG5cdC8vIE11c3QgYWNjZXNzIHNlbGVjdGVkSW5kZXggdG8gbWFrZSBkZWZhdWx0IG9wdGlvbnMgc2VsZWN0XG5cdHN1cHBvcnQub3B0U2VsZWN0ZWQgPSBvcHQuc2VsZWN0ZWQ7XG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZDw9Mi4zXG5cdC8vIE9wdGlvbnMgaW5zaWRlIGRpc2FibGVkIHNlbGVjdHMgYXJlIGluY29ycmVjdGx5IG1hcmtlZCBhcyBkaXNhYmxlZFxuXHRzZWxlY3QuZGlzYWJsZWQgPSB0cnVlO1xuXHRzdXBwb3J0Lm9wdERpc2FibGVkID0gIW9wdC5kaXNhYmxlZDtcblxuXHQvLyBTdXBwb3J0OiBJRTw9MTErXG5cdC8vIEFuIGlucHV0IGxvc2VzIGl0cyB2YWx1ZSBhZnRlciBiZWNvbWluZyBhIHJhZGlvXG5cdGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJpbnB1dFwiICk7XG5cdGlucHV0LnZhbHVlID0gXCJ0XCI7XG5cdGlucHV0LnR5cGUgPSBcInJhZGlvXCI7XG5cdHN1cHBvcnQucmFkaW9WYWx1ZSA9IGlucHV0LnZhbHVlID09PSBcInRcIjtcbn0gKSgpO1xuXG5cbnZhciBib29sSG9vayxcblx0YXR0ckhhbmRsZSA9IGpRdWVyeS5leHByLmF0dHJIYW5kbGU7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0YXR0cjogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGpRdWVyeS5hdHRyLCBuYW1lLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgKTtcblx0fSxcblxuXHRyZW1vdmVBdHRyOiBmdW5jdGlvbiggbmFtZSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeS5yZW1vdmVBdHRyKCB0aGlzLCBuYW1lICk7XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5leHRlbmQoIHtcblx0YXR0cjogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIHZhbHVlICkge1xuXHRcdHZhciByZXQsIGhvb2tzLFxuXHRcdFx0blR5cGUgPSBlbGVtLm5vZGVUeXBlO1xuXG5cdFx0Ly8gRG9uJ3QgZ2V0L3NldCBhdHRyaWJ1dGVzIG9uIHRleHQsIGNvbW1lbnQgYW5kIGF0dHJpYnV0ZSBub2Rlc1xuXHRcdGlmICggblR5cGUgPT09IDMgfHwgblR5cGUgPT09IDggfHwgblR5cGUgPT09IDIgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gRmFsbGJhY2sgdG8gcHJvcCB3aGVuIGF0dHJpYnV0ZXMgYXJlIG5vdCBzdXBwb3J0ZWRcblx0XHRpZiAoIHR5cGVvZiBlbGVtLmdldEF0dHJpYnV0ZSA9PT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRcdHJldHVybiBqUXVlcnkucHJvcCggZWxlbSwgbmFtZSwgdmFsdWUgKTtcblx0XHR9XG5cblx0XHQvLyBBbGwgYXR0cmlidXRlcyBhcmUgbG93ZXJjYXNlXG5cdFx0Ly8gR3JhYiBuZWNlc3NhcnkgaG9vayBpZiBvbmUgaXMgZGVmaW5lZFxuXHRcdGlmICggblR5cGUgIT09IDEgfHwgIWpRdWVyeS5pc1hNTERvYyggZWxlbSApICkge1xuXHRcdFx0bmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdGhvb2tzID0galF1ZXJ5LmF0dHJIb29rc1sgbmFtZSBdIHx8XG5cdFx0XHRcdCggalF1ZXJ5LmV4cHIubWF0Y2guYm9vbC50ZXN0KCBuYW1lICkgPyBib29sSG9vayA6IHVuZGVmaW5lZCApO1xuXHRcdH1cblxuXHRcdGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdGlmICggdmFsdWUgPT09IG51bGwgKSB7XG5cdFx0XHRcdGpRdWVyeS5yZW1vdmVBdHRyKCBlbGVtLCBuYW1lICk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBob29rcyAmJiBcInNldFwiIGluIGhvb2tzICYmXG5cdFx0XHRcdCggcmV0ID0gaG9va3Muc2V0KCBlbGVtLCB2YWx1ZSwgbmFtZSApICkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH1cblxuXHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIG5hbWUsIHZhbHVlICsgXCJcIiApO1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH1cblxuXHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAoIHJldCA9IGhvb2tzLmdldCggZWxlbSwgbmFtZSApICkgIT09IG51bGwgKSB7XG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH1cblxuXHRcdHJldCA9IGpRdWVyeS5maW5kLmF0dHIoIGVsZW0sIG5hbWUgKTtcblxuXHRcdC8vIE5vbi1leGlzdGVudCBhdHRyaWJ1dGVzIHJldHVybiBudWxsLCB3ZSBub3JtYWxpemUgdG8gdW5kZWZpbmVkXG5cdFx0cmV0dXJuIHJldCA9PSBudWxsID8gdW5kZWZpbmVkIDogcmV0O1xuXHR9LFxuXG5cdGF0dHJIb29rczoge1xuXHRcdHR5cGU6IHtcblx0XHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdFx0XHRpZiAoICFzdXBwb3J0LnJhZGlvVmFsdWUgJiYgdmFsdWUgPT09IFwicmFkaW9cIiAmJlxuXHRcdFx0XHRcdGpRdWVyeS5ub2RlTmFtZSggZWxlbSwgXCJpbnB1dFwiICkgKSB7XG5cdFx0XHRcdFx0dmFyIHZhbCA9IGVsZW0udmFsdWU7XG5cdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIFwidHlwZVwiLCB2YWx1ZSApO1xuXHRcdFx0XHRcdGlmICggdmFsICkge1xuXHRcdFx0XHRcdFx0ZWxlbS52YWx1ZSA9IHZhbDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdHJlbW92ZUF0dHI6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcblx0XHR2YXIgbmFtZSwgcHJvcE5hbWUsXG5cdFx0XHRpID0gMCxcblx0XHRcdGF0dHJOYW1lcyA9IHZhbHVlICYmIHZhbHVlLm1hdGNoKCBybm90d2hpdGUgKTtcblxuXHRcdGlmICggYXR0ck5hbWVzICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHR3aGlsZSAoICggbmFtZSA9IGF0dHJOYW1lc1sgaSsrIF0gKSApIHtcblx0XHRcdFx0cHJvcE5hbWUgPSBqUXVlcnkucHJvcEZpeFsgbmFtZSBdIHx8IG5hbWU7XG5cblx0XHRcdFx0Ly8gQm9vbGVhbiBhdHRyaWJ1dGVzIGdldCBzcGVjaWFsIHRyZWF0bWVudCAoIzEwODcwKVxuXHRcdFx0XHRpZiAoIGpRdWVyeS5leHByLm1hdGNoLmJvb2wudGVzdCggbmFtZSApICkge1xuXG5cdFx0XHRcdFx0Ly8gU2V0IGNvcnJlc3BvbmRpbmcgcHJvcGVydHkgdG8gZmFsc2Vcblx0XHRcdFx0XHRlbGVtWyBwcm9wTmFtZSBdID0gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlbGVtLnJlbW92ZUF0dHJpYnV0ZSggbmFtZSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufSApO1xuXG4vLyBIb29rcyBmb3IgYm9vbGVhbiBhdHRyaWJ1dGVzXG5ib29sSG9vayA9IHtcblx0c2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUsIG5hbWUgKSB7XG5cdFx0aWYgKCB2YWx1ZSA9PT0gZmFsc2UgKSB7XG5cblx0XHRcdC8vIFJlbW92ZSBib29sZWFuIGF0dHJpYnV0ZXMgd2hlbiBzZXQgdG8gZmFsc2Vcblx0XHRcdGpRdWVyeS5yZW1vdmVBdHRyKCBlbGVtLCBuYW1lICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCBuYW1lLCBuYW1lICk7XG5cdFx0fVxuXHRcdHJldHVybiBuYW1lO1xuXHR9XG59O1xualF1ZXJ5LmVhY2goIGpRdWVyeS5leHByLm1hdGNoLmJvb2wuc291cmNlLm1hdGNoKCAvXFx3Ky9nICksIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXHR2YXIgZ2V0dGVyID0gYXR0ckhhbmRsZVsgbmFtZSBdIHx8IGpRdWVyeS5maW5kLmF0dHI7XG5cblx0YXR0ckhhbmRsZVsgbmFtZSBdID0gZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuXHRcdHZhciByZXQsIGhhbmRsZTtcblx0XHRpZiAoICFpc1hNTCApIHtcblxuXHRcdFx0Ly8gQXZvaWQgYW4gaW5maW5pdGUgbG9vcCBieSB0ZW1wb3JhcmlseSByZW1vdmluZyB0aGlzIGZ1bmN0aW9uIGZyb20gdGhlIGdldHRlclxuXHRcdFx0aGFuZGxlID0gYXR0ckhhbmRsZVsgbmFtZSBdO1xuXHRcdFx0YXR0ckhhbmRsZVsgbmFtZSBdID0gcmV0O1xuXHRcdFx0cmV0ID0gZ2V0dGVyKCBlbGVtLCBuYW1lLCBpc1hNTCApICE9IG51bGwgP1xuXHRcdFx0XHRuYW1lLnRvTG93ZXJDYXNlKCkgOlxuXHRcdFx0XHRudWxsO1xuXHRcdFx0YXR0ckhhbmRsZVsgbmFtZSBdID0gaGFuZGxlO1xuXHRcdH1cblx0XHRyZXR1cm4gcmV0O1xuXHR9O1xufSApO1xuXG5cblxuXG52YXIgcmZvY3VzYWJsZSA9IC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGJ1dHRvbikkL2ksXG5cdHJjbGlja2FibGUgPSAvXig/OmF8YXJlYSkkL2k7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0cHJvcDogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGpRdWVyeS5wcm9wLCBuYW1lLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgKTtcblx0fSxcblxuXHRyZW1vdmVQcm9wOiBmdW5jdGlvbiggbmFtZSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGRlbGV0ZSB0aGlzWyBqUXVlcnkucHJvcEZpeFsgbmFtZSBdIHx8IG5hbWUgXTtcblx0XHR9ICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmV4dGVuZCgge1xuXHRwcm9wOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG5cdFx0dmFyIHJldCwgaG9va3MsXG5cdFx0XHRuVHlwZSA9IGVsZW0ubm9kZVR5cGU7XG5cblx0XHQvLyBEb24ndCBnZXQvc2V0IHByb3BlcnRpZXMgb24gdGV4dCwgY29tbWVudCBhbmQgYXR0cmlidXRlIG5vZGVzXG5cdFx0aWYgKCBuVHlwZSA9PT0gMyB8fCBuVHlwZSA9PT0gOCB8fCBuVHlwZSA9PT0gMiApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoIG5UeXBlICE9PSAxIHx8ICFqUXVlcnkuaXNYTUxEb2MoIGVsZW0gKSApIHtcblxuXHRcdFx0Ly8gRml4IG5hbWUgYW5kIGF0dGFjaCBob29rc1xuXHRcdFx0bmFtZSA9IGpRdWVyeS5wcm9wRml4WyBuYW1lIF0gfHwgbmFtZTtcblx0XHRcdGhvb2tzID0galF1ZXJ5LnByb3BIb29rc1sgbmFtZSBdO1xuXHRcdH1cblxuXHRcdGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdGlmICggaG9va3MgJiYgXCJzZXRcIiBpbiBob29rcyAmJlxuXHRcdFx0XHQoIHJldCA9IGhvb2tzLnNldCggZWxlbSwgdmFsdWUsIG5hbWUgKSApICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAoIGVsZW1bIG5hbWUgXSA9IHZhbHVlICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICYmICggcmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBuYW1lICkgKSAhPT0gbnVsbCApIHtcblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGVsZW1bIG5hbWUgXTtcblx0fSxcblxuXHRwcm9wSG9va3M6IHtcblx0XHR0YWJJbmRleDoge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdFx0XHQvLyBlbGVtLnRhYkluZGV4IGRvZXNuJ3QgYWx3YXlzIHJldHVybiB0aGVcblx0XHRcdFx0Ly8gY29ycmVjdCB2YWx1ZSB3aGVuIGl0IGhhc24ndCBiZWVuIGV4cGxpY2l0bHkgc2V0XG5cdFx0XHRcdC8vIGh0dHA6Ly9mbHVpZHByb2plY3Qub3JnL2Jsb2cvMjAwOC8wMS8wOS9nZXR0aW5nLXNldHRpbmctYW5kLXJlbW92aW5nLXRhYmluZGV4LXZhbHVlcy13aXRoLWphdmFzY3JpcHQvXG5cdFx0XHRcdC8vIFVzZSBwcm9wZXIgYXR0cmlidXRlIHJldHJpZXZhbCgjMTIwNzIpXG5cdFx0XHRcdHZhciB0YWJpbmRleCA9IGpRdWVyeS5maW5kLmF0dHIoIGVsZW0sIFwidGFiaW5kZXhcIiApO1xuXG5cdFx0XHRcdHJldHVybiB0YWJpbmRleCA/XG5cdFx0XHRcdFx0cGFyc2VJbnQoIHRhYmluZGV4LCAxMCApIDpcblx0XHRcdFx0XHRyZm9jdXNhYmxlLnRlc3QoIGVsZW0ubm9kZU5hbWUgKSB8fFxuXHRcdFx0XHRcdFx0cmNsaWNrYWJsZS50ZXN0KCBlbGVtLm5vZGVOYW1lICkgJiYgZWxlbS5ocmVmID9cblx0XHRcdFx0XHRcdFx0MCA6XG5cdFx0XHRcdFx0XHRcdC0xO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRwcm9wRml4OiB7XG5cdFx0XCJmb3JcIjogXCJodG1sRm9yXCIsXG5cdFx0XCJjbGFzc1wiOiBcImNsYXNzTmFtZVwiXG5cdH1cbn0gKTtcblxuaWYgKCAhc3VwcG9ydC5vcHRTZWxlY3RlZCApIHtcblx0alF1ZXJ5LnByb3BIb29rcy5zZWxlY3RlZCA9IHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0dmFyIHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcblx0XHRcdGlmICggcGFyZW50ICYmIHBhcmVudC5wYXJlbnROb2RlICkge1xuXHRcdFx0XHRwYXJlbnQucGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9O1xufVxuXG5qUXVlcnkuZWFjaCggW1xuXHRcInRhYkluZGV4XCIsXG5cdFwicmVhZE9ubHlcIixcblx0XCJtYXhMZW5ndGhcIixcblx0XCJjZWxsU3BhY2luZ1wiLFxuXHRcImNlbGxQYWRkaW5nXCIsXG5cdFwicm93U3BhblwiLFxuXHRcImNvbFNwYW5cIixcblx0XCJ1c2VNYXBcIixcblx0XCJmcmFtZUJvcmRlclwiLFxuXHRcImNvbnRlbnRFZGl0YWJsZVwiXG5dLCBmdW5jdGlvbigpIHtcblx0alF1ZXJ5LnByb3BGaXhbIHRoaXMudG9Mb3dlckNhc2UoKSBdID0gdGhpcztcbn0gKTtcblxuXG5cblxudmFyIHJjbGFzcyA9IC9bXFx0XFxyXFxuXFxmXS9nO1xuXG5mdW5jdGlvbiBnZXRDbGFzcyggZWxlbSApIHtcblx0cmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlICYmIGVsZW0uZ2V0QXR0cmlidXRlKCBcImNsYXNzXCIgKSB8fCBcIlwiO1xufVxuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGFkZENsYXNzOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0dmFyIGNsYXNzZXMsIGVsZW0sIGN1ciwgY3VyVmFsdWUsIGNsYXp6LCBqLCBmaW5hbFZhbHVlLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oIGogKSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLmFkZENsYXNzKCB2YWx1ZS5jYWxsKCB0aGlzLCBqLCBnZXRDbGFzcyggdGhpcyApICkgKTtcblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZSApIHtcblx0XHRcdGNsYXNzZXMgPSB2YWx1ZS5tYXRjaCggcm5vdHdoaXRlICkgfHwgW107XG5cblx0XHRcdHdoaWxlICggKCBlbGVtID0gdGhpc1sgaSsrIF0gKSApIHtcblx0XHRcdFx0Y3VyVmFsdWUgPSBnZXRDbGFzcyggZWxlbSApO1xuXHRcdFx0XHRjdXIgPSBlbGVtLm5vZGVUeXBlID09PSAxICYmXG5cdFx0XHRcdFx0KCBcIiBcIiArIGN1clZhbHVlICsgXCIgXCIgKS5yZXBsYWNlKCByY2xhc3MsIFwiIFwiICk7XG5cblx0XHRcdFx0aWYgKCBjdXIgKSB7XG5cdFx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdFx0d2hpbGUgKCAoIGNsYXp6ID0gY2xhc3Nlc1sgaisrIF0gKSApIHtcblx0XHRcdFx0XHRcdGlmICggY3VyLmluZGV4T2YoIFwiIFwiICsgY2xhenogKyBcIiBcIiApIDwgMCApIHtcblx0XHRcdFx0XHRcdFx0Y3VyICs9IGNsYXp6ICsgXCIgXCI7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gT25seSBhc3NpZ24gaWYgZGlmZmVyZW50IHRvIGF2b2lkIHVubmVlZGVkIHJlbmRlcmluZy5cblx0XHRcdFx0XHRmaW5hbFZhbHVlID0galF1ZXJ5LnRyaW0oIGN1ciApO1xuXHRcdFx0XHRcdGlmICggY3VyVmFsdWUgIT09IGZpbmFsVmFsdWUgKSB7XG5cdFx0XHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggXCJjbGFzc1wiLCBmaW5hbFZhbHVlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0cmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHR2YXIgY2xhc3NlcywgZWxlbSwgY3VyLCBjdXJWYWx1ZSwgY2xhenosIGosIGZpbmFsVmFsdWUsXG5cdFx0XHRpID0gMDtcblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaiApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkucmVtb3ZlQ2xhc3MoIHZhbHVlLmNhbGwoIHRoaXMsIGosIGdldENsYXNzKCB0aGlzICkgKSApO1xuXHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdGlmICggIWFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5hdHRyKCBcImNsYXNzXCIsIFwiXCIgKTtcblx0XHR9XG5cblx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZSApIHtcblx0XHRcdGNsYXNzZXMgPSB2YWx1ZS5tYXRjaCggcm5vdHdoaXRlICkgfHwgW107XG5cblx0XHRcdHdoaWxlICggKCBlbGVtID0gdGhpc1sgaSsrIF0gKSApIHtcblx0XHRcdFx0Y3VyVmFsdWUgPSBnZXRDbGFzcyggZWxlbSApO1xuXG5cdFx0XHRcdC8vIFRoaXMgZXhwcmVzc2lvbiBpcyBoZXJlIGZvciBiZXR0ZXIgY29tcHJlc3NpYmlsaXR5IChzZWUgYWRkQ2xhc3MpXG5cdFx0XHRcdGN1ciA9IGVsZW0ubm9kZVR5cGUgPT09IDEgJiZcblx0XHRcdFx0XHQoIFwiIFwiICsgY3VyVmFsdWUgKyBcIiBcIiApLnJlcGxhY2UoIHJjbGFzcywgXCIgXCIgKTtcblxuXHRcdFx0XHRpZiAoIGN1ciApIHtcblx0XHRcdFx0XHRqID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoICggY2xhenogPSBjbGFzc2VzWyBqKysgXSApICkge1xuXG5cdFx0XHRcdFx0XHQvLyBSZW1vdmUgKmFsbCogaW5zdGFuY2VzXG5cdFx0XHRcdFx0XHR3aGlsZSAoIGN1ci5pbmRleE9mKCBcIiBcIiArIGNsYXp6ICsgXCIgXCIgKSA+IC0xICkge1xuXHRcdFx0XHRcdFx0XHRjdXIgPSBjdXIucmVwbGFjZSggXCIgXCIgKyBjbGF6eiArIFwiIFwiLCBcIiBcIiApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIE9ubHkgYXNzaWduIGlmIGRpZmZlcmVudCB0byBhdm9pZCB1bm5lZWRlZCByZW5kZXJpbmcuXG5cdFx0XHRcdFx0ZmluYWxWYWx1ZSA9IGpRdWVyeS50cmltKCBjdXIgKTtcblx0XHRcdFx0XHRpZiAoIGN1clZhbHVlICE9PSBmaW5hbFZhbHVlICkge1xuXHRcdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIFwiY2xhc3NcIiwgZmluYWxWYWx1ZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHRvZ2dsZUNsYXNzOiBmdW5jdGlvbiggdmFsdWUsIHN0YXRlVmFsICkge1xuXHRcdHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuXG5cdFx0aWYgKCB0eXBlb2Ygc3RhdGVWYWwgPT09IFwiYm9vbGVhblwiICYmIHR5cGUgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRyZXR1cm4gc3RhdGVWYWwgPyB0aGlzLmFkZENsYXNzKCB2YWx1ZSApIDogdGhpcy5yZW1vdmVDbGFzcyggdmFsdWUgKTtcblx0XHR9XG5cblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLnRvZ2dsZUNsYXNzKFxuXHRcdFx0XHRcdHZhbHVlLmNhbGwoIHRoaXMsIGksIGdldENsYXNzKCB0aGlzICksIHN0YXRlVmFsICksXG5cdFx0XHRcdFx0c3RhdGVWYWxcblx0XHRcdFx0KTtcblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBjbGFzc05hbWUsIGksIHNlbGYsIGNsYXNzTmFtZXM7XG5cblx0XHRcdGlmICggdHlwZSA9PT0gXCJzdHJpbmdcIiApIHtcblxuXHRcdFx0XHQvLyBUb2dnbGUgaW5kaXZpZHVhbCBjbGFzcyBuYW1lc1xuXHRcdFx0XHRpID0gMDtcblx0XHRcdFx0c2VsZiA9IGpRdWVyeSggdGhpcyApO1xuXHRcdFx0XHRjbGFzc05hbWVzID0gdmFsdWUubWF0Y2goIHJub3R3aGl0ZSApIHx8IFtdO1xuXG5cdFx0XHRcdHdoaWxlICggKCBjbGFzc05hbWUgPSBjbGFzc05hbWVzWyBpKysgXSApICkge1xuXG5cdFx0XHRcdFx0Ly8gQ2hlY2sgZWFjaCBjbGFzc05hbWUgZ2l2ZW4sIHNwYWNlIHNlcGFyYXRlZCBsaXN0XG5cdFx0XHRcdFx0aWYgKCBzZWxmLmhhc0NsYXNzKCBjbGFzc05hbWUgKSApIHtcblx0XHRcdFx0XHRcdHNlbGYucmVtb3ZlQ2xhc3MoIGNsYXNzTmFtZSApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRzZWxmLmFkZENsYXNzKCBjbGFzc05hbWUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0Ly8gVG9nZ2xlIHdob2xlIGNsYXNzIG5hbWVcblx0XHRcdH0gZWxzZSBpZiAoIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdHlwZSA9PT0gXCJib29sZWFuXCIgKSB7XG5cdFx0XHRcdGNsYXNzTmFtZSA9IGdldENsYXNzKCB0aGlzICk7XG5cdFx0XHRcdGlmICggY2xhc3NOYW1lICkge1xuXG5cdFx0XHRcdFx0Ly8gU3RvcmUgY2xhc3NOYW1lIGlmIHNldFxuXHRcdFx0XHRcdGRhdGFQcml2LnNldCggdGhpcywgXCJfX2NsYXNzTmFtZV9fXCIsIGNsYXNzTmFtZSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gSWYgdGhlIGVsZW1lbnQgaGFzIGEgY2xhc3MgbmFtZSBvciBpZiB3ZSdyZSBwYXNzZWQgYGZhbHNlYCxcblx0XHRcdFx0Ly8gdGhlbiByZW1vdmUgdGhlIHdob2xlIGNsYXNzbmFtZSAoaWYgdGhlcmUgd2FzIG9uZSwgdGhlIGFib3ZlIHNhdmVkIGl0KS5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlIGJyaW5nIGJhY2sgd2hhdGV2ZXIgd2FzIHByZXZpb3VzbHkgc2F2ZWQgKGlmIGFueXRoaW5nKSxcblx0XHRcdFx0Ly8gZmFsbGluZyBiYWNrIHRvIHRoZSBlbXB0eSBzdHJpbmcgaWYgbm90aGluZyB3YXMgc3RvcmVkLlxuXHRcdFx0XHRpZiAoIHRoaXMuc2V0QXR0cmlidXRlICkge1xuXHRcdFx0XHRcdHRoaXMuc2V0QXR0cmlidXRlKCBcImNsYXNzXCIsXG5cdFx0XHRcdFx0XHRjbGFzc05hbWUgfHwgdmFsdWUgPT09IGZhbHNlID9cblx0XHRcdFx0XHRcdFwiXCIgOlxuXHRcdFx0XHRcdFx0ZGF0YVByaXYuZ2V0KCB0aGlzLCBcIl9fY2xhc3NOYW1lX19cIiApIHx8IFwiXCJcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGhhc0NsYXNzOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0dmFyIGNsYXNzTmFtZSwgZWxlbSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Y2xhc3NOYW1lID0gXCIgXCIgKyBzZWxlY3RvciArIFwiIFwiO1xuXHRcdHdoaWxlICggKCBlbGVtID0gdGhpc1sgaSsrIF0gKSApIHtcblx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSAmJlxuXHRcdFx0XHQoIFwiIFwiICsgZ2V0Q2xhc3MoIGVsZW0gKSArIFwiIFwiICkucmVwbGFjZSggcmNsYXNzLCBcIiBcIiApXG5cdFx0XHRcdFx0LmluZGV4T2YoIGNsYXNzTmFtZSApID4gLTFcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn0gKTtcblxuXG5cblxudmFyIHJyZXR1cm4gPSAvXFxyL2c7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0dmFsOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0dmFyIGhvb2tzLCByZXQsIGlzRnVuY3Rpb24sXG5cdFx0XHRlbGVtID0gdGhpc1sgMCBdO1xuXG5cdFx0aWYgKCAhYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRcdGlmICggZWxlbSApIHtcblx0XHRcdFx0aG9va3MgPSBqUXVlcnkudmFsSG9va3NbIGVsZW0udHlwZSBdIHx8XG5cdFx0XHRcdFx0alF1ZXJ5LnZhbEhvb2tzWyBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgXTtcblxuXHRcdFx0XHRpZiAoIGhvb2tzICYmXG5cdFx0XHRcdFx0XCJnZXRcIiBpbiBob29rcyAmJlxuXHRcdFx0XHRcdCggcmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBcInZhbHVlXCIgKSApICE9PSB1bmRlZmluZWRcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldCA9IGVsZW0udmFsdWU7XG5cblx0XHRcdFx0cmV0dXJuIHR5cGVvZiByZXQgPT09IFwic3RyaW5nXCIgP1xuXG5cdFx0XHRcdFx0Ly8gSGFuZGxlIG1vc3QgY29tbW9uIHN0cmluZyBjYXNlc1xuXHRcdFx0XHRcdHJldC5yZXBsYWNlKCBycmV0dXJuLCBcIlwiICkgOlxuXG5cdFx0XHRcdFx0Ly8gSGFuZGxlIGNhc2VzIHdoZXJlIHZhbHVlIGlzIG51bGwvdW5kZWYgb3IgbnVtYmVyXG5cdFx0XHRcdFx0cmV0ID09IG51bGwgPyBcIlwiIDogcmV0O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aXNGdW5jdGlvbiA9IGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApO1xuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHR2YXIgdmFsO1xuXG5cdFx0XHRpZiAoIHRoaXMubm9kZVR5cGUgIT09IDEgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBpc0Z1bmN0aW9uICkge1xuXHRcdFx0XHR2YWwgPSB2YWx1ZS5jYWxsKCB0aGlzLCBpLCBqUXVlcnkoIHRoaXMgKS52YWwoKSApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFsID0gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFRyZWF0IG51bGwvdW5kZWZpbmVkIGFzIFwiXCI7IGNvbnZlcnQgbnVtYmVycyB0byBzdHJpbmdcblx0XHRcdGlmICggdmFsID09IG51bGwgKSB7XG5cdFx0XHRcdHZhbCA9IFwiXCI7XG5cblx0XHRcdH0gZWxzZSBpZiAoIHR5cGVvZiB2YWwgPT09IFwibnVtYmVyXCIgKSB7XG5cdFx0XHRcdHZhbCArPSBcIlwiO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCBqUXVlcnkuaXNBcnJheSggdmFsICkgKSB7XG5cdFx0XHRcdHZhbCA9IGpRdWVyeS5tYXAoIHZhbCwgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0XHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gXCJcIiA6IHZhbHVlICsgXCJcIjtcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXG5cdFx0XHRob29rcyA9IGpRdWVyeS52YWxIb29rc1sgdGhpcy50eXBlIF0gfHwgalF1ZXJ5LnZhbEhvb2tzWyB0aGlzLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgXTtcblxuXHRcdFx0Ly8gSWYgc2V0IHJldHVybnMgdW5kZWZpbmVkLCBmYWxsIGJhY2sgdG8gbm9ybWFsIHNldHRpbmdcblx0XHRcdGlmICggIWhvb2tzIHx8ICEoIFwic2V0XCIgaW4gaG9va3MgKSB8fCBob29rcy5zZXQoIHRoaXMsIHZhbCwgXCJ2YWx1ZVwiICkgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0dGhpcy52YWx1ZSA9IHZhbDtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmV4dGVuZCgge1xuXHR2YWxIb29rczoge1xuXHRcdG9wdGlvbjoge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRTwxMVxuXHRcdFx0XHQvLyBvcHRpb24udmFsdWUgbm90IHRyaW1tZWQgKCMxNDg1OClcblx0XHRcdFx0cmV0dXJuIGpRdWVyeS50cmltKCBlbGVtLnZhbHVlICk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRzZWxlY3Q6IHtcblx0XHRcdGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciB2YWx1ZSwgb3B0aW9uLFxuXHRcdFx0XHRcdG9wdGlvbnMgPSBlbGVtLm9wdGlvbnMsXG5cdFx0XHRcdFx0aW5kZXggPSBlbGVtLnNlbGVjdGVkSW5kZXgsXG5cdFx0XHRcdFx0b25lID0gZWxlbS50eXBlID09PSBcInNlbGVjdC1vbmVcIiB8fCBpbmRleCA8IDAsXG5cdFx0XHRcdFx0dmFsdWVzID0gb25lID8gbnVsbCA6IFtdLFxuXHRcdFx0XHRcdG1heCA9IG9uZSA/IGluZGV4ICsgMSA6IG9wdGlvbnMubGVuZ3RoLFxuXHRcdFx0XHRcdGkgPSBpbmRleCA8IDAgP1xuXHRcdFx0XHRcdFx0bWF4IDpcblx0XHRcdFx0XHRcdG9uZSA/IGluZGV4IDogMDtcblxuXHRcdFx0XHQvLyBMb29wIHRocm91Z2ggYWxsIHRoZSBzZWxlY3RlZCBvcHRpb25zXG5cdFx0XHRcdGZvciAoIDsgaSA8IG1heDsgaSsrICkge1xuXHRcdFx0XHRcdG9wdGlvbiA9IG9wdGlvbnNbIGkgXTtcblxuXHRcdFx0XHRcdC8vIElFOC05IGRvZXNuJ3QgdXBkYXRlIHNlbGVjdGVkIGFmdGVyIGZvcm0gcmVzZXQgKCMyNTUxKVxuXHRcdFx0XHRcdGlmICggKCBvcHRpb24uc2VsZWN0ZWQgfHwgaSA9PT0gaW5kZXggKSAmJlxuXG5cdFx0XHRcdFx0XHRcdC8vIERvbid0IHJldHVybiBvcHRpb25zIHRoYXQgYXJlIGRpc2FibGVkIG9yIGluIGEgZGlzYWJsZWQgb3B0Z3JvdXBcblx0XHRcdFx0XHRcdFx0KCBzdXBwb3J0Lm9wdERpc2FibGVkID9cblx0XHRcdFx0XHRcdFx0XHQhb3B0aW9uLmRpc2FibGVkIDogb3B0aW9uLmdldEF0dHJpYnV0ZSggXCJkaXNhYmxlZFwiICkgPT09IG51bGwgKSAmJlxuXHRcdFx0XHRcdFx0XHQoICFvcHRpb24ucGFyZW50Tm9kZS5kaXNhYmxlZCB8fFxuXHRcdFx0XHRcdFx0XHRcdCFqUXVlcnkubm9kZU5hbWUoIG9wdGlvbi5wYXJlbnROb2RlLCBcIm9wdGdyb3VwXCIgKSApICkge1xuXG5cdFx0XHRcdFx0XHQvLyBHZXQgdGhlIHNwZWNpZmljIHZhbHVlIGZvciB0aGUgb3B0aW9uXG5cdFx0XHRcdFx0XHR2YWx1ZSA9IGpRdWVyeSggb3B0aW9uICkudmFsKCk7XG5cblx0XHRcdFx0XHRcdC8vIFdlIGRvbid0IG5lZWQgYW4gYXJyYXkgZm9yIG9uZSBzZWxlY3RzXG5cdFx0XHRcdFx0XHRpZiAoIG9uZSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBNdWx0aS1TZWxlY3RzIHJldHVybiBhbiBhcnJheVxuXHRcdFx0XHRcdFx0dmFsdWVzLnB1c2goIHZhbHVlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHZhbHVlcztcblx0XHRcdH0sXG5cblx0XHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdFx0XHR2YXIgb3B0aW9uU2V0LCBvcHRpb24sXG5cdFx0XHRcdFx0b3B0aW9ucyA9IGVsZW0ub3B0aW9ucyxcblx0XHRcdFx0XHR2YWx1ZXMgPSBqUXVlcnkubWFrZUFycmF5KCB2YWx1ZSApLFxuXHRcdFx0XHRcdGkgPSBvcHRpb25zLmxlbmd0aDtcblxuXHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRvcHRpb24gPSBvcHRpb25zWyBpIF07XG5cdFx0XHRcdFx0aWYgKCBvcHRpb24uc2VsZWN0ZWQgPVxuXHRcdFx0XHRcdFx0XHRqUXVlcnkuaW5BcnJheSggalF1ZXJ5LnZhbEhvb2tzLm9wdGlvbi5nZXQoIG9wdGlvbiApLCB2YWx1ZXMgKSA+IC0xXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRvcHRpb25TZXQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEZvcmNlIGJyb3dzZXJzIHRvIGJlaGF2ZSBjb25zaXN0ZW50bHkgd2hlbiBub24tbWF0Y2hpbmcgdmFsdWUgaXMgc2V0XG5cdFx0XHRcdGlmICggIW9wdGlvblNldCApIHtcblx0XHRcdFx0XHRlbGVtLnNlbGVjdGVkSW5kZXggPSAtMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdmFsdWVzO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufSApO1xuXG4vLyBSYWRpb3MgYW5kIGNoZWNrYm94ZXMgZ2V0dGVyL3NldHRlclxualF1ZXJ5LmVhY2goIFsgXCJyYWRpb1wiLCBcImNoZWNrYm94XCIgXSwgZnVuY3Rpb24oKSB7XG5cdGpRdWVyeS52YWxIb29rc1sgdGhpcyBdID0ge1xuXHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdFx0aWYgKCBqUXVlcnkuaXNBcnJheSggdmFsdWUgKSApIHtcblx0XHRcdFx0cmV0dXJuICggZWxlbS5jaGVja2VkID0galF1ZXJ5LmluQXJyYXkoIGpRdWVyeSggZWxlbSApLnZhbCgpLCB2YWx1ZSApID4gLTEgKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdGlmICggIXN1cHBvcnQuY2hlY2tPbiApIHtcblx0XHRqUXVlcnkudmFsSG9va3NbIHRoaXMgXS5nZXQgPSBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZSggXCJ2YWx1ZVwiICkgPT09IG51bGwgPyBcIm9uXCIgOiBlbGVtLnZhbHVlO1xuXHRcdH07XG5cdH1cbn0gKTtcblxuXG5cblxuLy8gUmV0dXJuIGpRdWVyeSBmb3IgYXR0cmlidXRlcy1vbmx5IGluY2x1c2lvblxuXG5cbnZhciByZm9jdXNNb3JwaCA9IC9eKD86Zm9jdXNpbmZvY3VzfGZvY3Vzb3V0Ymx1cikkLztcblxualF1ZXJ5LmV4dGVuZCggalF1ZXJ5LmV2ZW50LCB7XG5cblx0dHJpZ2dlcjogZnVuY3Rpb24oIGV2ZW50LCBkYXRhLCBlbGVtLCBvbmx5SGFuZGxlcnMgKSB7XG5cblx0XHR2YXIgaSwgY3VyLCB0bXAsIGJ1YmJsZVR5cGUsIG9udHlwZSwgaGFuZGxlLCBzcGVjaWFsLFxuXHRcdFx0ZXZlbnRQYXRoID0gWyBlbGVtIHx8IGRvY3VtZW50IF0sXG5cdFx0XHR0eXBlID0gaGFzT3duLmNhbGwoIGV2ZW50LCBcInR5cGVcIiApID8gZXZlbnQudHlwZSA6IGV2ZW50LFxuXHRcdFx0bmFtZXNwYWNlcyA9IGhhc093bi5jYWxsKCBldmVudCwgXCJuYW1lc3BhY2VcIiApID8gZXZlbnQubmFtZXNwYWNlLnNwbGl0KCBcIi5cIiApIDogW107XG5cblx0XHRjdXIgPSB0bXAgPSBlbGVtID0gZWxlbSB8fCBkb2N1bWVudDtcblxuXHRcdC8vIERvbid0IGRvIGV2ZW50cyBvbiB0ZXh0IGFuZCBjb21tZW50IG5vZGVzXG5cdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAzIHx8IGVsZW0ubm9kZVR5cGUgPT09IDggKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gZm9jdXMvYmx1ciBtb3JwaHMgdG8gZm9jdXNpbi9vdXQ7IGVuc3VyZSB3ZSdyZSBub3QgZmlyaW5nIHRoZW0gcmlnaHQgbm93XG5cdFx0aWYgKCByZm9jdXNNb3JwaC50ZXN0KCB0eXBlICsgalF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCApICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICggdHlwZS5pbmRleE9mKCBcIi5cIiApID4gLTEgKSB7XG5cblx0XHRcdC8vIE5hbWVzcGFjZWQgdHJpZ2dlcjsgY3JlYXRlIGEgcmVnZXhwIHRvIG1hdGNoIGV2ZW50IHR5cGUgaW4gaGFuZGxlKClcblx0XHRcdG5hbWVzcGFjZXMgPSB0eXBlLnNwbGl0KCBcIi5cIiApO1xuXHRcdFx0dHlwZSA9IG5hbWVzcGFjZXMuc2hpZnQoKTtcblx0XHRcdG5hbWVzcGFjZXMuc29ydCgpO1xuXHRcdH1cblx0XHRvbnR5cGUgPSB0eXBlLmluZGV4T2YoIFwiOlwiICkgPCAwICYmIFwib25cIiArIHR5cGU7XG5cblx0XHQvLyBDYWxsZXIgY2FuIHBhc3MgaW4gYSBqUXVlcnkuRXZlbnQgb2JqZWN0LCBPYmplY3QsIG9yIGp1c3QgYW4gZXZlbnQgdHlwZSBzdHJpbmdcblx0XHRldmVudCA9IGV2ZW50WyBqUXVlcnkuZXhwYW5kbyBdID9cblx0XHRcdGV2ZW50IDpcblx0XHRcdG5ldyBqUXVlcnkuRXZlbnQoIHR5cGUsIHR5cGVvZiBldmVudCA9PT0gXCJvYmplY3RcIiAmJiBldmVudCApO1xuXG5cdFx0Ly8gVHJpZ2dlciBiaXRtYXNrOiAmIDEgZm9yIG5hdGl2ZSBoYW5kbGVyczsgJiAyIGZvciBqUXVlcnkgKGFsd2F5cyB0cnVlKVxuXHRcdGV2ZW50LmlzVHJpZ2dlciA9IG9ubHlIYW5kbGVycyA/IDIgOiAzO1xuXHRcdGV2ZW50Lm5hbWVzcGFjZSA9IG5hbWVzcGFjZXMuam9pbiggXCIuXCIgKTtcblx0XHRldmVudC5ybmFtZXNwYWNlID0gZXZlbnQubmFtZXNwYWNlID9cblx0XHRcdG5ldyBSZWdFeHAoIFwiKF58XFxcXC4pXCIgKyBuYW1lc3BhY2VzLmpvaW4oIFwiXFxcXC4oPzouKlxcXFwufClcIiApICsgXCIoXFxcXC58JClcIiApIDpcblx0XHRcdG51bGw7XG5cblx0XHQvLyBDbGVhbiB1cCB0aGUgZXZlbnQgaW4gY2FzZSBpdCBpcyBiZWluZyByZXVzZWRcblx0XHRldmVudC5yZXN1bHQgPSB1bmRlZmluZWQ7XG5cdFx0aWYgKCAhZXZlbnQudGFyZ2V0ICkge1xuXHRcdFx0ZXZlbnQudGFyZ2V0ID0gZWxlbTtcblx0XHR9XG5cblx0XHQvLyBDbG9uZSBhbnkgaW5jb21pbmcgZGF0YSBhbmQgcHJlcGVuZCB0aGUgZXZlbnQsIGNyZWF0aW5nIHRoZSBoYW5kbGVyIGFyZyBsaXN0XG5cdFx0ZGF0YSA9IGRhdGEgPT0gbnVsbCA/XG5cdFx0XHRbIGV2ZW50IF0gOlxuXHRcdFx0alF1ZXJ5Lm1ha2VBcnJheSggZGF0YSwgWyBldmVudCBdICk7XG5cblx0XHQvLyBBbGxvdyBzcGVjaWFsIGV2ZW50cyB0byBkcmF3IG91dHNpZGUgdGhlIGxpbmVzXG5cdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cdFx0aWYgKCAhb25seUhhbmRsZXJzICYmIHNwZWNpYWwudHJpZ2dlciAmJiBzcGVjaWFsLnRyaWdnZXIuYXBwbHkoIGVsZW0sIGRhdGEgKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZXJtaW5lIGV2ZW50IHByb3BhZ2F0aW9uIHBhdGggaW4gYWR2YW5jZSwgcGVyIFczQyBldmVudHMgc3BlYyAoIzk5NTEpXG5cdFx0Ly8gQnViYmxlIHVwIHRvIGRvY3VtZW50LCB0aGVuIHRvIHdpbmRvdzsgd2F0Y2ggZm9yIGEgZ2xvYmFsIG93bmVyRG9jdW1lbnQgdmFyICgjOTcyNClcblx0XHRpZiAoICFvbmx5SGFuZGxlcnMgJiYgIXNwZWNpYWwubm9CdWJibGUgJiYgIWpRdWVyeS5pc1dpbmRvdyggZWxlbSApICkge1xuXG5cdFx0XHRidWJibGVUeXBlID0gc3BlY2lhbC5kZWxlZ2F0ZVR5cGUgfHwgdHlwZTtcblx0XHRcdGlmICggIXJmb2N1c01vcnBoLnRlc3QoIGJ1YmJsZVR5cGUgKyB0eXBlICkgKSB7XG5cdFx0XHRcdGN1ciA9IGN1ci5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXHRcdFx0Zm9yICggOyBjdXI7IGN1ciA9IGN1ci5wYXJlbnROb2RlICkge1xuXHRcdFx0XHRldmVudFBhdGgucHVzaCggY3VyICk7XG5cdFx0XHRcdHRtcCA9IGN1cjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gT25seSBhZGQgd2luZG93IGlmIHdlIGdvdCB0byBkb2N1bWVudCAoZS5nLiwgbm90IHBsYWluIG9iaiBvciBkZXRhY2hlZCBET00pXG5cdFx0XHRpZiAoIHRtcCA9PT0gKCBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQgKSApIHtcblx0XHRcdFx0ZXZlbnRQYXRoLnB1c2goIHRtcC5kZWZhdWx0VmlldyB8fCB0bXAucGFyZW50V2luZG93IHx8IHdpbmRvdyApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEZpcmUgaGFuZGxlcnMgb24gdGhlIGV2ZW50IHBhdGhcblx0XHRpID0gMDtcblx0XHR3aGlsZSAoICggY3VyID0gZXZlbnRQYXRoWyBpKysgXSApICYmICFldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXG5cdFx0XHRldmVudC50eXBlID0gaSA+IDEgP1xuXHRcdFx0XHRidWJibGVUeXBlIDpcblx0XHRcdFx0c3BlY2lhbC5iaW5kVHlwZSB8fCB0eXBlO1xuXG5cdFx0XHQvLyBqUXVlcnkgaGFuZGxlclxuXHRcdFx0aGFuZGxlID0gKCBkYXRhUHJpdi5nZXQoIGN1ciwgXCJldmVudHNcIiApIHx8IHt9IClbIGV2ZW50LnR5cGUgXSAmJlxuXHRcdFx0XHRkYXRhUHJpdi5nZXQoIGN1ciwgXCJoYW5kbGVcIiApO1xuXHRcdFx0aWYgKCBoYW5kbGUgKSB7XG5cdFx0XHRcdGhhbmRsZS5hcHBseSggY3VyLCBkYXRhICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE5hdGl2ZSBoYW5kbGVyXG5cdFx0XHRoYW5kbGUgPSBvbnR5cGUgJiYgY3VyWyBvbnR5cGUgXTtcblx0XHRcdGlmICggaGFuZGxlICYmIGhhbmRsZS5hcHBseSAmJiBhY2NlcHREYXRhKCBjdXIgKSApIHtcblx0XHRcdFx0ZXZlbnQucmVzdWx0ID0gaGFuZGxlLmFwcGx5KCBjdXIsIGRhdGEgKTtcblx0XHRcdFx0aWYgKCBldmVudC5yZXN1bHQgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0ZXZlbnQudHlwZSA9IHR5cGU7XG5cblx0XHQvLyBJZiBub2JvZHkgcHJldmVudGVkIHRoZSBkZWZhdWx0IGFjdGlvbiwgZG8gaXQgbm93XG5cdFx0aWYgKCAhb25seUhhbmRsZXJzICYmICFldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSApIHtcblxuXHRcdFx0aWYgKCAoICFzcGVjaWFsLl9kZWZhdWx0IHx8XG5cdFx0XHRcdHNwZWNpYWwuX2RlZmF1bHQuYXBwbHkoIGV2ZW50UGF0aC5wb3AoKSwgZGF0YSApID09PSBmYWxzZSApICYmXG5cdFx0XHRcdGFjY2VwdERhdGEoIGVsZW0gKSApIHtcblxuXHRcdFx0XHQvLyBDYWxsIGEgbmF0aXZlIERPTSBtZXRob2Qgb24gdGhlIHRhcmdldCB3aXRoIHRoZSBzYW1lIG5hbWUgbmFtZSBhcyB0aGUgZXZlbnQuXG5cdFx0XHRcdC8vIERvbid0IGRvIGRlZmF1bHQgYWN0aW9ucyBvbiB3aW5kb3csIHRoYXQncyB3aGVyZSBnbG9iYWwgdmFyaWFibGVzIGJlICgjNjE3MClcblx0XHRcdFx0aWYgKCBvbnR5cGUgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIGVsZW1bIHR5cGUgXSApICYmICFqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSApIHtcblxuXHRcdFx0XHRcdC8vIERvbid0IHJlLXRyaWdnZXIgYW4gb25GT08gZXZlbnQgd2hlbiB3ZSBjYWxsIGl0cyBGT08oKSBtZXRob2Rcblx0XHRcdFx0XHR0bXAgPSBlbGVtWyBvbnR5cGUgXTtcblxuXHRcdFx0XHRcdGlmICggdG1wICkge1xuXHRcdFx0XHRcdFx0ZWxlbVsgb250eXBlIF0gPSBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFByZXZlbnQgcmUtdHJpZ2dlcmluZyBvZiB0aGUgc2FtZSBldmVudCwgc2luY2Ugd2UgYWxyZWFkeSBidWJibGVkIGl0IGFib3ZlXG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCA9IHR5cGU7XG5cdFx0XHRcdFx0ZWxlbVsgdHlwZSBdKCk7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0XHRcdGlmICggdG1wICkge1xuXHRcdFx0XHRcdFx0ZWxlbVsgb250eXBlIF0gPSB0bXA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LnJlc3VsdDtcblx0fSxcblxuXHQvLyBQaWdneWJhY2sgb24gYSBkb25vciBldmVudCB0byBzaW11bGF0ZSBhIGRpZmZlcmVudCBvbmVcblx0c2ltdWxhdGU6IGZ1bmN0aW9uKCB0eXBlLCBlbGVtLCBldmVudCApIHtcblx0XHR2YXIgZSA9IGpRdWVyeS5leHRlbmQoXG5cdFx0XHRuZXcgalF1ZXJ5LkV2ZW50KCksXG5cdFx0XHRldmVudCxcblx0XHRcdHtcblx0XHRcdFx0dHlwZTogdHlwZSxcblx0XHRcdFx0aXNTaW11bGF0ZWQ6IHRydWVcblxuXHRcdFx0XHQvLyBQcmV2aW91c2x5LCBgb3JpZ2luYWxFdmVudDoge31gIHdhcyBzZXQgaGVyZSwgc28gc3RvcFByb3BhZ2F0aW9uIGNhbGxcblx0XHRcdFx0Ly8gd291bGQgbm90IGJlIHRyaWdnZXJlZCBvbiBkb25vciBldmVudCwgc2luY2UgaW4gb3VyIG93blxuXHRcdFx0XHQvLyBqUXVlcnkuZXZlbnQuc3RvcFByb3BhZ2F0aW9uIGZ1bmN0aW9uIHdlIGhhZCBhIGNoZWNrIGZvciBleGlzdGVuY2Ugb2Zcblx0XHRcdFx0Ly8gb3JpZ2luYWxFdmVudC5zdG9wUHJvcGFnYXRpb24gbWV0aG9kLCBzbywgY29uc2VxdWVudGx5IGl0IHdvdWxkIGJlIGEgbm9vcC5cblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gQnV0IG5vdywgdGhpcyBcInNpbXVsYXRlXCIgZnVuY3Rpb24gaXMgdXNlZCBvbmx5IGZvciBldmVudHNcblx0XHRcdFx0Ly8gZm9yIHdoaWNoIHN0b3BQcm9wYWdhdGlvbigpIGlzIG5vb3AsIHNvIHRoZXJlIGlzIG5vIG5lZWQgZm9yIHRoYXQgYW55bW9yZS5cblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gRm9yIHRoZSAxLnggYnJhbmNoIHRob3VnaCwgZ3VhcmQgZm9yIFwiY2xpY2tcIiBhbmQgXCJzdWJtaXRcIlxuXHRcdFx0XHQvLyBldmVudHMgaXMgc3RpbGwgdXNlZCwgYnV0IHdhcyBtb3ZlZCB0byBqUXVlcnkuZXZlbnQuc3RvcFByb3BhZ2F0aW9uIGZ1bmN0aW9uXG5cdFx0XHRcdC8vIGJlY2F1c2UgYG9yaWdpbmFsRXZlbnRgIHNob3VsZCBwb2ludCB0byB0aGUgb3JpZ2luYWwgZXZlbnQgZm9yIHRoZSBjb25zdGFuY3lcblx0XHRcdFx0Ly8gd2l0aCBvdGhlciBldmVudHMgYW5kIGZvciBtb3JlIGZvY3VzZWQgbG9naWNcblx0XHRcdH1cblx0XHQpO1xuXG5cdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXIoIGUsIG51bGwsIGVsZW0gKTtcblxuXHRcdGlmICggZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSApIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fVxuXHR9XG5cbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXG5cdHRyaWdnZXI6IGZ1bmN0aW9uKCB0eXBlLCBkYXRhICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXIoIHR5cGUsIGRhdGEsIHRoaXMgKTtcblx0XHR9ICk7XG5cdH0sXG5cdHRyaWdnZXJIYW5kbGVyOiBmdW5jdGlvbiggdHlwZSwgZGF0YSApIHtcblx0XHR2YXIgZWxlbSA9IHRoaXNbIDAgXTtcblx0XHRpZiAoIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4galF1ZXJ5LmV2ZW50LnRyaWdnZXIoIHR5cGUsIGRhdGEsIGVsZW0sIHRydWUgKTtcblx0XHR9XG5cdH1cbn0gKTtcblxuXG5qUXVlcnkuZWFjaCggKCBcImJsdXIgZm9jdXMgZm9jdXNpbiBmb2N1c291dCBsb2FkIHJlc2l6ZSBzY3JvbGwgdW5sb2FkIGNsaWNrIGRibGNsaWNrIFwiICtcblx0XCJtb3VzZWRvd24gbW91c2V1cCBtb3VzZW1vdmUgbW91c2VvdmVyIG1vdXNlb3V0IG1vdXNlZW50ZXIgbW91c2VsZWF2ZSBcIiArXG5cdFwiY2hhbmdlIHNlbGVjdCBzdWJtaXQga2V5ZG93biBrZXlwcmVzcyBrZXl1cCBlcnJvciBjb250ZXh0bWVudVwiICkuc3BsaXQoIFwiIFwiICksXG5cdGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXG5cdC8vIEhhbmRsZSBldmVudCBiaW5kaW5nXG5cdGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIGRhdGEsIGZuICkge1xuXHRcdHJldHVybiBhcmd1bWVudHMubGVuZ3RoID4gMCA/XG5cdFx0XHR0aGlzLm9uKCBuYW1lLCBudWxsLCBkYXRhLCBmbiApIDpcblx0XHRcdHRoaXMudHJpZ2dlciggbmFtZSApO1xuXHR9O1xufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGhvdmVyOiBmdW5jdGlvbiggZm5PdmVyLCBmbk91dCApIHtcblx0XHRyZXR1cm4gdGhpcy5tb3VzZWVudGVyKCBmbk92ZXIgKS5tb3VzZWxlYXZlKCBmbk91dCB8fCBmbk92ZXIgKTtcblx0fVxufSApO1xuXG5cblxuXG5zdXBwb3J0LmZvY3VzaW4gPSBcIm9uZm9jdXNpblwiIGluIHdpbmRvdztcblxuXG4vLyBTdXBwb3J0OiBGaXJlZm94XG4vLyBGaXJlZm94IGRvZXNuJ3QgaGF2ZSBmb2N1cyhpbiB8IG91dCkgZXZlbnRzXG4vLyBSZWxhdGVkIHRpY2tldCAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY4Nzc4N1xuLy9cbi8vIFN1cHBvcnQ6IENocm9tZSwgU2FmYXJpXG4vLyBmb2N1cyhpbiB8IG91dCkgZXZlbnRzIGZpcmUgYWZ0ZXIgZm9jdXMgJiBibHVyIGV2ZW50cyxcbi8vIHdoaWNoIGlzIHNwZWMgdmlvbGF0aW9uIC0gaHR0cDovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTMtRXZlbnRzLyNldmVudHMtZm9jdXNldmVudC1ldmVudC1vcmRlclxuLy8gUmVsYXRlZCB0aWNrZXQgLSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDQ5ODU3XG5pZiAoICFzdXBwb3J0LmZvY3VzaW4gKSB7XG5cdGpRdWVyeS5lYWNoKCB7IGZvY3VzOiBcImZvY3VzaW5cIiwgYmx1cjogXCJmb2N1c291dFwiIH0sIGZ1bmN0aW9uKCBvcmlnLCBmaXggKSB7XG5cblx0XHQvLyBBdHRhY2ggYSBzaW5nbGUgY2FwdHVyaW5nIGhhbmRsZXIgb24gdGhlIGRvY3VtZW50IHdoaWxlIHNvbWVvbmUgd2FudHMgZm9jdXNpbi9mb2N1c291dFxuXHRcdHZhciBoYW5kbGVyID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdFx0alF1ZXJ5LmV2ZW50LnNpbXVsYXRlKCBmaXgsIGV2ZW50LnRhcmdldCwgalF1ZXJ5LmV2ZW50LmZpeCggZXZlbnQgKSApO1xuXHRcdH07XG5cblx0XHRqUXVlcnkuZXZlbnQuc3BlY2lhbFsgZml4IF0gPSB7XG5cdFx0XHRzZXR1cDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBkb2MgPSB0aGlzLm93bmVyRG9jdW1lbnQgfHwgdGhpcyxcblx0XHRcdFx0XHRhdHRhY2hlcyA9IGRhdGFQcml2LmFjY2VzcyggZG9jLCBmaXggKTtcblxuXHRcdFx0XHRpZiAoICFhdHRhY2hlcyApIHtcblx0XHRcdFx0XHRkb2MuYWRkRXZlbnRMaXN0ZW5lciggb3JpZywgaGFuZGxlciwgdHJ1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRhdGFQcml2LmFjY2VzcyggZG9jLCBmaXgsICggYXR0YWNoZXMgfHwgMCApICsgMSApO1xuXHRcdFx0fSxcblx0XHRcdHRlYXJkb3duOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGRvYyA9IHRoaXMub3duZXJEb2N1bWVudCB8fCB0aGlzLFxuXHRcdFx0XHRcdGF0dGFjaGVzID0gZGF0YVByaXYuYWNjZXNzKCBkb2MsIGZpeCApIC0gMTtcblxuXHRcdFx0XHRpZiAoICFhdHRhY2hlcyApIHtcblx0XHRcdFx0XHRkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lciggb3JpZywgaGFuZGxlciwgdHJ1ZSApO1xuXHRcdFx0XHRcdGRhdGFQcml2LnJlbW92ZSggZG9jLCBmaXggKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRhdGFQcml2LmFjY2VzcyggZG9jLCBmaXgsIGF0dGFjaGVzICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHR9ICk7XG59XG52YXIgbG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb247XG5cbnZhciBub25jZSA9IGpRdWVyeS5ub3coKTtcblxudmFyIHJxdWVyeSA9ICggL1xcPy8gKTtcblxuXG5cbi8vIFN1cHBvcnQ6IEFuZHJvaWQgMi4zXG4vLyBXb3JrYXJvdW5kIGZhaWx1cmUgdG8gc3RyaW5nLWNhc3QgbnVsbCBpbnB1dFxualF1ZXJ5LnBhcnNlSlNPTiA9IGZ1bmN0aW9uKCBkYXRhICkge1xuXHRyZXR1cm4gSlNPTi5wYXJzZSggZGF0YSArIFwiXCIgKTtcbn07XG5cblxuLy8gQ3Jvc3MtYnJvd3NlciB4bWwgcGFyc2luZ1xualF1ZXJ5LnBhcnNlWE1MID0gZnVuY3Rpb24oIGRhdGEgKSB7XG5cdHZhciB4bWw7XG5cdGlmICggIWRhdGEgfHwgdHlwZW9mIGRhdGEgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHQvLyBTdXBwb3J0OiBJRTlcblx0dHJ5IHtcblx0XHR4bWwgPSAoIG5ldyB3aW5kb3cuRE9NUGFyc2VyKCkgKS5wYXJzZUZyb21TdHJpbmcoIGRhdGEsIFwidGV4dC94bWxcIiApO1xuXHR9IGNhdGNoICggZSApIHtcblx0XHR4bWwgPSB1bmRlZmluZWQ7XG5cdH1cblxuXHRpZiAoICF4bWwgfHwgeG1sLmdldEVsZW1lbnRzQnlUYWdOYW1lKCBcInBhcnNlcmVycm9yXCIgKS5sZW5ndGggKSB7XG5cdFx0alF1ZXJ5LmVycm9yKCBcIkludmFsaWQgWE1MOiBcIiArIGRhdGEgKTtcblx0fVxuXHRyZXR1cm4geG1sO1xufTtcblxuXG52YXJcblx0cmhhc2ggPSAvIy4qJC8sXG5cdHJ0cyA9IC8oWz8mXSlfPVteJl0qLyxcblx0cmhlYWRlcnMgPSAvXiguKj8pOlsgXFx0XSooW15cXHJcXG5dKikkL21nLFxuXG5cdC8vICM3NjUzLCAjODEyNSwgIzgxNTI6IGxvY2FsIHByb3RvY29sIGRldGVjdGlvblxuXHRybG9jYWxQcm90b2NvbCA9IC9eKD86YWJvdXR8YXBwfGFwcC1zdG9yYWdlfC4rLWV4dGVuc2lvbnxmaWxlfHJlc3x3aWRnZXQpOiQvLFxuXHRybm9Db250ZW50ID0gL14oPzpHRVR8SEVBRCkkLyxcblx0cnByb3RvY29sID0gL15cXC9cXC8vLFxuXG5cdC8qIFByZWZpbHRlcnNcblx0ICogMSkgVGhleSBhcmUgdXNlZnVsIHRvIGludHJvZHVjZSBjdXN0b20gZGF0YVR5cGVzIChzZWUgYWpheC9qc29ucC5qcyBmb3IgYW4gZXhhbXBsZSlcblx0ICogMikgVGhlc2UgYXJlIGNhbGxlZDpcblx0ICogICAgLSBCRUZPUkUgYXNraW5nIGZvciBhIHRyYW5zcG9ydFxuXHQgKiAgICAtIEFGVEVSIHBhcmFtIHNlcmlhbGl6YXRpb24gKHMuZGF0YSBpcyBhIHN0cmluZyBpZiBzLnByb2Nlc3NEYXRhIGlzIHRydWUpXG5cdCAqIDMpIGtleSBpcyB0aGUgZGF0YVR5cGVcblx0ICogNCkgdGhlIGNhdGNoYWxsIHN5bWJvbCBcIipcIiBjYW4gYmUgdXNlZFxuXHQgKiA1KSBleGVjdXRpb24gd2lsbCBzdGFydCB3aXRoIHRyYW5zcG9ydCBkYXRhVHlwZSBhbmQgVEhFTiBjb250aW51ZSBkb3duIHRvIFwiKlwiIGlmIG5lZWRlZFxuXHQgKi9cblx0cHJlZmlsdGVycyA9IHt9LFxuXG5cdC8qIFRyYW5zcG9ydHMgYmluZGluZ3Ncblx0ICogMSkga2V5IGlzIHRoZSBkYXRhVHlwZVxuXHQgKiAyKSB0aGUgY2F0Y2hhbGwgc3ltYm9sIFwiKlwiIGNhbiBiZSB1c2VkXG5cdCAqIDMpIHNlbGVjdGlvbiB3aWxsIHN0YXJ0IHdpdGggdHJhbnNwb3J0IGRhdGFUeXBlIGFuZCBUSEVOIGdvIHRvIFwiKlwiIGlmIG5lZWRlZFxuXHQgKi9cblx0dHJhbnNwb3J0cyA9IHt9LFxuXG5cdC8vIEF2b2lkIGNvbW1lbnQtcHJvbG9nIGNoYXIgc2VxdWVuY2UgKCMxMDA5OCk7IG11c3QgYXBwZWFzZSBsaW50IGFuZCBldmFkZSBjb21wcmVzc2lvblxuXHRhbGxUeXBlcyA9IFwiKi9cIi5jb25jYXQoIFwiKlwiICksXG5cblx0Ly8gQW5jaG9yIHRhZyBmb3IgcGFyc2luZyB0aGUgZG9jdW1lbnQgb3JpZ2luXG5cdG9yaWdpbkFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiYVwiICk7XG5cdG9yaWdpbkFuY2hvci5ocmVmID0gbG9jYXRpb24uaHJlZjtcblxuLy8gQmFzZSBcImNvbnN0cnVjdG9yXCIgZm9yIGpRdWVyeS5hamF4UHJlZmlsdGVyIGFuZCBqUXVlcnkuYWpheFRyYW5zcG9ydFxuZnVuY3Rpb24gYWRkVG9QcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCBzdHJ1Y3R1cmUgKSB7XG5cblx0Ly8gZGF0YVR5cGVFeHByZXNzaW9uIGlzIG9wdGlvbmFsIGFuZCBkZWZhdWx0cyB0byBcIipcIlxuXHRyZXR1cm4gZnVuY3Rpb24oIGRhdGFUeXBlRXhwcmVzc2lvbiwgZnVuYyApIHtcblxuXHRcdGlmICggdHlwZW9mIGRhdGFUeXBlRXhwcmVzc2lvbiAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdGZ1bmMgPSBkYXRhVHlwZUV4cHJlc3Npb247XG5cdFx0XHRkYXRhVHlwZUV4cHJlc3Npb24gPSBcIipcIjtcblx0XHR9XG5cblx0XHR2YXIgZGF0YVR5cGUsXG5cdFx0XHRpID0gMCxcblx0XHRcdGRhdGFUeXBlcyA9IGRhdGFUeXBlRXhwcmVzc2lvbi50b0xvd2VyQ2FzZSgpLm1hdGNoKCBybm90d2hpdGUgKSB8fCBbXTtcblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGZ1bmMgKSApIHtcblxuXHRcdFx0Ly8gRm9yIGVhY2ggZGF0YVR5cGUgaW4gdGhlIGRhdGFUeXBlRXhwcmVzc2lvblxuXHRcdFx0d2hpbGUgKCAoIGRhdGFUeXBlID0gZGF0YVR5cGVzWyBpKysgXSApICkge1xuXG5cdFx0XHRcdC8vIFByZXBlbmQgaWYgcmVxdWVzdGVkXG5cdFx0XHRcdGlmICggZGF0YVR5cGVbIDAgXSA9PT0gXCIrXCIgKSB7XG5cdFx0XHRcdFx0ZGF0YVR5cGUgPSBkYXRhVHlwZS5zbGljZSggMSApIHx8IFwiKlwiO1xuXHRcdFx0XHRcdCggc3RydWN0dXJlWyBkYXRhVHlwZSBdID0gc3RydWN0dXJlWyBkYXRhVHlwZSBdIHx8IFtdICkudW5zaGlmdCggZnVuYyApO1xuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSBhcHBlbmRcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQoIHN0cnVjdHVyZVsgZGF0YVR5cGUgXSA9IHN0cnVjdHVyZVsgZGF0YVR5cGUgXSB8fCBbXSApLnB1c2goIGZ1bmMgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cblxuLy8gQmFzZSBpbnNwZWN0aW9uIGZ1bmN0aW9uIGZvciBwcmVmaWx0ZXJzIGFuZCB0cmFuc3BvcnRzXG5mdW5jdGlvbiBpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyggc3RydWN0dXJlLCBvcHRpb25zLCBvcmlnaW5hbE9wdGlvbnMsIGpxWEhSICkge1xuXG5cdHZhciBpbnNwZWN0ZWQgPSB7fSxcblx0XHRzZWVraW5nVHJhbnNwb3J0ID0gKCBzdHJ1Y3R1cmUgPT09IHRyYW5zcG9ydHMgKTtcblxuXHRmdW5jdGlvbiBpbnNwZWN0KCBkYXRhVHlwZSApIHtcblx0XHR2YXIgc2VsZWN0ZWQ7XG5cdFx0aW5zcGVjdGVkWyBkYXRhVHlwZSBdID0gdHJ1ZTtcblx0XHRqUXVlcnkuZWFjaCggc3RydWN0dXJlWyBkYXRhVHlwZSBdIHx8IFtdLCBmdW5jdGlvbiggXywgcHJlZmlsdGVyT3JGYWN0b3J5ICkge1xuXHRcdFx0dmFyIGRhdGFUeXBlT3JUcmFuc3BvcnQgPSBwcmVmaWx0ZXJPckZhY3RvcnkoIG9wdGlvbnMsIG9yaWdpbmFsT3B0aW9ucywganFYSFIgKTtcblx0XHRcdGlmICggdHlwZW9mIGRhdGFUeXBlT3JUcmFuc3BvcnQgPT09IFwic3RyaW5nXCIgJiZcblx0XHRcdFx0IXNlZWtpbmdUcmFuc3BvcnQgJiYgIWluc3BlY3RlZFsgZGF0YVR5cGVPclRyYW5zcG9ydCBdICkge1xuXG5cdFx0XHRcdG9wdGlvbnMuZGF0YVR5cGVzLnVuc2hpZnQoIGRhdGFUeXBlT3JUcmFuc3BvcnQgKTtcblx0XHRcdFx0aW5zcGVjdCggZGF0YVR5cGVPclRyYW5zcG9ydCApO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9IGVsc2UgaWYgKCBzZWVraW5nVHJhbnNwb3J0ICkge1xuXHRcdFx0XHRyZXR1cm4gISggc2VsZWN0ZWQgPSBkYXRhVHlwZU9yVHJhbnNwb3J0ICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHRcdHJldHVybiBzZWxlY3RlZDtcblx0fVxuXG5cdHJldHVybiBpbnNwZWN0KCBvcHRpb25zLmRhdGFUeXBlc1sgMCBdICkgfHwgIWluc3BlY3RlZFsgXCIqXCIgXSAmJiBpbnNwZWN0KCBcIipcIiApO1xufVxuXG4vLyBBIHNwZWNpYWwgZXh0ZW5kIGZvciBhamF4IG9wdGlvbnNcbi8vIHRoYXQgdGFrZXMgXCJmbGF0XCIgb3B0aW9ucyAobm90IHRvIGJlIGRlZXAgZXh0ZW5kZWQpXG4vLyBGaXhlcyAjOTg4N1xuZnVuY3Rpb24gYWpheEV4dGVuZCggdGFyZ2V0LCBzcmMgKSB7XG5cdHZhciBrZXksIGRlZXAsXG5cdFx0ZmxhdE9wdGlvbnMgPSBqUXVlcnkuYWpheFNldHRpbmdzLmZsYXRPcHRpb25zIHx8IHt9O1xuXG5cdGZvciAoIGtleSBpbiBzcmMgKSB7XG5cdFx0aWYgKCBzcmNbIGtleSBdICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHQoIGZsYXRPcHRpb25zWyBrZXkgXSA/IHRhcmdldCA6ICggZGVlcCB8fCAoIGRlZXAgPSB7fSApICkgKVsga2V5IF0gPSBzcmNbIGtleSBdO1xuXHRcdH1cblx0fVxuXHRpZiAoIGRlZXAgKSB7XG5cdFx0alF1ZXJ5LmV4dGVuZCggdHJ1ZSwgdGFyZ2V0LCBkZWVwICk7XG5cdH1cblxuXHRyZXR1cm4gdGFyZ2V0O1xufVxuXG4vKiBIYW5kbGVzIHJlc3BvbnNlcyB0byBhbiBhamF4IHJlcXVlc3Q6XG4gKiAtIGZpbmRzIHRoZSByaWdodCBkYXRhVHlwZSAobWVkaWF0ZXMgYmV0d2VlbiBjb250ZW50LXR5cGUgYW5kIGV4cGVjdGVkIGRhdGFUeXBlKVxuICogLSByZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nIHJlc3BvbnNlXG4gKi9cbmZ1bmN0aW9uIGFqYXhIYW5kbGVSZXNwb25zZXMoIHMsIGpxWEhSLCByZXNwb25zZXMgKSB7XG5cblx0dmFyIGN0LCB0eXBlLCBmaW5hbERhdGFUeXBlLCBmaXJzdERhdGFUeXBlLFxuXHRcdGNvbnRlbnRzID0gcy5jb250ZW50cyxcblx0XHRkYXRhVHlwZXMgPSBzLmRhdGFUeXBlcztcblxuXHQvLyBSZW1vdmUgYXV0byBkYXRhVHlwZSBhbmQgZ2V0IGNvbnRlbnQtdHlwZSBpbiB0aGUgcHJvY2Vzc1xuXHR3aGlsZSAoIGRhdGFUeXBlc1sgMCBdID09PSBcIipcIiApIHtcblx0XHRkYXRhVHlwZXMuc2hpZnQoKTtcblx0XHRpZiAoIGN0ID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRjdCA9IHMubWltZVR5cGUgfHwganFYSFIuZ2V0UmVzcG9uc2VIZWFkZXIoIFwiQ29udGVudC1UeXBlXCIgKTtcblx0XHR9XG5cdH1cblxuXHQvLyBDaGVjayBpZiB3ZSdyZSBkZWFsaW5nIHdpdGggYSBrbm93biBjb250ZW50LXR5cGVcblx0aWYgKCBjdCApIHtcblx0XHRmb3IgKCB0eXBlIGluIGNvbnRlbnRzICkge1xuXHRcdFx0aWYgKCBjb250ZW50c1sgdHlwZSBdICYmIGNvbnRlbnRzWyB0eXBlIF0udGVzdCggY3QgKSApIHtcblx0XHRcdFx0ZGF0YVR5cGVzLnVuc2hpZnQoIHR5cGUgKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gQ2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgYSByZXNwb25zZSBmb3IgdGhlIGV4cGVjdGVkIGRhdGFUeXBlXG5cdGlmICggZGF0YVR5cGVzWyAwIF0gaW4gcmVzcG9uc2VzICkge1xuXHRcdGZpbmFsRGF0YVR5cGUgPSBkYXRhVHlwZXNbIDAgXTtcblx0fSBlbHNlIHtcblxuXHRcdC8vIFRyeSBjb252ZXJ0aWJsZSBkYXRhVHlwZXNcblx0XHRmb3IgKCB0eXBlIGluIHJlc3BvbnNlcyApIHtcblx0XHRcdGlmICggIWRhdGFUeXBlc1sgMCBdIHx8IHMuY29udmVydGVyc1sgdHlwZSArIFwiIFwiICsgZGF0YVR5cGVzWyAwIF0gXSApIHtcblx0XHRcdFx0ZmluYWxEYXRhVHlwZSA9IHR5cGU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCAhZmlyc3REYXRhVHlwZSApIHtcblx0XHRcdFx0Zmlyc3REYXRhVHlwZSA9IHR5cGU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gT3IganVzdCB1c2UgZmlyc3Qgb25lXG5cdFx0ZmluYWxEYXRhVHlwZSA9IGZpbmFsRGF0YVR5cGUgfHwgZmlyc3REYXRhVHlwZTtcblx0fVxuXG5cdC8vIElmIHdlIGZvdW5kIGEgZGF0YVR5cGVcblx0Ly8gV2UgYWRkIHRoZSBkYXRhVHlwZSB0byB0aGUgbGlzdCBpZiBuZWVkZWRcblx0Ly8gYW5kIHJldHVybiB0aGUgY29ycmVzcG9uZGluZyByZXNwb25zZVxuXHRpZiAoIGZpbmFsRGF0YVR5cGUgKSB7XG5cdFx0aWYgKCBmaW5hbERhdGFUeXBlICE9PSBkYXRhVHlwZXNbIDAgXSApIHtcblx0XHRcdGRhdGFUeXBlcy51bnNoaWZ0KCBmaW5hbERhdGFUeXBlICk7XG5cdFx0fVxuXHRcdHJldHVybiByZXNwb25zZXNbIGZpbmFsRGF0YVR5cGUgXTtcblx0fVxufVxuXG4vKiBDaGFpbiBjb252ZXJzaW9ucyBnaXZlbiB0aGUgcmVxdWVzdCBhbmQgdGhlIG9yaWdpbmFsIHJlc3BvbnNlXG4gKiBBbHNvIHNldHMgdGhlIHJlc3BvbnNlWFhYIGZpZWxkcyBvbiB0aGUganFYSFIgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gYWpheENvbnZlcnQoIHMsIHJlc3BvbnNlLCBqcVhIUiwgaXNTdWNjZXNzICkge1xuXHR2YXIgY29udjIsIGN1cnJlbnQsIGNvbnYsIHRtcCwgcHJldixcblx0XHRjb252ZXJ0ZXJzID0ge30sXG5cblx0XHQvLyBXb3JrIHdpdGggYSBjb3B5IG9mIGRhdGFUeXBlcyBpbiBjYXNlIHdlIG5lZWQgdG8gbW9kaWZ5IGl0IGZvciBjb252ZXJzaW9uXG5cdFx0ZGF0YVR5cGVzID0gcy5kYXRhVHlwZXMuc2xpY2UoKTtcblxuXHQvLyBDcmVhdGUgY29udmVydGVycyBtYXAgd2l0aCBsb3dlcmNhc2VkIGtleXNcblx0aWYgKCBkYXRhVHlwZXNbIDEgXSApIHtcblx0XHRmb3IgKCBjb252IGluIHMuY29udmVydGVycyApIHtcblx0XHRcdGNvbnZlcnRlcnNbIGNvbnYudG9Mb3dlckNhc2UoKSBdID0gcy5jb252ZXJ0ZXJzWyBjb252IF07XG5cdFx0fVxuXHR9XG5cblx0Y3VycmVudCA9IGRhdGFUeXBlcy5zaGlmdCgpO1xuXG5cdC8vIENvbnZlcnQgdG8gZWFjaCBzZXF1ZW50aWFsIGRhdGFUeXBlXG5cdHdoaWxlICggY3VycmVudCApIHtcblxuXHRcdGlmICggcy5yZXNwb25zZUZpZWxkc1sgY3VycmVudCBdICkge1xuXHRcdFx0anFYSFJbIHMucmVzcG9uc2VGaWVsZHNbIGN1cnJlbnQgXSBdID0gcmVzcG9uc2U7XG5cdFx0fVxuXG5cdFx0Ly8gQXBwbHkgdGhlIGRhdGFGaWx0ZXIgaWYgcHJvdmlkZWRcblx0XHRpZiAoICFwcmV2ICYmIGlzU3VjY2VzcyAmJiBzLmRhdGFGaWx0ZXIgKSB7XG5cdFx0XHRyZXNwb25zZSA9IHMuZGF0YUZpbHRlciggcmVzcG9uc2UsIHMuZGF0YVR5cGUgKTtcblx0XHR9XG5cblx0XHRwcmV2ID0gY3VycmVudDtcblx0XHRjdXJyZW50ID0gZGF0YVR5cGVzLnNoaWZ0KCk7XG5cblx0XHRpZiAoIGN1cnJlbnQgKSB7XG5cblx0XHQvLyBUaGVyZSdzIG9ubHkgd29yayB0byBkbyBpZiBjdXJyZW50IGRhdGFUeXBlIGlzIG5vbi1hdXRvXG5cdFx0XHRpZiAoIGN1cnJlbnQgPT09IFwiKlwiICkge1xuXG5cdFx0XHRcdGN1cnJlbnQgPSBwcmV2O1xuXG5cdFx0XHQvLyBDb252ZXJ0IHJlc3BvbnNlIGlmIHByZXYgZGF0YVR5cGUgaXMgbm9uLWF1dG8gYW5kIGRpZmZlcnMgZnJvbSBjdXJyZW50XG5cdFx0XHR9IGVsc2UgaWYgKCBwcmV2ICE9PSBcIipcIiAmJiBwcmV2ICE9PSBjdXJyZW50ICkge1xuXG5cdFx0XHRcdC8vIFNlZWsgYSBkaXJlY3QgY29udmVydGVyXG5cdFx0XHRcdGNvbnYgPSBjb252ZXJ0ZXJzWyBwcmV2ICsgXCIgXCIgKyBjdXJyZW50IF0gfHwgY29udmVydGVyc1sgXCIqIFwiICsgY3VycmVudCBdO1xuXG5cdFx0XHRcdC8vIElmIG5vbmUgZm91bmQsIHNlZWsgYSBwYWlyXG5cdFx0XHRcdGlmICggIWNvbnYgKSB7XG5cdFx0XHRcdFx0Zm9yICggY29udjIgaW4gY29udmVydGVycyApIHtcblxuXHRcdFx0XHRcdFx0Ly8gSWYgY29udjIgb3V0cHV0cyBjdXJyZW50XG5cdFx0XHRcdFx0XHR0bXAgPSBjb252Mi5zcGxpdCggXCIgXCIgKTtcblx0XHRcdFx0XHRcdGlmICggdG1wWyAxIF0gPT09IGN1cnJlbnQgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gSWYgcHJldiBjYW4gYmUgY29udmVydGVkIHRvIGFjY2VwdGVkIGlucHV0XG5cdFx0XHRcdFx0XHRcdGNvbnYgPSBjb252ZXJ0ZXJzWyBwcmV2ICsgXCIgXCIgKyB0bXBbIDAgXSBdIHx8XG5cdFx0XHRcdFx0XHRcdFx0Y29udmVydGVyc1sgXCIqIFwiICsgdG1wWyAwIF0gXTtcblx0XHRcdFx0XHRcdFx0aWYgKCBjb252ICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gQ29uZGVuc2UgZXF1aXZhbGVuY2UgY29udmVydGVyc1xuXHRcdFx0XHRcdFx0XHRcdGlmICggY29udiA9PT0gdHJ1ZSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnYgPSBjb252ZXJ0ZXJzWyBjb252MiBdO1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gT3RoZXJ3aXNlLCBpbnNlcnQgdGhlIGludGVybWVkaWF0ZSBkYXRhVHlwZVxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIGNvbnZlcnRlcnNbIGNvbnYyIF0gIT09IHRydWUgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjdXJyZW50ID0gdG1wWyAwIF07XG5cdFx0XHRcdFx0XHRcdFx0XHRkYXRhVHlwZXMudW5zaGlmdCggdG1wWyAxIF0gKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBBcHBseSBjb252ZXJ0ZXIgKGlmIG5vdCBhbiBlcXVpdmFsZW5jZSlcblx0XHRcdFx0aWYgKCBjb252ICE9PSB0cnVlICkge1xuXG5cdFx0XHRcdFx0Ly8gVW5sZXNzIGVycm9ycyBhcmUgYWxsb3dlZCB0byBidWJibGUsIGNhdGNoIGFuZCByZXR1cm4gdGhlbVxuXHRcdFx0XHRcdGlmICggY29udiAmJiBzLnRocm93cyApIHtcblx0XHRcdFx0XHRcdHJlc3BvbnNlID0gY29udiggcmVzcG9uc2UgKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBjb252KCByZXNwb25zZSApO1xuXHRcdFx0XHRcdFx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRcdFx0c3RhdGU6IFwicGFyc2VyZXJyb3JcIixcblx0XHRcdFx0XHRcdFx0XHRlcnJvcjogY29udiA/IGUgOiBcIk5vIGNvbnZlcnNpb24gZnJvbSBcIiArIHByZXYgKyBcIiB0byBcIiArIGN1cnJlbnRcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4geyBzdGF0ZTogXCJzdWNjZXNzXCIsIGRhdGE6IHJlc3BvbnNlIH07XG59XG5cbmpRdWVyeS5leHRlbmQoIHtcblxuXHQvLyBDb3VudGVyIGZvciBob2xkaW5nIHRoZSBudW1iZXIgb2YgYWN0aXZlIHF1ZXJpZXNcblx0YWN0aXZlOiAwLFxuXG5cdC8vIExhc3QtTW9kaWZpZWQgaGVhZGVyIGNhY2hlIGZvciBuZXh0IHJlcXVlc3Rcblx0bGFzdE1vZGlmaWVkOiB7fSxcblx0ZXRhZzoge30sXG5cblx0YWpheFNldHRpbmdzOiB7XG5cdFx0dXJsOiBsb2NhdGlvbi5ocmVmLFxuXHRcdHR5cGU6IFwiR0VUXCIsXG5cdFx0aXNMb2NhbDogcmxvY2FsUHJvdG9jb2wudGVzdCggbG9jYXRpb24ucHJvdG9jb2wgKSxcblx0XHRnbG9iYWw6IHRydWUsXG5cdFx0cHJvY2Vzc0RhdGE6IHRydWUsXG5cdFx0YXN5bmM6IHRydWUsXG5cdFx0Y29udGVudFR5cGU6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04XCIsXG5cdFx0Lypcblx0XHR0aW1lb3V0OiAwLFxuXHRcdGRhdGE6IG51bGwsXG5cdFx0ZGF0YVR5cGU6IG51bGwsXG5cdFx0dXNlcm5hbWU6IG51bGwsXG5cdFx0cGFzc3dvcmQ6IG51bGwsXG5cdFx0Y2FjaGU6IG51bGwsXG5cdFx0dGhyb3dzOiBmYWxzZSxcblx0XHR0cmFkaXRpb25hbDogZmFsc2UsXG5cdFx0aGVhZGVyczoge30sXG5cdFx0Ki9cblxuXHRcdGFjY2VwdHM6IHtcblx0XHRcdFwiKlwiOiBhbGxUeXBlcyxcblx0XHRcdHRleHQ6IFwidGV4dC9wbGFpblwiLFxuXHRcdFx0aHRtbDogXCJ0ZXh0L2h0bWxcIixcblx0XHRcdHhtbDogXCJhcHBsaWNhdGlvbi94bWwsIHRleHQveG1sXCIsXG5cdFx0XHRqc29uOiBcImFwcGxpY2F0aW9uL2pzb24sIHRleHQvamF2YXNjcmlwdFwiXG5cdFx0fSxcblxuXHRcdGNvbnRlbnRzOiB7XG5cdFx0XHR4bWw6IC9cXGJ4bWxcXGIvLFxuXHRcdFx0aHRtbDogL1xcYmh0bWwvLFxuXHRcdFx0anNvbjogL1xcYmpzb25cXGIvXG5cdFx0fSxcblxuXHRcdHJlc3BvbnNlRmllbGRzOiB7XG5cdFx0XHR4bWw6IFwicmVzcG9uc2VYTUxcIixcblx0XHRcdHRleHQ6IFwicmVzcG9uc2VUZXh0XCIsXG5cdFx0XHRqc29uOiBcInJlc3BvbnNlSlNPTlwiXG5cdFx0fSxcblxuXHRcdC8vIERhdGEgY29udmVydGVyc1xuXHRcdC8vIEtleXMgc2VwYXJhdGUgc291cmNlIChvciBjYXRjaGFsbCBcIipcIikgYW5kIGRlc3RpbmF0aW9uIHR5cGVzIHdpdGggYSBzaW5nbGUgc3BhY2Vcblx0XHRjb252ZXJ0ZXJzOiB7XG5cblx0XHRcdC8vIENvbnZlcnQgYW55dGhpbmcgdG8gdGV4dFxuXHRcdFx0XCIqIHRleHRcIjogU3RyaW5nLFxuXG5cdFx0XHQvLyBUZXh0IHRvIGh0bWwgKHRydWUgPSBubyB0cmFuc2Zvcm1hdGlvbilcblx0XHRcdFwidGV4dCBodG1sXCI6IHRydWUsXG5cblx0XHRcdC8vIEV2YWx1YXRlIHRleHQgYXMgYSBqc29uIGV4cHJlc3Npb25cblx0XHRcdFwidGV4dCBqc29uXCI6IGpRdWVyeS5wYXJzZUpTT04sXG5cblx0XHRcdC8vIFBhcnNlIHRleHQgYXMgeG1sXG5cdFx0XHRcInRleHQgeG1sXCI6IGpRdWVyeS5wYXJzZVhNTFxuXHRcdH0sXG5cblx0XHQvLyBGb3Igb3B0aW9ucyB0aGF0IHNob3VsZG4ndCBiZSBkZWVwIGV4dGVuZGVkOlxuXHRcdC8vIHlvdSBjYW4gYWRkIHlvdXIgb3duIGN1c3RvbSBvcHRpb25zIGhlcmUgaWZcblx0XHQvLyBhbmQgd2hlbiB5b3UgY3JlYXRlIG9uZSB0aGF0IHNob3VsZG4ndCBiZVxuXHRcdC8vIGRlZXAgZXh0ZW5kZWQgKHNlZSBhamF4RXh0ZW5kKVxuXHRcdGZsYXRPcHRpb25zOiB7XG5cdFx0XHR1cmw6IHRydWUsXG5cdFx0XHRjb250ZXh0OiB0cnVlXG5cdFx0fVxuXHR9LFxuXG5cdC8vIENyZWF0ZXMgYSBmdWxsIGZsZWRnZWQgc2V0dGluZ3Mgb2JqZWN0IGludG8gdGFyZ2V0XG5cdC8vIHdpdGggYm90aCBhamF4U2V0dGluZ3MgYW5kIHNldHRpbmdzIGZpZWxkcy5cblx0Ly8gSWYgdGFyZ2V0IGlzIG9taXR0ZWQsIHdyaXRlcyBpbnRvIGFqYXhTZXR0aW5ncy5cblx0YWpheFNldHVwOiBmdW5jdGlvbiggdGFyZ2V0LCBzZXR0aW5ncyApIHtcblx0XHRyZXR1cm4gc2V0dGluZ3MgP1xuXG5cdFx0XHQvLyBCdWlsZGluZyBhIHNldHRpbmdzIG9iamVjdFxuXHRcdFx0YWpheEV4dGVuZCggYWpheEV4dGVuZCggdGFyZ2V0LCBqUXVlcnkuYWpheFNldHRpbmdzICksIHNldHRpbmdzICkgOlxuXG5cdFx0XHQvLyBFeHRlbmRpbmcgYWpheFNldHRpbmdzXG5cdFx0XHRhamF4RXh0ZW5kKCBqUXVlcnkuYWpheFNldHRpbmdzLCB0YXJnZXQgKTtcblx0fSxcblxuXHRhamF4UHJlZmlsdGVyOiBhZGRUb1ByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHByZWZpbHRlcnMgKSxcblx0YWpheFRyYW5zcG9ydDogYWRkVG9QcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCB0cmFuc3BvcnRzICksXG5cblx0Ly8gTWFpbiBtZXRob2Rcblx0YWpheDogZnVuY3Rpb24oIHVybCwgb3B0aW9ucyApIHtcblxuXHRcdC8vIElmIHVybCBpcyBhbiBvYmplY3QsIHNpbXVsYXRlIHByZS0xLjUgc2lnbmF0dXJlXG5cdFx0aWYgKCB0eXBlb2YgdXJsID09PSBcIm9iamVjdFwiICkge1xuXHRcdFx0b3B0aW9ucyA9IHVybDtcblx0XHRcdHVybCA9IHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHQvLyBGb3JjZSBvcHRpb25zIHRvIGJlIGFuIG9iamVjdFxuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdFx0dmFyIHRyYW5zcG9ydCxcblxuXHRcdFx0Ly8gVVJMIHdpdGhvdXQgYW50aS1jYWNoZSBwYXJhbVxuXHRcdFx0Y2FjaGVVUkwsXG5cblx0XHRcdC8vIFJlc3BvbnNlIGhlYWRlcnNcblx0XHRcdHJlc3BvbnNlSGVhZGVyc1N0cmluZyxcblx0XHRcdHJlc3BvbnNlSGVhZGVycyxcblxuXHRcdFx0Ly8gdGltZW91dCBoYW5kbGVcblx0XHRcdHRpbWVvdXRUaW1lcixcblxuXHRcdFx0Ly8gVXJsIGNsZWFudXAgdmFyXG5cdFx0XHR1cmxBbmNob3IsXG5cblx0XHRcdC8vIFRvIGtub3cgaWYgZ2xvYmFsIGV2ZW50cyBhcmUgdG8gYmUgZGlzcGF0Y2hlZFxuXHRcdFx0ZmlyZUdsb2JhbHMsXG5cblx0XHRcdC8vIExvb3AgdmFyaWFibGVcblx0XHRcdGksXG5cblx0XHRcdC8vIENyZWF0ZSB0aGUgZmluYWwgb3B0aW9ucyBvYmplY3Rcblx0XHRcdHMgPSBqUXVlcnkuYWpheFNldHVwKCB7fSwgb3B0aW9ucyApLFxuXG5cdFx0XHQvLyBDYWxsYmFja3MgY29udGV4dFxuXHRcdFx0Y2FsbGJhY2tDb250ZXh0ID0gcy5jb250ZXh0IHx8IHMsXG5cblx0XHRcdC8vIENvbnRleHQgZm9yIGdsb2JhbCBldmVudHMgaXMgY2FsbGJhY2tDb250ZXh0IGlmIGl0IGlzIGEgRE9NIG5vZGUgb3IgalF1ZXJ5IGNvbGxlY3Rpb25cblx0XHRcdGdsb2JhbEV2ZW50Q29udGV4dCA9IHMuY29udGV4dCAmJlxuXHRcdFx0XHQoIGNhbGxiYWNrQ29udGV4dC5ub2RlVHlwZSB8fCBjYWxsYmFja0NvbnRleHQuanF1ZXJ5ICkgP1xuXHRcdFx0XHRcdGpRdWVyeSggY2FsbGJhY2tDb250ZXh0ICkgOlxuXHRcdFx0XHRcdGpRdWVyeS5ldmVudCxcblxuXHRcdFx0Ly8gRGVmZXJyZWRzXG5cdFx0XHRkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuXHRcdFx0Y29tcGxldGVEZWZlcnJlZCA9IGpRdWVyeS5DYWxsYmFja3MoIFwib25jZSBtZW1vcnlcIiApLFxuXG5cdFx0XHQvLyBTdGF0dXMtZGVwZW5kZW50IGNhbGxiYWNrc1xuXHRcdFx0c3RhdHVzQ29kZSA9IHMuc3RhdHVzQ29kZSB8fCB7fSxcblxuXHRcdFx0Ly8gSGVhZGVycyAodGhleSBhcmUgc2VudCBhbGwgYXQgb25jZSlcblx0XHRcdHJlcXVlc3RIZWFkZXJzID0ge30sXG5cdFx0XHRyZXF1ZXN0SGVhZGVyc05hbWVzID0ge30sXG5cblx0XHRcdC8vIFRoZSBqcVhIUiBzdGF0ZVxuXHRcdFx0c3RhdGUgPSAwLFxuXG5cdFx0XHQvLyBEZWZhdWx0IGFib3J0IG1lc3NhZ2Vcblx0XHRcdHN0ckFib3J0ID0gXCJjYW5jZWxlZFwiLFxuXG5cdFx0XHQvLyBGYWtlIHhoclxuXHRcdFx0anFYSFIgPSB7XG5cdFx0XHRcdHJlYWR5U3RhdGU6IDAsXG5cblx0XHRcdFx0Ly8gQnVpbGRzIGhlYWRlcnMgaGFzaHRhYmxlIGlmIG5lZWRlZFxuXHRcdFx0XHRnZXRSZXNwb25zZUhlYWRlcjogZnVuY3Rpb24oIGtleSApIHtcblx0XHRcdFx0XHR2YXIgbWF0Y2g7XG5cdFx0XHRcdFx0aWYgKCBzdGF0ZSA9PT0gMiApIHtcblx0XHRcdFx0XHRcdGlmICggIXJlc3BvbnNlSGVhZGVycyApIHtcblx0XHRcdFx0XHRcdFx0cmVzcG9uc2VIZWFkZXJzID0ge307XG5cdFx0XHRcdFx0XHRcdHdoaWxlICggKCBtYXRjaCA9IHJoZWFkZXJzLmV4ZWMoIHJlc3BvbnNlSGVhZGVyc1N0cmluZyApICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2VIZWFkZXJzWyBtYXRjaFsgMSBdLnRvTG93ZXJDYXNlKCkgXSA9IG1hdGNoWyAyIF07XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdG1hdGNoID0gcmVzcG9uc2VIZWFkZXJzWyBrZXkudG9Mb3dlckNhc2UoKSBdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gbWF0Y2ggPT0gbnVsbCA/IG51bGwgOiBtYXRjaDtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBSYXcgc3RyaW5nXG5cdFx0XHRcdGdldEFsbFJlc3BvbnNlSGVhZGVyczogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHN0YXRlID09PSAyID8gcmVzcG9uc2VIZWFkZXJzU3RyaW5nIDogbnVsbDtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBDYWNoZXMgdGhlIGhlYWRlclxuXHRcdFx0XHRzZXRSZXF1ZXN0SGVhZGVyOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG5cdFx0XHRcdFx0dmFyIGxuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdGlmICggIXN0YXRlICkge1xuXHRcdFx0XHRcdFx0bmFtZSA9IHJlcXVlc3RIZWFkZXJzTmFtZXNbIGxuYW1lIF0gPSByZXF1ZXN0SGVhZGVyc05hbWVzWyBsbmFtZSBdIHx8IG5hbWU7XG5cdFx0XHRcdFx0XHRyZXF1ZXN0SGVhZGVyc1sgbmFtZSBdID0gdmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIE92ZXJyaWRlcyByZXNwb25zZSBjb250ZW50LXR5cGUgaGVhZGVyXG5cdFx0XHRcdG92ZXJyaWRlTWltZVR5cGU6IGZ1bmN0aW9uKCB0eXBlICkge1xuXHRcdFx0XHRcdGlmICggIXN0YXRlICkge1xuXHRcdFx0XHRcdFx0cy5taW1lVHlwZSA9IHR5cGU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIFN0YXR1cy1kZXBlbmRlbnQgY2FsbGJhY2tzXG5cdFx0XHRcdHN0YXR1c0NvZGU6IGZ1bmN0aW9uKCBtYXAgKSB7XG5cdFx0XHRcdFx0dmFyIGNvZGU7XG5cdFx0XHRcdFx0aWYgKCBtYXAgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHN0YXRlIDwgMiApIHtcblx0XHRcdFx0XHRcdFx0Zm9yICggY29kZSBpbiBtYXAgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBMYXp5LWFkZCB0aGUgbmV3IGNhbGxiYWNrIGluIGEgd2F5IHRoYXQgcHJlc2VydmVzIG9sZCBvbmVzXG5cdFx0XHRcdFx0XHRcdFx0c3RhdHVzQ29kZVsgY29kZSBdID0gWyBzdGF0dXNDb2RlWyBjb2RlIF0sIG1hcFsgY29kZSBdIF07XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gRXhlY3V0ZSB0aGUgYXBwcm9wcmlhdGUgY2FsbGJhY2tzXG5cdFx0XHRcdFx0XHRcdGpxWEhSLmFsd2F5cyggbWFwWyBqcVhIUi5zdGF0dXMgXSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBDYW5jZWwgdGhlIHJlcXVlc3Rcblx0XHRcdFx0YWJvcnQ6IGZ1bmN0aW9uKCBzdGF0dXNUZXh0ICkge1xuXHRcdFx0XHRcdHZhciBmaW5hbFRleHQgPSBzdGF0dXNUZXh0IHx8IHN0ckFib3J0O1xuXHRcdFx0XHRcdGlmICggdHJhbnNwb3J0ICkge1xuXHRcdFx0XHRcdFx0dHJhbnNwb3J0LmFib3J0KCBmaW5hbFRleHQgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZG9uZSggMCwgZmluYWxUZXh0ICk7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHQvLyBBdHRhY2ggZGVmZXJyZWRzXG5cdFx0ZGVmZXJyZWQucHJvbWlzZSgganFYSFIgKS5jb21wbGV0ZSA9IGNvbXBsZXRlRGVmZXJyZWQuYWRkO1xuXHRcdGpxWEhSLnN1Y2Nlc3MgPSBqcVhIUi5kb25lO1xuXHRcdGpxWEhSLmVycm9yID0ganFYSFIuZmFpbDtcblxuXHRcdC8vIFJlbW92ZSBoYXNoIGNoYXJhY3RlciAoIzc1MzE6IGFuZCBzdHJpbmcgcHJvbW90aW9uKVxuXHRcdC8vIEFkZCBwcm90b2NvbCBpZiBub3QgcHJvdmlkZWQgKHByZWZpbHRlcnMgbWlnaHQgZXhwZWN0IGl0KVxuXHRcdC8vIEhhbmRsZSBmYWxzeSB1cmwgaW4gdGhlIHNldHRpbmdzIG9iamVjdCAoIzEwMDkzOiBjb25zaXN0ZW5jeSB3aXRoIG9sZCBzaWduYXR1cmUpXG5cdFx0Ly8gV2UgYWxzbyB1c2UgdGhlIHVybCBwYXJhbWV0ZXIgaWYgYXZhaWxhYmxlXG5cdFx0cy51cmwgPSAoICggdXJsIHx8IHMudXJsIHx8IGxvY2F0aW9uLmhyZWYgKSArIFwiXCIgKS5yZXBsYWNlKCByaGFzaCwgXCJcIiApXG5cdFx0XHQucmVwbGFjZSggcnByb3RvY29sLCBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiApO1xuXG5cdFx0Ly8gQWxpYXMgbWV0aG9kIG9wdGlvbiB0byB0eXBlIGFzIHBlciB0aWNrZXQgIzEyMDA0XG5cdFx0cy50eXBlID0gb3B0aW9ucy5tZXRob2QgfHwgb3B0aW9ucy50eXBlIHx8IHMubWV0aG9kIHx8IHMudHlwZTtcblxuXHRcdC8vIEV4dHJhY3QgZGF0YVR5cGVzIGxpc3Rcblx0XHRzLmRhdGFUeXBlcyA9IGpRdWVyeS50cmltKCBzLmRhdGFUeXBlIHx8IFwiKlwiICkudG9Mb3dlckNhc2UoKS5tYXRjaCggcm5vdHdoaXRlICkgfHwgWyBcIlwiIF07XG5cblx0XHQvLyBBIGNyb3NzLWRvbWFpbiByZXF1ZXN0IGlzIGluIG9yZGVyIHdoZW4gdGhlIG9yaWdpbiBkb2Vzbid0IG1hdGNoIHRoZSBjdXJyZW50IG9yaWdpbi5cblx0XHRpZiAoIHMuY3Jvc3NEb21haW4gPT0gbnVsbCApIHtcblx0XHRcdHVybEFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiYVwiICk7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFOC0xMStcblx0XHRcdC8vIElFIHRocm93cyBleGNlcHRpb24gaWYgdXJsIGlzIG1hbGZvcm1lZCwgZS5nLiBodHRwOi8vZXhhbXBsZS5jb206ODB4L1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dXJsQW5jaG9yLmhyZWYgPSBzLnVybDtcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRTgtMTErXG5cdFx0XHRcdC8vIEFuY2hvcidzIGhvc3QgcHJvcGVydHkgaXNuJ3QgY29ycmVjdGx5IHNldCB3aGVuIHMudXJsIGlzIHJlbGF0aXZlXG5cdFx0XHRcdHVybEFuY2hvci5ocmVmID0gdXJsQW5jaG9yLmhyZWY7XG5cdFx0XHRcdHMuY3Jvc3NEb21haW4gPSBvcmlnaW5BbmNob3IucHJvdG9jb2wgKyBcIi8vXCIgKyBvcmlnaW5BbmNob3IuaG9zdCAhPT1cblx0XHRcdFx0XHR1cmxBbmNob3IucHJvdG9jb2wgKyBcIi8vXCIgKyB1cmxBbmNob3IuaG9zdDtcblx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXG5cdFx0XHRcdC8vIElmIHRoZXJlIGlzIGFuIGVycm9yIHBhcnNpbmcgdGhlIFVSTCwgYXNzdW1lIGl0IGlzIGNyb3NzRG9tYWluLFxuXHRcdFx0XHQvLyBpdCBjYW4gYmUgcmVqZWN0ZWQgYnkgdGhlIHRyYW5zcG9ydCBpZiBpdCBpcyBpbnZhbGlkXG5cdFx0XHRcdHMuY3Jvc3NEb21haW4gPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIENvbnZlcnQgZGF0YSBpZiBub3QgYWxyZWFkeSBhIHN0cmluZ1xuXHRcdGlmICggcy5kYXRhICYmIHMucHJvY2Vzc0RhdGEgJiYgdHlwZW9mIHMuZGF0YSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHMuZGF0YSA9IGpRdWVyeS5wYXJhbSggcy5kYXRhLCBzLnRyYWRpdGlvbmFsICk7XG5cdFx0fVxuXG5cdFx0Ly8gQXBwbHkgcHJlZmlsdGVyc1xuXHRcdGluc3BlY3RQcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCBwcmVmaWx0ZXJzLCBzLCBvcHRpb25zLCBqcVhIUiApO1xuXG5cdFx0Ly8gSWYgcmVxdWVzdCB3YXMgYWJvcnRlZCBpbnNpZGUgYSBwcmVmaWx0ZXIsIHN0b3AgdGhlcmVcblx0XHRpZiAoIHN0YXRlID09PSAyICkge1xuXHRcdFx0cmV0dXJuIGpxWEhSO1xuXHRcdH1cblxuXHRcdC8vIFdlIGNhbiBmaXJlIGdsb2JhbCBldmVudHMgYXMgb2Ygbm93IGlmIGFza2VkIHRvXG5cdFx0Ly8gRG9uJ3QgZmlyZSBldmVudHMgaWYgalF1ZXJ5LmV2ZW50IGlzIHVuZGVmaW5lZCBpbiBhbiBBTUQtdXNhZ2Ugc2NlbmFyaW8gKCMxNTExOClcblx0XHRmaXJlR2xvYmFscyA9IGpRdWVyeS5ldmVudCAmJiBzLmdsb2JhbDtcblxuXHRcdC8vIFdhdGNoIGZvciBhIG5ldyBzZXQgb2YgcmVxdWVzdHNcblx0XHRpZiAoIGZpcmVHbG9iYWxzICYmIGpRdWVyeS5hY3RpdmUrKyA9PT0gMCApIHtcblx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyKCBcImFqYXhTdGFydFwiICk7XG5cdFx0fVxuXG5cdFx0Ly8gVXBwZXJjYXNlIHRoZSB0eXBlXG5cdFx0cy50eXBlID0gcy50eXBlLnRvVXBwZXJDYXNlKCk7XG5cblx0XHQvLyBEZXRlcm1pbmUgaWYgcmVxdWVzdCBoYXMgY29udGVudFxuXHRcdHMuaGFzQ29udGVudCA9ICFybm9Db250ZW50LnRlc3QoIHMudHlwZSApO1xuXG5cdFx0Ly8gU2F2ZSB0aGUgVVJMIGluIGNhc2Ugd2UncmUgdG95aW5nIHdpdGggdGhlIElmLU1vZGlmaWVkLVNpbmNlXG5cdFx0Ly8gYW5kL29yIElmLU5vbmUtTWF0Y2ggaGVhZGVyIGxhdGVyIG9uXG5cdFx0Y2FjaGVVUkwgPSBzLnVybDtcblxuXHRcdC8vIE1vcmUgb3B0aW9ucyBoYW5kbGluZyBmb3IgcmVxdWVzdHMgd2l0aCBubyBjb250ZW50XG5cdFx0aWYgKCAhcy5oYXNDb250ZW50ICkge1xuXG5cdFx0XHQvLyBJZiBkYXRhIGlzIGF2YWlsYWJsZSwgYXBwZW5kIGRhdGEgdG8gdXJsXG5cdFx0XHRpZiAoIHMuZGF0YSApIHtcblx0XHRcdFx0Y2FjaGVVUkwgPSAoIHMudXJsICs9ICggcnF1ZXJ5LnRlc3QoIGNhY2hlVVJMICkgPyBcIiZcIiA6IFwiP1wiICkgKyBzLmRhdGEgKTtcblxuXHRcdFx0XHQvLyAjOTY4MjogcmVtb3ZlIGRhdGEgc28gdGhhdCBpdCdzIG5vdCB1c2VkIGluIGFuIGV2ZW50dWFsIHJldHJ5XG5cdFx0XHRcdGRlbGV0ZSBzLmRhdGE7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCBhbnRpLWNhY2hlIGluIHVybCBpZiBuZWVkZWRcblx0XHRcdGlmICggcy5jYWNoZSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdHMudXJsID0gcnRzLnRlc3QoIGNhY2hlVVJMICkgP1xuXG5cdFx0XHRcdFx0Ly8gSWYgdGhlcmUgaXMgYWxyZWFkeSBhICdfJyBwYXJhbWV0ZXIsIHNldCBpdHMgdmFsdWVcblx0XHRcdFx0XHRjYWNoZVVSTC5yZXBsYWNlKCBydHMsIFwiJDFfPVwiICsgbm9uY2UrKyApIDpcblxuXHRcdFx0XHRcdC8vIE90aGVyd2lzZSBhZGQgb25lIHRvIHRoZSBlbmRcblx0XHRcdFx0XHRjYWNoZVVSTCArICggcnF1ZXJ5LnRlc3QoIGNhY2hlVVJMICkgPyBcIiZcIiA6IFwiP1wiICkgKyBcIl89XCIgKyBub25jZSsrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFNldCB0aGUgSWYtTW9kaWZpZWQtU2luY2UgYW5kL29yIElmLU5vbmUtTWF0Y2ggaGVhZGVyLCBpZiBpbiBpZk1vZGlmaWVkIG1vZGUuXG5cdFx0aWYgKCBzLmlmTW9kaWZpZWQgKSB7XG5cdFx0XHRpZiAoIGpRdWVyeS5sYXN0TW9kaWZpZWRbIGNhY2hlVVJMIF0gKSB7XG5cdFx0XHRcdGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoIFwiSWYtTW9kaWZpZWQtU2luY2VcIiwgalF1ZXJ5Lmxhc3RNb2RpZmllZFsgY2FjaGVVUkwgXSApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBqUXVlcnkuZXRhZ1sgY2FjaGVVUkwgXSApIHtcblx0XHRcdFx0anFYSFIuc2V0UmVxdWVzdEhlYWRlciggXCJJZi1Ob25lLU1hdGNoXCIsIGpRdWVyeS5ldGFnWyBjYWNoZVVSTCBdICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IHRoZSBjb3JyZWN0IGhlYWRlciwgaWYgZGF0YSBpcyBiZWluZyBzZW50XG5cdFx0aWYgKCBzLmRhdGEgJiYgcy5oYXNDb250ZW50ICYmIHMuY29udGVudFR5cGUgIT09IGZhbHNlIHx8IG9wdGlvbnMuY29udGVudFR5cGUgKSB7XG5cdFx0XHRqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBcIkNvbnRlbnQtVHlwZVwiLCBzLmNvbnRlbnRUeXBlICk7XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IHRoZSBBY2NlcHRzIGhlYWRlciBmb3IgdGhlIHNlcnZlciwgZGVwZW5kaW5nIG9uIHRoZSBkYXRhVHlwZVxuXHRcdGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoXG5cdFx0XHRcIkFjY2VwdFwiLFxuXHRcdFx0cy5kYXRhVHlwZXNbIDAgXSAmJiBzLmFjY2VwdHNbIHMuZGF0YVR5cGVzWyAwIF0gXSA/XG5cdFx0XHRcdHMuYWNjZXB0c1sgcy5kYXRhVHlwZXNbIDAgXSBdICtcblx0XHRcdFx0XHQoIHMuZGF0YVR5cGVzWyAwIF0gIT09IFwiKlwiID8gXCIsIFwiICsgYWxsVHlwZXMgKyBcIjsgcT0wLjAxXCIgOiBcIlwiICkgOlxuXHRcdFx0XHRzLmFjY2VwdHNbIFwiKlwiIF1cblx0XHQpO1xuXG5cdFx0Ly8gQ2hlY2sgZm9yIGhlYWRlcnMgb3B0aW9uXG5cdFx0Zm9yICggaSBpbiBzLmhlYWRlcnMgKSB7XG5cdFx0XHRqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBpLCBzLmhlYWRlcnNbIGkgXSApO1xuXHRcdH1cblxuXHRcdC8vIEFsbG93IGN1c3RvbSBoZWFkZXJzL21pbWV0eXBlcyBhbmQgZWFybHkgYWJvcnRcblx0XHRpZiAoIHMuYmVmb3JlU2VuZCAmJlxuXHRcdFx0KCBzLmJlZm9yZVNlbmQuY2FsbCggY2FsbGJhY2tDb250ZXh0LCBqcVhIUiwgcyApID09PSBmYWxzZSB8fCBzdGF0ZSA9PT0gMiApICkge1xuXG5cdFx0XHQvLyBBYm9ydCBpZiBub3QgZG9uZSBhbHJlYWR5IGFuZCByZXR1cm5cblx0XHRcdHJldHVybiBqcVhIUi5hYm9ydCgpO1xuXHRcdH1cblxuXHRcdC8vIEFib3J0aW5nIGlzIG5vIGxvbmdlciBhIGNhbmNlbGxhdGlvblxuXHRcdHN0ckFib3J0ID0gXCJhYm9ydFwiO1xuXG5cdFx0Ly8gSW5zdGFsbCBjYWxsYmFja3Mgb24gZGVmZXJyZWRzXG5cdFx0Zm9yICggaSBpbiB7IHN1Y2Nlc3M6IDEsIGVycm9yOiAxLCBjb21wbGV0ZTogMSB9ICkge1xuXHRcdFx0anFYSFJbIGkgXSggc1sgaSBdICk7XG5cdFx0fVxuXG5cdFx0Ly8gR2V0IHRyYW5zcG9ydFxuXHRcdHRyYW5zcG9ydCA9IGluc3BlY3RQcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCB0cmFuc3BvcnRzLCBzLCBvcHRpb25zLCBqcVhIUiApO1xuXG5cdFx0Ly8gSWYgbm8gdHJhbnNwb3J0LCB3ZSBhdXRvLWFib3J0XG5cdFx0aWYgKCAhdHJhbnNwb3J0ICkge1xuXHRcdFx0ZG9uZSggLTEsIFwiTm8gVHJhbnNwb3J0XCIgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0anFYSFIucmVhZHlTdGF0ZSA9IDE7XG5cblx0XHRcdC8vIFNlbmQgZ2xvYmFsIGV2ZW50XG5cdFx0XHRpZiAoIGZpcmVHbG9iYWxzICkge1xuXHRcdFx0XHRnbG9iYWxFdmVudENvbnRleHQudHJpZ2dlciggXCJhamF4U2VuZFwiLCBbIGpxWEhSLCBzIF0gKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgcmVxdWVzdCB3YXMgYWJvcnRlZCBpbnNpZGUgYWpheFNlbmQsIHN0b3AgdGhlcmVcblx0XHRcdGlmICggc3RhdGUgPT09IDIgKSB7XG5cdFx0XHRcdHJldHVybiBqcVhIUjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gVGltZW91dFxuXHRcdFx0aWYgKCBzLmFzeW5jICYmIHMudGltZW91dCA+IDAgKSB7XG5cdFx0XHRcdHRpbWVvdXRUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRqcVhIUi5hYm9ydCggXCJ0aW1lb3V0XCIgKTtcblx0XHRcdFx0fSwgcy50aW1lb3V0ICk7XG5cdFx0XHR9XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdHN0YXRlID0gMTtcblx0XHRcdFx0dHJhbnNwb3J0LnNlbmQoIHJlcXVlc3RIZWFkZXJzLCBkb25lICk7XG5cdFx0XHR9IGNhdGNoICggZSApIHtcblxuXHRcdFx0XHQvLyBQcm9wYWdhdGUgZXhjZXB0aW9uIGFzIGVycm9yIGlmIG5vdCBkb25lXG5cdFx0XHRcdGlmICggc3RhdGUgPCAyICkge1xuXHRcdFx0XHRcdGRvbmUoIC0xLCBlICk7XG5cblx0XHRcdFx0Ly8gU2ltcGx5IHJldGhyb3cgb3RoZXJ3aXNlXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3cgZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIENhbGxiYWNrIGZvciB3aGVuIGV2ZXJ5dGhpbmcgaXMgZG9uZVxuXHRcdGZ1bmN0aW9uIGRvbmUoIHN0YXR1cywgbmF0aXZlU3RhdHVzVGV4dCwgcmVzcG9uc2VzLCBoZWFkZXJzICkge1xuXHRcdFx0dmFyIGlzU3VjY2Vzcywgc3VjY2VzcywgZXJyb3IsIHJlc3BvbnNlLCBtb2RpZmllZCxcblx0XHRcdFx0c3RhdHVzVGV4dCA9IG5hdGl2ZVN0YXR1c1RleHQ7XG5cblx0XHRcdC8vIENhbGxlZCBvbmNlXG5cdFx0XHRpZiAoIHN0YXRlID09PSAyICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN0YXRlIGlzIFwiZG9uZVwiIG5vd1xuXHRcdFx0c3RhdGUgPSAyO1xuXG5cdFx0XHQvLyBDbGVhciB0aW1lb3V0IGlmIGl0IGV4aXN0c1xuXHRcdFx0aWYgKCB0aW1lb3V0VGltZXIgKSB7XG5cdFx0XHRcdHdpbmRvdy5jbGVhclRpbWVvdXQoIHRpbWVvdXRUaW1lciApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBEZXJlZmVyZW5jZSB0cmFuc3BvcnQgZm9yIGVhcmx5IGdhcmJhZ2UgY29sbGVjdGlvblxuXHRcdFx0Ly8gKG5vIG1hdHRlciBob3cgbG9uZyB0aGUganFYSFIgb2JqZWN0IHdpbGwgYmUgdXNlZClcblx0XHRcdHRyYW5zcG9ydCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0Ly8gQ2FjaGUgcmVzcG9uc2UgaGVhZGVyc1xuXHRcdFx0cmVzcG9uc2VIZWFkZXJzU3RyaW5nID0gaGVhZGVycyB8fCBcIlwiO1xuXG5cdFx0XHQvLyBTZXQgcmVhZHlTdGF0ZVxuXHRcdFx0anFYSFIucmVhZHlTdGF0ZSA9IHN0YXR1cyA+IDAgPyA0IDogMDtcblxuXHRcdFx0Ly8gRGV0ZXJtaW5lIGlmIHN1Y2Nlc3NmdWxcblx0XHRcdGlzU3VjY2VzcyA9IHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwIHx8IHN0YXR1cyA9PT0gMzA0O1xuXG5cdFx0XHQvLyBHZXQgcmVzcG9uc2UgZGF0YVxuXHRcdFx0aWYgKCByZXNwb25zZXMgKSB7XG5cdFx0XHRcdHJlc3BvbnNlID0gYWpheEhhbmRsZVJlc3BvbnNlcyggcywganFYSFIsIHJlc3BvbnNlcyApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb252ZXJ0IG5vIG1hdHRlciB3aGF0ICh0aGF0IHdheSByZXNwb25zZVhYWCBmaWVsZHMgYXJlIGFsd2F5cyBzZXQpXG5cdFx0XHRyZXNwb25zZSA9IGFqYXhDb252ZXJ0KCBzLCByZXNwb25zZSwganFYSFIsIGlzU3VjY2VzcyApO1xuXG5cdFx0XHQvLyBJZiBzdWNjZXNzZnVsLCBoYW5kbGUgdHlwZSBjaGFpbmluZ1xuXHRcdFx0aWYgKCBpc1N1Y2Nlc3MgKSB7XG5cblx0XHRcdFx0Ly8gU2V0IHRoZSBJZi1Nb2RpZmllZC1TaW5jZSBhbmQvb3IgSWYtTm9uZS1NYXRjaCBoZWFkZXIsIGlmIGluIGlmTW9kaWZpZWQgbW9kZS5cblx0XHRcdFx0aWYgKCBzLmlmTW9kaWZpZWQgKSB7XG5cdFx0XHRcdFx0bW9kaWZpZWQgPSBqcVhIUi5nZXRSZXNwb25zZUhlYWRlciggXCJMYXN0LU1vZGlmaWVkXCIgKTtcblx0XHRcdFx0XHRpZiAoIG1vZGlmaWVkICkge1xuXHRcdFx0XHRcdFx0alF1ZXJ5Lmxhc3RNb2RpZmllZFsgY2FjaGVVUkwgXSA9IG1vZGlmaWVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRtb2RpZmllZCA9IGpxWEhSLmdldFJlc3BvbnNlSGVhZGVyKCBcImV0YWdcIiApO1xuXHRcdFx0XHRcdGlmICggbW9kaWZpZWQgKSB7XG5cdFx0XHRcdFx0XHRqUXVlcnkuZXRhZ1sgY2FjaGVVUkwgXSA9IG1vZGlmaWVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGlmIG5vIGNvbnRlbnRcblx0XHRcdFx0aWYgKCBzdGF0dXMgPT09IDIwNCB8fCBzLnR5cGUgPT09IFwiSEVBRFwiICkge1xuXHRcdFx0XHRcdHN0YXR1c1RleHQgPSBcIm5vY29udGVudFwiO1xuXG5cdFx0XHRcdC8vIGlmIG5vdCBtb2RpZmllZFxuXHRcdFx0XHR9IGVsc2UgaWYgKCBzdGF0dXMgPT09IDMwNCApIHtcblx0XHRcdFx0XHRzdGF0dXNUZXh0ID0gXCJub3Rtb2RpZmllZFwiO1xuXG5cdFx0XHRcdC8vIElmIHdlIGhhdmUgZGF0YSwgbGV0J3MgY29udmVydCBpdFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0ZTtcblx0XHRcdFx0XHRzdWNjZXNzID0gcmVzcG9uc2UuZGF0YTtcblx0XHRcdFx0XHRlcnJvciA9IHJlc3BvbnNlLmVycm9yO1xuXHRcdFx0XHRcdGlzU3VjY2VzcyA9ICFlcnJvcjtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvLyBFeHRyYWN0IGVycm9yIGZyb20gc3RhdHVzVGV4dCBhbmQgbm9ybWFsaXplIGZvciBub24tYWJvcnRzXG5cdFx0XHRcdGVycm9yID0gc3RhdHVzVGV4dDtcblx0XHRcdFx0aWYgKCBzdGF0dXMgfHwgIXN0YXR1c1RleHQgKSB7XG5cdFx0XHRcdFx0c3RhdHVzVGV4dCA9IFwiZXJyb3JcIjtcblx0XHRcdFx0XHRpZiAoIHN0YXR1cyA8IDAgKSB7XG5cdFx0XHRcdFx0XHRzdGF0dXMgPSAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBTZXQgZGF0YSBmb3IgdGhlIGZha2UgeGhyIG9iamVjdFxuXHRcdFx0anFYSFIuc3RhdHVzID0gc3RhdHVzO1xuXHRcdFx0anFYSFIuc3RhdHVzVGV4dCA9ICggbmF0aXZlU3RhdHVzVGV4dCB8fCBzdGF0dXNUZXh0ICkgKyBcIlwiO1xuXG5cdFx0XHQvLyBTdWNjZXNzL0Vycm9yXG5cdFx0XHRpZiAoIGlzU3VjY2VzcyApIHtcblx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZVdpdGgoIGNhbGxiYWNrQ29udGV4dCwgWyBzdWNjZXNzLCBzdGF0dXNUZXh0LCBqcVhIUiBdICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWZlcnJlZC5yZWplY3RXaXRoKCBjYWxsYmFja0NvbnRleHQsIFsganFYSFIsIHN0YXR1c1RleHQsIGVycm9yIF0gKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3RhdHVzLWRlcGVuZGVudCBjYWxsYmFja3Ncblx0XHRcdGpxWEhSLnN0YXR1c0NvZGUoIHN0YXR1c0NvZGUgKTtcblx0XHRcdHN0YXR1c0NvZGUgPSB1bmRlZmluZWQ7XG5cblx0XHRcdGlmICggZmlyZUdsb2JhbHMgKSB7XG5cdFx0XHRcdGdsb2JhbEV2ZW50Q29udGV4dC50cmlnZ2VyKCBpc1N1Y2Nlc3MgPyBcImFqYXhTdWNjZXNzXCIgOiBcImFqYXhFcnJvclwiLFxuXHRcdFx0XHRcdFsganFYSFIsIHMsIGlzU3VjY2VzcyA/IHN1Y2Nlc3MgOiBlcnJvciBdICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbXBsZXRlXG5cdFx0XHRjb21wbGV0ZURlZmVycmVkLmZpcmVXaXRoKCBjYWxsYmFja0NvbnRleHQsIFsganFYSFIsIHN0YXR1c1RleHQgXSApO1xuXG5cdFx0XHRpZiAoIGZpcmVHbG9iYWxzICkge1xuXHRcdFx0XHRnbG9iYWxFdmVudENvbnRleHQudHJpZ2dlciggXCJhamF4Q29tcGxldGVcIiwgWyBqcVhIUiwgcyBdICk7XG5cblx0XHRcdFx0Ly8gSGFuZGxlIHRoZSBnbG9iYWwgQUpBWCBjb3VudGVyXG5cdFx0XHRcdGlmICggISggLS1qUXVlcnkuYWN0aXZlICkgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXIoIFwiYWpheFN0b3BcIiApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGpxWEhSO1xuXHR9LFxuXG5cdGdldEpTT046IGZ1bmN0aW9uKCB1cmwsIGRhdGEsIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiBqUXVlcnkuZ2V0KCB1cmwsIGRhdGEsIGNhbGxiYWNrLCBcImpzb25cIiApO1xuXHR9LFxuXG5cdGdldFNjcmlwdDogZnVuY3Rpb24oIHVybCwgY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5nZXQoIHVybCwgdW5kZWZpbmVkLCBjYWxsYmFjaywgXCJzY3JpcHRcIiApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5lYWNoKCBbIFwiZ2V0XCIsIFwicG9zdFwiIF0sIGZ1bmN0aW9uKCBpLCBtZXRob2QgKSB7XG5cdGpRdWVyeVsgbWV0aG9kIF0gPSBmdW5jdGlvbiggdXJsLCBkYXRhLCBjYWxsYmFjaywgdHlwZSApIHtcblxuXHRcdC8vIFNoaWZ0IGFyZ3VtZW50cyBpZiBkYXRhIGFyZ3VtZW50IHdhcyBvbWl0dGVkXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggZGF0YSApICkge1xuXHRcdFx0dHlwZSA9IHR5cGUgfHwgY2FsbGJhY2s7XG5cdFx0XHRjYWxsYmFjayA9IGRhdGE7XG5cdFx0XHRkYXRhID0gdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdC8vIFRoZSB1cmwgY2FuIGJlIGFuIG9wdGlvbnMgb2JqZWN0ICh3aGljaCB0aGVuIG11c3QgaGF2ZSAudXJsKVxuXHRcdHJldHVybiBqUXVlcnkuYWpheCggalF1ZXJ5LmV4dGVuZCgge1xuXHRcdFx0dXJsOiB1cmwsXG5cdFx0XHR0eXBlOiBtZXRob2QsXG5cdFx0XHRkYXRhVHlwZTogdHlwZSxcblx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRzdWNjZXNzOiBjYWxsYmFja1xuXHRcdH0sIGpRdWVyeS5pc1BsYWluT2JqZWN0KCB1cmwgKSAmJiB1cmwgKSApO1xuXHR9O1xufSApO1xuXG5cbmpRdWVyeS5fZXZhbFVybCA9IGZ1bmN0aW9uKCB1cmwgKSB7XG5cdHJldHVybiBqUXVlcnkuYWpheCgge1xuXHRcdHVybDogdXJsLFxuXG5cdFx0Ly8gTWFrZSB0aGlzIGV4cGxpY2l0LCBzaW5jZSB1c2VyIGNhbiBvdmVycmlkZSB0aGlzIHRocm91Z2ggYWpheFNldHVwICgjMTEyNjQpXG5cdFx0dHlwZTogXCJHRVRcIixcblx0XHRkYXRhVHlwZTogXCJzY3JpcHRcIixcblx0XHRhc3luYzogZmFsc2UsXG5cdFx0Z2xvYmFsOiBmYWxzZSxcblx0XHRcInRocm93c1wiOiB0cnVlXG5cdH0gKTtcbn07XG5cblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHR3cmFwQWxsOiBmdW5jdGlvbiggaHRtbCApIHtcblx0XHR2YXIgd3JhcDtcblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGh0bWwgKSApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCBpICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS53cmFwQWxsKCBodG1sLmNhbGwoIHRoaXMsIGkgKSApO1xuXHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdGlmICggdGhpc1sgMCBdICkge1xuXG5cdFx0XHQvLyBUaGUgZWxlbWVudHMgdG8gd3JhcCB0aGUgdGFyZ2V0IGFyb3VuZFxuXHRcdFx0d3JhcCA9IGpRdWVyeSggaHRtbCwgdGhpc1sgMCBdLm93bmVyRG9jdW1lbnQgKS5lcSggMCApLmNsb25lKCB0cnVlICk7XG5cblx0XHRcdGlmICggdGhpc1sgMCBdLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdHdyYXAuaW5zZXJ0QmVmb3JlKCB0aGlzWyAwIF0gKTtcblx0XHRcdH1cblxuXHRcdFx0d3JhcC5tYXAoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgZWxlbSA9IHRoaXM7XG5cblx0XHRcdFx0d2hpbGUgKCBlbGVtLmZpcnN0RWxlbWVudENoaWxkICkge1xuXHRcdFx0XHRcdGVsZW0gPSBlbGVtLmZpcnN0RWxlbWVudENoaWxkO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGVsZW07XG5cdFx0XHR9ICkuYXBwZW5kKCB0aGlzICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0d3JhcElubmVyOiBmdW5jdGlvbiggaHRtbCApIHtcblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBodG1sICkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaSApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkud3JhcElubmVyKCBodG1sLmNhbGwoIHRoaXMsIGkgKSApO1xuXHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHNlbGYgPSBqUXVlcnkoIHRoaXMgKSxcblx0XHRcdFx0Y29udGVudHMgPSBzZWxmLmNvbnRlbnRzKCk7XG5cblx0XHRcdGlmICggY29udGVudHMubGVuZ3RoICkge1xuXHRcdFx0XHRjb250ZW50cy53cmFwQWxsKCBodG1sICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNlbGYuYXBwZW5kKCBodG1sICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdHdyYXA6IGZ1bmN0aW9uKCBodG1sICkge1xuXHRcdHZhciBpc0Z1bmN0aW9uID0galF1ZXJ5LmlzRnVuY3Rpb24oIGh0bWwgKTtcblxuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCBpICkge1xuXHRcdFx0alF1ZXJ5KCB0aGlzICkud3JhcEFsbCggaXNGdW5jdGlvbiA/IGh0bWwuY2FsbCggdGhpcywgaSApIDogaHRtbCApO1xuXHRcdH0gKTtcblx0fSxcblxuXHR1bndyYXA6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnBhcmVudCgpLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCAhalF1ZXJ5Lm5vZGVOYW1lKCB0aGlzLCBcImJvZHlcIiApICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS5yZXBsYWNlV2l0aCggdGhpcy5jaGlsZE5vZGVzICk7XG5cdFx0XHR9XG5cdFx0fSApLmVuZCgpO1xuXHR9XG59ICk7XG5cblxualF1ZXJ5LmV4cHIuZmlsdGVycy5oaWRkZW4gPSBmdW5jdGlvbiggZWxlbSApIHtcblx0cmV0dXJuICFqUXVlcnkuZXhwci5maWx0ZXJzLnZpc2libGUoIGVsZW0gKTtcbn07XG5qUXVlcnkuZXhwci5maWx0ZXJzLnZpc2libGUgPSBmdW5jdGlvbiggZWxlbSApIHtcblxuXHQvLyBTdXBwb3J0OiBPcGVyYSA8PSAxMi4xMlxuXHQvLyBPcGVyYSByZXBvcnRzIG9mZnNldFdpZHRocyBhbmQgb2Zmc2V0SGVpZ2h0cyBsZXNzIHRoYW4gemVybyBvbiBzb21lIGVsZW1lbnRzXG5cdC8vIFVzZSBPUiBpbnN0ZWFkIG9mIEFORCBhcyB0aGUgZWxlbWVudCBpcyBub3QgdmlzaWJsZSBpZiBlaXRoZXIgaXMgdHJ1ZVxuXHQvLyBTZWUgdGlja2V0cyAjMTA0MDYgYW5kICMxMzEzMlxuXHRyZXR1cm4gZWxlbS5vZmZzZXRXaWR0aCA+IDAgfHwgZWxlbS5vZmZzZXRIZWlnaHQgPiAwIHx8IGVsZW0uZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggPiAwO1xufTtcblxuXG5cblxudmFyIHIyMCA9IC8lMjAvZyxcblx0cmJyYWNrZXQgPSAvXFxbXFxdJC8sXG5cdHJDUkxGID0gL1xccj9cXG4vZyxcblx0cnN1Ym1pdHRlclR5cGVzID0gL14oPzpzdWJtaXR8YnV0dG9ufGltYWdlfHJlc2V0fGZpbGUpJC9pLFxuXHRyc3VibWl0dGFibGUgPSAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxrZXlnZW4pL2k7XG5cbmZ1bmN0aW9uIGJ1aWxkUGFyYW1zKCBwcmVmaXgsIG9iaiwgdHJhZGl0aW9uYWwsIGFkZCApIHtcblx0dmFyIG5hbWU7XG5cblx0aWYgKCBqUXVlcnkuaXNBcnJheSggb2JqICkgKSB7XG5cblx0XHQvLyBTZXJpYWxpemUgYXJyYXkgaXRlbS5cblx0XHRqUXVlcnkuZWFjaCggb2JqLCBmdW5jdGlvbiggaSwgdiApIHtcblx0XHRcdGlmICggdHJhZGl0aW9uYWwgfHwgcmJyYWNrZXQudGVzdCggcHJlZml4ICkgKSB7XG5cblx0XHRcdFx0Ly8gVHJlYXQgZWFjaCBhcnJheSBpdGVtIGFzIGEgc2NhbGFyLlxuXHRcdFx0XHRhZGQoIHByZWZpeCwgdiApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIEl0ZW0gaXMgbm9uLXNjYWxhciAoYXJyYXkgb3Igb2JqZWN0KSwgZW5jb2RlIGl0cyBudW1lcmljIGluZGV4LlxuXHRcdFx0XHRidWlsZFBhcmFtcyhcblx0XHRcdFx0XHRwcmVmaXggKyBcIltcIiArICggdHlwZW9mIHYgPT09IFwib2JqZWN0XCIgJiYgdiAhPSBudWxsID8gaSA6IFwiXCIgKSArIFwiXVwiLFxuXHRcdFx0XHRcdHYsXG5cdFx0XHRcdFx0dHJhZGl0aW9uYWwsXG5cdFx0XHRcdFx0YWRkXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXG5cdH0gZWxzZSBpZiAoICF0cmFkaXRpb25hbCAmJiBqUXVlcnkudHlwZSggb2JqICkgPT09IFwib2JqZWN0XCIgKSB7XG5cblx0XHQvLyBTZXJpYWxpemUgb2JqZWN0IGl0ZW0uXG5cdFx0Zm9yICggbmFtZSBpbiBvYmogKSB7XG5cdFx0XHRidWlsZFBhcmFtcyggcHJlZml4ICsgXCJbXCIgKyBuYW1lICsgXCJdXCIsIG9ialsgbmFtZSBdLCB0cmFkaXRpb25hbCwgYWRkICk7XG5cdFx0fVxuXG5cdH0gZWxzZSB7XG5cblx0XHQvLyBTZXJpYWxpemUgc2NhbGFyIGl0ZW0uXG5cdFx0YWRkKCBwcmVmaXgsIG9iaiApO1xuXHR9XG59XG5cbi8vIFNlcmlhbGl6ZSBhbiBhcnJheSBvZiBmb3JtIGVsZW1lbnRzIG9yIGEgc2V0IG9mXG4vLyBrZXkvdmFsdWVzIGludG8gYSBxdWVyeSBzdHJpbmdcbmpRdWVyeS5wYXJhbSA9IGZ1bmN0aW9uKCBhLCB0cmFkaXRpb25hbCApIHtcblx0dmFyIHByZWZpeCxcblx0XHRzID0gW10sXG5cdFx0YWRkID0gZnVuY3Rpb24oIGtleSwgdmFsdWUgKSB7XG5cblx0XHRcdC8vIElmIHZhbHVlIGlzIGEgZnVuY3Rpb24sIGludm9rZSBpdCBhbmQgcmV0dXJuIGl0cyB2YWx1ZVxuXHRcdFx0dmFsdWUgPSBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSA/IHZhbHVlKCkgOiAoIHZhbHVlID09IG51bGwgPyBcIlwiIDogdmFsdWUgKTtcblx0XHRcdHNbIHMubGVuZ3RoIF0gPSBlbmNvZGVVUklDb21wb25lbnQoIGtleSApICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoIHZhbHVlICk7XG5cdFx0fTtcblxuXHQvLyBTZXQgdHJhZGl0aW9uYWwgdG8gdHJ1ZSBmb3IgalF1ZXJ5IDw9IDEuMy4yIGJlaGF2aW9yLlxuXHRpZiAoIHRyYWRpdGlvbmFsID09PSB1bmRlZmluZWQgKSB7XG5cdFx0dHJhZGl0aW9uYWwgPSBqUXVlcnkuYWpheFNldHRpbmdzICYmIGpRdWVyeS5hamF4U2V0dGluZ3MudHJhZGl0aW9uYWw7XG5cdH1cblxuXHQvLyBJZiBhbiBhcnJheSB3YXMgcGFzc2VkIGluLCBhc3N1bWUgdGhhdCBpdCBpcyBhbiBhcnJheSBvZiBmb3JtIGVsZW1lbnRzLlxuXHRpZiAoIGpRdWVyeS5pc0FycmF5KCBhICkgfHwgKCBhLmpxdWVyeSAmJiAhalF1ZXJ5LmlzUGxhaW5PYmplY3QoIGEgKSApICkge1xuXG5cdFx0Ly8gU2VyaWFsaXplIHRoZSBmb3JtIGVsZW1lbnRzXG5cdFx0alF1ZXJ5LmVhY2goIGEsIGZ1bmN0aW9uKCkge1xuXHRcdFx0YWRkKCB0aGlzLm5hbWUsIHRoaXMudmFsdWUgKTtcblx0XHR9ICk7XG5cblx0fSBlbHNlIHtcblxuXHRcdC8vIElmIHRyYWRpdGlvbmFsLCBlbmNvZGUgdGhlIFwib2xkXCIgd2F5ICh0aGUgd2F5IDEuMy4yIG9yIG9sZGVyXG5cdFx0Ly8gZGlkIGl0KSwgb3RoZXJ3aXNlIGVuY29kZSBwYXJhbXMgcmVjdXJzaXZlbHkuXG5cdFx0Zm9yICggcHJlZml4IGluIGEgKSB7XG5cdFx0XHRidWlsZFBhcmFtcyggcHJlZml4LCBhWyBwcmVmaXggXSwgdHJhZGl0aW9uYWwsIGFkZCApO1xuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgcmVzdWx0aW5nIHNlcmlhbGl6YXRpb25cblx0cmV0dXJuIHMuam9pbiggXCImXCIgKS5yZXBsYWNlKCByMjAsIFwiK1wiICk7XG59O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdHNlcmlhbGl6ZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5wYXJhbSggdGhpcy5zZXJpYWxpemVBcnJheSgpICk7XG5cdH0sXG5cdHNlcmlhbGl6ZUFycmF5OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBDYW4gYWRkIHByb3BIb29rIGZvciBcImVsZW1lbnRzXCIgdG8gZmlsdGVyIG9yIGFkZCBmb3JtIGVsZW1lbnRzXG5cdFx0XHR2YXIgZWxlbWVudHMgPSBqUXVlcnkucHJvcCggdGhpcywgXCJlbGVtZW50c1wiICk7XG5cdFx0XHRyZXR1cm4gZWxlbWVudHMgPyBqUXVlcnkubWFrZUFycmF5KCBlbGVtZW50cyApIDogdGhpcztcblx0XHR9IClcblx0XHQuZmlsdGVyKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciB0eXBlID0gdGhpcy50eXBlO1xuXG5cdFx0XHQvLyBVc2UgLmlzKCBcIjpkaXNhYmxlZFwiICkgc28gdGhhdCBmaWVsZHNldFtkaXNhYmxlZF0gd29ya3Ncblx0XHRcdHJldHVybiB0aGlzLm5hbWUgJiYgIWpRdWVyeSggdGhpcyApLmlzKCBcIjpkaXNhYmxlZFwiICkgJiZcblx0XHRcdFx0cnN1Ym1pdHRhYmxlLnRlc3QoIHRoaXMubm9kZU5hbWUgKSAmJiAhcnN1Ym1pdHRlclR5cGVzLnRlc3QoIHR5cGUgKSAmJlxuXHRcdFx0XHQoIHRoaXMuY2hlY2tlZCB8fCAhcmNoZWNrYWJsZVR5cGUudGVzdCggdHlwZSApICk7XG5cdFx0fSApXG5cdFx0Lm1hcCggZnVuY3Rpb24oIGksIGVsZW0gKSB7XG5cdFx0XHR2YXIgdmFsID0galF1ZXJ5KCB0aGlzICkudmFsKCk7XG5cblx0XHRcdHJldHVybiB2YWwgPT0gbnVsbCA/XG5cdFx0XHRcdG51bGwgOlxuXHRcdFx0XHRqUXVlcnkuaXNBcnJheSggdmFsICkgP1xuXHRcdFx0XHRcdGpRdWVyeS5tYXAoIHZhbCwgZnVuY3Rpb24oIHZhbCApIHtcblx0XHRcdFx0XHRcdHJldHVybiB7IG5hbWU6IGVsZW0ubmFtZSwgdmFsdWU6IHZhbC5yZXBsYWNlKCByQ1JMRiwgXCJcXHJcXG5cIiApIH07XG5cdFx0XHRcdFx0fSApIDpcblx0XHRcdFx0XHR7IG5hbWU6IGVsZW0ubmFtZSwgdmFsdWU6IHZhbC5yZXBsYWNlKCByQ1JMRiwgXCJcXHJcXG5cIiApIH07XG5cdFx0fSApLmdldCgpO1xuXHR9XG59ICk7XG5cblxualF1ZXJ5LmFqYXhTZXR0aW5ncy54aHIgPSBmdW5jdGlvbigpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpO1xuXHR9IGNhdGNoICggZSApIHt9XG59O1xuXG52YXIgeGhyU3VjY2Vzc1N0YXR1cyA9IHtcblxuXHRcdC8vIEZpbGUgcHJvdG9jb2wgYWx3YXlzIHlpZWxkcyBzdGF0dXMgY29kZSAwLCBhc3N1bWUgMjAwXG5cdFx0MDogMjAwLFxuXG5cdFx0Ly8gU3VwcG9ydDogSUU5XG5cdFx0Ly8gIzE0NTA6IHNvbWV0aW1lcyBJRSByZXR1cm5zIDEyMjMgd2hlbiBpdCBzaG91bGQgYmUgMjA0XG5cdFx0MTIyMzogMjA0XG5cdH0sXG5cdHhoclN1cHBvcnRlZCA9IGpRdWVyeS5hamF4U2V0dGluZ3MueGhyKCk7XG5cbnN1cHBvcnQuY29ycyA9ICEheGhyU3VwcG9ydGVkICYmICggXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiB4aHJTdXBwb3J0ZWQgKTtcbnN1cHBvcnQuYWpheCA9IHhoclN1cHBvcnRlZCA9ICEheGhyU3VwcG9ydGVkO1xuXG5qUXVlcnkuYWpheFRyYW5zcG9ydCggZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cdHZhciBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaztcblxuXHQvLyBDcm9zcyBkb21haW4gb25seSBhbGxvd2VkIGlmIHN1cHBvcnRlZCB0aHJvdWdoIFhNTEh0dHBSZXF1ZXN0XG5cdGlmICggc3VwcG9ydC5jb3JzIHx8IHhoclN1cHBvcnRlZCAmJiAhb3B0aW9ucy5jcm9zc0RvbWFpbiApIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0c2VuZDogZnVuY3Rpb24oIGhlYWRlcnMsIGNvbXBsZXRlICkge1xuXHRcdFx0XHR2YXIgaSxcblx0XHRcdFx0XHR4aHIgPSBvcHRpb25zLnhocigpO1xuXG5cdFx0XHRcdHhoci5vcGVuKFxuXHRcdFx0XHRcdG9wdGlvbnMudHlwZSxcblx0XHRcdFx0XHRvcHRpb25zLnVybCxcblx0XHRcdFx0XHRvcHRpb25zLmFzeW5jLFxuXHRcdFx0XHRcdG9wdGlvbnMudXNlcm5hbWUsXG5cdFx0XHRcdFx0b3B0aW9ucy5wYXNzd29yZFxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdC8vIEFwcGx5IGN1c3RvbSBmaWVsZHMgaWYgcHJvdmlkZWRcblx0XHRcdFx0aWYgKCBvcHRpb25zLnhockZpZWxkcyApIHtcblx0XHRcdFx0XHRmb3IgKCBpIGluIG9wdGlvbnMueGhyRmllbGRzICkge1xuXHRcdFx0XHRcdFx0eGhyWyBpIF0gPSBvcHRpb25zLnhockZpZWxkc1sgaSBdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIE92ZXJyaWRlIG1pbWUgdHlwZSBpZiBuZWVkZWRcblx0XHRcdFx0aWYgKCBvcHRpb25zLm1pbWVUeXBlICYmIHhoci5vdmVycmlkZU1pbWVUeXBlICkge1xuXHRcdFx0XHRcdHhoci5vdmVycmlkZU1pbWVUeXBlKCBvcHRpb25zLm1pbWVUeXBlICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBYLVJlcXVlc3RlZC1XaXRoIGhlYWRlclxuXHRcdFx0XHQvLyBGb3IgY3Jvc3MtZG9tYWluIHJlcXVlc3RzLCBzZWVpbmcgYXMgY29uZGl0aW9ucyBmb3IgYSBwcmVmbGlnaHQgYXJlXG5cdFx0XHRcdC8vIGFraW4gdG8gYSBqaWdzYXcgcHV6emxlLCB3ZSBzaW1wbHkgbmV2ZXIgc2V0IGl0IHRvIGJlIHN1cmUuXG5cdFx0XHRcdC8vIChpdCBjYW4gYWx3YXlzIGJlIHNldCBvbiBhIHBlci1yZXF1ZXN0IGJhc2lzIG9yIGV2ZW4gdXNpbmcgYWpheFNldHVwKVxuXHRcdFx0XHQvLyBGb3Igc2FtZS1kb21haW4gcmVxdWVzdHMsIHdvbid0IGNoYW5nZSBoZWFkZXIgaWYgYWxyZWFkeSBwcm92aWRlZC5cblx0XHRcdFx0aWYgKCAhb3B0aW9ucy5jcm9zc0RvbWFpbiAmJiAhaGVhZGVyc1sgXCJYLVJlcXVlc3RlZC1XaXRoXCIgXSApIHtcblx0XHRcdFx0XHRoZWFkZXJzWyBcIlgtUmVxdWVzdGVkLVdpdGhcIiBdID0gXCJYTUxIdHRwUmVxdWVzdFwiO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gU2V0IGhlYWRlcnNcblx0XHRcdFx0Zm9yICggaSBpbiBoZWFkZXJzICkge1xuXHRcdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCBpLCBoZWFkZXJzWyBpIF0gKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIENhbGxiYWNrXG5cdFx0XHRcdGNhbGxiYWNrID0gZnVuY3Rpb24oIHR5cGUgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0aWYgKCBjYWxsYmFjayApIHtcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2sgPSBlcnJvckNhbGxiYWNrID0geGhyLm9ubG9hZCA9XG5cdFx0XHRcdFx0XHRcdFx0eGhyLm9uZXJyb3IgPSB4aHIub25hYm9ydCA9IHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuXG5cdFx0XHRcdFx0XHRcdGlmICggdHlwZSA9PT0gXCJhYm9ydFwiICkge1xuXHRcdFx0XHRcdFx0XHRcdHhoci5hYm9ydCgpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCB0eXBlID09PSBcImVycm9yXCIgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRTlcblx0XHRcdFx0XHRcdFx0XHQvLyBPbiBhIG1hbnVhbCBuYXRpdmUgYWJvcnQsIElFOSB0aHJvd3Ncblx0XHRcdFx0XHRcdFx0XHQvLyBlcnJvcnMgb24gYW55IHByb3BlcnR5IGFjY2VzcyB0aGF0IGlzIG5vdCByZWFkeVN0YXRlXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCB0eXBlb2YgeGhyLnN0YXR1cyAhPT0gXCJudW1iZXJcIiApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbXBsZXRlKCAwLCBcImVycm9yXCIgKTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29tcGxldGUoXG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gRmlsZTogcHJvdG9jb2wgYWx3YXlzIHlpZWxkcyBzdGF0dXMgMDsgc2VlICM4NjA1LCAjMTQyMDdcblx0XHRcdFx0XHRcdFx0XHRcdFx0eGhyLnN0YXR1cyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0eGhyLnN0YXR1c1RleHRcblx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGNvbXBsZXRlKFxuXHRcdFx0XHRcdFx0XHRcdFx0eGhyU3VjY2Vzc1N0YXR1c1sgeGhyLnN0YXR1cyBdIHx8IHhoci5zdGF0dXMsXG5cdFx0XHRcdFx0XHRcdFx0XHR4aHIuc3RhdHVzVGV4dCxcblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUU5IG9ubHlcblx0XHRcdFx0XHRcdFx0XHRcdC8vIElFOSBoYXMgbm8gWEhSMiBidXQgdGhyb3dzIG9uIGJpbmFyeSAodHJhYy0xMTQyNilcblx0XHRcdFx0XHRcdFx0XHRcdC8vIEZvciBYSFIyIG5vbi10ZXh0LCBsZXQgdGhlIGNhbGxlciBoYW5kbGUgaXQgKGdoLTI0OTgpXG5cdFx0XHRcdFx0XHRcdFx0XHQoIHhoci5yZXNwb25zZVR5cGUgfHwgXCJ0ZXh0XCIgKSAhPT0gXCJ0ZXh0XCIgIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHR0eXBlb2YgeGhyLnJlc3BvbnNlVGV4dCAhPT0gXCJzdHJpbmdcIiA/XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHsgYmluYXJ5OiB4aHIucmVzcG9uc2UgfSA6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHsgdGV4dDogeGhyLnJlc3BvbnNlVGV4dCB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0eGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpXG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Ly8gTGlzdGVuIHRvIGV2ZW50c1xuXHRcdFx0XHR4aHIub25sb2FkID0gY2FsbGJhY2soKTtcblx0XHRcdFx0ZXJyb3JDYWxsYmFjayA9IHhoci5vbmVycm9yID0gY2FsbGJhY2soIFwiZXJyb3JcIiApO1xuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IElFOVxuXHRcdFx0XHQvLyBVc2Ugb25yZWFkeXN0YXRlY2hhbmdlIHRvIHJlcGxhY2Ugb25hYm9ydFxuXHRcdFx0XHQvLyB0byBoYW5kbGUgdW5jYXVnaHQgYWJvcnRzXG5cdFx0XHRcdGlmICggeGhyLm9uYWJvcnQgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHR4aHIub25hYm9ydCA9IGVycm9yQ2FsbGJhY2s7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHQvLyBDaGVjayByZWFkeVN0YXRlIGJlZm9yZSB0aW1lb3V0IGFzIGl0IGNoYW5nZXNcblx0XHRcdFx0XHRcdGlmICggeGhyLnJlYWR5U3RhdGUgPT09IDQgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gQWxsb3cgb25lcnJvciB0byBiZSBjYWxsZWQgZmlyc3QsXG5cdFx0XHRcdFx0XHRcdC8vIGJ1dCB0aGF0IHdpbGwgbm90IGhhbmRsZSBhIG5hdGl2ZSBhYm9ydFxuXHRcdFx0XHRcdFx0XHQvLyBBbHNvLCBzYXZlIGVycm9yQ2FsbGJhY2sgdG8gYSB2YXJpYWJsZVxuXHRcdFx0XHRcdFx0XHQvLyBhcyB4aHIub25lcnJvciBjYW5ub3QgYmUgYWNjZXNzZWRcblx0XHRcdFx0XHRcdFx0d2luZG93LnNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdGlmICggY2FsbGJhY2sgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRlcnJvckNhbGxiYWNrKCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIENyZWF0ZSB0aGUgYWJvcnQgY2FsbGJhY2tcblx0XHRcdFx0Y2FsbGJhY2sgPSBjYWxsYmFjayggXCJhYm9ydFwiICk7XG5cblx0XHRcdFx0dHJ5IHtcblxuXHRcdFx0XHRcdC8vIERvIHNlbmQgdGhlIHJlcXVlc3QgKHRoaXMgbWF5IHJhaXNlIGFuIGV4Y2VwdGlvbilcblx0XHRcdFx0XHR4aHIuc2VuZCggb3B0aW9ucy5oYXNDb250ZW50ICYmIG9wdGlvbnMuZGF0YSB8fCBudWxsICk7XG5cdFx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXG5cdFx0XHRcdFx0Ly8gIzE0NjgzOiBPbmx5IHJldGhyb3cgaWYgdGhpcyBoYXNuJ3QgYmVlbiBub3RpZmllZCBhcyBhbiBlcnJvciB5ZXRcblx0XHRcdFx0XHRpZiAoIGNhbGxiYWNrICkge1xuXHRcdFx0XHRcdFx0dGhyb3cgZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdGFib3J0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCBjYWxsYmFjayApIHtcblx0XHRcdFx0XHRjYWxsYmFjaygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufSApO1xuXG5cblxuXG4vLyBJbnN0YWxsIHNjcmlwdCBkYXRhVHlwZVxualF1ZXJ5LmFqYXhTZXR1cCgge1xuXHRhY2NlcHRzOiB7XG5cdFx0c2NyaXB0OiBcInRleHQvamF2YXNjcmlwdCwgYXBwbGljYXRpb24vamF2YXNjcmlwdCwgXCIgK1xuXHRcdFx0XCJhcHBsaWNhdGlvbi9lY21hc2NyaXB0LCBhcHBsaWNhdGlvbi94LWVjbWFzY3JpcHRcIlxuXHR9LFxuXHRjb250ZW50czoge1xuXHRcdHNjcmlwdDogL1xcYig/OmphdmF8ZWNtYSlzY3JpcHRcXGIvXG5cdH0sXG5cdGNvbnZlcnRlcnM6IHtcblx0XHRcInRleHQgc2NyaXB0XCI6IGZ1bmN0aW9uKCB0ZXh0ICkge1xuXHRcdFx0alF1ZXJ5Lmdsb2JhbEV2YWwoIHRleHQgKTtcblx0XHRcdHJldHVybiB0ZXh0O1xuXHRcdH1cblx0fVxufSApO1xuXG4vLyBIYW5kbGUgY2FjaGUncyBzcGVjaWFsIGNhc2UgYW5kIGNyb3NzRG9tYWluXG5qUXVlcnkuYWpheFByZWZpbHRlciggXCJzY3JpcHRcIiwgZnVuY3Rpb24oIHMgKSB7XG5cdGlmICggcy5jYWNoZSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdHMuY2FjaGUgPSBmYWxzZTtcblx0fVxuXHRpZiAoIHMuY3Jvc3NEb21haW4gKSB7XG5cdFx0cy50eXBlID0gXCJHRVRcIjtcblx0fVxufSApO1xuXG4vLyBCaW5kIHNjcmlwdCB0YWcgaGFjayB0cmFuc3BvcnRcbmpRdWVyeS5hamF4VHJhbnNwb3J0KCBcInNjcmlwdFwiLCBmdW5jdGlvbiggcyApIHtcblxuXHQvLyBUaGlzIHRyYW5zcG9ydCBvbmx5IGRlYWxzIHdpdGggY3Jvc3MgZG9tYWluIHJlcXVlc3RzXG5cdGlmICggcy5jcm9zc0RvbWFpbiApIHtcblx0XHR2YXIgc2NyaXB0LCBjYWxsYmFjaztcblx0XHRyZXR1cm4ge1xuXHRcdFx0c2VuZDogZnVuY3Rpb24oIF8sIGNvbXBsZXRlICkge1xuXHRcdFx0XHRzY3JpcHQgPSBqUXVlcnkoIFwiPHNjcmlwdD5cIiApLnByb3AoIHtcblx0XHRcdFx0XHRjaGFyc2V0OiBzLnNjcmlwdENoYXJzZXQsXG5cdFx0XHRcdFx0c3JjOiBzLnVybFxuXHRcdFx0XHR9ICkub24oXG5cdFx0XHRcdFx0XCJsb2FkIGVycm9yXCIsXG5cdFx0XHRcdFx0Y2FsbGJhY2sgPSBmdW5jdGlvbiggZXZ0ICkge1xuXHRcdFx0XHRcdFx0c2NyaXB0LnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0Y2FsbGJhY2sgPSBudWxsO1xuXHRcdFx0XHRcdFx0aWYgKCBldnQgKSB7XG5cdFx0XHRcdFx0XHRcdGNvbXBsZXRlKCBldnQudHlwZSA9PT0gXCJlcnJvclwiID8gNDA0IDogMjAwLCBldnQudHlwZSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblxuXHRcdFx0XHQvLyBVc2UgbmF0aXZlIERPTSBtYW5pcHVsYXRpb24gdG8gYXZvaWQgb3VyIGRvbU1hbmlwIEFKQVggdHJpY2tlcnlcblx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCggc2NyaXB0WyAwIF0gKTtcblx0XHRcdH0sXG5cdFx0XHRhYm9ydDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggY2FsbGJhY2sgKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2soKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn0gKTtcblxuXG5cblxudmFyIG9sZENhbGxiYWNrcyA9IFtdLFxuXHRyanNvbnAgPSAvKD0pXFw/KD89JnwkKXxcXD9cXD8vO1xuXG4vLyBEZWZhdWx0IGpzb25wIHNldHRpbmdzXG5qUXVlcnkuYWpheFNldHVwKCB7XG5cdGpzb25wOiBcImNhbGxiYWNrXCIsXG5cdGpzb25wQ2FsbGJhY2s6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBjYWxsYmFjayA9IG9sZENhbGxiYWNrcy5wb3AoKSB8fCAoIGpRdWVyeS5leHBhbmRvICsgXCJfXCIgKyAoIG5vbmNlKysgKSApO1xuXHRcdHRoaXNbIGNhbGxiYWNrIF0gPSB0cnVlO1xuXHRcdHJldHVybiBjYWxsYmFjaztcblx0fVxufSApO1xuXG4vLyBEZXRlY3QsIG5vcm1hbGl6ZSBvcHRpb25zIGFuZCBpbnN0YWxsIGNhbGxiYWNrcyBmb3IganNvbnAgcmVxdWVzdHNcbmpRdWVyeS5hamF4UHJlZmlsdGVyKCBcImpzb24ganNvbnBcIiwgZnVuY3Rpb24oIHMsIG9yaWdpbmFsU2V0dGluZ3MsIGpxWEhSICkge1xuXG5cdHZhciBjYWxsYmFja05hbWUsIG92ZXJ3cml0dGVuLCByZXNwb25zZUNvbnRhaW5lcixcblx0XHRqc29uUHJvcCA9IHMuanNvbnAgIT09IGZhbHNlICYmICggcmpzb25wLnRlc3QoIHMudXJsICkgP1xuXHRcdFx0XCJ1cmxcIiA6XG5cdFx0XHR0eXBlb2Ygcy5kYXRhID09PSBcInN0cmluZ1wiICYmXG5cdFx0XHRcdCggcy5jb250ZW50VHlwZSB8fCBcIlwiIClcblx0XHRcdFx0XHQuaW5kZXhPZiggXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIiApID09PSAwICYmXG5cdFx0XHRcdHJqc29ucC50ZXN0KCBzLmRhdGEgKSAmJiBcImRhdGFcIlxuXHRcdCk7XG5cblx0Ly8gSGFuZGxlIGlmZiB0aGUgZXhwZWN0ZWQgZGF0YSB0eXBlIGlzIFwianNvbnBcIiBvciB3ZSBoYXZlIGEgcGFyYW1ldGVyIHRvIHNldFxuXHRpZiAoIGpzb25Qcm9wIHx8IHMuZGF0YVR5cGVzWyAwIF0gPT09IFwianNvbnBcIiApIHtcblxuXHRcdC8vIEdldCBjYWxsYmFjayBuYW1lLCByZW1lbWJlcmluZyBwcmVleGlzdGluZyB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggaXRcblx0XHRjYWxsYmFja05hbWUgPSBzLmpzb25wQ2FsbGJhY2sgPSBqUXVlcnkuaXNGdW5jdGlvbiggcy5qc29ucENhbGxiYWNrICkgP1xuXHRcdFx0cy5qc29ucENhbGxiYWNrKCkgOlxuXHRcdFx0cy5qc29ucENhbGxiYWNrO1xuXG5cdFx0Ly8gSW5zZXJ0IGNhbGxiYWNrIGludG8gdXJsIG9yIGZvcm0gZGF0YVxuXHRcdGlmICgganNvblByb3AgKSB7XG5cdFx0XHRzWyBqc29uUHJvcCBdID0gc1sganNvblByb3AgXS5yZXBsYWNlKCByanNvbnAsIFwiJDFcIiArIGNhbGxiYWNrTmFtZSApO1xuXHRcdH0gZWxzZSBpZiAoIHMuanNvbnAgIT09IGZhbHNlICkge1xuXHRcdFx0cy51cmwgKz0gKCBycXVlcnkudGVzdCggcy51cmwgKSA/IFwiJlwiIDogXCI/XCIgKSArIHMuanNvbnAgKyBcIj1cIiArIGNhbGxiYWNrTmFtZTtcblx0XHR9XG5cblx0XHQvLyBVc2UgZGF0YSBjb252ZXJ0ZXIgdG8gcmV0cmlldmUganNvbiBhZnRlciBzY3JpcHQgZXhlY3V0aW9uXG5cdFx0cy5jb252ZXJ0ZXJzWyBcInNjcmlwdCBqc29uXCIgXSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCAhcmVzcG9uc2VDb250YWluZXIgKSB7XG5cdFx0XHRcdGpRdWVyeS5lcnJvciggY2FsbGJhY2tOYW1lICsgXCIgd2FzIG5vdCBjYWxsZWRcIiApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3BvbnNlQ29udGFpbmVyWyAwIF07XG5cdFx0fTtcblxuXHRcdC8vIEZvcmNlIGpzb24gZGF0YVR5cGVcblx0XHRzLmRhdGFUeXBlc1sgMCBdID0gXCJqc29uXCI7XG5cblx0XHQvLyBJbnN0YWxsIGNhbGxiYWNrXG5cdFx0b3ZlcndyaXR0ZW4gPSB3aW5kb3dbIGNhbGxiYWNrTmFtZSBdO1xuXHRcdHdpbmRvd1sgY2FsbGJhY2tOYW1lIF0gPSBmdW5jdGlvbigpIHtcblx0XHRcdHJlc3BvbnNlQ29udGFpbmVyID0gYXJndW1lbnRzO1xuXHRcdH07XG5cblx0XHQvLyBDbGVhbi11cCBmdW5jdGlvbiAoZmlyZXMgYWZ0ZXIgY29udmVydGVycylcblx0XHRqcVhIUi5hbHdheXMoIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBJZiBwcmV2aW91cyB2YWx1ZSBkaWRuJ3QgZXhpc3QgLSByZW1vdmUgaXRcblx0XHRcdGlmICggb3ZlcndyaXR0ZW4gPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0alF1ZXJ5KCB3aW5kb3cgKS5yZW1vdmVQcm9wKCBjYWxsYmFja05hbWUgKTtcblxuXHRcdFx0Ly8gT3RoZXJ3aXNlIHJlc3RvcmUgcHJlZXhpc3RpbmcgdmFsdWVcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHdpbmRvd1sgY2FsbGJhY2tOYW1lIF0gPSBvdmVyd3JpdHRlbjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2F2ZSBiYWNrIGFzIGZyZWVcblx0XHRcdGlmICggc1sgY2FsbGJhY2tOYW1lIF0gKSB7XG5cblx0XHRcdFx0Ly8gTWFrZSBzdXJlIHRoYXQgcmUtdXNpbmcgdGhlIG9wdGlvbnMgZG9lc24ndCBzY3JldyB0aGluZ3MgYXJvdW5kXG5cdFx0XHRcdHMuanNvbnBDYWxsYmFjayA9IG9yaWdpbmFsU2V0dGluZ3MuanNvbnBDYWxsYmFjaztcblxuXHRcdFx0XHQvLyBTYXZlIHRoZSBjYWxsYmFjayBuYW1lIGZvciBmdXR1cmUgdXNlXG5cdFx0XHRcdG9sZENhbGxiYWNrcy5wdXNoKCBjYWxsYmFja05hbWUgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2FsbCBpZiBpdCB3YXMgYSBmdW5jdGlvbiBhbmQgd2UgaGF2ZSBhIHJlc3BvbnNlXG5cdFx0XHRpZiAoIHJlc3BvbnNlQ29udGFpbmVyICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCBvdmVyd3JpdHRlbiApICkge1xuXHRcdFx0XHRvdmVyd3JpdHRlbiggcmVzcG9uc2VDb250YWluZXJbIDAgXSApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXNwb25zZUNvbnRhaW5lciA9IG92ZXJ3cml0dGVuID0gdW5kZWZpbmVkO1xuXHRcdH0gKTtcblxuXHRcdC8vIERlbGVnYXRlIHRvIHNjcmlwdFxuXHRcdHJldHVybiBcInNjcmlwdFwiO1xuXHR9XG59ICk7XG5cblxuXG5cbi8vIFN1cHBvcnQ6IFNhZmFyaSA4K1xuLy8gSW4gU2FmYXJpIDggZG9jdW1lbnRzIGNyZWF0ZWQgdmlhIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudFxuLy8gY29sbGFwc2Ugc2libGluZyBmb3JtczogdGhlIHNlY29uZCBvbmUgYmVjb21lcyBhIGNoaWxkIG9mIHRoZSBmaXJzdCBvbmUuXG4vLyBCZWNhdXNlIG9mIHRoYXQsIHRoaXMgc2VjdXJpdHkgbWVhc3VyZSBoYXMgdG8gYmUgZGlzYWJsZWQgaW4gU2FmYXJpIDguXG4vLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTM3MzM3XG5zdXBwb3J0LmNyZWF0ZUhUTUxEb2N1bWVudCA9ICggZnVuY3Rpb24oKSB7XG5cdHZhciBib2R5ID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCBcIlwiICkuYm9keTtcblx0Ym9keS5pbm5lckhUTUwgPSBcIjxmb3JtPjwvZm9ybT48Zm9ybT48L2Zvcm0+XCI7XG5cdHJldHVybiBib2R5LmNoaWxkTm9kZXMubGVuZ3RoID09PSAyO1xufSApKCk7XG5cblxuLy8gQXJndW1lbnQgXCJkYXRhXCIgc2hvdWxkIGJlIHN0cmluZyBvZiBodG1sXG4vLyBjb250ZXh0IChvcHRpb25hbCk6IElmIHNwZWNpZmllZCwgdGhlIGZyYWdtZW50IHdpbGwgYmUgY3JlYXRlZCBpbiB0aGlzIGNvbnRleHQsXG4vLyBkZWZhdWx0cyB0byBkb2N1bWVudFxuLy8ga2VlcFNjcmlwdHMgKG9wdGlvbmFsKTogSWYgdHJ1ZSwgd2lsbCBpbmNsdWRlIHNjcmlwdHMgcGFzc2VkIGluIHRoZSBodG1sIHN0cmluZ1xualF1ZXJ5LnBhcnNlSFRNTCA9IGZ1bmN0aW9uKCBkYXRhLCBjb250ZXh0LCBrZWVwU2NyaXB0cyApIHtcblx0aWYgKCAhZGF0YSB8fCB0eXBlb2YgZGF0YSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRpZiAoIHR5cGVvZiBjb250ZXh0ID09PSBcImJvb2xlYW5cIiApIHtcblx0XHRrZWVwU2NyaXB0cyA9IGNvbnRleHQ7XG5cdFx0Y29udGV4dCA9IGZhbHNlO1xuXHR9XG5cblx0Ly8gU3RvcCBzY3JpcHRzIG9yIGlubGluZSBldmVudCBoYW5kbGVycyBmcm9tIGJlaW5nIGV4ZWN1dGVkIGltbWVkaWF0ZWx5XG5cdC8vIGJ5IHVzaW5nIGRvY3VtZW50LmltcGxlbWVudGF0aW9uXG5cdGNvbnRleHQgPSBjb250ZXh0IHx8ICggc3VwcG9ydC5jcmVhdGVIVE1MRG9jdW1lbnQgP1xuXHRcdGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCggXCJcIiApIDpcblx0XHRkb2N1bWVudCApO1xuXG5cdHZhciBwYXJzZWQgPSByc2luZ2xlVGFnLmV4ZWMoIGRhdGEgKSxcblx0XHRzY3JpcHRzID0gIWtlZXBTY3JpcHRzICYmIFtdO1xuXG5cdC8vIFNpbmdsZSB0YWdcblx0aWYgKCBwYXJzZWQgKSB7XG5cdFx0cmV0dXJuIFsgY29udGV4dC5jcmVhdGVFbGVtZW50KCBwYXJzZWRbIDEgXSApIF07XG5cdH1cblxuXHRwYXJzZWQgPSBidWlsZEZyYWdtZW50KCBbIGRhdGEgXSwgY29udGV4dCwgc2NyaXB0cyApO1xuXG5cdGlmICggc2NyaXB0cyAmJiBzY3JpcHRzLmxlbmd0aCApIHtcblx0XHRqUXVlcnkoIHNjcmlwdHMgKS5yZW1vdmUoKTtcblx0fVxuXG5cdHJldHVybiBqUXVlcnkubWVyZ2UoIFtdLCBwYXJzZWQuY2hpbGROb2RlcyApO1xufTtcblxuXG4vLyBLZWVwIGEgY29weSBvZiB0aGUgb2xkIGxvYWQgbWV0aG9kXG52YXIgX2xvYWQgPSBqUXVlcnkuZm4ubG9hZDtcblxuLyoqXG4gKiBMb2FkIGEgdXJsIGludG8gYSBwYWdlXG4gKi9cbmpRdWVyeS5mbi5sb2FkID0gZnVuY3Rpb24oIHVybCwgcGFyYW1zLCBjYWxsYmFjayApIHtcblx0aWYgKCB0eXBlb2YgdXJsICE9PSBcInN0cmluZ1wiICYmIF9sb2FkICkge1xuXHRcdHJldHVybiBfbG9hZC5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdH1cblxuXHR2YXIgc2VsZWN0b3IsIHR5cGUsIHJlc3BvbnNlLFxuXHRcdHNlbGYgPSB0aGlzLFxuXHRcdG9mZiA9IHVybC5pbmRleE9mKCBcIiBcIiApO1xuXG5cdGlmICggb2ZmID4gLTEgKSB7XG5cdFx0c2VsZWN0b3IgPSBqUXVlcnkudHJpbSggdXJsLnNsaWNlKCBvZmYgKSApO1xuXHRcdHVybCA9IHVybC5zbGljZSggMCwgb2ZmICk7XG5cdH1cblxuXHQvLyBJZiBpdCdzIGEgZnVuY3Rpb25cblx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggcGFyYW1zICkgKSB7XG5cblx0XHQvLyBXZSBhc3N1bWUgdGhhdCBpdCdzIHRoZSBjYWxsYmFja1xuXHRcdGNhbGxiYWNrID0gcGFyYW1zO1xuXHRcdHBhcmFtcyA9IHVuZGVmaW5lZDtcblxuXHQvLyBPdGhlcndpc2UsIGJ1aWxkIGEgcGFyYW0gc3RyaW5nXG5cdH0gZWxzZSBpZiAoIHBhcmFtcyAmJiB0eXBlb2YgcGFyYW1zID09PSBcIm9iamVjdFwiICkge1xuXHRcdHR5cGUgPSBcIlBPU1RcIjtcblx0fVxuXG5cdC8vIElmIHdlIGhhdmUgZWxlbWVudHMgdG8gbW9kaWZ5LCBtYWtlIHRoZSByZXF1ZXN0XG5cdGlmICggc2VsZi5sZW5ndGggPiAwICkge1xuXHRcdGpRdWVyeS5hamF4KCB7XG5cdFx0XHR1cmw6IHVybCxcblxuXHRcdFx0Ly8gSWYgXCJ0eXBlXCIgdmFyaWFibGUgaXMgdW5kZWZpbmVkLCB0aGVuIFwiR0VUXCIgbWV0aG9kIHdpbGwgYmUgdXNlZC5cblx0XHRcdC8vIE1ha2UgdmFsdWUgb2YgdGhpcyBmaWVsZCBleHBsaWNpdCBzaW5jZVxuXHRcdFx0Ly8gdXNlciBjYW4gb3ZlcnJpZGUgaXQgdGhyb3VnaCBhamF4U2V0dXAgbWV0aG9kXG5cdFx0XHR0eXBlOiB0eXBlIHx8IFwiR0VUXCIsXG5cdFx0XHRkYXRhVHlwZTogXCJodG1sXCIsXG5cdFx0XHRkYXRhOiBwYXJhbXNcblx0XHR9ICkuZG9uZSggZnVuY3Rpb24oIHJlc3BvbnNlVGV4dCApIHtcblxuXHRcdFx0Ly8gU2F2ZSByZXNwb25zZSBmb3IgdXNlIGluIGNvbXBsZXRlIGNhbGxiYWNrXG5cdFx0XHRyZXNwb25zZSA9IGFyZ3VtZW50cztcblxuXHRcdFx0c2VsZi5odG1sKCBzZWxlY3RvciA/XG5cblx0XHRcdFx0Ly8gSWYgYSBzZWxlY3RvciB3YXMgc3BlY2lmaWVkLCBsb2NhdGUgdGhlIHJpZ2h0IGVsZW1lbnRzIGluIGEgZHVtbXkgZGl2XG5cdFx0XHRcdC8vIEV4Y2x1ZGUgc2NyaXB0cyB0byBhdm9pZCBJRSAnUGVybWlzc2lvbiBEZW5pZWQnIGVycm9yc1xuXHRcdFx0XHRqUXVlcnkoIFwiPGRpdj5cIiApLmFwcGVuZCggalF1ZXJ5LnBhcnNlSFRNTCggcmVzcG9uc2VUZXh0ICkgKS5maW5kKCBzZWxlY3RvciApIDpcblxuXHRcdFx0XHQvLyBPdGhlcndpc2UgdXNlIHRoZSBmdWxsIHJlc3VsdFxuXHRcdFx0XHRyZXNwb25zZVRleHQgKTtcblxuXHRcdC8vIElmIHRoZSByZXF1ZXN0IHN1Y2NlZWRzLCB0aGlzIGZ1bmN0aW9uIGdldHMgXCJkYXRhXCIsIFwic3RhdHVzXCIsIFwianFYSFJcIlxuXHRcdC8vIGJ1dCB0aGV5IGFyZSBpZ25vcmVkIGJlY2F1c2UgcmVzcG9uc2Ugd2FzIHNldCBhYm92ZS5cblx0XHQvLyBJZiBpdCBmYWlscywgdGhpcyBmdW5jdGlvbiBnZXRzIFwianFYSFJcIiwgXCJzdGF0dXNcIiwgXCJlcnJvclwiXG5cdFx0fSApLmFsd2F5cyggY2FsbGJhY2sgJiYgZnVuY3Rpb24oIGpxWEhSLCBzdGF0dXMgKSB7XG5cdFx0XHRzZWxmLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjYWxsYmFjay5hcHBseSggc2VsZiwgcmVzcG9uc2UgfHwgWyBqcVhIUi5yZXNwb25zZVRleHQsIHN0YXR1cywganFYSFIgXSApO1xuXHRcdFx0fSApO1xuXHRcdH0gKTtcblx0fVxuXG5cdHJldHVybiB0aGlzO1xufTtcblxuXG5cblxuLy8gQXR0YWNoIGEgYnVuY2ggb2YgZnVuY3Rpb25zIGZvciBoYW5kbGluZyBjb21tb24gQUpBWCBldmVudHNcbmpRdWVyeS5lYWNoKCBbXG5cdFwiYWpheFN0YXJ0XCIsXG5cdFwiYWpheFN0b3BcIixcblx0XCJhamF4Q29tcGxldGVcIixcblx0XCJhamF4RXJyb3JcIixcblx0XCJhamF4U3VjY2Vzc1wiLFxuXHRcImFqYXhTZW5kXCJcbl0sIGZ1bmN0aW9uKCBpLCB0eXBlICkge1xuXHRqUXVlcnkuZm5bIHR5cGUgXSA9IGZ1bmN0aW9uKCBmbiApIHtcblx0XHRyZXR1cm4gdGhpcy5vbiggdHlwZSwgZm4gKTtcblx0fTtcbn0gKTtcblxuXG5cblxualF1ZXJ5LmV4cHIuZmlsdGVycy5hbmltYXRlZCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRyZXR1cm4galF1ZXJ5LmdyZXAoIGpRdWVyeS50aW1lcnMsIGZ1bmN0aW9uKCBmbiApIHtcblx0XHRyZXR1cm4gZWxlbSA9PT0gZm4uZWxlbTtcblx0fSApLmxlbmd0aDtcbn07XG5cblxuXG5cbi8qKlxuICogR2V0cyBhIHdpbmRvdyBmcm9tIGFuIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gZ2V0V2luZG93KCBlbGVtICkge1xuXHRyZXR1cm4galF1ZXJ5LmlzV2luZG93KCBlbGVtICkgPyBlbGVtIDogZWxlbS5ub2RlVHlwZSA9PT0gOSAmJiBlbGVtLmRlZmF1bHRWaWV3O1xufVxuXG5qUXVlcnkub2Zmc2V0ID0ge1xuXHRzZXRPZmZzZXQ6IGZ1bmN0aW9uKCBlbGVtLCBvcHRpb25zLCBpICkge1xuXHRcdHZhciBjdXJQb3NpdGlvbiwgY3VyTGVmdCwgY3VyQ1NTVG9wLCBjdXJUb3AsIGN1ck9mZnNldCwgY3VyQ1NTTGVmdCwgY2FsY3VsYXRlUG9zaXRpb24sXG5cdFx0XHRwb3NpdGlvbiA9IGpRdWVyeS5jc3MoIGVsZW0sIFwicG9zaXRpb25cIiApLFxuXHRcdFx0Y3VyRWxlbSA9IGpRdWVyeSggZWxlbSApLFxuXHRcdFx0cHJvcHMgPSB7fTtcblxuXHRcdC8vIFNldCBwb3NpdGlvbiBmaXJzdCwgaW4tY2FzZSB0b3AvbGVmdCBhcmUgc2V0IGV2ZW4gb24gc3RhdGljIGVsZW1cblx0XHRpZiAoIHBvc2l0aW9uID09PSBcInN0YXRpY1wiICkge1xuXHRcdFx0ZWxlbS5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcblx0XHR9XG5cblx0XHRjdXJPZmZzZXQgPSBjdXJFbGVtLm9mZnNldCgpO1xuXHRcdGN1ckNTU1RvcCA9IGpRdWVyeS5jc3MoIGVsZW0sIFwidG9wXCIgKTtcblx0XHRjdXJDU1NMZWZ0ID0galF1ZXJ5LmNzcyggZWxlbSwgXCJsZWZ0XCIgKTtcblx0XHRjYWxjdWxhdGVQb3NpdGlvbiA9ICggcG9zaXRpb24gPT09IFwiYWJzb2x1dGVcIiB8fCBwb3NpdGlvbiA9PT0gXCJmaXhlZFwiICkgJiZcblx0XHRcdCggY3VyQ1NTVG9wICsgY3VyQ1NTTGVmdCApLmluZGV4T2YoIFwiYXV0b1wiICkgPiAtMTtcblxuXHRcdC8vIE5lZWQgdG8gYmUgYWJsZSB0byBjYWxjdWxhdGUgcG9zaXRpb24gaWYgZWl0aGVyXG5cdFx0Ly8gdG9wIG9yIGxlZnQgaXMgYXV0byBhbmQgcG9zaXRpb24gaXMgZWl0aGVyIGFic29sdXRlIG9yIGZpeGVkXG5cdFx0aWYgKCBjYWxjdWxhdGVQb3NpdGlvbiApIHtcblx0XHRcdGN1clBvc2l0aW9uID0gY3VyRWxlbS5wb3NpdGlvbigpO1xuXHRcdFx0Y3VyVG9wID0gY3VyUG9zaXRpb24udG9wO1xuXHRcdFx0Y3VyTGVmdCA9IGN1clBvc2l0aW9uLmxlZnQ7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y3VyVG9wID0gcGFyc2VGbG9hdCggY3VyQ1NTVG9wICkgfHwgMDtcblx0XHRcdGN1ckxlZnQgPSBwYXJzZUZsb2F0KCBjdXJDU1NMZWZ0ICkgfHwgMDtcblx0XHR9XG5cblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBvcHRpb25zICkgKSB7XG5cblx0XHRcdC8vIFVzZSBqUXVlcnkuZXh0ZW5kIGhlcmUgdG8gYWxsb3cgbW9kaWZpY2F0aW9uIG9mIGNvb3JkaW5hdGVzIGFyZ3VtZW50IChnaC0xODQ4KVxuXHRcdFx0b3B0aW9ucyA9IG9wdGlvbnMuY2FsbCggZWxlbSwgaSwgalF1ZXJ5LmV4dGVuZCgge30sIGN1ck9mZnNldCApICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBvcHRpb25zLnRvcCAhPSBudWxsICkge1xuXHRcdFx0cHJvcHMudG9wID0gKCBvcHRpb25zLnRvcCAtIGN1ck9mZnNldC50b3AgKSArIGN1clRvcDtcblx0XHR9XG5cdFx0aWYgKCBvcHRpb25zLmxlZnQgIT0gbnVsbCApIHtcblx0XHRcdHByb3BzLmxlZnQgPSAoIG9wdGlvbnMubGVmdCAtIGN1ck9mZnNldC5sZWZ0ICkgKyBjdXJMZWZ0O1xuXHRcdH1cblxuXHRcdGlmICggXCJ1c2luZ1wiIGluIG9wdGlvbnMgKSB7XG5cdFx0XHRvcHRpb25zLnVzaW5nLmNhbGwoIGVsZW0sIHByb3BzICk7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y3VyRWxlbS5jc3MoIHByb3BzICk7XG5cdFx0fVxuXHR9XG59O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdG9mZnNldDogZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cdFx0aWYgKCBhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdFx0cmV0dXJuIG9wdGlvbnMgPT09IHVuZGVmaW5lZCA/XG5cdFx0XHRcdHRoaXMgOlxuXHRcdFx0XHR0aGlzLmVhY2goIGZ1bmN0aW9uKCBpICkge1xuXHRcdFx0XHRcdGpRdWVyeS5vZmZzZXQuc2V0T2Zmc2V0KCB0aGlzLCBvcHRpb25zLCBpICk7XG5cdFx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHR2YXIgZG9jRWxlbSwgd2luLFxuXHRcdFx0ZWxlbSA9IHRoaXNbIDAgXSxcblx0XHRcdGJveCA9IHsgdG9wOiAwLCBsZWZ0OiAwIH0sXG5cdFx0XHRkb2MgPSBlbGVtICYmIGVsZW0ub3duZXJEb2N1bWVudDtcblxuXHRcdGlmICggIWRvYyApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRkb2NFbGVtID0gZG9jLmRvY3VtZW50RWxlbWVudDtcblxuXHRcdC8vIE1ha2Ugc3VyZSBpdCdzIG5vdCBhIGRpc2Nvbm5lY3RlZCBET00gbm9kZVxuXHRcdGlmICggIWpRdWVyeS5jb250YWlucyggZG9jRWxlbSwgZWxlbSApICkge1xuXHRcdFx0cmV0dXJuIGJveDtcblx0XHR9XG5cblx0XHRib3ggPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdHdpbiA9IGdldFdpbmRvdyggZG9jICk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRvcDogYm94LnRvcCArIHdpbi5wYWdlWU9mZnNldCAtIGRvY0VsZW0uY2xpZW50VG9wLFxuXHRcdFx0bGVmdDogYm94LmxlZnQgKyB3aW4ucGFnZVhPZmZzZXQgLSBkb2NFbGVtLmNsaWVudExlZnRcblx0XHR9O1xuXHR9LFxuXG5cdHBvc2l0aW9uOiBmdW5jdGlvbigpIHtcblx0XHRpZiAoICF0aGlzWyAwIF0gKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dmFyIG9mZnNldFBhcmVudCwgb2Zmc2V0LFxuXHRcdFx0ZWxlbSA9IHRoaXNbIDAgXSxcblx0XHRcdHBhcmVudE9mZnNldCA9IHsgdG9wOiAwLCBsZWZ0OiAwIH07XG5cblx0XHQvLyBGaXhlZCBlbGVtZW50cyBhcmUgb2Zmc2V0IGZyb20gd2luZG93IChwYXJlbnRPZmZzZXQgPSB7dG9wOjAsIGxlZnQ6IDB9LFxuXHRcdC8vIGJlY2F1c2UgaXQgaXMgaXRzIG9ubHkgb2Zmc2V0IHBhcmVudFxuXHRcdGlmICggalF1ZXJ5LmNzcyggZWxlbSwgXCJwb3NpdGlvblwiICkgPT09IFwiZml4ZWRcIiApIHtcblxuXHRcdFx0Ly8gQXNzdW1lIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBpcyB0aGVyZSB3aGVuIGNvbXB1dGVkIHBvc2l0aW9uIGlzIGZpeGVkXG5cdFx0XHRvZmZzZXQgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gR2V0ICpyZWFsKiBvZmZzZXRQYXJlbnRcblx0XHRcdG9mZnNldFBhcmVudCA9IHRoaXMub2Zmc2V0UGFyZW50KCk7XG5cblx0XHRcdC8vIEdldCBjb3JyZWN0IG9mZnNldHNcblx0XHRcdG9mZnNldCA9IHRoaXMub2Zmc2V0KCk7XG5cdFx0XHRpZiAoICFqUXVlcnkubm9kZU5hbWUoIG9mZnNldFBhcmVudFsgMCBdLCBcImh0bWxcIiApICkge1xuXHRcdFx0XHRwYXJlbnRPZmZzZXQgPSBvZmZzZXRQYXJlbnQub2Zmc2V0KCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCBvZmZzZXRQYXJlbnQgYm9yZGVyc1xuXHRcdFx0cGFyZW50T2Zmc2V0LnRvcCArPSBqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnRbIDAgXSwgXCJib3JkZXJUb3BXaWR0aFwiLCB0cnVlICk7XG5cdFx0XHRwYXJlbnRPZmZzZXQubGVmdCArPSBqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnRbIDAgXSwgXCJib3JkZXJMZWZ0V2lkdGhcIiwgdHJ1ZSApO1xuXHRcdH1cblxuXHRcdC8vIFN1YnRyYWN0IHBhcmVudCBvZmZzZXRzIGFuZCBlbGVtZW50IG1hcmdpbnNcblx0XHRyZXR1cm4ge1xuXHRcdFx0dG9wOiBvZmZzZXQudG9wIC0gcGFyZW50T2Zmc2V0LnRvcCAtIGpRdWVyeS5jc3MoIGVsZW0sIFwibWFyZ2luVG9wXCIsIHRydWUgKSxcblx0XHRcdGxlZnQ6IG9mZnNldC5sZWZ0IC0gcGFyZW50T2Zmc2V0LmxlZnQgLSBqUXVlcnkuY3NzKCBlbGVtLCBcIm1hcmdpbkxlZnRcIiwgdHJ1ZSApXG5cdFx0fTtcblx0fSxcblxuXHQvLyBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiBkb2N1bWVudEVsZW1lbnQgaW4gdGhlIGZvbGxvd2luZyBjYXNlczpcblx0Ly8gMSkgRm9yIHRoZSBlbGVtZW50IGluc2lkZSB0aGUgaWZyYW1lIHdpdGhvdXQgb2Zmc2V0UGFyZW50LCB0aGlzIG1ldGhvZCB3aWxsIHJldHVyblxuXHQvLyAgICBkb2N1bWVudEVsZW1lbnQgb2YgdGhlIHBhcmVudCB3aW5kb3dcblx0Ly8gMikgRm9yIHRoZSBoaWRkZW4gb3IgZGV0YWNoZWQgZWxlbWVudFxuXHQvLyAzKSBGb3IgYm9keSBvciBodG1sIGVsZW1lbnQsIGkuZS4gaW4gY2FzZSBvZiB0aGUgaHRtbCBub2RlIC0gaXQgd2lsbCByZXR1cm4gaXRzZWxmXG5cdC8vXG5cdC8vIGJ1dCB0aG9zZSBleGNlcHRpb25zIHdlcmUgbmV2ZXIgcHJlc2VudGVkIGFzIGEgcmVhbCBsaWZlIHVzZS1jYXNlc1xuXHQvLyBhbmQgbWlnaHQgYmUgY29uc2lkZXJlZCBhcyBtb3JlIHByZWZlcmFibGUgcmVzdWx0cy5cblx0Ly9cblx0Ly8gVGhpcyBsb2dpYywgaG93ZXZlciwgaXMgbm90IGd1YXJhbnRlZWQgYW5kIGNhbiBjaGFuZ2UgYXQgYW55IHBvaW50IGluIHRoZSBmdXR1cmVcblx0b2Zmc2V0UGFyZW50OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG9mZnNldFBhcmVudCA9IHRoaXMub2Zmc2V0UGFyZW50O1xuXG5cdFx0XHR3aGlsZSAoIG9mZnNldFBhcmVudCAmJiBqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnQsIFwicG9zaXRpb25cIiApID09PSBcInN0YXRpY1wiICkge1xuXHRcdFx0XHRvZmZzZXRQYXJlbnQgPSBvZmZzZXRQYXJlbnQub2Zmc2V0UGFyZW50O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gb2Zmc2V0UGFyZW50IHx8IGRvY3VtZW50RWxlbWVudDtcblx0XHR9ICk7XG5cdH1cbn0gKTtcblxuLy8gQ3JlYXRlIHNjcm9sbExlZnQgYW5kIHNjcm9sbFRvcCBtZXRob2RzXG5qUXVlcnkuZWFjaCggeyBzY3JvbGxMZWZ0OiBcInBhZ2VYT2Zmc2V0XCIsIHNjcm9sbFRvcDogXCJwYWdlWU9mZnNldFwiIH0sIGZ1bmN0aW9uKCBtZXRob2QsIHByb3AgKSB7XG5cdHZhciB0b3AgPSBcInBhZ2VZT2Zmc2V0XCIgPT09IHByb3A7XG5cblx0alF1ZXJ5LmZuWyBtZXRob2QgXSA9IGZ1bmN0aW9uKCB2YWwgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIGVsZW0sIG1ldGhvZCwgdmFsICkge1xuXHRcdFx0dmFyIHdpbiA9IGdldFdpbmRvdyggZWxlbSApO1xuXG5cdFx0XHRpZiAoIHZhbCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRyZXR1cm4gd2luID8gd2luWyBwcm9wIF0gOiBlbGVtWyBtZXRob2QgXTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCB3aW4gKSB7XG5cdFx0XHRcdHdpbi5zY3JvbGxUbyhcblx0XHRcdFx0XHQhdG9wID8gdmFsIDogd2luLnBhZ2VYT2Zmc2V0LFxuXHRcdFx0XHRcdHRvcCA/IHZhbCA6IHdpbi5wYWdlWU9mZnNldFxuXHRcdFx0XHQpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbGVtWyBtZXRob2QgXSA9IHZhbDtcblx0XHRcdH1cblx0XHR9LCBtZXRob2QsIHZhbCwgYXJndW1lbnRzLmxlbmd0aCApO1xuXHR9O1xufSApO1xuXG4vLyBTdXBwb3J0OiBTYWZhcmk8Ny04KywgQ2hyb21lPDM3LTQ0K1xuLy8gQWRkIHRoZSB0b3AvbGVmdCBjc3NIb29rcyB1c2luZyBqUXVlcnkuZm4ucG9zaXRpb25cbi8vIFdlYmtpdCBidWc6IGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0yOTA4NFxuLy8gQmxpbmsgYnVnOiBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MjgwXG4vLyBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgcGVyY2VudCB3aGVuIHNwZWNpZmllZCBmb3IgdG9wL2xlZnQvYm90dG9tL3JpZ2h0O1xuLy8gcmF0aGVyIHRoYW4gbWFrZSB0aGUgY3NzIG1vZHVsZSBkZXBlbmQgb24gdGhlIG9mZnNldCBtb2R1bGUsIGp1c3QgY2hlY2sgZm9yIGl0IGhlcmVcbmpRdWVyeS5lYWNoKCBbIFwidG9wXCIsIFwibGVmdFwiIF0sIGZ1bmN0aW9uKCBpLCBwcm9wICkge1xuXHRqUXVlcnkuY3NzSG9va3NbIHByb3AgXSA9IGFkZEdldEhvb2tJZiggc3VwcG9ydC5waXhlbFBvc2l0aW9uLFxuXHRcdGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCApIHtcblx0XHRcdGlmICggY29tcHV0ZWQgKSB7XG5cdFx0XHRcdGNvbXB1dGVkID0gY3VyQ1NTKCBlbGVtLCBwcm9wICk7XG5cblx0XHRcdFx0Ly8gSWYgY3VyQ1NTIHJldHVybnMgcGVyY2VudGFnZSwgZmFsbGJhY2sgdG8gb2Zmc2V0XG5cdFx0XHRcdHJldHVybiBybnVtbm9ucHgudGVzdCggY29tcHV0ZWQgKSA/XG5cdFx0XHRcdFx0alF1ZXJ5KCBlbGVtICkucG9zaXRpb24oKVsgcHJvcCBdICsgXCJweFwiIDpcblx0XHRcdFx0XHRjb21wdXRlZDtcblx0XHRcdH1cblx0XHR9XG5cdCk7XG59ICk7XG5cblxuLy8gQ3JlYXRlIGlubmVySGVpZ2h0LCBpbm5lcldpZHRoLCBoZWlnaHQsIHdpZHRoLCBvdXRlckhlaWdodCBhbmQgb3V0ZXJXaWR0aCBtZXRob2RzXG5qUXVlcnkuZWFjaCggeyBIZWlnaHQ6IFwiaGVpZ2h0XCIsIFdpZHRoOiBcIndpZHRoXCIgfSwgZnVuY3Rpb24oIG5hbWUsIHR5cGUgKSB7XG5cdGpRdWVyeS5lYWNoKCB7IHBhZGRpbmc6IFwiaW5uZXJcIiArIG5hbWUsIGNvbnRlbnQ6IHR5cGUsIFwiXCI6IFwib3V0ZXJcIiArIG5hbWUgfSxcblx0XHRmdW5jdGlvbiggZGVmYXVsdEV4dHJhLCBmdW5jTmFtZSApIHtcblxuXHRcdC8vIE1hcmdpbiBpcyBvbmx5IGZvciBvdXRlckhlaWdodCwgb3V0ZXJXaWR0aFxuXHRcdGpRdWVyeS5mblsgZnVuY05hbWUgXSA9IGZ1bmN0aW9uKCBtYXJnaW4sIHZhbHVlICkge1xuXHRcdFx0dmFyIGNoYWluYWJsZSA9IGFyZ3VtZW50cy5sZW5ndGggJiYgKCBkZWZhdWx0RXh0cmEgfHwgdHlwZW9mIG1hcmdpbiAhPT0gXCJib29sZWFuXCIgKSxcblx0XHRcdFx0ZXh0cmEgPSBkZWZhdWx0RXh0cmEgfHwgKCBtYXJnaW4gPT09IHRydWUgfHwgdmFsdWUgPT09IHRydWUgPyBcIm1hcmdpblwiIDogXCJib3JkZXJcIiApO1xuXG5cdFx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgdHlwZSwgdmFsdWUgKSB7XG5cdFx0XHRcdHZhciBkb2M7XG5cblx0XHRcdFx0aWYgKCBqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSApIHtcblxuXHRcdFx0XHRcdC8vIEFzIG9mIDUvOC8yMDEyIHRoaXMgd2lsbCB5aWVsZCBpbmNvcnJlY3QgcmVzdWx0cyBmb3IgTW9iaWxlIFNhZmFyaSwgYnV0IHRoZXJlXG5cdFx0XHRcdFx0Ly8gaXNuJ3QgYSB3aG9sZSBsb3Qgd2UgY2FuIGRvLiBTZWUgcHVsbCByZXF1ZXN0IGF0IHRoaXMgVVJMIGZvciBkaXNjdXNzaW9uOlxuXHRcdFx0XHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L3B1bGwvNzY0XG5cdFx0XHRcdFx0cmV0dXJuIGVsZW0uZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50WyBcImNsaWVudFwiICsgbmFtZSBdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gR2V0IGRvY3VtZW50IHdpZHRoIG9yIGhlaWdodFxuXHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdFx0ZG9jID0gZWxlbS5kb2N1bWVudEVsZW1lbnQ7XG5cblx0XHRcdFx0XHQvLyBFaXRoZXIgc2Nyb2xsW1dpZHRoL0hlaWdodF0gb3Igb2Zmc2V0W1dpZHRoL0hlaWdodF0gb3IgY2xpZW50W1dpZHRoL0hlaWdodF0sXG5cdFx0XHRcdFx0Ly8gd2hpY2hldmVyIGlzIGdyZWF0ZXN0XG5cdFx0XHRcdFx0cmV0dXJuIE1hdGgubWF4KFxuXHRcdFx0XHRcdFx0ZWxlbS5ib2R5WyBcInNjcm9sbFwiICsgbmFtZSBdLCBkb2NbIFwic2Nyb2xsXCIgKyBuYW1lIF0sXG5cdFx0XHRcdFx0XHRlbGVtLmJvZHlbIFwib2Zmc2V0XCIgKyBuYW1lIF0sIGRvY1sgXCJvZmZzZXRcIiArIG5hbWUgXSxcblx0XHRcdFx0XHRcdGRvY1sgXCJjbGllbnRcIiArIG5hbWUgXVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/XG5cblx0XHRcdFx0XHQvLyBHZXQgd2lkdGggb3IgaGVpZ2h0IG9uIHRoZSBlbGVtZW50LCByZXF1ZXN0aW5nIGJ1dCBub3QgZm9yY2luZyBwYXJzZUZsb2F0XG5cdFx0XHRcdFx0alF1ZXJ5LmNzcyggZWxlbSwgdHlwZSwgZXh0cmEgKSA6XG5cblx0XHRcdFx0XHQvLyBTZXQgd2lkdGggb3IgaGVpZ2h0IG9uIHRoZSBlbGVtZW50XG5cdFx0XHRcdFx0alF1ZXJ5LnN0eWxlKCBlbGVtLCB0eXBlLCB2YWx1ZSwgZXh0cmEgKTtcblx0XHRcdH0sIHR5cGUsIGNoYWluYWJsZSA/IG1hcmdpbiA6IHVuZGVmaW5lZCwgY2hhaW5hYmxlLCBudWxsICk7XG5cdFx0fTtcblx0fSApO1xufSApO1xuXG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblxuXHRiaW5kOiBmdW5jdGlvbiggdHlwZXMsIGRhdGEsIGZuICkge1xuXHRcdHJldHVybiB0aGlzLm9uKCB0eXBlcywgbnVsbCwgZGF0YSwgZm4gKTtcblx0fSxcblx0dW5iaW5kOiBmdW5jdGlvbiggdHlwZXMsIGZuICkge1xuXHRcdHJldHVybiB0aGlzLm9mZiggdHlwZXMsIG51bGwsIGZuICk7XG5cdH0sXG5cblx0ZGVsZWdhdGU6IGZ1bmN0aW9uKCBzZWxlY3RvciwgdHlwZXMsIGRhdGEsIGZuICkge1xuXHRcdHJldHVybiB0aGlzLm9uKCB0eXBlcywgc2VsZWN0b3IsIGRhdGEsIGZuICk7XG5cdH0sXG5cdHVuZGVsZWdhdGU6IGZ1bmN0aW9uKCBzZWxlY3RvciwgdHlwZXMsIGZuICkge1xuXG5cdFx0Ly8gKCBuYW1lc3BhY2UgKSBvciAoIHNlbGVjdG9yLCB0eXBlcyBbLCBmbl0gKVxuXHRcdHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAxID9cblx0XHRcdHRoaXMub2ZmKCBzZWxlY3RvciwgXCIqKlwiICkgOlxuXHRcdFx0dGhpcy5vZmYoIHR5cGVzLCBzZWxlY3RvciB8fCBcIioqXCIsIGZuICk7XG5cdH0sXG5cdHNpemU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmxlbmd0aDtcblx0fVxufSApO1xuXG5qUXVlcnkuZm4uYW5kU2VsZiA9IGpRdWVyeS5mbi5hZGRCYWNrO1xuXG5cblxuXG4vLyBSZWdpc3RlciBhcyBhIG5hbWVkIEFNRCBtb2R1bGUsIHNpbmNlIGpRdWVyeSBjYW4gYmUgY29uY2F0ZW5hdGVkIHdpdGggb3RoZXJcbi8vIGZpbGVzIHRoYXQgbWF5IHVzZSBkZWZpbmUsIGJ1dCBub3QgdmlhIGEgcHJvcGVyIGNvbmNhdGVuYXRpb24gc2NyaXB0IHRoYXRcbi8vIHVuZGVyc3RhbmRzIGFub255bW91cyBBTUQgbW9kdWxlcy4gQSBuYW1lZCBBTUQgaXMgc2FmZXN0IGFuZCBtb3N0IHJvYnVzdFxuLy8gd2F5IHRvIHJlZ2lzdGVyLiBMb3dlcmNhc2UganF1ZXJ5IGlzIHVzZWQgYmVjYXVzZSBBTUQgbW9kdWxlIG5hbWVzIGFyZVxuLy8gZGVyaXZlZCBmcm9tIGZpbGUgbmFtZXMsIGFuZCBqUXVlcnkgaXMgbm9ybWFsbHkgZGVsaXZlcmVkIGluIGEgbG93ZXJjYXNlXG4vLyBmaWxlIG5hbWUuIERvIHRoaXMgYWZ0ZXIgY3JlYXRpbmcgdGhlIGdsb2JhbCBzbyB0aGF0IGlmIGFuIEFNRCBtb2R1bGUgd2FudHNcbi8vIHRvIGNhbGwgbm9Db25mbGljdCB0byBoaWRlIHRoaXMgdmVyc2lvbiBvZiBqUXVlcnksIGl0IHdpbGwgd29yay5cblxuLy8gTm90ZSB0aGF0IGZvciBtYXhpbXVtIHBvcnRhYmlsaXR5LCBsaWJyYXJpZXMgdGhhdCBhcmUgbm90IGpRdWVyeSBzaG91bGRcbi8vIGRlY2xhcmUgdGhlbXNlbHZlcyBhcyBhbm9ueW1vdXMgbW9kdWxlcywgYW5kIGF2b2lkIHNldHRpbmcgYSBnbG9iYWwgaWYgYW5cbi8vIEFNRCBsb2FkZXIgaXMgcHJlc2VudC4galF1ZXJ5IGlzIGEgc3BlY2lhbCBjYXNlLiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlXG4vLyBodHRwczovL2dpdGh1Yi5jb20vanJidXJrZS9yZXF1aXJlanMvd2lraS9VcGRhdGluZy1leGlzdGluZy1saWJyYXJpZXMjd2lraS1hbm9uXG5cbmlmICggdHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQgKSB7XG5cdGRlZmluZSggXCJqcXVlcnlcIiwgW10sIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBqUXVlcnk7XG5cdH0gKTtcbn1cblxuXG5cbnZhclxuXG5cdC8vIE1hcCBvdmVyIGpRdWVyeSBpbiBjYXNlIG9mIG92ZXJ3cml0ZVxuXHRfalF1ZXJ5ID0gd2luZG93LmpRdWVyeSxcblxuXHQvLyBNYXAgb3ZlciB0aGUgJCBpbiBjYXNlIG9mIG92ZXJ3cml0ZVxuXHRfJCA9IHdpbmRvdy4kO1xuXG5qUXVlcnkubm9Db25mbGljdCA9IGZ1bmN0aW9uKCBkZWVwICkge1xuXHRpZiAoIHdpbmRvdy4kID09PSBqUXVlcnkgKSB7XG5cdFx0d2luZG93LiQgPSBfJDtcblx0fVxuXG5cdGlmICggZGVlcCAmJiB3aW5kb3cualF1ZXJ5ID09PSBqUXVlcnkgKSB7XG5cdFx0d2luZG93LmpRdWVyeSA9IF9qUXVlcnk7XG5cdH1cblxuXHRyZXR1cm4galF1ZXJ5O1xufTtcblxuLy8gRXhwb3NlIGpRdWVyeSBhbmQgJCBpZGVudGlmaWVycywgZXZlbiBpbiBBTURcbi8vICgjNzEwMiNjb21tZW50OjEwLCBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9wdWxsLzU1Nylcbi8vIGFuZCBDb21tb25KUyBmb3IgYnJvd3NlciBlbXVsYXRvcnMgKCMxMzU2NilcbmlmICggIW5vR2xvYmFsICkge1xuXHR3aW5kb3cualF1ZXJ5ID0gd2luZG93LiQgPSBqUXVlcnk7XG59XG5cbnJldHVybiBqUXVlcnk7XG59KSk7XG4iXSwic291cmNlUm9vdCI6Ii4ifQ==
