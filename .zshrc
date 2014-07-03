bindkey -e

path=( ~/bin \
    $HOME/.rbenv/bin \
    /usr/local/bin /usr/local/sbin \
    /bin /sbin /usr/bin /usr/sbin \
)
fpath=(~/.functions ${fpath})

# for go lang
if [ -x "`which go`" ]; then
  export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
fi

# oh-my-zsh
source ~/.zshrc.ohmy

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
#bindkey '^R' history-incremental-pattern-search-backward
#bindkey '^S' history-incremental-pattern-search-forward

#######################################
# peco hitory
#######################################
function peco-select-history() {
    local tac
    tac="tail -r";
    BUFFER=$(fc -l -n 1 | \
        eval $tac | \
        /usr/local/bin/peco --query "$LBUFFER")
    CURSOR=$#BUFFER
    zle clear-screen
}
zle -N peco-select-history
bindkey '^R' peco-select-history

autoload smart-insert-last-word
zle -N insert-last-word smart-insert-last-word
zstyle :insert-last-word match \
  '*([^[:space:]][[:alpha:]/\\]|[[:alpha:]/\\][^[:space:]])*'
bindkey '^]' insert-last-word

## alias
source ~/.aliases

# init rbenv
eval "$(rbenv init - zsh)"
if [[ -f ~/.rbenv/completions/rbenv.zsh ]]; then
  source ~/.rbenv/completions/rbenv.zsh
fi

# init z
. `brew --prefix`/etc/profile.d/z.sh

# direnv
eval "$(direnv hook zsh)"
