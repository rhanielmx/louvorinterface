import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
    const { 'louvor.token': token } = parseCookies(ctx);

    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    })

    api.interceptors.request.use(
        (config) => {
            return config
        }
    )

    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    return api;
}


