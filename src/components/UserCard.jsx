import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function UserCard(props) {
    // const { user, signOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    function handleSignOut(event) {
        event.preventDefault()
        signOut()
        props.menuIsOpen(false)
        setIsOpen(false)
    }

    return (
        <div className={`flex flex-col pb-1 mr-8 md:mr-0 border-b md:border-none hover:cursor-pointer hover:md:bg-gray-200 h-full `}>
            <div className="flex flex-row pl-3 md:pl-0 items-center h-full" onClick={() => setIsOpen(!isOpen)}>
                <div className="flex md:pl-3.5 md:pr-[0.925rem] h-fit w-full" >
                    <Image src={props.user?.image ?? 'https://gravatar.com/avatar/8aec9a741d3d00fc127210a085df99b1?s=200&d=mp&r=x'} width={35} height={35} alt="Avatar do Usuário"
                        className="rounded-full" />
                    <p className="pl-2 pt-1.5">{props.user?.name}</p>

                </div>
                <span className="text-xl mt-2 inline md:hidden">
                    <ion-icon name={`${isOpen ? "chevron-up" : "chevron-down"}`}></ion-icon>
                </span>
            </div>

            <div className={`${isOpen ? 'block' : 'hidden'} `}>
                {/* Versão mobile */}
                <div className="md:hidden">
                    <li className="py-4 pl-7" onClick={() => {props.menuIsOpen(false);setIsOpen(false)}}>
                        <Link href="/profile">
                            <a className="block h-full w-full" >Perfil</a>
                        </Link>
                    </li>
                    {/* TODO - Alterar link para página de repertórios quando ela existir */}

                    <li className="py-4 pl-7" onClick={() => {props.menuIsOpen(false);setIsOpen(false)}}>
                        <Link href="/">
                            <a className="block h-full w-full">Repertórios</a>
                        </Link>
                    </li>
                    <li className="py-4 pl-7" onClick={handleSignOut}>
                        <Link href="/">
                            <a className="block h-full w-full">Sair</a>
                        </Link>
                    </li>
                </div>
                {/* Página WEB */}
                <div className="hidden md:block absolute top-20 bg-white rounded-b-lg shadow-2xl">
                    <li className="h-full hover:text-green-700" onClick={() => setIsOpen(false)}>
                        <Link href="/profile">
                            <a className="block h-full w-full py-4 pl-5 pr-5">Perfil</a>
                        </Link>
                    </li>
                    {/* TODO - Alterar link para página de repertórios quando ela existir */}
                    <li className="hover:text-green-700" onClick={() => setIsOpen(false)}>
                        <Link href="/">
                            <a className="block h-full w-full py-4 pl-5 pr-5 ">Repertórios</a>
                        </Link>
                    </li>
                    <li className="hover:text-red-700" onClick={handleSignOut}>
                        <Link href="/">
                            <a className="block h-full w-full py-4 pl-5 pr-5 ">Sair</a>
                        </Link>
                    </li>
                </div>
            </div>
        </div>
    )

}