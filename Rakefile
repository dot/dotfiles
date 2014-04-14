require 'rake'
require 'pathname'

HOME = Pathname.new(ENV['HOME'])

### tasks
task default: :all

task all: %w(system tools:all symlink)

task :system do
  system %Q{script/osx.sh}
end

task :symlink do
  # dotfiles
  Pathname.glob('.[a-zA-Z]*').reject {|path| path.to_s == '.git'}.map {|path|
    _path = path.expand_path
    [_path.relative_path_from(HOME), HOME + _path.basename]
  }.each do |from, to|
    #ln_sf from, to
    system %Q{ln -snf #{from} #{to}}
  end

  # other
  %w(bin).each do |path|
    system %Q{ln -snf #{Pathname(path).expand_path.relative_path_from(HOME)} #{HOME + path}}
  end
  # copy theme
  theme_path = Pathname("#{HOME}/.oh-my-zsh/custom")
  ln_sf Pathname('misc/oh-my-zsh/ys-dot.zsh-theme').expand_path.relative_path_from(theme_path), theme_path
end

namespace :tools do
#  task all: %w(oh_my_zsh homebrew ruby)
  task :oh_my_zsh do
    unless File.exist?(File.join(ENV['HOME'], ".oh-my-zsh"))
      puts "installing oh-my-zsh"
      system %Q{git clone https://github.com/robbyrussell/oh-my-zsh.git "#{HOME}/.oh-my-zsh"}
    else
      # git pull
    end
  end

  task :homebrew do
    unless system %Q{which brew}
      puts "installing homebrew"
      system %Q{ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"}
      system %Q{brew bundle brewfile}
    else
      # system %Q{brew update && brew upgrade}
    end
    system %Q{brew bundle caskfile}
  end

  task :ruby do
    # RUBY_CONFIGURE_OPTS="--enable-bundled-libyaml --enable-shared --with-readline-dir=$(brew --prefix readline) --with-openssl-dir=$(brew --prefix openssl)" rbenv install 2.1.1
  end
end
