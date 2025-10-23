const currentVersion = "1.2.6";
const repoURL = "https://github.com/Abe-isCharlie/OP-Mod";
const versionURL =
  "https://raw.githubusercontent.com/Abe-isCharlie/OP-Mod/main/mod.json";

Event.on(CLientLoadEvent, () => {
  Http.get(
    versionURL,
    (res) => {
      try {
        const data = JSON.parse(res.getResultAsString());
        if (data.version && data.version !== currentVersion) {
          Vars.ui.showInfoToast(
            `[orange]Update available![]\nGo to the Mods tab and click 'Reinstall' on OP Things.`,
            8
          );
        }
      } catch (e) {
        print("Error checking update: " + e);
      }
    },
    (err) => {
      print("Error checking update: " + err);
    }
  );
});
