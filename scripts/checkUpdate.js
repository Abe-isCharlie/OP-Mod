// checkUpdate.js
var currentVersion = "1.3.1";
var versionURL =
  "https://raw.githubusercontent.com/Abe-isCharlie/OP-Mod/main/mod.json";

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
          // Usa Core.app.post() pra garantir que a UI tá pronta
          Core.app.post(function () {
            Vars.ui.showInfoToast(
              "[orange]Update available![]\nCurrent: " +
                currentVersion +
                ", Latest: " +
                latestVersion +
                "\nGo to Mods and click 'Reinstall' on OP Things.",
              10
            );
          });
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
