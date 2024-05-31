const teleporter = extend(ItemBridge, "teleporter", {
  requirements(Category.distribution, with(Items.phaseFabric, 10, Items.silicon, 20, Items.lead, 30, Items.graphite, 30)),
  range: 300, // Um alcance muito grande para o teleporter
  transportTime: 0.001, // Transporte quase instantâneo
  hasPower: false, // Não requer energia
  pulse: true,
  envEnabled: Env.any, // Funciona em qualquer ambiente

  // Variáveis para armazenar as posições de entrada e saída
  input: null,
  output: null,

  // Método de construção para armazenar a posição de entrada e saída
  buildConfiguration(tile, table) {
    table.button(Icon.arrowUp, Styles.clearTransi, () => {
      // Define a posição de entrada como a posição atual do bloco
      this.input = tile.pos();
    }).size(40);
    table.button(Icon.arrowDown, Styles.clearTransi, () => {
      // Define a posição de saída como a posição atual do bloco
      this.output = tile.pos();
    }).size(40);
  },

  // Método de atualização para transportar itens entre as posições armazenadas
  updateTransport(tile, other) {
    // Verifica se o bloco conectado é um teleporter e se possui uma posição de saída
    if (other.block == this && other.entity.output != null) {
      // Verifica se há itens para transportar
      if (tile.entity.hasItem()) {
        // Obtém a posição de saída do bloco conectado
        var outputPos = other.entity.output;
        // Transporta o item para a posição de saída
        tile.entity.offloadNearby(outputPos);
      }
    }
  }
});

// Adiciona o bloco ao jogo
Blocks.add(teleporter);