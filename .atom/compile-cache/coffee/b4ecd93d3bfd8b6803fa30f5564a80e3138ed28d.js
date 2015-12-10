(function() {
  var CompositeDisposable, Disposable, MinimapGitDiff, MinimapGitDiffBinding, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ref = require('atom'), CompositeDisposable = _ref.CompositeDisposable, Disposable = _ref.Disposable;

  MinimapGitDiffBinding = null;

  MinimapGitDiff = (function() {
    MinimapGitDiff.prototype.pluginActive = false;

    function MinimapGitDiff() {
      this.destroyBindings = __bind(this.destroyBindings, this);
      this.createBindings = __bind(this.createBindings, this);
      this.activateBinding = __bind(this.activateBinding, this);
      this.subscriptions = new CompositeDisposable;
    }

    MinimapGitDiff.prototype.isActive = function() {
      return this.pluginActive;
    };

    MinimapGitDiff.prototype.activate = function() {
      return this.bindings = new WeakMap;
    };

    MinimapGitDiff.prototype.consumeMinimapServiceV1 = function(minimap) {
      this.minimap = minimap;
      return this.minimap.registerPlugin('git-diff', this);
    };

    MinimapGitDiff.prototype.deactivate = function() {
      this.destroyBindings();
      return this.minimap = null;
    };

    MinimapGitDiff.prototype.activatePlugin = function() {
      var e;
      if (this.pluginActive) {
        return;
      }
      try {
        this.activateBinding();
        this.pluginActive = true;
        this.subscriptions.add(this.minimap.onDidActivate(this.activateBinding));
        return this.subscriptions.add(this.minimap.onDidDeactivate(this.destroyBindings));
      } catch (_error) {
        e = _error;
        return console.log(e);
      }
    };

    MinimapGitDiff.prototype.deactivatePlugin = function() {
      if (!this.pluginActive) {
        return;
      }
      this.pluginActive = false;
      this.subscriptions.dispose();
      return this.destroyBindings();
    };

    MinimapGitDiff.prototype.activateBinding = function() {
      if (this.getRepositories().length > 0) {
        this.createBindings();
      }
      return this.subscriptions.add(atom.project.onDidChangePaths((function(_this) {
        return function() {
          if (_this.getRepositories().length > 0) {
            return _this.createBindings();
          } else {
            return _this.destroyBindings();
          }
        };
      })(this)));
    };

    MinimapGitDiff.prototype.createBindings = function() {
      MinimapGitDiffBinding || (MinimapGitDiffBinding = require('./minimap-git-diff-binding'));
      return this.subscriptions.add(this.minimap.observeMinimaps((function(_this) {
        return function(o) {
          var binding, editor, minimap, _ref1;
          minimap = (_ref1 = o.view) != null ? _ref1 : o;
          editor = minimap.getTextEditor();
          if (editor == null) {
            return;
          }
          binding = new MinimapGitDiffBinding(minimap);
          return _this.bindings.set(minimap, binding);
        };
      })(this)));
    };

    MinimapGitDiff.prototype.getRepositories = function() {
      return atom.project.getRepositories().filter(function(repo) {
        return repo != null;
      });
    };

    MinimapGitDiff.prototype.destroyBindings = function() {
      if (!((this.minimap != null) && (this.minimap.editorsMinimaps != null))) {
        return;
      }
      return this.minimap.editorsMinimaps.forEach((function(_this) {
        return function(minimap) {
          var _ref1;
          if ((_ref1 = _this.bindings.get(minimap)) != null) {
            _ref1.destroy();
          }
          return _this.bindings["delete"](minimap);
        };
      })(this));
    };

    return MinimapGitDiff;

  })();

  module.exports = new MinimapGitDiff;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2tvbmRvL0Ryb3Bib3gvZG90ZmlsZXMvLmF0b20vcGFja2FnZXMvbWluaW1hcC1naXQtZGlmZi9saWIvbWluaW1hcC1naXQtZGlmZi5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsNEVBQUE7SUFBQSxrRkFBQTs7QUFBQSxFQUFBLE9BQW9DLE9BQUEsQ0FBUSxNQUFSLENBQXBDLEVBQUMsMkJBQUEsbUJBQUQsRUFBc0Isa0JBQUEsVUFBdEIsQ0FBQTs7QUFBQSxFQUVBLHFCQUFBLEdBQXdCLElBRnhCLENBQUE7O0FBQUEsRUFJTTtBQUVKLDZCQUFBLFlBQUEsR0FBYyxLQUFkLENBQUE7O0FBQ2EsSUFBQSx3QkFBQSxHQUFBO0FBQ1gsK0RBQUEsQ0FBQTtBQUFBLDZEQUFBLENBQUE7QUFBQSwrREFBQSxDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsYUFBRCxHQUFpQixHQUFBLENBQUEsbUJBQWpCLENBRFc7SUFBQSxDQURiOztBQUFBLDZCQUlBLFFBQUEsR0FBVSxTQUFBLEdBQUE7YUFBRyxJQUFDLENBQUEsYUFBSjtJQUFBLENBSlYsQ0FBQTs7QUFBQSw2QkFNQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLFFBQUQsR0FBWSxHQUFBLENBQUEsUUFESjtJQUFBLENBTlYsQ0FBQTs7QUFBQSw2QkFTQSx1QkFBQSxHQUF5QixTQUFFLE9BQUYsR0FBQTtBQUN2QixNQUR3QixJQUFDLENBQUEsVUFBQSxPQUN6QixDQUFBO2FBQUEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxjQUFULENBQXdCLFVBQXhCLEVBQW9DLElBQXBDLEVBRHVCO0lBQUEsQ0FUekIsQ0FBQTs7QUFBQSw2QkFZQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1YsTUFBQSxJQUFDLENBQUEsZUFBRCxDQUFBLENBQUEsQ0FBQTthQUNB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

//# sourceURL=/Users/kondo/Dropbox/dotfiles/.atom/packages/minimap-git-diff/lib/minimap-git-diff.coffee
