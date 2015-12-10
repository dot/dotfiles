(function() {
  module.exports = {
    MULTIPLY: function(v1, v2) {
      return v1 * v2 / 255;
    },
    SCREEN: function(v1, v2) {
      return v1 + v2 - (v1 * v2 / 255);
    },
    OVERLAY: function(v1, v2) {
      if (v1 < 128) {
        return 2 * v1 * v2 / 255;
      } else {
        return 255 - (2 * (255 - v1) * (255 - v2) / 255);
      }
    },
    DIFFERENCE: function(v1, v2) {
      return Math.abs(v1 - v2);
    },
    EXCLUSION: function(v1, v2) {
      var cb, cs;
      cb = v1 / 255;
      cs = v2 / 255;
      return (cb + cs - 2 * cb * cs) * 255;
    },
    AVERAGE: function(v1, v2) {
      return (v1 + v2) / 2;
    },
    NEGATION: function(v1, v2) {
      return 255 - Math.abs(v1 + v2 - 255);
    },
    SOFT_LIGHT: function(v1, v2) {
      var cb, cs, d, e;
      cb = v1 / 255;
      cs = v2 / 255;
      d = 1;
      e = cb;
      if (cs > 0.5) {
        e = 1;
        d = cb > 0.25 ? Math.sqrt(cb) : ((16 * cb - 12) * cb + 4) * cb;
      }
      return (cb - ((1 - (2 * cs)) * e * (d - cb))) * 255;
    },
    HARD_LIGHT: function(v1, v2) {
      return module.exports.OVERLAY(v2, v1);
    },
    COLOR_DODGE: function(v1, v2) {
      if (v1 === 255) {
        return v1;
      } else {
        return Math.min(255, (v2 << 8) / (255 - v1));
      }
    },
    COLOR_BURN: function(v1, v2) {
      if (v1 === 0) {
        return v1;
      } else {
        return Math.max(0, 255 - ((255 - v2 << 8) / v1));
      }
    },
    LINEAR_COLOR_DODGE: function(v1, v2) {
      return Math.min(v1 + v2, 255);
    },
    LINEAR_COLOR_BURN: function(v1, v2) {
      if (v1 + v2 < 255) {
        return 0;
      } else {
        return v1 + v2 - 255;
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2tvbmRvL0Ryb3Bib3gvZG90ZmlsZXMvLmF0b20vcGFja2FnZXMvcGlnbWVudHMvbGliL2JsZW5kLW1vZGVzLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUNBO0FBQUEsRUFBQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxRQUFBLEVBQVUsU0FBQyxFQUFELEVBQUssRUFBTCxHQUFBO2FBQ1IsRUFBQSxHQUFLLEVBQUwsR0FBVSxJQURGO0lBQUEsQ0FBVjtBQUFBLElBR0EsTUFBQSxFQUFRLFNBQUMsRUFBRCxFQUFLLEVBQUwsR0FBQTthQUNOLEVBQUEsR0FBSyxFQUFMLEdBQVUsQ0FBQyxFQUFBLEdBQUssRUFBTCxHQUFVLEdBQVgsRUFESjtJQUFBLENBSFI7QUFBQSxJQU1BLE9BQUEsRUFBUyxTQUFDLEVBQUQsRUFBSyxFQUFMLEdBQUE7QUFDUCxNQUFBLElBQUcsRUFBQSxHQUFLLEdBQVI7ZUFDRSxDQUFBLEdBQUksRUFBSixHQUFTLEVBQVQsR0FBYyxJQURoQjtPQUFBLE1BQUE7ZUFHRSxHQUFBLEdBQU0sQ0FBQyxDQUFBLEdBQUksQ0FBQyxHQUFBLEdBQU0sRUFBUCxDQUFKLEdBQWlCLENBQUMsR0FBQSxHQUFNLEVBQVAsQ0FBakIsR0FBOEIsR0FBL0IsRUFIUjtPQURPO0lBQUEsQ0FOVDtBQUFBLElBWUEsVUFBQSxFQUFZLFNBQUMsRUFBRCxFQUFLLEVBQUwsR0FBQTthQUFZLElBQUksQ0FBQyxHQUFMLENBQVMsRUFBQSxHQUFLLEVBQWQsRUFBWjtJQUFBLENBWlo7QUFBQSxJQWNBLFNBQUEsRUFBVyxTQUFDLEVBQUQsRUFBSyxFQUFMLEdBQUE7QUFDVCxVQUFBLE1BQUE7QUFBQSxNQUFBLEVBQUEsR0FBSyxFQUFBLEdBQUssR0FBVixDQUFBO0FBQUEsTUFDQSxFQUFBLEdBQUssRUFBQSxHQUFLLEdBRFYs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

//# sourceURL=/Users/kondo/Dropbox/dotfiles/.atom/packages/pigments/lib/blend-modes.coffee
