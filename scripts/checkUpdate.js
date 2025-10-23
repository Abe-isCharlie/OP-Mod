// checkUpdate.js (Versão 6.0 - Usando Dialog Customizado)
var currentVersion = "1.3.0"; // Use a versão real do seu mod aqui!
var versionURL =
  "https://raw.githubusercontent.com/Abe-isCharlie/OP-Mod/main/mod.json"; 

// 1. Define a função para mostrar o diálogo
function showUpdateDialog(current, latest ) {
    // Cria um novo diálogo
    var dialog = new Packages.mindustry.ui.dialogs.BaseDialog("Atualização Disponível");
    
    // Adiciona o texto da mensagem
    dialog.cont.add("Uma nova versão do mod [orange]OP Things[] está disponível!").row();
    dialog.cont.add("Versão Atual: [yellow]" + current + "[]").row();
    dialog.cont.add("Última Versão: [green]" + latest + "[]").row();
    
    // Adiciona um botão para fechar
    dialog.cont.button("Fechar", function() {
        dialog.hide();
    }).size(150, 50).pad(6);
    
    // Adiciona um botão para ir para o GitHub (opcional, mas útil)
    dialog.cont.button("Ir para o GitHub", function() {
        Packages.arc.Core.app.openURI("https://github.com/Abe-isCharlie/OP-Mod" );
        dialog.hide();
    }).size(200, 50).pad(6);
    
    // Exibe o diálogo
    dialog.show();
    print("Custom Dialog displayed successfully.");
}


Events.on(EventType.ClientLoadEvent, function ( ) {
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
          print("Versions differ! Attempting to show custom Dialog...");
          
          // Usa o Timer.schedule para agendar a exibição do diálogo
          // O Timer.schedule é mais robusto para garantir que a UI esteja pronta.
          Packages.java.util.Timer().schedule(Packages.java.util.TimerTask({
              run: function() {
                  try {
                      // Chama a função que cria e exibe o diálogo
                      showUpdateDialog(currentVersion, latestVersion);
                  } catch (e) {
                      print("FATAL: Failed to display custom Dialog: " + e);
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
