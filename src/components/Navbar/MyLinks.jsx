export const links = [
    {
        name: 'Músicas', submenu: true, sublinks: [
            {
                Head: "Artistas",
                sublink: [
                    { name: 'Buscar', link: '/' },
                    { name: 'Resumo', link: '/' },
                ]
            },
            {
                Head: "Categorias",
                sublink: [
                    { name: 'Buscar', link: '/' },
                    { name: 'Resumo', link: '/' },
                ]
            },
            {
                Head: "Letras",
                sublink: [
                    { name: 'Buscar Letras', link: '/' },
                    { name: 'Enviar Letra', link: '/musicas/new' },
                ]
            },
            {
                Head: "Repertórios",
                sublink: [
                    { name: 'Buscar Repertórios', link: '/' },
                    { name: 'Criar Repertório', link: '/' },
                ]
            },
        ]
    },
    {
        name: 'Organização', submenu: true, sublinks: [
            {
                Head: "Escalas",
                sublink: [
                    { name: 'Criar Escala', link: '/' },
                    { name: 'Consultar Escalas', link: '/' },
                ]
            }
        ]
    },
    // {
    //     name: "A Definir", submenu: true, sublinks: [
    //         {
    //             Head: "...",
    //             sublink: [
    //                 { name: '1', link: '/' },
    //                 { name: '2', link: '/' },
    //                 { name: '3', link: '/' },
    //             ]
    //         }
    //     ]
    // },
]