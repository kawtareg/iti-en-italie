const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const jour = data.find(j => j.id === id);
    document.getElementById('titre-jour').innerText = jour.title;
    document.getElementById('date-jour').innerText = jour.date;

    const section = document.getElementById('activites');

    // ---- Cas 1 : Jour classique sans options ----
    if (jour.activities) {
      afficherActivites(jour.activities, section);
    }

    // ---- Cas 2 : Jour avec options (comme jour6) ----
    else if (jour.options) {
      const choixDiv = document.createElement('div');
      choixDiv.classList.add('choix-options');

      choixDiv.innerHTML = `<h2>Choisissez un itinéraire :</h2>`;
      jour.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt.title;
        btn.classList.add('btn-option');
        btn.addEventListener('click', () => {
          section.innerHTML = ''; // nettoie l’ancien contenu
          afficherActivites(opt.activities, section);
        });
        choixDiv.appendChild(btn);
      });

      section.appendChild(choixDiv);
    }
  });

// ---- Fonction utilitaire pour afficher une liste d’activités ----
function afficherActivites(activities, container) {
  activities.forEach(act => {
    const div = document.createElement('div');
    div.classList.add('activite');
    const texteAvecSauts = act.details.replace(/\n/g, "<br>");
    const imagesHTML = act.images
      ? act.images.map(img => `<img src="${img}" alt="${act.title}">`).join("")
      : (act.image ? `<img src="${act.image}" alt="${act.title}">` : "");

    div.innerHTML = `
      <h3>${act.time ? act.time + " — " : ""}${act.title}</h3>
      <p>${texteAvecSauts}</p>
      ${imagesHTML}
    `;
    container.appendChild(div);
  });
}
