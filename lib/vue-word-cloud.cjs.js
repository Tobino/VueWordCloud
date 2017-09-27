'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();



var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var CancelError = function (_Error) {
	inherits(CancelError, _Error);

	function CancelError() {
		var _ref;

		classCallCheck(this, CancelError);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = possibleConstructorReturn(this, (_ref = CancelError.__proto__ || Object.getPrototypeOf(CancelError)).call.apply(_ref, [this].concat(args)));

		_this.name = 'CancelError';
		return _this;
	}

	return CancelError;
}(Error);

var Number_randomFloat = function Number_randomFloat(start, end) {
	return start + (end - start) * Math.random();
};

var Number_randomInt = function Number_randomInt(start, end) {
	var startInclusive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	var endInclusive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	if (start > end) {
		return Number_randomInt(end, start, endInclusive, startInclusive);
	}
	if (!startInclusive) start++;
	if (endInclusive) end++;
	return Math.floor(Number_randomFloat(start, end));
};

var Worker_fromFunction = function Worker_fromFunction(fn) {
	var code = '(' + fn.toString() + ')()';
	var blob = new Blob([code]);
	var blobURL = URL.createObjectURL(blob);
	return new Worker(blobURL);
};

var Worker_getMessage = function Worker_getMessage(worker) {
	return new Promise(function (resolve, reject) {
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
			worker.removeEventListener('message', messageHandler);
			worker.removeEventListener('error', errorHandler);
		};
		worker.addEventListener('message', messageHandler);
		worker.addEventListener('error', errorHandler);
	});
};

var Promise_delay = function Promise_delay() {
	var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

	return new Promise(function (resolve) {
		return setTimeout(resolve, ms);
	});
};

var Function_isFunction = function Function_isFunction(value) {
	return typeof value === 'function';
};

var Function_stubArray = function Function_stubArray() {
	return [];
};

var Array_uniqueBy = function Array_uniqueBy(array, iteratee) {
	var uniqueValues = new Set();
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
		for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
		for (var _iterator2 = values[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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

var computed = {
	renderer: function renderer() {
		return this.domRenderer;
	},
	normalizedWords: function normalizedWords() {
		var _this2 = this;

		var words = this.words.map(function (word) {
			var text = void 0,
			    weight = void 0,
			    color = void 0,
			    rotation = void 0,
			    fontFamily = void 0,
			    fontStyle = void 0,
			    fontVariant = void 0,
			    fontWeight = void 0;
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
								var _word = slicedToArray(word, 8);

								text = _word[0];
								weight = _word[1];
								color = _word[2];
								rotation = _word[3];
								fontFamily = _word[4];
								fontStyle = _word[5];
								fontVariant = _word[6];
								fontWeight = _word[7];
							} else {
								text = word.text;
								weight = word.weight;
								color = word.color;
								rotation = word.rotation;
								fontFamily = word.fontFamily;
								fontStyle = word.fontStyle;
								fontVariant = word.fontVariant;
								fontWeight = word.fontWeight;
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
			if (color === undefined) {
				if (typeof _this2.color === 'function') {
					color = _this2.color(word);
				} else {
					color = _this2.color;
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
			return { text: text, weight: weight, color: color, rotation: rotation, fontFamily: fontFamily, fontStyle: fontStyle, fontVariant: fontVariant, fontWeight: fontWeight };
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
		//let maxWeight = Iterable_maxOf(words, ({weight}) => weight);
		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = words[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var word = _step3.value;

				word.weight /= minWeight;
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

		return words;
	}
};

var getBoundedWords = function () {
	var getTextRect = function () {
		var _ref7 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(text, fontFamily, fontSize, fontStyle, fontVariant, fontWeight, rotation) {
			var font, ctx, textWidth, textHeight, rectWidth, rectHeight, rectData, _ctx, imageData, i, ii;

			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							rotation = Math_convertTurnToRad(rotation);
							font = [fontStyle, fontVariant, fontWeight, fontSize + 'px', fontFamily].join(' ');
							_context.prev = 2;
							_context.next = 5;
							return document.fonts.load(font, text);

						case 5:
							_context.next = 9;
							break;

						case 7:
							_context.prev = 7;
							_context.t0 = _context['catch'](2);

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
							return _context.abrupt('return', { textWidth: textWidth, textHeight: textHeight, rectWidth: rectWidth, rectHeight: rectHeight, rectData: rectData });

						case 18:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this, [[2, 7]]);
		}));

		return function getTextRect(_x4, _x5, _x6, _x7, _x8, _x9, _x10) {
			return _ref7.apply(this, arguments);
		};
	}();

	var boundWord = function boundWord() {
		var RectCenterOutIterator = /*#__PURE__*/regeneratorRuntime.mark(function RectCenterOutIterator(rectWidth, rectHeight) {
			var stepLeft, stepTop, startLeft, startTop, endLeft, endTop, left, top, previousStartLeft, previousStartTop, previousEndLeft, previousEndTop, currentStartLeft, currentStartTop, currentEndLeft, currentEndTop, _top, _left, _top2, _left2;

			return regeneratorRuntime.wrap(function RectCenterOutIterator$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							if (!(rectWidth > 0 && rectHeight > 0)) {
								_context2.next = 76;
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
								_context2.next = 17;
								break;
							}

							left = startLeft;

						case 9:
							if (!(left <= endLeft)) {
								_context2.next = 15;
								break;
							}

							_context2.next = 12;
							return [left, startTop];

						case 12:
							++left;
							_context2.next = 9;
							break;

						case 15:
							_context2.next = 25;
							break;

						case 17:
							if (!(startTop < endTop)) {
								_context2.next = 25;
								break;
							}

							top = startTop;

						case 19:
							if (!(top <= endTop)) {
								_context2.next = 25;
								break;
							}

							_context2.next = 22;
							return [startLeft, top];

						case 22:
							++top;
							_context2.next = 19;
							break;

						case 25:
							previousStartLeft = startLeft;
							previousStartTop = startTop;
							previousEndLeft = endLeft;
							previousEndTop = endTop;

						case 29:
							if (!(endLeft < rectWidth || endTop < rectHeight)) {
								_context2.next = 76;
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
								_context2.next = 46;
								break;
							}

							_top = currentStartTop;

						case 40:
							if (!(_top < currentEndTop)) {
								_context2.next = 46;
								break;
							}

							_context2.next = 43;
							return [currentEndLeft, _top];

						case 43:
							++_top;
							_context2.next = 40;
							break;

						case 46:
							if (!(currentEndTop > previousEndTop)) {
								_context2.next = 54;
								break;
							}

							_left = currentEndLeft;

						case 48:
							if (!(_left > currentStartLeft)) {
								_context2.next = 54;
								break;
							}

							_context2.next = 51;
							return [_left, currentEndTop];

						case 51:
							--_left;
							_context2.next = 48;
							break;

						case 54:
							if (!(currentStartLeft < previousStartLeft)) {
								_context2.next = 62;
								break;
							}

							_top2 = currentEndTop;

						case 56:
							if (!(_top2 > currentStartTop)) {
								_context2.next = 62;
								break;
							}

							_context2.next = 59;
							return [currentStartLeft, _top2];

						case 59:
							--_top2;
							_context2.next = 56;
							break;

						case 62:
							if (!(currentStartTop < previousStartTop)) {
								_context2.next = 70;
								break;
							}

							_left2 = currentStartLeft;

						case 64:
							if (!(_left2 < currentEndLeft)) {
								_context2.next = 70;
								break;
							}

							_context2.next = 67;
							return [_left2, currentStartTop];

						case 67:
							++_left2;
							_context2.next = 64;
							break;

						case 70:
							previousStartLeft = currentStartLeft;
							previousStartTop = currentStartTop;
							previousEndLeft = currentEndLeft;
							previousEndTop = currentEndTop;
							_context2.next = 29;
							break;

						case 76:
						case 'end':
							return _context2.stop();
					}
				}
			}, RectCenterOutIterator, this);
		});

		self.addEventListener('message', function (_ref8) {
			var _ref8$data = _ref8.data,
			    gridWidth = _ref8$data.gridWidth,
			    gridHeight = _ref8$data.gridHeight;

			var gridData = new Uint8Array(gridWidth * gridHeight);

			self.addEventListener('message', function (_ref9) {
				var _ref9$data = _ref9.data,
				    rectWidth = _ref9$data.rectWidth,
				    rectHeight = _ref9$data.rectHeight,
				    rectData = _ref9$data.rectData;

				var occupiedRectPixels = [];
				for (var left = 0; left < rectWidth; ++left) {
					for (var top = 0; top < rectHeight; ++top) {
						if (rectData[rectWidth * top + left]) {
							occupiedRectPixels.push([left, top]);
						}
					}
				}
				self.postMessage(function () {
					var _iteratorNormalCompletion4 = true;
					var _didIteratorError4 = false;
					var _iteratorError4 = undefined;

					try {
						var _loop = function _loop() {
							var _step4$value = slicedToArray(_step4.value, 2),
							    rectLeft = _step4$value[0],
							    rectTop = _step4$value[1];

							if (function () {
								var occupiedGridPixels = [];
								var _iteratorNormalCompletion5 = true;
								var _didIteratorError5 = false;
								var _iteratorError5 = undefined;

								try {
									for (var _iterator5 = occupiedRectPixels[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
										var _step5$value = slicedToArray(_step5.value, 2),
										    _left3 = _step5$value[0],
										    _top3 = _step5$value[1];

										_left3 += rectLeft;
										_top3 += rectTop;
										if (gridData[gridWidth * _top3 + _left3]) {
											return false;
										}
										occupiedGridPixels.push([_left3, _top3]);
									}
								} catch (err) {
									_didIteratorError5 = true;
									_iteratorError5 = err;
								} finally {
									try {
										if (!_iteratorNormalCompletion5 && _iterator5.return) {
											_iterator5.return();
										}
									} finally {
										if (_didIteratorError5) {
											throw _iteratorError5;
										}
									}
								}

								var _iteratorNormalCompletion6 = true;
								var _didIteratorError6 = false;
								var _iteratorError6 = undefined;

								try {
									for (var _iterator6 = occupiedGridPixels[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
										var _step6$value = slicedToArray(_step6.value, 2),
										    _left4 = _step6$value[0],
										    _top4 = _step6$value[1];

										gridData[gridWidth * _top4 + _left4] = 1;
									}
								} catch (err) {
									_didIteratorError6 = true;
									_iteratorError6 = err;
								} finally {
									try {
										if (!_iteratorNormalCompletion6 && _iterator6.return) {
											_iterator6.return();
										}
									} finally {
										if (_didIteratorError6) {
											throw _iteratorError6;
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

						for (var _iterator4 = RectCenterOutIterator(gridWidth - rectWidth, gridHeight - rectHeight)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
							var _ret = _loop();

							if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
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

					throw new Error();
				}());
			});
		}, { once: true });
	};

	var weightToFontSize = function weightToFontSize(weight, maxWeight) {
		var input = weight;
		var inputRange = [1, maxWeight]; // Min & max possible word weight
		var inputMin = inputRange[0],
		    inputMax = inputRange[1];
		// TODO: use props to customize outputRange

		var outputRange = [20, 100]; // Min & max font sizes
		var outputMin = outputRange[0],
		    outputMax = outputRange[1];


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

		console.log('wtf', weight, result);
		return result;
	};

	var boundWords = function () {
		var _ref10 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(context, containerWidth, containerHeight, words) {
			var boundedWords, boundWordWorker, gridResolution, gridWidth, gridHeight, maxWeight, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, word, text, weight, color, rotation, fontFamily, fontStyle, fontVariant, fontWeight, fontSize, _ref11, textWidth, textHeight, rectWidth, rectHeight, rectData, _ref12, _rectLeft, _rectTop;

			return regeneratorRuntime.wrap(function _callee2$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							console.log('boundWords', words);
							boundedWords = [];
							boundWordWorker = Worker_fromFunction(boundWord);
							_context3.prev = 3;
							gridResolution = Math.pow(2, 22);
							gridWidth = Math.floor(Math.sqrt(containerWidth / containerHeight * gridResolution));
							gridHeight = Math.floor(gridResolution / gridWidth);
							maxWeight = Math.max.apply(Math, toConsumableArray(words.map(function (word) {
								return word.weight;
							})));

							boundWordWorker.postMessage({ gridWidth: gridWidth, gridHeight: gridHeight });
							_iteratorNormalCompletion7 = true;
							_didIteratorError7 = false;
							_iteratorError7 = undefined;
							_context3.prev = 12;
							_iterator7 = words[Symbol.iterator]();

						case 14:
							if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
								_context3.next = 43;
								break;
							}

							word = _step7.value;

							context.throwIfCanceled();
							_context3.prev = 17;
							text = word.text, weight = word.weight, color = word.color, rotation = word.rotation, fontFamily = word.fontFamily, fontStyle = word.fontStyle, fontVariant = word.fontVariant, fontWeight = word.fontWeight;
							fontSize = weightToFontSize(weight, maxWeight);
							_context3.next = 22;
							return getTextRect(text, fontFamily, fontSize, fontStyle, fontVariant, fontWeight, rotation);

						case 22:
							_ref11 = _context3.sent;
							textWidth = _ref11.textWidth;
							textHeight = _ref11.textHeight;
							rectWidth = _ref11.rectWidth;
							rectHeight = _ref11.rectHeight;
							rectData = _ref11.rectData;

							boundWordWorker.postMessage({ rectWidth: rectWidth, rectHeight: rectHeight, rectData: rectData });
							_context3.next = 31;
							return Worker_getMessage(boundWordWorker);

						case 31:
							_ref12 = _context3.sent;
							_rectLeft = _ref12.rectLeft;
							_rectTop = _ref12.rectTop;

							boundedWords.push({ text: text, color: color, fontFamily: fontFamily, fontSize: fontSize, fontStyle: fontStyle, fontVariant: fontVariant, fontWeight: fontWeight, rotation: rotation, rectLeft: _rectLeft, rectTop: _rectTop, rectWidth: rectWidth, rectHeight: rectHeight, textWidth: textWidth, textHeight: textHeight });
							_context3.next = 40;
							break;

						case 37:
							_context3.prev = 37;
							_context3.t0 = _context3['catch'](17);

							console.log(_context3.t0);

						case 40:
							_iteratorNormalCompletion7 = true;
							_context3.next = 14;
							break;

						case 43:
							_context3.next = 49;
							break;

						case 45:
							_context3.prev = 45;
							_context3.t1 = _context3['catch'](12);
							_didIteratorError7 = true;
							_iteratorError7 = _context3.t1;

						case 49:
							_context3.prev = 49;
							_context3.prev = 50;

							if (!_iteratorNormalCompletion7 && _iterator7.return) {
								_iterator7.return();
							}

						case 52:
							_context3.prev = 52;

							if (!_didIteratorError7) {
								_context3.next = 55;
								break;
							}

							throw _iteratorError7;

						case 55:
							return _context3.finish(52);

						case 56:
							return _context3.finish(49);

						case 57:
							_context3.prev = 57;

							boundWordWorker.terminate();
							return _context3.finish(57);

						case 60:
							return _context3.abrupt('return', boundedWords);

						case 61:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee2, this, [[3,, 57, 60], [12, 45, 49, 57], [17, 37], [50,, 52, 56]]);
		}));

		return function boundWords(_x11, _x12, _x13, _x14) {
			return _ref10.apply(this, arguments);
		};
	}();

	var scaleBoundedWords = function scaleBoundedWords(boundedWords, containerWidth, containerHeight) {
		var minLeft = Iterable_minOf(boundedWords, function (_ref13) {
			var rectLeft = _ref13.rectLeft;
			return rectLeft;
		});
		var maxLeft = Iterable_maxOf(boundedWords, function (_ref14) {
			var rectLeft = _ref14.rectLeft,
			    rectWidth = _ref14.rectWidth;
			return rectLeft + rectWidth;
		});
		var containedWidth = maxLeft - minLeft;

		var minTop = Iterable_minOf(boundedWords, function (_ref15) {
			var rectTop = _ref15.rectTop;
			return rectTop;
		});
		var maxTop = Iterable_maxOf(boundedWords, function (_ref16) {
			var rectTop = _ref16.rectTop,
			    rectHeight = _ref16.rectHeight;
			return rectTop + rectHeight;
		});
		var containedHeight = maxTop - minTop;

		var scale = Math.min(containerWidth / containedWidth, containerHeight / containedHeight);

		var _iteratorNormalCompletion8 = true;
		var _didIteratorError8 = false;
		var _iteratorError8 = undefined;

		try {
			for (var _iterator8 = boundedWords[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
				var word = _step8.value;

				word.rectLeft = (word.rectLeft - (minLeft + maxLeft) / 2) * scale + containerWidth / 2;
				word.rectTop = (word.rectTop - (minTop + maxTop) / 2) * scale + containerHeight / 2;
				word.rectWidth *= scale;
				word.rectHeight *= scale;
				word.textWidth *= scale;
				word.textHeight *= scale;
				word.fontSize *= scale;
			}
		} catch (err) {
			_didIteratorError8 = true;
			_iteratorError8 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion8 && _iterator8.return) {
					_iterator8.return();
				}
			} finally {
				if (_didIteratorError8) {
					throw _iteratorError8;
				}
			}
		}
	};

	return function () {
		var _ref17 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(context) {
			var containerWidth, containerHeight, words, boundedWords;
			return regeneratorRuntime.wrap(function _callee3$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							containerWidth = this.containerWidth;
							containerHeight = this.containerHeight;

							if (!(containerWidth <= 0 || containerHeight <= 0)) {
								_context4.next = 4;
								break;
							}

							return _context4.abrupt('return', []);

						case 4:
							words = this.normalizedWords;
							_context4.next = 7;
							return context.delayIfNotCanceled();

						case 7:
							_context4.next = 9;
							return boundWords(context, containerWidth, containerHeight, words);

						case 9:
							boundedWords = _context4.sent;
							_context4.next = 12;
							return context.delayIfNotCanceled();

						case 12:
							scaleBoundedWords(boundedWords, containerWidth, containerHeight);
							_context4.next = 15;
							return context.delayIfNotCanceled();

						case 15:
							return _context4.abrupt('return', boundedWords);

						case 16:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee3, this);
		}));

		return function (_x15) {
			return _ref17.apply(this, arguments);
		};
	}();
}();

var asyncComputed = {
	boundedWords: {
		get: getBoundedWords,
		default: Function_stubArray
	}
};

var watch = {};

var invokePeriodically = {
	updateContainerSize: {
		method: function method() {
			if (this.mounted && this.$el) {
				var _$el$getBoundingClien = this.$el.getBoundingClientRect(),
				    width = _$el$getBoundingClien.width,
				    height = _$el$getBoundingClien.height;

				this.containerWidth = width;
				this.containerHeight = height;
			}
		},


		//initialDelay

		interval: function interval() {
			return this.containerSizeUpdateInterval;
		}
	}
};

var methods = {
	domRenderer: function domRenderer(createElement) {
		var _this3 = this;

		//console.log('domRenderer');
		return createElement('div', {
			style: {
				position: 'relative',
				width: '100%',
				height: '100%',
				overflow: 'hidden'
			}
		}, this.boundedWords.map(function (_ref18) {
			var text = _ref18.text,
			    color = _ref18.color,
			    fontFamily = _ref18.fontFamily,
			    fontSize = _ref18.fontSize,
			    fontStyle = _ref18.fontStyle,
			    fontVariant = _ref18.fontVariant,
			    fontWeight = _ref18.fontWeight,
			    rotation = _ref18.rotation,
			    rectLeft = _ref18.rectLeft,
			    rectTop = _ref18.rectTop,
			    rectWidth = _ref18.rectWidth,
			    rectHeight = _ref18.rectHeight,
			    textWidth = _ref18.textWidth;

			var transitionDuration = Number_randomInt(0, _this3.animationDuration);
			var transitionDelay = _this3.animationDuration - transitionDuration;
			return createElement('div', {
				key: text,
				style: {
					position: 'absolute',
					left: rectLeft + rectWidth / 2 - textWidth / 2 + 'px',
					top: rectTop + rectHeight / 2 + 'px',
					color: color,
					font: [fontStyle, fontVariant, fontWeight, fontSize + 'px/0', fontFamily].join(' '),
					transform: 'rotate(' + rotation + 'turn)',
					whiteSpace: 'nowrap',
					transition: ['all', transitionDuration + 'ms', _this3.animationEasing, transitionDelay + 'ms'].join(' ')
				}
			}, text);
		}));
	},
	canvasRenderer: function canvasRenderer(createElement) {
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		this.boundedWords.forEach(function (_ref19) {
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
			    rectHeight = _ref19.rectHeight;

			ctx.save();
			ctx.font = [fontStyle, fontVariant, fontWeight, fontSize + 'px', fontFamily].join(' ');
			ctx.fillStyle = color;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText(text, 0, 0);
			ctx.translate(rectLeft + rectWidth / 2, rectTop + rectHeight / 2);
			ctx.rotate(Math_convertTurnToRad(rotation));
			ctx.restore();
		});
		return canvas;
	},
	svgRenderer: function svgRenderer(createElement) {
		// todo?
	}
};

(function () {
	var CancelableContext = function () {
		function CancelableContext() {
			classCallCheck(this, CancelableContext);

			this.canceled = false;
		}

		createClass(CancelableContext, [{
			key: 'cancel',
			value: function cancel() {
				this.canceled = true;
			}
		}, {
			key: 'throwIfCanceled',
			value: function throwIfCanceled() {
				if (this.canceled) {
					throw new CancelError();
				}
			}
		}, {
			key: 'delayIfNotCanceled',
			value: function () {
				var _ref20 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ms) {
					return regeneratorRuntime.wrap(function _callee4$(_context5) {
						while (1) {
							switch (_context5.prev = _context5.next) {
								case 0:
									this.throwIfCanceled();
									_context5.next = 3;
									return Promise_delay(ms);

								case 3:
									this.throwIfCanceled();

								case 4:
								case 'end':
									return _context5.stop();
							}
						}
					}, _callee4, this);
				}));

				function delayIfNotCanceled(_x16) {
					return _ref20.apply(this, arguments);
				}

				return delayIfNotCanceled;
			}()
		}]);
		return CancelableContext;
	}();

	var prefixA = 'duqugwtjleyi$';
	var prefixB = 'xvvzxtpxrfjr$';

	Object.entries(asyncComputed).forEach(function (_ref21) {
		var _Object$assign;

		var _ref22 = slicedToArray(_ref21, 2),
		    key = _ref22[0],
		    def = _ref22[1];

		var keyA = prefixA + key;
		var keyB = prefixB + key;

		Object.assign(computed, (_Object$assign = {}, defineProperty(_Object$assign, keyA, function () {
			return this[keyB]();
		}), defineProperty(_Object$assign, keyB, function () {
			var outerContext = void 0;
			return function () {
				var _ref23 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
					var _def$get;

					for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
						args[_key2] = arguments[_key2];
					}

					var innerContext, returns;
					return regeneratorRuntime.wrap(function _callee5$(_context6) {
						while (1) {
							switch (_context6.prev = _context6.next) {
								case 0:
									if (outerContext) {
										outerContext.cancel();
									}
									innerContext = outerContext = new CancelableContext();
									_context6.next = 4;
									return (_def$get = def.get).call.apply(_def$get, [this, innerContext].concat(args));

								case 4:
									returns = _context6.sent;

									innerContext.throwIfCanceled();
									return _context6.abrupt('return', returns);

								case 7:
								case 'end':
									return _context6.stop();
							}
						}
					}, _callee5, this);
				}));

				return function () {
					return _ref23.apply(this, arguments);
				};
			}();
		}), _Object$assign));
		Object.assign(watch, defineProperty({}, keyA, {
			handler: function handler(promise) {
				var _this4 = this;

				return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
					return regeneratorRuntime.wrap(function _callee6$(_context7) {
						while (1) {
							switch (_context7.prev = _context7.next) {
								case 0:
									_context7.prev = 0;
									_context7.next = 3;
									return promise;

								case 3:
									_this4[key] = _context7.sent;
									_context7.next = 8;
									break;

								case 6:
									_context7.prev = 6;
									_context7.t0 = _context7['catch'](0);

								case 8:
								case 'end':
									return _context7.stop();
							}
						}
					}, _callee6, _this4, [[0, 6]]);
				}))();
			},

			immediate: true
		}));
	});
})();

(function () {
	var prefixA = 'wkoojrkxgnng$';
	var prefixB = 'ozyvltnleyhp$';

	Object.entries(invokePeriodically).forEach(function (_ref24) {
		var _Object$assign4;

		var _ref25 = slicedToArray(_ref24, 2),
		    key = _ref25[0],
		    def = _ref25[1];

		var keyA = prefixA + key;
		var keyB = prefixB + key;

		Object.assign(methods, defineProperty({}, key, def.method));
		Object.assign(computed, (_Object$assign4 = {}, defineProperty(_Object$assign4, keyA, function () {
			return this[keyB]();
		}), defineProperty(_Object$assign4, keyB, function () {
			var id = void 0;
			return function () {
				var _this5 = this;

				clearTimeout(id);
				var tvrsadrhbmtf = function tvrsadrhbmtf() {
					if (!_this5.destroyed) {
						id = setTimeout(tvrsadrhbmtf, Function_isFunction(def.interval) ? def.interval.call(_this5) : def.interval);
						_this5[key]();
					}
				};
				tvrsadrhbmtf();
			};
		}), _Object$assign4));
		Object.assign(watch, defineProperty({}, keyA, {
			handler: function handler() {},
			immediate: true }));
	});
})();

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

		color: {
			type: [String, Function],
			default: 'Black'
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
		var _this6 = this;

		var data = {
			mounted: false,
			destroyed: false,
			animatedBoundedWords: [],
			containerWidth: 0,
			containerHeight: 0
		};
		Object.entries(asyncComputed).forEach(function (_ref26) {
			var _ref27 = slicedToArray(_ref26, 2),
			    key = _ref27[0],
			    def = _ref27[1];

			data[key] = Function_isFunction(def.default) ? def.default.call(_this6) : def.default;
		});
		return data;
	},
	mounted: function mounted() {
		this.mounted = true;
	},
	beforeDestroy: function beforeDestroy() {
		this.destroyed = true;
	},


	computed: computed,
	watch: watch,
	methods: methods
};

module.exports = VueWordCloud;
