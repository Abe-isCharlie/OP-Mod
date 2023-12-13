Planets.serpulo.allowSectorInvasion = true;
Planets.serpulo.atmosphereColor = Color.valueOf("#ff9ff9");
Planets.serpulo.orbitRadius = 7;
Planets.serpulo.ruleSetter = r => {
    r.waveTeam = Team.crux;
    r.placeRangeCheck = false;
    r.showSpawns = true;
    r.allowWaveSimulation = true;
    r.deconstructRefundMultiplier = 1
};