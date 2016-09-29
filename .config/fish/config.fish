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
end

# gpg agent　を起動する
if begin; test -f ~/.gnupg/.gpg-agent-info; and test -n (pgrep gpg-agent); end
    set -l _GPG_AGENT_INFO (cat ~/.gnupg/.gpg-agent-info| tr -s '=' \n)
    set -gx GPG_AGENT_INFO $_GPG_AGENT_INFO[2]
end; or begin
    gpg-agent --daemon --write-env-file ~/.gnupg/.gpg-agent-info
end

# fish-peco-select-zsh-history
set ZSH_HISTORY_FILE ~/.zhistory

# cd($PWDが変更)されたら ls する。
# functionでcdを上書きすると、prevd/nextd のスタックが効かないので
function chpwd --on-variable PWD
  ls
end

# history を fish shell で共有する
function sync_history --on-event fish_preexec
    history --save
    history --merge
end

# pecoるときに historyをsyncする
function peco_select_history_with_sync
  sync_history
  pec_select_history
end

# keybindings
function fish_user_key_bindings
  bind \cr peco_select_history_with_sync
end

# aliases
balias diff colordiff
balias ls "ls -GF"
balias la "ls -a"
balias ll "ls -al"
abbr tm tmux
abbr j z
balias jq "jq -C"
abbr tf terraform

# for ruby
balias be "bundle exec"
balias bu "bundle update"
balias bi "bundle install"
abbr vag "vagrant"
balias mm "bundle exec middleman"

### functions
function chpwd
#  builtin cd $argv
  cd $argv
  ls
end

balias psa "ps auxw"
function psg
  psa | head -n 1
  psa | grep $argv | grep -v "ps -auxww" | grep -v grep
end
alias psk peco_kill

# cdb
function cdb
  set rbcmd "require 'rubygems';gem 'bundler';require 'bundler';Bundler.load.specs.each{|s| puts s.full_gem_path if s.name == '$argv'}"
  echo $rbcmd
  cd (ruby -e $rbcmd)
end

## peco
alias o "git ls-files | peco | xargs open -a Atom"
alias e peco_select_ghq_repository
