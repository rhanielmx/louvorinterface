import { useAuth } from "../contexts/AuthContext"
import { Image } from "next/image"
import React, { useEffect } from "react"

const NavbarProfile = () => {
    const { isAuthenticated, user } = useAuth();

    console.log(user)
    useEffect(() => {
        if (typeof user === 'undefined') return
    }, [user])

    return (
        <>
            {/* {isAuthenticated ? <a>{user.username} haha</a> : <a>Entrar</a>} */}
            {isAuthenticated ? <Image clas src={`${user?.avatar_url??''}`} width={30} height={30} alt='' /> : <span>fuck</span>}
        </>
    )
}

export default NavbarProfile