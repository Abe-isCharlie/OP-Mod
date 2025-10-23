// checkUpdate.js (Versão 3.1 - Final)
var currentVersion = "1.3.0";
// URL ajustada para o formato padrão do GitHub Raw
var versionURL =
  "https://raw.githubusercontent.com/Abe-isCharlie/OP-Mod/main/mod.json"; 

Events.on(EventType.ClientLoadEvent, function ( ) {
  // Adiciona timestamp para evitar cache
  var urlWithCacheBuster = versionURL + "?t=" + Packages.arc.util.Time.millis();

  print("Checking for updates at: " + urlWithCacheBuster);

  Http.get(
    urlWithCacheBuster,
    function (res) {
      print("HTTP Response received!");
      var responseText = res.getResultAsString();

      try {
        var data = Packages.arc.util.serialization.Jval.read(responseText);
        var latestVersion = data.getString("version");

        print("Current version: " + currentVersion);
        print("Latest version: " + latestVersion);

        if (latestVersion !== currentVersion) {
          print("Versions differ! Attempting to show toast with Time.run...");

          // Usa Core.app.post e Time.run para garantir a sincronização da UI
          Core.app.post(function () {
            Packages.arc.util.Time.run(10, function() {
                try {
                    Vars.ui.showInfoToast(
                        "[orange]Update available![]\nVersão Atual: " +
                        currentVersion +
                        ", Última: " +
                        latestVersion,
                        5 // Duração em segundos
                    );
                    print("Toast displayed successfully via Time.run.");
                } catch (e) {
                    print("FATAL: Failed to display toast: " + e);
                }
            });
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
