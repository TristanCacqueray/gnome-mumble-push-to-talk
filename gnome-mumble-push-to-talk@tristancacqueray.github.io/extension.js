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
var $runtime_lazy = function(name, moduleName, init) {
  var state = 0;
  var val;
  return function(lineNumber) {
    if (state === 2)
      return val;
    if (state === 1)
      throw new ReferenceError(name + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state = 1;
    val = init();
    state = 2;
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
var getPath = (ext) => (name) => () => ext.dir.get_child(name).get_path();

// output/GJS/foreign.js
var argv = ARGV;
var log = (msg) => () => log(msg);

// output/GLib/foreign.js
import GLib from "gi://GLib";
var timeoutAdd = (interval) => (cb) => () => GLib.timeout_add(GLib.PRIORITY_DEFAULT, interval, cb);
var sourceRemove = (source) => () => GLib.source_remove(source);

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
var lookup = (s) => (name) => (recursive) => () => s.lookup(name, recursive);

// output/Gio.ThemedIcon/foreign.js
import Gio3 from "gi://Gio";
var new_2 = (name) => () => Gio3.ThemedIcon.new(name);

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
var addKeybinding = (name) => (settings) => (flags) => (modes) => (handler) => () => Main2.wm.addKeybinding(name, settings, flags, modes, handler);
var removeKeybinding = (name) => () => Main2.wm.removeKeybinding(name);

// output/Gnome.UI.PanelMenu/foreign.js
import * as PanelMenu from "resource:///org/gnome/shell/ui/panelMenu.js";
var newButton = (alignment) => (name) => (dontCreateMenu) => () => new PanelMenu.Button(alignment, name, dontCreateMenu);

// output/Meta.KeyBindingFlags/foreign.js
import Meta from "gi://Meta";
var none = Meta.KeyBindingFlags.NONE;
var per_window = Meta.KeyBindingFlags.PER_WINDOW;
var builtin = Meta.KeyBindingFlags.BUILTIN;
var ignore_autorepeat = Meta.KeyBindingFlags.IGNORE_AUTOREPEAT;

// output/GLib.MainLoop/foreign.js
import GLib3 from "gi://GLib";

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

// output/Data.Nullable/foreign.js
var nullImpl = null;
function notNull(x) {
  return x;
}

// output/Data.Nullable/index.js
var toNullable = /* @__PURE__ */ maybe(nullImpl)(notNull);

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
var unsafe_add_style_class_name = (widget) => (name) => () => widget.add_style_class_name(name);

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
