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

  var initProductSliderLibrary = function (jQuery) {
    (function (t) {
      "function" == typeof define && define.amd
        ? define(["jquery"], t)
        : t(jQuery);
    })(function (t) {
      (t.ui = t.ui || {}), (t.ui.version = "1.12.1");
      var e = 0,
        i = Array.prototype.slice;
      (t.cleanData = (function (e) {
        return function (i) {
          var s, n, o;
          for (o = 0; null != (n = i[o]); o++)
            try {
              (s = t._data(n, "events")),
                s && s.remove && t(n).triggerHandler("remove");
            } catch (a) {}
          e(i);
        };
      })(t.cleanData)),
        (t.widget = function (e, i, s) {
          var n,
            o,
            a,
            r = {},
            l = e.split(".")[0];
          e = e.split(".")[1];
          var h = l + "-" + e;
          return (
            s || ((s = i), (i = t.Widget)),
            t.isArray(s) && (s = t.extend.apply(null, [{}].concat(s))),
            (t.expr[":"][h.toLowerCase()] = function (e) {
              return !!t.data(e, h);
            }),
            (t[l] = t[l] || {}),
            (n = t[l][e]),
            (o = t[l][e] = function (t, e) {
              return this._createWidget
                ? (arguments.length && this._createWidget(t, e), void 0)
                : new o(t, e);
            }),
            t.extend(o, n, {
              version: s.version,
              _proto: t.extend({}, s),
              _childConstructors: [],
            }),
            (a = new i()),
            (a.options = t.widget.extend({}, a.options)),
            t.each(s, function (e, s) {
              return t.isFunction(s)
                ? ((r[e] = (function () {
                    function t() {
                      return i.prototype[e].apply(this, arguments);
                    }
                    function n(t) {
                      return i.prototype[e].apply(this, t);
                    }
                    return function () {
                      var e,
                        i = this._super,
                        o = this._superApply;
                      return (
                        (this._super = t),
                        (this._superApply = n),
                        (e = s.apply(this, arguments)),
                        (this._super = i),
                        (this._superApply = o),
                        e
                      );
                    };
                  })()),
                  void 0)
                : ((r[e] = s), void 0);
            }),
            (o.prototype = t.widget.extend(
              a,
              { widgetEventPrefix: n ? a.widgetEventPrefix || e : e },
              r,
              { constructor: o, namespace: l, widgetName: e, widgetFullName: h }
            )),
            n
              ? (t.each(n._childConstructors, function (e, i) {
                  var s = i.prototype;
                  t.widget(s.namespace + "." + s.widgetName, o, i._proto);
                }),
                delete n._childConstructors)
              : i._childConstructors.push(o),
            t.widget.bridge(e, o),
            o
          );
        }),
        (t.widget.extend = function (e) {
          for (
            var s, n, o = i.call(arguments, 1), a = 0, r = o.length;
            r > a;
            a++
          )
            for (s in o[a])
              (n = o[a][s]),
                o[a].hasOwnProperty(s) &&
                  void 0 !== n &&
                  (e[s] = t.isPlainObject(n)
                    ? t.isPlainObject(e[s])
                      ? t.widget.extend({}, e[s], n)
                      : t.widget.extend({}, n)
                    : n);
          return e;
        }),
        (t.widget.bridge = function (e, s) {
          var n = s.prototype.widgetFullName || e;
          t.fn[e] = function (o) {
            var a = "string" == typeof o,
              r = i.call(arguments, 1),
              l = this;
            return (
              a
                ? this.length || "instance" !== o
                  ? this.each(function () {
                      var i,
                        s = t.data(this, n);
                      return "instance" === o
                        ? ((l = s), !1)
                        : s
                        ? t.isFunction(s[o]) && "_" !== o.charAt(0)
                          ? ((i = s[o].apply(s, r)),
                            i !== s && void 0 !== i
                              ? ((l = i && i.jquery ? l.pushStack(i.get()) : i),
                                !1)
                              : void 0)
                          : t.error(
                              "no such method '" +
                                o +
                                "' for " +
                                e +
                                " widget instance"
                            )
                        : t.error(
                            "cannot call methods on " +
                              e +
                              " prior to initialization; " +
                              "attempted to call method '" +
                              o +
                              "'"
                          );
                    })
                  : (l = void 0)
                : (r.length && (o = t.widget.extend.apply(null, [o].concat(r))),
                  this.each(function () {
                    var e = t.data(this, n);
                    e
                      ? (e.option(o || {}), e._init && e._init())
                      : t.data(this, n, new s(o, this));
                  })),
              l
            );
          };
        }),
        (t.Widget = function () {}),
        (t.Widget._childConstructors = []),
        (t.Widget.prototype = {
          widgetName: "widget",
          widgetEventPrefix: "",
          defaultElement: "<div>",
          options: { classes: {}, disabled: !1, create: null },
          _createWidget: function (i, s) {
            (s = t(s || this.defaultElement || this)[0]),
              (this.element = t(s)),
              (this.uuid = e++),
              (this.eventNamespace = "." + this.widgetName + this.uuid),
              (this.bindings = t()),
              (this.hoverable = t()),
              (this.focusable = t()),
              (this.classesElementLookup = {}),
              s !== this &&
                (t.data(s, this.widgetFullName, this),
                this._on(!0, this.element, {
                  remove: function (t) {
                    t.target === s && this.destroy();
                  },
                }),
                (this.document = t(
                  s.style ? s.ownerDocument : s.document || s
                )),
                (this.window = t(
                  this.document[0].defaultView || this.document[0].parentWindow
                ))),
              (this.options = t.widget.extend(
                {},
                this.options,
                this._getCreateOptions(),
                i
              )),
              this._create(),
              this.options.disabled &&
                this._setOptionDisabled(this.options.disabled),
              this._trigger("create", null, this._getCreateEventData()),
              this._init();
          },
          _getCreateOptions: function () {
            return {};
          },
          _getCreateEventData: t.noop,
          _create: t.noop,
          _init: t.noop,
          destroy: function () {
            var e = this;
            this._destroy(),
              t.each(this.classesElementLookup, function (t, i) {
                e._removeClass(i, t);
              }),
              this.element
                .off(this.eventNamespace)
                .removeData(this.widgetFullName),
              this.widget()
                .off(this.eventNamespace)
                .removeAttr("aria-disabled"),
              this.bindings.off(this.eventNamespace);
          },
          _destroy: t.noop,
          widget: function () {
            return this.element;
          },
          option: function (e, i) {
            var s,
              n,
              o,
              a = e;
            if (0 === arguments.length)
              return t.widget.extend({}, this.options);
            if ("string" == typeof e)
              if (((a = {}), (s = e.split(".")), (e = s.shift()), s.length)) {
                for (
                  n = a[e] = t.widget.extend({}, this.options[e]), o = 0;
                  s.length - 1 > o;
                  o++
                )
                  (n[s[o]] = n[s[o]] || {}), (n = n[s[o]]);
                if (((e = s.pop()), 1 === arguments.length))
                  return void 0 === n[e] ? null : n[e];
                n[e] = i;
              } else {
                if (1 === arguments.length)
                  return void 0 === this.options[e] ? null : this.options[e];
                a[e] = i;
              }
            return this._setOptions(a), this;
          },
          _setOptions: function (t) {
            var e;
            for (e in t) this._setOption(e, t[e]);
            return this;
          },
          _setOption: function (t, e) {
            return (
              "classes" === t && this._setOptionClasses(e),
              (this.options[t] = e),
              "disabled" === t && this._setOptionDisabled(e),
              this
            );
          },
          _setOptionClasses: function (e) {
            var i, s, n;
            for (i in e)
              (n = this.classesElementLookup[i]),
                e[i] !== this.options.classes[i] &&
                  n &&
                  n.length &&
                  ((s = t(n.get())),
                  this._removeClass(n, i),
                  s.addClass(
                    this._classes({ element: s, keys: i, classes: e, add: !0 })
                  ));
          },
          _setOptionDisabled: function (t) {
            this._toggleClass(
              this.widget(),
              this.widgetFullName + "-disabled",
              null,
              !!t
            ),
              t &&
                (this._removeClass(this.hoverable, null, "ui-state-hover"),
                this._removeClass(this.focusable, null, "ui-state-focus"));
          },
          enable: function () {
            return this._setOptions({ disabled: !1 });
          },
          disable: function () {
            return this._setOptions({ disabled: !0 });
          },
          _classes: function (e) {
            function i(i, o) {
              var a, r;
              for (r = 0; i.length > r; r++)
                (a = n.classesElementLookup[i[r]] || t()),
                  (a = e.add
                    ? t(t.unique(a.get().concat(e.element.get())))
                    : t(a.not(e.element).get())),
                  (n.classesElementLookup[i[r]] = a),
                  s.push(i[r]),
                  o && e.classes[i[r]] && s.push(e.classes[i[r]]);
            }
            var s = [],
              n = this;
            return (
              (e = t.extend(
                { element: this.element, classes: this.options.classes || {} },
                e
              )),
              this._on(e.element, { remove: "_untrackClassesElement" }),
              e.keys && i(e.keys.match(/\S+/g) || [], !0),
              e.extra && i(e.extra.match(/\S+/g) || []),
              s.join(" ")
            );
          },
          _untrackClassesElement: function (e) {
            var i = this;
            t.each(i.classesElementLookup, function (s, n) {
              -1 !== t.inArray(e.target, n) &&
                (i.classesElementLookup[s] = t(n.not(e.target).get()));
            });
          },
          _removeClass: function (t, e, i) {
            return this._toggleClass(t, e, i, !1);
          },
          _addClass: function (t, e, i) {
            return this._toggleClass(t, e, i, !0);
          },
          _toggleClass: function (t, e, i, s) {
            s = "boolean" == typeof s ? s : i;
            var n = "string" == typeof t || null === t,
              o = {
                extra: n ? e : i,
                keys: n ? t : e,
                element: n ? this.element : t,
                add: s,
              };
            return o.element.toggleClass(this._classes(o), s), this;
          },
          _on: function (e, i, s) {
            var n,
              o = this;
            "boolean" != typeof e && ((s = i), (i = e), (e = !1)),
              s
                ? ((i = n = t(i)), (this.bindings = this.bindings.add(i)))
                : ((s = i), (i = this.element), (n = this.widget())),
              t.each(s, function (s, a) {
                function r() {
                  return e ||
                    (o.options.disabled !== !0 &&
                      !t(this).hasClass("ui-state-disabled"))
                    ? ("string" == typeof a ? o[a] : a).apply(o, arguments)
                    : void 0;
                }
                "string" != typeof a &&
                  (r.guid = a.guid = a.guid || r.guid || t.guid++);
                var l = s.match(/^([\w:-]*)\s*(.*)$/),
                  h = l[1] + o.eventNamespace,
                  c = l[2];
                c ? n.on(h, c, r) : i.on(h, r);
              });
          },
          _off: function (e, i) {
            (i =
              (i || "").split(" ").join(this.eventNamespace + " ") +
              this.eventNamespace),
              e.off(i).off(i),
              (this.bindings = t(this.bindings.not(e).get())),
              (this.focusable = t(this.focusable.not(e).get())),
              (this.hoverable = t(this.hoverable.not(e).get()));
          },
          _delay: function (t, e) {
            function i() {
              return ("string" == typeof t ? s[t] : t).apply(s, arguments);
            }
            var s = this;
            return setTimeout(i, e || 0);
          },
          _hoverable: function (e) {
            (this.hoverable = this.hoverable.add(e)),
              this._on(e, {
                mouseenter: function (e) {
                  this._addClass(t(e.currentTarget), null, "ui-state-hover");
                },
                mouseleave: function (e) {
                  this._removeClass(t(e.currentTarget), null, "ui-state-hover");
                },
              });
          },
          _focusable: function (e) {
            (this.focusable = this.focusable.add(e)),
              this._on(e, {
                focusin: function (e) {
                  this._addClass(t(e.currentTarget), null, "ui-state-focus");
                },
                focusout: function (e) {
                  this._removeClass(t(e.currentTarget), null, "ui-state-focus");
                },
              });
          },
          _trigger: function (e, i, s) {
            var n,
              o,
              a = this.options[e];
            if (
              ((s = s || {}),
              (i = t.Event(i)),
              (i.type = (e === this.widgetEventPrefix
                ? e
                : this.widgetEventPrefix + e
              ).toLowerCase()),
              (i.target = this.element[0]),
              (o = i.originalEvent))
            )
              for (n in o) n in i || (i[n] = o[n]);
            return (
              this.element.trigger(i, s),
              !(
                (t.isFunction(a) &&
                  a.apply(this.element[0], [i].concat(s)) === !1) ||
                i.isDefaultPrevented()
              )
            );
          },
        }),
        t.each({ show: "fadeIn", hide: "fadeOut" }, function (e, i) {
          t.Widget.prototype["_" + e] = function (s, n, o) {
            "string" == typeof n && (n = { effect: n });
            var a,
              r = n
                ? n === !0 || "number" == typeof n
                  ? i
                  : n.effect || i
                : e;
            (n = n || {}),
              "number" == typeof n && (n = { duration: n }),
              (a = !t.isEmptyObject(n)),
              (n.complete = o),
              n.delay && s.delay(n.delay),
              a && t.effects && t.effects.effect[r]
                ? s[e](n)
                : r !== e && s[r]
                ? s[r](n.duration, n.easing, o)
                : s.queue(function (i) {
                    t(this)[e](), o && o.call(s[0]), i();
                  });
          };
        }),
        t.widget,
        (t.ui.keyCode = {
          BACKSPACE: 8,
          COMMA: 188,
          DELETE: 46,
          DOWN: 40,
          END: 35,
          ENTER: 13,
          ESCAPE: 27,
          HOME: 36,
          LEFT: 37,
          PAGE_DOWN: 34,
          PAGE_UP: 33,
          PERIOD: 190,
          RIGHT: 39,
          SPACE: 32,
          TAB: 9,
          UP: 38,
        }),
        (t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()));
      var s = !1;
      t(document).on("mouseup", function () {
        s = !1;
      }),
        t.widget("ui.mouse", {
          version: "1.12.1",
          options: {
            cancel: "input, textarea, button, select, option",
            distance: 1,
            delay: 0,
          },
          _mouseInit: function () {
            var e = this;
            this.element
              .on("mousedown." + this.widgetName, function (t) {
                return e._mouseDown(t);
              })
              .on("click." + this.widgetName, function (i) {
                return !0 ===
                  t.data(i.target, e.widgetName + ".preventClickEvent")
                  ? (t.removeData(
                      i.target,
                      e.widgetName + ".preventClickEvent"
                    ),
                    i.stopImmediatePropagation(),
                    !1)
                  : void 0;
              }),
              (this.started = !1);
          },
          _mouseDestroy: function () {
            this.element.off("." + this.widgetName),
              this._mouseMoveDelegate &&
                this.document
                  .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
                  .off("mouseup." + this.widgetName, this._mouseUpDelegate);
          },
          _mouseDown: function (e) {
            if (!s) {
              (this._mouseMoved = !1),
                this._mouseStarted && this._mouseUp(e),
                (this._mouseDownEvent = e);
              var i = this,
                n = 1 === e.which,
                o =
                  "string" == typeof this.options.cancel && e.target.nodeName
                    ? t(e.target).closest(this.options.cancel).length
                    : !1;
              return n && !o && this._mouseCapture(e)
                ? ((this.mouseDelayMet = !this.options.delay),
                  this.mouseDelayMet ||
                    (this._mouseDelayTimer = setTimeout(function () {
                      i.mouseDelayMet = !0;
                    }, this.options.delay)),
                  this._mouseDistanceMet(e) &&
                  this._mouseDelayMet(e) &&
                  ((this._mouseStarted = this._mouseStart(e) !== !1),
                  !this._mouseStarted)
                    ? (e.preventDefault(), !0)
                    : (!0 ===
                        t.data(
                          e.target,
                          this.widgetName + ".preventClickEvent"
                        ) &&
                        t.removeData(
                          e.target,
                          this.widgetName + ".preventClickEvent"
                        ),
                      (this._mouseMoveDelegate = function (t) {
                        return i._mouseMove(t);
                      }),
                      (this._mouseUpDelegate = function (t) {
                        return i._mouseUp(t);
                      }),
                      this.document
                        .on(
                          "mousemove." + this.widgetName,
                          this._mouseMoveDelegate
                        )
                        .on(
                          "mouseup." + this.widgetName,
                          this._mouseUpDelegate
                        ),
                      e.preventDefault(),
                      (s = !0),
                      !0))
                : !0;
            }
          },
          _mouseMove: function (e) {
            if (this._mouseMoved) {
              if (
                t.ui.ie &&
                (!document.documentMode || 9 > document.documentMode) &&
                !e.button
              )
                return this._mouseUp(e);
              if (!e.which)
                if (
                  e.originalEvent.altKey ||
                  e.originalEvent.ctrlKey ||
                  e.originalEvent.metaKey ||
                  e.originalEvent.shiftKey
                )
                  this.ignoreMissingWhich = !0;
                else if (!this.ignoreMissingWhich) return this._mouseUp(e);
            }
            return (
              (e.which || e.button) && (this._mouseMoved = !0),
              this._mouseStarted
                ? (this._mouseDrag(e), e.preventDefault())
                : (this._mouseDistanceMet(e) &&
                    this._mouseDelayMet(e) &&
                    ((this._mouseStarted =
                      this._mouseStart(this._mouseDownEvent, e) !== !1),
                    this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)),
                  !this._mouseStarted)
            );
          },
          _mouseUp: function (e) {
            this.document
              .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
              .off("mouseup." + this.widgetName, this._mouseUpDelegate),
              this._mouseStarted &&
                ((this._mouseStarted = !1),
                e.target === this._mouseDownEvent.target &&
                  t.data(e.target, this.widgetName + ".preventClickEvent", !0),
                this._mouseStop(e)),
              this._mouseDelayTimer &&
                (clearTimeout(this._mouseDelayTimer),
                delete this._mouseDelayTimer),
              (this.ignoreMissingWhich = !1),
              (s = !1),
              e.preventDefault();
          },
          _mouseDistanceMet: function (t) {
            return (
              Math.max(
                Math.abs(this._mouseDownEvent.pageX - t.pageX),
                Math.abs(this._mouseDownEvent.pageY - t.pageY)
              ) >= this.options.distance
            );
          },
          _mouseDelayMet: function () {
            return this.mouseDelayMet;
          },
          _mouseStart: function () {},
          _mouseDrag: function () {},
          _mouseStop: function () {},
          _mouseCapture: function () {
            return !0;
          },
        }),
        t.widget("ui.slider", t.ui.mouse, {
          version: "1.12.1",
          widgetEventPrefix: "slide",
          options: {
            animate: !1,
            classes: {
              "ui-slider": "ui-corner-all",
              "ui-slider-handle": "ui-corner-all",
              "ui-slider-range": "ui-corner-all ui-widget-header",
            },
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null,
          },
          numPages: 5,
          _create: function () {
            (this._keySliding = !1),
              (this._mouseSliding = !1),
              (this._animateOff = !0),
              (this._handleIndex = null),
              this._detectOrientation(),
              this._mouseInit(),
              this._calculateNewMax(),
              this._addClass(
                "ui-slider ui-slider-" + this.orientation,
                "ui-widget ui-widget-content"
              ),
              this._refresh(),
              (this._animateOff = !1);
          },
          _refresh: function () {
            this._createRange(),
              this._createHandles(),
              this._setupEvents(),
              this._refreshValue();
          },
          _createHandles: function () {
            var e,
              i,
              s = this.options,
              n = this.element.find(".ui-slider-handle"),
              o = "<span tabindex='0'></span>",
              a = [];
            for (
              i = (s.values && s.values.length) || 1,
                n.length > i && (n.slice(i).remove(), (n = n.slice(0, i))),
                e = n.length;
              i > e;
              e++
            )
              a.push(o);
            (this.handles = n.add(t(a.join("")).appendTo(this.element))),
              this._addClass(
                this.handles,
                "ui-slider-handle",
                "ui-state-default"
              ),
              (this.handle = this.handles.eq(0)),
              this.handles.each(function (e) {
                t(this).data("ui-slider-handle-index", e).attr("tabIndex", 0);
              });
          },
          _createRange: function () {
            var e = this.options;
            e.range
              ? (e.range === !0 &&
                  (e.values
                    ? e.values.length && 2 !== e.values.length
                      ? (e.values = [e.values[0], e.values[0]])
                      : t.isArray(e.values) && (e.values = e.values.slice(0))
                    : (e.values = [this._valueMin(), this._valueMin()])),
                this.range && this.range.length
                  ? (this._removeClass(
                      this.range,
                      "ui-slider-range-min ui-slider-range-max"
                    ),
                    this.range.css({ left: "", bottom: "" }))
                  : ((this.range = t("<div>").appendTo(this.element)),
                    this._addClass(this.range, "ui-slider-range")),
                ("min" === e.range || "max" === e.range) &&
                  this._addClass(this.range, "ui-slider-range-" + e.range))
              : (this.range && this.range.remove(), (this.range = null));
          },
          _setupEvents: function () {
            this._off(this.handles),
              this._on(this.handles, this._handleEvents),
              this._hoverable(this.handles),
              this._focusable(this.handles);
          },
          _destroy: function () {
            this.handles.remove(),
              this.range && this.range.remove(),
              this._mouseDestroy();
          },
          _mouseCapture: function (e) {
            var i,
              s,
              n,
              o,
              a,
              r,
              l,
              h,
              c = this,
              u = this.options;
            return u.disabled
              ? !1
              : ((this.elementSize = {
                  width: this.element.outerWidth(),
                  height: this.element.outerHeight(),
                }),
                (this.elementOffset = this.element.offset()),
                (i = { x: e.pageX, y: e.pageY }),
                (s = this._normValueFromMouse(i)),
                (n = this._valueMax() - this._valueMin() + 1),
                this.handles.each(function (e) {
                  var i = Math.abs(s - c.values(e));
                  (n > i ||
                    (n === i &&
                      (e === c._lastChangedValue || c.values(e) === u.min))) &&
                    ((n = i), (o = t(this)), (a = e));
                }),
                (r = this._start(e, a)),
                r === !1
                  ? !1
                  : ((this._mouseSliding = !0),
                    (this._handleIndex = a),
                    this._addClass(o, null, "ui-state-active"),
                    o.trigger("focus"),
                    (l = o.offset()),
                    (h = !t(e.target)
                      .parents()
                      .addBack()
                      .is(".ui-slider-handle")),
                    (this._clickOffset = h
                      ? { left: 0, top: 0 }
                      : {
                          left: e.pageX - l.left - o.width() / 2,
                          top:
                            e.pageY -
                            l.top -
                            o.height() / 2 -
                            (parseInt(o.css("borderTopWidth"), 10) || 0) -
                            (parseInt(o.css("borderBottomWidth"), 10) || 0) +
                            (parseInt(o.css("marginTop"), 10) || 0),
                        }),
                    this.handles.hasClass("ui-state-hover") ||
                      this._slide(e, a, s),
                    (this._animateOff = !0),
                    !0));
          },
          _mouseStart: function () {
            return !0;
          },
          _mouseDrag: function (t) {
            var e = { x: t.pageX, y: t.pageY },
              i = this._normValueFromMouse(e);
            return this._slide(t, this._handleIndex, i), !1;
          },
          _mouseStop: function (t) {
            return (
              this._removeClass(this.handles, null, "ui-state-active"),
              (this._mouseSliding = !1),
              this._stop(t, this._handleIndex),
              this._change(t, this._handleIndex),
              (this._handleIndex = null),
              (this._clickOffset = null),
              (this._animateOff = !1),
              !1
            );
          },
          _detectOrientation: function () {
            this.orientation =
              "vertical" === this.options.orientation
                ? "vertical"
                : "horizontal";
          },
          _normValueFromMouse: function (t) {
            var e, i, s, n, o;
            return (
              "horizontal" === this.orientation
                ? ((e = this.elementSize.width),
                  (i =
                    t.x -
                    this.elementOffset.left -
                    (this._clickOffset ? this._clickOffset.left : 0)))
                : ((e = this.elementSize.height),
                  (i =
                    t.y -
                    this.elementOffset.top -
                    (this._clickOffset ? this._clickOffset.top : 0))),
              (s = i / e),
              s > 1 && (s = 1),
              0 > s && (s = 0),
              "vertical" === this.orientation && (s = 1 - s),
              (n = this._valueMax() - this._valueMin()),
              (o = this._valueMin() + s * n),
              this._trimAlignValue(o)
            );
          },
          _uiHash: function (t, e, i) {
            var s = {
              handle: this.handles[t],
              handleIndex: t,
              value: void 0 !== e ? e : this.value(),
            };
            return (
              this._hasMultipleValues() &&
                ((s.value = void 0 !== e ? e : this.values(t)),
                (s.values = i || this.values())),
              s
            );
          },
          _hasMultipleValues: function () {
            return this.options.values && this.options.values.length;
          },
          _start: function (t, e) {
            return this._trigger("start", t, this._uiHash(e));
          },
          _slide: function (t, e, i) {
            var s,
              n,
              o = this.value(),
              a = this.values();
            this._hasMultipleValues() &&
              ((n = this.values(e ? 0 : 1)),
              (o = this.values(e)),
              2 === this.options.values.length &&
                this.options.range === !0 &&
                (i = 0 === e ? Math.min(n, i) : Math.max(n, i)),
              (a[e] = i)),
              i !== o &&
                ((s = this._trigger("slide", t, this._uiHash(e, i, a))),
                s !== !1 &&
                  (this._hasMultipleValues()
                    ? this.values(e, i)
                    : this.value(i)));
          },
          _stop: function (t, e) {
            this._trigger("stop", t, this._uiHash(e));
          },
          _change: function (t, e) {
            this._keySliding ||
              this._mouseSliding ||
              ((this._lastChangedValue = e),
              this._trigger("change", t, this._uiHash(e)));
          },
          value: function (t) {
            return arguments.length
              ? ((this.options.value = this._trimAlignValue(t)),
                this._refreshValue(),
                this._change(null, 0),
                void 0)
              : this._value();
          },
          values: function (e, i) {
            var s, n, o;
            if (arguments.length > 1)
              return (
                (this.options.values[e] = this._trimAlignValue(i)),
                this._refreshValue(),
                this._change(null, e),
                void 0
              );
            if (!arguments.length) return this._values();
            if (!t.isArray(arguments[0]))
              return this._hasMultipleValues() ? this._values(e) : this.value();
            for (
              s = this.options.values, n = arguments[0], o = 0;
              s.length > o;
              o += 1
            )
              (s[o] = this._trimAlignValue(n[o])), this._change(null, o);
            this._refreshValue();
          },
          _setOption: function (e, i) {
            var s,
              n = 0;
            switch (
              ("range" === e &&
                this.options.range === !0 &&
                ("min" === i
                  ? ((this.options.value = this._values(0)),
                    (this.options.values = null))
                  : "max" === i &&
                    ((this.options.value = this._values(
                      this.options.values.length - 1
                    )),
                    (this.options.values = null))),
              t.isArray(this.options.values) &&
                (n = this.options.values.length),
              this._super(e, i),
              e)
            ) {
              case "orientation":
                this._detectOrientation(),
                  this._removeClass(
                    "ui-slider-horizontal ui-slider-vertical"
                  )._addClass("ui-slider-" + this.orientation),
                  this._refreshValue(),
                  this.options.range && this._refreshRange(i),
                  this.handles.css("horizontal" === i ? "bottom" : "left", "");
                break;
              case "value":
                (this._animateOff = !0),
                  this._refreshValue(),
                  this._change(null, 0),
                  (this._animateOff = !1);
                break;
              case "values":
                for (
                  this._animateOff = !0, this._refreshValue(), s = n - 1;
                  s >= 0;
                  s--
                )
                  this._change(null, s);
                this._animateOff = !1;
                break;
              case "step":
              case "min":
              case "max":
                (this._animateOff = !0),
                  this._calculateNewMax(),
                  this._refreshValue(),
                  (this._animateOff = !1);
                break;
              case "range":
                (this._animateOff = !0),
                  this._refresh(),
                  (this._animateOff = !1);
            }
          },
          _setOptionDisabled: function (t) {
            this._super(t), this._toggleClass(null, "ui-state-disabled", !!t);
          },
          _value: function () {
            var t = this.options.value;
            return (t = this._trimAlignValue(t));
          },
          _values: function (t) {
            var e, i, s;
            if (arguments.length)
              return (
                (e = this.options.values[t]), (e = this._trimAlignValue(e))
              );
            if (this._hasMultipleValues()) {
              for (i = this.options.values.slice(), s = 0; i.length > s; s += 1)
                i[s] = this._trimAlignValue(i[s]);
              return i;
            }
            return [];
          },
          _trimAlignValue: function (t) {
            if (this._valueMin() >= t) return this._valueMin();
            if (t >= this._valueMax()) return this._valueMax();
            var e = this.options.step > 0 ? this.options.step : 1,
              i = (t - this._valueMin()) % e,
              s = t - i;
            return (
              2 * Math.abs(i) >= e && (s += i > 0 ? e : -e),
              parseFloat(s.toFixed(5))
            );
          },
          _calculateNewMax: function () {
            var t = this.options.max,
              e = this._valueMin(),
              i = this.options.step,
              s = Math.round((t - e) / i) * i;
            (t = s + e),
              t > this.options.max && (t -= i),
              (this.max = parseFloat(t.toFixed(this._precision())));
          },
          _precision: function () {
            var t = this._precisionOf(this.options.step);
            return (
              null !== this.options.min &&
                (t = Math.max(t, this._precisionOf(this.options.min))),
              t
            );
          },
          _precisionOf: function (t) {
            var e = "" + t,
              i = e.indexOf(".");
            return -1 === i ? 0 : e.length - i - 1;
          },
          _valueMin: function () {
            return this.options.min;
          },
          _valueMax: function () {
            return this.max;
          },
          _refreshRange: function (t) {
            "vertical" === t && this.range.css({ width: "", left: "" }),
              "horizontal" === t && this.range.css({ height: "", bottom: "" });
          },
          _refreshValue: function () {
            var e,
              i,
              s,
              n,
              o,
              a = this.options.range,
              r = this.options,
              l = this,
              h = this._animateOff ? !1 : r.animate,
              c = {};
            this._hasMultipleValues()
              ? this.handles.each(function (s) {
                  (i =
                    100 *
                    ((l.values(s) - l._valueMin()) /
                      (l._valueMax() - l._valueMin()))),
                    (c["horizontal" === l.orientation ? "left" : "bottom"] =
                      i + "%"),
                    t(this).stop(1, 1)[h ? "animate" : "css"](c, r.animate),
                    l.options.range === !0 &&
                      ("horizontal" === l.orientation
                        ? (0 === s &&
                            l.range
                              .stop(1, 1)
                              [h ? "animate" : "css"](
                                { left: i + "%" },
                                r.animate
                              ),
                          1 === s &&
                            l.range[h ? "animate" : "css"](
                              { width: i - e + "%" },
                              { queue: !1, duration: r.animate }
                            ))
                        : (0 === s &&
                            l.range
                              .stop(1, 1)
                              [h ? "animate" : "css"](
                                { bottom: i + "%" },
                                r.animate
                              ),
                          1 === s &&
                            l.range[h ? "animate" : "css"](
                              { height: i - e + "%" },
                              { queue: !1, duration: r.animate }
                            ))),
                    (e = i);
                })
              : ((s = this.value()),
                (n = this._valueMin()),
                (o = this._valueMax()),
                (i = o !== n ? 100 * ((s - n) / (o - n)) : 0),
                (c["horizontal" === this.orientation ? "left" : "bottom"] =
                  i + "%"),
                this.handle.stop(1, 1)[h ? "animate" : "css"](c, r.animate),
                "min" === a &&
                  "horizontal" === this.orientation &&
                  this.range
                    .stop(1, 1)
                    [h ? "animate" : "css"]({ width: i + "%" }, r.animate),
                "max" === a &&
                  "horizontal" === this.orientation &&
                  this.range
                    .stop(1, 1)
                    [h ? "animate" : "css"](
                      { width: 100 - i + "%" },
                      r.animate
                    ),
                "min" === a &&
                  "vertical" === this.orientation &&
                  this.range
                    .stop(1, 1)
                    [h ? "animate" : "css"]({ height: i + "%" }, r.animate),
                "max" === a &&
                  "vertical" === this.orientation &&
                  this.range
                    .stop(1, 1)
                    [h ? "animate" : "css"](
                      { height: 100 - i + "%" },
                      r.animate
                    ));
          },
          _handleEvents: {
            keydown: function (e) {
              var i,
                s,
                n,
                o,
                a = t(e.target).data("ui-slider-handle-index");
              switch (e.keyCode) {
                case t.ui.keyCode.HOME:
                case t.ui.keyCode.END:
                case t.ui.keyCode.PAGE_UP:
                case t.ui.keyCode.PAGE_DOWN:
                case t.ui.keyCode.UP:
                case t.ui.keyCode.RIGHT:
                case t.ui.keyCode.DOWN:
                case t.ui.keyCode.LEFT:
                  if (
                    (e.preventDefault(),
                    !this._keySliding &&
                      ((this._keySliding = !0),
                      this._addClass(t(e.target), null, "ui-state-active"),
                      (i = this._start(e, a)),
                      i === !1))
                  )
                    return;
              }
              switch (
                ((o = this.options.step),
                (s = n = this._hasMultipleValues()
                  ? this.values(a)
                  : this.value()),
                e.keyCode)
              ) {
                case t.ui.keyCode.HOME:
                  n = this._valueMin();
                  break;
                case t.ui.keyCode.END:
                  n = this._valueMax();
                  break;
                case t.ui.keyCode.PAGE_UP:
                  n = this._trimAlignValue(
                    s + (this._valueMax() - this._valueMin()) / this.numPages
                  );
                  break;
                case t.ui.keyCode.PAGE_DOWN:
                  n = this._trimAlignValue(
                    s - (this._valueMax() - this._valueMin()) / this.numPages
                  );
                  break;
                case t.ui.keyCode.UP:
                case t.ui.keyCode.RIGHT:
                  if (s === this._valueMax()) return;
                  n = this._trimAlignValue(s + o);
                  break;
                case t.ui.keyCode.DOWN:
                case t.ui.keyCode.LEFT:
                  if (s === this._valueMin()) return;
                  n = this._trimAlignValue(s - o);
              }
              this._slide(e, a, n);
            },
            keyup: function (e) {
              var i = t(e.target).data("ui-slider-handle-index");
              this._keySliding &&
                ((this._keySliding = !1),
                this._stop(e, i),
                this._change(e, i),
                this._removeClass(t(e.target), null, "ui-state-active"));
            },
          },
        });
    });
    // Infinite Scroll
    !(function (t, e) {
      "object" == typeof module && module.exports
        ? (module.exports = e(t, require("jquery")))
        : (t.jQueryBridget = e(t, t.jQuery));
    })(window, function (t, e) {
      let i = t.console,
        n =
          void 0 === i
            ? function () {}
            : function (t) {
                i.error(t);
              };
      return function (i, o, s) {
        (s = s || e || t.jQuery) &&
          (o.prototype.option ||
            (o.prototype.option = function (t) {
              t && (this.options = Object.assign(this.options || {}, t));
            }),
          (s.fn[i] = function (t, ...e) {
            return "string" == typeof t
              ? (function (t, e, o) {
                  let r,
                    l = `$().${i}("${e}")`;
                  return (
                    t.each(function (t, h) {
                      let a = s.data(h, i);
                      if (!a)
                        return void n(
                          `${i} not initialized. Cannot call method ${l}`
                        );
                      let c = a[e];
                      if (!c || "_" == e.charAt(0))
                        return void n(`${l} is not a valid method`);
                      let u = c.apply(a, o);
                      r = void 0 === r ? u : r;
                    }),
                    void 0 !== r ? r : t
                  );
                })(this, t, e)
              : ((r = t),
                this.each(function (t, e) {
                  let n = s.data(e, i);
                  n
                    ? (n.option(r), n._init())
                    : ((n = new o(e, r)), s.data(e, i, n));
                }),
                this);
            var r;
          }));
      };
    }),
      (function (t, e) {
        "object" == typeof module && module.exports
          ? (module.exports = e())
          : (t.EvEmitter = e());
      })("undefined" != typeof window ? window : this, function () {
        function t() {}
        let e = t.prototype;
        return (
          (e.on = function (t, e) {
            if (!t || !e) return this;
            let i = (this._events = this._events || {}),
              n = (i[t] = i[t] || []);
            return n.includes(e) || n.push(e), this;
          }),
          (e.once = function (t, e) {
            if (!t || !e) return this;
            this.on(t, e);
            let i = (this._onceEvents = this._onceEvents || {});
            return ((i[t] = i[t] || {})[e] = !0), this;
          }),
          (e.off = function (t, e) {
            let i = this._events && this._events[t];
            if (!i || !i.length) return this;
            let n = i.indexOf(e);
            return -1 != n && i.splice(n, 1), this;
          }),
          (e.emitEvent = function (t, e) {
            let i = this._events && this._events[t];
            if (!i || !i.length) return this;
            (i = i.slice(0)), (e = e || []);
            let n = this._onceEvents && this._onceEvents[t];
            for (let o of i) {
              n && n[o] && (this.off(t, o), delete n[o]), o.apply(this, e);
            }
            return this;
          }),
          (e.allOff = function () {
            return delete this._events, delete this._onceEvents, this;
          }),
          t
        );
      }),
      (function (t, e) {
        "object" == typeof module && module.exports
          ? (module.exports = e(t))
          : (t.fizzyUIUtils = e(t));
      })(this, function (t) {
        let e = {
            extend: function (t, e) {
              return Object.assign(t, e);
            },
            modulo: function (t, e) {
              return ((t % e) + e) % e;
            },
            makeArray: function (t) {
              if (Array.isArray(t)) return t;
              if (null == t) return [];
              return "object" == typeof t && "number" == typeof t.length
                ? [...t]
                : [t];
            },
            removeFrom: function (t, e) {
              let i = t.indexOf(e);
              -1 != i && t.splice(i, 1);
            },
            getParent: function (t, e) {
              for (; t.parentNode && t != document.body; )
                if ((t = t.parentNode).matches(e)) return t;
            },
            getQueryElement: function (t) {
              return "string" == typeof t ? document.querySelector(t) : t;
            },
            handleEvent: function (t) {
              let e = "on" + t.type;
              this[e] && this[e](t);
            },
            filterFindElements: function (t, i) {
              return (t = e.makeArray(t))
                .filter((t) => t instanceof HTMLElement)
                .reduce((t, e) => {
                  if (!i) return t.push(e), t;
                  e.matches(i) && t.push(e);
                  let n = e.querySelectorAll(i);
                  return (t = t.concat(...n));
                }, []);
            },
            debounceMethod: function (t, e, i) {
              i = i || 100;
              let n = t.prototype[e],
                o = e + "Timeout";
              t.prototype[e] = function () {
                clearTimeout(this[o]);
                let t = arguments;
                this[o] = setTimeout(() => {
                  n.apply(this, t), delete this[o];
                }, i);
              };
            },
            docReady: function (t) {
              let e = document.readyState;
              "complete" == e || "interactive" == e
                ? setTimeout(t)
                : document.addEventListener("DOMContentLoaded", t);
            },
            toDashed: function (t) {
              return t
                .replace(/(.)([A-Z])/g, function (t, e, i) {
                  return e + "-" + i;
                })
                .toLowerCase();
            },
          },
          i = t.console;
        return (
          (e.htmlInit = function (n, o) {
            e.docReady(function () {
              let s = "data-" + e.toDashed(o),
                r = document.querySelectorAll(`[${s}]`),
                l = t.jQuery;
              [...r].forEach((t) => {
                let e,
                  r = t.getAttribute(s);
                try {
                  e = r && JSON.parse(r);
                } catch (e) {
                  return void (
                    i && i.error(`Error parsing ${s} on ${t.className}: ${e}`)
                  );
                }
                let h = new n(t, e);
                l && l.data(t, o, h);
              });
            });
          }),
          e
        );
      }),
      (function (t, e) {
        "object" == typeof module && module.exports
          ? (module.exports = e(
              t,
              require("ev-emitter"),
              require("fizzy-ui-utils")
            ))
          : (t.InfiniteScroll = e(t, t.EvEmitter, t.fizzyUIUtils));
      })(window, function (t, e, i) {
        let n = t.jQuery,
          o = {};
        function s(t, e) {
          let r = i.getQueryElement(t);
          if (r) {
            if ((t = r).infiniteScrollGUID) {
              let i = o[t.infiniteScrollGUID];
              return i.option(e), i;
            }
            (this.element = t),
              (this.options = { ...s.defaults }),
              this.option(e),
              n && (this.$element = n(this.element)),
              this.create();
          } else console.error("Bad element for InfiniteScroll: " + (r || t));
        }
        (s.defaults = {}), (s.create = {}), (s.destroy = {});
        let r = s.prototype;
        Object.assign(r, e.prototype);
        let l = 0;
        (r.create = function () {
          let t = (this.guid = ++l);
          if (
            ((this.element.infiniteScrollGUID = t),
            (o[t] = this),
            (this.pageIndex = 1),
            (this.loadCount = 0),
            this.updateGetPath(),
            this.getPath && this.getPath())
          ) {
            this.updateGetAbsolutePath(),
              this.log("initialized", [this.element.className]),
              this.callOnInit();
            for (let t in s.create) s.create[t].call(this);
          } else console.error("Disabling InfiniteScroll");
        }),
          (r.option = function (t) {
            Object.assign(this.options, t);
          }),
          (r.callOnInit = function () {
            let t = this.options.onInit;
            t && t.call(this, this);
          }),
          (r.dispatchEvent = function (t, e, i) {
            this.log(t, i);
            let o = e ? [e].concat(i) : i;
            if ((this.emitEvent(t, o), !n || !this.$element)) return;
            let s = (t += ".infiniteScroll");
            if (e) {
              let i = n.Event(e);
              (i.type = t), (s = i);
            }
            this.$element.trigger(s, i);
          });
        let h = {
          initialized: (t) => `on ${t}`,
          request: (t) => `URL: ${t}`,
          load: (t, e) => `${t.title || ""}. URL: ${e}`,
          error: (t, e) => `${t}. URL: ${e}`,
          append: (t, e, i) => `${i.length} items. URL: ${e}`,
          last: (t, e) => `URL: ${e}`,
          history: (t, e) => `URL: ${e}`,
          pageIndex: function (t, e) {
            return `current page determined to be: ${t} from ${e}`;
          },
        };
        (r.log = function (t, e) {
          if (!this.options.debug) return;
          let i = `[InfiniteScroll] ${t}`,
            n = h[t];
          n && (i += ". " + n.apply(this, e)), console.log(i);
        }),
          (r.updateMeasurements = function () {
            this.windowHeight = t.innerHeight;
            let e = this.element.getBoundingClientRect();
            this.top = e.top + t.scrollY;
          }),
          (r.updateScroller = function () {
            let e = this.options.elementScroll;
            if (e) {
              if (
                ((this.scroller =
                  !0 === e ? this.element : i.getQueryElement(e)),
                !this.scroller)
              )
                throw new Error(`Unable to find elementScroll: ${e}`);
            } else this.scroller = t;
          }),
          (r.updateGetPath = function () {
            let t = this.options.path;
            if (!t)
              return void console.error(
                `InfiniteScroll path option required. Set as: ${t}`
              );
            let e = typeof t;
            "function" != e
              ? "string" == e && t.match("{{#}}")
                ? this.updateGetPathTemplate(t)
                : this.updateGetPathSelector(t)
              : (this.getPath = t);
          }),
          (r.updateGetPathTemplate = function (t) {
            this.getPath = () => {
              let e = this.pageIndex + 1;
              return t.replace("{{#}}", e);
            };
            let e = t
                .replace(/(\\\?|\?)/, "\\?")
                .replace("{{#}}", "(\\d\\d?\\d?)"),
              i = new RegExp(e),
              n = location.href.match(i);
            n &&
              ((this.pageIndex = parseInt(n[1], 10)),
              this.log("pageIndex", [this.pageIndex, "template string"]));
          });
        let a = [
            /^(.*?\/?page\/?)(\d\d?\d?)(.*?$)/,
            /^(.*?\/?\?page=)(\d\d?\d?)(.*?$)/,
            /(.*?)(\d\d?\d?)(?!.*\d)(.*?$)/,
          ],
          c = (s.getPathParts = function (t) {
            if (t)
              for (let e of a) {
                let i = t.match(e);
                if (i) {
                  let [, t, e, n] = i;
                  return { begin: t, index: e, end: n };
                }
              }
          });
        (r.updateGetPathSelector = function (t) {
          let e = document.querySelector(t);
          if (!e)
            return void console.error(
              `Bad InfiniteScroll path option. Next link not found: ${t}`
            );
          let i = e.getAttribute("href"),
            n = c(i);
          if (!n)
            return void console.error(
              `InfiniteScroll unable to parse next link href: ${i}`
            );
          let { begin: o, index: s, end: r } = n;
          (this.isPathSelector = !0),
            (this.getPath = () => o + (this.pageIndex + 1) + r),
            (this.pageIndex = parseInt(s, 10) - 1),
            this.log("pageIndex", [this.pageIndex, "next link"]);
        }),
          (r.updateGetAbsolutePath = function () {
            let t = this.getPath();
            if (t.match(/^http/) || t.match(/^\//))
              return void (this.getAbsolutePath = this.getPath);
            let { pathname: e } = location,
              i = t.match(/^\?/),
              n = e.substring(0, e.lastIndexOf("/")),
              o = i ? e : n + "/";
            this.getAbsolutePath = () => o + this.getPath();
          }),
          (s.create.hideNav = function () {
            let t = i.getQueryElement(this.options.hideNav);
            t && ((t.style.display = "none"), (this.nav = t));
          }),
          (s.destroy.hideNav = function () {
            this.nav && (this.nav.style.display = "");
          }),
          (r.destroy = function () {
            this.allOff();
            for (let t in s.destroy) s.destroy[t].call(this);
            delete this.element.infiniteScrollGUID,
              delete o[this.guid],
              n &&
                this.$element &&
                n.removeData(this.element, "infiniteScroll");
          }),
          (s.throttle = function (t, e) {
            let i, n;
            return (
              (e = e || 200),
              function () {
                let o = +new Date(),
                  s = arguments,
                  r = () => {
                    (i = o), t.apply(this, s);
                  };
                i && o < i + e
                  ? (clearTimeout(n), (n = setTimeout(r, e)))
                  : r();
              }
            );
          }),
          (s.data = function (t) {
            let e = (t = i.getQueryElement(t)) && t.infiniteScrollGUID;
            return e && o[e];
          }),
          (s.setJQuery = function (t) {
            n = t;
          }),
          i.htmlInit(s, "infinite-scroll"),
          (r._init = function () {});
        let { jQueryBridget: u } = t;
        return n && u && u("infiniteScroll", s, n), s;
      }),
      (function (t, e) {
        "object" == typeof module && module.exports
          ? (module.exports = e(t, require("./core")))
          : e(t, t.InfiniteScroll);
      })(window, function (t, e) {
        let i = e.prototype;
        Object.assign(e.defaults, {
          loadOnScroll: !0,
          checkLastPage: !0,
          responseBody: "text",
          domParseResponse: !0,
        }),
          (e.create.pageLoad = function () {
            (this.canLoad = !0),
              this.on("scrollThreshold", this.onScrollThresholdLoad),
              this.on("load", this.checkLastPage),
              this.options.outlayer && this.on("append", this.onAppendOutlayer);
          }),
          (i.onScrollThresholdLoad = function () {
            this.options.loadOnScroll && this.loadNextPage();
          });
        let n = new DOMParser();
        function o(t) {
          let e = document.createDocumentFragment();
          return t && e.append(...t), e;
        }
        return (
          (i.loadNextPage = function () {
            if (this.isLoading || !this.canLoad) return;
            let {
                responseBody: t,
                domParseResponse: e,
                fetchOptions: i,
              } = this.options,
              o = this.getAbsolutePath();
            (this.isLoading = !0), "function" == typeof i && (i = i());
            let s = fetch(o, i)
              .then((i) => {
                if (!i.ok) {
                  let t = new Error(i.statusText);
                  return this.onPageError(t, o, i), { response: i };
                }
                return i[t]().then(
                  (s) => (
                    "text" == t && e && (s = n.parseFromString(s, "text/html")),
                    204 == i.status
                      ? (this.lastPageReached(s, o), { body: s, response: i })
                      : this.onPageLoad(s, o, i)
                  )
                );
              })
              .catch((t) => {
                this.onPageError(t, o);
              });
            return this.dispatchEvent("request", null, [o, s]), s;
          }),
          (i.onPageLoad = function (t, e, i) {
            return (
              this.options.append || (this.isLoading = !1),
              this.pageIndex++,
              this.loadCount++,
              this.dispatchEvent("load", null, [t, e, i]),
              this.appendNextPage(t, e, i)
            );
          }),
          (i.appendNextPage = function (t, e, i) {
            let {
              append: n,
              responseBody: s,
              domParseResponse: r,
            } = this.options;
            if (!("text" == s && r) || !n) return { body: t, response: i };
            let l = t.querySelectorAll(n),
              h = { body: t, response: i, items: l };
            if (!l || !l.length) return this.lastPageReached(t, e), h;
            let a = o(l),
              c = () => (
                this.appendItems(l, a),
                (this.isLoading = !1),
                this.dispatchEvent("append", null, [t, e, l, i]),
                h
              );
            return this.options.outlayer ? this.appendOutlayerItems(a, c) : c();
          }),
          (i.appendItems = function (t, e) {
            t &&
              t.length &&
              ((function (t) {
                let e = t.querySelectorAll("script");
                for (let t of e) {
                  let e = document.createElement("script"),
                    i = t.attributes;
                  for (let t of i) e.setAttribute(t.name, t.value);
                  (e.innerHTML = t.innerHTML), t.parentNode.replaceChild(e, t);
                }
              })((e = e || o(t))),
              this.element.appendChild(e));
          }),
          (i.appendOutlayerItems = function (i, n) {
            let o = e.imagesLoaded || t.imagesLoaded;
            return o
              ? new Promise(function (t) {
                  o(i, function () {
                    let e = n();
                    t(e);
                  });
                })
              : (console.error(
                  "[InfiniteScroll] imagesLoaded required for outlayer option"
                ),
                void (this.isLoading = !1));
          }),
          (i.onAppendOutlayer = function (t, e, i) {
            this.options.outlayer.appended(i);
          }),
          (i.checkLastPage = function (t, e) {
            let i,
              { checkLastPage: n, path: o } = this.options;
            if (n) {
              if ("function" == typeof o) {
                if (!this.getPath()) return void this.lastPageReached(t, e);
              }
              "string" == typeof n ? (i = n) : this.isPathSelector && (i = o),
                i &&
                  t.querySelector &&
                  (t.querySelector(i) || this.lastPageReached(t, e));
            }
          }),
          (i.lastPageReached = function (t, e) {
            (this.canLoad = !1), this.dispatchEvent("last", null, [t, e]);
          }),
          (i.onPageError = function (t, e, i) {
            return (
              (this.isLoading = !1),
              (this.canLoad = !1),
              this.dispatchEvent("error", null, [t, e, i]),
              t
            );
          }),
          (e.create.prefill = function () {
            if (!this.options.prefill) return;
            let t = this.options.append;
            t
              ? (this.updateMeasurements(),
                this.updateScroller(),
                (this.isPrefilling = !0),
                this.on("append", this.prefill),
                this.once("error", this.stopPrefill),
                this.once("last", this.stopPrefill),
                this.prefill())
              : console.error(
                  `append option required for prefill. Set as :${t}`
                );
          }),
          (i.prefill = function () {
            let t = this.getPrefillDistance();
            (this.isPrefilling = t >= 0),
              this.isPrefilling
                ? (this.log("prefill"), this.loadNextPage())
                : this.stopPrefill();
          }),
          (i.getPrefillDistance = function () {
            return this.options.elementScroll
              ? this.scroller.clientHeight - this.scroller.scrollHeight
              : this.windowHeight - this.element.clientHeight;
          }),
          (i.stopPrefill = function () {
            this.log("stopPrefill"), this.off("append", this.prefill);
          }),
          e
        );
      }),
      (function (t, e) {
        "object" == typeof module && module.exports
          ? (module.exports = e(
              t,
              require("./core"),
              require("fizzy-ui-utils")
            ))
          : e(t, t.InfiniteScroll, t.fizzyUIUtils);
      })(window, function (t, e, i) {
        let n = e.prototype;
        return (
          Object.assign(e.defaults, { scrollThreshold: 400 }),
          (e.create.scrollWatch = function () {
            (this.pageScrollHandler = this.onPageScroll.bind(this)),
              (this.resizeHandler = this.onResize.bind(this));
            let t = this.options.scrollThreshold;
            (t || 0 === t) && this.enableScrollWatch();
          }),
          (e.destroy.scrollWatch = function () {
            this.disableScrollWatch();
          }),
          (n.enableScrollWatch = function () {
            this.isScrollWatching ||
              ((this.isScrollWatching = !0),
              this.updateMeasurements(),
              this.updateScroller(),
              this.on("last", this.disableScrollWatch),
              this.bindScrollWatchEvents(!0));
          }),
          (n.disableScrollWatch = function () {
            this.isScrollWatching &&
              (this.bindScrollWatchEvents(!1), delete this.isScrollWatching);
          }),
          (n.bindScrollWatchEvents = function (e) {
            let i = e ? "addEventListener" : "removeEventListener";
            this.scroller[i]("scroll", this.pageScrollHandler),
              t[i]("resize", this.resizeHandler);
          }),
          (n.onPageScroll = e.throttle(function () {
            this.getBottomDistance() <= this.options.scrollThreshold &&
              this.dispatchEvent("scrollThreshold");
          })),
          (n.getBottomDistance = function () {
            let e, i;
            return (
              this.options.elementScroll
                ? ((e = this.scroller.scrollHeight),
                  (i = this.scroller.scrollTop + this.scroller.clientHeight))
                : ((e = this.top + this.element.clientHeight),
                  (i = t.scrollY + this.windowHeight)),
              e - i
            );
          }),
          (n.onResize = function () {
            this.updateMeasurements();
          }),
          i.debounceMethod(e, "onResize", 150),
          e
        );
      }),
      (function (t, e) {
        "object" == typeof module && module.exports
          ? (module.exports = e(
              t,
              require("./core"),
              require("fizzy-ui-utils")
            ))
          : e(t, t.InfiniteScroll, t.fizzyUIUtils);
      })(window, function (t, e, i) {
        let n = e.prototype;
        Object.assign(e.defaults, { history: "replace" });
        let o = document.createElement("a");
        return (
          (e.create.history = function () {
            if (!this.options.history) return;
            (o.href = this.getAbsolutePath()),
              (o.origin || o.protocol + "//" + o.host) == location.origin
                ? this.options.append
                  ? this.createHistoryAppend()
                  : this.createHistoryPageLoad()
                : console.error(
                    `[InfiniteScroll] cannot set history with different origin: ${o.origin} on ${location.origin} . History behavior disabled.`
                  );
          }),
          (n.createHistoryAppend = function () {
            this.updateMeasurements(),
              this.updateScroller(),
              (this.scrollPages = [
                { top: 0, path: location.href, title: document.title },
              ]),
              (this.scrollPage = this.scrollPages[0]),
              (this.scrollHistoryHandler = this.onScrollHistory.bind(this)),
              (this.unloadHandler = this.onUnload.bind(this)),
              this.scroller.addEventListener(
                "scroll",
                this.scrollHistoryHandler
              ),
              this.on("append", this.onAppendHistory),
              this.bindHistoryAppendEvents(!0);
          }),
          (n.bindHistoryAppendEvents = function (e) {
            let i = e ? "addEventListener" : "removeEventListener";
            this.scroller[i]("scroll", this.scrollHistoryHandler),
              t[i]("unload", this.unloadHandler);
          }),
          (n.createHistoryPageLoad = function () {
            this.on("load", this.onPageLoadHistory);
          }),
          (e.destroy.history = n.destroyHistory = function () {
            this.options.history &&
              this.options.append &&
              this.bindHistoryAppendEvents(!1);
          }),
          (n.onAppendHistory = function (t, e, i) {
            if (!i || !i.length) return;
            let n = i[0],
              s = this.getElementScrollY(n);
            (o.href = e),
              this.scrollPages.push({ top: s, path: o.href, title: t.title });
          }),
          (n.getElementScrollY = function (e) {
            if (this.options.elementScroll) return e.offsetTop - this.top;
            return e.getBoundingClientRect().top + t.scrollY;
          }),
          (n.onScrollHistory = function () {
            let t = this.getClosestScrollPage();
            t != this.scrollPage &&
              ((this.scrollPage = t), this.setHistory(t.title, t.path));
          }),
          i.debounceMethod(e, "onScrollHistory", 150),
          (n.getClosestScrollPage = function () {
            let e, i;
            e = this.options.elementScroll
              ? this.scroller.scrollTop + this.scroller.clientHeight / 2
              : t.scrollY + this.windowHeight / 2;
            for (let t of this.scrollPages) {
              if (t.top >= e) break;
              i = t;
            }
            return i;
          }),
          (n.setHistory = function (t, e) {
            let i = this.options.history;
            i &&
              history[i + "State"] &&
              (history[i + "State"](null, t, e),
              this.options.historyTitle && (document.title = t),
              this.dispatchEvent("history", null, [t, e]));
          }),
          (n.onUnload = function () {
            if (0 === this.scrollPage.top) return;
            let e = t.scrollY - this.scrollPage.top + this.top;
            this.destroyHistory(), scrollTo(0, e);
          }),
          (n.onPageLoadHistory = function (t, e) {
            this.setHistory(t.title, e);
          }),
          e
        );
      }),
      (function (t, e) {
        "object" == typeof module && module.exports
          ? (module.exports = e(
              t,
              require("./core"),
              require("fizzy-ui-utils")
            ))
          : e(t, t.InfiniteScroll, t.fizzyUIUtils);
      })(window, function (t, e, i) {
        class n {
          constructor(t, e) {
            (this.element = t),
              (this.infScroll = e),
              (this.clickHandler = this.onClick.bind(this)),
              this.element.addEventListener("click", this.clickHandler),
              e.on("request", this.disable.bind(this)),
              e.on("load", this.enable.bind(this)),
              e.on("error", this.hide.bind(this)),
              e.on("last", this.hide.bind(this));
          }
          onClick(t) {
            t.preventDefault(), this.infScroll.loadNextPage();
          }
          enable() {
            this.element.removeAttribute("disabled");
          }
          disable() {
            this.element.disabled = "disabled";
          }
          hide() {
            this.element.style.display = "none";
          }
          destroy() {
            this.element.removeEventListener("click", this.clickHandler);
          }
        }
        return (
          (e.create.button = function () {
            let t = i.getQueryElement(this.options.button);
            t && (this.button = new n(t, this));
          }),
          (e.destroy.button = function () {
            this.button && this.button.destroy();
          }),
          (e.Button = n),
          e
        );
      }),
      (function (t, e) {
        "object" == typeof module && module.exports
          ? (module.exports = e(
              t,
              require("./core"),
              require("fizzy-ui-utils")
            ))
          : e(t, t.InfiniteScroll, t.fizzyUIUtils);
      })(window, function (t, e, i) {
        let n = e.prototype;
        function o(t) {
          r(t, "none");
        }
        function s(t) {
          r(t, "block");
        }
        function r(t, e) {
          t && (t.style.display = e);
        }
        return (
          (e.create.status = function () {
            let t = i.getQueryElement(this.options.status);
            t &&
              ((this.statusElement = t),
              (this.statusEventElements = {
                request: t.querySelector(".infinite-scroll-request"),
                error: t.querySelector(".infinite-scroll-error"),
                last: t.querySelector(".infinite-scroll-last"),
              }),
              this.on("request", this.showRequestStatus),
              this.on("error", this.showErrorStatus),
              this.on("last", this.showLastStatus),
              this.bindHideStatus("on"));
          }),
          (n.bindHideStatus = function (t) {
            let e = this.options.append ? "append" : "load";
            this[t](e, this.hideAllStatus);
          }),
          (n.showRequestStatus = function () {
            this.showStatus("request");
          }),
          (n.showErrorStatus = function () {
            this.showStatus("error");
          }),
          (n.showLastStatus = function () {
            this.showStatus("last"), this.bindHideStatus("off");
          }),
          (n.showStatus = function (t) {
            s(this.statusElement),
              this.hideStatusEventElements(),
              s(this.statusEventElements[t]);
          }),
          (n.hideAllStatus = function () {
            o(this.statusElement), this.hideStatusEventElements();
          }),
          (n.hideStatusEventElements = function () {
            for (let t in this.statusEventElements) {
              o(this.statusEventElements[t]);
            }
          }),
          e
        );
      }),
      (function (t, e) {
        "use strict";
        "function" == typeof define && define.amd
          ? define(["ev-emitter/ev-emitter"], function (i) {
              return e(t, i);
            })
          : "object" == typeof module && module.exports
          ? (module.exports = e(t, require("ev-emitter")))
          : (t.imagesLoaded = e(t, t.EvEmitter));
      })("undefined" != typeof window ? window : this, function (t, e) {
        "use strict";
        var i = t.jQuery,
          n = t.console;
        function o(t, e) {
          for (var i in e) t[i] = e[i];
          return t;
        }
        var s = Array.prototype.slice;
        function r(t, e, l) {
          if (!(this instanceof r)) return new r(t, e, l);
          var h,
            a = t;
          ("string" == typeof t && (a = document.querySelectorAll(t)), a)
            ? ((this.elements =
                ((h = a),
                Array.isArray(h)
                  ? h
                  : "object" == typeof h && "number" == typeof h.length
                  ? s.call(h)
                  : [h])),
              (this.options = o({}, this.options)),
              "function" == typeof e ? (l = e) : o(this.options, e),
              l && this.on("always", l),
              this.getImages(),
              i && (this.jqDeferred = new i.Deferred()),
              setTimeout(this.check.bind(this)))
            : n.error("Bad element for imagesLoaded " + (a || t));
        }
        (r.prototype = Object.create(e.prototype)),
          (r.prototype.options = {}),
          (r.prototype.getImages = function () {
            (this.images = []),
              this.elements.forEach(this.addElementImages, this);
          }),
          (r.prototype.addElementImages = function (t) {
            "IMG" == t.nodeName && this.addImage(t),
              !0 === this.options.background &&
                this.addElementBackgroundImages(t);
            var e = t.nodeType;
            if (e && l[e]) {
              for (
                var i = t.querySelectorAll("img"), n = 0;
                n < i.length;
                n++
              ) {
                var o = i[n];
                this.addImage(o);
              }
              if ("string" == typeof this.options.background) {
                var s = t.querySelectorAll(this.options.background);
                for (n = 0; n < s.length; n++) {
                  var r = s[n];
                  this.addElementBackgroundImages(r);
                }
              }
            }
          });
        var l = { 1: !0, 9: !0, 11: !0 };
        function h(t) {
          this.img = t;
        }
        function a(t, e) {
          (this.url = t), (this.element = e), (this.img = new Image());
        }
        return (
          (r.prototype.addElementBackgroundImages = function (t) {
            var e = getComputedStyle(t);
            if (e)
              for (
                var i = /url\((['"])?(.*?)\1\)/gi,
                  n = i.exec(e.backgroundImage);
                null !== n;

              ) {
                var o = n && n[2];
                o && this.addBackground(o, t), (n = i.exec(e.backgroundImage));
              }
          }),
          (r.prototype.addImage = function (t) {
            var e = new h(t);
            this.images.push(e);
          }),
          (r.prototype.addBackground = function (t, e) {
            var i = new a(t, e);
            this.images.push(i);
          }),
          (r.prototype.check = function () {
            var t = this;
            function e(e, i, n) {
              setTimeout(function () {
                t.progress(e, i, n);
              });
            }
            (this.progressedCount = 0),
              (this.hasAnyBroken = !1),
              this.images.length
                ? this.images.forEach(function (t) {
                    t.once("progress", e), t.check();
                  })
                : this.complete();
          }),
          (r.prototype.progress = function (t, e, i) {
            this.progressedCount++,
              (this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
              this.emitEvent("progress", [this, t, e]),
              this.jqDeferred &&
                this.jqDeferred.notify &&
                this.jqDeferred.notify(this, t),
              this.progressedCount == this.images.length && this.complete(),
              this.options.debug && n && n.log("progress: " + i, t, e);
          }),
          (r.prototype.complete = function () {
            var t = this.hasAnyBroken ? "fail" : "done";
            if (
              ((this.isComplete = !0),
              this.emitEvent(t, [this]),
              this.emitEvent("always", [this]),
              this.jqDeferred)
            ) {
              var e = this.hasAnyBroken ? "reject" : "resolve";
              this.jqDeferred[e](this);
            }
          }),
          (h.prototype = Object.create(e.prototype)),
          (h.prototype.check = function () {
            this.getIsImageComplete()
              ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
              : ((this.proxyImage = new Image()),
                this.proxyImage.addEventListener("load", this),
                this.proxyImage.addEventListener("error", this),
                this.img.addEventListener("load", this),
                this.img.addEventListener("error", this),
                (this.proxyImage.src = this.img.src));
          }),
          (h.prototype.getIsImageComplete = function () {
            return this.img.complete && this.img.naturalWidth;
          }),
          (h.prototype.confirm = function (t, e) {
            (this.isLoaded = t),
              this.emitEvent("progress", [this, this.img, e]);
          }),
          (h.prototype.handleEvent = function (t) {
            var e = "on" + t.type;
            this[e] && this[e](t);
          }),
          (h.prototype.onload = function () {
            this.confirm(!0, "onload"), this.unbindEvents();
          }),
          (h.prototype.onerror = function () {
            this.confirm(!1, "onerror"), this.unbindEvents();
          }),
          (h.prototype.unbindEvents = function () {
            this.proxyImage.removeEventListener("load", this),
              this.proxyImage.removeEventListener("error", this),
              this.img.removeEventListener("load", this),
              this.img.removeEventListener("error", this);
          }),
          (a.prototype = Object.create(h.prototype)),
          (a.prototype.check = function () {
            this.img.addEventListener("load", this),
              this.img.addEventListener("error", this),
              (this.img.src = this.url),
              this.getIsImageComplete() &&
                (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
                this.unbindEvents());
          }),
          (a.prototype.unbindEvents = function () {
            this.img.removeEventListener("load", this),
              this.img.removeEventListener("error", this);
          }),
          (a.prototype.confirm = function (t, e) {
            (this.isLoaded = t),
              this.emitEvent("progress", [this, this.element, e]);
          }),
          (r.makeJQueryPlugin = function (e) {
            (e = e || t.jQuery) &&
              ((i = e).fn.imagesLoaded = function (t, e) {
                return new r(this, t, e).jqDeferred.promise(i(this));
              });
          }),
          r.makeJQueryPlugin(),
          r
        );
      });
    // bxslider
    !(function (t) {
      var e = {
        mode: "horizontal",
        slideSelector: "",
        infiniteLoop: !0,
        hideControlOnEnd: !1,
        speed: 500,
        easing: null,
        slideMargin: 0,
        startSlide: 0,
        randomStart: !1,
        captions: !1,
        ticker: !1,
        tickerHover: !1,
        adaptiveHeight: !1,
        adaptiveHeightSpeed: 500,
        video: !1,
        useCSS: !0,
        preloadImages: "visible",
        responsive: !0,
        slideZIndex: 50,
        wrapperClass: "bx-wrapper",
        touchEnabled: !0,
        swipeThreshold: 50,
        oneToOneTouch: !0,
        preventDefaultSwipeX: !0,
        preventDefaultSwipeY: !1,
        ariaLive: !0,
        ariaHidden: !0,
        keyboardEnabled: !1,
        pager: !0,
        pagerType: "full",
        pagerShortSeparator: " / ",
        pagerSelector: null,
        buildPager: null,
        pagerCustom: null,
        controls: !0,
        nextText: "Next",
        prevText: "Prev",
        nextSelector: null,
        prevSelector: null,
        autoControls: !1,
        startText: "Start",
        stopText: "Stop",
        autoControlsCombine: !1,
        autoControlsSelector: null,
        auto: !1,
        pause: 4e3,
        autoStart: !0,
        autoDirection: "next",
        stopAutoOnClick: !1,
        autoHover: !1,
        autoDelay: 0,
        autoSlideForOnePage: !1,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 0,
        slideWidth: 0,
        shrinkItems: !1,
        onSliderLoad: function () {
          return !0;
        },
        onSlideBefore: function () {
          return !0;
        },
        onSlideAfter: function () {
          return !0;
        },
        onSlideNext: function () {
          return !0;
        },
        onSlidePrev: function () {
          return !0;
        },
        onSliderResize: function () {
          return !0;
        },
      };
      t.fn.bxSlider = function (n) {
        if (0 === this.length) return this;
        if (this.length > 1)
          return (
            this.each(function () {
              t(this).bxSlider(n);
            }),
            this
          );
        var s = {},
          o = this,
          r = t(window).width(),
          a = t(window).height();
        if (!t(o).data("bxSlider")) {
          var l = function () {
              t(o).data("bxSlider") ||
                ((s.settings = t.extend({}, e, n)),
                (s.settings.slideWidth = parseInt(s.settings.slideWidth)),
                (s.children = o.children(s.settings.slideSelector)),
                s.children.length < s.settings.minSlides &&
                  (s.settings.minSlides = s.children.length),
                s.children.length < s.settings.maxSlides &&
                  (s.settings.maxSlides = s.children.length),
                s.settings.randomStart &&
                  (s.settings.startSlide = Math.floor(
                    Math.random() * s.children.length
                  )),
                (s.active = { index: s.settings.startSlide }),
                (s.carousel =
                  s.settings.minSlides > 1 || s.settings.maxSlides > 1),
                s.carousel && (s.settings.preloadImages = "all"),
                (s.minThreshold =
                  s.settings.minSlides * s.settings.slideWidth +
                  (s.settings.minSlides - 1) * s.settings.slideMargin),
                (s.maxThreshold =
                  s.settings.maxSlides * s.settings.slideWidth +
                  (s.settings.maxSlides - 1) * s.settings.slideMargin),
                (s.working = !1),
                (s.controls = {}),
                (s.interval = null),
                (s.animProp = "vertical" === s.settings.mode ? "top" : "left"),
                (s.usingCSS =
                  s.settings.useCSS &&
                  "fade" !== s.settings.mode &&
                  (function () {
                    for (
                      var t = document.createElement("div"),
                        e = [
                          "WebkitPerspective",
                          "MozPerspective",
                          "OPerspective",
                          "msPerspective",
                        ],
                        i = 0;
                      i < e.length;
                      i++
                    )
                      if (void 0 !== t.style[e[i]])
                        return (
                          (s.cssPrefix = e[i]
                            .replace("Perspective", "")
                            .toLowerCase()),
                          (s.animProp = "-" + s.cssPrefix + "-transform"),
                          !0
                        );
                    return !1;
                  })()),
                "vertical" === s.settings.mode &&
                  (s.settings.maxSlides = s.settings.minSlides),
                o.data("origStyle", o.attr("style")),
                o.children(s.settings.slideSelector).each(function () {
                  t(this).data("origStyle", t(this).attr("style"));
                }),
                d());
            },
            d = function () {
              var e = s.children.eq(s.settings.startSlide);
              o.wrap(
                '<div class="' +
                  s.settings.wrapperClass +
                  '"><div class="bx-viewport"></div></div>'
              ),
                (s.viewport = o.parent()),
                s.settings.ariaLive &&
                  !s.settings.ticker &&
                  s.viewport.attr("aria-live", "polite"),
                (s.loader = t('<div class="bx-loading" />')),
                s.viewport.prepend(s.loader),
                o.css({
                  width:
                    "horizontal" === s.settings.mode
                      ? 1e3 * s.children.length + 215 + "%"
                      : "auto",
                  position: "relative",
                }),
                s.usingCSS && s.settings.easing
                  ? o.css(
                      "-" + s.cssPrefix + "-transition-timing-function",
                      s.settings.easing
                    )
                  : s.settings.easing || (s.settings.easing = "swing"),
                s.viewport.css({
                  width: "100%",
                  overflow: "hidden",
                  position: "relative",
                }),
                s.viewport.parent().css({ maxWidth: u() }),
                s.children.css({
                  float: "horizontal" === s.settings.mode ? "left" : "none",
                  listStyle: "none",
                  position: "relative",
                }),
                s.children.css("width", h()),
                "horizontal" === s.settings.mode &&
                  s.settings.slideMargin > 0 &&
                  s.children.css("marginRight", s.settings.slideMargin),
                "vertical" === s.settings.mode &&
                  s.settings.slideMargin > 0 &&
                  s.children.css("marginBottom", s.settings.slideMargin),
                "fade" === s.settings.mode &&
                  (s.children.css({
                    position: "absolute",
                    zIndex: 0,
                    display: "none",
                  }),
                  s.children
                    .eq(s.settings.startSlide)
                    .css({ zIndex: s.settings.slideZIndex, display: "block" })),
                (s.controls.el = t('<div class="bx-controls" />')),
                s.settings.captions && P(),
                (s.active.last = s.settings.startSlide === f() - 1),
                s.settings.video && o.fitVids(),
                ("all" === s.settings.preloadImages || s.settings.ticker) &&
                  (e = s.children),
                s.settings.ticker
                  ? (s.settings.pager = !1)
                  : (s.settings.controls && C(),
                    s.settings.auto && s.settings.autoControls && T(),
                    s.settings.pager && w(),
                    (s.settings.controls ||
                      s.settings.autoControls ||
                      s.settings.pager) &&
                      s.viewport.after(s.controls.el)),
                c(e, g);
            },
            c = function (e, i) {
              var n = e.find('img:not([src=""]), iframe').length,
                s = 0;
              return 0 === n
                ? void i()
                : void e.find('img:not([src=""]), iframe').each(function () {
                    t(this)
                      .one("load error", function () {
                        ++s === n && i();
                      })
                      .each(function () {
                        this.complete && t(this).trigger("load");
                      });
                  });
            },
            g = function () {
              if (
                s.settings.infiniteLoop &&
                "fade" !== s.settings.mode &&
                !s.settings.ticker
              ) {
                var e =
                    "vertical" === s.settings.mode
                      ? s.settings.minSlides
                      : s.settings.maxSlides,
                  i = s.children.slice(0, e).clone(!0).addClass("bx-clone"),
                  n = s.children.slice(-e).clone(!0).addClass("bx-clone");
                s.settings.ariaHidden &&
                  (i.attr("aria-hidden", !0), n.attr("aria-hidden", !0)),
                  o.append(i).prepend(n);
              }
              s.loader.remove(),
                m(),
                "vertical" === s.settings.mode &&
                  (s.settings.adaptiveHeight = !0),
                s.viewport.height(p()),
                o.redrawSlider(),
                s.settings.onSliderLoad.call(o, s.active.index),
                (s.initialized = !0),
                s.settings.responsive && t(window).bind("resize", Z),
                s.settings.auto &&
                  s.settings.autoStart &&
                  (f() > 1 || s.settings.autoSlideForOnePage) &&
                  H(),
                s.settings.ticker && W(),
                s.settings.pager && I(s.settings.startSlide),
                s.settings.controls && D(),
                s.settings.touchEnabled && !s.settings.ticker && N(),
                s.settings.keyboardEnabled &&
                  !s.settings.ticker &&
                  t(document).keydown(F);
            },
            p = function () {
              var e = 0,
                n = t();
              if ("vertical" === s.settings.mode || s.settings.adaptiveHeight)
                if (s.carousel) {
                  var o =
                    1 === s.settings.moveSlides
                      ? s.active.index
                      : s.active.index * x();
                  for (
                    n = s.children.eq(o), i = 1;
                    i <= s.settings.maxSlides - 1;
                    i++
                  )
                    n =
                      o + i >= s.children.length
                        ? n.add(s.children.eq(i - 1))
                        : n.add(s.children.eq(o + i));
                } else n = s.children.eq(s.active.index);
              else n = s.children;
              return (
                "vertical" === s.settings.mode
                  ? (n.each(function (i) {
                      e += t(this).outerHeight();
                    }),
                    s.settings.slideMargin > 0 &&
                      (e +=
                        s.settings.slideMargin * (s.settings.minSlides - 1)))
                  : (e = Math.max.apply(
                      Math,
                      n
                        .map(function () {
                          return t(this).outerHeight(!1);
                        })
                        .get()
                    )),
                "border-box" === s.viewport.css("box-sizing")
                  ? (e +=
                      parseFloat(s.viewport.css("padding-top")) +
                      parseFloat(s.viewport.css("padding-bottom")) +
                      parseFloat(s.viewport.css("border-top-width")) +
                      parseFloat(s.viewport.css("border-bottom-width")))
                  : "padding-box" === s.viewport.css("box-sizing") &&
                    (e +=
                      parseFloat(s.viewport.css("padding-top")) +
                      parseFloat(s.viewport.css("padding-bottom"))),
                e
              );
            },
            u = function () {
              var t = "100%";
              return (
                s.settings.slideWidth > 0 &&
                  (t =
                    "horizontal" === s.settings.mode
                      ? s.settings.maxSlides * s.settings.slideWidth +
                        (s.settings.maxSlides - 1) * s.settings.slideMargin
                      : s.settings.slideWidth),
                t
              );
            },
            h = function () {
              var t = s.settings.slideWidth,
                e = s.viewport.width();
              if (
                0 === s.settings.slideWidth ||
                (s.settings.slideWidth > e && !s.carousel) ||
                "vertical" === s.settings.mode
              )
                t = e;
              else if (
                s.settings.maxSlides > 1 &&
                "horizontal" === s.settings.mode
              ) {
                if (e > s.maxThreshold) return t;
                e < s.minThreshold
                  ? (t =
                      (e -
                        s.settings.slideMargin * (s.settings.minSlides - 1)) /
                      s.settings.minSlides)
                  : s.settings.shrinkItems &&
                    (t = Math.floor(
                      (e + s.settings.slideMargin) /
                        Math.ceil(
                          (e + s.settings.slideMargin) /
                            (t + s.settings.slideMargin)
                        ) -
                        s.settings.slideMargin
                    ));
              }
              return t;
            },
            v = function () {
              var t = 1,
                e = null;
              return (
                "horizontal" === s.settings.mode && s.settings.slideWidth > 0
                  ? s.viewport.width() < s.minThreshold
                    ? (t = s.settings.minSlides)
                    : s.viewport.width() > s.maxThreshold
                    ? (t = s.settings.maxSlides)
                    : ((e =
                        s.children.first().width() + s.settings.slideMargin),
                      (t = Math.floor(
                        (s.viewport.width() + s.settings.slideMargin) / e
                      )))
                  : "vertical" === s.settings.mode &&
                    (t = s.settings.minSlides),
                t
              );
            },
            f = function () {
              var t = 0,
                e = 0,
                i = 0;
              if (s.settings.moveSlides > 0)
                if (s.settings.infiniteLoop)
                  t = Math.ceil(s.children.length / x());
                else
                  for (; e < s.children.length; )
                    ++t,
                      (e = i + v()),
                      (i +=
                        s.settings.moveSlides <= v()
                          ? s.settings.moveSlides
                          : v());
              else t = Math.ceil(s.children.length / v());
              return t;
            },
            x = function () {
              return s.settings.moveSlides > 0 && s.settings.moveSlides <= v()
                ? s.settings.moveSlides
                : v();
            },
            m = function () {
              var t, e, i;
              s.children.length > s.settings.maxSlides &&
              s.active.last &&
              !s.settings.infiniteLoop
                ? "horizontal" === s.settings.mode
                  ? ((e = s.children.last()),
                    (t = e.position()),
                    S(
                      -(t.left - (s.viewport.width() - e.outerWidth())),
                      "reset",
                      0
                    ))
                  : "vertical" === s.settings.mode &&
                    ((i = s.children.length - s.settings.minSlides),
                    (t = s.children.eq(i).position()),
                    S(-t.top, "reset", 0))
                : ((t = s.children.eq(s.active.index * x()).position()),
                  s.active.index === f() - 1 && (s.active.last = !0),
                  void 0 !== t &&
                    ("horizontal" === s.settings.mode
                      ? S(-t.left, "reset", 0)
                      : "vertical" === s.settings.mode &&
                        S(-t.top, "reset", 0)));
            },
            S = function (e, i, n, r) {
              var a, l;
              s.usingCSS
                ? ((l =
                    "vertical" === s.settings.mode
                      ? "translate3d(0, " + e + "px, 0)"
                      : "translate3d(" + e + "px, 0, 0)"),
                  o.css(
                    "-" + s.cssPrefix + "-transition-duration",
                    n / 1e3 + "s"
                  ),
                  "slide" === i
                    ? (o.css(s.animProp, l),
                      0 !== n
                        ? o.bind(
                            "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
                            function (e) {
                              t(e.target).is(o) &&
                                (o.unbind(
                                  "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"
                                ),
                                q());
                            }
                          )
                        : q())
                    : "reset" === i
                    ? o.css(s.animProp, l)
                    : "ticker" === i &&
                      (o.css(
                        "-" + s.cssPrefix + "-transition-timing-function",
                        "linear"
                      ),
                      o.css(s.animProp, l),
                      0 !== n
                        ? o.bind(
                            "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
                            function (e) {
                              t(e.target).is(o) &&
                                (o.unbind(
                                  "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"
                                ),
                                S(r.resetValue, "reset", 0),
                                L());
                            }
                          )
                        : (S(r.resetValue, "reset", 0), L())))
                : ((a = {}),
                  (a[s.animProp] = e),
                  "slide" === i
                    ? o.animate(a, n, s.settings.easing, function () {
                        q();
                      })
                    : "reset" === i
                    ? o.css(s.animProp, e)
                    : "ticker" === i &&
                      o.animate(a, n, "linear", function () {
                        S(r.resetValue, "reset", 0), L();
                      }));
            },
            b = function () {
              for (var e = "", i = "", n = f(), o = 0; o < n; o++)
                (i = ""),
                  (s.settings.buildPager &&
                    t.isFunction(s.settings.buildPager)) ||
                  s.settings.pagerCustom
                    ? ((i = s.settings.buildPager(o)),
                      s.pagerEl.addClass("bx-custom-pager"))
                    : ((i = o + 1), s.pagerEl.addClass("bx-default-pager")),
                  (e +=
                    '<div class="bx-pager-item"><a href="" data-slide-index="' +
                    o +
                    '" class="bx-pager-link">' +
                    i +
                    "</a></div>");
              s.pagerEl.html(e);
            },
            w = function () {
              s.settings.pagerCustom
                ? (s.pagerEl = t(s.settings.pagerCustom))
                : ((s.pagerEl = t('<div class="bx-pager" />')),
                  s.settings.pagerSelector
                    ? t(s.settings.pagerSelector).html(s.pagerEl)
                    : s.controls.el.addClass("bx-has-pager").append(s.pagerEl),
                  b()),
                s.pagerEl.on("click touchend", "a", z);
            },
            C = function () {
              (s.controls.next = t(
                '<a class="bx-next" href="">' + s.settings.nextText + "</a>"
              )),
                (s.controls.prev = t(
                  '<a class="bx-prev" href="">' + s.settings.prevText + "</a>"
                )),
                s.controls.next.bind("click touchend", E),
                s.controls.prev.bind("click touchend", k),
                s.settings.nextSelector &&
                  t(s.settings.nextSelector).append(s.controls.next),
                s.settings.prevSelector &&
                  t(s.settings.prevSelector).append(s.controls.prev),
                s.settings.nextSelector ||
                  s.settings.prevSelector ||
                  ((s.controls.directionEl = t(
                    '<div class="bx-controls-direction" />'
                  )),
                  s.controls.directionEl
                    .append(s.controls.prev)
                    .append(s.controls.next),
                  s.controls.el
                    .addClass("bx-has-controls-direction")
                    .append(s.controls.directionEl));
            },
            T = function () {
              (s.controls.start = t(
                '<div class="bx-controls-auto-item"><a class="bx-start" href="">' +
                  s.settings.startText +
                  "</a></div>"
              )),
                (s.controls.stop = t(
                  '<div class="bx-controls-auto-item"><a class="bx-stop" href="">' +
                    s.settings.stopText +
                    "</a></div>"
                )),
                (s.controls.autoEl = t('<div class="bx-controls-auto" />')),
                s.controls.autoEl.on("click", ".bx-start", M),
                s.controls.autoEl.on("click", ".bx-stop", y),
                s.settings.autoControlsCombine
                  ? s.controls.autoEl.append(s.controls.start)
                  : s.controls.autoEl
                      .append(s.controls.start)
                      .append(s.controls.stop),
                s.settings.autoControlsSelector
                  ? t(s.settings.autoControlsSelector).html(s.controls.autoEl)
                  : s.controls.el
                      .addClass("bx-has-controls-auto")
                      .append(s.controls.autoEl),
                A(s.settings.autoStart ? "stop" : "start");
            },
            P = function () {
              s.children.each(function (e) {
                var i = t(this).find("img:first").attr("title");
                void 0 !== i &&
                  ("" + i).length &&
                  t(this).append(
                    '<div class="bx-caption"><span>' + i + "</span></div>"
                  );
              });
            },
            E = function (t) {
              t.preventDefault(),
                s.controls.el.hasClass("disabled") ||
                  (s.settings.auto &&
                    s.settings.stopAutoOnClick &&
                    o.stopAuto(),
                  o.goToNextSlide());
            },
            k = function (t) {
              t.preventDefault(),
                s.controls.el.hasClass("disabled") ||
                  (s.settings.auto &&
                    s.settings.stopAutoOnClick &&
                    o.stopAuto(),
                  o.goToPrevSlide());
            },
            M = function (t) {
              o.startAuto(), t.preventDefault();
            },
            y = function (t) {
              o.stopAuto(), t.preventDefault();
            },
            z = function (e) {
              var i, n;
              e.preventDefault(),
                s.controls.el.hasClass("disabled") ||
                  (s.settings.auto &&
                    s.settings.stopAutoOnClick &&
                    o.stopAuto(),
                  (i = t(e.currentTarget)),
                  void 0 !== i.attr("data-slide-index") &&
                    ((n = parseInt(i.attr("data-slide-index"))),
                    n !== s.active.index && o.goToSlide(n)));
            },
            I = function (e) {
              var i = s.children.length;
              return "short" === s.settings.pagerType
                ? (s.settings.maxSlides > 1 &&
                    (i = Math.ceil(s.children.length / s.settings.maxSlides)),
                  void s.pagerEl.html(
                    e + 1 + s.settings.pagerShortSeparator + i
                  ))
                : (s.pagerEl.find("a").removeClass("active"),
                  void s.pagerEl.each(function (i, n) {
                    t(n).find("a").eq(e).addClass("active");
                  }));
            },
            q = function () {
              if (s.settings.infiniteLoop) {
                var t = "";
                0 === s.active.index
                  ? (t = s.children.eq(0).position())
                  : s.active.index === f() - 1 && s.carousel
                  ? (t = s.children.eq((f() - 1) * x()).position())
                  : s.active.index === s.children.length - 1 &&
                    (t = s.children.eq(s.children.length - 1).position()),
                  t &&
                    ("horizontal" === s.settings.mode
                      ? S(-t.left, "reset", 0)
                      : "vertical" === s.settings.mode &&
                        S(-t.top, "reset", 0));
              }
              (s.working = !1),
                s.settings.onSlideAfter.call(
                  o,
                  s.children.eq(s.active.index),
                  s.oldIndex,
                  s.active.index
                );
            },
            A = function (t) {
              s.settings.autoControlsCombine
                ? s.controls.autoEl.html(s.controls[t])
                : (s.controls.autoEl.find("a").removeClass("active"),
                  s.controls.autoEl
                    .find("a:not(.bx-" + t + ")")
                    .addClass("active"));
            },
            D = function () {
              1 === f()
                ? (s.controls.prev.addClass("disabled"),
                  s.controls.next.addClass("disabled"))
                : !s.settings.infiniteLoop &&
                  s.settings.hideControlOnEnd &&
                  (0 === s.active.index
                    ? (s.controls.prev.addClass("disabled"),
                      s.controls.next.removeClass("disabled"))
                    : s.active.index === f() - 1
                    ? (s.controls.next.addClass("disabled"),
                      s.controls.prev.removeClass("disabled"))
                    : (s.controls.prev.removeClass("disabled"),
                      s.controls.next.removeClass("disabled")));
            },
            H = function () {
              if (s.settings.autoDelay > 0) {
                setTimeout(o.startAuto, s.settings.autoDelay);
              } else
                o.startAuto(),
                  t(window)
                    .focus(function () {
                      o.startAuto();
                    })
                    .blur(function () {
                      o.stopAuto();
                    });
              s.settings.autoHover &&
                o.hover(
                  function () {
                    s.interval && (o.stopAuto(!0), (s.autoPaused = !0));
                  },
                  function () {
                    s.autoPaused && (o.startAuto(!0), (s.autoPaused = null));
                  }
                );
            },
            W = function () {
              var e,
                i,
                n,
                r,
                a,
                l,
                d,
                c,
                g = 0;
              "next" === s.settings.autoDirection
                ? o.append(s.children.clone().addClass("bx-clone"))
                : (o.prepend(s.children.clone().addClass("bx-clone")),
                  (e = s.children.first().position()),
                  (g = "horizontal" === s.settings.mode ? -e.left : -e.top)),
                S(g, "reset", 0),
                (s.settings.pager = !1),
                (s.settings.controls = !1),
                (s.settings.autoControls = !1),
                s.settings.tickerHover &&
                  (s.usingCSS
                    ? ((r = "horizontal" === s.settings.mode ? 4 : 5),
                      s.viewport.hover(
                        function () {
                          (i = o.css("-" + s.cssPrefix + "-transform")),
                            (n = parseFloat(i.split(",")[r])),
                            S(n, "reset", 0);
                        },
                        function () {
                          (c = 0),
                            s.children.each(function (e) {
                              c +=
                                "horizontal" === s.settings.mode
                                  ? t(this).outerWidth(!0)
                                  : t(this).outerHeight(!0);
                            }),
                            (a = s.settings.speed / c),
                            (l =
                              "horizontal" === s.settings.mode
                                ? "left"
                                : "top"),
                            (d = a * (c - Math.abs(parseInt(n)))),
                            L(d);
                        }
                      ))
                    : s.viewport.hover(
                        function () {
                          o.stop();
                        },
                        function () {
                          (c = 0),
                            s.children.each(function (e) {
                              c +=
                                "horizontal" === s.settings.mode
                                  ? t(this).outerWidth(!0)
                                  : t(this).outerHeight(!0);
                            }),
                            (a = s.settings.speed / c),
                            (l =
                              "horizontal" === s.settings.mode
                                ? "left"
                                : "top"),
                            (d = a * (c - Math.abs(parseInt(o.css(l))))),
                            L(d);
                        }
                      )),
                L();
            },
            L = function (t) {
              var e,
                i,
                n,
                r = t ? t : s.settings.speed,
                a = { left: 0, top: 0 },
                l = { left: 0, top: 0 };
              "next" === s.settings.autoDirection
                ? (a = o.find(".bx-clone").first().position())
                : (l = s.children.first().position()),
                (e = "horizontal" === s.settings.mode ? -a.left : -a.top),
                (i = "horizontal" === s.settings.mode ? -l.left : -l.top),
                (n = { resetValue: i }),
                S(e, "ticker", r, n);
            },
            O = function (e) {
              var i = t(window),
                n = { top: i.scrollTop(), left: i.scrollLeft() },
                s = e.offset();
              return (
                (n.right = n.left + i.width()),
                (n.bottom = n.top + i.height()),
                (s.right = s.left + e.outerWidth()),
                (s.bottom = s.top + e.outerHeight()),
                !(
                  n.right < s.left ||
                  n.left > s.right ||
                  n.bottom < s.top ||
                  n.top > s.bottom
                )
              );
            },
            F = function (t) {
              var e = document.activeElement.tagName.toLowerCase(),
                i = "input|textarea",
                n = new RegExp(e, ["i"]),
                s = n.exec(i);
              if (null == s && O(o)) {
                if (39 === t.keyCode) return E(t), !1;
                if (37 === t.keyCode) return k(t), !1;
              }
            },
            N = function () {
              (s.touch = { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } }),
                s.viewport.bind("touchstart MSPointerDown pointerdown", X),
                s.viewport.on("click", ".bxslider a", function (t) {
                  s.viewport.hasClass("click-disabled") &&
                    (t.preventDefault(),
                    s.viewport.removeClass("click-disabled"));
                });
            },
            X = function (t) {
              if ((s.controls.el.addClass("disabled"), s.working))
                t.preventDefault(), s.controls.el.removeClass("disabled");
              else {
                s.touch.originalPos = o.position();
                var e = t.originalEvent,
                  i =
                    "undefined" != typeof e.changedTouches
                      ? e.changedTouches
                      : [e];
                (s.touch.start.x = i[0].pageX),
                  (s.touch.start.y = i[0].pageY),
                  s.viewport.get(0).setPointerCapture &&
                    ((s.pointerId = e.pointerId),
                    s.viewport.get(0).setPointerCapture(s.pointerId)),
                  s.viewport.bind("touchmove MSPointerMove pointermove", V),
                  s.viewport.bind("touchend MSPointerUp pointerup", R),
                  s.viewport.bind("MSPointerCancel pointercancel", Y);
              }
            },
            Y = function (t) {
              S(s.touch.originalPos.left, "reset", 0),
                s.controls.el.removeClass("disabled"),
                s.viewport.unbind("MSPointerCancel pointercancel", Y),
                s.viewport.unbind("touchmove MSPointerMove pointermove", V),
                s.viewport.unbind("touchend MSPointerUp pointerup", R),
                s.viewport.get(0).releasePointerCapture &&
                  s.viewport.get(0).releasePointerCapture(s.pointerId);
            },
            V = function (t) {
              var e = t.originalEvent,
                i =
                  "undefined" != typeof e.changedTouches
                    ? e.changedTouches
                    : [e],
                n = Math.abs(i[0].pageX - s.touch.start.x),
                o = Math.abs(i[0].pageY - s.touch.start.y),
                r = 0,
                a = 0;
              3 * n > o && s.settings.preventDefaultSwipeX
                ? t.preventDefault()
                : 3 * o > n &&
                  s.settings.preventDefaultSwipeY &&
                  t.preventDefault(),
                "fade" !== s.settings.mode &&
                  s.settings.oneToOneTouch &&
                  ("horizontal" === s.settings.mode
                    ? ((a = i[0].pageX - s.touch.start.x),
                      (r = s.touch.originalPos.left + a))
                    : ((a = i[0].pageY - s.touch.start.y),
                      (r = s.touch.originalPos.top + a)),
                  S(r, "reset", 0));
            },
            R = function (t) {
              s.viewport.unbind("touchmove MSPointerMove pointermove", V),
                s.controls.el.removeClass("disabled");
              var e = t.originalEvent,
                i =
                  "undefined" != typeof e.changedTouches
                    ? e.changedTouches
                    : [e],
                n = 0,
                r = 0;
              (s.touch.end.x = i[0].pageX),
                (s.touch.end.y = i[0].pageY),
                "fade" === s.settings.mode
                  ? ((r = Math.abs(s.touch.start.x - s.touch.end.x)),
                    r >= s.settings.swipeThreshold &&
                      (s.touch.start.x > s.touch.end.x
                        ? o.goToNextSlide()
                        : o.goToPrevSlide(),
                      o.stopAuto()))
                  : ("horizontal" === s.settings.mode
                      ? ((r = s.touch.end.x - s.touch.start.x),
                        (n = s.touch.originalPos.left))
                      : ((r = s.touch.end.y - s.touch.start.y),
                        (n = s.touch.originalPos.top)),
                    !s.settings.infiniteLoop &&
                    ((0 === s.active.index && r > 0) ||
                      (s.active.last && r < 0))
                      ? S(n, "reset", 200)
                      : Math.abs(r) >= s.settings.swipeThreshold
                      ? (r < 0 ? o.goToNextSlide() : o.goToPrevSlide(),
                        o.stopAuto())
                      : S(n, "reset", 200)),
                s.viewport.unbind("touchend MSPointerUp pointerup", R),
                s.viewport.get(0).releasePointerCapture &&
                  s.viewport.get(0).releasePointerCapture(s.pointerId);
            },
            Z = function (e) {
              if (s.initialized)
                if (s.working) window.setTimeout(Z, 10);
                else {
                  var i = t(window).width(),
                    n = t(window).height();
                  (r === i && a === n) ||
                    ((r = i),
                    (a = n),
                    o.redrawSlider(),
                    s.settings.onSliderResize.call(o, s.active.index));
                }
            },
            B = function (t) {
              var e = v();
              s.settings.ariaHidden &&
                !s.settings.ticker &&
                (s.children.attr("aria-hidden", "true"),
                s.children.slice(t, t + e).attr("aria-hidden", "false"));
            },
            U = function (t) {
              return t < 0
                ? s.settings.infiniteLoop
                  ? f() - 1
                  : s.active.index
                : t >= f()
                ? s.settings.infiniteLoop
                  ? 0
                  : s.active.index
                : t;
            };
          return (
            (o.goToSlide = function (e, i) {
              var n,
                r,
                a,
                l,
                d = !0,
                c = 0,
                g = { left: 0, top: 0 },
                u = null;
              if (
                ((s.oldIndex = s.active.index),
                (s.active.index = U(e)),
                !s.working && s.active.index !== s.oldIndex)
              ) {
                if (
                  ((s.working = !0),
                  (d = s.settings.onSlideBefore.call(
                    o,
                    s.children.eq(s.active.index),
                    s.oldIndex,
                    s.active.index
                  )),
                  "undefined" != typeof d && !d)
                )
                  return (s.active.index = s.oldIndex), void (s.working = !1);
                "next" === i
                  ? s.settings.onSlideNext.call(
                      o,
                      s.children.eq(s.active.index),
                      s.oldIndex,
                      s.active.index
                    ) || (d = !1)
                  : "prev" === i &&
                    (s.settings.onSlidePrev.call(
                      o,
                      s.children.eq(s.active.index),
                      s.oldIndex,
                      s.active.index
                    ) ||
                      (d = !1)),
                  (s.active.last = s.active.index >= f() - 1),
                  (s.settings.pager || s.settings.pagerCustom) &&
                    I(s.active.index),
                  s.settings.controls && D(),
                  "fade" === s.settings.mode
                    ? (s.settings.adaptiveHeight &&
                        s.viewport.height() !== p() &&
                        s.viewport.animate(
                          { height: p() },
                          s.settings.adaptiveHeightSpeed
                        ),
                      s.children
                        .filter(":visible")
                        .fadeOut(s.settings.speed)
                        .css({ zIndex: 0 }),
                      s.children
                        .eq(s.active.index)
                        .css("zIndex", s.settings.slideZIndex + 1)
                        .fadeIn(s.settings.speed, function () {
                          t(this).css("zIndex", s.settings.slideZIndex), q();
                        }))
                    : (s.settings.adaptiveHeight &&
                        s.viewport.height() !== p() &&
                        s.viewport.animate(
                          { height: p() },
                          s.settings.adaptiveHeightSpeed
                        ),
                      !s.settings.infiniteLoop && s.carousel && s.active.last
                        ? "horizontal" === s.settings.mode
                          ? ((u = s.children.eq(s.children.length - 1)),
                            (g = u.position()),
                            (c = s.viewport.width() - u.outerWidth()))
                          : ((n = s.children.length - s.settings.minSlides),
                            (g = s.children.eq(n).position()))
                        : s.carousel && s.active.last && "prev" === i
                        ? ((r =
                            1 === s.settings.moveSlides
                              ? s.settings.maxSlides - x()
                              : (f() - 1) * x() -
                                (s.children.length - s.settings.maxSlides)),
                          (u = o.children(".bx-clone").eq(r)),
                          (g = u.position()))
                        : "next" === i && 0 === s.active.index
                        ? ((g = o
                            .find("> .bx-clone")
                            .eq(s.settings.maxSlides)
                            .position()),
                          (s.active.last = !1))
                        : e >= 0 &&
                          ((l = e * parseInt(x())),
                          (g = s.children.eq(l).position())),
                      "undefined" != typeof g
                        ? ((a =
                            "horizontal" === s.settings.mode
                              ? -(g.left - c)
                              : -g.top),
                          S(a, "slide", s.settings.speed))
                        : (s.working = !1)),
                  s.settings.ariaHidden && B(s.active.index * x());
              }
            }),
            (o.goToNextSlide = function () {
              if (s.settings.infiniteLoop || !s.active.last) {
                var t = parseInt(s.active.index) + 1;
                o.goToSlide(t, "next");
              }
            }),
            (o.goToPrevSlide = function () {
              if (s.settings.infiniteLoop || 0 !== s.active.index) {
                var t = parseInt(s.active.index) - 1;
                o.goToSlide(t, "prev");
              }
            }),
            (o.startAuto = function (t) {
              s.interval ||
                ((s.interval = setInterval(function () {
                  "next" === s.settings.autoDirection
                    ? o.goToNextSlide()
                    : o.goToPrevSlide();
                }, s.settings.pause)),
                s.settings.autoControls && t !== !0 && A("stop"));
            }),
            (o.stopAuto = function (t) {
              s.interval &&
                (clearInterval(s.interval),
                (s.interval = null),
                s.settings.autoControls && t !== !0 && A("start"));
            }),
            (o.getCurrentSlide = function () {
              return s.active.index;
            }),
            (o.getCurrentSlideElement = function () {
              return s.children.eq(s.active.index);
            }),
            (o.getSlideElement = function (t) {
              return s.children.eq(t);
            }),
            (o.getSlideCount = function () {
              return s.children.length;
            }),
            (o.isWorking = function () {
              return s.working;
            }),
            (o.redrawSlider = function () {
              s.children.add(o.find(".bx-clone")).outerWidth(h()),
                s.viewport.css("height", p()),
                s.settings.ticker || m(),
                s.active.last && (s.active.index = f() - 1),
                s.active.index >= f() && (s.active.last = !0),
                s.settings.pager &&
                  !s.settings.pagerCustom &&
                  (b(), I(s.active.index)),
                s.settings.ariaHidden && B(s.active.index * x());
            }),
            (o.destroySlider = function () {
              s.initialized &&
                ((s.initialized = !1),
                t(".bx-clone", this).remove(),
                s.children.each(function () {
                  void 0 !== t(this).data("origStyle")
                    ? t(this).attr("style", t(this).data("origStyle"))
                    : t(this).removeAttr("style");
                }),
                void 0 !== t(this).data("origStyle")
                  ? this.attr("style", t(this).data("origStyle"))
                  : t(this).removeAttr("style"),
                t(this).unwrap().unwrap(),
                s.controls.el && s.controls.el.remove(),
                s.controls.next && s.controls.next.remove(),
                s.controls.prev && s.controls.prev.remove(),
                s.pagerEl &&
                  s.settings.controls &&
                  !s.settings.pagerCustom &&
                  s.pagerEl.remove(),
                t(".bx-caption", this).remove(),
                s.controls.autoEl && s.controls.autoEl.remove(),
                clearInterval(s.interval),
                s.settings.responsive && t(window).unbind("resize", Z),
                s.settings.keyboardEnabled && t(document).unbind("keydown", F),
                t(this).removeData("bxSlider"));
            }),
            (o.reloadSlider = function (e) {
              void 0 !== e && (n = e),
                o.destroySlider(),
                l(),
                t(o).data("bxSlider", this);
            }),
            l(),
            t(o).data("bxSlider", this),
            this
          );
        }
      };
    })(jQuery);
    // Magic Popup
    !(function (a) {
      "function" == typeof define && define.amd
        ? define(["jquery"], a)
        : a(
            "object" == typeof exports
              ? require("jquery")
              : window.jQuery || window.Zepto
          );
    })(function (a) {
      var b,
        c,
        d,
        e,
        f,
        g,
        h = "Close",
        i = "BeforeClose",
        j = "AfterClose",
        k = "BeforeAppend",
        l = "MarkupParse",
        m = "Open",
        n = "Change",
        o = "mfp",
        p = "." + o,
        q = "mfp-ready",
        r = "mfp-removing",
        s = "mfp-prevent-close",
        t = function () {},
        u = !!window.jQuery,
        v = a(window),
        w = function (a, c) {
          b.ev.on(o + a + p, c);
        },
        x = function (b, c, d, e) {
          var f = document.createElement("div");
          return (
            (f.className = "mfp-" + b),
            d && (f.innerHTML = d),
            e ? c && c.appendChild(f) : ((f = a(f)), c && f.appendTo(c)),
            f
          );
        },
        y = function (c, d) {
          b.ev.triggerHandler(o + c, d),
            b.st.callbacks &&
              ((c = c.charAt(0).toLowerCase() + c.slice(1)),
              b.st.callbacks[c] &&
                b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]));
        },
        z = function (c) {
          return (
            (c === g && b.currTemplate.closeBtn) ||
              ((b.currTemplate.closeBtn = a(
                b.st.closeMarkup.replace("%title%", b.st.tClose)
              )),
              (g = c)),
            b.currTemplate.closeBtn
          );
        },
        A = function () {
          a.magnificPopup.instance ||
            ((b = new t()), b.init(), (a.magnificPopup.instance = b));
        },
        B = function () {
          var a = document.createElement("p").style,
            b = ["ms", "O", "Moz", "Webkit"];
          if (void 0 !== a.transition) return !0;
          for (; b.length; ) if (b.pop() + "Transition" in a) return !0;
          return !1;
        };
      (t.prototype = {
        constructor: t,
        init: function () {
          var c = navigator.appVersion;
          (b.isLowIE = b.isIE8 = document.all && !document.addEventListener),
            (b.isAndroid = /android/gi.test(c)),
            (b.isIOS = /iphone|ipad|ipod/gi.test(c)),
            (b.supportsTransition = B()),
            (b.probablyMobile =
              b.isAndroid ||
              b.isIOS ||
              /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
                navigator.userAgent
              )),
            (d = a(document)),
            (b.popupsCache = {});
        },
        open: function (c) {
          var e;
          if (c.isObj === !1) {
            (b.items = c.items.toArray()), (b.index = 0);
            var g,
              h = c.items;
            for (e = 0; e < h.length; e++)
              if (((g = h[e]), g.parsed && (g = g.el[0]), g === c.el[0])) {
                b.index = e;
                break;
              }
          } else
            (b.items = a.isArray(c.items) ? c.items : [c.items]),
              (b.index = c.index || 0);
          if (b.isOpen) return void b.updateItemHTML();
          (b.types = []),
            (f = ""),
            c.mainEl && c.mainEl.length ? (b.ev = c.mainEl.eq(0)) : (b.ev = d),
            c.key
              ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}),
                (b.currTemplate = b.popupsCache[c.key]))
              : (b.currTemplate = {}),
            (b.st = a.extend(!0, {}, a.magnificPopup.defaults, c)),
            (b.fixedContentPos =
              "auto" === b.st.fixedContentPos
                ? !b.probablyMobile
                : b.st.fixedContentPos),
            b.st.modal &&
              ((b.st.closeOnContentClick = !1),
              (b.st.closeOnBgClick = !1),
              (b.st.showCloseBtn = !1),
              (b.st.enableEscapeKey = !1)),
            b.bgOverlay ||
              ((b.bgOverlay = x("bg").on("click" + p, function () {
                b.close();
              })),
              (b.wrap = x("wrap")
                .attr("tabindex", -1)
                .on("click" + p, function (a) {
                  b._checkIfClose(a.target) && b.close();
                })),
              (b.container = x("container", b.wrap))),
            (b.contentContainer = x("content")),
            b.st.preloader &&
              (b.preloader = x("preloader", b.container, b.st.tLoading));
          var i = a.magnificPopup.modules;
          for (e = 0; e < i.length; e++) {
            var j = i[e];
            (j = j.charAt(0).toUpperCase() + j.slice(1)), b["init" + j].call(b);
          }
          y("BeforeOpen"),
            b.st.showCloseBtn &&
              (b.st.closeBtnInside
                ? (w(l, function (a, b, c, d) {
                    c.close_replaceWith = z(d.type);
                  }),
                  (f += " mfp-close-btn-in"))
                : b.wrap.append(z())),
            b.st.alignTop && (f += " mfp-align-top"),
            b.fixedContentPos
              ? b.wrap.css({
                  overflow: b.st.overflowY,
                  overflowX: "hidden",
                  overflowY: b.st.overflowY,
                })
              : b.wrap.css({ top: v.scrollTop(), position: "absolute" }),
            (b.st.fixedBgPos === !1 ||
              ("auto" === b.st.fixedBgPos && !b.fixedContentPos)) &&
              b.bgOverlay.css({ height: d.height(), position: "absolute" }),
            b.st.enableEscapeKey &&
              d.on("keyup" + p, function (a) {
                27 === a.keyCode && b.close();
              }),
            v.on("resize" + p, function () {
              b.updateSize();
            }),
            b.st.closeOnContentClick || (f += " mfp-auto-cursor"),
            f && b.wrap.addClass(f);
          var k = (b.wH = v.height()),
            n = {};
          if (b.fixedContentPos && b._hasScrollBar(k)) {
            var o = b._getScrollbarSize();
            o && (n.marginRight = o);
          }
          b.fixedContentPos &&
            (b.isIE7
              ? a("body, html").css("overflow", "hidden")
              : (n.overflow = "hidden"));
          var r = b.st.mainClass;
          return (
            b.isIE7 && (r += " mfp-ie7"),
            r && b._addClassToMFP(r),
            b.updateItemHTML(),
            y("BuildControls"),
            a("html").css(n),
            b.bgOverlay
              .add(b.wrap)
              .prependTo(b.st.prependTo || a(document.body)),
            (b._lastFocusedEl = document.activeElement),
            setTimeout(function () {
              b.content
                ? (b._addClassToMFP(q), b._setFocus())
                : b.bgOverlay.addClass(q),
                d.on("focusin" + p, b._onFocusIn);
            }, 16),
            (b.isOpen = !0),
            b.updateSize(k),
            y(m),
            c
          );
        },
        close: function () {
          b.isOpen &&
            (y(i),
            (b.isOpen = !1),
            b.st.removalDelay && !b.isLowIE && b.supportsTransition
              ? (b._addClassToMFP(r),
                setTimeout(function () {
                  b._close();
                }, b.st.removalDelay))
              : b._close());
        },
        _close: function () {
          y(h);
          var c = r + " " + q + " ";
          if (
            (b.bgOverlay.detach(),
            b.wrap.detach(),
            b.container.empty(),
            b.st.mainClass && (c += b.st.mainClass + " "),
            b._removeClassFromMFP(c),
            b.fixedContentPos)
          ) {
            var e = { marginRight: "" };
            b.isIE7 ? a("body, html").css("overflow", "") : (e.overflow = ""),
              a("html").css(e);
          }
          d.off("keyup" + p + " focusin" + p),
            b.ev.off(p),
            b.wrap.attr("class", "mfp-wrap").removeAttr("style"),
            b.bgOverlay.attr("class", "mfp-bg"),
            b.container.attr("class", "mfp-container"),
            !b.st.showCloseBtn ||
              (b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0) ||
              (b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach()),
            b.st.autoFocusLast &&
              b._lastFocusedEl &&
              a(b._lastFocusedEl).focus(),
            (b.currItem = null),
            (b.content = null),
            (b.currTemplate = null),
            (b.prevHeight = 0),
            y(j);
        },
        updateSize: function (a) {
          if (b.isIOS) {
            var c = document.documentElement.clientWidth / window.innerWidth,
              d = window.innerHeight * c;
            b.wrap.css("height", d), (b.wH = d);
          } else b.wH = a || v.height();
          b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize");
        },
        updateItemHTML: function () {
          var c = b.items[b.index];
          b.contentContainer.detach(),
            b.content && b.content.detach(),
            c.parsed || (c = b.parseEl(b.index));
          var d = c.type;
          if (
            (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]),
            (b.currItem = c),
            !b.currTemplate[d])
          ) {
            var f = b.st[d] ? b.st[d].markup : !1;
            y("FirstMarkupParse", f),
              f ? (b.currTemplate[d] = a(f)) : (b.currTemplate[d] = !0);
          }
          e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
          var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](
            c,
            b.currTemplate[d]
          );
          b.appendContent(g, d),
            (c.preloaded = !0),
            y(n, c),
            (e = c.type),
            b.container.prepend(b.contentContainer),
            y("AfterChange");
        },
        appendContent: function (a, c) {
          (b.content = a),
            a
              ? b.st.showCloseBtn &&
                b.st.closeBtnInside &&
                b.currTemplate[c] === !0
                ? b.content.find(".mfp-close").length || b.content.append(z())
                : (b.content = a)
              : (b.content = ""),
            y(k),
            b.container.addClass("mfp-" + c + "-holder"),
            b.contentContainer.append(b.content);
        },
        parseEl: function (c) {
          var d,
            e = b.items[c];
          if (
            (e.tagName
              ? (e = { el: a(e) })
              : ((d = e.type), (e = { data: e, src: e.src })),
            e.el)
          ) {
            for (var f = b.types, g = 0; g < f.length; g++)
              if (e.el.hasClass("mfp-" + f[g])) {
                d = f[g];
                break;
              }
            (e.src = e.el.attr("data-mfp-src")),
              e.src || (e.src = e.el.attr("href"));
          }
          return (
            (e.type = d || b.st.type || "inline"),
            (e.index = c),
            (e.parsed = !0),
            (b.items[c] = e),
            y("ElementParse", e),
            b.items[c]
          );
        },
        addGroup: function (a, c) {
          var d = function (d) {
            (d.mfpEl = this), b._openClick(d, a, c);
          };
          c || (c = {});
          var e = "click.magnificPopup";
          (c.mainEl = a),
            c.items
              ? ((c.isObj = !0), a.off(e).on(e, d))
              : ((c.isObj = !1),
                c.delegate
                  ? a.off(e).on(e, c.delegate, d)
                  : ((c.items = a), a.off(e).on(e, d)));
        },
        _openClick: function (c, d, e) {
          var f =
            void 0 !== e.midClick
              ? e.midClick
              : a.magnificPopup.defaults.midClick;
          if (
            f ||
            !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)
          ) {
            var g =
              void 0 !== e.disableOn
                ? e.disableOn
                : a.magnificPopup.defaults.disableOn;
            if (g)
              if (a.isFunction(g)) {
                if (!g.call(b)) return !0;
              } else if (v.width() < g) return !0;
            c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()),
              (e.el = a(c.mfpEl)),
              e.delegate && (e.items = d.find(e.delegate)),
              b.open(e);
          }
        },
        updateStatus: function (a, d) {
          if (b.preloader) {
            c !== a && b.container.removeClass("mfp-s-" + c),
              d || "loading" !== a || (d = b.st.tLoading);
            var e = { status: a, text: d };
            y("UpdateStatus", e),
              (a = e.status),
              (d = e.text),
              b.preloader.html(d),
              b.preloader.find("a").on("click", function (a) {
                a.stopImmediatePropagation();
              }),
              b.container.addClass("mfp-s-" + a),
              (c = a);
          }
        },
        _checkIfClose: function (c) {
          if (!a(c).hasClass(s)) {
            var d = b.st.closeOnContentClick,
              e = b.st.closeOnBgClick;
            if (d && e) return !0;
            if (
              !b.content ||
              a(c).hasClass("mfp-close") ||
              (b.preloader && c === b.preloader[0])
            )
              return !0;
            if (c === b.content[0] || a.contains(b.content[0], c)) {
              if (d) return !0;
            } else if (e && a.contains(document, c)) return !0;
            return !1;
          }
        },
        _addClassToMFP: function (a) {
          b.bgOverlay.addClass(a), b.wrap.addClass(a);
        },
        _removeClassFromMFP: function (a) {
          this.bgOverlay.removeClass(a), b.wrap.removeClass(a);
        },
        _hasScrollBar: function (a) {
          return (
            (b.isIE7 ? d.height() : document.body.scrollHeight) >
            (a || v.height())
          );
        },
        _setFocus: function () {
          (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus();
        },
        _onFocusIn: function (c) {
          return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target)
            ? void 0
            : (b._setFocus(), !1);
        },
        _parseMarkup: function (b, c, d) {
          var e;
          d.data && (c = a.extend(d.data, c)),
            y(l, [b, c, d]),
            a.each(c, function (c, d) {
              if (void 0 === d || d === !1) return !0;
              if (((e = c.split("_")), e.length > 1)) {
                var f = b.find(p + "-" + e[0]);
                if (f.length > 0) {
                  var g = e[1];
                  "replaceWith" === g
                    ? f[0] !== d[0] && f.replaceWith(d)
                    : "img" === g
                    ? f.is("img")
                      ? f.attr("src", d)
                      : f.replaceWith(
                          a("<img>")
                            .attr("src", d)
                            .attr("class", f.attr("class"))
                        )
                    : f.attr(e[1], d);
                }
              } else b.find(p + "-" + c).html(d);
            });
        },
        _getScrollbarSize: function () {
          if (void 0 === b.scrollbarSize) {
            var a = document.createElement("div");
            (a.style.cssText =
              "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
              document.body.appendChild(a),
              (b.scrollbarSize = a.offsetWidth - a.clientWidth),
              document.body.removeChild(a);
          }
          return b.scrollbarSize;
        },
      }),
        (a.magnificPopup = {
          instance: null,
          proto: t.prototype,
          modules: [],
          open: function (b, c) {
            return (
              A(),
              (b = b ? a.extend(!0, {}, b) : {}),
              (b.isObj = !0),
              (b.index = c || 0),
              this.instance.open(b)
            );
          },
          close: function () {
            return a.magnificPopup.instance && a.magnificPopup.instance.close();
          },
          registerModule: function (b, c) {
            c.options && (a.magnificPopup.defaults[b] = c.options),
              a.extend(this.proto, c.proto),
              this.modules.push(b);
          },
          defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup:
              '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0,
          },
        }),
        (a.fn.magnificPopup = function (c) {
          A();
          var d = a(this);
          if ("string" == typeof c)
            if ("open" === c) {
              var e,
                f = u ? d.data("magnificPopup") : d[0].magnificPopup,
                g = parseInt(arguments[1], 10) || 0;
              f.items
                ? (e = f.items[g])
                : ((e = d),
                  f.delegate && (e = e.find(f.delegate)),
                  (e = e.eq(g))),
                b._openClick({ mfpEl: e }, d, f);
            } else
              b.isOpen &&
                b[c].apply(b, Array.prototype.slice.call(arguments, 1));
          else
            (c = a.extend(!0, {}, c)),
              u ? d.data("magnificPopup", c) : (d[0].magnificPopup = c),
              b.addGroup(d, c);
          return d;
        });
      var C,
        D,
        E,
        F = "inline",
        G = function () {
          E && (D.after(E.addClass(C)).detach(), (E = null));
        };
      a.magnificPopup.registerModule(F, {
        options: {
          hiddenClass: "hide",
          markup: "",
          tNotFound: "Content not found",
        },
        proto: {
          initInline: function () {
            b.types.push(F),
              w(h + "." + F, function () {
                G();
              });
          },
          getInline: function (c, d) {
            if ((G(), c.src)) {
              var e = b.st.inline,
                f = a(c.src);
              if (f.length) {
                var g = f[0].parentNode;
                g &&
                  g.tagName &&
                  (D || ((C = e.hiddenClass), (D = x(C)), (C = "mfp-" + C)),
                  (E = f.after(D).detach().removeClass(C))),
                  b.updateStatus("ready");
              } else b.updateStatus("error", e.tNotFound), (f = a("<div>"));
              return (c.inlineElement = f), f;
            }
            return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d;
          },
        },
      });
      var H,
        I = "ajax",
        J = function () {
          H && a(document.body).removeClass(H);
        },
        K = function () {
          J(), b.req && b.req.abort();
        };
      a.magnificPopup.registerModule(I, {
        options: {
          settings: null,
          cursor: "mfp-ajax-cur",
          tError: '<a href="%url%">The content</a> could not be loaded.',
        },
        proto: {
          initAjax: function () {
            b.types.push(I),
              (H = b.st.ajax.cursor),
              w(h + "." + I, K),
              w("BeforeChange." + I, K);
          },
          getAjax: function (c) {
            H && a(document.body).addClass(H), b.updateStatus("loading");
            var d = a.extend(
              {
                url: c.src,
                success: function (d, e, f) {
                  var g = { data: d, xhr: f };
                  y("ParseAjax", g),
                    b.appendContent(a(g.data), I),
                    (c.finished = !0),
                    J(),
                    b._setFocus(),
                    setTimeout(function () {
                      b.wrap.addClass(q);
                    }, 16),
                    b.updateStatus("ready"),
                    y("AjaxContentAdded");
                },
                error: function () {
                  J(),
                    (c.finished = c.loadError = !0),
                    b.updateStatus(
                      "error",
                      b.st.ajax.tError.replace("%url%", c.src)
                    );
                },
              },
              b.st.ajax.settings
            );
            return (b.req = a.ajax(d)), "";
          },
        },
      });
      var L,
        M = function (c) {
          if (c.data && void 0 !== c.data.title) return c.data.title;
          var d = b.st.image.titleSrc;
          if (d) {
            if (a.isFunction(d)) return d.call(b, c);
            if (c.el) return c.el.attr(d) || "";
          }
          return "";
        };
      a.magnificPopup.registerModule("image", {
        options: {
          markup:
            '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
          cursor: "mfp-zoom-out-cur",
          titleSrc: "title",
          verticalFit: !0,
          tError: '<a href="%url%">The image</a> could not be loaded.',
        },
        proto: {
          initImage: function () {
            var c = b.st.image,
              d = ".image";
            b.types.push("image"),
              w(m + d, function () {
                "image" === b.currItem.type &&
                  c.cursor &&
                  a(document.body).addClass(c.cursor);
              }),
              w(h + d, function () {
                c.cursor && a(document.body).removeClass(c.cursor),
                  v.off("resize" + p);
              }),
              w("Resize" + d, b.resizeImage),
              b.isLowIE && w("AfterChange", b.resizeImage);
          },
          resizeImage: function () {
            var a = b.currItem;
            if (a && a.img && b.st.image.verticalFit) {
              var c = 0;
              b.isLowIE &&
                (c =
                  parseInt(a.img.css("padding-top"), 10) +
                  parseInt(a.img.css("padding-bottom"), 10)),
                a.img.css("max-height", b.wH - c);
            }
          },
          _onImageHasSize: function (a) {
            a.img &&
              ((a.hasSize = !0),
              L && clearInterval(L),
              (a.isCheckingImgSize = !1),
              y("ImageHasSize", a),
              a.imgHidden &&
                (b.content && b.content.removeClass("mfp-loading"),
                (a.imgHidden = !1)));
          },
          findImageSize: function (a) {
            var c = 0,
              d = a.img[0],
              e = function (f) {
                L && clearInterval(L),
                  (L = setInterval(function () {
                    return d.naturalWidth > 0
                      ? void b._onImageHasSize(a)
                      : (c > 200 && clearInterval(L),
                        c++,
                        void (3 === c
                          ? e(10)
                          : 40 === c
                          ? e(50)
                          : 100 === c && e(500)));
                  }, f));
              };
            e(1);
          },
          getImage: function (c, d) {
            var e = 0,
              f = function () {
                c &&
                  (c.img[0].complete
                    ? (c.img.off(".mfploader"),
                      c === b.currItem &&
                        (b._onImageHasSize(c), b.updateStatus("ready")),
                      (c.hasSize = !0),
                      (c.loaded = !0),
                      y("ImageLoadComplete"))
                    : (e++, 200 > e ? setTimeout(f, 100) : g()));
              },
              g = function () {
                c &&
                  (c.img.off(".mfploader"),
                  c === b.currItem &&
                    (b._onImageHasSize(c),
                    b.updateStatus("error", h.tError.replace("%url%", c.src))),
                  (c.hasSize = !0),
                  (c.loaded = !0),
                  (c.loadError = !0));
              },
              h = b.st.image,
              i = d.find(".mfp-img");
            if (i.length) {
              var j = document.createElement("img");
              (j.className = "mfp-img"),
                c.el &&
                  c.el.find("img").length &&
                  (j.alt = c.el.find("img").attr("alt")),
                (c.img = a(j).on("load.mfploader", f).on("error.mfploader", g)),
                (j.src = c.src),
                i.is("img") && (c.img = c.img.clone()),
                (j = c.img[0]),
                j.naturalWidth > 0
                  ? (c.hasSize = !0)
                  : j.width || (c.hasSize = !1);
            }
            return (
              b._parseMarkup(d, { title: M(c), img_replaceWith: c.img }, c),
              b.resizeImage(),
              c.hasSize
                ? (L && clearInterval(L),
                  c.loadError
                    ? (d.addClass("mfp-loading"),
                      b.updateStatus("error", h.tError.replace("%url%", c.src)))
                    : (d.removeClass("mfp-loading"), b.updateStatus("ready")),
                  d)
                : (b.updateStatus("loading"),
                  (c.loading = !0),
                  c.hasSize ||
                    ((c.imgHidden = !0),
                    d.addClass("mfp-loading"),
                    b.findImageSize(c)),
                  d)
            );
          },
        },
      });
      var N,
        O = function () {
          return (
            void 0 === N &&
              (N = void 0 !== document.createElement("p").style.MozTransform),
            N
          );
        };
      a.magnificPopup.registerModule("zoom", {
        options: {
          enabled: !1,
          easing: "ease-in-out",
          duration: 300,
          opener: function (a) {
            return a.is("img") ? a : a.find("img");
          },
        },
        proto: {
          initZoom: function () {
            var a,
              c = b.st.zoom,
              d = ".zoom";
            if (c.enabled && b.supportsTransition) {
              var e,
                f,
                g = c.duration,
                j = function (a) {
                  var b = a
                      .clone()
                      .removeAttr("style")
                      .removeAttr("class")
                      .addClass("mfp-animated-image"),
                    d = "all " + c.duration / 1e3 + "s " + c.easing,
                    e = {
                      position: "fixed",
                      zIndex: 9999,
                      left: 0,
                      top: 0,
                      "-webkit-backface-visibility": "hidden",
                    },
                    f = "transition";
                  return (
                    (e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[
                      f
                    ] = d),
                    b.css(e),
                    b
                  );
                },
                k = function () {
                  b.content.css("visibility", "visible");
                };
              w("BuildControls" + d, function () {
                if (b._allowZoom()) {
                  if (
                    (clearTimeout(e),
                    b.content.css("visibility", "hidden"),
                    (a = b._getItemToZoom()),
                    !a)
                  )
                    return void k();
                  (f = j(a)),
                    f.css(b._getOffset()),
                    b.wrap.append(f),
                    (e = setTimeout(function () {
                      f.css(b._getOffset(!0)),
                        (e = setTimeout(function () {
                          k(),
                            setTimeout(function () {
                              f.remove(),
                                (a = f = null),
                                y("ZoomAnimationEnded");
                            }, 16);
                        }, g));
                    }, 16));
                }
              }),
                w(i + d, function () {
                  if (b._allowZoom()) {
                    if ((clearTimeout(e), (b.st.removalDelay = g), !a)) {
                      if (((a = b._getItemToZoom()), !a)) return;
                      f = j(a);
                    }
                    f.css(b._getOffset(!0)),
                      b.wrap.append(f),
                      b.content.css("visibility", "hidden"),
                      setTimeout(function () {
                        f.css(b._getOffset());
                      }, 16);
                  }
                }),
                w(h + d, function () {
                  b._allowZoom() && (k(), f && f.remove(), (a = null));
                });
            }
          },
          _allowZoom: function () {
            return "image" === b.currItem.type;
          },
          _getItemToZoom: function () {
            return b.currItem.hasSize ? b.currItem.img : !1;
          },
          _getOffset: function (c) {
            var d;
            d = c
              ? b.currItem.img
              : b.st.zoom.opener(b.currItem.el || b.currItem);
            var e = d.offset(),
              f = parseInt(d.css("padding-top"), 10),
              g = parseInt(d.css("padding-bottom"), 10);
            e.top -= a(window).scrollTop() - f;
            var h = {
              width: d.width(),
              height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f,
            };
            return (
              O()
                ? (h["-moz-transform"] = h.transform =
                    "translate(" + e.left + "px," + e.top + "px)")
                : ((h.left = e.left), (h.top = e.top)),
              h
            );
          },
        },
      });
      var P = "iframe",
        Q = "//about:blank",
        R = function (a) {
          if (b.currTemplate[P]) {
            var c = b.currTemplate[P].find("iframe");
            c.length &&
              (a || (c[0].src = Q),
              b.isIE8 && c.css("display", a ? "block" : "none"));
          }
        };
      a.magnificPopup.registerModule(P, {
        options: {
          markup:
            '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
          srcAction: "iframe_src",
          patterns: {
            youtube: {
              index: "youtube.com",
              id: "v=",
              src: "//www.youtube.com/embed/%id%?autoplay=1",
            },
            vimeo: {
              index: "vimeo.com/",
              id: "/",
              src: "//player.vimeo.com/video/%id%?autoplay=1",
            },
            gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
          },
        },
        proto: {
          initIframe: function () {
            b.types.push(P),
              w("BeforeChange", function (a, b, c) {
                b !== c && (b === P ? R() : c === P && R(!0));
              }),
              w(h + "." + P, function () {
                R();
              });
          },
          getIframe: function (c, d) {
            var e = c.src,
              f = b.st.iframe;
            a.each(f.patterns, function () {
              return e.indexOf(this.index) > -1
                ? (this.id &&
                    (e =
                      "string" == typeof this.id
                        ? e.substr(
                            e.lastIndexOf(this.id) + this.id.length,
                            e.length
                          )
                        : this.id.call(this, e)),
                  (e = this.src.replace("%id%", e)),
                  !1)
                : void 0;
            });
            var g = {};
            return (
              f.srcAction && (g[f.srcAction] = e),
              b._parseMarkup(d, g, c),
              b.updateStatus("ready"),
              d
            );
          },
        },
      });
      var S = function (a) {
          var c = b.items.length;
          return a > c - 1 ? a - c : 0 > a ? c + a : a;
        },
        T = function (a, b, c) {
          return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
        };
      a.magnificPopup.registerModule("gallery", {
        options: {
          enabled: !1,
          arrowMarkup:
            '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
          preload: [0, 2],
          navigateByImgClick: !0,
          arrows: !0,
          tPrev: "Previous (Left arrow key)",
          tNext: "Next (Right arrow key)",
          tCounter: "%curr% of %total%",
        },
        proto: {
          initGallery: function () {
            var c = b.st.gallery,
              e = ".mfp-gallery";
            return (
              (b.direction = !0),
              c && c.enabled
                ? ((f += " mfp-gallery"),
                  w(m + e, function () {
                    c.navigateByImgClick &&
                      b.wrap.on("click" + e, ".mfp-img", function () {
                        return b.items.length > 1 ? (b.next(), !1) : void 0;
                      }),
                      d.on("keydown" + e, function (a) {
                        37 === a.keyCode
                          ? b.prev()
                          : 39 === a.keyCode && b.next();
                      });
                  }),
                  w("UpdateStatus" + e, function (a, c) {
                    c.text &&
                      (c.text = T(c.text, b.currItem.index, b.items.length));
                  }),
                  w(l + e, function (a, d, e, f) {
                    var g = b.items.length;
                    e.counter = g > 1 ? T(c.tCounter, f.index, g) : "";
                  }),
                  w("BuildControls" + e, function () {
                    if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                      var d = c.arrowMarkup,
                        e = (b.arrowLeft = a(
                          d
                            .replace(/%title%/gi, c.tPrev)
                            .replace(/%dir%/gi, "left")
                        ).addClass(s)),
                        f = (b.arrowRight = a(
                          d
                            .replace(/%title%/gi, c.tNext)
                            .replace(/%dir%/gi, "right")
                        ).addClass(s));
                      e.click(function () {
                        b.prev();
                      }),
                        f.click(function () {
                          b.next();
                        }),
                        b.container.append(e.add(f));
                    }
                  }),
                  w(n + e, function () {
                    b._preloadTimeout && clearTimeout(b._preloadTimeout),
                      (b._preloadTimeout = setTimeout(function () {
                        b.preloadNearbyImages(), (b._preloadTimeout = null);
                      }, 16));
                  }),
                  void w(h + e, function () {
                    d.off(e),
                      b.wrap.off("click" + e),
                      (b.arrowRight = b.arrowLeft = null);
                  }))
                : !1
            );
          },
          next: function () {
            (b.direction = !0), (b.index = S(b.index + 1)), b.updateItemHTML();
          },
          prev: function () {
            (b.direction = !1), (b.index = S(b.index - 1)), b.updateItemHTML();
          },
          goTo: function (a) {
            (b.direction = a >= b.index), (b.index = a), b.updateItemHTML();
          },
          preloadNearbyImages: function () {
            var a,
              c = b.st.gallery.preload,
              d = Math.min(c[0], b.items.length),
              e = Math.min(c[1], b.items.length);
            for (a = 1; a <= (b.direction ? e : d); a++)
              b._preloadItem(b.index + a);
            for (a = 1; a <= (b.direction ? d : e); a++)
              b._preloadItem(b.index - a);
          },
          _preloadItem: function (c) {
            if (((c = S(c)), !b.items[c].preloaded)) {
              var d = b.items[c];
              d.parsed || (d = b.parseEl(c)),
                y("LazyLoad", d),
                "image" === d.type &&
                  (d.img = a('<img class="mfp-img" />')
                    .on("load.mfploader", function () {
                      d.hasSize = !0;
                    })
                    .on("error.mfploader", function () {
                      (d.hasSize = !0),
                        (d.loadError = !0),
                        y("LazyLoadError", d);
                    })
                    .attr("src", d.src)),
                (d.preloaded = !0);
            }
          },
        },
      });
      var U = "retina";
      a.magnificPopup.registerModule(U, {
        options: {
          replaceSrc: function (a) {
            return a.src.replace(/\.\w+$/, function (a) {
              return "@2x" + a;
            });
          },
          ratio: 1,
        },
        proto: {
          initRetina: function () {
            if (window.devicePixelRatio > 1) {
              var a = b.st.retina,
                c = a.ratio;
              (c = isNaN(c) ? c() : c),
                c > 1 &&
                  (w("ImageHasSize." + U, function (a, b) {
                    b.img.css({
                      "max-width": b.img[0].naturalWidth / c,
                      width: "100%",
                    });
                  }),
                  w("ElementParse." + U, function (b, d) {
                    d.src = a.replaceSrc(d, c);
                  }));
            }
          },
        },
      }),
        A();
    });
    // Slick
    !(function (i) {
      "use strict";
      "function" == typeof define && define.amd
        ? define(["jquery"], i)
        : "undefined" != typeof exports
        ? (module.exports = i(require("jquery")))
        : i(jQuery);
    })(function (i) {
      "use strict";
      var e = window.Slick || {};
      ((e = (function () {
        var e = 0;
        return function (t, o) {
          var s,
            n = this;
          (n.defaults = {
            accessibility: !0,
            adaptiveHeight: !1,
            appendArrows: i(t),
            appendDots: i(t),
            arrows: !0,
            asNavFor: null,
            prevArrow:
              '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
            nextArrow:
              '<button class="slick-next" aria-label="Next" type="button">Next</button>',
            autoplay: !1,
            autoplaySpeed: 3e3,
            centerMode: !1,
            centerPadding: "50px",
            cssEase: "ease",
            customPaging: function (e, t) {
              return i('<button type="button" />').text(t + 1);
            },
            dots: !1,
            dotsClass: "slick-dots",
            draggable: !0,
            easing: "linear",
            edgeFriction: 0.35,
            fade: !1,
            focusOnSelect: !1,
            focusOnChange: !1,
            infinite: !0,
            initialSlide: 0,
            lazyLoad: "ondemand",
            mobileFirst: !1,
            pauseOnHover: !0,
            pauseOnFocus: !0,
            pauseOnDotsHover: !1,
            respondTo: "window",
            responsive: null,
            rows: 1,
            rtl: !1,
            slide: "",
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            swipe: !0,
            swipeToSlide: !1,
            touchMove: !0,
            touchThreshold: 5,
            useCSS: !0,
            useTransform: !0,
            variableWidth: !1,
            vertical: !1,
            verticalSwiping: !1,
            waitForAnimate: !0,
            zIndex: 1e3,
          }),
            (n.initials = {
              animating: !1,
              dragging: !1,
              autoPlayTimer: null,
              currentDirection: 0,
              currentLeft: null,
              currentSlide: 0,
              direction: 1,
              $dots: null,
              listWidth: null,
              listHeight: null,
              loadIndex: 0,
              $nextArrow: null,
              $prevArrow: null,
              scrolling: !1,
              slideCount: null,
              slideWidth: null,
              $slideTrack: null,
              $slides: null,
              sliding: !1,
              slideOffset: 0,
              swipeLeft: null,
              swiping: !1,
              $list: null,
              touchObject: {},
              transformsEnabled: !1,
              unslicked: !1,
            }),
            i.extend(n, n.initials),
            (n.activeBreakpoint = null),
            (n.animType = null),
            (n.animProp = null),
            (n.breakpoints = []),
            (n.breakpointSettings = []),
            (n.cssTransitions = !1),
            (n.focussed = !1),
            (n.interrupted = !1),
            (n.hidden = "hidden"),
            (n.paused = !0),
            (n.positionProp = null),
            (n.respondTo = null),
            (n.rowCount = 1),
            (n.shouldClick = !0),
            (n.$slider = i(t)),
            (n.$slidesCache = null),
            (n.transformType = null),
            (n.transitionType = null),
            (n.visibilityChange = "visibilitychange"),
            (n.windowWidth = 0),
            (n.windowTimer = null),
            (s = i(t).data("slick") || {}),
            (n.options = i.extend({}, n.defaults, o, s)),
            (n.currentSlide = n.options.initialSlide),
            (n.originalSettings = n.options),
            void 0 !== document.mozHidden
              ? ((n.hidden = "mozHidden"),
                (n.visibilityChange = "mozvisibilitychange"))
              : void 0 !== document.webkitHidden &&
                ((n.hidden = "webkitHidden"),
                (n.visibilityChange = "webkitvisibilitychange")),
            (n.autoPlay = i.proxy(n.autoPlay, n)),
            (n.autoPlayClear = i.proxy(n.autoPlayClear, n)),
            (n.autoPlayIterator = i.proxy(n.autoPlayIterator, n)),
            (n.changeSlide = i.proxy(n.changeSlide, n)),
            (n.clickHandler = i.proxy(n.clickHandler, n)),
            (n.selectHandler = i.proxy(n.selectHandler, n)),
            (n.setPosition = i.proxy(n.setPosition, n)),
            (n.swipeHandler = i.proxy(n.swipeHandler, n)),
            (n.dragHandler = i.proxy(n.dragHandler, n)),
            (n.keyHandler = i.proxy(n.keyHandler, n)),
            (n.instanceUid = e++),
            (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
            n.registerBreakpoints(),
            n.init(!0);
        };
      })()).prototype.activateADA = function () {
        this.$slideTrack
          .find(".slick-active")
          .attr({ "aria-hidden": "false" })
          .find("a, input, button, select")
          .attr({ tabindex: "0" });
      }),
        (e.prototype.addSlide = e.prototype.slickAdd = function (e, t, o) {
          var s = this;
          if ("boolean" == typeof t) (o = t), (t = null);
          else if (t < 0 || t >= s.slideCount) return !1;
          s.unload(),
            "number" == typeof t
              ? 0 === t && 0 === s.$slides.length
                ? i(e).appendTo(s.$slideTrack)
                : o
                ? i(e).insertBefore(s.$slides.eq(t))
                : i(e).insertAfter(s.$slides.eq(t))
              : !0 === o
              ? i(e).prependTo(s.$slideTrack)
              : i(e).appendTo(s.$slideTrack),
            (s.$slides = s.$slideTrack.children(this.options.slide)),
            s.$slideTrack.children(this.options.slide).detach(),
            s.$slideTrack.append(s.$slides),
            s.$slides.each(function (e, t) {
              i(t).attr("data-slick-index", e);
            }),
            (s.$slidesCache = s.$slides),
            s.reinit();
        }),
        (e.prototype.animateHeight = function () {
          var i = this;
          if (
            1 === i.options.slidesToShow &&
            !0 === i.options.adaptiveHeight &&
            !1 === i.options.vertical
          ) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({ height: e }, i.options.speed);
          }
        }),
        (e.prototype.animateSlide = function (e, t) {
          var o = {},
            s = this;
          s.animateHeight(),
            !0 === s.options.rtl && !1 === s.options.vertical && (e = -e),
            !1 === s.transformsEnabled
              ? !1 === s.options.vertical
                ? s.$slideTrack.animate(
                    { left: e },
                    s.options.speed,
                    s.options.easing,
                    t
                  )
                : s.$slideTrack.animate(
                    { top: e },
                    s.options.speed,
                    s.options.easing,
                    t
                  )
              : !1 === s.cssTransitions
              ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
                i({ animStart: s.currentLeft }).animate(
                  { animStart: e },
                  {
                    duration: s.options.speed,
                    easing: s.options.easing,
                    step: function (i) {
                      (i = Math.ceil(i)),
                        !1 === s.options.vertical
                          ? ((o[s.animType] = "translate(" + i + "px, 0px)"),
                            s.$slideTrack.css(o))
                          : ((o[s.animType] = "translate(0px," + i + "px)"),
                            s.$slideTrack.css(o));
                    },
                    complete: function () {
                      t && t.call();
                    },
                  }
                ))
              : (s.applyTransition(),
                (e = Math.ceil(e)),
                !1 === s.options.vertical
                  ? (o[s.animType] = "translate3d(" + e + "px, 0px, 0px)")
                  : (o[s.animType] = "translate3d(0px," + e + "px, 0px)"),
                s.$slideTrack.css(o),
                t &&
                  setTimeout(function () {
                    s.disableTransition(), t.call();
                  }, s.options.speed));
        }),
        (e.prototype.getNavTarget = function () {
          var e = this,
            t = e.options.asNavFor;
          return t && null !== t && (t = i(t).not(e.$slider)), t;
        }),
        (e.prototype.asNavFor = function (e) {
          var t = this.getNavTarget();
          null !== t &&
            "object" == typeof t &&
            t.each(function () {
              var t = i(this).slick("getSlick");
              t.unslicked || t.slideHandler(e, !0);
            });
        }),
        (e.prototype.applyTransition = function (i) {
          var e = this,
            t = {};
          !1 === e.options.fade
            ? (t[e.transitionType] =
                e.transformType +
                " " +
                e.options.speed +
                "ms " +
                e.options.cssEase)
            : (t[e.transitionType] =
                "opacity " + e.options.speed + "ms " + e.options.cssEase),
            !1 === e.options.fade
              ? e.$slideTrack.css(t)
              : e.$slides.eq(i).css(t);
        }),
        (e.prototype.autoPlay = function () {
          var i = this;
          i.autoPlayClear(),
            i.slideCount > i.options.slidesToShow &&
              (i.autoPlayTimer = setInterval(
                i.autoPlayIterator,
                i.options.autoplaySpeed
              ));
        }),
        (e.prototype.autoPlayClear = function () {
          var i = this;
          i.autoPlayTimer && clearInterval(i.autoPlayTimer);
        }),
        (e.prototype.autoPlayIterator = function () {
          var i = this,
            e = i.currentSlide + i.options.slidesToScroll;
          i.paused ||
            i.interrupted ||
            i.focussed ||
            (!1 === i.options.infinite &&
              (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1
                ? (i.direction = 0)
                : 0 === i.direction &&
                  ((e = i.currentSlide - i.options.slidesToScroll),
                  i.currentSlide - 1 == 0 && (i.direction = 1))),
            i.slideHandler(e));
        }),
        (e.prototype.buildArrows = function () {
          var e = this;
          !0 === e.options.arrows &&
            ((e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow")),
            (e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow")),
            e.slideCount > e.options.slidesToShow
              ? (e.$prevArrow
                  .removeClass("slick-hidden")
                  .removeAttr("aria-hidden tabindex"),
                e.$nextArrow
                  .removeClass("slick-hidden")
                  .removeAttr("aria-hidden tabindex"),
                e.htmlExpr.test(e.options.prevArrow) &&
                  e.$prevArrow.prependTo(e.options.appendArrows),
                e.htmlExpr.test(e.options.nextArrow) &&
                  e.$nextArrow.appendTo(e.options.appendArrows),
                !0 !== e.options.infinite &&
                  e.$prevArrow
                    .addClass("slick-disabled")
                    .attr("aria-disabled", "true"))
              : e.$prevArrow
                  .add(e.$nextArrow)
                  .addClass("slick-hidden")
                  .attr({ "aria-disabled": "true", tabindex: "-1" }));
        }),
        (e.prototype.buildDots = function () {
          var e,
            t,
            o = this;
          if (!0 === o.options.dots) {
            for (
              o.$slider.addClass("slick-dotted"),
                t = i("<ul />").addClass(o.options.dotsClass),
                e = 0;
              e <= o.getDotCount();
              e += 1
            )
              t.append(
                i("<li />").append(o.options.customPaging.call(this, o, e))
              );
            (o.$dots = t.appendTo(o.options.appendDots)),
              o.$dots.find("li").first().addClass("slick-active");
          }
        }),
        (e.prototype.buildOut = function () {
          var e = this;
          (e.$slides = e.$slider
            .children(e.options.slide + ":not(.slick-cloned)")
            .addClass("slick-slide")),
            (e.slideCount = e.$slides.length),
            e.$slides.each(function (e, t) {
              i(t)
                .attr("data-slick-index", e)
                .data("originalStyling", i(t).attr("style") || "");
            }),
            e.$slider.addClass("slick-slider"),
            (e.$slideTrack =
              0 === e.slideCount
                ? i('<div class="slick-track"/>').appendTo(e.$slider)
                : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
            (e.$list = e.$slideTrack
              .wrap('<div class="slick-list"/>')
              .parent()),
            e.$slideTrack.css("opacity", 0),
            (!0 !== e.options.centerMode && !0 !== e.options.swipeToSlide) ||
              (e.options.slidesToScroll = 1),
            i("img[data-lazy]", e.$slider)
              .not("[src]")
              .addClass("slick-loading"),
            e.setupInfinite(),
            e.buildArrows(),
            e.buildDots(),
            e.updateDots(),
            e.setSlideClasses(
              "number" == typeof e.currentSlide ? e.currentSlide : 0
            ),
            !0 === e.options.draggable && e.$list.addClass("draggable");
        }),
        (e.prototype.buildRows = function () {
          var i,
            e,
            t,
            o,
            s,
            n,
            r,
            l = this;
          if (
            ((o = document.createDocumentFragment()),
            (n = l.$slider.children()),
            l.options.rows > 1)
          ) {
            for (
              r = l.options.slidesPerRow * l.options.rows,
                s = Math.ceil(n.length / r),
                i = 0;
              i < s;
              i++
            ) {
              var d = document.createElement("div");
              for (e = 0; e < l.options.rows; e++) {
                var a = document.createElement("div");
                for (t = 0; t < l.options.slidesPerRow; t++) {
                  var c = i * r + (e * l.options.slidesPerRow + t);
                  n.get(c) && a.appendChild(n.get(c));
                }
                d.appendChild(a);
              }
              o.appendChild(d);
            }
            l.$slider.empty().append(o),
              l.$slider
                .children()
                .children()
                .children()
                .css({
                  width: 100 / l.options.slidesPerRow + "%",
                  display: "inline-block",
                });
          }
        }),
        (e.prototype.checkResponsive = function (e, t) {
          var o,
            s,
            n,
            r = this,
            l = !1,
            d = r.$slider.width(),
            a = window.innerWidth || i(window).width();
          if (
            ("window" === r.respondTo
              ? (n = a)
              : "slider" === r.respondTo
              ? (n = d)
              : "min" === r.respondTo && (n = Math.min(a, d)),
            r.options.responsive &&
              r.options.responsive.length &&
              null !== r.options.responsive)
          ) {
            s = null;
            for (o in r.breakpoints)
              r.breakpoints.hasOwnProperty(o) &&
                (!1 === r.originalSettings.mobileFirst
                  ? n < r.breakpoints[o] && (s = r.breakpoints[o])
                  : n > r.breakpoints[o] && (s = r.breakpoints[o]));
            null !== s
              ? null !== r.activeBreakpoint
                ? (s !== r.activeBreakpoint || t) &&
                  ((r.activeBreakpoint = s),
                  "unslick" === r.breakpointSettings[s]
                    ? r.unslick(s)
                    : ((r.options = i.extend(
                        {},
                        r.originalSettings,
                        r.breakpointSettings[s]
                      )),
                      !0 === e && (r.currentSlide = r.options.initialSlide),
                      r.refresh(e)),
                  (l = s))
                : ((r.activeBreakpoint = s),
                  "unslick" === r.breakpointSettings[s]
                    ? r.unslick(s)
                    : ((r.options = i.extend(
                        {},
                        r.originalSettings,
                        r.breakpointSettings[s]
                      )),
                      !0 === e && (r.currentSlide = r.options.initialSlide),
                      r.refresh(e)),
                  (l = s))
              : null !== r.activeBreakpoint &&
                ((r.activeBreakpoint = null),
                (r.options = r.originalSettings),
                !0 === e && (r.currentSlide = r.options.initialSlide),
                r.refresh(e),
                (l = s)),
              e || !1 === l || r.$slider.trigger("breakpoint", [r, l]);
          }
        }),
        (e.prototype.changeSlide = function (e, t) {
          var o,
            s,
            n,
            r = this,
            l = i(e.currentTarget);
          switch (
            (l.is("a") && e.preventDefault(),
            l.is("li") || (l = l.closest("li")),
            (n = r.slideCount % r.options.slidesToScroll != 0),
            (o = n
              ? 0
              : (r.slideCount - r.currentSlide) % r.options.slidesToScroll),
            e.data.message)
          ) {
            case "previous":
              (s =
                0 === o
                  ? r.options.slidesToScroll
                  : r.options.slidesToShow - o),
                r.slideCount > r.options.slidesToShow &&
                  r.slideHandler(r.currentSlide - s, !1, t);
              break;
            case "next":
              (s = 0 === o ? r.options.slidesToScroll : o),
                r.slideCount > r.options.slidesToShow &&
                  r.slideHandler(r.currentSlide + s, !1, t);
              break;
            case "index":
              var d =
                0 === e.data.index
                  ? 0
                  : e.data.index || l.index() * r.options.slidesToScroll;
              r.slideHandler(r.checkNavigable(d), !1, t),
                l.children().trigger("focus");
              break;
            default:
              return;
          }
        }),
        (e.prototype.checkNavigable = function (i) {
          var e, t;
          if (((e = this.getNavigableIndexes()), (t = 0), i > e[e.length - 1]))
            i = e[e.length - 1];
          else
            for (var o in e) {
              if (i < e[o]) {
                i = t;
                break;
              }
              t = e[o];
            }
          return i;
        }),
        (e.prototype.cleanUpEvents = function () {
          var e = this;
          e.options.dots &&
            null !== e.$dots &&
            (i("li", e.$dots)
              .off("click.slick", e.changeSlide)
              .off("mouseenter.slick", i.proxy(e.interrupt, e, !0))
              .off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
            !0 === e.options.accessibility &&
              e.$dots.off("keydown.slick", e.keyHandler)),
            e.$slider.off("focus.slick blur.slick"),
            !0 === e.options.arrows &&
              e.slideCount > e.options.slidesToShow &&
              (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
              e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
              !0 === e.options.accessibility &&
                (e.$prevArrow &&
                  e.$prevArrow.off("keydown.slick", e.keyHandler),
                e.$nextArrow &&
                  e.$nextArrow.off("keydown.slick", e.keyHandler))),
            e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
            e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
            e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
            e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
            e.$list.off("click.slick", e.clickHandler),
            i(document).off(e.visibilityChange, e.visibility),
            e.cleanUpSlideEvents(),
            !0 === e.options.accessibility &&
              e.$list.off("keydown.slick", e.keyHandler),
            !0 === e.options.focusOnSelect &&
              i(e.$slideTrack).children().off("click.slick", e.selectHandler),
            i(window).off(
              "orientationchange.slick.slick-" + e.instanceUid,
              e.orientationChange
            ),
            i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
            i("[draggable!=true]", e.$slideTrack).off(
              "dragstart",
              e.preventDefault
            ),
            i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
        }),
        (e.prototype.cleanUpSlideEvents = function () {
          var e = this;
          e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
            e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
        }),
        (e.prototype.cleanUpRows = function () {
          var i,
            e = this;
          e.options.rows > 1 &&
            ((i = e.$slides.children().children()).removeAttr("style"),
            e.$slider.empty().append(i));
        }),
        (e.prototype.clickHandler = function (i) {
          !1 === this.shouldClick &&
            (i.stopImmediatePropagation(),
            i.stopPropagation(),
            i.preventDefault());
        }),
        (e.prototype.destroy = function (e) {
          var t = this;
          t.autoPlayClear(),
            (t.touchObject = {}),
            t.cleanUpEvents(),
            i(".slick-cloned", t.$slider).detach(),
            t.$dots && t.$dots.remove(),
            t.$prevArrow &&
              t.$prevArrow.length &&
              (t.$prevArrow
                .removeClass("slick-disabled slick-arrow slick-hidden")
                .removeAttr("aria-hidden aria-disabled tabindex")
                .css("display", ""),
              t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
            t.$nextArrow &&
              t.$nextArrow.length &&
              (t.$nextArrow
                .removeClass("slick-disabled slick-arrow slick-hidden")
                .removeAttr("aria-hidden aria-disabled tabindex")
                .css("display", ""),
              t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
            t.$slides &&
              (t.$slides
                .removeClass(
                  "slick-slide slick-active slick-center slick-visible slick-current"
                )
                .removeAttr("aria-hidden")
                .removeAttr("data-slick-index")
                .each(function () {
                  i(this).attr("style", i(this).data("originalStyling"));
                }),
              t.$slideTrack.children(this.options.slide).detach(),
              t.$slideTrack.detach(),
              t.$list.detach(),
              t.$slider.append(t.$slides)),
            t.cleanUpRows(),
            t.$slider.removeClass("slick-slider"),
            t.$slider.removeClass("slick-initialized"),
            t.$slider.removeClass("slick-dotted"),
            (t.unslicked = !0),
            e || t.$slider.trigger("destroy", [t]);
        }),
        (e.prototype.disableTransition = function (i) {
          var e = this,
            t = {};
          (t[e.transitionType] = ""),
            !1 === e.options.fade
              ? e.$slideTrack.css(t)
              : e.$slides.eq(i).css(t);
        }),
        (e.prototype.fadeSlide = function (i, e) {
          var t = this;
          !1 === t.cssTransitions
            ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }),
              t.$slides
                .eq(i)
                .animate({ opacity: 1 }, t.options.speed, t.options.easing, e))
            : (t.applyTransition(i),
              t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }),
              e &&
                setTimeout(function () {
                  t.disableTransition(i), e.call();
                }, t.options.speed));
        }),
        (e.prototype.fadeSlideOut = function (i) {
          var e = this;
          !1 === e.cssTransitions
            ? e.$slides
                .eq(i)
                .animate(
                  { opacity: 0, zIndex: e.options.zIndex - 2 },
                  e.options.speed,
                  e.options.easing
                )
            : (e.applyTransition(i),
              e.$slides
                .eq(i)
                .css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
        }),
        (e.prototype.filterSlides = e.prototype.slickFilter = function (i) {
          var e = this;
          null !== i &&
            ((e.$slidesCache = e.$slides),
            e.unload(),
            e.$slideTrack.children(this.options.slide).detach(),
            e.$slidesCache.filter(i).appendTo(e.$slideTrack),
            e.reinit());
        }),
        (e.prototype.focusHandler = function () {
          var e = this;
          e.$slider
            .off("focus.slick blur.slick")
            .on("focus.slick blur.slick", "*", function (t) {
              t.stopImmediatePropagation();
              var o = i(this);
              setTimeout(function () {
                e.options.pauseOnFocus &&
                  ((e.focussed = o.is(":focus")), e.autoPlay());
              }, 0);
            });
        }),
        (e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
          return this.currentSlide;
        }),
        (e.prototype.getDotCount = function () {
          var i = this,
            e = 0,
            t = 0,
            o = 0;
          if (!0 === i.options.infinite)
            if (i.slideCount <= i.options.slidesToShow) ++o;
            else
              for (; e < i.slideCount; )
                ++o,
                  (e = t + i.options.slidesToScroll),
                  (t +=
                    i.options.slidesToScroll <= i.options.slidesToShow
                      ? i.options.slidesToScroll
                      : i.options.slidesToShow);
          else if (!0 === i.options.centerMode) o = i.slideCount;
          else if (i.options.asNavFor)
            for (; e < i.slideCount; )
              ++o,
                (e = t + i.options.slidesToScroll),
                (t +=
                  i.options.slidesToScroll <= i.options.slidesToShow
                    ? i.options.slidesToScroll
                    : i.options.slidesToShow);
          else
            o =
              1 +
              Math.ceil(
                (i.slideCount - i.options.slidesToShow) /
                  i.options.slidesToScroll
              );
          return o - 1;
        }),
        (e.prototype.getLeft = function (i) {
          var e,
            t,
            o,
            s,
            n = this,
            r = 0;
          return (
            (n.slideOffset = 0),
            (t = n.$slides.first().outerHeight(!0)),
            !0 === n.options.infinite
              ? (n.slideCount > n.options.slidesToShow &&
                  ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
                  (s = -1),
                  !0 === n.options.vertical &&
                    !0 === n.options.centerMode &&
                    (2 === n.options.slidesToShow
                      ? (s = -1.5)
                      : 1 === n.options.slidesToShow && (s = -2)),
                  (r = t * n.options.slidesToShow * s)),
                n.slideCount % n.options.slidesToScroll != 0 &&
                  i + n.options.slidesToScroll > n.slideCount &&
                  n.slideCount > n.options.slidesToShow &&
                  (i > n.slideCount
                    ? ((n.slideOffset =
                        (n.options.slidesToShow - (i - n.slideCount)) *
                        n.slideWidth *
                        -1),
                      (r =
                        (n.options.slidesToShow - (i - n.slideCount)) * t * -1))
                    : ((n.slideOffset =
                        (n.slideCount % n.options.slidesToScroll) *
                        n.slideWidth *
                        -1),
                      (r =
                        (n.slideCount % n.options.slidesToScroll) * t * -1))))
              : i + n.options.slidesToShow > n.slideCount &&
                ((n.slideOffset =
                  (i + n.options.slidesToShow - n.slideCount) * n.slideWidth),
                (r = (i + n.options.slidesToShow - n.slideCount) * t)),
            n.slideCount <= n.options.slidesToShow &&
              ((n.slideOffset = 0), (r = 0)),
            !0 === n.options.centerMode &&
            n.slideCount <= n.options.slidesToShow
              ? (n.slideOffset =
                  (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 -
                  (n.slideWidth * n.slideCount) / 2)
              : !0 === n.options.centerMode && !0 === n.options.infinite
              ? (n.slideOffset +=
                  n.slideWidth * Math.floor(n.options.slidesToShow / 2) -
                  n.slideWidth)
              : !0 === n.options.centerMode &&
                ((n.slideOffset = 0),
                (n.slideOffset +=
                  n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
            (e =
              !1 === n.options.vertical
                ? i * n.slideWidth * -1 + n.slideOffset
                : i * t * -1 + r),
            !0 === n.options.variableWidth &&
              ((o =
                n.slideCount <= n.options.slidesToShow ||
                !1 === n.options.infinite
                  ? n.$slideTrack.children(".slick-slide").eq(i)
                  : n.$slideTrack
                      .children(".slick-slide")
                      .eq(i + n.options.slidesToShow)),
              (e =
                !0 === n.options.rtl
                  ? o[0]
                    ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                    : 0
                  : o[0]
                  ? -1 * o[0].offsetLeft
                  : 0),
              !0 === n.options.centerMode &&
                ((o =
                  n.slideCount <= n.options.slidesToShow ||
                  !1 === n.options.infinite
                    ? n.$slideTrack.children(".slick-slide").eq(i)
                    : n.$slideTrack
                        .children(".slick-slide")
                        .eq(i + n.options.slidesToShow + 1)),
                (e =
                  !0 === n.options.rtl
                    ? o[0]
                      ? -1 *
                        (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                      : 0
                    : o[0]
                    ? -1 * o[0].offsetLeft
                    : 0),
                (e += (n.$list.width() - o.outerWidth()) / 2))),
            e
          );
        }),
        (e.prototype.getOption = e.prototype.slickGetOption = function (i) {
          return this.options[i];
        }),
        (e.prototype.getNavigableIndexes = function () {
          var i,
            e = this,
            t = 0,
            o = 0,
            s = [];
          for (
            !1 === e.options.infinite
              ? (i = e.slideCount)
              : ((t = -1 * e.options.slidesToScroll),
                (o = -1 * e.options.slidesToScroll),
                (i = 2 * e.slideCount));
            t < i;

          )
            s.push(t),
              (t = o + e.options.slidesToScroll),
              (o +=
                e.options.slidesToScroll <= e.options.slidesToShow
                  ? e.options.slidesToScroll
                  : e.options.slidesToShow);
          return s;
        }),
        (e.prototype.getSlick = function () {
          return this;
        }),
        (e.prototype.getSlideCount = function () {
          var e,
            t,
            o = this;
          return (
            (t =
              !0 === o.options.centerMode
                ? o.slideWidth * Math.floor(o.options.slidesToShow / 2)
                : 0),
            !0 === o.options.swipeToSlide
              ? (o.$slideTrack.find(".slick-slide").each(function (s, n) {
                  if (
                    n.offsetLeft - t + i(n).outerWidth() / 2 >
                    -1 * o.swipeLeft
                  )
                    return (e = n), !1;
                }),
                Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1)
              : o.options.slidesToScroll
          );
        }),
        (e.prototype.goTo = e.prototype.slickGoTo = function (i, e) {
          this.changeSlide(
            { data: { message: "index", index: parseInt(i) } },
            e
          );
        }),
        (e.prototype.init = function (e) {
          var t = this;
          i(t.$slider).hasClass("slick-initialized") ||
            (i(t.$slider).addClass("slick-initialized"),
            t.buildRows(),
            t.buildOut(),
            t.setProps(),
            t.startLoad(),
            t.loadSlider(),
            t.initializeEvents(),
            t.updateArrows(),
            t.updateDots(),
            t.checkResponsive(!0),
            t.focusHandler()),
            e && t.$slider.trigger("init", [t]),
            !0 === t.options.accessibility && t.initADA(),
            t.options.autoplay && ((t.paused = !1), t.autoPlay());
        }),
        (e.prototype.initADA = function () {
          var e = this,
            t = Math.ceil(e.slideCount / e.options.slidesToShow),
            o = e.getNavigableIndexes().filter(function (i) {
              return i >= 0 && i < e.slideCount;
            });
          e.$slides
            .add(e.$slideTrack.find(".slick-cloned"))
            .attr({ "aria-hidden": "true", tabindex: "-1" })
            .find("a, input, button, select")
            .attr({ tabindex: "-1" }),
            null !== e.$dots &&
              (e.$slides
                .not(e.$slideTrack.find(".slick-cloned"))
                .each(function (t) {
                  var s = o.indexOf(t);
                  i(this).attr({
                    role: "tabpanel",
                    id: "slick-slide" + e.instanceUid + t,
                    tabindex: -1,
                  }),
                    -1 !== s &&
                      i(this).attr({
                        "aria-describedby":
                          "slick-slide-control" + e.instanceUid + s,
                      });
                }),
              e.$dots
                .attr("role", "tablist")
                .find("li")
                .each(function (s) {
                  var n = o[s];
                  i(this).attr({ role: "presentation" }),
                    i(this)
                      .find("button")
                      .first()
                      .attr({
                        role: "tab",
                        id: "slick-slide-control" + e.instanceUid + s,
                        "aria-controls": "slick-slide" + e.instanceUid + n,
                        "aria-label": s + 1 + " of " + t,
                        "aria-selected": null,
                        tabindex: "-1",
                      });
                })
                .eq(e.currentSlide)
                .find("button")
                .attr({ "aria-selected": "true", tabindex: "0" })
                .end());
          for (
            var s = e.currentSlide, n = s + e.options.slidesToShow;
            s < n;
            s++
          )
            e.$slides.eq(s).attr("tabindex", 0);
          e.activateADA();
        }),
        (e.prototype.initArrowEvents = function () {
          var i = this;
          !0 === i.options.arrows &&
            i.slideCount > i.options.slidesToShow &&
            (i.$prevArrow
              .off("click.slick")
              .on("click.slick", { message: "previous" }, i.changeSlide),
            i.$nextArrow
              .off("click.slick")
              .on("click.slick", { message: "next" }, i.changeSlide),
            !0 === i.options.accessibility &&
              (i.$prevArrow.on("keydown.slick", i.keyHandler),
              i.$nextArrow.on("keydown.slick", i.keyHandler)));
        }),
        (e.prototype.initDotEvents = function () {
          var e = this;
          !0 === e.options.dots &&
            (i("li", e.$dots).on(
              "click.slick",
              { message: "index" },
              e.changeSlide
            ),
            !0 === e.options.accessibility &&
              e.$dots.on("keydown.slick", e.keyHandler)),
            !0 === e.options.dots &&
              !0 === e.options.pauseOnDotsHover &&
              i("li", e.$dots)
                .on("mouseenter.slick", i.proxy(e.interrupt, e, !0))
                .on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
        }),
        (e.prototype.initSlideEvents = function () {
          var e = this;
          e.options.pauseOnHover &&
            (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
            e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
        }),
        (e.prototype.initializeEvents = function () {
          var e = this;
          e.initArrowEvents(),
            e.initDotEvents(),
            e.initSlideEvents(),
            e.$list.on(
              "touchstart.slick mousedown.slick",
              { action: "start" },
              e.swipeHandler
            ),
            e.$list.on(
              "touchmove.slick mousemove.slick",
              { action: "move" },
              e.swipeHandler
            ),
            e.$list.on(
              "touchend.slick mouseup.slick",
              { action: "end" },
              e.swipeHandler
            ),
            e.$list.on(
              "touchcancel.slick mouseleave.slick",
              { action: "end" },
              e.swipeHandler
            ),
            e.$list.on("click.slick", e.clickHandler),
            i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
            !0 === e.options.accessibility &&
              e.$list.on("keydown.slick", e.keyHandler),
            !0 === e.options.focusOnSelect &&
              i(e.$slideTrack).children().on("click.slick", e.selectHandler),
            i(window).on(
              "orientationchange.slick.slick-" + e.instanceUid,
              i.proxy(e.orientationChange, e)
            ),
            i(window).on(
              "resize.slick.slick-" + e.instanceUid,
              i.proxy(e.resize, e)
            ),
            i("[draggable!=true]", e.$slideTrack).on(
              "dragstart",
              e.preventDefault
            ),
            i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
            i(e.setPosition);
        }),
        (e.prototype.initUI = function () {
          var i = this;
          !0 === i.options.arrows &&
            i.slideCount > i.options.slidesToShow &&
            (i.$prevArrow.show(), i.$nextArrow.show()),
            !0 === i.options.dots &&
              i.slideCount > i.options.slidesToShow &&
              i.$dots.show();
        }),
        (e.prototype.keyHandler = function (i) {
          var e = this;
          i.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
            (37 === i.keyCode && !0 === e.options.accessibility
              ? e.changeSlide({
                  data: { message: !0 === e.options.rtl ? "next" : "previous" },
                })
              : 39 === i.keyCode &&
                !0 === e.options.accessibility &&
                e.changeSlide({
                  data: { message: !0 === e.options.rtl ? "previous" : "next" },
                }));
        }),
        (e.prototype.lazyLoad = function () {
          function e(e) {
            i("img[data-lazy]", e).each(function () {
              var e = i(this),
                t = i(this).attr("data-lazy"),
                o = i(this).attr("data-srcset"),
                s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                r = document.createElement("img");
              (r.onload = function () {
                e.animate({ opacity: 0 }, 100, function () {
                  o && (e.attr("srcset", o), s && e.attr("sizes", s)),
                    e.attr("src", t).animate({ opacity: 1 }, 200, function () {
                      e.removeAttr(
                        "data-lazy data-srcset data-sizes"
                      ).removeClass("slick-loading");
                    }),
                    n.$slider.trigger("lazyLoaded", [n, e, t]);
                });
              }),
                (r.onerror = function () {
                  e
                    .removeAttr("data-lazy")
                    .removeClass("slick-loading")
                    .addClass("slick-lazyload-error"),
                    n.$slider.trigger("lazyLoadError", [n, e, t]);
                }),
                (r.src = t);
            });
          }
          var t,
            o,
            s,
            n = this;
          if (
            (!0 === n.options.centerMode
              ? !0 === n.options.infinite
                ? (s =
                    (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) +
                    n.options.slidesToShow +
                    2)
                : ((o = Math.max(
                    0,
                    n.currentSlide - (n.options.slidesToShow / 2 + 1)
                  )),
                  (s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide))
              : ((o = n.options.infinite
                  ? n.options.slidesToShow + n.currentSlide
                  : n.currentSlide),
                (s = Math.ceil(o + n.options.slidesToShow)),
                !0 === n.options.fade &&
                  (o > 0 && o--, s <= n.slideCount && s++)),
            (t = n.$slider.find(".slick-slide").slice(o, s)),
            "anticipated" === n.options.lazyLoad)
          )
            for (
              var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0;
              a < n.options.slidesToScroll;
              a++
            )
              r < 0 && (r = n.slideCount - 1),
                (t = (t = t.add(d.eq(r))).add(d.eq(l))),
                r--,
                l++;
          e(t),
            n.slideCount <= n.options.slidesToShow
              ? e(n.$slider.find(".slick-slide"))
              : n.currentSlide >= n.slideCount - n.options.slidesToShow
              ? e(
                  n.$slider
                    .find(".slick-cloned")
                    .slice(0, n.options.slidesToShow)
                )
              : 0 === n.currentSlide &&
                e(
                  n.$slider
                    .find(".slick-cloned")
                    .slice(-1 * n.options.slidesToShow)
                );
        }),
        (e.prototype.loadSlider = function () {
          var i = this;
          i.setPosition(),
            i.$slideTrack.css({ opacity: 1 }),
            i.$slider.removeClass("slick-loading"),
            i.initUI(),
            "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
        }),
        (e.prototype.next = e.prototype.slickNext = function () {
          this.changeSlide({ data: { message: "next" } });
        }),
        (e.prototype.orientationChange = function () {
          var i = this;
          i.checkResponsive(), i.setPosition();
        }),
        (e.prototype.pause = e.prototype.slickPause = function () {
          var i = this;
          i.autoPlayClear(), (i.paused = !0);
        }),
        (e.prototype.play = e.prototype.slickPlay = function () {
          var i = this;
          i.autoPlay(),
            (i.options.autoplay = !0),
            (i.paused = !1),
            (i.focussed = !1),
            (i.interrupted = !1);
        }),
        (e.prototype.postSlide = function (e) {
          var t = this;
          t.unslicked ||
            (t.$slider.trigger("afterChange", [t, e]),
            (t.animating = !1),
            t.slideCount > t.options.slidesToShow && t.setPosition(),
            (t.swipeLeft = null),
            t.options.autoplay && t.autoPlay(),
            !0 === t.options.accessibility &&
              (t.initADA(),
              t.options.focusOnChange &&
                i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
        }),
        (e.prototype.prev = e.prototype.slickPrev = function () {
          this.changeSlide({ data: { message: "previous" } });
        }),
        (e.prototype.preventDefault = function (i) {
          i.preventDefault();
        }),
        (e.prototype.progressiveLazyLoad = function (e) {
          e = e || 1;
          var t,
            o,
            s,
            n,
            r,
            l = this,
            d = i("img[data-lazy]", l.$slider);
          d.length
            ? ((t = d.first()),
              (o = t.attr("data-lazy")),
              (s = t.attr("data-srcset")),
              (n = t.attr("data-sizes") || l.$slider.attr("data-sizes")),
              ((r = document.createElement("img")).onload = function () {
                s && (t.attr("srcset", s), n && t.attr("sizes", n)),
                  t
                    .attr("src", o)
                    .removeAttr("data-lazy data-srcset data-sizes")
                    .removeClass("slick-loading"),
                  !0 === l.options.adaptiveHeight && l.setPosition(),
                  l.$slider.trigger("lazyLoaded", [l, t, o]),
                  l.progressiveLazyLoad();
              }),
              (r.onerror = function () {
                e < 3
                  ? setTimeout(function () {
                      l.progressiveLazyLoad(e + 1);
                    }, 500)
                  : (t
                      .removeAttr("data-lazy")
                      .removeClass("slick-loading")
                      .addClass("slick-lazyload-error"),
                    l.$slider.trigger("lazyLoadError", [l, t, o]),
                    l.progressiveLazyLoad());
              }),
              (r.src = o))
            : l.$slider.trigger("allImagesLoaded", [l]);
        }),
        (e.prototype.refresh = function (e) {
          var t,
            o,
            s = this;
          (o = s.slideCount - s.options.slidesToShow),
            !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
            s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
            (t = s.currentSlide),
            s.destroy(!0),
            i.extend(s, s.initials, { currentSlide: t }),
            s.init(),
            e || s.changeSlide({ data: { message: "index", index: t } }, !1);
        }),
        (e.prototype.registerBreakpoints = function () {
          var e,
            t,
            o,
            s = this,
            n = s.options.responsive || null;
          if ("array" === i.type(n) && n.length) {
            s.respondTo = s.options.respondTo || "window";
            for (e in n)
              if (((o = s.breakpoints.length - 1), n.hasOwnProperty(e))) {
                for (t = n[e].breakpoint; o >= 0; )
                  s.breakpoints[o] &&
                    s.breakpoints[o] === t &&
                    s.breakpoints.splice(o, 1),
                    o--;
                s.breakpoints.push(t),
                  (s.breakpointSettings[t] = n[e].settings);
              }
            s.breakpoints.sort(function (i, e) {
              return s.options.mobileFirst ? i - e : e - i;
            });
          }
        }),
        (e.prototype.reinit = function () {
          var e = this;
          (e.$slides = e.$slideTrack
            .children(e.options.slide)
            .addClass("slick-slide")),
            (e.slideCount = e.$slides.length),
            e.currentSlide >= e.slideCount &&
              0 !== e.currentSlide &&
              (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
            e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
            e.registerBreakpoints(),
            e.setProps(),
            e.setupInfinite(),
            e.buildArrows(),
            e.updateArrows(),
            e.initArrowEvents(),
            e.buildDots(),
            e.updateDots(),
            e.initDotEvents(),
            e.cleanUpSlideEvents(),
            e.initSlideEvents(),
            e.checkResponsive(!1, !0),
            !0 === e.options.focusOnSelect &&
              i(e.$slideTrack).children().on("click.slick", e.selectHandler),
            e.setSlideClasses(
              "number" == typeof e.currentSlide ? e.currentSlide : 0
            ),
            e.setPosition(),
            e.focusHandler(),
            (e.paused = !e.options.autoplay),
            e.autoPlay(),
            e.$slider.trigger("reInit", [e]);
        }),
        (e.prototype.resize = function () {
          var e = this;
          i(window).width() !== e.windowWidth &&
            (clearTimeout(e.windowDelay),
            (e.windowDelay = window.setTimeout(function () {
              (e.windowWidth = i(window).width()),
                e.checkResponsive(),
                e.unslicked || e.setPosition();
            }, 50)));
        }),
        (e.prototype.removeSlide = e.prototype.slickRemove = function (
          i,
          e,
          t
        ) {
          var o = this;
          if (
            ((i =
              "boolean" == typeof i
                ? !0 === (e = i)
                  ? 0
                  : o.slideCount - 1
                : !0 === e
                ? --i
                : i),
            o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
          )
            return !1;
          o.unload(),
            !0 === t
              ? o.$slideTrack.children().remove()
              : o.$slideTrack.children(this.options.slide).eq(i).remove(),
            (o.$slides = o.$slideTrack.children(this.options.slide)),
            o.$slideTrack.children(this.options.slide).detach(),
            o.$slideTrack.append(o.$slides),
            (o.$slidesCache = o.$slides),
            o.reinit();
        }),
        (e.prototype.setCSS = function (i) {
          var e,
            t,
            o = this,
            s = {};
          !0 === o.options.rtl && (i = -i),
            (e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
            (t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
            (s[o.positionProp] = i),
            !1 === o.transformsEnabled
              ? o.$slideTrack.css(s)
              : ((s = {}),
                !1 === o.cssTransitions
                  ? ((s[o.animType] = "translate(" + e + ", " + t + ")"),
                    o.$slideTrack.css(s))
                  : ((s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)"),
                    o.$slideTrack.css(s)));
        }),
        (e.prototype.setDimensions = function () {
          var i = this;
          !1 === i.options.vertical
            ? !0 === i.options.centerMode &&
              i.$list.css({ padding: "0px " + i.options.centerPadding })
            : (i.$list.height(
                i.$slides.first().outerHeight(!0) * i.options.slidesToShow
              ),
              !0 === i.options.centerMode &&
                i.$list.css({ padding: i.options.centerPadding + " 0px" })),
            (i.listWidth = i.$list.width()),
            (i.listHeight = i.$list.height()),
            !1 === i.options.vertical && !1 === i.options.variableWidth
              ? ((i.slideWidth = Math.ceil(
                  i.listWidth / i.options.slidesToShow
                )),
                i.$slideTrack.width(
                  Math.ceil(
                    i.slideWidth * i.$slideTrack.children(".slick-slide").length
                  )
                ))
              : !0 === i.options.variableWidth
              ? i.$slideTrack.width(5e3 * i.slideCount)
              : ((i.slideWidth = Math.ceil(i.listWidth)),
                i.$slideTrack.height(
                  Math.ceil(
                    i.$slides.first().outerHeight(!0) *
                      i.$slideTrack.children(".slick-slide").length
                  )
                ));
          var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
          !1 === i.options.variableWidth &&
            i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
        }),
        (e.prototype.setFade = function () {
          var e,
            t = this;
          t.$slides.each(function (o, s) {
            (e = t.slideWidth * o * -1),
              !0 === t.options.rtl
                ? i(s).css({
                    position: "relative",
                    right: e,
                    top: 0,
                    zIndex: t.options.zIndex - 2,
                    opacity: 0,
                  })
                : i(s).css({
                    position: "relative",
                    left: e,
                    top: 0,
                    zIndex: t.options.zIndex - 2,
                    opacity: 0,
                  });
          }),
            t.$slides
              .eq(t.currentSlide)
              .css({ zIndex: t.options.zIndex - 1, opacity: 1 });
        }),
        (e.prototype.setHeight = function () {
          var i = this;
          if (
            1 === i.options.slidesToShow &&
            !0 === i.options.adaptiveHeight &&
            !1 === i.options.vertical
          ) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e);
          }
        }),
        (e.prototype.setOption = e.prototype.slickSetOption = function () {
          var e,
            t,
            o,
            s,
            n,
            r = this,
            l = !1;
          if (
            ("object" === i.type(arguments[0])
              ? ((o = arguments[0]), (l = arguments[1]), (n = "multiple"))
              : "string" === i.type(arguments[0]) &&
                ((o = arguments[0]),
                (s = arguments[1]),
                (l = arguments[2]),
                "responsive" === arguments[0] &&
                "array" === i.type(arguments[1])
                  ? (n = "responsive")
                  : void 0 !== arguments[1] && (n = "single")),
            "single" === n)
          )
            r.options[o] = s;
          else if ("multiple" === n)
            i.each(o, function (i, e) {
              r.options[i] = e;
            });
          else if ("responsive" === n)
            for (t in s)
              if ("array" !== i.type(r.options.responsive))
                r.options.responsive = [s[t]];
              else {
                for (e = r.options.responsive.length - 1; e >= 0; )
                  r.options.responsive[e].breakpoint === s[t].breakpoint &&
                    r.options.responsive.splice(e, 1),
                    e--;
                r.options.responsive.push(s[t]);
              }
          l && (r.unload(), r.reinit());
        }),
        (e.prototype.setPosition = function () {
          var i = this;
          i.setDimensions(),
            i.setHeight(),
            !1 === i.options.fade
              ? i.setCSS(i.getLeft(i.currentSlide))
              : i.setFade(),
            i.$slider.trigger("setPosition", [i]);
        }),
        (e.prototype.setProps = function () {
          var i = this,
            e = document.body.style;
          (i.positionProp = !0 === i.options.vertical ? "top" : "left"),
            "top" === i.positionProp
              ? i.$slider.addClass("slick-vertical")
              : i.$slider.removeClass("slick-vertical"),
            (void 0 === e.WebkitTransition &&
              void 0 === e.MozTransition &&
              void 0 === e.msTransition) ||
              (!0 === i.options.useCSS && (i.cssTransitions = !0)),
            i.options.fade &&
              ("number" == typeof i.options.zIndex
                ? i.options.zIndex < 3 && (i.options.zIndex = 3)
                : (i.options.zIndex = i.defaults.zIndex)),
            void 0 !== e.OTransform &&
              ((i.animType = "OTransform"),
              (i.transformType = "-o-transform"),
              (i.transitionType = "OTransition"),
              void 0 === e.perspectiveProperty &&
                void 0 === e.webkitPerspective &&
                (i.animType = !1)),
            void 0 !== e.MozTransform &&
              ((i.animType = "MozTransform"),
              (i.transformType = "-moz-transform"),
              (i.transitionType = "MozTransition"),
              void 0 === e.perspectiveProperty &&
                void 0 === e.MozPerspective &&
                (i.animType = !1)),
            void 0 !== e.webkitTransform &&
              ((i.animType = "webkitTransform"),
              (i.transformType = "-webkit-transform"),
              (i.transitionType = "webkitTransition"),
              void 0 === e.perspectiveProperty &&
                void 0 === e.webkitPerspective &&
                (i.animType = !1)),
            void 0 !== e.msTransform &&
              ((i.animType = "msTransform"),
              (i.transformType = "-ms-transform"),
              (i.transitionType = "msTransition"),
              void 0 === e.msTransform && (i.animType = !1)),
            void 0 !== e.transform &&
              !1 !== i.animType &&
              ((i.animType = "transform"),
              (i.transformType = "transform"),
              (i.transitionType = "transition")),
            (i.transformsEnabled =
              i.options.useTransform &&
              null !== i.animType &&
              !1 !== i.animType);
        }),
        (e.prototype.setSlideClasses = function (i) {
          var e,
            t,
            o,
            s,
            n = this;
          if (
            ((t = n.$slider
              .find(".slick-slide")
              .removeClass("slick-active slick-center slick-current")
              .attr("aria-hidden", "true")),
            n.$slides.eq(i).addClass("slick-current"),
            !0 === n.options.centerMode)
          ) {
            var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
            (e = Math.floor(n.options.slidesToShow / 2)),
              !0 === n.options.infinite &&
                (i >= e && i <= n.slideCount - 1 - e
                  ? n.$slides
                      .slice(i - e + r, i + e + 1)
                      .addClass("slick-active")
                      .attr("aria-hidden", "false")
                  : ((o = n.options.slidesToShow + i),
                    t
                      .slice(o - e + 1 + r, o + e + 2)
                      .addClass("slick-active")
                      .attr("aria-hidden", "false")),
                0 === i
                  ? t
                      .eq(t.length - 1 - n.options.slidesToShow)
                      .addClass("slick-center")
                  : i === n.slideCount - 1 &&
                    t.eq(n.options.slidesToShow).addClass("slick-center")),
              n.$slides.eq(i).addClass("slick-center");
          } else
            i >= 0 && i <= n.slideCount - n.options.slidesToShow
              ? n.$slides
                  .slice(i, i + n.options.slidesToShow)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : t.length <= n.options.slidesToShow
              ? t.addClass("slick-active").attr("aria-hidden", "false")
              : ((s = n.slideCount % n.options.slidesToShow),
                (o =
                  !0 === n.options.infinite ? n.options.slidesToShow + i : i),
                n.options.slidesToShow == n.options.slidesToScroll &&
                n.slideCount - i < n.options.slidesToShow
                  ? t
                      .slice(o - (n.options.slidesToShow - s), o + s)
                      .addClass("slick-active")
                      .attr("aria-hidden", "false")
                  : t
                      .slice(o, o + n.options.slidesToShow)
                      .addClass("slick-active")
                      .attr("aria-hidden", "false"));
          ("ondemand" !== n.options.lazyLoad &&
            "anticipated" !== n.options.lazyLoad) ||
            n.lazyLoad();
        }),
        (e.prototype.setupInfinite = function () {
          var e,
            t,
            o,
            s = this;
          if (
            (!0 === s.options.fade && (s.options.centerMode = !1),
            !0 === s.options.infinite &&
              !1 === s.options.fade &&
              ((t = null), s.slideCount > s.options.slidesToShow))
          ) {
            for (
              o =
                !0 === s.options.centerMode
                  ? s.options.slidesToShow + 1
                  : s.options.slidesToShow,
                e = s.slideCount;
              e > s.slideCount - o;
              e -= 1
            )
              (t = e - 1),
                i(s.$slides[t])
                  .clone(!0)
                  .attr("id", "")
                  .attr("data-slick-index", t - s.slideCount)
                  .prependTo(s.$slideTrack)
                  .addClass("slick-cloned");
            for (e = 0; e < o + s.slideCount; e += 1)
              (t = e),
                i(s.$slides[t])
                  .clone(!0)
                  .attr("id", "")
                  .attr("data-slick-index", t + s.slideCount)
                  .appendTo(s.$slideTrack)
                  .addClass("slick-cloned");
            s.$slideTrack
              .find(".slick-cloned")
              .find("[id]")
              .each(function () {
                i(this).attr("id", "");
              });
          }
        }),
        (e.prototype.interrupt = function (i) {
          var e = this;
          i || e.autoPlay(), (e.interrupted = i);
        }),
        (e.prototype.selectHandler = function (e) {
          var t = this,
            o = i(e.target).is(".slick-slide")
              ? i(e.target)
              : i(e.target).parents(".slick-slide"),
            s = parseInt(o.attr("data-slick-index"));
          s || (s = 0),
            t.slideCount <= t.options.slidesToShow
              ? t.slideHandler(s, !1, !0)
              : t.slideHandler(s);
        }),
        (e.prototype.slideHandler = function (i, e, t) {
          var o,
            s,
            n,
            r,
            l,
            d = null,
            a = this;
          if (
            ((e = e || !1),
            !(
              (!0 === a.animating && !0 === a.options.waitForAnimate) ||
              (!0 === a.options.fade && a.currentSlide === i)
            ))
          )
            if (
              (!1 === e && a.asNavFor(i),
              (o = i),
              (d = a.getLeft(o)),
              (r = a.getLeft(a.currentSlide)),
              (a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft),
              !1 === a.options.infinite &&
                !1 === a.options.centerMode &&
                (i < 0 || i > a.getDotCount() * a.options.slidesToScroll))
            )
              !1 === a.options.fade &&
                ((o = a.currentSlide),
                !0 !== t
                  ? a.animateSlide(r, function () {
                      a.postSlide(o);
                    })
                  : a.postSlide(o));
            else if (
              !1 === a.options.infinite &&
              !0 === a.options.centerMode &&
              (i < 0 || i > a.slideCount - a.options.slidesToScroll)
            )
              !1 === a.options.fade &&
                ((o = a.currentSlide),
                !0 !== t
                  ? a.animateSlide(r, function () {
                      a.postSlide(o);
                    })
                  : a.postSlide(o));
            else {
              if (
                (a.options.autoplay && clearInterval(a.autoPlayTimer),
                (s =
                  o < 0
                    ? a.slideCount % a.options.slidesToScroll != 0
                      ? a.slideCount - (a.slideCount % a.options.slidesToScroll)
                      : a.slideCount + o
                    : o >= a.slideCount
                    ? a.slideCount % a.options.slidesToScroll != 0
                      ? 0
                      : o - a.slideCount
                    : o),
                (a.animating = !0),
                a.$slider.trigger("beforeChange", [a, a.currentSlide, s]),
                (n = a.currentSlide),
                (a.currentSlide = s),
                a.setSlideClasses(a.currentSlide),
                a.options.asNavFor &&
                  (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <=
                    l.options.slidesToShow &&
                  l.setSlideClasses(a.currentSlide),
                a.updateDots(),
                a.updateArrows(),
                !0 === a.options.fade)
              )
                return (
                  !0 !== t
                    ? (a.fadeSlideOut(n),
                      a.fadeSlide(s, function () {
                        a.postSlide(s);
                      }))
                    : a.postSlide(s),
                  void a.animateHeight()
                );
              !0 !== t
                ? a.animateSlide(d, function () {
                    a.postSlide(s);
                  })
                : a.postSlide(s);
            }
        }),
        (e.prototype.startLoad = function () {
          var i = this;
          !0 === i.options.arrows &&
            i.slideCount > i.options.slidesToShow &&
            (i.$prevArrow.hide(), i.$nextArrow.hide()),
            !0 === i.options.dots &&
              i.slideCount > i.options.slidesToShow &&
              i.$dots.hide(),
            i.$slider.addClass("slick-loading");
        }),
        (e.prototype.swipeDirection = function () {
          var i,
            e,
            t,
            o,
            s = this;
          return (
            (i = s.touchObject.startX - s.touchObject.curX),
            (e = s.touchObject.startY - s.touchObject.curY),
            (t = Math.atan2(e, i)),
            (o = Math.round((180 * t) / Math.PI)) < 0 &&
              (o = 360 - Math.abs(o)),
            o <= 45 && o >= 0
              ? !1 === s.options.rtl
                ? "left"
                : "right"
              : o <= 360 && o >= 315
              ? !1 === s.options.rtl
                ? "left"
                : "right"
              : o >= 135 && o <= 225
              ? !1 === s.options.rtl
                ? "right"
                : "left"
              : !0 === s.options.verticalSwiping
              ? o >= 35 && o <= 135
                ? "down"
                : "up"
              : "vertical"
          );
        }),
        (e.prototype.swipeEnd = function (i) {
          var e,
            t,
            o = this;
          if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
            return (o.scrolling = !1), !1;
          if (
            ((o.interrupted = !1),
            (o.shouldClick = !(o.touchObject.swipeLength > 10)),
            void 0 === o.touchObject.curX)
          )
            return !1;
          if (
            (!0 === o.touchObject.edgeHit &&
              o.$slider.trigger("edge", [o, o.swipeDirection()]),
            o.touchObject.swipeLength >= o.touchObject.minSwipe)
          ) {
            switch ((t = o.swipeDirection())) {
              case "left":
              case "down":
                (e = o.options.swipeToSlide
                  ? o.checkNavigable(o.currentSlide + o.getSlideCount())
                  : o.currentSlide + o.getSlideCount()),
                  (o.currentDirection = 0);
                break;
              case "right":
              case "up":
                (e = o.options.swipeToSlide
                  ? o.checkNavigable(o.currentSlide - o.getSlideCount())
                  : o.currentSlide - o.getSlideCount()),
                  (o.currentDirection = 1);
            }
            "vertical" != t &&
              (o.slideHandler(e),
              (o.touchObject = {}),
              o.$slider.trigger("swipe", [o, t]));
          } else
            o.touchObject.startX !== o.touchObject.curX &&
              (o.slideHandler(o.currentSlide), (o.touchObject = {}));
        }),
        (e.prototype.swipeHandler = function (i) {
          var e = this;
          if (
            !(
              !1 === e.options.swipe ||
              ("ontouchend" in document && !1 === e.options.swipe) ||
              (!1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))
            )
          )
            switch (
              ((e.touchObject.fingerCount =
                i.originalEvent && void 0 !== i.originalEvent.touches
                  ? i.originalEvent.touches.length
                  : 1),
              (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
              !0 === e.options.verticalSwiping &&
                (e.touchObject.minSwipe =
                  e.listHeight / e.options.touchThreshold),
              i.data.action)
            ) {
              case "start":
                e.swipeStart(i);
                break;
              case "move":
                e.swipeMove(i);
                break;
              case "end":
                e.swipeEnd(i);
            }
        }),
        (e.prototype.swipeMove = function (i) {
          var e,
            t,
            o,
            s,
            n,
            r,
            l = this;
          return (
            (n = void 0 !== i.originalEvent ? i.originalEvent.touches : null),
            !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
              ((e = l.getLeft(l.currentSlide)),
              (l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX),
              (l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY),
              (l.touchObject.swipeLength = Math.round(
                Math.sqrt(
                  Math.pow(l.touchObject.curX - l.touchObject.startX, 2)
                )
              )),
              (r = Math.round(
                Math.sqrt(
                  Math.pow(l.touchObject.curY - l.touchObject.startY, 2)
                )
              )),
              !l.options.verticalSwiping && !l.swiping && r > 4
                ? ((l.scrolling = !0), !1)
                : (!0 === l.options.verticalSwiping &&
                    (l.touchObject.swipeLength = r),
                  (t = l.swipeDirection()),
                  void 0 !== i.originalEvent &&
                    l.touchObject.swipeLength > 4 &&
                    ((l.swiping = !0), i.preventDefault()),
                  (s =
                    (!1 === l.options.rtl ? 1 : -1) *
                    (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
                  !0 === l.options.verticalSwiping &&
                    (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
                  (o = l.touchObject.swipeLength),
                  (l.touchObject.edgeHit = !1),
                  !1 === l.options.infinite &&
                    ((0 === l.currentSlide && "right" === t) ||
                      (l.currentSlide >= l.getDotCount() && "left" === t)) &&
                    ((o = l.touchObject.swipeLength * l.options.edgeFriction),
                    (l.touchObject.edgeHit = !0)),
                  !1 === l.options.vertical
                    ? (l.swipeLeft = e + o * s)
                    : (l.swipeLeft =
                        e + o * (l.$list.height() / l.listWidth) * s),
                  !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s),
                  !0 !== l.options.fade &&
                    !1 !== l.options.touchMove &&
                    (!0 === l.animating
                      ? ((l.swipeLeft = null), !1)
                      : void l.setCSS(l.swipeLeft))))
          );
        }),
        (e.prototype.swipeStart = function (i) {
          var e,
            t = this;
          if (
            ((t.interrupted = !0),
            1 !== t.touchObject.fingerCount ||
              t.slideCount <= t.options.slidesToShow)
          )
            return (t.touchObject = {}), !1;
          void 0 !== i.originalEvent &&
            void 0 !== i.originalEvent.touches &&
            (e = i.originalEvent.touches[0]),
            (t.touchObject.startX = t.touchObject.curX =
              void 0 !== e ? e.pageX : i.clientX),
            (t.touchObject.startY = t.touchObject.curY =
              void 0 !== e ? e.pageY : i.clientY),
            (t.dragging = !0);
        }),
        (e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
          var i = this;
          null !== i.$slidesCache &&
            (i.unload(),
            i.$slideTrack.children(this.options.slide).detach(),
            i.$slidesCache.appendTo(i.$slideTrack),
            i.reinit());
        }),
        (e.prototype.unload = function () {
          var e = this;
          i(".slick-cloned", e.$slider).remove(),
            e.$dots && e.$dots.remove(),
            e.$prevArrow &&
              e.htmlExpr.test(e.options.prevArrow) &&
              e.$prevArrow.remove(),
            e.$nextArrow &&
              e.htmlExpr.test(e.options.nextArrow) &&
              e.$nextArrow.remove(),
            e.$slides
              .removeClass(
                "slick-slide slick-active slick-visible slick-current"
              )
              .attr("aria-hidden", "true")
              .css("width", "");
        }),
        (e.prototype.unslick = function (i) {
          var e = this;
          e.$slider.trigger("unslick", [e, i]), e.destroy();
        }),
        (e.prototype.updateArrows = function () {
          var i = this;
          Math.floor(i.options.slidesToShow / 2),
            !0 === i.options.arrows &&
              i.slideCount > i.options.slidesToShow &&
              !i.options.infinite &&
              (i.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"),
              i.$nextArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"),
              0 === i.currentSlide
                ? (i.$prevArrow
                    .addClass("slick-disabled")
                    .attr("aria-disabled", "true"),
                  i.$nextArrow
                    .removeClass("slick-disabled")
                    .attr("aria-disabled", "false"))
                : i.currentSlide >= i.slideCount - i.options.slidesToShow &&
                  !1 === i.options.centerMode
                ? (i.$nextArrow
                    .addClass("slick-disabled")
                    .attr("aria-disabled", "true"),
                  i.$prevArrow
                    .removeClass("slick-disabled")
                    .attr("aria-disabled", "false"))
                : i.currentSlide >= i.slideCount - 1 &&
                  !0 === i.options.centerMode &&
                  (i.$nextArrow
                    .addClass("slick-disabled")
                    .attr("aria-disabled", "true"),
                  i.$prevArrow
                    .removeClass("slick-disabled")
                    .attr("aria-disabled", "false")));
        }),
        (e.prototype.updateDots = function () {
          var i = this;
          null !== i.$dots &&
            (i.$dots.find("li").removeClass("slick-active").end(),
            i.$dots
              .find("li")
              .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
              .addClass("slick-active"));
        }),
        (e.prototype.visibility = function () {
          var i = this;
          i.options.autoplay &&
            (document[i.hidden] ? (i.interrupted = !0) : (i.interrupted = !1));
        }),
        (i.fn.slick = function () {
          var i,
            t,
            o = this,
            s = arguments[0],
            n = Array.prototype.slice.call(arguments, 1),
            r = o.length;
          for (i = 0; i < r; i++)
            if (
              ("object" == typeof s || void 0 === s
                ? (o[i].slick = new e(o[i], s))
                : (t = o[i].slick[s].apply(o[i].slick, n)),
              void 0 !== t)
            )
              return t;
          return o;
        });
    });
    //Masonry
    !(function (t, e) {
      "function" == typeof define && define.amd
        ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
            return e(t, i);
          })
        : "object" == typeof module && module.exports
        ? (module.exports = e(t, require("jquery")))
        : (t.jQueryBridget = e(t, t.jQuery));
    })(window, function (t, e) {
      "use strict";
      function i(i, r, a) {
        function h(t, e, n) {
          var o,
            r = "$()." + i + '("' + e + '")';
          return (
            t.each(function (t, h) {
              var u = a.data(h, i);
              if (!u)
                return void s(
                  i + " not initialized. Cannot call methods, i.e. " + r
                );
              var d = u[e];
              if (!d || "_" == e.charAt(0))
                return void s(r + " is not a valid method");
              var l = d.apply(u, n);
              o = void 0 === o ? l : o;
            }),
            void 0 !== o ? o : t
          );
        }
        function u(t, e) {
          t.each(function (t, n) {
            var o = a.data(n, i);
            o ? (o.option(e), o._init()) : ((o = new r(n, e)), a.data(n, i, o));
          });
        }
        (a = a || e || t.jQuery),
          a &&
            (r.prototype.option ||
              (r.prototype.option = function (t) {
                a.isPlainObject(t) &&
                  (this.options = a.extend(!0, this.options, t));
              }),
            (a.fn[i] = function (t) {
              if ("string" == typeof t) {
                var e = o.call(arguments, 1);
                return h(this, t, e);
              }
              return u(this, t), this;
            }),
            n(a));
      }
      function n(t) {
        !t || (t && t.bridget) || (t.bridget = i);
      }
      var o = Array.prototype.slice,
        r = t.console,
        s =
          "undefined" == typeof r
            ? function () {}
            : function (t) {
                r.error(t);
              };
      return n(e || t.jQuery), i;
    }),
      (function (t, e) {
        "function" == typeof define && define.amd
          ? define("ev-emitter/ev-emitter", e)
          : "object" == typeof module && module.exports
          ? (module.exports = e())
          : (t.EvEmitter = e());
      })("undefined" != typeof window ? window : this, function () {
        function t() {}
        var e = t.prototype;
        return (
          (e.on = function (t, e) {
            if (t && e) {
              var i = (this._events = this._events || {}),
                n = (i[t] = i[t] || []);
              return -1 == n.indexOf(e) && n.push(e), this;
            }
          }),
          (e.once = function (t, e) {
            if (t && e) {
              this.on(t, e);
              var i = (this._onceEvents = this._onceEvents || {}),
                n = (i[t] = i[t] || {});
              return (n[e] = !0), this;
            }
          }),
          (e.off = function (t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
              var n = i.indexOf(e);
              return -1 != n && i.splice(n, 1), this;
            }
          }),
          (e.emitEvent = function (t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
              (i = i.slice(0)), (e = e || []);
              for (
                var n = this._onceEvents && this._onceEvents[t], o = 0;
                o < i.length;
                o++
              ) {
                var r = i[o],
                  s = n && n[r];
                s && (this.off(t, r), delete n[r]), r.apply(this, e);
              }
              return this;
            }
          }),
          (e.allOff = function () {
            delete this._events, delete this._onceEvents;
          }),
          t
        );
      }),
      (function (t, e) {
        "function" == typeof define && define.amd
          ? define("get-size/get-size", e)
          : "object" == typeof module && module.exports
          ? (module.exports = e())
          : (t.getSize = e());
      })(window, function () {
        "use strict";
        function t(t) {
          var e = parseFloat(t),
            i = -1 == t.indexOf("%") && !isNaN(e);
          return i && e;
        }
        function e() {}
        function i() {
          for (
            var t = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0,
              },
              e = 0;
            u > e;
            e++
          ) {
            var i = h[e];
            t[i] = 0;
          }
          return t;
        }
        function n(t) {
          var e = getComputedStyle(t);
          return (
            e ||
              a(
                "Style returned " +
                  e +
                  ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"
              ),
            e
          );
        }
        function o() {
          if (!d) {
            d = !0;
            var e = document.createElement("div");
            (e.style.width = "200px"),
              (e.style.padding = "1px 2px 3px 4px"),
              (e.style.borderStyle = "solid"),
              (e.style.borderWidth = "1px 2px 3px 4px"),
              (e.style.boxSizing = "border-box");
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var o = n(e);
            (s = 200 == Math.round(t(o.width))),
              (r.isBoxSizeOuter = s),
              i.removeChild(e);
          }
        }
        function r(e) {
          if (
            (o(),
            "string" == typeof e && (e = document.querySelector(e)),
            e && "object" == typeof e && e.nodeType)
          ) {
            var r = n(e);
            if ("none" == r.display) return i();
            var a = {};
            (a.width = e.offsetWidth), (a.height = e.offsetHeight);
            for (
              var d = (a.isBorderBox = "border-box" == r.boxSizing), l = 0;
              u > l;
              l++
            ) {
              var c = h[l],
                f = r[c],
                m = parseFloat(f);
              a[c] = isNaN(m) ? 0 : m;
            }
            var p = a.paddingLeft + a.paddingRight,
              g = a.paddingTop + a.paddingBottom,
              y = a.marginLeft + a.marginRight,
              v = a.marginTop + a.marginBottom,
              _ = a.borderLeftWidth + a.borderRightWidth,
              z = a.borderTopWidth + a.borderBottomWidth,
              E = d && s,
              b = t(r.width);
            b !== !1 && (a.width = b + (E ? 0 : p + _));
            var x = t(r.height);
            return (
              x !== !1 && (a.height = x + (E ? 0 : g + z)),
              (a.innerWidth = a.width - (p + _)),
              (a.innerHeight = a.height - (g + z)),
              (a.outerWidth = a.width + y),
              (a.outerHeight = a.height + v),
              a
            );
          }
        }
        var s,
          a =
            "undefined" == typeof console
              ? e
              : function (t) {
                  console.error(t);
                },
          h = [
            "paddingLeft",
            "paddingRight",
            "paddingTop",
            "paddingBottom",
            "marginLeft",
            "marginRight",
            "marginTop",
            "marginBottom",
            "borderLeftWidth",
            "borderRightWidth",
            "borderTopWidth",
            "borderBottomWidth",
          ],
          u = h.length,
          d = !1;
        return r;
      }),
      (function (t, e) {
        "use strict";
        "function" == typeof define && define.amd
          ? define("desandro-matches-selector/matches-selector", e)
          : "object" == typeof module && module.exports
          ? (module.exports = e())
          : (t.matchesSelector = e());
      })(window, function () {
        "use strict";
        var t = (function () {
          var t = window.Element.prototype;
          if (t.matches) return "matches";
          if (t.matchesSelector) return "matchesSelector";
          for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var n = e[i],
              o = n + "MatchesSelector";
            if (t[o]) return o;
          }
        })();
        return function (e, i) {
          return e[t](i);
        };
      }),
      (function (t, e) {
        "function" == typeof define && define.amd
          ? define("fizzy-ui-utils/utils", [
              "desandro-matches-selector/matches-selector",
            ], function (i) {
              return e(t, i);
            })
          : "object" == typeof module && module.exports
          ? (module.exports = e(t, require("desandro-matches-selector")))
          : (t.fizzyUIUtils = e(t, t.matchesSelector));
      })(window, function (t, e) {
        var i = {};
        (i.extend = function (t, e) {
          for (var i in e) t[i] = e[i];
          return t;
        }),
          (i.modulo = function (t, e) {
            return ((t % e) + e) % e;
          });
        var n = Array.prototype.slice;
        (i.makeArray = function (t) {
          if (Array.isArray(t)) return t;
          if (null === t || void 0 === t) return [];
          var e = "object" == typeof t && "number" == typeof t.length;
          return e ? n.call(t) : [t];
        }),
          (i.removeFrom = function (t, e) {
            var i = t.indexOf(e);
            -1 != i && t.splice(i, 1);
          }),
          (i.getParent = function (t, i) {
            for (; t.parentNode && t != document.body; )
              if (((t = t.parentNode), e(t, i))) return t;
          }),
          (i.getQueryElement = function (t) {
            return "string" == typeof t ? document.querySelector(t) : t;
          }),
          (i.handleEvent = function (t) {
            var e = "on" + t.type;
            this[e] && this[e](t);
          }),
          (i.filterFindElements = function (t, n) {
            t = i.makeArray(t);
            var o = [];
            return (
              t.forEach(function (t) {
                if (t instanceof HTMLElement) {
                  if (!n) return void o.push(t);
                  e(t, n) && o.push(t);
                  for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++)
                    o.push(i[r]);
                }
              }),
              o
            );
          }),
          (i.debounceMethod = function (t, e, i) {
            i = i || 100;
            var n = t.prototype[e],
              o = e + "Timeout";
            t.prototype[e] = function () {
              var t = this[o];
              clearTimeout(t);
              var e = arguments,
                r = this;
              this[o] = setTimeout(function () {
                n.apply(r, e), delete r[o];
              }, i);
            };
          }),
          (i.docReady = function (t) {
            var e = document.readyState;
            "complete" == e || "interactive" == e
              ? setTimeout(t)
              : document.addEventListener("DOMContentLoaded", t);
          }),
          (i.toDashed = function (t) {
            return t
              .replace(/(.)([A-Z])/g, function (t, e, i) {
                return e + "-" + i;
              })
              .toLowerCase();
          });
        var o = t.console;
        return (
          (i.htmlInit = function (e, n) {
            i.docReady(function () {
              var r = i.toDashed(n),
                s = "data-" + r,
                a = document.querySelectorAll("[" + s + "]"),
                h = document.querySelectorAll(".js-" + r),
                u = i.makeArray(a).concat(i.makeArray(h)),
                d = s + "-options",
                l = t.jQuery;
              u.forEach(function (t) {
                var i,
                  r = t.getAttribute(s) || t.getAttribute(d);
                try {
                  i = r && JSON.parse(r);
                } catch (a) {
                  return void (
                    o &&
                    o.error(
                      "Error parsing " + s + " on " + t.className + ": " + a
                    )
                  );
                }
                var h = new e(t, i);
                l && l.data(t, n, h);
              });
            });
          }),
          i
        );
      }),
      (function (t, e) {
        "function" == typeof define && define.amd
          ? define("outlayer/item", [
              "ev-emitter/ev-emitter",
              "get-size/get-size",
            ], e)
          : "object" == typeof module && module.exports
          ? (module.exports = e(require("ev-emitter"), require("get-size")))
          : ((t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize)));
      })(window, function (t, e) {
        "use strict";
        function i(t) {
          for (var e in t) return !1;
          return (e = null), !0;
        }
        function n(t, e) {
          t &&
            ((this.element = t),
            (this.layout = e),
            (this.position = { x: 0, y: 0 }),
            this._create());
        }
        function o(t) {
          return t.replace(/([A-Z])/g, function (t) {
            return "-" + t.toLowerCase();
          });
        }
        var r = document.documentElement.style,
          s =
            "string" == typeof r.transition ? "transition" : "WebkitTransition",
          a = "string" == typeof r.transform ? "transform" : "WebkitTransform",
          h = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend",
          }[s],
          u = {
            transform: a,
            transition: s,
            transitionDuration: s + "Duration",
            transitionProperty: s + "Property",
            transitionDelay: s + "Delay",
          },
          d = (n.prototype = Object.create(t.prototype));
        (d.constructor = n),
          (d._create = function () {
            (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
              this.css({ position: "absolute" });
          }),
          (d.handleEvent = function (t) {
            var e = "on" + t.type;
            this[e] && this[e](t);
          }),
          (d.getSize = function () {
            this.size = e(this.element);
          }),
          (d.css = function (t) {
            var e = this.element.style;
            for (var i in t) {
              var n = u[i] || i;
              e[n] = t[i];
            }
          }),
          (d.getPosition = function () {
            var t = getComputedStyle(this.element),
              e = this.layout._getOption("originLeft"),
              i = this.layout._getOption("originTop"),
              n = t[e ? "left" : "right"],
              o = t[i ? "top" : "bottom"],
              r = parseFloat(n),
              s = parseFloat(o),
              a = this.layout.size;
            -1 != n.indexOf("%") && (r = (r / 100) * a.width),
              -1 != o.indexOf("%") && (s = (s / 100) * a.height),
              (r = isNaN(r) ? 0 : r),
              (s = isNaN(s) ? 0 : s),
              (r -= e ? a.paddingLeft : a.paddingRight),
              (s -= i ? a.paddingTop : a.paddingBottom),
              (this.position.x = r),
              (this.position.y = s);
          }),
          (d.layoutPosition = function () {
            var t = this.layout.size,
              e = {},
              i = this.layout._getOption("originLeft"),
              n = this.layout._getOption("originTop"),
              o = i ? "paddingLeft" : "paddingRight",
              r = i ? "left" : "right",
              s = i ? "right" : "left",
              a = this.position.x + t[o];
            (e[r] = this.getXValue(a)), (e[s] = "");
            var h = n ? "paddingTop" : "paddingBottom",
              u = n ? "top" : "bottom",
              d = n ? "bottom" : "top",
              l = this.position.y + t[h];
            (e[u] = this.getYValue(l)),
              (e[d] = ""),
              this.css(e),
              this.emitEvent("layout", [this]);
          }),
          (d.getXValue = function (t) {
            var e = this.layout._getOption("horizontal");
            return this.layout.options.percentPosition && !e
              ? (t / this.layout.size.width) * 100 + "%"
              : t + "px";
          }),
          (d.getYValue = function (t) {
            var e = this.layout._getOption("horizontal");
            return this.layout.options.percentPosition && e
              ? (t / this.layout.size.height) * 100 + "%"
              : t + "px";
          }),
          (d._transitionTo = function (t, e) {
            this.getPosition();
            var i = this.position.x,
              n = this.position.y,
              o = t == this.position.x && e == this.position.y;
            if ((this.setPosition(t, e), o && !this.isTransitioning))
              return void this.layoutPosition();
            var r = t - i,
              s = e - n,
              a = {};
            (a.transform = this.getTranslate(r, s)),
              this.transition({
                to: a,
                onTransitionEnd: { transform: this.layoutPosition },
                isCleaning: !0,
              });
          }),
          (d.getTranslate = function (t, e) {
            var i = this.layout._getOption("originLeft"),
              n = this.layout._getOption("originTop");
            return (
              (t = i ? t : -t),
              (e = n ? e : -e),
              "translate3d(" + t + "px, " + e + "px, 0)"
            );
          }),
          (d.goTo = function (t, e) {
            this.setPosition(t, e), this.layoutPosition();
          }),
          (d.moveTo = d._transitionTo),
          (d.setPosition = function (t, e) {
            (this.position.x = parseFloat(t)),
              (this.position.y = parseFloat(e));
          }),
          (d._nonTransition = function (t) {
            this.css(t.to), t.isCleaning && this._removeStyles(t.to);
            for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
          }),
          (d.transition = function (t) {
            if (!parseFloat(this.layout.options.transitionDuration))
              return void this._nonTransition(t);
            var e = this._transn;
            for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
            for (i in t.to)
              (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
            if (t.from) {
              this.css(t.from);
              var n = this.element.offsetHeight;
              n = null;
            }
            this.enableTransition(t.to),
              this.css(t.to),
              (this.isTransitioning = !0);
          });
        var l = "opacity," + o(a);
        (d.enableTransition = function () {
          if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            (t = "number" == typeof t ? t + "ms" : t),
              this.css({
                transitionProperty: l,
                transitionDuration: t,
                transitionDelay: this.staggerDelay || 0,
              }),
              this.element.addEventListener(h, this, !1);
          }
        }),
          (d.onwebkitTransitionEnd = function (t) {
            this.ontransitionend(t);
          }),
          (d.onotransitionend = function (t) {
            this.ontransitionend(t);
          });
        var c = { "-webkit-transform": "transform" };
        (d.ontransitionend = function (t) {
          if (t.target === this.element) {
            var e = this._transn,
              n = c[t.propertyName] || t.propertyName;
            if (
              (delete e.ingProperties[n],
              i(e.ingProperties) && this.disableTransition(),
              n in e.clean &&
                ((this.element.style[t.propertyName] = ""), delete e.clean[n]),
              n in e.onEnd)
            ) {
              var o = e.onEnd[n];
              o.call(this), delete e.onEnd[n];
            }
            this.emitEvent("transitionEnd", [this]);
          }
        }),
          (d.disableTransition = function () {
            this.removeTransitionStyles(),
              this.element.removeEventListener(h, this, !1),
              (this.isTransitioning = !1);
          }),
          (d._removeStyles = function (t) {
            var e = {};
            for (var i in t) e[i] = "";
            this.css(e);
          });
        var f = {
          transitionProperty: "",
          transitionDuration: "",
          transitionDelay: "",
        };
        return (
          (d.removeTransitionStyles = function () {
            this.css(f);
          }),
          (d.stagger = function (t) {
            (t = isNaN(t) ? 0 : t), (this.staggerDelay = t + "ms");
          }),
          (d.removeElem = function () {
            this.element.parentNode.removeChild(this.element),
              this.css({ display: "" }),
              this.emitEvent("remove", [this]);
          }),
          (d.remove = function () {
            return s && parseFloat(this.layout.options.transitionDuration)
              ? (this.once("transitionEnd", function () {
                  this.removeElem();
                }),
                void this.hide())
              : void this.removeElem();
          }),
          (d.reveal = function () {
            delete this.isHidden, this.css({ display: "" });
            var t = this.layout.options,
              e = {},
              i = this.getHideRevealTransitionEndProperty("visibleStyle");
            (e[i] = this.onRevealTransitionEnd),
              this.transition({
                from: t.hiddenStyle,
                to: t.visibleStyle,
                isCleaning: !0,
                onTransitionEnd: e,
              });
          }),
          (d.onRevealTransitionEnd = function () {
            this.isHidden || this.emitEvent("reveal");
          }),
          (d.getHideRevealTransitionEndProperty = function (t) {
            var e = this.layout.options[t];
            if (e.opacity) return "opacity";
            for (var i in e) return i;
          }),
          (d.hide = function () {
            (this.isHidden = !0), this.css({ display: "" });
            var t = this.layout.options,
              e = {},
              i = this.getHideRevealTransitionEndProperty("hiddenStyle");
            (e[i] = this.onHideTransitionEnd),
              this.transition({
                from: t.visibleStyle,
                to: t.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: e,
              });
          }),
          (d.onHideTransitionEnd = function () {
            this.isHidden &&
              (this.css({ display: "none" }), this.emitEvent("hide"));
          }),
          (d.destroy = function () {
            this.css({
              position: "",
              left: "",
              right: "",
              top: "",
              bottom: "",
              transition: "",
              transform: "",
            });
          }),
          n
        );
      }),
      (function (t, e) {
        "use strict";
        "function" == typeof define && define.amd
          ? define("outlayer/outlayer", [
              "ev-emitter/ev-emitter",
              "get-size/get-size",
              "fizzy-ui-utils/utils",
              "./item",
            ], function (i, n, o, r) {
              return e(t, i, n, o, r);
            })
          : "object" == typeof module && module.exports
          ? (module.exports = e(
              t,
              require("ev-emitter"),
              require("get-size"),
              require("fizzy-ui-utils"),
              require("./item")
            ))
          : (t.Outlayer = e(
              t,
              t.EvEmitter,
              t.getSize,
              t.fizzyUIUtils,
              t.Outlayer.Item
            ));
      })(window, function (t, e, i, n, o) {
        "use strict";
        function r(t, e) {
          var i = n.getQueryElement(t);
          if (!i)
            return void (
              h &&
              h.error(
                "Bad element for " +
                  this.constructor.namespace +
                  ": " +
                  (i || t)
              )
            );
          (this.element = i),
            u && (this.$element = u(this.element)),
            (this.options = n.extend({}, this.constructor.defaults)),
            this.option(e);
          var o = ++l;
          (this.element.outlayerGUID = o), (c[o] = this), this._create();
          var r = this._getOption("initLayout");
          r && this.layout();
        }
        function s(t) {
          function e() {
            t.apply(this, arguments);
          }
          return (
            (e.prototype = Object.create(t.prototype)),
            (e.prototype.constructor = e),
            e
          );
        }
        function a(t) {
          if ("number" == typeof t) return t;
          var e = t.match(/(^\d*\.?\d*)(\w*)/),
            i = e && e[1],
            n = e && e[2];
          if (!i.length) return 0;
          i = parseFloat(i);
          var o = m[n] || 1;
          return i * o;
        }
        var h = t.console,
          u = t.jQuery,
          d = function () {},
          l = 0,
          c = {};
        (r.namespace = "outlayer"),
          (r.Item = o),
          (r.defaults = {
            containerStyle: { position: "relative" },
            initLayout: !0,
            originLeft: !0,
            originTop: !0,
            resize: !0,
            resizeContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
            visibleStyle: { opacity: 1, transform: "scale(1)" },
          });
        var f = r.prototype;
        n.extend(f, e.prototype),
          (f.option = function (t) {
            n.extend(this.options, t);
          }),
          (f._getOption = function (t) {
            var e = this.constructor.compatOptions[t];
            return e && void 0 !== this.options[e]
              ? this.options[e]
              : this.options[t];
          }),
          (r.compatOptions = {
            initLayout: "isInitLayout",
            horizontal: "isHorizontal",
            layoutInstant: "isLayoutInstant",
            originLeft: "isOriginLeft",
            originTop: "isOriginTop",
            resize: "isResizeBound",
            resizeContainer: "isResizingContainer",
          }),
          (f._create = function () {
            this.reloadItems(),
              (this.stamps = []),
              this.stamp(this.options.stamp),
              n.extend(this.element.style, this.options.containerStyle);
            var t = this._getOption("resize");
            t && this.bindResize();
          }),
          (f.reloadItems = function () {
            this.items = this._itemize(this.element.children);
          }),
          (f._itemize = function (t) {
            for (
              var e = this._filterFindItemElements(t),
                i = this.constructor.Item,
                n = [],
                o = 0;
              o < e.length;
              o++
            ) {
              var r = e[o],
                s = new i(r, this);
              n.push(s);
            }
            return n;
          }),
          (f._filterFindItemElements = function (t) {
            return n.filterFindElements(t, this.options.itemSelector);
          }),
          (f.getItemElements = function () {
            return this.items.map(function (t) {
              return t.element;
            });
          }),
          (f.layout = function () {
            this._resetLayout(), this._manageStamps();
            var t = this._getOption("layoutInstant"),
              e = void 0 !== t ? t : !this._isLayoutInited;
            this.layoutItems(this.items, e), (this._isLayoutInited = !0);
          }),
          (f._init = f.layout),
          (f._resetLayout = function () {
            this.getSize();
          }),
          (f.getSize = function () {
            this.size = i(this.element);
          }),
          (f._getMeasurement = function (t, e) {
            var n,
              o = this.options[t];
            o
              ? ("string" == typeof o
                  ? (n = this.element.querySelector(o))
                  : o instanceof HTMLElement && (n = o),
                (this[t] = n ? i(n)[e] : o))
              : (this[t] = 0);
          }),
          (f.layoutItems = function (t, e) {
            (t = this._getItemsForLayout(t)),
              this._layoutItems(t, e),
              this._postLayout();
          }),
          (f._getItemsForLayout = function (t) {
            return t.filter(function (t) {
              return !t.isIgnored;
            });
          }),
          (f._layoutItems = function (t, e) {
            if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
              var i = [];
              t.forEach(function (t) {
                var n = this._getItemLayoutPosition(t);
                (n.item = t), (n.isInstant = e || t.isLayoutInstant), i.push(n);
              }, this),
                this._processLayoutQueue(i);
            }
          }),
          (f._getItemLayoutPosition = function () {
            return { x: 0, y: 0 };
          }),
          (f._processLayoutQueue = function (t) {
            this.updateStagger(),
              t.forEach(function (t, e) {
                this._positionItem(t.item, t.x, t.y, t.isInstant, e);
              }, this);
          }),
          (f.updateStagger = function () {
            var t = this.options.stagger;
            return null === t || void 0 === t
              ? void (this.stagger = 0)
              : ((this.stagger = a(t)), this.stagger);
          }),
          (f._positionItem = function (t, e, i, n, o) {
            n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i));
          }),
          (f._postLayout = function () {
            this.resizeContainer();
          }),
          (f.resizeContainer = function () {
            var t = this._getOption("resizeContainer");
            if (t) {
              var e = this._getContainerSize();
              e &&
                (this._setContainerMeasure(e.width, !0),
                this._setContainerMeasure(e.height, !1));
            }
          }),
          (f._getContainerSize = d),
          (f._setContainerMeasure = function (t, e) {
            if (void 0 !== t) {
              var i = this.size;
              i.isBorderBox &&
                (t += e
                  ? i.paddingLeft +
                    i.paddingRight +
                    i.borderLeftWidth +
                    i.borderRightWidth
                  : i.paddingBottom +
                    i.paddingTop +
                    i.borderTopWidth +
                    i.borderBottomWidth),
                (t = Math.max(t, 0)),
                (this.element.style[e ? "width" : "height"] = t + "px");
            }
          }),
          (f._emitCompleteOnItems = function (t, e) {
            function i() {
              o.dispatchEvent(t + "Complete", null, [e]);
            }
            function n() {
              s++, s == r && i();
            }
            var o = this,
              r = e.length;
            if (!e || !r) return void i();
            var s = 0;
            e.forEach(function (e) {
              e.once(t, n);
            });
          }),
          (f.dispatchEvent = function (t, e, i) {
            var n = e ? [e].concat(i) : i;
            if ((this.emitEvent(t, n), u))
              if (((this.$element = this.$element || u(this.element)), e)) {
                var o = u.Event(e);
                (o.type = t), this.$element.trigger(o, i);
              } else this.$element.trigger(t, i);
          }),
          (f.ignore = function (t) {
            var e = this.getItem(t);
            e && (e.isIgnored = !0);
          }),
          (f.unignore = function (t) {
            var e = this.getItem(t);
            e && delete e.isIgnored;
          }),
          (f.stamp = function (t) {
            (t = this._find(t)),
              t &&
                ((this.stamps = this.stamps.concat(t)),
                t.forEach(this.ignore, this));
          }),
          (f.unstamp = function (t) {
            (t = this._find(t)),
              t &&
                t.forEach(function (t) {
                  n.removeFrom(this.stamps, t), this.unignore(t);
                }, this);
          }),
          (f._find = function (t) {
            return t
              ? ("string" == typeof t && (t = this.element.querySelectorAll(t)),
                (t = n.makeArray(t)))
              : void 0;
          }),
          (f._manageStamps = function () {
            this.stamps &&
              this.stamps.length &&
              (this._getBoundingRect(),
              this.stamps.forEach(this._manageStamp, this));
          }),
          (f._getBoundingRect = function () {
            var t = this.element.getBoundingClientRect(),
              e = this.size;
            this._boundingRect = {
              left: t.left + e.paddingLeft + e.borderLeftWidth,
              top: t.top + e.paddingTop + e.borderTopWidth,
              right: t.right - (e.paddingRight + e.borderRightWidth),
              bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
            };
          }),
          (f._manageStamp = d),
          (f._getElementOffset = function (t) {
            var e = t.getBoundingClientRect(),
              n = this._boundingRect,
              o = i(t),
              r = {
                left: e.left - n.left - o.marginLeft,
                top: e.top - n.top - o.marginTop,
                right: n.right - e.right - o.marginRight,
                bottom: n.bottom - e.bottom - o.marginBottom,
              };
            return r;
          }),
          (f.handleEvent = n.handleEvent),
          (f.bindResize = function () {
            t.addEventListener("resize", this), (this.isResizeBound = !0);
          }),
          (f.unbindResize = function () {
            t.removeEventListener("resize", this), (this.isResizeBound = !1);
          }),
          (f.onresize = function () {
            this.resize();
          }),
          n.debounceMethod(r, "onresize", 100),
          (f.resize = function () {
            this.isResizeBound && this.needsResizeLayout() && this.layout();
          }),
          (f.needsResizeLayout = function () {
            var t = i(this.element),
              e = this.size && t;
            return e && t.innerWidth !== this.size.innerWidth;
          }),
          (f.addItems = function (t) {
            var e = this._itemize(t);
            return e.length && (this.items = this.items.concat(e)), e;
          }),
          (f.appended = function (t) {
            var e = this.addItems(t);
            e.length && (this.layoutItems(e, !0), this.reveal(e));
          }),
          (f.prepended = function (t) {
            var e = this._itemize(t);
            if (e.length) {
              var i = this.items.slice(0);
              (this.items = e.concat(i)),
                this._resetLayout(),
                this._manageStamps(),
                this.layoutItems(e, !0),
                this.reveal(e),
                this.layoutItems(i);
            }
          }),
          (f.reveal = function (t) {
            if ((this._emitCompleteOnItems("reveal", t), t && t.length)) {
              var e = this.updateStagger();
              t.forEach(function (t, i) {
                t.stagger(i * e), t.reveal();
              });
            }
          }),
          (f.hide = function (t) {
            if ((this._emitCompleteOnItems("hide", t), t && t.length)) {
              var e = this.updateStagger();
              t.forEach(function (t, i) {
                t.stagger(i * e), t.hide();
              });
            }
          }),
          (f.revealItemElements = function (t) {
            var e = this.getItems(t);
            this.reveal(e);
          }),
          (f.hideItemElements = function (t) {
            var e = this.getItems(t);
            this.hide(e);
          }),
          (f.getItem = function (t) {
            for (var e = 0; e < this.items.length; e++) {
              var i = this.items[e];
              if (i.element == t) return i;
            }
          }),
          (f.getItems = function (t) {
            t = n.makeArray(t);
            var e = [];
            return (
              t.forEach(function (t) {
                var i = this.getItem(t);
                i && e.push(i);
              }, this),
              e
            );
          }),
          (f.remove = function (t) {
            var e = this.getItems(t);
            this._emitCompleteOnItems("remove", e),
              e &&
                e.length &&
                e.forEach(function (t) {
                  t.remove(), n.removeFrom(this.items, t);
                }, this);
          }),
          (f.destroy = function () {
            var t = this.element.style;
            (t.height = ""),
              (t.position = ""),
              (t.width = ""),
              this.items.forEach(function (t) {
                t.destroy();
              }),
              this.unbindResize();
            var e = this.element.outlayerGUID;
            delete c[e],
              delete this.element.outlayerGUID,
              u && u.removeData(this.element, this.constructor.namespace);
          }),
          (r.data = function (t) {
            t = n.getQueryElement(t);
            var e = t && t.outlayerGUID;
            return e && c[e];
          }),
          (r.create = function (t, e) {
            var i = s(r);
            return (
              (i.defaults = n.extend({}, r.defaults)),
              n.extend(i.defaults, e),
              (i.compatOptions = n.extend({}, r.compatOptions)),
              (i.namespace = t),
              (i.data = r.data),
              (i.Item = s(o)),
              n.htmlInit(i, t),
              u && u.bridget && u.bridget(t, i),
              i
            );
          });
        var m = { ms: 1, s: 1e3 };
        return (r.Item = o), r;
      }),
      (function (t, e) {
        "function" == typeof define && define.amd
          ? define(["outlayer/outlayer", "get-size/get-size"], e)
          : "object" == typeof module && module.exports
          ? (module.exports = e(require("outlayer"), require("get-size")))
          : (t.Masonry = e(t.Outlayer, t.getSize));
      })(window, function (t, e) {
        var i = t.create("masonry");
        i.compatOptions.fitWidth = "isFitWidth";
        var n = i.prototype;
        return (
          (n._resetLayout = function () {
            this.getSize(),
              this._getMeasurement("columnWidth", "outerWidth"),
              this._getMeasurement("gutter", "outerWidth"),
              this.measureColumns(),
              (this.colYs = []);
            for (var t = 0; t < this.cols; t++) this.colYs.push(0);
            (this.maxY = 0), (this.horizontalColIndex = 0);
          }),
          (n.measureColumns = function () {
            if ((this.getContainerWidth(), !this.columnWidth)) {
              var t = this.items[0],
                i = t && t.element;
              this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
            }
            var n = (this.columnWidth += this.gutter),
              o = this.containerWidth + this.gutter,
              r = o / n,
              s = n - (o % n),
              a = s && 1 > s ? "round" : "floor";
            (r = Math[a](r)), (this.cols = Math.max(r, 1));
          }),
          (n.getContainerWidth = function () {
            var t = this._getOption("fitWidth"),
              i = t ? this.element.parentNode : this.element,
              n = e(i);
            this.containerWidth = n && n.innerWidth;
          }),
          (n._getItemLayoutPosition = function (t) {
            t.getSize();
            var e = t.size.outerWidth % this.columnWidth,
              i = e && 1 > e ? "round" : "ceil",
              n = Math[i](t.size.outerWidth / this.columnWidth);
            n = Math.min(n, this.cols);
            for (
              var o = this.options.horizontalOrder
                  ? "_getHorizontalColPosition"
                  : "_getTopColPosition",
                r = this[o](n, t),
                s = { x: this.columnWidth * r.col, y: r.y },
                a = r.y + t.size.outerHeight,
                h = n + r.col,
                u = r.col;
              h > u;
              u++
            )
              this.colYs[u] = a;
            return s;
          }),
          (n._getTopColPosition = function (t) {
            var e = this._getTopColGroup(t),
              i = Math.min.apply(Math, e);
            return { col: e.indexOf(i), y: i };
          }),
          (n._getTopColGroup = function (t) {
            if (2 > t) return this.colYs;
            for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++)
              e[n] = this._getColGroupY(n, t);
            return e;
          }),
          (n._getColGroupY = function (t, e) {
            if (2 > e) return this.colYs[t];
            var i = this.colYs.slice(t, t + e);
            return Math.max.apply(Math, i);
          }),
          (n._getHorizontalColPosition = function (t, e) {
            var i = this.horizontalColIndex % this.cols,
              n = t > 1 && i + t > this.cols;
            i = n ? 0 : i;
            var o = e.size.outerWidth && e.size.outerHeight;
            return (
              (this.horizontalColIndex = o ? i + t : this.horizontalColIndex),
              { col: i, y: this._getColGroupY(i, t) }
            );
          }),
          (n._manageStamp = function (t) {
            var i = e(t),
              n = this._getElementOffset(t),
              o = this._getOption("originLeft"),
              r = o ? n.left : n.right,
              s = r + i.outerWidth,
              a = Math.floor(r / this.columnWidth);
            a = Math.max(0, a);
            var h = Math.floor(s / this.columnWidth);
            (h -= s % this.columnWidth ? 0 : 1),
              (h = Math.min(this.cols - 1, h));
            for (
              var u = this._getOption("originTop"),
                d = (u ? n.top : n.bottom) + i.outerHeight,
                l = a;
              h >= l;
              l++
            )
              this.colYs[l] = Math.max(d, this.colYs[l]);
          }),
          (n._getContainerSize = function () {
            this.maxY = Math.max.apply(Math, this.colYs);
            var t = { height: this.maxY };
            return (
              this._getOption("fitWidth") &&
                (t.width = this._getContainerFitWidth()),
              t
            );
          }),
          (n._getContainerFitWidth = function () {
            for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
            return (this.cols - t) * this.columnWidth - this.gutter;
          }),
          (n.needsResizeLayout = function () {
            var t = this.containerWidth;
            return this.getContainerWidth(), t != this.containerWidth;
          }),
          i
        );
      });
  };

  /* This is my app's JavaScript */
  var initProductSlider = function ($) {
    var cssLink = $("<link />", {
      rel: "stylesheet",
      type: "text/css",
      href: "https://product-slider.simesy.com/product-slider.css",
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
    $("body")
      .find(".simesy-slider-section")
      .each(function (i, v) {
        var id = $(this).data("slider-id");
        var shop = window.Shopify.shop;
        $.ajax({
          url: "http://product-slider.simesy.com/api/get_slider",
          type: "post",
          dataType: "JSON",
          async: false,
          data: { id: id, shop: shop },
          success: function (response) {
            var config = response.data.slider.config;
            var list_products = response.data.slider.products;
            get_slider(config, id, list_products);
          },
        });
      });
    $(document)
      .find(".simesy-product-section")
      .each(function () {
        var is_this = $(this),
          id_section = is_this.attr("id"),
          preloader = is_this.data("preloader"),
          layout_present = is_this.data("layout");
        if (preloader) {
          var siblings_preload = $(this).siblings(".simesy-preloader");
          siblings_preload
            .animate(
              {
                opacity: 1,
              },
              600
            )
            .hide();
        }
        if (id_section != "" && layout_present == "slider") {
          if (is_this.data("mode") == "ticker") {
            var ticker = is_this.data("ticker"),
              pauseOnHover = ticker.pauseOnHover,
              speed = ticker.speed,
              slideWidth = ticker.slideWidth,
              maxColumn = ticker.maxColumn,
              slideMargin = ticker.slideMargin,
              minColumn = ticker.minColumn,
              rtl = ticker.rtl,
              speed =
                is_this.find(".simesy-product, .simesy-cat-item").length *
                speed;
            if (rtl == "true") {
              var direction = "prev";
            } else {
              var direction = "next";
            }
            jQuery("#" + id_section).bxSlider({
              mode: "horizontal",
              slideMargin: slideMargin,
              infiniteLoop: !0,
              slideWidth: slideWidth,
              minSlides: minColumn,
              maxSlides: maxColumn,
              speed: speed,
              tickerHover: pauseOnHover,
              ticker: !0,
              autoDirection: direction,
            });
          } else {
            $("#" + id_section).slick({
              prevArrow:
                '<div class="slick-prev"><i class="fa fa-' +
                is_this.data("arrowicon") +
                '-left"></i></div>',
              nextArrow:
                '<div class="slick-next"><i class="fa fa-' +
                is_this.data("arrowicon") +
                '-right"></i></div>',
            });
          }
        }
        if (id_section != "" && layout_present == "grid") {
          var grid_masonry,
            msnry = $(
              ".filter_style_masonry .simesy-product-section#simesy-product-slider-" +
                id_section
            )
              .masonry({
                itemSelector: "div.simesy-masonry-item",
              })
              .data("masonry");
        }
        var lightbox = is_this.data("lightbox");
        function simesyLightbox() {
          $("#" + id_section + " .simesy-product").magnificPopup({
            delegate: "a.sp-simesy-lightbox",
            type: "image",
            closeOnContentClick: !1,
            closeBtnInside: !1,
            mainClass: "mfp-with-zoom mfp-img-mobile",
            zoom: {
              enabled: !0,
              duration: 300,
              opener: function (element) {
                return element.find("img");
              },
            },
          });
        }
        lightbox && simesyLightbox();
      });
    $(document).on("click", ".add-to-cart", function (e) {
      var is_this = $(this);
      is_this.addClass("runing");
      $.ajax({
        url: "/cart/add.js",
        dataType: "json",
        type: "post",
        data: "id=" + $(this).data("id") + "&quantity=1",
        success: function (item) {
          setTimeout(function () {
            is_this.removeClass("runing");
            window.location = "/cart";
          }, 1000);
        },
        error: function (XMLHttpRequest, textStatus) {
          is_this.removeClass("runing");
          var text_error = JSON.parse(XMLHttpRequest.responseText);
          alert(text_error.description);
          //Shopify.onError(XMLHttpRequest, textStatus);
        },
      });
    });
  };
  var get_slider = function (config, id, list_products) {
    $('.simesy-slider-section[data-slider-id="' + id + '"]').addClass(
      "simesy-slider-section-" + id + ""
    );
    /* App code */
    // General Settings
    var layout_present = config.layout[0],
      theme_style = config.theme_style,
      pre_loader = config.preloader;

    // Slider Controls
    if (layout_present == "slider") {
      var carousel_ticker_mode = config.carousel_ticker_mode[0],
        carousel_pause_on_hover = config.carousel_pause_on_hover,
        carousel_infinite = config.carousel_infinite,
        rtl_mode = config.rtl_mode[0],
        slider_row_1 =
          config.slider_row.number1 != "" ? config.slider_row.number1 : "1",
        slider_row_2 =
          config.slider_row.number2 != "" ? config.slider_row.number2 : "1",
        slider_row_3 =
          config.slider_row.number3 != "" ? config.slider_row.number3 : "1",
        slider_row_4 =
          config.slider_row.number4 != "" ? config.slider_row.number4 : "1",
        carousel_slide_width = config.carousel_slide_width,
        ticker_scroll_speed = config.ticker_scroll_speed,
        navigation_arrow = config.navigation_arrow[0],
        navigation_arrow_type = config.navigation_arrow_type[0],
        navigation_position = config.navigation_position,
        navigation_border_radius = config.navigation_border_radius,
        pagination = config.pagination[0],
        pagination_type = config.pagination_type,
        carousel_swipe = config.carousel_swipe,
        carousel_draggable = config.carousel_draggable;
    }
    // Display Option

    var product_margin =
        config.product_margin != "" ? config.product_margin : "20",
      product_link_target = config.product_link_target,
      product_name = config.product_name,
      product_name_word_limit = config.product_name_word_limit,
      product_name_word_limit_number =
        config.product_name_word_limit_number != ""
          ? config.product_name_word_limit_number
          : "10",
      product_name_word_limit_after =
        config.product_name_word_limit_after != ""
          ? config.product_name_word_limit_number
          : "...",
      pro_des = config.product_content,
      product_des_word_limit_number =
        config.product_content_word_limit != ""
          ? config.product_content_word_limit
          : "10",
      product_des_word_limit_after = "...",
      pro_price = config.product_price,
      product_overlay_bg = config.product_overlay_bg,
      product_info_bg = config.product_info_bg,
      product_info_bg_hover = config.product_info_hover_bg,
      product_info_gradient = config.product_info_gradient;

    // Ribbon Sale
    var sale_ribbon = config.sale_ribbon,
      sale_ribbon_text =
        config.sale_ribbon_text != "" ? config.sale_ribbon_text : "On Sale!",
      sale_ribbon_bg = config.sale_ribbon_bg;

    // Ribbon Out of stock
    var out_of_stock_ribbon = config.out_of_stock_ribbon,
      out_of_stock_ribbon_text =
        config.out_of_stock_ribbon_text != ""
          ? config.out_of_stock_ribbon_text
          : "Out of Stock",
      out_of_stock_ribbon_bg = config.out_of_stock_ribbon_bg;

    // Add to cart
    var add_to_cart_button = config.add_to_cart_button;

    // Border Add to cart
    var add_to_cart_border_all = config.add_to_cart_border.all,
      add_to_cart_border_color = config.add_to_cart_border.color,
      add_to_cart_border_style = config.add_to_cart_border.style,
      add_to_cart_border_hover_color = config.add_to_cart_border.hover_color;

    // Image settings
    var product_image = config.product_image,
      image_flip = config.product_image_flip,
      image_size_w =
        config.image_sizes.width != "" ? config.image_sizes.width : "250",
      image_size_h =
        config.image_sizes.height != "" ? config.image_sizes.height : "350",
      image_lightbox = config.image_lightbox,
      image_title_attr = config.image_title_attr,
      image_gray_scale = config.image_gray_scale;

    // Typography
    var slider_title_font_load = config.slider_title_font_load,
      testimonial_title_font_load = config.testimonial_title_font_load,
      testimonial_text_font_load = config.testimonial_text_font_load,
      client_name_font_load = config.client_name_font_load,
      designation_company_font_load = config.designation_company_font_load,
      location_font_load = config.location_font_load,
      phone_font_load = config.phone_font_load,
      email_font_load = config.email_font_load,
      date_font_load = config.date_font_load;

    var simesy_font = [],
      simesy_typography = [];
    if (slider_title_font_load) {
      simesy_typography.push(config.slider_title_typography);
    }
    if (testimonial_title_font_load) {
      simesy_typography.push(config.testimonial_title_typography);
    }
    if (testimonial_text_font_load) {
      simesy_typography.push(config.testimonial_text_typography);
    }
    if (client_name_font_load) {
      simesy_typography.push(config.client_name_typography);
    }
    if (designation_company_font_load) {
      simesy_typography.push(config.client_designation_company_typography);
    }
    if (location_font_load) {
      simesy_typography.push(config.client_location_typography);
    }
    if (phone_font_load) {
      simesy_typography.push(config.client_phone_typography);
    }
    if (email_font_load) {
      simesy_typography.push(config.client_email_typography);
    }
    if (date_font_load) {
      simesy_typography.push(config.testimonial_date_typography);
    }
    for (var i = 0; i < simesy_typography.length; i++) {
      var font_weight =
        simesy_typography[i]["font-weight"] != "normal"
          ? ":" + simesy_typography[i]["font-weight"]
          : "";
      simesy_font.push(simesy_typography[i]["font-family"] + font_weight);
    }
    if (simesy_font != "") {
      var encode_link = encodeURIComponent(
        simesy_font.filter((font) => font).join("|")
      );
      var link = $("<link />", {
        rel: "stylesheet",
        type: "text/css",
        href: "//fonts.googleapis.com/css?family=" + encode_link,
      });
      $("body").append(link);
    }
    // Show/Hide navigation slick
    switch (navigation_arrow) {
      case "true":
        var nav_desktop = "true";
        var nav_mobile = "true";
        break;
      case "hide_on_mobile":
        var nav_desktop = "true";
        var nav_mobile = "false";
        break;
      default:
        var nav_desktop = "false";
        var nav_mobile = "false";
    }
    // Show/Hide pagination slick
    switch (pagination) {
      case "true":
        var pagi_desktop = "true";
        var pagi_mobile = "true";
        break;
      case "hide_on_mobile":
        var pagi_desktop = "true";
        var pagi_mobile = "false";
        break;
      default:
        var pagi_desktop = "false";
        var pagi_mobile = "false";
    }

    // Render HTML
    let data_all = [];
    // Render CSS
    var css = "";
    // Slick Style

    if (carousel_ticker_mode == "false") {
      css += `
.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .slick-list {
margin-bottom: -${product_margin}px;
}
.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section{
margin-left: -${product_margin}px;
}
.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .slick-slide {
margin-left: ${product_margin}px;
}`;
    } else {
      if (layout_present != "grid") {
        css += `
.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section{
margin-left: 0px;
}`;
      }
    }
    css += `.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product {
margin-bottom: ${product_margin}px;
}`;
    if (layout_present == "grid") {
      css += `.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product {
padding-left: ${product_margin}px;
}`;
    }
    //Naviagtion
    if (nav_desktop == "true" || nav_mobile == "true") {
      var nav_radius = config.navigation_border_radius,
        nav_color = config.navigation_arrow_colors.color,
        nav_bg = config.navigation_arrow_colors.background,
        nav_border = config.navigation_arrow_colors.border,
        nav_color_hover = config.navigation_arrow_colors.hover_color,
        nav_border_hover = config.navigation_arrow_colors.hover_border,
        nav_bg_hover = config.navigation_arrow_colors.hover_background;
      css += ` .simesy-slider-section #simesy-product-slider-${id} .slick-prev,.simesy-slider-section #simesy-product-slider-${id} .slick-next{
color: ${nav_color};
border-radius: ${nav_radius};
background:${nav_bg};
border-color:${nav_border};
}
.simesy-slider-section #simesy-product-slider-${id} .slick-prev:hover,.simesy-slider-section #simesy-product-slider-${id} .slick-next:hover{
color: ${nav_color_hover};
background:${nav_bg_hover};
border-color:${nav_border_hover};
}`;
      if (
        ["top_right", "top_left", "top_center"].includes(navigation_position)
      ) {
        if (carousel_ticker_mode == "false") {
          css += `#simesy-slider-section.simesy-slider-section-${id}{
padding-top:46px;
}`;
        }

        css += ` #simesy-slider-section.simesy-slider-section-${id}.navigation_position_top_left .slick-next {
left: ${product_margin}px;
margin-left: 36px;
}
#simesy-slider-section.simesy-slider-section-${id}.navigation_position_top_left .slick-prev {
left: ${product_margin}px;
}`;
      }
      if (
        ["bottom_right", "bottom_left", "bottom_center"].includes(
          navigation_position
        )
      ) {
        var nav_pd_bottom =
          nav_desktop == "true" || nav_mobile == "true" ? "46px" : "66px";
        css += ` #simesy-slider-section.simesy-slider-section-${id}{
padding-bottom: ${nav_pd_bottom};
}`;
        css += ` #simesy-slider-section.simesy-slider-section-${id}.navigation_position_bottom_left .slick-next {
left: ${product_margin}px;
margin-left: 36px;
}
#simesy-slider-section.simesy-slider-section-${id}.navigation_position_bottom_left .slick-prev {
left: ${product_margin}px;
}`;
      }
      if (["vertical_center"].includes(navigation_position)) {
        css += ` #simesy-slider-section.simesy-slider-section-${id}.navigation_position_vertical_center .slick-prev{
margin-left: ${product_margin}px;
}
#simesy-slider-section.simesy-slider-section-${id} #simesy-product-slider-${id}.simesy-product-section{
padding: 0 45px;
}`;
      }
      if (["vertical_center_inner"].includes(navigation_position)) {
        css += ` #simesy-slider-section.simesy-slider-section-${id}.navigation_position_vertical_center_inner .slick-prev{
margin-left: ${product_margin}px;
}`;
      }
      if (["vertical_center_inner_hover"].includes(navigation_position)) {
        css += ` #simesy-slider-section.simesy-slider-section-${id}.navigation_position_vertical_center_inner_hover .slick-prev{
margin-left: ${product_margin}px;
}`;
      }
    }

    //Pagination
    if (
      (pagination_type == "number" && pagi_desktop == "true") ||
      (pagination_type == "number" && pagi_mobile == "true")
    ) {
      var pagination_dots_bg = config.pagination_dots_bg;
      var pagination_dots_active_bg = config.pagination_dots_active_bg;
      css += `#simesy-slider-section.simesy-slider-section-${id}.pagination-type-number .slick-dots li button{
color: ${pagination_dots_active_bg};
}
#simesy-slider-section.simesy-slider-section-${id}.pagination-type-number .slick-dots li.slick-active button,
#simesy-slider-section.simesy-slider-section-${id}.pagination-type-number .slick-dots li button:hover{
color: #fff;
}
#simesy-slider-section.simesy-slider-section-${id}.pagination-type-number .slick-dots li button:before{
background-color:${pagination_dots_active_bg};
}`;
    }
    if (
      (pagination_type == "dots" && pagi_desktop == "true") ||
      (pagination_type == "dots" && pagi_mobile == "true")
    ) {
      var pagination_dots_bg = config.pagination_dots_bg;
      var pagination_dots_active_bg = config.pagination_dots_active_bg;
      css += `#simesy-slider-section.simesy-slider-section-${id}.pagination-type-dots .slick-dots li button{
background-color: ${pagination_dots_bg};
}
#simesy-slider-section.simesy-slider-section-${id}.pagination-type-dots .slick-dots li.slick-active button{
background-color: ${pagination_dots_active_bg};
}`;
    }
    // Slider Title

    var slider_title_type_color = config.slider_title_typography.color,
      slider_title_type_font_size = config.slider_title_typography["font-size"],
      slider_title_type_line_height =
        config.slider_title_typography["line-height"],
      slider_title_type_text_transform =
        config.slider_title_typography["text-transform"],
      slider_title_type_letter_spacing =
        config.slider_title_typography["letter-spacing"],
      slider_title_type_text_align =
        config.slider_title_typography["text-align"],
      slider_title_type_font_family =
        config.slider_title_typography["font-family"],
      slider_title_type_font_weight =
        config.slider_title_typography["font-weight"];
    css += `
#simesy-slider-section.simesy-slider-section-${id} h2.simesy-section-title{
color: ${slider_title_type_color};
font-size: ${slider_title_type_font_size}px;
line-height: ${slider_title_type_line_height}px;
text-transform: ${slider_title_type_text_transform};
letter-spacing: ${slider_title_type_letter_spacing}px;
text-align: ${slider_title_type_text_align};

}`;
    if (slider_title_font_load) {
      var font_normal =
        slider_title_type_font_weight &&
        slider_title_type_font_weight !== "italic" &&
        slider_title_type_font_weight === "normal"
          ? "normal"
          : "";
      var font_weight =
        slider_title_type_font_weight &&
        slider_title_type_font_weight !== "italic" &&
        slider_title_type_font_weight !== "normal"
          ? slider_title_type_font_weight.replace("italic", "")
          : font_normal;
      var font_style =
        slider_title_type_font_weight &&
        slider_title_type_font_weight.substr(-6) === "italic"
          ? "italic"
          : "";
      css += `
#simesy-slider-section.simesy-slider-section-${id} h2.simesy-section-title{
font-family:${slider_title_type_font_family};
font-weight:${font_weight};
font-style:${font_style};
}`;
    }

    // Product Name Font
    if (product_name) {
      var product_name_type_color = config.testimonial_title_typography.color,
        product_name_type_color_hover =
          config.testimonial_title_typography.hover_color,
        product_name_type_font_size =
          config.testimonial_title_typography["font-size"],
        product_name_type_line_height =
          config.testimonial_title_typography["line-height"],
        product_name_type_text_transform =
          config.testimonial_title_typography["text-transform"],
        product_name_type_letter_spacing =
          config.testimonial_title_typography["letter-spacing"],
        product_name_type_text_align =
          config.testimonial_title_typography["text-align"],
        product_name_type_font_family =
          config.testimonial_title_typography["font-family"],
        product_name_type_font_weight =
          config.testimonial_title_typography["font-weight"];
      css += `
#simesy-slider-section.simesy-slider-section-${id} .simesy-product .simesy-product-title{
text-align: ${product_name_type_text_align};
}
#simesy-slider-section.simesy-slider-section-${id} .simesy-product .simesy-product-title a{
color: ${product_name_type_color};
font-size: ${product_name_type_font_size}px;
line-height: ${product_name_type_line_height}px;
text-transform: ${product_name_type_text_transform};
letter-spacing: ${product_name_type_letter_spacing}px;
}
#simesy-slider-section.simesy-slider-section-${id} .simesy-product .simesy-product-title a:hover{
color:${product_name_type_color_hover};
}`;
      if (testimonial_title_font_load) {
        var font_normal =
          product_name_type_font_weight &&
          product_name_type_font_weight !== "italic" &&
          product_name_type_font_weight === "normal"
            ? "normal"
            : "";
        var font_weight =
          product_name_type_font_weight &&
          product_name_type_font_weight !== "italic" &&
          product_name_type_font_weight !== "normal"
            ? product_name_type_font_weight.replace("italic", "")
            : font_normal;
        var font_style =
          product_name_type_font_weight &&
          product_name_type_font_weight.substr(-6) === "italic"
            ? "italic"
            : "";
        css += `
#simesy-slider-section.simesy-slider-section-${id} .simesy-product .simesy-product-title a {
font-family:${product_name_type_font_family};
font-weight:${font_weight};
font-style:${font_style};
}`;
      }
    }

    // Product Des Font
    if (pro_des) {
      var product_des_type_color = config.testimonial_text_typography.color,
        product_des_type_font_size =
          config.testimonial_text_typography["font-size"],
        product_des_type_line_height =
          config.testimonial_text_typography["line-height"],
        product_des_type_text_transform =
          config.testimonial_text_typography["text-transform"],
        product_des_type_letter_spacing =
          config.testimonial_text_typography["letter-spacing"],
        product_des_type_text_align =
          config.testimonial_text_typography["text-align"],
        product_des_type_font_family =
          config.testimonial_text_typography["font-family"],
        product_des_type_font_weight =
          config.testimonial_text_typography["font-weight"];
      css += `
#simesy-slider-section.simesy-slider-section-${id} .simesy-product .simesy-product-content {
color: ${product_des_type_color};
font-size: ${product_des_type_font_size}px;
line-height: ${product_des_type_line_height}px;
text-transform: ${product_des_type_text_transform};
letter-spacing: ${product_des_type_letter_spacing}px;
text-align: ${product_des_type_text_align};
}`;
      if (testimonial_text_font_load) {
        var font_normal =
          product_des_type_font_weight &&
          product_des_type_font_weight !== "italic" &&
          product_des_type_font_weight === "normal"
            ? "normal"
            : "";
        var font_weight =
          product_des_type_font_weight &&
          product_des_type_font_weight !== "italic" &&
          product_des_type_font_weight !== "normal"
            ? product_des_type_font_weight.replace("italic", "")
            : font_normal;
        var font_style =
          product_des_type_font_weight &&
          product_des_type_font_weight.substr(-6) === "italic"
            ? "italic"
            : "";

        css += `
#simesy-slider-section.simesy-slider-section-${id} .simesy-product .simesy-product-content {
font-family:${product_des_type_font_family};
font-weight:${font_weight};
font-style:${font_style};
}`;
      }
    }

    // Product Price Font
    if (pro_price) {
      var product_price_type_color = config.client_name_typography.color,
        product_del_price_color = config.product_del_price_color,
        product_price_type_font_size =
          config.client_name_typography["font-size"],
        product_price_type_line_height =
          config.client_name_typography["line-height"],
        product_price_type_text_transform =
          config.client_name_typography["text-transform"],
        product_price_type_letter_spacing =
          config.client_name_typography["letter-spacing"],
        product_price_type_text_align =
          config.client_name_typography["text-align"],
        product_price_type_font_family =
          config.client_name_typography["font-family"],
        product_price_type_font_weight =
          config.client_name_typography["font-weight"];
      css += `
#simesy-slider-section.simesy-slider-section-${id} .simesy-product .simesy-product-price {
color: ${product_price_type_color};
font-size: ${product_price_type_font_size}px;
line-height: ${product_price_type_line_height}px;
text-transform: ${product_price_type_text_transform};
letter-spacing: ${product_price_type_letter_spacing}px;
text-align: ${product_price_type_text_align};
}`;
      if (client_name_font_load) {
        var font_normal =
          product_price_type_font_weight &&
          product_price_type_font_weight !== "italic" &&
          product_price_type_font_weight === "normal"
            ? "normal"
            : "";
        var font_weight =
          product_price_type_font_weight &&
          product_price_type_font_weight !== "italic" &&
          product_price_type_font_weight !== "normal"
            ? product_price_type_font_weight.replace("italic", "")
            : font_normal;
        var font_style =
          product_price_type_font_weight &&
          product_price_type_font_weight.substr(-6) === "italic"
            ? "italic"
            : "";

        css += `#simesy-slider-section.simesy-slider-section-${id} .simesy-product .simesy-product-price {
font-family:${product_price_type_font_family};
font-weight:${font_weight};
font-style:${font_style};
}`;
      }
      css += `
#simesy-slider-section.simesy-slider-section-${id} .simesy-product .simesy-product-price del{
color: ${product_del_price_color};
}`;
    }

    // Out of Stock Ribbon Font
    if (out_of_stock_ribbon) {
      var out_of_stock_ribbon_type_color =
          config.client_location_typography.color,
        out_of_stock_ribbon_type_font_size =
          config.client_location_typography["font-size"],
        out_of_stock_ribbon_type_line_height =
          config.client_location_typography["line-height"],
        out_of_stock_ribbon_type_text_transform =
          config.client_location_typography["text-transform"],
        out_of_stock_ribbon_type_letter_spacing =
          config.client_location_typography["letter-spacing"],
        out_of_stock_ribbon_type_text_align =
          config.client_location_typography["text-align"],
        out_of_stock_ribbon_type_font_family =
          config.client_location_typography["font-family"],
        out_of_stock_ribbon_type_font_weight =
          config.client_location_typography["font-weight"],
        out_of_stock_ribbon_bg = config.out_of_stock_ribbon_bg;
      css += `
#simesy-slider-section.simesy-slider-section-${id} .simesy-product .simesy-out-of-stock {
color: ${out_of_stock_ribbon_type_color};
font-size: ${out_of_stock_ribbon_type_font_size}px;
line-height: ${out_of_stock_ribbon_type_line_height}px;
text-transform: ${out_of_stock_ribbon_type_text_transform};
letter-spacing: ${out_of_stock_ribbon_type_letter_spacing}px;
text-align: ${out_of_stock_ribbon_type_text_align};
background:${out_of_stock_ribbon_bg};
}`;
      if (location_font_load) {
        var font_normal =
          out_of_stock_ribbon_type_font_weight &&
          out_of_stock_ribbon_type_font_weight !== "italic" &&
          out_of_stock_ribbon_type_font_weight === "normal"
            ? "normal"
            : "";
        var font_weight =
          out_of_stock_ribbon_type_font_weight &&
          out_of_stock_ribbon_type_font_weight !== "italic" &&
          out_of_stock_ribbon_type_font_weight !== "normal"
            ? out_of_stock_ribbon_type_font_weight.replace("italic", "")
            : font_normal;
        var font_style =
          out_of_stock_ribbon_type_font_weight &&
          out_of_stock_ribbon_type_font_weight.substr(-6) === "italic"
            ? "italic"
            : "";

        css += `
#simesy-slider-section.simesy-slider-section-${id} .simesy-product .simesy-out-of-stock {
font-family:${out_of_stock_ribbon_type_font_family};
font-weight:${font_weight};
font-style:${font_style};
}`;
      }
    }

    // Add to cart

    if (add_to_cart_button) {
      var add_to_cart_button_bg = config.add_to_cart_button_bg,
        add_to_cart_border_radius = config.add_to_cart_border_radius,
        add_to_cart_button_color = config.add_to_cart_button_color,
        add_to_cart_button_hover_bg = config.add_to_cart_button_hover_bg,
        add_to_cart_button_hover_color = config.add_to_cart_button_hover_color,
        add_to_cart_border_all = config.add_to_cart_border.all,
        add_to_cart_border_color = config.add_to_cart_border.color,
        add_to_cart_border_hover = config.add_to_cart_border.hover_color,
        add_to_cart_border_style = config.add_to_cart_border.style;
      css += `#simesy-slider-section.simesy-slider-section-${id} .simesy-cart-button a.button:not(.sp-wqvpro-view-button):not(.sp-wqv-view-button) {
background:${add_to_cart_button_bg};
border-radius:${add_to_cart_border_radius}px;
color:${add_to_cart_button_color};
border: ${add_to_cart_border_all}px ${add_to_cart_border_style} ${add_to_cart_border_color};
}
#simesy-slider-section.simesy-slider-section-${id} .simesy-cart-button a.button:not(.sp-wqvpro-view-button):not(.sp-wqv-view-button):hover {
background:${add_to_cart_button_hover_bg};
color:${add_to_cart_button_hover_color};
border-color: ${add_to_cart_border_hover};
}`;
      if ("theme_five" == theme_style) {
        css += `.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product .simesy-buttons-area{
background-color:${product_overlay_bg};
}
.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product .simesy-view-details a:hover{
color: ${add_to_cart_button_hover_color};
background-color: ${add_to_cart_button_hover_bg};
border-color: ${add_to_cart_border_hover_color};
}
`;
      }
    }
    if (add_to_cart_button) {
      var add_cart_type_font_size =
          config.testimonial_date_typography["font-size"],
        add_cart_type_line_height =
          config.testimonial_date_typography["line-height"],
        add_cart_type_text_transform =
          config.testimonial_date_typography["text-transform"],
        add_cart_type_letter_spacing =
          config.testimonial_date_typography["letter-spacing"],
        add_cart_type_text_align =
          config.testimonial_date_typography["text-align"],
        add_cart_type_font_family =
          config.testimonial_date_typography["font-family"],
        add_cart_type_font_weight =
          config.testimonial_date_typography["font-weight"];
      css += `
#simesy-slider-section.simesy-slider-section-${id} .simesy-cart-button a.button:not(.sp-wqvpro-view-button):not(.sp-wqv-view-button) {
font-size: ${add_cart_type_font_size}px;
line-height: ${add_cart_type_line_height}px;
text-transform: ${add_cart_type_text_transform};
letter-spacing: ${add_cart_type_letter_spacing}px;
text-align: ${add_cart_type_text_align};
}
.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product .simesy-view-details a{
font-size: ${add_cart_type_font_size}px;
line-height: ${add_cart_type_line_height}px;
text-transform: ${add_cart_type_text_transform};
letter-spacing: ${add_cart_type_letter_spacing}px;
text-align: ${add_cart_type_text_align};
color: ${add_to_cart_button_color};
background-color: ${add_to_cart_button_bg};
border-color: ${add_to_cart_border_color};
}`;
      if (date_font_load) {
        var font_normal =
          add_cart_type_font_weight &&
          add_cart_type_font_weight !== "italic" &&
          add_cart_type_font_weight === "normal"
            ? "normal"
            : "";
        var font_weight =
          add_cart_type_font_weight &&
          add_cart_type_font_weight !== "italic" &&
          add_cart_type_font_weight !== "normal"
            ? add_cart_type_font_weight.replace("italic", "")
            : font_normal;
        var font_style =
          add_cart_type_font_weight &&
          add_cart_type_font_weight.substr(-6) === "italic"
            ? "italic"
            : "";

        css += `
#simesy-slider-section.simesy-slider-section-${id} .simesy-cart-button a.button:not(.sp-wqvpro-view-button):not(.sp-wqv-view-button) {
font-family:${add_cart_type_font_family};
font-weight:${font_weight};
font-style:${font_style};
}
.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product .simesy-view-details a{
font-family:${add_cart_type_font_family};
font-weight:${font_weight};
font-style:${font_style};

}`;
      }
    }

    // Sale Ribbon
    if (sale_ribbon) {
      var sale_ribbon_type_color =
          config.client_designation_company_typography.color,
        sale_ribbon_type_font_size =
          config.client_designation_company_typography["font-size"],
        sale_ribbon_type_line_height =
          config.client_designation_company_typography["line-height"],
        sale_ribbon_type_text_transform =
          config.client_designation_company_typography["text-transform"],
        sale_ribbon_type_letter_spacing =
          config.client_designation_company_typography["letter-spacing"],
        sale_ribbon_type_text_align =
          config.client_designation_company_typography["text-align"],
        sale_ribbon_type_font_family =
          config.client_designation_company_typography["font-family"],
        sale_ribbon_type_font_weight =
          config.client_designation_company_typography["font-weight"],
        sale_ribbon_type_background = config.sale_ribbon_bg;
      css += `
#simesy-slider-section.simesy-slider-section-${id} .simesy-product .sale_text{
color: ${sale_ribbon_type_color};
font-size: ${sale_ribbon_type_font_size}px;
line-height: ${sale_ribbon_type_line_height}px;
text-transform: ${sale_ribbon_type_text_transform};
letter-spacing: ${sale_ribbon_type_letter_spacing}px;
text-align: ${sale_ribbon_type_text_align};
background:${sale_ribbon_type_background};
}`;
      if (designation_company_font_load) {
        var font_normal =
          sale_ribbon_type_font_weight &&
          sale_ribbon_type_font_weight !== "italic" &&
          sale_ribbon_type_font_weight === "normal"
            ? "normal"
            : "";
        var font_weight =
          sale_ribbon_type_font_weight &&
          sale_ribbon_type_font_weight !== "italic" &&
          sale_ribbon_type_font_weight !== "normal"
            ? sale_ribbon_type_font_weight.replace("italic", "")
            : font_normal;
        var font_style =
          sale_ribbon_type_font_weight &&
          sale_ribbon_type_font_weight.substr(-6) === "italic"
            ? "italic"
            : "";
        css += `
#simesy-slider-section.simesy-slider-section-${id} .simesy-product .sale_text{
font-family:${sale_ribbon_type_font_family};
font-weight:${font_weight};
font-style:${font_style};
}`;
      }
    }
    // Wishlist
    var compare_wishlist_type_font_size =
        config.client_email_typography["font-size"],
      compare_wishlist_type_line_height =
        config.client_email_typography["line-height"],
      compare_wishlist_type_text_transform =
        config.client_email_typography["text-transform"],
      compare_wishlist_type_letter_spacing =
        config.client_email_typography["letter-spacing"],
      compare_wishlist_type_text_align =
        config.client_email_typography["text-align"],
      compare_wishlist_type_font_family =
        config.client_email_typography["font-family"],
      compare_wishlist_type_font_weight =
        config.client_email_typography["font-weight"];

    if (
      "theme_twenty" == theme_style.trim() ||
      "theme_twenty_one" == theme_style
    ) {
      css += `#simesy-slider-section.simesy-slider-section-${id} .simesy-product .product-wishlist-com .compare-button a{
color:#444444;
text-align: ${compare_wishlist_type_text_align};
font-size: ${compare_wishlist_type_font_size}px;
line-height: ${compare_wishlist_type_line_height}px;
text-transform: ${compare_wishlist_type_text_transform};
letter-spacing: ${compare_wishlist_type_letter_spacing}px;
}`;
      css += `#simesy-slider-section.simesy-slider-section-${id} .simesy-product .product-wishlist-com .compare-button a:hover{
color:#d827f7;
}`;
      css += `#simesy-slider-section.simesy-slider-section-${id} .simesy-product .product-wishlist-com .yith-wcwl-add-to-wishlist a{
color:#444444;
text-align: ${compare_wishlist_type_text_align};
font-size: ${compare_wishlist_type_font_size}px;
line-height: ${compare_wishlist_type_line_height}px;
text-transform: ${compare_wishlist_type_text_transform};
letter-spacing: ${compare_wishlist_type_letter_spacing}px;

}`;
      css += `#simesy-slider-section.simesy-slider-section-${id} .simesy-product .product-wishlist-com .yith-wcwl-add-to-wishlist a:hover{
color:#d827f7;
}`;
    }
    if (email_font_load) {
      var font_normal =
        compare_wishlist_type_font_weight &&
        compare_wishlist_type_font_weight !== "italic" &&
        compare_wishlist_type_font_weight === "normal"
          ? "normal"
          : "";
      var font_weight =
        compare_wishlist_type_font_weight &&
        compare_wishlist_type_font_weight !== "italic" &&
        compare_wishlist_type_font_weight !== "normal"
          ? compare_wishlist_type_font_weight.replace("italic", "")
          : font_normal;
      var font_style =
        compare_wishlist_type_font_weight &&
        compare_wishlist_type_font_weight.substr(-6) === "italic"
          ? "italic"
          : "";

      css += `#simesy-slider-section.simesy-slider-section-${id} .simesy-product .product-wishlist-com .compare-button a{
font-family:${compare_wishlist_type_font_family};
font-weight:${font_weight};
font-style:${font_style};
}`;
      css += `#simesy-slider-section.simesy-slider-section-${id} .simesy-product .product-wishlist-com .yith-wcwl-add-to-wishlist a{
font-family:${compare_wishlist_type_font_family};
font-weight:${font_weight};
font-style:${font_style};
}`;
    }

    //Image

    if (theme_style == "theme_thirteen") {
      css += `.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product .product-details{
background-color:${product_info_bg};
}
.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product:hover .product-details{
background-color: ${product_info_bg_hover};
}`;
    }
    var product_image_border_all = config.product_image_border.all,
      product_image_border_color = config.product_image_border.color,
      product_image_border_style = config.product_image_border.style,
      product_image_border_hover_color =
        config.product_image_border.hover_color;

    if (product_image) {
      if (
        [
          "theme_one",
          "theme_eight",
          "theme_nine",
          "theme_fifteen",
          "theme_sixteen",
          "theme_seventeen",
          "theme_thirteen",
          "theme_fourteen",
        ].includes(theme_style)
      ) {
        css += `#simesy-slider-section.simesy-slider-section-${id} .simesy-product .simesy-product-image{
border: ${product_image_border_all}px ${product_image_border_style} ${product_image_border_color};
}
#simesy-slider-section.simesy-slider-section-${id} .simesy-product:hover .simesy-product-image{
border-color: ${product_image_border_hover_color};
}`;
      }
      if (
        [
          "theme_five",
          "theme_seven",
          "theme_eleven",
          "theme_twenty_four",
          "theme_three",
          "theme_four",
        ].includes(theme_style)
      ) {
        css += `#simesy-slider-section.simesy-slider-section-${id} .simesy-product .simesy-product-image-area{
border: ${product_image_border_all}px ${product_image_border_style} ${product_image_border_color};
}
#simesy-slider-section.simesy-slider-section-${id} .simesy-product:hover .simesy-product-image-area{
border-color: ${product_image_border_hover_color};
}`;
      }
    }
    if (
      [
        "theme_two",
        "theme_twenty_seven",
        "theme_twenty_eight",
        "theme_six",
        "theme_ten",
        "theme_twenty_two",
        "theme_twenty_three",
        "theme_twenty_six",
      ].includes(theme_style)
    ) {
      var product_area_border_all = config.product_area_border.all,
        product_area_border_color = config.product_area_border.color,
        product_area_border_hover_color =
          config.product_area_border.hover_color,
        product_area_border_style = config.product_area_border.style;
      css += `.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product .simesy-product-data{
border: ${product_area_border_all}px ${product_area_border_style} ${product_area_border_color};
}
.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product .simesy-product-data:hover{
border-color: ${product_area_border_hover_color};
}`;
    }
    if ("theme_twenty_three" == theme_style) {
      var product_top_info_bg = config.product_top_info_bg;
      css += `.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product .simesy-product-add-to-cart{
background-color:${product_top_info_bg};
}`;
    }
    if ("theme_thirteen" == theme_style) {
      var product_area_border_all = config.product_area_border.all,
        product_area_border_style = config.product_area_border.style,
        product_area_border_color = config.product_area_border.color,
        product_area_border_hover_color =
          config.product_area_border.hover_color;
      css += ` .simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product .product-details{
border-bottom: ${product_area_border_all}px ${product_area_border_style} ${product_area_border_color};
}
.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product:hover .product-details{
border-color: ${product_area_border_hover_color};
}`;
    }
    if ("theme_three" == theme_style) {
      css += ` .simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product .simesy-cart-button{
background-color: ${product_overlay_bg};
}`;
    }
    if ("theme_four" == theme_style) {
      css += ` .simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product .product-details{
background-color: ${product_overlay_bg};
}`;
    }

    if (["theme_seven", "theme_thirteen"].includes(theme_style)) {
      css += `.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product .product-overlay-color{
background-color: ${product_overlay_bg};}`;
    }
    if ("theme_eleven" == theme_style) {
      css += `.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product .product-overlay-color{
background-color: ${product_overlay_bg};
}
.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product:hover .simesy-product-title a{
color: ${config.testimonial_title_typography.hover_color};
};`;
    }

    if (theme_style == "theme_twelve") {
      css += `.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product .simesy-product-data{
border-top: ${product_image_border_all}px ${product_image_border_style} ${product_image_border_color};
background-image: -webkit-gradient(linear, 0 0, 0 100%, from(${product_image_border_color}), to(transparent));
background-image: -webkit-linear-gradient(${product_image_border_color}, transparent);
background-image: -moz-linear-gradient(${product_image_border_color}, transparent), -moz-linear-gradient(${product_image_border_color}, transparent);
background-image: -o-linear-gradient(${product_image_border_color}, transparent), -o-linear-gradient(${product_image_border_color}, transparent);
background-image: linear-gradient(${product_image_border_color}, transparent), linear-gradient(${product_image_border_color}, transparent);
-moz-background-size: ${product_image_border_all}px 100%;
background-size: ${product_image_border_all}px 100%;
background-position: 0 0, 100% 0;
background-repeat: no-repeat;
padding-left: ${product_image_border_all}px;
padding-right: ${product_image_border_all}px;
}
.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product .simesy-product-data:hover{
border-color: ${product_image_border_all}px;
background-image: -webkit-gradient(linear, 0 0, 0 100%, from(${product_image_border_all}px), to(transparent));
background-image: -webkit-linear-gradient(${product_image_border_color}, transparent);
background-image: -moz-linear-gradient(${product_image_border_color}, transparent), -moz-linear-gradient(${product_image_border_color}, transparent);
background-image: -o-linear-gradient(${product_image_border_color}, transparent), -o-linear-gradient(${product_image_border_color}, transparent);
background-image: linear-gradient(${product_image_border_color}, transparent), linear-gradient(${product_image_border_color}, transparent);
}`;
    }

    if (
      [
        "theme_twenty_eight",
        "theme_six",
        "theme_ten",
        "theme_fourteen",
        "theme_nineteen",
        "theme_twenty_two",
        "theme_twenty_three",
        "theme_twenty_five",
        "theme_twenty_six",
      ].includes(theme_style)
    ) {
      css += `.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product .product-details{
background-color:${product_info_bg};
}`;
    }
    if (
      [
        "theme_fourteen",
        "theme_nineteen",
        "theme_twenty_two",
        "theme_twenty_three",
        "theme_twenty_five",
        "theme_twenty_six",
      ].includes(theme_style)
    ) {
      css += `.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product:hover .product-details{
background-color: ${product_info_bg_hover};
}`;
    }
    if ("theme_seventeen" == theme_style) {
      if (add_to_cart_button) {
        css += ` .simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product .simesy-product-image-area .simesy-cart-button a.button:not(.sp-wqvpro-view-button):not(.sp-wqv-view-button){
right: 0;
}`;
      } else {
        css += ` .simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product .simesy-product-image-area .simesy-cart-button a.button:not(.sp-wqvpro-view-button):not(.sp-wqv-view-button){
left: 0;
}`;
      }
    }
    if ("theme_nineteen" == theme_style) {
      css += `.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product .product-details:after{
border-bottom-color: ${product_info_bg};
}
.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product:hover .product-details:after{
border-bottom-color: ${product_info_bg_hover};
}

`;
    }
    if ("theme_twenty" == theme_style.trim()) {
      var product_box_shadow_color = config.product_box_shadow_color,
        product_box_shadow_hover_color = config.product_box_shadow_hover_color;
      css += ` #simesy-slider-section.simesy-slider-section-${id}.simesy_theme_twenty .simesy-product .product-wishlist-com{
border-top: 1px solid ${product_box_shadow_color};
}
#simesy-slider-section.simesy-slider-section-${id}.simesy_theme_twenty .simesy-product .simesy-product-box{
-webkit-box-shadow: 0 0 10px 0 ${product_box_shadow_color};
-moz-box-shadow: 0 0 10px 0 ${product_box_shadow_color};
box-shadow: 0 0 10px 0 ${product_box_shadow_color};
}
#simesy-slider-section.simesy-slider-section-${id}.simesy_theme_twenty .simesy-product:hover .simesy-product-box{
-webkit-box-shadow: 0 0 10px 0 ${product_box_shadow_hover_color};
-moz-box-shadow: 0 0 10px 0 ${product_box_shadow_hover_color};
box-shadow: 0 0 10px 0 ${product_box_shadow_hover_color};
}

`;
    }
    if ("theme_twenty_one" == theme_style) {
      var product_box_shadow_color = config.product_box_shadow_color,
        product_box_shadow_hover_color = config.product_box_shadow_hover_color;
      css += `#simesy-slider-section.simesy-slider-section-${id}.simesy_theme_twenty_one .simesy-product .product-wishlist-com{
border-top: 1px solid ${product_box_shadow_color};
}
#simesy-slider-section.simesy-slider-section-${id}.simesy_theme_twenty_one .simesy-product .simesy-product-box{
-webkit-box-shadow: 0 0 10px 0 ${product_box_shadow_color};
-moz-box-shadow: 0 0 10px 0 ${product_box_shadow_color};
box-shadow: 0 0 10px 0 ${product_box_shadow_color};
}
#simesy-slider-section.simesy-slider-section-${id}.simesy_theme_twenty_one .simesy-product:hover .simesy-product-box{
-webkit-box-shadow: 0 0 10px 0 ${product_box_shadow_hover_color};
-moz-box-shadow: 0 0 10px 0 ${product_box_shadow_hover_color};
box-shadow: 0 0 10px 0 ${product_box_shadow_hover_color};
}

`;
    }
    if ("theme_twenty_four" == theme_style) {
      var product_top_info_bg = config.product_top_info_bg,
        btn_border_color = config.product_button_border_color;
      css += `
.simesy-slider-section #simesy-product-slider-${id}.simesy-product-section .simesy-product .simesy-product-add-to-cart{
background-color:${product_top_info_bg};
}
#simesy-slider-section.simesy-slider-section-${id} .simesy-product .simesy-product-add-to-cart ul li{
border-color:${btn_border_color} !important;
}
#simesy-slider-section.simesy-slider-section-${id} .simesy-product .compare-button a{
color: #ffffff;
}
#simesy-slider-section.simesy-slider-section-${id} .simesy-product .compare-button a:hover,
#simesy-slider-section.simesy-slider-section-${id} .simesy-product .compare-button a.added{
color: #ffffff;
}
#simesy-slider-section.simesy-slider-section-${id} .simesy-product .simesy-product-image-area a.sp-simesy-wqv-button:hover{
color: #ffffff;
}
`;
    }
    if ("theme_twenty_five" == theme_style) {
      var product_box_shadow_color = config.product_box_shadow_color,
        product_box_shadow_hover_color = config.product_box_shadow_hover_color;
      css += `#simesy-slider-section.simesy-slider-section-${id}.simesy_theme_twenty_one .simesy-product .product-wishlist-com{
border-top: 1px solid ${product_box_shadow_color};
}
#simesy-slider-section.simesy-slider-section-${id}.simesy_theme_twenty_five .simesy-product .simesy-product-box{
-webkit-box-shadow: 0 0 10px 0 ${product_box_shadow_color};
-moz-box-shadow: 0 0 10px 0 ${product_box_shadow_color};
box-shadow: 0 0 10px 0 ${product_box_shadow_color};
}
#simesy-slider-section.simesy-slider-section-${id}.simesy_theme_twenty_five .simesy-product:hover .simesy-product-box{
-webkit-box-shadow: 0 0 10px 0 ${product_box_shadow_hover_color};
-moz-box-shadow: 0 0 10px 0 ${product_box_shadow_hover_color};
box-shadow: 0 0 10px 0 ${product_box_shadow_hover_color};
}`;
    }

    if ("theme_twenty_seven" == theme_style) {
      css += `#simesy-slider-section.simesy-slider-section-${id} .simesy-product-section .simesy-product .product-details-inner{
background: linear-gradient( rgba(0, 0, 0, 0), ${product_info_gradient} 90%);
}`;
    }
    if ("theme_two" == theme_style) {
      css += `
#simesy-slider-section.simesy-slider-section-${id} .simesy-product-section .simesy-product .product-details-inner{
background-color: ${product_info_bg};
}`;
    }
    if ("theme_sixteen" == theme_style && config.product_content_more_button) {
      css += `
#simesy-slider-section.simesy-slider-section-${id} .simesy-product-section .simesy-product .simesy-product-more-content a{
color: ${config.product_content_more_button_color};
}
#simesy-slider-section.simesy-slider-section-${id} .simesy-product-section .simesy-product .simesy-product-more-content a:hover{
color: ${config.product_content_more_button_hover_color};
`;
    }
    // Responsive
    css += `/* lg */
@media (min-width: 900px) and (max-width:1100px) {
.sp-simesy-col-lg-1{
width: 100%;
}
.sp-simesy-col-lg-2{
width: 50%;
}
.sp-simesy-col-lg-3{
width: 33.2222%;
}
.sp-simesy-col-lg-4{
width: 24.9%;
}
.sp-simesy-col-lg-5{
width: 19.9%;
}
.sp-simesy-col-lg-6{
width: 16.6667%;
}
.sp-simesy-col-lg-7 {
width: 14.285714286%;
}
.sp-simesy-col-lg-8 {
width: 12.5%;
}
.sp-simesy-col-lg-9 {
width: 11.111111111%;
}
.sp-simesy-col-lg-10 {
width: 10%;
}
.sp-simesy-col-lg-11 {
width: 9.090909091%;
}
.sp-simesy-col-lg-12 {
width: 8.333333333%;
}

}
/* md */
@media (min-width: 650px) and (max-width: 990px) {
.sp-simesy-col-md-1{
width: 100%;
}
.sp-simesy-col-md-2{
width: 50%;
}
.sp-simesy-col-md-3{
width: 33.2222%;
}
.sp-simesy-col-md-4{
width: 24.9%;
}
.sp-simesy-col-md-5{
width: 19.9%;
}
.sp-simesy-col-md-6{
width: 16.6667%;
}
.sp-simesy-col-md-7 {
width: 14.285714286%;
}
.sp-simesy-col-md-8 {
width: 12.5%;
}
.sp-simesy-col-md-9 {
width: 11.111111111%;
}
.sp-simesy-col-md-10 {
width: 10%;
}
.sp-simesy-col-md-11 {
width: 9.090909091%;
}
.sp-simesy-col-md-12 {
width: 8.333333333%;
}

}

/* sm */
@media (max-width: 650px) {
.sp-simesy-col-sm-1{
width: 100%;
}
.sp-simesy-col-sm-2{
width: 49.9%;
}
.sp-simesy-col-sm-3{
width: 33.2222%;
}
.sp-simesy-col-sm-4{
width: 24.9%;
}
.sp-simesy-col-sm-5{
width: 19.9%;
}
.sp-simesy-col-sm-6{
width: 16.6667%;
}
.sp-simesy-col-sm-7 {
width: 14.285714286%;
}
.sp-simesy-col-sm-8 {
width: 12.5%;
}
.sp-simesy-col-sm-9 {
width: 11.111111111%;
}
.sp-simesy-col-sm-10 {
width: 10%;
}
.sp-simesy-col-sm-11 {
width: 9.090909091%;
}
.sp-simesy-col-sm-12 {
width: 8.333333333%;
}

}`;

    $(".simesy-slider-section-" + id).before(`<style>${css}</style>`);
    var html = "";
    var slider_data =
      ' data-layout="' + layout_present + '" data-preloader=' + pre_loader + "";
    var filter_style_class =
      layout_present == "grid" ? " filter_style_" + config.filter_style[0] : "";
    if (layout_present == "slider") {
      if (carousel_ticker_mode == "false") {
        var columns_1 =
            config.columns.number1 != "" ? config.columns.number1 : "4",
          columns_2 =
            config.columns.number2 != "" ? config.columns.number2 : "3",
          columns_3 =
            config.columns.number3 != "" ? config.columns.number3 : "2",
          columns_4 =
            config.columns.number4 != "" ? config.columns.number4 : "1",
          carousel_auto_play = config.carousel_auto_play,
          carousel_auto_play_speed =
            config.carousel_auto_play_speed != ""
              ? config.carousel_auto_play_speed
              : "3000",
          carousel_scroll_speed =
            config.carousel_scroll_speed != ""
              ? config.carousel_scroll_speed
              : "600",
          slides_to_scroll_1 =
            config.slides_to_scroll.number1 != ""
              ? config.slides_to_scroll.number1
              : "1",
          slides_to_scroll_2 =
            config.slides_to_scroll.number2 != ""
              ? config.slides_to_scroll.number2
              : "1",
          slides_to_scroll_3 =
            config.slides_to_scroll.number3 != ""
              ? config.slides_to_scroll.number3
              : "1",
          slides_to_scroll_4 =
            config.slides_to_scroll.number4 != ""
              ? config.slides_to_scroll.number4
              : "1";
        slider_data +=
          ' data-mode="normal" data-lightbox="' +
          image_lightbox +
          '" data-arrowicon="' +
          navigation_arrow_type +
          '" data-slick=\'{"dots": ' +
          pagi_desktop +
          ', "pauseOnHover": ' +
          carousel_pause_on_hover +
          ', "slidesToShow": ' +
          columns_1 +
          ', "speed": ' +
          carousel_scroll_speed +
          ', "arrows": ' +
          nav_desktop +
          ', "autoplay": ' +
          carousel_auto_play +
          ', "autoplaySpeed": ' +
          carousel_auto_play_speed +
          ', "swipe": ' +
          carousel_swipe +
          ', "draggable": ' +
          carousel_draggable +
          ', "rtl": ' +
          rtl_mode +
          ', "infinite": ' +
          carousel_infinite +
          ', "slidesToScroll": ' +
          slides_to_scroll_1 +
          ', "rows": ' +
          slider_row_1 +
          ', "responsive": [ {"breakpoint": 1100, "settings": { "slidesToShow": ' +
          columns_2 +
          ', "slidesToScroll": ' +
          slides_to_scroll_2 +
          ', "rows": ' +
          slider_row_1 +
          ' } }, {"breakpoint": 990, "settings": { "slidesToShow": ' +
          columns_3 +
          ', "slidesToScroll": ' +
          slides_to_scroll_3 +
          ', "rows": ' +
          slider_row_4 +
          ' } }, {"breakpoint":650, "settings": { "slidesToShow": ' +
          columns_4 +
          ', "slidesToScroll": ' +
          slides_to_scroll_4 +
          ', "rows": ' +
          slider_row_4 +
          ', "dots": ' +
          pagi_mobile +
          ', "arrows": ' +
          nav_mobile +
          " } } ] }'";
      } else {
        var ticker_scroll_speed = config.ticker_scroll_speed,
          carousel_slide_width = config.carousel_slide_width,
          columnss_ticker_1 =
            config.columnss_ticker.number1 != ""
              ? config.columnss_ticker.number1
              : "5",
          columnss_ticker_4 =
            config.columnss_ticker.number4 != ""
              ? config.columnss_ticker.number4
              : "2";
        slider_data +=
          ' data-mode="ticker" data-ticker=\'{ "pauseOnHover": ' +
          carousel_pause_on_hover +
          ', "speed": ' +
          ticker_scroll_speed +
          ', "rtl": ' +
          rtl_mode +
          ', "maxColumn":' +
          columnss_ticker_1 +
          ', "minColumn":' +
          columnss_ticker_4 +
          ', "slideMargin":' +
          product_margin +
          ', "slideWidth":' +
          carousel_slide_width +
          " }'";
      }
    } else {
    }
    html += '<h2 class="simesy-section-title">' + config.title + "</h2>";
    if (pre_loader) {
      html +=
        '<div class="simesy-preloader" id="simesy-preloader-' +
        id +
        '" style=""><img src=" https://demo.shapedplugin.com/woocommerce-product-slider/wp-content/plugins/woo-product-slider-pro/admin/assets/images/preloader.gif "/></div>';
    }
    html +=
      '<div id="simesy-product-slider-' +
      id +
      '" class="simesy-product-section simesy-product-section-' +
      id +
      ' normal" ' +
      slider_data +
      ">";
    html += "</div>";
    html += "</div></div>";
    $(".simesy-slider-section-" + id).addClass(
      "navigation_position_" +
        navigation_position +
        " pagination-type-" +
        pagination_type +
        " " +
        filter_style_class +
        " simesy_" +
        config.theme_style +
        ""
    );

    $(".simesy-slider-section-" + id).html(html);
    /*$.each(config.product, function (i, v) {
      $.ajax({
        async: false,
        url: '/products/' + v.handle + '.js',
        type: 'get',
        dataType: 'JSON',
        success: function (response) {
          let item_product = response;
          data_all.push(
            {
              available: item_product.available, image: item_product.featured_image, url: item_product.url, title: item_product.title, description: item_product.description,
              price: item_product.price, compare_price: item_product.compare_at_price, id: item_product.variants[0].id
            }
          );

        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log('An Error Occured: ' + jqXHR.status + ' ' + errorThrown + '! Please contact System Administrator!');
        }
      })
    })*/
    $.each(list_products, function (index, value) {
      var avai = value.status == "active" ? true : false;
      data_all.push({
        available: avai,
        image: value.image.src,
        url: "/products/" + value.handle,
        title: value.title,
        description: value.body_html,
        price: value.variants[0].price,
        compare_price: value.variants[0].compare_at_price,
        id: value.variants[0].id,
      });
    });
    $.each(data_all, function (index, product_data) {
      var html_img = "",
        html_img_box = "",
        html_title = "",
        html_des = "",
        html_price = "";
      var class_gird =
        layout_present == "grid"
          ? "simesy-masonry-item sp-simesy-col-xl-4 sp-simesy-col-lg-3 sp-simesy-col-md-2 sp-simesy-col-sm-1"
          : "";
      var html_theme =
        '<div class="simesy-product ' +
        class_gird +
        '"><div class="simesy-product-data">';

      if (product_image) {
        function imgURL(src, size) {
          return src
            .replace(
              /_(pico|icon|thumb|small|compact|medium|large|grande|original|1024x1024|2048x2048|master)+\./g,
              "."
            )
            .replace(/\.jpg|\.png|\.gif|\.jpeg/g, function (match) {
              return "_" + size + match;
            });
        }
        var href_image = product_data.url;
        if (image_lightbox) {
          href_image = product_data.image;
        }
        var attr_title = "";
        if (image_title_attr) {
          attr_title = 'alt="' + product_data.title + '"';
        }
        html_img +=
          '<a href="' +
          href_image +
          '" target="' +
          product_link_target +
          '" class="simesy-product-image sp-simesy-lightbox ' +
          image_gray_scale +
          '">';
        if ("theme_thirteen" == theme_style) {
          html_img += '<div class="product-overlay-color"></div>';
        }
        html_img +=
          '<img src="' +
          imgURL(product_data.image, image_size_w + "x" + image_size_h) +
          '" class="simesy-product-img" ' +
          attr_title +
          "/>";
        html_img_box +=
          '<div class="simesy-product-image-area"><a href="' +
          href_image +
          '" target="' +
          product_link_target +
          '" class="simesy-product-image sp-simesy-lightbox ' +
          image_gray_scale +
          '"><img src="' +
          imgURL(product_data.image, image_size_w + "x" + image_size_h) +
          '" class="simesy-product-img" ' +
          attr_title +
          "/></a></div>";
        if (theme_style != "theme_twenty_two") {
          if (!product_data.available && out_of_stock_ribbon) {
            html_img +=
              '<div class="simesy-out-of-stock" title="' +
              out_of_stock_ribbon_text +
              '">' +
              out_of_stock_ribbon_text +
              "</div>";
          }
          if (sale_ribbon && product_data.compare_price > product_data.price) {
            html_img +=
              '<div class="sale_text" title="' +
              sale_ribbon_text +
              '">' +
              sale_ribbon_text +
              "</div>";
          }
        }
        html_img += "</a>";
      }

      if (product_name) {
        var title_p = product_data.title;
        if (product_name_word_limit) {
          title_p = smartTrim(
            title_p,
            product_name_word_limit_number,
            product_name_word_limit_after
          );
        }
        html_title +=
          '<div class="simesy-product-title"><a href="' +
          product_data.url +
          '" target="' +
          product_link_target +
          '">' +
          title_p +
          "</a></div>";
      }
      if (pro_price) {
        html_price += '<div class="simesy-product-price">';
        if (product_data.compare_price > product_data.price) {
          html_price +=
            '<del><span class="amount">' +
            theme.Currency.formatMoney(
              product_data.compare_price,
              theme.moneyFormat
            ) +
            "</span></del>";
        }
        html_price +=
          '<span class="amout">' +
          theme.Currency.formatMoney(product_data.price, theme.moneyFormat) +
          "</span>";
        html_price += "</div>";
      }
      if (pro_des) {
        var des = product_data.description;
        if (config.product_content_type == "short_description") {
          des = des.replace(/(<([^>]+)>)/gi, "");
          //des = des.slice(0,config.product_content_word_limit) + (des.length > config.product_content_word_limit ? '...' : '');
          des = smartTrim(
            des,
            product_des_word_limit_number,
            product_des_word_limit_after
          );
        }
        html_des += '<div class="simesy-product-content">' + des;
        if (
          (theme_style == "theme_three" || theme_style == "theme_sixteen") &&
          config.product_content_more_button
        ) {
          html_des +=
            '<div class="simesy-product-more-content"><a href="' +
            product_data.url +
            '" target="' +
            product_link_target +
            '">' +
            config.product_content_more_button_text +
            "</a></div>";
        }
        html_des += "</div>";
      }
      if (theme_style == "theme_three") {
        html_theme += '<div class="simesy-product-image-area">' + html_img + "";
        if (add_to_cart_button) {
          html_theme +=
            '<div class="simesy-cart-button"><p class="product woocommerce add_to_cart_inline ">';
          html_theme +=
            '<a href="javascript:void(0)" class="button add-to-cart" data-id="' +
            product_data.id +
            '"><i class="fa fa-spinner" aria-hidden="true"></i>Add to cart</a>';
          html_theme += "</p></div>";
        }
        html_theme += "</div>";
        html_theme +=
          '<div class="product-details"><div class="product-details-inner">' +
          html_title +
          html_price +
          html_des +
          "</div></div>";
      } else if (theme_style == "theme_four") {
        html_theme += '<div class="simesy-product-image-area">' + html_img;
        html_theme +=
          '<div class="product-details"><div class="product-details-inner">' +
          html_title +
          html_price;
        if (add_to_cart_button) {
          html_theme +=
            '<div class="simesy-cart-button"><p class="product woocommerce add_to_cart_inline ">';
          html_theme +=
            '<a href="javascript:void(0)" class="button add-to-cart" data-id="' +
            product_data.id +
            '"><i class="fa fa-spinner" aria-hidden="true"></i>Add to cart</a>';
          html_theme += "</p></div>";
        }
        html_theme += "</div>";
        html_theme += "</div>";
      } else if (theme_style == "theme_five") {
        html_theme += '<div class="simesy-product-image-area">' + html_img;
        if (add_to_cart_button) {
          html_theme += '<div class="simesy-buttons-area sp-text-center">';
          html_theme +=
            '<div class="simesy-cart-button"><p class="product woocommerce add_to_cart_inline ">';
          html_theme +=
            '<a href="javascript:void(0)" class="button add-to-cart" data-id="' +
            product_data.id +
            '"><i class="fa fa-spinner" aria-hidden="true"></i>Add to cart</a>';
          html_theme += "</p></div>";
          html_theme +=
            '<div class="simesy-view-details"><a href="' +
            product_data.url +
            '" target="' +
            product_link_target +
            '">View Detail</a></div>';
          html_theme += "</div>";
        }
        html_theme += "</div>";
        html_theme +=
          '<div class="product-details"><div class="product-details-inner">' +
          html_title +
          html_price +
          "</div></div";
      } else if (theme_style == "theme_six") {
        html_theme += '<div class="simesy-product-image-area">' + html_img;
        if (add_to_cart_button) {
          html_theme += '<div class="simesy-buttons-area sp-text-center">';
          html_theme +=
            '<div class="simesy-cart-button"><p class="product woocommerce add_to_cart_inline ">';
          html_theme +=
            '<a href="javascript:void(0)" class="button add-to-cart" data-id="' +
            product_data.id +
            '"><i class="fa fa-spinner" aria-hidden="true"></i>Add to cart</a>';
          html_theme += "</p></div>";
          html_theme += "</div>";
        }
        html_theme += "</div>";
        html_theme +=
          '<div class="product-details"><div class="product-details-inner">' +
          html_title +
          html_price +
          "</div></div";
      } else if (theme_style == "theme_seven") {
        html_theme +=
          '<div class="simesy-product-image-area"><div class="product-overlay-color"></div>';
        html_theme +=
          '<div class="product-details"><div class="product-details-inner">' +
          html_title +
          html_price +
          "</div></div>";
        html_theme += html_img;
        if (add_to_cart_button) {
          html_theme += '<div class="simesy-buttons-area sp-text-center">';
          html_theme +=
            '<div class="simesy-cart-button"><p class="product woocommerce add_to_cart_inline ">';
          html_theme +=
            '<a href="javascript:void(0)" class="button add-to-cart" data-id="' +
            product_data.id +
            '"><i class="fa fa-spinner" aria-hidden="true"></i>Add to cart</a>';
          html_theme += "</p></div>";
          html_theme += "</div>";
        }
        html_theme += "</div>";
      } else if (theme_style == "theme_eight") {
        html_theme += '<div class="simesy-product-image-area">' + html_img + "";
        if (add_to_cart_button) {
          html_theme += '<div class="simesy-buttons-area sp-text-right">';
          html_theme +=
            '<div class="simesy-cart-button"><p class="product woocommerce add_to_cart_inline ">';
          html_theme +=
            '<a href="javascript:void(0)" class="button add-to-cart" data-id="' +
            product_data.id +
            '"><i class="fa fa-spinner" aria-hidden="true"></i>Add to cart</a>';
          html_theme += "</p></div>";
          html_theme += "</div>";
        }
        html_theme += "</div>";
        html_theme +=
          '<div class="product-details"><div class="product-details-inner">' +
          html_title +
          html_price +
          "</div></div>";
      } else if (theme_style == "theme_nine") {
        html_theme += '<div class="simesy-product-image-area">' + html_img + "";
        if (add_to_cart_button) {
          html_theme += '<div class="simesy-buttons-area sp-text-center">';
          html_theme +=
            '<div class="simesy-cart-button"><p class="product woocommerce add_to_cart_inline ">';
          html_theme +=
            '<a href="javascript:void(0)" class="button add-to-cart" data-id="' +
            product_data.id +
            '"><i class="fa fa-spinner" aria-hidden="true"></i>Add to cart</a>';
          html_theme += "</p></div>";
          html_theme += "</div>";
        }
        html_theme += "</div>";
        html_theme +=
          '<div class="product-details"><div class="product-details-inner">' +
          html_title +
          html_price +
          "</div></div>";
      } else if (theme_style == "theme_eleven") {
        html_theme +=
          '<div class="simesy-product-image-area"><div class="product-overlay-color"></div>' +
          html_img +
          "";
        html_theme +=
          '<div class="product-details"><div class="product-details-inner">' +
          html_title +
          "";
        html_theme +=
          '<div class="product-details-inner-inner">' + html_price + html_des;
        if (add_to_cart_button) {
          html_theme +=
            '<div class="simesy-cart-button"><p class="product woocommerce add_to_cart_inline ">';
          html_theme +=
            '<a href="javascript:void(0)" class="button add-to-cart" data-id="' +
            product_data.id +
            '"><i class="fa fa-spinner" aria-hidden="true"></i>Add to cart</a>';
          html_theme += "</p></div>";
        }
        html_theme += "</div>";
        html_theme += "</div></div>";
        html_theme += "</div>";
      } else if (theme_style == "theme_thirteen") {
        html_theme += '<div class="simesy-product-image-area">';
        if (add_to_cart_button) {
          html_theme +=
            '<div class="simesy-cart-button"><p class="product woocommerce add_to_cart_inline ">';
          html_theme +=
            '<a href="javascript:void(0)" class="button add-to-cart" data-id="' +
            product_data.id +
            '"><i class="fa fa-spinner" aria-hidden="true"></i>Add to cart</a>';
          html_theme += "</p></div>";
        }
        html_theme += html_img;
        html_theme += "</div>";
        html_theme +=
          '<div class="product-details"><div class="product-details-inner">' +
          html_title +
          html_price +
          "</div>";
      } else if (theme_style == "theme_fourteen") {
        html_theme += html_img;
        html_theme += '<div class="product-details">';
        html_theme +=
          '<div class="product-details-inner">' +
          html_title +
          html_price +
          "</div>";
        if (add_to_cart_button) {
          html_theme +=
            '<div class="simesy-cart-button"><p class="product woocommerce add_to_cart_inline ">';
          html_theme +=
            '<a href="javascript:void(0)" class="button add-to-cart" data-id="' +
            product_data.id +
            '"><i class="fa fa-spinner" aria-hidden="true"></i>Add to cart</a>';
          html_theme += "</p></div>";
        }
        html_theme += "</div>";
      } else if (theme_style == "theme_fifteen") {
        html_theme += '<div class="simesy-product-image-area">' + html_img;
        if (add_to_cart_button) {
          html_theme +=
            '<div class="simesy-cart-button"><p class="product woocommerce add_to_cart_inline ">';
          html_theme +=
            '<a href="javascript:void(0)" class="button add-to-cart" data-id="' +
            product_data.id +
            '"><i class="fa fa-spinner" aria-hidden="true"></i>Add to cart</a>';
          html_theme += "</p></div>";
        }
        html_theme += "</div>";
        html_theme +=
          '<div class="product-details"><div class="product-details-inner">' +
          html_title +
          html_price +
          "</div></div>";
      } else if (theme_style == "theme_sixteen") {
        html_theme +=
          '<div class="simesy-product-image-area">' + html_img + "</div>";
        html_theme +=
          '<div class="product-details"><div class="product-details-inner">' +
          html_title +
          html_price +
          html_des;
        if (add_to_cart_button) {
          html_theme +=
            '<div class="simesy-cart-button"><p class="product woocommerce add_to_cart_inline ">';
          html_theme +=
            '<a href="javascript:void(0)" class="button add-to-cart" data-id="' +
            product_data.id +
            '"><i class="fa fa-spinner" aria-hidden="true"></i>Add to cart</a>';
          html_theme += "</p></div>";
        }
        html_theme += "</div></div>";
      } else if (theme_style == "theme_seventeen") {
        html_theme += '<div class="simesy-product-image-area">' + html_img;
        if (add_to_cart_button) {
          html_theme +=
            '<div class="simesy-cart-button"><p class="product woocommerce add_to_cart_inline ">';
          html_theme +=
            '<a href="javascript:void(0)" class="button add-to-cart" data-id="' +
            product_data.id +
            '"><i class="fa fa-spinner" aria-hidden="true"></i>Add to cart</a>';
          html_theme += "</p></div>";
        }
        html_theme += "</div>";
        html_theme +=
          '<div class="product-details"><div class="product-details-inner">' +
          html_title +
          html_price +
          "</div></div>";
      } else if (theme_style == "theme_eighteen") {
        //html_theme += html_img;
        html_theme +=
          '<div class="product-details"><div class="product-details-inner">' +
          html_price +
          html_title +
          html_des;
        if (add_to_cart_button) {
          html_theme +=
            '<div class="simesy-cart-button"><p class="product woocommerce add_to_cart_inline ">';
          html_theme +=
            '<a href="javascript:void(0)" class="button add-to-cart" data-id="' +
            product_data.id +
            '"><i class="fa fa-spinner" aria-hidden="true"></i>Add to cart</a>';
          html_theme += "</p></div>";
        }
        html += "</div>";
        html_theme += "</div>";
      } else if (theme_style.trim() == "theme_twenty") {
        html_theme += '<div class="simesy-product-box">';
        html_theme += '<div class="simesy-product-cat"></div>';
        html_theme += html_title;
        html_theme += html_img_box;
        html_theme +=
          '<div class="product-details"><div class="product-details-inner">' +
          html_price +
          "</div></div>";
        html_theme += '<div class="product-wishlist-com">';
        html_theme +=
          '<div class="woocommerce product compare-button"><a href="javascript:void(0)" class="compare">Compare</a></div>';
        html_theme +=
          '<div class="yith-wcwl-add-to-wishlist"><div class="yith-wcwl-add-button"><a href="javascript:void(0)" class="add_to_wishlist single_add_to_wishlist" data-title="Wishlist"><i class="yith-wcwl-icon fa fa-heart-o"></i><span>Wishlist</span></a></div></div>';
        html_theme += "</div>";
        html_theme += "</div>";
      } else if (theme_style == "theme_twenty_one") {
        html_theme += '<div class="simesy-product-box">';
        html_theme += html_img_box;
        html_theme += '<div class="simesy-product-content-area">';
        html_theme +=
          '<div class="product-details"><div class="product-details-inner sp-text-left">' +
          html_title +
          html_price +
          "</div></div>";
        html_theme += '<div class="product-wishlist-com">';
        html_theme +=
          '<div class="woocommerce product compare-button"><a href="javascript:void(0)" class="compare">Compare</a></div>';
        html_theme +=
          '<div class="yith-wcwl-add-to-wishlist"><div class="yith-wcwl-add-button"><a href="javascript:void(0)" class="add_to_wishlist single_add_to_wishlist" data-title="Wishlist"><i class="yith-wcwl-icon fa fa-heart-o"></i><span>Wishlist</span></a></div></div>';
        html_theme += "</div>";
        html_theme += "</div>";
        html_theme += "</div>";
      } else if (theme_style == "theme_twenty_two") {
        html_theme +=
          '<div class="product-details"><div class="product-details-inner sp-text-left">' +
          html_title +
          html_price +
          "</div></div>";
        html_theme += html_img;
      } else if (theme_style == "theme_twenty_three") {
        html_theme += '<div class="simesy-product-image-area">';
        html_theme += html_img;
        html_theme += '<div class="simesy-product-add-to-cart sp-text-center">';
        if (add_to_cart_button) {
          html_theme +=
            '<div class="simesy-cart-button"><p class="product woocommerce add_to_cart_inline ">';
          html_theme +=
            '<a href="javascript:void(0)" class="button add-to-cart" data-id="' +
            product_data.id +
            '"><i class="fa fa-spinner" aria-hidden="true"></i>Add to cart</a>';
          html_theme += "</p></div>";
        }
        html_theme += "</div>";
        html_theme +=
          '<div class="product-details"><div class="product-details-inner sp-text-center">' +
          html_title +
          html_price +
          "</div></div>";
        html_theme += "</div>";
      } else if (theme_style == "theme_twenty_four") {
        html_theme += '<div class="simesy-product-image-area">';
        html_theme += html_img;
        html_theme += '<div class="simesy-product-add-to-cart sp-text-center">';
        html_theme += "<ul>";
        html_theme += "<li>";
        if (add_to_cart_button) {
          html_theme +=
            '<div class="simesy-cart-button"><p class="product woocommerce add_to_cart_inline ">';
          html_theme +=
            '<a href="javascript:void(0)" class="button add-to-cart" data-id="' +
            product_data.id +
            '"><i class="fa fa-spinner" aria-hidden="true"></i>Add to cart</a>';
          html_theme += "</p></div>";
        }
        html_theme += "</li>";
        html_theme +=
          '<li><div class="woocommerce product compare-button"><a class="compare" href="' +
          product_data.url +
          '">Compare</a></div></li>';
        html_theme +=
          '<li><a href="javascript:void(0)" class="button sp-wqv-view-button sp-simesy-wqv-button"></a></li>';
        html_theme +=
          '<li><div class="yith-wcwl-add-to-wishlist"><div class="yith-wcwl-add-button"><a href="javascript:void(0)" class="add_to_wishlist single_add_to_wishlist" data-title="Wishlist"><i class="yith-wcwl-icon fa fa-heart-o"></i><span>Wishlist</span></a></div></div></li>';
        html_theme += "</ul>";
        html_theme += "</div>";
        html_theme += "</div>";
        html_theme +=
          '<div class="product-details"><div class="product-details-inner">' +
          html_title +
          html_price +
          "</div></div>";
      } else if (
        theme_style == "theme_twenty_five" ||
        theme_style == "theme_twenty_six"
      ) {
        html_theme += '<div class="simesy-product-box">';
        html_theme += html_img;
        html_theme +=
          '<div class="product-details"><div class="product-details-inner sp-text-left">';
        html_theme +=
          '<div class="simesy-product-title-price">' + html_title + html_price;
        html_theme += "</div>";
        if (add_to_cart_button) {
          html_theme +=
            '<div class="simesy-cart-button"><p class="product woocommerce add_to_cart_inline ">';
          html_theme +=
            '<a href="javascript:void(0)" class="button add-to-cart" data-id="' +
            product_data.id +
            '"><i class="fa fa-spinner" aria-hidden="true"></i>Add to cart</a>';
          html_theme += "</p></div>";
        }
        html_theme == "</div></div>";
        html_theme += "</div>";
      } else if (theme_style == "theme_twenty_seven") {
        html_theme += html_img;
        html_theme +=
          '<div class="product-details"><div class="product-details-inner">' +
          html_title +
          html_price;
        if (add_to_cart_button) {
          html_theme +=
            '<div class="simesy-cart-button"><p class="product woocommerce add_to_cart_inline ">';
          html_theme +=
            '<a href="javascript:void(0)" class="button add-to-cart" data-id="' +
            product_data.id +
            '"><i class="fa fa-spinner" aria-hidden="true"></i>Add to cart</a>';
          html_theme += "</p></div>";
        }
        html_theme += "</div></div>";
      } else {
        html_theme += html_img;
        html_theme +=
          '<div class="product-details"><div class="product-details-inner">' +
          html_title +
          html_price;
        if (add_to_cart_button) {
          html_theme +=
            '<div class="simesy-cart-button"><p class="product woocommerce add_to_cart_inline ">';
          html_theme +=
            '<a href="javascript:void(0)" class="button add-to-cart" data-id="' +
            product_data.id +
            '"><i class="fa fa-spinner" aria-hidden="true"></i>Add to cart</a>';
          html_theme += "</p></div>";
        }
        html_theme += "</div>";
      }
      html_theme += "</div></div>";
      $("#simesy-product-slider-" + id + "").append(html_theme);
    });
    function smartTrim(str, length, appendix) {
      var check_array = str.split(" ");
      var str_title = str.split(/\s+/).slice(0, length).join(" ");
      if (check_array.length >= length) {
        str_title += appendix;
      }
      return str_title;
    }
  };

  if (typeof jQuery === "undefined" || parseFloat(jQuery.fn.jquery) < 1.7) {
    loadScript(
      "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js",
      function () {
        //     jQuery191 = jQuery.noConflict(true);
        initProductSliderLibrary(jQuery);
        initProductSlider(jQuery);
      }
    );
  } else {
    initProductSliderLibrary(jQuery);
    initProductSlider(jQuery);
  }
})();
