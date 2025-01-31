const clientId = '0e7b73a206b7410091a17ce856944b0a';  //my spotify client ID
const redirectUri = 'https://tymmerc.github.io/TymStats2/';  //on spotify dashboard
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

//gen unique state for security
const state = btoa(Math.random().toString());
localStorage.setItem('spotifyAuthState', state);

const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&state=${state}`;

//redirect to spotify auth page
const spotifyBtn = document.getElementById('spotifyBtn');
if (spotifyBtn) {
    spotifyBtn.addEventListener('click', function () {
        window.location.href = authUrl;
    });
}

//pick up code and state on url 
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
const returnedState = urlParams.get('state');
const storedState = localStorage.getItem('spotifyAuthState');

if (code && returnedState === storedState) {
    //del stocked state to prevent re use
    localStorage.removeItem('spotifyAuthState');

    //trade code for access token in backend (on render)
    fetch('https://tymstats2.onrender.com/get-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.access_token) {
                localStorage.setItem('spotifyAccessToken', data.access_token);
                window.location.href = 'stats-spotify.html';
            } else {
                console.error('Token non obtenu:', data);
            }
        })
        .catch(error => console.error('Erreur lors de l’obtention du token:', error));
} else if (returnedState !== storedState) {
    console.error("Mismatch de state, possible attaque CSRF.");
}



document.getElementById('lolBtn').addEventListener('click', function () {
    alert('Tu vas maintenant afficher tes statistiques League of Legends!');

});
