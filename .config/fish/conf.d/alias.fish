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
