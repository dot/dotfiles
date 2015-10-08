#!/bin/sh
brew cask update
# versioned
## fonts
brew cask install font-source-code-pro
brew cask install font-m-plus
brew cask install font-ricty-diminished
brew cask install font-source-han-code-jp
brew cask install font-roboto
brew cask install font-noto-sans-japanese

brew cask install karabiner
brew cask install alfred
brew cask install appzapper
brew cask install iterm2
brew cask install vagrant
brew cask install virtualbox
brew cask install vlc
brew cask install libreoffice
brew cask install brackets
brew cask install flash
brew cask install silverlight
brew cask install opera
brew cask install techstoreclub-simple-comic
brew cask install haroopad
brew cask install cyberduck
brew cask install sequel-pro
brew cask install pg-commander
brew cask install mysqlworkbench
brew cask install colors
brew cask install p4merge
brew cask install cakebrew
brew cask install trailer
brew cask install nvalt
brew cask install macdown
brew cask install hosts
brew cask install handbrake
brew cask install skim
brew cask install choosy
brew cask install duet
brew cask install bartender
brew cask install firefox
brew cask install xquartz
brew cask install cloudytabs
brew cask install kitematic
brew cask install github-desktop
brew cask install flux
brew cask install delibar
brew cask install goofy
brew cask install hyperswitch
brew cask install ibettercharge
brew cask install imageoptim
brew cask install coconutbattery

# unversioned
brew cask install dropbox --force
brew cask install skype --force
brew cask install onyx --force
brew cask install path-finder --force
brew cask install mou --force
brew cask install teleport --force
brew cask install startninja --force
brew cask install sitesucker --force
brew cask install sitesucker --force
brew cask install notational-velocity --force
brew cask install knock --force
brew cask install google-japanese-ime --force
brew cask install utorrent
brew cask install hotswitch --force
brew cask install flashlight --force
brew cask install macs-fan-control --force
#cleanup
brew cask cleanup
