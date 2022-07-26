import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function ArtistInfo(props) {
    const router = useRouter()

    useEffect(() => {
        if(props.redirectTo) {
            router.push(props.redirectTo)
        }
    },[props.redirectTo, router])

    //TODO - Implementar essa parte e ver como ficar o placeholder antes de redirecionar

    return <>
    {
        !props.redirectTo && (
            <>
                <Head>
                    <title>{props.artist}</title>
                </Head>
                <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 w-11/12 border rounded-lg p-2 my-6 mx-auto bg-white">
                    <div>
                        <h1 className="text-4xl pb-2">{props.artist}</h1>
                        <h2><span className="font-bold">Total de Músicas:</span> {props.songs.length}</h2>
                        {props.categories ?
                            <h2 className="pb-2"><span className="font-bold">Categorias:</span> {props.categories.flat().filter((value, index, self) => self.indexOf(value) === index).sort().join(', ')}</h2>
                            : null
                        }
                    </div>
                    <div>
                        <h2 className="font-2xl font-bold border-b-2">{`Músicas mais acessadas:`}</h2>
                        <ul className="pt-2">
                            {props.songs.sort((a, b) => b.access_count - a.access_count).slice(0, 5).map((song, idx) => {
                                return (
                                    <li key={`top-accessed-${idx}`} className="flex flex-row px-2 hover:bg-gray-200 relative">
                                        <a className="flex flex-row flex-auto" href={`/${song.artist}/${song.title}`}>
                                            <span>{idx + 1} - {song.title}</span>
                                        </a>
                                        <button title="Adicionar a repertório" className="flex flex-row w-6 absolute right-0 pl-2"
                                            onClick={props.handleClick}>+</button>
                                    </li>
                                )
                            })}
                        </ul>
    
                    </div> 
                </div>
            </>
        )
    }
    </>
}