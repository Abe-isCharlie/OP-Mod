// checkUpdate.js
var currentVersion = "1.3.0";
var versionURL =
  "https://raw.githubusercontent.com/Abe-isCharlie/OP-Mod/refs/heads/main/mod.json";

Events.on(EventType.ClientLoadEvent, function () {
  // Adiciona timestamp pra evitar cache
  var urlWithCacheBuster = versionURL + "?t=" + Packages.arc.util.Time.millis();

  print("Checking for updates at: " + urlWithCacheBuster);

  Http.get(
    urlWithCacheBuster,
    function (res) {
      print("HTTP Response received!");
      var responseText = res.getResultAsString();
      print("Response: " + responseText);

      try {
        var data = Packages.arc.util.serialization.Jval.read(responseText);
        var latestVersion = data.getString("version");

        print("Current version: " + currentVersion);
        print("Latest version: " + latestVersion);

        if (latestVersion !== currentVersion) {
          print("Versions differ! Showing toast...");
          print(
            "Core.app exists: " + (Core.app !== null && Core.app !== undefined)
          );
          try {
            Core.app.post(function () {
              print("Inside Core.app.post callback");
              Vars.ui.showInfoToast(
                "[orange]Update available![]\nCurrent: " +
                  currentVersion +
                  ", Latest: " +
                  latestVersion,
                10
              );
            });
          } catch (e) {
            print("Core.app.post failed: " + e);
            try {
              Vars.ui.showInfoToast("[orange]Update available!", 10);
            } catch (e2) {
              print("Direct toast also failed: " + e2);
            }
          }
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
