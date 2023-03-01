import Keys from '../../Keys'

const Spotify = {
    savePlaylist(playlistName, trackURIs, token) {
		if (playlistName && trackURIs.length) {
			const accessToken = token;
			const headers = {
				Authorization: `Bearer ${accessToken}`
			};
			let userID;
			let playlistID;
			return fetch('https://api.spotify.com/v1/me', { headers: headers })
				.then(
					(response) => {
						if (response.ok) {
							return response.json();
						}
						throw new Error('Request failed!');
					},
					(networkError) => {
						console.log(networkError.message);
					}
				)
				.then((jsonResponse) => {
					userID = jsonResponse.id;
					return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
						method: 'POST',
						headers: headers,
						body: JSON.stringify({ name: playlistName })
					})
						.then(
							(response) => {
								if (response.ok) {
									return response.json();
								}
								throw new Error('Request failed!');
							},
							(networkError) => {
								console.log(networkError.message);
							}
						)
						.then((jsonResponse) => {
							playlistID = jsonResponse.id;
							return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
								method: 'POST',
								headers: headers,
								body: JSON.stringify({ uris: trackURIs })
							})
								.then(
									(response) => {
										if (response.ok) {
											return response.json();
										}
										throw new Error('Request failed!');
									},
									(networkError) => {
										console.log(networkError.message);
									}
								)
								.then((jsonResponse) => jsonResponse);
						});
				});
		} else {
			return;
		}
	}
}
export default Spotify;