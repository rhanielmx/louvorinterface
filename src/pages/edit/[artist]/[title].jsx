// import { useRouter } from "next/router"
// import { useState, useEffect } from "react"
import axios from "axios"
import Message from "../../../components/Message";
import Head from "next/head";
import { api } from "../../../services/api";
import slugify from "slugify";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicLyricsForm = dynamic(() => import("../../../components/LyricsForm"), {
    suspense: true,
    // ssr: true,
});

export const getStaticPaths = async () => {
    const response = await api.get(`handler/songs/list`)
    const songs = response.data.songs
    const paths = songs.map(song => ({ params: { artist: slugify(song.artist, { lower: true }), title: slugify(song.title, { lower: true }) } }))
    return { paths, fallback: 'blocking' }
}

export const getStaticProps = async (ctx) => {
    try {
        const response = await api.get(`/handler/${ctx.params.artist}/${ctx.params.title}`)
        let slug_title = response.data.song.slug_title
        let slug_artist = response.data.song.slug_artist
        let props = { song: response.data.song }

        if (ctx.params.artist !== slug_artist | ctx.params.title !== slug_title) {
            let redirectTo = `/edit/${slug_artist}/${slug_title}`
            props = { ...props, redirectTo }
        }
        return { props }

    } catch (error) {
        console.log('edit',error)
        return { props: { song: null, error: error.code } }
    }
}

export default function EditSong(props) {
    // const router = useRouter()
    // const [song, setSong] = useState();
    // const [loading, setLoading] = useState(true);
    // const [isEmpty, setIsEmpty] = useState(true);
    // const { token } = useAuth();

    // if (!token)
    //   router.push({ pathname: '/login', query: { from: router.pathname } })

    // async function getSong(artist, song) {
    //     const response = await api.get(`${process.env.NEXT_PUBLIC_BASE_URL}/handler/${artist}/${song}`)
    //     return response.data.song
    // }

    // useEffect(() => {
    //     if (!router.isReady) return;

    //     getSong(router.query.artist, router.query.song)
    //         .then(song => {
    //             if (song.length === 0 || song === undefined) {
    //                 setIsEmpty(true)
    //             } else {
    //                 setSong(song)
    //                 setIsEmpty(false)
    //             }
    //             setLoading(false)
    //         })
    // }, [router.isReady, router.query.artist, router.query.song])

    return (
        <>
            <Head>
                {props.song ? <title>{`Editar Letra: ${props.song.title} - ${props.song.artist}`}</title> : <title>{"Música Não Encontrada"}</title>}
            </Head>
            <Suspense fallback={<Message content="Carregando..." />}>
                <DynamicLyricsForm song={props.song} redirectTo={props.redirectTo} />
            </Suspense>
        </>
    )
}