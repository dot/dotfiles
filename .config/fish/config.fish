set fish_greeting

set -gx SHELL (which fish)
#set -gx PAGER 'lv -c'
set -gx LV '-z -Ia -Ou8 -c'
set -gx LESS '--tabs=4 --no-init --LONG-PROMPT --ignore-case -R'
set -gx GREP_OPTIONS '--color=auto'
set -gx EDITOR 'vim'
set -g fish_prompt_pwd_dir_length 0
set -x HOMEBREW_INSTALL_CLEANUP 1
set -gx PATH /usr/local/opt/terraform@0.11/bin $PATH
set GHQ_SELECTOR peco

# locale
#set -gx LANG 'ja_JP.UTF-8'
set -gx LANG 'en_US.UTF-8'
#set -gx LC_ALL 'ja_JP.UTF-8'
set -gx LC_ALL 'en_US.UTF-8'
#set -gx LC_CTYPE 'C'

# Goコマンドがあれば、envを設定する
command --search go >/dev/null; and begin
  set -gx GOROOT (go env GOROOT)
  set -gx GOPATH $HOME/projects/.go
  set -gx PATH $PATH $GOPATH/bin
end

eval (direnv hook fish)

# gpg agent を起動する
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

# aliases
alias tm "direnv exec / tmux"
abbr j z
abbr tf terraform
abbr vag "vagrant"
#balias git hub
abbr g git

alias diff colordiff
alias exa "exa -GF"
alias ls "exa"
alias la "ls -a"
alias ll "ls -al"
alias jq "jq -C"
alias psa "ps auxw"

## peco
alias o "git ls-files | peco | xargs open -a Atom"
alias e peco_select_ghq_repository
alias psk peco_kill

# for ruby
alias be "bundle exec"
alias bu "bundle update"
alias bi "bundle install"

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
  if test (count $argv) = 0
    set peco_flags
  else
    set peco_flags --query "$argv"
  end

  history|peco $peco_flags|read foo

  if [ $foo ]
    commandline $foo
  else
    commandline ''
  end
end

function fish_user_key_bindings
  bind \cr 'peco_select_history (commandline -b)' # Bind for prco history to Ctrl+r
end

#starship init fish | source
