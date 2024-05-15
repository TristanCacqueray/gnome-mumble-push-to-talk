// output/Clutter.Actor/foreign.js
var unsafe_add_child = (actor) => (child) => () => actor.add_child(child);
var unsafe_destroy = (actor) => () => actor.destroy();
var unsafe_onButtonPressEvent = (actor) => (cb) => () => actor.connect("button-press-event", (actor2, event) => cb(actor2)(event)());
var unsafe_onButtonReleaseEvent = (actor) => (cb) => () => actor.connect("button-release-event", (actor2, event) => cb(actor2)(event)());

// output/Clutter.Actor/index.js
var onButtonReleaseEvent = function() {
  return unsafe_onButtonReleaseEvent;
};
var onButtonPressEvent = function() {
  return unsafe_onButtonPressEvent;
};
var destroy = function() {
  return unsafe_destroy;
};
var add_child = function() {
  return function() {
    return unsafe_add_child;
  };
};

// output/Data.Function/index.js
var $$const = function(a) {
  return function(v) {
    return a;
  };
};

// output/Data.Unit/foreign.js
var unit = void 0;

// output/Data.Functor/index.js
var map = function(dict) {
  return dict.map;
};
var $$void = function(dictFunctor) {
  return map(dictFunctor)($$const(unit));
};

// output/Control.Apply/index.js
var apply = function(dict) {
  return dict.apply;
};

// output/Control.Applicative/index.js
var pure = function(dict) {
  return dict.pure;
};
var when = function(dictApplicative) {
  var pure1 = pure(dictApplicative);
  return function(v) {
    return function(v1) {
      if (v) {
        return v1;
      }
      ;
      if (!v) {
        return pure1(unit);
      }
      ;
      throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v.constructor.name, v1.constructor.name]);
    };
  };
};
var liftA1 = function(dictApplicative) {
  var apply3 = apply(dictApplicative.Apply0());
  var pure1 = pure(dictApplicative);
  return function(f) {
    return function(a) {
      return apply3(pure1(f))(a);
    };
  };
};

// output/Data.Bounded/foreign.js
var topChar = String.fromCharCode(65535);
var bottomChar = String.fromCharCode(0);
var topNumber = Number.POSITIVE_INFINITY;
var bottomNumber = Number.NEGATIVE_INFINITY;

// output/Data.Maybe/index.js
var Nothing = /* @__PURE__ */ function() {
  function Nothing2() {
  }
  ;
  Nothing2.value = new Nothing2();
  return Nothing2;
}();
var Just = /* @__PURE__ */ function() {
  function Just2(value0) {
    this.value0 = value0;
  }
  ;
  Just2.create = function(value0) {
    return new Just2(value0);
  };
  return Just2;
}();
var maybe = function(v) {
  return function(v1) {
    return function(v2) {
      if (v2 instanceof Nothing) {
        return v;
      }
      ;
      if (v2 instanceof Just) {
        return v1(v2.value0);
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};

// output/Data.Tuple/index.js
var Tuple = /* @__PURE__ */ function() {
  function Tuple2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Tuple2.create = function(value0) {
    return function(value1) {
      return new Tuple2(value0, value1);
    };
  };
  return Tuple2;
}();

// output/Effect/foreign.js
var pureE = function(a) {
  return function() {
    return a;
  };
};
var bindE = function(a) {
  return function(f) {
    return function() {
      return f(a())();
    };
  };
};

// output/Control.Bind/index.js
var bind = function(dict) {
  return dict.bind;
};

// output/Control.Monad/index.js
var ap = function(dictMonad) {
  var bind2 = bind(dictMonad.Bind1());
  var pure2 = pure(dictMonad.Applicative0());
  return function(f) {
    return function(a) {
      return bind2(f)(function(f$prime) {
        return bind2(a)(function(a$prime) {
          return pure2(f$prime(a$prime));
        });
      });
    };
  };
};

// output/Effect/index.js
var $runtime_lazy = function(name2, moduleName, init2) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init2();
    state2 = 2;
    return val;
  };
};
var monadEffect = {
  Applicative0: function() {
    return applicativeEffect;
  },
  Bind1: function() {
    return bindEffect;
  }
};
var bindEffect = {
  bind: bindE,
  Apply0: function() {
    return $lazy_applyEffect(0);
  }
};
var applicativeEffect = {
  pure: pureE,
  Apply0: function() {
    return $lazy_applyEffect(0);
  }
};
var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
  return {
    map: liftA1(applicativeEffect)
  };
});
var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
  return {
    apply: ap(monadEffect),
    Functor0: function() {
      return $lazy_functorEffect(0);
    }
  };
});
var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);

// output/Effect.Ref/foreign.js
var _new = function(val) {
  return function() {
    return { value: val };
  };
};
var read = function(ref) {
  return function() {
    return ref.value;
  };
};
var write = function(val) {
  return function(ref) {
    return function() {
      ref.value = val;
    };
  };
};

// output/Effect.Ref/index.js
var $$new = _new;

// output/ExtensionUtils/foreign.js
import * as ExtensionUtils from "resource:///org/gnome/shell/misc/extensionUtils.js";
var getPath = (ext) => (name2) => () => ext.dir.get_child(name2).get_path();

// output/GJS/foreign.js
var argv = ARGV;
var log = (msg) => () => console.log(msg);

// output/GLib/foreign.js
import GLib from "gi://GLib";
var timeoutAdd = (interval) => (cb) => () => GLib.timeout_add(GLib.PRIORITY_DEFAULT, interval, cb);
var sourceRemove = (source) => () => GLib.source_remove(source);

// output/Data.Nullable/foreign.js
var nullImpl = null;
function notNull(x) {
  return x;
}

// output/Data.Nullable/index.js
var toNullable = /* @__PURE__ */ maybe(nullImpl)(notNull);

// output/GLib.DateTime/foreign.js
import GLib2 from "gi://GLib";
var new_now_utc = () => GLib2.DateTime.new_now_utc();
var difference = (dt) => (begin) => dt.difference(begin);

// output/Gio.Settings/foreign.js
import Gio from "gi://Gio";
var new_full = (schema) => () => Gio.Settings.new_full(schema, null, null);

// output/Gio.SettingsSchemaSource/foreign.js
import Gio2 from "gi://Gio";
var new_from_directory = (path2) => (trusted) => () => Gio2.SettingsSchemaSource.new_from_directory(path2, null, trusted);
var lookup = (s) => (name2) => (recursive) => () => s.lookup(name2, recursive);

// output/Gio.ThemedIcon/foreign.js
import Gio3 from "gi://Gio";
var new_2 = (name2) => () => Gio3.ThemedIcon.new(name2);

// output/Gio.ThemedIcon/index.js
var $$new2 = new_2;

// output/Gnome.Shell.ActionMode/foreign.js
import Shell from "gi://Shell";
var normal = Shell.ActionMode.NORMAL;
var overview = Shell.ActionMode.OVERVIEW;
var lock_screen = Shell.ActionMode.LOCK_SCREEN;
var all = Shell.ActionMode.ALL;

// output/Gnome.UI.Main.Panel/foreign.js
import * as Main from "resource:///org/gnome/shell/ui/main.js";
var addToStatusArea = (role) => (indicator) => () => Main.panel.addToStatusArea(role, indicator);

// output/Gnome.UI.Main.WM/foreign.js
import * as Main2 from "resource:///org/gnome/shell/ui/main.js";
var addKeybinding = (name2) => (settings) => (flags) => (modes) => (handler) => () => Main2.wm.addKeybinding(name2, settings, flags, modes, handler);
var removeKeybinding = (name2) => () => Main2.wm.removeKeybinding(name2);

// output/Gnome.UI.PanelMenu/foreign.js
import * as PanelMenu from "resource:///org/gnome/shell/ui/panelMenu.js";
import * as BoxPointer from "resource:///org/gnome/shell/ui/boxpointer.js";
var newButton = (alignment) => (name2) => (dontCreateMenu) => () => new PanelMenu.Button(alignment, name2, dontCreateMenu);

// output/Meta.KeyBindingFlags/foreign.js
import Meta from "gi://Meta";
var none = Meta.KeyBindingFlags.NONE;
var per_window = Meta.KeyBindingFlags.PER_WINDOW;
var builtin = Meta.KeyBindingFlags.BUILTIN;
var ignore_autorepeat = Meta.KeyBindingFlags.IGNORE_AUTOREPEAT;

// output/GLib.MainLoop/foreign.js
import GLib3 from "gi://GLib";

// output/Effect.Aff/foreign.js
var Aff = function() {
  var EMPTY = {};
  var PURE = "Pure";
  var THROW = "Throw";
  var CATCH = "Catch";
  var SYNC = "Sync";
  var ASYNC = "Async";
  var BIND = "Bind";
  var BRACKET = "Bracket";
  var FORK = "Fork";
  var SEQ = "Sequential";
  var MAP = "Map";
  var APPLY = "Apply";
  var ALT = "Alt";
  var CONS = "Cons";
  var RESUME = "Resume";
  var RELEASE = "Release";
  var FINALIZER = "Finalizer";
  var FINALIZED = "Finalized";
  var FORKED = "Forked";
  var FIBER = "Fiber";
  var THUNK = "Thunk";
  function Aff2(tag, _1, _2, _3) {
    this.tag = tag;
    this._1 = _1;
    this._2 = _2;
    this._3 = _3;
  }
  function AffCtr(tag) {
    var fn = function(_1, _2, _3) {
      return new Aff2(tag, _1, _2, _3);
    };
    fn.tag = tag;
    return fn;
  }
  function nonCanceler(error2) {
    return new Aff2(PURE, void 0);
  }
  function runEff(eff) {
    try {
      eff();
    } catch (error2) {
      setTimeout(function() {
        throw error2;
      }, 0);
    }
  }
  function runSync(left, right, eff) {
    try {
      return right(eff());
    } catch (error2) {
      return left(error2);
    }
  }
  function runAsync(left, eff, k) {
    try {
      return eff(k)();
    } catch (error2) {
      k(left(error2))();
      return nonCanceler;
    }
  }
  var Scheduler = function() {
    var limit = 1024;
    var size = 0;
    var ix = 0;
    var queue = new Array(limit);
    var draining = false;
    function drain() {
      var thunk;
      draining = true;
      while (size !== 0) {
        size--;
        thunk = queue[ix];
        queue[ix] = void 0;
        ix = (ix + 1) % limit;
        thunk();
      }
      draining = false;
    }
    return {
      isDraining: function() {
        return draining;
      },
      enqueue: function(cb) {
        var i, tmp;
        if (size === limit) {
          tmp = draining;
          drain();
          draining = tmp;
        }
        queue[(ix + size) % limit] = cb;
        size++;
        if (!draining) {
          drain();
        }
      }
    };
  }();
  function Supervisor(util) {
    var fibers = {};
    var fiberId = 0;
    var count = 0;
    return {
      register: function(fiber) {
        var fid = fiberId++;
        fiber.onComplete({
          rethrow: true,
          handler: function(result) {
            return function() {
              count--;
              delete fibers[fid];
            };
          }
        })();
        fibers[fid] = fiber;
        count++;
      },
      isEmpty: function() {
        return count === 0;
      },
      killAll: function(killError, cb) {
        return function() {
          if (count === 0) {
            return cb();
          }
          var killCount = 0;
          var kills = {};
          function kill(fid) {
            kills[fid] = fibers[fid].kill(killError, function(result) {
              return function() {
                delete kills[fid];
                killCount--;
                if (util.isLeft(result) && util.fromLeft(result)) {
                  setTimeout(function() {
                    throw util.fromLeft(result);
                  }, 0);
                }
                if (killCount === 0) {
                  cb();
                }
              };
            })();
          }
          for (var k in fibers) {
            if (fibers.hasOwnProperty(k)) {
              killCount++;
              kill(k);
            }
          }
          fibers = {};
          fiberId = 0;
          count = 0;
          return function(error2) {
            return new Aff2(SYNC, function() {
              for (var k2 in kills) {
                if (kills.hasOwnProperty(k2)) {
                  kills[k2]();
                }
              }
            });
          };
        };
      }
    };
  }
  var SUSPENDED = 0;
  var CONTINUE = 1;
  var STEP_BIND = 2;
  var STEP_RESULT = 3;
  var PENDING = 4;
  var RETURN = 5;
  var COMPLETED = 6;
  function Fiber(util, supervisor, aff) {
    var runTick = 0;
    var status = SUSPENDED;
    var step = aff;
    var fail = null;
    var interrupt = null;
    var bhead = null;
    var btail = null;
    var attempts = null;
    var bracketCount = 0;
    var joinId = 0;
    var joins = null;
    var rethrow = true;
    function run3(localRunTick) {
      var tmp, result, attempt;
      while (true) {
        tmp = null;
        result = null;
        attempt = null;
        switch (status) {
          case STEP_BIND:
            status = CONTINUE;
            try {
              step = bhead(step);
              if (btail === null) {
                bhead = null;
              } else {
                bhead = btail._1;
                btail = btail._2;
              }
            } catch (e) {
              status = RETURN;
              fail = util.left(e);
              step = null;
            }
            break;
          case STEP_RESULT:
            if (util.isLeft(step)) {
              status = RETURN;
              fail = step;
              step = null;
            } else if (bhead === null) {
              status = RETURN;
            } else {
              status = STEP_BIND;
              step = util.fromRight(step);
            }
            break;
          case CONTINUE:
            switch (step.tag) {
              case BIND:
                if (bhead) {
                  btail = new Aff2(CONS, bhead, btail);
                }
                bhead = step._2;
                status = CONTINUE;
                step = step._1;
                break;
              case PURE:
                if (bhead === null) {
                  status = RETURN;
                  step = util.right(step._1);
                } else {
                  status = STEP_BIND;
                  step = step._1;
                }
                break;
              case SYNC:
                status = STEP_RESULT;
                step = runSync(util.left, util.right, step._1);
                break;
              case ASYNC:
                status = PENDING;
                step = runAsync(util.left, step._1, function(result2) {
                  return function() {
                    if (runTick !== localRunTick) {
                      return;
                    }
                    runTick++;
                    Scheduler.enqueue(function() {
                      if (runTick !== localRunTick + 1) {
                        return;
                      }
                      status = STEP_RESULT;
                      step = result2;
                      run3(runTick);
                    });
                  };
                });
                return;
              case THROW:
                status = RETURN;
                fail = util.left(step._1);
                step = null;
                break;
              case CATCH:
                if (bhead === null) {
                  attempts = new Aff2(CONS, step, attempts, interrupt);
                } else {
                  attempts = new Aff2(CONS, step, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                }
                bhead = null;
                btail = null;
                status = CONTINUE;
                step = step._1;
                break;
              case BRACKET:
                bracketCount++;
                if (bhead === null) {
                  attempts = new Aff2(CONS, step, attempts, interrupt);
                } else {
                  attempts = new Aff2(CONS, step, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                }
                bhead = null;
                btail = null;
                status = CONTINUE;
                step = step._1;
                break;
              case FORK:
                status = STEP_RESULT;
                tmp = Fiber(util, supervisor, step._2);
                if (supervisor) {
                  supervisor.register(tmp);
                }
                if (step._1) {
                  tmp.run();
                }
                step = util.right(tmp);
                break;
              case SEQ:
                status = CONTINUE;
                step = sequential2(util, supervisor, step._1);
                break;
            }
            break;
          case RETURN:
            bhead = null;
            btail = null;
            if (attempts === null) {
              status = COMPLETED;
              step = interrupt || fail || step;
            } else {
              tmp = attempts._3;
              attempt = attempts._1;
              attempts = attempts._2;
              switch (attempt.tag) {
                case CATCH:
                  if (interrupt && interrupt !== tmp && bracketCount === 0) {
                    status = RETURN;
                  } else if (fail) {
                    status = CONTINUE;
                    step = attempt._2(util.fromLeft(fail));
                    fail = null;
                  }
                  break;
                case RESUME:
                  if (interrupt && interrupt !== tmp && bracketCount === 0 || fail) {
                    status = RETURN;
                  } else {
                    bhead = attempt._1;
                    btail = attempt._2;
                    status = STEP_BIND;
                    step = util.fromRight(step);
                  }
                  break;
                case BRACKET:
                  bracketCount--;
                  if (fail === null) {
                    result = util.fromRight(step);
                    attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                    if (interrupt === tmp || bracketCount > 0) {
                      status = CONTINUE;
                      step = attempt._3(result);
                    }
                  }
                  break;
                case RELEASE:
                  attempts = new Aff2(CONS, new Aff2(FINALIZED, step, fail), attempts, interrupt);
                  status = CONTINUE;
                  if (interrupt && interrupt !== tmp && bracketCount === 0) {
                    step = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                  } else if (fail) {
                    step = attempt._1.failed(util.fromLeft(fail))(attempt._2);
                  } else {
                    step = attempt._1.completed(util.fromRight(step))(attempt._2);
                  }
                  fail = null;
                  bracketCount++;
                  break;
                case FINALIZER:
                  bracketCount++;
                  attempts = new Aff2(CONS, new Aff2(FINALIZED, step, fail), attempts, interrupt);
                  status = CONTINUE;
                  step = attempt._1;
                  break;
                case FINALIZED:
                  bracketCount--;
                  status = RETURN;
                  step = attempt._1;
                  fail = attempt._2;
                  break;
              }
            }
            break;
          case COMPLETED:
            for (var k in joins) {
              if (joins.hasOwnProperty(k)) {
                rethrow = rethrow && joins[k].rethrow;
                runEff(joins[k].handler(step));
              }
            }
            joins = null;
            if (interrupt && fail) {
              setTimeout(function() {
                throw util.fromLeft(fail);
              }, 0);
            } else if (util.isLeft(step) && rethrow) {
              setTimeout(function() {
                if (rethrow) {
                  throw util.fromLeft(step);
                }
              }, 0);
            }
            return;
          case SUSPENDED:
            status = CONTINUE;
            break;
          case PENDING:
            return;
        }
      }
    }
    function onComplete(join3) {
      return function() {
        if (status === COMPLETED) {
          rethrow = rethrow && join3.rethrow;
          join3.handler(step)();
          return function() {
          };
        }
        var jid = joinId++;
        joins = joins || {};
        joins[jid] = join3;
        return function() {
          if (joins !== null) {
            delete joins[jid];
          }
        };
      };
    }
    function kill(error2, cb) {
      return function() {
        if (status === COMPLETED) {
          cb(util.right(void 0))();
          return function() {
          };
        }
        var canceler = onComplete({
          rethrow: false,
          handler: function() {
            return cb(util.right(void 0));
          }
        })();
        switch (status) {
          case SUSPENDED:
            interrupt = util.left(error2);
            status = COMPLETED;
            step = interrupt;
            run3(runTick);
            break;
          case PENDING:
            if (interrupt === null) {
              interrupt = util.left(error2);
            }
            if (bracketCount === 0) {
              if (status === PENDING) {
                attempts = new Aff2(CONS, new Aff2(FINALIZER, step(error2)), attempts, interrupt);
              }
              status = RETURN;
              step = null;
              fail = null;
              run3(++runTick);
            }
            break;
          default:
            if (interrupt === null) {
              interrupt = util.left(error2);
            }
            if (bracketCount === 0) {
              status = RETURN;
              step = null;
              fail = null;
            }
        }
        return canceler;
      };
    }
    function join2(cb) {
      return function() {
        var canceler = onComplete({
          rethrow: false,
          handler: cb
        })();
        if (status === SUSPENDED) {
          run3(runTick);
        }
        return canceler;
      };
    }
    return {
      kill,
      join: join2,
      onComplete,
      isSuspended: function() {
        return status === SUSPENDED;
      },
      run: function() {
        if (status === SUSPENDED) {
          if (!Scheduler.isDraining()) {
            Scheduler.enqueue(function() {
              run3(runTick);
            });
          } else {
            run3(runTick);
          }
        }
      }
    };
  }
  function runPar(util, supervisor, par, cb) {
    var fiberId = 0;
    var fibers = {};
    var killId = 0;
    var kills = {};
    var early = new Error("[ParAff] Early exit");
    var interrupt = null;
    var root = EMPTY;
    function kill(error2, par2, cb2) {
      var step = par2;
      var head = null;
      var tail = null;
      var count = 0;
      var kills2 = {};
      var tmp, kid;
      loop:
        while (true) {
          tmp = null;
          switch (step.tag) {
            case FORKED:
              if (step._3 === EMPTY) {
                tmp = fibers[step._1];
                kills2[count++] = tmp.kill(error2, function(result) {
                  return function() {
                    count--;
                    if (count === 0) {
                      cb2(result)();
                    }
                  };
                });
              }
              if (head === null) {
                break loop;
              }
              step = head._2;
              if (tail === null) {
                head = null;
              } else {
                head = tail._1;
                tail = tail._2;
              }
              break;
            case MAP:
              step = step._2;
              break;
            case APPLY:
            case ALT:
              if (head) {
                tail = new Aff2(CONS, head, tail);
              }
              head = step;
              step = step._1;
              break;
          }
        }
      if (count === 0) {
        cb2(util.right(void 0))();
      } else {
        kid = 0;
        tmp = count;
        for (; kid < tmp; kid++) {
          kills2[kid] = kills2[kid]();
        }
      }
      return kills2;
    }
    function join2(result, head, tail) {
      var fail, step, lhs, rhs, tmp, kid;
      if (util.isLeft(result)) {
        fail = result;
        step = null;
      } else {
        step = result;
        fail = null;
      }
      loop:
        while (true) {
          lhs = null;
          rhs = null;
          tmp = null;
          kid = null;
          if (interrupt !== null) {
            return;
          }
          if (head === null) {
            cb(fail || step)();
            return;
          }
          if (head._3 !== EMPTY) {
            return;
          }
          switch (head.tag) {
            case MAP:
              if (fail === null) {
                head._3 = util.right(head._1(util.fromRight(step)));
                step = head._3;
              } else {
                head._3 = fail;
              }
              break;
            case APPLY:
              lhs = head._1._3;
              rhs = head._2._3;
              if (fail) {
                head._3 = fail;
                tmp = true;
                kid = killId++;
                kills[kid] = kill(early, fail === lhs ? head._2 : head._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail === null) {
                      join2(fail, null, null);
                    } else {
                      join2(fail, tail._1, tail._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              } else if (lhs === EMPTY || rhs === EMPTY) {
                return;
              } else {
                step = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                head._3 = step;
              }
              break;
            case ALT:
              lhs = head._1._3;
              rhs = head._2._3;
              if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                return;
              }
              if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                fail = step === lhs ? rhs : lhs;
                step = null;
                head._3 = fail;
              } else {
                head._3 = step;
                tmp = true;
                kid = killId++;
                kills[kid] = kill(early, step === lhs ? head._2 : head._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail === null) {
                      join2(step, null, null);
                    } else {
                      join2(step, tail._1, tail._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              }
              break;
          }
          if (tail === null) {
            head = null;
          } else {
            head = tail._1;
            tail = tail._2;
          }
        }
    }
    function resolve(fiber) {
      return function(result) {
        return function() {
          delete fibers[fiber._1];
          fiber._3 = result;
          join2(result, fiber._2._1, fiber._2._2);
        };
      };
    }
    function run3() {
      var status = CONTINUE;
      var step = par;
      var head = null;
      var tail = null;
      var tmp, fid;
      loop:
        while (true) {
          tmp = null;
          fid = null;
          switch (status) {
            case CONTINUE:
              switch (step.tag) {
                case MAP:
                  if (head) {
                    tail = new Aff2(CONS, head, tail);
                  }
                  head = new Aff2(MAP, step._1, EMPTY, EMPTY);
                  step = step._2;
                  break;
                case APPLY:
                  if (head) {
                    tail = new Aff2(CONS, head, tail);
                  }
                  head = new Aff2(APPLY, EMPTY, step._2, EMPTY);
                  step = step._1;
                  break;
                case ALT:
                  if (head) {
                    tail = new Aff2(CONS, head, tail);
                  }
                  head = new Aff2(ALT, EMPTY, step._2, EMPTY);
                  step = step._1;
                  break;
                default:
                  fid = fiberId++;
                  status = RETURN;
                  tmp = step;
                  step = new Aff2(FORKED, fid, new Aff2(CONS, head, tail), EMPTY);
                  tmp = Fiber(util, supervisor, tmp);
                  tmp.onComplete({
                    rethrow: false,
                    handler: resolve(step)
                  })();
                  fibers[fid] = tmp;
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
              }
              break;
            case RETURN:
              if (head === null) {
                break loop;
              }
              if (head._1 === EMPTY) {
                head._1 = step;
                status = CONTINUE;
                step = head._2;
                head._2 = EMPTY;
              } else {
                head._2 = step;
                step = head;
                if (tail === null) {
                  head = null;
                } else {
                  head = tail._1;
                  tail = tail._2;
                }
              }
          }
        }
      root = step;
      for (fid = 0; fid < fiberId; fid++) {
        fibers[fid].run();
      }
    }
    function cancel(error2, cb2) {
      interrupt = util.left(error2);
      var innerKills;
      for (var kid in kills) {
        if (kills.hasOwnProperty(kid)) {
          innerKills = kills[kid];
          for (kid in innerKills) {
            if (innerKills.hasOwnProperty(kid)) {
              innerKills[kid]();
            }
          }
        }
      }
      kills = null;
      var newKills = kill(error2, root, cb2);
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            for (var kid2 in newKills) {
              if (newKills.hasOwnProperty(kid2)) {
                newKills[kid2]();
              }
            }
            return nonCanceler;
          };
        });
      };
    }
    run3();
    return function(killError) {
      return new Aff2(ASYNC, function(killCb) {
        return function() {
          return cancel(killError, killCb);
        };
      });
    };
  }
  function sequential2(util, supervisor, par) {
    return new Aff2(ASYNC, function(cb) {
      return function() {
        return runPar(util, supervisor, par, cb);
      };
    });
  }
  Aff2.EMPTY = EMPTY;
  Aff2.Pure = AffCtr(PURE);
  Aff2.Throw = AffCtr(THROW);
  Aff2.Catch = AffCtr(CATCH);
  Aff2.Sync = AffCtr(SYNC);
  Aff2.Async = AffCtr(ASYNC);
  Aff2.Bind = AffCtr(BIND);
  Aff2.Bracket = AffCtr(BRACKET);
  Aff2.Fork = AffCtr(FORK);
  Aff2.Seq = AffCtr(SEQ);
  Aff2.ParMap = AffCtr(MAP);
  Aff2.ParApply = AffCtr(APPLY);
  Aff2.ParAlt = AffCtr(ALT);
  Aff2.Fiber = Fiber;
  Aff2.Supervisor = Supervisor;
  Aff2.Scheduler = Scheduler;
  Aff2.nonCanceler = nonCanceler;
  return Aff2;
}();
var _pure = Aff.Pure;
var _throwError = Aff.Throw;
var _liftEffect = Aff.Sync;
var makeAff = Aff.Async;
var _delay = function() {
  function setDelay(n, k) {
    if (n === 0 && typeof setImmediate !== "undefined") {
      return setImmediate(k);
    } else {
      return setTimeout(k, n);
    }
  }
  function clearDelay(n, t) {
    if (n === 0 && typeof clearImmediate !== "undefined") {
      return clearImmediate(t);
    } else {
      return clearTimeout(t);
    }
  }
  return function(right, ms) {
    return Aff.Async(function(cb) {
      return function() {
        var timer = setDelay(ms, cb(right()));
        return function() {
          return Aff.Sync(function() {
            return right(clearDelay(ms, timer));
          });
        };
      };
    });
  };
}();
var _sequential = Aff.Seq;

// output/Data.Traversable/foreign.js
var traverseArrayImpl = function() {
  function array1(a) {
    return [a];
  }
  function array2(a) {
    return function(b) {
      return [a, b];
    };
  }
  function array3(a) {
    return function(b) {
      return function(c) {
        return [a, b, c];
      };
    };
  }
  function concat2(xs) {
    return function(ys) {
      return xs.concat(ys);
    };
  }
  return function(apply3) {
    return function(map2) {
      return function(pure2) {
        return function(f) {
          return function(array) {
            function go(bot, top2) {
              switch (top2 - bot) {
                case 0:
                  return pure2([]);
                case 1:
                  return map2(array1)(f(array[bot]));
                case 2:
                  return apply3(map2(array2)(f(array[bot])))(f(array[bot + 1]));
                case 3:
                  return apply3(apply3(map2(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                default:
                  var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                  return apply3(map2(concat2)(go(bot, pivot)))(go(pivot, top2));
              }
            }
            return go(0, array.length);
          };
        };
      };
    };
  };
}();

// output/Gio.Async/foreign.js
import GLib4 from "gi://GLib";

// output/Gio.DBusCallFlags/foreign.js
import Gio4 from "gi://Gio";
var DBusCallFlags = Gio4.DBusCallFlags;
var none2 = DBusCallFlags.NONE;

// output/Gio.DBusConnection/foreign.js
import Gio5 from "gi://Gio";
var DBus = Gio5.DBus;
var DBusConnection = Gio5.DBusConnection;
var session = DBus.session;
var system = DBus.system;
var call_impl = (conn2) => (bus_name) => (object_path) => (interface_name) => (method_name) => (parameters) => (reply_type) => (flags) => (timeout_msec) => (cancellable) => (cbM) => () => {
  const cb = cbM ? (_obj, res) => cbM(res)() : null;
  conn2.call(
    bus_name,
    object_path,
    interface_name,
    method_name,
    parameters,
    reply_type,
    flags,
    timeout_msec,
    cancellable,
    cb
  );
};

// output/Gio.DBusConnection/index.js
var call = function(conn2) {
  return function(bus_name) {
    return function(object_path) {
      return function(interface_name) {
        return function(method_name) {
          return function(parameters) {
            return function(reply_type) {
              return function(flags) {
                return function(timeout_msec) {
                  return function(cancellable) {
                    return function(cb) {
                      return call_impl(conn2)(toNullable(bus_name))(object_path)(interface_name)(method_name)(toNullable(parameters))(toNullable(reply_type))(flags)(timeout_msec)(toNullable(cancellable))(toNullable(cb));
                    };
                  };
                };
              };
            };
          };
        };
      };
    };
  };
};

// output/MumbleDBus/index.js
var StartTalking = /* @__PURE__ */ function() {
  function StartTalking2() {
  }
  ;
  StartTalking2.value = new StartTalking2();
  return StartTalking2;
}();
var StopTalking = /* @__PURE__ */ function() {
  function StopTalking2() {
  }
  ;
  StopTalking2.value = new StopTalking2();
  return StopTalking2;
}();
var methodName = function(method) {
  if (method instanceof StartTalking) {
    return "startTalking";
  }
  ;
  if (method instanceof StopTalking) {
    return "stopTalking";
  }
  ;
  throw new Error("Failed pattern match at MumbleDBus (line 13, column 21 - line 15, column 31): " + [method.constructor.name]);
};
var call2 = function(method) {
  return call(session)(new Just("net.sourceforge.mumble.mumble"))("/")("net.sourceforge.mumble.Mumble")(methodName(method))(Nothing.value)(Nothing.value)(none2)(200)(Nothing.value)(Nothing.value);
};

// output/St/foreign.js
import St from "gi://St";
var unsafe_add_style_class_name = (widget) => (name2) => () => widget.add_style_class_name(name2);

// output/St/index.js
var add_style_class_name = function() {
  return unsafe_add_style_class_name;
};

// output/St.Icon/foreign.js
import St2 from "gi://St";
var new_4 = () => St2.Icon.new();
var set_gicon = (icon) => (gicon) => () => icon.set_gicon(gicon);

// output/St.Icon/index.js
var $$new4 = new_4;

// output/GnomeMumblePushToTalk/index.js
var when2 = /* @__PURE__ */ when(applicativeEffect);
var add_child2 = /* @__PURE__ */ add_child()();
var $$void2 = /* @__PURE__ */ $$void(functorEffect);
var onButtonPressEvent2 = /* @__PURE__ */ onButtonPressEvent();
var onButtonReleaseEvent2 = /* @__PURE__ */ onButtonReleaseEvent();
var add_style_class_name2 = /* @__PURE__ */ add_style_class_name();
var destroy2 = /* @__PURE__ */ destroy();
var log2 = function(msg) {
  return log("gnome-mumble-push-to-talk: " + msg);
};
var main = /* @__PURE__ */ log2("Welcome!");
var extension_init = function(me) {
  return function __do() {
    var path2 = getPath(me)("schemas")();
    var schemaSource = new_from_directory(path2)(false)();
    var schema = lookup(schemaSource)("org.gnome.shell.extensions.gnome-mumble-push-to-talk")(false)();
    return new_full(schema)();
  };
};
var extension_enable = function(settings) {
  var onTalkStart = function(env) {
    return function __do() {
      log2("Start talking...")();
      set_gicon(env.icon)(env.talkIcon)();
      return call2(StartTalking.value)();
    };
  };
  var onTalkEnd = function(env) {
    return function __do() {
      log2("Stop talking...")();
      set_gicon(env.icon)(env.muteIcon)();
      return call2(StopTalking.value)();
    };
  };
  var onKeyBinding = function(env) {
    return function(timerRef) {
      var releasePushToTalk = function __do() {
        onTalkEnd(env)();
        write(Nothing.value)(timerRef)();
        return false;
      };
      var startCanceller = function(now) {
        return function __do() {
          var timer = timeoutAdd(500)(releasePushToTalk)();
          return write(new Just(new Tuple(now, timer)))(timerRef)();
        };
      };
      return function __do() {
        var timerM = read(timerRef)();
        (function() {
          if (timerM instanceof Just) {
            var now = new_now_utc();
            var v = difference(now)(timerM.value0.value0);
            return when2(v >= 4e5)(function __do2() {
              sourceRemove(timerM.value0.value1)();
              return startCanceller(now)();
            })();
          }
          ;
          if (timerM instanceof Nothing) {
            onTalkStart(env)();
            var now = new_now_utc();
            return startCanceller(now)();
          }
          ;
          throw new Error("Failed pattern match at GnomeMumblePushToTalk (line 79, column 5 - line 92, column 27): " + [timerM.constructor.name]);
        })();
        return false;
      };
    };
  };
  var onClick = function(cb) {
    return function(env) {
      return function(v) {
        return function(v1) {
          return function __do() {
            cb(env)();
            return true;
          };
        };
      };
    };
  };
  var enableTopMenu = function(env) {
    return function __do() {
      add_child2(env.button)(env.icon)();
      addToStatusArea("mumble")(env.button)();
      $$void2(onButtonPressEvent2(env.button)(onClick(onTalkStart)(env)))();
      return $$void2(onButtonReleaseEvent2(env.button)(onClick(onTalkEnd)(env)))();
    };
  };
  var enableShortCut = function(env) {
    return function __do() {
      var timerRef = $$new(Nothing.value)();
      return $$void2(addKeybinding("toggle-mumble")(settings)(none)(all)(onKeyBinding(env)(timerRef)))();
    };
  };
  var createEnv = function __do() {
    var button = newButton(0)("Mumble")(false)();
    var muteIcon = $$new2("face-shutmouth-symbolic")();
    var talkIcon = $$new2("face-smile-big-symbolic")();
    var icon = $$new4();
    add_style_class_name2(icon)("system-status-icon")();
    set_gicon(icon)(muteIcon)();
    return {
      button,
      icon,
      muteIcon,
      talkIcon
    };
  };
  return function __do() {
    log2("enable called")();
    var env = createEnv();
    enableTopMenu(env)();
    enableShortCut(env)();
    return env;
  };
};
var extension_disable = function(env) {
  var disableTopMenu = destroy2(env.button);
  var disableShortCut = removeKeybinding("toggle-mumble");
  return function __do() {
    log2("disable called")();
    disableTopMenu();
    return disableShortCut();
  };
};
var extension = {
  extension_enable,
  extension_disable,
  extension_init
};
export {
  extension,
  extension_disable,
  extension_enable,
  extension_init,
  log2 as log,
  main
};

// necessary footer to transform a spago build into a valid gnome extension
let GnomeMumblePushToTalkEnv = null;
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
let GnomeMumblePushToTalkSettings = null;
export default class GnomeMumblePushToTalk extends Extension {
  constructor(metadata) {
    super(metadata);
    GnomeMumblePushToTalkSettings = extension.extension_init(metadata)();
  }
  enable() { GnomeMumblePushToTalkEnv = extension.extension_enable(GnomeMumblePushToTalkSettings)(); }
  disable() { extension.extension_disable(GnomeMumblePushToTalkEnv)(); }
}
