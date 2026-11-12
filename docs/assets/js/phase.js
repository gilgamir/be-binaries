// Phase orbitale des cibles, calculée dans le navigateur.
//
// - <span class="phase-du-jour" data-cible="59-cyg"></span> : affiche la phase.
// - <p class="phase-horodatage"></p> : indique l'instant de calcul
//   (data-format="court" pour une version abrégée).
// - <form class="phase-calcul"> : permet de calculer pour une autre date
//   (champs input[type=date], input[type=time], bouton [data-action=maintenant]).
//
// Les éphémérides viennent de docs/data/ephemerides.json (source unique, partagée avec les scripts Python).
// La phase est calculée une fois à l'ouverture de la page, pas en continu.
(function () {
  const script = document.currentScript;
  const base = script ? script.src : window.location.href;
  const url = new URL("../../data/ephemerides.json", base);

  let ephemerides = null;

  function jd(date) {
    return date.getTime() / 86400000 + 2440587.5;
  }

  function deux(n) {
    return String(n).padStart(2, "0");
  }

  function fuseau(date) {
    const minutes = -date.getTimezoneOffset();
    const signe = minutes >= 0 ? "+" : "−";
    const h = Math.floor(Math.abs(minutes) / 60);
    const m = Math.abs(minutes) % 60;
    return "UTC" + signe + h + (m ? ":" + deux(m) : "");
  }

  function texteHorodatage(date, choisie, format) {
    const heure = deux(date.getHours()) + " h " + deux(date.getMinutes());
    if (format === "court") {
      const jour = deux(date.getDate()) + "/" + deux(date.getMonth() + 1);
      return (choisie ? "Phases pour le " : "Phases calculées le ") + jour + " à " + heure + ".";
    }
    const jourLong = date.toLocaleDateString("fr-FR", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    });
    const valeurJD = jd(date).toLocaleString("fr-FR", {
      minimumFractionDigits: 2, maximumFractionDigits: 2,
    });
    return (choisie ? "Calculée pour le " : "Calculée le ") + jourLong + " à " + heure +
      " (heure locale, " + fuseau(date) + ") · JD " + valeurJD +
      (choisie ? "" : " · recharger la page pour actualiser");
  }

  function afficher(date, choisie) {
    const jdCalcul = jd(date);
    document.querySelectorAll(".phase-du-jour").forEach(function (el) {
      const e = ephemerides[el.dataset.cible];
      if (!e) {
        el.textContent = "cible inconnue";
        return;
      }
      if (e.t0_jd === null || e.t0_jd === undefined) {
        el.textContent = "éphéméride à renseigner (T0 manquant)";
        return;
      }
      const cycles = (jdCalcul - e.t0_jd) / e.periode_j;
      const phase = cycles - Math.floor(cycles);
      el.textContent = phase.toFixed(2).replace(".", ",");
      el.title = "Cycle " + Math.floor(cycles) + " — φ = 0 : " + e.phase_zero +
        " — P = " + e.periode_j + " j — " + e.reference;
    });
    document.querySelectorAll(".phase-horodatage").forEach(function (el) {
      el.textContent = texteHorodatage(date, choisie, el.dataset.format);
      el.classList.toggle("phase-horodatage--choisie", choisie);
    });
  }

  function initialiserFormulaire(form) {
    const champDate = form.querySelector("input[type=date]");
    const champHeure = form.querySelector("input[type=time]");
    const maintenant = new Date();
    champDate.value = maintenant.getFullYear() + "-" + deux(maintenant.getMonth() + 1) + "-" + deux(maintenant.getDate());
    champHeure.value = "21:00";

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!champDate.value) return;
      const date = new Date(champDate.value + "T" + (champHeure.value || "00:00"));
      if (isNaN(date.getTime())) return;
      afficher(date, true);
    });
    const bouton = form.querySelector("[data-action=maintenant]");
    if (bouton) {
      bouton.addEventListener("click", function () {
        afficher(new Date(), false);
      });
    }
  }

  function lancer() {
    if (!document.querySelector(".phase-du-jour")) return;
    fetch(url)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        ephemerides = data;
        afficher(new Date(), false);
        document.querySelectorAll("form.phase-calcul").forEach(initialiserFormulaire);
      })
      .catch(function () {
        document.querySelectorAll(".phase-du-jour").forEach(function (el) {
          el.textContent = "indisponible";
        });
      });
  }

  if (window.document$) {
    window.document$.subscribe(lancer);
  } else {
    document.addEventListener("DOMContentLoaded", lancer);
  }
})();
