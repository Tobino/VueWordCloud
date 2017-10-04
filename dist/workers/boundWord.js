(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('babel-runtime/helpers/slicedToArray'), require('babel-runtime/helpers/typeof'), require('babel-runtime/core-js/get-iterator'), require('babel-runtime/core-js/promise'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/regenerator')) :
	typeof define === 'function' && define.amd ? define(['babel-runtime/helpers/slicedToArray', 'babel-runtime/helpers/typeof', 'babel-runtime/core-js/get-iterator', 'babel-runtime/core-js/promise', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/regenerator'], factory) :
	(factory(global._slicedToArray,global._typeof,global._getIterator,global._Promise,global._asyncToGenerator,global._classCallCheck,global._createClass,global._regeneratorRuntime));
}(this, (function (_slicedToArray,_typeof,_getIterator,_Promise,_asyncToGenerator,_classCallCheck,_createClass,_regeneratorRuntime) { 'use strict';

_slicedToArray = _slicedToArray && _slicedToArray.hasOwnProperty('default') ? _slicedToArray['default'] : _slicedToArray;
_typeof = _typeof && _typeof.hasOwnProperty('default') ? _typeof['default'] : _typeof;
_getIterator = _getIterator && _getIterator.hasOwnProperty('default') ? _getIterator['default'] : _getIterator;
_Promise = _Promise && _Promise.hasOwnProperty('default') ? _Promise['default'] : _Promise;
_asyncToGenerator = _asyncToGenerator && _asyncToGenerator.hasOwnProperty('default') ? _asyncToGenerator['default'] : _asyncToGenerator;
_classCallCheck = _classCallCheck && _classCallCheck.hasOwnProperty('default') ? _classCallCheck['default'] : _classCallCheck;
_createClass = _createClass && _createClass.hasOwnProperty('default') ? _createClass['default'] : _createClass;
_regeneratorRuntime = _regeneratorRuntime && _regeneratorRuntime.hasOwnProperty('default') ? _regeneratorRuntime['default'] : _regeneratorRuntime;

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

})));
