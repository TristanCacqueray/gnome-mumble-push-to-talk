let name = "gnome-mumble-push-to-talk"

in  (env:PGS).Extension::{
    , name
    , module = "GnomeMumblePushToTalk"
    , description = "A gnome extension to enable Mumble push to talk."
    , settings = Some [ (env:PGS).keySetting "toggle-mumble" "<Shift>Escape" ]
    , url = "https://github.com/TristanCacqueray/${name}"
    , domain = "tristancacqueray.github.io"
    }
