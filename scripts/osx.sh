#!/usr/bin/env bash

# sudoになる
sudo -v

# キーリピートが期待通り動くようにする
defaults write -g ApplePressAndHoldEnabled -bool false
defaults write -g KeyRepeat -int 0

# ネットワークボリュームに DS_Storeを作らない
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool true

# QuickLookで閲覧中ファイルの文字列を選択コピー可能にする
defaults write com.apple.finder QLEnableTextSelection -bool yes
# タスク切り替え時にQuickLookを非表示にする
defaults write com.apple.finder QLHidePanelOnDeactivate -bool true

# Dockが隠れるときの遅延を無くす
defaults write com.apple.Dock autohide-delay -float 0 &&

# TISwitcherを無効化する
sudo defaults write /System/Library/LaunchAgents/com.apple.tiswitcher Disabled -bool yes
#chmod 644 /System/Library/LaunchAgents/com.apple.tiswitcher.plist
killall TISwitcher

# 起動音を消す
sudo nvram SystemAudioVolume=%80﻿

# ライブラリフォルダを表示
chflags nohidden ~/Library
sudo chflags nohidden /opt

# ヘルプウィンドウを背面にできるようにする
defaults write com.apple.helpviewer DevMode -bool true

# 再開しないようにする
defaults write NSGlobalDomain NSQuitAlwaysKeepsWindows -bool false

# 保存場所のデフォルトをiCloudでなくす
defaults write NSGlobalDomain NSDocumentSaveNewDocumentsToCloud -bool false

# Expand save panel by default
defaults write NSGlobalDomain NSNavPanelExpandedStateForSaveMode -bool true
defaults write NSGlobalDomain NSNavPanelExpandedStateForSaveMode2 -bool true

# Expand print panel by default
defaults write NSGlobalDomain PMPrintingExpandedStateForPrint -bool true
defaults write NSGlobalDomain PMPrintingExpandedStateForPrint2 -bool true

# App Nap を停止する
#defaults write NSGlobalDomain NSAppSleepDisabled -bool YES

# ファンクションキーの設定
# see http://r7kamura.github.io/2014/08/03/as-standard-function-keys.html
defaults write -g com.apple.keyboard.fnState -bool true

# TODO: safari のURLをフルにする設定...

# restart
killall Finder
killall Dock

# xcode client tools
#xcode-select --install
