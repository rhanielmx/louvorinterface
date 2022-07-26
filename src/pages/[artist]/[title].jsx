import axios from "axios"
import dynamic from 'next/dynamic'
import slugify from "slugify"
import { Suspense } from 'react'
import Head from "next/head";
import Message from "../../components/Message";

const DynamicLyrics = dynamic(() => import('../../components/Lyrics'), {
    suspense: true,
    // loading: () => <Message content="Loading" />
})

export const getStaticPaths = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/handler/list`)
    const songs = response.data.songs
    const paths = songs.map(song => ({ params: { artist: slugify(song.artist, { lower: true }), title: slugify(song.title, { lower: true }) } }))
    return { paths, fallback: 'blocking' }
}

export const getStaticProps = async (ctx) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/handler/${ctx.params.artist}/${ctx.params.title}`)
        let slug_song = slugify(response.data.song.title, { lower: true, strict: true })
        let slug_artist = slugify(response.data.song.artist, { lower: true, strict: true })
        if (ctx.params.artist !== slug_artist | ctx.params.title !== slug_song)
            return {
                redirect: {
                    destination: `/${slug_artist}/${slug_song}`,
                },
            }
        return { props: { song: response.data.song } }
    } catch (error) {
        return { props: { song: null, error: error.code } }
    }
}

export default function Song(props) {
    // useEffect(() => {
    //     if (!router.isReady) return;

    //     function getSong(artist, title) {
    //         axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/handler/${artist}/${title}`)
    //             .then(
    //                 response => {
    //                     let slug_song = slugify(response.data.song.title, { lower: true, strict: true })
    //                     let slug_artist = slugify(response.data.song.artist, { lower: true, strict: true })
    //                     if (router.query.artist !== slug_artist | router.query.title !== slug_song)
    //                         router.push(`/${slug_artist}/${slug_song}`)
    //                     setSong(response.data.song ?? [])
    //                     // if (response.data.song.length === 0 || response.data.song === undefined) {
    //                     //     setIsEmpty(true)
    //                     // } else {
    //                     //     setSong(response.data.song)
    //                     //     setIsEmpty(false)
    //                     // }
    //                     setLoading(false)
    //                 }
    //             ).catch(error => {
    //                 setLoading(false)
    //                 console.error(error)
    //             })
    //     }

    //     getSong(props.artist, props.title)

    // }, [props.artist, props.title, router])

    return (
        <>
            <Head>
                {props.song && !props.error ? <title>{`${props.song.title} - ${props.song.artist}`}</title> : <title>Música Não Encontrada</title>}
            </Head>
            <Suspense fallback={<Message content="Carregando..." />}>
                <DynamicLyrics song={props.song} />
            </Suspense>
        </>
    )
}

