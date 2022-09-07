import Input from './Input'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import slugify from 'slugify'
import Multiselect from './Multiselect'
import { api } from '../services/api'
import { useSession } from 'next-auth/react'

export default function LyricsForm(props) {
    const router = useRouter()
    const { data: session } = useSession()
    const [title, setTitle] = useState(props.song?.title ?? '')
    const [artist, setArtist] = useState(props.song?.artist ?? '')
    const [url, setUrl] = useState(props.song?.video_url ?? '')
    const [lyrics, setLyrics] = useState(props.song?.lyrics ?? '')
    const [selectedItems, setSelected] = useState(props.song?.categories.map(category => { return category.name }) ?? []);


    useEffect(() => {
        if (props.redirectTo) {
            router.push(props.redirectTo)
        }
    }, [props.redirectTo, router])

    useEffect(() => {
        api.defaults.headers.common['Authorization'] = `Bearer ${session?.accessToken}`
    }, [session])

    //TODO - Implementar redirect do login'

    async function handleConfirm() {
        let data = {
            "title": title,
            "artist": artist,
            "lyrics": lyrics,
            "video_url": url,
            "categories": selectedItems
        }
        if (props.song) {
            await handleUpdate(data)
        } else {
            await handleCreate(data)
        }
    }
    //TODO - Checar se o usuário está logado
    async function handleCreate(data) {
        console.log('api', api)
        await api.post(`/handler/songs/new`, data)
            .then(res => {
                console.log(res)
                let slugified_title = slugify(title, { lower: true, strict: true })
                let slugified_artist = slugify(artist, { lower: true, strict: true })
                router.push(`/${slugified_artist}/${slugified_title}`)
            })
            .catch(err => {
                console.log(err)
            })

    }
    //TODO - Checar se o usuário está logado
    async function handleUpdate(data) {
        await api.put(`/handler/songs/${props.song?.id}`, data)
            .then(res => {
                console.log(res)
                let slugified_title = slugify(title, { lower: true, strict: true })
                let slugified_artist = slugify(artist, { lower: true, strict: true })
                router.push(`/${slugified_artist}/${slugified_title}`)
            })
            .catch(err => {
                console.log(err)
            })

    }

    function handleCancel() {
        router.push('/')
    }

    //TODO - Colocar um placeholder enquanto carrega
    return <>
        {!props.redirectTo && (
            <div className='grid align-middle px-4'>
                <div className="w-full lg:w-2/3 my-12 px-3 md:px-6 py-8 md:py-4 mx-auto  bg-white rounded-md">
                    <h1 className="text-4xl font-bold text-center mb-12">Enviar Letra</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 align-middle">
                        <form className='grid gap-6'>
                            <div className='grid lg:grid-cols-2 gap-6'>

                                <label className="block">
                                    {/* <div clasName="relative">
                                        <input type="text" id="floating_outlined" className="border block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Floating outlined</label>
                                    </div> */}
                                    <span className="text-gray-700">Título</span>
                                    <Input
                                        type="text" placeholder='Título da Música'
                                        value={title} onChange={setTitle}
                                        className="mt-1 px-1 inline-block w-full rounded-md"
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-gray-700">Artista</span>
                                    <Input
                                        type="text" placeholder="Artista"
                                        value={artist} onChange={setArtist}
                                        className="mt-1 px-1 inline-block w-full rounded-md"
                                    />
                                </label>
                            </div>
                            <div className='grid gap-6'>
                                <label className="block">
                                    <span className="text-gray-700">Link do Vídeo</span>
                                    <Input
                                        type="text" placeholder='URL do Vídeo'
                                        className="mt-1 px-1 inline-block w-full rounded-md"
                                        value={url} onChange={setUrl} />
                                </label>
                                <label className="block">
                                    <span className="text-gray-700">Categorias</span>
                                    <Multiselect selectedItems={selectedItems} setSelected={setSelected} />
                                </label>
                            </div>
                        </form>
                        <div className='grid'>
                            <label className="block">
                                <span className="text-gray-700 order-2">Letra da Música</span>
                                <Input
                                    type="textarea"
                                    value={lyrics} onChange={setLyrics}
                                    className="mt-1 block w-full rounded-md resize-y border-red-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2"
                                />
                            </label>
                            <div className='grid grid-cols-2 gap-6 px-8 py-2'>
                                <label>
                                    <button
                                        onClick={e => handleConfirm()}
                                        className="block w-full mt-1 rounded-md bg-blue-500 hover:bg-blue-700">
                                        Enviar
                                    </button>
                                </label>
                                <label >
                                    <button
                                        onClick={e => handleCancel()}
                                        className="block w-full mt-1 rounded-md bg-red-300 hover:bg-red-500">
                                        Cancelar
                                    </button></label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>

}