// checkUpdate.js
var currentVersion = "1.2.6";
var versionURL = "https://raw.githubusercontent.com/Abe-isCharlie/OP-Mod/main/mod.json";

Packages.mindustry.game.Events.on(
  Packages.mindustry.game.EventType.ClientLoadEvent, 
  function() {
    Packages.arc.util.Http.get(versionURL, function(res) {
      try {
        var data = Packages.arc.util.serialization.Jval.read(res.getResultAsString());
        var latestVersion = data.getString("version", currentVersion);
        
        if (latestVersion !== currentVersion) {
          Packages.mindustry.Vars.ui.showInfoToast(
            "[orange]Update available![]\nGo to the Mods tab and click 'Reinstall' on OP Things.",
            8
          );
        }
      } catch (e) {
        print("Error checking update: " + e);
      }
    }, function(err) {
      print("Error checking update: " + err);
    });
  }
);