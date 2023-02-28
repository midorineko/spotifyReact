import {useEffect, useState} from 'react';
import SpotifySearch from './SpotifySearch';
import Keys from '../../Keys'

const SpotifyLogin = () =>{
    const [token, setToken] = useState("")
    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)

    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }
    const CLIENT_ID = Keys.spotifyClientId;
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPE = 'user-read-private user-read-email user-library-modify playlist-modify-public playlist-modify-private'
    return (
        <>
            <div>
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout}>Logout</button>}
                <SpotifySearch token={token}/>
            </div>

        </>
    )
}
export default SpotifyLogin;