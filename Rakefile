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
    puts "installing homebrew"
    system %Q{./homebrew/init.sh}
  end
end
