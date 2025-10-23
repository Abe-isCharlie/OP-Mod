// checkUpdate.js
var currentVersion = "1.3.1";
var versionURL =
  "https://raw.githubusercontent.com/Abe-isCharlie/OP-Mod/main/mod.json";

print("checkUpdate.js loaded!");

Events.on(EventType.ClientLoadEvent, function () {
  print("ClientLoadEvent triggered!");
  print("Checking for updates at: " + versionURL);

  Http.get(
    versionURL,
    function (res) {
      print("HTTP Response received!");
      print("Response: " + res.getResultAsString());

      try {
        var data = Packages.arc.util.serialization.Jval.read(
          res.getResultAsString()
        );
        var latestVersion = data.getString("version", currentVersion);

        print("Current version: " + currentVersion);
        print("Latest version: " + latestVersion);

        if (latestVersion !== currentVersion) {
          print("Versions differ! Showing toast...");
          Vars.ui.showInfoToast(
            "[orange]Update available![]\nGo to the Mods tab and click 'Reinstall' on OP Things.",
            8
          );
        } else {
          print("Versions match, no update needed.");
        }
      } catch (e) {
        print("Error parsing JSON: " + e);
      }
    },
    function (err) {
      print("HTTP request failed: " + err);
    }
  );
});

print("Event listener registered!");
