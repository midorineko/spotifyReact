import Spotify from '../utils/Spotify'
import {useState} from 'react'

const SpotifyCreatePlaylist = ({token, tracks, removeTrack}) =>{
    const [playlistName, setPlaylistName] = useState("");
    const createPlaylist = () => {
        const trackUris = []
        Object.keys(tracks).map((track)=>{
            track = tracks[track]
            trackUris.push(track.uri)
        })
        const playlistReturn = Spotify.savePlaylist(playlistName, trackUris, token)
        playlistReturn.then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    };
    const returnForm = () =>{
        return (
            <form onSubmit={createPlaylist}>
                <input type="text" placeholder="Playlist Name" onChange={e => setPlaylistName(e.target.value)}/>
                <button type={"submit"} disabled={playlistName.length < 2 || !token ? true : false}>Create Playlist</button>
            </form> 
        )
    }

    return(
        <>
            <div><b>Playlist Tracks</b></div>
            {Object.keys(tracks).length < 1 ? <div><b>Add Tracks</b></div> : returnForm()}
            {
                Object.keys(tracks).map((trackKey, i)=>{
                    let track = tracks[trackKey];
                    return (<div key={`playlist_${track.id}_${i}`}>
                    {track.name}
                    {track.artists.map((artist, i)=>{
                        return <span key={`playlist_artist_${track.id}_${i}`}> - {artist.name} </span>
                    })}
                    <button trackid={track.id} onClick={removeTrack}>Remove Track</button>
                    </div>)
                })
            }
        </>
    )
    

}
export default SpotifyCreatePlaylist;