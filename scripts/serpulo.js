Planets.serpulo.allowSectorInvasion = true;
Planets.serpulo.atmosphereColor = Color.valueOf("#ffffff");
Planets.serpulo.orbitRadius = 7;
Planets.serpulo.ruleSetter = r => {
    r.waveTeam = Team.crux;
    r.placeRangeCheck = false;
    r.showSpawns = true;
    r.allowWaveSimulation = true;
    r.deconstructRefundMultiplier = 1
};