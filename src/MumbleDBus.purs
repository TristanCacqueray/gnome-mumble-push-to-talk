module MumbleDBus where

import Prelude
import Effect (Effect)
import Data.Maybe (Maybe(..))
import Gio.DBusConnection as DBusConnection
import Gio.DBusCallFlags as DBusCallFlags
import GLib.MainLoop as MainLoop

data MumbleMethod = StartTalking | StopTalking

methodName :: MumbleMethod -> String
methodName method = case method of
  StartTalking -> "startTalking"
  StopTalking -> "stopTalking"

call :: MumbleMethod -> Effect Unit
call method = do
  DBusConnection.call
    DBusConnection.session
    (Just "net.sourceforge.mumble.mumble")
    "/"
    "net.sourceforge.mumble.Mumble"
    (methodName method)
    Nothing
    Nothing
    DBusCallFlags.none
    200
    Nothing
    Nothing

main :: Effect Unit
main = do
  call StartTalking
  MainLoop.run =<< MainLoop.new
