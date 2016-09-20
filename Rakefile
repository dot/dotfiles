require 'rake'
require 'pathname'
require 'shellwords'

HOME = Pathname.new(ENV['HOME'])

### tasks
task default: :all

task all: %w(system tools:all symlink)

task :system do
  system %Q{scripts/osx.sh}
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
end

namespace :tools do
  task all: %w(homebrew)

  task :homebrew do
    unless system %Q{which brew}
      puts "installing homebrew"
      system %Q{./homebrew/init.sh}
      system %Q{./homebrew/cask.sh}
      system %Q{brew cask alfred link}
    else
      system %Q{brew update && brew upgrade}
      system %Q{./homebrew/cask.sh}
    end
  end

  task :ruby do
    # RUBY_CONFIGURE_OPTS="--enable-bundled-libyaml --enable-shared --with-readline-dir=$(brew --prefix readline) --with-openssl-dir=$(brew --prefix openssl)" rbenv install 2.1.1
  end

  task :gime do
    %w(boundary cform segment user_dictionary).each do |file|
      from = Pathname.new('~/Dropbox/environments/macosx/app/google_ime').join("#{file}.db").expand_path
      to = Pathname.new("~/Library/Application Support/Google/JapaneseInput").join("#{file}.db").expand_path
      system %Q{ln -snf #{from.to_s.shellescape} #{to.to_s.shellescape}}
    end
  end
end
