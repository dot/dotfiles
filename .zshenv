### history
HISTFILE="$HOME/.zhistory"
HISTSIZE=100000
SAVEHIST=100000

### other
export WORDCHARS='*?_-.[]~=&;!#$%^(){}<>'

export PAGER='lv -c'
export LV='-z -Ia -Ou8 -c'
export LESS='--tabs=4 --no-init --LONG-PROMPT --ignore-case'
export GREP_OPTIONS='--color=auto'
export EDITOR='vim'

# locale
export LANG='ja_JP.UTF-8'
export LC_ALL='ja_JP.UTF-8'
#export LC_CTYPE='C'

# GO / GHQ settings
# for go lang
if [ -x "`which go`" ]; then
  export GOROOT=`go env GOROOT`
  export GOPATH=$HOME/projects/.go
fi

REPORTTIME=3
