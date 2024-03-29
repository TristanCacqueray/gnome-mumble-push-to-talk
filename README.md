gnome-mumble-push-to-talk
=========================

A gnome extension to enable Mumble push to talk.

# Usage

Push the top menu face icon to talk. Or toggle mute with the `<Shift>Escape` shortcut.

# Install

Copy the `gnome-mumble-push-to-talk@tristancacqueray.github.io` directory to your `~/.local/share/gnome-shell/extensions/`.

Restart gnome-shell session if needed.

Then run `gnome-extensions enable gnome-mumble-push-to-talk@tristancacqueray.github.io`.

# Contribute

Contributions are most welcome:

- A setting widget to change the shortcut.
- Hide the top menu icon when mumble is not running.

To modify the extension, you will need a [PureScript][purescript] toolchain and the gnome developper tool.

Run the `nix develop` command to setup.

```ShellSession
# Build javascript
make dist

# Run a nested gnome-shell session
make test
```

Checkout the [purescript-gjs][purescript-gjs] bindings too.

# Changes

## 0.1

- Initial release.

[purescript]: https://www.purescript.org/
[purescript-gjs]: https://github.com/purescript-gjs/purescript-gjs
