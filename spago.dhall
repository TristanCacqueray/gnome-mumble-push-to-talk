let gnome-shell =
      { dependencies = [ "effect" ]
      , repo = "https://github.com/purescript-gjs/purescript-gnome-shell.git"
      , version = "main"
      }

let gjs =
      { repo = "https://github.com/purescript-gjs/purescript-gjs.git"
      , version = "main"
      , dependencies =
        [ "aff"
        , "arraybuffer-types"
        , "arrays"
        , "effect"
        , "either"
        , "exceptions"
        , "foldable-traversable"
        , "integers"
        , "lists"
        , "maybe"
        , "nullable"
        , "parallel"
        , "prelude"
        , "psci-support"
        , "tuples"
        ]
      }

in  { name = "gnome-mumble-push-to-talk"
    , sources = [ "src/**/*.purs" ]
    , dependencies =
      [ "effect"
      , "gjs"
      , "gnome-shell"
      , "maybe"
      , "prelude"
      , "psci-support"
      , "refs"
      ]
    , packages =
        https://github.com/purescript/package-sets/releases/download/psc-0.14.0-20210402/packages.dhall sha256:0cfaa5de499bd629f5263daff3261144d9d348d38a451b7938a6f52054c3a086
      with gnome-shell = gnome-shell
      with gjs = gjs
    }
