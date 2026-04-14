{
  pkgs ? import <nixpkgs> { },
}:
let
  inherit (pkgs)
    archipelago
    stdenvNoCC
    ;
in
stdenvNoCC.mkDerivation {
  name = "APQuest Gen";
  src = ./yaml;
  buildInputs = [archipelago];
  buildPhase = ''
    export HOME=$(pwd)
    archipelago Generate -- --player_files_path=$src --outputpath=$out --seed=8675309
  '';
}
