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
    const response = await api.get(`/handler/categories/list`)
    const categories = response.data.categories
    const paths = categories.map(category => ({ params: { category: category.slug } }))
    return { paths, fallback: 'blocking' }
}

export const getStaticProps = async (ctx) => {
    try {
        const response = await api.get(`/handler/category/${ctx.params.category}`)
        // let songs = response.data.songs
        let name = response.data.songs.at(0).categories.filter(category => category.slug === ctx.params.category).at(0).name

        // if (ctx.params.artist !== slug_artist)
        //     return {
        //         redirect: {
        //             destination: `/artista/${slug_artist}`,
        //         },
        //     }
        return { props: { songs: response.data.songs.sort((a, b) => a.title.localeCompare(b.title)), name } }
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
        return <Message content="Categoria Não Encontrada"/>
    }

    return (
        <Suspense fallback={<Message content="Carregando..." />}>
            {/* {props.songs.map()} */}
            <ArtistInfo artist={props.name} songs={props.songs} handleClick={handleClick} />
            <ArtistSongs songs={props.songs} handleClick={handleClick} />
        </Suspense>
    )
}