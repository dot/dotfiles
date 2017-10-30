set fish_greeting

set -gx SHELL (which fish)
set -gx PAGER 'lv -c'
set -gx LV '-z -Ia -Ou8 -c'
set -gx LESS '--tabs=4 --no-init --LONG-PROMPT --ignore-case -R'
set -gx GREP_OPTIONS '--color=auto'
set -gx EDITOR 'vim'

# locale
set -gx LANG 'ja_JP.UTF-8'
set -gx LC_ALL 'ja_JP.UTF-8'
#set -gx LC_CTYPE 'C'

# Goコマンドがあれば、envを設定する
command --search go >/dev/null; and begin
  set -gx GOROOT (go env GOROOT)
  set -gx GOPATH $HOME/projects/.go
  set -gx PATH $GOPATH/bin $PATH
end

# gpg agent　を起動する
#   https://www.gnupg.org/faq/whats-new-in-2.1.html#autostart
gpgconf --launch gpg-agent
set -gx GPG_TTY (/usr/bin/tty)
#set -gx SSH_AUTH_SOCK "$HOME/.gnupg/S.gpg-agent.ssh"

# fish-peco-select-zsh-history
set ZSH_HISTORY_FILE ~/.zhistory

# cd($PWDが変更)されたら ls する。
# functionでcdを上書きすると、prevd/nextd のスタックが効かないので
function chpwd --on-variable PWD
  ls
end

# history を fish shell で共有する
function sync_history
  history --save
  history --merge
end

# pecoるときに historyをsyncする
function peco_select_history_with_sync
#  sync_history
  peco_select_history
end

# keybindings
function fish_user_key_bindings
  bind \cr peco_select_history_with_sync
end

# aliases
balias tm "direnv exec / tmux"
abbr j z
abbr tf terraform
abbr vag "vagrant"
alias git hub
abbr g git

balias diff colordiff
balias ls "ls -GF"
balias la "ls -a"
balias ll "ls -al"
balias jq "jq -C"
balias psa "ps auxw"

## peco
alias o "git ls-files | peco | xargs open -a Atom"
alias e peco_select_ghq_repository
alias psk peco_kill

# for ruby
balias be "bundle exec"
balias bu "bundle update"
balias bi "bundle install"
balias mm "bundle exec middleman"

### functions
function psg
  psa | head -n 1
  psa | grep $argv | grep -v "ps -auxww" | grep -v grep
end

# cdb
function cdb
  set rbcmd "require 'rubygems';gem 'bundler';require 'bundler';Bundler.load.specs.each{|s| puts s.full_gem_path if s.name == '$argv'}"
  echo $rbcmd
  cd (ruby -e $rbcmd)
end

# peco
function peco_kill
  ps ax -o pid,time,command | peco --query "$LBUFFER" | awk '{print $1}' | xargs kill -9
end

function peco_select_history
  history |peco |read foo

  if [ $foo ]
    commandline $foo
  else
    commandline ''
  end
end

if test -d /usr/local/opt/postgresql@9.6/bin
  set -g fish_user_paths "/usr/local/opt/postgresql@9.6/bin" $fish_user_paths
end
