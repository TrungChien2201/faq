(function () {
  var loadScript = function (url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";

    // If the browser is Internet Explorer.
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
      // For any other browser.
    } else {
      script.onload = function () {
        callback();
      };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  var initTestimonialSliderLibrary = function (jQuery) {
    !function (e) { "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery) }(function (e) { e.ui = e.ui || {}, e.ui.version = "1.12.1"; var t = 0, i = Array.prototype.slice; e.cleanData = function (t) { return function (i) { var s, n, a; for (a = 0; null != (n = i[a]); a++)try { (s = e._data(n, "events")) && s.remove && e(n).triggerHandler("remove") } catch (e) { } t(i) } }(e.cleanData), e.widget = function (t, i, s) { var n, a, o, h = {}, u = t.split(".")[0], r = u + "-" + (t = t.split(".")[1]); return s || (s = i, i = e.Widget), e.isArray(s) && (s = e.extend.apply(null, [{}].concat(s))), e.expr[":"][r.toLowerCase()] = function (t) { return !!e.data(t, r) }, e[u] = e[u] || {}, n = e[u][t], a = e[u][t] = function (e, t) { return this._createWidget ? void (arguments.length && this._createWidget(e, t)) : new a(e, t) }, e.extend(a, n, { version: s.version, _proto: e.extend({}, s), _childConstructors: [] }), (o = new i).options = e.widget.extend({}, o.options), e.each(s, function (t, s) { return e.isFunction(s) ? void (h[t] = function () { function e() { return i.prototype[t].apply(this, arguments) } function n(e) { return i.prototype[t].apply(this, e) } return function () { var t, i = this._super, a = this._superApply; return this._super = e, this._superApply = n, t = s.apply(this, arguments), this._super = i, this._superApply = a, t } }()) : void (h[t] = s) }), a.prototype = e.widget.extend(o, { widgetEventPrefix: n && o.widgetEventPrefix || t }, h, { constructor: a, namespace: u, widgetName: t, widgetFullName: r }), n ? (e.each(n._childConstructors, function (t, i) { var s = i.prototype; e.widget(s.namespace + "." + s.widgetName, a, i._proto) }), delete n._childConstructors) : i._childConstructors.push(a), e.widget.bridge(t, a), a }, e.widget.extend = function (t) { for (var s, n, a = i.call(arguments, 1), o = 0, h = a.length; h > o; o++)for (s in a[o]) n = a[o][s], a[o].hasOwnProperty(s) && void 0 !== n && (t[s] = e.isPlainObject(n) ? e.isPlainObject(t[s]) ? e.widget.extend({}, t[s], n) : e.widget.extend({}, n) : n); return t }, e.widget.bridge = function (t, s) { var n = s.prototype.widgetFullName || t; e.fn[t] = function (a) { var o = "string" == typeof a, h = i.call(arguments, 1), u = this; return o ? this.length || "instance" !== a ? this.each(function () { var i, s = e.data(this, n); return "instance" === a ? (u = s, !1) : s ? e.isFunction(s[a]) && "_" !== a.charAt(0) ? (i = s[a].apply(s, h)) !== s && void 0 !== i ? (u = i && i.jquery ? u.pushStack(i.get()) : i, !1) : void 0 : e.error("no such method '" + a + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; attempted to call method '" + a + "'") }) : u = void 0 : (h.length && (a = e.widget.extend.apply(null, [a].concat(h))), this.each(function () { var t = e.data(this, n); t ? (t.option(a || {}), t._init && t._init()) : e.data(this, n, new s(a, this)) })), u } }, e.Widget = function () { }, e.Widget._childConstructors = [], e.Widget.prototype = { widgetName: "widget", widgetEventPrefix: "", defaultElement: "<div>", options: { classes: {}, disabled: !1, create: null }, _createWidget: function (i, s) { s = e(s || this.defaultElement || this)[0], this.element = e(s), this.uuid = t++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = e(), this.hoverable = e(), this.focusable = e(), this.classesElementLookup = {}, s !== this && (e.data(s, this.widgetFullName, this), this._on(!0, this.element, { remove: function (e) { e.target === s && this.destroy() } }), this.document = e(s.style ? s.ownerDocument : s.document || s), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), i), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), this._init() }, _getCreateOptions: function () { return {} }, _getCreateEventData: e.noop, _create: e.noop, _init: e.noop, destroy: function () { var t = this; this._destroy(), e.each(this.classesElementLookup, function (e, i) { t._removeClass(i, e) }), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), this.bindings.off(this.eventNamespace) }, _destroy: e.noop, widget: function () { return this.element }, option: function (t, i) { var s, n, a, o = t; if (0 === arguments.length) return e.widget.extend({}, this.options); if ("string" == typeof t) if (o = {}, s = t.split("."), t = s.shift(), s.length) { for (n = o[t] = e.widget.extend({}, this.options[t]), a = 0; s.length - 1 > a; a++)n[s[a]] = n[s[a]] || {}, n = n[s[a]]; if (t = s.pop(), 1 === arguments.length) return void 0 === n[t] ? null : n[t]; n[t] = i } else { if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t]; o[t] = i } return this._setOptions(o), this }, _setOptions: function (e) { var t; for (t in e) this._setOption(t, e[t]); return this }, _setOption: function (e, t) { return "classes" === e && this._setOptionClasses(t), this.options[e] = t, "disabled" === e && this._setOptionDisabled(t), this }, _setOptionClasses: function (t) { var i, s, n; for (i in t) n = this.classesElementLookup[i], t[i] !== this.options.classes[i] && n && n.length && (s = e(n.get()), this._removeClass(n, i), s.addClass(this._classes({ element: s, keys: i, classes: t, add: !0 }))) }, _setOptionDisabled: function (e) { this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!e), e && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus")) }, enable: function () { return this._setOptions({ disabled: !1 }) }, disable: function () { return this._setOptions({ disabled: !0 }) }, _classes: function (t) { function i(i, a) { var o, h; for (h = 0; i.length > h; h++)o = n.classesElementLookup[i[h]] || e(), o = t.add ? e(e.unique(o.get().concat(t.element.get()))) : e(o.not(t.element).get()), n.classesElementLookup[i[h]] = o, s.push(i[h]), a && t.classes[i[h]] && s.push(t.classes[i[h]]) } var s = [], n = this; return t = e.extend({ element: this.element, classes: this.options.classes || {} }, t), this._on(t.element, { remove: "_untrackClassesElement" }), t.keys && i(t.keys.match(/\S+/g) || [], !0), t.extra && i(t.extra.match(/\S+/g) || []), s.join(" ") }, _untrackClassesElement: function (t) { var i = this; e.each(i.classesElementLookup, function (s, n) { -1 !== e.inArray(t.target, n) && (i.classesElementLookup[s] = e(n.not(t.target).get())) }) }, _removeClass: function (e, t, i) { return this._toggleClass(e, t, i, !1) }, _addClass: function (e, t, i) { return this._toggleClass(e, t, i, !0) }, _toggleClass: function (e, t, i, s) { s = "boolean" == typeof s ? s : i; var n = "string" == typeof e || null === e, a = { extra: n ? t : i, keys: n ? e : t, element: n ? this.element : e, add: s }; return a.element.toggleClass(this._classes(a), s), this }, _on: function (t, i, s) { var n, a = this; "boolean" != typeof t && (s = i, i = t, t = !1), s ? (i = n = e(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), e.each(s, function (s, o) { function h() { return t || !0 !== a.options.disabled && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? a[o] : o).apply(a, arguments) : void 0 } "string" != typeof o && (h.guid = o.guid = o.guid || h.guid || e.guid++); var u = s.match(/^([\w:-]*)\s*(.*)$/), r = u[1] + a.eventNamespace, l = u[2]; l ? n.on(r, l, h) : i.on(r, h) }) }, _off: function (t, i) { i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.off(i).off(i), this.bindings = e(this.bindings.not(t).get()), this.focusable = e(this.focusable.not(t).get()), this.hoverable = e(this.hoverable.not(t).get()) }, _delay: function (e, t) { var i = this; return setTimeout(function () { return ("string" == typeof e ? i[e] : e).apply(i, arguments) }, t || 0) }, _hoverable: function (t) { this.hoverable = this.hoverable.add(t), this._on(t, { mouseenter: function (t) { this._addClass(e(t.currentTarget), null, "ui-state-hover") }, mouseleave: function (t) { this._removeClass(e(t.currentTarget), null, "ui-state-hover") } }) }, _focusable: function (t) { this.focusable = this.focusable.add(t), this._on(t, { focusin: function (t) { this._addClass(e(t.currentTarget), null, "ui-state-focus") }, focusout: function (t) { this._removeClass(e(t.currentTarget), null, "ui-state-focus") } }) }, _trigger: function (t, i, s) { var n, a, o = this.options[t]; if (s = s || {}, (i = e.Event(i)).type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], a = i.originalEvent) for (n in a) n in i || (i[n] = a[n]); return this.element.trigger(i, s), !(e.isFunction(o) && !1 === o.apply(this.element[0], [i].concat(s)) || i.isDefaultPrevented()) } }, e.each({ show: "fadeIn", hide: "fadeOut" }, function (t, i) { e.Widget.prototype["_" + t] = function (s, n, a) { "string" == typeof n && (n = { effect: n }); var o, h = n ? !0 === n || "number" == typeof n ? i : n.effect || i : t; "number" == typeof (n = n || {}) && (n = { duration: n }), o = !e.isEmptyObject(n), n.complete = a, n.delay && s.delay(n.delay), o && e.effects && e.effects.effect[h] ? s[t](n) : h !== t && s[h] ? s[h](n.duration, n.easing, a) : s.queue(function (i) { e(this)[t](), a && a.call(s[0]), i() }) } }), e.widget, e.ui.keyCode = { BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38 }, e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()); var s = !1; e(document).on("mouseup", function () { s = !1 }), e.widget("ui.mouse", { version: "1.12.1", options: { cancel: "input, textarea, button, select, option", distance: 1, delay: 0 }, _mouseInit: function () { var t = this; this.element.on("mousedown." + this.widgetName, function (e) { return t._mouseDown(e) }).on("click." + this.widgetName, function (i) { return !0 === e.data(i.target, t.widgetName + ".preventClickEvent") ? (e.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0 }), this.started = !1 }, _mouseDestroy: function () { this.element.off("." + this.widgetName), this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate) }, _mouseDown: function (t) { if (!s) { this._mouseMoved = !1, this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t; var i = this, n = 1 === t.which, a = !("string" != typeof this.options.cancel || !t.target.nodeName) && e(t.target).closest(this.options.cancel).length; return !(n && !a && this._mouseCapture(t)) || (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () { i.mouseDelayMet = !0 }, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = !1 !== this._mouseStart(t), !this._mouseStarted) ? (t.preventDefault(), !0) : (!0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (e) { return i._mouseMove(e) }, this._mouseUpDelegate = function (e) { return i._mouseUp(e) }, this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), s = !0, !0)) } }, _mouseMove: function (t) { if (this._mouseMoved) { if (e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button) return this._mouseUp(t); if (!t.which) if (t.originalEvent.altKey || t.originalEvent.ctrlKey || t.originalEvent.metaKey || t.originalEvent.shiftKey) this.ignoreMissingWhich = !0; else if (!this.ignoreMissingWhich) return this._mouseUp(t) } return (t.which || t.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, t), this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) }, _mouseUp: function (t) { this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer), this.ignoreMissingWhich = !1, s = !1, t.preventDefault() }, _mouseDistanceMet: function (e) { return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance }, _mouseDelayMet: function () { return this.mouseDelayMet }, _mouseStart: function () { }, _mouseDrag: function () { }, _mouseStop: function () { }, _mouseCapture: function () { return !0 } }), e.widget("ui.slider", e.ui.mouse, { version: "1.12.1", widgetEventPrefix: "slide", options: { animate: !1, classes: { "ui-slider": "ui-corner-all", "ui-slider-handle": "ui-corner-all", "ui-slider-range": "ui-corner-all ui-widget-header" }, distance: 0, max: 100, min: 0, orientation: "horizontal", range: !1, step: 1, value: 0, values: null, change: null, slide: null, start: null, stop: null }, numPages: 5, _create: function () { this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content"), this._refresh(), this._animateOff = !1 }, _refresh: function () { this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue() }, _createHandles: function () { var t, i, s = this.options, n = this.element.find(".ui-slider-handle"), a = []; for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), t = n.length; i > t; t++)a.push("<span tabindex='0'></span>"); this.handles = n.add(e(a.join("")).appendTo(this.element)), this._addClass(this.handles, "ui-slider-handle", "ui-state-default"), this.handle = this.handles.eq(0), this.handles.each(function (t) { e(this).data("ui-slider-handle-index", t).attr("tabIndex", 0) }) }, _createRange: function () { var t = this.options; t.range ? (!0 === t.range && (t.values ? t.values.length && 2 !== t.values.length ? t.values = [t.values[0], t.values[0]] : e.isArray(t.values) && (t.values = t.values.slice(0)) : t.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? (this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max"), this.range.css({ left: "", bottom: "" })) : (this.range = e("<div>").appendTo(this.element), this._addClass(this.range, "ui-slider-range")), ("min" === t.range || "max" === t.range) && this._addClass(this.range, "ui-slider-range-" + t.range)) : (this.range && this.range.remove(), this.range = null) }, _setupEvents: function () { this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles) }, _destroy: function () { this.handles.remove(), this.range && this.range.remove(), this._mouseDestroy() }, _mouseCapture: function (t) { var i, s, n, a, o, h, u, r = this, l = this.options; return !l.disabled && (this.elementSize = { width: this.element.outerWidth(), height: this.element.outerHeight() }, this.elementOffset = this.element.offset(), i = { x: t.pageX, y: t.pageY }, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function (t) { var i = Math.abs(s - r.values(t)); (n > i || n === i && (t === r._lastChangedValue || r.values(t) === l.min)) && (n = i, a = e(this), o = t) }), !1 !== this._start(t, o) && (this._mouseSliding = !0, this._handleIndex = o, this._addClass(a, null, "ui-state-active"), a.trigger("focus"), h = a.offset(), u = !e(t.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = u ? { left: 0, top: 0 } : { left: t.pageX - h.left - a.width() / 2, top: t.pageY - h.top - a.height() / 2 - (parseInt(a.css("borderTopWidth"), 10) || 0) - (parseInt(a.css("borderBottomWidth"), 10) || 0) + (parseInt(a.css("marginTop"), 10) || 0) }, this.handles.hasClass("ui-state-hover") || this._slide(t, o, s), this._animateOff = !0, !0)) }, _mouseStart: function () { return !0 }, _mouseDrag: function (e) { var t = { x: e.pageX, y: e.pageY }, i = this._normValueFromMouse(t); return this._slide(e, this._handleIndex, i), !1 }, _mouseStop: function (e) { return this._removeClass(this.handles, null, "ui-state-active"), this._mouseSliding = !1, this._stop(e, this._handleIndex), this._change(e, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1 }, _detectOrientation: function () { this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal" }, _normValueFromMouse: function (e) { var t, i, s, n, a; return "horizontal" === this.orientation ? (t = this.elementSize.width, i = e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (t = this.elementSize.height, i = e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), (s = i / t) > 1 && (s = 1), 0 > s && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), a = this._valueMin() + s * n, this._trimAlignValue(a) }, _uiHash: function (e, t, i) { var s = { handle: this.handles[e], handleIndex: e, value: void 0 !== t ? t : this.value() }; return this._hasMultipleValues() && (s.value = void 0 !== t ? t : this.values(e), s.values = i || this.values()), s }, _hasMultipleValues: function () { return this.options.values && this.options.values.length }, _start: function (e, t) { return this._trigger("start", e, this._uiHash(t)) }, _slide: function (e, t, i) { var s, n = this.value(), a = this.values(); this._hasMultipleValues() && (s = this.values(t ? 0 : 1), n = this.values(t), 2 === this.options.values.length && !0 === this.options.range && (i = 0 === t ? Math.min(s, i) : Math.max(s, i)), a[t] = i), i !== n && (!1 !== this._trigger("slide", e, this._uiHash(t, i, a)) && (this._hasMultipleValues() ? this.values(t, i) : this.value(i))) }, _stop: function (e, t) { this._trigger("stop", e, this._uiHash(t)) }, _change: function (e, t) { this._keySliding || this._mouseSliding || (this._lastChangedValue = t, this._trigger("change", e, this._uiHash(t))) }, value: function (e) { return arguments.length ? (this.options.value = this._trimAlignValue(e), this._refreshValue(), void this._change(null, 0)) : this._value() }, values: function (t, i) { var s, n, a; if (arguments.length > 1) return this.options.values[t] = this._trimAlignValue(i), this._refreshValue(), void this._change(null, t); if (!arguments.length) return this._values(); if (!e.isArray(arguments[0])) return this._hasMultipleValues() ? this._values(t) : this.value(); for (s = this.options.values, n = arguments[0], a = 0; s.length > a; a += 1)s[a] = this._trimAlignValue(n[a]), this._change(null, a); this._refreshValue() }, _setOption: function (t, i) { var s, n = 0; switch ("range" === t && !0 === this.options.range && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), e.isArray(this.options.values) && (n = this.options.values.length), this._super(t, i), t) { case "orientation": this._detectOrientation(), this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation), this._refreshValue(), this.options.range && this._refreshRange(i), this.handles.css("horizontal" === i ? "bottom" : "left", ""); break; case "value": this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1; break; case "values": for (this._animateOff = !0, this._refreshValue(), s = n - 1; s >= 0; s--)this._change(null, s); this._animateOff = !1; break; case "step": case "min": case "max": this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1; break; case "range": this._animateOff = !0, this._refresh(), this._animateOff = !1 } }, _setOptionDisabled: function (e) { this._super(e), this._toggleClass(null, "ui-state-disabled", !!e) }, _value: function () { var e = this.options.value; return this._trimAlignValue(e) }, _values: function (e) { var t, i, s; if (arguments.length) return t = this.options.values[e], this._trimAlignValue(t); if (this._hasMultipleValues()) { for (i = this.options.values.slice(), s = 0; i.length > s; s += 1)i[s] = this._trimAlignValue(i[s]); return i } return [] }, _trimAlignValue: function (e) { if (this._valueMin() >= e) return this._valueMin(); if (e >= this._valueMax()) return this._valueMax(); var t = this.options.step > 0 ? this.options.step : 1, i = (e - this._valueMin()) % t, s = e - i; return 2 * Math.abs(i) >= t && (s += i > 0 ? t : -t), parseFloat(s.toFixed(5)) }, _calculateNewMax: function () { var e = this.options.max, t = this._valueMin(), i = this.options.step; (e = Math.round((e - t) / i) * i + t) > this.options.max && (e -= i), this.max = parseFloat(e.toFixed(this._precision())) }, _precision: function () { var e = this._precisionOf(this.options.step); return null !== this.options.min && (e = Math.max(e, this._precisionOf(this.options.min))), e }, _precisionOf: function (e) { var t = "" + e, i = t.indexOf("."); return -1 === i ? 0 : t.length - i - 1 }, _valueMin: function () { return this.options.min }, _valueMax: function () { return this.max }, _refreshRange: function (e) { "vertical" === e && this.range.css({ width: "", left: "" }), "horizontal" === e && this.range.css({ height: "", bottom: "" }) }, _refreshValue: function () { var t, i, s, n, a, o = this.options.range, h = this.options, u = this, r = !this._animateOff && h.animate, l = {}; this._hasMultipleValues() ? this.handles.each(function (s) { i = (u.values(s) - u._valueMin()) / (u._valueMax() - u._valueMin()) * 100, l["horizontal" === u.orientation ? "left" : "bottom"] = i + "%", e(this).stop(1, 1)[r ? "animate" : "css"](l, h.animate), !0 === u.options.range && ("horizontal" === u.orientation ? (0 === s && u.range.stop(1, 1)[r ? "animate" : "css"]({ left: i + "%" }, h.animate), 1 === s && u.range[r ? "animate" : "css"]({ width: i - t + "%" }, { queue: !1, duration: h.animate })) : (0 === s && u.range.stop(1, 1)[r ? "animate" : "css"]({ bottom: i + "%" }, h.animate), 1 === s && u.range[r ? "animate" : "css"]({ height: i - t + "%" }, { queue: !1, duration: h.animate }))), t = i }) : (s = this.value(), n = this._valueMin(), a = this._valueMax(), i = a !== n ? (s - n) / (a - n) * 100 : 0, l["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[r ? "animate" : "css"](l, h.animate), "min" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[r ? "animate" : "css"]({ width: i + "%" }, h.animate), "max" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[r ? "animate" : "css"]({ width: 100 - i + "%" }, h.animate), "min" === o && "vertical" === this.orientation && this.range.stop(1, 1)[r ? "animate" : "css"]({ height: i + "%" }, h.animate), "max" === o && "vertical" === this.orientation && this.range.stop(1, 1)[r ? "animate" : "css"]({ height: 100 - i + "%" }, h.animate)) }, _handleEvents: { keydown: function (t) { var i, s, n, a = e(t.target).data("ui-slider-handle-index"); switch (t.keyCode) { case e.ui.keyCode.HOME: case e.ui.keyCode.END: case e.ui.keyCode.PAGE_UP: case e.ui.keyCode.PAGE_DOWN: case e.ui.keyCode.UP: case e.ui.keyCode.RIGHT: case e.ui.keyCode.DOWN: case e.ui.keyCode.LEFT: if (t.preventDefault(), !this._keySliding && (this._keySliding = !0, this._addClass(e(t.target), null, "ui-state-active"), !1 === this._start(t, a))) return }switch (n = this.options.step, i = s = this._hasMultipleValues() ? this.values(a) : this.value(), t.keyCode) { case e.ui.keyCode.HOME: s = this._valueMin(); break; case e.ui.keyCode.END: s = this._valueMax(); break; case e.ui.keyCode.PAGE_UP: s = this._trimAlignValue(i + (this._valueMax() - this._valueMin()) / this.numPages); break; case e.ui.keyCode.PAGE_DOWN: s = this._trimAlignValue(i - (this._valueMax() - this._valueMin()) / this.numPages); break; case e.ui.keyCode.UP: case e.ui.keyCode.RIGHT: if (i === this._valueMax()) return; s = this._trimAlignValue(i + n); break; case e.ui.keyCode.DOWN: case e.ui.keyCode.LEFT: if (i === this._valueMin()) return; s = this._trimAlignValue(i - n) }this._slide(t, a, s) }, keyup: function (t) { var i = e(t.target).data("ui-slider-handle-index"); this._keySliding && (this._keySliding = !1, this._stop(t, i), this._change(t, i), this._removeClass(e(t.target), null, "ui-state-active")) } } }) });
    !function (e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Swiper = t() }(this, (function () { "use strict"; var e = "undefined" == typeof document ? { body: {}, addEventListener: function () { }, removeEventListener: function () { }, activeElement: { blur: function () { }, nodeName: "" }, querySelector: function () { return null }, querySelectorAll: function () { return [] }, getElementById: function () { return null }, createEvent: function () { return { initEvent: function () { } } }, createElement: function () { return { children: [], childNodes: [], style: {}, setAttribute: function () { }, getElementsByTagName: function () { return [] } } }, location: { hash: "" } } : document, t = "undefined" == typeof window ? { document: e, navigator: { userAgent: "" }, location: {}, history: {}, CustomEvent: function () { return this }, addEventListener: function () { }, removeEventListener: function () { }, getComputedStyle: function () { return { getPropertyValue: function () { return "" } } }, Image: function () { }, Date: function () { }, screen: {}, setTimeout: function () { }, clearTimeout: function () { } } : window, i = function (e) { for (var t = 0; t < e.length; t += 1)this[t] = e[t]; return this.length = e.length, this }; function s(s, a) { var r = [], n = 0; if (s && !a && s instanceof i) return s; if (s) if ("string" == typeof s) { var o, l, d = s.trim(); if (d.indexOf("<") >= 0 && d.indexOf(">") >= 0) { var h = "div"; for (0 === d.indexOf("<li") && (h = "ul"), 0 === d.indexOf("<tr") && (h = "tbody"), 0 !== d.indexOf("<td") && 0 !== d.indexOf("<th") || (h = "tr"), 0 === d.indexOf("<tbody") && (h = "table"), 0 === d.indexOf("<option") && (h = "select"), (l = e.createElement(h)).innerHTML = d, n = 0; n < l.childNodes.length; n += 1)r.push(l.childNodes[n]) } else for (o = a || "#" !== s[0] || s.match(/[ .<>:~]/) ? (a || e).querySelectorAll(s.trim()) : [e.getElementById(s.trim().split("#")[1])], n = 0; n < o.length; n += 1)o[n] && r.push(o[n]) } else if (s.nodeType || s === t || s === e) r.push(s); else if (s.length > 0 && s[0].nodeType) for (n = 0; n < s.length; n += 1)r.push(s[n]); return new i(r) } function a(e) { for (var t = [], i = 0; i < e.length; i += 1)-1 === t.indexOf(e[i]) && t.push(e[i]); return t } s.fn = i.prototype, s.Class = i, s.Dom7 = i; var r = { addClass: function (e) { if (void 0 === e) return this; for (var t = e.split(" "), i = 0; i < t.length; i += 1)for (var s = 0; s < this.length; s += 1)void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.add(t[i]); return this }, removeClass: function (e) { for (var t = e.split(" "), i = 0; i < t.length; i += 1)for (var s = 0; s < this.length; s += 1)void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.remove(t[i]); return this }, hasClass: function (e) { return !!this[0] && this[0].classList.contains(e) }, toggleClass: function (e) { for (var t = e.split(" "), i = 0; i < t.length; i += 1)for (var s = 0; s < this.length; s += 1)void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.toggle(t[i]); return this }, attr: function (e, t) { var i = arguments; if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0; for (var s = 0; s < this.length; s += 1)if (2 === i.length) this[s].setAttribute(e, t); else for (var a in e) this[s][a] = e[a], this[s].setAttribute(a, e[a]); return this }, removeAttr: function (e) { for (var t = 0; t < this.length; t += 1)this[t].removeAttribute(e); return this }, data: function (e, t) { var i; if (void 0 !== t) { for (var s = 0; s < this.length; s += 1)(i = this[s]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), i.dom7ElementDataStorage[e] = t; return this } if (i = this[0]) { if (i.dom7ElementDataStorage && e in i.dom7ElementDataStorage) return i.dom7ElementDataStorage[e]; var a = i.getAttribute("data-" + e); return a || void 0 } }, transform: function (e) { for (var t = 0; t < this.length; t += 1) { var i = this[t].style; i.webkitTransform = e, i.transform = e } return this }, transition: function (e) { "string" != typeof e && (e += "ms"); for (var t = 0; t < this.length; t += 1) { var i = this[t].style; i.webkitTransitionDuration = e, i.transitionDuration = e } return this }, on: function () { for (var e, t = [], i = arguments.length; i--;)t[i] = arguments[i]; var a = t[0], r = t[1], n = t[2], o = t[3]; function l(e) { var t = e.target; if (t) { var i = e.target.dom7EventData || []; if (i.indexOf(e) < 0 && i.unshift(e), s(t).is(r)) n.apply(t, i); else for (var a = s(t).parents(), o = 0; o < a.length; o += 1)s(a[o]).is(r) && n.apply(a[o], i) } } function d(e) { var t = e && e.target && e.target.dom7EventData || []; t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t) } "function" == typeof t[1] && (a = (e = t)[0], n = e[1], o = e[2], r = void 0), o || (o = !1); for (var h, p = a.split(" "), c = 0; c < this.length; c += 1) { var u = this[c]; if (r) for (h = 0; h < p.length; h += 1) { var v = p[h]; u.dom7LiveListeners || (u.dom7LiveListeners = {}), u.dom7LiveListeners[v] || (u.dom7LiveListeners[v] = []), u.dom7LiveListeners[v].push({ listener: n, proxyListener: l }), u.addEventListener(v, l, o) } else for (h = 0; h < p.length; h += 1) { var f = p[h]; u.dom7Listeners || (u.dom7Listeners = {}), u.dom7Listeners[f] || (u.dom7Listeners[f] = []), u.dom7Listeners[f].push({ listener: n, proxyListener: d }), u.addEventListener(f, d, o) } } return this }, off: function () { for (var e, t = [], i = arguments.length; i--;)t[i] = arguments[i]; var s = t[0], a = t[1], r = t[2], n = t[3]; "function" == typeof t[1] && (s = (e = t)[0], r = e[1], n = e[2], a = void 0), n || (n = !1); for (var o = s.split(" "), l = 0; l < o.length; l += 1)for (var d = o[l], h = 0; h < this.length; h += 1) { var p = this[h], c = void 0; if (!a && p.dom7Listeners ? c = p.dom7Listeners[d] : a && p.dom7LiveListeners && (c = p.dom7LiveListeners[d]), c && c.length) for (var u = c.length - 1; u >= 0; u -= 1) { var v = c[u]; r && v.listener === r ? (p.removeEventListener(d, v.proxyListener, n), c.splice(u, 1)) : r && v.listener && v.listener.dom7proxy && v.listener.dom7proxy === r ? (p.removeEventListener(d, v.proxyListener, n), c.splice(u, 1)) : r || (p.removeEventListener(d, v.proxyListener, n), c.splice(u, 1)) } } return this }, trigger: function () { for (var i = [], s = arguments.length; s--;)i[s] = arguments[s]; for (var a = i[0].split(" "), r = i[1], n = 0; n < a.length; n += 1)for (var o = a[n], l = 0; l < this.length; l += 1) { var d = this[l], h = void 0; try { h = new t.CustomEvent(o, { detail: r, bubbles: !0, cancelable: !0 }) } catch (t) { (h = e.createEvent("Event")).initEvent(o, !0, !0), h.detail = r } d.dom7EventData = i.filter((function (e, t) { return t > 0 })), d.dispatchEvent(h), d.dom7EventData = [], delete d.dom7EventData } return this }, transitionEnd: function (e) { var t, i = ["webkitTransitionEnd", "transitionend"], s = this; function a(r) { if (r.target === this) for (e.call(this, r), t = 0; t < i.length; t += 1)s.off(i[t], a) } if (e) for (t = 0; t < i.length; t += 1)s.on(i[t], a); return this }, outerWidth: function (e) { if (this.length > 0) { if (e) { var t = this.styles(); return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left")) } return this[0].offsetWidth } return null }, outerHeight: function (e) { if (this.length > 0) { if (e) { var t = this.styles(); return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom")) } return this[0].offsetHeight } return null }, offset: function () { if (this.length > 0) { var i = this[0], s = i.getBoundingClientRect(), a = e.body, r = i.clientTop || a.clientTop || 0, n = i.clientLeft || a.clientLeft || 0, o = i === t ? t.scrollY : i.scrollTop, l = i === t ? t.scrollX : i.scrollLeft; return { top: s.top + o - r, left: s.left + l - n } } return null }, css: function (e, i) { var s; if (1 === arguments.length) { if ("string" != typeof e) { for (s = 0; s < this.length; s += 1)for (var a in e) this[s].style[a] = e[a]; return this } if (this[0]) return t.getComputedStyle(this[0], null).getPropertyValue(e) } if (2 === arguments.length && "string" == typeof e) { for (s = 0; s < this.length; s += 1)this[s].style[e] = i; return this } return this }, each: function (e) { if (!e) return this; for (var t = 0; t < this.length; t += 1)if (!1 === e.call(this[t], t, this[t])) return this; return this }, html: function (e) { if (void 0 === e) return this[0] ? this[0].innerHTML : void 0; for (var t = 0; t < this.length; t += 1)this[t].innerHTML = e; return this }, text: function (e) { if (void 0 === e) return this[0] ? this[0].textContent.trim() : null; for (var t = 0; t < this.length; t += 1)this[t].textContent = e; return this }, is: function (a) { var r, n, o = this[0]; if (!o || void 0 === a) return !1; if ("string" == typeof a) { if (o.matches) return o.matches(a); if (o.webkitMatchesSelector) return o.webkitMatchesSelector(a); if (o.msMatchesSelector) return o.msMatchesSelector(a); for (r = s(a), n = 0; n < r.length; n += 1)if (r[n] === o) return !0; return !1 } if (a === e) return o === e; if (a === t) return o === t; if (a.nodeType || a instanceof i) { for (r = a.nodeType ? [a] : a, n = 0; n < r.length; n += 1)if (r[n] === o) return !0; return !1 } return !1 }, index: function () { var e, t = this[0]; if (t) { for (e = 0; null !== (t = t.previousSibling);)1 === t.nodeType && (e += 1); return e } }, eq: function (e) { if (void 0 === e) return this; var t, s = this.length; return new i(e > s - 1 ? [] : e < 0 ? (t = s + e) < 0 ? [] : [this[t]] : [this[e]]) }, append: function () { for (var t, s = [], a = arguments.length; a--;)s[a] = arguments[a]; for (var r = 0; r < s.length; r += 1) { t = s[r]; for (var n = 0; n < this.length; n += 1)if ("string" == typeof t) { var o = e.createElement("div"); for (o.innerHTML = t; o.firstChild;)this[n].appendChild(o.firstChild) } else if (t instanceof i) for (var l = 0; l < t.length; l += 1)this[n].appendChild(t[l]); else this[n].appendChild(t) } return this }, prepend: function (t) { var s, a; for (s = 0; s < this.length; s += 1)if ("string" == typeof t) { var r = e.createElement("div"); for (r.innerHTML = t, a = r.childNodes.length - 1; a >= 0; a -= 1)this[s].insertBefore(r.childNodes[a], this[s].childNodes[0]) } else if (t instanceof i) for (a = 0; a < t.length; a += 1)this[s].insertBefore(t[a], this[s].childNodes[0]); else this[s].insertBefore(t, this[s].childNodes[0]); return this }, next: function (e) { return this.length > 0 ? e ? this[0].nextElementSibling && s(this[0].nextElementSibling).is(e) ? new i([this[0].nextElementSibling]) : new i([]) : this[0].nextElementSibling ? new i([this[0].nextElementSibling]) : new i([]) : new i([]) }, nextAll: function (e) { var t = [], a = this[0]; if (!a) return new i([]); for (; a.nextElementSibling;) { var r = a.nextElementSibling; e ? s(r).is(e) && t.push(r) : t.push(r), a = r } return new i(t) }, prev: function (e) { if (this.length > 0) { var t = this[0]; return e ? t.previousElementSibling && s(t.previousElementSibling).is(e) ? new i([t.previousElementSibling]) : new i([]) : t.previousElementSibling ? new i([t.previousElementSibling]) : new i([]) } return new i([]) }, prevAll: function (e) { var t = [], a = this[0]; if (!a) return new i([]); for (; a.previousElementSibling;) { var r = a.previousElementSibling; e ? s(r).is(e) && t.push(r) : t.push(r), a = r } return new i(t) }, parent: function (e) { for (var t = [], i = 0; i < this.length; i += 1)null !== this[i].parentNode && (e ? s(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode)); return s(a(t)) }, parents: function (e) { for (var t = [], i = 0; i < this.length; i += 1)for (var r = this[i].parentNode; r;)e ? s(r).is(e) && t.push(r) : t.push(r), r = r.parentNode; return s(a(t)) }, closest: function (e) { var t = this; return void 0 === e ? new i([]) : (t.is(e) || (t = t.parents(e).eq(0)), t) }, find: function (e) { for (var t = [], s = 0; s < this.length; s += 1)for (var a = this[s].querySelectorAll(e), r = 0; r < a.length; r += 1)t.push(a[r]); return new i(t) }, children: function (e) { for (var t = [], r = 0; r < this.length; r += 1)for (var n = this[r].childNodes, o = 0; o < n.length; o += 1)e ? 1 === n[o].nodeType && s(n[o]).is(e) && t.push(n[o]) : 1 === n[o].nodeType && t.push(n[o]); return new i(a(t)) }, filter: function (e) { for (var t = [], s = 0; s < this.length; s += 1)e.call(this[s], s, this[s]) && t.push(this[s]); return new i(t) }, remove: function () { for (var e = 0; e < this.length; e += 1)this[e].parentNode && this[e].parentNode.removeChild(this[e]); return this }, add: function () { for (var e = [], t = arguments.length; t--;)e[t] = arguments[t]; var i, a; for (i = 0; i < e.length; i += 1) { var r = s(e[i]); for (a = 0; a < r.length; a += 1)this[this.length] = r[a], this.length += 1 } return this }, styles: function () { return this[0] ? t.getComputedStyle(this[0], null) : {} } }; Object.keys(r).forEach((function (e) { s.fn[e] = s.fn[e] || r[e] })); var n = { deleteProps: function (e) { var t = e; Object.keys(t).forEach((function (e) { try { t[e] = null } catch (e) { } try { delete t[e] } catch (e) { } })) }, nextTick: function (e, t) { return void 0 === t && (t = 0), setTimeout(e, t) }, now: function () { return Date.now() }, getTranslate: function (e, i) { var s, a, r; void 0 === i && (i = "x"); var n = t.getComputedStyle(e, null); return t.WebKitCSSMatrix ? ((a = n.transform || n.webkitTransform).split(",").length > 6 && (a = a.split(", ").map((function (e) { return e.replace(",", ".") })).join(", ")), r = new t.WebKitCSSMatrix("none" === a ? "" : a)) : s = (r = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === i && (a = t.WebKitCSSMatrix ? r.m41 : 16 === s.length ? parseFloat(s[12]) : parseFloat(s[4])), "y" === i && (a = t.WebKitCSSMatrix ? r.m42 : 16 === s.length ? parseFloat(s[13]) : parseFloat(s[5])), a || 0 }, parseUrlQuery: function (e) { var i, s, a, r, n = {}, o = e || t.location.href; if ("string" == typeof o && o.length) for (r = (s = (o = o.indexOf("?") > -1 ? o.replace(/\S*\?/, "") : "").split("&").filter((function (e) { return "" !== e }))).length, i = 0; i < r; i += 1)a = s[i].replace(/#\S+/g, "").split("="), n[decodeURIComponent(a[0])] = void 0 === a[1] ? void 0 : decodeURIComponent(a[1]) || ""; return n }, isObject: function (e) { return "object" == typeof e && null !== e && e.constructor && e.constructor === Object }, extend: function () { for (var e = [], t = arguments.length; t--;)e[t] = arguments[t]; for (var i = Object(e[0]), s = 1; s < e.length; s += 1) { var a = e[s]; if (null != a) for (var r = Object.keys(Object(a)), o = 0, l = r.length; o < l; o += 1) { var d = r[o], h = Object.getOwnPropertyDescriptor(a, d); void 0 !== h && h.enumerable && (n.isObject(i[d]) && n.isObject(a[d]) ? n.extend(i[d], a[d]) : !n.isObject(i[d]) && n.isObject(a[d]) ? (i[d] = {}, n.extend(i[d], a[d])) : i[d] = a[d]) } } return i } }, o = { touch: t.Modernizr && !0 === t.Modernizr.touch || !!(t.navigator.maxTouchPoints > 0 || "ontouchstart" in t || t.DocumentTouch && e instanceof t.DocumentTouch), pointerEvents: !!t.PointerEvent && "maxTouchPoints" in t.navigator && t.navigator.maxTouchPoints > 0, observer: "MutationObserver" in t || "WebkitMutationObserver" in t, passiveListener: function () { var e = !1; try { var i = Object.defineProperty({}, "passive", { get: function () { e = !0 } }); t.addEventListener("testPassiveListener", null, i) } catch (e) { } return e }(), gestures: "ongesturestart" in t }, l = function (e) { void 0 === e && (e = {}); var t = this; t.params = e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach((function (e) { t.on(e, t.params.on[e]) })) }, d = { components: { configurable: !0 } }; l.prototype.on = function (e, t, i) { var s = this; if ("function" != typeof t) return s; var a = i ? "unshift" : "push"; return e.split(" ").forEach((function (e) { s.eventsListeners[e] || (s.eventsListeners[e] = []), s.eventsListeners[e][a](t) })), s }, l.prototype.once = function (e, t, i) { var s = this; if ("function" != typeof t) return s; function a() { for (var i = [], r = arguments.length; r--;)i[r] = arguments[r]; s.off(e, a), a.f7proxy && delete a.f7proxy, t.apply(s, i) } return a.f7proxy = t, s.on(e, a, i) }, l.prototype.off = function (e, t) { var i = this; return i.eventsListeners ? (e.split(" ").forEach((function (e) { void 0 === t ? i.eventsListeners[e] = [] : i.eventsListeners[e] && i.eventsListeners[e].length && i.eventsListeners[e].forEach((function (s, a) { (s === t || s.f7proxy && s.f7proxy === t) && i.eventsListeners[e].splice(a, 1) })) })), i) : i }, l.prototype.emit = function () { for (var e = [], t = arguments.length; t--;)e[t] = arguments[t]; var i, s, a, r = this; if (!r.eventsListeners) return r; "string" == typeof e[0] || Array.isArray(e[0]) ? (i = e[0], s = e.slice(1, e.length), a = r) : (i = e[0].events, s = e[0].data, a = e[0].context || r); var n = Array.isArray(i) ? i : i.split(" "); return n.forEach((function (e) { if (r.eventsListeners && r.eventsListeners[e]) { var t = []; r.eventsListeners[e].forEach((function (e) { t.push(e) })), t.forEach((function (e) { e.apply(a, s) })) } })), r }, l.prototype.useModulesParams = function (e) { var t = this; t.modules && Object.keys(t.modules).forEach((function (i) { var s = t.modules[i]; s.params && n.extend(e, s.params) })) }, l.prototype.useModules = function (e) { void 0 === e && (e = {}); var t = this; t.modules && Object.keys(t.modules).forEach((function (i) { var s = t.modules[i], a = e[i] || {}; s.instance && Object.keys(s.instance).forEach((function (e) { var i = s.instance[e]; t[e] = "function" == typeof i ? i.bind(t) : i })), s.on && t.on && Object.keys(s.on).forEach((function (e) { t.on(e, s.on[e]) })), s.create && s.create.bind(t)(a) })) }, d.components.set = function (e) { this.use && this.use(e) }, l.installModule = function (e) { for (var t = [], i = arguments.length - 1; i-- > 0;)t[i] = arguments[i + 1]; var s = this; s.prototype.modules || (s.prototype.modules = {}); var a = e.name || Object.keys(s.prototype.modules).length + "_" + n.now(); return s.prototype.modules[a] = e, e.proto && Object.keys(e.proto).forEach((function (t) { s.prototype[t] = e.proto[t] })), e.static && Object.keys(e.static).forEach((function (t) { s[t] = e.static[t] })), e.install && e.install.apply(s, t), s }, l.use = function (e) { for (var t = [], i = arguments.length - 1; i-- > 0;)t[i] = arguments[i + 1]; var s = this; return Array.isArray(e) ? (e.forEach((function (e) { return s.installModule(e) })), s) : s.installModule.apply(s, [e].concat(t)) }, Object.defineProperties(l, d); var h = { updateSize: function () { var e, t, i = this.$el; e = void 0 !== this.params.width ? this.params.width : i[0].clientWidth, t = void 0 !== this.params.height ? this.params.height : i[0].clientHeight, 0 === e && this.isHorizontal() || 0 === t && this.isVertical() || (e = e - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10), t = t - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10), n.extend(this, { width: e, height: t, size: this.isHorizontal() ? e : t })) }, updateSlides: function () { var e = this.params, i = this.$wrapperEl, s = this.size, a = this.rtlTranslate, r = this.wrongRTL, o = this.virtual && e.virtual.enabled, l = o ? this.virtual.slides.length : this.slides.length, d = i.children("." + this.params.slideClass), h = o ? this.virtual.slides.length : d.length, p = [], c = [], u = []; function v(t) { return !e.cssMode || t !== d.length - 1 } var f = e.slidesOffsetBefore; "function" == typeof f && (f = e.slidesOffsetBefore.call(this)); var m = e.slidesOffsetAfter; "function" == typeof m && (m = e.slidesOffsetAfter.call(this)); var g = this.snapGrid.length, b = this.snapGrid.length, w = e.spaceBetween, y = -f, x = 0, T = 0; if (void 0 !== s) { var E, S; "string" == typeof w && w.indexOf("%") >= 0 && (w = parseFloat(w.replace("%", "")) / 100 * s), this.virtualSize = -w, a ? d.css({ marginLeft: "", marginTop: "" }) : d.css({ marginRight: "", marginBottom: "" }), e.slidesPerColumn > 1 && (E = Math.floor(h / e.slidesPerColumn) === h / this.params.slidesPerColumn ? h : Math.ceil(h / e.slidesPerColumn) * e.slidesPerColumn, "auto" !== e.slidesPerView && "row" === e.slidesPerColumnFill && (E = Math.max(E, e.slidesPerView * e.slidesPerColumn))); for (var C, M = e.slidesPerColumn, P = E / M, z = Math.floor(h / e.slidesPerColumn), k = 0; k < h; k += 1) { S = 0; var $ = d.eq(k); if (e.slidesPerColumn > 1) { var L = void 0, I = void 0, D = void 0; if ("row" === e.slidesPerColumnFill && e.slidesPerGroup > 1) { var O = Math.floor(k / (e.slidesPerGroup * e.slidesPerColumn)), A = k - e.slidesPerColumn * e.slidesPerGroup * O, G = 0 === O ? e.slidesPerGroup : Math.min(Math.ceil((h - O * M * e.slidesPerGroup) / M), e.slidesPerGroup); L = (I = A - (D = Math.floor(A / G)) * G + O * e.slidesPerGroup) + D * E / M, $.css({ "-webkit-box-ordinal-group": L, "-moz-box-ordinal-group": L, "-ms-flex-order": L, "-webkit-order": L, order: L }) } else "column" === e.slidesPerColumnFill ? (D = k - (I = Math.floor(k / M)) * M, (I > z || I === z && D === M - 1) && (D += 1) >= M && (D = 0, I += 1)) : I = k - (D = Math.floor(k / P)) * P; $.css("margin-" + (this.isHorizontal() ? "top" : "left"), 0 !== D && e.spaceBetween && e.spaceBetween + "px") } if ("none" !== $.css("display")) { if ("auto" === e.slidesPerView) { var H = t.getComputedStyle($[0], null), B = $[0].style.transform, N = $[0].style.webkitTransform; if (B && ($[0].style.transform = "none"), N && ($[0].style.webkitTransform = "none"), e.roundLengths) S = this.isHorizontal() ? $.outerWidth(!0) : $.outerHeight(!0); else if (this.isHorizontal()) { var X = parseFloat(H.getPropertyValue("width")), V = parseFloat(H.getPropertyValue("padding-left")), Y = parseFloat(H.getPropertyValue("padding-right")), F = parseFloat(H.getPropertyValue("margin-left")), W = parseFloat(H.getPropertyValue("margin-right")), R = H.getPropertyValue("box-sizing"); S = R && "border-box" === R ? X + F + W : X + V + Y + F + W } else { var q = parseFloat(H.getPropertyValue("height")), j = parseFloat(H.getPropertyValue("padding-top")), K = parseFloat(H.getPropertyValue("padding-bottom")), U = parseFloat(H.getPropertyValue("margin-top")), _ = parseFloat(H.getPropertyValue("margin-bottom")), Z = H.getPropertyValue("box-sizing"); S = Z && "border-box" === Z ? q + U + _ : q + j + K + U + _ } B && ($[0].style.transform = B), N && ($[0].style.webkitTransform = N), e.roundLengths && (S = Math.floor(S)) } else S = (s - (e.slidesPerView - 1) * w) / e.slidesPerView, e.roundLengths && (S = Math.floor(S)), d[k] && (this.isHorizontal() ? d[k].style.width = S + "px" : d[k].style.height = S + "px"); d[k] && (d[k].swiperSlideSize = S), u.push(S), e.centeredSlides ? (y = y + S / 2 + x / 2 + w, 0 === x && 0 !== k && (y = y - s / 2 - w), 0 === k && (y = y - s / 2 - w), Math.abs(y) < .001 && (y = 0), e.roundLengths && (y = Math.floor(y)), T % e.slidesPerGroup == 0 && p.push(y), c.push(y)) : (e.roundLengths && (y = Math.floor(y)), (T - Math.min(this.params.slidesPerGroupSkip, T)) % this.params.slidesPerGroup == 0 && p.push(y), c.push(y), y = y + S + w), this.virtualSize += S + w, x = S, T += 1 } } if (this.virtualSize = Math.max(this.virtualSize, s) + m, a && r && ("slide" === e.effect || "coverflow" === e.effect) && i.css({ width: this.virtualSize + e.spaceBetween + "px" }), e.setWrapperSize && (this.isHorizontal() ? i.css({ width: this.virtualSize + e.spaceBetween + "px" }) : i.css({ height: this.virtualSize + e.spaceBetween + "px" })), e.slidesPerColumn > 1 && (this.virtualSize = (S + e.spaceBetween) * E, this.virtualSize = Math.ceil(this.virtualSize / e.slidesPerColumn) - e.spaceBetween, this.isHorizontal() ? i.css({ width: this.virtualSize + e.spaceBetween + "px" }) : i.css({ height: this.virtualSize + e.spaceBetween + "px" }), e.centeredSlides)) { C = []; for (var Q = 0; Q < p.length; Q += 1) { var J = p[Q]; e.roundLengths && (J = Math.floor(J)), p[Q] < this.virtualSize + p[0] && C.push(J) } p = C } if (!e.centeredSlides) { C = []; for (var ee = 0; ee < p.length; ee += 1) { var te = p[ee]; e.roundLengths && (te = Math.floor(te)), p[ee] <= this.virtualSize - s && C.push(te) } p = C, Math.floor(this.virtualSize - s) - Math.floor(p[p.length - 1]) > 1 && p.push(this.virtualSize - s) } if (0 === p.length && (p = [0]), 0 !== e.spaceBetween && (this.isHorizontal() ? a ? d.filter(v).css({ marginLeft: w + "px" }) : d.filter(v).css({ marginRight: w + "px" }) : d.filter(v).css({ marginBottom: w + "px" })), e.centeredSlides && e.centeredSlidesBounds) { var ie = 0; u.forEach((function (t) { ie += t + (e.spaceBetween ? e.spaceBetween : 0) })); var se = (ie -= e.spaceBetween) - s; p = p.map((function (e) { return e < 0 ? -f : e > se ? se + m : e })) } if (e.centerInsufficientSlides) { var ae = 0; if (u.forEach((function (t) { ae += t + (e.spaceBetween ? e.spaceBetween : 0) })), (ae -= e.spaceBetween) < s) { var re = (s - ae) / 2; p.forEach((function (e, t) { p[t] = e - re })), c.forEach((function (e, t) { c[t] = e + re })) } } n.extend(this, { slides: d, snapGrid: p, slidesGrid: c, slidesSizesGrid: u }), h !== l && this.emit("slidesLengthChange"), p.length !== g && (this.params.watchOverflow && this.checkOverflow(), this.emit("snapGridLengthChange")), c.length !== b && this.emit("slidesGridLengthChange"), (e.watchSlidesProgress || e.watchSlidesVisibility) && this.updateSlidesOffset() } }, updateAutoHeight: function (e) { var t, i = [], s = 0; if ("number" == typeof e ? this.setTransition(e) : !0 === e && this.setTransition(this.params.speed), "auto" !== this.params.slidesPerView && this.params.slidesPerView > 1) if (this.params.centeredSlides) i.push.apply(i, this.visibleSlides); else for (t = 0; t < Math.ceil(this.params.slidesPerView); t += 1) { var a = this.activeIndex + t; if (a > this.slides.length) break; i.push(this.slides.eq(a)[0]) } else i.push(this.slides.eq(this.activeIndex)[0]); for (t = 0; t < i.length; t += 1)if (void 0 !== i[t]) { var r = i[t].offsetHeight; s = r > s ? r : s } s && this.$wrapperEl.css("height", s + "px") }, updateSlidesOffset: function () { for (var e = this.slides, t = 0; t < e.length; t += 1)e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop }, updateSlidesProgress: function (e) { void 0 === e && (e = this && this.translate || 0); var t = this.params, i = this.slides, a = this.rtlTranslate; if (0 !== i.length) { void 0 === i[0].swiperSlideOffset && this.updateSlidesOffset(); var r = -e; a && (r = e), i.removeClass(t.slideVisibleClass), this.visibleSlidesIndexes = [], this.visibleSlides = []; for (var n = 0; n < i.length; n += 1) { var o = i[n], l = (r + (t.centeredSlides ? this.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + t.spaceBetween); if (t.watchSlidesVisibility || t.centeredSlides && t.autoHeight) { var d = -(r - o.swiperSlideOffset), h = d + this.slidesSizesGrid[n]; (d >= 0 && d < this.size - 1 || h > 1 && h <= this.size || d <= 0 && h >= this.size) && (this.visibleSlides.push(o), this.visibleSlidesIndexes.push(n), i.eq(n).addClass(t.slideVisibleClass)) } o.progress = a ? -l : l } this.visibleSlides = s(this.visibleSlides) } }, updateProgress: function (e) { if (void 0 === e) { var t = this.rtlTranslate ? -1 : 1; e = this && this.translate && this.translate * t || 0 } var i = this.params, s = this.maxTranslate() - this.minTranslate(), a = this.progress, r = this.isBeginning, o = this.isEnd, l = r, d = o; 0 === s ? (a = 0, r = !0, o = !0) : (r = (a = (e - this.minTranslate()) / s) <= 0, o = a >= 1), n.extend(this, { progress: a, isBeginning: r, isEnd: o }), (i.watchSlidesProgress || i.watchSlidesVisibility || i.centeredSlides && i.autoHeight) && this.updateSlidesProgress(e), r && !l && this.emit("reachBeginning toEdge"), o && !d && this.emit("reachEnd toEdge"), (l && !r || d && !o) && this.emit("fromEdge"), this.emit("progress", a) }, updateSlidesClasses: function () { var e, t = this.slides, i = this.params, s = this.$wrapperEl, a = this.activeIndex, r = this.realIndex, n = this.virtual && i.virtual.enabled; t.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass), (e = n ? this.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + a + '"]') : t.eq(a)).addClass(i.slideActiveClass), i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass)); var o = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass); i.loop && 0 === o.length && (o = t.eq(0)).addClass(i.slideNextClass); var l = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass); i.loop && 0 === l.length && (l = t.eq(-1)).addClass(i.slidePrevClass), i.loop && (o.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass), l.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass)) }, updateActiveIndex: function (e) { var t, i = this.rtlTranslate ? this.translate : -this.translate, s = this.slidesGrid, a = this.snapGrid, r = this.params, o = this.activeIndex, l = this.realIndex, d = this.snapIndex, h = e; if (void 0 === h) { for (var p = 0; p < s.length; p += 1)void 0 !== s[p + 1] ? i >= s[p] && i < s[p + 1] - (s[p + 1] - s[p]) / 2 ? h = p : i >= s[p] && i < s[p + 1] && (h = p + 1) : i >= s[p] && (h = p); r.normalizeSlideIndex && (h < 0 || void 0 === h) && (h = 0) } if (a.indexOf(i) >= 0) t = a.indexOf(i); else { var c = Math.min(r.slidesPerGroupSkip, h); t = c + Math.floor((h - c) / r.slidesPerGroup) } if (t >= a.length && (t = a.length - 1), h !== o) { var u = parseInt(this.slides.eq(h).attr("data-swiper-slide-index") || h, 10); n.extend(this, { snapIndex: t, realIndex: u, previousIndex: o, activeIndex: h }), this.emit("activeIndexChange"), this.emit("snapIndexChange"), l !== u && this.emit("realIndexChange"), (this.initialized || this.runCallbacksOnInit) && this.emit("slideChange") } else t !== d && (this.snapIndex = t, this.emit("snapIndexChange")) }, updateClickedSlide: function (e) { var t = this.params, i = s(e.target).closest("." + t.slideClass)[0], a = !1; if (i) for (var r = 0; r < this.slides.length; r += 1)this.slides[r] === i && (a = !0); if (!i || !a) return this.clickedSlide = void 0, void (this.clickedIndex = void 0); this.clickedSlide = i, this.virtual && this.params.virtual.enabled ? this.clickedIndex = parseInt(s(i).attr("data-swiper-slide-index"), 10) : this.clickedIndex = s(i).index(), t.slideToClickedSlide && void 0 !== this.clickedIndex && this.clickedIndex !== this.activeIndex && this.slideToClickedSlide() } }; var p = { getTranslate: function (e) { void 0 === e && (e = this.isHorizontal() ? "x" : "y"); var t = this.params, i = this.rtlTranslate, s = this.translate, a = this.$wrapperEl; if (t.virtualTranslate) return i ? -s : s; if (t.cssMode) return s; var r = n.getTranslate(a[0], e); return i && (r = -r), r || 0 }, setTranslate: function (e, t) { var i = this.rtlTranslate, s = this.params, a = this.$wrapperEl, r = this.wrapperEl, n = this.progress, o = 0, l = 0; this.isHorizontal() ? o = i ? -e : e : l = e, s.roundLengths && (o = Math.floor(o), l = Math.floor(l)), s.cssMode ? r[this.isHorizontal() ? "scrollLeft" : "scrollTop"] = this.isHorizontal() ? -o : -l : s.virtualTranslate || a.transform("translate3d(" + o + "px, " + l + "px, 0px)"), this.previousTranslate = this.translate, this.translate = this.isHorizontal() ? o : l; var d = this.maxTranslate() - this.minTranslate(); (0 === d ? 0 : (e - this.minTranslate()) / d) !== n && this.updateProgress(e), this.emit("setTranslate", this.translate, t) }, minTranslate: function () { return -this.snapGrid[0] }, maxTranslate: function () { return -this.snapGrid[this.snapGrid.length - 1] }, translateTo: function (e, t, i, s, a) { var r; void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), void 0 === s && (s = !0); var n = this, o = n.params, l = n.wrapperEl; if (n.animating && o.preventInteractionOnTransition) return !1; var d, h = n.minTranslate(), p = n.maxTranslate(); if (d = s && e > h ? h : s && e < p ? p : e, n.updateProgress(d), o.cssMode) { var c = n.isHorizontal(); return 0 === t ? l[c ? "scrollLeft" : "scrollTop"] = -d : l.scrollTo ? l.scrollTo(((r = {})[c ? "left" : "top"] = -d, r.behavior = "smooth", r)) : l[c ? "scrollLeft" : "scrollTop"] = -d, !0 } return 0 === t ? (n.setTransition(0), n.setTranslate(d), i && (n.emit("beforeTransitionStart", t, a), n.emit("transitionEnd"))) : (n.setTransition(t), n.setTranslate(d), i && (n.emit("beforeTransitionStart", t, a), n.emit("transitionStart")), n.animating || (n.animating = !0, n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function (e) { n && !n.destroyed && e.target === this && (n.$wrapperEl[0].removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd), n.$wrapperEl[0].removeEventListener("webkitTransitionEnd", n.onTranslateToWrapperTransitionEnd), n.onTranslateToWrapperTransitionEnd = null, delete n.onTranslateToWrapperTransitionEnd, i && n.emit("transitionEnd")) }), n.$wrapperEl[0].addEventListener("transitionend", n.onTranslateToWrapperTransitionEnd), n.$wrapperEl[0].addEventListener("webkitTransitionEnd", n.onTranslateToWrapperTransitionEnd))), !0 } }; var c = { setTransition: function (e, t) { this.params.cssMode || this.$wrapperEl.transition(e), this.emit("setTransition", e, t) }, transitionStart: function (e, t) { void 0 === e && (e = !0); var i = this.activeIndex, s = this.params, a = this.previousIndex; if (!s.cssMode) { s.autoHeight && this.updateAutoHeight(); var r = t; if (r || (r = i > a ? "next" : i < a ? "prev" : "reset"), this.emit("transitionStart"), e && i !== a) { if ("reset" === r) return void this.emit("slideResetTransitionStart"); this.emit("slideChangeTransitionStart"), "next" === r ? this.emit("slideNextTransitionStart") : this.emit("slidePrevTransitionStart") } } }, transitionEnd: function (e, t) { void 0 === e && (e = !0); var i = this.activeIndex, s = this.previousIndex, a = this.params; if (this.animating = !1, !a.cssMode) { this.setTransition(0); var r = t; if (r || (r = i > s ? "next" : i < s ? "prev" : "reset"), this.emit("transitionEnd"), e && i !== s) { if ("reset" === r) return void this.emit("slideResetTransitionEnd"); this.emit("slideChangeTransitionEnd"), "next" === r ? this.emit("slideNextTransitionEnd") : this.emit("slidePrevTransitionEnd") } } } }; var u = { slideTo: function (e, t, i, s) { var a; void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0); var r = this, n = e; n < 0 && (n = 0); var o = r.params, l = r.snapGrid, d = r.slidesGrid, h = r.previousIndex, p = r.activeIndex, c = r.rtlTranslate, u = r.wrapperEl; if (r.animating && o.preventInteractionOnTransition) return !1; var v = Math.min(r.params.slidesPerGroupSkip, n), f = v + Math.floor((n - v) / r.params.slidesPerGroup); f >= l.length && (f = l.length - 1), (p || o.initialSlide || 0) === (h || 0) && i && r.emit("beforeSlideChangeStart"); var m, g = -l[f]; if (r.updateProgress(g), o.normalizeSlideIndex) for (var b = 0; b < d.length; b += 1)-Math.floor(100 * g) >= Math.floor(100 * d[b]) && (n = b); if (r.initialized && n !== p) { if (!r.allowSlideNext && g < r.translate && g < r.minTranslate()) return !1; if (!r.allowSlidePrev && g > r.translate && g > r.maxTranslate() && (p || 0) !== n) return !1 } if (m = n > p ? "next" : n < p ? "prev" : "reset", c && -g === r.translate || !c && g === r.translate) return r.updateActiveIndex(n), o.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== o.effect && r.setTranslate(g), "reset" !== m && (r.transitionStart(i, m), r.transitionEnd(i, m)), !1; if (o.cssMode) { var w = r.isHorizontal(); return 0 === t ? u[w ? "scrollLeft" : "scrollTop"] = -g : u.scrollTo ? u.scrollTo(((a = {})[w ? "left" : "top"] = -g, a.behavior = "smooth", a)) : u[w ? "scrollLeft" : "scrollTop"] = -g, !0 } return 0 === t ? (r.setTransition(0), r.setTranslate(g), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, s), r.transitionStart(i, m), r.transitionEnd(i, m)) : (r.setTransition(t), r.setTranslate(g), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, s), r.transitionStart(i, m), r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function (e) { r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(i, m)) }), r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd))), !0 }, slideToLoop: function (e, t, i, s) { void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0); var a = e; return this.params.loop && (a += this.loopedSlides), this.slideTo(a, t, i, s) }, slideNext: function (e, t, i) { void 0 === e && (e = this.params.speed), void 0 === t && (t = !0); var s = this.params, a = this.animating, r = this.activeIndex < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup; if (s.loop) { if (a) return !1; this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft } return this.slideTo(this.activeIndex + r, e, t, i) }, slidePrev: function (e, t, i) { void 0 === e && (e = this.params.speed), void 0 === t && (t = !0); var s = this.params, a = this.animating, r = this.snapGrid, n = this.slidesGrid, o = this.rtlTranslate; if (s.loop) { if (a) return !1; this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft } function l(e) { return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e) } var d, h = l(o ? this.translate : -this.translate), p = r.map((function (e) { return l(e) })), c = (n.map((function (e) { return l(e) })), r[p.indexOf(h)], r[p.indexOf(h) - 1]); return void 0 === c && s.cssMode && r.forEach((function (e) { !c && h >= e && (c = e) })), void 0 !== c && (d = n.indexOf(c)) < 0 && (d = this.activeIndex - 1), this.slideTo(d, e, t, i) }, slideReset: function (e, t, i) { return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, i) }, slideToClosest: function (e, t, i, s) { void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === s && (s = .5); var a = this.activeIndex, r = Math.min(this.params.slidesPerGroupSkip, a), n = r + Math.floor((a - r) / this.params.slidesPerGroup), o = this.rtlTranslate ? this.translate : -this.translate; if (o >= this.snapGrid[n]) { var l = this.snapGrid[n]; o - l > (this.snapGrid[n + 1] - l) * s && (a += this.params.slidesPerGroup) } else { var d = this.snapGrid[n - 1]; o - d <= (this.snapGrid[n] - d) * s && (a -= this.params.slidesPerGroup) } return a = Math.max(a, 0), a = Math.min(a, this.slidesGrid.length - 1), this.slideTo(a, e, t, i) }, slideToClickedSlide: function () { var e, t = this, i = t.params, a = t.$wrapperEl, r = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView, o = t.clickedIndex; if (i.loop) { if (t.animating) return; e = parseInt(s(t.clickedSlide).attr("data-swiper-slide-index"), 10), i.centeredSlides ? o < t.loopedSlides - r / 2 || o > t.slides.length - t.loopedSlides + r / 2 ? (t.loopFix(), o = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), n.nextTick((function () { t.slideTo(o) }))) : t.slideTo(o) : o > t.slides.length - r ? (t.loopFix(), o = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), n.nextTick((function () { t.slideTo(o) }))) : t.slideTo(o) } else t.slideTo(o) } }; var v = { loopCreate: function () { var t = this, i = t.params, a = t.$wrapperEl; a.children("." + i.slideClass + "." + i.slideDuplicateClass).remove(); var r = a.children("." + i.slideClass); if (i.loopFillGroupWithBlank) { var n = i.slidesPerGroup - r.length % i.slidesPerGroup; if (n !== i.slidesPerGroup) { for (var o = 0; o < n; o += 1) { var l = s(e.createElement("div")).addClass(i.slideClass + " " + i.slideBlankClass); a.append(l) } r = a.children("." + i.slideClass) } } "auto" !== i.slidesPerView || i.loopedSlides || (i.loopedSlides = r.length), t.loopedSlides = Math.ceil(parseFloat(i.loopedSlides || i.slidesPerView, 10)), t.loopedSlides += i.loopAdditionalSlides, t.loopedSlides > r.length && (t.loopedSlides = r.length); var d = [], h = []; r.each((function (e, i) { var a = s(i); e < t.loopedSlides && h.push(i), e < r.length && e >= r.length - t.loopedSlides && d.push(i), a.attr("data-swiper-slide-index", e) })); for (var p = 0; p < h.length; p += 1)a.append(s(h[p].cloneNode(!0)).addClass(i.slideDuplicateClass)); for (var c = d.length - 1; c >= 0; c -= 1)a.prepend(s(d[c].cloneNode(!0)).addClass(i.slideDuplicateClass)) }, loopFix: function () { this.emit("beforeLoopFix"); var e, t = this.activeIndex, i = this.slides, s = this.loopedSlides, a = this.allowSlidePrev, r = this.allowSlideNext, n = this.snapGrid, o = this.rtlTranslate; this.allowSlidePrev = !0, this.allowSlideNext = !0; var l = -n[t] - this.getTranslate(); if (t < s) e = i.length - 3 * s + t, e += s, this.slideTo(e, 0, !1, !0) && 0 !== l && this.setTranslate((o ? -this.translate : this.translate) - l); else if (t >= i.length - s) { e = -i.length + t + s, e += s, this.slideTo(e, 0, !1, !0) && 0 !== l && this.setTranslate((o ? -this.translate : this.translate) - l) } this.allowSlidePrev = a, this.allowSlideNext = r, this.emit("loopFix") }, loopDestroy: function () { var e = this.$wrapperEl, t = this.params, i = this.slides; e.children("." + t.slideClass + "." + t.slideDuplicateClass + ",." + t.slideClass + "." + t.slideBlankClass).remove(), i.removeAttr("data-swiper-slide-index") } }; var f = { setGrabCursor: function (e) { if (!(o.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked || this.params.cssMode)) { var t = this.el; t.style.cursor = "move", t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", t.style.cursor = e ? "grabbing" : "grab" } }, unsetGrabCursor: function () { o.touch || this.params.watchOverflow && this.isLocked || this.params.cssMode || (this.el.style.cursor = "") } }; var m, g, b, w, y, x, T, E, S, C, M, P, z, k, $, L = { appendSlide: function (e) { var t = this.$wrapperEl, i = this.params; if (i.loop && this.loopDestroy(), "object" == typeof e && "length" in e) for (var s = 0; s < e.length; s += 1)e[s] && t.append(e[s]); else t.append(e); i.loop && this.loopCreate(), i.observer && o.observer || this.update() }, prependSlide: function (e) { var t = this.params, i = this.$wrapperEl, s = this.activeIndex; t.loop && this.loopDestroy(); var a = s + 1; if ("object" == typeof e && "length" in e) { for (var r = 0; r < e.length; r += 1)e[r] && i.prepend(e[r]); a = s + e.length } else i.prepend(e); t.loop && this.loopCreate(), t.observer && o.observer || this.update(), this.slideTo(a, 0, !1) }, addSlide: function (e, t) { var i = this.$wrapperEl, s = this.params, a = this.activeIndex; s.loop && (a -= this.loopedSlides, this.loopDestroy(), this.slides = i.children("." + s.slideClass)); var r = this.slides.length; if (e <= 0) this.prependSlide(t); else if (e >= r) this.appendSlide(t); else { for (var n = a > e ? a + 1 : a, l = [], d = r - 1; d >= e; d -= 1) { var h = this.slides.eq(d); h.remove(), l.unshift(h) } if ("object" == typeof t && "length" in t) { for (var p = 0; p < t.length; p += 1)t[p] && i.append(t[p]); n = a > e ? a + t.length : a } else i.append(t); for (var c = 0; c < l.length; c += 1)i.append(l[c]); s.loop && this.loopCreate(), s.observer && o.observer || this.update(), s.loop ? this.slideTo(n + this.loopedSlides, 0, !1) : this.slideTo(n, 0, !1) } }, removeSlide: function (e) { var t = this.params, i = this.$wrapperEl, s = this.activeIndex; t.loop && (s -= this.loopedSlides, this.loopDestroy(), this.slides = i.children("." + t.slideClass)); var a, r = s; if ("object" == typeof e && "length" in e) { for (var n = 0; n < e.length; n += 1)a = e[n], this.slides[a] && this.slides.eq(a).remove(), a < r && (r -= 1); r = Math.max(r, 0) } else a = e, this.slides[a] && this.slides.eq(a).remove(), a < r && (r -= 1), r = Math.max(r, 0); t.loop && this.loopCreate(), t.observer && o.observer || this.update(), t.loop ? this.slideTo(r + this.loopedSlides, 0, !1) : this.slideTo(r, 0, !1) }, removeAllSlides: function () { for (var e = [], t = 0; t < this.slides.length; t += 1)e.push(t); this.removeSlide(e) } }, I = (m = t.navigator.platform, g = t.navigator.userAgent, b = { ios: !1, android: !1, androidChrome: !1, desktop: !1, iphone: !1, ipod: !1, ipad: !1, edge: !1, ie: !1, firefox: !1, macos: !1, windows: !1, cordova: !(!t.cordova && !t.phonegap), phonegap: !(!t.cordova && !t.phonegap), electron: !1 }, w = t.screen.width, y = t.screen.height, x = g.match(/(Android);?[\s\/]+([\d.]+)?/), T = g.match(/(iPad).*OS\s([\d_]+)/), E = g.match(/(iPod)(.*OS\s([\d_]+))?/), S = !T && g.match(/(iPhone\sOS|iOS)\s([\d_]+)/), C = g.indexOf("MSIE ") >= 0 || g.indexOf("Trident/") >= 0, M = g.indexOf("Edge/") >= 0, P = g.indexOf("Gecko/") >= 0 && g.indexOf("Firefox/") >= 0, z = "Win32" === m, k = g.toLowerCase().indexOf("electron") >= 0, $ = "MacIntel" === m, !T && $ && o.touch && (1024 === w && 1366 === y || 834 === w && 1194 === y || 834 === w && 1112 === y || 768 === w && 1024 === y) && (T = g.match(/(Version)\/([\d.]+)/), $ = !1), b.ie = C, b.edge = M, b.firefox = P, x && !z && (b.os = "android", b.osVersion = x[2], b.android = !0, b.androidChrome = g.toLowerCase().indexOf("chrome") >= 0), (T || S || E) && (b.os = "ios", b.ios = !0), S && !E && (b.osVersion = S[2].replace(/_/g, "."), b.iphone = !0), T && (b.osVersion = T[2].replace(/_/g, "."), b.ipad = !0), E && (b.osVersion = E[3] ? E[3].replace(/_/g, ".") : null, b.ipod = !0), b.ios && b.osVersion && g.indexOf("Version/") >= 0 && "10" === b.osVersion.split(".")[0] && (b.osVersion = g.toLowerCase().split("version/")[1].split(" ")[0]), b.webView = !(!(S || T || E) || !g.match(/.*AppleWebKit(?!.*Safari)/i) && !t.navigator.standalone) || t.matchMedia && t.matchMedia("(display-mode: standalone)").matches, b.webview = b.webView, b.standalone = b.webView, b.desktop = !(b.ios || b.android) || k, b.desktop && (b.electron = k, b.macos = $, b.windows = z, b.macos && (b.os = "macos"), b.windows && (b.os = "windows")), b.pixelRatio = t.devicePixelRatio || 1, b); function D(i) { var a = this.touchEventsData, r = this.params, o = this.touches; if (!this.animating || !r.preventInteractionOnTransition) { var l = i; l.originalEvent && (l = l.originalEvent); var d = s(l.target); if (("wrapper" !== r.touchEventsTarget || d.closest(this.wrapperEl).length) && (a.isTouchEvent = "touchstart" === l.type, (a.isTouchEvent || !("which" in l) || 3 !== l.which) && !(!a.isTouchEvent && "button" in l && l.button > 0 || a.isTouched && a.isMoved))) if (r.noSwiping && d.closest(r.noSwipingSelector ? r.noSwipingSelector : "." + r.noSwipingClass)[0]) this.allowClick = !0; else if (!r.swipeHandler || d.closest(r.swipeHandler)[0]) { o.currentX = "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX, o.currentY = "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY; var h = o.currentX, p = o.currentY, c = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection, u = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold; if (!c || !(h <= u || h >= t.screen.width - u)) { if (n.extend(a, { isTouched: !0, isMoved: !1, allowTouchCallbacks: !0, isScrolling: void 0, startMoving: void 0 }), o.startX = h, o.startY = p, a.touchStartTime = n.now(), this.allowClick = !0, this.updateSize(), this.swipeDirection = void 0, r.threshold > 0 && (a.allowThresholdMove = !1), "touchstart" !== l.type) { var v = !0; d.is(a.formElements) && (v = !1), e.activeElement && s(e.activeElement).is(a.formElements) && e.activeElement !== d[0] && e.activeElement.blur(); var f = v && this.allowTouchMove && r.touchStartPreventDefault; (r.touchStartForcePreventDefault || f) && l.preventDefault() } this.emit("touchStart", l) } } } } function O(t) { var i = this.touchEventsData, a = this.params, r = this.touches, o = this.rtlTranslate, l = t; if (l.originalEvent && (l = l.originalEvent), i.isTouched) { if (!i.isTouchEvent || "mousemove" !== l.type) { var d = "touchmove" === l.type && l.targetTouches && (l.targetTouches[0] || l.changedTouches[0]), h = "touchmove" === l.type ? d.pageX : l.pageX, p = "touchmove" === l.type ? d.pageY : l.pageY; if (l.preventedByNestedSwiper) return r.startX = h, void (r.startY = p); if (!this.allowTouchMove) return this.allowClick = !1, void (i.isTouched && (n.extend(r, { startX: h, startY: p, currentX: h, currentY: p }), i.touchStartTime = n.now())); if (i.isTouchEvent && a.touchReleaseOnEdges && !a.loop) if (this.isVertical()) { if (p < r.startY && this.translate <= this.maxTranslate() || p > r.startY && this.translate >= this.minTranslate()) return i.isTouched = !1, void (i.isMoved = !1) } else if (h < r.startX && this.translate <= this.maxTranslate() || h > r.startX && this.translate >= this.minTranslate()) return; if (i.isTouchEvent && e.activeElement && l.target === e.activeElement && s(l.target).is(i.formElements)) return i.isMoved = !0, void (this.allowClick = !1); if (i.allowTouchCallbacks && this.emit("touchMove", l), !(l.targetTouches && l.targetTouches.length > 1)) { r.currentX = h, r.currentY = p; var c = r.currentX - r.startX, u = r.currentY - r.startY; if (!(this.params.threshold && Math.sqrt(Math.pow(c, 2) + Math.pow(u, 2)) < this.params.threshold)) { var v; if (void 0 === i.isScrolling) this.isHorizontal() && r.currentY === r.startY || this.isVertical() && r.currentX === r.startX ? i.isScrolling = !1 : c * c + u * u >= 25 && (v = 180 * Math.atan2(Math.abs(u), Math.abs(c)) / Math.PI, i.isScrolling = this.isHorizontal() ? v > a.touchAngle : 90 - v > a.touchAngle); if (i.isScrolling && this.emit("touchMoveOpposite", l), void 0 === i.startMoving && (r.currentX === r.startX && r.currentY === r.startY || (i.startMoving = !0)), i.isScrolling) i.isTouched = !1; else if (i.startMoving) { this.allowClick = !1, a.cssMode || l.preventDefault(), a.touchMoveStopPropagation && !a.nested && l.stopPropagation(), i.isMoved || (a.loop && this.loopFix(), i.startTranslate = this.getTranslate(), this.setTransition(0), this.animating && this.$wrapperEl.trigger("webkitTransitionEnd transitionend"), i.allowMomentumBounce = !1, !a.grabCursor || !0 !== this.allowSlideNext && !0 !== this.allowSlidePrev || this.setGrabCursor(!0), this.emit("sliderFirstMove", l)), this.emit("sliderMove", l), i.isMoved = !0; var f = this.isHorizontal() ? c : u; r.diff = f, f *= a.touchRatio, o && (f = -f), this.swipeDirection = f > 0 ? "prev" : "next", i.currentTranslate = f + i.startTranslate; var m = !0, g = a.resistanceRatio; if (a.touchReleaseOnEdges && (g = 0), f > 0 && i.currentTranslate > this.minTranslate() ? (m = !1, a.resistance && (i.currentTranslate = this.minTranslate() - 1 + Math.pow(-this.minTranslate() + i.startTranslate + f, g))) : f < 0 && i.currentTranslate < this.maxTranslate() && (m = !1, a.resistance && (i.currentTranslate = this.maxTranslate() + 1 - Math.pow(this.maxTranslate() - i.startTranslate - f, g))), m && (l.preventedByNestedSwiper = !0), !this.allowSlideNext && "next" === this.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !this.allowSlidePrev && "prev" === this.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), a.threshold > 0) { if (!(Math.abs(f) > a.threshold || i.allowThresholdMove)) return void (i.currentTranslate = i.startTranslate); if (!i.allowThresholdMove) return i.allowThresholdMove = !0, r.startX = r.currentX, r.startY = r.currentY, i.currentTranslate = i.startTranslate, void (r.diff = this.isHorizontal() ? r.currentX - r.startX : r.currentY - r.startY) } a.followFinger && !a.cssMode && ((a.freeMode || a.watchSlidesProgress || a.watchSlidesVisibility) && (this.updateActiveIndex(), this.updateSlidesClasses()), a.freeMode && (0 === i.velocities.length && i.velocities.push({ position: r[this.isHorizontal() ? "startX" : "startY"], time: i.touchStartTime }), i.velocities.push({ position: r[this.isHorizontal() ? "currentX" : "currentY"], time: n.now() })), this.updateProgress(i.currentTranslate), this.setTranslate(i.currentTranslate)) } } } } } else i.startMoving && i.isScrolling && this.emit("touchMoveOpposite", l) } function A(e) { var t = this, i = t.touchEventsData, s = t.params, a = t.touches, r = t.rtlTranslate, o = t.$wrapperEl, l = t.slidesGrid, d = t.snapGrid, h = e; if (h.originalEvent && (h = h.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", h), i.allowTouchCallbacks = !1, !i.isTouched) return i.isMoved && s.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, void (i.startMoving = !1); s.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1); var p, c = n.now(), u = c - i.touchStartTime; if (t.allowClick && (t.updateClickedSlide(h), t.emit("tap click", h), u < 300 && c - i.lastClickTime < 300 && t.emit("doubleTap doubleClick", h)), i.lastClickTime = n.now(), n.nextTick((function () { t.destroyed || (t.allowClick = !0) })), !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === a.diff || i.currentTranslate === i.startTranslate) return i.isTouched = !1, i.isMoved = !1, void (i.startMoving = !1); if (i.isTouched = !1, i.isMoved = !1, i.startMoving = !1, p = s.followFinger ? r ? t.translate : -t.translate : -i.currentTranslate, !s.cssMode) if (s.freeMode) { if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex); if (p > -t.maxTranslate()) return void (t.slides.length < d.length ? t.slideTo(d.length - 1) : t.slideTo(t.slides.length - 1)); if (s.freeModeMomentum) { if (i.velocities.length > 1) { var v = i.velocities.pop(), f = i.velocities.pop(), m = v.position - f.position, g = v.time - f.time; t.velocity = m / g, t.velocity /= 2, Math.abs(t.velocity) < s.freeModeMinimumVelocity && (t.velocity = 0), (g > 150 || n.now() - v.time > 300) && (t.velocity = 0) } else t.velocity = 0; t.velocity *= s.freeModeMomentumVelocityRatio, i.velocities.length = 0; var b = 1e3 * s.freeModeMomentumRatio, w = t.velocity * b, y = t.translate + w; r && (y = -y); var x, T, E = !1, S = 20 * Math.abs(t.velocity) * s.freeModeMomentumBounceRatio; if (y < t.maxTranslate()) s.freeModeMomentumBounce ? (y + t.maxTranslate() < -S && (y = t.maxTranslate() - S), x = t.maxTranslate(), E = !0, i.allowMomentumBounce = !0) : y = t.maxTranslate(), s.loop && s.centeredSlides && (T = !0); else if (y > t.minTranslate()) s.freeModeMomentumBounce ? (y - t.minTranslate() > S && (y = t.minTranslate() + S), x = t.minTranslate(), E = !0, i.allowMomentumBounce = !0) : y = t.minTranslate(), s.loop && s.centeredSlides && (T = !0); else if (s.freeModeSticky) { for (var C, M = 0; M < d.length; M += 1)if (d[M] > -y) { C = M; break } y = -(y = Math.abs(d[C] - y) < Math.abs(d[C - 1] - y) || "next" === t.swipeDirection ? d[C] : d[C - 1]) } if (T && t.once("transitionEnd", (function () { t.loopFix() })), 0 !== t.velocity) { if (b = r ? Math.abs((-y - t.translate) / t.velocity) : Math.abs((y - t.translate) / t.velocity), s.freeModeSticky) { var P = Math.abs((r ? -y : y) - t.translate), z = t.slidesSizesGrid[t.activeIndex]; b = P < z ? s.speed : P < 2 * z ? 1.5 * s.speed : 2.5 * s.speed } } else if (s.freeModeSticky) return void t.slideToClosest(); s.freeModeMomentumBounce && E ? (t.updateProgress(x), t.setTransition(b), t.setTranslate(y), t.transitionStart(!0, t.swipeDirection), t.animating = !0, o.transitionEnd((function () { t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(s.speed), t.setTranslate(x), o.transitionEnd((function () { t && !t.destroyed && t.transitionEnd() }))) }))) : t.velocity ? (t.updateProgress(y), t.setTransition(b), t.setTranslate(y), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, o.transitionEnd((function () { t && !t.destroyed && t.transitionEnd() })))) : t.updateProgress(y), t.updateActiveIndex(), t.updateSlidesClasses() } else if (s.freeModeSticky) return void t.slideToClosest(); (!s.freeModeMomentum || u >= s.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses()) } else { for (var k = 0, $ = t.slidesSizesGrid[0], L = 0; L < l.length; L += L < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup) { var I = L < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup; void 0 !== l[L + I] ? p >= l[L] && p < l[L + I] && (k = L, $ = l[L + I] - l[L]) : p >= l[L] && (k = L, $ = l[l.length - 1] - l[l.length - 2]) } var D = (p - l[k]) / $, O = k < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup; if (u > s.longSwipesMs) { if (!s.longSwipes) return void t.slideTo(t.activeIndex); "next" === t.swipeDirection && (D >= s.longSwipesRatio ? t.slideTo(k + O) : t.slideTo(k)), "prev" === t.swipeDirection && (D > 1 - s.longSwipesRatio ? t.slideTo(k + O) : t.slideTo(k)) } else { if (!s.shortSwipes) return void t.slideTo(t.activeIndex); t.navigation && (h.target === t.navigation.nextEl || h.target === t.navigation.prevEl) ? h.target === t.navigation.nextEl ? t.slideTo(k + O) : t.slideTo(k) : ("next" === t.swipeDirection && t.slideTo(k + O), "prev" === t.swipeDirection && t.slideTo(k)) } } } function G() { var e = this.params, t = this.el; if (!t || 0 !== t.offsetWidth) { e.breakpoints && this.setBreakpoint(); var i = this.allowSlideNext, s = this.allowSlidePrev, a = this.snapGrid; this.allowSlideNext = !0, this.allowSlidePrev = !0, this.updateSize(), this.updateSlides(), this.updateSlidesClasses(), ("auto" === e.slidesPerView || e.slidesPerView > 1) && this.isEnd && !this.params.centeredSlides ? this.slideTo(this.slides.length - 1, 0, !1, !0) : this.slideTo(this.activeIndex, 0, !1, !0), this.autoplay && this.autoplay.running && this.autoplay.paused && this.autoplay.run(), this.allowSlidePrev = s, this.allowSlideNext = i, this.params.watchOverflow && a !== this.snapGrid && this.checkOverflow() } } function H(e) { this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation())) } function B() { var e = this.wrapperEl; this.previousTranslate = this.translate, this.translate = this.isHorizontal() ? -e.scrollLeft : -e.scrollTop, -0 === this.translate && (this.translate = 0), this.updateActiveIndex(), this.updateSlidesClasses(); var t = this.maxTranslate() - this.minTranslate(); (0 === t ? 0 : (this.translate - this.minTranslate()) / t) !== this.progress && this.updateProgress(this.translate), this.emit("setTranslate", this.translate, !1) } var N = !1; function X() { } var V = { init: !0, direction: "horizontal", touchEventsTarget: "container", initialSlide: 0, speed: 300, cssMode: !1, updateOnWindowResize: !0, preventInteractionOnTransition: !1, edgeSwipeDetection: !1, edgeSwipeThreshold: 20, freeMode: !1, freeModeMomentum: !0, freeModeMomentumRatio: 1, freeModeMomentumBounce: !0, freeModeMomentumBounceRatio: 1, freeModeMomentumVelocityRatio: 1, freeModeSticky: !1, freeModeMinimumVelocity: .02, autoHeight: !1, setWrapperSize: !1, virtualTranslate: !1, effect: "slide", breakpoints: void 0, spaceBetween: 0, slidesPerView: 1, slidesPerColumn: 1, slidesPerColumnFill: "column", slidesPerGroup: 1, slidesPerGroupSkip: 0, centeredSlides: !1, centeredSlidesBounds: !1, slidesOffsetBefore: 0, slidesOffsetAfter: 0, normalizeSlideIndex: !0, centerInsufficientSlides: !1, watchOverflow: !1, roundLengths: !1, touchRatio: 1, touchAngle: 45, simulateTouch: !0, shortSwipes: !0, longSwipes: !0, longSwipesRatio: .5, longSwipesMs: 300, followFinger: !0, allowTouchMove: !0, threshold: 0, touchMoveStopPropagation: !1, touchStartPreventDefault: !0, touchStartForcePreventDefault: !1, touchReleaseOnEdges: !1, uniqueNavElements: !0, resistance: !0, resistanceRatio: .85, watchSlidesProgress: !1, watchSlidesVisibility: !1, grabCursor: !1, preventClicks: !0, preventClicksPropagation: !0, slideToClickedSlide: !1, preloadImages: !0, updateOnImagesReady: !0, loop: !1, loopAdditionalSlides: 0, loopedSlides: null, loopFillGroupWithBlank: !1, allowSlidePrev: !0, allowSlideNext: !0, swipeHandler: null, noSwiping: !0, noSwipingClass: "swiper-no-swiping", noSwipingSelector: null, passiveListeners: !0, containerModifierClass: "swiper-container-", slideClass: "swiper-slide", slideBlankClass: "swiper-slide-invisible-blank", slideActiveClass: "swiper-slide-active", slideDuplicateActiveClass: "swiper-slide-duplicate-active", slideVisibleClass: "swiper-slide-visible", slideDuplicateClass: "swiper-slide-duplicate", slideNextClass: "swiper-slide-next", slideDuplicateNextClass: "swiper-slide-duplicate-next", slidePrevClass: "swiper-slide-prev", slideDuplicatePrevClass: "swiper-slide-duplicate-prev", wrapperClass: "swiper-wrapper", runCallbacksOnInit: !0 }, Y = { update: h, translate: p, transition: c, slide: u, loop: v, grabCursor: f, manipulation: L, events: { attachEvents: function () { var t = this.params, i = this.touchEvents, s = this.el, a = this.wrapperEl; this.onTouchStart = D.bind(this), this.onTouchMove = O.bind(this), this.onTouchEnd = A.bind(this), t.cssMode && (this.onScroll = B.bind(this)), this.onClick = H.bind(this); var r = !!t.nested; if (!o.touch && o.pointerEvents) s.addEventListener(i.start, this.onTouchStart, !1), e.addEventListener(i.move, this.onTouchMove, r), e.addEventListener(i.end, this.onTouchEnd, !1); else { if (o.touch) { var n = !("touchstart" !== i.start || !o.passiveListener || !t.passiveListeners) && { passive: !0, capture: !1 }; s.addEventListener(i.start, this.onTouchStart, n), s.addEventListener(i.move, this.onTouchMove, o.passiveListener ? { passive: !1, capture: r } : r), s.addEventListener(i.end, this.onTouchEnd, n), i.cancel && s.addEventListener(i.cancel, this.onTouchEnd, n), N || (e.addEventListener("touchstart", X), N = !0) } (t.simulateTouch && !I.ios && !I.android || t.simulateTouch && !o.touch && I.ios) && (s.addEventListener("mousedown", this.onTouchStart, !1), e.addEventListener("mousemove", this.onTouchMove, r), e.addEventListener("mouseup", this.onTouchEnd, !1)) } (t.preventClicks || t.preventClicksPropagation) && s.addEventListener("click", this.onClick, !0), t.cssMode && a.addEventListener("scroll", this.onScroll), t.updateOnWindowResize ? this.on(I.ios || I.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", G, !0) : this.on("observerUpdate", G, !0) }, detachEvents: function () { var t = this.params, i = this.touchEvents, s = this.el, a = this.wrapperEl, r = !!t.nested; if (!o.touch && o.pointerEvents) s.removeEventListener(i.start, this.onTouchStart, !1), e.removeEventListener(i.move, this.onTouchMove, r), e.removeEventListener(i.end, this.onTouchEnd, !1); else { if (o.touch) { var n = !("onTouchStart" !== i.start || !o.passiveListener || !t.passiveListeners) && { passive: !0, capture: !1 }; s.removeEventListener(i.start, this.onTouchStart, n), s.removeEventListener(i.move, this.onTouchMove, r), s.removeEventListener(i.end, this.onTouchEnd, n), i.cancel && s.removeEventListener(i.cancel, this.onTouchEnd, n) } (t.simulateTouch && !I.ios && !I.android || t.simulateTouch && !o.touch && I.ios) && (s.removeEventListener("mousedown", this.onTouchStart, !1), e.removeEventListener("mousemove", this.onTouchMove, r), e.removeEventListener("mouseup", this.onTouchEnd, !1)) } (t.preventClicks || t.preventClicksPropagation) && s.removeEventListener("click", this.onClick, !0), t.cssMode && a.removeEventListener("scroll", this.onScroll), this.off(I.ios || I.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", G) } }, breakpoints: { setBreakpoint: function () { var e = this.activeIndex, t = this.initialized, i = this.loopedSlides; void 0 === i && (i = 0); var s = this.params, a = this.$el, r = s.breakpoints; if (r && (!r || 0 !== Object.keys(r).length)) { var o = this.getBreakpoint(r); if (o && this.currentBreakpoint !== o) { var l = o in r ? r[o] : void 0; l && ["slidesPerView", "spaceBetween", "slidesPerGroup", "slidesPerGroupSkip", "slidesPerColumn"].forEach((function (e) { var t = l[e]; void 0 !== t && (l[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto") })); var d = l || this.originalParams, h = s.slidesPerColumn > 1, p = d.slidesPerColumn > 1; h && !p ? a.removeClass(s.containerModifierClass + "multirow " + s.containerModifierClass + "multirow-column") : !h && p && (a.addClass(s.containerModifierClass + "multirow"), "column" === d.slidesPerColumnFill && a.addClass(s.containerModifierClass + "multirow-column")); var c = d.direction && d.direction !== s.direction, u = s.loop && (d.slidesPerView !== s.slidesPerView || c); c && t && this.changeDirection(), n.extend(this.params, d), n.extend(this, { allowTouchMove: this.params.allowTouchMove, allowSlideNext: this.params.allowSlideNext, allowSlidePrev: this.params.allowSlidePrev }), this.currentBreakpoint = o, u && t && (this.loopDestroy(), this.loopCreate(), this.updateSlides(), this.slideTo(e - i + this.loopedSlides, 0, !1)), this.emit("breakpoint", d) } } }, getBreakpoint: function (e) { if (e) { var i = !1, s = Object.keys(e).map((function (e) { if ("string" == typeof e && 0 === e.indexOf("@")) { var i = parseFloat(e.substr(1)); return { value: t.innerHeight * i, point: e } } return { value: e, point: e } })); s.sort((function (e, t) { return parseInt(e.value, 10) - parseInt(t.value, 10) })); for (var a = 0; a < s.length; a += 1) { var r = s[a], n = r.point; r.value <= t.innerWidth && (i = n) } return i || "max" } } }, checkOverflow: { checkOverflow: function () { var e = this.params, t = this.isLocked, i = this.slides.length > 0 && e.slidesOffsetBefore + e.spaceBetween * (this.slides.length - 1) + this.slides[0].offsetWidth * this.slides.length; e.slidesOffsetBefore && e.slidesOffsetAfter && i ? this.isLocked = i <= this.size : this.isLocked = 1 === this.snapGrid.length, this.allowSlideNext = !this.isLocked, this.allowSlidePrev = !this.isLocked, t !== this.isLocked && this.emit(this.isLocked ? "lock" : "unlock"), t && t !== this.isLocked && (this.isEnd = !1, this.navigation.update()) } }, classes: { addClasses: function () { var e = this.classNames, t = this.params, i = this.rtl, s = this.$el, a = []; a.push("initialized"), a.push(t.direction), t.freeMode && a.push("free-mode"), t.autoHeight && a.push("autoheight"), i && a.push("rtl"), t.slidesPerColumn > 1 && (a.push("multirow"), "column" === t.slidesPerColumnFill && a.push("multirow-column")), I.android && a.push("android"), I.ios && a.push("ios"), t.cssMode && a.push("css-mode"), a.forEach((function (i) { e.push(t.containerModifierClass + i) })), s.addClass(e.join(" ")) }, removeClasses: function () { var e = this.$el, t = this.classNames; e.removeClass(t.join(" ")) } }, images: { loadImage: function (e, i, s, a, r, n) { var o; function l() { n && n() } e.complete && r ? l() : i ? ((o = new t.Image).onload = l, o.onerror = l, a && (o.sizes = a), s && (o.srcset = s), i && (o.src = i)) : l() }, preloadImages: function () { var e = this; function t() { null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady"))) } e.imagesToLoad = e.$el.find("img"); for (var i = 0; i < e.imagesToLoad.length; i += 1) { var s = e.imagesToLoad[i]; e.loadImage(s, s.currentSrc || s.getAttribute("src"), s.srcset || s.getAttribute("srcset"), s.sizes || s.getAttribute("sizes"), !0, t) } } } }, F = {}, W = function (e) { function t() { for (var i, a, r, l = [], d = arguments.length; d--;)l[d] = arguments[d]; 1 === l.length && l[0].constructor && l[0].constructor === Object ? r = l[0] : (a = (i = l)[0], r = i[1]), r || (r = {}), r = n.extend({}, r), a && !r.el && (r.el = a), e.call(this, r), Object.keys(Y).forEach((function (e) { Object.keys(Y[e]).forEach((function (i) { t.prototype[i] || (t.prototype[i] = Y[e][i]) })) })); var h = this; void 0 === h.modules && (h.modules = {}), Object.keys(h.modules).forEach((function (e) { var t = h.modules[e]; if (t.params) { var i = Object.keys(t.params)[0], s = t.params[i]; if ("object" != typeof s || null === s) return; if (!(i in r && "enabled" in s)) return; !0 === r[i] && (r[i] = { enabled: !0 }), "object" != typeof r[i] || "enabled" in r[i] || (r[i].enabled = !0), r[i] || (r[i] = { enabled: !1 }) } })); var p = n.extend({}, V); h.useModulesParams(p), h.params = n.extend({}, p, F, r), h.originalParams = n.extend({}, h.params), h.passedParams = n.extend({}, r), h.$ = s; var c = s(h.params.el); if (a = c[0]) { if (c.length > 1) { var u = []; return c.each((function (e, i) { var s = n.extend({}, r, { el: i }); u.push(new t(s)) })), u } var v, f, m; return a.swiper = h, c.data("swiper", h), a && a.shadowRoot && a.shadowRoot.querySelector ? (v = s(a.shadowRoot.querySelector("." + h.params.wrapperClass))).children = function (e) { return c.children(e) } : v = c.children("." + h.params.wrapperClass), n.extend(h, { $el: c, el: a, $wrapperEl: v, wrapperEl: v[0], classNames: [], slides: s(), slidesGrid: [], snapGrid: [], slidesSizesGrid: [], isHorizontal: function () { return "horizontal" === h.params.direction }, isVertical: function () { return "vertical" === h.params.direction }, rtl: "rtl" === a.dir.toLowerCase() || "rtl" === c.css("direction"), rtlTranslate: "horizontal" === h.params.direction && ("rtl" === a.dir.toLowerCase() || "rtl" === c.css("direction")), wrongRTL: "-webkit-box" === v.css("display"), activeIndex: 0, realIndex: 0, isBeginning: !0, isEnd: !1, translate: 0, previousTranslate: 0, progress: 0, velocity: 0, animating: !1, allowSlideNext: h.params.allowSlideNext, allowSlidePrev: h.params.allowSlidePrev, touchEvents: (f = ["touchstart", "touchmove", "touchend", "touchcancel"], m = ["mousedown", "mousemove", "mouseup"], o.pointerEvents && (m = ["pointerdown", "pointermove", "pointerup"]), h.touchEventsTouch = { start: f[0], move: f[1], end: f[2], cancel: f[3] }, h.touchEventsDesktop = { start: m[0], move: m[1], end: m[2] }, o.touch || !h.params.simulateTouch ? h.touchEventsTouch : h.touchEventsDesktop), touchEventsData: { isTouched: void 0, isMoved: void 0, allowTouchCallbacks: void 0, touchStartTime: void 0, isScrolling: void 0, currentTranslate: void 0, startTranslate: void 0, allowThresholdMove: void 0, formElements: "input, select, option, textarea, button, video, label", lastClickTime: n.now(), clickTimeout: void 0, velocities: [], allowMomentumBounce: void 0, isTouchEvent: void 0, startMoving: void 0 }, allowClick: !0, allowTouchMove: h.params.allowTouchMove, touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 }, imagesToLoad: [], imagesLoaded: 0 }), h.useModules(), h.params.init && h.init(), h } } e && (t.__proto__ = e), t.prototype = Object.create(e && e.prototype), t.prototype.constructor = t; var i = { extendedDefaults: { configurable: !0 }, defaults: { configurable: !0 }, Class: { configurable: !0 }, $: { configurable: !0 } }; return t.prototype.slidesPerViewDynamic = function () { var e = this.params, t = this.slides, i = this.slidesGrid, s = this.size, a = this.activeIndex, r = 1; if (e.centeredSlides) { for (var n, o = t[a].swiperSlideSize, l = a + 1; l < t.length; l += 1)t[l] && !n && (r += 1, (o += t[l].swiperSlideSize) > s && (n = !0)); for (var d = a - 1; d >= 0; d -= 1)t[d] && !n && (r += 1, (o += t[d].swiperSlideSize) > s && (n = !0)) } else for (var h = a + 1; h < t.length; h += 1)i[h] - i[a] < s && (r += 1); return r }, t.prototype.update = function () { var e = this; if (e && !e.destroyed) { var t = e.snapGrid, i = e.params; i.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode ? (s(), e.params.autoHeight && e.updateAutoHeight()) : (("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)) || s(), i.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update") } function s() { var t = e.rtlTranslate ? -1 * e.translate : e.translate, i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate()); e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses() } }, t.prototype.changeDirection = function (e, t) { void 0 === t && (t = !0); var i = this.params.direction; return e || (e = "horizontal" === i ? "vertical" : "horizontal"), e === i || "horizontal" !== e && "vertical" !== e ? this : (this.$el.removeClass("" + this.params.containerModifierClass + i).addClass("" + this.params.containerModifierClass + e), this.params.direction = e, this.slides.each((function (t, i) { "vertical" === e ? i.style.width = "" : i.style.height = "" })), this.emit("changeDirection"), t && this.update(), this) }, t.prototype.init = function () { this.initialized || (this.emit("beforeInit"), this.params.breakpoints && this.setBreakpoint(), this.addClasses(), this.params.loop && this.loopCreate(), this.updateSize(), this.updateSlides(), this.params.watchOverflow && this.checkOverflow(), this.params.grabCursor && this.setGrabCursor(), this.params.preloadImages && this.preloadImages(), this.params.loop ? this.slideTo(this.params.initialSlide + this.loopedSlides, 0, this.params.runCallbacksOnInit) : this.slideTo(this.params.initialSlide, 0, this.params.runCallbacksOnInit), this.attachEvents(), this.initialized = !0, this.emit("init")) }, t.prototype.destroy = function (e, t) { void 0 === e && (e = !0), void 0 === t && (t = !0); var i = this, s = i.params, a = i.$el, r = i.$wrapperEl, o = i.slides; return void 0 === i.params || i.destroyed ? null : (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), s.loop && i.loopDestroy(), t && (i.removeClasses(), a.removeAttr("style"), r.removeAttr("style"), o && o.length && o.removeClass([s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")), i.emit("destroy"), Object.keys(i.eventsListeners).forEach((function (e) { i.off(e) })), !1 !== e && (i.$el[0].swiper = null, i.$el.data("swiper", null), n.deleteProps(i)), i.destroyed = !0, null) }, t.extendDefaults = function (e) { n.extend(F, e) }, i.extendedDefaults.get = function () { return F }, i.defaults.get = function () { return V }, i.Class.get = function () { return e }, i.$.get = function () { return s }, Object.defineProperties(t, i), t }(l), R = { name: "device", proto: { device: I }, static: { device: I } }, q = { name: "support", proto: { support: o }, static: { support: o } }, j = { isEdge: !!t.navigator.userAgent.match(/Edge/g), isSafari: function () { var e = t.navigator.userAgent.toLowerCase(); return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0 }(), isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent) }, K = { name: "browser", proto: { browser: j }, static: { browser: j } }, U = { name: "resize", create: function () { var e = this; n.extend(e, { resize: { resizeHandler: function () { e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize")) }, orientationChangeHandler: function () { e && !e.destroyed && e.initialized && e.emit("orientationchange") } } }) }, on: { init: function () { t.addEventListener("resize", this.resize.resizeHandler), t.addEventListener("orientationchange", this.resize.orientationChangeHandler) }, destroy: function () { t.removeEventListener("resize", this.resize.resizeHandler), t.removeEventListener("orientationchange", this.resize.orientationChangeHandler) } } }, _ = { func: t.MutationObserver || t.WebkitMutationObserver, attach: function (e, i) { void 0 === i && (i = {}); var s = this, a = new (0, _.func)((function (e) { if (1 !== e.length) { var i = function () { s.emit("observerUpdate", e[0]) }; t.requestAnimationFrame ? t.requestAnimationFrame(i) : t.setTimeout(i, 0) } else s.emit("observerUpdate", e[0]) })); a.observe(e, { attributes: void 0 === i.attributes || i.attributes, childList: void 0 === i.childList || i.childList, characterData: void 0 === i.characterData || i.characterData }), s.observer.observers.push(a) }, init: function () { if (o.observer && this.params.observer) { if (this.params.observeParents) for (var e = this.$el.parents(), t = 0; t < e.length; t += 1)this.observer.attach(e[t]); this.observer.attach(this.$el[0], { childList: this.params.observeSlideChildren }), this.observer.attach(this.$wrapperEl[0], { attributes: !1 }) } }, destroy: function () { this.observer.observers.forEach((function (e) { e.disconnect() })), this.observer.observers = [] } }, Z = { name: "observer", params: { observer: !1, observeParents: !1, observeSlideChildren: !1 }, create: function () { n.extend(this, { observer: { init: _.init.bind(this), attach: _.attach.bind(this), destroy: _.destroy.bind(this), observers: [] } }) }, on: { init: function () { this.observer.init() }, destroy: function () { this.observer.destroy() } } }, Q = { update: function (e) { var t = this, i = t.params, s = i.slidesPerView, a = i.slidesPerGroup, r = i.centeredSlides, o = t.params.virtual, l = o.addSlidesBefore, d = o.addSlidesAfter, h = t.virtual, p = h.from, c = h.to, u = h.slides, v = h.slidesGrid, f = h.renderSlide, m = h.offset; t.updateActiveIndex(); var g, b, w, y = t.activeIndex || 0; g = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top", r ? (b = Math.floor(s / 2) + a + l, w = Math.floor(s / 2) + a + d) : (b = s + (a - 1) + l, w = a + d); var x = Math.max((y || 0) - w, 0), T = Math.min((y || 0) + b, u.length - 1), E = (t.slidesGrid[x] || 0) - (t.slidesGrid[0] || 0); function S() { t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load() } if (n.extend(t.virtual, { from: x, to: T, offset: E, slidesGrid: t.slidesGrid }), p === x && c === T && !e) return t.slidesGrid !== v && E !== m && t.slides.css(g, E + "px"), void t.updateProgress(); if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, { offset: E, from: x, to: T, slides: function () { for (var e = [], t = x; t <= T; t += 1)e.push(u[t]); return e }() }), void S(); var C = [], M = []; if (e) t.$wrapperEl.find("." + t.params.slideClass).remove(); else for (var P = p; P <= c; P += 1)(P < x || P > T) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + P + '"]').remove(); for (var z = 0; z < u.length; z += 1)z >= x && z <= T && (void 0 === c || e ? M.push(z) : (z > c && M.push(z), z < p && C.push(z))); M.forEach((function (e) { t.$wrapperEl.append(f(u[e], e)) })), C.sort((function (e, t) { return t - e })).forEach((function (e) { t.$wrapperEl.prepend(f(u[e], e)) })), t.$wrapperEl.children(".swiper-slide").css(g, E + "px"), S() }, renderSlide: function (e, t) { var i = this.params.virtual; if (i.cache && this.virtual.cache[t]) return this.virtual.cache[t]; var a = i.renderSlide ? s(i.renderSlide.call(this, e, t)) : s('<div class="' + this.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>"); return a.attr("data-swiper-slide-index") || a.attr("data-swiper-slide-index", t), i.cache && (this.virtual.cache[t] = a), a }, appendSlide: function (e) { if ("object" == typeof e && "length" in e) for (var t = 0; t < e.length; t += 1)e[t] && this.virtual.slides.push(e[t]); else this.virtual.slides.push(e); this.virtual.update(!0) }, prependSlide: function (e) { var t = this.activeIndex, i = t + 1, s = 1; if (Array.isArray(e)) { for (var a = 0; a < e.length; a += 1)e[a] && this.virtual.slides.unshift(e[a]); i = t + e.length, s = e.length } else this.virtual.slides.unshift(e); if (this.params.virtual.cache) { var r = this.virtual.cache, n = {}; Object.keys(r).forEach((function (e) { var t = r[e], i = t.attr("data-swiper-slide-index"); i && t.attr("data-swiper-slide-index", parseInt(i, 10) + 1), n[parseInt(e, 10) + s] = t })), this.virtual.cache = n } this.virtual.update(!0), this.slideTo(i, 0) }, removeSlide: function (e) { if (null != e) { var t = this.activeIndex; if (Array.isArray(e)) for (var i = e.length - 1; i >= 0; i -= 1)this.virtual.slides.splice(e[i], 1), this.params.virtual.cache && delete this.virtual.cache[e[i]], e[i] < t && (t -= 1), t = Math.max(t, 0); else this.virtual.slides.splice(e, 1), this.params.virtual.cache && delete this.virtual.cache[e], e < t && (t -= 1), t = Math.max(t, 0); this.virtual.update(!0), this.slideTo(t, 0) } }, removeAllSlides: function () { this.virtual.slides = [], this.params.virtual.cache && (this.virtual.cache = {}), this.virtual.update(!0), this.slideTo(0, 0) } }, J = { name: "virtual", params: { virtual: { enabled: !1, slides: [], cache: !0, renderSlide: null, renderExternal: null, addSlidesBefore: 0, addSlidesAfter: 0 } }, create: function () { n.extend(this, { virtual: { update: Q.update.bind(this), appendSlide: Q.appendSlide.bind(this), prependSlide: Q.prependSlide.bind(this), removeSlide: Q.removeSlide.bind(this), removeAllSlides: Q.removeAllSlides.bind(this), renderSlide: Q.renderSlide.bind(this), slides: this.params.virtual.slides, cache: {} } }) }, on: { beforeInit: function () { if (this.params.virtual.enabled) { this.classNames.push(this.params.containerModifierClass + "virtual"); var e = { watchSlidesProgress: !0 }; n.extend(this.params, e), n.extend(this.originalParams, e), this.params.initialSlide || this.virtual.update() } }, setTranslate: function () { this.params.virtual.enabled && this.virtual.update() } } }, ee = { handle: function (i) { var s = this.rtlTranslate, a = i; a.originalEvent && (a = a.originalEvent); var r = a.keyCode || a.charCode; if (!this.allowSlideNext && (this.isHorizontal() && 39 === r || this.isVertical() && 40 === r || 34 === r)) return !1; if (!this.allowSlidePrev && (this.isHorizontal() && 37 === r || this.isVertical() && 38 === r || 33 === r)) return !1; if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || e.activeElement && e.activeElement.nodeName && ("input" === e.activeElement.nodeName.toLowerCase() || "textarea" === e.activeElement.nodeName.toLowerCase()))) { if (this.params.keyboard.onlyInViewport && (33 === r || 34 === r || 37 === r || 39 === r || 38 === r || 40 === r)) { var n = !1; if (this.$el.parents("." + this.params.slideClass).length > 0 && 0 === this.$el.parents("." + this.params.slideActiveClass).length) return; var o = t.innerWidth, l = t.innerHeight, d = this.$el.offset(); s && (d.left -= this.$el[0].scrollLeft); for (var h = [[d.left, d.top], [d.left + this.width, d.top], [d.left, d.top + this.height], [d.left + this.width, d.top + this.height]], p = 0; p < h.length; p += 1) { var c = h[p]; c[0] >= 0 && c[0] <= o && c[1] >= 0 && c[1] <= l && (n = !0) } if (!n) return } this.isHorizontal() ? (33 !== r && 34 !== r && 37 !== r && 39 !== r || (a.preventDefault ? a.preventDefault() : a.returnValue = !1), (34 !== r && 39 !== r || s) && (33 !== r && 37 !== r || !s) || this.slideNext(), (33 !== r && 37 !== r || s) && (34 !== r && 39 !== r || !s) || this.slidePrev()) : (33 !== r && 34 !== r && 38 !== r && 40 !== r || (a.preventDefault ? a.preventDefault() : a.returnValue = !1), 34 !== r && 40 !== r || this.slideNext(), 33 !== r && 38 !== r || this.slidePrev()), this.emit("keyPress", r) } }, enable: function () { this.keyboard.enabled || (s(e).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0) }, disable: function () { this.keyboard.enabled && (s(e).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1) } }, te = { name: "keyboard", params: { keyboard: { enabled: !1, onlyInViewport: !0 } }, create: function () { n.extend(this, { keyboard: { enabled: !1, enable: ee.enable.bind(this), disable: ee.disable.bind(this), handle: ee.handle.bind(this) } }) }, on: { init: function () { this.params.keyboard.enabled && this.keyboard.enable() }, destroy: function () { this.keyboard.enabled && this.keyboard.disable() } } }; var ie = { lastScrollTime: n.now(), lastEventBeforeSnap: void 0, recentWheelEvents: [], event: function () { return t.navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function () { var t = "onwheel" in e; if (!t) { var i = e.createElement("div"); i.setAttribute("onwheel", "return;"), t = "function" == typeof i.onwheel } return !t && e.implementation && e.implementation.hasFeature && !0 !== e.implementation.hasFeature("", "") && (t = e.implementation.hasFeature("Events.wheel", "3.0")), t }() ? "wheel" : "mousewheel" }, normalize: function (e) { var t = 0, i = 0, s = 0, a = 0; return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), s = 10 * t, a = 10 * i, "deltaY" in e && (a = e.deltaY), "deltaX" in e && (s = e.deltaX), e.shiftKey && !s && (s = a, a = 0), (s || a) && e.deltaMode && (1 === e.deltaMode ? (s *= 40, a *= 40) : (s *= 800, a *= 800)), s && !t && (t = s < 1 ? -1 : 1), a && !i && (i = a < 1 ? -1 : 1), { spinX: t, spinY: i, pixelX: s, pixelY: a } }, handleMouseEnter: function () { this.mouseEntered = !0 }, handleMouseLeave: function () { this.mouseEntered = !1 }, handle: function (e) { var t = e, i = this, a = i.params.mousewheel; i.params.cssMode && t.preventDefault(); var r = i.$el; if ("container" !== i.params.mousewheel.eventsTarged && (r = s(i.params.mousewheel.eventsTarged)), !i.mouseEntered && !r[0].contains(t.target) && !a.releaseOnEdges) return !0; t.originalEvent && (t = t.originalEvent); var o = 0, l = i.rtlTranslate ? -1 : 1, d = ie.normalize(t); if (a.forceToAxis) if (i.isHorizontal()) { if (!(Math.abs(d.pixelX) > Math.abs(d.pixelY))) return !0; o = d.pixelX * l } else { if (!(Math.abs(d.pixelY) > Math.abs(d.pixelX))) return !0; o = d.pixelY } else o = Math.abs(d.pixelX) > Math.abs(d.pixelY) ? -d.pixelX * l : -d.pixelY; if (0 === o) return !0; if (a.invert && (o = -o), i.params.freeMode) { var h = { time: n.now(), delta: Math.abs(o), direction: Math.sign(o) }, p = i.mousewheel.lastEventBeforeSnap, c = p && h.time < p.time + 500 && h.delta <= p.delta && h.direction === p.direction; if (!c) { i.mousewheel.lastEventBeforeSnap = void 0, i.params.loop && i.loopFix(); var u = i.getTranslate() + o * a.sensitivity, v = i.isBeginning, f = i.isEnd; if (u >= i.minTranslate() && (u = i.minTranslate()), u <= i.maxTranslate() && (u = i.maxTranslate()), i.setTransition(0), i.setTranslate(u), i.updateProgress(), i.updateActiveIndex(), i.updateSlidesClasses(), (!v && i.isBeginning || !f && i.isEnd) && i.updateSlidesClasses(), i.params.freeModeSticky) { clearTimeout(i.mousewheel.timeout), i.mousewheel.timeout = void 0; var m = i.mousewheel.recentWheelEvents; m.length >= 15 && m.shift(); var g = m.length ? m[m.length - 1] : void 0, b = m[0]; if (m.push(h), g && (h.delta > g.delta || h.direction !== g.direction)) m.splice(0); else if (m.length >= 15 && h.time - b.time < 500 && b.delta - h.delta >= 1 && h.delta <= 6) { var w = o > 0 ? .8 : .2; i.mousewheel.lastEventBeforeSnap = h, m.splice(0), i.mousewheel.timeout = n.nextTick((function () { i.slideToClosest(i.params.speed, !0, void 0, w) }), 0) } i.mousewheel.timeout || (i.mousewheel.timeout = n.nextTick((function () { i.mousewheel.lastEventBeforeSnap = h, m.splice(0), i.slideToClosest(i.params.speed, !0, void 0, .5) }), 500)) } if (c || i.emit("scroll", t), i.params.autoplay && i.params.autoplayDisableOnInteraction && i.autoplay.stop(), u === i.minTranslate() || u === i.maxTranslate()) return !0 } } else { var y = { time: n.now(), delta: Math.abs(o), direction: Math.sign(o), raw: e }, x = i.mousewheel.recentWheelEvents; x.length >= 2 && x.shift(); var T = x.length ? x[x.length - 1] : void 0; if (x.push(y), T ? (y.direction !== T.direction || y.delta > T.delta) && i.mousewheel.animateSlider(y) : i.mousewheel.animateSlider(y), i.mousewheel.releaseScroll(y)) return !0 } return t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1 }, animateSlider: function (e) { return e.delta >= 6 && n.now() - this.mousewheel.lastScrollTime < 60 || (e.direction < 0 ? this.isEnd && !this.params.loop || this.animating || (this.slideNext(), this.emit("scroll", e.raw)) : this.isBeginning && !this.params.loop || this.animating || (this.slidePrev(), this.emit("scroll", e.raw)), this.mousewheel.lastScrollTime = (new t.Date).getTime(), !1) }, releaseScroll: function (e) { var t = this.params.mousewheel; if (e.direction < 0) { if (this.isEnd && !this.params.loop && t.releaseOnEdges) return !0 } else if (this.isBeginning && !this.params.loop && t.releaseOnEdges) return !0; return !1 }, enable: function () { var e = ie.event(); if (this.params.cssMode) return this.wrapperEl.removeEventListener(e, this.mousewheel.handle), !0; if (!e) return !1; if (this.mousewheel.enabled) return !1; var t = this.$el; return "container" !== this.params.mousewheel.eventsTarged && (t = s(this.params.mousewheel.eventsTarged)), t.on("mouseenter", this.mousewheel.handleMouseEnter), t.on("mouseleave", this.mousewheel.handleMouseLeave), t.on(e, this.mousewheel.handle), this.mousewheel.enabled = !0, !0 }, disable: function () { var e = ie.event(); if (this.params.cssMode) return this.wrapperEl.addEventListener(e, this.mousewheel.handle), !0; if (!e) return !1; if (!this.mousewheel.enabled) return !1; var t = this.$el; return "container" !== this.params.mousewheel.eventsTarged && (t = s(this.params.mousewheel.eventsTarged)), t.off(e, this.mousewheel.handle), this.mousewheel.enabled = !1, !0 } }, se = { update: function () { var e = this.params.navigation; if (!this.params.loop) { var t = this.navigation, i = t.$nextEl, s = t.$prevEl; s && s.length > 0 && (this.isBeginning ? s.addClass(e.disabledClass) : s.removeClass(e.disabledClass), s[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass)), i && i.length > 0 && (this.isEnd ? i.addClass(e.disabledClass) : i.removeClass(e.disabledClass), i[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass)) } }, onPrevClick: function (e) { e.preventDefault(), this.isBeginning && !this.params.loop || this.slidePrev() }, onNextClick: function (e) { e.preventDefault(), this.isEnd && !this.params.loop || this.slideNext() }, init: function () { var e, t, i = this.params.navigation; (i.nextEl || i.prevEl) && (i.nextEl && (e = s(i.nextEl), this.params.uniqueNavElements && "string" == typeof i.nextEl && e.length > 1 && 1 === this.$el.find(i.nextEl).length && (e = this.$el.find(i.nextEl))), i.prevEl && (t = s(i.prevEl), this.params.uniqueNavElements && "string" == typeof i.prevEl && t.length > 1 && 1 === this.$el.find(i.prevEl).length && (t = this.$el.find(i.prevEl))), e && e.length > 0 && e.on("click", this.navigation.onNextClick), t && t.length > 0 && t.on("click", this.navigation.onPrevClick), n.extend(this.navigation, { $nextEl: e, nextEl: e && e[0], $prevEl: t, prevEl: t && t[0] })) }, destroy: function () { var e = this.navigation, t = e.$nextEl, i = e.$prevEl; t && t.length && (t.off("click", this.navigation.onNextClick), t.removeClass(this.params.navigation.disabledClass)), i && i.length && (i.off("click", this.navigation.onPrevClick), i.removeClass(this.params.navigation.disabledClass)) } }, ae = { update: function () { var e = this.rtl, t = this.params.pagination; if (t.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) { var i, a = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length, r = this.pagination.$el, n = this.params.loop ? Math.ceil((a - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length; if (this.params.loop ? ((i = Math.ceil((this.activeIndex - this.loopedSlides) / this.params.slidesPerGroup)) > a - 1 - 2 * this.loopedSlides && (i -= a - 2 * this.loopedSlides), i > n - 1 && (i -= n), i < 0 && "bullets" !== this.params.paginationType && (i = n + i)) : i = void 0 !== this.snapIndex ? this.snapIndex : this.activeIndex || 0, "bullets" === t.type && this.pagination.bullets && this.pagination.bullets.length > 0) { var o, l, d, h = this.pagination.bullets; if (t.dynamicBullets && (this.pagination.bulletSize = h.eq(0)[this.isHorizontal() ? "outerWidth" : "outerHeight"](!0), r.css(this.isHorizontal() ? "width" : "height", this.pagination.bulletSize * (t.dynamicMainBullets + 4) + "px"), t.dynamicMainBullets > 1 && void 0 !== this.previousIndex && (this.pagination.dynamicBulletIndex += i - this.previousIndex, this.pagination.dynamicBulletIndex > t.dynamicMainBullets - 1 ? this.pagination.dynamicBulletIndex = t.dynamicMainBullets - 1 : this.pagination.dynamicBulletIndex < 0 && (this.pagination.dynamicBulletIndex = 0)), o = i - this.pagination.dynamicBulletIndex, d = ((l = o + (Math.min(h.length, t.dynamicMainBullets) - 1)) + o) / 2), h.removeClass(t.bulletActiveClass + " " + t.bulletActiveClass + "-next " + t.bulletActiveClass + "-next-next " + t.bulletActiveClass + "-prev " + t.bulletActiveClass + "-prev-prev " + t.bulletActiveClass + "-main"), r.length > 1) h.each((function (e, a) { var r = s(a), n = r.index(); n === i && r.addClass(t.bulletActiveClass), t.dynamicBullets && (n >= o && n <= l && r.addClass(t.bulletActiveClass + "-main"), n === o && r.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), n === l && r.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next")) })); else { var p = h.eq(i), c = p.index(); if (p.addClass(t.bulletActiveClass), t.dynamicBullets) { for (var u = h.eq(o), v = h.eq(l), f = o; f <= l; f += 1)h.eq(f).addClass(t.bulletActiveClass + "-main"); if (this.params.loop) if (c >= h.length - t.dynamicMainBullets) { for (var m = t.dynamicMainBullets; m >= 0; m -= 1)h.eq(h.length - m).addClass(t.bulletActiveClass + "-main"); h.eq(h.length - t.dynamicMainBullets - 1).addClass(t.bulletActiveClass + "-prev") } else u.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), v.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next"); else u.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), v.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next") } } if (t.dynamicBullets) { var g = Math.min(h.length, t.dynamicMainBullets + 4), b = (this.pagination.bulletSize * g - this.pagination.bulletSize) / 2 - d * this.pagination.bulletSize, w = e ? "right" : "left"; h.css(this.isHorizontal() ? w : "top", b + "px") } } if ("fraction" === t.type && (r.find("." + t.currentClass).text(t.formatFractionCurrent(i + 1)), r.find("." + t.totalClass).text(t.formatFractionTotal(n))), "progressbar" === t.type) { var y; y = t.progressbarOpposite ? this.isHorizontal() ? "vertical" : "horizontal" : this.isHorizontal() ? "horizontal" : "vertical"; var x = (i + 1) / n, T = 1, E = 1; "horizontal" === y ? T = x : E = x, r.find("." + t.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + T + ") scaleY(" + E + ")").transition(this.params.speed) } "custom" === t.type && t.renderCustom ? (r.html(t.renderCustom(this, i + 1, n)), this.emit("paginationRender", this, r[0])) : this.emit("paginationUpdate", this, r[0]), r[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](t.lockClass) } }, render: function () { var e = this.params.pagination; if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) { var t = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length, i = this.pagination.$el, s = ""; if ("bullets" === e.type) { for (var a = this.params.loop ? Math.ceil((t - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length, r = 0; r < a; r += 1)e.renderBullet ? s += e.renderBullet.call(this, r, e.bulletClass) : s += "<" + e.bulletElement + ' class="' + e.bulletClass + '"></' + e.bulletElement + ">"; i.html(s), this.pagination.bullets = i.find("." + e.bulletClass) } "fraction" === e.type && (s = e.renderFraction ? e.renderFraction.call(this, e.currentClass, e.totalClass) : '<span class="' + e.currentClass + '"></span> / <span class="' + e.totalClass + '"></span>', i.html(s)), "progressbar" === e.type && (s = e.renderProgressbar ? e.renderProgressbar.call(this, e.progressbarFillClass) : '<span class="' + e.progressbarFillClass + '"></span>', i.html(s)), "custom" !== e.type && this.emit("paginationRender", this.pagination.$el[0]) } }, init: function () { var e = this, t = e.params.pagination; if (t.el) { var i = s(t.el); 0 !== i.length && (e.params.uniqueNavElements && "string" == typeof t.el && i.length > 1 && 1 === e.$el.find(t.el).length && (i = e.$el.find(t.el)), "bullets" === t.type && t.clickable && i.addClass(t.clickableClass), i.addClass(t.modifierClass + t.type), "bullets" === t.type && t.dynamicBullets && (i.addClass("" + t.modifierClass + t.type + "-dynamic"), e.pagination.dynamicBulletIndex = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), "progressbar" === t.type && t.progressbarOpposite && i.addClass(t.progressbarOppositeClass), t.clickable && i.on("click", "." + t.bulletClass, (function (t) { t.preventDefault(); var i = s(this).index() * e.params.slidesPerGroup; e.params.loop && (i += e.loopedSlides), e.slideTo(i) })), n.extend(e.pagination, { $el: i, el: i[0] })) } }, destroy: function () { var e = this.params.pagination; if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) { var t = this.pagination.$el; t.removeClass(e.hiddenClass), t.removeClass(e.modifierClass + e.type), this.pagination.bullets && this.pagination.bullets.removeClass(e.bulletActiveClass), e.clickable && t.off("click", "." + e.bulletClass) } } }, re = { setTranslate: function () { if (this.params.scrollbar.el && this.scrollbar.el) { var e = this.scrollbar, t = this.rtlTranslate, i = this.progress, s = e.dragSize, a = e.trackSize, r = e.$dragEl, n = e.$el, o = this.params.scrollbar, l = s, d = (a - s) * i; t ? (d = -d) > 0 ? (l = s - d, d = 0) : -d + s > a && (l = a + d) : d < 0 ? (l = s + d, d = 0) : d + s > a && (l = a - d), this.isHorizontal() ? (r.transform("translate3d(" + d + "px, 0, 0)"), r[0].style.width = l + "px") : (r.transform("translate3d(0px, " + d + "px, 0)"), r[0].style.height = l + "px"), o.hide && (clearTimeout(this.scrollbar.timeout), n[0].style.opacity = 1, this.scrollbar.timeout = setTimeout((function () { n[0].style.opacity = 0, n.transition(400) }), 1e3)) } }, setTransition: function (e) { this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e) }, updateSize: function () { if (this.params.scrollbar.el && this.scrollbar.el) { var e = this.scrollbar, t = e.$dragEl, i = e.$el; t[0].style.width = "", t[0].style.height = ""; var s, a = this.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight, r = this.size / this.virtualSize, o = r * (a / this.size); s = "auto" === this.params.scrollbar.dragSize ? a * r : parseInt(this.params.scrollbar.dragSize, 10), this.isHorizontal() ? t[0].style.width = s + "px" : t[0].style.height = s + "px", i[0].style.display = r >= 1 ? "none" : "", this.params.scrollbar.hide && (i[0].style.opacity = 0), n.extend(e, { trackSize: a, divider: r, moveDivider: o, dragSize: s }), e.$el[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](this.params.scrollbar.lockClass) } }, getPointerPosition: function (e) { return this.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientX : e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientY : e.clientY }, setDragPosition: function (e) { var t, i = this.scrollbar, s = this.rtlTranslate, a = i.$el, r = i.dragSize, n = i.trackSize, o = i.dragStartPos; t = (i.getPointerPosition(e) - a.offset()[this.isHorizontal() ? "left" : "top"] - (null !== o ? o : r / 2)) / (n - r), t = Math.max(Math.min(t, 1), 0), s && (t = 1 - t); var l = this.minTranslate() + (this.maxTranslate() - this.minTranslate()) * t; this.updateProgress(l), this.setTranslate(l), this.updateActiveIndex(), this.updateSlidesClasses() }, onDragStart: function (e) { var t = this.params.scrollbar, i = this.scrollbar, s = this.$wrapperEl, a = i.$el, r = i.$dragEl; this.scrollbar.isTouched = !0, this.scrollbar.dragStartPos = e.target === r[0] || e.target === r ? i.getPointerPosition(e) - e.target.getBoundingClientRect()[this.isHorizontal() ? "left" : "top"] : null, e.preventDefault(), e.stopPropagation(), s.transition(100), r.transition(100), i.setDragPosition(e), clearTimeout(this.scrollbar.dragTimeout), a.transition(0), t.hide && a.css("opacity", 1), this.params.cssMode && this.$wrapperEl.css("scroll-snap-type", "none"), this.emit("scrollbarDragStart", e) }, onDragMove: function (e) { var t = this.scrollbar, i = this.$wrapperEl, s = t.$el, a = t.$dragEl; this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), i.transition(0), s.transition(0), a.transition(0), this.emit("scrollbarDragMove", e)) }, onDragEnd: function (e) { var t = this.params.scrollbar, i = this.scrollbar, s = this.$wrapperEl, a = i.$el; this.scrollbar.isTouched && (this.scrollbar.isTouched = !1, this.params.cssMode && (this.$wrapperEl.css("scroll-snap-type", ""), s.transition("")), t.hide && (clearTimeout(this.scrollbar.dragTimeout), this.scrollbar.dragTimeout = n.nextTick((function () { a.css("opacity", 0), a.transition(400) }), 1e3)), this.emit("scrollbarDragEnd", e), t.snapOnRelease && this.slideToClosest()) }, enableDraggable: function () { if (this.params.scrollbar.el) { var t = this.scrollbar, i = this.touchEventsTouch, s = this.touchEventsDesktop, a = this.params, r = t.$el[0], n = !(!o.passiveListener || !a.passiveListeners) && { passive: !1, capture: !1 }, l = !(!o.passiveListener || !a.passiveListeners) && { passive: !0, capture: !1 }; o.touch ? (r.addEventListener(i.start, this.scrollbar.onDragStart, n), r.addEventListener(i.move, this.scrollbar.onDragMove, n), r.addEventListener(i.end, this.scrollbar.onDragEnd, l)) : (r.addEventListener(s.start, this.scrollbar.onDragStart, n), e.addEventListener(s.move, this.scrollbar.onDragMove, n), e.addEventListener(s.end, this.scrollbar.onDragEnd, l)) } }, disableDraggable: function () { if (this.params.scrollbar.el) { var t = this.scrollbar, i = this.touchEventsTouch, s = this.touchEventsDesktop, a = this.params, r = t.$el[0], n = !(!o.passiveListener || !a.passiveListeners) && { passive: !1, capture: !1 }, l = !(!o.passiveListener || !a.passiveListeners) && { passive: !0, capture: !1 }; o.touch ? (r.removeEventListener(i.start, this.scrollbar.onDragStart, n), r.removeEventListener(i.move, this.scrollbar.onDragMove, n), r.removeEventListener(i.end, this.scrollbar.onDragEnd, l)) : (r.removeEventListener(s.start, this.scrollbar.onDragStart, n), e.removeEventListener(s.move, this.scrollbar.onDragMove, n), e.removeEventListener(s.end, this.scrollbar.onDragEnd, l)) } }, init: function () { if (this.params.scrollbar.el) { var e = this.scrollbar, t = this.$el, i = this.params.scrollbar, a = s(i.el); this.params.uniqueNavElements && "string" == typeof i.el && a.length > 1 && 1 === t.find(i.el).length && (a = t.find(i.el)); var r = a.find("." + this.params.scrollbar.dragClass); 0 === r.length && (r = s('<div class="' + this.params.scrollbar.dragClass + '"></div>'), a.append(r)), n.extend(e, { $el: a, el: a[0], $dragEl: r, dragEl: r[0] }), i.draggable && e.enableDraggable() } }, destroy: function () { this.scrollbar.disableDraggable() } }, ne = { setTransform: function (e, t) { var i = this.rtl, a = s(e), r = i ? -1 : 1, n = a.attr("data-swiper-parallax") || "0", o = a.attr("data-swiper-parallax-x"), l = a.attr("data-swiper-parallax-y"), d = a.attr("data-swiper-parallax-scale"), h = a.attr("data-swiper-parallax-opacity"); if (o || l ? (o = o || "0", l = l || "0") : this.isHorizontal() ? (o = n, l = "0") : (l = n, o = "0"), o = o.indexOf("%") >= 0 ? parseInt(o, 10) * t * r + "%" : o * t * r + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * t + "%" : l * t + "px", null != h) { var p = h - (h - 1) * (1 - Math.abs(t)); a[0].style.opacity = p } if (null == d) a.transform("translate3d(" + o + ", " + l + ", 0px)"); else { var c = d - (d - 1) * (1 - Math.abs(t)); a.transform("translate3d(" + o + ", " + l + ", 0px) scale(" + c + ")") } }, setTranslate: function () { var e = this, t = e.$el, i = e.slides, a = e.progress, r = e.snapGrid; t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function (t, i) { e.parallax.setTransform(i, a) })), i.each((function (t, i) { var n = i.progress; e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (n += Math.ceil(t / 2) - a * (r.length - 1)), n = Math.min(Math.max(n, -1), 1), s(i).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function (t, i) { e.parallax.setTransform(i, n) })) })) }, setTransition: function (e) { void 0 === e && (e = this.params.speed); this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function (t, i) { var a = s(i), r = parseInt(a.attr("data-swiper-parallax-duration"), 10) || e; 0 === e && (r = 0), a.transition(r) })) } }, oe = { getDistanceBetweenTouches: function (e) { if (e.targetTouches.length < 2) return 1; var t = e.targetTouches[0].pageX, i = e.targetTouches[0].pageY, s = e.targetTouches[1].pageX, a = e.targetTouches[1].pageY; return Math.sqrt(Math.pow(s - t, 2) + Math.pow(a - i, 2)) }, onGestureStart: function (e) { var t = this.params.zoom, i = this.zoom, a = i.gesture; if (i.fakeGestureTouched = !1, i.fakeGestureMoved = !1, !o.gestures) { if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return; i.fakeGestureTouched = !0, a.scaleStart = oe.getDistanceBetweenTouches(e) } a.$slideEl && a.$slideEl.length || (a.$slideEl = s(e.target).closest("." + this.params.slideClass), 0 === a.$slideEl.length && (a.$slideEl = this.slides.eq(this.activeIndex)), a.$imageEl = a.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), a.$imageWrapEl = a.$imageEl.parent("." + t.containerClass), a.maxRatio = a.$imageWrapEl.attr("data-swiper-zoom") || t.maxRatio, 0 !== a.$imageWrapEl.length) ? (a.$imageEl.transition(0), this.zoom.isScaling = !0) : a.$imageEl = void 0 }, onGestureChange: function (e) { var t = this.params.zoom, i = this.zoom, s = i.gesture; if (!o.gestures) { if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return; i.fakeGestureMoved = !0, s.scaleMove = oe.getDistanceBetweenTouches(e) } s.$imageEl && 0 !== s.$imageEl.length && (o.gestures ? i.scale = e.scale * i.currentScale : i.scale = s.scaleMove / s.scaleStart * i.currentScale, i.scale > s.maxRatio && (i.scale = s.maxRatio - 1 + Math.pow(i.scale - s.maxRatio + 1, .5)), i.scale < t.minRatio && (i.scale = t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, .5)), s.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")")) }, onGestureEnd: function (e) { var t = this.params.zoom, i = this.zoom, s = i.gesture; if (!o.gestures) { if (!i.fakeGestureTouched || !i.fakeGestureMoved) return; if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !I.android) return; i.fakeGestureTouched = !1, i.fakeGestureMoved = !1 } s.$imageEl && 0 !== s.$imageEl.length && (i.scale = Math.max(Math.min(i.scale, s.maxRatio), t.minRatio), s.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + i.scale + ")"), i.currentScale = i.scale, i.isScaling = !1, 1 === i.scale && (s.$slideEl = void 0)) }, onTouchStart: function (e) { var t = this.zoom, i = t.gesture, s = t.image; i.$imageEl && 0 !== i.$imageEl.length && (s.isTouched || (I.android && e.preventDefault(), s.isTouched = !0, s.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY)) }, onTouchMove: function (e) { var t = this.zoom, i = t.gesture, s = t.image, a = t.velocity; if (i.$imageEl && 0 !== i.$imageEl.length && (this.allowClick = !1, s.isTouched && i.$slideEl)) { s.isMoved || (s.width = i.$imageEl[0].offsetWidth, s.height = i.$imageEl[0].offsetHeight, s.startX = n.getTranslate(i.$imageWrapEl[0], "x") || 0, s.startY = n.getTranslate(i.$imageWrapEl[0], "y") || 0, i.slideWidth = i.$slideEl[0].offsetWidth, i.slideHeight = i.$slideEl[0].offsetHeight, i.$imageWrapEl.transition(0), this.rtl && (s.startX = -s.startX, s.startY = -s.startY)); var r = s.width * t.scale, o = s.height * t.scale; if (!(r < i.slideWidth && o < i.slideHeight)) { if (s.minX = Math.min(i.slideWidth / 2 - r / 2, 0), s.maxX = -s.minX, s.minY = Math.min(i.slideHeight / 2 - o / 2, 0), s.maxY = -s.minY, s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !s.isMoved && !t.isScaling) { if (this.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x)) return void (s.isTouched = !1); if (!this.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y)) return void (s.isTouched = !1) } e.preventDefault(), e.stopPropagation(), s.isMoved = !0, s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX, s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY, s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)), s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)), s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)), s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)), a.prevPositionX || (a.prevPositionX = s.touchesCurrent.x), a.prevPositionY || (a.prevPositionY = s.touchesCurrent.y), a.prevTime || (a.prevTime = Date.now()), a.x = (s.touchesCurrent.x - a.prevPositionX) / (Date.now() - a.prevTime) / 2, a.y = (s.touchesCurrent.y - a.prevPositionY) / (Date.now() - a.prevTime) / 2, Math.abs(s.touchesCurrent.x - a.prevPositionX) < 2 && (a.x = 0), Math.abs(s.touchesCurrent.y - a.prevPositionY) < 2 && (a.y = 0), a.prevPositionX = s.touchesCurrent.x, a.prevPositionY = s.touchesCurrent.y, a.prevTime = Date.now(), i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)") } } }, onTouchEnd: function () { var e = this.zoom, t = e.gesture, i = e.image, s = e.velocity; if (t.$imageEl && 0 !== t.$imageEl.length) { if (!i.isTouched || !i.isMoved) return i.isTouched = !1, void (i.isMoved = !1); i.isTouched = !1, i.isMoved = !1; var a = 300, r = 300, n = s.x * a, o = i.currentX + n, l = s.y * r, d = i.currentY + l; 0 !== s.x && (a = Math.abs((o - i.currentX) / s.x)), 0 !== s.y && (r = Math.abs((d - i.currentY) / s.y)); var h = Math.max(a, r); i.currentX = o, i.currentY = d; var p = i.width * e.scale, c = i.height * e.scale; i.minX = Math.min(t.slideWidth / 2 - p / 2, 0), i.maxX = -i.minX, i.minY = Math.min(t.slideHeight / 2 - c / 2, 0), i.maxY = -i.minY, i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX), i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY), t.$imageWrapEl.transition(h).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)") } }, onTransitionEnd: function () { var e = this.zoom, t = e.gesture; t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl.transform("translate3d(0,0,0)"), e.scale = 1, e.currentScale = 1, t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0) }, toggle: function (e) { var t = this.zoom; t.scale && 1 !== t.scale ? t.out() : t.in(e) }, in: function (e) { var t, i, s, a, r, n, o, l, d, h, p, c, u, v, f, m, g = this.zoom, b = this.params.zoom, w = g.gesture, y = g.image; (w.$slideEl || (w.$slideEl = this.slides.eq(this.activeIndex), w.$imageEl = w.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), w.$imageWrapEl = w.$imageEl.parent("." + b.containerClass)), w.$imageEl && 0 !== w.$imageEl.length) && (w.$slideEl.addClass("" + b.zoomedSlideClass), void 0 === y.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, i = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = y.touchesStart.x, i = y.touchesStart.y), g.scale = w.$imageWrapEl.attr("data-swiper-zoom") || b.maxRatio, g.currentScale = w.$imageWrapEl.attr("data-swiper-zoom") || b.maxRatio, e ? (f = w.$slideEl[0].offsetWidth, m = w.$slideEl[0].offsetHeight, s = w.$slideEl.offset().left + f / 2 - t, a = w.$slideEl.offset().top + m / 2 - i, o = w.$imageEl[0].offsetWidth, l = w.$imageEl[0].offsetHeight, d = o * g.scale, h = l * g.scale, u = -(p = Math.min(f / 2 - d / 2, 0)), v = -(c = Math.min(m / 2 - h / 2, 0)), (r = s * g.scale) < p && (r = p), r > u && (r = u), (n = a * g.scale) < c && (n = c), n > v && (n = v)) : (r = 0, n = 0), w.$imageWrapEl.transition(300).transform("translate3d(" + r + "px, " + n + "px,0)"), w.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + g.scale + ")")) }, out: function () { var e = this.zoom, t = this.params.zoom, i = e.gesture; i.$slideEl || (i.$slideEl = this.slides.eq(this.activeIndex), i.$imageEl = i.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), i.$imageWrapEl = i.$imageEl.parent("." + t.containerClass)), i.$imageEl && 0 !== i.$imageEl.length && (e.scale = 1, e.currentScale = 1, i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), i.$slideEl.removeClass("" + t.zoomedSlideClass), i.$slideEl = void 0) }, enable: function () { var e = this.zoom; if (!e.enabled) { e.enabled = !0; var t = !("touchstart" !== this.touchEvents.start || !o.passiveListener || !this.params.passiveListeners) && { passive: !0, capture: !1 }, i = !o.passiveListener || { passive: !1, capture: !0 }, s = "." + this.params.slideClass; o.gestures ? (this.$wrapperEl.on("gesturestart", s, e.onGestureStart, t), this.$wrapperEl.on("gesturechange", s, e.onGestureChange, t), this.$wrapperEl.on("gestureend", s, e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.on(this.touchEvents.start, s, e.onGestureStart, t), this.$wrapperEl.on(this.touchEvents.move, s, e.onGestureChange, i), this.$wrapperEl.on(this.touchEvents.end, s, e.onGestureEnd, t), this.touchEvents.cancel && this.$wrapperEl.on(this.touchEvents.cancel, s, e.onGestureEnd, t)), this.$wrapperEl.on(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove, i) } }, disable: function () { var e = this.zoom; if (e.enabled) { this.zoom.enabled = !1; var t = !("touchstart" !== this.touchEvents.start || !o.passiveListener || !this.params.passiveListeners) && { passive: !0, capture: !1 }, i = !o.passiveListener || { passive: !1, capture: !0 }, s = "." + this.params.slideClass; o.gestures ? (this.$wrapperEl.off("gesturestart", s, e.onGestureStart, t), this.$wrapperEl.off("gesturechange", s, e.onGestureChange, t), this.$wrapperEl.off("gestureend", s, e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.off(this.touchEvents.start, s, e.onGestureStart, t), this.$wrapperEl.off(this.touchEvents.move, s, e.onGestureChange, i), this.$wrapperEl.off(this.touchEvents.end, s, e.onGestureEnd, t), this.touchEvents.cancel && this.$wrapperEl.off(this.touchEvents.cancel, s, e.onGestureEnd, t)), this.$wrapperEl.off(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove, i) } } }, le = { loadInSlide: function (e, t) { void 0 === t && (t = !0); var i = this, a = i.params.lazy; if (void 0 !== e && 0 !== i.slides.length) { var r = i.virtual && i.params.virtual.enabled ? i.$wrapperEl.children("." + i.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : i.slides.eq(e), n = r.find("." + a.elementClass + ":not(." + a.loadedClass + "):not(." + a.loadingClass + ")"); !r.hasClass(a.elementClass) || r.hasClass(a.loadedClass) || r.hasClass(a.loadingClass) || (n = n.add(r[0])), 0 !== n.length && n.each((function (e, n) { var o = s(n); o.addClass(a.loadingClass); var l = o.attr("data-background"), d = o.attr("data-src"), h = o.attr("data-srcset"), p = o.attr("data-sizes"); i.loadImage(o[0], d || l, h, p, !1, (function () { if (null != i && i && (!i || i.params) && !i.destroyed) { if (l ? (o.css("background-image", 'url("' + l + '")'), o.removeAttr("data-background")) : (h && (o.attr("srcset", h), o.removeAttr("data-srcset")), p && (o.attr("sizes", p), o.removeAttr("data-sizes")), d && (o.attr("src", d), o.removeAttr("data-src"))), o.addClass(a.loadedClass).removeClass(a.loadingClass), r.find("." + a.preloaderClass).remove(), i.params.loop && t) { var e = r.attr("data-swiper-slide-index"); if (r.hasClass(i.params.slideDuplicateClass)) { var s = i.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + i.params.slideDuplicateClass + ")"); i.lazy.loadInSlide(s.index(), !1) } else { var n = i.$wrapperEl.children("." + i.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]'); i.lazy.loadInSlide(n.index(), !1) } } i.emit("lazyImageReady", r[0], o[0]), i.params.autoHeight && i.updateAutoHeight() } })), i.emit("lazyImageLoad", r[0], o[0]) })) } }, load: function () { var e = this, t = e.$wrapperEl, i = e.params, a = e.slides, r = e.activeIndex, n = e.virtual && i.virtual.enabled, o = i.lazy, l = i.slidesPerView; function d(e) { if (n) { if (t.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0 } else if (a[e]) return !0; return !1 } function h(e) { return n ? s(e).attr("data-swiper-slide-index") : s(e).index() } if ("auto" === l && (l = 0), e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0), e.params.watchSlidesVisibility) t.children("." + i.slideVisibleClass).each((function (t, i) { var a = n ? s(i).attr("data-swiper-slide-index") : s(i).index(); e.lazy.loadInSlide(a) })); else if (l > 1) for (var p = r; p < r + l; p += 1)d(p) && e.lazy.loadInSlide(p); else e.lazy.loadInSlide(r); if (o.loadPrevNext) if (l > 1 || o.loadPrevNextAmount && o.loadPrevNextAmount > 1) { for (var c = o.loadPrevNextAmount, u = l, v = Math.min(r + u + Math.max(c, u), a.length), f = Math.max(r - Math.max(u, c), 0), m = r + l; m < v; m += 1)d(m) && e.lazy.loadInSlide(m); for (var g = f; g < r; g += 1)d(g) && e.lazy.loadInSlide(g) } else { var b = t.children("." + i.slideNextClass); b.length > 0 && e.lazy.loadInSlide(h(b)); var w = t.children("." + i.slidePrevClass); w.length > 0 && e.lazy.loadInSlide(h(w)) } } }, de = { LinearSpline: function (e, t) { var i, s, a, r, n, o = function (e, t) { for (s = -1, i = e.length; i - s > 1;)e[a = i + s >> 1] <= t ? s = a : i = a; return i }; return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function (e) { return e ? (n = o(this.x, e), r = n - 1, (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0 }, this }, getInterpolateFunction: function (e) { this.controller.spline || (this.controller.spline = this.params.loop ? new de.LinearSpline(this.slidesGrid, e.slidesGrid) : new de.LinearSpline(this.snapGrid, e.snapGrid)) }, setTranslate: function (e, t) { var i, s, a = this, r = a.controller.control; function n(e) { var t = a.rtlTranslate ? -a.translate : a.translate; "slide" === a.params.controller.by && (a.controller.getInterpolateFunction(e), s = -a.controller.spline.interpolate(-t)), s && "container" !== a.params.controller.by || (i = (e.maxTranslate() - e.minTranslate()) / (a.maxTranslate() - a.minTranslate()), s = (t - a.minTranslate()) * i + e.minTranslate()), a.params.controller.inverse && (s = e.maxTranslate() - s), e.updateProgress(s), e.setTranslate(s, a), e.updateActiveIndex(), e.updateSlidesClasses() } if (Array.isArray(r)) for (var o = 0; o < r.length; o += 1)r[o] !== t && r[o] instanceof W && n(r[o]); else r instanceof W && t !== r && n(r) }, setTransition: function (e, t) { var i, s = this, a = s.controller.control; function r(t) { t.setTransition(e, s), 0 !== e && (t.transitionStart(), t.params.autoHeight && n.nextTick((function () { t.updateAutoHeight() })), t.$wrapperEl.transitionEnd((function () { a && (t.params.loop && "slide" === s.params.controller.by && t.loopFix(), t.transitionEnd()) }))) } if (Array.isArray(a)) for (i = 0; i < a.length; i += 1)a[i] !== t && a[i] instanceof W && r(a[i]); else a instanceof W && t !== a && r(a) } }, he = { makeElFocusable: function (e) { return e.attr("tabIndex", "0"), e }, addElRole: function (e, t) { return e.attr("role", t), e }, addElLabel: function (e, t) { return e.attr("aria-label", t), e }, disableEl: function (e) { return e.attr("aria-disabled", !0), e }, enableEl: function (e) { return e.attr("aria-disabled", !1), e }, onEnterKey: function (e) { var t = this.params.a11y; if (13 === e.keyCode) { var i = s(e.target); this.navigation && this.navigation.$nextEl && i.is(this.navigation.$nextEl) && (this.isEnd && !this.params.loop || this.slideNext(), this.isEnd ? this.a11y.notify(t.lastSlideMessage) : this.a11y.notify(t.nextSlideMessage)), this.navigation && this.navigation.$prevEl && i.is(this.navigation.$prevEl) && (this.isBeginning && !this.params.loop || this.slidePrev(), this.isBeginning ? this.a11y.notify(t.firstSlideMessage) : this.a11y.notify(t.prevSlideMessage)), this.pagination && i.is("." + this.params.pagination.bulletClass) && i[0].click() } }, notify: function (e) { var t = this.a11y.liveRegion; 0 !== t.length && (t.html(""), t.html(e)) }, updateNavigation: function () { if (!this.params.loop && this.navigation) { var e = this.navigation, t = e.$nextEl, i = e.$prevEl; i && i.length > 0 && (this.isBeginning ? this.a11y.disableEl(i) : this.a11y.enableEl(i)), t && t.length > 0 && (this.isEnd ? this.a11y.disableEl(t) : this.a11y.enableEl(t)) } }, updatePagination: function () { var e = this, t = e.params.a11y; e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.bullets.each((function (i, a) { var r = s(a); e.a11y.makeElFocusable(r), e.a11y.addElRole(r, "button"), e.a11y.addElLabel(r, t.paginationBulletMessage.replace(/{{index}}/, r.index() + 1)) })) }, init: function () { this.$el.append(this.a11y.liveRegion); var e, t, i = this.params.a11y; this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && (this.a11y.makeElFocusable(e), this.a11y.addElRole(e, "button"), this.a11y.addElLabel(e, i.nextSlideMessage), e.on("keydown", this.a11y.onEnterKey)), t && (this.a11y.makeElFocusable(t), this.a11y.addElRole(t, "button"), this.a11y.addElLabel(t, i.prevSlideMessage), t.on("keydown", this.a11y.onEnterKey)), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.on("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey) }, destroy: function () { var e, t; this.a11y.liveRegion && this.a11y.liveRegion.length > 0 && this.a11y.liveRegion.remove(), this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && e.off("keydown", this.a11y.onEnterKey), t && t.off("keydown", this.a11y.onEnterKey), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.off("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey) } }, pe = { init: function () { if (this.params.history) { if (!t.history || !t.history.pushState) return this.params.history.enabled = !1, void (this.params.hashNavigation.enabled = !0); var e = this.history; e.initialized = !0, e.paths = pe.getPathValues(), (e.paths.key || e.paths.value) && (e.scrollToSlide(0, e.paths.value, this.params.runCallbacksOnInit), this.params.history.replaceState || t.addEventListener("popstate", this.history.setHistoryPopState)) } }, destroy: function () { this.params.history.replaceState || t.removeEventListener("popstate", this.history.setHistoryPopState) }, setHistoryPopState: function () { this.history.paths = pe.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1) }, getPathValues: function () { var e = t.location.pathname.slice(1).split("/").filter((function (e) { return "" !== e })), i = e.length; return { key: e[i - 2], value: e[i - 1] } }, setHistory: function (e, i) { if (this.history.initialized && this.params.history.enabled) { var s = this.slides.eq(i), a = pe.slugify(s.attr("data-history")); t.location.pathname.includes(e) || (a = e + "/" + a); var r = t.history.state; r && r.value === a || (this.params.history.replaceState ? t.history.replaceState({ value: a }, null, a) : t.history.pushState({ value: a }, null, a)) } }, slugify: function (e) { return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "") }, scrollToSlide: function (e, t, i) { if (t) for (var s = 0, a = this.slides.length; s < a; s += 1) { var r = this.slides.eq(s); if (pe.slugify(r.attr("data-history")) === t && !r.hasClass(this.params.slideDuplicateClass)) { var n = r.index(); this.slideTo(n, e, i) } } else this.slideTo(0, e, i) } }, ce = { onHashCange: function () { var t = e.location.hash.replace("#", ""); if (t !== this.slides.eq(this.activeIndex).attr("data-hash")) { var i = this.$wrapperEl.children("." + this.params.slideClass + '[data-hash="' + t + '"]').index(); if (void 0 === i) return; this.slideTo(i) } }, setHash: function () { if (this.hashNavigation.initialized && this.params.hashNavigation.enabled) if (this.params.hashNavigation.replaceState && t.history && t.history.replaceState) t.history.replaceState(null, null, "#" + this.slides.eq(this.activeIndex).attr("data-hash") || ""); else { var i = this.slides.eq(this.activeIndex), s = i.attr("data-hash") || i.attr("data-history"); e.location.hash = s || "" } }, init: function () { if (!(!this.params.hashNavigation.enabled || this.params.history && this.params.history.enabled)) { this.hashNavigation.initialized = !0; var i = e.location.hash.replace("#", ""); if (i) for (var a = 0, r = this.slides.length; a < r; a += 1) { var n = this.slides.eq(a); if ((n.attr("data-hash") || n.attr("data-history")) === i && !n.hasClass(this.params.slideDuplicateClass)) { var o = n.index(); this.slideTo(o, 0, this.params.runCallbacksOnInit, !0) } } this.params.hashNavigation.watchState && s(t).on("hashchange", this.hashNavigation.onHashCange) } }, destroy: function () { this.params.hashNavigation.watchState && s(t).off("hashchange", this.hashNavigation.onHashCange) } }, ue = { run: function () { var e = this, t = e.slides.eq(e.activeIndex), i = e.params.autoplay.delay; t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), clearTimeout(e.autoplay.timeout), e.autoplay.timeout = n.nextTick((function () { e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")), e.params.cssMode && e.autoplay.running && e.autoplay.run() }), i) }, start: function () { return void 0 === this.autoplay.timeout && (!this.autoplay.running && (this.autoplay.running = !0, this.emit("autoplayStart"), this.autoplay.run(), !0)) }, stop: function () { return !!this.autoplay.running && (void 0 !== this.autoplay.timeout && (this.autoplay.timeout && (clearTimeout(this.autoplay.timeout), this.autoplay.timeout = void 0), this.autoplay.running = !1, this.emit("autoplayStop"), !0)) }, pause: function (e) { this.autoplay.running && (this.autoplay.paused || (this.autoplay.timeout && clearTimeout(this.autoplay.timeout), this.autoplay.paused = !0, 0 !== e && this.params.autoplay.waitForTransition ? (this.$wrapperEl[0].addEventListener("transitionend", this.autoplay.onTransitionEnd), this.$wrapperEl[0].addEventListener("webkitTransitionEnd", this.autoplay.onTransitionEnd)) : (this.autoplay.paused = !1, this.autoplay.run()))) } }, ve = { setTranslate: function () { for (var e = this.slides, t = 0; t < e.length; t += 1) { var i = this.slides.eq(t), s = -i[0].swiperSlideOffset; this.params.virtualTranslate || (s -= this.translate); var a = 0; this.isHorizontal() || (a = s, s = 0); var r = this.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0); i.css({ opacity: r }).transform("translate3d(" + s + "px, " + a + "px, 0px)") } }, setTransition: function (e) { var t = this, i = t.slides, s = t.$wrapperEl; if (i.transition(e), t.params.virtualTranslate && 0 !== e) { var a = !1; i.transitionEnd((function () { if (!a && t && !t.destroyed) { a = !0, t.animating = !1; for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1)s.trigger(e[i]) } })) } } }, fe = { setTranslate: function () { var e, t = this.$el, i = this.$wrapperEl, a = this.slides, r = this.width, n = this.height, o = this.rtlTranslate, l = this.size, d = this.params.cubeEffect, h = this.isHorizontal(), p = this.virtual && this.params.virtual.enabled, c = 0; d.shadow && (h ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = s('<div class="swiper-cube-shadow"></div>'), i.append(e)), e.css({ height: r + "px" })) : 0 === (e = t.find(".swiper-cube-shadow")).length && (e = s('<div class="swiper-cube-shadow"></div>'), t.append(e))); for (var u = 0; u < a.length; u += 1) { var v = a.eq(u), f = u; p && (f = parseInt(v.attr("data-swiper-slide-index"), 10)); var m = 90 * f, g = Math.floor(m / 360); o && (m = -m, g = Math.floor(-m / 360)); var b = Math.max(Math.min(v[0].progress, 1), -1), w = 0, y = 0, x = 0; f % 4 == 0 ? (w = 4 * -g * l, x = 0) : (f - 1) % 4 == 0 ? (w = 0, x = 4 * -g * l) : (f - 2) % 4 == 0 ? (w = l + 4 * g * l, x = l) : (f - 3) % 4 == 0 && (w = -l, x = 3 * l + 4 * l * g), o && (w = -w), h || (y = w, w = 0); var T = "rotateX(" + (h ? 0 : -m) + "deg) rotateY(" + (h ? m : 0) + "deg) translate3d(" + w + "px, " + y + "px, " + x + "px)"; if (b <= 1 && b > -1 && (c = 90 * f + 90 * b, o && (c = 90 * -f - 90 * b)), v.transform(T), d.slideShadows) { var E = h ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"), S = h ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom"); 0 === E.length && (E = s('<div class="swiper-slide-shadow-' + (h ? "left" : "top") + '"></div>'), v.append(E)), 0 === S.length && (S = s('<div class="swiper-slide-shadow-' + (h ? "right" : "bottom") + '"></div>'), v.append(S)), E.length && (E[0].style.opacity = Math.max(-b, 0)), S.length && (S[0].style.opacity = Math.max(b, 0)) } } if (i.css({ "-webkit-transform-origin": "50% 50% -" + l / 2 + "px", "-moz-transform-origin": "50% 50% -" + l / 2 + "px", "-ms-transform-origin": "50% 50% -" + l / 2 + "px", "transform-origin": "50% 50% -" + l / 2 + "px" }), d.shadow) if (h) e.transform("translate3d(0px, " + (r / 2 + d.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")"); else { var C = Math.abs(c) - 90 * Math.floor(Math.abs(c) / 90), M = 1.5 - (Math.sin(2 * C * Math.PI / 360) / 2 + Math.cos(2 * C * Math.PI / 360) / 2), P = d.shadowScale, z = d.shadowScale / M, k = d.shadowOffset; e.transform("scale3d(" + P + ", 1, " + z + ") translate3d(0px, " + (n / 2 + k) + "px, " + -n / 2 / z + "px) rotateX(-90deg)") } var $ = j.isSafari || j.isUiWebView ? -l / 2 : 0; i.transform("translate3d(0px,0," + $ + "px) rotateX(" + (this.isHorizontal() ? 0 : c) + "deg) rotateY(" + (this.isHorizontal() ? -c : 0) + "deg)") }, setTransition: function (e) { var t = this.$el; this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e) } }, me = { setTranslate: function () { for (var e = this.slides, t = this.rtlTranslate, i = 0; i < e.length; i += 1) { var a = e.eq(i), r = a[0].progress; this.params.flipEffect.limitRotation && (r = Math.max(Math.min(a[0].progress, 1), -1)); var n = -180 * r, o = 0, l = -a[0].swiperSlideOffset, d = 0; if (this.isHorizontal() ? t && (n = -n) : (d = l, l = 0, o = -n, n = 0), a[0].style.zIndex = -Math.abs(Math.round(r)) + e.length, this.params.flipEffect.slideShadows) { var h = this.isHorizontal() ? a.find(".swiper-slide-shadow-left") : a.find(".swiper-slide-shadow-top"), p = this.isHorizontal() ? a.find(".swiper-slide-shadow-right") : a.find(".swiper-slide-shadow-bottom"); 0 === h.length && (h = s('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "left" : "top") + '"></div>'), a.append(h)), 0 === p.length && (p = s('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "right" : "bottom") + '"></div>'), a.append(p)), h.length && (h[0].style.opacity = Math.max(-r, 0)), p.length && (p[0].style.opacity = Math.max(r, 0)) } a.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)") } }, setTransition: function (e) { var t = this, i = t.slides, s = t.activeIndex, a = t.$wrapperEl; if (i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.virtualTranslate && 0 !== e) { var r = !1; i.eq(s).transitionEnd((function () { if (!r && t && !t.destroyed) { r = !0, t.animating = !1; for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1)a.trigger(e[i]) } })) } } }, ge = { setTranslate: function () { for (var e = this.width, t = this.height, i = this.slides, a = this.$wrapperEl, r = this.slidesSizesGrid, n = this.params.coverflowEffect, l = this.isHorizontal(), d = this.translate, h = l ? e / 2 - d : t / 2 - d, p = l ? n.rotate : -n.rotate, c = n.depth, u = 0, v = i.length; u < v; u += 1) { var f = i.eq(u), m = r[u], g = (h - f[0].swiperSlideOffset - m / 2) / m * n.modifier, b = l ? p * g : 0, w = l ? 0 : p * g, y = -c * Math.abs(g), x = n.stretch; "string" == typeof x && -1 !== x.indexOf("%") && (x = parseFloat(n.stretch) / 100 * m); var T = l ? 0 : x * g, E = l ? x * g : 0; Math.abs(E) < .001 && (E = 0), Math.abs(T) < .001 && (T = 0), Math.abs(y) < .001 && (y = 0), Math.abs(b) < .001 && (b = 0), Math.abs(w) < .001 && (w = 0); var S = "translate3d(" + E + "px," + T + "px," + y + "px)  rotateX(" + w + "deg) rotateY(" + b + "deg)"; if (f.transform(S), f[0].style.zIndex = 1 - Math.abs(Math.round(g)), n.slideShadows) { var C = l ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top"), M = l ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom"); 0 === C.length && (C = s('<div class="swiper-slide-shadow-' + (l ? "left" : "top") + '"></div>'), f.append(C)), 0 === M.length && (M = s('<div class="swiper-slide-shadow-' + (l ? "right" : "bottom") + '"></div>'), f.append(M)), C.length && (C[0].style.opacity = g > 0 ? g : 0), M.length && (M[0].style.opacity = -g > 0 ? -g : 0) } } (o.pointerEvents || o.prefixedPointerEvents) && (a[0].style.perspectiveOrigin = h + "px 50%") }, setTransition: function (e) { this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e) } }, be = { init: function () { var e = this.params.thumbs, t = this.constructor; e.swiper instanceof t ? (this.thumbs.swiper = e.swiper, n.extend(this.thumbs.swiper.originalParams, { watchSlidesProgress: !0, slideToClickedSlide: !1 }), n.extend(this.thumbs.swiper.params, { watchSlidesProgress: !0, slideToClickedSlide: !1 })) : n.isObject(e.swiper) && (this.thumbs.swiper = new t(n.extend({}, e.swiper, { watchSlidesVisibility: !0, watchSlidesProgress: !0, slideToClickedSlide: !1 })), this.thumbs.swiperCreated = !0), this.thumbs.swiper.$el.addClass(this.params.thumbs.thumbsContainerClass), this.thumbs.swiper.on("tap", this.thumbs.onThumbClick) }, onThumbClick: function () { var e = this.thumbs.swiper; if (e) { var t = e.clickedIndex, i = e.clickedSlide; if (!(i && s(i).hasClass(this.params.thumbs.slideThumbActiveClass) || null == t)) { var a; if (a = e.params.loop ? parseInt(s(e.clickedSlide).attr("data-swiper-slide-index"), 10) : t, this.params.loop) { var r = this.activeIndex; this.slides.eq(r).hasClass(this.params.slideDuplicateClass) && (this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft, r = this.activeIndex); var n = this.slides.eq(r).prevAll('[data-swiper-slide-index="' + a + '"]').eq(0).index(), o = this.slides.eq(r).nextAll('[data-swiper-slide-index="' + a + '"]').eq(0).index(); a = void 0 === n ? o : void 0 === o ? n : o - r < r - n ? o : n } this.slideTo(a) } } }, update: function (e) { var t = this.thumbs.swiper; if (t) { var i = "auto" === t.params.slidesPerView ? t.slidesPerViewDynamic() : t.params.slidesPerView; if (this.realIndex !== t.realIndex) { var s, a = t.activeIndex; if (t.params.loop) { t.slides.eq(a).hasClass(t.params.slideDuplicateClass) && (t.loopFix(), t._clientLeft = t.$wrapperEl[0].clientLeft, a = t.activeIndex); var r = t.slides.eq(a).prevAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index(), n = t.slides.eq(a).nextAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index(); s = void 0 === r ? n : void 0 === n ? r : n - a == a - r ? a : n - a < a - r ? n : r } else s = this.realIndex; t.visibleSlidesIndexes && t.visibleSlidesIndexes.indexOf(s) < 0 && (t.params.centeredSlides ? s = s > a ? s - Math.floor(i / 2) + 1 : s + Math.floor(i / 2) - 1 : s > a && (s = s - i + 1), t.slideTo(s, e ? 0 : void 0)) } var o = 1, l = this.params.thumbs.slideThumbActiveClass; if (this.params.slidesPerView > 1 && !this.params.centeredSlides && (o = this.params.slidesPerView), this.params.thumbs.multipleActiveThumbs || (o = 1), o = Math.floor(o), t.slides.removeClass(l), t.params.loop || t.params.virtual && t.params.virtual.enabled) for (var d = 0; d < o; d += 1)t.$wrapperEl.children('[data-swiper-slide-index="' + (this.realIndex + d) + '"]').addClass(l); else for (var h = 0; h < o; h += 1)t.slides.eq(this.realIndex + h).addClass(l) } } }, we = [R, q, K, U, Z, J, te, { name: "mousewheel", params: { mousewheel: { enabled: !1, releaseOnEdges: !1, invert: !1, forceToAxis: !1, sensitivity: 1, eventsTarged: "container" } }, create: function () { n.extend(this, { mousewheel: { enabled: !1, enable: ie.enable.bind(this), disable: ie.disable.bind(this), handle: ie.handle.bind(this), handleMouseEnter: ie.handleMouseEnter.bind(this), handleMouseLeave: ie.handleMouseLeave.bind(this), animateSlider: ie.animateSlider.bind(this), releaseScroll: ie.releaseScroll.bind(this), lastScrollTime: n.now(), lastEventBeforeSnap: void 0, recentWheelEvents: [] } }) }, on: { init: function () { !this.params.mousewheel.enabled && this.params.cssMode && this.mousewheel.disable(), this.params.mousewheel.enabled && this.mousewheel.enable() }, destroy: function () { this.params.cssMode && this.mousewheel.enable(), this.mousewheel.enabled && this.mousewheel.disable() } } }, { name: "navigation", params: { navigation: { nextEl: null, prevEl: null, hideOnClick: !1, disabledClass: "swiper-button-disabled", hiddenClass: "swiper-button-hidden", lockClass: "swiper-button-lock" } }, create: function () { n.extend(this, { navigation: { init: se.init.bind(this), update: se.update.bind(this), destroy: se.destroy.bind(this), onNextClick: se.onNextClick.bind(this), onPrevClick: se.onPrevClick.bind(this) } }) }, on: { init: function () { this.navigation.init(), this.navigation.update() }, toEdge: function () { this.navigation.update() }, fromEdge: function () { this.navigation.update() }, destroy: function () { this.navigation.destroy() }, click: function (e) { var t, i = this.navigation, a = i.$nextEl, r = i.$prevEl; !this.params.navigation.hideOnClick || s(e.target).is(r) || s(e.target).is(a) || (a ? t = a.hasClass(this.params.navigation.hiddenClass) : r && (t = r.hasClass(this.params.navigation.hiddenClass)), !0 === t ? this.emit("navigationShow", this) : this.emit("navigationHide", this), a && a.toggleClass(this.params.navigation.hiddenClass), r && r.toggleClass(this.params.navigation.hiddenClass)) } } }, { name: "pagination", params: { pagination: { el: null, bulletElement: "span", clickable: !1, hideOnClick: !1, renderBullet: null, renderProgressbar: null, renderFraction: null, renderCustom: null, progressbarOpposite: !1, type: "bullets", dynamicBullets: !1, dynamicMainBullets: 1, formatFractionCurrent: function (e) { return e }, formatFractionTotal: function (e) { return e }, bulletClass: "swiper-pagination-bullet", bulletActiveClass: "swiper-pagination-bullet-active", modifierClass: "swiper-pagination-", currentClass: "swiper-pagination-current", totalClass: "swiper-pagination-total", hiddenClass: "swiper-pagination-hidden", progressbarFillClass: "swiper-pagination-progressbar-fill", progressbarOppositeClass: "swiper-pagination-progressbar-opposite", clickableClass: "swiper-pagination-clickable", lockClass: "swiper-pagination-lock" } }, create: function () { n.extend(this, { pagination: { init: ae.init.bind(this), render: ae.render.bind(this), update: ae.update.bind(this), destroy: ae.destroy.bind(this), dynamicBulletIndex: 0 } }) }, on: { init: function () { this.pagination.init(), this.pagination.render(), this.pagination.update() }, activeIndexChange: function () { this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update() }, snapIndexChange: function () { this.params.loop || this.pagination.update() }, slidesLengthChange: function () { this.params.loop && (this.pagination.render(), this.pagination.update()) }, snapGridLengthChange: function () { this.params.loop || (this.pagination.render(), this.pagination.update()) }, destroy: function () { this.pagination.destroy() }, click: function (e) { this.params.pagination.el && this.params.pagination.hideOnClick && this.pagination.$el.length > 0 && !s(e.target).hasClass(this.params.pagination.bulletClass) && (!0 === this.pagination.$el.hasClass(this.params.pagination.hiddenClass) ? this.emit("paginationShow", this) : this.emit("paginationHide", this), this.pagination.$el.toggleClass(this.params.pagination.hiddenClass)) } } }, { name: "scrollbar", params: { scrollbar: { el: null, dragSize: "auto", hide: !1, draggable: !1, snapOnRelease: !0, lockClass: "swiper-scrollbar-lock", dragClass: "swiper-scrollbar-drag" } }, create: function () { n.extend(this, { scrollbar: { init: re.init.bind(this), destroy: re.destroy.bind(this), updateSize: re.updateSize.bind(this), setTranslate: re.setTranslate.bind(this), setTransition: re.setTransition.bind(this), enableDraggable: re.enableDraggable.bind(this), disableDraggable: re.disableDraggable.bind(this), setDragPosition: re.setDragPosition.bind(this), getPointerPosition: re.getPointerPosition.bind(this), onDragStart: re.onDragStart.bind(this), onDragMove: re.onDragMove.bind(this), onDragEnd: re.onDragEnd.bind(this), isTouched: !1, timeout: null, dragTimeout: null } }) }, on: { init: function () { this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate() }, update: function () { this.scrollbar.updateSize() }, resize: function () { this.scrollbar.updateSize() }, observerUpdate: function () { this.scrollbar.updateSize() }, setTranslate: function () { this.scrollbar.setTranslate() }, setTransition: function (e) { this.scrollbar.setTransition(e) }, destroy: function () { this.scrollbar.destroy() } } }, { name: "parallax", params: { parallax: { enabled: !1 } }, create: function () { n.extend(this, { parallax: { setTransform: ne.setTransform.bind(this), setTranslate: ne.setTranslate.bind(this), setTransition: ne.setTransition.bind(this) } }) }, on: { beforeInit: function () { this.params.parallax.enabled && (this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0) }, init: function () { this.params.parallax.enabled && this.parallax.setTranslate() }, setTranslate: function () { this.params.parallax.enabled && this.parallax.setTranslate() }, setTransition: function (e) { this.params.parallax.enabled && this.parallax.setTransition(e) } } }, { name: "zoom", params: { zoom: { enabled: !1, maxRatio: 3, minRatio: 1, toggle: !0, containerClass: "swiper-zoom-container", zoomedSlideClass: "swiper-slide-zoomed" } }, create: function () { var e = this, t = { enabled: !1, scale: 1, currentScale: 1, isScaling: !1, gesture: { $slideEl: void 0, slideWidth: void 0, slideHeight: void 0, $imageEl: void 0, $imageWrapEl: void 0, maxRatio: 3 }, image: { isTouched: void 0, isMoved: void 0, currentX: void 0, currentY: void 0, minX: void 0, minY: void 0, maxX: void 0, maxY: void 0, width: void 0, height: void 0, startX: void 0, startY: void 0, touchesStart: {}, touchesCurrent: {} }, velocity: { x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0 } }; "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach((function (i) { t[i] = oe[i].bind(e) })), n.extend(e, { zoom: t }); var i = 1; Object.defineProperty(e.zoom, "scale", { get: function () { return i }, set: function (t) { if (i !== t) { var s = e.zoom.gesture.$imageEl ? e.zoom.gesture.$imageEl[0] : void 0, a = e.zoom.gesture.$slideEl ? e.zoom.gesture.$slideEl[0] : void 0; e.emit("zoomChange", t, s, a) } i = t } }) }, on: { init: function () { this.params.zoom.enabled && this.zoom.enable() }, destroy: function () { this.zoom.disable() }, touchStart: function (e) { this.zoom.enabled && this.zoom.onTouchStart(e) }, touchEnd: function (e) { this.zoom.enabled && this.zoom.onTouchEnd(e) }, doubleTap: function (e) { this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e) }, transitionEnd: function () { this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd() }, slideChange: function () { this.zoom.enabled && this.params.zoom.enabled && this.params.cssMode && this.zoom.onTransitionEnd() } } }, { name: "lazy", params: { lazy: { enabled: !1, loadPrevNext: !1, loadPrevNextAmount: 1, loadOnTransitionStart: !1, elementClass: "swiper-lazy", loadingClass: "swiper-lazy-loading", loadedClass: "swiper-lazy-loaded", preloaderClass: "swiper-lazy-preloader" } }, create: function () { n.extend(this, { lazy: { initialImageLoaded: !1, load: le.load.bind(this), loadInSlide: le.loadInSlide.bind(this) } }) }, on: { beforeInit: function () { this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1) }, init: function () { this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load() }, scroll: function () { this.params.freeMode && !this.params.freeModeSticky && this.lazy.load() }, resize: function () { this.params.lazy.enabled && this.lazy.load() }, scrollbarDragMove: function () { this.params.lazy.enabled && this.lazy.load() }, transitionStart: function () { this.params.lazy.enabled && (this.params.lazy.loadOnTransitionStart || !this.params.lazy.loadOnTransitionStart && !this.lazy.initialImageLoaded) && this.lazy.load() }, transitionEnd: function () { this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load() }, slideChange: function () { this.params.lazy.enabled && this.params.cssMode && this.lazy.load() } } }, { name: "controller", params: { controller: { control: void 0, inverse: !1, by: "slide" } }, create: function () { n.extend(this, { controller: { control: this.params.controller.control, getInterpolateFunction: de.getInterpolateFunction.bind(this), setTranslate: de.setTranslate.bind(this), setTransition: de.setTransition.bind(this) } }) }, on: { update: function () { this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline) }, resize: function () { this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline) }, observerUpdate: function () { this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline) }, setTranslate: function (e, t) { this.controller.control && this.controller.setTranslate(e, t) }, setTransition: function (e, t) { this.controller.control && this.controller.setTransition(e, t) } } }, { name: "a11y", params: { a11y: { enabled: !0, notificationClass: "swiper-notification", prevSlideMessage: "Previous slide", nextSlideMessage: "Next slide", firstSlideMessage: "This is the first slide", lastSlideMessage: "This is the last slide", paginationBulletMessage: "Go to slide {{index}}" } }, create: function () { var e = this; n.extend(e, { a11y: { liveRegion: s('<span class="' + e.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>') } }), Object.keys(he).forEach((function (t) { e.a11y[t] = he[t].bind(e) })) }, on: { init: function () { this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation()) }, toEdge: function () { this.params.a11y.enabled && this.a11y.updateNavigation() }, fromEdge: function () { this.params.a11y.enabled && this.a11y.updateNavigation() }, paginationUpdate: function () { this.params.a11y.enabled && this.a11y.updatePagination() }, destroy: function () { this.params.a11y.enabled && this.a11y.destroy() } } }, { name: "history", params: { history: { enabled: !1, replaceState: !1, key: "slides" } }, create: function () { n.extend(this, { history: { init: pe.init.bind(this), setHistory: pe.setHistory.bind(this), setHistoryPopState: pe.setHistoryPopState.bind(this), scrollToSlide: pe.scrollToSlide.bind(this), destroy: pe.destroy.bind(this) } }) }, on: { init: function () { this.params.history.enabled && this.history.init() }, destroy: function () { this.params.history.enabled && this.history.destroy() }, transitionEnd: function () { this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex) }, slideChange: function () { this.history.initialized && this.params.cssMode && this.history.setHistory(this.params.history.key, this.activeIndex) } } }, { name: "hash-navigation", params: { hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 } }, create: function () { n.extend(this, { hashNavigation: { initialized: !1, init: ce.init.bind(this), destroy: ce.destroy.bind(this), setHash: ce.setHash.bind(this), onHashCange: ce.onHashCange.bind(this) } }) }, on: { init: function () { this.params.hashNavigation.enabled && this.hashNavigation.init() }, destroy: function () { this.params.hashNavigation.enabled && this.hashNavigation.destroy() }, transitionEnd: function () { this.hashNavigation.initialized && this.hashNavigation.setHash() }, slideChange: function () { this.hashNavigation.initialized && this.params.cssMode && this.hashNavigation.setHash() } } }, { name: "autoplay", params: { autoplay: { enabled: !1, delay: 3e3, waitForTransition: !0, disableOnInteraction: !0, stopOnLastSlide: !1, reverseDirection: !1 } }, create: function () { var e = this; n.extend(e, { autoplay: { running: !1, paused: !1, run: ue.run.bind(e), start: ue.start.bind(e), stop: ue.stop.bind(e), pause: ue.pause.bind(e), onVisibilityChange: function () { "hidden" === document.visibilityState && e.autoplay.running && e.autoplay.pause(), "visible" === document.visibilityState && e.autoplay.paused && (e.autoplay.run(), e.autoplay.paused = !1) }, onTransitionEnd: function (t) { e && !e.destroyed && e.$wrapperEl && t.target === this && (e.$wrapperEl[0].removeEventListener("transitionend", e.autoplay.onTransitionEnd), e.$wrapperEl[0].removeEventListener("webkitTransitionEnd", e.autoplay.onTransitionEnd), e.autoplay.paused = !1, e.autoplay.running ? e.autoplay.run() : e.autoplay.stop()) } } }) }, on: { init: function () { this.params.autoplay.enabled && (this.autoplay.start(), document.addEventListener("visibilitychange", this.autoplay.onVisibilityChange)) }, beforeTransitionStart: function (e, t) { this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop()) }, sliderFirstMove: function () { this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause()) }, touchEnd: function () { this.params.cssMode && this.autoplay.paused && !this.params.autoplay.disableOnInteraction && this.autoplay.run() }, destroy: function () { this.autoplay.running && this.autoplay.stop(), document.removeEventListener("visibilitychange", this.autoplay.onVisibilityChange) } } }, { name: "effect-fade", params: { fadeEffect: { crossFade: !1 } }, create: function () { n.extend(this, { fadeEffect: { setTranslate: ve.setTranslate.bind(this), setTransition: ve.setTransition.bind(this) } }) }, on: { beforeInit: function () { if ("fade" === this.params.effect) { this.classNames.push(this.params.containerModifierClass + "fade"); var e = { slidesPerView: 1, slidesPerColumn: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !0 }; n.extend(this.params, e), n.extend(this.originalParams, e) } }, setTranslate: function () { "fade" === this.params.effect && this.fadeEffect.setTranslate() }, setTransition: function (e) { "fade" === this.params.effect && this.fadeEffect.setTransition(e) } } }, { name: "effect-cube", params: { cubeEffect: { slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94 } }, create: function () { n.extend(this, { cubeEffect: { setTranslate: fe.setTranslate.bind(this), setTransition: fe.setTransition.bind(this) } }) }, on: { beforeInit: function () { if ("cube" === this.params.effect) { this.classNames.push(this.params.containerModifierClass + "cube"), this.classNames.push(this.params.containerModifierClass + "3d"); var e = { slidesPerView: 1, slidesPerColumn: 1, slidesPerGroup: 1, watchSlidesProgress: !0, resistanceRatio: 0, spaceBetween: 0, centeredSlides: !1, virtualTranslate: !0 }; n.extend(this.params, e), n.extend(this.originalParams, e) } }, setTranslate: function () { "cube" === this.params.effect && this.cubeEffect.setTranslate() }, setTransition: function (e) { "cube" === this.params.effect && this.cubeEffect.setTransition(e) } } }, { name: "effect-flip", params: { flipEffect: { slideShadows: !0, limitRotation: !0 } }, create: function () { n.extend(this, { flipEffect: { setTranslate: me.setTranslate.bind(this), setTransition: me.setTransition.bind(this) } }) }, on: { beforeInit: function () { if ("flip" === this.params.effect) { this.classNames.push(this.params.containerModifierClass + "flip"), this.classNames.push(this.params.containerModifierClass + "3d"); var e = { slidesPerView: 1, slidesPerColumn: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !0 }; n.extend(this.params, e), n.extend(this.originalParams, e) } }, setTranslate: function () { "flip" === this.params.effect && this.flipEffect.setTranslate() }, setTransition: function (e) { "flip" === this.params.effect && this.flipEffect.setTransition(e) } } }, { name: "effect-coverflow", params: { coverflowEffect: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0 } }, create: function () { n.extend(this, { coverflowEffect: { setTranslate: ge.setTranslate.bind(this), setTransition: ge.setTransition.bind(this) } }) }, on: { beforeInit: function () { "coverflow" === this.params.effect && (this.classNames.push(this.params.containerModifierClass + "coverflow"), this.classNames.push(this.params.containerModifierClass + "3d"), this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0) }, setTranslate: function () { "coverflow" === this.params.effect && this.coverflowEffect.setTranslate() }, setTransition: function (e) { "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e) } } }, { name: "thumbs", params: { thumbs: { multipleActiveThumbs: !0, swiper: null, slideThumbActiveClass: "swiper-slide-thumb-active", thumbsContainerClass: "swiper-container-thumbs" } }, create: function () { n.extend(this, { thumbs: { swiper: null, init: be.init.bind(this), update: be.update.bind(this), onThumbClick: be.onThumbClick.bind(this) } }) }, on: { beforeInit: function () { var e = this.params.thumbs; e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0)) }, slideChange: function () { this.thumbs.swiper && this.thumbs.update() }, update: function () { this.thumbs.swiper && this.thumbs.update() }, resize: function () { this.thumbs.swiper && this.thumbs.update() }, observerUpdate: function () { this.thumbs.swiper && this.thumbs.update() }, setTransition: function (e) { var t = this.thumbs.swiper; t && t.setTransition(e) }, beforeDestroy: function () { var e = this.thumbs.swiper; e && this.thumbs.swiperCreated && e && e.destroy() } } }]; return void 0 === W.use && (W.use = W.Class.use, W.installModule = W.Class.installModule), W.use(we), W }));
    !function (t, e) { "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) { return e(t, i) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery) }(window, function (t, e) { "use strict"; function i(i, r, a) { function h(t, e, n) { var o, r = "$()." + i + '("' + e + '")'; return t.each(function (t, h) { var u = a.data(h, i); if (!u) return void s(i + " not initialized. Cannot call methods, i.e. " + r); var d = u[e]; if (!d || "_" == e.charAt(0)) return void s(r + " is not a valid method"); var l = d.apply(u, n); o = void 0 === o ? l : o }), void 0 !== o ? o : t } function u(t, e) { t.each(function (t, n) { var o = a.data(n, i); o ? (o.option(e), o._init()) : (o = new r(n, e), a.data(n, i, o)) }) } a = a || e || t.jQuery, a && (r.prototype.option || (r.prototype.option = function (t) { a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t)) }), a.fn[i] = function (t) { if ("string" == typeof t) { var e = o.call(arguments, 1); return h(this, t, e) } return u(this, t), this }, n(a)) } function n(t) { !t || t && t.bridget || (t.bridget = i) } var o = Array.prototype.slice, r = t.console, s = "undefined" == typeof r ? function () { } : function (t) { r.error(t) }; return n(e || t.jQuery), i }), function (t, e) { "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e() }("undefined" != typeof window ? window : this, function () { function t() { } var e = t.prototype; return e.on = function (t, e) { if (t && e) { var i = this._events = this._events || {}, n = i[t] = i[t] || []; return -1 == n.indexOf(e) && n.push(e), this } }, e.once = function (t, e) { if (t && e) { this.on(t, e); var i = this._onceEvents = this._onceEvents || {}, n = i[t] = i[t] || {}; return n[e] = !0, this } }, e.off = function (t, e) { var i = this._events && this._events[t]; if (i && i.length) { var n = i.indexOf(e); return -1 != n && i.splice(n, 1), this } }, e.emitEvent = function (t, e) { var i = this._events && this._events[t]; if (i && i.length) { i = i.slice(0), e = e || []; for (var n = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) { var r = i[o], s = n && n[r]; s && (this.off(t, r), delete n[r]), r.apply(this, e) } return this } }, e.allOff = function () { delete this._events, delete this._onceEvents }, t }), function (t, e) { "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e() }(window, function () { "use strict"; function t(t) { var e = parseFloat(t), i = -1 == t.indexOf("%") && !isNaN(e); return i && e } function e() { } function i() { for (var t = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, e = 0; u > e; e++) { var i = h[e]; t[i] = 0 } return t } function n(t) { var e = getComputedStyle(t); return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), e } function o() { if (!d) { d = !0; var e = document.createElement("div"); e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box"; var i = document.body || document.documentElement; i.appendChild(e); var o = n(e); s = 200 == Math.round(t(o.width)), r.isBoxSizeOuter = s, i.removeChild(e) } } function r(e) { if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) { var r = n(e); if ("none" == r.display) return i(); var a = {}; a.width = e.offsetWidth, a.height = e.offsetHeight; for (var d = a.isBorderBox = "border-box" == r.boxSizing, l = 0; u > l; l++) { var c = h[l], f = r[c], m = parseFloat(f); a[c] = isNaN(m) ? 0 : m } var p = a.paddingLeft + a.paddingRight, g = a.paddingTop + a.paddingBottom, y = a.marginLeft + a.marginRight, v = a.marginTop + a.marginBottom, _ = a.borderLeftWidth + a.borderRightWidth, z = a.borderTopWidth + a.borderBottomWidth, E = d && s, b = t(r.width); b !== !1 && (a.width = b + (E ? 0 : p + _)); var x = t(r.height); return x !== !1 && (a.height = x + (E ? 0 : g + z)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (g + z), a.outerWidth = a.width + y, a.outerHeight = a.height + v, a } } var s, a = "undefined" == typeof console ? e : function (t) { console.error(t) }, h = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"], u = h.length, d = !1; return r }), function (t, e) { "use strict"; "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e() }(window, function () { "use strict"; var t = function () { var t = window.Element.prototype; if (t.matches) return "matches"; if (t.matchesSelector) return "matchesSelector"; for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) { var n = e[i], o = n + "MatchesSelector"; if (t[o]) return o } }(); return function (e, i) { return e[t](i) } }), function (t, e) { "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) { return e(t, i) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector) }(window, function (t, e) { var i = {}; i.extend = function (t, e) { for (var i in e) t[i] = e[i]; return t }, i.modulo = function (t, e) { return (t % e + e) % e }; var n = Array.prototype.slice; i.makeArray = function (t) { if (Array.isArray(t)) return t; if (null === t || void 0 === t) return []; var e = "object" == typeof t && "number" == typeof t.length; return e ? n.call(t) : [t] }, i.removeFrom = function (t, e) { var i = t.indexOf(e); -1 != i && t.splice(i, 1) }, i.getParent = function (t, i) { for (; t.parentNode && t != document.body;)if (t = t.parentNode, e(t, i)) return t }, i.getQueryElement = function (t) { return "string" == typeof t ? document.querySelector(t) : t }, i.handleEvent = function (t) { var e = "on" + t.type; this[e] && this[e](t) }, i.filterFindElements = function (t, n) { t = i.makeArray(t); var o = []; return t.forEach(function (t) { if (t instanceof HTMLElement) { if (!n) return void o.push(t); e(t, n) && o.push(t); for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++)o.push(i[r]) } }), o }, i.debounceMethod = function (t, e, i) { i = i || 100; var n = t.prototype[e], o = e + "Timeout"; t.prototype[e] = function () { var t = this[o]; clearTimeout(t); var e = arguments, r = this; this[o] = setTimeout(function () { n.apply(r, e), delete r[o] }, i) } }, i.docReady = function (t) { var e = document.readyState; "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t) }, i.toDashed = function (t) { return t.replace(/(.)([A-Z])/g, function (t, e, i) { return e + "-" + i }).toLowerCase() }; var o = t.console; return i.htmlInit = function (e, n) { i.docReady(function () { var r = i.toDashed(n), s = "data-" + r, a = document.querySelectorAll("[" + s + "]"), h = document.querySelectorAll(".js-" + r), u = i.makeArray(a).concat(i.makeArray(h)), d = s + "-options", l = t.jQuery; u.forEach(function (t) { var i, r = t.getAttribute(s) || t.getAttribute(d); try { i = r && JSON.parse(r) } catch (a) { return void (o && o.error("Error parsing " + s + " on " + t.className + ": " + a)) } var h = new e(t, i); l && l.data(t, n, h) }) }) }, i }), function (t, e) { "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize)) }(window, function (t, e) { "use strict"; function i(t) { for (var e in t) return !1; return e = null, !0 } function n(t, e) { t && (this.element = t, this.layout = e, this.position = { x: 0, y: 0 }, this._create()) } function o(t) { return t.replace(/([A-Z])/g, function (t) { return "-" + t.toLowerCase() }) } var r = document.documentElement.style, s = "string" == typeof r.transition ? "transition" : "WebkitTransition", a = "string" == typeof r.transform ? "transform" : "WebkitTransform", h = { WebkitTransition: "webkitTransitionEnd", transition: "transitionend" }[s], u = { transform: a, transition: s, transitionDuration: s + "Duration", transitionProperty: s + "Property", transitionDelay: s + "Delay" }, d = n.prototype = Object.create(t.prototype); d.constructor = n, d._create = function () { this._transn = { ingProperties: {}, clean: {}, onEnd: {} }, this.css({ position: "absolute" }) }, d.handleEvent = function (t) { var e = "on" + t.type; this[e] && this[e](t) }, d.getSize = function () { this.size = e(this.element) }, d.css = function (t) { var e = this.element.style; for (var i in t) { var n = u[i] || i; e[n] = t[i] } }, d.getPosition = function () { var t = getComputedStyle(this.element), e = this.layout._getOption("originLeft"), i = this.layout._getOption("originTop"), n = t[e ? "left" : "right"], o = t[i ? "top" : "bottom"], r = parseFloat(n), s = parseFloat(o), a = this.layout.size; -1 != n.indexOf("%") && (r = r / 100 * a.width), -1 != o.indexOf("%") && (s = s / 100 * a.height), r = isNaN(r) ? 0 : r, s = isNaN(s) ? 0 : s, r -= e ? a.paddingLeft : a.paddingRight, s -= i ? a.paddingTop : a.paddingBottom, this.position.x = r, this.position.y = s }, d.layoutPosition = function () { var t = this.layout.size, e = {}, i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop"), o = i ? "paddingLeft" : "paddingRight", r = i ? "left" : "right", s = i ? "right" : "left", a = this.position.x + t[o]; e[r] = this.getXValue(a), e[s] = ""; var h = n ? "paddingTop" : "paddingBottom", u = n ? "top" : "bottom", d = n ? "bottom" : "top", l = this.position.y + t[h]; e[u] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this]) }, d.getXValue = function (t) { var e = this.layout._getOption("horizontal"); return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px" }, d.getYValue = function (t) { var e = this.layout._getOption("horizontal"); return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px" }, d._transitionTo = function (t, e) { this.getPosition(); var i = this.position.x, n = this.position.y, o = t == this.position.x && e == this.position.y; if (this.setPosition(t, e), o && !this.isTransitioning) return void this.layoutPosition(); var r = t - i, s = e - n, a = {}; a.transform = this.getTranslate(r, s), this.transition({ to: a, onTransitionEnd: { transform: this.layoutPosition }, isCleaning: !0 }) }, d.getTranslate = function (t, e) { var i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop"); return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)" }, d.goTo = function (t, e) { this.setPosition(t, e), this.layoutPosition() }, d.moveTo = d._transitionTo, d.setPosition = function (t, e) { this.position.x = parseFloat(t), this.position.y = parseFloat(e) }, d._nonTransition = function (t) { this.css(t.to), t.isCleaning && this._removeStyles(t.to); for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this) }, d.transition = function (t) { if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t); var e = this._transn; for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i]; for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0); if (t.from) { this.css(t.from); var n = this.element.offsetHeight; n = null } this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0 }; var l = "opacity," + o(a); d.enableTransition = function () { if (!this.isTransitioning) { var t = this.layout.options.transitionDuration; t = "number" == typeof t ? t + "ms" : t, this.css({ transitionProperty: l, transitionDuration: t, transitionDelay: this.staggerDelay || 0 }), this.element.addEventListener(h, this, !1) } }, d.onwebkitTransitionEnd = function (t) { this.ontransitionend(t) }, d.onotransitionend = function (t) { this.ontransitionend(t) }; var c = { "-webkit-transform": "transform" }; d.ontransitionend = function (t) { if (t.target === this.element) { var e = this._transn, n = c[t.propertyName] || t.propertyName; if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) { var o = e.onEnd[n]; o.call(this), delete e.onEnd[n] } this.emitEvent("transitionEnd", [this]) } }, d.disableTransition = function () { this.removeTransitionStyles(), this.element.removeEventListener(h, this, !1), this.isTransitioning = !1 }, d._removeStyles = function (t) { var e = {}; for (var i in t) e[i] = ""; this.css(e) }; var f = { transitionProperty: "", transitionDuration: "", transitionDelay: "" }; return d.removeTransitionStyles = function () { this.css(f) }, d.stagger = function (t) { t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms" }, d.removeElem = function () { this.element.parentNode.removeChild(this.element), this.css({ display: "" }), this.emitEvent("remove", [this]) }, d.remove = function () { return s && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () { this.removeElem() }), void this.hide()) : void this.removeElem() }, d.reveal = function () { delete this.isHidden, this.css({ display: "" }); var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("visibleStyle"); e[i] = this.onRevealTransitionEnd, this.transition({ from: t.hiddenStyle, to: t.visibleStyle, isCleaning: !0, onTransitionEnd: e }) }, d.onRevealTransitionEnd = function () { this.isHidden || this.emitEvent("reveal") }, d.getHideRevealTransitionEndProperty = function (t) { var e = this.layout.options[t]; if (e.opacity) return "opacity"; for (var i in e) return i }, d.hide = function () { this.isHidden = !0, this.css({ display: "" }); var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("hiddenStyle"); e[i] = this.onHideTransitionEnd, this.transition({ from: t.visibleStyle, to: t.hiddenStyle, isCleaning: !0, onTransitionEnd: e }) }, d.onHideTransitionEnd = function () { this.isHidden && (this.css({ display: "none" }), this.emitEvent("hide")) }, d.destroy = function () { this.css({ position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: "" }) }, n }), function (t, e) { "use strict"; "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, n, o, r) { return e(t, i, n, o, r) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item) }(window, function (t, e, i, n, o) { "use strict"; function r(t, e) { var i = n.getQueryElement(t); if (!i) return void (h && h.error("Bad element for " + this.constructor.namespace + ": " + (i || t))); this.element = i, u && (this.$element = u(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e); var o = ++l; this.element.outlayerGUID = o, c[o] = this, this._create(); var r = this._getOption("initLayout"); r && this.layout() } function s(t) { function e() { t.apply(this, arguments) } return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e } function a(t) { if ("number" == typeof t) return t; var e = t.match(/(^\d*\.?\d*)(\w*)/), i = e && e[1], n = e && e[2]; if (!i.length) return 0; i = parseFloat(i); var o = m[n] || 1; return i * o } var h = t.console, u = t.jQuery, d = function () { }, l = 0, c = {}; r.namespace = "outlayer", r.Item = o, r.defaults = { containerStyle: { position: "relative" }, initLayout: !0, originLeft: !0, originTop: !0, resize: !0, resizeContainer: !0, transitionDuration: "0.4s", hiddenStyle: { opacity: 0, transform: "scale(0.001)" }, visibleStyle: { opacity: 1, transform: "scale(1)" } }; var f = r.prototype; n.extend(f, e.prototype), f.option = function (t) { n.extend(this.options, t) }, f._getOption = function (t) { var e = this.constructor.compatOptions[t]; return e && void 0 !== this.options[e] ? this.options[e] : this.options[t] }, r.compatOptions = { initLayout: "isInitLayout", horizontal: "isHorizontal", layoutInstant: "isLayoutInstant", originLeft: "isOriginLeft", originTop: "isOriginTop", resize: "isResizeBound", resizeContainer: "isResizingContainer" }, f._create = function () { this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle); var t = this._getOption("resize"); t && this.bindResize() }, f.reloadItems = function () { this.items = this._itemize(this.element.children) }, f._itemize = function (t) { for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) { var r = e[o], s = new i(r, this); n.push(s) } return n }, f._filterFindItemElements = function (t) { return n.filterFindElements(t, this.options.itemSelector) }, f.getItemElements = function () { return this.items.map(function (t) { return t.element }) }, f.layout = function () { this._resetLayout(), this._manageStamps(); var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited; this.layoutItems(this.items, e), this._isLayoutInited = !0 }, f._init = f.layout, f._resetLayout = function () { this.getSize() }, f.getSize = function () { this.size = i(this.element) }, f._getMeasurement = function (t, e) { var n, o = this.options[t]; o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), this[t] = n ? i(n)[e] : o) : this[t] = 0 }, f.layoutItems = function (t, e) { t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout() }, f._getItemsForLayout = function (t) { return t.filter(function (t) { return !t.isIgnored }) }, f._layoutItems = function (t, e) { if (this._emitCompleteOnItems("layout", t), t && t.length) { var i = []; t.forEach(function (t) { var n = this._getItemLayoutPosition(t); n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n) }, this), this._processLayoutQueue(i) } }, f._getItemLayoutPosition = function () { return { x: 0, y: 0 } }, f._processLayoutQueue = function (t) { this.updateStagger(), t.forEach(function (t, e) { this._positionItem(t.item, t.x, t.y, t.isInstant, e) }, this) }, f.updateStagger = function () { var t = this.options.stagger; return null === t || void 0 === t ? void (this.stagger = 0) : (this.stagger = a(t), this.stagger) }, f._positionItem = function (t, e, i, n, o) { n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i)) }, f._postLayout = function () { this.resizeContainer() }, f.resizeContainer = function () { var t = this._getOption("resizeContainer"); if (t) { var e = this._getContainerSize(); e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1)) } }, f._getContainerSize = d, f._setContainerMeasure = function (t, e) { if (void 0 !== t) { var i = this.size; i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px" } }, f._emitCompleteOnItems = function (t, e) { function i() { o.dispatchEvent(t + "Complete", null, [e]) } function n() { s++, s == r && i() } var o = this, r = e.length; if (!e || !r) return void i(); var s = 0; e.forEach(function (e) { e.once(t, n) }) }, f.dispatchEvent = function (t, e, i) { var n = e ? [e].concat(i) : i; if (this.emitEvent(t, n), u) if (this.$element = this.$element || u(this.element), e) { var o = u.Event(e); o.type = t, this.$element.trigger(o, i) } else this.$element.trigger(t, i) }, f.ignore = function (t) { var e = this.getItem(t); e && (e.isIgnored = !0) }, f.unignore = function (t) { var e = this.getItem(t); e && delete e.isIgnored }, f.stamp = function (t) { t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this)) }, f.unstamp = function (t) { t = this._find(t), t && t.forEach(function (t) { n.removeFrom(this.stamps, t), this.unignore(t) }, this) }, f._find = function (t) { return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0 }, f._manageStamps = function () { this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this)) }, f._getBoundingRect = function () { var t = this.element.getBoundingClientRect(), e = this.size; this._boundingRect = { left: t.left + e.paddingLeft + e.borderLeftWidth, top: t.top + e.paddingTop + e.borderTopWidth, right: t.right - (e.paddingRight + e.borderRightWidth), bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth) } }, f._manageStamp = d, f._getElementOffset = function (t) { var e = t.getBoundingClientRect(), n = this._boundingRect, o = i(t), r = { left: e.left - n.left - o.marginLeft, top: e.top - n.top - o.marginTop, right: n.right - e.right - o.marginRight, bottom: n.bottom - e.bottom - o.marginBottom }; return r }, f.handleEvent = n.handleEvent, f.bindResize = function () { t.addEventListener("resize", this), this.isResizeBound = !0 }, f.unbindResize = function () { t.removeEventListener("resize", this), this.isResizeBound = !1 }, f.onresize = function () { this.resize() }, n.debounceMethod(r, "onresize", 100), f.resize = function () { this.isResizeBound && this.needsResizeLayout() && this.layout() }, f.needsResizeLayout = function () { var t = i(this.element), e = this.size && t; return e && t.innerWidth !== this.size.innerWidth }, f.addItems = function (t) { var e = this._itemize(t); return e.length && (this.items = this.items.concat(e)), e }, f.appended = function (t) { var e = this.addItems(t); e.length && (this.layoutItems(e, !0), this.reveal(e)) }, f.prepended = function (t) { var e = this._itemize(t); if (e.length) { var i = this.items.slice(0); this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i) } }, f.reveal = function (t) { if (this._emitCompleteOnItems("reveal", t), t && t.length) { var e = this.updateStagger(); t.forEach(function (t, i) { t.stagger(i * e), t.reveal() }) } }, f.hide = function (t) { if (this._emitCompleteOnItems("hide", t), t && t.length) { var e = this.updateStagger(); t.forEach(function (t, i) { t.stagger(i * e), t.hide() }) } }, f.revealItemElements = function (t) { var e = this.getItems(t); this.reveal(e) }, f.hideItemElements = function (t) { var e = this.getItems(t); this.hide(e) }, f.getItem = function (t) { for (var e = 0; e < this.items.length; e++) { var i = this.items[e]; if (i.element == t) return i } }, f.getItems = function (t) { t = n.makeArray(t); var e = []; return t.forEach(function (t) { var i = this.getItem(t); i && e.push(i) }, this), e }, f.remove = function (t) { var e = this.getItems(t); this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function (t) { t.remove(), n.removeFrom(this.items, t) }, this) }, f.destroy = function () { var t = this.element.style; t.height = "", t.position = "", t.width = "", this.items.forEach(function (t) { t.destroy() }), this.unbindResize(); var e = this.element.outlayerGUID; delete c[e], delete this.element.outlayerGUID, u && u.removeData(this.element, this.constructor.namespace) }, r.data = function (t) { t = n.getQueryElement(t); var e = t && t.outlayerGUID; return e && c[e] }, r.create = function (t, e) { var i = s(r); return i.defaults = n.extend({}, r.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, r.compatOptions), i.namespace = t, i.data = r.data, i.Item = s(o), n.htmlInit(i, t), u && u.bridget && u.bridget(t, i), i }; var m = { ms: 1, s: 1e3 }; return r.Item = o, r }), function (t, e) { "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize) }(window, function (t, e) { var i = t.create("masonry"); i.compatOptions.fitWidth = "isFitWidth"; var n = i.prototype; return n._resetLayout = function () { this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = []; for (var t = 0; t < this.cols; t++)this.colYs.push(0); this.maxY = 0, this.horizontalColIndex = 0 }, n.measureColumns = function () { if (this.getContainerWidth(), !this.columnWidth) { var t = this.items[0], i = t && t.element; this.columnWidth = i && e(i).outerWidth || this.containerWidth } var n = this.columnWidth += this.gutter, o = this.containerWidth + this.gutter, r = o / n, s = n - o % n, a = s && 1 > s ? "round" : "floor"; r = Math[a](r), this.cols = Math.max(r, 1) }, n.getContainerWidth = function () { var t = this._getOption("fitWidth"), i = t ? this.element.parentNode : this.element, n = e(i); this.containerWidth = n && n.innerWidth }, n._getItemLayoutPosition = function (t) { t.getSize(); var e = t.size.outerWidth % this.columnWidth, i = e && 1 > e ? "round" : "ceil", n = Math[i](t.size.outerWidth / this.columnWidth); n = Math.min(n, this.cols); for (var o = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", r = this[o](n, t), s = { x: this.columnWidth * r.col, y: r.y }, a = r.y + t.size.outerHeight, h = n + r.col, u = r.col; h > u; u++)this.colYs[u] = a; return s }, n._getTopColPosition = function (t) { var e = this._getTopColGroup(t), i = Math.min.apply(Math, e); return { col: e.indexOf(i), y: i } }, n._getTopColGroup = function (t) { if (2 > t) return this.colYs; for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++)e[n] = this._getColGroupY(n, t); return e }, n._getColGroupY = function (t, e) { if (2 > e) return this.colYs[t]; var i = this.colYs.slice(t, t + e); return Math.max.apply(Math, i) }, n._getHorizontalColPosition = function (t, e) { var i = this.horizontalColIndex % this.cols, n = t > 1 && i + t > this.cols; i = n ? 0 : i; var o = e.size.outerWidth && e.size.outerHeight; return this.horizontalColIndex = o ? i + t : this.horizontalColIndex, { col: i, y: this._getColGroupY(i, t) } }, n._manageStamp = function (t) { var i = e(t), n = this._getElementOffset(t), o = this._getOption("originLeft"), r = o ? n.left : n.right, s = r + i.outerWidth, a = Math.floor(r / this.columnWidth); a = Math.max(0, a); var h = Math.floor(s / this.columnWidth); h -= s % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h); for (var u = this._getOption("originTop"), d = (u ? n.top : n.bottom) + i.outerHeight, l = a; h >= l; l++)this.colYs[l] = Math.max(d, this.colYs[l]) }, n._getContainerSize = function () { this.maxY = Math.max.apply(Math, this.colYs); var t = { height: this.maxY }; return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t }, n._getContainerFitWidth = function () { for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];)t++; return (this.cols - t) * this.columnWidth - this.gutter }, n.needsResizeLayout = function () { var t = this.containerWidth; return this.getContainerWidth(), t != this.containerWidth }, i });
    !function (e, t) { "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t() }("undefined" != typeof window ? window : this, function () { function e() { } var t = e.prototype; return t.on = function (e, t) { if (e && t) { var i = this._events = this._events || {}, n = i[e] = i[e] || []; return n.indexOf(t) == -1 && n.push(t), this } }, t.once = function (e, t) { if (e && t) { this.on(e, t); var i = this._onceEvents = this._onceEvents || {}, n = i[e] = i[e] || {}; return n[t] = !0, this } }, t.off = function (e, t) { var i = this._events && this._events[e]; if (i && i.length) { var n = i.indexOf(t); return n != -1 && i.splice(n, 1), this } }, t.emitEvent = function (e, t) { var i = this._events && this._events[e]; if (i && i.length) { i = i.slice(0), t = t || []; for (var n = this._onceEvents && this._onceEvents[e], o = 0; o < i.length; o++) { var r = i[o], s = n && n[r]; s && (this.off(e, r), delete n[r]), r.apply(this, t) } return this } }, t.allOff = function () { delete this._events, delete this._onceEvents }, e }), function (e, t) { "use strict"; "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function (i) { return t(e, i) }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter) }("undefined" != typeof window ? window : this, function (e, t) { function i(e, t) { for (var i in t) e[i] = t[i]; return e } function n(e) { if (Array.isArray(e)) return e; var t = "object" == typeof e && "number" == typeof e.length; return t ? d.call(e) : [e] } function o(e, t, r) { if (!(this instanceof o)) return new o(e, t, r); var s = e; return "string" == typeof e && (s = document.querySelectorAll(e)), s ? (this.elements = n(s), this.options = i({}, this.options), "function" == typeof t ? r = t : i(this.options, t), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(this.check.bind(this))) : void a.error("Bad element for imagesLoaded " + (s || e)) } function r(e) { this.img = e } function s(e, t) { this.url = e, this.element = t, this.img = new Image } var h = e.jQuery, a = e.console, d = Array.prototype.slice; o.prototype = Object.create(t.prototype), o.prototype.options = {}, o.prototype.getImages = function () { this.images = [], this.elements.forEach(this.addElementImages, this) }, o.prototype.addElementImages = function (e) { "IMG" == e.nodeName && this.addImage(e), this.options.background === !0 && this.addElementBackgroundImages(e); var t = e.nodeType; if (t && u[t]) { for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) { var o = i[n]; this.addImage(o) } if ("string" == typeof this.options.background) { var r = e.querySelectorAll(this.options.background); for (n = 0; n < r.length; n++) { var s = r[n]; this.addElementBackgroundImages(s) } } } }; var u = { 1: !0, 9: !0, 11: !0 }; return o.prototype.addElementBackgroundImages = function (e) { var t = getComputedStyle(e); if (t) for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) { var o = n && n[2]; o && this.addBackground(o, e), n = i.exec(t.backgroundImage) } }, o.prototype.addImage = function (e) { var t = new r(e); this.images.push(t) }, o.prototype.addBackground = function (e, t) { var i = new s(e, t); this.images.push(i) }, o.prototype.check = function () { function e(e, i, n) { setTimeout(function () { t.progress(e, i, n) }) } var t = this; return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (t) { t.once("progress", e), t.check() }) : void this.complete() }, o.prototype.progress = function (e, t, i) { this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, e, t) }, o.prototype.complete = function () { var e = this.hasAnyBroken ? "fail" : "done"; if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) { var t = this.hasAnyBroken ? "reject" : "resolve"; this.jqDeferred[t](this) } }, r.prototype = Object.create(t.prototype), r.prototype.check = function () { var e = this.getIsImageComplete(); return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void (this.proxyImage.src = this.img.src)) }, r.prototype.getIsImageComplete = function () { return this.img.complete && this.img.naturalWidth }, r.prototype.confirm = function (e, t) { this.isLoaded = e, this.emitEvent("progress", [this, this.img, t]) }, r.prototype.handleEvent = function (e) { var t = "on" + e.type; this[t] && this[t](e) }, r.prototype.onload = function () { this.confirm(!0, "onload"), this.unbindEvents() }, r.prototype.onerror = function () { this.confirm(!1, "onerror"), this.unbindEvents() }, r.prototype.unbindEvents = function () { this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this) }, s.prototype = Object.create(r.prototype), s.prototype.check = function () { this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url; var e = this.getIsImageComplete(); e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents()) }, s.prototype.unbindEvents = function () { this.img.removeEventListener("load", this), this.img.removeEventListener("error", this) }, s.prototype.confirm = function (e, t) { this.isLoaded = e, this.emitEvent("progress", [this, this.element, t]) }, o.makeJQueryPlugin = function (t) { t = t || e.jQuery, t && (h = t, h.fn.imagesLoaded = function (e, t) { var i = new o(this, e, t); return i.jqDeferred.promise(h(this)) }) }, o.makeJQueryPlugin(), o });
    var css_library = `
@font-face{font-family:swiper-icons;src:url('data:application/font-woff;charset=utf-8;base64, d09GRgABAAAAAAZgABAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAGRAAAABoAAAAci6qHkUdERUYAAAWgAAAAIwAAACQAYABXR1BPUwAABhQAAAAuAAAANuAY7+xHU1VCAAAFxAAAAFAAAABm2fPczU9TLzIAAAHcAAAASgAAAGBP9V5RY21hcAAAAkQAAACIAAABYt6F0cBjdnQgAAACzAAAAAQAAAAEABEBRGdhc3AAAAWYAAAACAAAAAj//wADZ2x5ZgAAAywAAADMAAAD2MHtryVoZWFkAAABbAAAADAAAAA2E2+eoWhoZWEAAAGcAAAAHwAAACQC9gDzaG10eAAAAigAAAAZAAAArgJkABFsb2NhAAAC0AAAAFoAAABaFQAUGG1heHAAAAG8AAAAHwAAACAAcABAbmFtZQAAA/gAAAE5AAACXvFdBwlwb3N0AAAFNAAAAGIAAACE5s74hXjaY2BkYGAAYpf5Hu/j+W2+MnAzMYDAzaX6QjD6/4//Bxj5GA8AuRwMYGkAPywL13jaY2BkYGA88P8Agx4j+/8fQDYfA1AEBWgDAIB2BOoAeNpjYGRgYNBh4GdgYgABEMnIABJzYNADCQAACWgAsQB42mNgYfzCOIGBlYGB0YcxjYGBwR1Kf2WQZGhhYGBiYGVmgAFGBiQQkOaawtDAoMBQxXjg/wEGPcYDDA4wNUA2CCgwsAAAO4EL6gAAeNpj2M0gyAACqxgGNWBkZ2D4/wMA+xkDdgAAAHjaY2BgYGaAYBkGRgYQiAHyGMF8FgYHIM3DwMHABGQrMOgyWDLEM1T9/w8UBfEMgLzE////P/5//f/V/xv+r4eaAAeMbAxwIUYmIMHEgKYAYjUcsDAwsLKxc3BycfPw8jEQA/gZBASFhEVExcQlJKWkZWTl5BUUlZRVVNXUNTQZBgMAAMR+E+gAEQFEAAAAKgAqACoANAA+AEgAUgBcAGYAcAB6AIQAjgCYAKIArAC2AMAAygDUAN4A6ADyAPwBBgEQARoBJAEuATgBQgFMAVYBYAFqAXQBfgGIAZIBnAGmAbIBzgHsAAB42u2NMQ6CUAyGW568x9AneYYgm4MJbhKFaExIOAVX8ApewSt4Bic4AfeAid3VOBixDxfPYEza5O+Xfi04YADggiUIULCuEJK8VhO4bSvpdnktHI5QCYtdi2sl8ZnXaHlqUrNKzdKcT8cjlq+rwZSvIVczNiezsfnP/uznmfPFBNODM2K7MTQ45YEAZqGP81AmGGcF3iPqOop0r1SPTaTbVkfUe4HXj97wYE+yNwWYxwWu4v1ugWHgo3S1XdZEVqWM7ET0cfnLGxWfkgR42o2PvWrDMBSFj/IHLaF0zKjRgdiVMwScNRAoWUoH78Y2icB/yIY09An6AH2Bdu/UB+yxopYshQiEvnvu0dURgDt8QeC8PDw7Fpji3fEA4z/PEJ6YOB5hKh4dj3EvXhxPqH/SKUY3rJ7srZ4FZnh1PMAtPhwP6fl2PMJMPDgeQ4rY8YT6Gzao0eAEA409DuggmTnFnOcSCiEiLMgxCiTI6Cq5DZUd3Qmp10vO0LaLTd2cjN4fOumlc7lUYbSQcZFkutRG7g6JKZKy0RmdLY680CDnEJ+UMkpFFe1RN7nxdVpXrC4aTtnaurOnYercZg2YVmLN/d/gczfEimrE/fs/bOuq29Zmn8tloORaXgZgGa78yO9/cnXm2BpaGvq25Dv9S4E9+5SIc9PqupJKhYFSSl47+Qcr1mYNAAAAeNptw0cKwkAAAMDZJA8Q7OUJvkLsPfZ6zFVERPy8qHh2YER+3i/BP83vIBLLySsoKimrqKqpa2hp6+jq6RsYGhmbmJqZSy0sraxtbO3sHRydnEMU4uR6yx7JJXveP7WrDycAAAAAAAH//wACeNpjYGRgYOABYhkgZgJCZgZNBkYGLQZtIJsFLMYAAAw3ALgAeNolizEKgDAQBCchRbC2sFER0YD6qVQiBCv/H9ezGI6Z5XBAw8CBK/m5iQQVauVbXLnOrMZv2oLdKFa8Pjuru2hJzGabmOSLzNMzvutpB3N42mNgZGBg4GKQYzBhYMxJLMlj4GBgAYow/P/PAJJhLM6sSoWKfWCAAwDAjgbRAAB42mNgYGBkAIIbCZo5IPrmUn0hGA0AO8EFTQAA') format('woff');font-weight:400;font-style:normal}:root{--swiper-theme-color:#007aff}.swiper-container{margin-left:auto;margin-right:auto;position:relative;overflow:hidden;list-style:none;padding:0;z-index:1}.swiper-container-vertical>.swiper-wrapper{flex-direction:column}.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:flex;transition-property:transform;box-sizing:content-box}.swiper-container-android .swiper-slide,.swiper-wrapper{transform:translate3d(0px,0,0)}.swiper-container-multirow>.swiper-wrapper{flex-wrap:wrap}.swiper-container-multirow-column>.swiper-wrapper{flex-wrap:wrap;flex-direction:column}.swiper-container-free-mode>.swiper-wrapper{transition-timing-function:ease-out;margin:0 auto}.swiper-container-pointer-events{touch-action:pan-y}.swiper-container-pointer-events.swiper-container-vertical{touch-action:pan-x}.swiper-slide{flex-shrink:0;width:100%;height:100%;position:relative;transition-property:transform}.swiper-slide-invisible-blank{visibility:hidden}.swiper-container-autoheight,.swiper-container-autoheight .swiper-slide{height:auto}.swiper-container-autoheight .swiper-wrapper{align-items:flex-start;transition-property:transform,height}.swiper-container-3d{perspective:1200px}.swiper-container-3d .swiper-cube-shadow,.swiper-container-3d .swiper-slide,.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top,.swiper-container-3d .swiper-wrapper{transform-style:preserve-3d}.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}.swiper-container-3d .swiper-slide-shadow-left{background-image:linear-gradient(to left,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-right{background-image:linear-gradient(to right,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-top{background-image:linear-gradient(to top,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-bottom{background-image:linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-css-mode>.swiper-wrapper{overflow:auto;scrollbar-width:none;-ms-overflow-style:none}.swiper-container-css-mode>.swiper-wrapper::-webkit-scrollbar{display:none}.swiper-container-css-mode>.swiper-wrapper>.swiper-slide{scroll-snap-align:start start}.swiper-container-horizontal.swiper-container-css-mode>.swiper-wrapper{scroll-snap-type:x mandatory}.swiper-container-vertical.swiper-container-css-mode>.swiper-wrapper{scroll-snap-type:y mandatory}:root{--swiper-navigation-size:44px}.swiper-button-next,.swiper-button-prev{position:absolute;top:50%;width:calc(var(--swiper-navigation-size)/ 44 * 27);height:var(--swiper-navigation-size);margin-top:calc(0px - (var(--swiper-navigation-size)/ 2));z-index:10;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--swiper-navigation-color,var(--swiper-theme-color))}.swiper-button-next.swiper-button-disabled,.swiper-button-prev.swiper-button-disabled{opacity:.35;cursor:auto;pointer-events:none}.swiper-button-next:after,.swiper-button-prev:after{font-family:swiper-icons;font-size:var(--swiper-navigation-size);text-transform:none!important;letter-spacing:0;text-transform:none;font-variant:initial;line-height:1}.swiper-button-prev,.swiper-container-rtl .swiper-button-next{left:10px;right:auto}.swiper-button-prev:after,.swiper-container-rtl .swiper-button-next:after{content:'prev'}.swiper-button-next,.swiper-container-rtl .swiper-button-prev{right:10px;left:auto}.swiper-button-next:after,.swiper-container-rtl .swiper-button-prev:after{content:'next'}.swiper-button-next.swiper-button-white,.swiper-button-prev.swiper-button-white{--swiper-navigation-color:#ffffff}.swiper-button-next.swiper-button-black,.swiper-button-prev.swiper-button-black{--swiper-navigation-color:#000000}.swiper-button-lock{display:none}.swiper-pagination{position:absolute;text-align:center;transition:.3s opacity;transform:translate3d(0,0,0);z-index:10}.swiper-pagination.swiper-pagination-hidden{opacity:0}.swiper-container-horizontal>.swiper-pagination-bullets,.swiper-pagination-custom,.swiper-pagination-fraction{bottom:10px;left:0;width:100%}.swiper-pagination-bullets-dynamic{overflow:hidden;font-size:0}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transform:scale(.33);position:relative}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active{transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main{transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev{transform:scale(.33)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next{transform:scale(.33)}.swiper-pagination-bullet{width:8px;height:8px;display:inline-block;border-radius:50%;background:#000;opacity:.2}button.swiper-pagination-bullet{border:none;margin:0;padding:0;box-shadow:none;-webkit-appearance:none;appearance:none}.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}.swiper-pagination-bullet-active{opacity:1;background:var(--swiper-pagination-color,var(--swiper-theme-color))}.swiper-container-vertical>.swiper-pagination-bullets{right:10px;top:50%;transform:translate3d(0px,-50%,0)}.swiper-container-vertical>.swiper-pagination-bullets .swiper-pagination-bullet{margin:6px 0;display:block}.swiper-container-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{top:50%;transform:translateY(-50%);width:8px}.swiper-container-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{display:inline-block;transition:.2s transform,.2s top}.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 4px}.swiper-container-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{left:50%;transform:translateX(-50%);white-space:nowrap}.swiper-container-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:.2s transform,.2s left}.swiper-container-horizontal.swiper-container-rtl>.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:.2s transform,.2s right}.swiper-pagination-progressbar{background:rgba(0,0,0,.25);position:absolute}.swiper-pagination-progressbar .swiper-pagination-progressbar-fill{background:var(--swiper-pagination-color,var(--swiper-theme-color));position:absolute;left:0;top:0;width:100%;height:100%;transform:scale(0);transform-origin:left top}.swiper-container-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill{transform-origin:right top}.swiper-container-horizontal>.swiper-pagination-progressbar,.swiper-container-vertical>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite{width:100%;height:4px;left:0;top:0}.swiper-container-horizontal>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,.swiper-container-vertical>.swiper-pagination-progressbar{width:4px;height:100%;left:0;top:0}.swiper-pagination-white{--swiper-pagination-color:#ffffff}.swiper-pagination-black{--swiper-pagination-color:#000000}.swiper-pagination-lock{display:none}.swiper-scrollbar{border-radius:10px;position:relative;-ms-touch-action:none;background:rgba(0,0,0,.1)}.swiper-container-horizontal>.swiper-scrollbar{position:absolute;left:1%;bottom:3px;z-index:50;height:5px;width:98%}.swiper-container-vertical>.swiper-scrollbar{position:absolute;right:3px;top:1%;z-index:50;width:5px;height:98%}.swiper-scrollbar-drag{height:100%;width:100%;position:relative;background:rgba(0,0,0,.5);border-radius:10px;left:0;top:0}.swiper-scrollbar-cursor-drag{cursor:move}.swiper-scrollbar-lock{display:none}.swiper-zoom-container{width:100%;height:100%;display:flex;justify-content:center;align-items:center;text-align:center}.swiper-zoom-container>canvas,.swiper-zoom-container>img,.swiper-zoom-container>svg{max-width:100%;max-height:100%;object-fit:contain}.swiper-slide-zoomed{cursor:move}.swiper-lazy-preloader{width:42px;height:42px;position:absolute;left:50%;top:50%;margin-left:-21px;margin-top:-21px;z-index:10;transform-origin:50%;animation:swiper-preloader-spin 1s infinite linear;box-sizing:border-box;border:4px solid var(--swiper-preloader-color,var(--swiper-theme-color));border-radius:50%;border-top-color:transparent}.swiper-lazy-preloader-white{--swiper-preloader-color:#fff}.swiper-lazy-preloader-black{--swiper-preloader-color:#000}@keyframes swiper-preloader-spin{100%{transform:rotate(360deg)}}.swiper-container .swiper-notification{position:absolute;left:0;top:0;pointer-events:none;opacity:0;z-index:-1000}.swiper-container-fade.swiper-container-free-mode .swiper-slide{transition-timing-function:ease-out}.swiper-container-fade .swiper-slide{pointer-events:none;transition-property:opacity}.swiper-container-fade .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-fade .swiper-slide-active,.swiper-container-fade .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube{overflow:visible}.swiper-container-cube .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1;visibility:hidden;transform-origin:0 0;width:100%;height:100%}.swiper-container-cube .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-cube.swiper-container-rtl .swiper-slide{transform-origin:100% 0}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-next,.swiper-container-cube .swiper-slide-next+.swiper-slide,.swiper-container-cube .swiper-slide-prev{pointer-events:auto;visibility:visible}.swiper-container-cube .swiper-slide-shadow-bottom,.swiper-container-cube .swiper-slide-shadow-left,.swiper-container-cube .swiper-slide-shadow-right,.swiper-container-cube .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}.swiper-container-cube .swiper-cube-shadow{position:absolute;left:0;bottom:0px;width:100%;height:100%;opacity:.6;z-index:0}.swiper-container-cube .swiper-cube-shadow:before{content:'';background:#000;position:absolute;left:0;top:0;bottom:0;right:0;filter:blur(50px)}.swiper-container-flip{overflow:visible}.swiper-container-flip .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1}.swiper-container-flip .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-flip .swiper-slide-active,.swiper-container-flip .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-flip .swiper-slide-shadow-bottom,.swiper-container-flip .swiper-slide-shadow-left,.swiper-container-flip .swiper-slide-shadow-right,.swiper-container-flip .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}
`;
    $('head').append('<style>' + css_library + '</style>')
  };

  /* This is my app's JavaScript */
  var initTestimonialForm = function ($) {
    var config_form = "";
    $("body").find("div[id*='simesy-testimonial-form']").each(function (i, v) {
      var id = $(this).data("view-id");
      var shop = window.Shopify.shop;
      $.ajax({
        url: "https://testimonial.simesy.com/api/get_form",
        type: "post",
        dataType: "JSON",
        async: false,
        data: { id: id, shop: shop },
        success: function (response) {
          config_form = response.data.testimonialForm.config;
          getTestimonialForm(config_form, id);
        },
      });
    });
    $(document).on("change", "#tpro_client_image", function (e) {
      $(".image-valid-size").hide();
      let img = new Image();
      var image_upload = $("#tpro_client_image")[0].files[0];
      img.src = window.URL.createObjectURL(image_upload);
      $("#image-fk").attr("src", img.src);
    });
    $("#testimonial_form").submit(function (e) {
      e.preventDefault();
      var link_image = "";
      var shop = window.Shopify.shop;
      var data_formTesti = {};
      var data_social = [];
      var check_image = true;
      if (config_form.form_elements.includes("featured_image")) {
        var file = document.querySelector("[type=file]").files;
        const formData = new FormData();
        formData.append("file", file[0]);
        formData.append("upload_preset", "image_testimonial");
        if ($("#image-fk").width() > 150 && file[0].size > 256000) {
          check_image = false;
          $(".image-valid-size").show();
        } else {
          $.ajax({
            async: false,
            data: formData,
            method: "POST",
            url: "https://api.cloudinary.com/v1_1/simesy-test/image/upload",
            processData: false,
            contentType: false,
            success: function (data) {
              link_image = data.secure_url;
            },
          });
        }
      }
      if (config_form.form_elements.includes("social_profile")) {
        $(".tpro-social-profile-item").each(function (i, v) {
          var social_name = $(this)
            .find('select[name="tpro_social_profiles[' + i + '][social_name]"]')
            .val();
          var social_url = $(this)
            .find('input[name="tpro_social_profiles[' + i + '][social_url]"]')
            .val();
          if (social_name != "") {
            data_social.push({
              social_name: social_name,
              social_url: social_url,
            });
          }
        });
      }
      $.each(config_form.form_elements, function (i, v) {
        switch (v) {
          case "full_name":
            data_formTesti["name"] = $("input#tpro_client_name").val();
            break;
          case "email_address":
            data_formTesti["email"] = $("input#tpro_client_email").val();
            break;
          case "identity_position":
            data_formTesti[v] = $("input#tpro_client_designation").val();
            break;
          case "company_name":
            data_formTesti[v] = $("input#tpro_client_company_name").val();
            break;
          case "testimonial_title":
            data_formTesti["title"] = $("input#tpro_testimonial_title").val();
            break;
          case "testimonial":
            data_formTesti["content"] = $("textarea#tpro_client_testimonial").val();
            break;
          case "featured_image":
            data_formTesti["image_url"] = link_image;
            break;
          case "location":
            data_formTesti["location"] = $("input#tpro_client_location").val();
            break;
          case "phone_mobile":
            data_formTesti["phone"] = $("input#tpro_client_phone").val();
            break;
          case "website":
            data_formTesti["website"] = $("input#tpro_client_website").val();
            break;
          case "video_url":
            data_formTesti["video_url"] = $("input#tpro_client_video_url").val();
            break;
          case "social_profile":
            data_formTesti["social_profiles"] = data_social;
            break;
          case "rating":
            data_formTesti["rating"] = $('input[name="tpro_client_rating"]').val();
            break;
          case "recaptcha":
            data_formTesti[v] = $("input#tpro_client_website").val();
            break;
        }
      });
      data_formTesti["status"] = config_form.testimonial_approval_status;
      if (config_form.form_elements.includes("recaptcha")) {
        var response = grecaptcha.getResponse();
        if (response != "") {
          $(".simesy-tpro-form-error-msg").addClass("hide");
          if (checkValid()) {
            $.ajax({
              type: "post",
              async: false,
              url: "https://testimonial.simesy.com/api/save_form_data",
              data: { config: data_formTesti, shop: shop },
              success: function (data) {
                switch (config_form.redirect) {
                  case "same_page":
                    clearForm();
                    $(".simesy-tpro-form-validation-msg").removeClass("hide");
                    break;
                  case "to_a_page":
                    window.location = "/pages/" + config_form.page;
                    break;
                  case "to_a_custom_url":
                    window.location = config_form.redirect_custom_url;
                    break;
                }
              },
            });
          } else {
            $("html, body").animate(
              {
                scrollTop: $("input.required.error").first().offset().top - 100,
              },
              600
            );
          }
        } else {
          $(".simesy-tpro-form-error-msg").removeClass("hide");
          $("html, body").animate(
            { scrollTop: $(".g-recaptcha").first().offset().top - 100 },
            600
          );
        }
      } else {
        if (checkValid() && check_image) {
          $.ajax({
            type: "post",
            async: false,
            url: "https://testimonial.simesy.com/api/save_form_data",
            data: { config: data_formTesti, shop: shop },
            success: function (data) {
              switch (config_form.redirect) {
                case "same_page":
                  clearForm();
                  $(".simesy-tpro-form-validation-msg").removeClass("hide");
                  break;
                case "to_a_page":
                  window.location = "/pages/" + config_form.page;
                  break;
                case "to_a_custom_url":
                  window.location = config_form.redirect_custom_url;
                  break;
              }
            },
          });
        } else {
          $("html, body").animate(
            { scrollTop: $("input.required.error").first().offset().top - 100 },
            600
          );
        }
      }
    });
    $(document).on("keyup", ".input-testi.required", function () {
      if ($(this).val() != "") {
        $(this).removeClass("error").addClass("valid");
        $(this).parents('.simesy-tpro-form-field').find('label.error').hide();
        if ($(this).attr("type") == "email") {
          if (!checkemail($(this).val())) {
            $(this).parents('.simesy-tpro-form-field').find('label.error').html("Please enter a valid email address.").show();
          } else {
            $(this).parents('.simesy-tpro-form-field').find('label.error').hide();
          }
        }
      } else {
        $(this).removeClass("valid").addClass("error");
        $(this).parents('.simesy-tpro-form-field').find('label.error').show();
      }
    });
    $(document).on("change", "#tpro_client_image", function () {
      $(this).parents('.simesy-tpro-form-field').find('label.error').hide();
    });
    jQuery.fn.extend({
      createProfile: function (options = {}) {
        var hasOption = function (optionKey) {
          return options.hasOwnProperty(optionKey);
        },
          option = function (optionKey) {
            return options[optionKey];
          },
          generateId = function (string) {
            return string.replace(/\[/g, "_").replace(/\]/g, "").toLowerCase();
          },
          addItem = function (items, key, fresh = !0) {
            var itemContent = items,
              group = itemContent.data("group"),
              item,
              input;
            itemContent.find("input,select").each(function (index, el) {
              var attrName = $(el).data("name"),
                skipName;
              1 != $(el).data("skip-name")
                ? $(el).attr("name", group + "[" + key + "][" + attrName + "]")
                : "undefined" != attrName && $(el).attr("name", attrName),
                1 == fresh && $(el).attr("value", ""),
                $(el).attr("id", generateId($(el).attr("name"))),
                $(el)
                  .parent()
                  .find("label")
                  .attr("for", generateId($(el).attr("name")));
            });
            var itemClone = items,
              removeButton;
            itemClone
              .find(".tpro-social-profile-remove")
              .attr(
                "onclick",
                "jQuery(this).parents('.tpro-social-profile-item').remove()"
              );
            var newItem = $(
              "<div class='tpro-social-profile-item'>" +
              itemClone.html() +
              "<div/>"
            );
            newItem.attr("data-index", key), newItem.appendTo(repeater);
          },
          repeater = this,
          items = repeater.find(".tpro-social-profile-item"),
          key = 0,
          addButton = $(".tpro-social-profile-wrapper").find(
            ".tpro-add-new-profile-btn"
          );
        items.each(function (index, item) {
          items.remove(),
            hasOption("showFirstItemToDefault") &&
              1 == option("showFirstItemToDefault")
              ? (addItem($(item), key), key++)
              : items.length > 1 && (addItem($(item), key), key++);
        }),
          addButton.on("click", function () {
            addItem($(items[0]), key), key++;
          });
      },
    }),
      $("#tpro-social-profiles").createProfile({
        showFirstItemToDefault: !0,
      });
  };
  var getTestimonialForm = function (config_form, id) {
    var output_form = "";
    // Config
    var form_fields = config_form.form_elements;
    if (form_fields.includes("recaptcha")) {
      var script = document.createElement("script");
      script.id = "tpro-recaptcha-js-js";
      script.src = "https://www.google.com/recaptcha/api.js";
      document.body.appendChild(script);
    }
    output_form +=
      "<h4 class='section-form-title'>" +
      config_form.post_title +
      "<strong></strong></h4>";
    var label_color =
      config_form.label_color != "" ? config_form.label_color : "",
      submit_button_color =
        config_form.submit_button_color.color != ""
          ? config_form.submit_button_color.color
          : "",
      submit_button_bg =
        config_form.submit_button_color.background != ""
          ? config_form.submit_button_color.background
          : "",
      submit_button_color_hv =
        config_form.submit_button_color.hover_color != ""
          ? config_form.submit_button_color.hover_color
          : "",
      submit_button_bg_hv =
        config_form.submit_button_color.hover_background != ""
          ? config_form.submit_button_color.hover_background
          : "";
    output_form += `<style>
#simesy-testimonial-form-${id} .section-form-title{
font-size:24px;
line-height:1.2;
margin-top:0;
}
#testimonial_form_${id}.simesy-tpro-fronted-form .simesy-tpro-form-field label{
font-size: 16px;
color: ${label_color};
}
#testimonial_form_${id}.simesy-tpro-fronted-form .simesy-tpro-form-submit-button input[type=\'submit\']{
color:${submit_button_color};
background:${submit_button_bg};
}
#testimonial_form_${id}.simesy-tpro-fronted-form .simesy-tpro-form-submit-button input[type=\'submit\']:hover{
color:${submit_button_color_hv};
background:${submit_button_bg_hv};
}
#testimonial_form_${id}.simesy-tpro-fronted-form .simesy-tpro-client-rating:not(:checked)>label{
color: #d4d4d4;
}
#testimonial_form_${id}.simesy-tpro-fronted-form .simesy-tpro-client-rating>input:checked~label {
color: #f3bb00;
}
#testimonial_form_${id}.simesy-tpro-fronted-form .simesy-tpro-client-rating:not(:checked)>label:hover,
#testimonial_form_${id}.simesy-tpro-fronted-form .simesy-tpro-client-rating:not(:checked)>label:hover~label {
color: #de7202;
}
</style>`;
    output_form +=
      '<div id="testimonial_form_' +
      id +
      '" class="simesy-tpro-fronted-form"><form id="testimonial_form" name="testimonial_form" method="post" action="" enctype="multipart/form-data">';
    if (
      config_form.redirect == "same_page" &&
      config_form.successful_message != "" &&
      config_form.message_position[0] == "top"
    ) {
      output_form +=
        '<div class="simesy-tpro-form-validation-msg hide">' +
        config_form.successful_message +
        "</div>";
    }
    $.each(form_fields, function (i, form_field) {
      switch (form_field) {
        case "full_name":
          if (form_field.includes("full_name")) {
            var full_name_label =
              config_form.full_name.label != ""
                ? config_form.full_name.label
                : "";
            var full_name_required = config_form.full_name.required
              ? "required"
              : "";
            output_form += '<div class="simesy-tpro-form-field">';
            if (full_name_label != "") {
              output_form +=
                '<label for="tpro_client_name">' +
                full_name_label +
                "</label><br>";
            }
            output_form +=
              '<input type="text" id="tpro_client_name" name="tpro_client_name" class="input-testi ' +
              full_name_required +
              '" placeholder="' +
              config_form.full_name.placeholder +
              '"/></div>';
          }
          break;
        case "email_address":
          if (form_field.includes("email_address")) {
            var email_address_label =
              config_form.email_address.label != ""
                ? config_form.email_address.label
                : "";
            var email_address_required = config_form.email_address.required
              ? "required"
              : "";
            output_form += '<div class="simesy-tpro-form-field">';
            if (email_address_label != "") {
              output_form +=
                '<label for="tpro_client_email">' +
                email_address_label +
                "</label><br>";
            }
            output_form +=
              '<input type="email" id="tpro_client_email" name="tpro_client_email" class="input-testi ' +
              email_address_required +
              '" placeholder="' +
              config_form.email_address.placeholder +
              '"/></div>';
          }
          break;
        case "identity_position":
          if (form_field.includes("identity_position")) {
            var identity_position_label =
              config_form.identity_position.label != ""
                ? config_form.identity_position.label
                : "";
            var identity_position_required = config_form.identity_position
              .required
              ? "required"
              : "";
            output_form += '<div class="simesy-tpro-form-field">';
            if (identity_position_label != "") {
              output_form +=
                '<label for="tpro_client_designation">' +
                identity_position_label +
                "</label><br>";
            }
            output_form +=
              '<input type="text" id="tpro_client_designation" name="tpro_client_designation" class="input-testi ' +
              identity_position_required +
              '" placeholder="' +
              config_form.identity_position.placeholder +
              '"/></div>';
          }
          break;
        case "company_name":
          if (form_field.includes("company_name")) {
            var company_name_label =
              config_form.company_name.label != ""
                ? config_form.company_name.label
                : "";
            var company_name_required = config_form.company_name.required
              ? "required"
              : "";
            output_form += '<div class="simesy-tpro-form-field">';
            if (company_name_label != "") {
              output_form +=
                '<label for="tpro_client_company_name">' +
                company_name_label +
                "</label><br>";
            }
            output_form +=
              '<input type="text" id="tpro_client_company_name" name="tpro_client_company_name" class="input-testi ' +
              company_name_required +
              '" placeholder="' +
              config_form.company_name.placeholder +
              '"/></div>';
          }
          break;
        case "testimonial_title":
          if (form_field.includes("testimonial_title")) {
            var testimonial_title_label =
              config_form.testimonial_title.label != ""
                ? config_form.testimonial_title.label
                : "";
            var testimonial_title_required = config_form.testimonial_title
              .required
              ? "required"
              : "";
            output_form += '<div class="simesy-tpro-form-field">';
            if (testimonial_title_label != "") {
              output_form +=
                '<label for="tpro_testimonial_title">' +
                testimonial_title_label +
                "</label><br>";
            }
            output_form +=
              '<input type="text" id="tpro_testimonial_title" name="tpro_testimonial_title" class="input-testi ' +
              testimonial_title_required +
              '" placeholder="' +
              config_form.testimonial_title.placeholder +
              '"/></div>';
          }
          break;
        case "testimonial":
          if (form_field.includes("testimonial")) {
            var testimonial_label =
              config_form.testimonial.label != ""
                ? config_form.testimonial.label
                : "";
            var testimonial_required = config_form.testimonial.required
              ? "required"
              : "";
            output_form += '<div class="simesy-tpro-form-field">';
            if (testimonial_label != "") {
              output_form +=
                '<label for="tpro_client_testimonial">' +
                testimonial_label +
                "</label><br>";
            }
            output_form +=
              '<textarea rows="7" type="text" id="tpro_client_testimonial" name="tpro_client_testimonial" class="input-testi ' +
              testimonial_required +
              '" placeholder="' +
              config_form.testimonial.placeholder +
              '"></textarea></div>';
          }
          break;
        case "featured_image":
          if (form_field.includes("featured_image")) {
            var featured_image_label =
              config_form.featured_image.label != ""
                ? config_form.featured_image.label
                : "";
            var featured_image_required = config_form.featured_image.required
              ? "required"
              : "";
            output_form += '<div class="simesy-tpro-form-field">';
            if (featured_image_label != "") {
              output_form +=
                '<label for="tpro_client_image">' +
                featured_image_label +
                "</label><br>";
            }
            output_form +=
              '<input type="hide" name="tpro_client_image_url" id="tpro_client_image_url" style="display:none"/><input type="file" name="tpro_client_image" id="tpro_client_image" class="input-testi ' +
              featured_image_required +
              '" accept="image/jpeg,image/jpg,image/png,"/><div class="image-valid-size" style="display:none">Size limit: (width <= 150px) and size (<= 250 KB)</div></div>';
            output_form += '<img src="" id="image-fk" style="display:none;"/>';
          }
          break;
        case "location":
          if (form_field.includes("location")) {
            var location_label =
              config_form.location.label != ""
                ? config_form.location.label
                : "";
            var location_required = config_form.location.required
              ? "required"
              : "";
            output_form += '<div class="simesy-tpro-form-field">';
            if (location_label != "") {
              output_form +=
                '<label for="tpro_client_location">' +
                location_label +
                "</label><br>";
            }
            output_form +=
              '<input type="text" id="tpro_client_location" name="tpro_client_location" class="input-testi ' +
              location_required +
              '" placeholder="' +
              config_form.location.placeholder +
              '"/></div>';
          }
          break;
        case "phone_mobile":
          if (form_field.includes("phone_mobile")) {
            var phone_mobile_label =
              config_form.phone_mobile.label != ""
                ? config_form.phone_mobile.label
                : "";
            var phone_mobile_required = config_form.phone_mobile.required
              ? "required"
              : "";
            output_form += '<div class="simesy-tpro-form-field">';
            if (phone_mobile_label != "") {
              output_form +=
                '<label for="tpro_client_phone">' +
                phone_mobile_label +
                "</label><br>";
            }
            output_form +=
              '<input type="text" id="tpro_client_phone" name="tpro_client_phone" class="input-testi ' +
              phone_mobile_required +
              '" placeholder="' +
              config_form.phone_mobile.placeholder +
              '"/></div>';
          }
          break;
        case "website":
          if (form_field.includes("website")) {
            var website_label =
              config_form.website.label != "" ? config_form.website.label : "";
            var website_required = config_form.website.required
              ? "required"
              : "";
            output_form += '<div class="simesy-tpro-form-field">';
            if (website_label != "") {
              output_form +=
                '<label for="tpro_client_website">' +
                website_label +
                "</label><br>";
            }
            output_form +=
              '<input type="text" id="tpro_client_website" name="tpro_client_website" class="input-testi ' +
              website_required +
              '" placeholder="' +
              config_form.website.placeholder +
              '"/></div>';
          }
          break;
        case "video_url":
          if (form_field.includes("video_url")) {
            var video_url_label =
              config_form.video_url.label != ""
                ? config_form.video_url.label
                : "";
            var video_url_required = config_form.video_url.required
              ? "required"
              : "";
            output_form += '<div class="simesy-tpro-form-field">';
            if (video_url_label != "") {
              output_form +=
                '<label for="tpro_client_video_url">' +
                video_url_label +
                "</label><br>";
            }
            output_form +=
              '<input type="text" id="tpro_client_video_url" name="tpro_client_video_url" class="input-testi ' +
              video_url_required +
              '" placeholder="' +
              config_form.video_url.placeholder +
              '"/></div>';
          }
          break;
        case "social_profile":
          if (form_field.includes("social_profile")) {
            var social_profile_label =
              config_form.social_profile.label != ""
                ? config_form.social_profile.label
                : "";
            output_form += '<div class="simesy-tpro-form-field">';
            if (social_profile_label != "") {
              output_form +=
                '<label for="tpro_client_video_url">' +
                social_profile_label +
                "</label><br>";
            }
            output_form +=
              '<div class="tpro-social-profile-wrapper"><div id="tpro-social-profiles">';
            output_form +=
              '<div class="tpro-social-profile-item" data-group="tpro_social_profiles">';
            output_form +=
              '<div class="tpro-social-profile-content"><div class="tpro-social-name-field">';
            output_form +=
              '<select class="tpro-social-name" data-name="social_name" placeholder="Select"><option value="">Select</option>';
            if (config_form.social_profile.social_profile_list != "") {
              $.each(
                config_form.social_profile.social_profile_list,
                function (e, profile) {
                  output_form +=
                    '<option value="' + profile + '">' + profile + "</option>";
                }
              );
            }
            output_form += "</select></div>";
            output_form +=
              '<div class="tpro-social-url-field"><input type="text" class="tpro-social-url" data-name="social_url" placeholder="Social URL"></div>';
            output_form += "</div>";
            output_form +=
              '<div class="tpro-social-remove"><i class="tpro-social-profile-remove fa fa-times"></i></div>';
            output_form += "</div></div>";
            output_form +=
              '<span class="tpro-add-new-profile-btn">Add New</span>';
            output_form += "</div></div>";
          }
          break;
        case "rating":
          if (form_field.includes("rating")) {
            var rating_label =
              config_form.rating.label != "" ? config_form.rating.label : "";
            output_form += '<div class="simesy-tpro-form-field">';
            if (rating_label != "") {
              output_form +=
                '<label for="tpro_client_rating">' +
                rating_label +
                "</label><br>";
            }
            output_form += '<div class="simesy-tpro-client-rating">';
            output_form +=
              '<input type="radio" name="tpro_client_rating" id="_tpro_rating_5" value="5"> <label for="_tpro_rating_5" title="Five Stars"><i class="fa fa-star"></i></label>';
            output_form +=
              '<input type="radio" name="tpro_client_rating" id="_tpro_rating_4" value="4"> <label for="_tpro_rating_4" title="Four Stars"><i class="fa fa-star"></i></label>';
            output_form +=
              '<input type="radio" name="tpro_client_rating" id="_tpro_rating_3" value="3"> <label for="_tpro_rating_3" title="Three Stars"><i class="fa fa-star"></i></label>';
            output_form +=
              '<input type="radio" name="tpro_client_rating" id="_tpro_rating_2" value="2"> <label for="_tpro_rating_2" title="Two Stars"><i class="fa fa-star"></i></label>';
            output_form +=
              '<input type="radio" name="tpro_client_rating" id="_tpro_rating_1" value="1"> <label for="_tpro_rating_1" title="One Stars"><i class="fa fa-star"></i></label>';
            output_form += "</div><br></div>";
          }
          break;
        case "recaptcha":
          if (form_field.includes("recaptcha")) {
            var recaptcha_label =
              config_form.recaptcha.label != ""
                ? config_form.recaptcha.label
                : "";
            output_form += '<div class="simesy-tpro-form-field">';
            if (recaptcha_label != "") {
              output_form +=
                '<label for="tpro_recaptcha">' +
                recaptcha_label +
                "</label><br>";
            }
            output_form +=
              '<div class="g-recaptcha" data-sitekey="6LcGrdAdAAAAABUJ-VuJhrxifyHLr66FXpVghg19"></div>';
            output_form +=
              '<div class="simesy-tpro-form-error-msg hide">Please click on the reCAPTCHA box.</div>';
            output_form += "</div>";
          }
          break;
        case "submit_btn":
          output_form += '<div class="simesy-tpro-form-submit-button">';
          output_form +=
            '<input type="submit" value="' +
            config_form.submit_btn.label +
            '" id="submit" name="submit"/><input type="hidden" name="action" value="testimonial_form"/>';
          if (form_fields.includes("recaptcha")) {
            output_form += '<input type="hidden" id="token" name="token">';
          }

          output_form += "</div>";
          break;
      }
    });
    if (
      config_form.redirect == "same_page" &&
      config_form.successful_message != "" &&
      config_form.message_position[0] == "bottom"
    ) {
      output_form +=
        '<div class="simesy-tpro-form-validation-msg hide">' +
        config_form.successful_message +
        "</div>";
    }
    output_form += "</form></div>";
    $("#simesy-testimonial-form-" + id).html(output_form);
  };
  function clearForm() {
    $("#testimonial_form .simesy-tpro-form-field input").val("");
    $("#testimonial_form .simesy-tpro-form-field textarea").val("");
    $('#testimonial_form .simesy-tpro-form-field input[type="radio"]').prop(
      "checked",
      false
    );
  }
  function checkValid() {
    let formIsValid = true;
    $(".input-testi.required").each(function (i, v) {
      if ($(this).val() == "") {
        $(this).addClass("error");
        if ($(this).parents('.simesy-tpro-form-field').find("label.error").length == 0) {
          $(this)
            .parent()
            .append(
              '<label for="' +
              $(this).attr("id") +
              '" generated="true" class="error">This field is required.</label>'
            );
        }
        formIsValid = false;
      }
    });
    if ($(this).attr("type") == "email") {
      if (!checkemail($(this).val())) {
        formIsValid = false;
      }
    }
    return formIsValid;
  }

  function checkemail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  // Testimonial
  var initTestimonialSlider = function ($) {
    var cssLink = $("<link />", {
      rel: "stylesheet",
      type: "text/css",
      href:
        "https://cdn.shopify.com/s/files/1/0610/3502/0528/t/1/assets/testimonial-main.css",
    });
    $("head").append(
      $("<link />", {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
      })
    );
    $("head").append(cssLink);
    var config = "";
    $("body")
      .find(".simesy-testimonial-pro-wrapper")
      .each(function (i, v) {
        var id = $(this).data("view-id");
        var shop = window.Shopify.shop;
        $.ajax({
          url: "https://testimonial.simesy.com/api/get_shortcode",
          type: "post",
          dataType: "JSON",
          async: false,
          data: { id: id, shop: shop },
          success: function (response) {
            config = response.data.shortCode.config;
            var testimonial_list = response.data.shortCode.testimonials;
            var total_page = response.data.shortCode.totalTestimonialPages;
            get_slider(config, id, testimonial_list, total_page);
            console.log(config);
          },
        });
      });
    $(document).find(".simesy-testimonial-pro-wrapper").each(function () {
      var is_this = $(this),
        id_section = is_this.attr("data-view-id"),
        layout_present = is_this.data("layout");
      if (id_section != "" && $(this).find('.simesy-reviews-wrapper').hasClass('simesy-reviews-layout-slider')) {
        //$('#'+id_section+ ' .swiper-slide').find('')
        var data = $('#simesy-reviews-slider-' + id_section).attr('data-slider_settings') || {};
        if (data) {
          var dataOptions = JSON.parse(data);
          if (dataOptions.navigation == 'dot') {
            var setOption = {
              autoplay: dataOptions.autoplay == "true" ? { autoplay: { delay: dataOptions.autoplay_speed, disableOnInteraction: false, } } : false,
              slidesPerView: dataOptions.slidesPerView,
              spaceBetween: dataOptions.spaceBetween,
              slidesPerGroup: dataOptions.slidesPerGroup,
              pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
              },
              breakpoints: {
                320: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                  slidesPerGroup: 1
                },
                // when window width is >= 480px
                480: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                  slidesPerGroup: 1
                },
                // when window width is >= 640px
                1024: {
                  slidesPerView: dataOptions.slidesPerView,
                  spaceBetween: dataOptions.spaceBetween,
                  slidesPerGroup: dataOptions.slidesPerGroup
                }
              }
            };
          } else if (dataOptions.navigation == 'arrow') {
            var setOption = {
              autoplay: dataOptions.autoplay == "true" ? { autoplay: { delay: dataOptions.autoplay_speed, disableOnInteraction: false, } } : false,
              slidesPerView: dataOptions.slidesPerView,
              spaceBetween: dataOptions.spaceBetween,
              slidesPerGroup: dataOptions.slidesPerGroup,
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
              breakpoints: {
                320: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                  slidesPerGroup: 1
                },
                // when window width is >= 480px
                480: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                  slidesPerGroup: 1
                },
                // when window width is >= 640px
                1024: {
                  slidesPerView: dataOptions.slidesPerView,
                  spaceBetween: dataOptions.spaceBetween,
                  slidesPerGroup: dataOptions.slidesPerGroup
                }
              }
            };
          } else {

            var setOption = {
              autoplay: dataOptions.autoplay == "true" ? { autoplay: { delay: dataOptions.autoplay_speed, disableOnInteraction: false, } } : false,
              slidesPerView: dataOptions.slidesPerView,
              spaceBetween: dataOptions.spaceBetween,
              slidesPerGroup: dataOptions.slidesPerGroup,
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
              pagination: {
                el: ".swiper-pagination",
              },
              breakpoints: {
                320: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                  slidesPerGroup: 1
                },
                // when window width is >= 480px
                480: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                  slidesPerGroup: 1
                },
                // when window width is >= 640px
                1024: {
                  slidesPerView: dataOptions.slidesPerView,
                  spaceBetween: dataOptions.spaceBetween,
                  slidesPerGroup: dataOptions.slidesPerGroup
                }
              }
            };
          }
        }
        var swiper = new Swiper("#simesy-reviews-slider-" + id_section + " .simesy-reviews-slider", setOption);

      }
      if (id_section != "" && $(this).find('.simesy-reviews-wrapper').hasClass('simesy-reviews-layout-masonry')) {
        var ele_masonry = $(this).find('.simesy-active-masonry-layout');
        if (ele_masonry.length) {
          var i = ele_masonry.data("column");
          ele_masonry.imagesLoaded((function () {
            ele_masonry.masonry({
              itemSelector: ".simesy-col-" + i
            })
          }))
        }
      }
    });

    $(document).on("click", ".simesy-reviews-loadmore", function (e) {
      var id = $(this).parents(".simesy-testimonial-pro-wrapper").data("view-id");
      var shop = window.Shopify.shop;
      var current_page = parseInt($(this).attr("data-page"));
      var total_page = $(this).data("total");
      current_page++;
      $(this).attr("data-page", current_page);
      $.ajax({
        url: "https://testimonial.simesy.com/api/get_more_testimonial",
        type: "post",
        dataType: "JSON",
        async: false,
        data: { id: id, shop: shop, page: current_page },
        success: function (response) {
          var config = response.data.shortCode.config;
          var testimonial_list = response.data.shortCode.testimonials;
          var total_page = response.data.shortCode.totalTestimonialPages;
          var html = ajaxTestiMore(config, id, testimonial_list, total_page);
          setTimeout(function () {
            $('.simesy-testimonial-pro-wrapper[data-view-id="' + id + '"]').find(".simesy_feeds").append(html);
            if (response.data.shortCode.config.layout[0] == "masonry") {

              var ele_masonry = $('#simesy-reviews-grid-' + id).find('.simesy-active-masonry-layout');
              if (ele_masonry.length) {
                var i = ele_masonry.data("column");
                $('#simesy-reviews-grid-' + id).find(".simesy-active-masonry-layout").masonry("destroy");
                ele_masonry.imagesLoaded((function () {
                  ele_masonry.masonry({
                    itemSelector: ".simesy-col-" + i
                  })
                }))
              }
            }
          }, 800);
        },
      });

      if (current_page == total_page) {
        $(this).hide();
      }
    }
    );
    $(document).on("click", '.simesy_read_more', function (e) {
      $(this).parents('.simesy_add_read_more').removeClass('simesy_show_less_content').addClass('simesy_show_more_content');
      if ($(this).parents('.simesy-reviews-wrapper').hasClass('simesy-reviews-layout-masonry')) {
        var ele_masonry = $(this).parents('.simesy-reviews-wrapper').find('.simesy-active-masonry-layout');
        if (ele_masonry.length) {
          var i = ele_masonry.data("column");
          ele_masonry.imagesLoaded((function () {
            ele_masonry.masonry({
              itemSelector: ".simesy-col-" + i
            })
          }))
        }

      }
    })
    $(document).on("click", '.simesy_read_less', function (e) {
      $(this).parents('.simesy_add_read_more').removeClass('simesy_show_more_content').addClass('simesy_show_less_content');
      if ($(this).parents('.simesy-reviews-wrapper').hasClass('simesy-reviews-layout-masonry')) {
        var ele_masonry = $(this).parents('.simesy-reviews-wrapper').find('.simesy-active-masonry-layout');
        if (ele_masonry.length) {
          var i = ele_masonry.data("column");
          ele_masonry.imagesLoaded((function () {
            ele_masonry.masonry({
              itemSelector: ".simesy-col-" + i
            })
          }))
        }

      }
    })

    //Pagination
  };
  var get_slider = function (config, id, testimonial_list, total_page) {
    testimonial_list = testimonial_list.splice(0, config.number_of_total_testimonials);
    $('.simesy-slider-section[data-slider-id="' + id + '"]').addClass(
      "simesy-slider-section-" + id + ""
    );
    /* App code */
    // General Settings
    var layout_present = config.layout[0];

    //Theme settings
    var theme_style = config.theme_style;
    // Display Option
    var section_title = config.section_title;


    // Image settings
    var testimonial_image = config.client_image;
    // Render HTML
    let data_all = [];
    // Render CSS
    var html = "";
    var class_layout = "";
    if (layout_present == "slider") {
      class_layout += "simesy-reviews-wrapper simesy-feed-wrap simesy_content simesy-reviews-slider-wrapper  simesy-reviews-template-grid1 simesy-reviews-layout-slider ";
    }
    if (layout_present == "grid") {
      class_layout += "simesy-reviews-wrapper simesy-feed-wrap simesy_content simesy-reviews-template-grid1 simesy-reviews-layout-grid";
    }
    if (layout_present == "masonry") {
      class_layout += "simesy-reviews-wrapper simesy-feed-wrap simesy_content simesy-reviews-template-grid1 simesy-reviews-layout-masonry";
    }

    if (config.section_title) {
      html += '<h2 class="simesy-section-title">' + config.title + "</h2>";
    }
    if (config.testimonial_read_more) {
      html +=
        '<div class="sp-tpro-rm-config">{"testimonial_characters_limit":' +
        config.testimonial_characters_limit +
        ',"testimonial_read_more_text":"' +
        config.testimonial_read_more_text +
        '","testimonial_read_less_text":"' +
        config.testimonial_read_less_text +
        '","testimonial_read_more_ellipsis":"' +
        config.testimonial_read_more_ellipsis +
        '"}</div>';
    }
    if (layout_present == 'slider') {
      html += '<div id="simesy-reviews-slider-' + id + '" class="' + class_layout + '" data-column="' + 12 / parseInt(config.number_of_columns) + '" data-slider_settings={"autoplay":"' + config.slider_auto_play[0] + '","autoplay_speed":' + config.slider_auto_play_speed + ',"slidesPerView":' + config.number_of_columns + ',"slidesPerGroup":' + config.number_of_columns + ',"spaceBetween":"20","navigation":"arrow"}>';
    }
    if (layout_present == 'grid') {
      html += '<div id="simesy-reviews-grid-' + id + '" class="' + class_layout + '" data-column="' + 12 / parseInt(config.number_of_columns) + '">';
    }
    if (layout_present == 'masonry') {
      html += '<div id="simesy-reviews-grid-' + id + '" class="' + class_layout + '" data-column="' + 12 / parseInt(config.number_of_columns) + '">';
    }
    html += "</div>";
    html += "</div></div>";

    $("div[data-view-id='" + id + "']").html(html);
    var html_paginate = "";
    // Pagination
    var html_theme_new = '<div class="simesy-container ">';

    if (config.layout[0] == 'slider') {
      html_theme_new += '<div class="wpsr-reviews-slider-wrapper-inner"><div class="simesy-reviews-slider swiper-container"><div class="swiper-wrapper">';
    }
    if (config.layout[0] == 'grid') {
      html_theme_new += '<div class="simesy-all-reviews simesy_feeds simesy-row" data-column="' + 12 / parseInt(config.number_of_columns) + '">'
    }
    if (config.layout[0] == 'masonry') {
      html_theme_new += '<div class="simesy-all-reviews simesy_feeds simesy-row simesy-active-masonry-layout" data-column="' + 12 / parseInt(config.number_of_columns) + '">'
    }
    $.each(testimonial_list, function (index, item_testi) {
      var html_rate = '',
        html_name = '',
        html_image = '',
        html_platform_icon = '',
        html_review_title = '',
        html_review_des = '',
        html_date = '';
      if (config.testimonial_client_rating) {
        html_rate += '<div class="simesy-rating-wrapper">';
        for (var i = 1; i <= item_testi.config.rating; i++) {

          html_rate += '<i class="' + config.tpro_star_icon[0] + '" aria-hidden="true"></i>';
        }
        if (item_testi.config.rating < 5) {
          for (var j = item_testi.config.rating + 1; j <= 5; j++) {
            if (config.tpro_star_icon[0].indexOf("smile") > -1) {
              html_rate += '<i class="fa fa-frown-o" aria-hidden="true"></i>';
            } else if (config.tpro_star_icon[0].indexOf("thumbs") > -1) {
              html_rate += '<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>';
            } else {
              html_rate += '<i class="' + config.tpro_star_icon[0] + '-o" aria-hidden="true"></i>';
            }
          }
        }
        html_rate += '</div>';
      }
      if (config.testimonial_client_name) {
        html_name += '<a href="javascript:void(0)"><h4>' + item_testi.config.name + '</h4></a>'
      }
      if (config.client_image) {
        html_image += '<div class="simesy-reviewer-image">';
        if (config.image_sizes == 'custom') {
          html_image += '<a href="javascript:void(0)"><img src="' + imgURL(item_testi.config.image_url, config.image_sizes, "w_" + config.image_custom_size.width + ",h_" + config.image_custom_size.height) + '"></a>';
        } else {
          html_image += '<a href="javascript:void(0)"><img src="' + item_testi.config.image_url + '"></a>';
        }
        html_image += '</div>'
      }
      if (config.testimonial_title) {
        html_review_title += '<h3 class="simesy-review-title">' + item_testi.config.title + '</h3>'
      }
      if (config.testimonial_text) {
        //html_review_des += '<div class="simesy-review-content">';
        var des = item_testi.config.content.replace(/[\\]/g, "");
        des = des.replace(/(<([^>]+)>)/gi, "");
        var des_full = des;
        if (config.testimonial_content_type[0] == "content_with_limit") {
          var check_array = des.split(" ");
          html_review_des += '<p class="simesy_add_read_more simesy_show_less_content simesy_more_added">';
          des = smartTrim(des, config.testimonial_characters_limit, config.testimonial_read_more_ellipsis);
          html_review_des += '<span class="simesy_content_ellipsis">' + des + '</span>';
          html_review_des += '<span class="simesy_add_read_more_slice_content">' + des_full + '</span>'
          if (check_array.length >= config.testimonial_characters_limit) {
            html_review_des += '<span class="simesy_read_more">' + config.testimonial_read_more_text + '</span>';
            html_review_des += '<span class="simesy_read_less">' + config.testimonial_read_less_text + '</span>';
          }
          html_review_des += '</p>';
        } else {
          html_review_des += '<p>' + des + '</p>';
        }

        //html_review_des += '</div>';
      }
      if (config.testimonial_client_date) {
        html_date += '<span class="simesy-review-date">' + dateFormat(item_testi.createdAt, config.testimonial_client_date_format) + '</span>';
      }
      if (config.theme_style == 'theme-three' || config.theme_style == 'theme-eight') {
        html_platform_icon += '<div class="simesy-review-platform"><span>Amazon</span></div>'
      } else {
        html_platform_icon += '<div class="simesy-review-platform"><img src="https://test.simesy.com/wp-content/plugins/wp-social-reviews/assets/images/icon/icon-amazon-small.png"/></div>'
      }
      if (config.theme_style == 'theme-one') {
        if (config.layout[0] == 'slider') {
          html_theme_new += '<div class="swiper-slide">';
        } else {
          html_theme_new += '<div class="simesy-col-' + 12 / parseInt(config.number_of_columns) + '">';
        }
        html_theme_new += '<div class="simesy-review-template simesy-review-template-one simesy-review-template-amazon">';
        html_theme_new += html_image;
        html_theme_new += '<div class="simesy-review-header">';
        html_theme_new += html_platform_icon;
        html_theme_new += '<div class="simesy-review-info">';
        html_theme_new += html_name;
        html_theme_new += html_rate;
        html_theme_new += html_date;
        html_theme_new += '</div>';
        html_theme_new += '</div>';
        html_theme_new += '<div class="simesy-review-content">';
        html_theme_new += html_review_des;
        html_theme_new += '</div>';
        html_theme_new += '</div>';
        html_theme_new += '</div>';

      }
      else if (config.theme_style == 'theme-two') {
        if (config.layout[0] == 'slider') {
          html_theme_new += '<div class="swiper-slide">';
        } else {
          html_theme_new += '<div class="simesy-col-' + 12 / parseInt(config.number_of_columns) + '">';
        }
        html_theme_new += '<div class="simesy-review-template simesy-review-template-two simesy-review-template-amazon">';
        html_theme_new += '<div class="simesy-review-header">';
        html_theme_new += html_platform_icon;
        html_theme_new += html_image;
        html_theme_new += '<div class="simesy-review-info">';
        html_theme_new += html_name;
        html_theme_new += html_rate;
        html_theme_new += html_date;
        html_theme_new += '</div>';
        html_theme_new += '</div>';
        html_theme_new += '<div class="simesy-review-content">';
        html_theme_new += html_review_des;
        html_theme_new += '</div>';
        html_theme_new += '</div>';
        html_theme_new += '</div>';
      }
      else if (config.theme_style == 'theme-three') {
        if (config.layout[0] == 'slider') {
          html_theme_new += '<div class="swiper-slide">';
        } else {
          html_theme_new += '<div class="simesy-col-' + 12 / parseInt(config.number_of_columns) + '">';
        }
        html_theme_new += '<div class="simesy-review-template simesy-review-template-three simesy-review-template-amazon">';
        html_theme_new += html_platform_icon;
        html_theme_new += html_rate;
        html_theme_new += '<div class="simesy-review-content">';
        html_theme_new += html_review_des;
        html_theme_new += '</div>';
        html_theme_new += '<div class="simesy-review-header">';
        html_theme_new += html_image;
        html_theme_new += '<div class="simesy-review-info">';
        html_theme_new += html_name;
        html_theme_new += html_date;
        html_theme_new += '</div>';
        html_theme_new += '</div>';
        html_theme_new += '</div>';
        html_theme_new += '</div>';
      }
      else if (config.theme_style == 'theme-four') {
        if (config.layout[0] == 'slider') {
          html_theme_new += '<div class="swiper-slide">';
        } else {
          html_theme_new += '<div class="simesy-col-' + 12 / parseInt(config.number_of_columns) + '">';
        }
        html_theme_new += '<div class="simesy-review-template simesy-review-template-four simesy-review-template-amazon">';
        html_theme_new += '<div class="simesy-review-header">';
        html_theme_new += html_platform_icon;
        html_theme_new += html_rate;
        html_theme_new += '<div class="simesy-review-content">';
        html_theme_new += html_review_des;
        html_theme_new += '</div>';
        html_theme_new += '</div>';

        html_theme_new += '<div class="simesy-review-info">';
        html_theme_new += html_image;
        html_theme_new += '<div class="simesy-review-name-date">';
        html_theme_new += html_name;
        html_theme_new += html_date;
        html_theme_new += '</div>';
        html_theme_new += '</div>';
        html_theme_new += '</div>';
        html_theme_new += '</div>';
      }
      else if (config.theme_style == 'theme-five') {
        if (config.layout[0] == 'slider') {
          html_theme_new += '<div class="swiper-slide">';
        } else {
          html_theme_new += '<div class="simesy-col-' + 12 / parseInt(config.number_of_columns) + '">';
        }
        html_theme_new += '<div class="simesy-review-template simesy-review-template-five simesy-review-template-amazon">';
        html_theme_new += html_image;
        html_theme_new += '<div class="simesy-review-header">';
        html_theme_new += html_platform_icon;
        html_theme_new += '</div>';
        html_theme_new += '<div class="simesy-review-info">';
        html_theme_new += html_name;
        html_theme_new += '</div>';
        html_theme_new += '<div class="simesy-review-content">';
        html_theme_new += html_review_des;
        html_theme_new += '</div>'
        html_theme_new += html_rate;
        html_theme_new += html_date;
        html_theme_new += '</div>';
        html_theme_new += '</div>';
      }
      else if (config.theme_style == 'theme-six') {
        if (config.layout[0] == 'slider') {
          html_theme_new += '<div class="swiper-slide">';
        } else {
          html_theme_new += '<div class="simesy-col-' + 12 / parseInt(config.number_of_columns) + '">';
        }
        html_theme_new += '<div class="simesy-review-template simesy-review-template-six simesy-review-template-amazon">';
        html_theme_new += html_image;
        html_theme_new += '<div class="simesy-review-content">';
        html_theme_new += html_review_des;
        html_theme_new += '</div>';
        html_theme_new += '<div class="simesy-review-header">';
        html_theme_new += '<div class="simesy-review-info">';
        html_theme_new += html_name;
        html_theme_new += html_rate;
        html_theme_new += html_date;
        html_theme_new += '</div>';
        html_theme_new += html_platform_icon;
        html_theme_new += '</div>';
        html_theme_new += '</div>';
        html_theme_new += '</div>';

      }
      else if (config.theme_style == 'theme-seven') {
        if (config.layout[0] == 'slider') {
          html_theme_new += '<div class="swiper-slide">';
        } else {
          html_theme_new += '<div class="simesy-col-' + 12 / parseInt(config.number_of_columns) + '">';
        }
        html_theme_new += '<div class="simesy-review-template simesy-review-template-seven simesy-review-template-amazon">';

        html_theme_new += '<div class="simesy-review-content">';
        html_theme_new += html_review_des;
        html_theme_new += '</div>';
        html_theme_new += '<div class="simesy-review-header">';
        html_theme_new += html_image;
        html_theme_new += '<div class="simesy-review-info">';
        html_theme_new += html_name;
        html_theme_new += html_rate;
        html_theme_new += html_date;
        html_theme_new += '</div>';
        html_theme_new += html_platform_icon;
        html_theme_new += '</div>';
        html_theme_new += '</div>';
        html_theme_new += '</div>';

      }
      else if (config.theme_style == 'theme-eight') {
        if (config.layout[0] == 'slider') {
          html_theme_new += '<div class="swiper-slide">';
        } else {
          html_theme_new += '<div class="simesy-col-' + 12 / parseInt(config.number_of_columns) + '">';
        }
        html_theme_new += '<div class="simesy-review-template simesy-review-template-eight simesy-review-template-amazon">';
        html_theme_new += '<div class="simesy-reviews-on-hover">';
        html_theme_new += '<div class="simesy-review-content">';
        html_theme_new += html_review_des;
        html_theme_new += '</div>';
        html_theme_new += html_platform_icon;
        html_theme_new += '</div>';
        html_theme_new += '<div class="simesy-review-header">';
        html_theme_new += '<div class="simesy-review-info">';
        html_theme_new += html_image;
        html_theme_new += html_rate;
        html_theme_new += html_name;
        html_theme_new += html_date;
        html_theme_new += '</div>';
        html_theme_new += '</div>';
        html_theme_new += '</div>';
        html_theme_new += '</div>';

      }
      else {
        if (config.layout[0] == 'slider') {
          html_theme_new += '<div class="swiper-slide">';
        } else {
          html_theme_new += '<div class="simesy-col-' + 12 / parseInt(config.number_of_columns) + '">';
        }
        html_theme_new += '<div class="simesy-review-template simesy-review-template-nine simesy-review-template-amazon">';
        html_theme_new += '<div class="simesy-review-header">';
        html_theme_new += html_image;
        html_theme_new += '<div class="simesy-review-info">';
        html_theme_new += html_name;
        html_theme_new += html_rate;
        html_theme_new += html_date;
        html_theme_new += '<div class="simesy-review-content">';
        html_theme_new += html_review_des;
        html_theme_new += '</div>';
        html_theme_new += '</div>';
        html_theme_new += '</div>';
        html_theme_new += '</div>';
        html_theme_new += '</div>';

      }
    });
    if (config.layout[0] == 'slider') {
      html_theme_new += '</div>';

      html_theme_new += '</div>';
      if (config.pagination_type != 'none') {
        html_theme_new += '<div class="simesy-swiper-carousel-wrapper">';
        if (config.pagination_type != 'arrows') {
          html_theme_new += '<div class="simesy-swiper-pagination swiper-pagination simesy-swiper-pagination-0"></div>';
        }
        if (config.pagination_type != 'dots') {
          html_theme_new += ' <div class="simesy-swiper-prev-next simesy-swiper-prev swiper-button-prev simesy-swiper-btn-prev-0"></div><div class="simesy-swiper-prev-next simesy-swiper-next swiper-button-next simesy-swiper-btn-next-0"></div>';
        }
        html_theme_new += '</div>';
      }
      html_theme_new += '</div>';
    }

    if (config.layout[0] == 'grid' || config.layout[0] == 'masonry') {
      html_theme_new += '</div>';
    }
    html_theme_new += '</div>';
    $('#sp-testimonial-pro-wrapper-' + id).find('.simesy-reviews-wrapper').html(html_theme_new);
    // Paginate
    if (config.grid_pagination && total_page > 1) {
      html_paginate += '<div class="simesy-reviews-loadmore simesy_more" id="simesy-reviews-load-more-btn' + id + '" data-total="' + total_page + '" data-page="1" data-template_type="' + config.layout[0] + '"><span>Load more</span></div>'
      $('#sp-testimonial-pro-wrapper-' + id).find('.simesy-reviews-wrapper').append(html_paginate);
    }
  };
  function ajaxTestiMore(config, id, testimonial_list) {
    var html_load = '';
    $.each(testimonial_list, function (index, item_testi) {
      var html_rate = '',
        html_name = '',
        html_image = '',
        html_platform_icon = '',
        html_review_title = '',
        html_review_des = '',
        html_date = '';
      if (config.testimonial_client_rating) {
        html_rate += '<div class="simesy-rating-wrapper">';
        for (var i = 1; i <= item_testi.config.rating; i++) {

          html_rate += '<i class="' + config.tpro_star_icon[0] + '" aria-hidden="true"></i>';
        }
        if (item_testi.config.rating < 5) {
          for (var j = item_testi.config.rating + 1; j <= 5; j++) {
            if (config.tpro_star_icon[0].indexOf("smile") > -1) {
              html_rate += '<i class="fa fa-frown-o" aria-hidden="true"></i>';
            } else if (config.tpro_star_icon[0].indexOf("thumbs") > -1) {
              html_rate += '<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>';
            } else {
              html_rate += '<i class="' + config.tpro_star_icon[0] + '-o" aria-hidden="true"></i>';
            }
          }
        }
        html_rate += '</div>';
      }
      if (config.testimonial_client_name) {
        html_name += '<a href="javascript:void(0)"><h4>' + item_testi.config.name + '</h4></a>'
      }
      if (config.client_image) {
        html_image += '<div class="simesy-reviewer-image">';
        if (config.image_sizes == 'custom') {
          html_image += '<a href="javascript:void(0)"><img src="' + imgURL(item_testi.config.image_url, config.image_sizes, "w_" + config.image_custom_size.width + ",h_" + config.image_custom_size.height) + '"></a>';
        } else {
          html_image += '<a href="javascript:void(0)"><img src="' + item_testi.config.image_url + '"></a>';
        }
        html_image += '</div>'
      }
      if (config.testimonial_title) {
        html_review_title += '<h3 class="simesy-review-title">' + item_testi.config.title + '</h3>'
      }
      if (config.testimonial_text) {
        //html_review_des += '<div class="simesy-review-content">';
        var des = item_testi.config.content.replace(/[\\]/g, "");
        des = des.replace(/(<([^>]+)>)/gi, "");
        var des_full = des;
        if (config.testimonial_content_type[0] == "content_with_limit") {
          var check_array = des.split(" ");
          html_review_des += '<p class="simesy_add_read_more simesy_show_less_content simesy_more_added">';
          des = smartTrim(des, config.testimonial_characters_limit, config.testimonial_read_more_ellipsis);
          html_review_des += '<span class="simesy_content_ellipsis">' + des + '</span>';
          html_review_des += '<span class="simesy_add_read_more_slice_content">' + des_full + '</span>'
          if (check_array.length >= config.testimonial_characters_limit) {
            html_review_des += '<span class="simesy_read_more">' + config.testimonial_read_more_text + '</span>';
            html_review_des += '<span class="simesy_read_less">' + config.testimonial_read_less_text + '</span>';
          }
          html_review_des += '</p>';
        } else {
          html_review_des += '<p>' + des + '</p>';
        }

        //html_review_des += '</div>';
      }
      if (config.testimonial_client_date) {
        html_date += '<span class="simesy-review-date">' + dateFormat(item_testi.config.createdAt, config.testimonial_client_date_format) + '</span>';
      }
      if (config.theme_style == 'theme-three' || config.theme_style == 'theme-eight') {
        html_platform_icon += '<div class="simesy-review-platform"><span>' + item_testi.config.platform_name + '</span></div>'
      } else {
        html_platform_icon += '<div class="simesy-review-platform"><img src="' + item_testi.config.platform_logo + '"/></div>'
      }
      if (config.theme_style == 'theme-one') {
        if (config.layout[0] == 'slider') {
          html_load += '<div class="swiper-slide">';
        } else {
          html_load += '<div class="simesy-col-' + 12 / parseInt(3) + '">';
        }
        html_load += '<div class="simesy-review-template simesy-review-template-one simesy-review-template-amazon">';
        html_load += html_image;
        html_load += '<div class="simesy-review-header">';
        html_load += html_platform_icon;
        html_load += '<div class="simesy-review-info">';
        html_load += html_name;
        html_load += html_rate;
        html_load += html_date;
        html_load += '</div>';
        html_load += '</div>';
        html_load += '<div class="simesy-review-content">';
        html_load += html_review_des;
        html_load += '</div>';
        html_load += '</div>';
        html_load += '</div>';

      }
      else if (config.theme_style == 'theme-two') {
        if (config.layout[0] == 'slider') {
          html_load += '<div class="swiper-slide">';
        } else {
          html_load += '<div class="simesy-col-' + 12 / parseInt(config.number_of_columns) + '">';
        }
        html_load += '<div class="simesy-review-template simesy-review-template-two simesy-review-template-amazon">';
        html_load += '<div class="simesy-review-header">';
        html_load += html_platform_icon;
        html_load += html_image;
        html_load += '<div class="simesy-review-info">';
        html_load += html_name;
        html_load += html_rate;
        html_load += html_date;
        html_load += '</div>';
        html_load += '</div>';
        html_load += '<div class="simesy-review-content">';
        html_load += html_review_des;
        html_load += '</div>';
        html_load += '</div>';
        html_load += '</div>';
      }
      else if (config.theme_style == 'theme-three') {
        if (config.layout[0] == 'slider') {
          html_load += '<div class="swiper-slide">';
        } else {
          html_load += '<div class="simesy-col-' + 12 / parseInt(config.number_of_columns) + '">';
        }
        html_load += '<div class="simesy-review-template simesy-review-template-three simesy-review-template-amazon">';
        html_load += html_platform_icon;
        html_load += html_rate;
        html_load += '<div class="simesy-review-content">';
        html_load += html_review_des;
        html_load += '</div>';
        html_load += '<div class="simesy-review-header">';
        html_load += html_image;
        html_load += '<div class="simesy-review-info">';
        html_load += html_name;
        html_load += html_date;
        html_load += '</div>';
        html_load += '</div>';
        html_load += '</div>';
        html_load += '</div>';
      }
      else if (config.theme_style == 'theme-four') {
        if (config.layout[0] == 'slider') {
          html_load += '<div class="swiper-slide">';
        } else {
          html_load += '<div class="simesy-col-' + 12 / parseInt(config.number_of_columns) + '">';
        }
        html_load += '<div class="simesy-review-template simesy-review-template-four simesy-review-template-amazon">';
        html_load += '<div class="simesy-review-header">';
        html_load += html_platform_icon;
        html_load += html_rate;
        html_load += '<div class="simesy-review-content">';
        html_load += html_review_des;
        html_load += '</div>';
        html_load += '</div>';

        html_load += '<div class="simesy-review-info">';
        html_load += html_image;
        html_load += '<div class="simesy-review-name-date">';
        html_load += html_name;
        html_load += html_date;
        html_load += '</div>';
        html_load += '</div>';
        html_load += '</div>';
        html_load += '</div>';
      }
      else if (config.theme_style == 'theme-five') {
        if (config.layout[0] == 'slider') {
          html_load += '<div class="swiper-slide">';
        } else {
          html_load += '<div class="simesy-col-' + 12 / parseInt(config.number_of_columns) + '">';
        }
        html_load += '<div class="simesy-review-template simesy-review-template-five simesy-review-template-amazon">';
        html_load += html_image;
        html_load += '<div class="simesy-review-header">';
        html_load += html_platform_icon;
        html_load += '</div>';
        html_load += '<div class="simesy-review-info">';
        html_load += html_name;
        html_load += '</div>';
        html_load += '<div class="simesy-review-content">';
        html_load += html_review_des;
        html_load += '</div>'
        html_load += html_rate;
        html_load += html_date;
        html_load += '</div>';
        html_load += '</div>';
      }
      else if (config.theme_style == 'theme-six') {
        if (config.layout[0] == 'slider') {
          html_load += '<div class="swiper-slide">';
        } else {
          html_load += '<div class="simesy-col-' + 12 / parseInt(config.number_of_columns) + '">';
        }
        html_load += '<div class="simesy-review-template simesy-review-template-six simesy-review-template-amazon">';
        html_load += html_image;
        html_load += '<div class="simesy-review-content">';
        html_load += html_review_des;
        html_load += '</div>';
        html_load += '<div class="simesy-review-header">';
        html_load += '<div class="simesy-review-info">';
        html_load += html_name;
        html_load += html_rate;
        html_load += html_date;
        html_load += '</div>';
        html_load += html_platform_icon;
        html_load += '</div>';
        html_load += '</div>';
        html_load += '</div>';

      }
      else if (config.theme_style == 'theme-seven') {
        if (config.layout[0] == 'slider') {
          html_load += '<div class="swiper-slide">';
        } else {
          html_load += '<div class="simesy-col-' + 12 / parseInt(config.number_of_columns) + '">';
        }
        html_load += '<div class="simesy-review-template simesy-review-template-seven simesy-review-template-amazon">';

        html_load += '<div class="simesy-review-content">';
        html_load += html_review_des;
        html_load += '</div>';
        html_load += '<div class="simesy-review-header">';
        html_load += html_image;
        html_load += '<div class="simesy-review-info">';
        html_load += html_name;
        html_load += html_rate;
        html_load += html_date;
        html_load += '</div>';
        html_load += html_platform_icon;
        html_load += '</div>';
        html_load += '</div>';
        html_load += '</div>';

      }
      else if (config.theme_style == 'theme-eight') {
        if (config.layout[0] == 'slider') {
          html_load += '<div class="swiper-slide">';
        } else {
          html_load += '<div class="simesy-col-' + 12 / parseInt(config.number_of_columns) + '">';
        }
        html_load += '<div class="simesy-review-template simesy-review-template-eight simesy-review-template-amazon">';
        html_load += '<div class="simesy-reviews-on-hover">';
        html_load += '<div class="simesy-review-content">';
        html_load += html_review_des;
        html_load += '</div>';
        html_load += html_platform_icon;
        html_load += '</div>';
        html_load += '<div class="simesy-review-header">';
        html_load += '<div class="simesy-review-info">';
        html_load += html_image;
        html_load += html_rate;
        html_load += html_name;
        html_load += html_date;
        html_load += '</div>';
        html_load += '</div>';
        html_load += '</div>';
        html_load += '</div>';

      }
      else {
        if (config.layout[0] == 'slider') {
          html_load += '<div class="swiper-slide">';
        } else {
          html_load += '<div class="simesy-col-' + 12 / parseInt(config.number_of_columns) + '">';
        }
        html_load += '<div class="simesy-review-template simesy-review-template-nine simesy-review-template-amazon">';
        html_load += '<div class="simesy-review-header">';
        html_load += html_image;
        html_load += '<div class="simesy-review-info">';
        html_load += html_name;
        html_load += html_rate;
        html_load += html_date;
        html_load += '<div class="simesy-review-content">';
        html_load += html_review_des;
        html_load += '</div>';
        html_load += '</div>';
        html_load += '</div>';
        html_load += '</div>';
        html_load += '</div>';

      }
    });
    return html_load;
  }
  // Resize image
  function imgURL(src, image_size, size) {
    src = src.replace(
      /_(pico|icon|thumb|small|compact|medium|large|grande|original|1024x1024|2048x2048|master)+\./g,
      "."
    );
    if (image_size === "default") {
      return src;
    } else {
      var src = src.split("upload/");
      return src[0] + "upload/c_fill," + size + "/" + src[1];
    }
  }
  // Text
  function test_des(testi, config) {
    var des = testi.replace(/[\\]/g, "");
    if (config.testimonial_content_type[0] == "content_with_limit") {
      des = des.replace(/(<([^>]+)>)/gi, "");
      des = smartTrim(des,
        config.testimonial_characters_limit,
        config.testimonial_read_more_ellipsis
      );
    }
    return des;
  }
  // Rate
  function render_rate(rating, icon) {
    var html_rate = "";
    for (var i = 1; i <= rating; i++) {
      html_rate += '<i class="' + icon + '" aria-hidden="true"></i>';
    }
    if (rating < 5) {
      for (var j = rating + 1; j <= 5; j++) {
        if (icon.indexOf("smile") > -1) {
          html_rate += '<i class="fa fa-frown-o" aria-hidden="true"></i>';
        } else if (icon.indexOf("thumbs") > -1) {
          html_rate += '<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>';
        } else {
          html_rate += '<i class="' + icon + '-o" aria-hidden="true"></i>';
        }
      }
    }
    return html_rate;
  }
  //smartTrim
  function smartTrim(str, length, appendix) {
    var check_array = str.split(" ");
    var str_title = str.split(/\s+/).slice(0, length).join(" ");
    if (check_array.length >= length) {
      str_title += appendix;
    }
    return str_title;
  }
  /*
* Date Format 1.2.3
* (c) 2007-2009 Steven Levithan <stevenlevithan.com>
* MIT license
*
* Includes enhancements by Scott Trenda <scott.trenda.net>
* and Kris Kowal <cixar.com/~kris.kowal/>
*
* Accepts a date, a mask, or a date and a mask.
* Returns a formatted version of the given date.
* The date defaults to the current date/time.
* The mask defaults to dateFormat.masks.default.
*/

  var dateFormat = (function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
      timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
      timezoneClip = /[^-+\dA-Z]/g,
      pad = function (val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) val = "0" + val;
        return val;
      };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
      var dF = dateFormat;

      // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
      if (
        arguments.length == 1 &&
        Object.prototype.toString.call(date) == "[object String]" &&
        !/\d/.test(date)
      ) {
        mask = date;
        date = undefined;
      }

      // Passing date through Date applies Date.parse, if necessary
      date = date ? new Date(date) : new Date();
      if (isNaN(date)) throw SyntaxError("invalid date");

      mask = String(dF.masks[mask] || mask || dF.masks["default"]);

      // Allow setting the utc argument via the mask
      if (mask.slice(0, 4) == "UTC:") {
        mask = mask.slice(4);
        utc = true;
      }

      var _ = utc ? "getUTC" : "get",
        d = date[_ + "Date"](),
        D = date[_ + "Day"](),
        m = date[_ + "Month"](),
        y = date[_ + "FullYear"](),
        H = date[_ + "Hours"](),
        M = date[_ + "Minutes"](),
        s = date[_ + "Seconds"](),
        L = date[_ + "Milliseconds"](),
        o = utc ? 0 : date.getTimezoneOffset(),
        flags = {
          d: d,
          dd: pad(d),
          ddd: dF.i18n.dayNames[D],
          dddd: dF.i18n.dayNames[D + 7],
          m: m + 1,
          mm: pad(m + 1),
          mmm: dF.i18n.monthNames[m],
          mmmm: dF.i18n.monthNames[m + 12],
          yy: String(y).slice(2),
          yyyy: y,
          h: H % 12 || 12,
          hh: pad(H % 12 || 12),
          H: H,
          HH: pad(H),
          M: M,
          MM: pad(M),
          s: s,
          ss: pad(s),
          l: pad(L, 3),
          L: pad(L > 99 ? Math.round(L / 10) : L),
          t: H < 12 ? "a" : "p",
          tt: H < 12 ? "am" : "pm",
          T: H < 12 ? "A" : "P",
          TT: H < 12 ? "AM" : "PM",
          Z: utc
            ? "UTC"
            : (String(date).match(timezone) || [""])
              .pop()
              .replace(timezoneClip, ""),
          o:
            (o > 0 ? "-" : "+") +
            pad(Math.floor(Math.abs(o) / 60) * 100 + (Math.abs(o) % 60), 4),
          S: ["th", "st", "nd", "rd"][
            d % 10 > 3 ? 0 : (((d % 100) - (d % 10) != 10) * d) % 10
          ],
        };

      return mask.replace(token, function ($0) {
        return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
      });
    };
  })();

  // Some common format strings
  dateFormat.masks = {
    default: "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
  };

  // Internationalization strings
  dateFormat.i18n = {
    dayNames: [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    monthNames: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };

  // For convenience...
  Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
  };
  if (typeof jQuery === "undefined" || parseFloat(jQuery.fn.jquery) < 1.7) {
    loadScript(
      "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js",
      function () {
        //     jQuery191 = jQuery.noConflict(true);
        initTestimonialSliderLibrary(jQuery);
        initTestimonialSlider(jQuery);
        initTestimonialForm(jQuery);
      }
    );
  } else {
    initTestimonialSliderLibrary(jQuery);
    initTestimonialSlider(jQuery);
    initTestimonialForm(jQuery);
  }
})();