module GnomeMumblePushToTalk where

import Prelude
import Effect (Effect)
import Effect.Ref as Ref
import Data.Maybe (Maybe(..))
import GJS as GJS
import ShellUI.Global (stage)
import Clutter.Actor as Actor
import Clutter.Event as Event
import GObject (HandlerID, disconnect)
import Gio.DBusConnection as DBusConnection
import Gio.DBusCallFlags as DBusCallFlags

type Env
  = { keyHandlers :: Ref.Ref (Maybe { pressHandler :: HandlerID, releaseHandler :: HandlerID }) }

log :: String -> Effect Unit
log msg = GJS.log $ "gnome-mumble-push-to-talk: " <> msg

create :: Effect Env
create = do
  keyHandlers <- Ref.new Nothing
  pure { keyHandlers }

init :: Env -> Effect Unit
init env = pure unit

-- | Enable the extension
enable :: Env -> Effect Unit
enable env = do
  log "enable called"
  -- setup key event handlers
  pressHandler <- Actor.onKeyPressEvent stage onKeyPress
  releaseHandler <- Actor.onKeyReleaseEvent stage onKeyRelease
  -- store handler id in the env
  Ref.write (Just { pressHandler, releaseHandler }) env.keyHandlers
  where
  onKeyPress _actor ev = do
    code <- Event.get_key_code ev
    shift <- Event.has_shift_modifier ev
    when (code == 133 && shift) (dbusCall "startTalking")
    pure false

  onKeyRelease _actor ev = do
    code <- Event.get_key_code ev
    when (code == 133) (dbusCall "stopTalking")
    pure false

  dbusCall method = do
    log $ "Calling dbus: " <> method
    DBusConnection.call
      DBusConnection.session
      (Just "net.sourceforge.mumble.mumble")
      "/"
      "net.sourceforge.mumble.mumble"
      method
      Nothing
      Nothing
      DBusCallFlags.none
      200
      Nothing
      Nothing


-- | Disable the extension
disable :: Env -> Effect Unit
disable env = do
  log "disable called"
  -- remove key event handlers
  keyHandler <- Ref.read env.keyHandlers
  case keyHandler of
    Just { pressHandler, releaseHandler } -> do
      disconnect stage pressHandler
      disconnect stage releaseHandler
    Nothing -> log "Oops, no handler?!"

main :: Effect Unit
main = pure unit
