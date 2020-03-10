#!/usr/bin/env bash

# sudoになる
sudo -v

# 起動音を消す
sudo nvram SystemAudioVolume=" "

# キーのリピート
defaults write -g ApplePressAndHoldEnabled -bool false
defaults write -g InitialKeyRepeat -int 15 # 150ms
defaults write -g KeyRepeat -int 2 # 15ms

# ネットワークボリュームに DS_Storeを作らない
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool true
# ライブラリフォルダを表示
chflags nohidden ~/Library
sudo chflags nohidden /opt

# タスク切り替え時にQuickLookを非表示にする
#defaults write com.apple.finder QLHidePanelOnDeactivate -bool true

# hide dock
defaults write com.apple.dock autohide -bool true
defaults write com.apple.dock autohide-delay -float 0

# TISwitcherを無効化する
# use safe mode and csrutil disable
#sudo defaults write /System/Library/LaunchAgents/com.apple.tiswitcher Disabled -bool yes
#chmod 644 /System/Library/LaunchAgents/com.apple.tiswitcher.plist
#killall TISwitcher


# Guest Login を不可に
#sudo defaults write /Library/Preferences/com.apple.loginwindow GuestEnabled -bool FALSE

# ヘルプウィンドウを背面にできるようにする
#defaults write com.apple.helpviewer DevMode -bool true

# 再開しないようにする
defaults write NSGlobalDomain NSQuitAlwaysKeepsWindows -bool false

# 保存場所のデフォルトをiCloudでなくす
#defaults write NSGlobalDomain NSDocumentSaveNewDocumentsToCloud -bool false

# Expand save panel by default
#defaults write NSGlobalDomain NSNavPanelExpandedStateForSaveMode -bool true
#defaults write NSGlobalDomain NSNavPanelExpandedStateForSaveMode2 -bool true

# Expand print panel by default
#defaults write NSGlobalDomain PMPrintingExpandedStateForPrint -bool true
#defaults write NSGlobalDomain PMPrintingExpandedStateForPrint2 -bool true

# App Nap を停止する
#defaults write NSGlobalDomain NSAppSleepDisabled -bool YES

# ファンクションキーの設定
# see http://r7kamura.github.io/2014/08/03/as-standard-function-keys.html
defaults write -g com.apple.keyboard.fnState -bool true

# modifier keyの設定
# caps to ctrl
# keybdid=$(ioreg -n IOHIDKeyboard -r | grep -E 'VendorID"|ProductID' | awk '{ print $4 }' | paste -s -d'-\n' -)'-0'
# defaults -currentHost write -g com.apple.keyboard.modifiermapping.${keyboardid} -array-add '<dict><key>HIDKeyboardModifierMappingDst</key><integer>2</integer><key>HIDKeyboardModifierMappingSrc</key><integer>0</integer></dict>'

# shortcutkeys
# IME切り替えを Ctrl+o に
#defaults write com.apple.symbolichotkeys AppleSymbolicHotKeys -dict-add 60 "<dict><key>enabled</key><true/><key>value</key><dict><key>parameters</key><array><integer>111</integer><integer>31</integer><integer>262144</integer></array><key>type</key><string>standard</string></dict></dict>"
#defaults write com.apple.symbolichotkeys AppleSymbolicHotKeys -dict-add 61 "<dict><key>enabled</key><true/><key>value</key><dict><key>parameters</key><array><integer>111</integer><integer>31</integer><integer>393216</integer></array><key>type</key><string>standard</string></dict></dict>"

# for Safari
## Enable the `Develop` menu and the `Web Inspector` （開発メニューを表示）
# defaults write com.apple.Safari com.apple.Safari.ContentPageGroupIdentifier.WebKit2DeveloperExtrasEnabled -bool true
# defaults write com.apple.Safari IncludeDevelopMenu -bool true
# defaults write com.apple.Safari WebKitDeveloperExtrasEnabledPreferenceKey -bool true
# ## Enable `Debug` menu （メニュー → デバッグを表示）
# defaults write com.apple.Safari IncludeInternalDebugMenu -bool true
# アドレスバーに完全なURLを表示
defaults write com.apple.Safari ShowFullURLInSmartSearchField -bool true
# コンテキストメニューにWebインスペクタを追加
# defaults write NSGlobalDomain WebKitDeveloperExtras -bool true
# Show Safari's Status Bar （ステータスバーを表示）
# defaults write com.apple.Safari ShowStatusBar -bool true

# scrolling
# defaults write -g NSScrollAnimationEnabled -bool NO

# touch pad behaviour
defaults write com.apple.AppleMultitouchTrackpad Clicking -int 1
defaults write com.apple.AppleMultitouchTrackpad TrackpadRightClick -int 1
defaults write com.apple.driver.AppleBluetoothMultitouch.trackpad Clicking -int 1
defaults write com.apple.driver.AppleBluetoothMultitouch.trackpad TrackpadRightClick -int 1

# c.f. https://twitter.com/ummjackson/status/1044437123942645760
defaults write -g CGFontRenderingFontSmoothingDisabled -bool NO

# kill hardware chime for macbook when battery powered
defaults write com.apple.PowerChime ChimeOnNoHardware -bool true

# restart
killall Finder
killall Dock
killall PowerChime

# xcode client tools
#xcode-select --install
