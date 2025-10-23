const Events = require("mindustry/game/Events");
const ClientLoadEvent = Packages.mindustry.game.EventType.ClientLoadEvent;

const currentVersion = "1.2.6";
const repoURL = "https://github.com/Abe-isCharlie/OP-Mod";
const versionURL =
  "https://raw.githubusercontent.com/Abe-isCharlie/OP-Mod/main/mod.json";

Events.on(ClientLoadEvent, () => {
  Http.get(
    versionURL,
    (res) => {
      try {
        const data = Packages.arc.util.serialization.Jval.read(
          res.getResultAsString()
        );
        const latestVersion = data.getString("version", currentVersion);

        if (latestVersion !== currentVersion) {
          Vars.ui.showInfoToast(
            `[orange]Atualização disponível![]\nVá até a aba Mods e clique em 'Reinstalar' no OP Things.`,
            8
          );
        }
      } catch (e) {
        print("Erro ao verificar atualização: " + e);
      }
    },
    (err) => {
      print("Erro ao verificar atualização: " + err);
    }
  );
});
