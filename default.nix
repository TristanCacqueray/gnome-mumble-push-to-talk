{ pkgs ? import <nixpkgs> { } }:

let
  easy-ps = import (pkgs.fetchFromGitHub {
    owner = "justinwoo";
    repo = "easy-purescript-nix";
    rev = "9b56211d";
    sha256 = "1xkbvcjx5qyz5z7qjampxnhpvvg5grv5ikqpjr1glrfs1lvjff49";
  }) { inherit pkgs; };
  easy-dhall = import (pkgs.fetchFromGitHub {
    owner = "justinwoo";
    repo = "easy-dhall-nix";
    rev = "1f6eecab5c276a59858a10bbfcbbc5611187da03";
    sha256 = "07n7y93xfiwr82yx2v8r5mxcafsxgs1hdl1ghq6xah5v827fb6q0";
  }) { inherit pkgs; };
in pkgs.mkShell {
  buildInputs = [
    pkgs.gnumake
    easy-dhall.dhall-simple
    easy-dhall.dhall-json-simple
    easy-ps.purs
    easy-ps.spago
  ];
}
