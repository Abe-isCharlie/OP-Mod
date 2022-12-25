Planets.serpulo.allowSectorInvasion = false;
Planets.serpulo.atmosphereColor = Color.valueOf("ff0000");
Planets.serpulo.orbitRadius = 30;
Planets.serpulo.ruleSetter = r => {
    r.waveTeam = Team.crux;
    r.placeRangeCheck = false;
    r.showSpawns = true;
};