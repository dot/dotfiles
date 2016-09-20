function fish_user_key_bindings
  bind \cr peco_select_history
end

set -gx fish_greeting ""
set -gx SHELL (which fish)

set -gx WORDCHARS '*?_-.[]~=&;!#$%^(){}<>'
set -gx PAGER 'lv -c'
set -gx LV '-z -Ia -Ou8 -c'
set -gx LESS '--tabs=4 --no-init --LONG-PROMPT --ignore-case -R'
set -gx GREP_OPTIONS '--color=auto'
set -gx EDITOR 'vim'

# locale
set -gx LANG 'ja_JP.UTF-8'
set -gx LC_ALL 'ja_JP.UTF-8'
#set -gx LC_CTYPE 'C'

# for go lang
command --search go >/dev/null; and begin
  set -gx GOROOT (go env GOROOT)
  set -gx GOPATH $HOME/projects/.go
end

# for gpg
if begin; test -f ~/.gnupg/.gpg-agent-info; and test -n (pgrep gpg-agent); end
    set -l _GPG_AGENT_INFO (cat ~/.gnupg/.gpg-agent-info| tr -s '=' \n)
    set -gx GPG_AGENT_INFO $_GPG_AGENT_INFO[2]
end; or begin
    gpg-agent --daemon --write-env-file ~/.gnupg/.gpg-agent-info
end
