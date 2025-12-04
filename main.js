(() => {
  var t, e, r = Object.create,
    n = Object.defineProperty,
    i = Object.getOwnPropertyDescriptor,
    s = Object.getOwnPropertyNames,
    o = Object.getPrototypeOf,
    a = Object.prototype.hasOwnProperty,
    u = (t = (t, e) => {
      var r, n;
      r = t, n = function () {
        "use strict";
        var t = document,
          e = t.createTextNode.bind(t);

        function r(t, e, r) {
          t.style.setProperty(e, r)
        }

        function n(t, e) {
          return t.appendChild(e)
        }

        function i(e, r, i, s) {
          var o = t.createElement("span");
          return r && (o.className = r), i && (!s && o.setAttribute("data-" + r, i), o.textContent = i), e && n(e, o) || o
        }

        function s(t, e) {
          return t.getAttribute("data-" + e)
        }

        function o(e, r) {
          return e && 0 != e.length ? e.nodeName ? [e] : [].slice.call(e[0].nodeName ? e : (r || t).querySelectorAll(e)) : []
        }

        function a(t) {
          for (var e = []; t--;) e[t] = [];
          return e
        }

        function u(t, e) {
          t && t.some(e)
        }

        function l(t) {
          return function (e) {
            return t[e]
          }
        }
        var c = {};

        function f(t, e, r) {
          var n = r.indexOf(t);
          if (-1 == n) r.unshift(t), u(c[t].depends, (function (e) {
            f(e, t, r)
          }));
          else {
            var i = r.indexOf(e);
            r.splice(n, 1), r.splice(i, 0, t)
          }
          return r
        }

        function h(t, e, r, n) {
          return {
            by: t,
            depends: e,
            key: r,
            split: n
          }
        }

        function p(t) {
          return f(t, 0, []).map(l(c))
        }

        function d(t) {
          c[t.by] = t
        }

        function g(t, r, s, a, l) {
          t.normalize();
          var c = [],
            f = document.createDocumentFragment();
          a && c.push(t.previousSibling);
          var h = [];
          return o(t.childNodes).some((function (t) {
            if (!t.tagName || t.hasChildNodes()) {
              if (t.childNodes && t.childNodes.length) return h.push(t), void c.push.apply(c, g(t, r, s, a, l));
              var n = t.wholeText || "",
                o = n.trim();
              o.length && (" " === n[0] && h.push(e(" ")), u(o.split(s), (function (t, e) {
                e && l && h.push(i(f, "whitespace", " ", l));
                var n = i(f, r, t);
                c.push(n), h.push(n)
              })), " " === n[n.length - 1] && h.push(e(" ")))
            } else h.push(t)
          })), u(h, (function (t) {
            n(f, t)
          })), t.innerHTML = "", n(t, f), c
        }
        var _ = "words",
          m = h(_, 0, "word", (function (t) {
            return g(t, "word", /\s+/, 0, 1)
          })),
          v = "chars",
          y = h(v, [_], "char", (function (t, e, r) {
            var n = [];
            return u(r[_], (function (t, r) {
              n.push.apply(n, g(t, "char", "", e.whitespace && r))
            })), n
          }));

        function x(t) {
          var e = (t = t || {}).key;
          return o(t.target || "[data-splitting]").map((function (n) {
            var i = n["🍌"];
            if (!t.force && i) return i;
            i = n["🍌"] = {
              el: n
            };
            var o = p(t.by || s(n, "splitting") || v),
              a = function (t, e) {
                for (var r in e) t[r] = e[r];
                return t
              }({}, t);
            return u(o, (function (t) {
              if (t.split) {
                var s = t.by,
                  o = (e ? "-" + e : "") + t.key,
                  l = t.split(n, a, i);
                o && function (t, e, n) {
                  var i = "--" + e,
                    s = i + "-index";
                  u(n, (function (t, e) {
                    Array.isArray(t) ? u(t, (function (t) {
                      r(t, s, e)
                    })) : r(t, s, e)
                  })), r(t, i + "-total", n.length)
                }(n, o, l), i[s] = l, n.classList.add(s)
              }
            })), n.classList.add("splitting"), i
          }))
        }

        function b(t, e, r) {
          var n = o(e.matching || t.children, t),
            i = {};
          return u(n, (function (t) {
            var e = Math.round(t[r]);
            (i[e] || (i[e] = [])).push(t)
          })), Object.keys(i).map(Number).sort(w).map(l(i))
        }

        function w(t, e) {
          return t - e
        }
        x.html = function (t) {
          var e = (t = t || {}).target = i();
          return e.innerHTML = t.content, x(t), e.outerHTML
        }, x.add = d;
        var T = h("lines", [_], "line", (function (t, e, r) {
          return b(t, {
            matching: r[_]
          }, "offsetTop")
        })),
          k = h("items", 0, "item", (function (t, e) {
            return o(e.matching || t.children, t)
          })),
          M = h("rows", 0, "row", (function (t, e) {
            return b(t, e, "offsetTop")
          })),
          O = h("cols", 0, "col", (function (t, e) {
            return b(t, e, "offsetLeft")
          })),
          S = h("grid", ["rows", "cols"]),
          P = "layout",
          A = h(P, 0, 0, (function (t, e) {
            var a = e.rows = +(e.rows || s(t, "rows") || 1),
              u = e.columns = +(e.columns || s(t, "columns") || 1);
            if (e.image = e.image || s(t, "image") || t.currentSrc || t.src, e.image) {
              var l = o("img", t)[0];
              e.image = l && (l.currentSrc || l.src)
            }
            e.image && r(t, "background-image", "url(" + e.image + ")");
            for (var c = a * u, f = [], h = i(0, "cell-grid"); c--;) {
              var p = i(h, "cell");
              i(p, "cell-inner"), f.push(p)
            }
            return n(t, h), f
          })),
          C = h("cellRows", [P], "row", (function (t, e, r) {
            var n = e.rows,
              i = a(n);
            return u(r[P], (function (t, e, r) {
              i[Math.floor(e / (r.length / n))].push(t)
            })), i
          })),
          E = h("cellColumns", [P], "col", (function (t, e, r) {
            var n = e.columns,
              i = a(n);
            return u(r[P], (function (t, e) {
              i[e % n].push(t)
            })), i
          })),
          D = h("cells", ["cellRows", "cellColumns"], "cell", (function (t, e, r) {
            return r[P]
          }));
        return d(m), d(y), d(T), d(k), d(M), d(O), d(S), d(A), d(C), d(E), d(D), x
      }, "object" == typeof t && typeof e < "u" ? e.exports = n() : "function" == typeof define && define.amd ? define(n) : r.Splitting = n()
    }, () => (e || t((e = {
      exports: {}
    }).exports, e), e.exports)),
    l = ((t, e, u) => (u = null != t ? r(o(t)) : {}, ((t, e, r, o) => {
      if (e && "object" == typeof e || "function" == typeof e)
        for (let u of s(e)) !a.call(t, u) && u !== r && n(t, u, {
          get: () => e[u],
          enumerable: !(o = i(e, u)) || o.enumerable
        });
      return t
    })(!e && t && t.__esModule ? u : n(u, "default", {
      value: t,
      enumerable: !0
    }), t)))(u());

  function c(t) {
    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t
  }

  function f(t, e) {
    t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e
  }
  var h, p, d, g, _, m, v, y, x, b, w, T = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: {
      lineHeight: ""
    }
  },
    k = {
      duration: .5,
      overwrite: !1,
      delay: 0
    },
    M = 1e8,
    O = 1e-8,
    S = 2 * Math.PI,
    P = S / 4,
    A = 0,
    C = Math.sqrt,
    E = Math.cos,
    D = Math.sin,
    R = function (t) {
      return "string" == typeof t
    },
    z = function (t) {
      return "function" == typeof t
    },
    F = function (t) {
      return "number" == typeof t
    },
    L = function (t) {
      return typeof t > "u"
    },
    B = function (t) {
      return "object" == typeof t
    },
    Y = function (t) {
      return !1 !== t
    },
    I = function () {
      return typeof window < "u"
    },
    X = function (t) {
      return z(t) || R(t)
    },
    N = "function" == typeof ArrayBuffer && ArrayBuffer.isView || function () { },
    q = Array.isArray,
    U = /(?:-?\.?\d|\.)+/gi,
    j = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    W = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    H = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    V = /[+-]=-?[.\d]+/,
    G = /[^,'"\[\]\s]+/gi,
    K = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
    Q = {},
    Z = {},
    $ = function (t) {
      return (Z = St(t, Q)) && Or
    },
    J = function (t, e) {
      return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()")
    },
    tt = function (t, e) {
      return !e && console.warn(t)
    },
    et = function (t, e) {
      return t && (Q[t] = e) && Z && (Z[t] = e) || Q
    },
    rt = function () {
      return 0
    },
    nt = {
      suppressEvents: !0,
      isStart: !0,
      kill: !1
    },
    it = {
      suppressEvents: !0,
      kill: !1
    },
    st = {
      suppressEvents: !0
    },
    ot = {},
    at = [],
    ut = {},
    lt = {},
    ct = {},
    ft = 30,
    ht = [],
    pt = "",
    dt = function (t) {
      var e, r, n = t[0];
      if (B(n) || z(n) || (t = [t]), !(e = (n._gsap || {}).harness)) {
        for (r = ht.length; r-- && !ht[r].targetTest(n););
        e = ht[r]
      }
      for (r = t.length; r--;) t[r] && (t[r]._gsap || (t[r]._gsap = new Ne(t[r], e))) || t.splice(r, 1);
      return t
    },
    gt = function (t) {
      return t._gsap || dt(ie(t))[0]._gsap
    },
    _t = function (t, e, r) {
      return (r = t[e]) && z(r) ? t[e]() : L(r) && t.getAttribute && t.getAttribute(e) || r
    },
    mt = function (t, e) {
      return (t = t.split(",")).forEach(e) || t
    },
    vt = function (t) {
      return Math.round(1e5 * t) / 1e5 || 0
    },
    yt = function (t) {
      return Math.round(1e7 * t) / 1e7 || 0
    },
    xt = function (t, e) {
      var r = e.charAt(0),
        n = parseFloat(e.substr(2));
      return t = parseFloat(t), "+" === r ? t + n : "-" === r ? t - n : "*" === r ? t * n : t / n
    },
    bt = function (t, e) {
      for (var r = e.length, n = 0; t.indexOf(e[n]) < 0 && ++n < r;);
      return n < r
    },
    wt = function () {
      var t, e, r = at.length,
        n = at.slice(0);
      for (ut = {}, at.length = 0, t = 0; t < r; t++)(e = n[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0)
    },
    Tt = function (t, e, r, n) {
      at.length && !p && wt(), t.render(e, r, n || p && e < 0 && (t._initted || t._startAt)), at.length && !p && wt()
    },
    kt = function (t) {
      var e = parseFloat(t);
      return (e || 0 === e) && (t + "").match(G).length < 2 ? e : R(t) ? t.trim() : t
    },
    Mt = function (t) {
      return t
    },
    Ot = function (t, e) {
      for (var r in e) r in t || (t[r] = e[r]);
      return t
    },
    St = function (t, e) {
      for (var r in e) t[r] = e[r];
      return t
    },
    Pt = function t(e, r) {
      for (var n in r) "__proto__" !== n && "constructor" !== n && "prototype" !== n && (e[n] = B(r[n]) ? t(e[n] || (e[n] = {}), r[n]) : r[n]);
      return e
    },
    At = function (t, e) {
      var r, n = {};
      for (r in t) r in e || (n[r] = t[r]);
      return n
    },
    Ct = function (t) {
      var e = t.parent || g,
        r = t.keyframes ? function (t) {
          return function (e, r) {
            for (var n in r) n in e || "duration" === n && t || "ease" === n || (e[n] = r[n])
          }
        }(q(t.keyframes)) : Ot;
      if (Y(t.inherit))
        for (; e;) r(t, e.vars.defaults), e = e.parent || e._dp;
      return t
    },
    Et = function (t, e, r, n, i) {
      void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
      var s, o = t[n];
      if (i)
        for (s = e[i]; o && o[i] > s;) o = o._prev;
      return o ? (e._next = o._next, o._next = e) : (e._next = t[r], t[r] = e), e._next ? e._next._prev = e : t[n] = e, e._prev = o, e.parent = e._dp = t, e
    },
    Dt = function (t, e, r, n) {
      void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
      var i = e._prev,
        s = e._next;
      i ? i._next = s : t[r] === e && (t[r] = s), s ? s._prev = i : t[n] === e && (t[n] = i), e._next = e._prev = e.parent = null
    },
    Rt = function (t, e) {
      t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove(t), t._act = 0
    },
    zt = function (t, e) {
      if (t && (!e || e._end > t._dur || e._start < 0))
        for (var r = t; r;) r._dirty = 1, r = r.parent;
      return t
    },
    Ft = function (t, e, r, n) {
      return t._startAt && (p ? t._startAt.revert(it) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, n))
    },
    Lt = function t(e) {
      return !e || e._ts && t(e.parent)
    },
    Bt = function (t) {
      return t._repeat ? Yt(t._tTime, t = t.duration() + t._rDelay) * t : 0
    },
    Yt = function (t, e) {
      var r = Math.floor(t /= e);
      return t && r === t ? r - 1 : r
    },
    It = function (t, e) {
      return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
    },
    Xt = function (t) {
      return t._end = yt(t._start + (t._tDur / Math.abs(t._ts || t._rts || O) || 0))
    },
    Nt = function (t, e) {
      var r = t._dp;
      return r && r.smoothChildTiming && t._ts && (t._start = yt(r._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), Xt(t), r._dirty || zt(r, t)), t
    },
    qt = function (t, e) {
      var r;
      if ((e._time || e._initted && !e._dur) && (r = It(t.rawTime(), e), (!e._dur || te(0, e.totalDuration(), r) - e._tTime > O) && e.render(r, !0)), zt(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
        if (t._dur < t.duration())
          for (r = t; r._dp;) r.rawTime() >= 0 && r.totalTime(r._tTime), r = r._dp;
        t._zTime = -O
      }
    },
    Ut = function (t, e, r, n) {
      return e.parent && Rt(e), e._start = yt((F(r) ? r : r || t !== g ? Zt(t, r, e) : t._time) + e._delay), e._end = yt(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), Et(t, e, "_first", "_last", t._sort ? "_start" : 0), Vt(e) || (t._recent = e), n || qt(t, e), t._ts < 0 && Nt(t, t._tTime), t
    },
    jt = function (t, e) {
      return (Q.ScrollTrigger || J("scrollTrigger", e)) && Q.ScrollTrigger.create(e, t)
    },
    Wt = function (t, e, r, n, i) {
      return Ke(t, e, i), t._initted ? !r && t._pt && !p && (t._dur && !1 !== t.vars.lazy || !t._dur && t.vars.lazy) && x !== Pe.frame ? (at.push(t), t._lazy = [i, n], 1) : void 0 : 1
    },
    Ht = function t(e) {
      var r = e.parent;
      return r && r._ts && r._initted && !r._lock && (r.rawTime() < 0 || t(r))
    },
    Vt = function (t) {
      var e = t.data;
      return "isFromStart" === e || "isStart" === e
    },
    Gt = function (t, e, r, n) {
      var i = t._repeat,
        s = yt(e) || 0,
        o = t._tTime / t._tDur;
      return o && !n && (t._time *= s / t._dur), t._dur = s, t._tDur = i ? i < 0 ? 1e10 : yt(s * (i + 1) + t._rDelay * i) : s, o > 0 && !n && Nt(t, t._tTime = t._tDur * o), t.parent && Xt(t), r || zt(t.parent, t), t
    },
    Kt = function (t) {
      return t instanceof Ue ? zt(t) : Gt(t, t._dur)
    },
    Qt = {
      _start: 0,
      endTime: rt,
      totalDuration: rt
    },
    Zt = function t(e, r, n) {
      var i, s, o, a = e.labels,
        u = e._recent || Qt,
        l = e.duration() >= M ? u.endTime(!1) : e._dur;
      return R(r) && (isNaN(r) || r in a) ? (s = r.charAt(0), o = "%" === r.substr(-1), i = r.indexOf("="), "<" === s || ">" === s ? (i >= 0 && (r = r.replace(/=/, "")), ("<" === s ? u._start : u.endTime(u._repeat >= 0)) + (parseFloat(r.substr(1)) || 0) * (o ? (i < 0 ? u : n).totalDuration() / 100 : 1)) : i < 0 ? (r in a || (a[r] = l), a[r]) : (s = parseFloat(r.charAt(i - 1) + r.substr(i + 1)), o && n && (s = s / 100 * (q(n) ? n[0] : n).totalDuration()), i > 1 ? t(e, r.substr(0, i - 1), n) + s : l + s)) : null == r ? l : +r
    },
    $t = function (t, e, r) {
      var n, i, s = F(e[1]),
        o = (s ? 2 : 1) + (t < 2 ? 0 : 1),
        a = e[o];
      if (s && (a.duration = e[1]), a.parent = r, t) {
        for (n = a, i = r; i && !("immediateRender" in n);) n = i.vars.defaults || {}, i = Y(i.vars.inherit) && i.parent;
        a.immediateRender = Y(n.immediateRender), t < 2 ? a.runBackwards = 1 : a.startAt = e[o - 1]
      }
      return new tr(e[0], a, e[o + 1])
    },
    Jt = function (t, e) {
      return t || 0 === t ? e(t) : e
    },
    te = function (t, e, r) {
      return r < t ? t : r > e ? e : r
    },
    ee = function (t, e) {
      return R(t) && (e = K.exec(t)) ? e[1] : ""
    },
    re = [].slice,
    ne = function (t, e) {
      return t && B(t) && "length" in t && (!e && !t.length || t.length - 1 in t && B(t[0])) && !t.nodeType && t !== _
    },
    ie = function (t, e, r) {
      return d && !e && d.selector ? d.selector(t) : !R(t) || r || !m && Ae() ? q(t) ? function (t, e, r) {
        return void 0 === r && (r = []), t.forEach((function (t) {
          var n;
          return R(t) && !e || ne(t, 1) ? (n = r).push.apply(n, ie(t)) : r.push(t)
        })) || r
      }(t, r) : ne(t) ? re.call(t, 0) : t ? [t] : [] : re.call((e || v).querySelectorAll(t), 0)
    },
    se = function (t) {
      return t = ie(t)[0] || tt("Invalid scope") || {},
        function (e) {
          var r = t.current || t.nativeElement || t;
          return ie(e, r.querySelectorAll ? r : r === t ? tt("Invalid scope") || v.createElement("div") : t)
        }
    },
    oe = function (t) {
      return t.sort((function () {
        return .5 - Math.random()
      }))
    },
    ae = function (t) {
      if (z(t)) return t;
      var e = B(t) ? t : {
        each: t
      },
        r = Le(e.ease),
        n = e.from || 0,
        i = parseFloat(e.base) || 0,
        s = {},
        o = n > 0 && n < 1,
        a = isNaN(n) || o,
        u = e.axis,
        l = n,
        c = n;
      return R(n) ? l = c = {
        center: .5,
        edges: .5,
        end: 1
      }[n] || 0 : !o && a && (l = n[0], c = n[1]),
        function (t, o, f) {
          var h, p, d, g, _, m, v, y, x, b = (f || e).length,
            w = s[b];
          if (!w) {
            if (!(x = "auto" === e.grid ? 0 : (e.grid || [1, M])[1])) {
              for (v = -M; v < (v = f[x++].getBoundingClientRect().left) && x < b;);
              x--
            }
            for (w = s[b] = [], h = a ? Math.min(x, b) * l - .5 : n % x, p = x === M ? 0 : a ? b * c / x - .5 : n / x | 0, v = 0, y = M, m = 0; m < b; m++) d = m % x - h, g = p - (m / x | 0), w[m] = _ = u ? Math.abs("y" === u ? g : d) : C(d * d + g * g), _ > v && (v = _), _ < y && (y = _);
            "random" === n && oe(w), w.max = v - y, w.min = y, w.v = b = (parseFloat(e.amount) || parseFloat(e.each) * (x > b ? b - 1 : u ? "y" === u ? b / x : x : Math.max(x, b / x)) || 0) * ("edges" === n ? -1 : 1), w.b = b < 0 ? i - b : i, w.u = ee(e.amount || e.each) || 0, r = r && b < 0 ? ze(r) : r
          }
          return b = (w[t] - w.min) / w.max || 0, yt(w.b + (r ? r(b) : b) * w.v) + w.u
        }
    },
    ue = function (t) {
      var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
      return function (r) {
        var n = yt(Math.round(parseFloat(r) / t) * t * e);
        return (n - n % 1) / e + (F(r) ? 0 : ee(r))
      }
    },
    le = function (t, e) {
      var r, n, i = q(t);
      return !i && B(t) && (r = i = t.radius || M, t.values ? (t = ie(t.values), (n = !F(t[0])) && (r *= r)) : t = ue(t.increment)), Jt(e, i ? z(t) ? function (e) {
        return n = t(e), Math.abs(n - e) <= r ? n : e
      } : function (e) {
        for (var i, s, o = parseFloat(n ? e.x : e), a = parseFloat(n ? e.y : 0), u = M, l = 0, c = t.length; c--;) n ? i = (i = t[c].x - o) * i + (s = t[c].y - a) * s : i = Math.abs(t[c] - o), i < u && (u = i, l = c);
        return l = !r || u <= r ? t[l] : e, n || l === e || F(e) ? l : l + ee(e)
      } : ue(t))
    },
    ce = function (t, e, r, n) {
      return Jt(q(t) ? !e : !0 === r ? !!(r = 0) : !n, (function () {
        return q(t) ? t[~~(Math.random() * t.length)] : (r = r || 1e-5) && (n = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((t - r / 2 + Math.random() * (e - t + .99 * r)) / r) * r * n) / n
      }))
    },
    fe = function (t, e, r) {
      return Jt(r, (function (r) {
        return t[~~e(r)]
      }))
    },
    he = function (t) {
      for (var e, r, n, i, s = 0, o = ""; ~(e = t.indexOf("random(", s));) n = t.indexOf(")", e), i = "[" === t.charAt(e + 7), r = t.substr(e + 7, n - e - 7).match(i ? G : U), o += t.substr(s, e - s) + ce(i ? r : +r[0], i ? 0 : +r[1], +r[2] || 1e-5), s = n + 1;
      return o + t.substr(s, t.length - s)
    },
    pe = function (t, e, r, n, i) {
      var s = e - t,
        o = n - r;
      return Jt(i, (function (e) {
        return r + ((e - t) / s * o || 0)
      }))
    },
    de = function (t, e, r) {
      var n, i, s, o = t.labels,
        a = M;
      for (n in o) (i = o[n] - e) < 0 == !!r && i && a > (i = Math.abs(i)) && (s = n, a = i);
      return s
    },
    ge = function (t, e, r) {
      var n, i, s, o = t.vars,
        a = o[e],
        u = d,
        l = t._ctx;
      if (a) return n = o[e + "Params"], i = o.callbackScope || t, r && at.length && wt(), l && (d = l), s = n ? a.apply(i, n) : a.call(i), d = u, s
    },
    _e = function (t) {
      return Rt(t), t.scrollTrigger && t.scrollTrigger.kill(!!p), t.progress() < 1 && ge(t, "onInterrupt"), t
    },
    me = [],
    ve = function (t) {
      if (I()) {
        var e = (t = !t.name && t.default || t).name,
          r = z(t),
          n = e && !r && t.init ? function () {
            this._props = []
          } : t,
          i = {
            init: rt,
            render: lr,
            add: Ve,
            kill: fr,
            modifier: cr,
            rawVars: 0
          },
          s = {
            targetTest: 0,
            get: 0,
            getSetter: sr,
            aliases: {},
            register: 0
          };
        if (Ae(), t !== n) {
          if (lt[e]) return;
          Ot(n, Ot(At(t, i), s)), St(n.prototype, St(i, At(t, s))), lt[n.prop = e] = n, t.targetTest && (ht.push(n), ot[e] = 1), e = ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin"
        }
        et(e, n), t.register && t.register(Or, n, dr)
      } else me.push(t)
    },
    ye = 255,
    xe = {
      aqua: [0, ye, ye],
      lime: [0, ye, 0],
      silver: [192, 192, 192],
      black: [0, 0, 0],
      maroon: [128, 0, 0],
      teal: [0, 128, 128],
      blue: [0, 0, ye],
      navy: [0, 0, 128],
      white: [ye, ye, ye],
      olive: [128, 128, 0],
      yellow: [ye, ye, 0],
      orange: [ye, 165, 0],
      gray: [128, 128, 128],
      purple: [128, 0, 128],
      green: [0, 128, 0],
      red: [ye, 0, 0],
      pink: [ye, 192, 203],
      cyan: [0, ye, ye],
      transparent: [ye, ye, ye, 0]
    },
    be = function (t, e, r) {
      return (6 * (t += t < 0 ? 1 : t > 1 ? -1 : 0) < 1 ? e + (r - e) * t * 6 : t < .5 ? r : 3 * t < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) * ye + .5 | 0
    },
    we = function (t, e, r) {
      var n, i, s, o, a, u, l, c, f, h, p = t ? F(t) ? [t >> 16, t >> 8 & ye, t & ye] : 0 : xe.black;
      if (!p) {
        if ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), xe[t]) p = xe[t];
        else if ("#" === t.charAt(0)) {
          if (t.length < 6 && (n = t.charAt(1), i = t.charAt(2), s = t.charAt(3), t = "#" + n + n + i + i + s + s + (5 === t.length ? t.charAt(4) + t.charAt(4) : "")), 9 === t.length) return [(p = parseInt(t.substr(1, 6), 16)) >> 16, p >> 8 & ye, p & ye, parseInt(t.substr(7), 16) / 255];
          p = [(t = parseInt(t.substr(1), 16)) >> 16, t >> 8 & ye, t & ye]
        } else if ("hsl" === t.substr(0, 3))
          if (p = h = t.match(U), e) {
            if (~t.indexOf("=")) return p = t.match(j), r && p.length < 4 && (p[3] = 1), p
          } else o = +p[0] % 360 / 360, a = +p[1] / 100, n = 2 * (u = +p[2] / 100) - (i = u <= .5 ? u * (a + 1) : u + a - u * a), p.length > 3 && (p[3] *= 1), p[0] = be(o + 1 / 3, n, i), p[1] = be(o, n, i), p[2] = be(o - 1 / 3, n, i);
        else p = t.match(U) || xe.transparent;
        p = p.map(Number)
      }
      return e && !h && (n = p[0] / ye, i = p[1] / ye, s = p[2] / ye, u = ((l = Math.max(n, i, s)) + (c = Math.min(n, i, s))) / 2, l === c ? o = a = 0 : (f = l - c, a = u > .5 ? f / (2 - l - c) : f / (l + c), o = l === n ? (i - s) / f + (i < s ? 6 : 0) : l === i ? (s - n) / f + 2 : (n - i) / f + 4, o *= 60), p[0] = ~~(o + .5), p[1] = ~~(100 * a + .5), p[2] = ~~(100 * u + .5)), r && p.length < 4 && (p[3] = 1), p
    },
    Te = function (t) {
      var e = [],
        r = [],
        n = -1;
      return t.split(Me).forEach((function (t) {
        var i = t.match(W) || [];
        e.push.apply(e, i), r.push(n += i.length + 1)
      })), e.c = r, e
    },
    ke = function (t, e, r) {
      var n, i, s, o, a = "",
        u = (t + a).match(Me),
        l = e ? "hsla(" : "rgba(",
        c = 0;
      if (!u) return t;
      if (u = u.map((function (t) {
        return (t = we(t, e, 1)) && l + (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) + ")"
      })), r && (s = Te(t), (n = r.c).join(a) !== s.c.join(a)))
        for (o = (i = t.replace(Me, "1").split(W)).length - 1; c < o; c++) a += i[c] + (~n.indexOf(c) ? u.shift() || l + "0,0,0,0)" : (s.length ? s : u.length ? u : r).shift());
      if (!i)
        for (o = (i = t.split(Me)).length - 1; c < o; c++) a += i[c] + u[c];
      return a + i[o]
    },
    Me = function () {
      var t, e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
      for (t in xe) e += "|" + t + "\\b";
      return new RegExp(e + ")", "gi")
    }(),
    Oe = /hsl[a]?\(/,
    Se = function (t) {
      var e, r = t.join(" ");
      if (Me.lastIndex = 0, Me.test(r)) return e = Oe.test(r), t[1] = ke(t[1], e), t[0] = ke(t[0], e, Te(t[1])), !0
    },
    Pe = function () {
      var t, e, r, n, i, s, o = Date.now,
        a = 500,
        u = 33,
        l = o(),
        c = l,
        f = 1e3 / 240,
        h = f,
        p = [],
        d = function r(d) {
          var g, _, m, v, y = o() - c,
            x = !0 === d;
          if (y > a && (l += y - u), ((g = (m = (c += y) - l) - h) > 0 || x) && (v = ++n.frame, i = m - 1e3 * n.time, n.time = m /= 1e3, h += g + (g >= f ? 4 : f - g), _ = 1), x || (t = e(r)), _)
            for (s = 0; s < p.length; s++) p[s](m, i, v, d)
        };
      return n = {
        time: 0,
        frame: 0,
        tick: function () {
          d(!0)
        },
        deltaRatio: function (t) {
          return i / (1e3 / (t || 60))
        },
        wake: function () {
          y && (!m && I() && (_ = m = window, v = _.document || {}, Q.gsap = Or, (_.gsapVersions || (_.gsapVersions = [])).push(Or.version), $(Z || _.GreenSockGlobals || !_.gsap && _ || {}), r = _.requestAnimationFrame, me.forEach(ve)), t && n.sleep(), e = r || function (t) {
            return setTimeout(t, h - 1e3 * n.time + 1 | 0)
          }, w = 1, d(2))
        },
        sleep: function () {
          (r ? _.cancelAnimationFrame : clearTimeout)(t), w = 0, e = rt
        },
        lagSmoothing: function (t, e) {
          a = t || 1 / 0, u = Math.min(e || 33, a)
        },
        fps: function (t) {
          f = 1e3 / (t || 240), h = 1e3 * n.time + f
        },
        add: function (t, e, r) {
          var i = e ? function (e, r, s, o) {
            t(e, r, s, o), n.remove(i)
          } : t;
          return n.remove(t), p[r ? "unshift" : "push"](i), Ae(), i
        },
        remove: function (t, e) {
          ~(e = p.indexOf(t)) && p.splice(e, 1) && s >= e && s--
        },
        _listeners: p
      }
    }(),
    Ae = function () {
      return !w && Pe.wake()
    },
    Ce = {},
    Ee = /^[\d.\-M][\d.\-,\s]/,
    De = /["']/g,
    Re = function (t) {
      for (var e, r, n, i = {}, s = t.substr(1, t.length - 3).split(":"), o = s[0], a = 1, u = s.length; a < u; a++) r = s[a], e = a !== u - 1 ? r.lastIndexOf(",") : r.length, n = r.substr(0, e), i[o] = isNaN(n) ? n.replace(De, "").trim() : +n, o = r.substr(e + 1).trim();
      return i
    },
    ze = function (t) {
      return function (e) {
        return 1 - t(1 - e)
      }
    },
    Fe = function t(e, r) {
      for (var n, i = e._first; i;) i instanceof Ue ? t(i, r) : i.vars.yoyoEase && (!i._yoyo || !i._repeat) && i._yoyo !== r && (i.timeline ? t(i.timeline, r) : (n = i._ease, i._ease = i._yEase, i._yEase = n, i._yoyo = r)), i = i._next
    },
    Le = function (t, e) {
      return t && (z(t) ? t : Ce[t] || function (t) {
        var e = (t + "").split("("),
          r = Ce[e[0]];
        return r && e.length > 1 && r.config ? r.config.apply(null, ~t.indexOf("{") ? [Re(e[1])] : function (t) {
          var e = t.indexOf("(") + 1,
            r = t.indexOf(")"),
            n = t.indexOf("(", e);
          return t.substring(e, ~n && n < r ? t.indexOf(")", r + 1) : r)
        }(t).split(",").map(kt)) : Ce._CE && Ee.test(t) ? Ce._CE("", t) : r
      }(t)) || e
    },
    Be = function (t, e, r, n) {
      void 0 === r && (r = function (t) {
        return 1 - e(1 - t)
      }), void 0 === n && (n = function (t) {
        return t < .5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2
      });
      var i, s = {
        easeIn: e,
        easeOut: r,
        easeInOut: n
      };
      return mt(t, (function (t) {
        for (var e in Ce[t] = Q[t] = s, Ce[i = t.toLowerCase()] = r, s) Ce[i + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")] = Ce[t + "." + e] = s[e]
      })), s
    },
    Ye = function (t) {
      return function (e) {
        return e < .5 ? (1 - t(1 - 2 * e)) / 2 : .5 + t(2 * (e - .5)) / 2
      }
    },
    Ie = function t(e, r, n) {
      var i = r >= 1 ? r : 1,
        s = (n || (e ? .3 : .45)) / (r < 1 ? r : 1),
        o = s / S * (Math.asin(1 / i) || 0),
        a = function (t) {
          return 1 === t ? 1 : i * Math.pow(2, -10 * t) * D((t - o) * s) + 1
        },
        u = "out" === e ? a : "in" === e ? function (t) {
          return 1 - a(1 - t)
        } : Ye(a);
      return s = S / s, u.config = function (r, n) {
        return t(e, r, n)
      }, u
    },
    Xe = function t(e, r) {
      void 0 === r && (r = 1.70158);
      var n = function (t) {
        return t ? --t * t * ((r + 1) * t + r) + 1 : 0
      },
        i = "out" === e ? n : "in" === e ? function (t) {
          return 1 - n(1 - t)
        } : Ye(n);
      return i.config = function (r) {
        return t(e, r)
      }, i
    };
  mt("Linear,Quad,Cubic,Quart,Quint,Strong", (function (t, e) {
    var r = e < 5 ? e + 1 : e;
    Be(t + ",Power" + (r - 1), e ? function (t) {
      return Math.pow(t, r)
    } : function (t) {
      return t
    }, (function (t) {
      return 1 - Math.pow(1 - t, r)
    }), (function (t) {
      return t < .5 ? Math.pow(2 * t, r) / 2 : 1 - Math.pow(2 * (1 - t), r) / 2
    }))
  })), Ce.Linear.easeNone = Ce.none = Ce.Linear.easeIn, Be("Elastic", Ie("in"), Ie("out"), Ie()),
    function (t, e) {
      var r = 1 / e,
        n = function (n) {
          return n < r ? t * n * n : n < .7272727272727273 ? t * Math.pow(n - 1.5 / e, 2) + .75 : n < .9090909090909092 ? t * (n -= 2.25 / e) * n + .9375 : t * Math.pow(n - 2.625 / e, 2) + .984375
        };
      Be("Bounce", (function (t) {
        return 1 - n(1 - t)
      }), n)
    }(7.5625, 2.75), Be("Expo", (function (t) {
      return t ? Math.pow(2, 10 * (t - 1)) : 0
    })), Be("Circ", (function (t) {
      return -(C(1 - t * t) - 1)
    })), Be("Sine", (function (t) {
      return 1 === t ? 1 : 1 - E(t * P)
    })), Be("Back", Xe("in"), Xe("out"), Xe()), Ce.SteppedEase = Ce.steps = Q.SteppedEase = {
      config: function (t, e) {
        void 0 === t && (t = 1);
        var r = 1 / t,
          n = t + (e ? 0 : 1),
          i = e ? 1 : 0;
        return function (t) {
          return ((n * te(0, .99999999, t) | 0) + i) * r
        }
      }
    }, k.ease = Ce["quad.out"], mt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", (function (t) {
      return pt += t + "," + t + "Params,"
    }));
  var Ne = function (t, e) {
    this.id = A++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : _t, this.set = e ? e.getSetter : sr
  },
    qe = function () {
      function t(t) {
        this.vars = t, this._delay = +t.delay || 0, (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase), this._ts = 1, Gt(this, +t.duration, 1, 1), this.data = t.data, d && (this._ctx = d, d.data.push(this)), w || Pe.wake()
      }
      var e = t.prototype;
      return e.delay = function (t) {
        return t || 0 === t ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + t - this._delay), this._delay = t, this) : this._delay
      }, e.duration = function (t) {
        return arguments.length ? this.totalDuration(this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t) : this.totalDuration() && this._dur
      }, e.totalDuration = function (t) {
        return arguments.length ? (this._dirty = 0, Gt(this, this._repeat < 0 ? t : (t - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
      }, e.totalTime = function (t, e) {
        if (Ae(), !arguments.length) return this._tTime;
        var r = this._dp;
        if (r && r.smoothChildTiming && this._ts) {
          for (Nt(this, t), !r._dp || r.parent || qt(r, this); r && r.parent;) r.parent._time !== r._start + (r._ts >= 0 ? r._tTime / r._ts : (r.totalDuration() - r._tTime) / -r._ts) && r.totalTime(r._tTime, !0), r = r.parent;
          !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && t < this._tDur || this._ts < 0 && t > 0 || !this._tDur && !t) && Ut(this._dp, this, this._start - this._delay)
        }
        return (this._tTime !== t || !this._dur && !e || this._initted && Math.abs(this._zTime) === O || !t && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = t), Tt(this, t, e)), this
      }, e.time = function (t, e) {
        return arguments.length ? this.totalTime(Math.min(this.totalDuration(), t + Bt(this)) % (this._dur + this._rDelay) || (t ? this._dur : 0), e) : this._time
      }, e.totalProgress = function (t, e) {
        return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio
      }, e.progress = function (t, e) {
        return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? t : 1 - t) + Bt(this), e) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio
      }, e.iteration = function (t, e) {
        var r = this.duration() + this._rDelay;
        return arguments.length ? this.totalTime(this._time + (t - 1) * r, e) : this._repeat ? Yt(this._tTime, r) + 1 : 1
      }, e.timeScale = function (t) {
        if (!arguments.length) return this._rts === -O ? 0 : this._rts;
        if (this._rts === t) return this;
        var e = this.parent && this._ts ? It(this.parent._time, this) : this._tTime;
        return this._rts = +t || 0, this._ts = this._ps || t === -O ? 0 : this._rts, this.totalTime(te(-Math.abs(this._delay), this._tDur, e), !0), Xt(this),
          function (t) {
            for (var e = t.parent; e && e.parent;) e._dirty = 1, e.totalDuration(), e = e.parent;
            return t
          }(this)
      }, e.paused = function (t) {
        return arguments.length ? (this._ps !== t && (this._ps = t, t ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Ae(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && Math.abs(this._zTime) !== O && (this._tTime -= O)))), this) : this._ps
      }, e.startTime = function (t) {
        if (arguments.length) {
          this._start = t;
          var e = this.parent || this._dp;
          return e && (e._sort || !this.parent) && Ut(e, this, t - this._delay), this
        }
        return this._start
      }, e.endTime = function (t) {
        return this._start + (Y(t) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
      }, e.rawTime = function (t) {
        var e = this.parent || this._dp;
        return e ? t && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? It(e.rawTime(t), this) : this._tTime : this._tTime
      }, e.revert = function (t) {
        void 0 === t && (t = st);
        var e = p;
        return p = t, (this._initted || this._startAt) && (this.timeline && this.timeline.revert(t), this.totalTime(-.01, t.suppressEvents)), "nested" !== this.data && !1 !== t.kill && this.kill(), p = e, this
      }, e.globalTime = function (t) {
        for (var e = this, r = arguments.length ? t : e.rawTime(); e;) r = e._start + r / (e._ts || 1), e = e._dp;
        return !this.parent && this._sat ? this._sat.vars.immediateRender ? -1 : this._sat.globalTime(t) : r
      }, e.repeat = function (t) {
        return arguments.length ? (this._repeat = t === 1 / 0 ? -2 : t, Kt(this)) : -2 === this._repeat ? 1 / 0 : this._repeat
      }, e.repeatDelay = function (t) {
        if (arguments.length) {
          var e = this._time;
          return this._rDelay = t, Kt(this), e ? this.time(e) : this
        }
        return this._rDelay
      }, e.yoyo = function (t) {
        return arguments.length ? (this._yoyo = t, this) : this._yoyo
      }, e.seek = function (t, e) {
        return this.totalTime(Zt(this, t), Y(e))
      }, e.restart = function (t, e) {
        return this.play().totalTime(t ? -this._delay : 0, Y(e))
      }, e.play = function (t, e) {
        return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
      }, e.reverse = function (t, e) {
        return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
      }, e.pause = function (t, e) {
        return null != t && this.seek(t, e), this.paused(!0)
      }, e.resume = function () {
        return this.paused(!1)
      }, e.reversed = function (t) {
        return arguments.length ? (!!t !== this.reversed() && this.timeScale(-this._rts || (t ? -O : 0)), this) : this._rts < 0
      }, e.invalidate = function () {
        return this._initted = this._act = 0, this._zTime = -O, this
      }, e.isActive = function () {
        var t, e = this.parent || this._dp,
          r = this._start;
        return !(e && !(this._ts && this._initted && e.isActive() && (t = e.rawTime(!0)) >= r && t < this.endTime(!0) - O))
      }, e.eventCallback = function (t, e, r) {
        var n = this.vars;
        return arguments.length > 1 ? (e ? (n[t] = e, r && (n[t + "Params"] = r), "onUpdate" === t && (this._onUpdate = e)) : delete n[t], this) : n[t]
      }, e.then = function (t) {
        var e = this;
        return new Promise((function (r) {
          var n = z(t) ? t : Mt,
            i = function () {
              var t = e.then;
              e.then = null, z(n) && (n = n(e)) && (n.then || n === e) && (e.then = t), r(n), e.then = t
            };
          e._initted && 1 === e.totalProgress() && e._ts >= 0 || !e._tTime && e._ts < 0 ? i() : e._prom = i
        }))
      }, e.kill = function () {
        _e(this)
      }, t
    }();
  Ot(qe.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -O,
    _prom: 0,
    _ps: !1,
    _rts: 1
  });
  var Ue = function (t) {
    function e(e, r) {
      var n;
      return void 0 === e && (e = {}), (n = t.call(this, e) || this).labels = {}, n.smoothChildTiming = !!e.smoothChildTiming, n.autoRemoveChildren = !!e.autoRemoveChildren, n._sort = Y(e.sortChildren), g && Ut(e.parent || g, c(n), r), e.reversed && n.reverse(), e.paused && n.paused(!0), e.scrollTrigger && jt(c(n), e.scrollTrigger), n
    }
    f(e, t);
    var r = e.prototype;
    return r.to = function (t, e, r) {
      return $t(0, arguments, this), this
    }, r.from = function (t, e, r) {
      return $t(1, arguments, this), this
    }, r.fromTo = function (t, e, r, n) {
      return $t(2, arguments, this), this
    }, r.set = function (t, e, r) {
      return e.duration = 0, e.parent = this, Ct(e).repeatDelay || (e.repeat = 0), e.immediateRender = !!e.immediateRender, new tr(t, e, Zt(this, r), 1), this
    }, r.call = function (t, e, r) {
      return Ut(this, tr.delayedCall(0, t, e), r)
    }, r.staggerTo = function (t, e, r, n, i, s, o) {
      return r.duration = e, r.stagger = r.stagger || n, r.onComplete = s, r.onCompleteParams = o, r.parent = this, new tr(t, r, Zt(this, i)), this
    }, r.staggerFrom = function (t, e, r, n, i, s, o) {
      return r.runBackwards = 1, Ct(r).immediateRender = Y(r.immediateRender), this.staggerTo(t, e, r, n, i, s, o)
    }, r.staggerFromTo = function (t, e, r, n, i, s, o, a) {
      return n.startAt = r, Ct(n).immediateRender = Y(n.immediateRender), this.staggerTo(t, e, n, i, s, o, a)
    }, r.render = function (t, e, r) {
      var n, i, s, o, a, u, l, c, f, h, d, _, m = this._time,
        v = this._dirty ? this.totalDuration() : this._tDur,
        y = this._dur,
        x = t <= 0 ? 0 : yt(t),
        b = this._zTime < 0 != t < 0 && (this._initted || !y);
      if (this !== g && x > v && t >= 0 && (x = v), x !== this._tTime || r || b) {
        if (m !== this._time && y && (x += this._time - m, t += this._time - m), n = x, f = this._start, u = !(c = this._ts), b && (y || (m = this._zTime), (t || !e) && (this._zTime = t)), this._repeat) {
          if (d = this._yoyo, a = y + this._rDelay, this._repeat < -1 && t < 0) return this.totalTime(100 * a + t, e, r);
          if (n = yt(x % a), x === v ? (o = this._repeat, n = y) : ((o = ~~(x / a)) && o === x / a && (n = y, o--), n > y && (n = y)), h = Yt(this._tTime, a), !m && this._tTime && h !== o && this._tTime - h * a - this._dur <= 0 && (h = o), d && 1 & o && (n = y - n, _ = 1), o !== h && !this._lock) {
            var w = d && 1 & h,
              T = w === (d && 1 & o);
            if (o < h && (w = !w), m = w ? 0 : y, this._lock = 1, this.render(m || (_ ? 0 : yt(o * a)), e, !y)._lock = 0, this._tTime = x, !e && this.parent && ge(this, "onRepeat"), this.vars.repeatRefresh && !_ && (this.invalidate()._lock = 1), m && m !== this._time || u !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) return this;
            if (y = this._dur, v = this._tDur, T && (this._lock = 2, m = w ? y : -1e-4, this.render(m, !0), this.vars.repeatRefresh && !_ && this.invalidate()), this._lock = 0, !this._ts && !u) return this;
            Fe(this, _)
          }
        }
        if (this._hasPause && !this._forcing && this._lock < 2 && (l = function (t, e, r) {
          var n;
          if (r > e)
            for (n = t._first; n && n._start <= r;) {
              if ("isPause" === n.data && n._start > e) return n;
              n = n._next
            } else
            for (n = t._last; n && n._start >= r;) {
              if ("isPause" === n.data && n._start < e) return n;
              n = n._prev
            }
        }(this, yt(m), yt(n)), l && (x -= n - (n = l._start))), this._tTime = x, this._time = n, this._act = !c, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = t, m = 0), !m && n && !e && !o && (ge(this, "onStart"), this._tTime !== x)) return this;
        if (n >= m && t >= 0)
          for (i = this._first; i;) {
            if (s = i._next, (i._act || n >= i._start) && i._ts && l !== i) {
              if (i.parent !== this) return this.render(t, e, r);
              if (i.render(i._ts > 0 ? (n - i._start) * i._ts : (i._dirty ? i.totalDuration() : i._tDur) + (n - i._start) * i._ts, e, r), n !== this._time || !this._ts && !u) {
                l = 0, s && (x += this._zTime = -O);
                break
              }
            }
            i = s
          } else {
          i = this._last;
          for (var k = t < 0 ? t : n; i;) {
            if (s = i._prev, (i._act || k <= i._end) && i._ts && l !== i) {
              if (i.parent !== this) return this.render(t, e, r);
              if (i.render(i._ts > 0 ? (k - i._start) * i._ts : (i._dirty ? i.totalDuration() : i._tDur) + (k - i._start) * i._ts, e, r || p && (i._initted || i._startAt)), n !== this._time || !this._ts && !u) {
                l = 0, s && (x += this._zTime = k ? -O : O);
                break
              }
            }
            i = s
          }
        }
        if (l && !e && (this.pause(), l.render(n >= m ? 0 : -O)._zTime = n >= m ? 1 : -1, this._ts)) return this._start = f, Xt(this), this.render(t, e, r);
        this._onUpdate && !e && ge(this, "onUpdate", !0), (x === v && this._tTime >= this.totalDuration() || !x && m) && (f === this._start || Math.abs(c) !== Math.abs(this._ts)) && (this._lock || ((t || !y) && (x === v && this._ts > 0 || !x && this._ts < 0) && Rt(this, 1), !e && (!(t < 0) || m) && (x || m || !v) && (ge(this, x === v && t >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(x < v && this.timeScale() > 0) && this._prom())))
      }
      return this
    }, r.add = function (t, e) {
      var r = this;
      if (F(e) || (e = Zt(this, e, t)), !(t instanceof qe)) {
        if (q(t)) return t.forEach((function (t) {
          return r.add(t, e)
        })), this;
        if (R(t)) return this.addLabel(t, e);
        if (!z(t)) return this;
        t = tr.delayedCall(0, t)
      }
      return this !== t ? Ut(this, t, e) : this
    }, r.getChildren = function (t, e, r, n) {
      void 0 === t && (t = !0), void 0 === e && (e = !0), void 0 === r && (r = !0), void 0 === n && (n = -M);
      for (var i = [], s = this._first; s;) s._start >= n && (s instanceof tr ? e && i.push(s) : (r && i.push(s), t && i.push.apply(i, s.getChildren(!0, e, r)))), s = s._next;
      return i
    }, r.getById = function (t) {
      for (var e = this.getChildren(1, 1, 1), r = e.length; r--;)
        if (e[r].vars.id === t) return e[r]
    }, r.remove = function (t) {
      return R(t) ? this.removeLabel(t) : z(t) ? this.killTweensOf(t) : (Dt(this, t), t === this._recent && (this._recent = this._last), zt(this))
    }, r.totalTime = function (e, r) {
      return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = yt(Pe.time - (this._ts > 0 ? e / this._ts : (this.totalDuration() - e) / -this._ts))), t.prototype.totalTime.call(this, e, r), this._forcing = 0, this) : this._tTime
    }, r.addLabel = function (t, e) {
      return this.labels[t] = Zt(this, e), this
    }, r.removeLabel = function (t) {
      return delete this.labels[t], this
    }, r.addPause = function (t, e, r) {
      var n = tr.delayedCall(0, e || rt, r);
      return n.data = "isPause", this._hasPause = 1, Ut(this, n, Zt(this, t))
    }, r.removePause = function (t) {
      var e = this._first;
      for (t = Zt(this, t); e;) e._start === t && "isPause" === e.data && Rt(e), e = e._next
    }, r.killTweensOf = function (t, e, r) {
      for (var n = this.getTweensOf(t, r), i = n.length; i--;) je !== n[i] && n[i].kill(t, e);
      return this
    }, r.getTweensOf = function (t, e) {
      for (var r, n = [], i = ie(t), s = this._first, o = F(e); s;) s instanceof tr ? bt(s._targets, i) && (o ? (!je || s._initted && s._ts) && s.globalTime(0) <= e && s.globalTime(s.totalDuration()) > e : !e || s.isActive()) && n.push(s) : (r = s.getTweensOf(i, e)).length && n.push.apply(n, r), s = s._next;
      return n
    }, r.tweenTo = function (t, e) {
      e = e || {};
      var r, n = this,
        i = Zt(n, t),
        s = e,
        o = s.startAt,
        a = s.onStart,
        u = s.onStartParams,
        l = s.immediateRender,
        c = tr.to(n, Ot({
          ease: e.ease || "none",
          lazy: !1,
          immediateRender: !1,
          time: i,
          overwrite: "auto",
          duration: e.duration || Math.abs((i - (o && "time" in o ? o.time : n._time)) / n.timeScale()) || O,
          onStart: function () {
            if (n.pause(), !r) {
              var t = e.duration || Math.abs((i - (o && "time" in o ? o.time : n._time)) / n.timeScale());
              c._dur !== t && Gt(c, t, 0, 1).render(c._time, !0, !0), r = 1
            }
            a && a.apply(c, u || [])
          }
        }, e));
      return l ? c.render(0) : c
    }, r.tweenFromTo = function (t, e, r) {
      return this.tweenTo(e, Ot({
        startAt: {
          time: Zt(this, t)
        }
      }, r))
    }, r.recent = function () {
      return this._recent
    }, r.nextLabel = function (t) {
      return void 0 === t && (t = this._time), de(this, Zt(this, t))
    }, r.previousLabel = function (t) {
      return void 0 === t && (t = this._time), de(this, Zt(this, t), 1)
    }, r.currentLabel = function (t) {
      return arguments.length ? this.seek(t, !0) : this.previousLabel(this._time + O)
    }, r.shiftChildren = function (t, e, r) {
      void 0 === r && (r = 0);
      for (var n, i = this._first, s = this.labels; i;) i._start >= r && (i._start += t, i._end += t), i = i._next;
      if (e)
        for (n in s) s[n] >= r && (s[n] += t);
      return zt(this)
    }, r.invalidate = function (e) {
      var r = this._first;
      for (this._lock = 0; r;) r.invalidate(e), r = r._next;
      return t.prototype.invalidate.call(this, e)
    }, r.clear = function (t) {
      void 0 === t && (t = !0);
      for (var e, r = this._first; r;) e = r._next, this.remove(r), r = e;
      return this._dp && (this._time = this._tTime = this._pTime = 0), t && (this.labels = {}), zt(this)
    }, r.totalDuration = function (t) {
      var e, r, n, i = 0,
        s = this,
        o = s._last,
        a = M;
      if (arguments.length) return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -t : t));
      if (s._dirty) {
        for (n = s.parent; o;) e = o._prev, o._dirty && o.totalDuration(), (r = o._start) > a && s._sort && o._ts && !s._lock ? (s._lock = 1, Ut(s, o, r - o._delay, 1)._lock = 0) : a = r, r < 0 && o._ts && (i -= r, (!n && !s._dp || n && n.smoothChildTiming) && (s._start += r / s._ts, s._time -= r, s._tTime -= r), s.shiftChildren(-r, !1, -1 / 0), a = 0), o._end > i && o._ts && (i = o._end), o = e;
        Gt(s, s === g && s._time > i ? s._time : i, 1, 1), s._dirty = 0
      }
      return s._tDur
    }, e.updateRoot = function (t) {
      if (g._ts && (Tt(g, It(t, g)), x = Pe.frame), Pe.frame >= ft) {
        ft += T.autoSleep || 120;
        var e = g._first;
        if ((!e || !e._ts) && T.autoSleep && Pe._listeners.length < 2) {
          for (; e && !e._ts;) e = e._next;
          e || Pe.sleep()
        }
      }
    }, e
  }(qe);
  Ot(Ue.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
  });
  var je, We, He = function (t, e, r, n, i, s, o) {
    var a, u, l, c, f, h, p, d, g = new dr(this._pt, t, e, 0, 1, ur, null, i),
      _ = 0,
      m = 0;
    for (g.b = r, g.e = n, r += "", (p = ~(n += "").indexOf("random(")) && (n = he(n)), s && (s(d = [r, n], t, e), r = d[0], n = d[1]), u = r.match(H) || []; a = H.exec(n);) c = a[0], f = n.substring(_, a.index), l ? l = (l + 1) % 5 : "rgba(" === f.substr(-5) && (l = 1), c !== u[m++] && (h = parseFloat(u[m - 1]) || 0, g._pt = {
      _next: g._pt,
      p: f || 1 === m ? f : ",",
      s: h,
      c: "=" === c.charAt(1) ? xt(h, c) - h : parseFloat(c) - h,
      m: l && l < 4 ? Math.round : 0
    }, _ = H.lastIndex);
    return g.c = _ < n.length ? n.substring(_, n.length) : "", g.fp = o, (V.test(n) || p) && (g.e = 0), this._pt = g, g
  },
    Ve = function (t, e, r, n, i, s, o, a, u, l) {
      z(n) && (n = n(i || 0, t, s));
      var c, f = t[e],
        h = "get" !== r ? r : z(f) ? u ? t[e.indexOf("set") || !z(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](u) : t[e]() : f,
        p = z(f) ? u ? nr : rr : er;
      if (R(n) && (~n.indexOf("random(") && (n = he(n)), "=" === n.charAt(1) && (((c = xt(h, n) + (ee(h) || 0)) || 0 === c) && (n = c))), !l || h !== n || We) return isNaN(h * n) || "" === n ? (!f && !(e in t) && J(e, n), He.call(this, t, e, h, n, p, a || T.stringFilter, u)) : (c = new dr(this._pt, t, e, +h || 0, n - (h || 0), "boolean" == typeof f ? ar : or, 0, p), u && (c.fp = u), o && c.modifier(o, this, t), this._pt = c)
    },
    Ge = function (t, e, r, n, i, s) {
      var o, a, u, l;
      if (lt[t] && !1 !== (o = new lt[t]).init(i, o.rawVars ? e[t] : function (t, e, r, n, i) {
        if (z(t) && (t = Ze(t, i, e, r, n)), !B(t) || t.style && t.nodeType || q(t) || N(t)) return R(t) ? Ze(t, i, e, r, n) : t;
        var s, o = {};
        for (s in t) o[s] = Ze(t[s], i, e, r, n);
        return o
      }(e[t], n, i, s, r), r, n, s) && (r._pt = a = new dr(r._pt, i, t, 0, 1, o.render, o, 0, o.priority), r !== b))
        for (u = r._ptLookup[r._targets.indexOf(i)], l = o._props.length; l--;) u[o._props[l]] = a;
      return o
    },
    Ke = function t(e, r, n) {
      var i, s, o, a, u, l, c, f, d, _, m, v, y, x = e.vars,
        b = x.ease,
        w = x.startAt,
        T = x.immediateRender,
        S = x.lazy,
        P = x.onUpdate,
        A = x.onUpdateParams,
        C = x.callbackScope,
        E = x.runBackwards,
        D = x.yoyoEase,
        R = x.keyframes,
        z = x.autoRevert,
        F = e._dur,
        L = e._startAt,
        B = e._targets,
        I = e.parent,
        X = I && "nested" === I.data ? I.vars.targets : B,
        N = "auto" === e._overwrite && !h,
        q = e.timeline;
      if (q && (!R || !b) && (b = "none"), e._ease = Le(b, k.ease), e._yEase = D ? ze(Le(!0 === D ? b : D, k.ease)) : 0, D && e._yoyo && !e._repeat && (D = e._yEase, e._yEase = e._ease, e._ease = D), e._from = !q && !!x.runBackwards, !q || R && !x.stagger) {
        if (v = (f = B[0] ? gt(B[0]).harness : 0) && x[f.prop], i = At(x, ot), L && (L._zTime < 0 && L.progress(1), r < 0 && E && T && !z ? L.render(-1, !0) : L.revert(E && F ? it : nt), L._lazy = 0), w) {
          if (Rt(e._startAt = tr.set(B, Ot({
            data: "isStart",
            overwrite: !1,
            parent: I,
            immediateRender: !0,
            lazy: !L && Y(S),
            startAt: null,
            delay: 0,
            onUpdate: P,
            onUpdateParams: A,
            callbackScope: C,
            stagger: 0
          }, w))), e._startAt._dp = 0, e._startAt._sat = e, r < 0 && (p || !T && !z) && e._startAt.revert(it), T && F && r <= 0 && n <= 0) return void (r && (e._zTime = r))
        } else if (E && F && !L)
          if (r && (T = !1), o = Ot({
            overwrite: !1,
            data: "isFromStart",
            lazy: T && !L && Y(S),
            immediateRender: T,
            stagger: 0,
            parent: I
          }, i), v && (o[f.prop] = v), Rt(e._startAt = tr.set(B, o)), e._startAt._dp = 0, e._startAt._sat = e, r < 0 && (p ? e._startAt.revert(it) : e._startAt.render(-1, !0)), e._zTime = r, T) {
            if (!r) return
          } else t(e._startAt, O, O);
        for (e._pt = e._ptCache = 0, S = F && Y(S) || S && !F, s = 0; s < B.length; s++) {
          if (c = (u = B[s])._gsap || dt(B)[s]._gsap, e._ptLookup[s] = _ = {}, ut[c.id] && at.length && wt(), m = X === B ? s : X.indexOf(u), f && !1 !== (d = new f).init(u, v || i, e, m, X) && (e._pt = a = new dr(e._pt, u, d.name, 0, 1, d.render, d, 0, d.priority), d._props.forEach((function (t) {
            _[t] = a
          })), d.priority && (l = 1)), !f || v)
            for (o in i) lt[o] && (d = Ge(o, i, e, m, u, X)) ? d.priority && (l = 1) : _[o] = a = Ve.call(e, u, o, "get", i[o], m, X, 0, x.stringFilter);
          e._op && e._op[s] && e.kill(u, e._op[s]), N && e._pt && (je = e, g.killTweensOf(u, _, e.globalTime(r)), y = !e.parent, je = 0), e._pt && S && (ut[c.id] = 1)
        }
        l && pr(e), e._onInit && e._onInit(e)
      }
      e._onUpdate = P, e._initted = (!e._op || e._pt) && !y, R && r <= 0 && q.render(M, !0, !0)
    },
    Qe = function (t, e, r, n) {
      var i, s, o = e.ease || n || "power1.inOut";
      if (q(e)) s = r[t] || (r[t] = []), e.forEach((function (t, r) {
        return s.push({
          t: r / (e.length - 1) * 100,
          v: t,
          e: o
        })
      }));
      else
        for (i in e) s = r[i] || (r[i] = []), "ease" === i || s.push({
          t: parseFloat(t),
          v: e[i],
          e: o
        })
    },
    Ze = function (t, e, r, n, i) {
      return z(t) ? t.call(e, r, n, i) : R(t) && ~t.indexOf("random(") ? he(t) : t
    },
    $e = pt + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
    Je = {};
  mt($e + ",id,stagger,delay,duration,paused,scrollTrigger", (function (t) {
    return Je[t] = 1
  }));
  var tr = function (t) {
    function e(e, r, n, i) {
      var s;
      "number" == typeof r && (n.duration = r, r = n, n = null);
      var o, a, u, l, f, p, d, _, m = (s = t.call(this, i ? r : Ct(r)) || this).vars,
        v = m.duration,
        y = m.delay,
        x = m.immediateRender,
        b = m.stagger,
        w = m.overwrite,
        k = m.keyframes,
        M = m.defaults,
        S = m.scrollTrigger,
        P = m.yoyoEase,
        A = r.parent || g,
        C = (q(e) || N(e) ? F(e[0]) : "length" in r) ? [e] : ie(e);
      if (s._targets = C.length ? dt(C) : tt("GSAP target " + e + " not found. https://greensock.com", !T.nullTargetWarn) || [], s._ptLookup = [], s._overwrite = w, k || b || X(v) || X(y)) {
        if (r = s.vars, (o = s.timeline = new Ue({
          data: "nested",
          defaults: M || {},
          targets: A && "nested" === A.data ? A.vars.targets : C
        })).kill(), o.parent = o._dp = c(s), o._start = 0, b || X(v) || X(y)) {
          if (l = C.length, d = b && ae(b), B(b))
            for (f in b) ~$e.indexOf(f) && (_ || (_ = {}), _[f] = b[f]);
          for (a = 0; a < l; a++)(u = At(r, Je)).stagger = 0, P && (u.yoyoEase = P), _ && St(u, _), p = C[a], u.duration = +Ze(v, c(s), a, p, C), u.delay = (+Ze(y, c(s), a, p, C) || 0) - s._delay, !b && 1 === l && u.delay && (s._delay = y = u.delay, s._start += y, u.delay = 0), o.to(p, u, d ? d(a, p, C) : 0), o._ease = Ce.none;
          o.duration() ? v = y = 0 : s.timeline = 0
        } else if (k) {
          Ct(Ot(o.vars.defaults, {
            ease: "none"
          })), o._ease = Le(k.ease || r.ease || "none");
          var E, D, R, z = 0;
          if (q(k)) k.forEach((function (t) {
            return o.to(C, t, ">")
          })), o.duration();
          else {
            for (f in u = {}, k) "ease" === f || "easeEach" === f || Qe(f, k[f], u, k.easeEach);
            for (f in u)
              for (E = u[f].sort((function (t, e) {
                return t.t - e.t
              })), z = 0, a = 0; a < E.length; a++)(R = {
                ease: (D = E[a]).e,
                duration: (D.t - (a ? E[a - 1].t : 0)) / 100 * v
              })[f] = D.v, o.to(C, R, z), z += R.duration;
            o.duration() < v && o.to({}, {
              duration: v - o.duration()
            })
          }
        }
        v || s.duration(v = o.duration())
      } else s.timeline = 0;
      return !0 === w && !h && (je = c(s), g.killTweensOf(C), je = 0), Ut(A, c(s), n), r.reversed && s.reverse(), r.paused && s.paused(!0), (x || !v && !k && s._start === yt(A._time) && Y(x) && Lt(c(s)) && "nested" !== A.data) && (s._tTime = -O, s.render(Math.max(0, -y) || 0)), S && jt(c(s), S), s
    }
    f(e, t);
    var r = e.prototype;
    return r.render = function (t, e, r) {
      var n, i, s, o, a, u, l, c, f, h = this._time,
        d = this._tDur,
        g = this._dur,
        _ = t < 0,
        m = t > d - O && !_ ? d : t < O ? 0 : t;
      if (g) {
        if (m !== this._tTime || !t || r || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== _) {
          if (n = m, c = this.timeline, this._repeat) {
            if (o = g + this._rDelay, this._repeat < -1 && _) return this.totalTime(100 * o + t, e, r);
            if (n = yt(m % o), m === d ? (s = this._repeat, n = g) : ((s = ~~(m / o)) && s === m / o && (n = g, s--), n > g && (n = g)), (u = this._yoyo && 1 & s) && (f = this._yEase, n = g - n), a = Yt(this._tTime, o), n === h && !r && this._initted) return this._tTime = m, this;
            s !== a && (c && this._yEase && Fe(c, u), this.vars.repeatRefresh && !u && !this._lock && (this._lock = r = 1, this.render(yt(o * s), !0).invalidate()._lock = 0))
          }
          if (!this._initted) {
            if (Wt(this, _ ? t : n, r, e, m)) return this._tTime = 0, this;
            if (h !== this._time) return this;
            if (g !== this._dur) return this.render(t, e, r)
          }
          if (this._tTime = m, this._time = n, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = l = (f || this._ease)(n / g), this._from && (this.ratio = l = 1 - l), n && !h && !e && !s && (ge(this, "onStart"), this._tTime !== m)) return this;
          for (i = this._pt; i;) i.r(l, i.d), i = i._next;
          c && c.render(t < 0 ? t : !n && u ? -O : c._dur * c._ease(n / this._dur), e, r) || this._startAt && (this._zTime = t), this._onUpdate && !e && (_ && Ft(this, t, 0, r), ge(this, "onUpdate")), this._repeat && s !== a && this.vars.onRepeat && !e && this.parent && ge(this, "onRepeat"), (m === this._tDur || !m) && this._tTime === m && (_ && !this._onUpdate && Ft(this, t, 0, !0), (t || !g) && (m === this._tDur && this._ts > 0 || !m && this._ts < 0) && Rt(this, 1), !e && (!_ || h) && (m || h || u) && (ge(this, m === d ? "onComplete" : "onReverseComplete", !0), this._prom && !(m < d && this.timeScale() > 0) && this._prom()))
        }
      } else ! function (t, e, r, n) {
        var i, s, o, a = t.ratio,
          u = e < 0 || !e && (!t._start && Ht(t) && (t._initted || !Vt(t)) || (t._ts < 0 || t._dp._ts < 0) && !Vt(t)) ? 0 : 1,
          l = t._rDelay,
          c = 0;
        if (l && t._repeat && (c = te(0, t._tDur, e), s = Yt(c, l), t._yoyo && 1 & s && (u = 1 - u), s !== Yt(t._tTime, l) && (a = 1 - u, t.vars.repeatRefresh && t._initted && t.invalidate())), u !== a || p || n || t._zTime === O || !e && t._zTime) {
          if (!t._initted && Wt(t, e, n, r, c)) return;
          for (o = t._zTime, t._zTime = e || (r ? O : 0), r || (r = e && !o), t.ratio = u, t._from && (u = 1 - u), t._time = 0, t._tTime = c, i = t._pt; i;) i.r(u, i.d), i = i._next;
          e < 0 && Ft(t, e, 0, !0), t._onUpdate && !r && ge(t, "onUpdate"), c && t._repeat && !r && t.parent && ge(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === u && (u && Rt(t, 1), !r && !p && (ge(t, u ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()))
        } else t._zTime || (t._zTime = e)
      }(this, t, e, r);
      return this
    }, r.targets = function () {
      return this._targets
    }, r.invalidate = function (e) {
      return (!e || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(e), t.prototype.invalidate.call(this, e)
    }, r.resetTo = function (t, e, r, n) {
      w || Pe.wake(), this._ts || this.play();
      var i = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
      return this._initted || Ke(this, i),
        function (t, e, r, n, i, s, o) {
          var a, u, l, c, f = (t._pt && t._ptCache || (t._ptCache = {}))[e];
          if (!f)
            for (f = t._ptCache[e] = [], l = t._ptLookup, c = t._targets.length; c--;) {
              if ((a = l[c][e]) && a.d && a.d._pt)
                for (a = a.d._pt; a && a.p !== e && a.fp !== e;) a = a._next;
              if (!a) return We = 1, t.vars[e] = "+=0", Ke(t, o), We = 0, 1;
              f.push(a)
            }
          for (c = f.length; c--;)(a = (u = f[c])._pt || u).s = !n && 0 !== n || i ? a.s + (n || 0) + s * a.c : n, a.c = r - a.s, u.e && (u.e = vt(r) + ee(u.e)), u.b && (u.b = a.s + ee(u.b))
        }(this, t, e, r, n, this._ease(i / this._dur), i) ? this.resetTo(t, e, r, n) : (Nt(this, 0), this.parent || Et(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0))
    }, r.kill = function (t, e) {
      if (void 0 === e && (e = "all"), !(t || e && "all" !== e)) return this._lazy = this._pt = 0, this.parent ? _e(this) : this;
      if (this.timeline) {
        var r = this.timeline.totalDuration();
        return this.timeline.killTweensOf(t, e, je && !0 !== je.vars.overwrite)._first || _e(this), this.parent && r !== this.timeline.totalDuration() && Gt(this, this._dur * this.timeline._tDur / r, 0, 1), this
      }
      var n, i, s, o, a, u, l, c = this._targets,
        f = t ? ie(t) : c,
        h = this._ptLookup,
        p = this._pt;
      if ((!e || "all" === e) && function (t, e) {
        for (var r = t.length, n = r === e.length; n && r-- && t[r] === e[r];);
        return r < 0
      }(c, f)) return "all" === e && (this._pt = 0), _e(this);
      for (n = this._op = this._op || [], "all" !== e && (R(e) && (a = {}, mt(e, (function (t) {
        return a[t] = 1
      })), e = a), e = function (t, e) {
        var r, n, i, s, o = t[0] ? gt(t[0]).harness : 0,
          a = o && o.aliases;
        if (!a) return e;
        for (n in r = St({}, e), a)
          if (n in r)
            for (i = (s = a[n].split(",")).length; i--;) r[s[i]] = r[n];
        return r
      }(c, e)), l = c.length; l--;)
        if (~f.indexOf(c[l]))
          for (a in i = h[l], "all" === e ? (n[l] = e, o = i, s = {}) : (s = n[l] = n[l] || {}, o = e), o) (u = i && i[a]) && ((!("kill" in u.d) || !0 === u.d.kill(a)) && Dt(this, u, "_pt"), delete i[a]), "all" !== s && (s[a] = 1);
      return this._initted && !this._pt && p && _e(this), this
    }, e.to = function (t, r) {
      return new e(t, r, arguments[2])
    }, e.from = function (t, e) {
      return $t(1, arguments)
    }, e.delayedCall = function (t, r, n, i) {
      return new e(r, 0, {
        immediateRender: !1,
        lazy: !1,
        overwrite: !1,
        delay: t,
        onComplete: r,
        onReverseComplete: r,
        onCompleteParams: n,
        onReverseCompleteParams: n,
        callbackScope: i
      })
    }, e.fromTo = function (t, e, r) {
      return $t(2, arguments)
    }, e.set = function (t, r) {
      return r.duration = 0, r.repeatDelay || (r.repeat = 0), new e(t, r)
    }, e.killTweensOf = function (t, e, r) {
      return g.killTweensOf(t, e, r)
    }, e
  }(qe);
  Ot(tr.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
  }), mt("staggerTo,staggerFrom,staggerFromTo", (function (t) {
    tr[t] = function () {
      var e = new Ue,
        r = re.call(arguments, 0);
      return r.splice("staggerFromTo" === t ? 5 : 4, 0, 0), e[t].apply(e, r)
    }
  }));
  var er = function (t, e, r) {
    return t[e] = r
  },
    rr = function (t, e, r) {
      return t[e](r)
    },
    nr = function (t, e, r, n) {
      return t[e](n.fp, r)
    },
    ir = function (t, e, r) {
      return t.setAttribute(e, r)
    },
    sr = function (t, e) {
      return z(t[e]) ? rr : L(t[e]) && t.setAttribute ? ir : er
    },
    or = function (t, e) {
      return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e)
    },
    ar = function (t, e) {
      return e.set(e.t, e.p, !!(e.s + e.c * t), e)
    },
    ur = function (t, e) {
      var r = e._pt,
        n = "";
      if (!t && e.b) n = e.b;
      else if (1 === t && e.e) n = e.e;
      else {
        for (; r;) n = r.p + (r.m ? r.m(r.s + r.c * t) : Math.round(1e4 * (r.s + r.c * t)) / 1e4) + n, r = r._next;
        n += e.c
      }
      e.set(e.t, e.p, n, e)
    },
    lr = function (t, e) {
      for (var r = e._pt; r;) r.r(t, r.d), r = r._next
    },
    cr = function (t, e, r, n) {
      for (var i, s = this._pt; s;) i = s._next, s.p === n && s.modifier(t, e, r), s = i
    },
    fr = function (t) {
      for (var e, r, n = this._pt; n;) r = n._next, n.p === t && !n.op || n.op === t ? Dt(this, n, "_pt") : n.dep || (e = 1), n = r;
      return !e
    },
    hr = function (t, e, r, n) {
      n.mSet(t, e, n.m.call(n.tween, r, n.mt), n)
    },
    pr = function (t) {
      for (var e, r, n, i, s = t._pt; s;) {
        for (e = s._next, r = n; r && r.pr > s.pr;) r = r._next;
        (s._prev = r ? r._prev : i) ? s._prev._next = s : n = s, (s._next = r) ? r._prev = s : i = s, s = e
      }
      t._pt = n
    },
    dr = function () {
      function t(t, e, r, n, i, s, o, a, u) {
        this.t = e, this.s = n, this.c = i, this.p = r, this.r = s || or, this.d = o || this, this.set = a || er, this.pr = u || 0, this._next = t, t && (t._prev = this)
      }
      return t.prototype.modifier = function (t, e, r) {
        this.mSet = this.mSet || this.set, this.set = hr, this.m = t, this.mt = r, this.tween = e
      }, t
    }();
  mt(pt + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", (function (t) {
    return ot[t] = 1
  })), Q.TweenMax = Q.TweenLite = tr, Q.TimelineLite = Q.TimelineMax = Ue, g = new Ue({
    sortChildren: !1,
    defaults: k,
    autoRemoveChildren: !0,
    id: "root",
    smoothChildTiming: !0
  }), T.stringFilter = Se;
  var gr = [],
    _r = {},
    mr = [],
    vr = 0,
    yr = function (t) {
      return (_r[t] || mr).map((function (t) {
        return t()
      }))
    },
    xr = function () {
      var t = Date.now(),
        e = [];
      t - vr > 2 && (yr("matchMediaInit"), gr.forEach((function (t) {
        var r, n, i, s, o = t.queries,
          a = t.conditions;
        for (n in o) (r = _.matchMedia(o[n]).matches) && (i = 1), r !== a[n] && (a[n] = r, s = 1);
        s && (t.revert(), i && e.push(t))
      })), yr("matchMediaRevert"), e.forEach((function (t) {
        return t.onMatch(t)
      })), vr = t, yr("matchMedia"))
    },
    br = function () {
      function t(t, e) {
        this.selector = e && se(e), this.data = [], this._r = [], this.isReverted = !1, t && this.add(t)
      }
      var e = t.prototype;
      return e.add = function (t, e, r) {
        z(t) && (r = e, e = t, t = z);
        var n = this,
          i = function () {
            var t, i = d,
              s = n.selector;
            return i && i !== n && i.data.push(n), r && (n.selector = se(r)), d = n, t = e.apply(n, arguments), z(t) && n._r.push(t), d = i, n.selector = s, n.isReverted = !1, t
          };
        return n.last = i, t === z ? i(n) : t ? n[t] = i : i
      }, e.ignore = function (t) {
        var e = d;
        d = null, t(this), d = e
      }, e.getTweens = function () {
        var e = [];
        return this.data.forEach((function (r) {
          return r instanceof t ? e.push.apply(e, r.getTweens()) : r instanceof tr && !(r.parent && "nested" === r.parent.data) && e.push(r)
        })), e
      }, e.clear = function () {
        this._r.length = this.data.length = 0
      }, e.kill = function (t, e) {
        var r = this;
        if (t) {
          var n = this.getTweens();
          this.data.forEach((function (t) {
            "isFlip" === t.data && (t.revert(), t.getChildren(!0, !0, !1).forEach((function (t) {
              return n.splice(n.indexOf(t), 1)
            })))
          })), n.map((function (t) {
            return {
              g: t.globalTime(0),
              t: t
            }
          })).sort((function (t, e) {
            return e.g - t.g || -1
          })).forEach((function (e) {
            return e.t.revert(t)
          })), this.data.forEach((function (e) {
            return !(e instanceof qe) && e.revert && e.revert(t)
          })), this._r.forEach((function (e) {
            return e(t, r)
          })), this.isReverted = !0
        } else this.data.forEach((function (t) {
          return t.kill && t.kill()
        }));
        if (this.clear(), e) {
          var i = gr.indexOf(this);
          ~i && gr.splice(i, 1)
        }
      }, e.revert = function (t) {
        this.kill(t || {})
      }, t
    }(),
    wr = function () {
      function t(t) {
        this.contexts = [], this.scope = t
      }
      var e = t.prototype;
      return e.add = function (t, e, r) {
        B(t) || (t = {
          matches: t
        });
        var n, i, s, o = new br(0, r || this.scope),
          a = o.conditions = {};
        for (i in this.contexts.push(o), e = o.add("onMatch", e), o.queries = t, t) "all" === i ? s = 1 : (n = _.matchMedia(t[i])) && (gr.indexOf(o) < 0 && gr.push(o), (a[i] = n.matches) && (s = 1), n.addListener ? n.addListener(xr) : n.addEventListener("change", xr));
        return s && e(o), this
      }, e.revert = function (t) {
        this.kill(t || {})
      }, e.kill = function (t) {
        this.contexts.forEach((function (e) {
          return e.kill(t, !0)
        }))
      }, t
    }(),
    Tr = {
      registerPlugin: function () {
        for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
        e.forEach((function (t) {
          return ve(t)
        }))
      },
      timeline: function (t) {
        return new Ue(t)
      },
      getTweensOf: function (t, e) {
        return g.getTweensOf(t, e)
      },
      getProperty: function (t, e, r, n) {
        R(t) && (t = ie(t)[0]);
        var i = gt(t || {}).get,
          s = r ? Mt : kt;
        return "native" === r && (r = ""), t && (e ? s((lt[e] && lt[e].get || i)(t, e, r, n)) : function (e, r, n) {
          return s((lt[e] && lt[e].get || i)(t, e, r, n))
        })
      },
      quickSetter: function (t, e, r) {
        if ((t = ie(t)).length > 1) {
          var n = t.map((function (t) {
            return Or.quickSetter(t, e, r)
          })),
            i = n.length;
          return function (t) {
            for (var e = i; e--;) n[e](t)
          }
        }
        t = t[0] || {};
        var s = lt[e],
          o = gt(t),
          a = o.harness && (o.harness.aliases || {})[e] || e,
          u = s ? function (e) {
            var n = new s;
            b._pt = 0, n.init(t, r ? e + r : e, b, 0, [t]), n.render(1, n), b._pt && lr(1, b)
          } : o.set(t, a);
        return s ? u : function (e) {
          return u(t, a, r ? e + r : e, o, 1)
        }
      },
      quickTo: function (t, e, r) {
        var n, i = Or.to(t, St(((n = {})[e] = "+=0.1", n.paused = !0, n), r || {})),
          s = function (t, r, n) {
            return i.resetTo(e, t, r, n)
          };
        return s.tween = i, s
      },
      isTweening: function (t) {
        return g.getTweensOf(t, !0).length > 0
      },
      defaults: function (t) {
        return t && t.ease && (t.ease = Le(t.ease, k.ease)), Pt(k, t || {})
      },
      config: function (t) {
        return Pt(T, t || {})
      },
      registerEffect: function (t) {
        var e = t.name,
          r = t.effect,
          n = t.plugins,
          i = t.defaults,
          s = t.extendTimeline;
        (n || "").split(",").forEach((function (t) {
          return t && !lt[t] && !Q[t] && tt(e + " effect requires " + t + " plugin.")
        })), ct[e] = function (t, e, n) {
          return r(ie(t), Ot(e || {}, i), n)
        }, s && (Ue.prototype[e] = function (t, r, n) {
          return this.add(ct[e](t, B(r) ? r : (n = r) && {}, this), n)
        })
      },
      registerEase: function (t, e) {
        Ce[t] = Le(e)
      },
      parseEase: function (t, e) {
        return arguments.length ? Le(t, e) : Ce
      },
      getById: function (t) {
        return g.getById(t)
      },
      exportRoot: function (t, e) {
        void 0 === t && (t = {});
        var r, n, i = new Ue(t);
        for (i.smoothChildTiming = Y(t.smoothChildTiming), g.remove(i), i._dp = 0, i._time = i._tTime = g._time, r = g._first; r;) n = r._next, (e || !(!r._dur && r instanceof tr && r.vars.onComplete === r._targets[0])) && Ut(i, r, r._start - r._delay), r = n;
        return Ut(g, i, 0), i
      },
      context: function (t, e) {
        return t ? new br(t, e) : d
      },
      matchMedia: function (t) {
        return new wr(t)
      },
      matchMediaRefresh: function () {
        return gr.forEach((function (t) {
          var e, r, n = t.conditions;
          for (r in n) n[r] && (n[r] = !1, e = 1);
          e && t.revert()
        })) || xr()
      },
      addEventListener: function (t, e) {
        var r = _r[t] || (_r[t] = []);
        ~r.indexOf(e) || r.push(e)
      },
      removeEventListener: function (t, e) {
        var r = _r[t],
          n = r && r.indexOf(e);
        n >= 0 && r.splice(n, 1)
      },
      utils: {
        wrap: function t(e, r, n) {
          var i = r - e;
          return q(e) ? fe(e, t(0, e.length), r) : Jt(n, (function (t) {
            return (i + (t - e) % i) % i + e
          }))
        },
        wrapYoyo: function t(e, r, n) {
          var i = r - e,
            s = 2 * i;
          return q(e) ? fe(e, t(0, e.length - 1), r) : Jt(n, (function (t) {
            return e + ((t = (s + (t - e) % s) % s || 0) > i ? s - t : t)
          }))
        },
        distribute: ae,
        random: ce,
        snap: le,
        normalize: function (t, e, r) {
          return pe(t, e, 0, 1, r)
        },
        getUnit: ee,
        clamp: function (t, e, r) {
          return Jt(r, (function (r) {
            return te(t, e, r)
          }))
        },
        splitColor: we,
        toArray: ie,
        selector: se,
        mapRange: pe,
        pipe: function () {
          for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
          return function (t) {
            return e.reduce((function (t, e) {
              return e(t)
            }), t)
          }
        },
        unitize: function (t, e) {
          return function (r) {
            return t(parseFloat(r)) + (e || ee(r))
          }
        },
        interpolate: function t(e, r, n, i) {
          var s = isNaN(e + r) ? 0 : function (t) {
            return (1 - t) * e + t * r
          };
          if (!s) {
            var o, a, u, l, c, f = R(e),
              h = {};
            if (!0 === n && (i = 1) && (n = null), f) e = {
              p: e
            }, r = {
              p: r
            };
            else if (q(e) && !q(r)) {
              for (u = [], l = e.length, c = l - 2, a = 1; a < l; a++) u.push(t(e[a - 1], e[a]));
              l--, s = function (t) {
                t *= l;
                var e = Math.min(c, ~~t);
                return u[e](t - e)
              }, n = r
            } else i || (e = St(q(e) ? [] : {}, e));
            if (!u) {
              for (o in r) Ve.call(h, e, o, "get", r[o]);
              s = function (t) {
                return lr(t, h) || (f ? e.p : e)
              }
            }
          }
          return Jt(n, s)
        },
        shuffle: oe
      },
      install: $,
      effects: ct,
      ticker: Pe,
      updateRoot: Ue.updateRoot,
      plugins: lt,
      globalTimeline: g,
      core: {
        PropTween: dr,
        globals: et,
        Tween: tr,
        Timeline: Ue,
        Animation: qe,
        getCache: gt,
        _removeLinkedListItem: Dt,
        reverting: function () {
          return p
        },
        context: function (t) {
          return t && d && (d.data.push(t), t._ctx = d), d
        },
        suppressOverwrites: function (t) {
          return h = t
        }
      }
    };
  mt("to,from,fromTo,delayedCall,set,killTweensOf", (function (t) {
    return Tr[t] = tr[t]
  })), Pe.add(Ue.updateRoot), b = Tr.to({}, {
    duration: 0
  });
  var kr = function (t, e) {
    for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e;) r = r._next;
    return r
  },
    Mr = function (t, e) {
      return {
        name: t,
        rawVars: 1,
        init: function (t, r, n) {
          n._onInit = function (t) {
            var n, i;
            if (R(r) && (n = {}, mt(r, (function (t) {
              return n[t] = 1
            })), r = n), e) {
              for (i in n = {}, r) n[i] = e(r[i]);
              r = n
            } ! function (t, e) {
              var r, n, i, s = t._targets;
              for (r in e)
                for (n = s.length; n--;)(i = t._ptLookup[n][r]) && (i = i.d) && (i._pt && (i = kr(i, r)), i && i.modifier && i.modifier(e[r], t, s[n], r))
            }(t, r)
          }
        }
      }
    },
    Or = Tr.registerPlugin({
      name: "attr",
      init: function (t, e, r, n, i) {
        var s, o, a;
        for (s in this.tween = r, e) a = t.getAttribute(s) || "", (o = this.add(t, "setAttribute", (a || 0) + "", e[s], n, i, 0, 0, s)).op = s, o.b = a, this._props.push(s)
      },
      render: function (t, e) {
        for (var r = e._pt; r;) p ? r.set(r.t, r.p, r.b, r) : r.r(t, r.d), r = r._next
      }
    }, {
      name: "endArray",
      init: function (t, e) {
        for (var r = e.length; r--;) this.add(t, r, t[r] || 0, e[r], 0, 0, 0, 0, 0, 1)
      }
    }, Mr("roundProps", ue), Mr("modifiers"), Mr("snap", le)) || Tr;
  tr.version = Ue.version = Or.version = "3.11.5", y = 1, I() && Ae();
  Ce.Power0, Ce.Power1, Ce.Power2, Ce.Power3, Ce.Power4, Ce.Linear, Ce.Quad, Ce.Cubic, Ce.Quart, Ce.Quint, Ce.Strong, Ce.Elastic, Ce.Back, Ce.SteppedEase, Ce.Bounce, Ce.Sine, Ce.Expo, Ce.Circ;
  var Sr, Pr, Ar, Cr, Er, Dr, Rr, zr, Fr = {},
    Lr = 180 / Math.PI,
    Br = Math.PI / 180,
    Yr = Math.atan2,
    Ir = 1e8,
    Xr = /([A-Z])/g,
    Nr = /(left|right|width|margin|padding|x)/i,
    qr = /[\s,\(]\S/,
    Ur = {
      autoAlpha: "opacity,visibility",
      scale: "scaleX,scaleY",
      alpha: "opacity"
    },
    jr = function (t, e) {
      return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
    },
    Wr = function (t, e) {
      return e.set(e.t, e.p, 1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
    },
    Hr = function (t, e) {
      return e.set(e.t, e.p, t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b, e)
    },
    Vr = function (t, e) {
      var r = e.s + e.c * t;
      e.set(e.t, e.p, ~~(r + (r < 0 ? -.5 : .5)) + e.u, e)
    },
    Gr = function (t, e) {
      return e.set(e.t, e.p, t ? e.e : e.b, e)
    },
    Kr = function (t, e) {
      return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e)
    },
    Qr = function (t, e, r) {
      return t.style[e] = r
    },
    Zr = function (t, e, r) {
      return t.style.setProperty(e, r)
    },
    $r = function (t, e, r) {
      return t._gsap[e] = r
    },
    Jr = function (t, e, r) {
      return t._gsap.scaleX = t._gsap.scaleY = r
    },
    tn = function (t, e, r, n, i) {
      var s = t._gsap;
      s.scaleX = s.scaleY = r, s.renderTransform(i, s)
    },
    en = function (t, e, r, n, i) {
      var s = t._gsap;
      s[e] = r, s.renderTransform(i, s)
    },
    rn = "transform",
    nn = rn + "Origin",
    sn = function t(e, r) {
      var n = this,
        i = this.target,
        s = i.style;
      if (e in Fr) {
        if (this.tfm = this.tfm || {}, "transform" === e) return Ur.transform.split(",").forEach((function (e) {
          return t.call(n, e, r)
        }));
        if (~(e = Ur[e] || e).indexOf(",") ? e.split(",").forEach((function (t) {
          return n.tfm[t] = Tn(i, t)
        })) : this.tfm[e] = i._gsap.x ? i._gsap[e] : Tn(i, e), this.props.indexOf(rn) >= 0) return;
        i._gsap.svg && (this.svgo = i.getAttribute("data-svg-origin"), this.props.push(nn, r, "")), e = rn
      } (s || r) && this.props.push(e, r, s[e])
    },
    on = function (t) {
      t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"))
    },
    an = function () {
      var t, e, r = this.props,
        n = this.target,
        i = n.style,
        s = n._gsap;
      for (t = 0; t < r.length; t += 3) r[t + 1] ? n[r[t]] = r[t + 2] : r[t + 2] ? i[r[t]] = r[t + 2] : i.removeProperty("--" === r[t].substr(0, 2) ? r[t] : r[t].replace(Xr, "-$1").toLowerCase());
      if (this.tfm) {
        for (e in this.tfm) s[e] = this.tfm[e];
        s.svg && (s.renderTransform(), n.setAttribute("data-svg-origin", this.svgo || "")), (!(t = Rr()) || !t.isStart) && !i[rn] && (on(i), s.uncache = 1)
      }
    },
    un = function (t, e) {
      var r = {
        target: t,
        props: [],
        revert: an,
        save: sn
      };
      return t._gsap || Or.core.getCache(t), e && e.split(",").forEach((function (t) {
        return r.save(t)
      })), r
    },
    ln = function (t, e) {
      var r = Pr.createElementNS ? Pr.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : Pr.createElement(t);
      return r.style ? r : Pr.createElement(t)
    },
    cn = function t(e, r, n) {
      var i = getComputedStyle(e);
      return i[r] || i.getPropertyValue(r.replace(Xr, "-$1").toLowerCase()) || i.getPropertyValue(r) || !n && t(e, hn(r) || r, 1) || ""
    },
    fn = "O,Moz,ms,Ms,Webkit".split(","),
    hn = function (t, e, r) {
      var n = (e || Er).style,
        i = 5;
      if (t in n && !r) return t;
      for (t = t.charAt(0).toUpperCase() + t.substr(1); i-- && !(fn[i] + t in n););
      return i < 0 ? null : (3 === i ? "ms" : i >= 0 ? fn[i] : "") + t
    },
    pn = function () {
      typeof window < "u" && window.document && (Sr = window, Pr = Sr.document, Ar = Pr.documentElement, Er = ln("div") || {
        style: {}
      }, ln("div"), rn = hn(rn), nn = rn + "Origin", Er.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", zr = !!hn("perspective"), Rr = Or.core.reverting, Cr = 1)
    },
    dn = function t(e) {
      var r, n = ln("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
        i = this.parentNode,
        s = this.nextSibling,
        o = this.style.cssText;
      if (Ar.appendChild(n), n.appendChild(this), this.style.display = "block", e) try {
        r = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = t
      } catch (t) { } else this._gsapBBox && (r = this._gsapBBox());
      return i && (s ? i.insertBefore(this, s) : i.appendChild(this)), Ar.removeChild(n), this.style.cssText = o, r
    },
    gn = function (t, e) {
      for (var r = e.length; r--;)
        if (t.hasAttribute(e[r])) return t.getAttribute(e[r])
    },
    _n = function (t) {
      var e;
      try {
        e = t.getBBox()
      } catch (r) {
        e = dn.call(t, !0)
      }
      return e && (e.width || e.height) || t.getBBox === dn || (e = dn.call(t, !0)), !e || e.width || e.x || e.y ? e : {
        x: +gn(t, ["x", "cx", "x1"]) || 0,
        y: +gn(t, ["y", "cy", "y1"]) || 0,
        width: 0,
        height: 0
      }
    },
    mn = function (t) {
      return !(!t.getCTM || t.parentNode && !t.ownerSVGElement || !_n(t))
    },
    vn = function (t, e) {
      if (e) {
        var r = t.style;
        e in Fr && e !== nn && (e = rn), r.removeProperty ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) && (e = "-" + e), r.removeProperty(e.replace(Xr, "-$1").toLowerCase())) : r.removeAttribute(e)
      }
    },
    yn = function (t, e, r, n, i, s) {
      var o = new dr(t._pt, e, r, 0, 1, s ? Kr : Gr);
      return t._pt = o, o.b = n, o.e = i, t._props.push(r), o
    },
    xn = {
      deg: 1,
      rad: 1,
      turn: 1
    },
    bn = {
      grid: 1,
      flex: 1
    },
    wn = function t(e, r, n, i) {
      var s, o, a, u, l = parseFloat(n) || 0,
        c = (n + "").trim().substr((l + "").length) || "px",
        f = Er.style,
        h = Nr.test(r),
        p = "svg" === e.tagName.toLowerCase(),
        d = (p ? "client" : "offset") + (h ? "Width" : "Height"),
        g = 100,
        _ = "px" === i,
        m = "%" === i;
      return i === c || !l || xn[i] || xn[c] ? l : ("px" !== c && !_ && (l = t(e, r, n, "px")), u = e.getCTM && mn(e), !m && "%" !== c || !Fr[r] && !~r.indexOf("adius") ? (f[h ? "width" : "height"] = g + (_ ? c : i), o = ~r.indexOf("adius") || "em" === i && e.appendChild && !p ? e : e.parentNode, u && (o = (e.ownerSVGElement || {}).parentNode), (!o || o === Pr || !o.appendChild) && (o = Pr.body), (a = o._gsap) && m && a.width && h && a.time === Pe.time && !a.uncache ? vt(l / a.width * g) : ((m || "%" === c) && !bn[cn(o, "display")] && (f.position = cn(e, "position")), o === e && (f.position = "static"), o.appendChild(Er), s = Er[d], o.removeChild(Er), f.position = "absolute", h && m && ((a = gt(o)).time = Pe.time, a.width = o[d]), vt(_ ? s * l / g : s && l ? g / s * l : 0))) : (s = u ? e.getBBox()[h ? "width" : "height"] : e[d], vt(m ? l / s * g : l / 100 * s)))
    },
    Tn = function (t, e, r, n) {
      var i;
      return Cr || pn(), e in Ur && "transform" !== e && (~(e = Ur[e]).indexOf(",") && (e = e.split(",")[0])), Fr[e] && "transform" !== e ? (i = Fn(t, n), i = "transformOrigin" !== e ? i[e] : i.svg ? i.origin : Ln(cn(t, nn)) + " " + i.zOrigin + "px") : (!(i = t.style[e]) || "auto" === i || n || ~(i + "").indexOf("calc(")) && (i = Pn[e] && Pn[e](t, e, r) || cn(t, e) || _t(t, e) || ("opacity" === e ? 1 : 0)), r && !~(i + "").trim().indexOf(" ") ? wn(t, e, i, r) + r : i
    },
    kn = function (t, e, r, n) {
      if (!r || "none" === r) {
        var i = hn(e, t, 1),
          s = i && cn(t, i, 1);
        s && s !== r ? (e = i, r = s) : "borderColor" === e && (r = cn(t, "borderTopColor"))
      }
      var o, a, u, l, c, f, h, p, d, g, _, m = new dr(this._pt, t.style, e, 0, 1, ur),
        v = 0,
        y = 0;
      if (m.b = r, m.e = n, r += "", "auto" === (n += "") && (t.style[e] = n, n = cn(t, e) || n, t.style[e] = r), Se(o = [r, n]), n = o[1], u = (r = o[0]).match(W) || [], (n.match(W) || []).length) {
        for (; a = W.exec(n);) h = a[0], d = n.substring(v, a.index), c ? c = (c + 1) % 5 : ("rgba(" === d.substr(-5) || "hsla(" === d.substr(-5)) && (c = 1), h !== (f = u[y++] || "") && (l = parseFloat(f) || 0, _ = f.substr((l + "").length), "=" === h.charAt(1) && (h = xt(l, h) + _), p = parseFloat(h), g = h.substr((p + "").length), v = W.lastIndex - g.length, g || (g = g || T.units[e] || _, v === n.length && (n += g, m.e += g)), _ !== g && (l = wn(t, e, f, g) || 0), m._pt = {
          _next: m._pt,
          p: d || 1 === y ? d : ",",
          s: l,
          c: p - l,
          m: c && c < 4 || "zIndex" === e ? Math.round : 0
        });
        m.c = v < n.length ? n.substring(v, n.length) : ""
      } else m.r = "display" === e && "none" === n ? Kr : Gr;
      return V.test(n) && (m.e = 0), this._pt = m, m
    },
    Mn = {
      top: "0%",
      bottom: "100%",
      left: "0%",
      right: "100%",
      center: "50%"
    },
    On = function (t) {
      var e = t.split(" "),
        r = e[0],
        n = e[1] || "50%";
      return ("top" === r || "bottom" === r || "left" === n || "right" === n) && (t = r, r = n, n = t), e[0] = Mn[r] || r, e[1] = Mn[n] || n, e.join(" ")
    },
    Sn = function (t, e) {
      if (e.tween && e.tween._time === e.tween._dur) {
        var r, n, i, s = e.t,
          o = s.style,
          a = e.u,
          u = s._gsap;
        if ("all" === a || !0 === a) o.cssText = "", n = 1;
        else
          for (i = (a = a.split(",")).length; --i > -1;) r = a[i], Fr[r] && (n = 1, r = "transformOrigin" === r ? nn : rn), vn(s, r);
        n && (vn(s, rn), u && (u.svg && s.removeAttribute("transform"), Fn(s, 1), u.uncache = 1, on(o)))
      }
    },
    Pn = {
      clearProps: function (t, e, r, n, i) {
        if ("isFromStart" !== i.data) {
          var s = t._pt = new dr(t._pt, e, r, 0, 0, Sn);
          return s.u = n, s.pr = -10, s.tween = i, t._props.push(r), 1
        }
      }
    },
    An = [1, 0, 0, 1, 0, 0],
    Cn = {},
    En = function (t) {
      return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t
    },
    Dn = function (t) {
      var e = cn(t, rn);
      return En(e) ? An : e.substr(7).match(j).map(vt)
    },
    Rn = function (t, e) {
      var r, n, i, s, o = t._gsap || gt(t),
        a = t.style,
        u = Dn(t);
      return o.svg && t.getAttribute("transform") ? "1,0,0,1,0,0" === (u = [(i = t.transform.baseVal.consolidate().matrix).a, i.b, i.c, i.d, i.e, i.f]).join(",") ? An : u : (u === An && !t.offsetParent && t !== Ar && !o.svg && (i = a.display, a.display = "block", (!(r = t.parentNode) || !t.offsetParent) && (s = 1, n = t.nextElementSibling, Ar.appendChild(t)), u = Dn(t), i ? a.display = i : vn(t, "display"), s && (n ? r.insertBefore(t, n) : r ? r.appendChild(t) : Ar.removeChild(t))), e && u.length > 6 ? [u[0], u[1], u[4], u[5], u[12], u[13]] : u)
    },
    zn = function (t, e, r, n, i, s) {
      var o, a, u, l = t._gsap,
        c = i || Rn(t, !0),
        f = l.xOrigin || 0,
        h = l.yOrigin || 0,
        p = l.xOffset || 0,
        d = l.yOffset || 0,
        g = c[0],
        _ = c[1],
        m = c[2],
        v = c[3],
        y = c[4],
        x = c[5],
        b = e.split(" "),
        w = parseFloat(b[0]) || 0,
        T = parseFloat(b[1]) || 0;
      r ? c !== An && (a = g * v - _ * m) && (u = w * (-_ / a) + T * (g / a) - (g * x - _ * y) / a, w = w * (v / a) + T * (-m / a) + (m * x - v * y) / a, T = u) : (w = (o = _n(t)).x + (~b[0].indexOf("%") ? w / 100 * o.width : w), T = o.y + (~(b[1] || b[0]).indexOf("%") ? T / 100 * o.height : T)), n || !1 !== n && l.smooth ? (y = w - f, x = T - h, l.xOffset = p + (y * g + x * m) - y, l.yOffset = d + (y * _ + x * v) - x) : l.xOffset = l.yOffset = 0, l.xOrigin = w, l.yOrigin = T, l.smooth = !!n, l.origin = e, l.originIsAbsolute = !!r, t.style[nn] = "0px 0px", s && (yn(s, l, "xOrigin", f, w), yn(s, l, "yOrigin", h, T), yn(s, l, "xOffset", p, l.xOffset), yn(s, l, "yOffset", d, l.yOffset)), t.setAttribute("data-svg-origin", w + " " + T)
    },
    Fn = function (t, e) {
      var r = t._gsap || new Ne(t);
      if ("x" in r && !e && !r.uncache) return r;
      var n, i, s, o, a, u, l, c, f, h, p, d, g, _, m, v, y, x, b, w, k, M, O, S, P, A, C, E, D, R, z, F, L = t.style,
        B = r.scaleX < 0,
        Y = "px",
        I = "deg",
        X = getComputedStyle(t),
        N = cn(t, nn) || "0";
      return n = i = s = u = l = c = f = h = p = 0, o = a = 1, r.svg = !(!t.getCTM || !mn(t)), X.translate && (("none" !== X.translate || "none" !== X.scale || "none" !== X.rotate) && (L[rn] = ("none" !== X.translate ? "translate3d(" + (X.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + ("none" !== X.rotate ? "rotate(" + X.rotate + ") " : "") + ("none" !== X.scale ? "scale(" + X.scale.split(" ").join(",") + ") " : "") + ("none" !== X[rn] ? X[rn] : "")), L.scale = L.rotate = L.translate = "none"), _ = Rn(t, r.svg), r.svg && (r.uncache ? (P = t.getBBox(), N = r.xOrigin - P.x + "px " + (r.yOrigin - P.y) + "px", S = "") : S = !e && t.getAttribute("data-svg-origin"), zn(t, S || N, !!S || r.originIsAbsolute, !1 !== r.smooth, _)), d = r.xOrigin || 0, g = r.yOrigin || 0, _ !== An && (x = _[0], b = _[1], w = _[2], k = _[3], n = M = _[4], i = O = _[5], 6 === _.length ? (o = Math.sqrt(x * x + b * b), a = Math.sqrt(k * k + w * w), u = x || b ? Yr(b, x) * Lr : 0, (f = w || k ? Yr(w, k) * Lr + u : 0) && (a *= Math.abs(Math.cos(f * Br))), r.svg && (n -= d - (d * x + g * w), i -= g - (d * b + g * k))) : (F = _[6], R = _[7], C = _[8], E = _[9], D = _[10], z = _[11], n = _[12], i = _[13], s = _[14], l = (m = Yr(F, D)) * Lr, m && (S = M * (v = Math.cos(-m)) + C * (y = Math.sin(-m)), P = O * v + E * y, A = F * v + D * y, C = M * -y + C * v, E = O * -y + E * v, D = F * -y + D * v, z = R * -y + z * v, M = S, O = P, F = A), c = (m = Yr(-w, D)) * Lr, m && (v = Math.cos(-m), z = k * (y = Math.sin(-m)) + z * v, x = S = x * v - C * y, b = P = b * v - E * y, w = A = w * v - D * y), u = (m = Yr(b, x)) * Lr, m && (S = x * (v = Math.cos(m)) + b * (y = Math.sin(m)), P = M * v + O * y, b = b * v - x * y, O = O * v - M * y, x = S, M = P), l && Math.abs(l) + Math.abs(u) > 359.9 && (l = u = 0, c = 180 - c), o = vt(Math.sqrt(x * x + b * b + w * w)), a = vt(Math.sqrt(O * O + F * F)), m = Yr(M, O), f = Math.abs(m) > 2e-4 ? m * Lr : 0, p = z ? 1 / (z < 0 ? -z : z) : 0), r.svg && (S = t.getAttribute("transform"), r.forceCSS = t.setAttribute("transform", "") || !En(cn(t, rn)), S && t.setAttribute("transform", S))), Math.abs(f) > 90 && Math.abs(f) < 270 && (B ? (o *= -1, f += u <= 0 ? 180 : -180, u += u <= 0 ? 180 : -180) : (a *= -1, f += f <= 0 ? 180 : -180)), e = e || r.uncache, r.x = n - ((r.xPercent = n && (!e && r.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-n) ? -50 : 0))) ? t.offsetWidth * r.xPercent / 100 : 0) + Y, r.y = i - ((r.yPercent = i && (!e && r.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-i) ? -50 : 0))) ? t.offsetHeight * r.yPercent / 100 : 0) + Y, r.z = s + Y, r.scaleX = vt(o), r.scaleY = vt(a), r.rotation = vt(u) + I, r.rotationX = vt(l) + I, r.rotationY = vt(c) + I, r.skewX = f + I, r.skewY = h + I, r.transformPerspective = p + Y, (r.zOrigin = parseFloat(N.split(" ")[2]) || 0) && (L[nn] = Ln(N)), r.xOffset = r.yOffset = 0, r.force3D = T.force3D, r.renderTransform = r.svg ? Un : zr ? qn : Yn, r.uncache = 0, r
    },
    Ln = function (t) {
      return (t = t.split(" "))[0] + " " + t[1]
    },
    Bn = function (t, e, r) {
      var n = ee(e);
      return vt(parseFloat(e) + parseFloat(wn(t, "x", r + "px", n))) + n
    },
    Yn = function (t, e) {
      e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, qn(t, e)
    },
    In = "0deg",
    Xn = "0px",
    Nn = ") ",
    qn = function (t, e) {
      var r = e || this,
        n = r.xPercent,
        i = r.yPercent,
        s = r.x,
        o = r.y,
        a = r.z,
        u = r.rotation,
        l = r.rotationY,
        c = r.rotationX,
        f = r.skewX,
        h = r.skewY,
        p = r.scaleX,
        d = r.scaleY,
        g = r.transformPerspective,
        _ = r.force3D,
        m = r.target,
        v = r.zOrigin,
        y = "",
        x = "auto" === _ && t && 1 !== t || !0 === _;
      if (v && (c !== In || l !== In)) {
        var b, w = parseFloat(l) * Br,
          T = Math.sin(w),
          k = Math.cos(w);
        w = parseFloat(c) * Br, b = Math.cos(w), s = Bn(m, s, T * b * -v), o = Bn(m, o, -Math.sin(w) * -v), a = Bn(m, a, k * b * -v + v)
      }
      g !== Xn && (y += "perspective(" + g + Nn), (n || i) && (y += "translate(" + n + "%, " + i + "%) "), (x || s !== Xn || o !== Xn || a !== Xn) && (y += a !== Xn || x ? "translate3d(" + s + ", " + o + ", " + a + ") " : "translate(" + s + ", " + o + Nn), u !== In && (y += "rotate(" + u + Nn), l !== In && (y += "rotateY(" + l + Nn), c !== In && (y += "rotateX(" + c + Nn), (f !== In || h !== In) && (y += "skew(" + f + ", " + h + Nn), (1 !== p || 1 !== d) && (y += "scale(" + p + ", " + d + Nn), m.style[rn] = y || "translate(0, 0)"
    },
    Un = function (t, e) {
      var r, n, i, s, o, a = e || this,
        u = a.xPercent,
        l = a.yPercent,
        c = a.x,
        f = a.y,
        h = a.rotation,
        p = a.skewX,
        d = a.skewY,
        g = a.scaleX,
        _ = a.scaleY,
        m = a.target,
        v = a.xOrigin,
        y = a.yOrigin,
        x = a.xOffset,
        b = a.yOffset,
        w = a.forceCSS,
        T = parseFloat(c),
        k = parseFloat(f);
      h = parseFloat(h), p = parseFloat(p), (d = parseFloat(d)) && (p += d = parseFloat(d), h += d), h || p ? (h *= Br, p *= Br, r = Math.cos(h) * g, n = Math.sin(h) * g, i = Math.sin(h - p) * -_, s = Math.cos(h - p) * _, p && (d *= Br, o = Math.tan(p - d), i *= o = Math.sqrt(1 + o * o), s *= o, d && (o = Math.tan(d), r *= o = Math.sqrt(1 + o * o), n *= o)), r = vt(r), n = vt(n), i = vt(i), s = vt(s)) : (r = g, s = _, n = i = 0), (T && !~(c + "").indexOf("px") || k && !~(f + "").indexOf("px")) && (T = wn(m, "x", c, "px"), k = wn(m, "y", f, "px")), (v || y || x || b) && (T = vt(T + v - (v * r + y * i) + x), k = vt(k + y - (v * n + y * s) + b)), (u || l) && (o = m.getBBox(), T = vt(T + u / 100 * o.width), k = vt(k + l / 100 * o.height)), o = "matrix(" + r + "," + n + "," + i + "," + s + "," + T + "," + k + ")", m.setAttribute("transform", o), w && (m.style[rn] = o)
    },
    jn = function (t, e, r, n, i) {
      var s, o, a = 360,
        u = R(i),
        l = parseFloat(i) * (u && ~i.indexOf("rad") ? Lr : 1) - n,
        c = n + l + "deg";
      return u && ("short" === (s = i.split("_")[1]) && ((l %= a) !== l % 180 && (l += l < 0 ? a : -a)), "cw" === s && l < 0 ? l = (l + a * Ir) % a - ~~(l / a) * a : "ccw" === s && l > 0 && (l = (l - a * Ir) % a - ~~(l / a) * a)), t._pt = o = new dr(t._pt, e, r, n, l, Wr), o.e = c, o.u = "deg", t._props.push(r), o
    },
    Wn = function (t, e) {
      for (var r in e) t[r] = e[r];
      return t
    },
    Hn = function (t, e, r) {
      var n, i, s, o, a, u, l, c = Wn({}, r._gsap),
        f = r.style;
      for (i in c.svg ? (s = r.getAttribute("transform"), r.setAttribute("transform", ""), f[rn] = e, n = Fn(r, 1), vn(r, rn), r.setAttribute("transform", s)) : (s = getComputedStyle(r)[rn], f[rn] = e, n = Fn(r, 1), f[rn] = s), Fr) (s = c[i]) !== (o = n[i]) && "perspective,force3D,transformOrigin,svgOrigin".indexOf(i) < 0 && (a = ee(s) !== (l = ee(o)) ? wn(r, i, s, l) : parseFloat(s), u = parseFloat(o), t._pt = new dr(t._pt, n, i, a, u - a, jr), t._pt.u = l || 0, t._props.push(i));
      Wn(n, c)
    };
  mt("padding,margin,Width,Radius", (function (t, e) {
    var r = "Top",
      n = "Right",
      i = "Bottom",
      s = "Left",
      o = (e < 3 ? [r, n, i, s] : [r + s, r + n, i + n, i + s]).map((function (r) {
        return e < 2 ? t + r : "border" + r + t
      }));
    Pn[e > 1 ? "border" + t : t] = function (t, e, r, n, i) {
      var s, a;
      if (arguments.length < 4) return s = o.map((function (e) {
        return Tn(t, e, r)
      })), 5 === (a = s.join(" ")).split(s[0]).length ? s[0] : a;
      s = (n + "").split(" "), a = {}, o.forEach((function (t, e) {
        return a[t] = s[e] = s[e] || s[(e - 1) / 2 | 0]
      })), t.init(e, a, i)
    }
  }));
  var Vn = {
    name: "css",
    register: pn,
    targetTest: function (t) {
      return t.style && t.nodeType
    },
    init: function (t, e, r, n, i) {
      var s, o, a, u, l, c, f, h, p, d, g, _, m, v, y, x, b = this._props,
        w = t.style,
        k = r.vars.startAt;
      for (f in Cr || pn(), this.styles = this.styles || un(t), x = this.styles.props, this.tween = r, e)
        if ("autoRound" !== f && (o = e[f], !lt[f] || !Ge(f, e, r, n, t, i)))
          if (l = typeof o, c = Pn[f], "function" === l && (l = typeof (o = o.call(r, n, t, i))), "string" === l && ~o.indexOf("random(") && (o = he(o)), c) c(this, t, f, o, r) && (y = 1);
          else if ("--" === f.substr(0, 2)) s = (getComputedStyle(t).getPropertyValue(f) + "").trim(), o += "", Me.lastIndex = 0, Me.test(s) || (h = ee(s), p = ee(o)), p ? h !== p && (s = wn(t, f, s, p) + p) : h && (o += h), this.add(w, "setProperty", s, o, n, i, 0, 0, f), b.push(f), x.push(f, 0, w[f]);
          else if ("undefined" !== l) {
            if (k && f in k ? (s = "function" == typeof k[f] ? k[f].call(r, n, t, i) : k[f], R(s) && ~s.indexOf("random(") && (s = he(s)), ee(s + "") || (s += T.units[f] || ee(Tn(t, f)) || ""), "=" === (s + "").charAt(1) && (s = Tn(t, f))) : s = Tn(t, f), u = parseFloat(s), (d = "string" === l && "=" === o.charAt(1) && o.substr(0, 2)) && (o = o.substr(2)), a = parseFloat(o), f in Ur && ("autoAlpha" === f && (1 === u && "hidden" === Tn(t, "visibility") && a && (u = 0), x.push("visibility", 0, w.visibility), yn(this, w, "visibility", u ? "inherit" : "hidden", a ? "inherit" : "hidden", !a)), "scale" !== f && "transform" !== f && (~(f = Ur[f]).indexOf(",") && (f = f.split(",")[0]))), g = f in Fr)
              if (this.styles.save(f), _ || ((m = t._gsap).renderTransform && !e.parseTransform || Fn(t, e.parseTransform), v = !1 !== e.smoothOrigin && m.smooth, (_ = this._pt = new dr(this._pt, w, rn, 0, 1, m.renderTransform, m, 0, -1)).dep = 1), "scale" === f) this._pt = new dr(this._pt, m, "scaleY", m.scaleY, (d ? xt(m.scaleY, d + a) : a) - m.scaleY || 0, jr), this._pt.u = 0, b.push("scaleY", f), f += "X";
              else {
                if ("transformOrigin" === f) {
                  x.push(nn, 0, w[nn]), o = On(o), m.svg ? zn(t, o, 0, v, 0, this) : ((p = parseFloat(o.split(" ")[2]) || 0) !== m.zOrigin && yn(this, m, "zOrigin", m.zOrigin, p), yn(this, w, f, Ln(s), Ln(o)));
                  continue
                }
                if ("svgOrigin" === f) {
                  zn(t, o, 1, v, 0, this);
                  continue
                }
                if (f in Cn) {
                  jn(this, m, f, u, d ? xt(u, d + o) : o);
                  continue
                }
                if ("smoothOrigin" === f) {
                  yn(this, m, "smooth", m.smooth, o);
                  continue
                }
                if ("force3D" === f) {
                  m[f] = o;
                  continue
                }
                if ("transform" === f) {
                  Hn(this, o, t);
                  continue
                }
              }
            else f in w || (f = hn(f) || f);
            if (g || (a || 0 === a) && (u || 0 === u) && !qr.test(o) && f in w) a || (a = 0), (h = (s + "").substr((u + "").length)) !== (p = ee(o) || (f in T.units ? T.units[f] : h)) && (u = wn(t, f, s, p)), this._pt = new dr(this._pt, g ? m : w, f, u, (d ? xt(u, d + a) : a) - u, g || "px" !== p && "zIndex" !== f || !1 === e.autoRound ? jr : Vr), this._pt.u = p || 0, h !== p && "%" !== p && (this._pt.b = s, this._pt.r = Hr);
            else if (f in w) kn.call(this, t, f, s, d ? d + o : o);
            else if (f in t) this.add(t, f, s || t[f], d ? d + o : o, n, i);
            else if ("parseTransform" !== f) {
              J(f, o);
              continue
            }
            g || (f in w ? x.push(f, 0, w[f]) : x.push(f, 1, s || t[f])), b.push(f)
          }
      y && pr(this)
    },
    render: function (t, e) {
      if (e.tween._time || !Rr())
        for (var r = e._pt; r;) r.r(t, r.d), r = r._next;
      else e.styles.revert()
    },
    get: Tn,
    aliases: Ur,
    getSetter: function (t, e, r) {
      var n = Ur[e];
      return n && n.indexOf(",") < 0 && (e = n), e in Fr && e !== nn && (t._gsap.x || Tn(t, "x")) ? r && Dr === r ? "scale" === e ? Jr : $r : (Dr = r || {}) && ("scale" === e ? tn : en) : t.style && !L(t.style[e]) ? Qr : ~e.indexOf("-") ? Zr : sr(t, e)
    },
    core: {
      _removeProperty: vn,
      _getMatrix: Rn
    }
  };
  Or.utils.checkPrefix = hn, Or.core.getStyleSaver = un,
    function (t, e, r, n) {
      var i = mt(t + "," + e + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", (function (t) {
        Fr[t] = 1
      }));
      mt(e, (function (t) {
        T.units[t] = "deg", Cn[t] = 1
      })), Ur[i[13]] = t + "," + e, mt("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", (function (t) {
        var e = t.split(":");
        Ur[e[1]] = i[e[0]]
      }))
    }("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY"), mt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", (function (t) {
      T.units[t] = "px"
    })), Or.registerPlugin(Vn);
  var Gn = Or.registerPlugin(Vn) || Or;
  Gn.core.Tween;

  function Kn(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
    }
  }
  var Qn, Zn, $n, Jn, ti, ei, ri, ni, ii, si, oi, ai, ui, li = function () {
    return Qn || typeof window < "u" && (Qn = window.gsap) && Qn.registerPlugin && Qn
  },
    ci = 1,
    fi = [],
    hi = [],
    pi = [],
    di = Date.now,
    gi = function (t, e) {
      return e
    },
    _i = function (t, e) {
      return ~pi.indexOf(t) && pi[pi.indexOf(t) + 1][e]
    },
    mi = function (t) {
      return !!~si.indexOf(t)
    },
    vi = function (t, e, r, n, i) {
      return t.addEventListener(e, r, {
        passive: !n,
        capture: !!i
      })
    },
    yi = function (t, e, r, n) {
      return t.removeEventListener(e, r, !!n)
    },
    xi = "scrollLeft",
    bi = "scrollTop",
    wi = function () {
      return oi && oi.isPressed || hi.cache++
    },
    Ti = function (t, e) {
      var r = function r(n) {
        if (n || 0 === n) {
          ci && ($n.history.scrollRestoration = "manual");
          var i = oi && oi.isPressed;
          n = r.v = Math.round(n) || (oi && oi.iOS ? 1 : 0), t(n), r.cacheID = hi.cache, i && gi("ss", n)
        } else (e || hi.cache !== r.cacheID || gi("ref")) && (r.cacheID = hi.cache, r.v = t());
        return r.v + r.offset
      };
      return r.offset = 0, t && r
    },
    ki = {
      s: xi,
      p: "left",
      p2: "Left",
      os: "right",
      os2: "Right",
      d: "width",
      d2: "Width",
      a: "x",
      sc: Ti((function (t) {
        return arguments.length ? $n.scrollTo(t, Mi.sc()) : $n.pageXOffset || Jn[xi] || ti[xi] || ei[xi] || 0
      }))
    },
    Mi = {
      s: bi,
      p: "top",
      p2: "Top",
      os: "bottom",
      os2: "Bottom",
      d: "height",
      d2: "Height",
      a: "y",
      op: ki,
      sc: Ti((function (t) {
        return arguments.length ? $n.scrollTo(ki.sc(), t) : $n.pageYOffset || Jn[bi] || ti[bi] || ei[bi] || 0
      }))
    },
    Oi = function (t) {
      return Qn.utils.toArray(t)[0] || ("string" == typeof t && !1 !== Qn.config().nullTargetWarn ? console.warn("Element not found:", t) : null)
    },
    Si = function (t, e) {
      var r = e.s,
        n = e.sc;
      mi(t) && (t = Jn.scrollingElement || ti);
      var i = hi.indexOf(t),
        s = n === Mi.sc ? 1 : 2;
      !~i && (i = hi.push(t) - 1), hi[i + s] || t.addEventListener("scroll", wi);
      var o = hi[i + s],
        a = o || (hi[i + s] = Ti(_i(t, r), !0) || (mi(t) ? n : Ti((function (e) {
          return arguments.length ? t[r] = e : t[r]
        }))));
      return a.target = t, o || (a.smooth = "smooth" === Qn.getProperty(t, "scrollBehavior")), a
    },
    Pi = function (t, e, r) {
      var n = t,
        i = t,
        s = di(),
        o = s,
        a = e || 50,
        u = Math.max(500, 3 * a),
        l = function (t, e) {
          var u = di();
          e || u - s > a ? (i = n, n = t, o = s, s = u) : r ? n += t : n = i + (t - i) / (u - o) * (s - o)
        };
      return {
        update: l,
        reset: function () {
          i = n = r ? 0 : n, o = s = 0
        },
        getVelocity: function (t) {
          var e = o,
            a = i,
            c = di();
          return (t || 0 === t) && t !== n && l(t), s === o || c - o > u ? 0 : (n + (r ? a : -a)) / ((r ? c : s) - e) * 1e3
        }
      }
    },
    Ai = function (t, e) {
      return e && !t._gsapAllow && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t
    },
    Ci = function (t) {
      var e = Math.max.apply(Math, t),
        r = Math.min.apply(Math, t);
      return Math.abs(e) >= Math.abs(r) ? e : r
    },
    Ei = function () {
      (ii = Qn.core.globals().ScrollTrigger) && ii.core && function () {
        var t = ii.core,
          e = t.bridge || {},
          r = t._scrollers,
          n = t._proxies;
        r.push.apply(r, hi), n.push.apply(n, pi), hi = r, pi = n, gi = function (t, r) {
          return e[t](r)
        }
      }()
    },
    Di = function (t) {
      return (Qn = t || li()) && typeof document < "u" && document.body && ($n = window, Jn = document, ti = Jn.documentElement, ei = Jn.body, si = [$n, Jn, ti, ei], Qn.utils.clamp, ui = Qn.core.context || function () { }, ni = "onpointerenter" in ei ? "pointer" : "mouse", ri = Ri.isTouch = $n.matchMedia && $n.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in $n || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, ai = Ri.eventTypes = ("ontouchstart" in ti ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in ti ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout((function () {
        return ci = 0
      }), 500), Ei(), Zn = 1), Zn
    };
  ki.op = Mi, hi.cache = 0;
  var Ri = function () {
    function t(t) {
      this.init(t)
    }
    return t.prototype.init = function (t) {
      Zn || Di(Qn) || console.warn("Please gsap.registerPlugin(Observer)"), ii || Ei();
      var e = t.tolerance,
        r = t.dragMinimum,
        n = t.type,
        i = t.target,
        s = t.lineHeight,
        o = t.debounce,
        a = t.preventDefault,
        u = t.onStop,
        l = t.onStopDelay,
        c = t.ignore,
        f = t.wheelSpeed,
        h = t.event,
        p = t.onDragStart,
        d = t.onDragEnd,
        g = t.onDrag,
        _ = t.onPress,
        m = t.onRelease,
        v = t.onRight,
        y = t.onLeft,
        x = t.onUp,
        b = t.onDown,
        w = t.onChangeX,
        T = t.onChangeY,
        k = t.onChange,
        M = t.onToggleX,
        O = t.onToggleY,
        S = t.onHover,
        P = t.onHoverEnd,
        A = t.onMove,
        C = t.ignoreCheck,
        E = t.isNormalizer,
        D = t.onGestureStart,
        R = t.onGestureEnd,
        z = t.onWheel,
        F = t.onEnable,
        L = t.onDisable,
        B = t.onClick,
        Y = t.scrollSpeed,
        I = t.capture,
        X = t.allowClicks,
        N = t.lockAxis,
        q = t.onLockAxis;
      this.target = i = Oi(i) || ti, this.vars = t, c && (c = Qn.utils.toArray(c)), e = e || 1e-9, r = r || 0, f = f || 1, Y = Y || 1, n = n || "wheel,touch,pointer", o = !1 !== o, s || (s = parseFloat($n.getComputedStyle(ei).lineHeight) || 22);
      var U, j, W, H, V, G, K, Q = this,
        Z = 0,
        $ = 0,
        J = Si(i, ki),
        tt = Si(i, Mi),
        et = J(),
        rt = tt(),
        nt = ~n.indexOf("touch") && !~n.indexOf("pointer") && "pointerdown" === ai[0],
        it = mi(i),
        st = i.ownerDocument || Jn,
        ot = [0, 0, 0],
        at = [0, 0, 0],
        ut = 0,
        lt = function () {
          return ut = di()
        },
        ct = function (t, e) {
          return (Q.event = t) && c && ~c.indexOf(t.target) || e && nt && "touch" !== t.pointerType || C && C(t, e)
        },
        ft = function () {
          var t = Q.deltaX = Ci(ot),
            r = Q.deltaY = Ci(at),
            n = Math.abs(t) >= e,
            i = Math.abs(r) >= e;
          k && (n || i) && k(Q, t, r, ot, at), n && (v && Q.deltaX > 0 && v(Q), y && Q.deltaX < 0 && y(Q), w && w(Q), M && Q.deltaX < 0 != Z < 0 && M(Q), Z = Q.deltaX, ot[0] = ot[1] = ot[2] = 0), i && (b && Q.deltaY > 0 && b(Q), x && Q.deltaY < 0 && x(Q), T && T(Q), O && Q.deltaY < 0 != $ < 0 && O(Q), $ = Q.deltaY, at[0] = at[1] = at[2] = 0), (H || W) && (A && A(Q), W && (g(Q), W = !1), H = !1), G && !(G = !1) && q && q(Q), V && (z(Q), V = !1), U = 0
        },
        ht = function (t, e, r) {
          ot[r] += t, at[r] += e, Q._vx.update(t), Q._vy.update(e), o ? U || (U = requestAnimationFrame(ft)) : ft()
        },
        pt = function (t, e) {
          N && !K && (Q.axis = K = Math.abs(t) > Math.abs(e) ? "x" : "y", G = !0), "y" !== K && (ot[2] += t, Q._vx.update(t, !0)), "x" !== K && (at[2] += e, Q._vy.update(e, !0)), o ? U || (U = requestAnimationFrame(ft)) : ft()
        },
        dt = function (t) {
          if (!ct(t, 1)) {
            var e = (t = Ai(t, a)).clientX,
              n = t.clientY,
              i = e - Q.x,
              s = n - Q.y,
              o = Q.isDragging;
            Q.x = e, Q.y = n, (o || Math.abs(Q.startX - e) >= r || Math.abs(Q.startY - n) >= r) && (g && (W = !0), o || (Q.isDragging = !0), pt(i, s), o || p && p(Q))
          }
        },
        gt = Q.onPress = function (t) {
          ct(t, 1) || t && t.button || (Q.axis = K = null, j.pause(), Q.isPressed = !0, t = Ai(t), Z = $ = 0, Q.startX = Q.x = t.clientX, Q.startY = Q.y = t.clientY, Q._vx.reset(), Q._vy.reset(), vi(E ? i : st, ai[1], dt, a, !0), Q.deltaX = Q.deltaY = 0, _ && _(Q))
        },
        _t = Q.onRelease = function (t) {
          if (!ct(t, 1)) {
            yi(E ? i : st, ai[1], dt, !0);
            var e = !isNaN(Q.y - Q.startY),
              r = Q.isDragging && (Math.abs(Q.x - Q.startX) > 3 || Math.abs(Q.y - Q.startY) > 3),
              n = Ai(t);
            !r && e && (Q._vx.reset(), Q._vy.reset(), a && X && Qn.delayedCall(.08, (function () {
              if (di() - ut > 300 && !t.defaultPrevented)
                if (t.target.click) t.target.click();
                else if (st.createEvent) {
                  var e = st.createEvent("MouseEvents");
                  e.initMouseEvent("click", !0, !0, $n, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), t.target.dispatchEvent(e)
                }
            }))), Q.isDragging = Q.isGesturing = Q.isPressed = !1, u && !E && j.restart(!0), d && r && d(Q), m && m(Q, r)
          }
        },
        mt = function (t) {
          return t.touches && t.touches.length > 1 && (Q.isGesturing = !0) && D(t, Q.isDragging)
        },
        vt = function () {
          return (Q.isGesturing = !1) || R(Q)
        },
        yt = function (t) {
          if (!ct(t)) {
            var e = J(),
              r = tt();
            ht((e - et) * Y, (r - rt) * Y, 1), et = e, rt = r, u && j.restart(!0)
          }
        },
        xt = function (t) {
          if (!ct(t)) {
            t = Ai(t, a), z && (V = !0);
            var e = (1 === t.deltaMode ? s : 2 === t.deltaMode ? $n.innerHeight : 1) * f;
            ht(t.deltaX * e, t.deltaY * e, 0), u && !E && j.restart(!0)
          }
        },
        bt = function (t) {
          if (!ct(t)) {
            var e = t.clientX,
              r = t.clientY,
              n = e - Q.x,
              i = r - Q.y;
            Q.x = e, Q.y = r, H = !0, (n || i) && pt(n, i)
          }
        },
        wt = function (t) {
          Q.event = t, S(Q)
        },
        Tt = function (t) {
          Q.event = t, P(Q)
        },
        kt = function (t) {
          return ct(t) || Ai(t, a) && B(Q)
        };
      j = Q._dc = Qn.delayedCall(l || .25, (function () {
        Q._vx.reset(), Q._vy.reset(), j.pause(), u && u(Q)
      })).pause(), Q.deltaX = Q.deltaY = 0, Q._vx = Pi(0, 50, !0), Q._vy = Pi(0, 50, !0), Q.scrollX = J, Q.scrollY = tt, Q.isDragging = Q.isGesturing = Q.isPressed = !1, ui(this), Q.enable = function (t) {
        return Q.isEnabled || (vi(it ? st : i, "scroll", wi), n.indexOf("scroll") >= 0 && vi(it ? st : i, "scroll", yt, a, I), n.indexOf("wheel") >= 0 && vi(i, "wheel", xt, a, I), (n.indexOf("touch") >= 0 && ri || n.indexOf("pointer") >= 0) && (vi(i, ai[0], gt, a, I), vi(st, ai[2], _t), vi(st, ai[3], _t), X && vi(i, "click", lt, !1, !0), B && vi(i, "click", kt), D && vi(st, "gesturestart", mt), R && vi(st, "gestureend", vt), S && vi(i, ni + "enter", wt), P && vi(i, ni + "leave", Tt), A && vi(i, ni + "move", bt)), Q.isEnabled = !0, t && t.type && gt(t), F && F(Q)), Q
      }, Q.disable = function () {
        Q.isEnabled && (fi.filter((function (t) {
          return t !== Q && mi(t.target)
        })).length || yi(it ? st : i, "scroll", wi), Q.isPressed && (Q._vx.reset(), Q._vy.reset(), yi(E ? i : st, ai[1], dt, !0)), yi(it ? st : i, "scroll", yt, I), yi(i, "wheel", xt, I), yi(i, ai[0], gt, I), yi(st, ai[2], _t), yi(st, ai[3], _t), yi(i, "click", lt, !0), yi(i, "click", kt), yi(st, "gesturestart", mt), yi(st, "gestureend", vt), yi(i, ni + "enter", wt), yi(i, ni + "leave", Tt), yi(i, ni + "move", bt), Q.isEnabled = Q.isPressed = Q.isDragging = !1, L && L(Q))
      }, Q.kill = Q.revert = function () {
        Q.disable();
        var t = fi.indexOf(Q);
        t >= 0 && fi.splice(t, 1), oi === Q && (oi = 0)
      }, fi.push(Q), E && mi(i) && (oi = Q), Q.enable(h)
    },
      function (t, e, r) {
        e && Kn(t.prototype, e), r && Kn(t, r)
      }(t, [{
        key: "velocityX",
        get: function () {
          return this._vx.getVelocity()
        }
      }, {
        key: "velocityY",
        get: function () {
          return this._vy.getVelocity()
        }
      }]), t
  }();
  Ri.version = "3.11.5", Ri.create = function (t) {
    return new Ri(t)
  }, Ri.register = Di, Ri.getAll = function () {
    return fi.slice()
  }, Ri.getById = function (t) {
    return fi.filter((function (e) {
      return e.vars.id === t
    }))[0]
  }, li() && Qn.registerPlugin(Ri);
  var zi, Fi, Li, Bi, Yi, Ii, Xi, Ni, qi, Ui, ji, Wi, Hi, Vi, Gi, Ki, Qi, Zi, $i, Ji, ts, es, rs, ns, is, ss, os, as, us, ls, cs, fs, hs, ps, ds = 1,
    gs = Date.now,
    _s = gs(),
    ms = 0,
    vs = 0,
    ys = function t() {
      return vs && requestAnimationFrame(t)
    },
    xs = function () {
      return Vi = 1
    },
    bs = function () {
      return Vi = 0
    },
    ws = function (t) {
      return t
    },
    Ts = function (t) {
      return Math.round(1e5 * t) / 1e5 || 0
    },
    ks = function () {
      return typeof window < "u"
    },
    Ms = function () {
      return zi || ks() && (zi = window.gsap) && zi.registerPlugin && zi
    },
    Os = function (t) {
      return !!~Xi.indexOf(t)
    },
    Ss = function (t) {
      return _i(t, "getBoundingClientRect") || (Os(t) ? function () {
        return Io.width = Li.innerWidth, Io.height = Li.innerHeight, Io
      } : function () {
        return Js(t)
      })
    },
    Ps = function (t, e) {
      var r = e.s,
        n = e.d2,
        i = e.d,
        s = e.a;
      return Math.max(0, (r = "scroll" + n) && (s = _i(t, r)) ? s() - Ss(t)()[i] : Os(t) ? (Yi[r] || Ii[r]) - (Li["inner" + n] || Yi["client" + n] || Ii["client" + n]) : t[r] - t["offset" + n])
    },
    As = function (t, e) {
      for (var r = 0; r < $i.length; r += 3)(!e || ~e.indexOf($i[r + 1])) && t($i[r], $i[r + 1], $i[r + 2])
    },
    Cs = function (t) {
      return "string" == typeof t
    },
    Es = function (t) {
      return "function" == typeof t
    },
    Ds = function (t) {
      return "number" == typeof t
    },
    Rs = function (t) {
      return "object" == typeof t
    },
    zs = function (t, e, r) {
      return t && t.progress(e ? 0 : 1) && r && t.pause()
    },
    Fs = function (t, e) {
      if (t.enabled) {
        var r = e(t);
        r && r.totalTime && (t.callbackAnimation = r)
      }
    },
    Ls = Math.abs,
    Bs = "left",
    Ys = "right",
    Is = "bottom",
    Xs = "width",
    Ns = "height",
    qs = "Right",
    Us = "Left",
    js = "Top",
    Ws = "Bottom",
    Hs = "padding",
    Vs = "margin",
    Gs = "Width",
    Ks = "Height",
    Qs = "px",
    Zs = function (t) {
      return Li.getComputedStyle(t)
    },
    $s = function (t, e) {
      for (var r in e) r in t || (t[r] = e[r]);
      return t
    },
    Js = function (t, e) {
      var r = e && "matrix(1, 0, 0, 1, 0, 0)" !== Zs(t)[Gi] && zi.to(t, {
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
        rotation: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        skewX: 0,
        skewY: 0
      }).progress(1),
        n = t.getBoundingClientRect();
      return r && r.progress(0).kill(), n
    },
    to = function (t, e) {
      var r = e.d2;
      return t["offset" + r] || t["client" + r] || 0
    },
    eo = function (t) {
      var e, r = [],
        n = t.labels,
        i = t.duration();
      for (e in n) r.push(n[e] / i);
      return r
    },
    ro = function (t) {
      var e = zi.utils.snap(t),
        r = Array.isArray(t) && t.slice(0).sort((function (t, e) {
          return t - e
        }));
      return r ? function (t, n, i) {
        var s;
        if (void 0 === i && (i = .001), !n) return e(t);
        if (n > 0) {
          for (t -= i, s = 0; s < r.length; s++)
            if (r[s] >= t) return r[s];
          return r[s - 1]
        }
        for (s = r.length, t += i; s--;)
          if (r[s] <= t) return r[s];
        return r[0]
      } : function (r, n, i) {
        void 0 === i && (i = .001);
        var s = e(r);
        return !n || Math.abs(s - r) < i || s - r < 0 == n < 0 ? s : e(n < 0 ? r - t : r + t)
      }
    },
    no = function (t, e, r, n) {
      return r.split(",").forEach((function (r) {
        return t(e, r, n)
      }))
    },
    io = function (t, e, r, n, i) {
      return t.addEventListener(e, r, {
        passive: !n,
        capture: !!i
      })
    },
    so = function (t, e, r, n) {
      return t.removeEventListener(e, r, !!n)
    },
    oo = function (t, e, r) {
      (r = r && r.wheelHandler) && (t(e, "wheel", r), t(e, "touchmove", r))
    },
    ao = {
      startColor: "green",
      endColor: "red",
      indent: 0,
      fontSize: "16px",
      fontWeight: "normal"
    },
    uo = {
      toggleActions: "play",
      anticipatePin: 0
    },
    lo = {
      top: 0,
      left: 0,
      center: .5,
      bottom: 1,
      right: 1
    },
    co = function (t, e) {
      if (Cs(t)) {
        var r = t.indexOf("="),
          n = ~r ? +(t.charAt(r - 1) + 1) * parseFloat(t.substr(r + 1)) : 0;
        ~r && (t.indexOf("%") > r && (n *= e / 100), t = t.substr(0, r - 1)), t = n + (t in lo ? lo[t] * e : ~t.indexOf("%") ? parseFloat(t) * e / 100 : parseFloat(t) || 0)
      }
      return t
    },
    fo = function (t, e, r, n, i, s, o, a) {
      var u = i.startColor,
        l = i.endColor,
        c = i.fontSize,
        f = i.indent,
        h = i.fontWeight,
        p = Bi.createElement("div"),
        d = Os(r) || "fixed" === _i(r, "pinType"),
        g = -1 !== t.indexOf("scroller"),
        _ = d ? Ii : r,
        m = -1 !== t.indexOf("start"),
        v = m ? u : l,
        y = "border-color:" + v + ";font-size:" + c + ";color:" + v + ";font-weight:" + h + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
      return y += "position:" + ((g || a) && d ? "fixed;" : "absolute;"), (g || a || !d) && (y += (n === Mi ? Ys : Is) + ":" + (s + parseFloat(f)) + "px;"), o && (y += "box-sizing:border-box;text-align:left;width:" + o.offsetWidth + "px;"), p._isStart = m, p.setAttribute("class", "gsap-marker-" + t + (e ? " marker-" + e : "")), p.style.cssText = y, p.innerText = e || 0 === e ? t + "-" + e : t, _.children[0] ? _.insertBefore(p, _.children[0]) : _.appendChild(p), p._offset = p["offset" + n.op.d2], ho(p, 0, n, m), p
    },
    ho = function (t, e, r, n) {
      var i = {
        display: "block"
      },
        s = r[n ? "os2" : "p2"],
        o = r[n ? "p2" : "os2"];
      t._isFlipped = n, i[r.a + "Percent"] = n ? -100 : 0, i[r.a] = n ? "1px" : 0, i["border" + s + Gs] = 1, i["border" + o + Gs] = 0, i[r.p] = e + "px", zi.set(t, i)
    },
    po = [],
    go = {},
    _o = function () {
      return gs() - ms > 34 && (cs || (cs = requestAnimationFrame(Do)))
    },
    mo = function () {
      (!rs || !rs.isPressed || rs.startX > Ii.clientWidth) && (hi.cache++, rs ? cs || (cs = requestAnimationFrame(Do)) : Do(), ms || To("scrollStart"), ms = gs())
    },
    vo = function () {
      ss = Li.innerWidth, is = Li.innerHeight
    },
    yo = function () {
      hi.cache++, !Hi && !es && !Bi.fullscreenElement && !Bi.webkitFullscreenElement && (!ns || ss !== Li.innerWidth || Math.abs(Li.innerHeight - is) > .25 * Li.innerHeight) && Ni.restart(!0)
    },
    xo = {},
    bo = [],
    wo = function t() {
      return so(Wo, "scrollEnd", t) || Ao(!0)
    },
    To = function (t) {
      return xo[t] && xo[t].map((function (t) {
        return t()
      })) || bo
    },
    ko = [],
    Mo = function (t) {
      for (var e = 0; e < ko.length; e += 5)(!t || ko[e + 4] && ko[e + 4].query === t) && (ko[e].style.cssText = ko[e + 1], ko[e].getBBox && ko[e].setAttribute("transform", ko[e + 2] || ""), ko[e + 3].uncache = 1)
    },
    Oo = function (t, e) {
      var r;
      for (Ki = 0; Ki < po.length; Ki++)(r = po[Ki]) && (!e || r._ctx === e) && (t ? r.kill(1) : r.revert(!0, !0));
      e && Mo(e), e || To("revert")
    },
    So = function (t, e) {
      hi.cache++, (e || !fs) && hi.forEach((function (t) {
        return Es(t) && t.cacheID++ && (t.rec = 0)
      })), Cs(t) && (Li.history.scrollRestoration = us = t)
    },
    Po = 0,
    Ao = function (t, e) {
      if (!ms || t) {
        fs = Wo.isRefreshing = !0, hi.forEach((function (t) {
          return Es(t) && t.cacheID++ && (t.rec = t())
        }));
        var r = To("refreshInit");
        Ji && Wo.sort(), e || Oo(), hi.forEach((function (t) {
          Es(t) && (t.smooth && (t.target.style.scrollBehavior = "auto"), t(0))
        })), po.slice(0).forEach((function (t) {
          return t.refresh()
        })), po.forEach((function (t, e) {
          if (t._subPinOffset && t.pin) {
            var r = t.vars.horizontal ? "offsetWidth" : "offsetHeight",
              n = t.pin[r];
            t.revert(!0, 1), t.adjustPinSpacing(t.pin[r] - n), t.refresh()
          }
        })), po.forEach((function (t) {
          return "max" === t.vars.end && t.setPositions(t.start, Math.max(t.start + 1, Ps(t.scroller, t._dir)))
        })), r.forEach((function (t) {
          return t && t.render && t.render(-1)
        })), hi.forEach((function (t) {
          Es(t) && (t.smooth && requestAnimationFrame((function () {
            return t.target.style.scrollBehavior = "smooth"
          })), t.rec && t(t.rec))
        })), So(us, 1), Ni.pause(), Po++, fs = 2, Do(2), po.forEach((function (t) {
          return Es(t.vars.onRefresh) && t.vars.onRefresh(t)
        })), fs = Wo.isRefreshing = !1, To("refresh")
      } else io(Wo, "scrollEnd", wo)
    },
    Co = 0,
    Eo = 1,
    Do = function (t) {
      if (!fs || 2 === t) {
        Wo.isUpdating = !0, ps && ps.update(0);
        var e = po.length,
          r = gs(),
          n = r - _s >= 50,
          i = e && po[0].scroll();
        if (Eo = Co > i ? -1 : 1, fs || (Co = i), n && (ms && !Vi && r - ms > 200 && (ms = 0, To("scrollEnd")), ji = _s, _s = r), Eo < 0) {
          for (Ki = e; Ki-- > 0;) po[Ki] && po[Ki].update(0, n);
          Eo = 1
        } else
          for (Ki = 0; Ki < e; Ki++) po[Ki] && po[Ki].update(0, n);
        Wo.isUpdating = !1
      }
      cs = 0
    },
    Ro = [Bs, "top", Is, Ys, Vs + Ws, Vs + qs, Vs + js, Vs + Us, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"],
    zo = Ro.concat([Xs, Ns, "boxSizing", "max" + Gs, "max" + Ks, "position", Vs, Hs, Hs + js, Hs + qs, Hs + Ws, Hs + Us]),
    Fo = function (t, e, r, n) {
      if (!t._gsap.swappedIn) {
        for (var i, s = Ro.length, o = e.style, a = t.style; s--;) o[i = Ro[s]] = r[i];
        o.position = "absolute" === r.position ? "absolute" : "relative", "inline" === r.display && (o.display = "inline-block"), a[Is] = a[Ys] = "auto", o.flexBasis = r.flexBasis || "auto", o.overflow = "visible", o.boxSizing = "border-box", o[Xs] = to(t, ki) + Qs, o[Ns] = to(t, Mi) + Qs, o[Hs] = a[Vs] = a.top = a[Bs] = "0", Bo(n), a[Xs] = a["max" + Gs] = r[Xs], a[Ns] = a["max" + Ks] = r[Ns], a[Hs] = r[Hs], t.parentNode !== e && (t.parentNode.insertBefore(e, t), e.appendChild(t)), t._gsap.swappedIn = !0
      }
    },
    Lo = /([A-Z])/g,
    Bo = function (t) {
      if (t) {
        var e, r, n = t.t.style,
          i = t.length,
          s = 0;
        for ((t.t._gsap || zi.core.getCache(t.t)).uncache = 1; s < i; s += 2) r = t[s + 1], e = t[s], r ? n[e] = r : n[e] && n.removeProperty(e.replace(Lo, "-$1").toLowerCase())
      }
    },
    Yo = function (t) {
      for (var e = zo.length, r = t.style, n = [], i = 0; i < e; i++) n.push(zo[i], r[zo[i]]);
      return n.t = t, n
    },
    Io = {
      left: 0,
      top: 0
    },
    Xo = function (t, e, r, n, i, s, o, a, u, l, c, f, h) {
      Es(t) && (t = t(a)), Cs(t) && "max" === t.substr(0, 3) && (t = f + ("=" === t.charAt(4) ? co("0" + t.substr(3), r) : 0));
      var p, d, g, _ = h ? h.time() : 0;
      if (h && h.seek(0), Ds(t)) h && (t = zi.utils.mapRange(h.scrollTrigger.start, h.scrollTrigger.end, 0, f, t)), o && ho(o, r, n, !0);
      else {
        Es(e) && (e = e(a));
        var m, v, y, x, b = (t || "0").split(" ");
        g = Oi(e) || Ii, (!(m = Js(g) || {}) || !m.left && !m.top) && "none" === Zs(g).display && (x = g.style.display, g.style.display = "block", m = Js(g), x ? g.style.display = x : g.style.removeProperty("display")), v = co(b[0], m[n.d]), y = co(b[1] || "0", r), t = m[n.p] - u[n.p] - l + v + i - y, o && ho(o, y, n, r - y < 20 || o._isStart && y > 20), r -= r - y
      }
      if (s) {
        var w = t + r,
          T = s._isStart;
        p = "scroll" + n.d2, ho(s, w, n, T && w > 20 || !T && (c ? Math.max(Ii[p], Yi[p]) : s.parentNode[p]) <= w + 1), c && (u = Js(o), c && (s.style[n.op.p] = u[n.op.p] - n.op.m - s._offset + Qs))
      }
      return h && g && (p = Js(g), h.seek(f), d = Js(g), h._caScrollDist = p[n.p] - d[n.p], t = t / h._caScrollDist * f), h && h.seek(_), h ? t : Math.round(t)
    },
    No = /(webkit|moz|length|cssText|inset)/i,
    qo = function (t, e, r, n) {
      if (t.parentNode !== e) {
        var i, s, o = t.style;
        if (e === Ii) {
          for (i in t._stOrig = o.cssText, s = Zs(t)) !+i && !No.test(i) && s[i] && "string" == typeof o[i] && "0" !== i && (o[i] = s[i]);
          o.top = r, o.left = n
        } else o.cssText = t._stOrig;
        zi.core.getCache(t).uncache = 1, e.appendChild(t)
      }
    },
    Uo = function (t, e, r) {
      var n = e,
        i = n;
      return function (e) {
        var s = Math.round(t());
        return s !== n && s !== i && Math.abs(s - n) > 3 && Math.abs(s - i) > 3 && (e = s, r && r()), i = n, n = e, e
      }
    },
    jo = function (t, e) {
      var r = Si(t, e),
        n = "_scroll" + e.p2,
        i = function e(i, s, o, a, u) {
          var l = e.tween,
            c = s.onComplete,
            f = {};
          o = o || r();
          var h = Uo(r, o, (function () {
            l.kill(), e.tween = 0
          }));
          return u = a && u || 0, a = a || i - o, l && l.kill(), Math.round(o), s[n] = i, s.modifiers = f, f[n] = function () {
            return h(o + a * l.ratio + u * l.ratio * l.ratio)
          }, s.onUpdate = function () {
            hi.cache++, Do()
          }, s.onComplete = function () {
            e.tween = 0, c && c.call(l)
          }, l = e.tween = zi.to(t, s)
        };
      return t[n] = r, r.wheelHandler = function () {
        return i.tween && i.tween.kill() && (i.tween = 0)
      }, io(t, "wheel", r.wheelHandler), Wo.isTouch && io(t, "touchmove", r.wheelHandler), i
    },
    Wo = function () {
      function t(e, r) {
        Fi || t.register(zi) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(e, r)
      }
      return t.prototype.init = function (e, r) {
        if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), vs) {
          var n, i, s, o, a, u, l, c, f, h, p, d, g, _, m, v, y, x, b, w, T, k, M, O, S, P, A, C, E, D, R, z, F, L, B, Y, I, X, N, q = e = $s(Cs(e) || Ds(e) || e.nodeType ? {
            trigger: e
          } : e, uo),
            U = q.onUpdate,
            j = q.toggleClass,
            W = q.id,
            H = q.onToggle,
            V = q.onRefresh,
            G = q.scrub,
            K = q.trigger,
            Q = q.pin,
            Z = q.pinSpacing,
            $ = q.invalidateOnRefresh,
            J = q.anticipatePin,
            tt = q.onScrubComplete,
            et = q.onSnapComplete,
            rt = q.once,
            nt = q.snap,
            it = q.pinReparent,
            st = q.pinSpacer,
            ot = q.containerAnimation,
            at = q.fastScrollEnd,
            ut = q.preventOverlaps,
            lt = e.horizontal || e.containerAnimation && !1 !== e.horizontal ? ki : Mi,
            ct = !G && 0 !== G,
            ft = Oi(e.scroller || Li),
            ht = zi.core.getCache(ft),
            pt = Os(ft),
            dt = "fixed" === ("pinType" in e ? e.pinType : _i(ft, "pinType") || pt && "fixed"),
            gt = [e.onEnter, e.onLeave, e.onEnterBack, e.onLeaveBack],
            _t = ct && e.toggleActions.split(" "),
            mt = "markers" in e ? e.markers : uo.markers,
            vt = pt ? 0 : parseFloat(Zs(ft)["border" + lt.p2 + Gs]) || 0,
            yt = this,
            xt = e.onRefreshInit && function () {
              return e.onRefreshInit(yt)
            },
            bt = function (t, e, r) {
              var n = r.d,
                i = r.d2,
                s = r.a;
              return (s = _i(t, "getBoundingClientRect")) ? function () {
                return s()[n]
              } : function () {
                return (e ? Li["inner" + i] : t["client" + i]) || 0
              }
            }(ft, pt, lt),
            wt = function (t, e) {
              return !e || ~pi.indexOf(t) ? Ss(t) : function () {
                return Io
              }
            }(ft, pt),
            Tt = 0,
            kt = 0,
            Mt = Si(ft, lt);
          if (as(yt), yt._dir = lt, J *= 45, yt.scroller = ft, yt.scroll = ot ? ot.time.bind(ot) : Mt, o = Mt(), yt.vars = e, r = r || e.animation, "refreshPriority" in e && (Ji = 1, -9999 === e.refreshPriority && (ps = yt)), ht.tweenScroll = ht.tweenScroll || {
            top: jo(ft, Mi),
            left: jo(ft, ki)
          }, yt.tweenTo = n = ht.tweenScroll[lt.p], yt.scrubDuration = function (t) {
            (z = Ds(t) && t) ? R ? R.duration(t) : R = zi.to(r, {
              ease: "expo",
              totalProgress: "+=0.001",
              duration: z,
              paused: !0,
              onComplete: function () {
                return tt && tt(yt)
              }
            }) : (R && R.progress(1).kill(), R = 0)
          }, r && (r.vars.lazy = !1, r._initted || !1 !== r.vars.immediateRender && !1 !== e.immediateRender && r.duration() && r.render(0, !0, !0), yt.animation = r.pause(), r.scrollTrigger = yt, yt.scrubDuration(G), R && R.resetTo && R.resetTo("totalProgress", 0), E = 0, W || (W = r.vars.id)), po.push(yt), nt && ((!Rs(nt) || nt.push) && (nt = {
            snapTo: nt
          }), "scrollBehavior" in Ii.style && zi.set(pt ? [Ii, Yi] : ft, {
            scrollBehavior: "auto"
          }), hi.forEach((function (t) {
            return Es(t) && t.target === (pt ? Bi.scrollingElement || Yi : ft) && (t.smooth = !1)
          })), s = Es(nt.snapTo) ? nt.snapTo : "labels" === nt.snapTo ? function (t) {
            return function (e) {
              return zi.utils.snap(eo(t), e)
            }
          }(r) : "labelsDirectional" === nt.snapTo ? function (t) {
            return function (e, r) {
              return ro(eo(t))(e, r.direction)
            }
          }(r) : !1 !== nt.directional ? function (t, e) {
            return ro(nt.snapTo)(t, gs() - kt < 500 ? 0 : e.direction)
          } : zi.utils.snap(nt.snapTo), F = nt.duration || {
            min: .1,
            max: 2
          }, F = Rs(F) ? Ui(F.min, F.max) : Ui(F, F), L = zi.delayedCall(nt.delay || z / 2 || .1, (function () {
            var t = Mt(),
              e = gs() - kt < 500,
              i = n.tween;
            if (!(e || Math.abs(yt.getVelocity()) < 10) || i || Vi || Tt === t) yt.isActive && Tt !== t && L.restart(!0);
            else {
              var o = (t - u) / g,
                a = r && !ct ? r.totalProgress() : o,
                c = e ? 0 : (a - D) / (gs() - ji) * 1e3 || 0,
                f = zi.utils.clamp(-o, 1 - o, Ls(c / 2) * c / .185),
                h = o + (!1 === nt.inertia ? 0 : f),
                p = Ui(0, 1, s(h, yt)),
                d = Math.round(u + p * g),
                _ = nt,
                m = _.onStart,
                v = _.onInterrupt,
                y = _.onComplete;
              if (t <= l && t >= u && d !== t) {
                if (i && !i._initted && i.data <= Ls(d - t)) return;
                !1 === nt.inertia && (f = p - o), n(d, {
                  duration: F(Ls(.185 * Math.max(Ls(h - a), Ls(p - a)) / c / .05 || 0)),
                  ease: nt.ease || "power3",
                  data: Ls(d - t),
                  onInterrupt: function () {
                    return L.restart(!0) && v && v(yt)
                  },
                  onComplete: function () {
                    yt.update(), Tt = Mt(), E = D = r && !ct ? r.totalProgress() : yt.progress, et && et(yt), y && y(yt)
                  }
                }, t, f * g, d - t - f * g), m && m(yt, n.tween)
              }
            }
          })).pause()), W && (go[W] = yt), (N = (K = yt.trigger = Oi(K || Q)) && K._gsap && K._gsap.stRevert) && (N = N(yt)), Q = !0 === Q ? K : Oi(Q), Cs(j) && (j = {
            targets: K,
            className: j
          }), Q && (!1 === Z || Z === Vs || (Z = !(!Z && Q.parentNode && Q.parentNode.style && "flex" === Zs(Q.parentNode).display) && Hs), yt.pin = Q, (i = zi.core.getCache(Q)).spacer ? _ = i.pinState : (st && ((st = Oi(st)) && !st.nodeType && (st = st.current || st.nativeElement), i.spacerIsNative = !!st, st && (i.spacerState = Yo(st))), i.spacer = y = st || Bi.createElement("div"), y.classList.add("pin-spacer"), W && y.classList.add("pin-spacer-" + W), i.pinState = _ = Yo(Q)), !1 !== e.force3D && zi.set(Q, {
            force3D: !0
          }), yt.spacer = y = i.spacer, C = Zs(Q), M = C[Z + lt.os2], b = zi.getProperty(Q), w = zi.quickSetter(Q, lt.a, Qs), Fo(Q, y, C), v = Yo(Q)), mt) {
            d = Rs(mt) ? $s(mt, ao) : ao, h = fo("scroller-start", W, ft, lt, d, 0), p = fo("scroller-end", W, ft, lt, d, 0, h), x = h["offset" + lt.op.d2];
            var Ot = Oi(_i(ft, "content") || ft);
            c = this.markerStart = fo("start", W, Ot, lt, d, x, 0, ot), f = this.markerEnd = fo("end", W, Ot, lt, d, x, 0, ot), ot && (X = zi.quickSetter([c, f], lt.a, Qs)), !dt && (!pi.length || !0 !== _i(ft, "fixedMarkers")) && (function (t) {
              var e = Zs(t).position;
              t.style.position = "absolute" === e || "fixed" === e ? e : "relative"
            }(pt ? Ii : ft), zi.set([h, p], {
              force3D: !0
            }), S = zi.quickSetter(h, lt.a, Qs), A = zi.quickSetter(p, lt.a, Qs))
          }
          if (ot) {
            var St = ot.vars.onUpdate,
              Pt = ot.vars.onUpdateParams;
            ot.eventCallback("onUpdate", (function () {
              yt.update(0, 0, 1), St && St.apply(ot, Pt || [])
            }))
          }
          yt.previous = function () {
            return po[po.indexOf(yt) - 1]
          }, yt.next = function () {
            return po[po.indexOf(yt) + 1]
          }, yt.revert = function (t, e) {
            if (!e) return yt.kill(!0);
            var n = !1 !== t || !yt.enabled,
              i = Hi;
            n !== yt.isReverted && (n && (Y = Math.max(Mt(), yt.scroll.rec || 0), B = yt.progress, I = r && r.progress()), c && [c, f, h, p].forEach((function (t) {
              return t.style.display = n ? "none" : "block"
            })), n && (Hi = yt, yt.update(n)), Q && (!it || !yt.isActive) && (n ? function (t, e, r) {
              Bo(r);
              var n = t._gsap;
              if (n.spacerIsNative) Bo(n.spacerState);
              else if (t._gsap.swappedIn) {
                var i = e.parentNode;
                i && (i.insertBefore(t, e), i.removeChild(e))
              }
              t._gsap.swappedIn = !1
            }(Q, y, _) : Fo(Q, y, Zs(Q), O)), n || yt.update(n), Hi = i, yt.isReverted = n)
          }, yt.refresh = function (i, s) {
            if (!Hi && yt.enabled || s) {
              if (Q && i && ms) return void io(t, "scrollEnd", wo);
              !fs && xt && xt(yt), Hi = yt, kt = gs(), n.tween && (n.tween.kill(), n.tween = 0), R && R.pause(), $ && r && r.revert({
                kill: !1
              }).invalidate(), yt.isReverted || yt.revert(!0, !0), yt._subPinOffset = !1;
              for (var d, x, w, M, S, A, C, E, D, z, F, X = bt(), N = wt(), q = ot ? ot.duration() : Ps(ft, lt), U = g <= .01, j = 0, W = 0, H = e.end, G = e.endTrigger || K, J = e.start || (0 !== e.start && K ? Q ? "0 0" : "0 100%" : 0), tt = yt.pinnedContainer = e.pinnedContainer && Oi(e.pinnedContainer), et = K && Math.max(0, po.indexOf(yt)) || 0, rt = et; rt--;)(A = po[rt]).end || A.refresh(0, 1) || (Hi = yt), (C = A.pin) && (C === K || C === Q || C === tt) && !A.isReverted && (z || (z = []), z.unshift(A), A.revert(!0, !0)), A !== po[rt] && (et--, rt--);
              for (Es(J) && (J = J(yt)), u = Xo(J, K, X, lt, Mt(), c, h, yt, N, vt, dt, q, ot) || (Q ? -.001 : 0), Es(H) && (H = H(yt)), Cs(H) && !H.indexOf("+=") && (~H.indexOf(" ") ? H = (Cs(J) ? J.split(" ")[0] : "") + H : (j = co(H.substr(2), X), H = Cs(J) ? J : (ot ? zi.utils.mapRange(0, ot.duration(), ot.scrollTrigger.start, ot.scrollTrigger.end, u) : u) + j, G = K)), l = Math.max(u, Xo(H || (G ? "100% 0" : q), G, X, lt, Mt() + j, f, p, yt, N, vt, dt, q, ot)) || -.001, g = l - u || (u -= .01) && .001, j = 0, rt = et; rt--;)(C = (A = po[rt]).pin) && A.start - A._pinPush <= u && !ot && A.end > 0 && (d = A.end - A.start, (C === K && A.start - A._pinPush < u || C === tt) && !Ds(J) && (j += d * (1 - A.progress)), C === Q && (W += d));
              if (u += j, l += j, U && (B = zi.utils.clamp(0, 1, zi.utils.normalize(u, l, Y))), yt._pinPush = W, c && j && ((d = {})[lt.a] = "+=" + j, tt && (d[lt.p] = "-=" + Mt()), zi.set([c, f], d)), Q) d = Zs(Q), M = lt === Mi, w = Mt(), T = parseFloat(b(lt.a)) + W, !q && l > 1 && ((F = {
                style: F = (pt ? Bi.scrollingElement || Yi : ft).style,
                value: F["overflow" + lt.a.toUpperCase()]
              }).style["overflow" + lt.a.toUpperCase()] = "scroll"), Fo(Q, y, d), v = Yo(Q), x = Js(Q, !0), E = dt && Si(ft, M ? ki : Mi)(), Z && ((O = [Z + lt.os2, g + W + Qs]).t = y, (rt = Z === Hs ? to(Q, lt) + g + W : 0) && O.push(lt.d, rt + Qs), Bo(O), tt && po.forEach((function (t) {
                t.pin === tt && !1 !== t.vars.pinSpacing && (t._subPinOffset = !0)
              })), dt && Mt(Y)), dt && ((S = {
                top: x.top + (M ? w - u : E) + Qs,
                left: x.left + (M ? E : w - u) + Qs,
                boxSizing: "border-box",
                position: "fixed"
              })[Xs] = S["max" + Gs] = Math.ceil(x.width) + Qs, S[Ns] = S["max" + Ks] = Math.ceil(x.height) + Qs, S[Vs] = S[Vs + js] = S[Vs + qs] = S[Vs + Ws] = S[Vs + Us] = "0", S[Hs] = d[Hs], S[Hs + js] = d[Hs + js], S[Hs + qs] = d[Hs + qs], S[Hs + Ws] = d[Hs + Ws], S[Hs + Us] = d[Hs + Us], m = function (t, e, r) {
                for (var n, i = [], s = t.length, o = r ? 8 : 0; o < s; o += 2) n = t[o], i.push(n, n in e ? e[n] : t[o + 1]);
                return i.t = t.t, i
              }(_, S, it), fs && Mt(0)), r ? (D = r._initted, ts(1), r.render(r.duration(), !0, !0), k = b(lt.a) - T + g + W, P = Math.abs(g - k) > 1, dt && P && m.splice(m.length - 2, 2), r.render(0, !0, !0), D || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), ts(0)) : k = g, F && (F.value ? F.style["overflow" + lt.a.toUpperCase()] = F.value : F.style.removeProperty("overflow-" + lt.a));
              else if (K && Mt() && !ot)
                for (x = K.parentNode; x && x !== Ii;) x._pinOffset && (u -= x._pinOffset, l -= x._pinOffset), x = x.parentNode;
              z && z.forEach((function (t) {
                return t.revert(!1, !0)
              })), yt.start = u, yt.end = l, o = a = fs ? Y : Mt(), !ot && !fs && (o < Y && Mt(Y), yt.scroll.rec = 0), yt.revert(!1, !0), L && (Tt = -1, yt.isActive && Mt(u + g * B), L.restart(!0)), Hi = 0, r && ct && (r._initted || I) && r.progress() !== I && r.progress(I, !0).render(r.time(), !0, !0), (U || B !== yt.progress || ot) && (r && !ct && r.totalProgress(ot && u < -.001 && !B ? zi.utils.normalize(u, l, 0) : B, !0), yt.progress = (o - u) / g === B ? 0 : B), Q && Z && (y._pinOffset = Math.round(yt.progress * k)), R && R.invalidate(), V && !fs && V(yt)
            }
          }, yt.getVelocity = function () {
            return (Mt() - a) / (gs() - ji) * 1e3 || 0
          }, yt.endAnimation = function () {
            zs(yt.callbackAnimation), r && (R ? R.progress(1) : r.paused() ? ct || zs(r, yt.direction < 0, 1) : zs(r, r.reversed()))
          }, yt.labelToScroll = function (t) {
            return r && r.labels && (u || yt.refresh() || u) + r.labels[t] / r.duration() * g || 0
          }, yt.getTrailing = function (t) {
            var e = po.indexOf(yt),
              r = yt.direction > 0 ? po.slice(0, e).reverse() : po.slice(e + 1);
            return (Cs(t) ? r.filter((function (e) {
              return e.vars.preventOverlaps === t
            })) : r).filter((function (t) {
              return yt.direction > 0 ? t.end <= u : t.start >= l
            }))
          }, yt.update = function (t, e, i) {
            if (!ot || i || t) {
              var s, c, f, p, d, _, x, b = !0 === fs ? Y : yt.scroll(),
                O = t ? 0 : (b - u) / g,
                C = O < 0 ? 0 : O > 1 ? 1 : O || 0,
                z = yt.progress;
              if (e && (a = o, o = ot ? Mt() : b, nt && (D = E, E = r && !ct ? r.totalProgress() : C)), J && !C && Q && !Hi && !ds && ms && u < b + (b - a) / (gs() - ji) * J && (C = 1e-4), C !== z && yt.enabled) {
                if (p = (d = (s = yt.isActive = !!C && C < 1) !== (!!z && z < 1)) || !!C != !!z, yt.direction = C > z ? 1 : -1, yt.progress = C, p && !Hi && (c = C && !z ? 0 : 1 === C ? 1 : 1 === z ? 2 : 3, ct && (f = !d && "none" !== _t[c + 1] && _t[c + 1] || _t[c], x = r && ("complete" === f || "reset" === f || f in r))), ut && (d || x) && (x || G || !r) && (Es(ut) ? ut(yt) : yt.getTrailing(ut).forEach((function (t) {
                  return t.endAnimation()
                }))), ct || (!R || Hi || ds ? r && r.totalProgress(C, !!Hi) : (R._dp._time - R._start !== R._time && R.render(R._dp._time - R._start), R.resetTo ? R.resetTo("totalProgress", C, r._tTime / r._tDur) : (R.vars.totalProgress = C, R.invalidate().restart()))), Q)
                  if (t && Z && (y.style[Z + lt.os2] = M), dt) {
                    if (p) {
                      if (_ = !t && C > z && l + 1 > b && b + 1 >= Ps(ft, lt), it)
                        if (t || !s && !_) qo(Q, y);
                        else {
                          var F = Js(Q, !0),
                            B = b - u;
                          qo(Q, Ii, F.top + (lt === Mi ? B : 0) + Qs, F.left + (lt === Mi ? 0 : B) + Qs)
                        } Bo(s || _ ? m : v), P && C < 1 && s || w(T + (1 !== C || _ ? 0 : k))
                    }
                  } else w(Ts(T + k * C));
                nt && !n.tween && !Hi && !ds && L.restart(!0), j && (d || rt && C && (C < 1 || !ls)) && qi(j.targets).forEach((function (t) {
                  return t.classList[s || rt ? "add" : "remove"](j.className)
                })), U && !ct && !t && U(yt), p && !Hi ? (ct && (x && ("complete" === f ? r.pause().totalProgress(1) : "reset" === f ? r.restart(!0).pause() : "restart" === f ? r.restart(!0) : r[f]()), U && U(yt)), (d || !ls) && (H && d && Fs(yt, H), gt[c] && Fs(yt, gt[c]), rt && (1 === C ? yt.kill(!1, 1) : gt[c] = 0), d || gt[c = 1 === C ? 1 : 3] && Fs(yt, gt[c])), at && !s && Math.abs(yt.getVelocity()) > (Ds(at) ? at : 2500) && (zs(yt.callbackAnimation), R ? R.progress(1) : zs(r, "reverse" === f ? 1 : !C, 1))) : ct && U && !Hi && U(yt)
              }
              if (A) {
                var I = ot ? b / ot.duration() * (ot._caScrollDist || 0) : b;
                S(I + (h._isFlipped ? 1 : 0)), A(I)
              }
              X && X(-b / ot.duration() * (ot._caScrollDist || 0))
            }
          }, yt.enable = function (e, r) {
            yt.enabled || (yt.enabled = !0, io(ft, "resize", yo), io(pt ? Bi : ft, "scroll", mo), xt && io(t, "refreshInit", xt), !1 !== e && (yt.progress = B = 0, o = a = Tt = Mt()), !1 !== r && yt.refresh())
          }, yt.getTween = function (t) {
            return t && n ? n.tween : R
          }, yt.setPositions = function (t, e) {
            Q && (T += t - u, k += e - t - g, Z === Hs && yt.adjustPinSpacing(e - t - g)), yt.start = u = t, yt.end = l = e, g = e - t, yt.update()
          }, yt.adjustPinSpacing = function (t) {
            if (O && t) {
              var e = O.indexOf(lt.d) + 1;
              O[e] = parseFloat(O[e]) + t + Qs, O[1] = parseFloat(O[1]) + t + Qs, Bo(O)
            }
          }, yt.disable = function (e, r) {
            if (yt.enabled && (!1 !== e && yt.revert(!0, !0), yt.enabled = yt.isActive = !1, r || R && R.pause(), Y = 0, i && (i.uncache = 1), xt && so(t, "refreshInit", xt), L && (L.pause(), n.tween && n.tween.kill() && (n.tween = 0)), !pt)) {
              for (var s = po.length; s--;)
                if (po[s].scroller === ft && po[s] !== yt) return;
              so(ft, "resize", yo), so(ft, "scroll", mo)
            }
          }, yt.kill = function (t, n) {
            yt.disable(t, n), R && !n && R.kill(), W && delete go[W];
            var s = po.indexOf(yt);
            s >= 0 && po.splice(s, 1), s === Ki && Eo > 0 && Ki--, s = 0, po.forEach((function (t) {
              return t.scroller === yt.scroller && (s = 1)
            })), s || fs || (yt.scroll.rec = 0), r && (r.scrollTrigger = null, t && r.revert({
              kill: !1
            }), n || r.kill()), c && [c, f, h, p].forEach((function (t) {
              return t.parentNode && t.parentNode.removeChild(t)
            })), ps === yt && (ps = 0), Q && (i && (i.uncache = 1), s = 0, po.forEach((function (t) {
              return t.pin === Q && s++
            })), s || (i.spacer = 0)), e.onKill && e.onKill(yt)
          }, yt.enable(!1, !1), N && N(yt), r && r.add && !g ? zi.delayedCall(.01, (function () {
            return u || l || yt.refresh()
          })) && (g = .01) && (u = l = 0) : yt.refresh(), Q && function () {
            if (hs !== Po) {
              var t = hs = Po;
              requestAnimationFrame((function () {
                return t === Po && Ao(!0)
              }))
            }
          }()
        } else this.update = this.refresh = this.kill = ws
      }, t.register = function (e) {
        return Fi || (zi = e || Ms(), ks() && window.document && t.enable(), Fi = vs), Fi
      }, t.defaults = function (t) {
        if (t)
          for (var e in t) uo[e] = t[e];
        return uo
      }, t.disable = function (t, e) {
        vs = 0, po.forEach((function (r) {
          return r[e ? "kill" : "disable"](t)
        })), so(Li, "wheel", mo), so(Bi, "scroll", mo), clearInterval(Wi), so(Bi, "touchcancel", ws), so(Ii, "touchstart", ws), no(so, Bi, "pointerdown,touchstart,mousedown", xs), no(so, Bi, "pointerup,touchend,mouseup", bs), Ni.kill(), As(so);
        for (var r = 0; r < hi.length; r += 3) oo(so, hi[r], hi[r + 1]), oo(so, hi[r], hi[r + 2])
      }, t.enable = function () {
        if (Li = window, Bi = document, Yi = Bi.documentElement, Ii = Bi.body, zi && (qi = zi.utils.toArray, Ui = zi.utils.clamp, as = zi.core.context || ws, ts = zi.core.suppressOverwrites || ws, us = Li.history.scrollRestoration || "auto", Co = Li.pageYOffset, zi.core.globals("ScrollTrigger", t), Ii)) {
          vs = 1, ys(), Ri.register(zi), t.isTouch = Ri.isTouch, os = Ri.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), io(Li, "wheel", mo), Xi = [Li, Bi, Yi, Ii], zi.matchMedia ? (t.matchMedia = function (t) {
            var e, r = zi.matchMedia();
            for (e in t) r.add(e, t[e]);
            return r
          }, zi.addEventListener("matchMediaInit", (function () {
            return Oo()
          })), zi.addEventListener("matchMediaRevert", (function () {
            return Mo()
          })), zi.addEventListener("matchMedia", (function () {
            Ao(0, 1), To("matchMedia")
          })), zi.matchMedia("(orientation: portrait)", (function () {
            return vo(), vo
          }))) : console.warn("Requires GSAP 3.11.0 or later"), vo(), io(Bi, "scroll", mo);
          var e, r, n = Ii.style,
            i = n.borderTopStyle,
            s = zi.core.Animation.prototype;
          for (s.revert || Object.defineProperty(s, "revert", {
            value: function () {
              return this.time(-.01, !0)
            }
          }), n.borderTopStyle = "solid", e = Js(Ii), Mi.m = Math.round(e.top + Mi.sc()) || 0, ki.m = Math.round(e.left + ki.sc()) || 0, i ? n.borderTopStyle = i : n.removeProperty("border-top-style"), Wi = setInterval(_o, 250), zi.delayedCall(.5, (function () {
            return ds = 0
          })), io(Bi, "touchcancel", ws), io(Ii, "touchstart", ws), no(io, Bi, "pointerdown,touchstart,mousedown", xs), no(io, Bi, "pointerup,touchend,mouseup", bs), Gi = zi.utils.checkPrefix("transform"), zo.push(Gi), Fi = gs(), Ni = zi.delayedCall(.2, Ao).pause(), $i = [Bi, "visibilitychange", function () {
            var t = Li.innerWidth,
              e = Li.innerHeight;
            Bi.hidden ? (Qi = t, Zi = e) : (Qi !== t || Zi !== e) && yo()
          }, Bi, "DOMContentLoaded", Ao, Li, "load", Ao, Li, "resize", yo], As(io), po.forEach((function (t) {
            return t.enable(0, 1)
          })), r = 0; r < hi.length; r += 3) oo(so, hi[r], hi[r + 1]), oo(so, hi[r], hi[r + 2])
        }
      }, t.config = function (e) {
        "limitCallbacks" in e && (ls = !!e.limitCallbacks);
        var r = e.syncInterval;
        r && clearInterval(Wi) || (Wi = r) && setInterval(_o, r), "ignoreMobileResize" in e && (ns = 1 === t.isTouch && e.ignoreMobileResize), "autoRefreshEvents" in e && (As(so) || As(io, e.autoRefreshEvents || "none"), es = -1 === (e.autoRefreshEvents + "").indexOf("resize"))
      }, t.scrollerProxy = function (t, e) {
        var r = Oi(t),
          n = hi.indexOf(r),
          i = Os(r);
        ~n && hi.splice(n, i ? 6 : 2), e && (i ? pi.unshift(Li, e, Ii, e, Yi, e) : pi.unshift(r, e))
      }, t.clearMatchMedia = function (t) {
        po.forEach((function (e) {
          return e._ctx && e._ctx.query === t && e._ctx.kill(!0, !0)
        }))
      }, t.isInViewport = function (t, e, r) {
        var n = (Cs(t) ? Oi(t) : t).getBoundingClientRect(),
          i = n[r ? Xs : Ns] * e || 0;
        return r ? n.right - i > 0 && n.left + i < Li.innerWidth : n.bottom - i > 0 && n.top + i < Li.innerHeight
      }, t.positionInViewport = function (t, e, r) {
        Cs(t) && (t = Oi(t));
        var n = t.getBoundingClientRect(),
          i = n[r ? Xs : Ns],
          s = null == e ? i / 2 : e in lo ? lo[e] * i : ~e.indexOf("%") ? parseFloat(e) * i / 100 : parseFloat(e) || 0;
        return r ? (n.left + s) / Li.innerWidth : (n.top + s) / Li.innerHeight
      }, t.killAll = function (t) {
        if (po.slice(0).forEach((function (t) {
          return "ScrollSmoother" !== t.vars.id && t.kill()
        })), !0 !== t) {
          var e = xo.killAll || [];
          xo = {}, e.forEach((function (t) {
            return t()
          }))
        }
      }, t
    }();
  Wo.version = "3.11.5", Wo.saveStyles = function (t) {
    return t ? qi(t).forEach((function (t) {
      if (t && t.style) {
        var e = ko.indexOf(t);
        e >= 0 && ko.splice(e, 5), ko.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), zi.core.getCache(t), as())
      }
    })) : ko
  }, Wo.revert = function (t, e) {
    return Oo(!t, e)
  }, Wo.create = function (t, e) {
    return new Wo(t, e)
  }, Wo.refresh = function (t) {
    return t ? yo() : (Fi || Wo.register()) && Ao(!0)
  }, Wo.update = function (t) {
    return ++hi.cache && Do(!0 === t ? 2 : 0)
  }, Wo.clearScrollMemory = So, Wo.maxScroll = function (t, e) {
    return Ps(t, e ? ki : Mi)
  }, Wo.getScrollFunc = function (t, e) {
    return Si(Oi(t), e ? ki : Mi)
  }, Wo.getById = function (t) {
    return go[t]
  }, Wo.getAll = function () {
    return po.filter((function (t) {
      return "ScrollSmoother" !== t.vars.id
    }))
  }, Wo.isScrolling = function () {
    return !!ms
  }, Wo.snapDirectional = ro, Wo.addEventListener = function (t, e) {
    var r = xo[t] || (xo[t] = []);
    ~r.indexOf(e) || r.push(e)
  }, Wo.removeEventListener = function (t, e) {
    var r = xo[t],
      n = r && r.indexOf(e);
    n >= 0 && r.splice(n, 1)
  }, Wo.batch = function (t, e) {
    var r, n = [],
      i = {},
      s = e.interval || .016,
      o = e.batchMax || 1e9,
      a = function (t, e) {
        var r = [],
          n = [],
          i = zi.delayedCall(s, (function () {
            e(r, n), r = [], n = []
          })).pause();
        return function (t) {
          r.length || i.restart(!0), r.push(t.trigger), n.push(t), o <= r.length && i.progress(1)
        }
      };
    for (r in e) i[r] = "on" === r.substr(0, 2) && Es(e[r]) && "onRefreshInit" !== r ? a(0, e[r]) : e[r];
    return Es(o) && (o = o(), io(Wo, "refresh", (function () {
      return o = e.batchMax()
    }))), qi(t).forEach((function (t) {
      var e = {};
      for (r in i) e[r] = i[r];
      e.trigger = t, n.push(Wo.create(e))
    })), n
  };
  var Ho, Vo = function (t, e, r, n) {
    return e > n ? t(n) : e < 0 && t(0), r > n ? (n - e) / (r - e) : r < 0 ? e / (e - r) : 1
  },
    Go = function t(e, r) {
      !0 === r ? e.style.removeProperty("touch-action") : e.style.touchAction = !0 === r ? "auto" : r ? "pan-" + r + (Ri.isTouch ? " pinch-zoom" : "") : "none", e === Yi && t(Ii, r)
    },
    Ko = {
      auto: 1,
      scroll: 1
    },
    Qo = function (t) {
      var e, r = t.event,
        n = t.target,
        i = t.axis,
        s = (r.changedTouches ? r.changedTouches[0] : r).target,
        o = s._gsap || zi.core.getCache(s),
        a = gs();
      if (!o._isScrollT || a - o._isScrollT > 2e3) {
        for (; s && s !== Ii && (s.scrollHeight <= s.clientHeight && s.scrollWidth <= s.clientWidth || !Ko[(e = Zs(s)).overflowY] && !Ko[e.overflowX]);) s = s.parentNode;
        o._isScroll = s && s !== n && !Os(s) && (Ko[(e = Zs(s)).overflowY] || Ko[e.overflowX]), o._isScrollT = a
      } (o._isScroll || "x" === i) && (r.stopPropagation(), r._gsapAllow = !0)
    },
    Zo = function (t, e, r, n) {
      return Ri.create({
        target: t,
        capture: !0,
        debounce: !1,
        lockAxis: !0,
        type: e,
        onWheel: n = n && Qo,
        onPress: n,
        onDrag: n,
        onScroll: n,
        onEnable: function () {
          return r && io(Bi, Ri.eventTypes[0], Jo, !1, !0)
        },
        onDisable: function () {
          return so(Bi, Ri.eventTypes[0], Jo, !0)
        }
      })
    },
    $o = /(input|label|select|textarea)/i,
    Jo = function (t) {
      var e = $o.test(t.target.tagName);
      (e || Ho) && (t._gsapAllow = !0, Ho = e)
    },
    ta = function (t) {
      Rs(t) || (t = {}), t.preventDefault = t.isNormalizer = t.allowClicks = !0, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
      var e, r, n, i, s, o, a, u, l = t,
        c = l.normalizeScrollX,
        f = l.momentum,
        h = l.allowNestedScroll,
        p = l.onRelease,
        d = Oi(t.target) || Yi,
        g = zi.core.globals().ScrollSmoother,
        _ = g && g.get(),
        m = os && (t.content && Oi(t.content) || _ && !1 !== t.content && !_.smooth() && _.content()),
        v = Si(d, Mi),
        y = Si(d, ki),
        x = 1,
        b = (Ri.isTouch && Li.visualViewport ? Li.visualViewport.scale * Li.visualViewport.width : Li.outerWidth) / Li.innerWidth,
        w = 0,
        T = Es(f) ? function () {
          return f(e)
        } : function () {
          return f || 2.8
        },
        k = Zo(d, t.type, !0, h),
        M = function () {
          return i = !1
        },
        O = ws,
        S = ws,
        P = function () {
          r = Ps(d, Mi), S = Ui(os ? 1 : 0, r), c && (O = Ui(0, Ps(d, ki))), n = Po
        },
        A = function () {
          m._gsap.y = Ts(parseFloat(m._gsap.y) + v.offset) + "px", m.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(m._gsap.y) + ", 0, 1)", v.offset = v.cacheID = 0
        },
        C = function () {
          P(), s.isActive() && s.vars.scrollY > r && (v() > r ? s.progress(1) && v(r) : s.resetTo("scrollY", r))
        };
      return m && zi.set(m, {
        y: "+=0"
      }), t.ignoreCheck = function (t) {
        return os && "touchmove" === t.type && function () {
          if (i) {
            requestAnimationFrame(M);
            var t = Ts(e.deltaY / 2),
              r = S(v.v - t);
            if (m && r !== v.v + v.offset) {
              v.offset = r - v.v;
              var n = Ts((parseFloat(m && m._gsap.y) || 0) - v.offset);
              m.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + n + ", 0, 1)", m._gsap.y = n + "px", v.cacheID = hi.cache, Do()
            }
            return !0
          }
          v.offset && A(), i = !0
        }() || x > 1.05 && "touchstart" !== t.type || e.isGesturing || t.touches && t.touches.length > 1
      }, t.onPress = function () {
        i = !1;
        var t = x;
        x = Ts((Li.visualViewport && Li.visualViewport.scale || 1) / b), s.pause(), t !== x && Go(d, x > 1.01 || !c && "x"), o = y(), a = v(), P(), n = Po
      }, t.onRelease = t.onGestureStart = function (t, e) {
        if (v.offset && A(), e) {
          hi.cache++;
          var n, i, o = T();
          c && (i = (n = y()) + .05 * o * -t.velocityX / .227, o *= Vo(y, n, i, Ps(d, ki)), s.vars.scrollX = O(i)), i = (n = v()) + .05 * o * -t.velocityY / .227, o *= Vo(v, n, i, Ps(d, Mi)), s.vars.scrollY = S(i), s.invalidate().duration(o).play(.01), (os && s.vars.scrollY >= r || n >= r - 1) && zi.to({}, {
            onUpdate: C,
            duration: o
          })
        } else u.restart(!0);
        p && p(t)
      }, t.onWheel = function () {
        s._ts && s.pause(), gs() - w > 1e3 && (n = 0, w = gs())
      }, t.onChange = function (t, e, r, i, s) {
        if (Po !== n && P(), e && c && y(O(i[2] === e ? o + (t.startX - t.x) : y() + e - i[1])), r) {
          v.offset && A();
          var u = s[2] === r,
            l = u ? a + t.startY - t.y : v() + r - s[1],
            f = S(l);
          u && l !== f && (a += f - l), v(f)
        } (r || e) && Do()
      }, t.onEnable = function () {
        Go(d, !c && "x"), Wo.addEventListener("refresh", C), io(Li, "resize", C), v.smooth && (v.target.style.scrollBehavior = "auto", v.smooth = y.smooth = !1), k.enable()
      }, t.onDisable = function () {
        Go(d, !0), so(Li, "resize", C), Wo.removeEventListener("refresh", C), k.kill()
      }, t.lockAxis = !1 !== t.lockAxis, (e = new Ri(t)).iOS = os, os && !v() && v(1), os && zi.ticker.add(ws), u = e._dc, s = zi.to(e, {
        ease: "power4",
        paused: !0,
        scrollX: c ? "+=0.1" : "+=0",
        scrollY: "+=0.1",
        modifiers: {
          scrollY: Uo(v, v(), (function () {
            return s.pause()
          }))
        },
        onUpdate: Do,
        onComplete: u.vars.onComplete
      }), e
    };
  Wo.sort = function (t) {
    return po.sort(t || function (t, e) {
      return -1e6 * (t.vars.refreshPriority || 0) + t.start - (e.start + -1e6 * (e.vars.refreshPriority || 0))
    })
  }, Wo.observe = function (t) {
    return new Ri(t)
  }, Wo.normalizeScroll = function (t) {
    if (typeof t > "u") return rs;
    if (!0 === t && rs) return rs.enable();
    if (!1 === t) return rs && rs.kill();
    var e = t instanceof Ri ? t : ta(t);
    return rs && rs.target === e.target && rs.kill(), Os(e.target) && (rs = e), e
  }, Wo.core = {
    _getVelocityProp: Pi,
    _inputObserver: Zo,
    _scrollers: hi,
    _proxies: pi,
    bridge: {
      ss: function () {
        ms || To("scrollStart"), ms = gs()
      },
      ref: function () {
        return Hi
      }
    }
  }, Ms() && zi.registerPlugin(Wo);
  var ea, ra, na, ia, sa, oa, aa, ua, la = function () {
    return typeof window < "u"
  },
    ca = function () {
      return ea || la() && (ea = window.gsap) && ea.registerPlugin && ea
    },
    fa = function (t) {
      return "string" == typeof t
    },
    ha = function (t) {
      return "function" == typeof t
    },
    pa = function (t, e) {
      var r = "x" === e ? "Width" : "Height",
        n = "scroll" + r,
        i = "client" + r;
      return t === na || t === ia || t === sa ? Math.max(ia[n], sa[n]) - (na["inner" + r] || ia[i] || sa[i]) : t[n] - t["offset" + r]
    },
    da = function (t, e) {
      var r = "scroll" + ("x" === e ? "Left" : "Top");
      return t === na && (null != t.pageXOffset ? r = "page" + e.toUpperCase() + "Offset" : t = null != ia[r] ? ia : sa),
        function () {
          return t[r]
        }
    },
    ga = function (t, e) {
      if (!(t = oa(t)[0]) || !t.getBoundingClientRect) return console.warn("scrollTo target doesn't exist. Using 0") || {
        x: 0,
        y: 0
      };
      var r = t.getBoundingClientRect(),
        n = !e || e === na || e === sa,
        i = n ? {
          top: ia.clientTop - (na.pageYOffset || ia.scrollTop || sa.scrollTop || 0),
          left: ia.clientLeft - (na.pageXOffset || ia.scrollLeft || sa.scrollLeft || 0)
        } : e.getBoundingClientRect(),
        s = {
          x: r.left - i.left,
          y: r.top - i.top
        };
      return !n && e && (s.x += da(e, "x")(), s.y += da(e, "y")()), s
    },
    _a = function (t, e, r, n, i) {
      return isNaN(t) || "object" == typeof t ? fa(t) && "=" === t.charAt(1) ? parseFloat(t.substr(2)) * ("-" === t.charAt(0) ? -1 : 1) + n - i : "max" === t ? pa(e, r) - i : Math.min(pa(e, r), ga(t, e)[r] - i) : parseFloat(t) - i
    },
    ma = function () {
      ea = ca(), la() && ea && typeof document < "u" && document.body && (na = window, sa = document.body, ia = document.documentElement, oa = ea.utils.toArray, ea.config({
        autoKillThreshold: 7
      }), aa = ea.config(), ra = 1)
    },
    va = {
      version: "3.11.5",
      name: "scrollTo",
      rawVars: 1,
      register: function (t) {
        ea = t, ma()
      },
      init: function (t, e, r, n, i) {
        ra || ma();
        var s = this,
          o = ea.getProperty(t, "scrollSnapType");
        s.isWin = t === na, s.target = t, s.tween = r, e = function (t, e, r, n) {
          if (ha(t) && (t = t(e, r, n)), "object" != typeof t) return fa(t) && "max" !== t && "=" !== t.charAt(1) ? {
            x: t,
            y: t
          } : {
            y: t
          };
          if (t.nodeType) return {
            y: t,
            x: t
          };
          var i, s = {};
          for (i in t) s[i] = "onAutoKill" !== i && ha(t[i]) ? t[i](e, r, n) : t[i];
          return s
        }(e, n, t, i), s.vars = e, s.autoKill = !!e.autoKill, s.getX = da(t, "x"), s.getY = da(t, "y"), s.x = s.xPrev = s.getX(), s.y = s.yPrev = s.getY(), ua || (ua = ea.core.globals().ScrollTrigger), "smooth" === ea.getProperty(t, "scrollBehavior") && ea.set(t, {
          scrollBehavior: "auto"
        }), o && "none" !== o && (s.snap = 1, s.snapInline = t.style.scrollSnapType, t.style.scrollSnapType = "none"), null != e.x ? (s.add(s, "x", s.x, _a(e.x, t, "x", s.x, e.offsetX || 0), n, i), s._props.push("scrollTo_x")) : s.skipX = 1, null != e.y ? (s.add(s, "y", s.y, _a(e.y, t, "y", s.y, e.offsetY || 0), n, i), s._props.push("scrollTo_y")) : s.skipY = 1
      },
      render: function (t, e) {
        for (var r, n, i, s, o, a = e._pt, u = e.target, l = e.tween, c = e.autoKill, f = e.xPrev, h = e.yPrev, p = e.isWin, d = e.snap, g = e.snapInline; a;) a.r(t, a.d), a = a._next;
        r = p || !e.skipX ? e.getX() : f, i = (n = p || !e.skipY ? e.getY() : h) - h, s = r - f, o = aa.autoKillThreshold, e.x < 0 && (e.x = 0), e.y < 0 && (e.y = 0), c && (!e.skipX && (s > o || s < -o) && r < pa(u, "x") && (e.skipX = 1), !e.skipY && (i > o || i < -o) && n < pa(u, "y") && (e.skipY = 1), e.skipX && e.skipY && (l.kill(), e.vars.onAutoKill && e.vars.onAutoKill.apply(l, e.vars.onAutoKillParams || []))), p ? na.scrollTo(e.skipX ? r : e.x, e.skipY ? n : e.y) : (e.skipY || (u.scrollTop = e.y), e.skipX || (u.scrollLeft = e.x)), d && (1 === t || 0 === t) && (n = u.scrollTop, r = u.scrollLeft, g ? u.style.scrollSnapType = g : u.style.removeProperty("scroll-snap-type"), u.scrollTop = n + 1, u.scrollLeft = r + 1, u.scrollTop = n, u.scrollLeft = r), e.xPrev = e.x, e.yPrev = e.y, ua && ua.update()
      },
      kill: function (t) {
        var e = "scrollTo" === t;
        (e || "scrollTo_x" === t) && (this.skipX = 1), (e || "scrollTo_y" === t) && (this.skipY = 1)
      }
    };

  function ya(t) {
    t.classList.add("loaded")
  }
  va.max = pa, va.getOffset = ga, va.buildGetter = da, ca() && ea.registerPlugin(va), Gn.registerPlugin(Wo, va);
  (0, l.default)();
  var xa = document.querySelectorAll(".js-hero");
  xa && xa.length > 0 && (t => {
    t.forEach((t => {
      let e = t.querySelector("img");
      e && e.complete ? ya(e) : e && e.addEventListener("load", (() => {
        ya(e)
      }));
      let r = t.querySelector("video");
      r && (r.dataset.src && (r.src = r.dataset.src), r.addEventListener("canplaythrough", (() => {
        4 === r.readyState && r.play(), r.classList.add("loaded");
        let e = document.querySelector(".js-tagline"),
          n = document.querySelectorAll(".js-nav a"),
          s = Gn.timeline({
            ease: "sine"
          });
        e && (Gn.set(e, {
          opacity: 0
        }), s.to(e, {
          opacity: 1,
          duration: .5,
          delay: .25
        })), n && n.length > 0 && (Gn.set(n, {
          y: "20%",
          opacity: 0
        }), s.to(n, {
          opacity: 1,
          y: 0,
          stagger: .05,
          duration: .5,
          delay: .2
        }))
      }), {
        once: !0
      }))
    }))
  })(xa);
})();
/*! Bundled license information:

gsap/gsap-core.js:
  (*!
   * GSAP 3.11.5
   * https://greensock.com
   *
   * @license Copyright 2008-2023, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CSSPlugin.js:
  (*!
   * CSSPlugin 3.11.5
   * https://greensock.com
   *
   * Copyright 2008-2023, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/Observer.js:
  (*!
   * Observer 3.11.5
   * https://greensock.com
   *
   * @license Copyright 2008-2023, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/ScrollTrigger.js:
  (*!
   * ScrollTrigger 3.11.5
   * https://greensock.com
   *
   * @license Copyright 2008-2023, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/ScrollToPlugin.js:
  (*!
   * ScrollToPlugin 3.11.5
   * https://greensock.com
   *
   * @license Copyright 2008-2023, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)
*/