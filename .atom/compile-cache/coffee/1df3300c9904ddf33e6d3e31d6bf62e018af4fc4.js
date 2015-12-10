(function() {
  var CompositeDisposable, FindAndReplace, MinimapFindAndReplaceBinding;

  CompositeDisposable = require('atom').CompositeDisposable;

  FindAndReplace = null;

  module.exports = MinimapFindAndReplaceBinding = (function() {
    function MinimapFindAndReplaceBinding(minimap) {
      this.minimap = minimap;
      this.editor = this.minimap.getTextEditor();
      this.subscriptions = new CompositeDisposable;
      this.decorationsByMarkerId = {};
      this.subscriptionsByMarkerId = {};
      this.discoverMarkers();
      this.subscriptions.add(this.editor.displayBuffer.onDidCreateMarker((function(_this) {
        return function(marker) {
          return _this.handleCreatedMarker(marker);
        };
      })(this)));
    }

    MinimapFindAndReplaceBinding.prototype.destroy = function() {
      var decoration, id, sub, _ref, _ref1;
      _ref = this.subscriptionsByMarkerId;
      for (id in _ref) {
        sub = _ref[id];
        sub.dispose();
      }
      _ref1 = this.decorationsByMarkerId;
      for (id in _ref1) {
        decoration = _ref1[id];
        decoration.destroy();
      }
      this.subscriptions.dispose();
      this.minimap = null;
      this.editor = null;
      this.decorationsByMarkerId = {};
      return this.subscriptionsByMarkerId = {};
    };

    MinimapFindAndReplaceBinding.prototype.clear = function() {
      var decoration, id, sub, _ref, _ref1, _results;
      _ref = this.subscriptionsByMarkerId;
      for (id in _ref) {
        sub = _ref[id];
        sub.dispose();
        delete this.subscriptionsByMarkerId[id];
      }
      _ref1 = this.decorationsByMarkerId;
      _results = [];
      for (id in _ref1) {
        decoration = _ref1[id];
        decoration.destroy();
        _results.push(delete this.decorationsByMarkerId[id]);
      }
      return _results;
    };

    MinimapFindAndReplaceBinding.prototype.findAndReplace = function() {
      return FindAndReplace != null ? FindAndReplace : FindAndReplace = atom.packages.getLoadedPackage('find-and-replace').mainModule;
    };

    MinimapFindAndReplaceBinding.prototype.discoverMarkers = function() {
      return this.editor.findMarkers({
        "class": 'find-result'
      }).forEach((function(_this) {
        return function(marker) {
          return _this.createDecoration(marker);
        };
      })(this));
    };

    MinimapFindAndReplaceBinding.prototype.handleCreatedMarker = function(marker) {
      var _ref;
      if (((_ref = marker.getProperties()) != null ? _ref["class"] : void 0) === 'find-result') {
        return this.createDecoration(marker);
      }
    };

    MinimapFindAndReplaceBinding.prototype.createDecoration = function(marker) {
      var decoration;
      if (!this.findViewIsVisible()) {
        return;
      }
      if (this.decorationsByMarkerId[marker.id] != null) {
        return;
      }
      decoration = this.minimap.decorateMarker(marker, {
        type: 'highlight',
        scope: ".minimap .search-result"
      });
      if (decoration == null) {
        return;
      }
      this.decorationsByMarkerId[marker.id] = decoration;
      return this.subscriptionsByMarkerId[marker.id] = decoration.onDidDestroy((function(_this) {
        return function() {
          _this.subscriptionsByMarkerId[marker.id].dispose();
          delete _this.decorationsByMarkerId[marker.id];
          return delete _this.subscriptionsByMarkerId[marker.id];
        };
      })(this));
    };

    MinimapFindAndReplaceBinding.prototype.findViewIsVisible = function() {
      var _ref, _ref1;
      return (_ref = this.findAndReplace()) != null ? (_ref1 = _ref.findView) != null ? _ref1.is(':visible') : void 0 : void 0;
    };

    return MinimapFindAndReplaceBinding;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2tvbmRvL0Ryb3Bib3gvZG90ZmlsZXMvLmF0b20vcGFja2FnZXMvbWluaW1hcC1maW5kLWFuZC1yZXBsYWNlL2xpYi9taW5pbWFwLWZpbmQtYW5kLXJlcGxhY2UtYmluZGluZy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsaUVBQUE7O0FBQUEsRUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBQUQsQ0FBQTs7QUFBQSxFQUNBLGNBQUEsR0FBaUIsSUFEakIsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDUyxJQUFBLHNDQUFFLE9BQUYsR0FBQTtBQUNYLE1BRFksSUFBQyxDQUFBLFVBQUEsT0FDYixDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsTUFBRCxHQUFVLElBQUMsQ0FBQSxPQUFPLENBQUMsYUFBVCxDQUFBLENBQVYsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLGFBQUQsR0FBaUIsR0FBQSxDQUFBLG1CQURqQixDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEscUJBQUQsR0FBeUIsRUFGekIsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLHVCQUFELEdBQTJCLEVBSDNCLENBQUE7QUFBQSxNQUtBLElBQUMsQ0FBQSxlQUFELENBQUEsQ0FMQSxDQUFBO0FBQUEsTUFPQSxJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsQ0FBbUIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxhQUFhLENBQUMsaUJBQXRCLENBQXdDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLE1BQUQsR0FBQTtpQkFDekQsS0FBQyxDQUFBLG1CQUFELENBQXFCLE1BQXJCLEVBRHlEO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBeEMsQ0FBbkIsQ0FQQSxDQURXO0lBQUEsQ0FBYjs7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

//# sourceURL=/Users/kondo/Dropbox/dotfiles/.atom/packages/minimap-find-and-replace/lib/minimap-find-and-replace-binding.coffee
