var currentVersion = "1.2.7";
var versionURL =
  "https://raw.githubusercontent.com/Abe-isCharlie/OP-Mod/main/mod.json";

function showUpdateDialog(current, latest) {
  var dialog = new Packages.mindustry.ui.dialogs.BaseDialog(
    "Mod Update Available"
  );
  dialog.cont.add("A new version of [orange]OP Things[] is available!").row();
  dialog.cont.add("Current Version: [yellow]" + current + "[]").row();
  dialog.cont.add("Latest Version: [green]" + latest + "[]").row();
  dialog.cont.row();
  dialog.cont
    .add(
      "To update, go to the [yellow]Mods tab[], select [orange]OP Things[], and click [green]Reinstall[]."
    )
    .row();
  dialog.cont
    .button("Close", function () {
      dialog.hide();
    })
    .size(150, 50)
    .pad(12);
  dialog.show();
  print("Custom Dialog (English, Simplified) displayed successfully.");
}

Events.on(EventType.ClientLoadEvent, function () {
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
          Packages.java.util.Timer().schedule(
            Packages.java.util.TimerTask({
              run: function () {
                try {
                  showUpdateDialog(currentVersion, latestVersion);
                } catch (e) {
                  print("FATAL: Failed to display custom Dialog: " + e);
                }
              },
            }),
            100
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
