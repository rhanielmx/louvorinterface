import Link from "next/link";
import NavLinks from "./NavLinks";
import Button from "../Button";
import { useState } from 'react';
import Image from "next/image";
import { useAuth } from '../../contexts/AuthContext'
import UserCard from "../UserCard";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth()
    return (
        <nav className="bg-white z-50  shadow-b shadow-black shadow-md">
            <div className="flex items-center font-medium justify-around h-20" >
                <div className="z-50 p-5 md:w-auto w-full flex justify-between items-center">
                    <Image src='/logo.png' alt="logo" width={50} height={50} className="md:cursor-pointer h-9 order-last md:order-first" />
                    <div className="text-3xl md:hidden order-first md:order-last" onClick={() => { setIsOpen(!isOpen) }}>
                        <ion-icon name={`${isOpen ? 'close' : 'menu'}`}></ion-icon>
                    </div>
                </div>

                <ul className="md:flex hidden uppercase items-center gap-8">
                    <Link href="/" >
                        <a className="my-7 px-3 inline-block">Início</a>
                    </Link>
                    <NavLinks />
                </ul>
                <div className={`md:flex items-center hidden h-full align-middle justify-center list-none`}>
                    {user ? <UserCard menuIsOpen={setIsOpen} /> : <Button />}
                </div>
                <ul className={`block
                md:hidden bg-white absolute w-full h-full bottom-0 py-24 pl-4
                duration-500 ${isOpen ? 'left-0' : 'left-[-100%]'}
                `}>
                    <li>{/*  onClick={()=>setIsOpen(!isOpen)}> */}
                        {
                            user ? (
                                // <Link href="/profile" >
                                //     <a className="my-7 px-3 inline-block">Perfil</a>
                                // </Link>
                                <UserCard menuIsOpen={setIsOpen} />

                            ) : (
                                <Link href="/login" >
                                    <a className="my-7 px-3 inline-block">Entrar</a>
                                </Link>
                            )
                        }
                    </li>
                    <NavLinks />
                </ul>
            </div>
        </nav >
    )
}

export default Navbar;