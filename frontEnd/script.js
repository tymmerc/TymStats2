document.getElementById('spotifyBtn').addEventListener('click', function() {
    // Redirige vers stats.html et passe les données de l'API via localStorage
    fetch('https://tymmerc.github.io/TymStats2/spotify-data')
        .then(response => response.json())
        .then(data => {
            // Sauvegarder les données dans localStorage
            localStorage.setItem('spotifyStats', JSON.stringify(data));

            // Ensuite, redirige vers la page stats
            window.location.href = 'stats.html';
        })
        .catch(error => console.log('Erreur lors de la récupération des données:', error));
});



document.getElementById('lolBtn').addEventListener('click', function() {
    alert('Tu vas maintenant afficher tes statistiques League of Legends!');
    // Implémente ici la logique pour récupérer les données League of Legends
});
