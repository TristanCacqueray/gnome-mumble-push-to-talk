// necessary footer to transform a spago build into a valid gnome extension
const env = PS["GnomeMumblePushToTalk"].create();
function init() { PS["GnomeMumblePushToTalk"].init(env)(); }
function enable() { PS["GnomeMumblePushToTalk"].enable(env)(); }
function disable() { PS["GnomeMumblePushToTalk"].disable(env)(); }
