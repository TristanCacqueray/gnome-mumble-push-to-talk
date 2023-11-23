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
        , "tuples"
        ]
      }

in  { name = "gnome-mumble-push-to-talk"
    , sources = [ "src/**/*.purs" ]
    , dependencies =
      [ "effect", "gjs", "gnome-shell", "maybe", "prelude", "refs", "tuples" ]
    , packages =
        https://github.com/purescript/package-sets/releases/download/psc-0.15.7-20230408/packages.dhall
          sha256:eafb4e5bcbc2de6172e9457f321764567b33bc7279bd6952468d0d422aa33948
      with gjs = ../../purescript-gjs/purescript-gjs/spago.dhall as Location
      with gnome-shell =
          ../../purescript-gjs/purescript-gnome-shell/spago.dhall as Location
    }
