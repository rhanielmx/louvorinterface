export default function If(props) {

    if (props.condition) {
        return (
            props.children
        )
    } else {
        if (props.isEmpty) {
            return (
                <div className={`
                    h-screen
                    flex justify-center items-center
                    bg-gradient-to-r from-blue-500 to-purple-700
                    text-black text-4xl
                    `}>
                    Música Não Encontrada
                </div>
            )
        }
        return (
            props.fallback
        )
    }
}
