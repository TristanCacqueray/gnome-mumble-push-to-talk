gnome-mumble-push-to-talk
=========================

A gnome extension to enable Mumble push to talk.

# Usage

Maintain both `<shift>` then `<window>` keys pressed to trigger push to talk.

# Install

Copy the `mumble-push-to-talk@tristancacqueray.github.io` directory to your `~/.local/share/gnome-shell/extensions/`

Then run `gnome-extensions enable mumble-push-to-talk@tristancacqueray.github.io`

# Contribute

Contributions are most welcome.

To modify the extension, you will need a [PureScript][purescript] toolchain and the gnome developper tool.

Run the `nix-shell` command to setup.w

```ShellSession
# Ensure purescript-gjs is cloned in the parent directory
git clone https://github.com/purescript-gjs/purescript-gjs ../purescript-gjs
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
