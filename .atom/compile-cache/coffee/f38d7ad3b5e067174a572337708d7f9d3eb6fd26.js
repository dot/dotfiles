(function() {
  var CompositeDisposable, MinimapFindAndReplaceBinding;

  CompositeDisposable = require('atom').CompositeDisposable;

  MinimapFindAndReplaceBinding = null;

  module.exports = {
    active: false,
    bindingsById: {},
    subscriptionsById: {},
    isActive: function() {
      return this.active;
    },
    activate: function(state) {
      return this.subscriptions = new CompositeDisposable;
    },
    consumeMinimapServiceV1: function(minimap) {
      this.minimap = minimap;
      return this.minimap.registerPlugin('find-and-replace', this);
    },
    deactivate: function() {
      this.minimap.unregisterPlugin('find-and-replace');
      return this.minimap = null;
    },
    activatePlugin: function() {
      if (this.active) {
        return;
      }
      this.active = true;
      this.subscriptions.add(this.minimap.observeMinimaps((function(_this) {
        return function(minimap) {
          var binding;
          if (MinimapFindAndReplaceBinding == null) {
            MinimapFindAndReplaceBinding = require('./minimap-find-and-replace-binding');
          }
          binding = new MinimapFindAndReplaceBinding(minimap);
          _this.bindingsById[minimap.id] = binding;
          return _this.subscriptionsById[minimap.id] = minimap.onDidDestroy(function() {
            var _ref, _ref1;
            if ((_ref = _this.subscriptionsById[minimap.id]) != null) {
              _ref.dispose();
            }
            if ((_ref1 = _this.bindingsById[minimap.id]) != null) {
              _ref1.destroy();
            }
            delete _this.bindingsById[minimap.id];
            return delete _this.subscriptionsById[minimap.id];
          });
        };
      })(this)));
      return this.subscriptions.add(atom.commands.add('atom-workspace', {
        'find-and-replace:show': (function(_this) {
          return function() {
            return _this.discoverMarkers();
          };
        })(this),
        'find-and-replace:toggle': (function(_this) {
          return function() {
            return _this.discoverMarkers();
          };
        })(this),
        'find-and-replace:show-replace': (function(_this) {
          return function() {
            return _this.discoverMarkers();
          };
        })(this),
        'core:cancel': (function(_this) {
          return function() {
            return _this.clearBindings();
          };
        })(this),
        'core:close': (function(_this) {
          return function() {
            return _this.clearBindings();
          };
        })(this)
      }));
    },
    deactivatePlugin: function() {
      var binding, id, sub, _ref, _ref1;
      if (!this.active) {
        return;
      }
      this.active = false;
      this.subscriptions.dispose();
      _ref = this.subscriptionsById;
      for (id in _ref) {
        sub = _ref[id];
        sub.dispose();
      }
      _ref1 = this.bindingsById;
      for (id in _ref1) {
        binding = _ref1[id];
        binding.destroy();
      }
      this.bindingsById = {};
      return this.subscriptionsById = {};
    },
    discoverMarkers: function() {
      var binding, id, _ref, _results;
      _ref = this.bindingsById;
      _results = [];
      for (id in _ref) {
        binding = _ref[id];
        _results.push(binding.discoverMarkers());
      }
      return _results;
    },
    clearBindings: function() {
      var binding, id, _ref, _results;
      _ref = this.bindingsById;
      _results = [];
      for (id in _ref) {
        binding = _ref[id];
        _results.push(binding.clear());
      }
      return _results;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2tvbmRvL0Ryb3Bib3gvZG90ZmlsZXMvLmF0b20vcGFja2FnZXMvbWluaW1hcC1maW5kLWFuZC1yZXBsYWNlL2xpYi9taW5pbWFwLWZpbmQtYW5kLXJlcGxhY2UuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGlEQUFBOztBQUFBLEVBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUFELENBQUE7O0FBQUEsRUFDQSw0QkFBQSxHQUErQixJQUQvQixDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsTUFBQSxFQUFRLEtBQVI7QUFBQSxJQUNBLFlBQUEsRUFBYyxFQURkO0FBQUEsSUFFQSxpQkFBQSxFQUFtQixFQUZuQjtBQUFBLElBSUEsUUFBQSxFQUFVLFNBQUEsR0FBQTthQUFHLElBQUMsQ0FBQSxPQUFKO0lBQUEsQ0FKVjtBQUFBLElBTUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO2FBQ1IsSUFBQyxDQUFBLGFBQUQsR0FBaUIsR0FBQSxDQUFBLG9CQURUO0lBQUEsQ0FOVjtBQUFBLElBU0EsdUJBQUEsRUFBeUIsU0FBRSxPQUFGLEdBQUE7QUFDdkIsTUFEd0IsSUFBQyxDQUFBLFVBQUEsT0FDekIsQ0FBQTthQUFBLElBQUMsQ0FBQSxPQUFPLENBQUMsY0FBVCxDQUF3QixrQkFBeEIsRUFBNEMsSUFBNUMsRUFEdUI7SUFBQSxDQVR6QjtBQUFBLElBWUEsVUFBQSxFQUFZLFNBQUEsR0FBQTtBQUNWLE1BQUEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxnQkFBVCxDQUEwQixrQkFBMUIsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLE9BQUQsR0FBVyxLQUZEO0lBQUEsQ0FaWjtBQUFBLElBZ0JBLGNBQUEsRUFBZ0IsU0FBQSxHQUFBO0FBQ2QsTUFBQSxJQUFVLElB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

//# sourceURL=/Users/kondo/Dropbox/dotfiles/.atom/packages/minimap-find-and-replace/lib/minimap-find-and-replace.coffee
