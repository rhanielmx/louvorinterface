import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "../../../services/api"
import { CredentialsConfig } from "next-auth/providers/credentials";

interface UserCredentialsConfig extends CredentialsConfig {
    username: string,
    password: string
}


// const providers = [
//     CredentialsProvider({
//         name: 'Credentials',
//         credentials: {},
//         authorize: async (credentials, req) => {
//             console.log('credentials', credentials)

//             const response = await api.post("/admin/token", {
//                 username: credentials.username,
//                 password: credentials.password
//             })

//             console.log('response', response)

//             if (response?.data) {

//                 let user = {
//                     id: response.data.user.id,
//                     username: response.data.user.username,
//                     email: response.data.user.email,
//                     image: response.data.user.avatar_url,
//                     token: response.data.token
//                 }
//                 console.log('yes', user)
//                 return user
//             } else {
//                 console.log('no')
//                 return {
//                     name: 'Rhaniel',
//                     email: 'rhanielmag',
//                     image: 'https://avatars0.githubusercontent.com/u/17098981?s=460&v=4'
//                 }
//             }
//         }
//     })
// ]

// const callbacks = {
//     // Getting the JWT token from API response
//     async jwt(token, user) {
//         if (user) {
//             token.accessToken = user.token
//             console.log('jwt', user)
//         }

//         return token
//     },

//     async session({ session, token, user }) {
//         session.accessToken = token?.accessToken
//         session.user = user
//         console.log('session', session)
//         return session
//     }
// }

// const options = {
//     secret: process.env.secret,
//     providers,
//     callbacks,
//     session: {
//         strategy: 'jwt'
//     }
// }

// export default (req, res) => NextAuth(req, res, options)
export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {},
                password: {}
            },
            authorize: async (credentials, req) => {
                console.log('credentials', credentials)

                const response = await api.post("/admin/token", {
                    username: credentials.username,
                    password: credentials.password
                })

                console.log('response', response)

                return {
                    name: response.data.user.first_name,
                    email: response.data.user.email,
                    image: response.data.user.avatar_url,
                    token: response.data.token,
                }               
            }
        })
    ],
    callbacks:{
        jwt: ({token, user})=>{
            if(user){
                token.accessToken = user.token
            }
            return token
        },
        session: ({ session, token})=>{
            if(token){
                session.accessToken = token.accessToken
            }
            return session
        }
    },
    secret: process.env.secret,
    jwt: {
        secret: process.env.secret,        
        // encryption: true
    },   
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 1 // 1 hour
    }
}
) 