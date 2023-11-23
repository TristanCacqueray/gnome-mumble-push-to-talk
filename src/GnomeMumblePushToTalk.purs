-- | The gnome-mumble-push-to-talk extension entry point
module GnomeMumblePushToTalk where

import Prelude
import Clutter.Actor as Actor
import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Effect.Ref as Ref
import ExtensionUtils as ExtensionUtils
import GJS as GJS
import GLib as GLib
import GLib.DateTime as GLib.DateTime
import GLib.TimeSpan (TimeSpan(..))
import Gio.Icon (Icon)
import Gio.Settings as Settings
import Gio.SettingsSchemaSource as SettingsSchemaSource
import Gio.ThemedIcon as ThemedIcon
import ExtensionUtils (ExtensionMetadata)
import Gnome.Extension (Extension)
import Gnome.Shell.ActionMode as ActionMode
import Gnome.UI.Main.Panel as Panel
import Gnome.UI.Main.WM as WM
import Gnome.UI.PanelMenu as PanelMenu
import Meta.KeyBindingFlags as KeyBindingFlags
import MumbleDBus as MumbleDBus
import St as St
import St.Icon as St.Icon

type Env
  = { button :: PanelMenu.Button
    , icon :: St.Icon.Icon
    , muteIcon :: Icon
    , talkIcon :: Icon
    }

extension_init :: ExtensionMetadata -> Effect Settings.Settings
extension_init me = do
  path <- ExtensionUtils.getPath me "schemas"
  schemaSource <- SettingsSchemaSource.new_from_directory path false
  schema <- SettingsSchemaSource.lookup schemaSource "org.gnome.shell.extensions.gnome-mumble-push-to-talk" false
  Settings.new_full schema

extension_enable :: Settings.Settings -> Effect Env
extension_enable settings = do
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
    timerRef <- Ref.new Nothing
    void
      $ WM.addKeybinding
          "toggle-mumble"
          settings
          KeyBindingFlags.none
          ActionMode.all
          (onKeyBinding env timerRef)

  onKeyBinding env timerRef = do
    timerM <- Ref.read timerRef
    case timerM of
      Just (Tuple begin timer) -> do
        now <- GLib.DateTime.new_now_utc
        let
          TimeSpan diff = GLib.DateTime.difference now begin
        when (diff >= 400000)
          ( do
              GLib.sourceRemove timer
              startCanceller now
          )
      Nothing -> do
        onTalkStart env
        now <- GLib.DateTime.new_now_utc
        startCanceller now
    pure false
    where
    startCanceller now = do
      timer <- GLib.timeoutAdd 500 releasePushToTalk
      Ref.write (Just $ Tuple now timer) timerRef

    releasePushToTalk = do
      onTalkEnd env
      Ref.write Nothing timerRef
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

extension_disable :: Env -> Effect Unit
extension_disable env = do
  log "disable called"
  disableTopMenu
  disableShortCut
  where
  disableTopMenu = Actor.destroy env.button

  disableShortCut = WM.removeKeybinding "toggle-mumble"

extension :: Extension Settings.Settings Env
extension = { extension_enable, extension_disable, extension_init }

log :: String -> Effect Unit
log msg = GJS.log $ "gnome-mumble-push-to-talk: " <> msg

main :: Effect Unit
main = log "Welcome!"
