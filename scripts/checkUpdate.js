// checkUpdate.js (Versão 5.0 - Simplificada e Robusta)
var currentVersion = "1.3.0"; // Use a versão real do seu mod aqui!
var versionURL =
  "https://raw.githubusercontent.com/Abe-isCharlie/OP-Mod/main/mod.json"; 

Events.on(EventType.ClientLoadEvent, function (  ) {
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
          print("Versions differ! Attempting to show toast with Timer.schedule...");
          
          // SOLUÇÃO: Usar Timer.schedule para agendar a exibição do toast
          // 1. Removemos o Core.app.post, que estava falhando silenciosamente.
          // 2. O Timer.schedule agenda a tarefa para ser executada na thread principal
          //    após 100 milissegundos, garantindo que a UI esteja pronta.
          Packages.java.util.Timer().schedule(Packages.java.util.TimerTask({
              run: function() {
                  try {
                      Vars.ui.showInfoToast(
                          "[orange]Update available![]\nVersão Atual: " +
                          currentVersion +
                          ", Última: " +
                          latestVersion,
                          5 // Duração em segundos
                      );
                      print("Toast displayed successfully via Timer.schedule.");
                  } catch (e) {
                      print("FATAL: Failed to display toast: " + e);
                  }
              }
          }), 100); // 100 milissegundos de atraso
          
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
