import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function Login(props) {
    const { signIn } = useAuth();

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('O nome de usuário é obrigatório!'),
        password: Yup.string()
            .required('A senha é obrigatória!')
        // .min(6, 'Password must be at least 6 characters')       
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    async function onSubmit(data) {
        await signIn(data);

        return false;
    }

    const [loginForm, setloginForm] = useState({
        username: "",
        password: ""
    })

    async function handleSignIn(event) {
        event.preventDefault();
        await signIn(loginForm);
    }

    function handleChange(event) {
        const { value, name } = event.target
        setloginForm(prevNote => ({
            ...prevNote, [name]: value
        })
        )
    }

    return (
        <div className="flex flex-col h-full align-middle">
            <div className="flex flex-col h-2/4 lg:h-3/4 text-center justify-center w-4/5 md:w-3/4 lg:w-2/5 m-auto bg-gradient-to-t from-green-300 to-green-500 rounded-lg shadow-md shadow-black">
                <h1 className="flex flex-row justify-center text-3xl font-mono relative -top-7 md:-top-20 lg:-top-12">Faça Login</h1>
                <form className="flex flex-col md:w-2/3 mx-auto my-2 rounded-md justify-center text-center" onSubmit={handleSubmit(onSubmit)}>
                    <input className={`flex py-1 px-2 my-1 rounded-md ${errors.username ? 'border border-solid border-spacing-3 border-red-800 focus:border-red-800 focus:outline-red-800 placeholder:text-red-500' : ''}`}
                        type="text"
                        // text={loginForm.username}
                        name="username"
                        {...register('username')}
                        placeholder="Nome de Usuário"
                    // value={loginForm.username} 
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1 mb-2">
                            {errors.username?.message}
                        </p>
                    )}
                    {/* <p className="invisible peer-invalid:visible text-red-700 font-light">{errors.username?.message}</p> */}
                    <input className={`flex py-1 px-2 my-1 rounded-md ${errors.password ? 'border border-solid border-spacing-3 border-red-800 focus:border-red-800 focus:outline-red-800 placeholder:text-red-500' : ''}`}
                        type="password"
                        // text={loginForm.password}
                        name="password"
                        {...register('password')}
                        placeholder="Senha"
                    // value={loginForm.password}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1 mb-2">
                            {errors.password?.message}
                        </p>
                    )}                    {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded" onClick={handleSignIn}>Entrar</button> */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">Entrar</button>
                </form>
            </div >
        </div>
    )

}