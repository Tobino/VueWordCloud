(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('babel-runtime/core-js/object/entries'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/regenerator'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/helpers/slicedToArray'), require('babel-runtime/core-js/get-iterator'), require('babel-runtime/core-js/set'), require('babel-runtime/core-js/promise'), require('babel-runtime/helpers/typeof'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('babel-runtime/helpers/createClass'), require('vue')) :
	typeof define === 'function' && define.amd ? define(['babel-runtime/core-js/object/entries', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/helpers/slicedToArray', 'babel-runtime/core-js/get-iterator', 'babel-runtime/core-js/set', 'babel-runtime/core-js/promise', 'babel-runtime/helpers/typeof', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', 'babel-runtime/helpers/createClass', 'vue'], factory) :
	(global.vueWordCloud = factory(global._Object$entries,global._toConsumableArray,global._regeneratorRuntime,global._asyncToGenerator,global._slicedToArray,global._getIterator,global._Set,global._Promise,global._typeof,global._Object$getPrototypeOf,global._classCallCheck,global._possibleConstructorReturn,global._inherits,global._createClass,global.Vue));
}(this, (function (_Object$entries,_toConsumableArray,_regeneratorRuntime,_asyncToGenerator,_slicedToArray,_getIterator,_Set,_Promise,_typeof,_Object$getPrototypeOf,_classCallCheck,_possibleConstructorReturn,_inherits,_createClass,Vue) { 'use strict';

_Object$entries = _Object$entries && _Object$entries.hasOwnProperty('default') ? _Object$entries['default'] : _Object$entries;
_toConsumableArray = _toConsumableArray && _toConsumableArray.hasOwnProperty('default') ? _toConsumableArray['default'] : _toConsumableArray;
_regeneratorRuntime = _regeneratorRuntime && _regeneratorRuntime.hasOwnProperty('default') ? _regeneratorRuntime['default'] : _regeneratorRuntime;
_asyncToGenerator = _asyncToGenerator && _asyncToGenerator.hasOwnProperty('default') ? _asyncToGenerator['default'] : _asyncToGenerator;
_slicedToArray = _slicedToArray && _slicedToArray.hasOwnProperty('default') ? _slicedToArray['default'] : _slicedToArray;
_getIterator = _getIterator && _getIterator.hasOwnProperty('default') ? _getIterator['default'] : _getIterator;
_Set = _Set && _Set.hasOwnProperty('default') ? _Set['default'] : _Set;
_Promise = _Promise && _Promise.hasOwnProperty('default') ? _Promise['default'] : _Promise;
_typeof = _typeof && _typeof.hasOwnProperty('default') ? _typeof['default'] : _typeof;
_Object$getPrototypeOf = _Object$getPrototypeOf && _Object$getPrototypeOf.hasOwnProperty('default') ? _Object$getPrototypeOf['default'] : _Object$getPrototypeOf;
_classCallCheck = _classCallCheck && _classCallCheck.hasOwnProperty('default') ? _classCallCheck['default'] : _classCallCheck;
_possibleConstructorReturn = _possibleConstructorReturn && _possibleConstructorReturn.hasOwnProperty('default') ? _possibleConstructorReturn['default'] : _possibleConstructorReturn;
_inherits = _inherits && _inherits.hasOwnProperty('default') ? _inherits['default'] : _inherits;
_createClass = _createClass && _createClass.hasOwnProperty('default') ? _createClass['default'] : _createClass;
Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

var TARGET = typeof Symbol === 'undefined' ? '__target' : Symbol();
var SCRIPT_TYPE = 'application/javascript';
var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
var URL = window.URL || window.webkitURL;
var Worker = window.Worker;

/**
 * Returns a wrapper around Web Worker code that is constructible.
 *
 * @function shimWorker
 *
 * @param { String }    filename    The name of the file
 * @param { Function }  fn          Function wrapping the code of the worker
 */
function shimWorker (filename, fn) {
    return function ShimWorker (forceFallback) {
        var o = this;

        if (!fn) {
            return new Worker(filename);
        }
        else if (Worker && !forceFallback) {
            // Convert the function's inner code to a string to construct the worker
            var source = fn.toString().replace(/^function.+?{/, '').slice(0, -1),
                objURL = createSourceObject(source);

            this[TARGET] = new Worker(objURL);
            URL.revokeObjectURL(objURL);
            return this[TARGET];
        }
        else {
            var selfShim = {
                    postMessage: function(m) {
                        if (o.onmessage) {
                            setTimeout(function(){ o.onmessage({ data: m, target: selfShim }); });
                        }
                    }
                };

            fn.call(selfShim);
            this.postMessage = function(m) {
                setTimeout(function(){ selfShim.onmessage({ data: m, target: o }); });
            };
            this.isThisThread = true;
        }
    };
}

// Test Worker capabilities
if (Worker) {
    var testWorker,
        objURL = createSourceObject('self.onmessage = function () {}'),
        testArray = new Uint8Array(1);

    try {
        // No workers via blobs in Edge 12 and IE 11 and lower :(
        if (/(?:Trident|Edge)\/(?:[567]|12)/i.test(navigator.userAgent)) {
            throw new Error('Not available');
        }
        testWorker = new Worker(objURL);

        // Native browser on some Samsung devices throws for transferables, let's detect it
        testWorker.postMessage(testArray, [testArray.buffer]);
    }
    catch (e) {
        Worker = null;
    }
    finally {
        URL.revokeObjectURL(objURL);
        if (testWorker) {
            testWorker.terminate();
        }
    }
}

function createSourceObject(str) {
    try {
        return URL.createObjectURL(new Blob([str], { type: SCRIPT_TYPE }));
    }
    catch (e) {
        var blob = new BlobBuilder();
        blob.append(str);
        return URL.createObjectURL(blob.getBlob(type));
    }
}

var BoundWordWorker = new shimWorker("./workers/boundWord.js", function (window, document) {
	var self = this;
	var RectCenterOutIterator = /*#__PURE__*/_regeneratorRuntime.mark(function RectCenterOutIterator(rectWidth, rectHeight) {
		var stepLeft, stepTop, startLeft, startTop, endLeft, endTop, left, top, previousStartLeft, previousStartTop, previousEndLeft, previousEndTop, currentStartLeft, currentStartTop, currentEndLeft, currentEndTop, _top, _left, _top2, _left2;

		return _regeneratorRuntime.wrap(function RectCenterOutIterator$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (!(rectWidth > 0 && rectHeight > 0)) {
							_context.next = 76;
							break;
						}

						stepLeft = void 0, stepTop = void 0;

						if (rectWidth > rectHeight) {
							stepLeft = 1;
							stepTop = rectHeight / rectWidth;
						} else if (rectHeight > rectWidth) {
							stepTop = 1;
							stepLeft = rectWidth / rectHeight;
						} else {
							stepLeft = stepTop = 1;
						}

						startLeft = Math.floor(rectWidth / 2);
						startTop = Math.floor(rectHeight / 2);
						endLeft = rectWidth - startLeft;
						endTop = rectHeight - startTop;

						if (!(startLeft < endLeft)) {
							_context.next = 17;
							break;
						}

						left = startLeft;

					case 9:
						if (!(left <= endLeft)) {
							_context.next = 15;
							break;
						}

						_context.next = 12;
						return [left, startTop];

					case 12:
						++left;
						_context.next = 9;
						break;

					case 15:
						_context.next = 25;
						break;

					case 17:
						if (!(startTop < endTop)) {
							_context.next = 25;
							break;
						}

						top = startTop;

					case 19:
						if (!(top <= endTop)) {
							_context.next = 25;
							break;
						}

						_context.next = 22;
						return [startLeft, top];

					case 22:
						++top;
						_context.next = 19;
						break;

					case 25:
						previousStartLeft = startLeft;
						previousStartTop = startTop;
						previousEndLeft = endLeft;
						previousEndTop = endTop;

					case 29:
						if (!(endLeft < rectWidth || endTop < rectHeight)) {
							_context.next = 76;
							break;
						}

						startLeft -= stepLeft;
						startTop -= stepTop;
						endLeft += stepLeft;
						endTop += stepTop;

						currentStartLeft = Math.floor(startLeft);
						currentStartTop = Math.floor(startTop);
						currentEndLeft = Math.ceil(endLeft);
						currentEndTop = Math.ceil(endTop);

						if (!(currentEndLeft > previousEndLeft)) {
							_context.next = 46;
							break;
						}

						_top = currentStartTop;

					case 40:
						if (!(_top < currentEndTop)) {
							_context.next = 46;
							break;
						}

						_context.next = 43;
						return [currentEndLeft, _top];

					case 43:
						++_top;
						_context.next = 40;
						break;

					case 46:
						if (!(currentEndTop > previousEndTop)) {
							_context.next = 54;
							break;
						}

						_left = currentEndLeft;

					case 48:
						if (!(_left > currentStartLeft)) {
							_context.next = 54;
							break;
						}

						_context.next = 51;
						return [_left, currentEndTop];

					case 51:
						--_left;
						_context.next = 48;
						break;

					case 54:
						if (!(currentStartLeft < previousStartLeft)) {
							_context.next = 62;
							break;
						}

						_top2 = currentEndTop;

					case 56:
						if (!(_top2 > currentStartTop)) {
							_context.next = 62;
							break;
						}

						_context.next = 59;
						return [currentStartLeft, _top2];

					case 59:
						--_top2;
						_context.next = 56;
						break;

					case 62:
						if (!(currentStartTop < previousStartTop)) {
							_context.next = 70;
							break;
						}

						_left2 = currentStartLeft;

					case 64:
						if (!(_left2 < currentEndLeft)) {
							_context.next = 70;
							break;
						}

						_context.next = 67;
						return [_left2, currentStartTop];

					case 67:
						++_left2;
						_context.next = 64;
						break;

					case 70:

						previousStartLeft = currentStartLeft;
						previousStartTop = currentStartTop;
						previousEndLeft = currentEndLeft;
						previousEndTop = currentEndTop;
						_context.next = 29;
						break;

					case 76:
					case 'end':
						return _context.stop();
				}
			}
		}, RectCenterOutIterator, this);
	});

	var AsyncQueue = function () {
		function AsyncQueue() {
			_classCallCheck(this, AsyncQueue);

			this._values = [];
			/*
   this._promise = undefined;
   this._resolvePromise = undefined;
   */
		}

		_createClass(AsyncQueue, [{
			key: 'enqueue',
			value: function enqueue(value) {
				this._values.push(value);
				if (this._promise) {
					this._resolvePromise();
				}
			}
		}, {
			key: 'dequeue',
			value: function () {
				var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
					var _this = this;

					return _regeneratorRuntime.wrap(function _callee$(_context2) {
						while (1) {
							switch (_context2.prev = _context2.next) {
								case 0:
									if (!this._values.length) {
										_context2.next = 2;
										break;
									}

									return _context2.abrupt('return', this._values.shift());

								case 2:
									if (!this._promise) {
										this._promise = new _Promise(function (resolve) {
											_this._resolvePromise = resolve;
										});
									}
									_context2.next = 5;
									return this._promise;

								case 5:
									this._promise = undefined;

								case 6:
									_context2.next = 0;
									break;

								case 8:
								case 'end':
									return _context2.stop();
							}
						}
					}, _callee, this);
				}));

				function dequeue() {
					return _ref.apply(this, arguments);
				}

				return dequeue;
			}()
		}]);

		return AsyncQueue;
	}();

	_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
		var _this2 = this;

		var messages, _ref4, gridWidth, gridHeight, gridData, _loop;

		return _regeneratorRuntime.wrap(function _callee2$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						messages = new AsyncQueue();

						this.addEventListener('message', function (_ref3) {
							var data = _ref3.data;

							messages.enqueue(data);
						});

						_context4.next = 4;
						return messages.dequeue();

					case 4:
						_ref4 = _context4.sent;
						gridWidth = _ref4.gridWidth;
						gridHeight = _ref4.gridHeight;
						gridData = new Uint8Array(gridWidth * gridHeight);
						_loop = /*#__PURE__*/_regeneratorRuntime.mark(function _loop() {
							var _ref5, rectWidth, rectHeight, rectData, occupiedRectPixels, left, top;

							return _regeneratorRuntime.wrap(function _loop$(_context3) {
								while (1) {
									switch (_context3.prev = _context3.next) {
										case 0:
											_context3.next = 2;
											return messages.dequeue();

										case 2:
											_ref5 = _context3.sent;
											rectWidth = _ref5.rectWidth;
											rectHeight = _ref5.rectHeight;
											rectData = _ref5.rectData;
											occupiedRectPixels = [];

											for (left = 0; left < rectWidth; ++left) {
												for (top = 0; top < rectHeight; ++top) {
													if (rectData[rectWidth * top + left]) {
														occupiedRectPixels.push([left, top]);
													}
												}
											}
											_this2.postMessage(function () {
												var _iteratorNormalCompletion = true;
												var _didIteratorError = false;
												var _iteratorError = undefined;

												try {
													var _loop2 = function _loop2() {
														var _step$value = _slicedToArray(_step.value, 2),
														    rectLeft = _step$value[0],
														    rectTop = _step$value[1];

														if (function () {
															var occupiedGridPixels = [];
															var _iteratorNormalCompletion2 = true;
															var _didIteratorError2 = false;
															var _iteratorError2 = undefined;

															try {
																for (var _iterator2 = _getIterator(occupiedRectPixels), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
																	var _step2$value = _slicedToArray(_step2.value, 2),
																	    _left3 = _step2$value[0],
																	    _top3 = _step2$value[1];

																	_left3 += rectLeft;
																	_top3 += rectTop;
																	if (gridData[gridWidth * _top3 + _left3]) {
																		return false;
																	}
																	occupiedGridPixels.push([_left3, _top3]);
																}
															} catch (err) {
																_didIteratorError2 = true;
																_iteratorError2 = err;
															} finally {
																try {
																	if (!_iteratorNormalCompletion2 && _iterator2.return) {
																		_iterator2.return();
																	}
																} finally {
																	if (_didIteratorError2) {
																		throw _iteratorError2;
																	}
																}
															}

															var _iteratorNormalCompletion3 = true;
															var _didIteratorError3 = false;
															var _iteratorError3 = undefined;

															try {
																for (var _iterator3 = _getIterator(occupiedGridPixels), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
																	var _step3$value = _slicedToArray(_step3.value, 2),
																	    _left4 = _step3$value[0],
																	    _top4 = _step3$value[1];

																	gridData[gridWidth * _top4 + _left4] = 1;
																}
															} catch (err) {
																_didIteratorError3 = true;
																_iteratorError3 = err;
															} finally {
																try {
																	if (!_iteratorNormalCompletion3 && _iterator3.return) {
																		_iterator3.return();
																	}
																} finally {
																	if (_didIteratorError3) {
																		throw _iteratorError3;
																	}
																}
															}

															return true;
														}()) {
															return {
																v: { rectLeft: rectLeft, rectTop: rectTop }
															};
														}
													};

													for (var _iterator = _getIterator(RectCenterOutIterator(gridWidth - rectWidth, gridHeight - rectHeight)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
														var _ret2 = _loop2();

														if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
													}
												} catch (err) {
													_didIteratorError = true;
													_iteratorError = err;
												} finally {
													try {
														if (!_iteratorNormalCompletion && _iterator.return) {
															_iterator.return();
														}
													} finally {
														if (_didIteratorError) {
															throw _iteratorError;
														}
													}
												}

												throw new Error();
											}());

										case 9:
										case 'end':
											return _context3.stop();
									}
								}
							}, _loop, _this2);
						});

					case 9:
						return _context4.delegateYield(_loop(), 't0', 10);

					case 10:
						_context4.next = 9;
						break;

					case 12:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee2, this);
	})).call(self);
});

var InterruptError = function (_Error) {
	_inherits(InterruptError, _Error);

	function InterruptError() {
		var _ref;

		_classCallCheck(this, InterruptError);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = InterruptError.__proto__ || _Object$getPrototypeOf(InterruptError)).call.apply(_ref, [this].concat(args)));

		_this.name = 'InterruptError';
		return _this;
	}

	return InterruptError;
}(Error);

var Worker_getMessage = function Worker_getMessage(worker) {
	return new _Promise(function (resolve, reject) {
		var cleanUp = void 0;
		var messageHandler = function messageHandler(event) {
			cleanUp(event);
			resolve(event.data);
		};
		var errorHandler = function errorHandler(event) {
			cleanUp(event);
			reject(event);
		};
		cleanUp = function cleanUp(event) {
			event.preventDefault();
			worker.onmessage = null;
			worker.onerror = null;
		};
		worker.onmessage = messageHandler;
		worker.onerror = errorHandler;
	});
};

var Promise_delay = function Promise_delay() {
	var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

	return new _Promise(function (resolve) {
		return setTimeout(resolve, ms);
	});
};

var Array_uniqueBy = function Array_uniqueBy(array, iteratee) {
	var uniqueValues = new _Set();
	return array.filter(function (value) {
		value = iteratee(value);
		if (uniqueValues.has(value)) {
			return false;
		}
		uniqueValues.add(value);
		return true;
	});
};

var Iterable_minOf = function Iterable_minOf(values, iteratee) {
	var returns = Infinity;
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = _getIterator(values), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var value = _step.value;

			returns = Math.min(iteratee(value), returns);
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return returns;
};

var Iterable_maxOf = function Iterable_maxOf(values, iteratee) {
	var returns = -Infinity;
	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = _getIterator(values), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var value = _step2.value;

			returns = Math.max(iteratee(value), returns);
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}

	return returns;
};

var Math_convertTurnToRad = function Math_convertTurnToRad(v) {
	return v * 2 * Math.PI;
};

var interpolateWeight = function interpolateWeight(weight, maxWeight) {
	var minWeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	var outputMin = arguments[3];
	var outputMax = arguments[4];

	var input = weight;
	var inputMin = minWeight;
	var inputMax = maxWeight;
	if (outputMin === outputMax) {
		return outputMin;
	}

	if (inputMin === inputMax) {
		if (input <= inputMin) {
			return outputMin;
		}
		return outputMax;
	}

	var result = input;

	// Input Range
	result = (result - inputMin) / (inputMax - inputMin);

	// Output Range
	result = result * (outputMax - outputMin) + outputMin;
	return result;
};

var VueWordCloud = {
	render: function render(createElement) {
		return this.renderer(createElement);
	},


	props: {
		words: {
			type: Array,
			default: function _default() {
				return [];
			}
		},

		text: {
			type: [String, Function],
			default: ''
		},

		weight: {
			type: [Number, Function],
			default: 1
		},

		rotation: {
			type: [String, Function],
			default: function _default() {
				var values = [0, 3 / 4];
				return function () {
					return values[Math.floor(Math.random() * values.length)];
				};
			}
		},

		fontFamily: {
			type: [String, Function],
			default: 'serif'
		},

		fontStyle: {
			type: [String, Function],
			default: 'normal'
		},

		fontVariant: {
			type: [String, Function],
			default: 'normal'
		},

		fontWeight: {
			type: [String, Function],
			default: 'normal'
		},

		color: {
			type: [String, Function],
			default: 'Black'
		},

		fontSizeRatio: {
			type: Number
		},

		maxFontSize: {
			type: Number,
			default: Infinity
		},

		animationDuration: {
			type: Number,
			default: 5000
		},

		animationEasing: {
			type: String,
			default: 'ease'
		},

		containerSizeUpdateInterval: {
			type: Number,
			default: 1000
		}
	},

	data: function data() {
		return {
			containerWidth: 0,
			containerHeight: 0,
			computedBoundedWords: []
			//domWords: {},
		};
	},
	mounted: function mounted() {
		this.startContainerSizeUpdate();
	},


	computed: {
		renderer: function renderer() {
			return this.domRenderer;
		},
		normalizedWords: function normalizedWords() {
			var _this2 = this;

			var words = this.words.map(function (word) {
				var text = void 0,
				    weight = void 0,
				    rotation = void 0,
				    fontFamily = void 0,
				    fontStyle = void 0,
				    fontVariant = void 0,
				    fontWeight = void 0,
				    color = void 0;
				if (word) {
					switch (typeof word === 'undefined' ? 'undefined' : _typeof(word)) {
						case 'string':
							{
								text = word;
								break;
							}
						case 'object':
							{
								if (Array.isArray(word)) {
									var _word = _slicedToArray(word, 2);

									text = _word[0];
									weight = _word[1];
								} else {
									text = word.text;
									weight = word.weight;
									rotation = word.rotation;
									fontFamily = word.fontFamily;
									fontStyle = word.fontStyle;
									fontVariant = word.fontVariant;
									fontWeight = word.fontWeight;
									color = word.color;
								}
								break;
							}
					}
				}
				if (text === undefined) {
					if (typeof _this2.text === 'function') {
						text = _this2.text(word);
					} else {
						text = _this2.text;
					}
				}
				if (weight === undefined) {
					if (typeof _this2.weight === 'function') {
						weight = _this2.weight(word);
					} else {
						weight = _this2.weight;
					}
				}
				if (rotation === undefined) {
					if (typeof _this2.rotation === 'function') {
						rotation = _this2.rotation(word);
					} else {
						rotation = _this2.rotation;
					}
				}
				if (fontFamily === undefined) {
					if (typeof _this2.fontFamily === 'function') {
						fontFamily = _this2.fontFamily(word);
					} else {
						fontFamily = _this2.fontFamily;
					}
				}
				if (fontStyle === undefined) {
					if (typeof _this2.fontStyle === 'function') {
						fontStyle = _this2.fontStyle(word);
					} else {
						fontStyle = _this2.fontStyle;
					}
				}
				if (fontVariant === undefined) {
					if (typeof _this2.fontVariant === 'function') {
						fontVariant = _this2.fontVariant(word);
					} else {
						fontVariant = _this2.fontVariant;
					}
				}
				if (fontWeight === undefined) {
					if (typeof _this2.fontWeight === 'function') {
						fontWeight = _this2.fontWeight(word);
					} else {
						fontWeight = _this2.fontWeight;
					}
				}
				if (color === undefined) {
					if (typeof _this2.color === 'function') {
						color = _this2.color(word);
					} else {
						color = _this2.color;
					}
				}
				return { text: text, weight: weight, rotation: rotation, fontFamily: fontFamily, fontStyle: fontStyle, fontVariant: fontVariant, fontWeight: fontWeight, color: color };
			});

			words = words.filter(function (_ref3) {
				var text = _ref3.text;
				return text;
			});
			words = words.filter(function (_ref4) {
				var weight = _ref4.weight;
				return weight > 0;
			});

			words = Array_uniqueBy(words, function (_ref5) {
				var text = _ref5.text;
				return text;
			});

			words.sort(function (word, otherWord) {
				return otherWord.weight - word.weight;
			});

			var minWeight = Iterable_minOf(words, function (_ref6) {
				var weight = _ref6.weight;
				return weight;
			});
			var maxWeight = Iterable_maxOf(words, function (_ref7) {
				var weight = _ref7.weight;
				return weight;
			});
			if (this.fontSizeRatio) {
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					for (var _iterator3 = _getIterator(words), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var word = _step3.value;

						word.weight = interpolateWeight(word.weight, maxWeight, minWeight, 1, this.fontSizeRatio);
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3.return) {
							_iterator3.return();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}
			} else {
				var _iteratorNormalCompletion4 = true;
				var _didIteratorError4 = false;
				var _iteratorError4 = undefined;

				try {
					for (var _iterator4 = _getIterator(words), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
						var _word2 = _step4.value;

						_word2.weight /= minWeight;
					}
				} catch (err) {
					_didIteratorError4 = true;
					_iteratorError4 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion4 && _iterator4.return) {
							_iterator4.return();
						}
					} finally {
						if (_didIteratorError4) {
							throw _iteratorError4;
						}
					}
				}
			}

			return words;
		},
		boundedWords: function boundedWords() {
			var _this3 = this;

			_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
				return _regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.prev = 0;
								_context.next = 3;
								return _this3.promisedBoundedWords;

							case 3:
								_this3.computedBoundedWords = _context.sent;
								_context.next = 9;
								break;

							case 6:
								_context.prev = 6;
								_context.t0 = _context['catch'](0);

								console.error(_context.t0);
								// continue regardless of error

							case 9:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, _this3, [[0, 6]]);
			}))();
			return this.computedBoundedWords;
		},
		promisedBoundedWords: function promisedBoundedWords() {
			return this.computeBoundedWords();
		},


		computeBoundedWords: function () {
			var getTextRect = function () {
				var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(text, fontFamily, fontSize, fontStyle, fontVariant, fontWeight, rotation) {
					var font, ctx, textWidth, textHeight, rectWidth, rectHeight, rectData, _ctx, imageData, i, ii;

					return _regeneratorRuntime.wrap(function _callee2$(_context2) {
						while (1) {
							switch (_context2.prev = _context2.next) {
								case 0:
									rotation = Math_convertTurnToRad(rotation);
									font = [fontStyle, fontVariant, fontWeight, fontSize + 'px', fontFamily].join(' ');
									_context2.prev = 2;
									_context2.next = 5;
									return document.fonts.load(font, text);

								case 5:
									_context2.next = 9;
									break;

								case 7:
									_context2.prev = 7;
									_context2.t0 = _context2['catch'](2);

								case 9:
									ctx = document.createElement('canvas').getContext('2d');

									ctx.font = font;
									textWidth = ctx.measureText(text).width;
									textHeight = fontSize;
									rectWidth = Math.ceil(textWidth * Math.abs(Math.cos(rotation)) + textHeight * Math.abs(Math.sin(rotation)));
									rectHeight = Math.ceil(textWidth * Math.abs(Math.sin(rotation)) + textHeight * Math.abs(Math.cos(rotation)));
									rectData = new Uint8Array(rectWidth * rectHeight);

									if (rectData.length > 0) {
										_ctx = document.createElement('canvas').getContext('2d');

										_ctx.canvas.width = rectWidth;
										_ctx.canvas.height = rectHeight;
										_ctx.translate(rectWidth / 2, rectHeight / 2);
										_ctx.rotate(rotation);
										_ctx.font = font;
										_ctx.textAlign = 'center';
										_ctx.textBaseline = 'middle';
										_ctx.fillText(text, 0, 0);
										imageData = _ctx.getImageData(0, 0, rectWidth, rectHeight).data;

										for (i = 0, ii = rectData.length; i < ii; ++i) {
											rectData[i] = imageData[i * 4 + 3];
										}
									}
									return _context2.abrupt('return', { textWidth: textWidth, textHeight: textHeight, rectWidth: rectWidth, rectHeight: rectHeight, rectData: rectData });

								case 18:
								case 'end':
									return _context2.stop();
							}
						}
					}, _callee2, this, [[2, 7]]);
				}));

				return function getTextRect(_x5, _x6, _x7, _x8, _x9, _x10, _x11) {
					return _ref9.apply(this, arguments);
				};
			}();

			var computer = function () {
				var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(context) {
					var containerWidth, containerHeight, words, containerAspect, boundedWords, boundWordWorker, gridResolution, gridWidth, gridHeight, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, word, text, weight, rotation, fontFamily, fontStyle, fontVariant, fontWeight, color, fontSize, _ref11, textWidth, textHeight, rectWidth, rectHeight, rectData, _ref12, rectLeft, rectTop;

					return _regeneratorRuntime.wrap(function _callee3$(_context3) {
						while (1) {
							switch (_context3.prev = _context3.next) {
								case 0:
									containerWidth = this.containerWidth;
									containerHeight = this.containerHeight;

									if (!(containerWidth <= 0 || containerHeight <= 0)) {
										_context3.next = 4;
										break;
									}

									return _context3.abrupt('return', []);

								case 4:
									words = this.normalizedWords;
									_context3.next = 7;
									return context.delayIfNotInterrupted();

								case 7:
									containerAspect = containerWidth / containerHeight;
									boundedWords = [];
									boundWordWorker = new BoundWordWorker();
									_context3.prev = 10;
									gridResolution = Math.pow(2, 22);
									gridWidth = Math.floor(Math.sqrt(containerAspect * gridResolution));
									gridHeight = Math.floor(gridResolution / gridWidth);

									boundWordWorker.postMessage({ gridWidth: gridWidth, gridHeight: gridHeight });
									_iteratorNormalCompletion5 = true;
									_didIteratorError5 = false;
									_iteratorError5 = undefined;
									_context3.prev = 18;
									_iterator5 = _getIterator(words);

								case 20:
									if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
										_context3.next = 49;
										break;
									}

									word = _step5.value;

									context.throwIfInterrupted();
									_context3.prev = 23;
									text = word.text, weight = word.weight, rotation = word.rotation, fontFamily = word.fontFamily, fontStyle = word.fontStyle, fontVariant = word.fontVariant, fontWeight = word.fontWeight, color = word.color;
									fontSize = weight * 4;
									_context3.next = 28;
									return getTextRect(text, fontFamily, fontSize, fontStyle, fontVariant, fontWeight, rotation);

								case 28:
									_ref11 = _context3.sent;
									textWidth = _ref11.textWidth;
									textHeight = _ref11.textHeight;
									rectWidth = _ref11.rectWidth;
									rectHeight = _ref11.rectHeight;
									rectData = _ref11.rectData;

									boundWordWorker.postMessage({ rectWidth: rectWidth, rectHeight: rectHeight, rectData: rectData });
									_context3.next = 37;
									return Worker_getMessage(boundWordWorker);

								case 37:
									_ref12 = _context3.sent;
									rectLeft = _ref12.rectLeft;
									rectTop = _ref12.rectTop;

									boundedWords.push({ text: text, rotation: rotation, fontFamily: fontFamily, fontSize: fontSize, fontStyle: fontStyle, fontVariant: fontVariant, fontWeight: fontWeight, rectLeft: rectLeft, rectTop: rectTop, rectWidth: rectWidth, rectHeight: rectHeight, textWidth: textWidth, textHeight: textHeight, color: color });
									_context3.next = 46;
									break;

								case 43:
									_context3.prev = 43;
									_context3.t0 = _context3['catch'](23);

									console.error(_context3.t0);
									// continue regardless of error

								case 46:
									_iteratorNormalCompletion5 = true;
									_context3.next = 20;
									break;

								case 49:
									_context3.next = 55;
									break;

								case 51:
									_context3.prev = 51;
									_context3.t1 = _context3['catch'](18);
									_didIteratorError5 = true;
									_iteratorError5 = _context3.t1;

								case 55:
									_context3.prev = 55;
									_context3.prev = 56;

									if (!_iteratorNormalCompletion5 && _iterator5.return) {
										_iterator5.return();
									}

								case 58:
									_context3.prev = 58;

									if (!_didIteratorError5) {
										_context3.next = 61;
										break;
									}

									throw _iteratorError5;

								case 61:
									return _context3.finish(58);

								case 62:
									return _context3.finish(55);

								case 63:
									_context3.prev = 63;

									boundWordWorker.terminate();
									return _context3.finish(63);

								case 66:
									_context3.next = 68;
									return context.delayIfNotInterrupted();

								case 68:
									return _context3.abrupt('return', boundedWords);

								case 69:
								case 'end':
									return _context3.stop();
							}
						}
					}, _callee3, this, [[10,, 63, 66], [18, 51, 55, 63], [23, 43], [56,, 58, 62]]);
				}));

				return function computer(_x12) {
					return _ref10.apply(this, arguments);
				};
			}();

			return function () {
				var outerToken = void 0;
				return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
					var self, innerToken;
					return _regeneratorRuntime.wrap(function _callee5$(_context5) {
						while (1) {
							switch (_context5.prev = _context5.next) {
								case 0:
									self = this;
									innerToken = outerToken = {};
									_context5.t0 = computer;
									_context5.t1 = this;

									_context5.t2 = function throwIfInterrupted() {
										if (this.interrupted) {
											throw new InterruptError();
										}
									};

									_context5.t3 = function delayIfNotInterrupted(ms) {
										var _this4 = this;

										return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
											return _regeneratorRuntime.wrap(function _callee4$(_context4) {
												while (1) {
													switch (_context4.prev = _context4.next) {
														case 0:
															_this4.throwIfInterrupted();
															_context4.next = 3;
															return Promise_delay(ms);

														case 3:
															_this4.throwIfInterrupted();

														case 4:
														case 'end':
															return _context4.stop();
													}
												}
											}, _callee4, _this4);
										}))();
									};

									_context5.t4 = {
										get interrupted() {
											return innerToken !== outerToken || self._isDestroyed;
										},

										throwIfInterrupted: _context5.t2,
										delayIfNotInterrupted: _context5.t3
									};
									_context5.next = 9;
									return _context5.t0.call.call(_context5.t0, _context5.t1, _context5.t4);

								case 9:
									return _context5.abrupt('return', _context5.sent);

								case 10:
								case 'end':
									return _context5.stop();
							}
						}
					}, _callee5, this);
				}));
			};
		}(),

		scaledBoundedWords: function scaledBoundedWords() {
			var words = this.boundedWords;
			var containerWidth = this.containerWidth;
			var containerHeight = this.containerHeight;
			var maxFontSize = this.maxFontSize;

			var containedLeft = Iterable_minOf(words, function (_ref14) {
				var rectLeft = _ref14.rectLeft;
				return rectLeft;
			});
			var containedRight = Iterable_maxOf(words, function (_ref15) {
				var rectLeft = _ref15.rectLeft,
				    rectWidth = _ref15.rectWidth;
				return rectLeft + rectWidth;
			});
			var containedWidth = containedRight - containedLeft;

			var containedTop = Iterable_minOf(words, function (_ref16) {
				var rectTop = _ref16.rectTop;
				return rectTop;
			});
			var containedBottom = Iterable_maxOf(words, function (_ref17) {
				var rectTop = _ref17.rectTop,
				    rectHeight = _ref17.rectHeight;
				return rectTop + rectHeight;
			});
			var containedHeight = containedBottom - containedTop;

			var scaleFactor = Math.min(containerWidth / containedWidth, containerHeight / containedHeight);

			var currentMaxFontSize = Iterable_maxOf(words, function (_ref18) {
				var fontSize = _ref18.fontSize;
				return fontSize;
			}) * scaleFactor;
			if (currentMaxFontSize > maxFontSize) {
				scaleFactor *= maxFontSize / currentMaxFontSize;
			}

			return words.map(function (_ref19) {
				var text = _ref19.text,
				    color = _ref19.color,
				    fontFamily = _ref19.fontFamily,
				    fontSize = _ref19.fontSize,
				    fontStyle = _ref19.fontStyle,
				    fontVariant = _ref19.fontVariant,
				    fontWeight = _ref19.fontWeight,
				    rotation = _ref19.rotation,
				    rectLeft = _ref19.rectLeft,
				    rectTop = _ref19.rectTop,
				    rectWidth = _ref19.rectWidth,
				    rectHeight = _ref19.rectHeight,
				    textWidth = _ref19.textWidth,
				    textHeight = _ref19.textHeight;

				rectLeft = (rectLeft - (containedLeft + containedRight) / 2) * scaleFactor + containerWidth / 2;
				rectTop = (rectTop - (containedTop + containedBottom) / 2) * scaleFactor + containerHeight / 2;
				rectWidth *= scaleFactor;
				rectHeight *= scaleFactor;
				textWidth *= scaleFactor;
				textHeight *= scaleFactor;
				fontSize *= scaleFactor;
				return { text: text, color: color, fontFamily: fontFamily, fontSize: fontSize, fontStyle: fontStyle, fontVariant: fontVariant, fontWeight: fontWeight, rotation: rotation, rectLeft: rectLeft, rectTop: rectTop, rectWidth: rectWidth, rectHeight: rectHeight, textWidth: textWidth, textHeight: textHeight };
			});
		},
		domWords: function domWords() {
			var words = [].concat(_toConsumableArray(this.scaledBoundedWords));
			var wordsCount = words.length;
			var transitionDuration = this.animationDuration / 4;
			var transitionDelay = (this.animationDuration - transitionDuration) / wordsCount;
			var transitionEasing = this.animationEasing;
			var domWords = {};
			words.forEach(function (_ref20, index) {
				var text = _ref20.text,
				    color = _ref20.color,
				    fontFamily = _ref20.fontFamily,
				    fontSize = _ref20.fontSize,
				    fontStyle = _ref20.fontStyle,
				    fontVariant = _ref20.fontVariant,
				    fontWeight = _ref20.fontWeight,
				    rotation = _ref20.rotation,
				    rectLeft = _ref20.rectLeft,
				    rectTop = _ref20.rectTop,
				    rectWidth = _ref20.rectWidth,
				    rectHeight = _ref20.rectHeight,
				    textWidth = _ref20.textWidth;

				domWords[text] = {
					style: {
						position: 'absolute',
						left: rectLeft + rectWidth / 2 - textWidth / 2 + 'px',
						top: rectTop + rectHeight / 2 + 'px',
						color: color,
						font: [fontStyle, fontVariant, fontWeight, fontSize + 'px/0', fontFamily].join(' '),
						transform: 'rotate(' + rotation + 'turn)',
						whiteSpace: 'nowrap',
						transition: ['all', Math.round(transitionDuration) + 'ms', transitionEasing, Math.round(transitionDelay * index) + 'ms'].join(' ')
					},
					text: text
				};
			});
			return domWords;
		},
		startContainerSizeUpdate: function startContainerSizeUpdate() {
			return function () {
				var _this5 = this;

				if (!this._isDestroyed) {
					setTimeout(function () {
						_this5.startContainerSizeUpdate();
					}, this.containerSizeUpdateInterval);
					this.updateContainerSize();
				}
			};
		}
	},

	watch: {},

	methods: {
		domRenderer: function domRenderer(createElement) {
			return createElement('div', {
				style: {
					position: 'relative',
					width: '100%',
					height: '100%',
					overflow: 'hidden'
				}
			}, _Object$entries(this.domWords).map(function (_ref21) {
				var _ref22 = _slicedToArray(_ref21, 2),
				    key = _ref22[0],
				    _ref22$ = _ref22[1],
				    style = _ref22$.style,
				    text = _ref22$.text;

				return createElement('div', { key: key, style: style }, text);
			}));
		},
		canvasRenderer: function canvasRenderer(createElement) {
			// todo?
			/*
   	let canvas = document.createElement('canvas');
   	let ctx = canvas.getContext('2d');
   	this.boundedWords.forEach(({text, color, fontFamily, fontSize, fontStyle, fontVariant, fontWeight, rotation, rectLeft, rectTop, rectWidth, rectHeight, textWidth, textHeight}) => {
   		ctx.save();
   		ctx.font = [fontStyle, fontVariant, fontWeight, `${fontSize}px`, fontFamily].join(' ');
   		ctx.fillStyle = color;
   		ctx.textAlign = 'center';
   		ctx.textBaseline = 'middle';
   		ctx.fillText(text, 0, 0);
   		ctx.translate(rectLeft + rectWidth / 2, rectTop + rectHeight / 2);
   		ctx.rotate(Math_convertTurnToRad(rotation));
   		ctx.restore();
   	});
   	return canvas;
   	*/
		},
		svgRenderer: function svgRenderer(createElement) {
			// todo?
		},
		updateContainerSize: function updateContainerSize() {
			var _$el$getBoundingClien = this.$el.getBoundingClientRect(),
			    width = _$el$getBoundingClien.width,
			    height = _$el$getBoundingClien.height;

			this.containerWidth = width;
			this.containerHeight = height;
		}
	}
};

Vue.component(VueWordCloud);

return VueWordCloud;

})));
