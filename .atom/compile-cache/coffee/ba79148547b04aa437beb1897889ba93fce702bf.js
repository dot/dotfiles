(function() {
  var Q, SymbolGenView, fs, path, spawn, swapFile;

  path = require('path');

  fs = require('fs');

  Q = require('q');

  spawn = require('child_process').spawn;

  swapFile = '.tags_swap';

  module.exports = SymbolGenView = (function() {
    SymbolGenView.prototype.isActive = false;

    function SymbolGenView(serializeState) {
      atom.commands.add('atom-workspace', "symbol-gen:generate", (function(_this) {
        return function() {
          return _this.generate();
        };
      })(this));
      atom.commands.add('atom-workspace', "symbol-gen:purge", (function(_this) {
        return function() {
          return _this.purge();
        };
      })(this));
      this.activate_for_projects((function(_this) {
        return function(activate) {
          if (!activate) {
            return;
          }
          _this.isActive = true;
          return _this.watch_for_changes();
        };
      })(this));
    }

    SymbolGenView.prototype.serialize = function() {};

    SymbolGenView.prototype.destroy = function() {};

    SymbolGenView.prototype.consumeStatusBar = function(statusBar) {
      var element;
      this.statusBar = statusBar;
      element = document.createElement('div');
      element.classList.add('inline-block');
      element.textContent = 'Generating symbols';
      element.style.visibility = 'collapse';
      return this.statusBarTile = this.statusBar.addRightTile({
        item: element,
        priority: 100
      });
    };

    SymbolGenView.prototype.watch_for_changes = function() {
      atom.commands.add('atom-workspace', 'core:save', (function(_this) {
        return function() {
          return _this.check_for_on_save();
        };
      })(this));
      atom.commands.add('atom-workspace', 'core:save-as', (function(_this) {
        return function() {
          return _this.check_for_on_save();
        };
      })(this));
      return atom.commands.add('atom-workspace', 'window:save-all', (function(_this) {
        return function() {
          return _this.check_for_on_save();
        };
      })(this));
    };

    SymbolGenView.prototype.check_for_on_save = function() {
      var onDidSave;
      if (!this.isActive) {
        return;
      }
      return onDidSave = atom.workspace.getActiveTextEditor().onDidSave((function(_this) {
        return function() {
          _this.generate();
          return onDidSave.dispose();
        };
      })(this));
    };

    SymbolGenView.prototype.activate_for_projects = function(callback) {
      var projectPaths, shouldActivate;
      projectPaths = atom.project.getPaths();
      shouldActivate = projectPaths.some((function(_this) {
        return function(projectPath) {
          var tagsFilePath;
          tagsFilePath = path.resolve(projectPath, 'tags');
          try {
            fs.accessSync(tagsFilePath);
            return true;
          } catch (_error) {}
        };
      })(this));
      return callback(shouldActivate);
    };

    SymbolGenView.prototype.purge_for_project = function(projectPath) {
      var swapFilePath, tagsFilePath;
      swapFilePath = path.resolve(projectPath, swapFile);
      tagsFilePath = path.resolve(projectPath, 'tags');
      fs.unlink(tagsFilePath, function() {});
      return fs.unlink(swapFilePath, function() {});
    };

    SymbolGenView.prototype.generate_for_project = function(deferred, projectPath) {
      var args, command, ctags, defaultCtagsFile, swapFilePath, tagsFilePath;
      swapFilePath = path.resolve(projectPath, swapFile);
      tagsFilePath = path.resolve(projectPath, 'tags');
      command = path.resolve(__dirname, '..', 'vendor', "ctags-" + process.platform);
      defaultCtagsFile = require.resolve('./.ctags');
      args = ["--options=" + defaultCtagsFile, '-R', "-f" + swapFilePath];
      ctags = spawn(command, args, {
        cwd: projectPath
      });
      ctags.stderr.on('data', function(data) {
        return console.error('symbol-gen:', 'ctag:stderr ' + data);
      });
      return ctags.on('close', (function(_this) {
        return function(data) {
          return fs.rename(swapFilePath, tagsFilePath, function(err) {
            if (err) {
              console.warn('symbol-gen:', 'Error swapping file: ', err);
            }
            return deferred.resolve();
          });
        };
      })(this));
    };

    SymbolGenView.prototype.purge = function() {
      var projectPaths;
      projectPaths = atom.project.getPaths();
      projectPaths.forEach((function(_this) {
        return function(path) {
          return _this.purge_for_project(path);
        };
      })(this));
      return this.isActive = false;
    };

    SymbolGenView.prototype.generate = function() {
      var isGenerating, projectPaths, promises, showStatus;
      if (!this.isActive) {
        this.isActive = true;
        this.watch_for_changes();
      }
      isGenerating = true;
      showStatus = (function(_this) {
        return function() {
          var _ref;
          if (!isGenerating) {
            return;
          }
          return (_ref = _this.statusBarTile) != null ? _ref.getItem().style.visibility = 'visible' : void 0;
        };
      })(this);
      setTimeout(showStatus, 300);
      promises = [];
      projectPaths = atom.project.getPaths();
      projectPaths.forEach((function(_this) {
        return function(path) {
          var p;
          p = Q.defer();
          _this.generate_for_project(p, path);
          return promises.push(p);
        };
      })(this));
      return Q.all(promises).then((function(_this) {
        return function() {
          var _ref;
          if ((_ref = _this.statusBarTile) != null) {
            _ref.getItem().style.visibility = 'collapse';
          }
          return isGenerating = false;
        };
      })(this));
    };

    return SymbolGenView;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2tvbmRvL0Ryb3Bib3gvZG90ZmlsZXMvLmF0b20vcGFja2FnZXMvc3ltYm9sLWdlbi9saWIvc3ltYm9sLWdlbi12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwyQ0FBQTs7QUFBQSxFQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUFQLENBQUE7O0FBQUEsRUFDQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FETCxDQUFBOztBQUFBLEVBRUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxHQUFSLENBRkosQ0FBQTs7QUFBQSxFQUdBLEtBQUEsR0FBUSxPQUFBLENBQVEsZUFBUixDQUF3QixDQUFDLEtBSGpDLENBQUE7O0FBQUEsRUFLQSxRQUFBLEdBQVcsWUFMWCxDQUFBOztBQUFBLEVBT0EsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUVKLDRCQUFBLFFBQUEsR0FBVSxLQUFWLENBQUE7O0FBRWEsSUFBQSx1QkFBQyxjQUFELEdBQUE7QUFDWCxNQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixnQkFBbEIsRUFBb0MscUJBQXBDLEVBQTJELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLFFBQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBM0QsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0IsZ0JBQWxCLEVBQW9DLGtCQUFwQyxFQUF3RCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxLQUFELENBQUEsRUFBSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXhELENBREEsQ0FBQTtBQUFB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

//# sourceURL=/Users/kondo/Dropbox/dotfiles/.atom/packages/symbol-gen/lib/symbol-gen-view.coffee
