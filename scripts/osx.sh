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

# hide dock
defaults write com.apple.dock autohide -bool true
defaults write com.apple.dock autohide-delay -float 0

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

# Enable the `Develop` menu and the `Web Inspector` （開発メニューを表示）
defaults write com.apple.Safari com.apple.Safari.ContentPageGroupIdentifier.WebKit2DeveloperExtrasEnabled -bool true
defaults write com.apple.Safari IncludeDevelopMenu -bool true
defaults write com.apple.Safari WebKitDeveloperExtrasEnabledPreferenceKey -bool true
# Enable `Debug` menu （メニュー → デバッグを表示）
defaults write com.apple.Safari IncludeInternalDebugMenu -bool true
# アドレスバーに完全なURLを表示
defaults write com.apple.Safari ShowFullURLInSmartSearchField -bool true
# コンテキストメニューにWebインスペクタを追加
defaults write NSGlobalDomain WebKitDeveloperExtras -bool true
# Show Safari's Status Bar （ステータスバーを表示）
defaults write com.apple.Safari ShowStatusBar -bool true

# scrolling
defaults write -g NSScrollAnimationEnabled -bool NO

# touch pad behaviour
defaults write com.apple.AppleMultitouchTrackpad Clicking -int 1
defaults write com.apple.AppleMultitouchTrackpad TrackpadRightClick -int 1
defaults write com.apple.driver.AppleBluetoothMultitouch.trackpad Clicking -int 1
defaults write com.apple.driver.AppleBluetoothMultitouch.trackpad TrackpadRightClick -int 1


# restart
killall Finder
killall Dock

# xcode client tools
#xcode-select --install
