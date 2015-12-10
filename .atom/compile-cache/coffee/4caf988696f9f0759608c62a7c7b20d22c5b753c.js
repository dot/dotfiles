(function() {
  var SymbolGenView;

  SymbolGenView = require('./symbol-gen-view');

  module.exports = {
    symbolGenView: null,
    activate: function(state) {
      return this.symbolGenView = new SymbolGenView(state.symbolGenViewState);
    },
    deactivate: function() {
      return this.symbolGenView.destroy();
    },
    serialize: function() {
      return {
        symbolGenViewState: this.symbolGenView.serialize()
      };
    },
    consumeStatusBar: function(statusBar) {
      return this.symbolGenView.consumeStatusBar(statusBar);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2tvbmRvL0Ryb3Bib3gvZG90ZmlsZXMvLmF0b20vcGFja2FnZXMvc3ltYm9sLWdlbi9saWIvc3ltYm9sLWdlbi5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsYUFBQTs7QUFBQSxFQUFBLGFBQUEsR0FBZ0IsT0FBQSxDQUFRLG1CQUFSLENBQWhCLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxhQUFBLEVBQWUsSUFBZjtBQUFBLElBRUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO2FBQ1IsSUFBQyxDQUFBLGFBQUQsR0FBcUIsSUFBQSxhQUFBLENBQWMsS0FBSyxDQUFDLGtCQUFwQixFQURiO0lBQUEsQ0FGVjtBQUFBLElBS0EsVUFBQSxFQUFZLFNBQUEsR0FBQTthQUNWLElBQUMsQ0FBQSxhQUFhLENBQUMsT0FBZixDQUFBLEVBRFU7SUFBQSxDQUxaO0FBQUEsSUFRQSxTQUFBLEVBQVcsU0FBQSxHQUFBO2FBQ1Q7QUFBQSxRQUFBLGtCQUFBLEVBQW9CLElBQUMsQ0FBQSxhQUFhLENBQUMsU0FBZixDQUFBLENBQXBCO1FBRFM7SUFBQSxDQVJYO0FBQUEsSUFXQSxnQkFBQSxFQUFrQixTQUFDLFNBQUQsR0FBQTthQUNoQixJQUFDLENBQUEsYUFBYSxDQUFDLGdCQUFmLENBQWdDLFNBQWhDLEVBRGdCO0lBQUEsQ0FYbEI7R0FIRixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/kondo/Dropbox/dotfiles/.atom/packages/symbol-gen/lib/symbol-gen.coffee
