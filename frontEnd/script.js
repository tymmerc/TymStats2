document.getElementById('spotifyBtn').addEventListener('click', function() {
    alert('Tu vas maintenant afficher tes statistiques Spotify!');
    fetch('https:/https://tymmerc.github.io/TymStats2/spotify-data')  // Remplace cette URL par l'URL réelle de ton API
    .then(response => response.json())
    .then(data => {
        console.log(data);  // Vérifie que les données sont bien récupérées
        // Appelle la fonction pour créer un graphique
        createChart(data);
    })
    .catch(error => console.log('Erreur lors de la récupération des données:', error));

});

document.getElementById('lolBtn').addEventListener('click', function() {
    alert('Tu vas maintenant afficher tes statistiques League of Legends!');
    // Implémente ici la logique pour récupérer les données League of Legends
});
