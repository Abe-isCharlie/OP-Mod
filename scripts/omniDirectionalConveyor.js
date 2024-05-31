// Definindo o novo bloqueio omni-direcional
const omniDirectionalConveyor = extend(Conveyor, "omni-directional-conveyor", {
  health: 100,
  speed: 0.06,
  itemCapacity: 10,
  configurable: true,
  outputs: true,
  acceptsItems: true,
  range: 5 // Definindo o alcance do portal
});

// Função para mover itens dentro do alcance
omniDirectionalConveyor.update = function(tile) {
  const range = this.range;
  const entity = tile.ent();

  for (let dx = -range; dx <= range; dx++) {
    for (let dy = -range; dy <= range; dy++) {
      if (dx !== 0 || dy !== 0) {
        const targetTile = tile.nearby(dx, dy);
        if (targetTile != null && targetTile.block() instanceof Conveyor) {
          this.moveItem(tile, targetTile, entity.items.first(), entity.items.peek());
        }
      }
    }
  }
};