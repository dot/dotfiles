(function() {
  var RsenseProvider;

  RsenseProvider = require('./autocomplete-elixir-provider.coffee');

  module.exports = {
    config: {
      elixirPath: {
        type: 'string',
        "default": "",
        description: "Absolute path to elixir executable (essential for MacOS)"
      },
      erlangHome: {
        type: 'string',
        "default": "",
        description: "Absolute path to erlang bin directory (essential for MacOS)"
      }
    },
    rsenseProvider: null,
    activate: function(state) {
      return this.rsenseProvider = new RsenseProvider();
    },
    provideAutocompletion: function() {
      return [this.rsenseProvider];
    },
    deactivate: function() {
      var _ref;
      if ((_ref = this.rsenseProvider) != null) {
        _ref.dispose();
      }
      return this.rsenseProvider = null;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2tvbmRvL0Ryb3Bib3gvZG90ZmlsZXMvLmF0b20vcGFja2FnZXMvYXV0b2NvbXBsZXRlLWVsaXhpci9saWIvYXV0b2NvbXBsZXRlLWVsaXhpci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsY0FBQTs7QUFBQSxFQUFBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLHVDQUFSLENBQWpCLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLFVBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxFQURUO0FBQUEsUUFFQSxXQUFBLEVBQWEsMERBRmI7T0FERjtBQUFBLE1BSUEsVUFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sUUFBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLEVBRFQ7QUFBQSxRQUVBLFdBQUEsRUFBYSw2REFGYjtPQUxGO0tBREY7QUFBQSxJQVVBLGNBQUEsRUFBZ0IsSUFWaEI7QUFBQSxJQVlBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTthQUNSLElBQUMsQ0FBQSxjQUFELEdBQXNCLElBQUEsY0FBQSxDQUFBLEVBRGQ7SUFBQSxDQVpWO0FBQUEsSUFlQSxxQkFBQSxFQUF1QixTQUFBLEdBQUE7YUFDckIsQ0FBQyxJQUFDLENBQUEsY0FBRixFQURxQjtJQUFBLENBZnZCO0FBQUEsSUFrQkEsVUFBQSxFQUFZLFNBQUEsR0FBQTtBQUNWLFVBQUEsSUFBQTs7WUFBZSxDQUFFLE9BQWpCLENBQUE7T0FBQTthQUNBLElBQUMsQ0FBQSxjQUFELEdBQWtCLEtBRlI7SUFBQSxDQWxCWjtHQUhGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/kondo/Dropbox/dotfiles/.atom/packages/autocomplete-elixir/lib/autocomplete-elixir.coffee
