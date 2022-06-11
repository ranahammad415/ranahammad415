! function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var i = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "/invoice-generator/packs/", n(n.s = 3)
}([function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        function e(e, t, n) {
            this.eventTarget = e, this.eventName = t, this.eventOptions = n, this.unorderedBindings = new Set
        }
        return e.prototype.connect = function() {
            this.eventTarget.addEventListener(this.eventName, this, this.eventOptions)
        }, e.prototype.disconnect = function() {
            this.eventTarget.removeEventListener(this.eventName, this, this.eventOptions)
        }, e.prototype.bindingConnected = function(e) {
            this.unorderedBindings.add(e)
        }, e.prototype.bindingDisconnected = function(e) {
            this.unorderedBindings.delete(e)
        }, e.prototype.handleEvent = function(e) {
            for (var t = function(e) {
                    if ("immediatePropagationStopped" in e) return e;
                    var t = e.stopImmediatePropagation;
                    return Object.assign(e, {
                        immediatePropagationStopped: !1,
                        stopImmediatePropagation: function() {
                            this.immediatePropagationStopped = !0, t.call(this)
                        }
                    })
                }(e), n = 0, r = this.bindings; n < r.length; n++) {
                var i = r[n];
                if (t.immediatePropagationStopped) break;
                i.handleEvent(t)
            }
        }, Object.defineProperty(e.prototype, "bindings", {
            get: function() {
                return Array.from(this.unorderedBindings).sort(function(e, t) {
                    var n = e.index,
                        r = t.index;
                    return n < r ? -1 : n > r ? 1 : 0
                })
            },
            enumerable: !1,
            configurable: !0
        }), e
    }();
    var i = function() {
            function e(e) {
                this.application = e, this.eventListenerMaps = new Map, this.started = !1
            }
            return e.prototype.start = function() {
                this.started || (this.started = !0, this.eventListeners.forEach(function(e) {
                    return e.connect()
                }))
            }, e.prototype.stop = function() {
                this.started && (this.started = !1, this.eventListeners.forEach(function(e) {
                    return e.disconnect()
                }))
            }, Object.defineProperty(e.prototype, "eventListeners", {
                get: function() {
                    return Array.from(this.eventListenerMaps.values()).reduce(function(e, t) {
                        return e.concat(Array.from(t.values()))
                    }, [])
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype.bindingConnected = function(e) {
                this.fetchEventListenerForBinding(e).bindingConnected(e)
            }, e.prototype.bindingDisconnected = function(e) {
                this.fetchEventListenerForBinding(e).bindingDisconnected(e)
            }, e.prototype.handleError = function(e, t, n) {
                void 0 === n && (n = {}), this.application.handleError(e, "Error " + t, n)
            }, e.prototype.fetchEventListenerForBinding = function(e) {
                var t = e.eventTarget,
                    n = e.eventName,
                    r = e.eventOptions;
                return this.fetchEventListener(t, n, r)
            }, e.prototype.fetchEventListener = function(e, t, n) {
                var r = this.fetchEventListenerMapForEventTarget(e),
                    i = this.cacheKey(t, n),
                    o = r.get(i);
                return o || (o = this.createEventListener(e, t, n), r.set(i, o)), o
            }, e.prototype.createEventListener = function(e, t, n) {
                var i = new r(e, t, n);
                return this.started && i.connect(), i
            }, e.prototype.fetchEventListenerMapForEventTarget = function(e) {
                var t = this.eventListenerMaps.get(e);
                return t || (t = new Map, this.eventListenerMaps.set(e, t)), t
            }, e.prototype.cacheKey = function(e, t) {
                var n = [e];
                return Object.keys(t).sort().forEach(function(e) {
                    n.push((t[e] ? "" : "!") + e)
                }), n.join(":")
            }, e
        }(),
        o = /^((.+?)(@(window|document))?->)?(.+?)(#([^:]+?))(:(.+))?$/;

    function s(e) {
        var t, n = e.trim().match(o) || [];
        return {
            eventTarget: function(e) {
                if ("window" == e) return window;
                if ("document" == e) return document
            }(n[4]),
            eventName: n[2],
            eventOptions: n[9] ? (t = n[9], t.split(":").reduce(function(e, t) {
                var n;
                return Object.assign(e, ((n = {})[t.replace(/^!/, "")] = !/^!/.test(t), n))
            }, {})) : {},
            identifier: n[5],
            methodName: n[7]
        }
    }
    var a = function() {
            function e(e, t, n) {
                this.element = e, this.index = t, this.eventTarget = n.eventTarget || e, this.eventName = n.eventName || function(e) {
                    var t = e.tagName.toLowerCase();
                    if (t in c) return c[t](e)
                }(e) || u("missing event name"), this.eventOptions = n.eventOptions || {}, this.identifier = n.identifier || u("missing identifier"), this.methodName = n.methodName || u("missing method name")
            }
            return e.forToken = function(e) {
                return new this(e.element, e.index, s(e.content))
            }, e.prototype.toString = function() {
                var e = this.eventTargetName ? "@" + this.eventTargetName : "";
                return "" + this.eventName + e + "->" + this.identifier + "#" + this.methodName
            }, Object.defineProperty(e.prototype, "eventTargetName", {
                get: function() {
                    return (e = this.eventTarget) == window ? "window" : e == document ? "document" : void 0;
                    var e
                },
                enumerable: !1,
                configurable: !0
            }), e
        }(),
        c = {
            a: function(e) {
                return "click"
            },
            button: function(e) {
                return "click"
            },
            form: function(e) {
                return "submit"
            },
            input: function(e) {
                return "submit" == e.getAttribute("type") ? "click" : "input"
            },
            select: function(e) {
                return "change"
            },
            textarea: function(e) {
                return "input"
            }
        };

    function u(e) {
        throw new Error(e)
    }
    var l = function() {
            function e(e, t) {
                this.context = e, this.action = t
            }
            return Object.defineProperty(e.prototype, "index", {
                get: function() {
                    return this.action.index
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "eventTarget", {
                get: function() {
                    return this.action.eventTarget
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "eventOptions", {
                get: function() {
                    return this.action.eventOptions
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "identifier", {
                get: function() {
                    return this.context.identifier
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype.handleEvent = function(e) {
                this.willBeInvokedByEvent(e) && this.invokeWithEvent(e)
            }, Object.defineProperty(e.prototype, "eventName", {
                get: function() {
                    return this.action.eventName
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "method", {
                get: function() {
                    var e = this.controller[this.methodName];
                    if ("function" == typeof e) return e;
                    throw new Error('Action "' + this.action + '" references undefined method "' + this.methodName + '"')
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype.invokeWithEvent = function(e) {
                try {
                    this.method.call(this.controller, e)
                } catch (n) {
                    var t = {
                        identifier: this.identifier,
                        controller: this.controller,
                        element: this.element,
                        index: this.index,
                        event: e
                    };
                    this.context.handleError(n, 'invoking action "' + this.action + '"', t)
                }
            }, e.prototype.willBeInvokedByEvent = function(e) {
                var t = e.target;
                return this.element === t || (t instanceof Element && this.element.contains(t) ? this.scope.containsElement(t) : this.scope.containsElement(this.action.element))
            }, Object.defineProperty(e.prototype, "controller", {
                get: function() {
                    return this.context.controller
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "methodName", {
                get: function() {
                    return this.action.methodName
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "element", {
                get: function() {
                    return this.scope.element
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "scope", {
                get: function() {
                    return this.context.scope
                },
                enumerable: !1,
                configurable: !0
            }), e
        }(),
        h = function() {
            function e(e, t) {
                var n = this;
                this.element = e, this.started = !1, this.delegate = t, this.elements = new Set, this.mutationObserver = new MutationObserver(function(e) {
                    return n.processMutations(e)
                })
            }
            return e.prototype.start = function() {
                this.started || (this.started = !0, this.mutationObserver.observe(this.element, {
                    attributes: !0,
                    childList: !0,
                    subtree: !0
                }), this.refresh())
            }, e.prototype.stop = function() {
                this.started && (this.mutationObserver.takeRecords(), this.mutationObserver.disconnect(), this.started = !1)
            }, e.prototype.refresh = function() {
                if (this.started) {
                    for (var e = new Set(this.matchElementsInTree()), t = 0, n = Array.from(this.elements); t < n.length; t++) {
                        var r = n[t];
                        e.has(r) || this.removeElement(r)
                    }
                    for (var i = 0, o = Array.from(e); i < o.length; i++) {
                        r = o[i];
                        this.addElement(r)
                    }
                }
            }, e.prototype.processMutations = function(e) {
                if (this.started)
                    for (var t = 0, n = e; t < n.length; t++) {
                        var r = n[t];
                        this.processMutation(r)
                    }
            }, e.prototype.processMutation = function(e) {
                "attributes" == e.type ? this.processAttributeChange(e.target, e.attributeName) : "childList" == e.type && (this.processRemovedNodes(e.removedNodes), this.processAddedNodes(e.addedNodes))
            }, e.prototype.processAttributeChange = function(e, t) {
                var n = e;
                this.elements.has(n) ? this.delegate.elementAttributeChanged && this.matchElement(n) ? this.delegate.elementAttributeChanged(n, t) : this.removeElement(n) : this.matchElement(n) && this.addElement(n)
            }, e.prototype.processRemovedNodes = function(e) {
                for (var t = 0, n = Array.from(e); t < n.length; t++) {
                    var r = n[t],
                        i = this.elementFromNode(r);
                    i && this.processTree(i, this.removeElement)
                }
            }, e.prototype.processAddedNodes = function(e) {
                for (var t = 0, n = Array.from(e); t < n.length; t++) {
                    var r = n[t],
                        i = this.elementFromNode(r);
                    i && this.elementIsActive(i) && this.processTree(i, this.addElement)
                }
            }, e.prototype.matchElement = function(e) {
                return this.delegate.matchElement(e)
            }, e.prototype.matchElementsInTree = function(e) {
                return void 0 === e && (e = this.element), this.delegate.matchElementsInTree(e)
            }, e.prototype.processTree = function(e, t) {
                for (var n = 0, r = this.matchElementsInTree(e); n < r.length; n++) {
                    var i = r[n];
                    t.call(this, i)
                }
            }, e.prototype.elementFromNode = function(e) {
                if (e.nodeType == Node.ELEMENT_NODE) return e
            }, e.prototype.elementIsActive = function(e) {
                return e.isConnected == this.element.isConnected && this.element.contains(e)
            }, e.prototype.addElement = function(e) {
                this.elements.has(e) || this.elementIsActive(e) && (this.elements.add(e), this.delegate.elementMatched && this.delegate.elementMatched(e))
            }, e.prototype.removeElement = function(e) {
                this.elements.has(e) && (this.elements.delete(e), this.delegate.elementUnmatched && this.delegate.elementUnmatched(e))
            }, e
        }(),
        d = function() {
            function e(e, t, n) {
                this.attributeName = t, this.delegate = n, this.elementObserver = new h(e, this)
            }
            return Object.defineProperty(e.prototype, "element", {
                get: function() {
                    return this.elementObserver.element
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "selector", {
                get: function() {
                    return "[" + this.attributeName + "]"
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype.start = function() {
                this.elementObserver.start()
            }, e.prototype.stop = function() {
                this.elementObserver.stop()
            }, e.prototype.refresh = function() {
                this.elementObserver.refresh()
            }, Object.defineProperty(e.prototype, "started", {
                get: function() {
                    return this.elementObserver.started
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype.matchElement = function(e) {
                return e.hasAttribute(this.attributeName)
            }, e.prototype.matchElementsInTree = function(e) {
                var t = this.matchElement(e) ? [e] : [],
                    n = Array.from(e.querySelectorAll(this.selector));
                return t.concat(n)
            }, e.prototype.elementMatched = function(e) {
                this.delegate.elementMatchedAttribute && this.delegate.elementMatchedAttribute(e, this.attributeName)
            }, e.prototype.elementUnmatched = function(e) {
                this.delegate.elementUnmatchedAttribute && this.delegate.elementUnmatchedAttribute(e, this.attributeName)
            }, e.prototype.elementAttributeChanged = function(e, t) {
                this.delegate.elementAttributeValueChanged && this.attributeName == t && this.delegate.elementAttributeValueChanged(e, t)
            }, e
        }(),
        p = function() {
            function e(e, t) {
                var n = this;
                this.element = e, this.delegate = t, this.started = !1, this.stringMap = new Map, this.mutationObserver = new MutationObserver(function(e) {
                    return n.processMutations(e)
                })
            }
            return e.prototype.start = function() {
                this.started || (this.started = !0, this.mutationObserver.observe(this.element, {
                    attributes: !0
                }), this.refresh())
            }, e.prototype.stop = function() {
                this.started && (this.mutationObserver.takeRecords(), this.mutationObserver.disconnect(), this.started = !1)
            }, e.prototype.refresh = function() {
                if (this.started)
                    for (var e = 0, t = this.knownAttributeNames; e < t.length; e++) {
                        var n = t[e];
                        this.refreshAttribute(n)
                    }
            }, e.prototype.processMutations = function(e) {
                if (this.started)
                    for (var t = 0, n = e; t < n.length; t++) {
                        var r = n[t];
                        this.processMutation(r)
                    }
            }, e.prototype.processMutation = function(e) {
                var t = e.attributeName;
                t && this.refreshAttribute(t)
            }, e.prototype.refreshAttribute = function(e) {
                var t = this.delegate.getStringMapKeyForAttribute(e);
                if (null != t) {
                    this.stringMap.has(e) || this.stringMapKeyAdded(t, e);
                    var n = this.element.getAttribute(e);
                    this.stringMap.get(e) != n && this.stringMapValueChanged(n, t), null == n ? (this.stringMap.delete(e), this.stringMapKeyRemoved(t, e)) : this.stringMap.set(e, n)
                }
            }, e.prototype.stringMapKeyAdded = function(e, t) {
                this.delegate.stringMapKeyAdded && this.delegate.stringMapKeyAdded(e, t)
            }, e.prototype.stringMapValueChanged = function(e, t) {
                this.delegate.stringMapValueChanged && this.delegate.stringMapValueChanged(e, t)
            }, e.prototype.stringMapKeyRemoved = function(e, t) {
                this.delegate.stringMapKeyRemoved && this.delegate.stringMapKeyRemoved(e, t)
            }, Object.defineProperty(e.prototype, "knownAttributeNames", {
                get: function() {
                    return Array.from(new Set(this.currentAttributeNames.concat(this.recordedAttributeNames)))
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "currentAttributeNames", {
                get: function() {
                    return Array.from(this.element.attributes).map(function(e) {
                        return e.name
                    })
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "recordedAttributeNames", {
                get: function() {
                    return Array.from(this.stringMap.keys())
                },
                enumerable: !1,
                configurable: !0
            }), e
        }();

    function f(e, t, n) {
        g(e, t).add(n)
    }

    function m(e, t, n) {
        g(e, t).delete(n),
            function(e, t) {
                var n = e.get(t);
                null != n && 0 == n.size && e.delete(t)
            }(e, t)
    }

    function g(e, t) {
        var n = e.get(t);
        return n || (n = new Set, e.set(t, n)), n
    }
    var y, v = function() {
            function e() {
                this.valuesByKey = new Map
            }
            return Object.defineProperty(e.prototype, "values", {
                get: function() {
                    return Array.from(this.valuesByKey.values()).reduce(function(e, t) {
                        return e.concat(Array.from(t))
                    }, [])
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "size", {
                get: function() {
                    return Array.from(this.valuesByKey.values()).reduce(function(e, t) {
                        return e + t.size
                    }, 0)
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype.add = function(e, t) {
                f(this.valuesByKey, e, t)
            }, e.prototype.delete = function(e, t) {
                m(this.valuesByKey, e, t)
            }, e.prototype.has = function(e, t) {
                var n = this.valuesByKey.get(e);
                return null != n && n.has(t)
            }, e.prototype.hasKey = function(e) {
                return this.valuesByKey.has(e)
            }, e.prototype.hasValue = function(e) {
                return Array.from(this.valuesByKey.values()).some(function(t) {
                    return t.has(e)
                })
            }, e.prototype.getValuesForKey = function(e) {
                var t = this.valuesByKey.get(e);
                return t ? Array.from(t) : []
            }, e.prototype.getKeysForValue = function(e) {
                return Array.from(this.valuesByKey).filter(function(t) {
                    t[0];
                    return t[1].has(e)
                }).map(function(e) {
                    var t = e[0];
                    e[1];
                    return t
                })
            }, e
        }(),
        b = this && this.__extends || (y = function(e, t) {
            return (y = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
        }, function(e, t) {
            function n() {
                this.constructor = e
            }
            y(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
        }),
        w = (function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.keysByValue = new Map, t
            }
            b(t, e), Object.defineProperty(t.prototype, "values", {
                get: function() {
                    return Array.from(this.keysByValue.keys())
                },
                enumerable: !1,
                configurable: !0
            }), t.prototype.add = function(t, n) {
                e.prototype.add.call(this, t, n), f(this.keysByValue, n, t)
            }, t.prototype.delete = function(t, n) {
                e.prototype.delete.call(this, t, n), m(this.keysByValue, n, t)
            }, t.prototype.hasValue = function(e) {
                return this.keysByValue.has(e)
            }, t.prototype.getKeysForValue = function(e) {
                var t = this.keysByValue.get(e);
                return t ? Array.from(t) : []
            }
        }(v), function() {
            function e(e, t, n) {
                this.attributeObserver = new d(e, t, this), this.delegate = n, this.tokensByElement = new v
            }
            return Object.defineProperty(e.prototype, "started", {
                get: function() {
                    return this.attributeObserver.started
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype.start = function() {
                this.attributeObserver.start()
            }, e.prototype.stop = function() {
                this.attributeObserver.stop()
            }, e.prototype.refresh = function() {
                this.attributeObserver.refresh()
            }, Object.defineProperty(e.prototype, "element", {
                get: function() {
                    return this.attributeObserver.element
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "attributeName", {
                get: function() {
                    return this.attributeObserver.attributeName
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype.elementMatchedAttribute = function(e) {
                this.tokensMatched(this.readTokensForElement(e))
            }, e.prototype.elementAttributeValueChanged = function(e) {
                var t = this.refreshTokensForElement(e),
                    n = t[0],
                    r = t[1];
                this.tokensUnmatched(n), this.tokensMatched(r)
            }, e.prototype.elementUnmatchedAttribute = function(e) {
                this.tokensUnmatched(this.tokensByElement.getValuesForKey(e))
            }, e.prototype.tokensMatched = function(e) {
                var t = this;
                e.forEach(function(e) {
                    return t.tokenMatched(e)
                })
            }, e.prototype.tokensUnmatched = function(e) {
                var t = this;
                e.forEach(function(e) {
                    return t.tokenUnmatched(e)
                })
            }, e.prototype.tokenMatched = function(e) {
                this.delegate.tokenMatched(e), this.tokensByElement.add(e.element, e)
            }, e.prototype.tokenUnmatched = function(e) {
                this.delegate.tokenUnmatched(e), this.tokensByElement.delete(e.element, e)
            }, e.prototype.refreshTokensForElement = function(e) {
                var t, n, r, i = this.tokensByElement.getValuesForKey(e),
                    o = this.readTokensForElement(e),
                    s = (t = i, n = o, r = Math.max(t.length, n.length), Array.from({
                        length: r
                    }, function(e, r) {
                        return [t[r], n[r]]
                    })).findIndex(function(e) {
                        var t, n, r = e[0],
                            i = e[1];
                        return n = i, !((t = r) && n && t.index == n.index && t.content == n.content)
                    });
                return -1 == s ? [
                    [],
                    []
                ] : [i.slice(s), o.slice(s)]
            }, e.prototype.readTokensForElement = function(e) {
                var t = this.attributeName;
                return function(e, t, n) {
                    return e.trim().split(/\s+/).filter(function(e) {
                        return e.length
                    }).map(function(e, r) {
                        return {
                            element: t,
                            attributeName: n,
                            content: e,
                            index: r
                        }
                    })
                }(e.getAttribute(t) || "", e, t)
            }, e
        }());
    var E = function() {
            function e(e, t, n) {
                this.tokenListObserver = new w(e, t, this), this.delegate = n, this.parseResultsByToken = new WeakMap, this.valuesByTokenByElement = new WeakMap
            }
            return Object.defineProperty(e.prototype, "started", {
                get: function() {
                    return this.tokenListObserver.started
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype.start = function() {
                this.tokenListObserver.start()
            }, e.prototype.stop = function() {
                this.tokenListObserver.stop()
            }, e.prototype.refresh = function() {
                this.tokenListObserver.refresh()
            }, Object.defineProperty(e.prototype, "element", {
                get: function() {
                    return this.tokenListObserver.element
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "attributeName", {
                get: function() {
                    return this.tokenListObserver.attributeName
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype.tokenMatched = function(e) {
                var t = e.element,
                    n = this.fetchParseResultForToken(e).value;
                n && (this.fetchValuesByTokenForElement(t).set(e, n), this.delegate.elementMatchedValue(t, n))
            }, e.prototype.tokenUnmatched = function(e) {
                var t = e.element,
                    n = this.fetchParseResultForToken(e).value;
                n && (this.fetchValuesByTokenForElement(t).delete(e), this.delegate.elementUnmatchedValue(t, n))
            }, e.prototype.fetchParseResultForToken = function(e) {
                var t = this.parseResultsByToken.get(e);
                return t || (t = this.parseToken(e), this.parseResultsByToken.set(e, t)), t
            }, e.prototype.fetchValuesByTokenForElement = function(e) {
                var t = this.valuesByTokenByElement.get(e);
                return t || (t = new Map, this.valuesByTokenByElement.set(e, t)), t
            }, e.prototype.parseToken = function(e) {
                try {
                    return {
                        value: this.delegate.parseValueForToken(e)
                    }
                } catch (e) {
                    return {
                        error: e
                    }
                }
            }, e
        }(),
        S = function() {
            function e(e, t) {
                this.context = e, this.delegate = t, this.bindingsByAction = new Map
            }
            return e.prototype.start = function() {
                this.valueListObserver || (this.valueListObserver = new E(this.element, this.actionAttribute, this), this.valueListObserver.start())
            }, e.prototype.stop = function() {
                this.valueListObserver && (this.valueListObserver.stop(), delete this.valueListObserver, this.disconnectAllActions())
            }, Object.defineProperty(e.prototype, "element", {
                get: function() {
                    return this.context.element
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "identifier", {
                get: function() {
                    return this.context.identifier
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "actionAttribute", {
                get: function() {
                    return this.schema.actionAttribute
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "schema", {
                get: function() {
                    return this.context.schema
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "bindings", {
                get: function() {
                    return Array.from(this.bindingsByAction.values())
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype.connectAction = function(e) {
                var t = new l(this.context, e);
                this.bindingsByAction.set(e, t), this.delegate.bindingConnected(t)
            }, e.prototype.disconnectAction = function(e) {
                var t = this.bindingsByAction.get(e);
                t && (this.bindingsByAction.delete(e), this.delegate.bindingDisconnected(t))
            }, e.prototype.disconnectAllActions = function() {
                var e = this;
                this.bindings.forEach(function(t) {
                    return e.delegate.bindingDisconnected(t)
                }), this.bindingsByAction.clear()
            }, e.prototype.parseValueForToken = function(e) {
                var t = a.forToken(e);
                if (t.identifier == this.identifier) return t
            }, e.prototype.elementMatchedValue = function(e, t) {
                this.connectAction(t)
            }, e.prototype.elementUnmatchedValue = function(e, t) {
                this.disconnectAction(t)
            }, e
        }(),
        O = function() {
            function e(e, t) {
                this.context = e, this.receiver = t, this.stringMapObserver = new p(this.element, this), this.valueDescriptorMap = this.controller.valueDescriptorMap, this.invokeChangedCallbacksForDefaultValues()
            }
            return e.prototype.start = function() {
                this.stringMapObserver.start()
            }, e.prototype.stop = function() {
                this.stringMapObserver.stop()
            }, Object.defineProperty(e.prototype, "element", {
                get: function() {
                    return this.context.element
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "controller", {
                get: function() {
                    return this.context.controller
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype.getStringMapKeyForAttribute = function(e) {
                if (e in this.valueDescriptorMap) return this.valueDescriptorMap[e].name
            }, e.prototype.stringMapValueChanged = function(e, t) {
                this.invokeChangedCallbackForValue(t)
            }, e.prototype.invokeChangedCallbacksForDefaultValues = function() {
                for (var e = 0, t = this.valueDescriptors; e < t.length; e++) {
                    var n = t[e],
                        r = n.key,
                        i = n.name;
                    void 0 == n.defaultValue || this.controller.data.has(r) || this.invokeChangedCallbackForValue(i)
                }
            }, e.prototype.invokeChangedCallbackForValue = function(e) {
                var t = e + "Changed",
                    n = this.receiver[t];
                if ("function" == typeof n) {
                    var r = this.receiver[e];
                    n.call(this.receiver, r)
                }
            }, Object.defineProperty(e.prototype, "valueDescriptors", {
                get: function() {
                    var e = this.valueDescriptorMap;
                    return Object.keys(e).map(function(t) {
                        return e[t]
                    })
                },
                enumerable: !1,
                configurable: !0
            }), e
        }(),
        _ = function() {
            function e(e, t) {
                this.module = e, this.scope = t, this.controller = new e.controllerConstructor(this), this.bindingObserver = new S(this, this.dispatcher), this.valueObserver = new O(this, this.controller);
                try {
                    this.controller.initialize()
                } catch (e) {
                    this.handleError(e, "initializing controller")
                }
            }
            return e.prototype.connect = function() {
                this.bindingObserver.start(), this.valueObserver.start();
                try {
                    this.controller.connect()
                } catch (e) {
                    this.handleError(e, "connecting controller")
                }
            }, e.prototype.disconnect = function() {
                try {
                    this.controller.disconnect()
                } catch (e) {
                    this.handleError(e, "disconnecting controller")
                }
                this.valueObserver.stop(), this.bindingObserver.stop()
            }, Object.defineProperty(e.prototype, "application", {
                get: function() {
                    return this.module.application
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "identifier", {
                get: function() {
                    return this.module.identifier
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "schema", {
                get: function() {
                    return this.application.schema
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "dispatcher", {
                get: function() {
                    return this.application.dispatcher
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "element", {
                get: function() {
                    return this.scope.element
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "parentElement", {
                get: function() {
                    return this.element.parentElement
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype.handleError = function(e, t, n) {
                void 0 === n && (n = {});
                var r = this.identifier,
                    i = this.controller,
                    o = this.element;
                n = Object.assign({
                    identifier: r,
                    controller: i,
                    element: o
                }, n), this.application.handleError(e, "Error " + t, n)
            }, e
        }();

    function k(e, t) {
        var n = A(e);
        return Array.from(n.reduce(function(e, n) {
            return function(e, t) {
                var n = e[t];
                return Array.isArray(n) ? n : []
            }(n, t).forEach(function(t) {
                return e.add(t)
            }), e
        }, new Set))
    }

    function T(e, t) {
        return A(e).reduce(function(e, n) {
            return e.push.apply(e, function(e, t) {
                var n = e[t];
                return n ? Object.keys(n).map(function(e) {
                    return [e, n[e]]
                }) : []
            }(n, t)), e
        }, [])
    }

    function A(e) {
        for (var t = []; e;) t.push(e), e = Object.getPrototypeOf(e);
        return t.reverse()
    }
    var L = this && this.__extends || function() {
            var e = function(t, n) {
                return (e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    })(t, n)
            };
            return function(t, n) {
                function r() {
                    this.constructor = t
                }
                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(),
        P = this && this.__spreadArrays || function() {
            for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
            var r = Array(e),
                i = 0;
            for (t = 0; t < n; t++)
                for (var o = arguments[t], s = 0, a = o.length; s < a; s++, i++) r[i] = o[s];
            return r
        };

    function C(e) {
        return function(e, t) {
            var n = j(e),
                r = function(e, t) {
                    return M(t).reduce(function(n, r) {
                        var i, o = function(e, t, n) {
                            var r = Object.getOwnPropertyDescriptor(e, n);
                            if (!(r && "value" in r)) {
                                var i = Object.getOwnPropertyDescriptor(t, n).value;
                                return r && (i.get = r.get || i.get, i.set = r.set || i.set), i
                            }
                        }(e, t, r);
                        return o && Object.assign(n, ((i = {})[r] = o, i)), n
                    }, {})
                }(e.prototype, t);
            return Object.defineProperties(n.prototype, r), n
        }(e, function(e) {
            return k(e, "blessings").reduce(function(t, n) {
                var r = n(e);
                for (var i in r) {
                    var o = t[i] || {};
                    t[i] = Object.assign(o, r[i])
                }
                return t
            }, {})
        }(e))
    }
    var M = "function" == typeof Object.getOwnPropertySymbols ? function(e) {
            return P(Object.getOwnPropertyNames(e), Object.getOwnPropertySymbols(e))
        } : Object.getOwnPropertyNames,
        j = function() {
            function e(e) {
                function t() {
                    var n = this && this instanceof t ? this.constructor : void 0;
                    return Reflect.construct(e, arguments, n)
                }
                return t.prototype = Object.create(e.prototype, {
                    constructor: {
                        value: t
                    }
                }), Reflect.setPrototypeOf(t, e), t
            }
            try {
                return (t = e(function() {
                    this.a.call(this)
                })).prototype.a = function() {}, new t, e
            } catch (e) {
                return function(e) {
                    return function(e) {
                        function t() {
                            return null !== e && e.apply(this, arguments) || this
                        }
                        return L(t, e), t
                    }(e)
                }
            }
            var t
        }();
    var R = function() {
            function e(e, t) {
                this.application = e, this.definition = function(e) {
                    return {
                        identifier: e.identifier,
                        controllerConstructor: C(e.controllerConstructor)
                    }
                }(t), this.contextsByScope = new WeakMap, this.connectedContexts = new Set
            }
            return Object.defineProperty(e.prototype, "identifier", {
                get: function() {
                    return this.definition.identifier
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "controllerConstructor", {
                get: function() {
                    return this.definition.controllerConstructor
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "contexts", {
                get: function() {
                    return Array.from(this.connectedContexts)
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype.connectContextForScope = function(e) {
                var t = this.fetchContextForScope(e);
                this.connectedContexts.add(t), t.connect()
            }, e.prototype.disconnectContextForScope = function(e) {
                var t = this.contextsByScope.get(e);
                t && (this.connectedContexts.delete(t), t.disconnect())
            }, e.prototype.fetchContextForScope = function(e) {
                var t = this.contextsByScope.get(e);
                return t || (t = new _(this, e), this.contextsByScope.set(e, t)), t
            }, e
        }(),
        F = function() {
            function e(e) {
                this.scope = e
            }
            return e.prototype.has = function(e) {
                return this.data.has(this.getDataKey(e))
            }, e.prototype.get = function(e) {
                return this.data.get(this.getDataKey(e))
            }, e.prototype.getAttributeName = function(e) {
                return this.data.getAttributeNameForKey(this.getDataKey(e))
            }, e.prototype.getDataKey = function(e) {
                return e + "-class"
            }, Object.defineProperty(e.prototype, "data", {
                get: function() {
                    return this.scope.data
                },
                enumerable: !1,
                configurable: !0
            }), e
        }();

    function D(e) {
        return e.charAt(0).toUpperCase() + e.slice(1)
    }

    function I(e) {
        return e.replace(/([A-Z])/g, function(e, t) {
            return "-" + t.toLowerCase()
        })
    }
    var x = function() {
            function e(e) {
                this.scope = e
            }
            return Object.defineProperty(e.prototype, "element", {
                get: function() {
                    return this.scope.element
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "identifier", {
                get: function() {
                    return this.scope.identifier
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype.get = function(e) {
                var t = this.getAttributeNameForKey(e);
                return this.element.getAttribute(t)
            }, e.prototype.set = function(e, t) {
                var n = this.getAttributeNameForKey(e);
                return this.element.setAttribute(n, t), this.get(e)
            }, e.prototype.has = function(e) {
                var t = this.getAttributeNameForKey(e);
                return this.element.hasAttribute(t)
            }, e.prototype.delete = function(e) {
                if (this.has(e)) {
                    var t = this.getAttributeNameForKey(e);
                    return this.element.removeAttribute(t), !0
                }
                return !1
            }, e.prototype.getAttributeNameForKey = function(e) {
                return "data-" + this.identifier + "-" + I(e)
            }, e
        }(),
        B = function() {
            function e(e) {
                this.warnedKeysByObject = new WeakMap, this.logger = e
            }
            return e.prototype.warn = function(e, t, n) {
                var r = this.warnedKeysByObject.get(e);
                r || (r = new Set, this.warnedKeysByObject.set(e, r)), r.has(t) || (r.add(t), this.logger.warn(n, e))
            }, e
        }();

    function N(e, t) {
        return "[" + e + '~="' + t + '"]'
    }
    var q = this && this.__spreadArrays || function() {
            for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
            var r = Array(e),
                i = 0;
            for (t = 0; t < n; t++)
                for (var o = arguments[t], s = 0, a = o.length; s < a; s++, i++) r[i] = o[s];
            return r
        },
        H = function() {
            function e(e) {
                this.scope = e
            }
            return Object.defineProperty(e.prototype, "element", {
                get: function() {
                    return this.scope.element
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "identifier", {
                get: function() {
                    return this.scope.identifier
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "schema", {
                get: function() {
                    return this.scope.schema
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype.has = function(e) {
                return null != this.find(e)
            }, e.prototype.find = function() {
                for (var e = this, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return t.reduce(function(t, n) {
                    return t || e.findTarget(n) || e.findLegacyTarget(n)
                }, void 0)
            }, e.prototype.findAll = function() {
                for (var e = this, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return t.reduce(function(t, n) {
                    return q(t, e.findAllTargets(n), e.findAllLegacyTargets(n))
                }, [])
            }, e.prototype.findTarget = function(e) {
                var t = this.getSelectorForTargetName(e);
                return this.scope.findElement(t)
            }, e.prototype.findAllTargets = function(e) {
                var t = this.getSelectorForTargetName(e);
                return this.scope.findAllElements(t)
            }, e.prototype.getSelectorForTargetName = function(e) {
                return N("data-" + this.identifier + "-target", e)
            }, e.prototype.findLegacyTarget = function(e) {
                var t = this.getLegacySelectorForTargetName(e);
                return this.deprecate(this.scope.findElement(t), e)
            }, e.prototype.findAllLegacyTargets = function(e) {
                var t = this,
                    n = this.getLegacySelectorForTargetName(e);
                return this.scope.findAllElements(n).map(function(n) {
                    return t.deprecate(n, e)
                })
            }, e.prototype.getLegacySelectorForTargetName = function(e) {
                var t = this.identifier + "." + e;
                return N(this.schema.targetAttribute, t)
            }, e.prototype.deprecate = function(e, t) {
                if (e) {
                    var n = this.identifier,
                        r = this.schema.targetAttribute;
                    this.guide.warn(e, "target:" + t, "Please replace " + r + '="' + n + "." + t + '" with data-' + n + '-target="' + t + '". The ' + r + " attribute is deprecated and will be removed in a future version of Stimulus.")
                }
                return e
            }, Object.defineProperty(e.prototype, "guide", {
                get: function() {
                    return this.scope.guide
                },
                enumerable: !1,
                configurable: !0
            }), e
        }(),
        V = this && this.__spreadArrays || function() {
            for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
            var r = Array(e),
                i = 0;
            for (t = 0; t < n; t++)
                for (var o = arguments[t], s = 0, a = o.length; s < a; s++, i++) r[i] = o[s];
            return r
        },
        z = function() {
            function e(e, t, n, r) {
                var i = this;
                this.targets = new H(this), this.classes = new F(this), this.data = new x(this), this.containsElement = function(e) {
                    return e.closest(i.controllerSelector) === i.element
                }, this.schema = e, this.element = t, this.identifier = n, this.guide = new B(r)
            }
            return e.prototype.findElement = function(e) {
                return this.element.matches(e) ? this.element : this.queryElements(e).find(this.containsElement)
            }, e.prototype.findAllElements = function(e) {
                return V(this.element.matches(e) ? [this.element] : [], this.queryElements(e).filter(this.containsElement))
            }, e.prototype.queryElements = function(e) {
                return Array.from(this.element.querySelectorAll(e))
            }, Object.defineProperty(e.prototype, "controllerSelector", {
                get: function() {
                    return N(this.schema.controllerAttribute, this.identifier)
                },
                enumerable: !1,
                configurable: !0
            }), e
        }(),
        K = function() {
            function e(e, t, n) {
                this.element = e, this.schema = t, this.delegate = n, this.valueListObserver = new E(this.element, this.controllerAttribute, this), this.scopesByIdentifierByElement = new WeakMap, this.scopeReferenceCounts = new WeakMap
            }
            return e.prototype.start = function() {
                this.valueListObserver.start()
            }, e.prototype.stop = function() {
                this.valueListObserver.stop()
            }, Object.defineProperty(e.prototype, "controllerAttribute", {
                get: function() {
                    return this.schema.controllerAttribute
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype.parseValueForToken = function(e) {
                var t = e.element,
                    n = e.content,
                    r = this.fetchScopesByIdentifierForElement(t),
                    i = r.get(n);
                return i || (i = this.delegate.createScopeForElementAndIdentifier(t, n), r.set(n, i)), i
            }, e.prototype.elementMatchedValue = function(e, t) {
                var n = (this.scopeReferenceCounts.get(t) || 0) + 1;
                this.scopeReferenceCounts.set(t, n), 1 == n && this.delegate.scopeConnected(t)
            }, e.prototype.elementUnmatchedValue = function(e, t) {
                var n = this.scopeReferenceCounts.get(t);
                n && (this.scopeReferenceCounts.set(t, n - 1), 1 == n && this.delegate.scopeDisconnected(t))
            }, e.prototype.fetchScopesByIdentifierForElement = function(e) {
                var t = this.scopesByIdentifierByElement.get(e);
                return t || (t = new Map, this.scopesByIdentifierByElement.set(e, t)), t
            }, e
        }(),
        U = function() {
            function e(e) {
                this.application = e, this.scopeObserver = new K(this.element, this.schema, this), this.scopesByIdentifier = new v, this.modulesByIdentifier = new Map
            }
            return Object.defineProperty(e.prototype, "element", {
                get: function() {
                    return this.application.element
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "schema", {
                get: function() {
                    return this.application.schema
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "logger", {
                get: function() {
                    return this.application.logger
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "controllerAttribute", {
                get: function() {
                    return this.schema.controllerAttribute
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "modules", {
                get: function() {
                    return Array.from(this.modulesByIdentifier.values())
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "contexts", {
                get: function() {
                    return this.modules.reduce(function(e, t) {
                        return e.concat(t.contexts)
                    }, [])
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype.start = function() {
                this.scopeObserver.start()
            }, e.prototype.stop = function() {
                this.scopeObserver.stop()
            }, e.prototype.loadDefinition = function(e) {
                this.unloadIdentifier(e.identifier);
                var t = new R(this.application, e);
                this.connectModule(t)
            }, e.prototype.unloadIdentifier = function(e) {
                var t = this.modulesByIdentifier.get(e);
                t && this.disconnectModule(t)
            }, e.prototype.getContextForElementAndIdentifier = function(e, t) {
                var n = this.modulesByIdentifier.get(t);
                if (n) return n.contexts.find(function(t) {
                    return t.element == e
                })
            }, e.prototype.handleError = function(e, t, n) {
                this.application.handleError(e, t, n)
            }, e.prototype.createScopeForElementAndIdentifier = function(e, t) {
                return new z(this.schema, e, t, this.logger)
            }, e.prototype.scopeConnected = function(e) {
                this.scopesByIdentifier.add(e.identifier, e);
                var t = this.modulesByIdentifier.get(e.identifier);
                t && t.connectContextForScope(e)
            }, e.prototype.scopeDisconnected = function(e) {
                this.scopesByIdentifier.delete(e.identifier, e);
                var t = this.modulesByIdentifier.get(e.identifier);
                t && t.disconnectContextForScope(e)
            }, e.prototype.connectModule = function(e) {
                this.modulesByIdentifier.set(e.identifier, e), this.scopesByIdentifier.getValuesForKey(e.identifier).forEach(function(t) {
                    return e.connectContextForScope(t)
                })
            }, e.prototype.disconnectModule = function(e) {
                this.modulesByIdentifier.delete(e.identifier), this.scopesByIdentifier.getValuesForKey(e.identifier).forEach(function(t) {
                    return e.disconnectContextForScope(t)
                })
            }, e
        }(),
        W = {
            controllerAttribute: "data-controller",
            actionAttribute: "data-action",
            targetAttribute: "data-target"
        },
        Y = this && this.__awaiter || function(e, t, n, r) {
            return new(n || (n = Promise))(function(i, o) {
                function s(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n(function(e) {
                        e(t)
                    })).then(s, a)
                }
                c((r = r.apply(e, t || [])).next())
            })
        },
        $ = this && this.__generator || function(e, t) {
            var n, r, i, o, s = {
                label: 0,
                sent: function() {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: a(0),
                throw: a(1),
                return: a(2)
            }, "function" === typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }), o;

            function a(o) {
                return function(a) {
                    return function(o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; s;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return s.label++, {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    s.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = s.ops.pop(), s.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = s.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        s.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && s.label < i[1]) {
                                        s.label = i[1], i = o;
                                        break
                                    }
                                    if (i && s.label < i[2]) {
                                        s.label = i[2], s.ops.push(o);
                                        break
                                    }
                                    i[2] && s.ops.pop(), s.trys.pop();
                                    continue
                            }
                            o = t.call(e, s)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, a])
                }
            }
        },
        J = this && this.__spreadArrays || function() {
            for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
            var r = Array(e),
                i = 0;
            for (t = 0; t < n; t++)
                for (var o = arguments[t], s = 0, a = o.length; s < a; s++, i++) r[i] = o[s];
            return r
        },
        G = function() {
            function e(e, t) {
                void 0 === e && (e = document.documentElement), void 0 === t && (t = W), this.logger = console, this.element = e, this.schema = t, this.dispatcher = new i(this), this.router = new U(this)
            }
            return e.start = function(t, n) {
                var r = new e(t, n);
                return r.start(), r
            }, e.prototype.start = function() {
                return Y(this, void 0, void 0, function() {
                    return $(this, function(e) {
                        switch (e.label) {
                            case 0:
                                return [4, new Promise(function(e) {
                                    "loading" == document.readyState ? document.addEventListener("DOMContentLoaded", e) : e()
                                })];
                            case 1:
                                return e.sent(), this.dispatcher.start(), this.router.start(), [2]
                        }
                    })
                })
            }, e.prototype.stop = function() {
                this.dispatcher.stop(), this.router.stop()
            }, e.prototype.register = function(e, t) {
                this.load({
                    identifier: e,
                    controllerConstructor: t
                })
            }, e.prototype.load = function(e) {
                for (var t = this, n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
                (Array.isArray(e) ? e : J([e], n)).forEach(function(e) {
                    return t.router.loadDefinition(e)
                })
            }, e.prototype.unload = function(e) {
                for (var t = this, n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
                (Array.isArray(e) ? e : J([e], n)).forEach(function(e) {
                    return t.router.unloadIdentifier(e)
                })
            }, Object.defineProperty(e.prototype, "controllers", {
                get: function() {
                    return this.router.contexts.map(function(e) {
                        return e.controller
                    })
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype.getControllerForElementAndIdentifier = function(e, t) {
                var n = this.router.getContextForElementAndIdentifier(e, t);
                return n ? n.controller : null
            }, e.prototype.handleError = function(e, t, n) {
                this.logger.error("%s\n\n%o\n\n%o", t, e, n)
            }, e
        }();

    function Z(e) {
        return k(e, "classes").reduce(function(e, t) {
            return Object.assign(e, ((r = {})[i = (n = t) + "Class"] = {
                get: function() {
                    var e = this.classes;
                    if (e.has(n)) return e.get(n);
                    var t = e.getAttributeName(n);
                    throw new Error('Missing attribute "' + t + '"')
                }
            }, r["has" + D(i)] = {
                get: function() {
                    return this.classes.has(n)
                }
            }, r));
            var n, r, i
        }, {})
    }

    function Q(e) {
        return k(e, "targets").reduce(function(e, t) {
            return Object.assign(e, ((r = {})[(n = t) + "Target"] = {
                get: function() {
                    var e = this.targets.find(n);
                    if (e) return e;
                    throw new Error('Missing target element "' + this.identifier + "." + n + '"')
                }
            }, r[n + "Targets"] = {
                get: function() {
                    return this.targets.findAll(n)
                }
            }, r["has" + D(n) + "Target"] = {
                get: function() {
                    return this.targets.has(n)
                }
            }, r));
            var n, r
        }, {})
    }

    function X(e) {
        var t = T(e, "values"),
            n = {
                valueDescriptorMap: {
                    get: function() {
                        var e = this;
                        return t.reduce(function(t, n) {
                            var r, i = ee(n),
                                o = e.data.getAttributeNameForKey(i.key);
                            return Object.assign(t, ((r = {})[o] = i, r))
                        }, {})
                    }
                }
            };
        return t.reduce(function(e, t) {
            return Object.assign(e, function(e) {
                var t, n = ee(e),
                    r = n.type,
                    i = n.key,
                    o = n.name,
                    s = ne[r],
                    a = re[r] || re.default;
                return (t = {})[o] = {
                    get: function() {
                        var e = this.data.get(i);
                        return null !== e ? s(e) : n.defaultValue
                    },
                    set: function(e) {
                        void 0 === e ? this.data.delete(i) : this.data.set(i, a(e))
                    }
                }, t["has" + D(o)] = {
                    get: function() {
                        return this.data.has(i)
                    }
                }, t
            }(t))
        }, n)
    }

    function ee(e) {
        return function(e, t) {
            var n = I(e) + "-value";
            return {
                type: t,
                key: n,
                name: (r = n, r.replace(/(?:[_-])([a-z0-9])/g, function(e, t) {
                    return t.toUpperCase()
                })),
                get defaultValue() {
                    return te[t]
                }
            };
            var r
        }(e[0], function(e) {
            switch (e) {
                case Array:
                    return "array";
                case Boolean:
                    return "boolean";
                case Number:
                    return "number";
                case Object:
                    return "object";
                case String:
                    return "string"
            }
            throw new Error('Unknown value type constant "' + e + '"')
        }(e[1]))
    }
    var te = {
            get array() {
                return []
            },
            boolean: !1,
            number: 0,
            get object() {
                return {}
            },
            string: ""
        },
        ne = {
            array: function(e) {
                var t = JSON.parse(e);
                if (!Array.isArray(t)) throw new TypeError("Expected array");
                return t
            },
            boolean: function(e) {
                return !("0" == e || "false" == e)
            },
            number: function(e) {
                return parseFloat(e)
            },
            object: function(e) {
                var t = JSON.parse(e);
                if (null === t || "object" != typeof t || Array.isArray(t)) throw new TypeError("Expected object");
                return t
            },
            string: function(e) {
                return e
            }
        },
        re = {
            default: function(e) {
                return "" + e
            },
            array: ie,
            object: ie
        };

    function ie(e) {
        return JSON.stringify(e)
    }
    var oe = function() {
        function e(e) {
            this.context = e
        }
        return Object.defineProperty(e.prototype, "application", {
            get: function() {
                return this.context.application
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "scope", {
            get: function() {
                return this.context.scope
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "element", {
            get: function() {
                return this.scope.element
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "identifier", {
            get: function() {
                return this.scope.identifier
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "targets", {
            get: function() {
                return this.scope.targets
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "classes", {
            get: function() {
                return this.scope.classes
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "data", {
            get: function() {
                return this.scope.data
            },
            enumerable: !1,
            configurable: !0
        }), e.prototype.initialize = function() {}, e.prototype.connect = function() {}, e.prototype.disconnect = function() {}, e.blessings = [Z, Q, X], e.targets = [], e.values = {}, e
    }();
    n.d(t, "Application", function() {
        return G
    }), n.d(t, "Context", function() {
        return _
    }), n.d(t, "Controller", function() {
        return oe
    }), n.d(t, "defaultSchema", function() {
        return W
    })
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }();
    var i = function() {
        function e() {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e)
        }
        return r(e, null, [{
            key: "remove_all",
            value: function() {
                this.elements.forEach(function(e) {
                    document.getElementById(e).removeAttribute("required")
                })
            }
        }, {
            key: "enable_for_required_email",
            value: function() {
                this.remove_all(), document.getElementById("required_email_field").setAttribute("required", !0)
            }
        }, {
            key: "enable_for_send_invoice",
            value: function() {
                this.remove_all(), document.getElementById("invoice_recipient_email").setAttribute("required", !0), document.getElementById("invoice_sender_email").setAttribute("required", !0), document.getElementById("invoice_email_message").setAttribute("required", !0)
            }
        }]), e
    }();
    i.elements = ["required_email_field", "invoice_recipient_email", "invoice_sender_email", "invoice_email_message"], t.RequiredInputFields = i
}, function(e, t, n) {
    var r;
    ! function(i) {
        "use strict";
        var o, s = 20,
            a = 1,
            c = 1e6,
            u = -7,
            l = 21,
            h = "[big.js] ",
            d = h + "Invalid ",
            p = d + "decimal places",
            f = d + "rounding mode",
            m = {},
            g = void 0,
            y = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;

        function v(e, t, n, r) {
            var i = e.c,
                o = e.e + t + 1;
            if (o < i.length) {
                if (1 === n) r = i[o] >= 5;
                else if (2 === n) r = i[o] > 5 || 5 == i[o] && (r || o < 0 || i[o + 1] !== g || 1 & i[o - 1]);
                else if (3 === n) r = r || i[o] !== g || o < 0;
                else if (r = !1, 0 !== n) throw Error(f);
                if (o < 1) i.length = 1, r ? (e.e = -t, i[0] = 1) : i[0] = e.e = 0;
                else {
                    if (i.length = o--, r)
                        for (; ++i[o] > 9;) i[o] = 0, o-- || (++e.e, i.unshift(1));
                    for (o = i.length; !i[--o];) i.pop()
                }
            } else if (n < 0 || n > 3 || n !== ~~n) throw Error(f);
            return e
        }

        function b(e, t, n, r) {
            var i, o, s = e.constructor,
                a = !e.c[0];
            if (n !== g) {
                if (n !== ~~n || n < (3 == t) || n > c) throw Error(3 == t ? d + "precision" : p);
                for (n = r - (e = new s(e)).e, e.c.length > ++r && v(e, n, s.RM), 2 == t && (r = e.e + n + 1); e.c.length < r;) e.c.push(0)
            }
            if (i = e.e, n = (o = e.c.join("")).length, 2 != t && (1 == t || 3 == t && r <= i || i <= s.NE || i >= s.PE)) o = o.charAt(0) + (n > 1 ? "." + o.slice(1) : "") + (i < 0 ? "e" : "e+") + i;
            else if (i < 0) {
                for (; ++i;) o = "0" + o;
                o = "0." + o
            } else if (i > 0)
                if (++i > n)
                    for (i -= n; i--;) o += "0";
                else i < n && (o = o.slice(0, i) + "." + o.slice(i));
            else n > 1 && (o = o.charAt(0) + "." + o.slice(1));
            return e.s < 0 && (!a || 4 == t) ? "-" + o : o
        }
        m.abs = function() {
            var e = new this.constructor(this);
            return e.s = 1, e
        }, m.cmp = function(e) {
            var t, n = this,
                r = n.c,
                i = (e = new n.constructor(e)).c,
                o = n.s,
                s = e.s,
                a = n.e,
                c = e.e;
            if (!r[0] || !i[0]) return r[0] ? o : i[0] ? -s : 0;
            if (o != s) return o;
            if (t = o < 0, a != c) return a > c ^ t ? 1 : -1;
            for (s = (a = r.length) < (c = i.length) ? a : c, o = -1; ++o < s;)
                if (r[o] != i[o]) return r[o] > i[o] ^ t ? 1 : -1;
            return a == c ? 0 : a > c ^ t ? 1 : -1
        }, m.div = function(e) {
            var t = this,
                n = t.constructor,
                r = t.c,
                i = (e = new n(e)).c,
                o = t.s == e.s ? 1 : -1,
                s = n.DP;
            if (s !== ~~s || s < 0 || s > c) throw Error(p);
            if (!i[0]) throw Error("[big.js] Division by zero");
            if (!r[0]) return new n(0 * o);
            var a, u, l, h, d, f = i.slice(),
                m = a = i.length,
                y = r.length,
                b = r.slice(0, a),
                w = b.length,
                E = e,
                S = E.c = [],
                O = 0,
                _ = s + (E.e = t.e - e.e) + 1;
            for (E.s = o, o = _ < 0 ? 0 : _, f.unshift(0); w++ < a;) b.push(0);
            do {
                for (l = 0; l < 10; l++) {
                    if (a != (w = b.length)) h = a > w ? 1 : -1;
                    else
                        for (d = -1, h = 0; ++d < a;)
                            if (i[d] != b[d]) {
                                h = i[d] > b[d] ? 1 : -1;
                                break
                            } if (!(h < 0)) break;
                    for (u = w == a ? i : f; w;) {
                        if (b[--w] < u[w]) {
                            for (d = w; d && !b[--d];) b[d] = 9;
                            --b[d], b[w] += 10
                        }
                        b[w] -= u[w]
                    }
                    for (; !b[0];) b.shift()
                }
                S[O++] = h ? l : ++l, b[0] && h ? b[w] = r[m] || 0 : b = [r[m]]
            } while ((m++ < y || b[0] !== g) && o--);
            return S[0] || 1 == O || (S.shift(), E.e--), O > _ && v(E, s, n.RM, b[0] !== g), E
        }, m.eq = function(e) {
            return !this.cmp(e)
        }, m.gt = function(e) {
            return this.cmp(e) > 0
        }, m.gte = function(e) {
            return this.cmp(e) > -1
        }, m.lt = function(e) {
            return this.cmp(e) < 0
        }, m.lte = function(e) {
            return this.cmp(e) < 1
        }, m.minus = m.sub = function(e) {
            var t, n, r, i, o = this,
                s = o.constructor,
                a = o.s,
                c = (e = new s(e)).s;
            if (a != c) return e.s = -c, o.plus(e);
            var u = o.c.slice(),
                l = o.e,
                h = e.c,
                d = e.e;
            if (!u[0] || !h[0]) return h[0] ? (e.s = -c, e) : new s(u[0] ? o : 0);
            if (a = l - d) {
                for ((i = a < 0) ? (a = -a, r = u) : (d = l, r = h), r.reverse(), c = a; c--;) r.push(0);
                r.reverse()
            } else
                for (n = ((i = u.length < h.length) ? u : h).length, a = c = 0; c < n; c++)
                    if (u[c] != h[c]) {
                        i = u[c] < h[c];
                        break
                    } if (i && (r = u, u = h, h = r, e.s = -e.s), (c = (n = h.length) - (t = u.length)) > 0)
                for (; c--;) u[t++] = 0;
            for (c = t; n > a;) {
                if (u[--n] < h[n]) {
                    for (t = n; t && !u[--t];) u[t] = 9;
                    --u[t], u[n] += 10
                }
                u[n] -= h[n]
            }
            for (; 0 === u[--c];) u.pop();
            for (; 0 === u[0];) u.shift(), --d;
            return u[0] || (e.s = 1, u = [d = 0]), e.c = u, e.e = d, e
        }, m.mod = function(e) {
            var t, n = this,
                r = n.constructor,
                i = n.s,
                o = (e = new r(e)).s;
            if (!e.c[0]) throw Error("[big.js] Division by zero");
            return n.s = e.s = 1, t = 1 == e.cmp(n), n.s = i, e.s = o, t ? new r(n) : (i = r.DP, o = r.RM, r.DP = r.RM = 0, n = n.div(e), r.DP = i, r.RM = o, this.minus(n.times(e)))
        }, m.plus = m.add = function(e) {
            var t, n = this,
                r = n.constructor,
                i = n.s,
                o = (e = new r(e)).s;
            if (i != o) return e.s = -o, n.minus(e);
            var s = n.e,
                a = n.c,
                c = e.e,
                u = e.c;
            if (!a[0] || !u[0]) return u[0] ? e : new r(a[0] ? n : 0 * i);
            if (a = a.slice(), i = s - c) {
                for (i > 0 ? (c = s, t = u) : (i = -i, t = a), t.reverse(); i--;) t.push(0);
                t.reverse()
            }
            for (a.length - u.length < 0 && (t = u, u = a, a = t), i = u.length, o = 0; i; a[i] %= 10) o = (a[--i] = a[i] + u[i] + o) / 10 | 0;
            for (o && (a.unshift(o), ++c), i = a.length; 0 === a[--i];) a.pop();
            return e.c = a, e.e = c, e
        }, m.pow = function(e) {
            var t = this,
                n = new t.constructor(1),
                r = n,
                i = e < 0;
            if (e !== ~~e || e < -1e6 || e > 1e6) throw Error(d + "exponent");
            for (i && (e = -e); 1 & e && (r = r.times(t)), e >>= 1;) t = t.times(t);
            return i ? n.div(r) : r
        }, m.round = function(e, t) {
            var n = this.constructor;
            if (e === g) e = 0;
            else if (e !== ~~e || e < 0 || e > c) throw Error(p);
            return v(new n(this), e, t === g ? n.RM : t)
        }, m.sqrt = function() {
            var e, t, n, r = this,
                i = r.constructor,
                o = r.s,
                s = r.e,
                a = new i(.5);
            if (!r.c[0]) return new i(r);
            if (o < 0) throw Error(h + "No square root");
            0 === (o = Math.sqrt(r.toString())) || o === 1 / 0 ? ((t = r.c.join("")).length + s & 1 || (t += "0"), (e = new i(Math.sqrt(t).toString())).e = ((s + 1) / 2 | 0) - (s < 0 || 1 & s)) : e = new i(o.toString()), s = e.e + (i.DP += 4);
            do {
                n = e, e = a.times(n.plus(r.div(n)))
            } while (n.c.slice(0, s).join("") !== e.c.slice(0, s).join(""));
            return v(e, i.DP -= 4, i.RM)
        }, m.times = m.mul = function(e) {
            var t, n = this,
                r = n.constructor,
                i = n.c,
                o = (e = new r(e)).c,
                s = i.length,
                a = o.length,
                c = n.e,
                u = e.e;
            if (e.s = n.s == e.s ? 1 : -1, !i[0] || !o[0]) return new r(0 * e.s);
            for (e.e = c + u, s < a && (t = i, i = o, o = t, u = s, s = a, a = u), t = new Array(u = s + a); u--;) t[u] = 0;
            for (c = a; c--;) {
                for (a = 0, u = s + c; u > c;) a = t[u] + o[c] * i[u - c - 1] + a, t[u--] = a % 10, a = a / 10 | 0;
                t[u] = (t[u] + a) % 10
            }
            for (a ? ++e.e : t.shift(), c = t.length; !t[--c];) t.pop();
            return e.c = t, e
        }, m.toExponential = function(e) {
            return b(this, 1, e, e)
        }, m.toFixed = function(e) {
            return b(this, 2, e, this.e + e)
        }, m.toPrecision = function(e) {
            return b(this, 3, e, e - 1)
        }, m.toString = function() {
            return b(this)
        }, m.valueOf = m.toJSON = function() {
            return b(this, 4)
        }, (o = function e() {
            function t(n) {
                var r = this;
                if (!(r instanceof t)) return n === g ? e() : new t(n);
                n instanceof t ? (r.s = n.s, r.e = n.e, r.c = n.c.slice()) : function(e, t) {
                    var n, r, i;
                    if (0 === t && 1 / t < 0) t = "-0";
                    else if (!y.test(t += "")) throw Error(d + "number");
                    for (e.s = "-" == t.charAt(0) ? (t = t.slice(1), -1) : 1, (n = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (r = t.search(/e/i)) > 0 ? (n < 0 && (n = r), n += +t.slice(r + 1), t = t.substring(0, r)) : n < 0 && (n = t.length), i = t.length, r = 0; r < i && "0" == t.charAt(r);) ++r;
                    if (r == i) e.c = [e.e = 0];
                    else {
                        for (; i > 0 && "0" == t.charAt(--i););
                        for (e.e = n - r - 1, e.c = [], n = 0; r <= i;) e.c[n++] = +t.charAt(r++)
                    }
                }(r, n), r.constructor = t
            }
            return t.prototype = m, t.DP = s, t.RM = a, t.NE = u, t.PE = l, t.version = "5.0.2", t
        }()).default = o.Big = o, void 0 === (r = function() {
            return o
        }.call(t, n, t, e)) || (e.exports = r)
    }()
}, function(e, t, n) {
    "use strict";
    n(4);
    var r = n(0),
        i = n(5),
        o = (n(6), r.Application.start()),
        s = n(7);
    o.load((0, i.definitionsFromContext)(s))
}, function(e, t, n) {
    (function() {
        "use strict";
        ! function(e) {
            if ("undefined" != typeof window) {
                var t = document.createElement("style");
                t.setAttribute("type", "text/css"), t.innerHTML = e, document.head.appendChild(t)
            }
        }('date-input-polyfill {\n  background: #fff;\n  color: #000;\n  text-shadow: none;\n  border: 0;\n  padding: 0;\n  height: auto;\n  width: auto;\n  line-height: normal;\n  border-radius: 0;\n  font-family: sans-serif;\n  font-size: 14px;\n  position: absolute !important;\n  text-align: center;\n  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 12px 17px 2px rgba(0, 0, 0, 0.14), 0 5px 22px 4px rgba(0, 0, 0, 0.12);\n  cursor: default;\n  z-index: 1; }\n  date-input-polyfill[data-open="false"] {\n    display: none; }\n  date-input-polyfill[data-open="true"] {\n    display: block; }\n  date-input-polyfill select, date-input-polyfill table, date-input-polyfill th, date-input-polyfill td {\n    background: #fff;\n    color: #000;\n    text-shadow: none;\n    border: 0;\n    padding: 0;\n    height: auto;\n    width: auto;\n    line-height: normal;\n    border-radius: 0;\n    font-family: sans-serif;\n    font-size: 14px;\n    box-shadow: none; }\n  date-input-polyfill select, date-input-polyfill button {\n    border: 0;\n    border-bottom: 1px solid #E0E0E0;\n    height: 24px;\n    vertical-align: top; }\n  date-input-polyfill select {\n    width: 50%; }\n    date-input-polyfill select:first-of-type {\n      border-right: 1px solid #E0E0E0;\n      width: 30%; }\n  date-input-polyfill button {\n    padding: 0;\n    width: 20%;\n    background: #E0E0E0; }\n  date-input-polyfill table {\n    border-collapse: collapse; }\n  date-input-polyfill th, date-input-polyfill td {\n    width: 32px;\n    padding: 4px;\n    text-align: center; }\n  date-input-polyfill td[data-day] {\n    cursor: pointer; }\n    date-input-polyfill td[data-day]:hover {\n      background: #E0E0E0; }\n  date-input-polyfill [data-selected] {\n    font-weight: bold;\n    background: #D8EAF6; }\n\ninput[data-has-picker]::-ms-clear {\n  display: none; }\n');
        var e = function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            },
            t = function() {
                function e(e, t) {
                    for (var n, r = 0; r < t.length; r++)(n = t[r]).enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t
                }
            }(),
            n = function() {
                function n() {
                    var t = this;
                    if (e(this, n), n.instance) return n.instance;
                    this.date = new Date, this.input = null, this.isOpen = !1, this.container = document.createElement("date-input-polyfill"), this.year = document.createElement("select"), n.createRangeSelect(this.year, this.date.getFullYear() - 80, this.date.getFullYear() + 20), this.year.className = "yearSelect", this.year.addEventListener("change", function() {
                        t.date.setYear(t.year.value), t.refreshDaysMatrix()
                    }), this.container.appendChild(this.year), this.month = document.createElement("select"), this.month.className = "monthSelect", this.month.addEventListener("change", function() {
                        t.date.setMonth(t.month.value), t.refreshDaysMatrix()
                    }), this.container.appendChild(this.month), this.today = document.createElement("button"), this.today.textContent = "Today", this.today.addEventListener("click", function() {
                        t.date = new Date, t.setInput()
                    }), this.container.appendChild(this.today);
                    var r = document.createElement("table");
                    this.daysHead = document.createElement("thead"), this.days = document.createElement("tbody"), this.days.addEventListener("click", function(e) {
                        var n = e.target;
                        if (!n.hasAttribute("data-day")) return !1;
                        var r = t.days.querySelector("[data-selected]");
                        r && r.removeAttribute("data-selected"), n.setAttribute("data-selected", ""), t.date.setDate(parseInt(n.textContent)), t.setInput()
                    }), r.appendChild(this.daysHead), r.appendChild(this.days), this.container.appendChild(r), this.hide(), document.body.appendChild(this.container), document.addEventListener("click", function(e) {
                        for (var n = e.target, r = n === t.container; !r && (n = n.parentNode);) r = n === t.container;
                        "date" === e.target.getAttribute("type") || r || t.hide()
                    })
                }
                return t(n, [{
                    key: "hide",
                    value: function() {
                        this.container.setAttribute("data-open", this.isOpen = !1)
                    }
                }, {
                    key: "show",
                    value: function() {
                        this.container.setAttribute("data-open", this.isOpen = !0)
                    }
                }, {
                    key: "goto",
                    value: function(e) {
                        var t = e.getBoundingClientRect();
                        this.container.style.top = t.top + t.height + (document.documentElement.scrollTop || document.body.scrollTop) + "px", this.container.style.left = t.left + (document.documentElement.scrollLeft || document.body.scrollLeft) + "px", this.show()
                    }
                }, {
                    key: "attachTo",
                    value: function(e) {
                        return (e !== this.input || !this.isOpen) && (this.input = e, this.sync(), void this.goto(this.input.element))
                    }
                }, {
                    key: "sync",
                    value: function() {
                        this.date = this.input.element.valueAsDate ? n.absoluteDate(this.input.element.valueAsDate) : new Date, this.year.value = this.date.getFullYear(), this.month.value = this.date.getMonth(), this.refreshDaysMatrix()
                    }
                }, {
                    key: "setInput",
                    value: function() {
                        var e = this;
                        this.input.element.value = this.date.getFullYear() + "-" + ("0" + (this.date.getMonth() + 1)).slice(-2) + "-" + ("0" + this.date.getDate()).slice(-2), this.input.element.focus(), setTimeout(function() {
                            e.hide()
                        }, 100), this.pingInput()
                    }
                }, {
                    key: "refreshLocale",
                    value: function() {
                        if (this.locale === this.input.locale) return !1;
                        this.locale = this.input.locale;
                        for (var e = ["<tr>"], t = 0, r = this.input.localeText.days.length; t < r; ++t) e.push('<th scope="col">' + this.input.localeText.days[t] + "</th>");
                        this.daysHead.innerHTML = e.join(""), n.createRangeSelect(this.month, 0, 11, this.input.localeText.months, this.date.getMonth()), this.today.textContent = this.input.localeText.today
                    }
                }, {
                    key: "refreshDaysMatrix",
                    value: function() {
                        this.refreshLocale();
                        for (var e = this.date.getFullYear(), t = this.date.getMonth(), r = new Date(e, t, 1).getDay(), i = new Date(this.date.getFullYear(), t + 1, 0).getDate(), o = n.absoluteDate(this.input.element.valueAsDate) || !1, s = o && e === o.getFullYear() && t === o.getMonth(), a = [], c = 0; c < i + r; ++c)
                            if (0 == c % 7 && a.push("\n          " + (0 === c ? "" : "</tr>") + "\n          <tr>\n        "), c + 1 <= r) a.push("<td></td>");
                            else {
                                var u = c + 1 - r,
                                    l = s && o.getDate() === u;
                                a.push("<td data-day " + (l ? "data-selected" : "") + ">\n          " + u + "\n        </td>")
                            } this.days.innerHTML = a.join("")
                    }
                }, {
                    key: "pingInput",
                    value: function() {
                        var e, t;
                        try {
                            e = new Event("input"), t = new Event("change")
                        } catch (n) {
                            (e = document.createEvent("KeyboardEvent")).initEvent("input", !0, !1), (t = document.createEvent("KeyboardEvent")).initEvent("change", !0, !1)
                        }
                        this.input.element.dispatchEvent(e), this.input.element.dispatchEvent(t)
                    }
                }], [{
                    key: "createRangeSelect",
                    value: function(e, t, n, r, i) {
                        e.innerHTML = "";
                        for (var o, s = t; s <= n; ++s) {
                            o = document.createElement("option"), e.appendChild(o);
                            var a = r ? r[s - t] : s;
                            o.text = a, o.value = s, s === i && (o.selected = "selected")
                        }
                        return e
                    }
                }, {
                    key: "absoluteDate",
                    value: function(e) {
                        return e && new Date(e.getTime() + 60 * e.getTimezoneOffset() * 1e3)
                    }
                }]), n
            }();
        n.instance = null;
        var r = {
                "en_en-US": {
                    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    today: "Today",
                    format: "M/D/Y"
                },
                "en-GB": {
                    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    today: "Today",
                    format: "D/M/Y"
                },
                "zh_zh-CN": {
                    days: ["\u661f\u671f\u5929", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d"],
                    months: ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
                    today: "\u4eca\u5929",
                    format: "Y/M/D"
                },
                "zh-Hans_zh-Hans-CN": {
                    days: ["\u5468\u65e5", "\u5468\u4e00", "\u5468\u4e8c", "\u5468\u4e09", "\u5468\u56db", "\u5468\u4e94", "\u5468\u516d"],
                    months: ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
                    today: "\u4eca\u5929",
                    format: "Y/M/D"
                },
                "zh-Hant_zh-Hant-TW": {
                    days: ["\u9031\u65e5", "\u9031\u4e00", "\u9031\u4e8c", "\u9031\u4e09", "\u9031\u56db", "\u9031\u4e94", "\u9031\u516d"],
                    months: ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
                    today: "\u4eca\u5929",
                    format: "Y/M/D"
                },
                "de_de-DE": {
                    days: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                    months: ["Januar", "Februar", "M\xe4rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
                    today: "Heute",
                    format: "D.M.Y"
                },
                "da_da-DA": {
                    days: ["S\xf8n", "Man", "Tirs", "Ons", "Tors", "Fre", "L\xf8r"],
                    months: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"],
                    today: "I dag",
                    format: "D/M/Y"
                },
                es: {
                    days: ["Dom", "Lun", "Mar", "Mi\xe9", "Jue", "Vie", "S\xe1b"],
                    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                    today: "Hoy",
                    format: "D/M/Y"
                },
                hi: {
                    days: ["\u0930\u0935\u093f", "\u0938\u094b\u092e", "\u092e\u0902\u0917\u0932", "\u092c\u0941\u0927", "\u0917\u0941\u0930\u0941", "\u0936\u0941\u0915\u094d\u0930", "\u0936\u0928\u093f"],
                    months: ["\u091c\u0928\u0935\u0930\u0940", "\u092b\u0930\u0935\u0930\u0940", "\u092e\u093e\u0930\u094d\u091a", "\u0905\u092a\u094d\u0930\u0947\u0932", "\u092e\u0948", "\u091c\u0942\u0928", "\u091c\u0942\u0932\u093e\u0908", "\u0905\u0917\u0938\u094d\u0924", "\u0938\u093f\u0924\u092e\u094d\u092c\u0930", "\u0906\u0915\u094d\u091f\u094b\u092c\u0930", "\u0928\u0935\u092e\u094d\u092c\u0930", "\u0926\u093f\u0938\u092e\u094d\u092c\u0930"],
                    today: "\u0906\u091c",
                    format: "D/M/Y"
                },
                pt: {
                    days: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S\xe1b"],
                    months: ["Janeiro", "Fevereiro", "Mar\xe7o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                    today: "Hoje",
                    format: "D/M/Y"
                },
                ja: {
                    days: ["\u65e5", "\u6708", "\u706b", "\u6c34", "\u6728", "\u91d1", "\u571f"],
                    months: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
                    today: "\u4eca\u65e5",
                    format: "Y/M/D"
                },
                "nl_nl-NL_nl-BE": {
                    days: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"],
                    months: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
                    today: "Vandaag",
                    format: "D/M/Y"
                },
                "tr_tr-TR": {
                    days: ["Pzr", "Pzt", "Sal", "\xc7r\u015f", "Pr\u015f", "Cum", "Cmt"],
                    months: ["Ocak", "\u015eubat", "Mart", "Nisan", "May\u0131s", "Haziran", "Temmuz", "A\u011fustos", "Eyl\xfcl", "Ekim", "Kas\u0131m", "Aral\u0131k"],
                    today: "Bug\xfcn",
                    format: "D/M/Y"
                },
                "fr_fr-FR": {
                    days: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                    months: ["Janvier", "F\xe9vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Ao\xfbt", "Septembre", "Octobre", "Novembre", "D\xe9cembre"],
                    today: "Auj.",
                    format: "D/M/Y"
                },
                "uk_uk-UA": {
                    days: ["\u041d\u0434", "\u041f\u043d", "\u0412\u0442", "\u0421\u0440", "\u0427\u0442", "\u041f\u0442", "\u0421\u0431"],
                    months: ["\u0421\u0456\u0447\u0435\u043d\u044c", "\u041b\u044e\u0442\u0438\u0439", "\u0411\u0435\u0440\u0435\u0437\u0435\u043d\u044c", "\u041a\u0432\u0456\u0442\u0435\u043d\u044c", "\u0422\u0440\u0430\u0432\u0435\u043d\u044c", "\u0427\u0435\u0440\u0432\u0435\u043d\u044c", "\u041b\u0438\u043f\u0435\u043d\u044c", "\u0421\u0435\u0440\u043f\u0435\u043d\u044c", "\u0412\u0435\u0440\u0435\u0441\u0435\u043d\u044c", "\u0416\u043e\u0432\u0442\u0435\u043d\u044c", "\u041b\u0438\u0441\u0442\u043e\u043f\u0430\u0434", "\u0413\u0440\u0443\u0434\u0435\u043d\u044c"],
                    today: "\u0421\u044c\u043e\u0433\u043e\u0434\u043d\u0456",
                    format: "D.M.Y"
                },
                it: {
                    days: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
                    months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "ottobre", "Novembre", "Dicembre"],
                    today: "Oggi",
                    format: "D/M/Y"
                },
                pl: {
                    days: ["Nie", "Pon", "Wto", "\u015aro", "Czw", "Pt", "Sob"],
                    months: ["Stycze\u0144", "Luty", "Marzec", "Kwiecie\u0144", "Maj", "Czerwiec", "Lipiec", "Sierpie\u0144", "Wrzesie\u0144", "Pa\u017adziernik", "Listopad", "Grudzie\u0144"],
                    today: "Dzisiaj",
                    format: "D.M.Y"
                },
                cs: {
                    days: ["Po", "\xdat", "St", "\u010ct", "P\xe1", "So", "Ne"],
                    months: ["Leden", "\xdanor", "B\u0159ezen", "Duben", "Kv\u011bten", "\u010cerven", "\u010cervenec", "Srpen", "Z\xe1\u0159\xed", "\u0158\xedjen", "Listopad", "Prosinec"],
                    today: "Dnes",
                    format: "D.M.Y"
                },
                ru: {
                    days: ["\u0412\u0441", "\u041f\u043d", "\u0412\u0442", "\u0421\u0440", "\u0427\u0442", "\u041f\u0442", "\u0421\u0431"],
                    months: ["\u042f\u043d\u0432\u0430\u0440\u044c", "\u0424\u0435\u0432\u0440\u0430\u043b\u044c", "\u041c\u0430\u0440\u0442", "\u0410\u043f\u0440\u0435\u043b\u044c", "\u041c\u0430\u0439", "\u0418\u044e\u043d\u044c", "\u0418\u044e\u043b\u044c", "\u0410\u0432\u0433\u0443\u0441\u0442", "\u0421\u0435\u043d\u0442\u044f\u0431\u0440\u044c", "\u041e\u043a\u0442\u044f\u0431\u0440\u044c", "\u041d\u043e\u044f\u0431\u0440\u044c", "\u0414\u0435\u043a\u0430\u0431\u0440\u044c"],
                    today: "\u0421\u0435\u0433\u043e\u0434\u043d\u044f",
                    format: "D.M.Y"
                }
            },
            i = function() {
                function i(t) {
                    var r = this;
                    e(this, i), this.element = t, this.element.setAttribute("data-has-picker", "");
                    for (var o = this.element, s = ""; o.parentNode && !(s = o.getAttribute("lang"));) o = o.parentNode;
                    this.locale = s || "en", this.localeText = this.getLocaleText(), Object.defineProperties(this.element, {
                        value: {
                            get: function() {
                                return r.element.polyfillValue
                            },
                            set: function(e) {
                                if (!/^\d{4}-\d{2}-\d{2}$/.test(e)) return r.element.polyfillValue = "", r.element.setAttribute("value", ""), !1;
                                r.element.polyfillValue = e;
                                var t = e.split("-");
                                r.element.setAttribute("value", r.localeText.format.replace("Y", t[0]).replace("M", t[1]).replace("D", t[2]))
                            }
                        },
                        valueAsDate: {
                            get: function() {
                                return r.element.polyfillValue ? new Date(r.element.polyfillValue) : null
                            },
                            set: function(e) {
                                r.element.value = e.toISOString().slice(0, 10)
                            }
                        },
                        valueAsNumber: {
                            get: function() {
                                return r.element.value ? r.element.valueAsDate.getTime() : NaN
                            },
                            set: function(e) {
                                r.element.valueAsDate = new Date(e)
                            }
                        }
                    }), this.element.value = this.element.getAttribute("value");
                    var a = function() {
                        n.instance.attachTo(r)
                    };
                    this.element.addEventListener("focus", a), this.element.addEventListener("mousedown", a), this.element.addEventListener("mouseup", a), this.element.addEventListener("keydown", function(e) {
                        var t = new Date;
                        switch (e.keyCode) {
                            case 27:
                                n.instance.hide();
                                break;
                            case 38:
                                r.element.valueAsDate && (t.setDate(r.element.valueAsDate.getDate() + 1), r.element.valueAsDate = t, n.instance.pingInput());
                                break;
                            case 40:
                                r.element.valueAsDate && (t.setDate(r.element.valueAsDate.getDate() - 1), r.element.valueAsDate = t, n.instance.pingInput())
                        }
                        n.instance.sync()
                    })
                }
                return t(i, [{
                    key: "getLocaleText",
                    value: function() {
                        var e = this.locale.toLowerCase();
                        for (var t in r) {
                            if (~t.split("_").map(function(e) {
                                    return e.toLowerCase()
                                }).indexOf(e)) return r[t]
                        }
                        for (var n in r) {
                            if (~n.split("_").map(function(e) {
                                    return e.toLowerCase()
                                }).indexOf(e.substr(0, 2))) return r[n]
                        }
                        return this.locale = "en", this.getLocaleText()
                    }
                }], [{
                    key: "supportsDateInput",
                    value: function() {
                        var e = document.createElement("input");
                        e.setAttribute("type", "date");
                        var t = "not-a-date";
                        return e.setAttribute("value", t), document.currentScript && !document.currentScript.hasAttribute("data-nodep-date-input-polyfill-debug") && e.value !== t
                    }
                }, {
                    key: "addPickerToDateInputs",
                    value: function() {
                        var e = document.querySelectorAll('input[type="date"]:not([data-has-picker]):not([readonly])'),
                            t = e.length;
                        if (!t) return !1;
                        for (var n = 0; n < t; ++n) new i(e[n])
                    }
                }]), i
            }();
        if (!i.supportsDateInput()) {
            var o = function() {
                n.instance = new n, i.addPickerToDateInputs(), document.querySelector("body").addEventListener("mousedown", function() {
                    i.addPickerToDateInputs()
                })
            };
            if ("complete" === document.readyState) o();
            else {
                var s = !1;
                document.addEventListener("DOMContentLoaded", function() {
                    s = !0, o()
                }), window.addEventListener("load", function() {
                    s || o()
                })
            }
        }
    })()
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e.keys().map(function(t) {
            return function(e, t) {
                var n = i(t);
                if (n) return function(e, t) {
                    var n = e.default;
                    if ("function" == typeof n) return {
                        identifier: t,
                        controllerConstructor: n
                    }
                }(e(t), n)
            }(e, t)
        }).filter(function(e) {
            return e
        })
    }

    function i(e) {
        var t = (e.match(/^(?:\.\/)?(.+)(?:[_-]controller\..+?)$/) || [])[1];
        if (t) return t.replace(/_/g, "-").replace(/\//g, "--")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n.d(t, "definitionsFromContext", function() {
        return r
    }), n.d(t, "identifierForContextKey", function() {
        return i
    })
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
            value: !0
        }), n.d(t, "clearCache", function() {
            return ge
        }), n.d(t, "connectStreamSource", function() {
            return pe
        }), n.d(t, "disconnectStreamSource", function() {
            return fe
        }), n.d(t, "navigator", function() {
            return ue
        }), n.d(t, "registerAdapter", function() {
            return he
        }), n.d(t, "renderStreamMessage", function() {
            return me
        }), n.d(t, "setProgressBarDelay", function() {
            return ye
        }), n.d(t, "start", function() {
            return le
        }), n.d(t, "visit", function() {
            return de
        }),
        function() {
            if (void 0 === window.Reflect || void 0 === window.customElements || window.customElements.polyfillWrapFlushCallback) return;
            const e = HTMLElement,
                t = function() {
                    return Reflect.construct(e, [], this.constructor)
                };
            window.HTMLElement = t, HTMLElement.prototype = e.prototype, HTMLElement.prototype.constructor = HTMLElement, Object.setPrototypeOf(HTMLElement, e)
        }();
    const r = new WeakMap;

    function i(e) {
        const t = function(e) {
            const t = e instanceof Element ? e : e instanceof Node ? e.parentElement : null,
                n = t ? t.closest("input, button") : null;
            return "submit" == (null === n || void 0 === n ? void 0 : n.type) ? n : null
        }(e.target);
        t && t.form && r.set(t.form, t)
    }
    var o, s, a, c;
    "SubmitEvent" in window || (addEventListener("click", i, !0), Object.defineProperty(Event.prototype, "submitter", {
            get() {
                if ("submit" == this.type && this.target instanceof HTMLFormElement) return r.get(this.target)
            }
        })),
        function(e) {
            e.eager = "eager", e.lazy = "lazy"
        }(o || (o = {}));
    class u extends HTMLElement {
        constructor() {
            super(), this.loaded = Promise.resolve(), this.delegate = new u.delegateConstructor(this)
        }
        static get observedAttributes() {
            return ["loading", "src"]
        }
        connectedCallback() {
            this.delegate.connect()
        }
        disconnectedCallback() {
            this.delegate.disconnect()
        }
        attributeChangedCallback(e) {
            "loading" == e ? this.delegate.loadingStyleChanged() : "src" == e && this.delegate.sourceURLChanged()
        }
        get src() {
            return this.getAttribute("src")
        }
        set src(e) {
            e ? this.setAttribute("src", e) : this.removeAttribute("src")
        }
        get loading() {
            return function(e) {
                switch (e.toLowerCase()) {
                    case "lazy":
                        return o.lazy;
                    default:
                        return o.eager
                }
            }(this.getAttribute("loading") || "")
        }
        set loading(e) {
            e ? this.setAttribute("loading", e) : this.removeAttribute("loading")
        }
        get disabled() {
            return this.hasAttribute("disabled")
        }
        set disabled(e) {
            e ? this.setAttribute("disabled", "") : this.removeAttribute("disabled")
        }
        get autoscroll() {
            return this.hasAttribute("autoscroll")
        }
        set autoscroll(e) {
            e ? this.setAttribute("autoscroll", "") : this.removeAttribute("autoscroll")
        }
        get complete() {
            return !this.delegate.isLoading
        }
        get isActive() {
            return this.ownerDocument === document && !this.isPreview
        }
        get isPreview() {
            var e, t;
            return null === (t = null === (e = this.ownerDocument) || void 0 === e ? void 0 : e.documentElement) || void 0 === t ? void 0 : t.hasAttribute("data-turbo-preview")
        }
    }

    function l(e) {
        const t = document.createElement("a");
        return t.href = e.toString(), new URL(t.href)
    }

    function h(e) {
        let t;
        return e.hash ? e.hash.slice(1) : (t = e.href.match(/#(.*)$/)) ? t[1] : ""
    }

    function d(e) {
        return (function(e) {
            return function(e) {
                return e.pathname.split("/").slice(1)
            }(e).slice(-1)[0]
        }(e).match(/\.[^.]*$/) || [])[0] || ""
    }

    function p(e, t) {
        const n = function(e) {
            return t = e.origin + e.pathname, t.endsWith("/") ? t : t + "/";
            var t
        }(t);
        return e.href === l(n).href || e.href.startsWith(n)
    }

    function f(e) {
        const t = e.hash.length;
        return t < 2 ? e.href : e.href.slice(0, -t)
    }
    class m {
        constructor(e) {
            this.response = e
        }
        get succeeded() {
            return this.response.ok
        }
        get failed() {
            return !this.succeeded
        }
        get clientError() {
            return this.statusCode >= 400 && this.statusCode <= 499
        }
        get serverError() {
            return this.statusCode >= 500 && this.statusCode <= 599
        }
        get redirected() {
            return this.response.redirected
        }
        get location() {
            return l(this.response.url)
        }
        get isHTML() {
            return this.contentType && this.contentType.match(/^(?:text\/([^\s;,]+\b)?html|application\/xhtml\+xml)\b/)
        }
        get statusCode() {
            return this.response.status
        }
        get contentType() {
            return this.header("Content-Type")
        }
        get responseText() {
            return this.response.text()
        }
        get responseHTML() {
            return this.isHTML ? this.response.text() : Promise.resolve(void 0)
        }
        header(e) {
            return this.response.headers.get(e)
        }
    }

    function g(e, {
        target: t,
        cancelable: n,
        detail: r
    } = {}) {
        const i = new CustomEvent(e, {
            cancelable: n,
            bubbles: !0,
            detail: r
        });
        return (t || document.documentElement).dispatchEvent(i), i
    }

    function y() {
        return new Promise(e => requestAnimationFrame(() => e()))
    }

    function v(e = "") {
        return (new DOMParser).parseFromString(e, "text/html")
    }

    function b(e, ...t) {
        const n = function(e, t) {
                return e.reduce((e, n, r) => {
                    const i = void 0 == t[r] ? "" : t[r];
                    return e + n + i
                }, "")
            }(e, t).replace(/^\n/, "").split("\n"),
            r = n[0].match(/^\s+/),
            i = r ? r[0].length : 0;
        return n.map(e => e.slice(i)).join("\n")
    }

    function w() {
        return Array.apply(null, {
            length: 36
        }).map((e, t) => 8 == t || 13 == t || 18 == t || 23 == t ? "-" : 14 == t ? "4" : 19 == t ? (Math.floor(4 * Math.random()) + 8).toString(16) : Math.floor(15 * Math.random()).toString(16)).join("")
    }! function(e) {
        e[e.get = 0] = "get", e[e.post = 1] = "post", e[e.put = 2] = "put", e[e.patch = 3] = "patch", e[e.delete = 4] = "delete"
    }(s || (s = {}));
    class E {
        constructor(e, t, n, r = new URLSearchParams) {
            this.abortController = new AbortController, this.delegate = e, this.method = t, this.isIdempotent ? this.url = function(e, t) {
                const n = new URLSearchParams(e.search);
                for (const [r, i] of t) i instanceof File || (n.has(r) ? (n.delete(r), e.searchParams.set(r, i)) : e.searchParams.append(r, i));
                return e
            }(n, [...r.entries()]) : (this.body = r, this.url = n)
        }
        get location() {
            return this.url
        }
        get params() {
            return this.url.searchParams
        }
        get entries() {
            return this.body ? Array.from(this.body.entries()) : []
        }
        cancel() {
            this.abortController.abort()
        }
        async perform() {
            const {
                fetchOptions: e
            } = this;
            g("turbo:before-fetch-request", {
                detail: {
                    fetchOptions: e
                }
            });
            try {
                this.delegate.requestStarted(this);
                const t = await fetch(this.url.href, e);
                return await this.receive(t)
            } catch (e) {
                throw this.delegate.requestErrored(this, e), e
            } finally {
                this.delegate.requestFinished(this)
            }
        }
        async receive(e) {
            const t = new m(e);
            return g("turbo:before-fetch-response", {
                cancelable: !0,
                detail: {
                    fetchResponse: t
                }
            }).defaultPrevented ? this.delegate.requestPreventedHandlingResponse(this, t) : t.succeeded ? this.delegate.requestSucceededWithResponse(this, t) : this.delegate.requestFailedWithResponse(this, t), t
        }
        get fetchOptions() {
            return {
                method: s[this.method].toUpperCase(),
                credentials: "same-origin",
                headers: this.headers,
                redirect: "follow",
                body: this.body,
                signal: this.abortSignal
            }
        }
        get isIdempotent() {
            return this.method == s.get
        }
        get headers() {
            const e = Object.assign({}, this.defaultHeaders);
            return "function" == typeof this.delegate.prepareHeadersForRequest && this.delegate.prepareHeadersForRequest(e, this), e
        }
        get abortSignal() {
            return this.abortController.signal
        }
        get defaultHeaders() {
            return {
                Accept: "text/html, application/xhtml+xml"
            }
        }
    }
    class S {
        constructor(e, t) {
            this.started = !1, this.intersect = (e => {
                const t = e.slice(-1)[0];
                (null === t || void 0 === t ? void 0 : t.isIntersecting) && this.delegate.elementAppearedInViewport(this.element)
            }), this.delegate = e, this.element = t, this.intersectionObserver = new IntersectionObserver(this.intersect)
        }
        start() {
            this.started || (this.started = !0, this.intersectionObserver.observe(this.element))
        }
        stop() {
            this.started && (this.started = !1, this.intersectionObserver.unobserve(this.element))
        }
    }
    class O {
        constructor(e) {
            this.templateElement = document.createElement("template"), this.templateElement.innerHTML = e
        }
        static wrap(e) {
            return "string" == typeof e ? new this(e) : e
        }
        get fragment() {
            const e = document.createDocumentFragment();
            for (const t of this.foreignElements) e.appendChild(document.importNode(t, !0));
            return e
        }
        get foreignElements() {
            return this.templateChildren.reduce((e, t) => "turbo-stream" == t.tagName.toLowerCase() ? [...e, t] : e, [])
        }
        get templateChildren() {
            return Array.from(this.templateElement.content.children)
        }
    }
    O.contentType = "text/vnd.turbo-stream.html",
        function(e) {
            e[e.initialized = 0] = "initialized", e[e.requesting = 1] = "requesting", e[e.waiting = 2] = "waiting", e[e.receiving = 3] = "receiving", e[e.stopping = 4] = "stopping", e[e.stopped = 5] = "stopped"
        }(a || (a = {})),
        function(e) {
            e.urlEncoded = "application/x-www-form-urlencoded", e.multipart = "multipart/form-data", e.plain = "text/plain"
        }(c || (c = {}));
    class _ {
        constructor(e, t, n, r = !1) {
            this.state = a.initialized, this.delegate = e, this.formElement = t, this.submitter = n, this.formData = function(e, t) {
                const n = new FormData(e),
                    r = null === t || void 0 === t ? void 0 : t.getAttribute("name"),
                    i = null === t || void 0 === t ? void 0 : t.getAttribute("value");
                r && n.get(r) != i && n.append(r, i || "");
                return n
            }(t, n), this.fetchRequest = new E(this, this.method, this.location, this.body), this.mustRedirect = r
        }
        get method() {
            var e;
            return function(e) {
                switch (e.toLowerCase()) {
                    case "get":
                        return s.get;
                    case "post":
                        return s.post;
                    case "put":
                        return s.put;
                    case "patch":
                        return s.patch;
                    case "delete":
                        return s.delete
                }
            }(((null === (e = this.submitter) || void 0 === e ? void 0 : e.getAttribute("formmethod")) || this.formElement.getAttribute("method") || "").toLowerCase()) || s.get
        }
        get action() {
            var e;
            return (null === (e = this.submitter) || void 0 === e ? void 0 : e.getAttribute("formaction")) || this.formElement.action
        }
        get location() {
            return l(this.action)
        }
        get body() {
            return this.enctype == c.urlEncoded || this.method == s.get ? new URLSearchParams(this.stringFormData) : this.formData
        }
        get enctype() {
            var e;
            return function(e) {
                switch (e.toLowerCase()) {
                    case c.multipart:
                        return c.multipart;
                    case c.plain:
                        return c.plain;
                    default:
                        return c.urlEncoded
                }
            }((null === (e = this.submitter) || void 0 === e ? void 0 : e.getAttribute("formenctype")) || this.formElement.enctype)
        }
        get stringFormData() {
            return [...this.formData].reduce((e, [t, n]) => e.concat("string" == typeof n ? [
                [t, n]
            ] : []), [])
        }
        async start() {
            const {
                initialized: e,
                requesting: t
            } = a;
            if (this.state == e) return this.state = t, this.fetchRequest.perform()
        }
        stop() {
            const {
                stopping: e,
                stopped: t
            } = a;
            if (this.state != e && this.state != t) return this.state = e, this.fetchRequest.cancel(), !0
        }
        prepareHeadersForRequest(e, t) {
            if (!t.isIdempotent) {
                const t = function(e) {
                    if (null != e) {
                        const t = document.cookie ? document.cookie.split("; ") : [],
                            n = t.find(t => t.startsWith(e));
                        if (n) {
                            const e = n.split("=").slice(1).join("=");
                            return e ? decodeURIComponent(e) : void 0
                        }
                    }
                }(k("csrf-param")) || k("csrf-token");
                t && (e["X-CSRF-Token"] = t), e.Accept = [O.contentType, e.Accept].join(", ")
            }
        }
        requestStarted(e) {
            this.state = a.waiting, g("turbo:submit-start", {
                target: this.formElement,
                detail: {
                    formSubmission: this
                }
            }), this.delegate.formSubmissionStarted(this)
        }
        requestPreventedHandlingResponse(e, t) {
            this.result = {
                success: t.succeeded,
                fetchResponse: t
            }
        }
        requestSucceededWithResponse(e, t) {
            if (t.clientError || t.serverError) this.delegate.formSubmissionFailedWithResponse(this, t);
            else if (this.requestMustRedirect(e) && function(e) {
                    return 200 == e.statusCode && !e.redirected
                }(t)) {
                const e = new Error("Form responses must redirect to another location");
                this.delegate.formSubmissionErrored(this, e)
            } else this.state = a.receiving, this.result = {
                success: !0,
                fetchResponse: t
            }, this.delegate.formSubmissionSucceededWithResponse(this, t)
        }
        requestFailedWithResponse(e, t) {
            this.result = {
                success: !1,
                fetchResponse: t
            }, this.delegate.formSubmissionFailedWithResponse(this, t)
        }
        requestErrored(e, t) {
            this.result = {
                success: !1,
                error: t
            }, this.delegate.formSubmissionErrored(this, t)
        }
        requestFinished(e) {
            this.state = a.stopped, g("turbo:submit-end", {
                target: this.formElement,
                detail: Object.assign({
                    formSubmission: this
                }, this.result)
            }), this.delegate.formSubmissionFinished(this)
        }
        requestMustRedirect(e) {
            return !e.isIdempotent && this.mustRedirect
        }
    }

    function k(e) {
        const t = document.querySelector(`meta[name="${e}"]`);
        return t && t.content
    }
    class T {
        constructor(e) {
            this.element = e
        }
        get children() {
            return [...this.element.children]
        }
        hasAnchor(e) {
            return null != this.getElementForAnchor(e)
        }
        getElementForAnchor(e) {
            try {
                return this.element.querySelector(`[id='${e}'], a[name='${e}']`)
            } catch (e) {
                return null
            }
        }
        get firstAutofocusableElement() {
            return this.element.querySelector("[autofocus]")
        }
        get permanentElements() {
            return [...this.element.querySelectorAll("[id][data-turbo-permanent]")]
        }
        getPermanentElementById(e) {
            return this.element.querySelector(`#${e}[data-turbo-permanent]`)
        }
        getPermanentElementsPresentInSnapshot(e) {
            return this.permanentElements.filter(({
                id: t
            }) => e.getPermanentElementById(t))
        }
    }
    class A {
        constructor(e, t) {
            this.submitBubbled = (e => {
                if (e.target instanceof HTMLFormElement) {
                    const t = e.target,
                        n = e.submitter || void 0;
                    this.delegate.shouldInterceptFormSubmission(t, n) && (e.preventDefault(), e.stopImmediatePropagation(), this.delegate.formSubmissionIntercepted(t, n))
                }
            }), this.delegate = e, this.element = t
        }
        start() {
            this.element.addEventListener("submit", this.submitBubbled)
        }
        stop() {
            this.element.removeEventListener("submit", this.submitBubbled)
        }
    }
    class L {
        constructor(e, t) {
            this.delegate = e, this.element = t
        }
        scrollToAnchor(e) {
            const t = this.snapshot.getElementForAnchor(e);
            t ? this.scrollToElement(t) : this.scrollToPosition({
                x: 0,
                y: 0
            })
        }
        scrollToElement(e) {
            e.scrollIntoView()
        }
        scrollToPosition({
            x: e,
            y: t
        }) {
            this.scrollRoot.scrollTo(e, t)
        }
        get scrollRoot() {
            return window
        }
        async render(e) {
            if (this.renderer) throw new Error("rendering is already in progress");
            const {
                isPreview: t,
                shouldRender: n,
                newSnapshot: r
            } = e;
            if (n) try {
                this.renderer = e, this.prepareToRenderSnapshot(e), this.delegate.viewWillRenderSnapshot(r, t), await this.renderSnapshot(e), this.delegate.viewRenderedSnapshot(r, t), this.finishRenderingSnapshot(e)
            } finally {
                delete this.renderer
            } else this.invalidate()
        }
        invalidate() {
            this.delegate.viewInvalidated()
        }
        prepareToRenderSnapshot(e) {
            this.markAsPreview(e.isPreview), e.prepareToRender()
        }
        markAsPreview(e) {
            e ? this.element.setAttribute("data-turbo-preview", "") : this.element.removeAttribute("data-turbo-preview")
        }
        async renderSnapshot(e) {
            await e.render()
        }
        finishRenderingSnapshot(e) {
            e.finishRendering()
        }
    }
    class P extends L {
        invalidate() {
            this.element.innerHTML = ""
        }
        get snapshot() {
            return new T(this.element)
        }
    }
    class C {
        constructor(e, t) {
            this.clickBubbled = (e => {
                this.respondsToEventTarget(e.target) ? this.clickEvent = e : delete this.clickEvent
            }), this.linkClicked = (e => {
                this.clickEvent && this.respondsToEventTarget(e.target) && e.target instanceof Element && this.delegate.shouldInterceptLinkClick(e.target, e.detail.url) && (this.clickEvent.preventDefault(), e.preventDefault(), this.delegate.linkClickIntercepted(e.target, e.detail.url)), delete this.clickEvent
            }), this.willVisit = (() => {
                delete this.clickEvent
            }), this.delegate = e, this.element = t
        }
        start() {
            this.element.addEventListener("click", this.clickBubbled), document.addEventListener("turbo:click", this.linkClicked), document.addEventListener("turbo:before-visit", this.willVisit)
        }
        stop() {
            this.element.removeEventListener("click", this.clickBubbled), document.removeEventListener("turbo:click", this.linkClicked), document.removeEventListener("turbo:before-visit", this.willVisit)
        }
        respondsToEventTarget(e) {
            const t = e instanceof Element ? e : e instanceof Node ? e.parentElement : null;
            return t && t.closest("turbo-frame, html") == this.element
        }
    }
    class M {
        constructor(e, t, n) {
            this.currentSnapshot = e, this.newSnapshot = t, this.isPreview = n, this.promise = new Promise((e, t) => this.resolvingFunctions = {
                resolve: e,
                reject: t
            })
        }
        get shouldRender() {
            return !0
        }
        prepareToRender() {}
        finishRendering() {
            this.resolvingFunctions && (this.resolvingFunctions.resolve(), delete this.resolvingFunctions)
        }
        createScriptElement(e) {
            if ("false" == e.getAttribute("data-turbo-eval")) return e; {
                const t = document.createElement("script");
                return t.textContent = e.textContent, t.async = !1,
                    function(e, t) {
                        for (const {
                                name: n,
                                value: r
                            } of [...t.attributes]) e.setAttribute(n, r)
                    }(t, e), t
            }
        }
        preservingPermanentElements(e) {
            const t = (n = this.currentSnapshot, r = this.newSnapshot, n.getPermanentElementsPresentInSnapshot(r).reduce((e, t) => {
                const n = r.getPermanentElementById(t.id);
                if (n) {
                    const r = function(e) {
                        const t = document.createElement("meta");
                        return t.setAttribute("name", "turbo-permanent-placeholder"), t.setAttribute("content", e.id), {
                            element: t,
                            permanentElement: e
                        }
                    }(t);
                    return j(t, r.element), j(n, t), [...e, r]
                }
                return e
            }, []));
            var n, r;
            e(),
                function(e) {
                    for (const {
                            element: t,
                            permanentElement: n
                        } of e) {
                        const e = n.cloneNode(!0);
                        j(t, e)
                    }
                }(t)
        }
        focusFirstAutofocusableElement() {
            const e = this.newSnapshot.firstAutofocusableElement;
            (function(e) {
                return e && "function" == typeof e.focus
            })(e) && e.focus()
        }
        get currentElement() {
            return this.currentSnapshot.element
        }
        get newElement() {
            return this.newSnapshot.element
        }
    }

    function j(e, t) {
        const n = e.parentElement;
        if (n) return n.replaceChild(t, e)
    }
    class R extends M {
        get shouldRender() {
            return !0
        }
        async render() {
            await y(), this.preservingPermanentElements(() => {
                this.loadFrameElement()
            }), this.scrollFrameIntoView(), await y(), this.focusFirstAutofocusableElement()
        }
        loadFrameElement() {
            var e;
            const t = document.createRange();
            t.selectNodeContents(this.currentElement), t.deleteContents();
            const n = this.newElement,
                r = null === (e = n.ownerDocument) || void 0 === e ? void 0 : e.createRange();
            r && (r.selectNodeContents(n), this.currentElement.appendChild(r.extractContents()))
        }
        scrollFrameIntoView() {
            if (this.currentElement.autoscroll || this.newElement.autoscroll) {
                const t = this.currentElement.firstElementChild,
                    n = "end" == (e = this.currentElement.getAttribute("data-autoscroll-block")) || "start" == e || "center" == e || "nearest" == e ? e : "end";
                if (t) return t.scrollIntoView({
                    block: n
                }), !0
            }
            var e;
            return !1
        }
    }

    function F(e) {
        if (null != e) {
            const t = document.getElementById(e);
            if (t instanceof u) return t
        }
    }

    function D(e) {
        if (e && e.ownerDocument !== document && (e = document.importNode(e, !0)), e instanceof u) return e
    }
    const I = {
        append() {
            var e;
            null === (e = this.targetElement) || void 0 === e || e.append(this.templateContent)
        },
        prepend() {
            var e;
            null === (e = this.targetElement) || void 0 === e || e.prepend(this.templateContent)
        },
        remove() {
            var e;
            null === (e = this.targetElement) || void 0 === e || e.remove()
        },
        replace() {
            var e;
            null === (e = this.targetElement) || void 0 === e || e.replaceWith(this.templateContent)
        },
        update() {
            this.targetElement && (this.targetElement.innerHTML = "", this.targetElement.append(this.templateContent))
        }
    };
    u.delegateConstructor = class {
        constructor(e) {
            this.resolveVisitPromise = (() => {}), this.element = e, this.view = new P(this, this.element), this.appearanceObserver = new S(this, this.element), this.linkInterceptor = new C(this, this.element), this.formInterceptor = new A(this, this.element)
        }
        connect() {
            this.loadingStyle == o.lazy && this.appearanceObserver.start(), this.linkInterceptor.start(), this.formInterceptor.start()
        }
        disconnect() {
            this.appearanceObserver.stop(), this.linkInterceptor.stop(), this.formInterceptor.stop()
        }
        sourceURLChanged() {
            this.loadingStyle == o.eager && this.loadSourceURL()
        }
        loadingStyleChanged() {
            this.loadingStyle == o.lazy ? this.appearanceObserver.start() : (this.appearanceObserver.stop(), this.loadSourceURL())
        }
        async loadSourceURL() {
            if (this.isActive && this.sourceURL && this.sourceURL != this.loadingURL) try {
                this.loadingURL = this.sourceURL, this.element.loaded = this.visit(this.sourceURL), this.appearanceObserver.stop(), await this.element.loaded
            } finally {
                delete this.loadingURL
            }
        }
        async loadResponse(e) {
            try {
                const t = await e.responseHTML;
                if (t) {
                    const {
                        body: e
                    } = v(t), n = new T(await this.extractForeignFrameElement(e)), r = new R(this.view.snapshot, n, !1);
                    await this.view.render(r)
                }
            } catch (e) {
                console.error(e), this.view.invalidate()
            }
        }
        elementAppearedInViewport(e) {
            this.loadSourceURL()
        }
        shouldInterceptLinkClick(e, t) {
            return this.shouldInterceptNavigation(e)
        }
        linkClickIntercepted(e, t) {
            this.navigateFrame(e, t)
        }
        shouldInterceptFormSubmission(e) {
            return this.shouldInterceptNavigation(e)
        }
        formSubmissionIntercepted(e, t) {
            this.formSubmission && this.formSubmission.stop(), this.formSubmission = new _(this, e, t), this.formSubmission.fetchRequest.isIdempotent ? this.navigateFrame(e, this.formSubmission.fetchRequest.url.href) : this.formSubmission.start()
        }
        prepareHeadersForRequest(e, t) {
            e["Turbo-Frame"] = this.id
        }
        requestStarted(e) {
            this.element.setAttribute("busy", "")
        }
        requestPreventedHandlingResponse(e, t) {
            this.resolveVisitPromise()
        }
        async requestSucceededWithResponse(e, t) {
            await this.loadResponse(t), this.resolveVisitPromise()
        }
        requestFailedWithResponse(e, t) {
            console.error(t), this.resolveVisitPromise()
        }
        requestErrored(e, t) {
            console.error(t), this.resolveVisitPromise()
        }
        requestFinished(e) {
            this.element.removeAttribute("busy")
        }
        formSubmissionStarted(e) {}
        formSubmissionSucceededWithResponse(e, t) {
            this.findFrameElement(e.formElement).delegate.loadResponse(t)
        }
        formSubmissionFailedWithResponse(e, t) {
            this.element.delegate.loadResponse(t)
        }
        formSubmissionErrored(e, t) {}
        formSubmissionFinished(e) {}
        viewWillRenderSnapshot(e, t) {}
        viewRenderedSnapshot(e, t) {}
        viewInvalidated() {}
        async visit(e) {
            const t = new E(this, s.get, l(e));
            return new Promise(e => {
                this.resolveVisitPromise = (() => {
                    this.resolveVisitPromise = (() => {}), e()
                }), t.perform()
            })
        }
        navigateFrame(e, t) {
            this.findFrameElement(e).src = t
        }
        findFrameElement(e) {
            var t;
            return null !== (t = F(e.getAttribute("data-turbo-frame") || this.element.getAttribute("target"))) && void 0 !== t ? t : this.element
        }
        async extractForeignFrameElement(e) {
            let t;
            const n = CSS.escape(this.id);
            return (t = D(e.querySelector(`turbo-frame#${n}`))) ? t : (t = D(e.querySelector(`turbo-frame[src][recurse~=${n}]`))) ? (await t.loaded, await this.extractForeignFrameElement(t)) : (console.error(`Response has no matching <turbo-frame id="${n}"> element`), new u)
        }
        shouldInterceptNavigation(e) {
            const t = e.getAttribute("data-turbo-frame") || this.element.getAttribute("target");
            if (!this.enabled || "_top" == t) return !1;
            if (t) {
                const e = F(t);
                if (e) return !e.disabled
            }
            return !0
        }
        get id() {
            return this.element.id
        }
        get enabled() {
            return !this.element.disabled
        }
        get sourceURL() {
            return this.element.src
        }
        get loadingStyle() {
            return this.element.loading
        }
        get isLoading() {
            return void 0 !== this.formSubmission || void 0 !== this.loadingURL
        }
        get isActive() {
            return this.element.isActive
        }
    }, customElements.define("turbo-frame", u), customElements.define("turbo-stream", class extends HTMLElement {
        async connectedCallback() {
            try {
                await this.render()
            } catch (e) {
                console.error(e)
            } finally {
                this.disconnect()
            }
        }
        async render() {
            var e;
            return null !== (e = this.renderPromise) && void 0 !== e ? e : this.renderPromise = (async () => {
                this.dispatchEvent(this.beforeRenderEvent) && (await y(), this.performAction())
            })()
        }
        disconnect() {
            try {
                this.remove()
            } catch (e) {}
        }
        get performAction() {
            if (this.action) {
                const e = I[this.action];
                if (e) return e;
                this.raise("unknown action")
            }
            this.raise("action attribute is missing")
        }
        get targetElement() {
            var e;
            if (this.target) return null === (e = this.ownerDocument) || void 0 === e ? void 0 : e.getElementById(this.target);
            this.raise("target attribute is missing")
        }
        get templateContent() {
            return this.templateElement.content
        }
        get templateElement() {
            if (this.firstElementChild instanceof HTMLTemplateElement) return this.firstElementChild;
            this.raise("first child element must be a <template> element")
        }
        get action() {
            return this.getAttribute("action")
        }
        get target() {
            return this.getAttribute("target")
        }
        raise(e) {
            throw new Error(`${this.description}: ${e}`)
        }
        get description() {
            var e, t;
            return null !== (t = (null !== (e = this.outerHTML.match(/<[^>]+>/)) && void 0 !== e ? e : [])[0]) && void 0 !== t ? t : "<turbo-stream>"
        }
        get beforeRenderEvent() {
            return new CustomEvent("turbo:before-stream-render", {
                bubbles: !0,
                cancelable: !0
            })
        }
    }), (() => {
        let e = document.currentScript;
        if (e && !e.hasAttribute("data-turbo-suppress-warning"))
            for (; e = e.parentElement;)
                if (e == document.body) return console.warn(b`
        You are loading Turbo from a <script> element inside the <body> element. This is probably not what you meant to do!

        Load your application’s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.

        For more information, see: https://turbo.hotwire.dev/handbook/building#working-with-script-elements

        ——
        Suppress this warning by adding a "data-turbo-suppress-warning" attribute to: %s
      `, e.outerHTML)
    })();
    class x {
        constructor() {
            this.hiding = !1, this.value = 0, this.visible = !1, this.trickle = (() => {
                this.setValue(this.value + Math.random() / 100)
            }), this.stylesheetElement = this.createStylesheetElement(), this.progressElement = this.createProgressElement(), this.installStylesheetElement(), this.setValue(0)
        }
        static get defaultCSS() {
            return b`
      .turbo-progress-bar {
        position: fixed;
        display: block;
        top: 0;
        left: 0;
        height: 3px;
        background: #0076ff;
        z-index: 9999;
        transition:
          width ${x.animationDuration}ms ease-out,
          opacity ${x.animationDuration/2}ms ${x.animationDuration/2}ms ease-in;
        transform: translate3d(0, 0, 0);
      }
    `
        }
        show() {
            this.visible || (this.visible = !0, this.installProgressElement(), this.startTrickling())
        }
        hide() {
            this.visible && !this.hiding && (this.hiding = !0, this.fadeProgressElement(() => {
                this.uninstallProgressElement(), this.stopTrickling(), this.visible = !1, this.hiding = !1
            }))
        }
        setValue(e) {
            this.value = e, this.refresh()
        }
        installStylesheetElement() {
            document.head.insertBefore(this.stylesheetElement, document.head.firstChild)
        }
        installProgressElement() {
            this.progressElement.style.width = "0", this.progressElement.style.opacity = "1", document.documentElement.insertBefore(this.progressElement, document.body), this.refresh()
        }
        fadeProgressElement(e) {
            this.progressElement.style.opacity = "0", setTimeout(e, 1.5 * x.animationDuration)
        }
        uninstallProgressElement() {
            this.progressElement.parentNode && document.documentElement.removeChild(this.progressElement)
        }
        startTrickling() {
            this.trickleInterval || (this.trickleInterval = window.setInterval(this.trickle, x.animationDuration))
        }
        stopTrickling() {
            window.clearInterval(this.trickleInterval), delete this.trickleInterval
        }
        refresh() {
            requestAnimationFrame(() => {
                this.progressElement.style.width = `${10+90*this.value}%`
            })
        }
        createStylesheetElement() {
            const e = document.createElement("style");
            return e.type = "text/css", e.textContent = x.defaultCSS, e
        }
        createProgressElement() {
            const e = document.createElement("div");
            return e.className = "turbo-progress-bar", e
        }
    }
    x.animationDuration = 300;
    class B extends T {
        constructor() {
            var e;
            super(...arguments), this.detailsByOuterHTML = this.children.reduce((e, t) => {
                const {
                    outerHTML: n
                } = t, r = n in e ? e[n] : {
                    type: function(e) {
                        if (function(e) {
                                return "script" == e.tagName.toLowerCase()
                            }(e)) return "script";
                        if (function(e) {
                                const t = e.tagName.toLowerCase();
                                return "style" == t || "link" == t && "stylesheet" == e.getAttribute("rel")
                            }(e)) return "stylesheet"
                    }(t),
                    tracked: (t = t, "reload" == t.getAttribute("data-turbo-track")),
                    elements: []
                };
                return Object.assign(Object.assign({}, e), {
                    [n]: Object.assign(Object.assign({}, r), {
                        elements: [...r.elements, t]
                    })
                })
            }, {})
        }
        get trackedElementSignature() {
            return Object.keys(this.detailsByOuterHTML).filter(e => this.detailsByOuterHTML[e].tracked).join("")
        }
        getScriptElementsNotInSnapshot(e) {
            return this.getElementsMatchingTypeNotInSnapshot("script", e)
        }
        getStylesheetElementsNotInSnapshot(e) {
            return this.getElementsMatchingTypeNotInSnapshot("stylesheet", e)
        }
        getElementsMatchingTypeNotInSnapshot(e, t) {
            return Object.keys(this.detailsByOuterHTML).filter(e => !(e in t.detailsByOuterHTML)).map(e => this.detailsByOuterHTML[e]).filter(({
                type: t
            }) => t == e).map(({
                elements: [e]
            }) => e)
        }
        get provisionalElements() {
            return Object.keys(this.detailsByOuterHTML).reduce((e, t) => {
                const {
                    type: n,
                    tracked: r,
                    elements: i
                } = this.detailsByOuterHTML[t];
                return null != n || r ? i.length > 1 ? [...e, ...i.slice(1)] : e : [...e, ...i]
            }, [])
        }
        getMetaValue(e) {
            const t = this.findMetaElementByName(e);
            return t ? t.getAttribute("content") : null
        }
        findMetaElementByName(e) {
            return Object.keys(this.detailsByOuterHTML).reduce((t, n) => {
                const {
                    elements: [r]
                } = this.detailsByOuterHTML[n];
                return function(e, t) {
                    return "meta" == e.tagName.toLowerCase() && e.getAttribute("name") == t
                }(r, e) ? r : t
            }, void 0)
        }
    }
    class N extends T {
        constructor(e, t) {
            super(e), this.headSnapshot = t
        }
        static fromHTMLString(e = "") {
            return this.fromDocument(v(e))
        }
        static fromElement(e) {
            return this.fromDocument(e.ownerDocument)
        }
        static fromDocument({
            head: e,
            body: t
        }) {
            return new this(t, new B(e))
        }
        clone() {
            return new N(this.element.cloneNode(!0), this.headSnapshot)
        }
        get headElement() {
            return this.headSnapshot.element
        }
        get rootLocation() {
            var e;
            return l(null !== (e = this.getSetting("root")) && void 0 !== e ? e : "/")
        }
        get cacheControlValue() {
            return this.getSetting("cache-control")
        }
        get isPreviewable() {
            return "no-preview" != this.cacheControlValue
        }
        get isCacheable() {
            return "no-cache" != this.cacheControlValue
        }
        get isVisitable() {
            return "reload" != this.getSetting("visit-control")
        }
        getSetting(e) {
            return this.headSnapshot.getMetaValue(`turbo-${e}`)
        }
    }
    var q, H;
    ! function(e) {
        e.visitStart = "visitStart", e.requestStart = "requestStart", e.requestEnd = "requestEnd", e.visitEnd = "visitEnd"
    }(q || (q = {})),
    function(e) {
        e.initialized = "initialized", e.started = "started", e.canceled = "canceled", e.failed = "failed", e.completed = "completed"
    }(H || (H = {}));
    const V = {
        action: "advance",
        historyChanged: !1
    };
    var z, K;
    ! function(e) {
        e[e.networkFailure = 0] = "networkFailure", e[e.timeoutFailure = -1] = "timeoutFailure", e[e.contentTypeMismatch = -2] = "contentTypeMismatch"
    }(z || (z = {}));
    class U {
        constructor(e, t, n, r = {}) {
            this.identifier = w(), this.timingMetrics = {}, this.followedRedirect = !1, this.historyChanged = !1, this.scrolled = !1, this.snapshotCached = !1, this.state = H.initialized, this.delegate = e, this.location = t, this.restorationIdentifier = n || w();
            const {
                action: i,
                historyChanged: o,
                referrer: s,
                snapshotHTML: a,
                response: c
            } = Object.assign(Object.assign({}, V), r);
            this.action = i, this.historyChanged = o, this.referrer = s, this.snapshotHTML = a, this.response = c
        }
        get adapter() {
            return this.delegate.adapter
        }
        get view() {
            return this.delegate.view
        }
        get history() {
            return this.delegate.history
        }
        get restorationData() {
            return this.history.getRestorationDataForIdentifier(this.restorationIdentifier)
        }
        start() {
            this.state == H.initialized && (this.recordTimingMetric(q.visitStart), this.state = H.started, this.adapter.visitStarted(this), this.delegate.visitStarted(this))
        }
        cancel() {
            this.state == H.started && (this.request && this.request.cancel(), this.cancelRender(), this.state = H.canceled)
        }
        complete() {
            this.state == H.started && (this.recordTimingMetric(q.visitEnd), this.state = H.completed, this.adapter.visitCompleted(this), this.delegate.visitCompleted(this))
        }
        fail() {
            this.state == H.started && (this.state = H.failed, this.adapter.visitFailed(this))
        }
        changeHistory() {
            var e;
            if (!this.historyChanged) {
                const t = this.location.href === (null === (e = this.referrer) || void 0 === e ? void 0 : e.href) ? "replace" : this.action,
                    n = this.getHistoryMethodForAction(t);
                this.history.update(n, this.location, this.restorationIdentifier), this.historyChanged = !0
            }
        }
        issueRequest() {
            this.hasPreloadedResponse() ? this.simulateRequest() : this.shouldIssueRequest() && !this.request && (this.request = new E(this, s.get, this.location), this.request.perform())
        }
        simulateRequest() {
            this.response && (this.startRequest(), this.recordResponse(), this.finishRequest())
        }
        startRequest() {
            this.recordTimingMetric(q.requestStart), this.adapter.visitRequestStarted(this)
        }
        recordResponse(e = this.response) {
            if (this.response = e, e) {
                const {
                    statusCode: t
                } = e;
                W(t) ? this.adapter.visitRequestCompleted(this) : this.adapter.visitRequestFailedWithStatusCode(this, t)
            }
        }
        finishRequest() {
            this.recordTimingMetric(q.requestEnd), this.adapter.visitRequestFinished(this)
        }
        loadResponse() {
            if (this.response) {
                const {
                    statusCode: e,
                    responseHTML: t
                } = this.response;
                this.render(async () => {
                    this.cacheSnapshot(), W(e) && null != t ? (await this.view.renderPage(N.fromHTMLString(t)), this.adapter.visitRendered(this), this.complete()) : (await this.view.renderError(N.fromHTMLString(t)), this.adapter.visitRendered(this), this.fail())
                })
            }
        }
        getCachedSnapshot() {
            const e = this.view.getCachedSnapshotForLocation(this.location) || this.getPreloadedSnapshot();
            if (e && (!h(this.location) || e.hasAnchor(h(this.location))) && ("restore" == this.action || e.isPreviewable)) return e
        }
        getPreloadedSnapshot() {
            if (this.snapshotHTML) return N.fromHTMLString(this.snapshotHTML)
        }
        hasCachedSnapshot() {
            return null != this.getCachedSnapshot()
        }
        loadCachedSnapshot() {
            const e = this.getCachedSnapshot();
            if (e) {
                const t = this.shouldIssueRequest();
                this.render(async () => {
                    this.cacheSnapshot(), await this.view.renderPage(e), this.adapter.visitRendered(this), t || this.complete()
                })
            }
        }
        followRedirect() {
            this.redirectedToLocation && !this.followedRedirect && (this.location = this.redirectedToLocation, this.history.replace(this.redirectedToLocation, this.restorationIdentifier), this.followedRedirect = !0)
        }
        requestStarted() {
            this.startRequest()
        }
        requestPreventedHandlingResponse(e, t) {}
        async requestSucceededWithResponse(e, t) {
            const n = await t.responseHTML;
            void 0 == n ? this.recordResponse({
                statusCode: z.contentTypeMismatch
            }) : (this.redirectedToLocation = t.redirected ? t.location : void 0, this.recordResponse({
                statusCode: t.statusCode,
                responseHTML: n
            }))
        }
        async requestFailedWithResponse(e, t) {
            const n = await t.responseHTML;
            void 0 == n ? this.recordResponse({
                statusCode: z.contentTypeMismatch
            }) : this.recordResponse({
                statusCode: t.statusCode,
                responseHTML: n
            })
        }
        requestErrored(e, t) {
            this.recordResponse({
                statusCode: z.networkFailure
            })
        }
        requestFinished() {
            this.finishRequest()
        }
        performScroll() {
            this.scrolled || ("restore" == this.action ? this.scrollToRestoredPosition() || this.scrollToTop() : this.scrollToAnchor() || this.scrollToTop(), this.scrolled = !0)
        }
        scrollToRestoredPosition() {
            const {
                scrollPosition: e
            } = this.restorationData;
            if (e) return this.view.scrollToPosition(e), !0
        }
        scrollToAnchor() {
            if (null != h(this.location)) return this.view.scrollToAnchor(h(this.location)), !0
        }
        scrollToTop() {
            this.view.scrollToPosition({
                x: 0,
                y: 0
            })
        }
        recordTimingMetric(e) {
            this.timingMetrics[e] = (new Date).getTime()
        }
        getTimingMetrics() {
            return Object.assign({}, this.timingMetrics)
        }
        getHistoryMethodForAction(e) {
            switch (e) {
                case "replace":
                    return history.replaceState;
                case "advance":
                case "restore":
                    return history.pushState
            }
        }
        hasPreloadedResponse() {
            return "object" == typeof this.response
        }
        shouldIssueRequest() {
            return "restore" != this.action || !this.hasCachedSnapshot()
        }
        cacheSnapshot() {
            this.snapshotCached || (this.view.cacheSnapshot(), this.snapshotCached = !0)
        }
        async render(e) {
            this.cancelRender(), await new Promise(e => {
                this.frame = requestAnimationFrame(() => e())
            }), e(), delete this.frame, this.performScroll()
        }
        cancelRender() {
            this.frame && (cancelAnimationFrame(this.frame), delete this.frame)
        }
    }

    function W(e) {
        return e >= 200 && e < 300
    }
    class Y {
        constructor(e) {
            this.progressBar = new x, this.showProgressBar = (() => {
                this.progressBar.show()
            }), this.session = e
        }
        visitProposedToLocation(e, t) {
            this.navigator.startVisit(e, w(), t)
        }
        visitStarted(e) {
            e.issueRequest(), e.changeHistory(), e.loadCachedSnapshot()
        }
        visitRequestStarted(e) {
            this.progressBar.setValue(0), e.hasCachedSnapshot() || "restore" != e.action ? this.showProgressBarAfterDelay() : this.showProgressBar()
        }
        visitRequestCompleted(e) {
            e.loadResponse()
        }
        visitRequestFailedWithStatusCode(e, t) {
            switch (t) {
                case z.networkFailure:
                case z.timeoutFailure:
                case z.contentTypeMismatch:
                    return this.reload();
                default:
                    return e.loadResponse()
            }
        }
        visitRequestFinished(e) {
            this.progressBar.setValue(1), this.hideProgressBar()
        }
        visitCompleted(e) {
            e.followRedirect()
        }
        pageInvalidated() {
            this.reload()
        }
        visitFailed(e) {}
        visitRendered(e) {}
        showProgressBarAfterDelay() {
            this.progressBarTimeout = window.setTimeout(this.showProgressBar, this.session.progressBarDelay)
        }
        hideProgressBar() {
            this.progressBar.hide(), null != this.progressBarTimeout && (window.clearTimeout(this.progressBarTimeout), delete this.progressBarTimeout)
        }
        reload() {
            window.location.reload()
        }
        get navigator() {
            return this.session.navigator
        }
    }
    class $ {
        constructor(e) {
            this.started = !1, this.submitCaptured = (() => {
                removeEventListener("submit", this.submitBubbled, !1), addEventListener("submit", this.submitBubbled, !1)
            }), this.submitBubbled = (e => {
                if (!e.defaultPrevented) {
                    const t = e.target instanceof HTMLFormElement ? e.target : void 0,
                        n = e.submitter || void 0;
                    if (t) {
                        "dialog" != ((null === n || void 0 === n ? void 0 : n.getAttribute("formmethod")) || t.method) && this.delegate.willSubmitForm(t, n) && (e.preventDefault(), this.delegate.formSubmitted(t, n))
                    }
                }
            }), this.delegate = e
        }
        start() {
            this.started || (addEventListener("submit", this.submitCaptured, !0), this.started = !0)
        }
        stop() {
            this.started && (removeEventListener("submit", this.submitCaptured, !0), this.started = !1)
        }
    }
    class J {
        constructor(e) {
            this.element = e, this.linkInterceptor = new C(this, e), this.formInterceptor = new A(this, e)
        }
        start() {
            this.linkInterceptor.start(), this.formInterceptor.start()
        }
        stop() {
            this.linkInterceptor.stop(), this.formInterceptor.stop()
        }
        shouldInterceptLinkClick(e, t) {
            return this.shouldRedirect(e)
        }
        linkClickIntercepted(e, t) {
            const n = this.findFrameElement(e);
            n && (n.src = t)
        }
        shouldInterceptFormSubmission(e, t) {
            return this.shouldRedirect(e, t)
        }
        formSubmissionIntercepted(e, t) {
            const n = this.findFrameElement(e);
            n && n.delegate.formSubmissionIntercepted(e, t)
        }
        shouldRedirect(e, t) {
            const n = this.findFrameElement(e);
            return !!n && n != e.closest("turbo-frame")
        }
        findFrameElement(e) {
            const t = e.getAttribute("data-turbo-frame");
            if (t && "_top" != t) {
                const e = this.element.querySelector(`#${t}:not([disabled])`);
                if (e instanceof u) return e
            }
        }
    }
    class G {
        constructor(e) {
            this.restorationIdentifier = w(), this.restorationData = {}, this.started = !1, this.pageLoaded = !1, this.onPopState = (e => {
                if (this.shouldHandlePopState()) {
                    const {
                        turbo: t
                    } = e.state || {};
                    if (t) {
                        this.location = new URL(window.location.href);
                        const {
                            restorationIdentifier: e
                        } = t;
                        this.restorationIdentifier = e, this.delegate.historyPoppedToLocationWithRestorationIdentifier(this.location, e)
                    }
                }
            }), this.onPageLoad = (async e => {
                await Promise.resolve(), this.pageLoaded = !0
            }), this.delegate = e
        }
        start() {
            this.started || (addEventListener("popstate", this.onPopState, !1), addEventListener("load", this.onPageLoad, !1), this.started = !0, this.replace(new URL(window.location.href)))
        }
        stop() {
            this.started && (removeEventListener("popstate", this.onPopState, !1), removeEventListener("load", this.onPageLoad, !1), this.started = !1)
        }
        push(e, t) {
            this.update(history.pushState, e, t)
        }
        replace(e, t) {
            this.update(history.replaceState, e, t)
        }
        update(e, t, n = w()) {
            const r = {
                turbo: {
                    restorationIdentifier: n
                }
            };
            e.call(history, r, "", t.href), this.location = t, this.restorationIdentifier = n
        }
        getRestorationDataForIdentifier(e) {
            return this.restorationData[e] || {}
        }
        updateRestorationData(e) {
            const {
                restorationIdentifier: t
            } = this, n = this.restorationData[t];
            this.restorationData[t] = Object.assign(Object.assign({}, n), e)
        }
        assumeControlOfScrollRestoration() {
            var e;
            this.previousScrollRestoration || (this.previousScrollRestoration = null !== (e = history.scrollRestoration) && void 0 !== e ? e : "auto", history.scrollRestoration = "manual")
        }
        relinquishControlOfScrollRestoration() {
            this.previousScrollRestoration && (history.scrollRestoration = this.previousScrollRestoration, delete this.previousScrollRestoration)
        }
        shouldHandlePopState() {
            return this.pageIsLoaded()
        }
        pageIsLoaded() {
            return this.pageLoaded || "complete" == document.readyState
        }
    }
    class Z {
        constructor(e) {
            this.started = !1, this.clickCaptured = (() => {
                removeEventListener("click", this.clickBubbled, !1), addEventListener("click", this.clickBubbled, !1)
            }), this.clickBubbled = (e => {
                if (this.clickEventIsSignificant(e)) {
                    const t = this.findLinkFromClickTarget(e.target);
                    if (t) {
                        const n = this.getLocationForLink(t);
                        this.delegate.willFollowLinkToLocation(t, n) && (e.preventDefault(), this.delegate.followedLinkToLocation(t, n))
                    }
                }
            }), this.delegate = e
        }
        start() {
            this.started || (addEventListener("click", this.clickCaptured, !0), this.started = !0)
        }
        stop() {
            this.started && (removeEventListener("click", this.clickCaptured, !0), this.started = !1)
        }
        clickEventIsSignificant(e) {
            return !(e.target && e.target.isContentEditable || e.defaultPrevented || e.which > 1 || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey)
        }
        findLinkFromClickTarget(e) {
            if (e instanceof Element) return e.closest("a[href]:not([target^=_]):not([download])")
        }
        getLocationForLink(e) {
            return l(e.getAttribute("href") || "")
        }
    }
    class Q {
        constructor(e) {
            this.delegate = e
        }
        proposeVisit(e, t = {}) {
            this.delegate.allowsVisitingLocation(e) && this.delegate.visitProposedToLocation(e, t)
        }
        startVisit(e, t, n = {}) {
            this.stop(), this.currentVisit = new U(this, l(e), t, Object.assign({
                referrer: this.location
            }, n)), this.currentVisit.start()
        }
        submitForm(e, t) {
            this.stop(), this.formSubmission = new _(this, e, t, !0), this.formSubmission.fetchRequest.isIdempotent ? this.proposeVisit(this.formSubmission.fetchRequest.url) : this.formSubmission.start()
        }
        stop() {
            this.formSubmission && (this.formSubmission.stop(), delete this.formSubmission), this.currentVisit && (this.currentVisit.cancel(), delete this.currentVisit)
        }
        get adapter() {
            return this.delegate.adapter
        }
        get view() {
            return this.delegate.view
        }
        get history() {
            return this.delegate.history
        }
        formSubmissionStarted(e) {}
        async formSubmissionSucceededWithResponse(e, t) {
            if (e == this.formSubmission) {
                const n = await t.responseHTML;
                if (n) {
                    e.method != s.get && this.view.clearSnapshotCache();
                    const {
                        statusCode: r
                    } = t, i = {
                        response: {
                            statusCode: r,
                            responseHTML: n
                        }
                    };
                    this.proposeVisit(t.location, i)
                }
            }
        }
        async formSubmissionFailedWithResponse(e, t) {
            const n = await t.responseHTML;
            if (n) {
                const e = N.fromHTMLString(n);
                await this.view.renderPage(e), this.view.clearSnapshotCache()
            }
        }
        formSubmissionErrored(e, t) {}
        formSubmissionFinished(e) {}
        visitStarted(e) {
            this.delegate.visitStarted(e)
        }
        visitCompleted(e) {
            this.delegate.visitCompleted(e)
        }
        get location() {
            return this.history.location
        }
        get restorationIdentifier() {
            return this.history.restorationIdentifier
        }
    }! function(e) {
        e[e.initial = 0] = "initial", e[e.loading = 1] = "loading", e[e.interactive = 2] = "interactive", e[e.complete = 3] = "complete"
    }(K || (K = {}));
    class X {
        constructor(e) {
            this.stage = K.initial, this.started = !1, this.interpretReadyState = (() => {
                const {
                    readyState: e
                } = this;
                "interactive" == e ? this.pageIsInteractive() : "complete" == e && this.pageIsComplete()
            }), this.pageWillUnload = (() => {
                this.delegate.pageWillUnload()
            }), this.delegate = e
        }
        start() {
            this.started || (this.stage == K.initial && (this.stage = K.loading), document.addEventListener("readystatechange", this.interpretReadyState, !1), addEventListener("pagehide", this.pageWillUnload, !1), this.started = !0)
        }
        stop() {
            this.started && (document.removeEventListener("readystatechange", this.interpretReadyState, !1), removeEventListener("pagehide", this.pageWillUnload, !1), this.started = !1)
        }
        pageIsInteractive() {
            this.stage == K.loading && (this.stage = K.interactive, this.delegate.pageBecameInteractive())
        }
        pageIsComplete() {
            this.pageIsInteractive(), this.stage == K.interactive && (this.stage = K.complete, this.delegate.pageLoaded())
        }
        get readyState() {
            return document.readyState
        }
    }
    class ee {
        constructor(e) {
            this.started = !1, this.onScroll = (() => {
                this.updatePosition({
                    x: window.pageXOffset,
                    y: window.pageYOffset
                })
            }), this.delegate = e
        }
        start() {
            this.started || (addEventListener("scroll", this.onScroll, !1), this.onScroll(), this.started = !0)
        }
        stop() {
            this.started && (removeEventListener("scroll", this.onScroll, !1), this.started = !1)
        }
        updatePosition(e) {
            this.delegate.scrollPositionChanged(e)
        }
    }
    class te {
        constructor(e) {
            var t;
            this.sources = new Set, this.started = !1, this.inspectFetchResponse = (e => {
                const n = function(e) {
                    var t;
                    const n = null === (t = e.detail) || void 0 === t ? void 0 : t.fetchResponse;
                    if (n instanceof m) return n
                }(e);
                n && (null !== (t = n.contentType) && void 0 !== t ? t : "").startsWith(O.contentType) && (e.preventDefault(), this.receiveMessageResponse(n))
            }), this.receiveMessageEvent = (e => {
                this.started && "string" == typeof e.data && this.receiveMessageHTML(e.data)
            }), this.delegate = e
        }
        start() {
            this.started || (this.started = !0, addEventListener("turbo:before-fetch-response", this.inspectFetchResponse, !1))
        }
        stop() {
            this.started && (this.started = !1, removeEventListener("turbo:before-fetch-response", this.inspectFetchResponse, !1))
        }
        connectStreamSource(e) {
            this.streamSourceIsConnected(e) || (this.sources.add(e), e.addEventListener("message", this.receiveMessageEvent, !1))
        }
        disconnectStreamSource(e) {
            this.streamSourceIsConnected(e) && (this.sources.delete(e), e.removeEventListener("message", this.receiveMessageEvent, !1))
        }
        streamSourceIsConnected(e) {
            return this.sources.has(e)
        }
        async receiveMessageResponse(e) {
            const t = await e.responseHTML;
            t && this.receiveMessageHTML(t)
        }
        receiveMessageHTML(e) {
            this.delegate.receivedMessageFromStream(new O(e))
        }
    }
    class ne extends M {
        async render() {
            this.replaceHeadAndBody(), this.activateScriptElements()
        }
        replaceHeadAndBody() {
            const {
                documentElement: e,
                head: t,
                body: n
            } = document;
            e.replaceChild(this.newHead, t), e.replaceChild(this.newElement, n)
        }
        activateScriptElements() {
            for (const e of this.scriptElements) {
                const t = e.parentNode;
                if (t) {
                    const n = this.createScriptElement(e);
                    t.replaceChild(n, e)
                }
            }
        }
        get newHead() {
            return this.newSnapshot.headSnapshot.element
        }
        get scriptElements() {
            return [...document.documentElement.querySelectorAll("script")]
        }
    }
    class re extends M {
        get shouldRender() {
            return this.newSnapshot.isVisitable && this.trackedElementsAreIdentical
        }
        prepareToRender() {
            this.mergeHead()
        }
        async render() {
            this.replaceBody()
        }
        finishRendering() {
            super.finishRendering(), this.isPreview && this.focusFirstAutofocusableElement()
        }
        get currentHeadSnapshot() {
            return this.currentSnapshot.headSnapshot
        }
        get newHeadSnapshot() {
            return this.newSnapshot.headSnapshot
        }
        get newElement() {
            return this.newSnapshot.element
        }
        mergeHead() {
            this.copyNewHeadStylesheetElements(), this.copyNewHeadScriptElements(), this.removeCurrentHeadProvisionalElements(), this.copyNewHeadProvisionalElements()
        }
        replaceBody() {
            this.preservingPermanentElements(() => {
                this.activateNewBody(), this.assignNewBody()
            })
        }
        get trackedElementsAreIdentical() {
            return this.currentHeadSnapshot.trackedElementSignature == this.newHeadSnapshot.trackedElementSignature
        }
        copyNewHeadStylesheetElements() {
            for (const e of this.newHeadStylesheetElements) document.head.appendChild(e)
        }
        copyNewHeadScriptElements() {
            for (const e of this.newHeadScriptElements) document.head.appendChild(this.createScriptElement(e))
        }
        removeCurrentHeadProvisionalElements() {
            for (const e of this.currentHeadProvisionalElements) document.head.removeChild(e)
        }
        copyNewHeadProvisionalElements() {
            for (const e of this.newHeadProvisionalElements) document.head.appendChild(e)
        }
        activateNewBody() {
            document.adoptNode(this.newElement), this.activateNewBodyScriptElements()
        }
        activateNewBodyScriptElements() {
            for (const e of this.newBodyScriptElements) {
                j(e, this.createScriptElement(e))
            }
        }
        assignNewBody() {
            document.body && this.newElement instanceof HTMLBodyElement ? j(document.body, this.newElement) : document.documentElement.appendChild(this.newElement)
        }
        get newHeadStylesheetElements() {
            return this.newHeadSnapshot.getStylesheetElementsNotInSnapshot(this.currentHeadSnapshot)
        }
        get newHeadScriptElements() {
            return this.newHeadSnapshot.getScriptElementsNotInSnapshot(this.currentHeadSnapshot)
        }
        get currentHeadProvisionalElements() {
            return this.currentHeadSnapshot.provisionalElements
        }
        get newHeadProvisionalElements() {
            return this.newHeadSnapshot.provisionalElements
        }
        get newBodyScriptElements() {
            return [...this.newElement.querySelectorAll("script")]
        }
    }
    class ie {
        constructor(e) {
            this.keys = [], this.snapshots = {}, this.size = e
        }
        has(e) {
            return f(e) in this.snapshots
        }
        get(e) {
            if (this.has(e)) {
                const t = this.read(e);
                return this.touch(e), t
            }
        }
        put(e, t) {
            return this.write(e, t), this.touch(e), t
        }
        clear() {
            this.snapshots = {}
        }
        read(e) {
            return this.snapshots[f(e)]
        }
        write(e, t) {
            this.snapshots[f(e)] = t
        }
        touch(e) {
            const t = f(e),
                n = this.keys.indexOf(t);
            n > -1 && this.keys.splice(n, 1), this.keys.unshift(t), this.trim()
        }
        trim() {
            for (const e of this.keys.splice(this.size)) delete this.snapshots[e]
        }
    }
    class oe extends L {
        constructor() {
            super(...arguments), this.snapshotCache = new ie(10), this.lastRenderedLocation = new URL(location.href)
        }
        renderPage(e, t = !1) {
            const n = new re(this.snapshot, e, t);
            return this.render(n)
        }
        renderError(e) {
            const t = new ne(this.snapshot, e, !1);
            this.render(t)
        }
        clearSnapshotCache() {
            this.snapshotCache.clear()
        }
        async cacheSnapshot() {
            if (this.shouldCacheSnapshot) {
                this.delegate.viewWillCacheSnapshot();
                const {
                    snapshot: e,
                    lastRenderedLocation: t
                } = this;
                await new Promise(e => setTimeout(() => e(), 0)), this.snapshotCache.put(t, e.clone())
            }
        }
        getCachedSnapshotForLocation(e) {
            return this.snapshotCache.get(e)
        }
        get snapshot() {
            return N.fromElement(this.element)
        }
        get shouldCacheSnapshot() {
            return this.snapshot.isCacheable
        }
    }

    function se(e) {
        Object.defineProperties(e, ae)
    }
    const ae = {
            absoluteURL: {
                get() {
                    return this.toString()
                }
            }
        },
        ce = new class {
            constructor() {
                this.navigator = new Q(this), this.history = new G(this), this.view = new oe(this, document.documentElement), this.adapter = new Y(this), this.pageObserver = new X(this), this.linkClickObserver = new Z(this), this.formSubmitObserver = new $(this), this.scrollObserver = new ee(this), this.streamObserver = new te(this), this.frameRedirector = new J(document.documentElement), this.enabled = !0, this.progressBarDelay = 500, this.started = !1
            }
            start() {
                this.started || (this.pageObserver.start(), this.linkClickObserver.start(), this.formSubmitObserver.start(), this.scrollObserver.start(), this.streamObserver.start(), this.frameRedirector.start(), this.history.start(), this.started = !0, this.enabled = !0)
            }
            disable() {
                this.enabled = !1
            }
            stop() {
                this.started && (this.pageObserver.stop(), this.linkClickObserver.stop(), this.formSubmitObserver.stop(), this.scrollObserver.stop(), this.streamObserver.stop(), this.frameRedirector.stop(), this.history.stop(), this.started = !1)
            }
            registerAdapter(e) {
                this.adapter = e
            }
            visit(e, t = {}) {
                this.navigator.proposeVisit(l(e), t)
            }
            connectStreamSource(e) {
                this.streamObserver.connectStreamSource(e)
            }
            disconnectStreamSource(e) {
                this.streamObserver.disconnectStreamSource(e)
            }
            renderStreamMessage(e) {
                document.documentElement.appendChild(O.wrap(e).fragment)
            }
            clearCache() {
                this.view.clearSnapshotCache()
            }
            setProgressBarDelay(e) {
                this.progressBarDelay = e
            }
            get location() {
                return this.history.location
            }
            get restorationIdentifier() {
                return this.history.restorationIdentifier
            }
            historyPoppedToLocationWithRestorationIdentifier(e) {
                this.enabled ? this.navigator.proposeVisit(e, {
                    action: "restore",
                    historyChanged: !0
                }) : this.adapter.pageInvalidated()
            }
            scrollPositionChanged(e) {
                this.history.updateRestorationData({
                    scrollPosition: e
                })
            }
            willFollowLinkToLocation(e, t) {
                return this.elementIsNavigable(e) && this.locationIsVisitable(t) && this.applicationAllowsFollowingLinkToLocation(e, t)
            }
            followedLinkToLocation(e, t) {
                const n = this.getActionForLink(e);
                this.visit(t.href, {
                    action: n
                })
            }
            allowsVisitingLocation(e) {
                return this.applicationAllowsVisitingLocation(e)
            }
            visitProposedToLocation(e, t) {
                se(e), this.adapter.visitProposedToLocation(e, t)
            }
            visitStarted(e) {
                se(e.location), this.notifyApplicationAfterVisitingLocation(e.location)
            }
            visitCompleted(e) {
                this.notifyApplicationAfterPageLoad(e.getTimingMetrics())
            }
            willSubmitForm(e, t) {
                return this.elementIsNavigable(e) && this.elementIsNavigable(t)
            }
            formSubmitted(e, t) {
                this.navigator.submitForm(e, t)
            }
            pageBecameInteractive() {
                this.view.lastRenderedLocation = this.location, this.notifyApplicationAfterPageLoad()
            }
            pageLoaded() {
                this.history.assumeControlOfScrollRestoration()
            }
            pageWillUnload() {
                this.history.relinquishControlOfScrollRestoration()
            }
            receivedMessageFromStream(e) {
                this.renderStreamMessage(e)
            }
            viewWillCacheSnapshot() {
                this.notifyApplicationBeforeCachingSnapshot()
            }
            viewWillRenderSnapshot({
                element: e
            }, t) {
                this.notifyApplicationBeforeRender(e)
            }
            viewRenderedSnapshot(e, t) {
                this.view.lastRenderedLocation = this.history.location, this.notifyApplicationAfterRender()
            }
            viewInvalidated() {
                this.adapter.pageInvalidated()
            }
            applicationAllowsFollowingLinkToLocation(e, t) {
                return !this.notifyApplicationAfterClickingLinkToLocation(e, t).defaultPrevented
            }
            applicationAllowsVisitingLocation(e) {
                return !this.notifyApplicationBeforeVisitingLocation(e).defaultPrevented
            }
            notifyApplicationAfterClickingLinkToLocation(e, t) {
                return g("turbo:click", {
                    target: e,
                    detail: {
                        url: t.href
                    },
                    cancelable: !0
                })
            }
            notifyApplicationBeforeVisitingLocation(e) {
                return g("turbo:before-visit", {
                    detail: {
                        url: e.href
                    },
                    cancelable: !0
                })
            }
            notifyApplicationAfterVisitingLocation(e) {
                return g("turbo:visit", {
                    detail: {
                        url: e.href
                    }
                })
            }
            notifyApplicationBeforeCachingSnapshot() {
                return g("turbo:before-cache")
            }
            notifyApplicationBeforeRender(e) {
                return g("turbo:before-render", {
                    detail: {
                        newBody: e
                    }
                })
            }
            notifyApplicationAfterRender() {
                return g("turbo:render")
            }
            notifyApplicationAfterPageLoad(e = {}) {
                return g("turbo:load", {
                    detail: {
                        url: this.location.href,
                        timing: e
                    }
                })
            }
            getActionForLink(e) {
                const t = e.getAttribute("data-turbo-action");
                return function(e) {
                    return "advance" == e || "replace" == e || "restore" == e
                }(t) ? t : "advance"
            }
            elementIsNavigable(e) {
                const t = null === e || void 0 === e ? void 0 : e.closest("[data-turbo]");
                return !t || "false" != t.getAttribute("data-turbo")
            }
            locationIsVisitable(e) {
                return p(e, this.snapshot.rootLocation) && !!d(e).match(/^(?:|\.(?:htm|html|xhtml))$/)
            }
            get snapshot() {
                return this.view.snapshot
            }
        },
        {
            navigator: ue
        } = ce;

    function le() {
        ce.start()
    }

    function he(e) {
        ce.registerAdapter(e)
    }

    function de(e, t) {
        ce.visit(e, t)
    }

    function pe(e) {
        ce.connectStreamSource(e)
    }

    function fe(e) {
        ce.disconnectStreamSource(e)
    }

    function me(e) {
        ce.renderStreamMessage(e)
    }

    function ge() {
        ce.clearCache()
    }

    function ye(e) {
        ce.setProgressBarDelay(e)
    }
    le()
}, function(e, t, n) {
    var r = {
        "./dropdown_controller.js": 8,
        "./emails_controller.js": 9,
        "./flag_select_controller.js": 10,
        "./image_preview_controller.js": 11,
        "./invoice_calculations_controller.js": 12,
        "./invoice_controls_controller.js": 16,
        "./navbar_controller.js": 17,
        "./page_controller.js": 18,
        "./preview_logo_controller.js": 19,
        "./redirect_controller.js": 20,
        "./require_email_controller.js": 21,
        "./upsell_controller.js": 22
    };

    function i(e) {
        return n(o(e))
    }

    function o(e) {
        var t = r[e];
        if (!(t + 1)) throw new Error("Cannot find module '" + e + "'.");
        return t
    }
    i.keys = function() {
        return Object.keys(r)
    }, i.resolve = o, e.exports = i, i.id = 7
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(0);
    var o = function(e) {
        function t() {
            return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t),
                function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" !== typeof t && "function" !== typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return function(e, t) {
            if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, i.Controller), r(t, [{
            key: "toggle",
            value: function(e) {
                e.preventDefault(), this.sourceTarget.classList.toggle("menu-dropdown-active")
            }
        }]), t
    }();
    o.targets = ["source"], t.default = o
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(0);
    var o = function(e) {
        function t() {
            return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t),
                function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" !== typeof t && "function" !== typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return function(e, t) {
            if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, i.Controller), r(t, [{
            key: "connect",
            value: function() {
                var e = this;
                this.formTarget.addEventListener("turbo:submit-end", function(t) {
                    var n = t.srcElement,
                        r = n.getAttribute("action"),
                        i = n.getAttribute("data-email-url");
                    n.setAttribute("data-turbo-frame", "_top"), i == r && e.show_modal()
                })
            }
        }, {
            key: "value_or_empty",
            value: function(e, t) {
                return null == e || "" == e ? t : e
            }
        }, {
            key: "updatePreview",
            value: function(e) {
                this.emailMessagePreviewTarget.innerHTML = this.value_or_empty(this.simple_format(this.emailMessageTarget.value), this.simple_format(this.emailMessageTarget.getAttribute("placeholder"))), this.senderEmailPreviewTarget.innerHTML = this.value_or_empty(this.senderEmailTarget.value, this.senderEmailTarget.getAttribute("placeholder")), this.recipientEmailPreviewTarget.innerHTML = this.value_or_empty(this.recipientEmailTarget.value, this.recipientEmailTarget.getAttribute("placeholder")), this.disableSubmitIfEmptyValues()
            }
        }, {
            key: "disableSubmitIfEmptyValues",
            value: function() {
                this.emailMessageTarget.value.length > 0 && this.senderEmailTarget.value.length > 0 && this.recipientEmailTarget.value.length > 0 ? this.submitTarget.removeAttribute("disabled") : this.submitTarget.setAttribute("disabled", "disabled")
            }
        }, {
            key: "show_modal",
            value: function(e) {
                this.bodyElement.classList.add("is-clipped"), this.modalTarget.classList.add("is-active")
            }
        }, {
            key: "hide",
            value: function(e) {
                this.bodyElement.classList.remove("is-clipped"), this.modalTarget.classList.remove("is-active"), e.preventDefault()
            }
        }, {
            key: "whitelistEmail",
            value: function(e) {
                " " != e.key && "," != e.key && ";" != e.key && "?" != e.key && "&" != e.key && "+" != e.key || e.preventDefault()
            }
        }, {
            key: "whitelistMessage",
            value: function(e) {
                "/" != e.key && "\\" != e.key || e.preventDefault()
            }
        }, {
            key: "split_paragraphs",
            value: function(e) {
                return e.split(/(?:\r?\n)+/)
            }
        }, {
            key: "simple_format",
            value: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "p";
                if (null == e || "" == e) return e;
                var n = this.split_paragraphs(e);
                return 0 == n.length ? "<" + t + "></" + t + ">" : n.map(function(e) {
                    return e + "<br>"
                }).join("\n\n")
            }
        }, {
            key: "bodyElement",
            get: function() {
                return document.querySelector("html")
            }
        }]), t
    }();
    o.targets = ["modal", "submit", "form", "emailMessage", "recipientEmail", "senderEmail", "emailMessagePreview", "recipientEmailPreview", "senderEmailPreview"], t.default = o
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(0);
    var o = function(e) {
        function t() {
            return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t),
                function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" !== typeof t && "function" !== typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return function(e, t) {
            if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, i.Controller), r(t, [{
            key: "activate",
            value: function(e) {
                this.optionsTarget.classList.remove("hidden"), this.labelTarget.classList.add("hidden")
            }
        }, {
            key: "deactivate",
            value: function(e) {
                e && this.labelTarget.contains(e.target) ? event.preventDefault() : (this.optionsTarget.classList.add("hidden"), this.labelTarget.classList.remove("hidden"))
            }
        }]), t
    }();
    o.targets = ["options", "label"], t.default = o
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(0);
    var o = function(e) {
        function t() {
            return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t),
                function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" !== typeof t && "function" !== typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return function(e, t) {
            if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, i.Controller), r(t, [{
            key: "read_url",
            value: function() {
                var e = this.inputTarget,
                    t = this.outputTarget,
                    n = this.labelTarget;
                if (e.files && e.files[0]) {
                    var r = new FileReader;
                    r.onload = function() {
                        t.src = r.result, t.classList.remove("is-hidden"), n.classList.toggle("is-hidden")
                    }, r.readAsDataURL(e.files[0])
                }
            }
        }, {
            key: "rebuild",
            value: function() {
                var e = this.inputTarget,
                    t = this.previewImageTarget;
                if (e.files && e.files[0]) {
                    var n = new FileReader;
                    n.onload = function() {
                        t.src = n.result, t.classList.remove("is-hidden")
                    }, n.readAsDataURL(e.files[0])
                }
            }
        }]), t
    }();
    o.targets = ["output", "input", "label", "preview"], t.default = o
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r, i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        o = n(0),
        s = n(2),
        a = n(13),
        c = n(14),
        u = n(15),
        l = (r = u) && r.__esModule ? r : {
            default: r
        };
    var h = function(e) {
        function t() {
            return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t),
                function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" !== typeof t && "function" !== typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return function(e, t) {
            if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, o.Controller), i(t, [{
            key: "initialize",
            value: function() {
                this.currency = this.currencyValue, this.vat_label = this.vatLabelValue, (0, l.default)(s.Big), s.Big.format = {
                    decimalSeparator: ".",
                    groupSeparator: " ",
                    groupSize: 3,
                    secondaryGroupSize: 0,
                    fractionGroupSeparator: "",
                    fractionGroupSize: 0
                }
            }
        }, {
            key: "connect",
            value: function() {
                var e = this;
                this.calculate(), this.notify_remove_rows_button(), this.element.addEventListener("turbo:submit-start", function() {
                    var t = e.element.querySelectorAll("input[type=date]");
                    Array.prototype.forEach.call(t, function(e) {
                        e.setAttribute("value", e.value)
                    })
                })
            }
        }, {
            key: "currency_changed",
            value: function(e) {
                this.calculate()
            }
        }, {
            key: "validate_and_calculate",
            value: function(e) {
                var t = e.srcElement;
                t && (t.value = t.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1")), this.calculate()
            }
        }, {
            key: "calculate",
            value: function() {
                var e = new a.Invoice;
                this.invoice_rows.forEach(function(t) {
                    var n = t.querySelector(".unit-price"),
                        r = t.querySelector(".vat"),
                        i = t.querySelector(".quantity"),
                        o = t.querySelector(".total"),
                        s = new a.InvoiceRow(n.value, i.value, r.value);
                    o.textContent = s.total.toFormat(2), e.add_row(s)
                }), e.calculate_totals(), this.render_invoice(e)
            }
        }, {
            key: "render_invoice",
            value: function(e) {
                this.invoiceTotalTarget.textContent = this.currencify(e.total.toFormat(2)), this.invoiceSubTotalTarget.textContent = this.currencify(e.sub_total.toFormat(2)), this.invoiceTotalVatTarget.textContent = this.currencify(e.total_vat.toFormat(2));
                var t = "";
                for (var n in e.vat)
                    if (e.vat.hasOwnProperty(n)) {
                        var r = e.vat[n];
                        t += "<tr>", t += "<td>", t += "<td> " + this.vat_label + " " + n + "%</td>", t += "<td class='text-right'>" + this.currencify(r.toFormat(2)) + "</td>", t += "</tr>"
                    } this.vatTableTarget.innerHTML = t
            }
        }, {
            key: "add_new_row",
            value: function(e) {
                var t = this;
                
                e.preventDefault();
                
                var n = document.querySelector(".invoice-items tbody"),
                    r = this.invoice_rows[0].cloneNode(!0),
                    i = r.querySelectorAll("input"),
                    o = (new Date).getTime();
                    
                  window.trow = r;
                  row_count++;
                  window.trow.classList.add("item-row-"+row_count)
                i.forEach(function(e) {
                    null != e.name && (e.name = t.randomize_name_integer(e.name, o)), e.value = ""
                }), n.append(window.trow)
            }
        }, {
            key: "remove_item",
            value: function(e) {
                (e.preventDefault(), this.invoice_rows.length <= 1) || (e.srcElement.closest("tr.invoice-item-row").remove(), this.calculate(), this.notify_remove_rows_button())
            }
        }, {
            key: "currencify",
            value: function(e) {
                return c.Currency.format(e, this.currencyTarget.value)
            }
        }, {
            key: "notify_remove_rows_button",
            value: function() {
                this.invoice_rows, document.querySelectorAll("tr.invoice-item-row input[type=checkbox]:checked"), document.querySelector(".invoice-action-remove-row")
            }
        }, {
            key: "randomize_name_integer",
            value: function(e, t) {
                var n = e.split("][");
                return 3 == n.length ? n[0] + "][" + t + "][" + n[2] : e
            }
        }, {
            key: "invoice_rows",
            get: function() {
                return document.querySelectorAll("tr.invoice-item-row")
            }
        }]), t
    }();
    h.targets = ["row", "invoiceTotal", "invoiceSubTotal", "invoiceTotalVat", "vatTable", "currency", "invoiceItems"], h.values = {
        currency: String,
        vatLabel: String
    }, t.default = h
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.InvoiceRow = t.Invoice = void 0;
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(2);

    function o(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    var s = function() {
            function e(t, n, r) {
                o(this, e), this._unit_price = new i.Big("0" + t), this._quantity = new i.Big("0" + n), this._vat = new i.Big("0" + r).div(100)
            }
            return r(e, [{
                key: "vat",
                get: function() {
                    return this._vat
                }
            }, {
                key: "quantity",
                get: function() {
                    return this._quantity
                }
            }, {
                key: "vat_price",
                get: function() {
                    return this.unit_price.times(this.vat).times(this.quantity)
                }
            }, {
                key: "unit_price",
                get: function() {
                    return this._unit_price
                }
            }, {
                key: "sub_total",
                get: function() {
                    return this._unit_price.times(this._quantity)
                }
            }, {
                key: "total",
                get: function() {
                    var e = this.vat.plus(new i.Big(1));
                    return this._unit_price.times(this._quantity).times(e)
                }
            }]), e
        }(),
        a = function() {
            function e() {
                o(this, e), this._invoice_rows = [], this.reset_values()
            }
            return r(e, [{
                key: "reset_values",
                value: function() {
                    this._sub_total = new i.Big(0), this._total = new i.Big(0), this._total_vat = new i.Big(0), this._vat = {}
                }
            }, {
                key: "add_row",
                value: function(e) {
                    this._invoice_rows.push(e)
                }
            }, {
                key: "calculate_totals",
                value: function() {
                    var e = this;
                    this.reset_values(), this.calculate_vats(), this._invoice_rows.forEach(function(t) {
                        e._sub_total = e.sub_total.plus(t.sub_total), e._total_vat = e.total_vat.plus(t.vat_price), e._total = e.total.plus(t.total)
                    })
                }
            }, {
                key: "calculate_vats",
                value: function() {
                    var e = this;
                    this._vat = {}, this._invoice_rows.forEach(function(t) {
                        e.add_vat(t.vat.times(100).toFixed(2), t.vat_price)
                    })
                }
            }, {
                key: "add_vat",
                value: function(e, t) {
                    this._vat.hasOwnProperty(e) ? this._vat[e] = this.vat[e].plus(t) : this._vat[e] = t
                }
            }, {
                key: "vat",
                get: function() {
                    return this._vat
                }
            }, {
                key: "sub_total",
                get: function() {
                    return this._sub_total
                }
            }, {
                key: "total",
                get: function() {
                    return this._total
                }
            }, {
                key: "total_vat",
                get: function() {
                    return this._total_vat
                }
            }]), e
        }();
    t.Invoice = a, t.InvoiceRow = s
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }();
    var i = function() {
        function e() {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e)
        }
        return r(e, null, [{
            key: "format",
            value: function(e, t) {
                if (this.currencies.hasOwnProperty(t)) {
                    var n = this.currencies[t];
                    return 1 == n.last ? e + n.symbol : n.symbol + e
                }
                return e
            }
        }, {
            key: "currencies",
            get: function() {
                return {
                    EUR: {
                        symbol: "\u20ac",
                        last: !0
                    },
                    USD: {
                        symbol: "$",
                        last: !1
                    },
                    CAD: {
                        symbol: "$",
                        last: !1
                    },
                    JPY: {
                        symbol: "\xa5",
                        last: !0
                    },
                    AUD: {
                        symbol: "$",
                        last: !1
                    },
                    BRL: {
                        symbol: "$",
                        last: !1
                    },
                    HKD: {
                        symbol: "$",
                        last: !1
                    },
                    SGD: {
                        symbol: "$",
                        last: !1
                    },
                    NZD: {
                        symbol: "$",
                        last: !1
                    },
                    GBP: {
                        symbol: "\xa3",
                        last: !0
                    },
                    CHY: {
                        symbol: "\u5143",
                        last: !1
                    },
                    SWE: {
                        symbol: "Kr",
                        last: !0
                    },
                    NOK: {
                        symbol: "kr",
                        last: !0
                    },
                    KES: {
                        symbol: "KSh",
                        last: !0
                    },
                    TRY: {
                        symbol: "\u20ba",
                        last: !1
                    },
                    RUB: {
                        symbol: "\u20bd",
                        last: !0
                    },
                    KRW: {
                        symbol: "\u20a9",
                        last: !0
                    },
                    CHF: {
                        symbol: "Fr",
                        last: !0
                    },
                    THB: {
                        symbol: "\u0e3f",
                        last: !1
                    },
                    ZAR: {
                        symbol: "R",
                        last: !1
                    }
                }
            }
        }]), e
    }();
    t.Currency = i
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    t.default = function(e) {
        return e.prototype.toFormat = function(e, t, n) {
            if (!this.e && 0 !== this.e) return this.toString();
            var i, o, s, a, c, u, l, h, d, p, f, m, g, y, v, b = this.format || {},
                w = this.constructor.format || {};
            if (e != c ? "object" == ("undefined" === typeof e ? "undefined" : r(e)) ? (n = e, e = c) : t != c ? "object" == ("undefined" === typeof t ? "undefined" : r(t)) ? (n = t, t = c) : "object" != ("undefined" === typeof n ? "undefined" : r(n)) && (n = {}) : n = {} : n = {}, h = (i = this.toFixed(e, t).split("."))[0], d = i[1], u = (l = this.s < 0 ? h.slice(1) : h).length, (p = n.decimalSeparator) == c && (p = b.decimalSeparator) == c && (p = w.decimalSeparator) == c && (p = "."), (f = n.groupSeparator) == c && (f = b.groupSeparator) == c && (f = w.groupSeparator), f && ((m = n.groupSize) == c && (m = b.groupSize) == c && (m = w.groupSize) == c && (m = 0), (g = n.secondaryGroupSize) == c && (g = b.secondaryGroupSize) == c && (g = w.secondaryGroupSize) == c && (g = 0), g ? (o = +g, u -= s = +m) : (o = +m, s = +g), o > 0 && u > 0)) {
                for (a = u % o || o, h = l.substr(0, a); a < u; a += o) h += f + l.substr(a, o);
                s > 0 && (h += f + l.slice(a)), this.s < 0 && (h = "-" + h)
            }
            return d ? ((y = n.fractionGroupSeparator) == c && (y = b.fractionGroupSeparator) == c && (y = w.fractionGroupSeparator), y && ((v = n.fractionGroupSize) == c && (v = b.fractionGroupSize) == c && (v = w.fractionGroupSize) == c && (v = 0), (v = +v) && (d = d.replace(new RegExp("\\d{" + v + "}\\B", "g"), "$&" + y))), h + p + d) : h
        }, e.format = {
            decimalSeparator: ".",
            groupSeparator: ",",
            groupSize: 3,
            secondaryGroupSize: 0,
            fractionGroupSeparator: "",
            fractionGroupSize: 0
        }, e
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(0);
    var o = function(e) {
        function t() {
            return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t),
                function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" !== typeof t && "function" !== typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return function(e, t) {
            if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, i.Controller), r(t, [{
            key: "connect",
            value: function() {
                var e = this;
                this.element.addEventListener("turbo:submit-end", function(t) {
                    var n = t.srcElement,
                        r = n.getAttribute("action"),
                        i = n.getAttribute("data-preview-url");
                    e.stop_spinner(), i == r && e.show_preview()
                })
            }
        }, {
            key: "start_spinner",
            value: function() {
                this.previewActionLabelTarget.classList.add("is-hidden"), this.previewSpinnerTarget.classList.remove("is-hidden")
            }
        }, {
            key: "stop_spinner",
            value: function() {
                this.previewActionLabelTarget.classList.remove("is-hidden"), this.previewSpinnerTarget.classList.add("is-hidden")
            }
        }, {
            key: "hide_preview",
            value: function() {
                this.previewFrameTarget.classList.add("is-hidden"), this.innerFormTarget.classList.remove("is-hidden"), this.previewActionTarget.classList.remove("is-hidden"), this.editActionTarget.classList.add("is-hidden")
            }
        }, {
            key: "show_preview",
            value: function() {
                this.previewFrameTarget.classList.remove("is-hidden"), this.innerFormTarget.classList.add("is-hidden"), this.previewActionTarget.classList.add("is-hidden"), this.editActionTarget.classList.remove("is-hidden")
            }
        }, {
            key: "edit_invoice",
            value: function(e) {
                this.hide_preview()
            }
        }, {
            key: "toggle_due_date_control",
            value: function(e) {
                return e.preventDefault(), this.dueDateControlTarget.classList.toggle("is-hidden"), this.dueDateDisplayTarget.classList.toggle("is-hidden"), !1
            }
        }]), t
    }();
    o.targets = ["innerForm", "editAction", "previewAction", "previewFrame", "dueDateControl", "dueDateDisplay", "previewActionLabel", "previewSpinner", "previewImage", "logoImage"], t.default = o
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(0);
    var o = function(e) {
        function t() {
            return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t),
                function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" !== typeof t && "function" !== typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return function(e, t) {
            if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, i.Controller), r(t, [{
            key: "toggle_burger",
            value: function(e) {
                e.preventDefault(), this.menuTarget.classList.toggle("is-active"), this.burgerTarget.classList.toggle("is-active")
            }
        }, {
            key: "toggle_menu",
            value: function(e) {
                e.preventDefault(), this.dropdownTarget.classList.toggle("is-active")
            }
        }, {
            key: "hide_menu",
            value: function(e) {
                !0 !== this.dropdownTarget.contains(e.target) && this.dropdownTarget.classList.contains("is-active") && (e.preventDefault(), this.dropdownTarget.classList.remove("is-active"))
            }
        }]), t
    }();
    o.targets = ["menu", "burger", "dropdown"], t.default = o
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(0),
        o = n(1);
    var s = function(e) {
        function t() {
            return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t),
                function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" !== typeof t && "function" !== typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return function(e, t) {
            if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, i.Controller), r(t, [{
            key: "show_email",
            value: function(e) {
                this.headerTarget.classList.add("is-hidden"), this.emailActionsTarget.classList.remove("is-hidden"), this.invoicePageTarget.classList.add("is-hidden"), this.emailPageTarget.classList.remove("is-hidden"), this.marketingTarget.classList.add("is-hidden"), o.RequiredInputFields.enable_for_send_invoice(), e.preventDefault()
            }
        }, {
            key: "show_invoice",
            value: function(e) {
                this.headerTarget.classList.remove("is-hidden"), this.emailActionsTarget.classList.add("is-hidden"), this.invoicePageTarget.classList.remove("is-hidden"), this.emailPageTarget.classList.add("is-hidden"), this.marketingTarget.classList.remove("is-hidden"), e.preventDefault()
            }
        }]), t
    }();
    s.targets = ["header", "emailActions", "invoicePage", "emailPage", "marketing", "form"], t.default = s
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(0);
    var o = function(e) {
        function t() {
            return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t),
                function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" !== typeof t && "function" !== typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return function(e, t) {
            if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, i.Controller), r(t, [{
            key: "connect",
            value: function() {
                var e = this;
                this.invoiceFormElement.addEventListener("turbo:submit-end", function(t) {
                    e.update_logo()
                }), this.update_logo()
            }
        }, {
            key: "update_logo",
            value: function() {
                this.element.src = this.sourceElement.src, this.sourceElement.src.startsWith("data:image") ? this.element.classList.remove("is-hidden") : this.element.classList.add("is-hidden")
            }
        }, {
            key: "sourceElement",
            get: function() {
                return document.getElementById("logo-image-source")
            }
        }, {
            key: "invoiceFormElement",
            get: function() {
                return document.getElementById("invoice-form")
            }
        }]), t
    }();
    t.default = o
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(0),
        o = n(1);
    var s = function(e) {
        function t() {
            return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t),
                function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" !== typeof t && "function" !== typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return function(e, t) {
            if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, i.Controller), r(t, [{
            key: "post_to_print",
            value: function(e) {
                e.preventDefault();
                var t = this.element.getAttribute("data-print-url");
                this.element.action = t, this.element.submit()
            }
        }, {
            key: "post_to_email",
            value: function(e) {
                var t = this.element.getAttribute("data-email-url");
                this.element.action = t, this.submitLabelTarget.classList.add("is-hidden"), this.submitSpinnerTarget.classList.remove("is-hidden")
            }
        }, {
            key: "reset_email",
            value: function(e) {
                this.submitLabelTarget.classList.remove("is-hidden"), this.submitSpinnerTarget.classList.add("is-hidden")
            }
        }, {
            key: "post_to_preview",
            value: function(e) {
                var t = this.element.getAttribute("data-preview-url");
                this.element.action = t, o.RequiredInputFields.remove_all()
            }
        }, {
            key: "restore_preview_path",
            value: function() {
                var e = this.element.getAttribute("data-preview-url");
                this.element.action = e
            }
        }]), t
    }();
    s.targets = ["submitLabel", "submitSpinner"], t.default = s
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(0),
        o = n(1);
    var s = function(e) {
        function t() {
            return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t),
                function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" !== typeof t && "function" !== typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return function(e, t) {
            if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, i.Controller), r(t, [{
            key: "hide",
            value: function(e) {
                e.preventDefault(), this.modalTarget.classList.remove("is-active"), this.reset_subviews(), this.sourceTarget.value = ""
            }
        }, {
            key: "show",
            value: function(e) {
                o.RequiredInputFields.enable_for_required_email(), this.modalTarget.classList.add("is-active"), this.reset_subviews(), this.sourceTarget.value = "", this.disable_ctas()
            }
        }, {
            key: "ready",
            value: function(e) {
                this.modalTarget.querySelector('[name="form"]').classList.toggle("is-hidden"), this.modalTarget.querySelector('[name="done"]').classList.toggle("is-hidden")
            }
        }, {
            key: "update",
            value: function(e) {
                var t = this.sourceTarget.value;
                if (t.length > 0 && this.validate_email(t)) {
                    this.enable_ctas();
                    var n = this.form.querySelector('[name="invoice[sender_email]"');
                    n && (n.value = t)
                } else this.disable_ctas()
            }
        }, {
            key: "validate_email",
            value: function(e) {
                return /^[^\s@]+@[^\s@]+$/.test(e)
            }
        }, {
            key: "reset_subviews",
            value: function() {
                this.modalTarget.querySelector('[name="form"]').classList.remove("is-hidden"), this.modalTarget.querySelector('[name="done"]').classList.add("is-hidden")
            }
        }, {
            key: "disable_ctas",
            value: function() {
                this.ctaTargets.forEach(function(e) {
                    e.setAttribute("disabled", "disabled")
                })
            }
        }, {
            key: "enable_ctas",
            value: function() {
                this.ctaTargets.forEach(function(e) {
                    e.removeAttribute("disabled")
                })
            }
        }, {
            key: "form",
            get: function() {
                return document.getElementById("invoice-form")
            }
        }]), t
    }();
    s.targets = ["cta", "source", "modal"], t.default = s
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(0);
    var o = function(e) {
        function t() {
            return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t),
                function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" !== typeof t && "function" !== typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return function(e, t) {
            if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, i.Controller), r(t, [{
            key: "show",
            value: function(e) {
                this.bodyElement.classList.add("is-clipped"), this.modalTarget.classList.add("is-active")
            }
        }, {
            key: "hide",
            value: function(e) {
                this.bodyElement.classList.remove("is-clipped"), this.modalTarget.classList.remove("is-active"), e.preventDefault()
            }
        }, {
            key: "bodyElement",
            get: function() {
                return document.querySelector("html")
            }
        }]), t
    }();
    o.targets = ["modal"], t.default = o
}]);
//# sourceMappingURL=application-8e3834e1d1df87b8e79e.js.map
