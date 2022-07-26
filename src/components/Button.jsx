import { useRouter } from "next/router";

const Button = () => {
    const router = useRouter()
    return (
        <button onClick={()=>router.push('/login')} className="bg-green-700 text-white px-6 py-2 rounded-full">Entrar</button>
    );
}

export default Button;