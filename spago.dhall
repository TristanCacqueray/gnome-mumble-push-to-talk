let gnome-shell =
      { dependencies = [ "effect" ]
      , repo = "https://github.com/purescript-gjs/purescript-gnome-shell.git"
      , version = "main"
      }

let gjs =
      { repo = "https://github.com/purescript-gjs/purescript-gjs.git"
      , version = "main"
      , dependencies =
        [ "console"
        , "effect"
        , "exceptions"
        , "maybe"
        , "lists"
        , "arrays"
        , "foldable-traversable"
        , "psci-support"
        , "integers"
        , "nullable"
        ]
      }

in  { name = "autochill"
    , sources = [ "src/**/*.purs" ]
    , dependencies =
      [ "console"
      , "effect"
      , "psci-support"
      , "maybe"
      , "foldable-traversable"
      , "exceptions"
      , "gjs"
      , "gnome-shell"
      , "refs"
      , "js-timers"
      , "prelude"
      ]
    , packages =
        https://github.com/purescript/package-sets/releases/download/psc-0.14.0-20210402/packages.dhall sha256:0cfaa5de499bd629f5263daff3261144d9d348d38a451b7938a6f52054c3a086
      with gnome-shell = gnome-shell
      with gjs = gjs
    }
