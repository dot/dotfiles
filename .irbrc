require 'irb/completion'
require 'irb/ext/save-history'


require 'what_methods' rescue nil
require 'wirb' rescue nil
Wirb.start rescue nil

IRB.conf[:PROMPT_MODE] = :SIMPLE if IRB.conf[:PROMPT_MODE] == :DEFAULT
IRB.conf[:USE_READLINE] = true
IRB.conf[:AUTO_INDENT] = true
IRB.conf[:SAVE_HISTORY] = 100000
IRB.conf[:HISTORY_FILE] = File.expand_path('~/.irb_history')

if defined? Rails::Console
  if defined? Hirb
    Hirb.enable
  end
end
