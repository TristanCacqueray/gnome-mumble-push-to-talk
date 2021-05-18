module GnomeMumblePushToTalk where

import Prelude
import Effect (Effect)
import GJS (log)

type Env = Unit

create :: Effect Env
create = pure unit

init :: Env -> Effect Unit
init env = do
  log "gnome-mumble-push-to-talk init called"

-- | Enable the extension
enable :: Env -> Effect Unit
enable env = do
  log "gnome-mumble-push-to-talk enable called"

-- | Disable the extension
disable :: Env -> Effect Unit
disable env = do
  log "gnome-mumble-push-to-talk disable called"

main :: Effect Unit
main = pure unit
