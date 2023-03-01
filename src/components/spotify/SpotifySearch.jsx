import {useState} from 'react';
import SpotifyCreatePlaylist from './SpotifyCreatePlaylist';
import './spotifyStyles.scss'

const SpotifySearch = ({token}) =>{
    const [searchKey, setSearchKey] = useState("");
    const [tracks, setTracks] = useState([]);
    const [savedTracks, setSaveTrack] = useState({});
    const searchTracks = () => fetch('https://api.spotify.com/v1/search'+ '?' + new URLSearchParams({
            q: searchKey,
            type: "track"
        }), {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})
    .then(response => response.json())
    .then(response => {
        setTracks(response.tracks.items);
        return;
    })
    .catch(err => console.error(err));

    const savetrack = (event) =>{
        let trackid = event.target.getAttribute('trackId');
        let track = JSON.parse(event.target.getAttribute('track'));
        savedTracks[trackid] = track;
        setSaveTrack({...savedTracks});
    }

    
    const removeTrack = (event) =>{
        let trackid = event.target.getAttribute('trackId');
        delete savedTracks[trackid];
        setSaveTrack({...savedTracks});
    }

    const searchForm = () =>{
        return (
            <form onSubmit={searchTracks}>
                <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                <button type={"submit"}>Search</button>
            </form>
        )
    }    

    const renderTracks = () => {
        return tracks.map((track,i) => (
            <div id="searchTracksReturn" key={`tracks_${track.id}_${i}`}>
                {track.name}
                <div>
                    {track.artists.map((artist, i)=>{
                        return <span key={`tracks_artist_${track.id}_${i}`}> - {track.artists[0].name} </span>
                    })}
                </div>
                {savedTracks[track.id] ? <button trackid={track.id} onClick={removeTrack}>Remove Track</button> : <button trackid={track.id} track={JSON.stringify(track)} onClick={savetrack}>Save Track</button>}
            </div>
        ))
    }
    return(
        <>
            <div id="searchBody">
                <div id="searchTracks">
                    {searchForm()}
                    {renderTracks()}
                </div>
                <br></br>
                <div id="createPlaylist">
                    <SpotifyCreatePlaylist token={token} tracks={savedTracks} removeTrack = {removeTrack}/>
                </div>
            </div>
        </>
    )
}
export default SpotifySearch;