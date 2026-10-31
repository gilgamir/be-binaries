// Affiche la phase orbitale du jour dans tout élément <span class="phase-du-jour" data-cible="59-cyg"></span>.
// Les éphémérides viennent de docs/data/ephemerides.json (source unique, partagée avec les scripts Python).
(function () {
  const script = document.currentScript;
  const base = script ? script.src : window.location.href;
  const url = new URL("../../data/ephemerides.json", base);

  function jdMaintenant() {
    return Date.now() / 86400000 + 2440587.5;
  }

  function afficher(ephem) {
    document.querySelectorAll(".phase-du-jour").forEach(function (el) {
      const e = ephem[el.dataset.cible];
      if (!e) {
        el.textContent = "cible inconnue";
        return;
      }
      if (e.t0_jd === null || e.t0_jd === undefined) {
        el.textContent = "éphéméride à renseigner (T0 manquant)";
        el.title = "Compléter t0_jd dans docs/data/ephemerides.json — réf. " + e.reference;
        return;
      }
      const cycles = (jdMaintenant() - e.t0_jd) / e.periode_j;
      const phase = cycles - Math.floor(cycles);
      el.textContent = phase.toFixed(3) + " (cycle " + Math.floor(cycles) + ")";
      el.title = "P = " + e.periode_j + " j — " + e.reference;
    });
  }

  function lancer() {
    if (!document.querySelector(".phase-du-jour")) return;
    fetch(url)
      .then(function (r) { return r.json(); })
      .then(afficher)
      .catch(function () {
        document.querySelectorAll(".phase-du-jour").forEach(function (el) {
          el.textContent = "indisponible";
        });
      });
  }

  // Compatible avec la navigation instantanée de Material
  if (window.document$) {
    window.document$.subscribe(lancer);
  } else {
    document.addEventListener("DOMContentLoaded", lancer);
  }
})();
