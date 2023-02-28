const SpotifyCreatePlaylist = ({tracks, removeTrack}) =>{
    return(
        <>
            <div><b>Tracks to Be Added</b></div>
        {
            Object.keys(tracks).map((trackKey, i)=>{
                let track = tracks[trackKey];
                return (<div key={`playlist_${track.id}_${i}`}>
                {track.name}
                {track.artists.map((artist, i)=>{
                    return <span key={`playlist_artist_${track.id}_${i}`}> - {artist.name} </span>
                })}
                <button trackid={track.id} onClick={removeTrack}>Remove Track</button>
                {/* <button trackid={track.id} track={JSON.stringify(track)} onClick={savetrack}>Save Track</button> */}
                </div>)
                console.log(tracks[trackKey])
            })
        }
        </>
    )
}
export default SpotifyCreatePlaylist;