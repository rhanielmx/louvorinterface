import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import Message from "../../components/Message"
import SearchResults from "../../components/SearchResults"

export default function Home() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [songs, setSongs] = useState([])
    const [artistSongs, setArtistSongs] = useState([])

    async function getSearchResults(searched) {
        const res1 = axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/handler/title/${searched}`)
        const res2 = axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/handler/artist/${searched}`)
        Promise.all([res1, res2]).then(responses => {
            setSongs(responses[0].data.songs)
            setArtistSongs(responses[1].data.songs)
        }).catch(err => {
            console.log('search',err)
        }).finally(
            () => { setLoading(false) }
        )
    }

    useEffect(() => {
        if (!router.isReady) return
        getSearchResults(router.query.searched)
    }, [router.isReady, router.query.searched])
    return (
        <>
            {loading ? <Message content="Carregando..." /> : <SearchResults songs={songs} artistSongs={artistSongs} />}
        </>
    )
}
