import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import axios from "axios"
import LyricsPrint from "../../../components/LyricsPrint";
import If from "../../../components/If";
import Message from "../../../components/Message";
import Head from "next/head";

export default function Song() {
    const router = useRouter()
    const [song, setSong] = useState();
    const [loading, setLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(true);

    async function getSong(artist, song) {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/handler/${artist}/${song}`)
        return response.data.song
    }

    useEffect(() => {
        if (!router.isReady) return;

        getSong(router.query.artist, router.query.song)
            .then(song => {
                if (song.length === 0 || song === undefined) {
                    setIsEmpty(true)
                } else {
                    setSong(song)
                    setIsEmpty(false)
                }
                setLoading(false)
            })
    }, [router.isReady, router.query.artist, router.query.song])

    return (
        <>
            <Head>
                {song ? <title>{song.title} - {song.artist} (Impressão)</title> : <title>Música Não Encontrada</title>}
            </Head>
            {loading ? <Message content="Carregando..." /> : <If isEmpty={isEmpty} condition={!isEmpty} ><LyricsPrint song={song} /></If>}
        </>
    )
}