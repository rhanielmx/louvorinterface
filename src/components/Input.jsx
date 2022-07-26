export default function Input(props) {
    let inputField = null
    if (props.type == "textarea") {
        inputField = <textarea name="" id="" rows={props.rows ? props.rows : 10} cols={props.cols}
            onChange={e => props.onChange(e.target.value)}
            value={props.value} readOnly={props.readOnly}
            placeholder={props.placeholder} className={`ring-1 ring-black ${props.className}`} />
    } else if (props.type == "password") {
        inputField = <input type="password"
            onChange={e => props.onChange(e.target.value)} value={props.value} placeholder={props.placeholder}
            readOnly={props.readOnly} className={props.className} />
    } else if (props.type == "search") {
        inputField = <input type="search"
            onChange={e => props.onChange(e.target.value)} value={props.value} placeholder={props.placeholder}
            readOnly={props.readOnly} className={props.className} />
    } else if (props.type == "select") {
        inputField = <select onChange={e => props.onChange(e.target.value)}
        placeholder={props.placeholder} className={props.className} multiple>
            <option hidden disabled selected value> -- Selecione uma Opção -- </option>
            {props.choices.map((choice, index) => {
                return <option key={index} value={index}>{choice}</option>
            })}
        </select>
    }
    else {
        inputField = <input type="text"
            onChange={e => props.onChange(e.target.value)} value={props.value} placeholder={props.placeholder}
            readOnly={props.readOnly} className={`ring-1 ring-black ${props.className}`}/>
    }
    return (
        <>
            {/* <label className="">{props.label}</label> */}
            {inputField}
        </>
    )
}