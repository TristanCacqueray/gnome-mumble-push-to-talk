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
import ExtensionUtils as ExtensionUtils
import Gio.SettingsSchemaSource as SettingsSchemaSource
import Gio.Settings as Settings
import ShellUI.Main.WM as WM
import Meta.KeyBindingFlags as KeyBindingFlags
import Shell.ActionMode as ActionMode

type Env
  = { button :: PanelMenu.Button
    , icon :: St.Icon.Icon
    , muteIcon :: Icon
    , talkIcon :: Icon
    , settings :: Settings.Settings
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
  -- Setup top menu
  Actor.add_child env.button env.icon
  Panel.addToStatusArea "mumble" env.button
  void $ Actor.onButtonPressEvent env.button (onClick onTalkStart env)
  void $ Actor.onButtonReleaseEvent env.button (onClick onTalkEnd env)
  -- Setup shortcut
  stateRef <- Ref.new false
  void $ WM.addKeybinding "toggle-mumble" env.settings KeyBindingFlags.ignore_autorepeat ActionMode.all (onKeyBinding env stateRef)
  where
  getSettings = do
    me <- ExtensionUtils.getCurrentExtension
    path <- ExtensionUtils.getPath me "schemas"
    schemaSource <- SettingsSchemaSource.new_from_directory path false
    schema <- SettingsSchemaSource.lookup schemaSource "org.gnome.shell.extensions.gnome-mumble-push-to-talk" false
    Settings.new_full schema

  createEnv = do
    button <- PanelMenu.newButton 0.0 "Mumble" false
    muteIcon <- ThemedIcon.new "face-shutmouth-symbolic"
    talkIcon <- ThemedIcon.new "face-smile-big-symbolic"
    icon <- St.Icon.new
    settings <- getSettings
    St.add_style_class_name icon "system-status-icon"
    St.Icon.set_gicon icon muteIcon
    pure { settings, button, icon, muteIcon, talkIcon }

  onKeyBinding env stateRef = do
    state <- Ref.read stateRef
    if state then
      onTalkStart env
    else
      onTalkEnd env
    Ref.write (not state) stateRef
    pure false

  onClick cb env _ _ = do
    cb env
    pure true

  onTalkStart env = do
    log "Start talking..."
    St.Icon.set_gicon env.icon env.talkIcon
    MumbleDBus.call MumbleDBus.StartTalking

  onTalkEnd env = do
    log "Stop talking..."
    St.Icon.set_gicon env.icon env.muteIcon
    MumbleDBus.call MumbleDBus.StopTalking

-- | Disable the extension
disable :: EnvRef -> Effect Unit
disable envRef = do
  log "disable called"
  envM <- Ref.read envRef
  -- remove top menu
  case envM of
    Just env -> Actor.destroy env.button
    Nothing -> log "Oops, no env"
  -- remove key event handlers
  WM.removeKeybinding "toggle-mumble"

main :: Effect Unit
main = pure unit
