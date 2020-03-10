#!/bin/sh

ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" && hash -r && brew bundle
hash -r

brew tap Homebrew/bundle
brew bundle
