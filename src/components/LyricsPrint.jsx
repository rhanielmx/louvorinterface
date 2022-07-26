import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FontIcon, OneColumnIcon, TwoColumnsIcon } from './Icons'

export default function LyricsPrint(props) {    
    const [fontSize, setFontSize] = useState(3)
    const [selectedFont, setSelectFont] = useState('Arial')
    const [selectedTitleColor, setSelectedTitleColor] = useState('#000000')
    const [selectedArtistColor, setSelectedArtistColor] = useState('#000000')
    const [selectedLyricsColor, setSelectedLyricsColor] = useState('#6B7280')
    const [colorStyles, setColorStyles] = useState({})
    const [columnsMode, setColumnsMode] = useState(2)
    const [rightDisabled, setRightDisabled] = useState(false)
    const [leftDisabled, setLeftDisabled] = useState(false)
    const router = useRouter()

    if (!props.song || props.song.length === 0) {
        return (
            <div className={`
        h-screen
        flex flex-grow justify-center items-center text-center
        bg-gradient-to-r from-green-300 to-green-700
        text-white text-4xl
        `}>
                Música Não Encontrada
            </div>
        )
    }

    const handleFontSizeChange = (increment) => {
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

    const toggleColumnsMode = (value) => {
        console.log(value)
        setColumnsMode(value)
    }

    const handleChangeTitleColor = (color) => {
        console.log('change title color')
        setSelectedTitleColor(color)
        let title = document.getElementById('title')
        title.style.color = color
    }

    const handleChangeArtistColor = (color) => {
        console.log('change title color')
        setSelectedArtistColor(color)
        let artist = document.getElementById('artist')
        artist.style.color = color
    }

    const handleChangeLyricsColor = (color) => {
        setSelectedLyricsColor(color)
        let lyrics = document.getElementById('lyrics')
        lyrics.style.color = color
    }

    const resetConfigurations = () => {
        setSelectFont('Arial')
        setColumnsMode(2)
        setFontSize(3)
        handleChangeTitleColor('#000000')
        handleChangeArtistColor('#000000')
        handleChangeLyricsColor('#6B7280')
    }


    const lyricContent = props.song?.lyrics.split('\n')

    let fonts = {
        'Arial': 'font-sans font-[Arial]',
        'Courier New': 'font-mono font-["Courier New"]',
        'Times New Roman': 'font-serif font-["Times New Roman"]',
    }

    let fontsStyles = {
        0: { 'title': 'lg:text-xl print:text-xl font-bold', 'artist': 'lg:text-md print:text-md font-bold', 'lyrics': 'lg:text-sm print:text-sm' },
        1: { 'title': 'lg:text-2xl print:text-2xl font-bold', 'artist': 'lg:text-lg print:text-lg font-bold', 'lyrics': 'lg:text-base print:text-nase' },
        2: { 'title': 'lg:text-3xl print:text-3xl font-bold', 'artist': 'lg:text-xl print:text-xl font-bold', 'lyrics': 'lg:text-lg print:text-lg' },
        3: { 'title': 'lg:text-4xl print:text-4xl font-bold', 'artist': 'lg:text-2xl print:text-2xl font-bold', 'lyrics': 'lg:text-xl print:text-xl' },
        4: { 'title': 'lg:text-5xl print:text-4xl font-bold', 'artist': 'lg:text-3xl print:text-3xl font-bold', 'lyrics': 'lg:text-2xl print:text-2xl' },
        5: { 'title': 'lg:text-6xl print:text-4xl font-bold', 'artist': 'lg:text-4xl print:text-3xl font-bold', 'lyrics': 'lg:text-3xl print:text-3xl' },
        6: { 'title': 'lg:text-7xl print:text-5xl font-bold', 'artist': 'lg:text-5xl print:text-4xl font-bold', 'lyrics': 'lg:text-4xl print:text-4xl' },
    }

    let columns = {
        1: { 'text': 'lg:columns-1 print:columns-1', 'button': 'invert bg-white' },
        2: { 'text': 'lg:columns-2 print:columns-2', 'button': 'invert bg-white' },
    }

    let size = document.getElementById('paper')?.scrollHeight

    let splitIntoMultiplePages = (size) => {
        //TODO
        let pages = []
        let page = []
        let lines = lyricContent.length
        let line = 0
        let lineHeight = size / lines
        let lineHeightPx = lineHeight + 'px'
        let lineHeightPxMinus = lineHeight - 1 + 'px'
        let lineHeightPxMinus2 = lineHeight - 2 + 'px'
        let lineHeightPxMinus3 = lineHeight - 3 + 'px'
        let lineHeightPxMinus4 = lineHeight - 4 + 'px'
        let lineHeightPxMinus5 = lineHeight - 5 + 'px'
    }


      return (
        <div  id="paper" className='flex flex-auto static block-flex flex-col bg-gray-300 lg:flex-row px-4 py-4 md:px-8 md:py-6 print:p-0'>
            <div className='flex flex-col flex-auto order-1 lg:order-none lg:mr-6 lg:w-8/12 bg-white shadow-lg shadow-black print:shadow-none'>
                <p id='title' className={`flex flex-col ${colorStyles[selectedTitleColor]} text-xl mx-4 lg:mx-16 pt-4 lg:pt-12 print:p-0 ${fonts[selectedFont]} ${fontsStyles[fontSize]['title']} print:items-center`}>{props.song.title}</p>
                <p id='artist' className={`flex flex-col text-md mx-4 lg:mx-16  ${fonts[selectedFont]}  ${fontsStyles[fontSize]['artist']} print:items-center`}>{props.song.artist}</p>
                <div id='lyrics' className='flex flex-col text-gray-500'>
                    <p className={`${fonts[selectedFont]} lyric text-sm leading-3 mx-4 lg:mx-16 py-4 lg:py-8 print:py-8 ${columns[columnsMode]['text']} print:pb-0`}>
                        {lyricContent.map((e, idx) =>
                            <span key={idx} className={`${fontsStyles[fontSize]['lyrics']}`}>{e}<br></br></span>
                        )}
                    </p>
                </div>
            </div>
            <div className='hidden lg:flex flex-col flex-auto h-fit w-full order-none lg:order-1 py-2 mx-auto lg:w-1 shadow-lg shadow-black bg-white border rounded-lg overflow-hidden print:hidden'>
                <div className='lg:flex lg:flex-col'>
                    <div className='flex flex-row w-full items-center justify-center border-b border-b-gray-700'>
                        <p className='text-lg font-bold pb-2'>Configurações</p>
                    </div>
                    <div className='flex flex-col px-6 w-full justify-between '>
                        <p className='text-center font-bold pt-1 pb-2'  >Alterar Fonte</p>
                        <select className={`flex flex-row border border-gray-400 rounded-md p-1 bg-white`} value={selectedFont} onChange={(e) => { setSelectFont(e.target.value) }}>
                            {Object.keys(fonts).map((value, idx) =>
                                <option className={`${fonts[value]}`} key={idx} value={value}>{value}</option>
                            )}
                        </select>
                    </div>
                    <p className='text-center font-bold pt-1 pb-2'>Alterar Tamanho</p>
                    <div className='flex flex-row pb-1 w-full items-center justify-center border-b border-b-gray-700'>
                        <button className="flex justify-center w-16 h-7 mx-2 my-1 rounded-md border border-gray-500 hover:invert hover:bg-white disabled:border-gray-200 disabled:invert-0 disabled:bg-gray-200 disabled:cursor-not-allowed" onClick={() => { handleFontSizeChange(-1) }} disabled={leftDisabled}>{FontIcon}</button>
                        <button className="flex justify-center -scale-x-100 w-16 h-7 mx-2 my-1 rounded-md border border-gray-500 hover:invert hover:bg-white disabled:border-gray-200 disabled:invert-0  disabled:bg-gray-200 disabled:cursor-not-allowed" onClick={() => { handleFontSizeChange(+1) }} disabled={rightDisabled}>{FontIcon}</button>
                    </div>

                    <div className='flex flex-row px-6 py-1 w-full justify-between border-b border-b-gray-700'>
                        <p className='flex flex-row font-bold items-start my-1 py-1 text-grey-400'>Colunas</p>
                        <button className={`flex flex-row justify-center items-center w-8 my-1 ${columnsMode === 1 ? columns[columnsMode]['button'] : ''} rounded-md border border-gray-500 disabled:border-gray-200 disabled:bg-gray-200 disabled:cursor-not-allowed`} onClick={() => { toggleColumnsMode(1) }}>
                            {OneColumnIcon}
                        </button>
                        <div>
                            <button className={`flex flex-row justify-center items-center w-8 my-1 py-1 ${columnsMode === 2 ? columns[columnsMode]['button'] : ''} rounded-md border border-gray-500 disabled:border-gray-200 disabled:bg-gray-200 disabled:cursor-not-allowed`} onClick={() => { toggleColumnsMode(2) }}>
                                {TwoColumnsIcon}
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-row font-bold py-1 w-full justify-around'>
                        <p>Alterar Cor</p>
                    </div>
                    <div className='flex flex-row py-1 w-full justify-around border-b border-b-gray-700'>
                        <div className='flex flex-col text-center'>
                            <p>Título</p>
                            <input type="color" value={selectedTitleColor} onChange={e => { handleChangeTitleColor(e.target.value) }} />
                        </div>
                        <div className='flex flex-col text-center'>
                            <p>Artista</p>
                            <input type="color" value={selectedArtistColor} onChange={e => { handleChangeArtistColor(e.target.value) }} />
                        </div>
                        <div className='flex flex-col text-center'>
                            <p>Letra</p>
                            <input type="color" value={selectedLyricsColor} onChange={e => { handleChangeLyricsColor(e.target.value) }} />
                        </div>

                    </div>
                    <div className='flex flex-row pt-2 pb-1 w-full justify-center'>
                        <button className="flex flex-row justify-center items-center w-28 my-1 rounded-md border border-[#005131] bg-[#005131] bg-opacity-70 hover:border-[#005131] hover:bg-[#005131] hover:opacity-100 hover:text-white disabled:border-gray-200 disabled:bg-gray-200 disabled:cursor-not-allowed" 
                        onClick={() => {window.print()}}>
                            Imprimir
                        </button>
                    </div>
                    <div className='flex flex-row w-full pb-2 justify-center'>
                        <span className='text-sm text-gray-400 hover:text-black hover:cursor-pointer' onClick={() => { resetConfigurations() }}>Resetar Configurações</span>
                    </div>
                </div>
            </div>
        </div>
    )
}