// checkUpdate.js
var currentVersion = "1.3.0";
var versionURL =
  "https://raw.githubusercontent.com/Abe-isCharlie/OP-Mod/main/mod.json";

Events.on(EventType.ClientLoadEvent, function () {
  // Adiciona timestamp pra evitar cache
  var urlWithCacheBuster = versionURL + "?t=" + Packages.arc.util.Time.millis();

  Http.get(
    urlWithCacheBuster,
    function (res) {
      try {
        var data = Packages.arc.util.serialization.Jval.read(
          res.getResultAsString()
        );
        var latestVersion = data.getString("version");

        if (latestVersion !== currentVersion) {
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
        }
      } catch (e) {
        print("Error checking update: " + e);
      }
    },
    function (err) {
      print("Error checking update: " + err);
    }
  );
});
