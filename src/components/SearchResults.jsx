import { useRouter } from "next/router"
import slugify from "slugify"
import Message from "./Message"

export default function SearchResults(props) {
    // console.log('props',props, props.songs, props.artistSongs)
    const router = useRouter()
    let songs = props.songs ?? []
    let artistSongs = props.artistSongs ?? []
    // console.log('songs',songs, artistSongs)

    const handleClick = (event, song) => {
        event.preventDefault()
        router.push(`/${slugify(song.artist, { lower: true, strict: true })}/${slugify(song.title, { lower: true, stric: true })}`)
    }
    if (songs.length === 0 && artistSongs.length === 0) {
        return (
            <Message content="Nenhuma Música ou Artista foram Encontrados" title="Não Encontrado" />
        )
    }
    return (
        <div>
            <ul>
                {artistSongs.map((song, idx) => {
                    return <li key={idx}><a href={`/${slugify(song.artist, { lower: true, strict: true })}/${slugify(song.title, { lower: true, stric: true })}`} onClick={(event) => handleClick(event, song)}>{song.title}</a></li>
                }
                )}
            </ul>
        </div>

    )

}