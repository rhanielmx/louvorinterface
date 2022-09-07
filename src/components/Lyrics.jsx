import { useState, useEffect } from 'react'
import { PrintIcon, EditIcon, DownloadIcon } from './Icons'
import { useRouter } from 'next/router'
import slugify from 'slugify'
import Message from './Message'

export default function Lyrics(props) {
    const [fontSize, setFontSize] = useState(3)
    const [rightDisabled, setRightDisabled] = useState(false)
    const [leftDisabled, setLeftDisabled] = useState(false)
    const router = useRouter()

    if (!props.song || props.song.length === 0) {
        return (
            <Message content="Música Não Encontrada" />
        )
    }

    const handleClick = (increment) => {
        let lastPosition = 6
        let newFontSize = fontSize + increment

        if (newFontSize === lastPosition) {
            setRightDisabled(true)
        } else {
            setRightDisabled(false)
        }

        if (newFontSize === 0) {
            setLeftDisabled(true)
        } else {
            setLeftDisabled(false)
        }


        if (newFontSize > lastPosition || newFontSize < 0) {
            return
        }
        setFontSize(newFontSize)
    }

    const handlePrint = () => {
        router.push(`/print/${slugify(props.song.artist, { lower: true, strict: true })}/${slugify(props.song?.title, { lower: true, strict: true })}`)
    }

    const handleEdit = () => {
        router.push(`/edit/${slugify(props.song.artist, { lower: true, strict: true })}/${slugify(props.song?.title, { lower: true, strict: true })}`)
    }

    async function generateSlide() {
        const pptxgen = (await import('pptxgenjs')).default

        let pptx = new pptxgen()

        pptx.defineSlideMaster({
            title: "MASTER_SLIDE",
            background: { color: "000000" },
            slideMargin: { left: 2, right: 2, top: 0.5, bottom: 0.5 }
        });

        pptx.defineSlideMaster({
            title: "TITLE_SLIDE",
            background: { color: "000000" },
            slideMargin: { left: 2, right: 2, top: 0.5, bottom: 0.5 }
        })


        let title = pptx.addSlide({ masterName: "TITLE_SLIDE" });
        title.addText(props.song.title.toUpperCase(), { y: 2.0, w: '100%', h: 0.75, align: "center", fontSize: 66, color: "FFFFFF" });
        title.addText(props.song.artist.toUpperCase(), { y: 3.5, w: '100%', h: 0.75, align: "center", fontSize: 44, color: "FFFFFF" });

        let blocks = props.song?.lyrics.split('\n\n')
        let slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
        blocks.forEach((block, idx) => {
            slide.addText(block.toUpperCase(), { w: '100%', h: "100%", align: "center", fontSize: 40, color: "FFFFFF", bold: true });
            if (idx < blocks.length - 1) {
                slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
            }
        })
        return pptx
    }

    const handleDownload = () => {
        generateSlide().then(pptx => {
            pptx.writeFile({ fileName: `${props.song.title} - ${props.song.artist}` });
        })
    }

    let url = props.song?.video_url
    let sub1 = url?.substr(url.indexOf('=') + 1)
    let sub2 = sub1?.substr(0, sub1.indexOf('&'))

    // const url_code = props.song?.video_url.split('=')[1]
    const url_code = sub2 == '' ? sub1 : sub2
    const lyricContent = props.song?.lyrics.split('\n')

    let fonts = {
        0: { 'title': 'text-xl font-bold', 'artist': 'text-md font-bold', 'lyrics': 'text-sm' },
        1: { 'title': 'text-2xl font-bold', 'artist': 'text-lg font-bold', 'lyrics': 'text-base' },
        2: { 'title': 'text-3xl font-bold', 'artist': 'text-xl font-bold', 'lyrics': 'text-lg' },
        3: { 'title': 'text-4xl font-bold', 'artist': 'text-2xl font-bold', 'lyrics': 'text-xl' },
        4: { 'title': 'text-5xl font-bold', 'artist': 'text-3xl font-bold', 'lyrics': 'text-2xl' },
        5: { 'title': 'text-6xl font-bold', 'artist': 'text-4xl font-bold', 'lyrics': 'text-3xl' },
        6: { 'title': 'text-7xl font-bold', 'artist': 'text-5xl font-bold', 'lyrics': 'text-4xl' },
    }

    return (
        <div className='h-screen bg-white overflow-y-auto'>
            <div className='flex flex-col static lg:flex-row py-4 px-4 md:px-8 md:py-0 md:mt-2 md:mb-6 print:p-0'>
                <div className='lg:flex lg:flex-col order-last lg:order-first md:pt-3 md:my-12'>
                    <button title="Aumentar Fonte" className="w-7 h-7 mt-1 mr-3  rounded-full border border-gray-500 hover:border-green-400 hover:bg-green-400 disabled:border-gray-200 disabled:bg-gray-200 disabled:cursor-not-allowed" onClick={() => { handleClick(+1) }} disabled={rightDisabled}>A+</button>
                    <button title="Reduzir Fonte" className="w-7 h-7 mt-2 mr-3 rounded-full border border-gray-500 hover:border-green-400 hover:bg-green-400 disabled:border-gray-200 disabled:bg-gray-200 disabled:cursor-not-allowed" onClick={() => { handleClick(-1) }} disabled={leftDisabled}>A-</button>
                    <button title="Customizar Impressão" className="w-7 h-7 mt-2 mr-3 rounded-full border border-gray-500 hover:border-green-400 hover:bg-green-400" onClick={handlePrint}>
                        {PrintIcon}
                    </button>
                    <button title="Editar Letra" className="w-7 h-7 mt-2 mr-3 rounded-full border border-gray-500 hover:border-green-400 hover:bg-green-400" onClick={handleEdit}>
                        {EditIcon}
                    </button>
                    <button title="Gerar Slide" className="w-7 h-7 mt-2 mr-3  rounded-full border border-gray-500 hover:border-green-400 hover:bg-green-400" onClick={handleDownload}>
                        {DownloadIcon}
                    </button>
                </div>
                {/* Tablets md */}
                <div className='hidden md:block lg:hidden w-fit text-sm order-first text-gray-400 hover:text-gray-700 pt-0'>
                        <span><a className='hover:text-green-500' href={`/`}>página inicial</a>&#8594;
                            {props.song?.categories.map((category, index) => {
                                return (
                                    <span key={index}>{index === 0 ? null : ' / '}<a className="hover:text-green-500" href={`/categoria/${category.slug}`}>{category.name.toLowerCase()}</a></span>
                                )
                            })}
                            &#8594;
                            <a className="hover:text-green-500" href={`/artista/${slugify(props.song?.artist, { lower: true, strict: true })}`}>{props.song?.artist.toLowerCase()}</a>
                            &#8594;
                            <a className='hover:cursor-default' >{props.song?.title.toLowerCase()}</a>
                        </span>
                    </div>
                    {/* Página Web LG */}
                <div className='flex flex-col flex-auto md:order-3 order-2 lg:order-none lg:w-64'>
                    <div className='hidden lg:block w-fit text-sm order-first text-gray-400 hover:text-gray-700 pt-3 pb-6'>
                        <span><a className='hover:text-green-500' href={`/`}>página inicial</a>&#8594;
                            {props.song?.categories.map((category, index) => {
                                return (
                                    <span key={index}>{index === 0 ? null : ' / '}<a className="hover:text-green-500" href={`/categoria/${category.slug}`}>{category.name.toLowerCase()}</a></span>
                                )
                            })}
                            &#8594;
                            <a className="hover:text-green-500" href={`/artista/${slugify(props.song?.artist, { lower: true, strict: true })}`}>{props.song?.artist.toLowerCase()}</a>
                            &#8594;
                            <a className='hover:cursor-default' >{props.song?.title.toLowerCase()}</a>
                        </span>
                    </div>

                    <p className={`flex flex-col ${fonts[fontSize]['title']} uppercase print:items-center`}>{props.song?.title}</p>
                    <p className={`flex flex-col ${fonts[fontSize]['artist']} uppercase print:items-center`}>{props.song?.artist}</p>
                    <div className='flex flex-col pb-6 md:pb-0'>
                        <p className='leading-3 pt-8 print:columns-2'>
                            {lyricContent.map((e, idx) =>
                                <span key={idx} className={`text-gray-500 ${fonts[fontSize]['lyrics']}`}>{e}<br></br></span>
                            )}
                        </p>
                    </div>
                </div>
                <div className='flex flex-col flex-auto mb-6 md:order-2 lg:w-32 md:pt-1 lg:py-14 overflow-hidden print:hidden'>
                    <iframe className={`w-full aspect-video aolute`} src={`https://www.youtube.com/embed/${url_code}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen scrolling="true"></iframe>
                </div>
            </div>
        </div>
    )
}