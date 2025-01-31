const clientId = '0e7b73a206b7410091a17ce856944b0a';  // Ton client ID Spotify
const redirectUri = 'https://tymmerc.github.io/TymStats2/';  // Doit être enregistré dans le Dashboard Spotify
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
].join(' ');

const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;

// Redirection vers Spotify SEULEMENT après un clic sur le bouton
document.getElementById('spotifyBtn').addEventListener('click', function() {
    window.location.href = authUrl;
});

// Une fois l'utilisateur redirigé, récupérer le code dans l'URL
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

if (code) {
    // Échanger le code contre un access token
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
            client_id: clientId,
            client_secret: 'TON_CLIENT_SECRET' // ⚠️ Ne pas exposer en frontend (utiliser un serveur backend)
        })
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('spotifyAccessToken', data.access_token);
        window.location.href = './backEnd/stats-spotify.html';
    })
    .catch(error => console.log('Erreur lors de l’obtention du token:', error));
}



document.getElementById('lolBtn').addEventListener('click', function() {
    alert('Tu vas maintenant afficher tes statistiques League of Legends!');
    // Implémente ici la logique pour récupérer les données League of Legends
});
