module GnomeMumblePushToTalk where

import Prelude
import Effect (Effect)
import Effect.Ref as Ref
import Data.Maybe (Maybe(..))
import GJS as GJS
import Clutter.Actor as Actor
import ShellUI.PanelMenu as PanelMenu
import Gio.ThemedIcon as ThemedIcon
import Gio.Icon (Icon)
import St as St
import St.Icon as St.Icon
import ShellUI.Main.Panel as Panel
import MumbleDBus as MumbleDBus

type Env
  = { button :: PanelMenu.Button
    , icon :: St.Icon.Icon
    , muteIcon :: Icon
    , talkIcon :: Icon
    }

type EnvRef
  = Ref.Ref (Maybe Env)

log :: String -> Effect Unit
log msg = GJS.log $ "gnome-mumble-push-to-talk: " <> msg

create :: Effect EnvRef
create = Ref.new Nothing

init :: EnvRef -> Effect Unit
init env = pure unit

-- | Enable the extension
enable :: EnvRef -> Effect Unit
enable envRef = do
  log "enable called"
  env <- createEnv
  Ref.write (Just env) envRef
  Actor.add_child env.button env.icon
  Panel.addToStatusArea "mumble" env.button
  void
    $ Actor.onButtonPressEvent env.button (onTalkStart env)
  void
    $ Actor.onButtonReleaseEvent env.button (onTalkEnd env)
  where
  createEnv = do
    button <- PanelMenu.newButton 0.0 "Mumble" false
    muteIcon <- ThemedIcon.new "face-shutmouth-symbolic"
    talkIcon <- ThemedIcon.new "face-smile-big-symbolic"
    icon <- St.Icon.new
    St.add_style_class_name icon "system-status-icon"
    St.Icon.set_gicon icon muteIcon
    pure { button, icon, muteIcon, talkIcon }

  onTalkStart env _ _ = do
    log "Start talking..."
    St.Icon.set_gicon env.icon env.talkIcon
    MumbleDBus.call MumbleDBus.StartTalking
    pure true

  onTalkEnd env _ _ = do
    log "Stop talking..."
    St.Icon.set_gicon env.icon env.muteIcon
    MumbleDBus.call MumbleDBus.StopTalking
    pure true

-- | Disable the extension
disable :: EnvRef -> Effect Unit
disable envRef = do
  log "disable called"
  envM <- Ref.read envRef
  case envM of
    Just env -> Actor.destroy env.button
    Nothing -> log "Oops, no env"

main :: Effect Unit
main = pure unit
