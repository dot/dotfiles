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
killall Finder

# Dockが隠れるときの遅延を無くす
defaults write com.apple.Dock autohide-delay -float 0 &&
killall Dock

# TISwitcherを無効化する
sudo defaults write /System/Library/LaunchAgents/com.apple.tiswitcher Disabled -bool yes
chmod 644 /System/Library/LaunchAgents/com.apple.tiswitcher.plist
killall TISwitcher

# 起動音を消す
sudo nvram SystemAudioVolume=%80﻿

# ライブラリフォルダを表示
chflags nohidden ~/Library

# ヘルプウィンドウを背面にできるようにする
defaults write com.apple.helpviewer DevMode -bool true

# xcode client tools
xcode-select --install
