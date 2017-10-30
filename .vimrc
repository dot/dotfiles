filetype off
filetype plugin indent off

" tab
set expandtab
set ts=2 sw=2 sts=2
set listchars=tab:>-
set smartindent

set list
set nocompatible

syntax on
set number
set shellslash
set hidden
set ruler
set wrapscan
set scrolloff=3
set shell=/bin/bash

" バックスペースでインデントや改行を削除できるようにする
set backspace=indent,eol,start

" status line
set statusline=%-50.50f\ %16(\ %m%r%{&fileencoding}\ %{&fileformat}%)%=%l\ /%5L

colorscheme default
set cursorline
:hi clear CursorLine
:hi CursorLine gui=underline
highlight CursorLine ctermbg=black guibg=black

" encoding
set enc=utf-8
set fenc=utf-8
set fencs=utf-8,euc-jp,iso-2022-jp,cp932
set ffs=unix
set ambiwidth=single
set formatoptions+=mM
set fileformats=unix,dos,mac

" search
set nohlsearch
set ignorecase
set smartcase
set incsearch
" doube Esc: ハイライト消去
nmap <ESC><ESC> ;nohlsearch<CR><ESC>

" keymap
nnoremap j gj
nnoremap k gk

filetype plugin indent on
