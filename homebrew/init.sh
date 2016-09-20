#!/bin/sh

ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
hash -r

brew tap homebrew/dupes
brew tap motemen/ghq
brew tap caskroom/fonts
brew tap caskroom/cask
brew tap homebrew/binary
brew tap homebrew/science
brew tap tkengo/highway

brew update

brew install unzip
brew install caskroom/cask/brew-cask
brew install peco
brew install ghq
brew install highway

brew install ag
brew install pt
brew install lv
brew install colordiff
brew install coreutils
brew install nkf
brew install htop-osx
brew install pstree
brew install ssh-copy-id
brew install tmux
brew install tree
brew install reattach-to-user-namespace
brew install wget
brew install curl
brew install xz
brew install z
brew install zsh
brew install fish
brew install zsh-completions
brew install renameutils
brew install rlwrap
brew install mobile-shell
brew install jq
brew install jo
brew install jsonpp
brew install direnv
brew install highlight
brew install gibo
brew install awscli

brew install openssl
brew install readline
brew install libxml2

brew install git
brew install mercurial
brew install tig
brew install hub
brew install heroku-toolbelt
brew install gnupg2 gpg-agent pinentry-mac

brew install mongodb
brew install node
brew install phantomjs
brew install postgresql
brew install mysql
brew install redis
brew install sqlite
brew install vim
brew install emacs --cocoa --japanese --srgb
brew install assh

brew install dnsmasq

brew install rbenv
brew install rbenv-default-gems
brew install rbenv-gem-rehash
brew install rbenv-gemset
brew install ruby-build

brew install docker
brew install docker-machine
brew install docker-compose
brew install docker-clean
brew install ansible
brew install packer
brew install terraform
brew install otto

brew install fzf
brew install neovim/neovim/neovim
brew install R
brew install go
