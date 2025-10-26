fetch('data.json')
.then(response => response.json())
.then(data => {
    const container = document.getElementById('jours');

    data.forEach(jour => {
    // Crée un lien vers la page de détail
    const link = document.createElement('a');
    link.href = `jour.html?id=${jour.id}`;
    link.classList.add('carte-jour');

    // Contenu visuel de la carte
    link.innerHTML = `
        <h2>${jour.date}</h2>
        <p>${jour.title}</p>
    `;

    container.appendChild(link);
    });
});