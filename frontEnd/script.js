//spotify
const spotifyClientId = '0e7b73a206b7410091a17ce856944b0a'; //Spotify Client ID
const spotifyRedirectUri = 'https://tymmerc.github.io/TymStats2/frontEnd/stats-spotify.html'; //on Spotify dashboard
const spotifyScopes = [
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

//generate unique state for security
const state = btoa(Math.random().toString());
localStorage.setItem('spotifyAuthState', state);
console.log('State generated and stored:', state);

const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyClientId}&response_type=code&redirect_uri=${encodeURIComponent(spotifyRedirectUri)}&scope=${encodeURIComponent(spotifyScopes)}&state=${state}`;console.log('Auth URL:', spotifyAuthUrl);

//redirect to Spotify auth page
const spotifyBtn = document.getElementById('spotifyBtn');
if (spotifyBtn) {
    spotifyBtn.addEventListener('click', function () {
        window.location.href = spotifyAuthUrl;
    });
}

//pick up code and state on URL
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
const returnedState = urlParams.get('state');
const storedState = localStorage.getItem('spotifyAuthState');
console.log('Code:', code);
console.log('Returned State:', returnedState);
console.log('Stored State:', storedState);

if (code && returnedState === storedState) {
    //delete stored state to prevent reuse
    localStorage.removeItem('spotifyAuthState');
    console.log('States match, proceeding with token exchange.');

    //trade code for access token in backend (on Render)
    fetch('https://tymstats2-backend.onrender.com/get-token', { // Assure-toi que cette URL est correcte
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(err => { throw new Error(`HTTP Error: ${response.status} - ${err}`); }); // Meilleure gestion des erreurs
        }
        return response.json();
    })
    .then(data => {
        if (data.access_token) {
            // Plus besoin de stocker dans le localStorage ici

            console.log('Access token obtained:', data.access_token);
            window.location.href = 'stats-spotify.html'; // Redirection vers la page de stats (gère le cookie là-bas)
        } else {
            console.error('Token not obtained:', data);
        }
    })
    .catch(error => console.error('Error obtaining token:', error));
} else if (returnedState !== storedState) {
    console.error("State mismatch, possible CSRF attack.");
}

// ... (Reste de ton code)
/*
// League of Legends (Placeholder)
document.getElementById('lolBtn').addEventListener('click', function () {
    alert('Connect with League of Legends is not implemented yet.');
});

// Discord
const discordClientId = 'YOUR_DISCORD_CLIENT_ID'; // Replace with your Discord Client ID
const discordRedirectUri = 'https://tymmerc.github.io/TymStats/';
const discordScopes = 'identify%20email%20connections';

const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${discordClientId}&redirect_uri=${encodeURIComponent(discordRedirectUri)}&response_type=code&scope=${discordScopes}`;

document.getElementById('discordBtn').addEventListener('click', function () {
    window.location.href = discordAuthUrl;
});

// GitHub
const githubClientId = 'YOUR_GITHUB_CLIENT_ID'; // Replace with your GitHub Client ID
const githubRedirectUri = 'https://tymmerc.github.io/TymStats/';
const githubScopes = 'user:email';

const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${encodeURIComponent(githubRedirectUri)}&scope=${githubScopes}`;

document.getElementById('githubBtn').addEventListener('click', function () {
    window.location.href = githubAuthUrl;
});*/
