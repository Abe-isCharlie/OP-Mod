// Define o massBullet para o teleporter
const massBullet = extend(MassDriverBolt, {
  draw(b) {
    var w = 0.001;
    var h = 0.001;

    Draw.color(Pal.bulletYellowBack);
    Draw.rect("shell-back", b.x, b.y, w, h, b.rotation() + 90);

    Draw.color(Pal.bulletYellow);
    Draw.rect("shell", b.x, b.y, w, h, b.rotation() + 90);

    Draw.reset();
  },
  despawnEffect: Fx.none,
  hitEffect: Fx.none,
  collides: false,
});

// Define o teleporter
const teleporter = extend(BufferedItemBridge, "teleporter", {
  // Defina os requisitos para construir o teleporter
  requirements(Category.distribution, ItemStack.with(
    Items.phaseFabric, 10,
    Items.silicon, 15,
    Items.lead, 20,
    Items.graphite, 20
  )),

  range: 20, // Define um alcance maior
  arrowPeriod: 0.5,
  arrowTimeScl: 4.0,
  hasPower: true,
  pulse: true,
  envEnabled: Env.space, // Habilita o teleporter em ambientes espaciais

  // Consome energia para funcionar
  consumePower(1.0),

  buildType: () => extend(BufferedItemBridge.BufferedItemBridgeBuild, teleporter, {
    update() {
      this.super$update();
      if (this.consValid()) {
        let out = this.front(); // Define a saída como a frente do teleporter
        for (let i = 0; i < this.range; i++) {
          // Loop para verificar se há itens na entrada
          if (this.items.total() > 0 && out.acceptItem(this.items.first())) {
            out.handleItem(this, this.items.first());
            this.items.remove(this.items.first(), 1); // Remove o item da entrada
          }
        }
      }
    }
  })
});

// Carregue o teleporter na categoria de distribuição
teleporter.category = Category.distribution;

// Certifique-se de que o código do mod está sendo carregado corretamente
Events.on(ClientLoadEvent, () => {
  Vars.content.units().each(e => e.health = e.maxHealth);
  Log.info("Teleporter mod loaded.");
});