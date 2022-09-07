import If from './If';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

import slugify from 'slugify';
import { SearchIcon } from './Icons';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
    const [active, setActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    // const [currentUser, setCurrentUser] = useState(null);
    // const { isAuthenticated, user, signOut } = useAuth();
    const { data:session } = useSession()
    const router = useRouter()

    const handleClick = () => {
        setActive(!active);
    };

    const handleSearchClick = (e) => {
        e.preventDefault()
        setActive(false)
        setSearchActive(!searchActive);
    };

    const logout = () => {
        // removeToken()
        // removeUser()
        signOut()
        setActive(false)
    };

    useEffect(() => {
        setActive(false)
        setSearchValue('')
    }, [router])

    function debounce(callback, wait) {
        let timeout;
        return function (...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => callback.apply(context, args), wait);
        }
    }

    if (typeof document !== "undefined") {
        let searchBox = document.getElementById('searchBox')
        searchBox?.addEventListener('keyup', debounce(() => {
            if (searchValue.length > 0) {
                // router.push(`/search/${searchValue}`)
            }
        }, 1000))
    }

    return (
        <>
            <nav className='flex items-center flex-wrap bg-[#005131] print:hidden lg:h-12 justify-between'>
                <div className={`${searchActive ? 'hidden' : ''} lg:hidden`}>
                    <button
                        className=' inline-flex p-3 hover:bg-green-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none'
                        onClick={handleClick}
                    >
                        <svg
                            className='w-6 h-6'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M4 6h16M4 12h16M4 18h16'
                            />
                        </svg>
                    </button>
                </div>
                <div className={`${searchActive ? 'hidden' : ''} lg:block fixed top-1 left-[9.5rem] lg:static lg:order-first`}>
                    <Link href='/'>
                        <a className='inline-flex items-center px-2 mr-4'>
                            <Image className='h-10 invert' width={40} height={40} src={'/logo.png'} alt="Logo da Igreja"/>
                            <span className='text-xl text-white font-bold uppercase tracking-wide'></span>
                        </a>
                    </Link>
                </div>
                <div className={`flex ${searchActive ? 'flex-grow flex-auto' : 'hidden'} lg:block py-1 pl-1 lg:w-1/3 lg:order-2`} >
                    <input id='searchBox' className={`lg:inline-flex lg:w-auto py-2 px-2 rounded font-bold w-full`} style={{ width: '100%' }}
                        type="search" placeholder='O que você está procurando?'
                        value={searchValue} onChange={e => (setSearchValue(e.target.value))}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                location.replace(`/search/${slugify(searchValue, { lower: true, strict: true })}`)
                            }
                        }}
                    />
                </div>
                <div className={`${active ? '' : 'hidden'} flex flex-col lg:flex-row lg:order-3 lg:block w-full lg:w-fit fixed top-12 left-0 lg:static bg-[#005131]`}>
                    <Link href='/'>
                        <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded lg:ml-2 text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white'>
                            Início
                        </a>
                    </Link>
                    <Link href='/musicas/new'>
                        <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white'>
                            Enviar Letra
                        </a>
                    </Link>
                    <Link href='/search'>
                        <a className='lg:hidden lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white'>
                            Buscar
                        </a>
                    </Link>

                    <If condition={session?.user} fallback={<a onClick={() => { router.push('/login') }} className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold hover:bg-green-600 hover:text-white hover:cursor-pointer'>Entrar</a>}>
                        <a onClick={logout} className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold  hover:bg-green-600 hover:text-white hover:cursor-pointer'>Sair</a>
                    </If>

                </div>
                <div className={`flex  h-12 mr-auto lg:hidden invert text-center ${searchActive ? 'mx-auto py-3' : 'fixed top-3 right-0'}`}>
                    <a href="#" onClick={handleSearchClick}>
                        {searchActive ?
                            <span className='mx-2' >Cancelar</span> :
                            SearchIcon}
                    </a>
                </div>
            </nav>
        </>
    );
};