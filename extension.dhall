let name = "gnome-mumble-push-to-talk"

let schema = ../purescript-gjs/src/schema.dhall

let extension =
      { name
      , domain = "tristancacqueray.github.io"
      , description = "A gnome extension to enable Mumble push to talk."
      , version = 0.1
      , url = "https://github.com/TristanCacqueray/${name}"
      , options = [ schema.keyOption "toggle-mumble" "<Super>F2" ]
      }

in  { extension
    , schema = schema.renderSchema name extension.options
    , metadata =
      { uuid = "${extension.name}@${extension.domain}"
      , name = extension.name
      , description = extension.description
      , version = extension.version
      , shell-version = [ "40.0" ]
      , url = extension.url
      }
    }
