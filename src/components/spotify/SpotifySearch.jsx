import {useState} from 'react';

const SpotifySearch = ({token}) =>{
    const [searchKey, setSearchKey] = useState("")
    const [tracks, setTracks] = useState([])
    const [savedTracks, setSaveTrack] = useState({})
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

    const renderTracks = () => {
        console.log(savedTracks)
        return tracks.map(track => (
            <div key={track.id}>
                {track.name}
                {track.artists.map((artist)=>{
                    return <span> - {artist.name} </span>
                })}
                <button trackid={track.id} track={JSON.stringify(track)} onClick={savetrack}>Save Track</button>
            </div>
        ))
    }
    return(
        <>
           <form onSubmit={searchTracks}>
                <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                <button type={"submit"}>Search</button>
            </form>
            {renderTracks()}
        </>
    )
}
export default SpotifySearch;