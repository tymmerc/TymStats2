const clientId = '0e7b73a206b7410091a17ce856944b0a';  // Récupéré depuis ton application Spotify
const redirectUri = 'https://tymmerc.github.io/TymStats2';  // Remplace par ton URL
const scopes = [
    'user-top-read',
    'user-library-read',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-read-private',
    'user-read-email',
    'user-follow-read',
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-read-recently-played',
    'streaming'
].join(' ');  // Convertir le tableau de scopes en une chaîne de caractères

const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;

window.location.href = authUrl;  // Redirige l'utilisateur vers Spotify pour l'authentification

document.getElementById('spotifyBtn').addEventListener('click', function() {
    // Redirige vers stats.html et passe les données de l'API via localStorage
    fetch('https://tymmerc.github.io/TymStats2/spotify-data')
        .then(response => response.json())
        .then(data => {
            // Sauvegarder les données dans localStorage
            localStorage.setItem('spotifyStats', JSON.stringify(data));

            // Ensuite, redirige vers la page stats
            window.location.href = './backEnd/stats-spotify.html';
        })
        .catch(error => console.log('Erreur lors de la récupération des données:', error));
});



document.getElementById('lolBtn').addEventListener('click', function() {
    alert('Tu vas maintenant afficher tes statistiques League of Legends!');
    // Implémente ici la logique pour récupérer les données League of Legends
});
