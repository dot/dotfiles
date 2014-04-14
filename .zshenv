bindkey -e

### history
setopt extended_history
setopt hist_expand
setopt hist_ignore_dups
setopt hist_ignore_all_dups
setopt hist_reduce_blanks
setopt hist_no_store
setopt hist_ignore_space
setopt share_history
setopt inc_append_history

HISTFILE="$HOME/.zhistory"
HISTSIZE=100000
SAVEHIST=100000


### completion
autoload -Uz compinit; compinit -u

setopt auto_list
setopt auto_menu
setopt list_packed
setopt list_types
setopt print_eight_bit
setopt complete_in_word
setopt mark_dirs
setopt auto_param_slash
setopt auto_param_keys
setopt magic_equal_subst

setopt numeric_glob_sort
setopt glob_complete
setopt glob_dots

_cache_hosts=(`perl -ne  'if (/^([a-zA-Z0-9.-]+)/) { print "$1\n";}' ~/.ssh/known_hosts`)


### other
 export WORDCHARS='*?_-.[]~=&;!#$%^(){}<>'

setopt no_beep
setopt brace_ccl
setopt auto_pushd
setopt pushd_ignore_dups
setopt interactive_comments

# bindkey
bindkey '^P' history-beginning-search-backward
bindkey '^N' history-beginning-search-forward
bindkey '^X^F' forward-word
bindkey '^X^B' backward-word
bindkey '^R' history-incremental-pattern-search-backward
bindkey '^S' history-incremental-pattern-search-forward
autoload smart-insert-last-word
zle -N insert-last-word smart-insert-last-word
zstyle :insert-last-word match \
  '*([^[:space:]][[:alpha:]/\\]|[[:alpha:]/\\][^[:space:]])*'
bindkey '^]' insert-last-word

export PAGER='lv -c'
export LV='-z -Ia -Ou8 -c'
export LESS='--tabs=4 --no-init --LONG-PROMPT --ignore-case'
export GREP_OPTIONS='--color=auto'
export EDITOR='vim'

# locale
export LANG='ja_JP.UTF-8'
export LC_ALL='ja_JP.UTF-8'
#export LC_CTYPE='C'

REPORTTIME=3

fpath=(~/.functions ${fpath})

# add cert file see. brew info curl-ca-cert for rubygems
export SSL_CERT_FILE=/usr/local/opt/curl-ca-bundle/share/ca-bundle.crt
