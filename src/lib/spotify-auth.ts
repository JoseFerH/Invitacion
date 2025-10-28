let spotifyAccessToken = '';
let tokenExpiryTime = 0;

/**
 * Retrieves (and caches) a Spotify access token using the Client Credentials flow.
 */
export async function getSpotifyToken(): Promise<string> {
  if (spotifyAccessToken && Date.now() < tokenExpiryTime) {
    return spotifyAccessToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Spotify API credentials are not configured in the environment.');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error(`Failed to retrieve Spotify token: ${response.statusText}`);
  }

  const data = await response.json();
  spotifyAccessToken = data.access_token;
  tokenExpiryTime = Date.now() + (data.expires_in - 60) * 1000;

  return spotifyAccessToken;
}
