import Link from "next/link"

export default function ConditionalLink(props){
    return(
        <Link href='/'>
            <a onClick={()=>props.onClick()} className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white'>
            {props.label}
            </a>
        </Link>
    )
    
}