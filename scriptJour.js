const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const jour = data.find(j => j.id === id);
    document.getElementById('titre-jour').innerText = jour.title;
    document.getElementById('date-jour').innerText = jour.date;

    const section = document.getElementById('activites');

    jour.activities.forEach(act => {
      const div = document.createElement('div');
      div.classList.add('activite');
      const texteAvecSauts = act.details.replace(/\n/g, "<br>");

      div.innerHTML = `
        <h3>${act.time || ""} ${act.time ? "—" : ""} ${act.title}</h3>
        <p>${texteAvecSauts}</p>
        ${act.image ? `<img src="${act.image}" alt="${act.title}">` : ""}
      `;
      section.appendChild(div);
    });
  });