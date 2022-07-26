import slugify from "slugify"

export default function ArtistSongs(props) {
    let songs = props.songs.sort((a, b) => a.title.localeCompare(b.title))

    return (
        <div className="flex w-11/12 mx-auto bg-white">
            <ul className="flex flex-col w-full">
                {songs.map((song, idx) => {
                    let currentLetter = song.title.charAt(0).toUpperCase()
                    let lastLetter;
                    let slug_title = slugify(song.title, { lower: true, strict: true })
                    let slug_artist = slugify(song.artist, { lower: true, strict: true })
                    { idx > 0 ? lastLetter = songs[idx - 1].title.charAt(0).toUpperCase() : lastLetter = currentLetter }

                    if ((currentLetter !== lastLetter) | idx == 0) {
                        return (
                            <div key={idx} className="flex flex-col border-b pt-2 pb-1">
                                <span className="flex text-xl font-bold ">{song.title.charAt(0).toUpperCase()}</span>
                                <li className="flex flex-row pl-1 mt-1 hover:bg-gray-200 relative">
                                    <a className="flex flex-row flex-auto" href={`/${slug_artist}/${slug_title}`}>
                                        {song.title}
                                    </a>
                                    <button title="Adicionar a repertório" className="flex flex-row w-6 absolute right-0 pl-2"
                                        onClick={props.handleClick}>+</button>
                                </li>
                            </div>
                        )
                    } else {
                        return (
                            <li key={idx} className="flex flex-row pl-1 mt-1 hover:bg-gray-200 relative">
                                <a className="flex flex-row flex-auto" href={`/${slug_artist}/${slug_title}`}>
                                    {song.title}
                                </a>
                                <button title="Adicionar a repertório" className="flex flex-row w-6 absolute right-0 pl-2"
                                    onClick={props.handleClick}>+</button>
                            </li>
                        )
                    }
                }
                )}
            </ul>
        </div >
    )
}