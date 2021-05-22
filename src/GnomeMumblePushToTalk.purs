-- | The gnome-mumble-push-to-talk extension entry point
module GnomeMumblePushToTalk where

import Clutter.Actor as Actor
import Effect (Effect)
import Effect.Ref as Ref
import ExtensionUtils as ExtensionUtils
import GJS as GJS
import Gio.Icon (Icon)
import Gio.Settings as Settings
import Gio.SettingsSchemaSource as SettingsSchemaSource
import Gio.ThemedIcon as ThemedIcon
import Gnome.Extension (Extension)
import Gnome.Shell.ActionMode as ActionMode
import Gnome.UI.Main.Panel as Panel
import Gnome.UI.Main.WM as WM
import Gnome.UI.PanelMenu as PanelMenu
import Meta.KeyBindingFlags as KeyBindingFlags
import MumbleDBus as MumbleDBus
import Prelude
import St as St
import St.Icon as St.Icon

type Env
  = { button :: PanelMenu.Button
    , icon :: St.Icon.Icon
    , muteIcon :: Icon
    , talkIcon :: Icon
    }

init :: Effect Settings.Settings
init = do
  me <- ExtensionUtils.getCurrentExtension
  path <- ExtensionUtils.getPath me "schemas"
  schemaSource <- SettingsSchemaSource.new_from_directory path false
  schema <- SettingsSchemaSource.lookup schemaSource "org.gnome.shell.extensions.gnome-mumble-push-to-talk" false
  Settings.new_full schema

enable :: Settings.Settings -> Effect Env
enable settings = do
  log "enable called"
  env <- createEnv
  enableTopMenu env
  enableShortCut env
  pure env
  where
  createEnv = do
    button <- PanelMenu.newButton 0.0 "Mumble" false
    muteIcon <- ThemedIcon.new "face-shutmouth-symbolic"
    talkIcon <- ThemedIcon.new "face-smile-big-symbolic"
    icon <- St.Icon.new
    St.add_style_class_name icon "system-status-icon"
    St.Icon.set_gicon icon muteIcon
    pure { button, icon, muteIcon, talkIcon }

  enableTopMenu env = do
    Actor.add_child env.button env.icon
    Panel.addToStatusArea "mumble" env.button
    void $ Actor.onButtonPressEvent env.button (onClick onTalkStart env)
    void $ Actor.onButtonReleaseEvent env.button (onClick onTalkEnd env)

  enableShortCut env = do
    stateRef <- Ref.new false
    void
      $ WM.addKeybinding
          "toggle-mumble"
          settings
          KeyBindingFlags.ignore_autorepeat
          ActionMode.all
          (onKeyBinding env stateRef)

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

disable :: Env -> Effect Unit
disable env = do
  log "disable called"
  disableTopMenu
  disableShortCut
  where
  disableTopMenu = Actor.destroy env.button

  disableShortCut = WM.removeKeybinding "toggle-mumble"

extension :: Extension Settings.Settings Env
extension = { enable, disable, init }

log :: String -> Effect Unit
log msg = GJS.log $ "gnome-mumble-push-to-talk: " <> msg

main :: Effect Unit
main = log "Welcome!"
