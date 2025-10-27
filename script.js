fetch('data.json')
.then(response => response.json())
.then(data => {
    const container = document.getElementById('jours');

    data.forEach(jour => {
    const link = document.createElement('a');
    link.href = `jour.html?id=${jour.id}`;
    link.classList.add('carte-jour');

    link.innerHTML = `
        <h2>${jour.date}</h2>
        <p>${jour.title}</p>
    `;

    container.appendChild(link);
    });
});