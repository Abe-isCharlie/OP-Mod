Planets.serpulo.allowSectorInvasion = true;
Planets.serpulo.atmosphereColor = Color.valueOf("#FC0FC0");
Planets.serpulo.orbitRadius = 20;
Planets.serpulo.ruleSetter = (r) => {
  r.waveTeam = Team.crux;
  r.placeRangeCheck = false;
  r.showSpawns = true;
  r.deconstructRefundMultiplier = 1;
};
