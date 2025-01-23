document.getElementById('spotifyBtn').addEventListener('click', function() {
    // Rediriger l'utilisateur vers la page des stats
    window.location.href = 'backEnd/stats-spotify.html';  // Remplace par l'URL de la page de stats

    // Tu peux récupérer les données de l'API ici aussi, mais pour cette fois, la redirection doit d'abord se faire
    // Si tu veux passer les données à la nouvelle page, tu pourrais les stocker dans localStorage, par exemple :
    fetch('https://tymmerc.github.io/TymStats2/spotify-data')
    .then(response => response.json())
    .then(data => {
        // Sauvegarder les données dans le localStorage
        localStorage.setItem('spotifyStats', JSON.stringify(data));
    })
    .catch(error => console.log('Erreur lors de la récupération des données:', error));
});


document.getElementById('lolBtn').addEventListener('click', function() {
    alert('Tu vas maintenant afficher tes statistiques League of Legends!');
    // Implémente ici la logique pour récupérer les données League of Legends
});
