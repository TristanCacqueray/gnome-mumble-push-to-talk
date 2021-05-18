-- | The extension metadata
let extension = ../extension.dhall

in  { uuid = "${extension.name}@${extension.domain}"
    , name = extension.name
    , description = extension.description
    , version = extension.version
    , shell-version = [ "40.0" ]
    , url = extension.url
    }
