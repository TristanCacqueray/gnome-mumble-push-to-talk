DIST := "gnome-mumble-push-to-talk@tristancacqueray.github.io"

all: dist

test-dbus:
	spago bundle-app -m MumbleDBus --to build/test-dbus.js --then "gjs build/test-dbus.js"

.PHONY: install
install:
	mkdir -p ~/.local/share/gnome-shell/extensions/
	ln -s $(PWD)/$(DIST)/ ~/.local/share/gnome-shell/extensions/$(DIST)

.PHONY: test
test:
	dbus-run-session -- gnome-shell --nested --wayland

.PHONY: dist
dist: dist-meta dist-extension

.PHONY: dist-meta
dist-meta:
	mkdir -p $(DIST)/
	dhall-to-json --file ./src/metadata.dhall --output $(DIST)/metadata.json

.PHONY: dist-extension
dist-extension:
	spago bundle-app -m GnomeMumblePushToTalk --to $(DIST)/extension.js
	cat src/main-extension.js >> $(DIST)/extension.js
