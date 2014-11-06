#!/bin/sh

ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
hash -r

brew tap peco/peco
brew tap homebrew/dupes
brew tap motemen/ghq
brew tap caskroom/fonts
brew update

brew install unzip
brew install caskroom/cask/brew-cask
brew install peco
brew install ghq

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
brew install zsh-completions
brew install renameutils
brew install rlwrap
brew install mobile-shell
brew install jq
brew install jsonpp
brew install direnv
brew install highlight

brew install openssl
brew install readline

brew install git
brew install mercurial
brew install tig
brew install hub
brew install heroku-toolbelt

brew install mongodb
brew install node
brew install phantomjs
brew install postgresql
brew install mysql
brew install qt
brew install redis
brew install sqlite
brew install vim
brew install emacs --cocoa --japanese --srgb

brew install dnsmasq

brew install rbenv
brew install rbenv-default-gems
brew install rbenv-gem-rehash
brew install rbenv-gemset
brew install ruby-build

brew install docker
brew install boot2docker
brew install ansible
