let name = "gnome-mumble-push-to-talk"

let schema = ../purescript-gjs/src/schema.dhall

in  { name
    , domain = "tristancacqueray.github.io"
    , description = "A gnome extension to enable Mumble push to talk."
    , version = 0.1
    , url = "https://github.com/TristanCacqueray/${name}"
    , settings =
        schema.renderSchema
          name
          [ schema.keyOption "toggle-mumble" "<Super>F2" ]
    }
