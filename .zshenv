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

REPORTTIME=3

# add cert file see. brew info curl-ca-cert for rubygems
export SSL_CERT_FILE=/usr/local/opt/curl-ca-bundle/share/ca-bundle.crt
