import { useState, useEffect, Suspense } from "react"
import { useRouter } from "next/router"
import slugify from "slugify"
import Message from "../../../components/Message"
import { api } from "../../../services/api"
import dynamic from "next/dynamic"
import Head from "next/head"
import ArtistSongs from "../../../components/ArtistSongs"

const ArtistInfo = dynamic(() => import("../../../components/ArtistInfo"), {
    suspense: true,
    ssr: true,
})
// import ArtistInfo from "../../components/ArtistInfo"

export const getStaticPaths = async () => {
    const response = await api.get(`/handler/artist/list`)
    const artists = response.data.artists
    const paths = artists.map(artist => ({ params: { artist: slugify(artist, { lower: true }) } }))
    return { paths, fallback: 'blocking' }
}

export const getStaticProps = async (ctx) => {
    try {
        const response = await api.get(`/handler/artist/${ctx.params.artist}`)
        let artist = response.data.artists.at(0)
        let slug_artist = slugify(artist, { lower: true, strict: true })
        let categories = response.data.songs.map(song => song.categories.map(
            category => category.name
        ).flat())//.filter((value, index, self) => self.indexOf(value) === index)
        let props = { songs: response.data.songs.sort((a, b) => a.title.localeCompare(b.title)), categories, artist }
        //TODO - Implementar alias para casos como vineyard, vineyard music brasil e ministério vineyard

        if (slugify(ctx.params.artist, { lower: true, strict: true }) !== slug_artist) {
            let redirectTo = `/artista/${slug_artist}`
            props = { ...props, redirectTo }
        }

        return { props }
    } catch (error) {
        return { props: { songs: null, error: error.code } }
    }
}


export default function ArtistPage(props) {
    const handleClick = () => {
        //TODO - Implementar a funcionalidade de adicionar música a repertório
        alert('A funcionalidade de adicionar ao repertório ainda não está implementada!')
    }

    if (props.error) {
        return <Message content="Artista Não Encontrado" />
    }

    return (
        <Suspense fallback={<Message content="Carregando..." />}>
            <div className="bg-white">
            <ArtistInfo artist={props.artist} songs={props.songs} categories={props.categories} redirectTo={props.redirectTo} handleClick={handleClick} />
            <ArtistSongs songs={props.songs} handleClick={handleClick} />
            </div>
        </Suspense>
    )
}